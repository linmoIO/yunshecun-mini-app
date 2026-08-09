'use strict';

require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { seedYunsheContent } = require('./yunsheContent');

const prisma = new PrismaClient();

async function main() {
  console.log('开始初始化数据...');

  // 创建管理员
  const adminPassword = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD || 'admin123456', 10);
  await prisma.adminUser.upsert({
    where: { username: process.env.ADMIN_DEFAULT_USERNAME || 'admin' },
    update: {},
    create: {
      username: process.env.ADMIN_DEFAULT_USERNAME || 'admin',
      password: adminPassword,
      role: 'superadmin',
      name: '超级管理员',
      email: 'admin@yunshecun.com',
    },
  });
  console.log('✓ 管理员账号已创建');

  const summary = await seedYunsheContent(prisma);
  console.log(`✓ 已同步云舍村内容：${summary.pages} 个内容页、${summary.banners} 个轮播位`);
  console.log(`✓ 已同步演示目录：${summary.demoTravelProducts} 条旅游产品、${summary.demoHotels} 个酒店、${summary.demoRooms} 个房型、${summary.demoActivities} 条活动、${summary.demoShopProducts} 个商品`);

  console.log('\n✅ 云舍村内容初始化完成！');
  console.log('\n管理员账号信息:');
  console.log(`  用户名: ${process.env.ADMIN_DEFAULT_USERNAME || 'admin'}`);
  console.log(`  密码: ${process.env.ADMIN_DEFAULT_PASSWORD || 'admin123456'}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
