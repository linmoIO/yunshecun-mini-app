'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error, paginate } = require('../utils/response');

const prisma = new PrismaClient();

// ---- 小程序端 ----

const getTravelProductList = async (req, res) => {
  const params = { ...(req.body || {}), ...(req.query || {}) };
  const { pageNum = 1, pageSize = 20, category, destination, keyword, firstNum } = params;
  const page = Number(firstNum || pageNum);
  const size = Number(pageSize);
  const where = { status: 1 };
  if (category) where.category = category;
  if (destination) where.destination = destination;
  if (keyword) where.title = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.travelProduct.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * size,
      take: size,
    }),
    prisma.travelProduct.count({ where }),
  ]);

  // productType 必须小写，travelType 必须是 productCode
  const CATEGORY_TO_TYPE = {
    Travel: 'travel', DestPackage: 'travel',
    ExchangeCoupon: 'tdq', Hotel: 'hotel', DayActivity: 'daily',
  };

  const items = list.map(p => {
    const categorySub = p.category || 'Travel';
    const travelType = p.productCode || String(p.id);
    return {
      ...formatProduct(p),
      productId: travelType,
      productType: CATEGORY_TO_TYPE[categorySub] || 'travel',  // 小写
      categorySub,
      travelType,   // Travel/DestPackage 详情页 URL 参数
      pics: p.coverImage || '',
      tagApiDtos: categorySub ? [{ tageDesc: categorySub }] : [],
      specificationsType: 'PEOPLE',
      skuFlag: true,
      minPriceDto: { payType: 'CASH', price: p.price || 0 },
      urls: p.coverImage ? [{ pictureType: 'LISTIMAGE', url: p.coverImage }] : [],
      success: true,
    };
  });

  // 兼容两种格式：list 格式（分页接口）+ retVal 格式（marketing接口）
  return res.json({
    code: 0,
    result: 0,
    msg: 'success',
    data: { list: items, total, pageNum: page, pageSize: size },
    retVal: items,
    totalRecord: total,
    success: true,
  });
};

const getTravelProductDetail = async (req, res) => {
  const { productCode, id } = req.query;
  const product = id
    ? await prisma.travelProduct.findUnique({ where: { id: Number(id) } })
    : await prisma.travelProduct.findUnique({ where: { productCode } });
  if (!product) return error(res, '产品不存在');
  return success(res, formatProduct(product));
};

const saveOrder = async (req, res) => {
  // 前端实际格式: { reserveOrderDto: {...}, dscAmountInfoDto: {...}, openid }
  // 兼容旧格式: { productCode, startDate, ... }
  const body = req.body || {};
  const dto = body.reserveOrderDto || body;
  const dsc = body.dscAmountInfoDto || {};

  const productCode = dto.productCode || body.productCode;
  const startDate = dto.beginDate || body.startDate;
  const endDate = (dto.endDate || body.endDate || '').split(' ')[0];  // 去掉时间部分
  const contactName = dto.contactName || dto.rsvMan || body.contactName || '';
  const contactPhone = dto.contactMobile || dto.mobile || body.contactPhone || '';
  const persons = Number(dto.adult || dto.num || body.persons || 1);
  const couponNo = body.couponNo;

  if (!productCode) return error(res, '缺少产品编码');

  const product = await prisma.travelProduct.findFirst({
    where: { OR: [{ productCode }, { id: isNaN(productCode) ? -1 : Number(productCode) }] },
  });
  if (!product) return error(res, '产品不存在');

  // 优先用 confirmOrder 页面计算好的价格，否则用产品单价 × 人数
  const readyPay = Number(dsc.pay || dsc.totalPrice || body.totalAmount || 0);
  const totalAmount = readyPay > 0 ? readyPay : product.price * persons;

  let discount = 0;
  if (couponNo) {
    const mc = await prisma.memberCoupon.findFirst({
      where: { couponNo, memberId: req.member.id, status: 0 },
      include: { coupon: true },
    });
    if (mc?.coupon) discount = mc.coupon.discountAmount || 0;
  }

  const order = await prisma.travelOrder.create({
    data: {
      memberId: req.member.id,
      productId: product.id,
      status: 'pending',
      totalAmount: Math.max(0, totalAmount - discount),
      discount,
      startDate: startDate || null,
      endDate: endDate || null,
      persons,
      contactName,
      contactPhone,
      guestInfo: JSON.stringify(dto.rsvDtos || []),
      notes: dto.remark || '',
    },
  });

  // confirmOrder.js 判断逻辑：result===1 为成功，msg 存订单号（用于跳转 pay 页）
  return res.json({
    code: 0,
    result: 1,          // 1=成功（不是0！）
    msg: order.orderNo, // msg 里放订单号，前端直接用于跳转
    data: {
      orderNo: order.orderNo,
      rsvNo: order.orderNo,
      totalAmount: order.totalAmount,
      payAmount: order.totalAmount,
    },
  });
};

const getOrderDetail = async (req, res) => {
  const { orderNo, travelOrderNo } = req.query;
  const no = travelOrderNo || orderNo;
  if (!no) return error(res, '缺少订单号');

  const order = await prisma.travelOrder.findFirst({
    where: { orderNo: no },
    include: { product: true },
  });
  if (!order) return error(res, '订单不存在');

  const fmt = formatOrder(order);
  // 兼容支付页 pay.js 期望的格式：result=1, retVal.reserveOrder
  return res.json({
    code: 0,
    result: 1,
    msg: 'success',
    data: fmt,
    retVal: {
      reserveOrder: {
        orderNo: order.orderNo,
        travelOrderNo: order.orderNo,
        productCode: order.product?.productCode || '',
        productDesc: order.product?.title || '',
        paySubject: order.product?.title || '',
        payRate: order.totalAmount,
        payAmount: order.totalAmount,
        rateSum: order.totalAmount,
        countdown: 1800,
        paySta: '1',    // 1=待支付
        beginDate: order.startDate,
        endDate: order.endDate,
        contactName: order.contactName,
        contactMobile: order.contactPhone,
        adult: order.persons || 1,
        status: order.status,
        ...fmt,
      },
    },
  });
};

const getMyTravelList = async (req, res) => {
  const { pageNum = 1, pageSize = 10, status } = req.body || req.query;
  const where = { memberId: req.member.id };
  if (status) where.status = status;

  const [list, total] = await Promise.all([
    prisma.travelOrder.findMany({
      where,
      include: { product: true },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.travelOrder.count({ where }),
  ]);
  return success(res, { list: list.map(formatOrder), total });
};

const queryOrderStatus = async (req, res) => {
  const { orderNo } = req.query;
  const order = await prisma.travelOrder.findUnique({ where: { orderNo }, select: { status: true, orderNo: true } });
  if (!order) return error(res, '订单不存在');
  return success(res, { orderNo: order.orderNo, status: order.status });
};

const cancelOrder = async (req, res) => {
  const { orderNo, cancelReason } = req.body;
  const order = await prisma.travelOrder.findFirst({ where: { orderNo, memberId: req.member.id } });
  if (!order) return error(res, '订单不存在');
  if (!['pending', 'paid'].includes(order.status)) return error(res, '当前状态不可取消');
  await prisma.travelOrder.update({ where: { orderNo }, data: { status: 'cancelled', cancelReason } });
  return success(res, null, '取消成功');
};

// ---- 管理端 ----

const adminListProducts = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status, keyword } = req.query;
  const where = {};
  if (status !== undefined) where.status = Number(status);
  if (keyword) where.title = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.travelProduct.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.travelProduct.count({ where }),
  ]);
  return paginate(res, list.map(formatProduct), total, pageNum, pageSize);
};

const adminGetProduct = async (req, res) => {
  const product = await prisma.travelProduct.findUnique({ where: { id: Number(req.params.id) } });
  if (!product) return error(res, '产品不存在');
  return success(res, formatProduct(product));
};

const adminCreateProduct = async (req, res) => {
  const data = buildProductData(req.body);
  const product = await prisma.travelProduct.create({ data });
  return success(res, formatProduct(product));
};

const adminUpdateProduct = async (req, res) => {
  const data = buildProductData(req.body);
  const product = await prisma.travelProduct.update({
    where: { id: Number(req.params.id) },
    data,
  });
  return success(res, formatProduct(product));
};

const adminDeleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  // 先解除订单对该产品的引用，再删除产品
  await prisma.travelOrder.updateMany({ where: { productId: id }, data: { productId: null } });
  await prisma.travelProduct.delete({ where: { id } });
  return success(res, null, '删除成功');
};

const adminUpdateProductMedia = async (req, res) => {
  const { id } = req.params;
  const { coverImage, images, videoUrl, videoThumb, videoLinkType } = req.body;
  const updated = await prisma.travelProduct.update({
    where: { id: Number(id) },
    data: {
      ...(coverImage !== undefined && { coverImage }),
      ...(images !== undefined && { images: typeof images === 'string' ? images : JSON.stringify(images) }),
      ...(videoUrl !== undefined && { videoUrl }),
      ...(videoThumb !== undefined && { videoThumb }),
      ...(videoLinkType !== undefined && { videoLinkType }),
    },
  });
  return success(res, formatProduct(updated));
};

const adminListOrders = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status, keyword } = req.query;
  const where = {};
  if (status) where.status = status;
  if (keyword) where.orderNo = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.travelOrder.findMany({
      where,
      include: { product: true, member: { select: { nickname: true, phone: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.travelOrder.count({ where }),
  ]);
  return paginate(res, list.map(formatOrder), total, pageNum, pageSize);
};

const adminUpdateOrderStatus = async (req, res) => {
  const { orderNo, status, cancelReason } = req.body;
  const order = await prisma.travelOrder.update({
    where: { orderNo },
    data: { status, ...(cancelReason && { cancelReason }) },
  });
  return success(res, formatOrder(order));
};

const buildProductData = (body) => {
  const { title, subtitle, description, price, originalPrice, coverImage, images, videoUrl, videoThumb,
    videoLinkType, category, destination, duration, minPersons, maxPersons, tags, itinerary,
    includes, excludes, notes, sortOrder, status } = body;
  return {
    title, subtitle, description,
    price: Number(price),
    originalPrice: originalPrice ? Number(originalPrice) : null,
    coverImage, videoUrl, videoThumb, videoLinkType, category, destination,
    duration: duration ? Number(duration) : null,
    minPersons: minPersons ? Number(minPersons) : null,
    maxPersons: maxPersons ? Number(maxPersons) : null,
    notes,
    sortOrder: sortOrder ? Number(sortOrder) : 0,
    status: status !== undefined ? Number(status) : 1,
    images: images ? (typeof images === 'string' ? images : JSON.stringify(images)) : null,
    tags: tags ? (typeof tags === 'string' ? tags : JSON.stringify(tags)) : null,
    itinerary: itinerary ? (typeof itinerary === 'string' ? itinerary : JSON.stringify(itinerary)) : null,
    includes: includes ? (typeof includes === 'string' ? includes : JSON.stringify(includes)) : null,
    excludes: excludes ? (typeof excludes === 'string' ? excludes : JSON.stringify(excludes)) : null,
  };
};

const formatProduct = (p) => ({
  ...p,
  images: tryParse(p.images, []),
  tags: tryParse(p.tags, []),
  itinerary: tryParse(p.itinerary, []),
  includes: tryParse(p.includes, []),
  excludes: tryParse(p.excludes, []),
});

const formatOrder = (o) => ({
  ...o,
  guestInfo: tryParse(o.guestInfo, []),
  product: o.product ? formatProduct(o.product) : null,
});

const tryParse = (str, fallback) => {
  if (!str) return fallback;
  try { return JSON.parse(str); } catch { return fallback; }
};

module.exports = {
  getTravelProductList, getTravelProductDetail, saveOrder, getOrderDetail,
  getMyTravelList, queryOrderStatus, cancelOrder,
  adminListProducts, adminGetProduct, adminCreateProduct, adminUpdateProduct,
  adminDeleteProduct, adminUpdateProductMedia, adminListOrders, adminUpdateOrderStatus,
};
