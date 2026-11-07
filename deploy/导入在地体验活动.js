'use strict';

// 按《云舍村入住细则等260811》把付费课程与村俗体验项目导入为正式活动（Activity）。
// 以 activityCode 为键 upsert，可重复执行；只写 Activity 表，不改动其它数据。
//
// 在后端容器内执行（先备份 MySQL）：
//   docker exec -i -w /app <后端容器名> node - --dry-run < deploy/导入在地体验活动.js
//   docker exec -i -w /app <后端容器名> node - < deploy/导入在地体验活动.js

const { PrismaClient } = require('@prisma/client');

const IMG = '/uploads/images/';
const img = {
  study: `${IMG}云舍村-竹榻书屋.jpg`,
  salon: `${IMG}云舍村-雅室陈设.jpg`,
  reception: `${IMG}云舍村-木构接待厅.jpg`,
  theatre: `${IMG}云舍村-古戏楼.jpg`,
  bamboo: `${IMG}云舍村-竹林小径.jpg`,
  farming: `${IMG}云舍村-稻田耕牛.jpg`,
  duckField: `${IMG}云舍村-稻田鸭群.png`,
  stonePath: `${IMG}云舍村-青石板古道.jpg`,
  courtyard: `${IMG}云舍村-苔藓院落.webp`,
  scenery2: `${IMG}云舍村-村落风景-02.webp`,
  scenery3: `${IMG}云舍村-村落风景-03.webp`,
  scenery5: `${IMG}云舍村-村落风景-05.webp`,
};

const START_DATE = '2026-09-18';
const END_DATE = '2027-12-31';

const COURSE_NOTE = '最低开课人数为3人；如需单人开课，按3人班的75%付费。本价格为借宿归客价（498元/人/天）；外客价格为1280元/人/天（含2个餐），请联系管家预约。';
const folkNote = (price) => `云舍村借宿归客村俗体验项目。入住期间村落游历及村俗体验项目可任选其二，超过2项起按本价格付费（${price}元/项/人，儿童半价）。需提前8小时预约，具体时段由管家安排。`;

const course = (code, title, intro, cover, sortOrder) => ({
  activityCode: `YUNSHE-COURSE-${code}`,
  title,
  description: `${intro}${COURSE_NOTE}`,
  price: 498,
  coverImage: cover,
  images: JSON.stringify([cover]),
  location: '云舍村',
  category: '付费课程',
  sortOrder,
});

const folk = (code, title, price, cover, sortOrder, location = '云舍村', extra = '') => ({
  activityCode: `YUNSHE-FOLK-${code}`,
  title,
  description: `${extra}${folkNote(price)}`,
  price,
  coverImage: cover,
  images: JSON.stringify([cover]),
  location,
  category: '村俗体验',
  sortOrder,
});

const activities = [
  course('GUQIN', '琴风雅韵·古琴课程', '付费课程体验项目：琴风雅韵（古琴）。', img.salon, 100),
  course('HEXIANG', '传世香韵·合香珠课程', '付费课程体验项目：传世香韵（合香珠）。', img.study, 101),
  course('CHAYI', '静品茶韵·茶艺课程', '付费课程体验项目：静品茶韵（茶艺）。', img.reception, 102),

  folk('QIUSHOU', '秋收', 298, img.farming, 110),
  folk('ZHIXIANG', '百香谷制香文化课程', 298, img.study, 111, '百香谷'),
  folk('CIXIU', '桃源绣娘刺绣课程', 298, img.salon, 112, '博物苑'),
  folk('YINLIAO', '古法音疗', 298, img.courtyard, 113),
  folk('YUJIA', '森林瑜珈', 298, img.bamboo, 114, '疗愈空间'),
  folk('CHADAO', '茶道课程', 298, img.reception, 115),
  folk('HUADAO', '花道课程', 298, img.scenery2, 116),
  folk('SHUFA', '书法课程', 298, img.study, 117, '书屋'),

  folk('CUNSHI', '作坊村食制作', 198, img.scenery3, 120, '作坊'),
  folk('CAICHA', '采茶制茶（季节性）', 198, img.scenery5, 121),
  folk('ZHUTING', '竹亭品茶赏乐', 198, img.bamboo, 122),
  folk('CHAOJING', '抄经赏箫', 198, img.study, 123, '书屋'),
  folk('SHOUGONG', '非遗小手工', 198, img.salon, 124),
  folk('CHANHUA', '缠花体验', 198, img.theatre, 125),
  folk('BADUANJIN', '八段锦', 198, img.stonePath, 126),
  folk('QIPAI', '棋牌乐', 198, img.courtyard, 127),
];

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const prisma = new PrismaClient();
  try {
    let created = 0;
    let updated = 0;
    for (const a of activities) {
      const data = { ...a, startDate: START_DATE, endDate: END_DATE, status: 1 };
      const existing = await prisma.activity.findUnique({ where: { activityCode: a.activityCode } });
      if (existing) updated++;
      else created++;
      console.log(`${existing ? '更新' : '新建'} ${a.activityCode} ${a.title} ${a.price}元`);
      if (dryRun) continue;
      await prisma.activity.upsert({ where: { activityCode: a.activityCode }, update: data, create: data });
    }
    console.log(`${dryRun ? '[演练，未写入] ' : ''}共 ${activities.length} 项：新建 ${created}，更新 ${updated}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
