'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { PrismaClient: MySqlPrismaClient } = require('/app/node_modules/@prisma/client');

const backupDir = '/backup';
const sourceUploadDir = path.join(backupDir, '上传文件');
const targetUploadDir = '/target-uploads';
const sqliteSchemaPath = '/app/prisma/schema.sqlite.prisma';
const sqliteClientPath = '/app/prisma/sqlite-prisma-client';
const reportPath = process.env.MIGRATION_REPORT_PATH || path.join(backupDir, '迁移报告.json');
const batchSize = 100;

const stableStringify = (value) => {
  if (value instanceof Date) return JSON.stringify(value.toISOString());
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
};

const checksumRows = (rows) => crypto
  .createHash('sha256')
  .update(rows.map(stableStringify).sort().join('\n'))
  .digest('hex');

const listFiles = (directory, prefix = '') => {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.posix.join(prefix, entry.name);
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath, relativePath) : [relativePath];
  }).sort();
};

const checksumFile = (filePath) => crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');

const chownRecursively = (directory, uid, gid) => {
  fs.chownSync(directory, uid, gid);
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) chownRecursively(entryPath, uid, gid);
    else fs.chownSync(entryPath, uid, gid);
  }
};

const delegateName = (modelName) => `${modelName[0].toLowerCase()}${modelName.slice(1)}`;

const sourceTableNames = async (source) => {
  const rows = await source.$queryRawUnsafe("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name != '_prisma_migrations' ORDER BY name");
  return rows.map((row) => row.name);
};

const generateSqliteClient = () => {
  const mysqlSchema = fs.readFileSync('/app/prisma/schema.prisma', 'utf8');
  const sqliteSchema = mysqlSchema
    .replace('provider = "mysql"', 'provider = "sqlite"')
    .replace('provider = "prisma-client-js"', `provider = "prisma-client-js"\n  output   = "${sqliteClientPath}"`)
    .replace(/\s+@db\.\w+(?:\([^)]*\))?/g, '');

  fs.writeFileSync(sqliteSchemaPath, sqliteSchema);
  execFileSync('/app/node_modules/.bin/prisma', ['generate', '--schema', sqliteSchemaPath], { stdio: 'inherit' });
  return require(sqliteClientPath).PrismaClient;
};

const verifyUploads = () => {
  const sourceFiles = listFiles(sourceUploadDir);
  const targetFiles = listFiles(targetUploadDir);

  if (sourceFiles.length !== targetFiles.length || sourceFiles.some((file, index) => file !== targetFiles[index])) {
    throw new Error('上传文件清单不一致');
  }
  for (const relativePath of sourceFiles) {
    if (checksumFile(path.join(sourceUploadDir, relativePath)) !== checksumFile(path.join(targetUploadDir, relativePath))) {
      throw new Error(`上传文件校验失败：${relativePath}`);
    }
  }
  return { count: sourceFiles.length, checksum: checksumRows(sourceFiles.map((file) => ({ file, checksum: checksumFile(path.join(sourceUploadDir, file)) }))) };
};

const copyUploadsAndVerify = () => {
  const sourceFiles = listFiles(sourceUploadDir);
  if (listFiles(targetUploadDir).length > 0) throw new Error('目标上传卷非空，已停止以避免覆盖文件');

  for (const relativePath of sourceFiles) {
    const sourcePath = path.join(sourceUploadDir, relativePath);
    const targetPath = path.join(targetUploadDir, relativePath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath, fs.constants.COPYFILE_EXCL);
  }

  if (process.getuid() === 0) chownRecursively(targetUploadDir, 1000, 1000);

  return verifyUploads();
};

const run = async () => {
  if (!process.env.SQLITE_DATABASE_URL || !process.env.DATABASE_URL) throw new Error('缺少数据库连接配置');
  if (!fs.existsSync('/backup/旧数据.sqlite')) throw new Error('未找到 SQLite 备份文件');

  const SQLitePrismaClient = generateSqliteClient();
  const source = new SQLitePrismaClient({ datasources: { db: { url: process.env.SQLITE_DATABASE_URL } } });
  const target = new MySqlPrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });
  const report = { migratedAt: new Date().toISOString(), models: {}, sourceTables: [], stringLengths: {}, uploads: null };

  try {
    await source.$connect();
    await target.$connect();

    const sourceTables = await sourceTableNames(source);
    report.sourceTables = sourceTables;
    const models = Object.entries(source._runtimeDataModel.models).map(([name, model]) => ({
      name,
      delegate: delegateName(name),
      table: model.dbName || name,
    }));
    const knownTables = new Set(models.map((model) => model.table));
    const unmappedTables = sourceTables.filter((table) => !knownTables.has(table));
    if (unmappedTables.length > 0) throw new Error(`发现无法映射的 SQLite 表：${unmappedTables.join(', ')}`);

    for (const model of models) {
      if (!sourceTables.includes(model.table)) continue;
      const rows = await source[model.delegate].findMany();
      for (const row of rows) {
        for (const [field, value] of Object.entries(row)) {
          if (typeof value !== 'string') continue;
          const key = `${model.name}.${field}`;
          report.stringLengths[key] = Math.max(report.stringLengths[key] || 0, value.length);
        }
      }
    }

    if (process.env.MIGRATION_MODE === 'inspect') {
      fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
      console.log(JSON.stringify(report, null, 2));
      return;
    }

    if (process.env.MIGRATION_MODE === 'verify') {
      for (const model of models) {
        const sourceRows = sourceTables.includes(model.table) ? await source[model.delegate].findMany() : [];
        const targetRows = await target[model.delegate].findMany();
        const sourceChecksum = checksumRows(sourceRows);
        const targetChecksum = checksumRows(targetRows);
        if (sourceRows.length !== targetRows.length || sourceChecksum !== targetChecksum) {
          throw new Error(`数据校验失败：${model.name}`);
        }
        report.models[model.name] = { count: sourceRows.length, checksum: sourceChecksum };
      }
      report.uploads = verifyUploads();
      fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
      console.log(JSON.stringify(report, null, 2));
      return;
    }

    for (const model of models) {
      if (!target[model.delegate]) throw new Error(`MySQL Prisma Client 缺少模型：${model.name}`);
      const count = await target[model.delegate].count();
      if (count > 0) throw new Error(`目标 MySQL 表非空，已停止：${model.table}（${count} 条）`);
    }

    await target.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0');
    try {
      for (const model of models) {
        if (!sourceTables.includes(model.table)) {
          report.models[model.name] = { sourceTableMissing: true, count: 0, checksum: checksumRows([]) };
          continue;
        }
        const rows = await source[model.delegate].findMany();
        for (let start = 0; start < rows.length; start += batchSize) {
          await target[model.delegate].createMany({ data: rows.slice(start, start + batchSize) });
        }
        report.models[model.name] = { count: rows.length, checksum: checksumRows(rows) };
      }
    } finally {
      await target.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1');
    }

    for (const model of models) {
      const expected = report.models[model.name];
      const targetRows = await target[model.delegate].findMany();
      const actual = { count: targetRows.length, checksum: checksumRows(targetRows) };
      if (expected.count !== actual.count || expected.checksum !== actual.checksum) {
        throw new Error(`数据校验失败：${model.name}`);
      }
    }

    report.uploads = copyUploadsAndVerify();
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await source.$disconnect();
    await target.$disconnect();
  }
};

run().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
