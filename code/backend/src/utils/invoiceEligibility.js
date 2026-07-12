'use strict';

const ELIGIBLE_ORDER_STATUSES = new Set(['paid', 'confirmed', 'completed', 'shipped', 'delivered']);
const BLOCKED_ORDER_STATUSES = new Set(['pending', 'cancelled', 'refunding', 'refunded', 'refund_failed']);
const REFUND_PAYMENT_STATUSES = new Set(['refunding', 'refunded', 'refund_failed']);

const ORDER_DEFS = {
  travel: {
    model: 'travelOrder',
    include: { product: { select: { title: true } } },
    typeName: '旅行套餐',
    name: (o) => o.product?.title || '旅行订单',
  },
  hotel: {
    model: 'hotelOrder',
    include: { hotel: { select: { name: true } } },
    typeName: '酒店',
    name: (o) => o.hotel?.name || '酒店订单',
  },
  shop: {
    model: 'shopOrder',
    include: undefined,
    typeName: '风物商城',
    name: (o) => (o.notes || '').split('|')[0] || '商城订单',
  },
  activity: {
    model: 'activityOrder',
    include: { activity: { select: { title: true } } },
    typeName: '活动',
    name: (o) => o.activity?.title || '活动订单',
  },
};

const normalizeType = (type) => {
  const t = String(type || '').toLowerCase();
  if (['l', 'travel', 'custom', 'destpack', 'butcustom', 'freetravel', 'themegroup', 'travelroom'].includes(t)) return 'travel';
  if (['r', 'room', 'hotel'].includes(t)) return 'hotel';
  if (['s', 'shop'].includes(t)) return 'shop';
  if (['a', 'activity'].includes(t)) return 'activity';
  return '';
};

const parseOrderNos = (value) => {
  if (Array.isArray(value)) return value.map(String);
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch (_) {}
    return value.split(',').map((v) => v.trim()).filter(Boolean);
  }
  return [];
};

const orderHasInvoiceRequest = async (prisma, memberId, orderNo) => {
  const rows = await prisma.invoiceRequest.findMany({
    where: { memberId, status: { not: 'rejected' } },
    select: { orderNos: true },
  });
  return rows.some((r) => parseOrderNos(r.orderNos).includes(orderNo));
};

const findOrderByNo = async (prisma, memberId, orderNo, preferredType = '') => {
  const types = preferredType && ORDER_DEFS[preferredType]
    ? [preferredType]
    : Object.keys(ORDER_DEFS);

  for (const type of types) {
    const def = ORDER_DEFS[type];
    const order = await prisma[def.model].findFirst({
      where: { orderNo, memberId },
      ...(def.include ? { include: def.include } : {}),
    });
    if (order) return { type, def, order };
  }
  return null;
};

const getSuccessfulPayment = async (prisma, memberId, orderNo, orderType) => {
  const payments = await prisma.payment.findMany({
    where: { orderNo, ...(memberId ? { memberId } : {}), ...(orderType ? { orderType } : {}) },
    orderBy: { createdAt: 'desc' },
  });
  if (!payments.length) return null;
  if (payments.some((p) => REFUND_PAYMENT_STATUSES.has(p.status) || p.refundedAt || Number(p.refundAmount || 0) > 0)) {
    return null;
  }
  return payments.find((p) => p.status === 'success') || null;
};

const checkInvoiceEligibility = async (prisma, memberId, orderNo, orderType = '') => {
  const normalizedType = normalizeType(orderType);
  const found = await findOrderByNo(prisma, memberId, String(orderNo || ''), normalizedType);
  if (!found) return { eligible: false, reason: '订单不存在或不属于当前会员' };

  const { type, def, order } = found;
  const status = String(order.status || '');
  if (BLOCKED_ORDER_STATUSES.has(status) || !ELIGIBLE_ORDER_STATUSES.has(status)) {
    return { eligible: false, reason: '只有支付成功且未退款的订单才可以申请发票', order, type };
  }

  const payment = await getSuccessfulPayment(prisma, memberId, order.orderNo, type);
  if (!payment) {
    return { eligible: false, reason: '未找到成功支付记录，或订单已发起退款，不能申请发票', order, type };
  }

  if (await orderHasInvoiceRequest(prisma, memberId, order.orderNo)) {
    return { eligible: false, reason: '该订单已提交过开票申请', order, type, payment };
  }

  const amount = Number(order.paidAmount || payment.amount || order.totalAmount || 0);
  return {
    eligible: true,
    type,
    typeName: def.typeName,
    name: def.name(order),
    order,
    payment,
    amount,
  };
};

const listInvoiceEligibleOrders = async (prisma, memberId) => {
  const results = [];
  const [travel, hotel, shop, activity] = await Promise.all([
    prisma.travelOrder.findMany({ where: { memberId }, include: ORDER_DEFS.travel.include, orderBy: { createdAt: 'desc' }, take: 30 }),
    prisma.hotelOrder.findMany({ where: { memberId }, include: ORDER_DEFS.hotel.include, orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.shopOrder.findMany({ where: { memberId }, orderBy: { createdAt: 'desc' }, take: 30 }),
    prisma.activityOrder.findMany({ where: { memberId }, include: ORDER_DEFS.activity.include, orderBy: { createdAt: 'desc' }, take: 20 }),
  ]);

  for (const [type, orders] of [['travel', travel], ['hotel', hotel], ['shop', shop], ['activity', activity]]) {
    const def = ORDER_DEFS[type];
    for (const order of orders) {
      const checked = await checkInvoiceEligibility(prisma, memberId, order.orderNo, type);
      if (!checked.eligible) continue;
      results.push({
        orderNo: order.orderNo,
        type,
        typeName: def.typeName,
        name: def.name(order),
        amount: checked.amount,
        status: order.status,
        createdAt: order.createdAt,
      });
    }
  }

  return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

module.exports = {
  checkInvoiceEligibility,
  listInvoiceEligibleOrders,
  normalizeType,
};
