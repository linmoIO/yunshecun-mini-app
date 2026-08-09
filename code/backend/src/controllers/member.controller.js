'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error } = require('../utils/response');

const prisma = new PrismaClient();

const getMemberInfo = async (req, res) => {
  const member = await prisma.member.findUnique({ where: { id: req.member.id } });
  if (!member) return error(res, '会员不存在');
  return success(res, formatMember(member));
};

const updateMemberInfo = async (req, res) => {
  const { nickname, avatar, realName, gender, birthday, email } = req.body;
  const updated = await prisma.member.update({
    where: { id: req.member.id },
    data: { nickname, avatar, realName, gender, birthday, email },
  });
  return success(res, formatMember(updated));
};

const getMemberCardLevels = async (req, res) => {
  const levels = [
    { level: '普通会员', minPoints: 0, maxPoints: 999, benefits: ['基础权益'] },
    { level: '银卡会员', minPoints: 1000, maxPoints: 4999, benefits: ['9折优惠', '生日礼遇'] },
    { level: '金卡会员', minPoints: 5000, maxPoints: 19999, benefits: ['85折优惠', '专属客服', '积分加速'] },
    { level: '铂金会员', minPoints: 20000, maxPoints: 99999, benefits: ['8折优惠', '优先预订', '免费升房'] },
    { level: '钻石会员', minPoints: 100000, maxPoints: null, benefits: ['专属礼遇', '私人管家', '无限权益'] },
  ];
  return success(res, { cardLevels: levels });
};

const getPoints = async (req, res) => {
  const { memberId, pageNum = 1, pageSize = 20 } = req.query;
  const skip = (pageNum - 1) * pageSize;
  const [list, total] = await Promise.all([
    prisma.pointTransaction.findMany({
      where: { memberId: req.member.id },
      orderBy: { createdAt: 'desc' },
      skip: Number(skip),
      take: Number(pageSize),
    }),
    prisma.pointTransaction.count({ where: { memberId: req.member.id } }),
  ]);
  return success(res, { list, total, page: Number(pageNum), pageSize: Number(pageSize) });
};

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

const getAccountBalance = async (req, res) => {
  const member = await prisma.member.findUnique({
    where: { id: req.member.id },
    select: { balance: true, points: true },
  });
  const cfgRows = await prisma.sysConfig.findMany({
    where: { key: { in: ['points_enabled', 'points_redeem_value', 'points_earn_yuan_per_point', 'points_max_deduct_rate'] } },
  }).catch(() => []);
  const cfg = Object.fromEntries(cfgRows.map(r => [r.key, r.value]));
  const redeemValue = Math.max(Number(cfg.points_redeem_value || 0.1), 0);
  const points = member?.points || 0;
  const pointMoney = Math.round(points * redeemValue * 100) / 100;
  return success(res, {
    balance: member?.balance || 0,
    points,
    pointBalance: points,
    pointMoney,
    pointDeductMoney: pointMoney,
    pointsEnabled: cfg.points_enabled !== 'false',
    pointsRedeemValue: redeemValue,
    pointsEarnYuanPerPoint: Number(cfg.points_earn_yuan_per_point || 10),
    pointsMaxDeductRate: Number(cfg.points_max_deduct_rate || 1),
    treatBalance: 0,
  });
};

// 收货地址
const getAddresses = async (req, res) => {
  const list = await prisma.shippingAddress.findMany({
    where: { memberId: req.member.id },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
  });
  return success(res, list);
};

const addAddress = async (req, res) => {
  const { name, phone, province, city, district, address, isDefault } = req.body;
  if (!name || !phone || !address) return error(res, '请填写完整地址信息');

  if (isDefault) {
    await prisma.shippingAddress.updateMany({
      where: { memberId: req.member.id },
      data: { isDefault: false },
    });
  }
  const addr = await prisma.shippingAddress.create({
    data: { memberId: req.member.id, name, phone, province, city, district, address, isDefault: !!isDefault },
  });
  return success(res, addr);
};

const deleteAddress = async (req, res) => {
  const { id, memberId } = req.query;
  await prisma.shippingAddress.deleteMany({ where: { id: Number(id), memberId: req.member.id } });
  return success(res, null, '删除成功');
};

// 常旅客/随行人员
const PHONE_PATTERN = /^1\d{10}$/;
const ID_TYPE_MAP = {
  '01': 'idCard',
  '身份证': 'idCard',
  idCard: 'idCard',
  '02': 'temporaryIdCard',
  '临时身份证': 'temporaryIdCard',
  temporaryIdCard: 'temporaryIdCard',
  '14': 'passport',
  '护照': 'passport',
  passport: 'passport',
  '21': 'travelPermit',
  '港澳通行证': 'travelPermit',
  travelPermit: 'travelPermit',
};

const isValidDate = (value) => {
  if (!/^\d{8}$/.test(value)) return false;
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6));
  const day = Number(value.slice(6, 8));
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

const isValidIdCard = (value) => {
  const idNumber = String(value || '').trim().toUpperCase();
  if (/^\d{15}$/.test(idNumber)) return isValidDate(`19${idNumber.slice(6, 12)}`);
  if (!/^\d{17}[\dX]$/.test(idNumber) || !isValidDate(idNumber.slice(6, 14))) return false;
  const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checks = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  const sum = idNumber.slice(0, 17).split('').reduce((total, digit, index) => total + Number(digit) * factors[index], 0);
  return checks[sum % 11] === idNumber[17];
};

const normalizeGuestInput = (body = {}) => {
  const rawIdType = String(body.idType || body.extraIdcode || '').trim();
  return {
    name: String(body.name || body.extraName || '').trim(),
    phone: String(body.phone || body.extraMobile || '').trim(),
    email: String(body.email || body.extraEmail || '').trim(),
    idType: ID_TYPE_MAP[rawIdType] || rawIdType,
    idNumber: String(body.idNumber || body.extraIdno || '').trim(),
    birthday: String(body.birthday || body.extraBirth || '').trim(),
    gender: body.gender || body.campSex || null,
    nationality: String(body.nationality || '中国').trim(),
  };
};

const validateGuestInput = (guest) => {
  if (!guest.name) return '请填写姓名';
  if (guest.phone && !PHONE_PATTERN.test(guest.phone)) return '手机号格式不正确';
  if (!guest.idType || !guest.idNumber) return '请填写完整证件信息';
  if (guest.idType || guest.idNumber) {
    const type = ID_TYPE_MAP[guest.idType];
    if (!type) return '证件类型不支持';
    if (!guest.idNumber) return '请填写证件号码';
    const valid = type === 'idCard' || type === 'temporaryIdCard'
      ? isValidIdCard(guest.idNumber)
      : type === 'passport'
        ? /^[A-Za-z0-9]{5,17}$/.test(guest.idNumber)
        : /^[A-Za-z]\d{6,10}[A-Za-z0-9]?$/.test(guest.idNumber);
    if (!valid) return '证件号码格式不正确';
  }
  if (guest.birthday && (
    !/^\d{4}-\d{2}-\d{2}$/.test(guest.birthday)
    || !isValidDate(guest.birthday.replaceAll('-', ''))
  )) return '出生日期格式不正确';
  return '';
};

const getGuests = async (req, res) => {
  const list = await prisma.guest.findMany({
    where: { memberId: req.member.id },
    orderBy: { createdAt: 'desc' },
  });
  const idCodeMap = {
    idCard: '01',
    temporaryIdCard: '02',
    passport: '14',
    travelPermit: '21',
  };
  const legacyList = list.map((guest) => ({
    ...guest,
    guestId: String(guest.id),
    guestNo: String(guest.id),
    mobile: guest.phone || '',
    idCode: idCodeMap[guest.idType] || '01',
    idNo: guest.idNumber || '',
    birth: guest.birthday || '',
    sex: guest.gender == null ? '' : String(guest.gender),
    guestLinkRelationExtraSimpleDtoList: [
      { type: 'EXTRA_NAME', value: guest.name || '' },
      { type: 'EXTRA_MOBILE', value: guest.phone || '' },
      { type: 'EXTRA_IDCODE', value: idCodeMap[guest.idType] || '01' },
      { type: 'EXTRA_IDNO', value: guest.idNumber || '' },
      { type: 'EXTRA_BIRTH', value: guest.birthday || '' },
      { type: 'CAMP_SEX', value: guest.gender == null ? '' : String(guest.gender) },
    ],
  }));
  return res.json({
    code: 0,
    result: 1,
    data: { list },
    retVal: { result: 0, retVal: legacyList },
  });
};

const saveGuest = async (req, res) => {
  const guestInput = normalizeGuestInput(req.body);
  const validationError = validateGuestInput(guestInput);
  if (validationError) return error(res, validationError);
  const guest = await prisma.guest.create({
    data: { memberId: req.member.id, ...guestInput, gender: guestInput.gender ? Number(guestInput.gender) : null },
  });
  return success(res, guest);
};

const updateGuest = async (req, res) => {
  const { id } = req.body;
  const guestInput = normalizeGuestInput(req.body);
  const validationError = validateGuestInput(guestInput);
  if (validationError) return error(res, validationError);
  const existing = await prisma.guest.findFirst({ where: { id: Number(id), memberId: req.member.id } });
  if (!existing) return error(res, '出行人不存在');
  const guest = await prisma.guest.update({
    where: { id: Number(id) },
    data: { ...guestInput, gender: guestInput.gender ? Number(guestInput.gender) : null },
  });
  return success(res, guest);
};

const deleteGuest = async (req, res) => {
  const { guestId } = req.body;
  await prisma.guest.deleteMany({ where: { id: Number(guestId), memberId: req.member.id } });
  return success(res, null, '删除成功');
};

// 发票信息
const getMemberInvoice = async (req, res) => {
  const list = await prisma.memberInvoice.findMany({
    where: { memberId: req.member.id },
  });
  return success(res, { list });
};

const saveOrUpdateInvoice = async (req, res) => {
  const { id, type, title, taxNo, phone, email, bankName, bankAccount, address, isDefault } = req.body;
  if (isDefault) {
    await prisma.memberInvoice.updateMany({
      where: { memberId: req.member.id },
      data: { isDefault: false },
    });
  }
  let invoice;
  if (id) {
    invoice = await prisma.memberInvoice.update({
      where: { id: Number(id) },
      data: { type, title, taxNo, phone, email, bankName, bankAccount, address, isDefault: !!isDefault },
    });
  } else {
    invoice = await prisma.memberInvoice.create({
      data: { memberId: req.member.id, type, title, taxNo, phone, email, bankName, bankAccount, address, isDefault: !!isDefault },
    });
  }
  return success(res, invoice);
};

const deleteInvoice = async (req, res) => {
  const { id } = req.query;
  await prisma.memberInvoice.deleteMany({ where: { id: Number(id), memberId: req.member.id } });
  return success(res, null, '删除成功');
};

// 受益人
const getBeneficiaries = async (req, res) => {
  if (!req.member?.id) return success(res, { list: [] });
  const list = await prisma.beneficiary.findMany({
    where: { memberId: req.member.id },
    include: { target: { select: { memberId: true, nickname: true, phone: true, avatar: true } } },
  });
  return success(res, { list });
};

const saveBeneficiary = async (req, res) => {
  const { targetMemberId } = req.body;
  const target = await prisma.member.findUnique({ where: { memberId: targetMemberId } });
  if (!target) return error(res, '未找到该会员');
  const existing = await prisma.beneficiary.findFirst({
    where: { memberId: req.member.id, targetId: target.id },
  });
  if (existing) return error(res, '已是受益人');
  const b = await prisma.beneficiary.create({
    data: { memberId: req.member.id, targetId: target.id },
  });
  return success(res, b);
};

const deleteBeneficiary = async (req, res) => {
  const { relationId } = req.body;
  await prisma.beneficiary.deleteMany({ where: { id: Number(relationId), memberId: req.member.id } });
  return success(res, null, '删除成功');
};

const searchMember = async (req, res) => {
  const { mobile, email } = req.body;
  const where = {};
  if (mobile) where.phone = mobile;
  if (email) where.email = email;
  const member = await prisma.member.findFirst({ where, select: { memberId: true, nickname: true, phone: true, avatar: true } });
  if (!member) return error(res, '未找到该会员');
  return success(res, member);
};

// 积分转让
const transferPoints = async (req, res) => {
  const { targetMemberId, points } = req.body;
  const pts = Number(points);
  if (!pts || pts <= 0) return error(res, '转让积分数量无效');

  const from = await prisma.member.findUnique({ where: { id: req.member.id } });
  if ((from?.points || 0) < pts) return error(res, '积分不足');

  const target = await prisma.member.findUnique({ where: { memberId: targetMemberId } });
  if (!target) return error(res, '目标会员不存在');

  await prisma.$transaction([
    prisma.member.update({ where: { id: from.id }, data: { points: { decrement: pts } } }),
    prisma.member.update({ where: { id: target.id }, data: { points: { increment: pts } } }),
    prisma.pointTransaction.create({ data: { memberId: from.id, points: -pts, type: 'transfer', description: `转让给${target.nickname || target.phone}` } }),
    prisma.pointTransaction.create({ data: { memberId: target.id, points: pts, type: 'transfer', description: `来自${from.nickname || from.phone}的转让` } }),
  ]);
  return success(res, null, '积分转让成功');
};

const CARD_LEVEL_DESC = {
  '普通会员': '普通会员', '银卡会员': '银卡会员', '金卡会员': '金卡会员',
  '铂金会员': '铂金会员', '钻石会员': '钻石会员',
};
const formatMember = (m) => ({
  memberId: m.memberId,
  memberIdStr: m.memberId,
  memberToken: m.memberToken || '',
  nickname: m.nickname || '云舍村用户',
  avatar: m.avatar || '',
  headPortraitUrl: m.avatar || '',
  phone: m.phone || '',
  mobile: m.phone || '',
  email: m.email || '',
  realName: m.realName || '',
  gender: m.gender,
  birthday: m.birthday || '',
  cardLevel: m.cardLevel || '普通会员',
  cardLevelDescript: CARD_LEVEL_DESC[m.cardLevel] || m.cardLevel || '普通会员',
  cardId: m.id,
  cardNo: m.cardNo || '',
  points: m.points || 0,
  pointBalance: m.points || 0,
  balance: m.balance || 0,
  memberBalanceUsable: m.balance || 0,
  couponNum: 0,
  status: m.status,
  // memberCenter.js 访问 cardListDto.length，必须是数组
  cardListDto: [],
});

module.exports = {
  getMemberInfo, updateMemberInfo, getMemberCardLevels,
  getPoints, getMemberCoupons, getAccountBalance,
  getAddresses, addAddress, deleteAddress,
  getGuests, saveGuest, updateGuest, deleteGuest, normalizeGuestInput, validateGuestInput,
  getMemberInvoice, saveOrUpdateInvoice, deleteInvoice,
  getBeneficiaries, saveBeneficiary, deleteBeneficiary,
  searchMember, transferPoints,
};
