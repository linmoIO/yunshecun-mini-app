'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error, paginate } = require('../utils/response');

const prisma = new PrismaClient();
const tryParse = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };

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
    ? await prisma.activity.findUnique({ where: { id: Number(id) } })
    : await prisma.activity.findUnique({ where: { activityCode } });
  if (!activity) return error(res, '活动不存在');
  return success(res, formatActivity(activity));
};

const saveActivityOrder = async (req, res) => {
  const { activityCode, quantity = 1, contactName, contactPhone, activityDate, notes } = req.body;

  const activity = activityCode
    ? await prisma.activity.findUnique({ where: { activityCode } })
    : null;
  if (activityCode && !activity) return error(res, '活动不存在');

  const totalAmount = (activity?.price || 0) * Number(quantity);

  const order = await prisma.activityOrder.create({
    data: {
      memberId: req.member.id,
      activityId: activity?.id || null,
      status: 'pending',
      quantity: Number(quantity),
      totalAmount,
      contactName,
      contactPhone,
      activityDate,
      notes,
    },
  });
  return success(res, { orderNo: order.orderNo, totalAmount: order.totalAmount });
};

const getActivityOrder = async (req, res) => {
  const { orderNo } = req.query;
  const order = await prisma.activityOrder.findUnique({
    where: { orderNo },
    include: { activity: true },
  });
  if (!order) return error(res, '订单不存在');
  return success(res, formatActivityOrder(order));
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
  const { activityCode, quantity = 1, couponNo } = req.body;
  const activity = activityCode
    ? await prisma.activity.findUnique({ where: { activityCode } })
    : null;

  const basePrice = (activity?.price || 0) * Number(quantity);
  let discount = 0;

  if (couponNo && req.member) {
    const mc = await prisma.memberCoupon.findFirst({
      where: { couponNo, memberId: req.member.id, status: 0 },
      include: { coupon: true },
    });
    if (mc?.coupon) discount = mc.coupon.discountAmount || 0;
  }

  return success(res, { basePrice, discount, totalPrice: Math.max(0, basePrice - discount) });
};

const cancelActivityOrder = async (req, res) => {
  const { orderNo } = req.query;
  const order = await prisma.activityOrder.findFirst({ where: { orderNo, memberId: req.member.id } });
  if (!order) return error(res, '订单不存在');
  if (!['pending', 'paid'].includes(order.status)) return error(res, '当前状态不可取消');
  await prisma.activityOrder.update({ where: { orderNo }, data: { status: 'cancelled' } });
  return success(res, null, '取消成功');
};

// ---- 管理端 ----

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
  getActivityOrderList, calculateActivityPrice, cancelActivityOrder,
  adminListActivities, adminCreateActivity, adminUpdateActivity,
  adminDeleteActivity, adminUpdateActivityMedia, adminListOrders,
};
