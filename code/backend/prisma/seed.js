'use strict';

require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

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

  // 创建示例酒店
  const hotel = await prisma.hotel.upsert({
    where: { hotelCode: 'YSC001' },
    update: {},
    create: {
      hotelCode: 'YSC001',
      hotelGroupCode: 'SONGTSAM',
      name: '云舍村·香格里拉',
      address: '云南省迪庆藏族自治州香格里拉市',
      city: '香格里拉',
      province: '云南',
      phone: '0887-8888888',
      description: '坐落于香格里拉古城旁，享有壮丽的雪山美景，是体验藏族文化的绝佳之地。',
      coverImage: 'https://yunshecun.oss-cn-guangzhou.aliyuncs.com/hotel/yscxgl_cover.jpg',
      starLevel: 5,
      checkInTime: '15:00',
      checkOutTime: '12:00',
      status: 1,
      sortOrder: 1,
    },
  });
  console.log('✓ 示例酒店已创建');

  // 创建房型
  await prisma.roomType.upsert({
    where: { id: 1 },
    update: {},
    create: {
      hotelId: hotel.id,
      roomCode: 'DLXKING',
      name: '豪华大床房',
      description: '180平方米宽敞空间，尽揽雪山全景',
      price: 1980,
      originalPrice: 2380,
      area: 180,
      bedType: '大床',
      capacity: 2,
      status: 1,
    },
  });
  console.log('✓ 示例房型已创建');

  // 创建示例旅游产品
  await prisma.travelProduct.upsert({
    where: { productCode: 'TRAVEL001' },
    update: {},
    create: {
      productCode: 'TRAVEL001',
      title: '云南香格里拉 5 日精品之旅',
      subtitle: '探秘藏文化·雪山·草甸',
      description: '深度体验香格里拉的原始之美，感受藏族文化的神秘魅力',
      price: 6800,
      originalPrice: 8800,
      coverImage: 'https://yunshecun.oss-cn-guangzhou.aliyuncs.com/travel/xgl5d_cover.jpg',
      category: '精品旅行',
      destination: '香格里拉',
      duration: 5,
      minPersons: 2,
      maxPersons: 12,
      tags: JSON.stringify(['精品小团', '全程无购物', '豪华住宿']),
      status: 1,
      sortOrder: 1,
    },
  });
  console.log('✓ 示例旅游产品已创建');

  // 创建示例活动
  await prisma.activity.upsert({
    where: { activityCode: 'ACT001' },
    update: {},
    create: {
      activityCode: 'ACT001',
      title: '香格里拉骑马体验',
      description: '在广袤的草原上策马奔腾，感受自由与野性之美',
      price: 380,
      originalPrice: 480,
      location: '普达措国家公园附近',
      category: '户外体验',
      status: 1,
      sortOrder: 1,
    },
  });
  console.log('✓ 示例活动已创建');

  // 创建示例 Banner
  await prisma.banner.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: '云舍村·香格里拉开业特惠',
      imageUrl: 'https://yunshecun.oss-cn-guangzhou.aliyuncs.com/banner/home_banner1.jpg',
      linkType: 'product',
      position: 'home',
      sortOrder: 1,
      status: 1,
    },
  });
  console.log('✓ 示例 Banner 已创建');

  // 创建系统配置
  const configs = [
    { key: 'search_hot_words', value: JSON.stringify(['香格里拉', '云南精品游', '藏式酒店', '休闲度假', '亲子游']), description: '搜索热词' },
    { key: 'hotel_group_name', value: '云舍村', description: '酒店集团名称' },
    { key: 'customer_service_phone', value: '400-888-8888', description: '客服电话' },
    { key: 'points_exchange_rate', value: '100', description: '积分兑换比例（100积分=1元）' },
  ];
  for (const c of configs) {
    await prisma.sysConfig.upsert({ where: { key: c.key }, update: { value: c.value }, create: c });
  }
  console.log('✓ 系统配置已创建');

  // 创建示例优惠券
  await prisma.coupon.upsert({
    where: { couponCode: 'WELCOME100' },
    update: {},
    create: {
      couponCode: 'WELCOME100',
      name: '新会员优惠券',
      description: '新会员首单立减100元',
      type: 'cash',
      discountAmount: 100,
      minAmount: 500,
      totalCount: 1000,
      status: 1,
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });
  console.log('✓ 示例优惠券已创建');

  // 创建酒店服务
  const services = [
    { serviceCode: 'SVC_CLEAN', name: '客房清洁', type: 'cleanup', icon: 'clean', price: 0 },
    { serviceCode: 'SVC_BORROW', name: '物品借用', type: 'borrowing', icon: 'borrow', price: 0 },
    { serviceCode: 'SVC_PURCHASE', name: '代购服务', type: 'purchase', icon: 'purchase', price: 0 },
    { serviceCode: 'SVC_FEEDBACK', name: '意见反馈', type: 'suggestion', icon: 'feedback', price: 0 },
  ];
  for (const s of services) {
    await prisma.hotelService.upsert({
      where: { serviceCode: s.serviceCode },
      update: {},
      create: { ...s, hotelId: hotel.id, status: 1 },
    });
  }
  console.log('✓ 酒店服务已创建');

  console.log('\n✅ 数据初始化完成！');
  console.log('\n管理员账号信息:');
  console.log(`  用户名: ${process.env.ADMIN_DEFAULT_USERNAME || 'admin'}`);
  console.log(`  密码: ${process.env.ADMIN_DEFAULT_PASSWORD || 'admin123456'}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
