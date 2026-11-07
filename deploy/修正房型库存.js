'use strict';

// 房型余量改为“按晚计算”后，RoomType.stock 表示该房型的实际间数，下单不再扣减。
// 旧逻辑下单会永久扣减 stock，正式库中的值已被扣乱，部署新后端时需执行本脚本恢复为实际间数。
// 以 roomCode 定位，只修改 RoomType.stock，可重复执行。
//
// 默认间数取自初始导入数据（code/backend/prisma/yunsheContent.js），执行前请与运营核对实际间数并按需修改。
//
// 在后端容器内执行（先备份 MySQL）：
//   docker exec -i -w /app <后端容器名> node - --dry-run < deploy/修正房型库存.js
//   docker exec -i -w /app <后端容器名> node - < deploy/修正房型库存.js

const { PrismaClient } = require('@prisma/client');

const ROOM_COUNTS = {
  'YUNSHE-CUNSHE-1-A': 2,       // 村舍1
  'YUNSHE-CUNSHE-1-B': 16,      // 村舍1
  'YUNSHE-CUNSHE-1B': 1,        // 村舍1B
  'YUNSHE-CUNSHE-1-LARGE': 1,   // 超大 村舍1
  'YUNSHE-CUNSHE-2-A': 6,       // 村舍2
  'YUNSHE-CUNSHE-2C': 1,        // 村舍2C
  'YUNSHE-CUNSHE-2B': 1,        // 村舍2B
  'YUNSHE-CUNSHE-3': 2,         // 村舍3
  'YUNSHE-HEYUAN-1': 2,         // 合院1
  'YUNSHE-HEYUAN-1B': 1,        // 合院1B
  'YUNSHE-HEYUAN-2': 1,         // 合院2
  'YUNSHE-HEYUAN-3': 1,         // 合院3
  'YUNSHE-HEYUAN-5': 1,         // 合院5
  'YUNSHE-WUJINYUAN': 1,        // 五进院
};

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const prisma = new PrismaClient();
  try {
    const rooms = await prisma.roomType.findMany({ where: { roomCode: { in: Object.keys(ROOM_COUNTS) } } });
    let changed = 0;
    for (const [roomCode, count] of Object.entries(ROOM_COUNTS)) {
      const room = rooms.find(r => r.roomCode === roomCode);
      if (!room) {
        console.log(`跳过 ${roomCode}：数据库中不存在`);
        continue;
      }
      const mark = room.stock === count ? '不变' : '修改';
      console.log(`${mark} ${roomCode} ${room.name}：${room.stock} -> ${count}`);
      if (room.stock === count) continue;
      changed++;
      if (!dryRun) await prisma.roomType.update({ where: { id: room.id }, data: { stock: count } });
    }
    console.log(`${dryRun ? '[演练，未写入] ' : ''}共 ${Object.keys(ROOM_COUNTS).length} 个房型，需修改 ${changed} 个`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
