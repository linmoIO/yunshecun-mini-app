'use strict';

const { PrismaClient } = require('/app/node_modules/@prisma/client');

const prisma = new PrismaClient();

const repairName = (value) => {
  if (!value || typeof value !== 'string') return null;
  const repaired = Buffer.from(value, 'latin1').toString('utf8');
  if (repaired === value || repaired.includes('\uFFFD') || !/[\u4E00-\u9FFF]/.test(repaired)) return null;
  return Buffer.from(repaired, 'utf8').toString('latin1') === value ? repaired : null;
};

const run = async () => {
  const media = await prisma.mediaFile.findMany({ select: { id: true, originalName: true } });
  const repairs = media
    .map((item) => ({ ...item, repaired: repairName(item.originalName) }))
    .filter((item) => item.repaired);

  if (process.env.MEDIA_NAME_REPAIR_MODE !== 'apply') {
    console.log(JSON.stringify({ mode: 'preview', affected: repairs.length, repairs }, null, 2));
    return;
  }

  await prisma.$transaction(repairs.map(({ id, repaired }) => prisma.mediaFile.update({
    where: { id },
    data: { originalName: repaired },
  })));

  const remaining = await prisma.mediaFile.findMany({ select: { originalName: true } });
  if (remaining.some((item) => repairName(item.originalName))) {
    throw new Error('媒体文件名修复后仍存在可逆乱码');
  }
  console.log(JSON.stringify({ mode: 'apply', repaired: repairs.length }, null, 2));
};

run()
  .catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
