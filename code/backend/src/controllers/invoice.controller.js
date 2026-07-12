'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error } = require('../utils/response');
const { checkInvoiceEligibility } = require('../utils/invoiceEligibility');

const prisma = new PrismaClient();

const getMemberId = (req) => Number(req.member?.id || 0);

const getOrderInvoiceStatus = async (req, res) => {
  const { orderNo, orderType, productType } = req.query;
  const checked = await checkInvoiceEligibility(prisma, getMemberId(req), orderNo, orderType || productType);

  if (checked.eligible) {
    return success(res, {
      status: 0,
      statusDesc: '可开票',
      invoiceSta: 'NO',
      canInvoice: true,
      orderNo,
      amount: checked.amount,
    });
  }

  const existing = await prisma.invoiceRequest.findMany({
    where: { memberId: getMemberId(req), status: { not: 'rejected' } },
    select: { orderNos: true, status: true },
  });
  const hasRequest = existing.some((r) => {
    try { return JSON.parse(r.orderNos || '[]').includes(orderNo); } catch (_) { return false; }
  });

  return success(res, {
    status: hasRequest ? 1 : -1,
    statusDesc: hasRequest ? '已申请开票' : checked.reason,
    invoiceSta: hasRequest ? 'HI' : 'DISABLED',
    canInvoice: false,
    orderNo,
  });
};

const applyInvoice = async (req, res) => {
  const body = { ...(req.query || {}), ...(req.body || {}) };
  const orderNo = body.orderNo;
  const checked = await checkInvoiceEligibility(prisma, getMemberId(req), orderNo, body.orderType || body.productType);
  if (!checked.eligible) return error(res, checked.reason);

  const title = body.title || body.invoiceTitle || body.companyName || body.personalName || '个人';
  const invoiceType = body.invoiceType || body.type || 'personal';
  const r = await prisma.invoiceRequest.create({
    data: {
      memberId: getMemberId(req),
      orderNos: JSON.stringify([orderNo]),
      invoiceType,
      title,
      taxNo: body.taxNo || body.taxNumber || null,
      email: body.email || null,
      phone: body.phone || null,
      amount: checked.amount,
      status: 'pending',
    },
  });

  return success(res, { orderNo, status: 1, requestId: r.id, msg: '开票申请已提交' }, '开票申请已提交');
};

const saveOrUpdateInvoice = async (req, res) => {
  const body = { ...(req.query || {}), ...(req.body || {}) };
  return success(res, {
    id: body.id || Date.now(),
    orderNo: body.orderNo,
    status: 0,
  });
};

const getInvoiceOrder = async (req, res) => {
  const { orderNo, orderType, productType } = req.query;
  const checked = await checkInvoiceEligibility(prisma, getMemberId(req), orderNo, orderType || productType);
  return success(res, {
    orderNo,
    invoiceStatus: checked.eligible ? 0 : -1,
    canInvoice: checked.eligible,
    reason: checked.eligible ? '' : checked.reason,
    amount: checked.eligible ? checked.amount : 0,
    invoiceInfo: null,
  });
};

const getInvoiceAmountAndMsg = async (req, res) => {
  const { orderNo, orderType, productType } = req.query;
  const checked = await checkInvoiceEligibility(prisma, getMemberId(req), orderNo, orderType || productType);
  if (!checked.eligible) return success(res, { amount: 0, msg: checked.reason, orderNo, canInvoice: false });
  return success(res, { amount: checked.amount, msg: '可申请开票金额', orderNo, canInvoice: true });
};

module.exports = {
  getOrderInvoiceStatus,
  applyInvoice,
  saveOrUpdateInvoice,
  getInvoiceOrder,
  getInvoiceAmountAndMsg,
};
