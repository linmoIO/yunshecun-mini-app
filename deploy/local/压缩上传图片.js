'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('../../code/backend/node_modules/sharp');

const workspace = path.resolve(__dirname, '../..');
const sourceDir = path.resolve(process.env.SOURCE_DIR || path.join(workspace, 'code/backend/uploads/images'));
const outputDir = path.resolve(process.env.OUTPUT_DIR || path.join(__dirname, 'optimized-uploads/images'));
const manifestPath = path.join(path.dirname(outputDir), 'manifest.json');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const maxDimension = 1200;

if (outputDir === sourceDir || outputDir.startsWith(`${sourceDir}${path.sep}`)) {
  throw new Error('OUTPUT_DIR 不能覆盖源图片目录');
}

const formatBytes = (bytes) => Math.round(bytes / 1024);

async function compressImage(fileName) {
  const inputPath = path.join(sourceDir, fileName);
  const outputPath = path.join(outputDir, fileName);
  const extension = path.extname(fileName).toLowerCase();
  const image = sharp(inputPath, { failOn: 'warning' }).rotate().resize({
    width: maxDimension,
    height: maxDimension,
    fit: 'inside',
    withoutEnlargement: true,
  });

  if (extension === '.jpg' || extension === '.jpeg') {
    image.jpeg({ quality: 80, mozjpeg: true });
  } else if (extension === '.png') {
    image.png({ compressionLevel: 9, adaptiveFiltering: true });
  } else {
    image.webp({ quality: 80 });
  }

  const original = (await fs.stat(inputPath)).size;
  const metadata = await sharp(inputPath).metadata();
  let output = await image.toFile(outputPath);
  if (output.size >= original) {
    await fs.copyFile(inputPath, outputPath);
    output = {
      size: original,
      width: metadata.width,
      height: metadata.height,
    };
  }
  return {
    file: fileName,
    format: metadata.format,
    originalBytes: original,
    optimizedBytes: output.size,
    reductionPercent: Number(((1 - output.size / original) * 100).toFixed(2)),
    originalWidth: metadata.width || null,
    originalHeight: metadata.height || null,
    optimizedWidth: output.width,
    optimizedHeight: output.height,
  };
}

async function main() {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort();
  await fs.mkdir(outputDir, { recursive: true });

  const results = [];
  for (const file of files) {
    const result = await compressImage(file);
    results.push(result);
    console.log(`${file}: ${formatBytes(result.originalBytes)}KB -> ${formatBytes(result.optimizedBytes)}KB (${result.reductionPercent}% reduction)`);
  }

  await fs.writeFile(manifestPath, `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    sourceDir: path.relative(workspace, sourceDir) || '.',
    outputDir: path.relative(workspace, outputDir) || '.',
    maxDimension,
    jpegQuality: 80,
    files: results,
  }, null, 2)}\n`, 'utf8');
  const totals = results.reduce((sum, item) => ({
    originalBytes: sum.originalBytes + item.originalBytes,
    optimizedBytes: sum.optimizedBytes + item.optimizedBytes,
  }), { originalBytes: 0, optimizedBytes: 0 });
  console.log(`完成: ${results.length} 张，${formatBytes(totals.originalBytes)}KB -> ${formatBytes(totals.optimizedBytes)}KB`);
  console.log(`清单: ${manifestPath}`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
