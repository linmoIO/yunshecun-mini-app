'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error } = require('../utils/response');

const prisma = new PrismaClient();

const getOrderInvoiceStatus = async (req, res) => {
  const { orderNo } = req.query;
  // 简单示例：检查订单是否已开票
  return success(res, { status: 0, statusDesc: '未开票', orderNo });
};

const applyInvoice = async (req, res) => {
  const { orderNo, invoiceId } = req.query || req.body;
  return success(res, { orderNo, status: 1, msg: '开票申请已提交' });
};

const saveOrUpdateInvoice = async (req, res) => {
  const { id, orderNo, type, title, taxNo, amount, email } = req.query || req.body;
  return success(res, { id: id || Date.now(), orderNo, status: 0 });
};

const getInvoiceOrder = async (req, res) => {
  const { orderNo } = req.query;
  return success(res, { orderNo, invoiceStatus: 0, invoiceInfo: null });
};

const getInvoiceAmountAndMsg = async (req, res) => {
  const { orderNo } = req.query;
  return success(res, { amount: 0, msg: '可申请开票金额', orderNo });
};

module.exports = { getOrderInvoiceStatus, applyInvoice, saveOrUpdateInvoice, getInvoiceOrder, getInvoiceAmountAndMsg };
