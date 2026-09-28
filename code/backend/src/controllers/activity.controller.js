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

// ---- 活动详情页（pagesE/dailyActivity/dailyActivityDetail）经 interfaceTransfer 调用的兼容接口 ----
// 按《云舍村入住细则》：活动每日两个时段，需提前 8 小时预约
const ACTIVITY_SLOTS = [['10:00', '12:00'], ['15:00', '17:00']];
const ACTIVITY_EARLY_HOURS = 8;
const CALENDAR_MAX_DAYS = 92;

const toMinPriceDto = (price) => ({
  payType: 'CASH',
  priceType: Number(price) > 0 ? 'CASH' : 'FREE',
  price: Number(price) || 0,
  mixPrice: 0,
  credit: 0,
  mixCredit: 0,
});

// api/activity/getOneActivityWithPrice
const getActivityWithPriceForMiniApp = async (activityCode) => {
  const activity = activityCode
    ? await prisma.activity.findFirst({ where: { activityCode, status: 1 } })
    : null;
  if (!activity) return null;
  const images = tryParse(activity.images, []);
  const pictures = images.length ? images : [activity.coverImage].filter(Boolean);
  const phone = (await prisma.sysConfig.findFirst({ where: { key: 'cs_phone' } }).catch(() => null))?.value || '0736-7070666';
  return {
    activityCode: activity.activityCode,
    name: activity.title,
    introduce: activity.description || '',
    indexPicture: activity.coverImage || '',
    roundPictures: pictures.join(';'),
    videoUrls: activity.videoUrl || '',
    shareReport: activity.coverImage || '',
    typeDescript: activity.category || '',
    tagsList: activity.category ? [activity.category] : [],
    minPriceDto: toMinPriceDto(activity.price),
    minCapacity: 0,
    maxCapacity: activity.maxPersons || 0,
    adapterPeople: 'ALL',
    earlyDays: ACTIVITY_EARLY_HOURS,
    resrvRule: 'ONE_HOUR',
    capacityType: activity.maxPersons == null ? 'INFINITY' : 'LIMIT',
    phone,
    activityBegin: ACTIVITY_SLOTS[0][0],
    activityEnd: ACTIVITY_SLOTS[ACTIVITY_SLOTS.length - 1][1],
    location: activity.location || '',
    priceExplain: activity.description || '',
    useRule: '',
    benefit: '',
    extraTips: '',
    resrvNotice: '',
    questions: '',
    belongHotels: '',
    canResrv: 'T',
    minSaleSize: 1,
  };
};

// 每日余量与 saveActivityOrder 的扣减规则保持一致：有日期库存按库存，否则按 maxPersons 减去当日有效订单，都没有则不限
const getActivityRemaining = async (activity, day) => {
  const inv = await prisma.dateInventory.findFirst({
    where: { type: 'activity', targetId: activity.id, date: day, status: 1 },
  });
  if (inv) return Math.max(0, Number(inv.stock));
  if (activity.maxPersons == null) return null;
  const used = await prisma.activityOrder.aggregate({
    where: { activityId: activity.id, activityDate: day, status: { notIn: ['cancelled', 'refunded'] } },
    _sum: { quantity: true },
  });
  return Math.max(0, Number(activity.maxPersons) - Number(used._sum.quantity || 0));
};

// api/singleWechat/onSaleCalendarWithMoney：返回 { 'YYYY-MM-DD': { calendarWithPriceDto, sumCapacity, minPriceDto } }
const getActivityCalendarForMiniApp = async ({ activityCode, startDate, endDate }) => {
  const activity = activityCode
    ? await prisma.activity.findFirst({ where: { activityCode, status: 1 } })
    : null;
  if (!activity) return {};
  const today = new Date().toISOString().slice(0, 10);
  const from = [normalizeDate(startDate) || today, normalizeDate(activity.startDate), today].filter(isValidDate).sort().pop();
  const to = [normalizeDate(endDate), normalizeDate(activity.endDate)].filter(isValidDate).sort()[0];
  if (!from || !to || from > to) return {};

  const result = {};
  const cursor = new Date(`${from}T00:00:00Z`);
  for (let i = 0; i < CALENDAR_MAX_DAYS; i++) {
    const day = cursor.toISOString().slice(0, 10);
    if (day > to) break;
    const remaining = await getActivityRemaining(activity, day);
    if (remaining !== 0) {
      const capacityType = remaining == null ? 'INFINITY' : 'LIMIT';
      const capacity = remaining == null ? 999 : remaining;
      result[day] = {
        sumCapacity: capacity,
        minPriceDto: toMinPriceDto(activity.price),
        calendarWithPriceDto: ACTIVITY_SLOTS.map(([start, end]) => ({
          bizDate: day,
          startDate: start,
          endDate: end,
          onSaleCode: `${activity.activityCode}|${day}|${start}`,
          capacity,
          capacityType,
          price: Number(activity.price) || 0,
        })),
      };
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return result;
};

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
  getActivityWithPriceForMiniApp, getActivityCalendarForMiniApp,
};
