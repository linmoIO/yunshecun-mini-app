'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error, paginate } = require('../utils/response');
const { decrementDateInventory, restoreDateInventory, normalizeDate } = require('../utils/inventory');

const prisma = new PrismaClient();
const tryParse = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };
const PHONE_PATTERN = /^1\d{10}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const getActivityQuantity = (body = {}) => {
  const legacyQuantity = [
    body.adult,
    body.bigChild ?? body.bigChildren,
    body.child ?? body.children,
    body.baby,
  ].reduce((sum, value) => sum + Number(value || 0), 0);
  const fallback = legacyQuantity || (Array.isArray(body.guestDtoList) ? body.guestDtoList.length : 0) || 1;
  return Number(body.quantity ?? body.num ?? fallback);
};

const isValidDate = (value) => {
  if (!DATE_PATTERN.test(String(value || ''))) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

// ---- 小程序端 ----

const getActivityList = async (req, res) => {
  const { pageNum = 1, pageSize = 10, category, keyword } = req.body || req.query;
  const where = { status: 1 };
  if (category) where.category = category;
  if (keyword) where.title = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.activity.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.activity.count({ where }),
  ]);
  return success(res, { list: list.map(formatActivity), total });
};

const getActivityDetail = async (req, res) => {
  const { activityCode, id } = req.query;
  const activity = id
    ? await prisma.activity.findFirst({ where: { id: Number(id), status: 1 } })
    : await prisma.activity.findFirst({ where: { activityCode, status: 1 } });
  if (!activity) return error(res, '活动不存在');
  return success(res, formatActivity(activity));
};

const saveActivityOrder = async (req, res) => {
  const body = req.body || {};
  const activityCode = body.activityCode || body.productCode;
  const quantity = getActivityQuantity(body);
  const contactName = body.contactName || body.contactMan || body.rsvMan || '';
  const contactPhone = body.contactPhone || body.rsvPhone || body.mobile || '';
  const activityDate = body.activityDate || body.bizDatetime?.split(' ')[0] || body.startDate || null;
  const notes = body.notes || body.remark || '';

  if (!activityCode) return error(res, '请选择活动');
  if (!Number.isInteger(quantity) || quantity < 1) return error(res, '参与人数不正确');
  if (!String(contactName).trim()) return error(res, '请填写联系人姓名');
  if (!PHONE_PATTERN.test(String(contactPhone))) return error(res, '请填写正确的手机号');
  if (activityDate && !isValidDate(activityDate)) return error(res, '活动日期不正确');

  const activity = activityCode
    ? await prisma.activity.findFirst({ where: { activityCode, status: 1 } })
    : null;
  if (!activity) return error(res, '活动不存在');

  const totalAmount = (activity?.price || 0) * Number(quantity);

  const qty = Number(quantity);
  let order;
  try {
    order = await prisma.$transaction(async (tx) => {
    if (activity) {
      const dateInventory = await decrementDateInventory(tx, {
        type: 'activity',
        targetId: activity.id,
        targetCode: activity.activityCode,
        date: normalizeDate(activityDate || activity.startDate),
        quantity: qty,
      });
      if (!dateInventory && activity.maxPersons != null) {
        const used = await tx.activityOrder.aggregate({
          where: {
            activityId: activity.id,
            activityDate: normalizeDate(activityDate || activity.startDate),
            status: { notIn: ['cancelled', 'refunded'] },
          },
          _sum: { quantity: true },
        });
        const remaining = Number(activity.maxPersons) - Number(used._sum.quantity || 0);
        if (remaining < qty) {
          const err = new Error(`该日期余量不足，当前剩余 ${Math.max(0, remaining)}`);
          err.code = 'OUT_OF_STOCK';
          throw err;
        }
      }
    }
      return tx.activityOrder.create({
      data: {
        memberId: req.member.id,
        activityId: activity?.id || null,
        status: 'pending',
        quantity: qty,
        totalAmount,
        contactName,
        contactPhone,
        activityDate,
        notes,
      },
      });
    });
  } catch (err) {
    return error(res, err.message || '库存不足');
  }
  const payload = { orderNo: order.orderNo, totalAmount: order.totalAmount, orderStatus: '1' };
  return res.json({ code: 0, result: 1, msg: 'success', data: payload, retVal: payload });
};

const getActivityOrder = async (req, res) => {
  const orderNo = req.query.orderNo || req.query.actRsvNo;
  if (!orderNo) return error(res, '缺少订单号');
  const order = await prisma.activityOrder.findFirst({
    where: { orderNo, memberId: req.member.id },
    include: { activity: true },
  });
  if (!order) return error(res, '订单不存在');
  const formatted = formatActivityOrder(order);
  const amount = Number(order.totalAmount || 0);
  const activity = order.activity || {};
  const isPending = order.status === 'pending';
  const retVal = {
    ...formatted,
    orderNo: order.orderNo,
    rateSum: amount,
    payRate: amount,
    leftTimeSeconds: isPending ? 30 * 60 : 0,
    paySta: isPending ? '1' : '2',
    sta: order.status === 'cancelled' ? 'X' : isPending ? 'R' : 'O',
    agency: 'F',
    isAgency: 'F',
    payType: 'CASH',
    orderType: 'activity',
    contactMan: order.contactName || '',
    contactPhone: order.contactPhone || '',
    remark: order.notes || '',
    bizDatetime: order.activityDate || '',
    createDatetime: order.createdAt,
    payDatetime: null,
    adult: Number(order.quantity || 1),
    bigChildren: 0,
    children: 0,
    baby: 0,
    guestInfo: [],
    verifyList: [],
    activityInfo: {
      name: activity.title || '日活动',
      title: activity.title || '日活动',
      indexPicture: activity.coverImage || '',
      minCapacity: 0,
      maxCapacity: activity.maxPersons || 0,
      adapterPeople: 'ALL',
      activityBegin: activity.startDate || '',
      activityEnd: activity.endDate || '',
    },
    aggregationOrder: {
      descript: activity.title || '日活动订单',
      title: activity.title || '日活动订单',
      payStatus: isPending ? 1 : 2,
      orderStatus: 1,
    },
  };
  return res.json({ code: 0, result: 1, msg: 'success', data: retVal, retVal });
};

const getActivityPayDetail = async (req, res) => {
  const orderNo = req.query.orderNo || req.query.actRsvNo;
  const order = orderNo
    ? await prisma.activityOrder.findFirst({
      where: { orderNo, memberId: req.member.id },
      include: { activity: true },
    })
    : null;
  if (!order) return error(res, '订单不存在');
  const amount = Number(order.totalAmount || 0);
  const retVal = {
    orderNo: order.orderNo,
    payRate: amount,
    rateSum: amount,
    couponName: '',
    couponNo: '',
    couponDisPriceStr: '',
    payTypes: [],
  };
  return res.json({ code: 0, result: 1, msg: 'success', data: retVal, retVal });
};

const getActivityOrderList = async (req, res) => {
  const { memberId, status, pageNum = 1, pageSize = 10 } = req.query;
  const where = { memberId: req.member.id };
  if (status) where.status = status;

  const [list, total] = await Promise.all([
    prisma.activityOrder.findMany({
      where,
      include: { activity: true },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.activityOrder.count({ where }),
  ]);
  return success(res, { list: list.map(formatActivityOrder), total });
};

const calculateActivityPrice = async (req, res) => {
  const body = req.body || {};
  const { activityCode, couponNo } = body;
  const quantity = getActivityQuantity(body);
  if (!activityCode) return error(res, '请选择活动');
  if (!Number.isInteger(quantity) || quantity < 1) return error(res, '参与人数不正确');
  const activity = activityCode
    ? await prisma.activity.findFirst({ where: { activityCode, status: 1 } })
    : null;
  if (!activity) return error(res, '活动不存在');

  const basePrice = (activity?.price || 0) * Number(quantity);
  let discount = 0;

  if (couponNo && req.member) {
    const mc = await prisma.memberCoupon.findFirst({
      where: { couponNo, memberId: req.member.id, status: 0 },
      include: { coupon: true },
    });
    if (mc?.coupon) discount = mc.coupon.discountAmount || 0;
  }

  const payload = {
    basePrice,
    discount,
    totalPrice: Math.max(0, basePrice - discount),
    totalCredit: 0,
    totalCreditPrice: 0,
  };
  return res.json({ code: 0, result: 1, msg: 'success', data: payload, retVal: payload });
};

const cancelActivityOrder = async (req, res) => {
  const { orderNo } = req.query;
  const order = await prisma.activityOrder.findFirst({ where: { orderNo, memberId: req.member.id } });
  if (!order) return error(res, '订单不存在');
  if (!['pending', 'paid'].includes(order.status)) return error(res, '当前状态不可取消');
  await prisma.$transaction(async (tx) => {
    await tx.activityOrder.update({ where: { orderNo }, data: { status: 'cancelled' } });
    await restoreDateInventory(tx, {
      type: 'activity',
      targetId: order.activityId,
      date: order.activityDate,
      quantity: Number(order.quantity || 1),
    });
  });
  return success(res, null, '取消成功');
};

// ---- 后台管理 ----

const adminListActivities = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status, keyword } = req.query;
  const where = {};
  if (status !== undefined) where.status = Number(status);
  if (keyword) where.title = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.activity.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.activity.count({ where }),
  ]);
  return paginate(res, list.map(formatActivity), total, pageNum, pageSize);
};

const adminCreateActivity = async (req, res) => {
  const { title, description, price, originalPrice, coverImage, images, videoUrl, videoThumb,
    videoLinkType, location, startDate, endDate, status, maxPersons, category, sortOrder } = req.body;

  const activity = await prisma.activity.create({
    data: {
      title, description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      coverImage, videoUrl, videoThumb, videoLinkType, location, startDate, endDate,
      status: status !== undefined ? Number(status) : 1,
      maxPersons: maxPersons ? Number(maxPersons) : null,
      category,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      images: images ? (typeof images === 'string' ? images : JSON.stringify(images)) : null,
    },
  });
  return success(res, formatActivity(activity));
};

const adminUpdateActivity = async (req, res) => {
  const { title, description, price, originalPrice, coverImage, images, videoUrl, videoThumb,
    videoLinkType, location, startDate, endDate, status, maxPersons, category, sortOrder } = req.body;

  const activity = await prisma.activity.update({
    where: { id: Number(req.params.id) },
    data: {
      title, description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      coverImage, videoUrl, videoThumb, videoLinkType, location, startDate, endDate,
      status: status !== undefined ? Number(status) : 1,
      maxPersons: maxPersons ? Number(maxPersons) : null,
      category,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      images: images ? (typeof images === 'string' ? images : JSON.stringify(images)) : null,
    },
  });
  return success(res, formatActivity(activity));
};

const adminDeleteActivity = async (req, res) => {
  await prisma.activity.delete({ where: { id: Number(req.params.id) } });
  return success(res, null, '删除成功');
};

const adminUpdateActivityMedia = async (req, res) => {
  const { id } = req.params;
  const { coverImage, images, videoUrl, videoThumb, videoLinkType } = req.body;
  const updated = await prisma.activity.update({
    where: { id: Number(id) },
    data: {
      ...(coverImage !== undefined && { coverImage }),
      ...(images !== undefined && { images: typeof images === 'string' ? images : JSON.stringify(images) }),
      ...(videoUrl !== undefined && { videoUrl }),
      ...(videoThumb !== undefined && { videoThumb }),
      ...(videoLinkType !== undefined && { videoLinkType }),
    },
  });
  return success(res, formatActivity(updated));
};

const adminListOrders = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status, keyword } = req.query;
  const where = {};
  if (status) where.status = status;
  if (keyword) where.orderNo = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.activityOrder.findMany({
      where,
      include: { activity: true, member: { select: { nickname: true, phone: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.activityOrder.count({ where }),
  ]);
  return paginate(res, list.map(formatActivityOrder), total, pageNum, pageSize);
};

const formatActivity = (a) => ({
  ...a,
  images: tryParse(a.images, []),
});

const formatActivityOrder = (o) => ({
  ...o,
  activity: o.activity ? formatActivity(o.activity) : null,
});

module.exports = {
  getActivityList, getActivityDetail, saveActivityOrder, getActivityOrder,
  getActivityPayDetail,
  getActivityOrderList, calculateActivityPrice, cancelActivityOrder,
  adminListActivities, adminCreateActivity, adminUpdateActivity,
  adminDeleteActivity, adminUpdateActivityMedia, adminListOrders,
};
