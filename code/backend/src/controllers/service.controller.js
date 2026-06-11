'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error, paginate } = require('../utils/response');

const prisma = new PrismaClient();
const tryParse = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };

// ---- 小程序端 ----

const getHotelServices = async (req, res) => {
  const { hotelCode, status = 1 } = req.query;
  const where = { status: Number(status) };

  if (hotelCode) {
    const hotel = await prisma.hotel.findUnique({ where: { hotelCode } });
    if (hotel) where.hotelId = hotel.id;
  }

  const list = await prisma.hotelService.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });
  return success(res, { list });
};

const getServiceDictionary = async (req, res) => {
  const serviceTypes = [
    { code: 'cleanup', name: '清洁服务', icon: 'clean' },
    { code: 'borrowing', name: '物品借用', icon: 'borrow' },
    { code: 'purchase', name: '代购服务', icon: 'purchase' },
    { code: 'suggestion', name: '意见反馈', icon: 'feedback' },
  ];
  return success(res, { serviceTypes });
};

const createServiceOrder = async (req, res) => {
  const { serviceCode, hotelCode, roomNo, details, notes } = req.body;

  const service = serviceCode
    ? await prisma.hotelService.findFirst({ where: { serviceCode } })
    : null;

  const order = await prisma.serviceOrder.create({
    data: {
      memberId: req.member?.id || null,
      serviceId: service?.id || null,
      hotelCode,
      roomNo,
      status: 'pending',
      details: details ? (typeof details === 'string' ? details : JSON.stringify(details)) : null,
      notes,
    },
  });
  return success(res, { orderNo: order.orderNo });
};

const getServiceOrderList = async (req, res) => {
  const { memberId, status, pageNum = 1, pageSize = 10 } = req.body || req.query;
  const where = {};
  if (req.member) where.memberId = req.member.id;
  if (status) where.status = status;

  const [list, total] = await Promise.all([
    prisma.serviceOrder.findMany({
      where,
      include: { service: true },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.serviceOrder.count({ where }),
  ]);
  return success(res, { list: list.map(formatServiceOrder), total });
};

const updateServiceOrder = async (req, res) => {
  const { orderNo, status, notes } = req.body;
  const order = await prisma.serviceOrder.findUnique({ where: { orderNo } });
  if (!order) return error(res, '订单不存在');

  const updated = await prisma.serviceOrder.update({
    where: { orderNo },
    data: { status, ...(notes && { notes }) },
  });
  return success(res, formatServiceOrder(updated));
};

const saveRecommendation = async (req, res) => {
  const { hotelCode, roomNo, type, details } = req.body;
  const order = await prisma.serviceOrder.create({
    data: {
      memberId: req.member?.id || null,
      hotelCode,
      roomNo,
      status: 'pending',
      details: JSON.stringify({ type: type || 'recommendation', ...details }),
    },
  });
  return success(res, { orderNo: order.orderNo });
};

const getComplaintAndAdvice = async (req, res) => {
  const { hotelCode } = req.body;
  const list = await prisma.serviceOrder.findMany({
    where: { ...(hotelCode && { hotelCode }) },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return success(res, { list: list.map(formatServiceOrder) });
};

// ---- 管理端 ----

const adminListServices = async (req, res) => {
  const { pageNum = 1, pageSize = 20, hotelCode, type, status } = req.query;
  const where = {};
  if (status !== undefined) where.status = Number(status);
  if (type) where.type = type;
  if (hotelCode) {
    const hotel = await prisma.hotel.findUnique({ where: { hotelCode } });
    if (hotel) where.hotelId = hotel.id;
  }

  const [list, total] = await Promise.all([
    prisma.hotelService.findMany({
      where,
      include: { hotel: true },
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.hotelService.count({ where }),
  ]);
  return paginate(res, list, total, pageNum, pageSize);
};

const adminCreateService = async (req, res) => {
  const { hotelId, name, description, icon, type, price, status, sortOrder } = req.body;
  const service = await prisma.hotelService.create({
    data: {
      hotelId: hotelId ? Number(hotelId) : null,
      name, description, icon, type,
      price: price ? Number(price) : null,
      status: status !== undefined ? Number(status) : 1,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
    },
  });
  return success(res, service);
};

const adminUpdateService = async (req, res) => {
  const { name, description, icon, type, price, status, sortOrder } = req.body;
  const service = await prisma.hotelService.update({
    where: { id: Number(req.params.id) },
    data: {
      name, description, icon, type,
      price: price ? Number(price) : null,
      status: status !== undefined ? Number(status) : 1,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
    },
  });
  return success(res, service);
};

const adminDeleteService = async (req, res) => {
  await prisma.hotelService.delete({ where: { id: Number(req.params.id) } });
  return success(res, null, '删除成功');
};

const adminListServiceOrders = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status, hotelCode, keyword } = req.query;
  const where = {};
  if (status) where.status = status;
  if (hotelCode) where.hotelCode = hotelCode;
  if (keyword) where.orderNo = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.serviceOrder.findMany({
      where,
      include: { service: true },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.serviceOrder.count({ where }),
  ]);
  return paginate(res, list.map(formatServiceOrder), total, pageNum, pageSize);
};

const adminUpdateServiceOrderStatus = async (req, res) => {
  const { orderNo, status } = req.body;
  const order = await prisma.serviceOrder.update({ where: { orderNo }, data: { status } });
  return success(res, formatServiceOrder(order));
};

const formatServiceOrder = (o) => ({
  ...o,
  details: tryParse(o.details, o.details),
});

module.exports = {
  getHotelServices, getServiceDictionary, createServiceOrder,
  getServiceOrderList, updateServiceOrder, saveRecommendation, getComplaintAndAdvice,
  adminListServices, adminCreateService, adminUpdateService, adminDeleteService,
  adminListServiceOrders, adminUpdateServiceOrderStatus,
};
