'use strict';

const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const { success, error } = require('../utils/response');

const prisma = new PrismaClient();

// 统一支付入口
const pay = async (req, res) => {
  const { orderNo, orderType, payMethod = 'wechat' } = req.body || req.query;
  if (!orderNo) return error(res, '缺少订单号');

  // 查找订单
  const order = await findOrder(orderNo, orderType);
  if (!order) return error(res, '订单不存在');
  if (order.status !== 'pending') return error(res, '订单状态不支持支付');

  const paymentNo = uuidv4();
  const amount = order.totalAmount;

  // 创建支付记录
  await prisma.payment.create({
    data: {
      paymentNo,
      orderNo,
      orderType: orderType || detectOrderType(order),
      memberId: req.member?.id || null,
      amount,
      method: payMethod,
      status: 'pending',
    },
  });

  // 实际项目需接入微信支付/支付宝
  // 这里返回模拟的支付参数（沙盒模式）
  const payParams = await buildPayParams(payMethod, paymentNo, amount, req);

  return success(res, {
    paymentNo,
    orderNo,
    amount,
    payMethod,
    payParams,
    // 模拟支付跳转（真实项目中会是微信支付prepay_id等）
    mockPayUrl: `/api/pay/mock?paymentNo=${paymentNo}`,
  });
};

// 旅游产品支付
const travelPay = async (req, res) => {
  req.body.orderType = 'travel';
  return pay(req, res);
};

// 商城支付
const shopPay = async (req, res) => {
  req.body.orderType = 'shop';
  return pay(req, res);
};

// 活动支付
const activityPay = async (req, res) => {
  req.body.orderType = 'activity';
  return pay(req, res);
};

// 模拟支付成功回调（开发测试用）
const mockPaySuccess = async (req, res) => {
  const { paymentNo } = req.query;
  const payment = await prisma.payment.findUnique({ where: { paymentNo } });
  if (!payment) return error(res, '支付记录不存在');

  await prisma.payment.update({
    where: { paymentNo },
    data: { status: 'success', paidAt: new Date(), transactionId: `MOCK_${Date.now()}` },
  });

  // 更新订单状态
  await updateOrderStatusPaid(payment.orderNo, payment.orderType);

  return success(res, { paymentNo, status: 'success' }, '支付成功');
};

// 微信支付回调
const wechatPayNotify = async (req, res) => {
  // 实际需解析微信支付回调XML/JSON并验签
  const paymentNo = req.body?.paymentNo || req.query?.paymentNo;
  if (paymentNo) {
    const payment = await prisma.payment.findUnique({ where: { paymentNo } });
    if (payment) {
      await prisma.payment.update({
        where: { paymentNo },
        data: { status: 'success', paidAt: new Date(), transactionId: req.body?.transaction_id || '' },
      });
      await updateOrderStatusPaid(payment.orderNo, payment.orderType);
    }
  }
  res.send('<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>');
};

// 支付宝回调
const alipayNotify = async (req, res) => {
  const paymentNo = req.body?.out_trade_no || req.query?.out_trade_no;
  if (paymentNo) {
    const payment = await prisma.payment.findUnique({ where: { paymentNo } });
    if (payment) {
      await prisma.payment.update({
        where: { paymentNo },
        data: { status: 'success', paidAt: new Date(), transactionId: req.body?.trade_no || '' },
      });
      await updateOrderStatusPaid(payment.orderNo, payment.orderType);
    }
  }
  res.send('success');
};

// 退款
const refund = async (req, res) => {
  const { paymentNo, refundAmount, reason } = req.body;
  const payment = await prisma.payment.findUnique({ where: { paymentNo } });
  if (!payment) return error(res, '支付记录不存在');
  if (payment.status !== 'success') return error(res, '该订单未支付，不能退款');

  const amount = refundAmount ? Number(refundAmount) : payment.amount;

  await prisma.payment.update({
    where: { paymentNo },
    data: { status: 'refunded', refundedAt: new Date(), refundAmount: amount },
  });

  // 更新订单状态
  const orderType = payment.orderType;
  if (orderType === 'travel') {
    await prisma.travelOrder.updateMany({ where: { orderNo: payment.orderNo }, data: { status: 'cancelled' } });
  } else if (orderType === 'hotel') {
    await prisma.hotelOrder.updateMany({ where: { orderNo: payment.orderNo }, data: { status: 'cancelled' } });
  } else if (orderType === 'shop') {
    await prisma.shopOrder.updateMany({ where: { orderNo: payment.orderNo }, data: { status: 'refunded' } });
  }

  return success(res, { paymentNo, refundAmount: amount }, '退款申请成功');
};

// 查询支付状态
const queryPayStatus = async (req, res) => {
  const { paymentNo, orderNo } = req.query;
  const where = paymentNo ? { paymentNo } : { orderNo };
  const payment = await prisma.payment.findFirst({ where, orderBy: { createdAt: 'desc' } });
  if (!payment) return error(res, '支付记录不存在');
  return success(res, { paymentNo: payment.paymentNo, status: payment.status, amount: payment.amount, paidAt: payment.paidAt });
};

// 管理端 - 支付列表
const adminListPayments = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status, orderType, keyword } = req.query;
  const where = {};
  if (status) where.status = status;
  if (orderType) where.orderType = orderType;
  if (keyword) where.orderNo = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.payment.count({ where }),
  ]);
  return success(res, { list, total, page: Number(pageNum), pageSize: Number(pageSize) });
};

// 内部辅助函数
const findOrder = async (orderNo, orderType) => {
  if (orderType === 'travel') return prisma.travelOrder.findUnique({ where: { orderNo } });
  if (orderType === 'hotel') return prisma.hotelOrder.findUnique({ where: { orderNo } });
  if (orderType === 'shop') return prisma.shopOrder.findUnique({ where: { orderNo } });
  if (orderType === 'activity') return prisma.activityOrder.findUnique({ where: { orderNo } });
  // 自动探测
  const travel = await prisma.travelOrder.findUnique({ where: { orderNo } });
  if (travel) return travel;
  const hotel = await prisma.hotelOrder.findUnique({ where: { orderNo } });
  if (hotel) return hotel;
  const shop = await prisma.shopOrder.findUnique({ where: { orderNo } });
  if (shop) return shop;
  const activity = await prisma.activityOrder.findUnique({ where: { orderNo } });
  return activity;
};

const detectOrderType = async (order) => {
  if ('checkIn' in order) return 'hotel';
  if ('startDate' in order && 'product' in order) return 'travel';
  if ('activityDate' in order) return 'activity';
  return 'shop';
};

const updateOrderStatusPaid = async (orderNo, orderType) => {
  const data = { status: 'paid', paymentTime: new Date() };
  if (orderType === 'travel') await prisma.travelOrder.updateMany({ where: { orderNo }, data });
  else if (orderType === 'hotel') await prisma.hotelOrder.updateMany({ where: { orderNo }, data });
  else if (orderType === 'shop') await prisma.shopOrder.updateMany({ where: { orderNo }, data });
  else if (orderType === 'activity') await prisma.activityOrder.updateMany({ where: { orderNo }, data });
};

const crypto = require('crypto');
const https = require('https');
const axios = require('axios');

// 微信支付 v3 签名
const wxpaySign = (method, url, timestamp, nonce, body, privateKey) => {
  const message = `${method}\n${url}\n${timestamp}\n${nonce}\n${body || ''}\n`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(message, 'utf8');
  return sign.sign(privateKey, 'base64');
};

// 生成小程序支付签名
const wxpayJsapiSign = (appId, timestamp, nonce, prepayId, privateKey) => {
  const message = `${appId}\n${timestamp}\n${nonce}\nprepay_id=${prepayId}\n`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(message, 'utf8');
  return sign.sign(privateKey, 'base64');
};

const buildPayParams = async (method, paymentNo, amount, req) => {
  if (method === 'wechat') {
    try {
      const cfgRows = await prisma.sysConfig.findMany({
        where: { key: { in: ['wxpay_mch_id', 'wxpay_serial_no', 'wxpay_private_key', 'wxpay_api_v3_key', 'wechat_app_id', 'wxpay_notify_url'] } }
      });
      const cfg = Object.fromEntries(cfgRows.map(r => [r.key, r.value]));
      const { wxpay_mch_id: mchId, wxpay_serial_no: serialNo, wxpay_private_key: privateKey, wechat_app_id: appId, wxpay_notify_url: notifyUrl } = cfg;

      if (mchId && serialNo && privateKey && appId) {
        // 调用微信支付 v3 JSAPI 统一下单
        const openid = req.member?.openId || req.body?.openid || '';
        const timestamp = String(Math.floor(Date.now() / 1000));
        const nonce = uuidv4().replace(/-/g, '').slice(0, 32);
        const bodyStr = JSON.stringify({
          appid: appId, mchid: mchId,
          description: '云舍村订单',
          out_trade_no: paymentNo,
          notify_url: notifyUrl || 'https://your-domain.com/api/pay/wechat/notify',
          amount: { total: Math.round(amount * 100), currency: 'CNY' },
          payer: { openid: openid || 'PLACEHOLDER' },
        });
        const urlPath = '/v3/pay/transactions/jsapi';
        const signature = wxpaySign('POST', urlPath, timestamp, nonce, bodyStr, privateKey);
        const authHeader = `WECHATPAY2-SHA256-RSA2048 mchid="${mchId}",nonce_str="${nonce}",signature="${signature}",timestamp="${timestamp}",serial_no="${serialNo}"`;

        const wxRes = await axios.post('https://api.mch.weixin.qq.com' + urlPath, bodyStr, {
          headers: { 'Content-Type': 'application/json', 'Authorization': authHeader, 'Accept': 'application/json' },
          timeout: 10000,
        });

        if (wxRes.data && wxRes.data.prepay_id) {
          const prepayId = wxRes.data.prepay_id;
          const paySign = wxpayJsapiSign(appId, timestamp, nonce, prepayId, privateKey);
          return { timeStamp: timestamp, nonceStr: nonce, package: `prepay_id=${prepayId}`, signType: 'RSA', paySign };
        }
      }
    } catch (err) {
      console.warn('[WxPay] 微信支付参数构建失败，回退到开发模式:', err.message);
    }

    // 微信支付未配置/失败：开发模式 mock（wx.requestPayment 失败后前端走 mockPayUrl）
    return {
      timeStamp: String(Math.floor(Date.now() / 1000)),
      nonceStr: uuidv4().replace(/-/g, ''),
      package: `prepay_id=MOCK_${paymentNo}`,
      signType: 'RSA',
      paySign: 'MOCK_SIGN',
    };
  }
  return {};
};

module.exports = {
  pay, travelPay, shopPay, activityPay,
  mockPaySuccess, wechatPayNotify, alipayNotify,
  refund, queryPayStatus, adminListPayments,
};
