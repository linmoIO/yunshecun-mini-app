'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error, paginate } = require('../utils/response');

const prisma = new PrismaClient();
const tryParse = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };

// ---- 小程序端 ----

const listGoods = async (req, res) => {
  const { pageNum = 1, pageSize = 20, category, keyword } = req.query;
  const where = { status: 1 };
  if (category) where.category = category;
  if (keyword) where.name = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.shopProduct.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.shopProduct.count({ where }),
  ]);
  return success(res, { list: list.map(formatProduct), total });
};

const goodsDetail = async (req, res) => {
  const { goodsId, productCode } = req.query;
  const product = goodsId
    ? await prisma.shopProduct.findUnique({ where: { id: Number(goodsId) } })
    : await prisma.shopProduct.findUnique({ where: { productCode } });
  if (!product) return error(res, '商品不存在');
  return success(res, formatProduct(product));
};

const goodsSku = async (req, res) => {
  const { goodsId } = req.query;
  const product = await prisma.shopProduct.findUnique({ where: { id: Number(goodsId) } });
  if (!product) return error(res, '商品不存在');
  return success(res, { skuList: tryParse(product.skuInfo, []) });
};

const submitOrder = async (req, res) => {
  const { items, addressId, couponNo, notes } = req.body;
  if (!items?.length) return error(res, '请选择商品');

  let totalAmount = 0;
  const orderItems = [];
  for (const item of items) {
    const product = await prisma.shopProduct.findUnique({ where: { id: Number(item.productId) } });
    if (!product || product.status !== 1) return error(res, `商品 ${item.productName || ''} 不存在`);
    const price = product.price;
    totalAmount += price * item.quantity;
    orderItems.push({ productId: product.id, productName: product.name, price, quantity: item.quantity, skuInfo: JSON.stringify(item.skuInfo || {}) });
  }

  let discount = 0;
  if (couponNo) {
    const mc = await prisma.memberCoupon.findFirst({
      where: { couponNo, memberId: req.member.id, status: 0 },
      include: { coupon: true },
    });
    if (mc?.coupon) {
      if (mc.coupon.minAmount && totalAmount < mc.coupon.minAmount) {
        return error(res, `订单金额需满${mc.coupon.minAmount}元才可使用该优惠券`);
      }
      discount = Math.min(mc.coupon.discountAmount || 0, mc.coupon.maxDiscount || Infinity);
    }
  }

  const order = await prisma.shopOrder.create({
    data: {
      memberId: req.member.id,
      status: 'pending',
      totalAmount: Math.max(0, totalAmount - discount),
      discount,
      addressId: addressId ? Number(addressId) : null,
      notes,
      items: { create: orderItems },
    },
    include: { items: true },
  });
  return success(res, { orderNo: order.orderNo, totalAmount: order.totalAmount });
};

const shopOrderDetail = async (req, res) => {
  const { orderNo } = req.query;
  const order = await prisma.shopOrder.findUnique({
    where: { orderNo },
    include: { items: { include: { product: true } } },
  });
  if (!order) return error(res, '订单不存在');
  return success(res, formatShopOrder(order));
};

const addCollection = async (req, res) => {
  const { goodsId } = req.body;
  await prisma.goodsCollection.upsert({
    where: { id: 0 },
    update: {},
    create: { memberId: req.member.id, productId: Number(goodsId) },
  });
  return success(res, null, '收藏成功');
};

const deleteCollection = async (req, res) => {
  const { goodsId } = req.body;
  await prisma.goodsCollection.deleteMany({ where: { memberId: req.member.id, productId: Number(goodsId) } });
  return success(res, null, '取消收藏');
};

const getCollection = async (req, res) => {
  const list = await prisma.goodsCollection.findMany({
    where: { memberId: req.member.id },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });
  return success(res, { list: list.map(c => ({ ...c, product: c.product ? formatProduct(c.product) : null })) });
};

const isCollection = async (req, res) => {
  const { goodsId } = req.query;
  const col = await prisma.goodsCollection.findFirst({ where: { memberId: req.member.id, productId: Number(goodsId) } });
  return success(res, { isCollection: !!col });
};

// ---- 管理端 ----

const adminListProducts = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status, keyword, category } = req.query;
  const where = {};
  if (status !== undefined) where.status = Number(status);
  if (keyword) where.name = { contains: keyword };
  if (category) where.category = category;

  const [list, total] = await Promise.all([
    prisma.shopProduct.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.shopProduct.count({ where }),
  ]);
  return paginate(res, list.map(formatProduct), total, pageNum, pageSize);
};

const adminCreateProduct = async (req, res) => {
  const { name, description, price, originalPrice, stock, coverImage, images, category, status, sortOrder, skuInfo } = req.body;
  const product = await prisma.shopProduct.create({
    data: {
      name, description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      stock: stock ? Number(stock) : 0,
      coverImage, category,
      status: status !== undefined ? Number(status) : 1,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      images: images ? (typeof images === 'string' ? images : JSON.stringify(images)) : null,
      skuInfo: skuInfo ? (typeof skuInfo === 'string' ? skuInfo : JSON.stringify(skuInfo)) : null,
    },
  });
  return success(res, formatProduct(product));
};

const adminUpdateProduct = async (req, res) => {
  const { name, description, price, originalPrice, stock, coverImage, images, category, status, sortOrder, skuInfo } = req.body;
  const product = await prisma.shopProduct.update({
    where: { id: Number(req.params.id) },
    data: {
      name, description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      stock: stock ? Number(stock) : 0,
      coverImage, category,
      status: status !== undefined ? Number(status) : 1,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      images: images ? (typeof images === 'string' ? images : JSON.stringify(images)) : null,
      skuInfo: skuInfo ? (typeof skuInfo === 'string' ? skuInfo : JSON.stringify(skuInfo)) : null,
    },
  });
  return success(res, formatProduct(product));
};

const adminDeleteProduct = async (req, res) => {
  await prisma.shopProduct.delete({ where: { id: Number(req.params.id) } });
  return success(res, null, '删除成功');
};

const adminListOrders = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status, keyword } = req.query;
  const where = {};
  if (status) where.status = status;
  if (keyword) where.orderNo = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.shopOrder.findMany({
      where,
      include: { items: { include: { product: true } }, member: { select: { nickname: true, phone: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.shopOrder.count({ where }),
  ]);
  return paginate(res, list.map(formatShopOrder), total, pageNum, pageSize);
};

const adminUpdateOrderStatus = async (req, res) => {
  const { orderNo, status, trackingNo } = req.body;
  const order = await prisma.shopOrder.update({ where: { orderNo }, data: { status, ...(trackingNo && { trackingNo }) } });
  return success(res, formatShopOrder(order));
};

const formatProduct = (p) => ({
  ...p,
  images: tryParse(p.images, []),
  skuInfo: tryParse(p.skuInfo, []),
});

const formatShopOrder = (o) => ({
  ...o,
  items: o.items?.map(i => ({ ...i, product: i.product ? formatProduct(i.product) : null, skuInfo: tryParse(i.skuInfo, {}) })) || [],
});

// ---- 新版商品详情 & 下单接口 ----

const getMyShopOrders = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status } = req.query;
  const where = { memberId: req.member.id };
  if (status) {
    const statuses = status.split(',').map(s => s.trim()).filter(Boolean);
    where.status = statuses.length === 1 ? statuses[0] : { in: statuses };
  }
  const [list, total] = await Promise.all([
    prisma.shopOrder.findMany({
      where,
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.shopOrder.count({ where }),
  ]);
  return success(res, { list: list.map(formatShopOrder), total });
};

const listGoodsPublic = async (req, res) => {
  const { pageNum = 1, pageSize = 50, category } = req.query;
  const where = { status: 1 };
  if (category && category !== 'all') where.category = category;
  const [list, total] = await Promise.all([
    prisma.shopProduct.findMany({ where, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }], skip: (Number(pageNum) - 1) * Number(pageSize), take: Number(pageSize) }),
    prisma.shopProduct.count({ where }),
  ]);
  return success(res, { list: list.map(formatProduct), total });
};

const getProductById = async (req, res) => {
  const product = await prisma.shopProduct.findUnique({ where: { id: Number(req.params.id) } });
  if (!product || product.status !== 1) return error(res, '商品不存在或已下架');
  return success(res, formatProduct(product));
};

const createShopOrder = async (req, res) => {
  const { productId, quantity = 1, contactName, contactPhone, address, province, city, district, notes } = req.body;
  if (!productId) return error(res, '请选择商品');
  const product = await prisma.shopProduct.findUnique({ where: { id: Number(productId) } });
  if (!product || product.status !== 1) return error(res, '商品不存在或已下架');
  if (product.stock !== null && product.stock < quantity) return error(res, '库存不足');

  const totalAmount = product.price * Number(quantity);
  const order = await prisma.shopOrder.create({
    data: {
      memberId: req.member.id,
      status: 'pending',
      totalAmount,
      notes: [notes, contactName && `收件人:${contactName}`, contactPhone && `电话:${contactPhone}`, address && `地址:${[province, city, district, address].filter(Boolean).join(' ')}`].filter(Boolean).join(' | '),
      items: { create: [{ productId: product.id, productName: product.name, price: product.price, quantity: Number(quantity) }] },
    },
    include: { items: true },
  });

  // 减库存
  if (product.stock !== null) {
    await prisma.shopProduct.update({ where: { id: product.id }, data: { stock: { decrement: Number(quantity) } } });
  }

  return success(res, { orderNo: order.orderNo, totalAmount: order.totalAmount });
};

module.exports = {
  listGoods, goodsDetail, goodsSku, submitOrder, shopOrderDetail,
  addCollection, deleteCollection, getCollection, isCollection,
  adminListProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct,
  adminListOrders, adminUpdateOrderStatus,
  listGoodsPublic, getProductById, createShopOrder, getMyShopOrders,
};
