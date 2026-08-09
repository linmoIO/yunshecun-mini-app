'use strict';

const router = require('express').Router();
const { adminAuthMiddleware } = require('../middleware/auth');
const travelCtrl = require('../controllers/travel.controller');
const hotelCtrl = require('../controllers/hotel.controller');
const shopCtrl = require('../controllers/shop.controller');
const activityCtrl = require('../controllers/activity.controller');
const serviceCtrl = require('../controllers/service.controller');
const couponCtrl = require('../controllers/coupon.controller');
const contentCtrl = require('../controllers/content.controller');
const paymentCtrl = require('../controllers/payment.controller');
const { PrismaClient } = require('@prisma/client');
const { success, paginate } = require('../utils/response');

const prisma = new PrismaClient();

// 所有管理端接口需要管理员认证
router.use(adminAuthMiddleware);

// ---- 员工账号管理（仅超级管理员 admin 角色可操作）----
const bcryptStaff = require('bcryptjs');
const jwtStaff = require('jsonwebtoken');
const configStaff = require('../config');
const { PrismaClient: StaffPrisma } = require('@prisma/client');
const _sp = new StaffPrisma();

const PERM_LIST = ['travel', 'hotel', 'shop', 'activity', 'service', 'coupon', 'content', 'member', 'payment', 'invoice', 'diy', 'aftersales', 'reviews', 'chat', 'departures'];

function isSuperAdmin(req) { return req.admin && ['admin', 'superadmin'].includes(req.admin.role) && !req.admin.isStaff; }

// 获取员工列表
router.get('/staff', async (req, res) => {
  if (!isSuperAdmin(req)) return res.json({ code: -1, msg: '权限不足，仅超级管理员可操作' });
  const { pageNum = 1, pageSize = 20, keyword } = req.query;
  const where = keyword ? { OR: [{ name: { contains: keyword } }, { username: { contains: keyword } }] } : {};
  const [list, total] = await Promise.all([
    _sp.staff.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (Number(pageNum)-1)*Number(pageSize), take: Number(pageSize),
      select: { id: true, username: true, name: true, email: true, phone: true, role: true, permissions: true, status: true, lastLoginAt: true, createdAt: true } }),
    _sp.staff.count({ where }),
  ]);
  const parsed = list.map(s => ({ ...s, permissions: s.permissions ? JSON.parse(s.permissions) : [] }));
  return res.json({ code: 0, data: { list: parsed, total, pageNum: Number(pageNum), pageSize: Number(pageSize) } });
});

// 创建员工
router.post('/staff', async (req, res) => {
  if (!isSuperAdmin(req)) return res.json({ code: -1, msg: '权限不足，仅超级管理员可操作' });
  const { username, password, name, email, phone, role = 'staff', permissions = [] } = req.body;
  if (!username || !password || !name) return res.json({ code: -1, msg: '请填写用户名、密码和姓名' });
  const exists = await _sp.staff.findUnique({ where: { username } });
  if (exists) return res.json({ code: -1, msg: '用户名已存在' });
  const hashed = await bcryptStaff.hash(password, 10);
  const staff = await _sp.staff.create({ data: { username, password: hashed, name, email, phone, role, permissions: JSON.stringify(permissions), status: 1 } });
  return res.json({ code: 0, msg: '员工账号创建成功', data: { id: staff.id, username: staff.username, name: staff.name } });
});

// 更新员工（包含权限设置）
router.put('/staff/:id', async (req, res) => {
  if (!isSuperAdmin(req)) return res.json({ code: -1, msg: '权限不足，仅超级管理员可操作' });
  const id = Number(req.params.id);
  const { name, email, phone, role, permissions, status, password } = req.body;
  const data = {};
  if (name !== undefined) data.name = name;
  if (email !== undefined) data.email = email;
  if (phone !== undefined) data.phone = phone;
  if (role !== undefined) data.role = role;
  if (permissions !== undefined) data.permissions = JSON.stringify(permissions);
  if (status !== undefined) data.status = Number(status);
  if (password) data.password = await bcryptStaff.hash(password, 10);
  const staff = await _sp.staff.update({ where: { id }, data });
  return res.json({ code: 0, msg: '更新成功', data: { id: staff.id, name: staff.name, status: staff.status } });
});

// 删除员工
router.delete('/staff/:id', async (req, res) => {
  if (!isSuperAdmin(req)) return res.json({ code: -1, msg: '权限不足，仅超级管理员可操作' });
  await _sp.staff.delete({ where: { id: Number(req.params.id) } });
  return res.json({ code: 0, msg: '员工账号已删除' });
});

// 获取权限列表（前端用于展示权限选项）
router.get('/staff/permissions', (req, res) => {
  return res.json({ code: 0, data: { permissions: PERM_LIST } });
});

// ---- 管理员修改自身账号信息（超级管理员或员工均可改自己的密码） ----
router.get('/me', (req, res) => {
  // 返回当前登录者信息（不含密码）
  if (req.admin.isStaff) {
    _sp.staff.findUnique({ where: { id: req.admin.id }, select: { id: true, username: true, name: true, email: true, phone: true, role: true, permissions: true, status: true } })
      .then(s => {
        if (!s) return res.json({ code: -1, msg: '账号不存在' });
        return res.json({ code: 0, data: { ...s, isStaff: true, permissions: s.permissions ? JSON.parse(s.permissions) : [] } });
      });
  } else {
    prisma.adminUser.findUnique({ where: { id: req.admin.id }, select: { id: true, username: true, name: true, email: true, role: true } })
      .then(a => {
        if (!a) return res.json({ code: -1, msg: '账号不存在' });
        return res.json({ code: 0, data: { ...a, isStaff: false } });
      });
  }
});

router.post('/change-password', async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.json({ code: -1, msg: '请填写旧密码和新密码' });
  if (newPassword.length < 6) return res.json({ code: -1, msg: '新密码至少6位' });

  if (req.admin.isStaff) {
    const staff = await _sp.staff.findUnique({ where: { id: req.admin.id } });
    if (!staff) return res.json({ code: -1, msg: '账号不存在' });
    const valid = await bcryptStaff.compare(oldPassword, staff.password);
    if (!valid) return res.json({ code: -1, msg: '旧密码错误' });
    await _sp.staff.update({ where: { id: req.admin.id }, data: { password: await bcryptStaff.hash(newPassword, 10) } });
  } else {
    const admin = await prisma.adminUser.findUnique({ where: { id: req.admin.id } });
    if (!admin) return res.json({ code: -1, msg: '账号不存在' });
    const valid = await bcryptStaff.compare(oldPassword, admin.password);
    if (!valid) return res.json({ code: -1, msg: '旧密码错误' });
    await prisma.adminUser.update({ where: { id: req.admin.id }, data: { password: await bcryptStaff.hash(newPassword, 10) } });
  }
  return res.json({ code: 0, msg: '密码修改成功，请重新登录' });
});

router.post('/change-username', async (req, res) => {
  if (req.admin.isStaff) return res.json({ code: -1, msg: '员工账号请联系管理员修改用户名' });
  const { newUsername, password } = req.body;
  if (!newUsername || !password) return res.json({ code: -1, msg: '请填写新用户名和当前密码' });
  const admin = await prisma.adminUser.findUnique({ where: { id: req.admin.id } });
  if (!admin) return res.json({ code: -1, msg: '账号不存在' });
  const valid = await bcryptStaff.compare(password, admin.password);
  if (!valid) return res.json({ code: -1, msg: '密码验证失败' });
  const exists = await prisma.adminUser.findUnique({ where: { username: newUsername } });
  if (exists && exists.id !== req.admin.id) return res.json({ code: -1, msg: '用户名已被使用' });
  await prisma.adminUser.update({ where: { id: req.admin.id }, data: { username: newUsername } });
  return res.json({ code: 0, msg: '用户名修改成功，请重新登录' });
});

// ---- 旅游产品管理 ----
router.get('/travel/products', travelCtrl.adminListProducts);
router.get('/travel/products/:id', travelCtrl.adminGetProduct);
router.post('/travel/products', travelCtrl.adminCreateProduct);
router.put('/travel/products/:id', travelCtrl.adminUpdateProduct);
router.delete('/travel/products/:id', travelCtrl.adminDeleteProduct);
router.put('/travel/products/:id/media', travelCtrl.adminUpdateProductMedia);
router.get('/travel/orders', travelCtrl.adminListOrders);
router.put('/travel/orders/status', travelCtrl.adminUpdateOrderStatus);

// ---- 酒店管理 ----（固定路径必须在 /:id 前面）
router.get('/hotels', hotelCtrl.adminListHotels);
router.post('/hotels', hotelCtrl.adminCreateHotel);
router.get('/hotels/orders', hotelCtrl.adminListOrders);
router.put('/hotels/orders/status', hotelCtrl.adminUpdateOrderStatus);
router.post('/hotels/rooms', hotelCtrl.adminCreateRoomType);
router.put('/hotels/rooms/:id', hotelCtrl.adminUpdateRoomType);
router.delete('/hotels/rooms/:id', hotelCtrl.adminDeleteRoomType);
router.get('/hotels/:id/rooms', hotelCtrl.adminListRoomTypes);
router.get('/hotels/:id', hotelCtrl.adminGetHotel);
router.put('/hotels/:id', hotelCtrl.adminUpdateHotel);
router.delete('/hotels/:id', hotelCtrl.adminDeleteHotel);
router.put('/hotels/:id/media', hotelCtrl.adminUpdateHotelMedia);

// ---- 商城管理 ----
router.get('/shop/products', shopCtrl.adminListProducts);
router.post('/shop/products', shopCtrl.adminCreateProduct);
router.put('/shop/products/:id', shopCtrl.adminUpdateProduct);
router.delete('/shop/products/:id', shopCtrl.adminDeleteProduct);
router.get('/shop/orders', shopCtrl.adminListOrders);
router.put('/shop/orders/status', shopCtrl.adminUpdateOrderStatus);

// ---- 活动管理 ----
router.get('/activities', activityCtrl.adminListActivities);
router.post('/activities', activityCtrl.adminCreateActivity);
router.get('/activities/orders', activityCtrl.adminListOrders);
router.get('/activities/:id', async (req, res) => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const a = await prisma.activity.findUnique({ where: { id: Number(req.params.id) } });
  if (!a) return res.json({ code: -1, msg: '不存在' });
  const { success } = require('../utils/response');
  return success(res, { ...a, images: a.images ? JSON.parse(a.images) : [] });
});
router.put('/activities/:id', activityCtrl.adminUpdateActivity);
router.delete('/activities/:id', activityCtrl.adminDeleteActivity);
router.put('/activities/:id/media', activityCtrl.adminUpdateActivityMedia);

// ---- 服务管理 ----
router.get('/services', serviceCtrl.adminListServices);
router.post('/services', serviceCtrl.adminCreateService);
router.put('/services/:id', serviceCtrl.adminUpdateService);
router.delete('/services/:id', serviceCtrl.adminDeleteService);
router.get('/services/orders', serviceCtrl.adminListServiceOrders);
router.put('/services/orders/status', serviceCtrl.adminUpdateServiceOrderStatus);

// ---- 优惠券管理 ----
router.get('/coupons', couponCtrl.adminListCoupons);
router.post('/coupons', couponCtrl.adminCreateCoupon);
router.put('/coupons/:id', couponCtrl.adminUpdateCoupon);
router.delete('/coupons/:id', couponCtrl.adminDeleteCoupon);
router.post('/coupons/issue', couponCtrl.adminIssueCoupon);

// ---- 内容管理 ----
router.get('/banners', contentCtrl.adminListBanners);
router.post('/banners', contentCtrl.adminCreateBanner);
router.put('/banners/:id', contentCtrl.adminUpdateBanner);
router.delete('/banners/:id', contentCtrl.adminDeleteBanner);

router.get('/pages', contentCtrl.adminListPages);
router.post('/pages', contentCtrl.adminCreatePage);
router.put('/pages/:id', contentCtrl.adminUpdatePage);
router.delete('/pages/:id', contentCtrl.adminDeletePage);

router.get('/sys-config', contentCtrl.adminGetSysConfigs);
router.post('/sys-config', contentCtrl.adminSetSysConfig);

// ---- 套餐出发日期管理（旅游/酒店库存控制）----
router.get('/departures', async (req, res) => {
  const { productCode, pageNum = 1, pageSize = 20 } = req.query;
  const where = productCode ? { productCode } : {};
  const [list, total] = await Promise.all([
    prisma.travelDeparture.findMany({ where, orderBy: { departDate: 'asc' }, skip: (Number(pageNum)-1)*Number(pageSize), take: Number(pageSize) }),
    prisma.travelDeparture.count({ where }),
  ]);
  return success(res, { list, total });
});
router.post('/departures', async (req, res) => {
  const { productId, productCode, departDate, endDate, price, stock, remark, status } = req.body;
  if (!productCode || !departDate) return res.json({ code: -1, msg: '请提供产品编码和出发日期' });
  const d = await prisma.travelDeparture.create({
    data: { productId: Number(productId) || 0, productCode, departDate, endDate: endDate || departDate, price: Number(price) || 0, stock: Number(stock) || 10, remark, status: status !== undefined ? Number(status) : 1 }
  });
  return success(res, d);
});
router.put('/departures/:id', async (req, res) => {
  const { departDate, endDate, price, stock, remark, status } = req.body;
  const d = await prisma.travelDeparture.update({
    where: { id: Number(req.params.id) },
    data: { departDate, endDate, price: Number(price) || 0, stock: Number(stock) || 10, remark, status: Number(status) }
  });
  return success(res, d);
});
router.delete('/departures/:id', async (req, res) => {
  await prisma.travelDeparture.delete({ where: { id: Number(req.params.id) } });
  return success(res, null, '删除成功');
});

// ---- 目的地线路系列管理 ----
const DEFAULT_SERIES = [
  { productSeriesName: '桃花源·云舍村', productSeriesCode: 'taoyuan' },
];

router.get('/date-inventory', async (req, res) => {
  const { type, targetId, targetCode, pageNum = 1, pageSize = 50 } = req.query;
  const where = {};
  if (type) where.type = String(type);
  if (targetId) where.targetId = Number(targetId);
  if (targetCode) where.targetCode = String(targetCode);
  const [list, total] = await Promise.all([
    prisma.dateInventory.findMany({ where, orderBy: [{ date: 'asc' }, { id: 'asc' }], skip: (Number(pageNum) - 1) * Number(pageSize), take: Number(pageSize) }),
    prisma.dateInventory.count({ where }),
  ]);
  return success(res, { list, total });
});

router.post('/date-inventory', async (req, res) => {
  const { type, targetId, targetCode, date, endDate, price, stock, remark, status } = req.body || {};
  if (!type || !targetId || !date) return res.json({ code: -1, msg: '缺少库存类型、对象或日期' });
  const data = { type, targetId: Number(targetId), targetCode: targetCode || '', date, endDate: endDate || date, price: price === '' || price === undefined ? null : Number(price), stock: Number(stock) || 0, remark, status: status !== undefined ? Number(status) : 1 };
  const item = await prisma.dateInventory.upsert({ where: { type_targetId_date: { type: data.type, targetId: data.targetId, date: data.date } }, update: data, create: data });
  return success(res, item);
});

router.put('/date-inventory/:id', async (req, res) => {
  const { date, endDate, price, stock, remark, status } = req.body || {};
  const item = await prisma.dateInventory.update({ where: { id: Number(req.params.id) }, data: { ...(date !== undefined && { date }), ...(endDate !== undefined && { endDate: endDate || date }), ...(price !== undefined && { price: price === '' ? null : Number(price) }), ...(stock !== undefined && { stock: Number(stock) || 0 }), ...(remark !== undefined && { remark }), ...(status !== undefined && { status: Number(status) }) } });
  return success(res, item);
});

router.delete('/date-inventory/:id', async (req, res) => {
  await prisma.dateInventory.delete({ where: { id: Number(req.params.id) } });
  return success(res, null, '删除成功');
});

router.get('/destinations/series', async (req, res) => {
  const cfg = await prisma.sysConfig.findFirst({ where: { key: 'destinations_series' } });
  const series = cfg?.value ? JSON.parse(cfg.value) : DEFAULT_SERIES;
  return success(res, series);
});
router.post('/destinations/series', async (req, res) => {
  const { series } = req.body; // [{productSeriesName, productSeriesCode}]
  if (!Array.isArray(series)) return res.json({ code: -1, msg: '格式错误' });
  await prisma.sysConfig.upsert({
    where: { key: 'destinations_series' },
    update: { value: JSON.stringify(series), description: '全部目的地线路系列配置' },
    create: { key: 'destinations_series', value: JSON.stringify(series), description: '全部目的地线路系列配置' },
  });
  return success(res, series, '保存成功');
});
// 查询某条线路下的产品
router.get('/destinations/products', async (req, res) => {
  const { seriesCode, pageNum = 1, pageSize = 20, category } = req.query;
  const where = { status: 1 };
  if (seriesCode) where.destination = seriesCode;
  if (category) where.category = category;
  const [list, total] = await Promise.all([
    prisma.travelProduct.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.travelProduct.count({ where }),
  ]);
  return success(res, { list, total });
});

// ---- 支付管理 ----
router.get('/payments', paymentCtrl.adminListPayments);
router.post('/payments/refund', paymentCtrl.refund);

// ---- 会员管理 ----
router.get('/members', async (req, res) => {
  const { pageNum = 1, pageSize = 20, keyword, cardLevel } = req.query;
  const where = {};
  if (keyword) where.OR = [{ nickname: { contains: keyword } }, { phone: { contains: keyword } }, { realName: { contains: keyword } }];
  if (cardLevel) where.cardLevel = cardLevel;

  const [list, total] = await Promise.all([
    prisma.member.findMany({
      where,
      select: { id: true, memberId: true, nickname: true, phone: true, email: true, realName: true,
        avatar: true, cardLevel: true, cardNo: true, points: true, balance: true, status: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.member.count({ where }),
  ]);
  return paginate(res, list, total, pageNum, pageSize);
});

router.get('/members/:id', async (req, res) => {
  const member = await prisma.member.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      travelOrders: { take: 5, orderBy: { createdAt: 'desc' } },
      hotelOrders: { take: 5, orderBy: { createdAt: 'desc' } },
      shopOrders: { take: 5, orderBy: { createdAt: 'desc' } },
    },
  });
  if (!member) return res.json({ code: -1, msg: '会员不存在' });
  return success(res, member);
});

router.put('/members/:id', async (req, res) => {
  const { nickname, avatar, realName, gender, birthday, email, cardLevel, points, balance, status } = req.body;
  const member = await prisma.member.update({
    where: { id: Number(req.params.id) },
    data: { nickname, avatar, realName, gender, birthday, email, cardLevel,
      ...(points !== undefined && { points: Number(points) }),
      ...(balance !== undefined && { balance: Number(balance) }),
      ...(status !== undefined && { status: Number(status) }),
    },
  });
  return success(res, member);
});

// 仪表板统计
router.get('/dashboard', async (req, res) => {
  const [
    totalMembers, totalTravelOrders, totalHotelOrders, totalShopOrders,
    pendingTravelOrders, pendingHotelOrders, pendingShopOrders,
    totalPayments,
  ] = await Promise.all([
    prisma.member.count(),
    prisma.travelOrder.count(),
    prisma.hotelOrder.count(),
    prisma.shopOrder.count(),
    prisma.travelOrder.count({ where: { status: 'pending' } }),
    prisma.hotelOrder.count({ where: { status: 'pending' } }),
    prisma.shopOrder.count({ where: { status: 'pending' } }),
    prisma.payment.aggregate({ where: { status: 'success' }, _sum: { amount: true } }),
  ]);

  return success(res, {
    members: { total: totalMembers },
    orders: {
      travel: { total: totalTravelOrders, pending: pendingTravelOrders },
      hotel: { total: totalHotelOrders, pending: pendingHotelOrders },
      shop: { total: totalShopOrders, pending: pendingShopOrders },
    },
    revenue: { total: totalPayments._sum.amount || 0 },
  });
});

// ---- 开票申请管理 ----
router.get('/invoice/requests', async (req, res) => {
  const { pageNum = 1, pageSize = 20, status } = req.query;
  const where = status ? { status } : {};
  const [list, total] = await Promise.all([
    prisma.invoiceRequest.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (Number(pageNum)-1)*Number(pageSize), take: Number(pageSize) }),
    prisma.invoiceRequest.count({ where }),
  ]);
  return success(res, { list, total });
});

router.put('/invoice/requests/:id', async (req, res) => {
  const { status, rejectReason, adminNote, invoiceImages } = req.body;
  const r = await prisma.invoiceRequest.update({ where: { id: Number(req.params.id) }, data: {
    ...(status && { status }),
    ...(rejectReason !== undefined && { rejectReason }),
    ...(adminNote !== undefined && { adminNote }),
    ...(invoiceImages !== undefined && { invoiceImages }),
  }});
  return success(res, r);
});

// ---- DIY 定制行程管理 ----
router.get('/diy/requests', async (req, res) => {
  const { pageNum = 1, pageSize = 20, status } = req.query;
  const where = status ? { status } : {};
  const [list, total] = await Promise.all([
    prisma.diyTripRequest.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (Number(pageNum)-1)*Number(pageSize), take: Number(pageSize) }),
    prisma.diyTripRequest.count({ where }),
  ]);
  return success(res, { list, total });
});

router.put('/diy/requests/:id', async (req, res) => {
  const { status, adminNote, responsePlan, responseImages } = req.body;
  const r = await prisma.diyTripRequest.update({ where: { id: Number(req.params.id) }, data: {
    ...(status && { status }),
    ...(adminNote !== undefined && { adminNote }),
    ...(responsePlan !== undefined && { responsePlan }),
    ...(responseImages !== undefined && { responseImages }),
  }});
  return success(res, r);
});

// ---- 导航栏 Logo 配置 ----
router.get('/nav-config', async (req, res) => {
  const cfg = await prisma.sysConfig.findFirst({ where: { key: 'nav_logo_center' } });
  return success(res, { logoUrl: cfg?.value || '' });
});

router.put('/nav-config', async (req, res) => {
  const { logoUrl } = req.body;
  await prisma.sysConfig.upsert({ where: { key: 'nav_logo_center' }, update: { value: logoUrl }, create: { key: 'nav_logo_center', value: logoUrl, description: '导航栏中间大按钮Logo' } });
  return success(res, null, '保存成功');
});

module.exports = router;
