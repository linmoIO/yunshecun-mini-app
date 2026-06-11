'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/shop.controller');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

// 公开
router.get('/shop/listGoods.json', optionalAuth, ctrl.listGoods);
router.get('/shop/goodsDetail.json', optionalAuth, ctrl.goodsDetail);
router.get('/shop/goodsSku.json', optionalAuth, ctrl.goodsSku);
router.get('/shop/getShopButtonConfig.json', async (req, res) => {
  // 读取后台配置的中间大按钮Logo
  const { PrismaClient: _PC } = require('@prisma/client');
  const _pc = new _PC();
  const logoCfg = await _pc.sysConfig.findFirst({ where: { key: 'nav_logo_center' } }).catch(() => null);
  const centerLogo = logoCfg?.value || '';
  const navItems = [
    { logoA: '', logoB: '', isLarge: 'F', desc: '预订', url: '/pages/travel/index' },
    { logoA: '', logoB: '', isLarge: 'F', desc: '在地体验', url: '/pages/trip/index' },
    { logoA: centerLogo, logoB: centerLogo, isLarge: 'T', desc: '全部产品', url: '/pages/travel/destinations' },
    { logoA: '', logoB: '', isLarge: 'F', desc: '风物', url: '/pages/scenery/scenery' },
    { logoA: '', logoB: '', isLarge: 'F', desc: '我的', url: '/pages/member/memberCenter' },
  ];
  res.json({ code: 0, result: 1, retVal: [{ info: JSON.stringify(navItems) }] });
});
// memberCenter.js: h.value = JSON.parse(retVal.info).show.value → 功能菜单列表
// 注意：每组内 items 的 desc 字段对应列表项文字，sortType 'cols' 按列显示
router.get('/shop/getShopMemberCenterConfig', (req, res) => {
  const menuGroups = [
    { type: 'whitespace', sortType: 'cols', title: '', items: [] },
    {
      type: 'url', title: '', titleUrl: '', sortType: 'cols',
      items: [
        { desc: '合作品牌权益合集', url: '/pagesA/member/memberRight', logo: '', business: 'default' },
        { desc: '会员政策', url: '/pagesA/member/policy', logo: '', business: 'default' },
        { desc: '权益关联人', url: '/pagesA/member/beneficiaryPage', logo: '', business: 'default' },
        { desc: '积分转赠人', url: '/pagesA/member/sendPoints', logo: '', business: 'default' },
      ]
    },
    { type: 'whitespace', sortType: 'cols', title: '', items: [] },
    {
      type: 'url', title: '', titleUrl: '', sortType: 'cols',
      items: [
        { desc: '出行偏好', url: '/pagesA/member/travelPreference', logo: '', business: 'default' },
        { desc: '我的收藏', url: '/pagesA/member/myCollection', logo: '', business: 'default' },
        { desc: '我的咨询单', url: '/pagesA/other/diyTrip', logo: '', business: 'default' },
        { desc: '出行人', url: '/pagesA/member/travelersList', logo: '', business: 'default' },
        { desc: '收货地址', url: '/pagesA/member/address', logo: '', business: 'default' },
        { desc: '开票信息', url: '/pagesA/member/invoicePage', logo: '', business: 'default' },
      ]
    },
    { type: 'whitespace', sortType: 'cols', title: '', items: [] },
    {
      type: 'url', title: '', titleUrl: '', sortType: 'cols',
      items: [
        { desc: '在线客服', url: '/pagesA/other/chat', logo: '', business: 'default' },
        { desc: '常见问题', url: '/pagesA/member/faqPage', logo: '', business: 'default' },
        { desc: '关于云舍村', url: '/pagesA/member/aboutPage', logo: '', business: 'default' },
      ]
    },
  ];
  const showValue = JSON.stringify({ value: menuGroups });
  const info = JSON.stringify({ show: showValue });
  return res.json({ code: 0, result: 1, retVal: { info } });
});
router.get('/shop/shopGoodsTemplate.json', (req, res) => res.json({ code: 0, data: {} }));
router.get('/shop/getScrollPic.json', (req, res) => res.json({ code: 0, data: [] }));
router.get('/shop/getWjxUrl', (req, res) => res.json({ code: 0, data: '' }));
// 新版商品详情页专用接口（公开）
// 公开 Banner 接口（风物页等轮播图使用）
router.get('/banners/public', async (req, res) => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const { position, limit = 3 } = req.query;
  const where = { status: 1 };
  if (position) where.position = position;
  const list = await prisma.banner.findMany({
    where, orderBy: { sortOrder: 'asc' }, take: Math.min(Number(limit), 10),
  });
  return res.json({ code: 0, data: { list } });
});

router.get('/shop/products', optionalAuth, ctrl.listGoodsPublic);
router.get('/shop/products/:id', optionalAuth, ctrl.getProductById);
// 新版下单接口（需登录）
router.post('/shop/order', authMiddleware, ctrl.createShopOrder);
// 我的风物订单（需登录）
router.get('/shop/my-orders', authMiddleware, ctrl.getMyShopOrders);

// 风物订单详情（orderDetail.js 用）
router.get('/shop/order-detail/:orderNo', authMiddleware, async (req, res) => {
  const { PrismaClient: _SODP } = require('@prisma/client');
  const { success: _sods, error: _sode } = require('../utils/response');
  const _sodp = new _SODP();
  try {
    const order = await _sodp.shopOrder.findFirst({
      where: { orderNo: req.params.orderNo, memberId: req.member.id },
      include: { items: { include: { product: true } } }
    });
    if (!order) { await _sodp.$disconnect(); return _sode(res, '订单不存在'); }
    const SM = { pending:'待付款', paid:'待发货', confirmed:'待发货', shipped:'待收货', completed:'待评价', cancelled:'已取消', refunded:'已退款' };
    await _sodp.$disconnect();
    return _sods(res, { ...order, orderStaDesc: SM[order.status] || order.status });
  } catch(err) {
    await _sodp.$disconnect();
    return _sode(res, '查询失败');
  }
});

// 确认收货：shipped → completed
router.post('/shop/orders/:orderNo/confirm-receipt', authMiddleware, async (req, res) => {
  const { PrismaClient: _CRP } = require('@prisma/client');
  const { success: _crs, error: _cre } = require('../utils/response');
  const _crp = new _CRP();
  try {
    const order = await _crp.shopOrder.findFirst({ where: { orderNo: req.params.orderNo, memberId: req.member.id } });
    if (!order) { await _crp.$disconnect(); return _cre(res, '订单不存在'); }
    if (order.status !== 'shipped') { await _crp.$disconnect(); return _cre(res, `当前状态(${order.status})无法确认收货`); }
    await _crp.shopOrder.update({ where: { id: order.id }, data: { status: 'completed' } });
    await _crp.$disconnect();
    return _crs(res, null, '已确认收货，订单状态更新为已完成');
  } catch(err) {
    await _crp.$disconnect();
    return _cre(res, '操作失败：' + err.message);
  }
});

router.get('/shop/getWxacodeParams.json', (req, res) => res.json({ code: 0, data: {} }));
// trip/index.js: e.retVal.forEach(...) → 期望 retVal 是数组
router.get('/shop/batchQueryShopConfig.json', (req, res) => res.json({ code: 0, result: 0, data: {}, retVal: [] }));
router.get('/shop/getCodeInfo.json', (req, res) => res.json({ code: 0, data: {} }));

// 需要登录
router.post('/shop/submitOrder.json', authMiddleware, ctrl.submitOrder);
router.get('/shop/orderDetail.json', authMiddleware, ctrl.shopOrderDetail);
router.post('/shop/addGoodsCollection.json', authMiddleware, ctrl.addCollection);
router.post('/shop/addGoodsCollection', authMiddleware, ctrl.addCollection);
router.post('/shop/deleteGoodsCollection.json', authMiddleware, ctrl.deleteCollection);
router.post('/shop/deleteGoodsCollection', authMiddleware, ctrl.deleteCollection);
router.get('/shop/getGoodsCollection.json', authMiddleware, ctrl.getCollection);
router.get('/shop/getGoodsCollection', authMiddleware, ctrl.getCollection);
router.get('/shop/getGoodsIsCollection.json', authMiddleware, ctrl.isCollection);
router.get('/shop/getGoodsIsCollection', authMiddleware, ctrl.isCollection);
// 批量收藏状态查询（trip/index.js 的 ue() 函数调用，retVal 必须是数组不能 undefined）
router.post('/shop/shopGetGoodsIsCollection.json', optionalAuth, (req, res) => res.json({ code: 0, result: 1, retVal: [] }));
router.get('/shop/shopGetGoodsIsCollection.json', optionalAuth, (req, res) => res.json({ code: 0, result: 1, retVal: [] }));
router.get('/shop/deliveryMessageItemAjax.json', authMiddleware, (req, res) => res.json({ code: 0, data: null }));
router.get('/shop/getCanReceivedListNew.json', authMiddleware, (req, res) => res.json({ code: 0, data: [] }));
router.post('/shop/receiveSCCouponNew', authMiddleware, (req, res) => res.json({ code: 0, data: null }));
router.post('/shop/receiveSCCouponNewTransfer', authMiddleware, (req, res) => res.json({ code: 0, data: null }));
router.get('/shop/getAvailableCoupon', authMiddleware, require('../controllers/coupon.controller').getAvailableCoupons);
router.post('/shop/getAvailableCoupon', authMiddleware, require('../controllers/coupon.controller').getAvailableCoupons);
router.post('/shop/pay.json', authMiddleware, require('../controllers/payment.controller').shopPay);
router.post('/distribution/getDiscountOfMember.json', authMiddleware, (req, res) => res.json({ code: 0, data: { discount: 0 } }));
router.post('/memberapi/weiMobCloudShopOrder/shopOrderListSearch', authMiddleware, ctrl.shopOrderDetail);
// memberCenter.js 某处做 e.retVal.forEach → 需要 retVal 数组
router.get('/memberapi/weiMobCloudCard/getUserAvailableCardList', optionalAuth, (req, res) => res.json({ code: 0, result: 1, data: [], retVal: [] }));

// ======= 售后申请 =======
const { PrismaClient: _ASP } = require('@prisma/client');
const { success: _ass, error: _ase } = require('../utils/response');
const _asp = new _ASP();

// 提交售后申请
router.post('/shop/after-sales', authMiddleware, async (req, res) => {
  const { orderNo, reason, detail } = req.body;
  if (!orderNo || !reason) return _ase(res, '请填写订单号和售后原因');
  const order = await _asp.shopOrder.findFirst({ where: { orderNo, memberId: req.member.id } });
  if (!order) return _ase(res, '订单不存在');
  const r = await _asp.afterSalesRequest.create({ data: { memberId: req.member.id, orderNo, reason, detail: detail || '', status: 'pending' } });
  return _ass(res, r, '售后申请已提交，客服将在1-3个工作日内处理');
});

// 查看我的售后申请
router.get('/shop/my-after-sales', authMiddleware, async (req, res) => {
  const list = await _asp.afterSalesRequest.findMany({ where: { memberId: req.member.id }, orderBy: { createdAt: 'desc' } });
  return _ass(res, { list });
});

// ======= 商品评价 =======
// 提交评价
router.post('/shop/reviews', authMiddleware, async (req, res) => {
  const { productId, orderNo, rating, content, images } = req.body;
  if (!productId) return _ase(res, '请提供商品ID');
  if (!rating || rating < 1 || rating > 5) return _ase(res, '评分需在1-5分之间');
  // 检查是否已评价过该订单的该商品
  if (orderNo) {
    const exists = await _asp.productReview.findFirst({ where: { memberId: req.member.id, productId: Number(productId), orderNo } });
    if (exists) return _ase(res, '该订单的此商品已评价');
  }
  const user = await _asp.member.findUnique({ where: { id: req.member.id }, select: { nickname: true, avatar: true } });
  const r = await _asp.productReview.create({ data: {
    memberId: req.member.id, productId: Number(productId),
    orderNo: orderNo || null, rating: Number(rating),
    content: content || '', images: images ? JSON.stringify(images) : null,
    nickname: user?.nickname || '匿名用户', avatar: user?.avatar || '',
  }});
  // 评价完成后将订单状态从 completed 改为 reviewed（可选，标记已评价）
  if (orderNo) await _asp.shopOrder.updateMany({ where: { orderNo, memberId: req.member.id }, data: { status: 'reviewed' } }).catch(() => {});
  return _ass(res, r, '评价提交成功');
});

// 获取商品评价列表（公开）
router.get('/shop/products/:id/reviews', async (req, res) => {
  const productId = Number(req.params.id);
  const { pageNum = 1, pageSize = 10 } = req.query;
  const [list, total] = await Promise.all([
    _asp.productReview.findMany({ where: { productId }, orderBy: { createdAt: 'desc' }, skip: (Number(pageNum)-1)*Number(pageSize), take: Number(pageSize) }),
    _asp.productReview.count({ where: { productId } }),
  ]);
  const avg = total > 0 ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
  const parsed = list.map(r => ({ ...r, images: r.images ? JSON.parse(r.images) : [] }));
  return res.json({ code: 0, data: { list: parsed, total, avgRating: Math.round(avg * 10) / 10 } });
});

// ======= 管理端：售后申请管理 =======
router.get('/admin-after-sales', require('../middleware/auth').adminAuthMiddleware, async (req, res) => {
  const { pageNum = 1, pageSize = 20, status } = req.query;
  const where = status ? { status } : {};
  const [list, total] = await Promise.all([
    _asp.afterSalesRequest.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (Number(pageNum)-1)*Number(pageSize), take: Number(pageSize) }),
    _asp.afterSalesRequest.count({ where }),
  ]);
  return res.json({ code: 0, data: { list, total } });
});

router.put('/admin-after-sales/:id', require('../middleware/auth').adminAuthMiddleware, async (req, res) => {
  const { status, adminNote, refundAmount } = req.body;
  const r = await _asp.afterSalesRequest.update({ where: { id: Number(req.params.id) }, data: { status, adminNote, refundAmount: refundAmount ? Number(refundAmount) : undefined } });
  return _ass(res, r, '已更新');
});

module.exports = router;
