'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/travel.controller');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

// 公开接口
router.post('/shopapi/sz/travelProductList', optionalAuth, ctrl.getTravelProductList);
router.get('/shopapi/marketingActivity/listMarketingProducts', optionalAuth, ctrl.getTravelProductList);
router.post('/shopapi/marketingActivity/listMarketingProductsByCodes', optionalAuth, ctrl.getTravelProductList);
router.post('/shopapi/sz/marketingActivityPage', optionalAuth, ctrl.getTravelProductList);
router.post('/shopapi/marketingActivityPage/listTravelDictionary', (req, res) => res.json({ code: 0, data: [] }));
router.get('/shopapi/sz/queryProductsByMarketingTags.json', optionalAuth, ctrl.getTravelProductList);
router.get('/shopapi/sz/queryMarketingPageTags.json', (req, res) => res.json({ code: 0, data: [] }));
router.get('/shopapi/marketingActivity/tripAssistantRecommendation', optionalAuth, tripRecommendFeed);
router.post('/shopapi/marketingActivity/tripAssistantRecommendation', optionalAuth, tripRecommendFeed);

async function tripRecommendFeed(req, res) {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const { curPage = 1, pageSize = 8, isRecommendDayActivity } = { ...(req.body || {}), ...(req.query || {}) };
  const skip = (Number(curPage) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  // 取旅游产品 + 活动，混合返回
  const [travels, activities] = await Promise.all([
    prisma.travelProduct.findMany({ where: { status: 1 }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }], skip, take: Math.ceil(limit * 0.7) }),
    prisma.activity.findMany({ where: { status: 1 }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }], skip, take: Math.ceil(limit * 0.3) }),
  ]);
  await prisma.$disconnect();

  const CATEGORY_TO_TYPE = { Travel:'travel', DestPackage:'travel', ExchangeCoupon:'tdq', Hotel:'hotel', DayActivity:'daily' };

  const travelItems = travels.map(p => {
    const categorySub = p.category || 'Travel';
    const code = p.productCode || String(p.id);
    return {
      id: code, goodsId: code, travelType: code,
      title: p.title, pics: p.coverImage || '',
      secondTitle: p.description || '',
      productType: CATEGORY_TO_TYPE[categorySub] || 'travel', categorySub,
      minPriceDto: { payType: 'CASH', price: p.price || 0 },
      specificationsType: 'PEOPLE', skuFlag: true,
      numberOfPreviews: Math.floor(Math.random() * 500 + 100),
      element: 'travel',
    };
  });

  const activityItems = activities.map(a => {
    const code = a.activityCode || String(a.id);
    return {
      id: code, goodsId: code, activityCode: code,
      title: a.title, pics: a.coverImage || '',
      secondTitle: a.description || '',
      productType: 'daily', categorySub: 'DayActivity',
      minPriceDto: { payType: 'CASH', price: a.price || 0 },
      skuFlag: true,
      numberOfPreviews: Math.floor(Math.random() * 300 + 50),
      element: 'activity',
    };
  });

  // 交叉混合排列
  const datas = [], tLen = travelItems.length, aLen = activityItems.length;
  for (let i = 0; i < Math.max(tLen, aLen); i++) {
    if (i < tLen) datas.push(travelItems[i]);
    if (i < aLen) datas.push(activityItems[i]);
  }

  // services/request.js 检查 n.success，必须有才能 resolve
  return res.json({ code: 0, result: 0, msg: 'success', success: true, retVal: { datas: datas.slice(0, limit), hasMore: datas.length >= limit } });
}
router.get('/shopapi/sz/shopGoodsPage', optionalAuth, ctrl.getTravelProductList);

// ---- 目的地页面接口（destinations.js 调用）----
const { PrismaClient: _DestPrisma } = require('@prisma/client');
const _destPrisma = new _DestPrisma();

// OSS 图片缩略：最长边限制为 w 像素，避免大图传到小程序卡顿
function ossThumb(url, w = 800) {
  if (!url || !url.includes('oss-cn')) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}x-oss-process=image/resize,m_lfit,w_${w}/quality,q_80`;
}

// 导航 Tab：按产品类型划分（不再按地理线路）
const TYPE_TABS = [
  { productSeriesName: '全部', productSeriesCode: 'all' },
  { productSeriesName: '旅游产品', productSeriesCode: 'travel' },
  { productSeriesName: '酒店', productSeriesCode: 'hotel' },
  { productSeriesName: '活动', productSeriesCode: 'activity' },
];

router.get('/shop-api/productShelfApp/getProductShelfConfigApp', optionalAuth, (req, res) => {
  return res.json({ code: 0, result: 0, msg: 'success', retVal: TYPE_TABS, success: true, data: TYPE_TABS });
});

// 产品列表：旅游/酒店/活动混合，按 productSeriesCode(tab) 筛选类型
router.post('/shop-api/productShelfApp/getProductShelfInfoList', optionalAuth, async (req, res) => {
  const { productSeriesCode } = { ...(req.body || {}), ...(req.query || {}) };
  const tab = (productSeriesCode || 'all').toLowerCase();

  const [travels, hotels, activities] = await Promise.all([
    // 旅游产品
    (tab === 'all' || tab === 'travel')
      ? _destPrisma.travelProduct.findMany({ where: { status: 1 }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] })
      : [],
    // 酒店（含最低房型价格）
    (tab === 'all' || tab === 'hotel')
      ? _destPrisma.hotel.findMany({ where: { status: 1 }, include: { roomTypes: { where: { status: 1 }, orderBy: { price: 'asc' }, take: 1 } }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] })
      : [],
    // 活动
    (tab === 'all' || tab === 'activity')
      ? _destPrisma.activity.findMany({ where: { status: 1 }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] })
      : [],
  ]);

  const items = [
    // 旅游产品
    ...travels.map(p => ({
      productId: p.productCode || String(p.id),
      travelType: p.productCode || String(p.id),
      productType: p.category === 'DayActivity' ? 'daily' : 'travel',
      categorySub: p.category || 'Travel',
      title: p.title,
      secondTitle: p.subtitle || p.description || '',
      pics: ossThumb(p.coverImage || ''),
      tagApiDtos: (() => { try { return p.tags ? JSON.parse(p.tags).map(t => ({ tageDesc: t })) : []; } catch { return []; } })(),
      specificationsType: 'PEOPLE',
      skuFlag: true,
      minPriceDto: { payType: 'CASH', price: p.price || 0 },
    })),
    // 酒店
    ...hotels.map(h => {
      const minPrice = h.roomTypes?.[0]?.price ?? 0;
      return {
        productId: h.hotelCode,
        travelType: h.hotelCode,
        productType: 'hotel',
        categorySub: 'Hotel',
        title: h.name,
        secondTitle: h.address || h.city || '',
        pics: ossThumb(h.coverImage || ''),
        tagApiDtos: [{ tageDesc: '酒店' }],
        specificationsType: 'PEOPLE',
        skuFlag: true,
        roomAvailable: 'true',
        minPriceDto: { payType: 'CASH', price: minPrice },
      };
    }),
    // 活动
    ...activities.map(a => ({
      productId: a.activityCode || String(a.id),
      travelType: a.activityCode || String(a.id),
      productType: 'daily',
      categorySub: 'DayActivity',
      title: a.title,
      secondTitle: a.description || '',
      pics: ossThumb(a.coverImage || ''),
      tagApiDtos: [{ tageDesc: '活动' }],
      specificationsType: 'PEOPLE',
      skuFlag: true,
      minPriceDto: { payType: 'CASH', price: a.price || 0 },
    })),
  ];

  return res.json({ code: 0, result: 0, msg: 'success', retVal: items, success: true, data: items });
});

// 需要登录
router.post('/team/order/myTravelList', authMiddleware, ctrl.getMyTravelList);
// getOrderDetail 用 optionalAuth（支付页 orderNo 就是凭证，不需要严格 JWT 验证）
router.get('/travel/orderDetail', optionalAuth, ctrl.getOrderDetail);

// orderDetail.js 用：按 orderNo 查订单详情（旅游+酒店通用）
router.get('/travel/order-detail/:orderNo', optionalAuth, async (req, res) => {
  const { PrismaClient: _ODP } = require('@prisma/client');
  const { success: _ods, error: _ode } = require('../utils/response');
  const _odp = new _ODP();
  const orderNo = req.params.orderNo;
  try {
    const tOrder = await _odp.travelOrder.findFirst({ where: { orderNo }, include: { product: true } });
    if (tOrder) {
      await _odp.$disconnect();
      return _ods(res, {
        orderNo: tOrder.orderNo, type: 'travel', channel: 'freetravel',
        title: tOrder.product?.title || '旅游套餐',
        orderStaDesc: { pending:'待付款', paid:'待出行', confirmed:'待出行', completed:'已完成', cancelled:'已取消', refunded:'已退款' }[tOrder.status] || tOrder.status,
        price: tOrder.totalAmount, status: tOrder.status,
        contactName: tOrder.contactName, contactPhone: tOrder.contactPhone,
        startDate: tOrder.startDate, endDate: tOrder.endDate,
        persons: tOrder.persons, notes: tOrder.notes,
        createdAt: tOrder.createdAt, link: tOrder.product?.coverImage || '',
      });
    }
    const hOrder = await _odp.hotelOrder.findFirst({ where: { orderNo }, include: { hotel: true, roomType: true } });
    if (hOrder) {
      await _odp.$disconnect();
      return _ods(res, {
        orderNo: hOrder.orderNo, type: 'hotel', channel: 'room',
        title: hOrder.hotel?.name || '酒店订单',
        orderStaDesc: { pending:'待付款', paid:'待入住', confirmed:'待入住', completed:'已完成', cancelled:'已取消', refunded:'已退款' }[hOrder.status] || hOrder.status,
        price: hOrder.totalAmount, status: hOrder.status,
        contactName: hOrder.guestName, contactPhone: hOrder.guestPhone,
        checkIn: hOrder.checkIn, checkOut: hOrder.checkOut,
        nights: hOrder.nights, rooms: hOrder.rooms,
        notes: hOrder.notes, createdAt: hOrder.createdAt,
        link: hOrder.hotel?.coverImage || '', hotelCode: hOrder.hotel?.hotelCode || '',
      });
    }
    await _odp.$disconnect();
    return _ode(res, '订单不存在');
  } catch(err) {
    await _odp.$disconnect();
    return _ode(res, '查询失败：' + err.message);
  }
});

// 以下是旧的复杂 inline 中间件（已弃用，保留注释）
/*
router.get('/travel/orderDetail_old', async (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const cfg = require('../config');
  const { PrismaClient: _P } = require('@prisma/client');
  const _p2 = new _P();
  const token = req.headers['membertoken'] || req.headers['authorization']?.replace('Bearer ', '') || req.query?.memberToken;
  if (token) {
    try {
      const d = jwt.verify(token, cfg.jwt.secret);
      req.member = { id: d.id, memberId: d.memberId };
      await _p2.$disconnect(); return next();
    } catch {}
  }
  const memberId = req.query?.memberId || req.query?.memberNo;
  if (memberId) {
    const m = await _p2.member.findFirst({ where: { memberId } });
    if (m) { req.member = { id: m.id, memberId: m.memberId }; await _p2.$disconnect(); return next(); }
  }
  // 无法认证时仍允许访问（订单详情不需要严格保护，订单号本身就是凭证）
  req.member = { id: 0, memberId: '' };
  await _p2.$disconnect(); return next();
}, ctrl.getOrderDetail);
*/

// saveOrder：优先 JWT token，没有则用 body 里的 memberId 降级（前端 token 传在 header 但有时丢失）
router.post('/travel/saveOrder', async (req, res, next) => {
  const token = req.headers['membertoken'] || req.headers['authorization']?.replace('Bearer ', '') || req.body?.memberToken;
  if (token) {
    const jwt = require('jsonwebtoken');
    const cfg = require('../config');
    try {
      const decoded = jwt.verify(token, cfg.jwt.secret);
      req.member = { id: decoded.id, memberId: decoded.memberId };
      return next();
    } catch {}
  }
  // 降级：用 body 里的 memberId
  const { PrismaClient } = require('@prisma/client');
  const p = new PrismaClient();
  const memberId = req.body?.reserveOrderDto?.memberId || req.body?.reserveOrderDto?.memberNo || req.body?.memberId;
  if (memberId) {
    const m = await p.member.findFirst({ where: { memberId } });
    if (m) { req.member = { id: m.id, memberId: m.memberId }; await p.$disconnect(); return next(); }
  }
  await p.$disconnect();
  return res.json({ code: -1, msg: '未登录或登录已过期' });
}, ctrl.saveOrder);

// 系统选项（confirmOrder 加载房型描述等用）
router.get('/travel/getSysOptionsByCode', (req, res) => res.json({ code: 0, data: { value: '' } }));
router.get('/travel/orderQueryStatus', authMiddleware, ctrl.queryOrderStatus);

// 订单取消（待支付/已支付可取消）
router.post('/travel/cancelOrder', authMiddleware, ctrl.cancelOrder);
// 前端 confirmOrder.js 的 cancelOrder 路径兼容
router.get('/travel/cancelSingleActivityOrder', authMiddleware, (req, res) => {
  const { PrismaClient: _PC } = require('@prisma/client');
  const _pc = new _PC();
  const { orderNo } = req.query;
  _pc.travelOrder.findFirst({ where: { orderNo } }).then(async o => {
    if (o) await _pc.travelOrder.update({ where: { orderNo }, data: { status: 'cancelled' } });
    await _pc.$disconnect();
    res.json({ code: 0, result: 1, msg: '取消成功' });
  }).catch(async () => { await _pc.$disconnect(); res.json({ code: -1, msg: '取消失败' }); });
});

// 行程相关
router.get('/team/order/detail/:orderNo', authMiddleware, ctrl.getOrderDetail);
router.get('/team/order/listDriverButlerDto', authMiddleware, (req, res) => res.json({ code: 0, data: [] }));
router.get('/itinerary/plan/recommend/planList', authMiddleware, (req, res) => res.json({ code: 0, data: [] }));
router.get('/pagesTravelAssistant/tripAssistant', authMiddleware, (req, res) => res.json({ code: 0, data: {} }));

// ---- DIY 定制行程 ----
const { PrismaClient: _DiyPrisma } = require('@prisma/client');
const _diyPrisma = new _DiyPrisma();
const { success: _diyOk, error: _diyErr } = require('../utils/response');

// 前端提交定制需求（无需登录）
router.post('/diy/submit', optionalAuth, async (req, res) => {
  const { phone, name, destinations, startDate, duration, persons, budget, requirements } = req.body;
  if (!phone) return _diyErr(res, '请填写联系电话');
  const memberId = req.member?.memberId || null;
  const nickname = req.member?.nickname || name || null;
  const record = await _diyPrisma.diyTripRequest.create({
    data: { memberId, nickname, phone, name: name||null, destinations: destinations||null, startDate: startDate||null, duration: duration||null, persons: persons||null, budget: budget||null, requirements: requirements||null, status: 'new' },
  });
  return _diyOk(res, { id: record.id }, '提交成功，我们将尽快联系您');
});

// 用户查询自己的DIY需求（含后台回复方案）
router.get('/diy/my-requests', optionalAuth, async (req, res) => {
  const memberId = req.member?.memberId;
  const phone = req.query.phone || '';
  const where = {};
  if (memberId) where.memberId = memberId;
  else if (phone) where.phone = phone;
  else return _diyOk(res, { list: [] });
  const list = await _diyPrisma.diyTripRequest.findMany({ where, orderBy: { createdAt: 'desc' } });
  return _diyOk(res, { list });
});

// 别人怎么玩 - 参考DIY行程（完成状态的示例）
router.get('/diy/examples', async (req, res) => {
  const cfgRows = await _diyPrisma.sysConfig.findMany({ where: { key: { in: ['diy_example_plans', 'diy_example_default'] } } }).catch(() => []);
  const map = Object.fromEntries(cfgRows.map(r => [r.key, r.value]));
  let plans = [];
  if (map['diy_example_plans']) {
    try { plans = JSON.parse(map['diy_example_plans']); } catch {}
  }
  if (!plans.length) {
    // 默认示例
    plans = [
      { id: 'ex1', title: '云舍村归居两日', image: '', duration: '2天1晚', persons: '2人起', budget: '以预约确认信息为准', summary: '入住传统院落，漫游青石板路，在茶事与地方风味中感受村落日常。', tags: ['归居院落', '村落漫游', '地方风味'] },
      { id: 'ex2', title: '东方村落文化一日', image: '', duration: '1日', persons: '2-8人', budget: '以预约确认信息为准', summary: '围绕湖湘民居、桃源绣、擂茶和园林展开的村落文化体验。', tags: ['湖湘民居', '桃源绣', '擂茶'] },
      { id: 'ex3', title: '泛舟与农事体验', image: '', duration: '1日', persons: '2-4人', budget: '以预约确认信息为准', summary: '在自然水景与四季菜园之间，感受云舍村周边的慢生活。', tags: ['泛舟', '农事', '自然风光'] },
    ];
  }
  return _diyOk(res, { list: plans });
});

// 获取后台可配置的DIY行程介绍内容
router.get('/diy/config', async (req, res) => {
  const [contentCfg, titleCfg] = await Promise.all([
    _diyPrisma.sysConfig.findFirst({ where: { key: 'diy_trip_content' } }).catch(() => null),
    _diyPrisma.sysConfig.findFirst({ where: { key: 'diy_trip_title' } }).catch(() => null),
  ]);
  return res.json({ code: 0, data: { content: contentCfg?.value || '告诉我们您的到访时间、同行人数与偏好，我们将为您整理云舍村到访建议。', title: titleCfg?.value || '定制云舍村到访体验' } });
});

module.exports = router;
