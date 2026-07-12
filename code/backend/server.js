'use strict';

require('dotenv').config();

const app = require('./src/app');
const config = require('./src/config');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const start = async () => {
  // 数据库连接检查
  try {
    await prisma.$connect();
    console.log('[DB] 数据库连接成功');
  } catch (err) {
    console.error('[DB] 数据库连接失败:', err.message);
    console.error('请先运行: npm run db:push 初始化数据库');
    process.exit(1);
  }

  // 启动服务
  const port = config.port;
  const server = app.listen(port, () => {
    console.log(`\n🚀 云舍村后端服务已启动`);
    console.log(`   环境: ${config.env}`);
    console.log(`   地址: http://localhost:${port}`);
    console.log(`   API:  http://localhost:${port}/api`);
    console.log(`   健康检查: http://localhost:${port}/api/health`);
    console.log(`   静态文件: http://localhost:${port}/uploads`);
    console.log(`\n管理端接口: http://localhost:${port}/api/admin`);
    console.log(`管理员登录: POST http://localhost:${port}/api/admin/login`);
    console.log(`\n如需初始化数据请运行: npm run db:seed\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n启动失败: 端口 ${port} 已被占用`);
      console.error(`请先关闭旧的后端进程，或临时使用其他端口:`);
      console.error(`  set PORT=3001 && node server.js`);
      process.exit(1);
    }
    console.error('启动失败:', err);
    process.exit(1);
  });
};

start().catch((err) => {
  console.error('启动失败:', err);
  process.exit(1);
});

// 优雅退出
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
