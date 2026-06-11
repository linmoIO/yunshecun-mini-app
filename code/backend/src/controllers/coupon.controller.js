'use strict';

const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const { success, error, paginate } = require('../utils/response');

const prisma = new PrismaClient();

// ---- 小程序端 ----

const getMemberCoupons = async (req, res) => {
  const { status, pageNum = 1, pageSize = 20 } = req.query;
  const where = { memberId: req.member.id };
  if (status !== undefined) where.status = Number(status);

  const [list, total] = await Promise.all([
    prisma.memberCoupon.findMany({
      where,
      include: { coupon: true },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.memberCoupon.count({ where }),
  ]);
  return success(res, { list, total });
};

const getCouponDetail = async (req, res) => {
  const { couponNo } = req.query;
  const mc = await prisma.memberCoupon.findFirst({
    where: { couponNo, memberId: req.member.id },
    include: { coupon: true },
  });
  if (!mc) return error(res, '优惠券不存在');
  return success(res, mc);
};

const receiveGiftCoupon = async (req, res) => {
  const { couponCode } = req.query || req.body;
  const coupon = await prisma.coupon.findUnique({ where: { couponCode } });
  if (!coupon) return error(res, '优惠券不存在');
  if (coupon.status !== 1) return error(res, '优惠券已下架');
  if (coupon.endDate && new Date(coupon.endDate) < new Date()) return error(res, '优惠券已过期');
  if (coupon.totalCount && coupon.usedCount >= coupon.totalCount) return error(res, '优惠券已领完');

  // 检查是否已领取
  const existing = await prisma.memberCoupon.findFirst({
    where: { memberId: req.member.id, couponId: coupon.id, status: 0 },
  });
  if (existing) return error(res, '已领取该优惠券');

  const mc = await prisma.memberCoupon.create({
    data: { memberId: req.member.id, couponId: coupon.id },
  });
  return success(res, mc, '领取成功');
};

const bindCoupon = async (req, res) => {
  return receiveGiftCoupon(req, res);
};

const computeMaxDiscount = async (req, res) => {
  const { orderAmount, productCode, orderType } = req.body;
  const coupons = await prisma.memberCoupon.findMany({
    where: { memberId: req.member.id, status: 0 },
    include: { coupon: true },
  });

  let maxDiscount = 0;
  let bestCoupon = null;

  for (const mc of coupons) {
    const c = mc.coupon;
    if (c.endDate && new Date(c.endDate) < new Date()) continue;
    if (c.minAmount && Number(orderAmount) < c.minAmount) continue;
    const discount = Math.min(c.discountAmount || 0, c.maxDiscount || Infinity);
    if (discount > maxDiscount) {
      maxDiscount = discount;
      bestCoupon = mc;
    }
  }

  return success(res, { maxDiscount, bestCoupon });
};

const checkCouponExclusion = async (req, res) => {
  const { couponNo, orderType } = req.body;
  const mc = await prisma.memberCoupon.findFirst({ where: { couponNo } });
  return success(res, { isExclusive: false, canUse: !!mc });
};

const getAvailableCoupons = async (req, res) => {
  const { orderAmount } = req.body || req.query;
  const list = await prisma.memberCoupon.findMany({
    where: { memberId: req.member.id, status: 0 },
    include: { coupon: true },
  });
  const available = list.filter(mc => {
    const c = mc.coupon;
    if (c.status !== 1) return false;
    if (c.endDate && new Date(c.endDate) < new Date()) return false;
    if (c.minAmount && Number(orderAmount) < c.minAmount) return false;
    return true;
  });
  return success(res, { list: available });
};

// ---- 管理端 ----

const adminListCoupons = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status, keyword } = req.query;
  const where = {};
  if (status !== undefined) where.status = Number(status);
  if (keyword) where.name = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.coupon.findMany({
      where,
      include: { _count: { select: { memberCoupons: true } } },
      orderBy: { updatedAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.coupon.count({ where }),
  ]);
  return paginate(res, list, total, pageNum, pageSize);
};

const adminCreateCoupon = async (req, res) => {
  const { name, description, type, discountAmount, discountRate, minAmount, maxDiscount,
    startDate, endDate, totalCount, status, applicableTo } = req.body;

  const coupon = await prisma.coupon.create({
    data: {
      name, description, type,
      discountAmount: discountAmount ? Number(discountAmount) : null,
      discountRate: discountRate ? Number(discountRate) : null,
      minAmount: minAmount ? Number(minAmount) : null,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      totalCount: totalCount ? Number(totalCount) : null,
      status: status !== undefined ? Number(status) : 1,
      applicableTo: applicableTo ? (typeof applicableTo === 'string' ? applicableTo : JSON.stringify(applicableTo)) : null,
    },
  });
  return success(res, coupon);
};

const adminUpdateCoupon = async (req, res) => {
  const { name, description, type, discountAmount, discountRate, minAmount, maxDiscount,
    startDate, endDate, totalCount, status, applicableTo } = req.body;

  const coupon = await prisma.coupon.update({
    where: { id: Number(req.params.id) },
    data: {
      name, description, type,
      discountAmount: discountAmount ? Number(discountAmount) : null,
      discountRate: discountRate ? Number(discountRate) : null,
      minAmount: minAmount ? Number(minAmount) : null,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      totalCount: totalCount ? Number(totalCount) : null,
      status: status !== undefined ? Number(status) : 1,
      applicableTo: applicableTo ? (typeof applicableTo === 'string' ? applicableTo : JSON.stringify(applicableTo)) : null,
    },
  });
  return success(res, coupon);
};

const adminDeleteCoupon = async (req, res) => {
  await prisma.coupon.delete({ where: { id: Number(req.params.id) } });
  return success(res, null, '删除成功');
};

// 向指定会员发放优惠券
const adminIssueCoupon = async (req, res) => {
  const { couponId, memberIds, phones } = req.body;
  const coupon = await prisma.coupon.findUnique({ where: { id: Number(couponId) } });
  if (!coupon) return error(res, '优惠券不存在');

  let members = [];
  if (memberIds?.length) {
    members = await prisma.member.findMany({ where: { id: { in: memberIds.map(Number) } } });
  } else if (phones?.length) {
    members = await prisma.member.findMany({ where: { phone: { in: phones } } });
  }

  const issued = [];
  for (const m of members) {
    const mc = await prisma.memberCoupon.create({
      data: { memberId: m.id, couponId: coupon.id },
    });
    issued.push(mc);
  }

  return success(res, { issued: issued.length }, `已向 ${issued.length} 位会员发放优惠券`);
};

module.exports = {
  getMemberCoupons, getCouponDetail, receiveGiftCoupon, bindCoupon,
  computeMaxDiscount, checkCouponExclusion, getAvailableCoupons,
  adminListCoupons, adminCreateCoupon, adminUpdateCoupon, adminDeleteCoupon, adminIssueCoupon,
};
