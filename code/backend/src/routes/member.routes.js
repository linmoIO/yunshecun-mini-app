'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/member.controller');
const { authMiddleware, optionalAuth } = require('../middleware/auth');
const { checkInvoiceEligibility, listInvoiceEligibleOrders } = require('../utils/invoiceEligibility');

const auth = authMiddleware; // 简写

// 会员信息
router.get('/member/memberInfo.json', auth, ctrl.getMemberInfo);
router.get('/member/refreshMemberInfo.json', auth, ctrl.getMemberInfo);
router.post('/member/updateMemberBaseInfo.json', auth, ctrl.updateMemberInfo);
router.post('/member/updateMemberInfoForWeiXin.json', auth, ctrl.updateMemberInfo);
router.post('/member/isUpdateMemberBaseInfo.json', auth, (req, res) => res.json({ code: 0, data: { needUpdate: false } }));
router.post('/member/queryMemberUpgradeInfo.json', optionalAuth, (req, res) => res.json({ code: 0, result: 1, retVal: { result: 0, retVal: [] } }));

// 会员卡等级（公开）
router.get('/member/getAllCardLevel.json', ctrl.getMemberCardLevels);
router.get('/member/membercardInterestDesc.json', ctrl.getMemberCardLevels);

// 积分
router.get('/member/listPoint.json', auth, ctrl.getPoints);
router.get('/member/listPointByMemberId.json', auth, ctrl.getPoints);
router.post('/member/queryPointsExpiredRemindData.json', auth, (req, res) => res.json({ code: 0, data: { expiredPoints: 0 } }));

// 余额
router.get('/member/getAccountIncludeTreatList.json', auth, ctrl.getAccountBalance);

// 优惠券
router.get('/member/findCouponDetailListByCondi.json', auth, ctrl.getMemberCoupons);
router.get('/member/findCouponDetailListByCouponNo.json', auth, ctrl.getMemberCoupons);
router.get('/member/listCouponWithHistoryByCardNoV2', auth, ctrl.getMemberCoupons);

// 收货地址
router.get('/member/shippingAddress.json', auth, ctrl.getAddresses);
router.post('/member/shippingAddress.json', auth, ctrl.addAddress);
router.delete('/member/shippingAddress.json', auth, ctrl.deleteAddress);

// 随行人员 / 常旅客
router.post('/memberapi/guestBase/listGuestLinkExtraInfoWithMemberIdOrOpenId', auth, ctrl.getGuests);
router.post('/memberapi/guestBase/saveGuestBase', auth, ctrl.saveGuest);
router.post('/memberapi/guestBase/updateGuestBase', auth, ctrl.updateGuest);
router.post('/memberapi/guestBase/deleteGuestLinkRelation', auth, ctrl.deleteGuest);
router.post('/memberapi/guestBase/saveMemberGuestLinkRelation', auth, ctrl.saveGuest);
router.post('/memberapi/guestBase/recognizeIdcardV2', auth, (req, res) => res.json({ code: 0, data: {} }));

// 发票信息
router.get('/member/memberInvoice.json', auth, ctrl.getMemberInvoice);
router.post('/member/saveOrUpdateMemberInvoice.json', auth, ctrl.saveOrUpdateInvoice);
router.get('/member/deleteMemberInvoice.json', auth, ctrl.deleteInvoice);

// 受益人 / 积分转让
router.post('/member/beneficiary/queryMemberByMobileOrEmail', auth, ctrl.searchMember);
router.post('/member/beneficiary/saveRelation', auth, ctrl.saveBeneficiary);
router.post('/member/beneficiary/relationList', auth, ctrl.getBeneficiaries);
router.post('/member/beneficiary/deleteRelation', auth, ctrl.deleteBeneficiary);
router.post('/member/beneficiary/transferPoints', auth, ctrl.transferPoints);
router.post('/member/beneficiary/savePointsTransferee', auth, ctrl.saveBeneficiary);
router.post('/member/beneficiary/pointsTransfereeList', auth, ctrl.getBeneficiaries);
router.post('/member/beneficiary/deletePointsTransferee', auth, ctrl.deleteBeneficiary);
router.post('/member/beneficiary/checkTodayCanTransfer', auth, (req, res) => res.json({ code: 0, data: { canTransfer: true } }));
router.post('/member/beneficiary/checkBeneficiaryDeletePermission', auth, (req, res) => res.json({ code: 0, data: { canDelete: true } }));
router.post('/member/beneficiary/queryMemberByRelationMemberId', optionalAuth, ctrl.getBeneficiaries);

// 其他
router.post('/member/threeMetaCheck.json', auth, (req, res) => res.json({ code: 0, data: { result: true } }));
router.get('/member/getMemberInfoByCardNo', auth, ctrl.getMemberInfo);
router.post('/member/queryMemberCardByCondition.json', auth, (req, res) => res.json({ code: 0, data: [] }));
router.post('/member/bindCardToMember.json', auth, (req, res) => res.json({ code: 0, data: null }));
router.get('/member/bindOpenId.json', auth, (req, res) => res.json({ code: 0, data: null }));
router.post('/member/removeOpenId.json', auth, (req, res) => res.json({ code: 0, data: null }));
router.get('/member/saveMemberFirstOrderSource.json', auth, (req, res) => res.json({ code: 0, data: null }));

// ---- 出行人（Traveler Profiles）CRUD ----
router.get('/member/travelers', auth, async (req, res) => {
  const list = await _mp.guest.findMany({ where: { memberId: req.member.id }, orderBy: { id: 'asc' } });
  return _ms(res, { list });
});
router.post('/member/travelers', auth, async (req, res) => {
  const guest = ctrl.normalizeGuestInput(req.body);
  const validationError = ctrl.validateGuestInput(guest);
  if (validationError) return _me(res, validationError);
  const r = await _mp.guest.create({ data: { memberId: req.member.id, ...guest, gender: guest.gender ? Number(guest.gender) : null } });
  return _ms(res, r);
});
router.put('/member/travelers/:id', auth, async (req, res) => {
  const guest = ctrl.normalizeGuestInput(req.body);
  const validationError = ctrl.validateGuestInput(guest);
  if (validationError) return _me(res, validationError);
  const existing = await _mp.guest.findFirst({ where: { id: Number(req.params.id), memberId: req.member.id } });
  if (!existing) return _me(res, '出行人不存在');
  const r = await _mp.guest.update({ where: { id: existing.id }, data: { ...guest, gender: guest.gender ? Number(guest.gender) : null } });
  return _ms(res, r);
});
router.delete('/member/travelers/:id', auth, async (req, res) => {
  const existing = await _mp.guest.findFirst({ where: { id: Number(req.params.id), memberId: req.member.id } });
  if (!existing) return _me(res, '出行人不存在');
  await _mp.guest.delete({ where: { id: existing.id } });
  return _ms(res, null, '删除成功');
});

// ---- 所有收藏（旅游/酒店/活动/风物）----
router.get('/member/all-collections', auth, async (req, res) => {
  // 风物商品收藏
  const shopCols = await _mp.goodsCollection.findMany({ where: { memberId: req.member.id }, include: { product: true }, orderBy: { createdAt: 'desc' } });
  // 旅游/酒店收藏（存在 SysConfig 或 JSON 字段，简化：从订单历史生成收藏夹）
  // 实际使用 GoodsCollection 表，只是goodsId对应不同业务
  const list = shopCols.map(c => ({
    id: c.id, type: 'shop', goodsId: String(c.productId),
    name: c.product?.name || '商品',
    image: c.product?.coverImage || '',
    price: c.product?.price || 0,
    url: `/pagesA/other/productDetail?id=${c.productId}`,
    createdAt: c.createdAt,
  }));
  return _ms(res, { list });
});

// ---- 积分转赠 ----
router.post('/member/transfer-points', auth, async (req, res) => {
  const { targetPhone, points } = req.body;
  if (!targetPhone || !points || points <= 0) return _me(res, '请填写正确的手机号和转赠积分');
  const me = await _mp.member.findUnique({ where: { id: req.member.id } });
  if ((me?.points || 0) < points) return _me(res, '积分余额不足');
  const target = await _mp.member.findFirst({ where: { phone: String(targetPhone) } });
  if (!target) return _me(res, '未找到该手机号对应的会员');
  if (target.id === req.member.id) return _me(res, '不能转赠给自己');
  await _mp.member.update({ where: { id: req.member.id }, data: { points: { decrement: Number(points) } } });
  await _mp.member.update({ where: { id: target.id }, data: { points: { increment: Number(points) } } });
  return _ms(res, null, `已成功转赠 ${points} 积分给 ${target.nickname || targetPhone}`);
});

// ---- 权益关联人（绑定/查看）----
router.get('/member/benefit-links', auth, async (req, res) => {
  const links = await _mp.beneficiary.findMany({ where: { memberId: req.member.id }, include: { target: { select: { memberId: true, nickname: true, phone: true, avatar: true } } } });
  return _ms(res, { list: links.map(l => ({ id: l.id, status: l.status, targetMemberId: l.targetId, ...l.target })) });
});
router.post('/member/benefit-links', auth, async (req, res) => {
  const { targetPhone } = req.body;
  if (!targetPhone) return _me(res, '请填写手机号');
  const target = await _mp.member.findFirst({ where: { phone: String(targetPhone) } });
  if (!target) return _me(res, '未找到该手机号对应的会员');
  if (target.id === req.member.id) return _me(res, '不能关联自己');
  const exists = await _mp.beneficiary.findFirst({ where: { memberId: req.member.id, targetId: target.id } });
  if (exists) return _me(res, '已经关联该会员');
  const r = await _mp.beneficiary.create({ data: { memberId: req.member.id, targetId: target.id, status: 1 } });
  return _ms(res, r, '关联成功');
});
router.delete('/member/benefit-links/:id', auth, async (req, res) => {
  await _mp.beneficiary.delete({ where: { id: Number(req.params.id) } });
  return _ms(res, null, '已解除关联');
});

// ---- CMS（FAQ、关于我们等）----
router.get('/cms/:key', async (req, res) => {
  const key = 'cms_' + req.params.key;
  const cfg = await _mp.sysConfig.findFirst({ where: { key } }).catch(() => null);
  return res.json({ code: 0, data: { content: cfg?.value || '', key: req.params.key } });
});

// ---- 出行偏好（基于历史订单 + 手动设置）----
router.get('/member/travel-preference', auth, async (req, res) => {
  // 从历史订单分析偏好
  const orders = await _mp.travelOrder.findMany({ where: { memberId: req.member.id }, include: { product: { select: { category: true, destination: true, tags: true, title: true } } }, orderBy: { createdAt: 'desc' }, take: 20 });
  const destCount = {}, catCount = {};
  orders.forEach(o => {
    if (o.product?.destination) destCount[o.product.destination] = (destCount[o.product.destination] || 0) + 1;
    if (o.product?.category) catCount[o.product.category] = (catCount[o.product.category] || 0) + 1;
  });
  const topDest = Object.entries(destCount).sort((a,b) => b[1]-a[1]).slice(0,3).map(e=>e[0]);
  const topCat = Object.entries(catCount).sort((a,b) => b[1]-a[1]).slice(0,2).map(e=>e[0]);
  // 手动设置的偏好
  const cfg = await _mp.sysConfig.findFirst({ where: { key: `member_pref_${req.member.id}` } }).catch(() => null);
  const manualPref = cfg?.value ? JSON.parse(cfg.value) : {};
  return _ms(res, { topDest, topCat, orderCount: orders.length, manualPref });
});
router.post('/member/travel-preference', auth, async (req, res) => {
  const key = `member_pref_${req.member.id}`;
  await _mp.sysConfig.upsert({ where: { key }, update: { value: JSON.stringify(req.body) }, create: { key, value: JSON.stringify(req.body) } });
  return _ms(res, null, '偏好已保存');
});

// ---- 收货地址 CRUD ----
const { PrismaClient: _MemberPrisma } = require('@prisma/client');
const _mp = new _MemberPrisma();
const { success: _ms, error: _me } = require('../utils/response');

router.get('/member/addresses', auth, async (req, res) => {
  const list = await _mp.shippingAddress.findMany({ where: { memberId: req.member.id }, orderBy: [{ isDefault: 'desc' }, { id: 'asc' }] });
  return _ms(res, { list });
});

router.post('/member/addresses', auth, async (req, res) => {
  const { name, phone, province, city, district, address, isDefault } = req.body;
  if (!name || !phone || !address) return _me(res, '请填写完整收货信息');
  if (isDefault) await _mp.shippingAddress.updateMany({ where: { memberId: req.member.id }, data: { isDefault: false } });
  const r = await _mp.shippingAddress.create({ data: { memberId: req.member.id, name, phone, province, city, district, address, isDefault: !!isDefault } });
  return _ms(res, r);
});

router.put('/member/addresses/:id', auth, async (req, res) => {
  const { name, phone, province, city, district, address, isDefault } = req.body;
  if (isDefault) await _mp.shippingAddress.updateMany({ where: { memberId: req.member.id }, data: { isDefault: false } });
  const r = await _mp.shippingAddress.update({ where: { id: Number(req.params.id) }, data: { name, phone, province, city, district, address, isDefault: !!isDefault } });
  return _ms(res, r);
});

router.delete('/member/addresses/:id', auth, async (req, res) => {
  await _mp.shippingAddress.delete({ where: { id: Number(req.params.id) } });
  return _ms(res, null, '删除成功');
});

// ---- 开票申请 ----
router.get('/invoice/my-requests', auth, async (req, res) => {
  const list = await _mp.invoiceRequest.findMany({ where: { memberId: req.member.id }, orderBy: { createdAt: 'desc' } });
  return _ms(res, { list });
});

router.post('/invoice/request', auth, async (req, res) => {
  const { orderNos, invoiceType, title, taxNo, email, phone, amount } = req.body;
  if (!title) return _me(res, '请填写发票抬头');
  if (!orderNos?.length) return _me(res, '请选择需要开票的订单');

  const checkedOrders = [];
  for (const orderNo of orderNos) {
    const checked = await checkInvoiceEligibility(_mp, req.member.id, orderNo);
    if (!checked.eligible) return _me(res, `${orderNo}：${checked.reason}`);
    checkedOrders.push(checked);
  }

  const invoiceAmount = checkedOrders.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const r = await _mp.invoiceRequest.create({ data: {
    memberId: req.member.id,
    orderNos: JSON.stringify(orderNos),
    invoiceType: invoiceType || 'personal',
    title, taxNo: taxNo || null, email: email || null, phone: phone || null,
    amount: Math.round(invoiceAmount * 100) / 100, status: 'pending',
  }});
  return _ms(res, r, '开票申请已提交');
});

// 所有订单（开票用）
router.get('/orders/all', auth, async (req, res) => {
  const list = await listInvoiceEligibleOrders(_mp, req.member.id);
  return _ms(res, { list });
});

// ---- 用户端：我的 DIY 行程需求（tripList.js 的我的行程 tab）----
router.get('/diy/my-requests', auth, async (req, res) => {
  const list = await _mp.diyTripRequest.findMany({
    where: { memberId: req.member.memberId },
    orderBy: { createdAt: 'desc' },
  });
  return _ms(res, { list });
});

// ---- 用户端：提交 DIY 行程需求 ----
router.post('/diy/request', auth, async (req, res) => {
  const { phone, name, destinations, startDate, duration, persons, budget, requirements } = req.body;
  if (!phone) return _me(res, '请填写联系手机号');
  const r = await _mp.diyTripRequest.create({ data: {
    memberId: req.member.memberId, nickname: req.member.nickname || '',
    phone, name: name || req.member.realName || '', destinations, startDate, duration, persons, budget, requirements,
    status: 'new',
  }});
  return _ms(res, r, '定制需求提交成功，顾问将尽快联系您');
});

module.exports = router;
