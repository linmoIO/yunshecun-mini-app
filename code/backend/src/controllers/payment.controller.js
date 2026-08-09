'use strict';

const crypto = require('crypto');
const fs = require('fs');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');
const { success, error } = require('../utils/response');

const prisma = new PrismaClient();
const WX_PAY_HOST = 'https://api.mch.weixin.qq.com';

const okForMiniProgram = (res, retVal, msg = 'success', extra = {}) => {
  return res.json({ code: 0, result: 1, msg, retVal, data: retVal, ...extra });
};

const failForMiniProgram = (res, msg, code = -1) => {
  return res.json({ code, result: 0, msg, data: null, retVal: null });
};

const getPaymentFailureMessage = (err) => (
  err.code === 'POINTS_INVALID' ? err.message : '微信支付暂时不可用，请稍后重试'
);

const pay = async (req, res) => {
  try {
    const payload = { ...(req.query || {}), ...(req.body || {}) };
    const { orderType, payMethod = 'wechat' } = payload;
    const orderNo = payload.orderNo || payload.crsNo || payload.gcRsvNo || payload.rsvNo;
    if (!orderNo) return failForMiniProgram(res, '缺少订单号');

    const order = await findOrder(orderNo, orderType);
    if (!order) return failForMiniProgram(res, '订单不存在');
    if (order.status !== 'pending') return failForMiniProgram(res, '订单状态不支持支付');

    const originalAmount = Number(order.totalAmount || payload.payAmount || payload.money || 0);
    if (!originalAmount || originalAmount <= 0) return failForMiniProgram(res, '支付金额不正确');
    const detectedOrderType = orderType || await detectOrderType(order);
    const pointsCalc = await calculatePointDeduction(payload, order, originalAmount);
    const amount = roundMoney(originalAmount - pointsCalc.pointMoney);
    if (amount < 0) return failForMiniProgram(res, '积分抵扣金额不正确');
    if (amount > 0 && !['wechat', 'WECHAT', 'WECHAT_MINI_APP', 'wechat_mini_app'].includes(payMethod)) {
      return failForMiniProgram(res, '当前仅支持微信小程序支付');
    }

    const paymentNo = createOutTradeNo();

    await prisma.payment.create({ data: {
        paymentNo,
        orderNo,
        orderType: detectedOrderType,
        memberId: req.member?.id || order.memberId || null,
        amount,
        originalAmount,
        pointDed: pointsCalc.pointDed,
        pointMoney: pointsCalc.pointMoney,
        method: payMethod,
        status: 'pending',
        extra: JSON.stringify({ request: sanitizePaymentRequest(payload), points: pointsCalc }),
    } });

    if (amount <= 0) {
      await applyPointDeduction(order, orderNo, detectedOrderType, pointsCalc, amount);
      const freePayment = await prisma.payment.findUnique({ where: { paymentNo } });
      await markPaymentSuccess(freePayment, 'POINTS_DEDUCTION', { trade_state: 'SUCCESS', pointPay: true });
      return okForMiniProgram(res, JSON.stringify({ pointPay: true }), '积分已全额抵扣', {
        paymentNo,
        orderNo,
        amount,
        pointDed: pointsCalc.pointDed,
        pointMoney: pointsCalc.pointMoney,
        paid: true,
      });
    }

    const payParams = await createWechatJsapiPayParams({
      paymentNo,
      amount,
      description: payload.subject || order.paySubject || order.title || order.name || '云舍村订单',
      openid: await resolvePaymentOpenid(payload, req.member, order),
    });

    await prisma.$transaction(async (tx) => {
      await applyPointDeduction(order, orderNo, detectedOrderType, pointsCalc, amount, tx);
      await tx.payment.update({
        where: { paymentNo },
        data: { extra: JSON.stringify({ request: sanitizePaymentRequest(payload), points: pointsCalc, payParams }) },
      });
    });

    return okForMiniProgram(res, JSON.stringify(payParams), 'success', {
      paymentNo,
      orderNo,
      amount,
      pointDed: pointsCalc.pointDed,
      pointMoney: pointsCalc.pointMoney,
      payParams,
    });
  } catch (err) {
    console.error('[WxPay] create payment failed:', err.response?.data || err.message);
    return failForMiniProgram(res, getPaymentFailureMessage(err));
  }
};

const travelPay = async (req, res) => {
  req.body = { ...(req.body || {}), orderType: 'travel' };
  return pay(req, res);
};

const shopPay = async (req, res) => {
  req.body = { ...(req.body || {}), orderType: 'shop' };
  return pay(req, res);
};

const activityPay = async (req, res) => {
  req.body = { ...(req.body || {}), orderType: 'activity' };
  return pay(req, res);
};

const wechatPayNotify = async (req, res) => {
  try {
    const event = req.body || {};
    const resource = await decryptWechatResource(event.resource);
    if (event.event_type !== 'TRANSACTION.SUCCESS') {
      return res.status(200).json({ code: 'SUCCESS', message: 'OK' });
    }

    const payment = await prisma.payment.findUnique({ where: { paymentNo: resource.out_trade_no } });
    if (payment) {
      await markPaymentSuccess(payment, resource.transaction_id, resource);
    }

    return res.status(200).json({ code: 'SUCCESS', message: 'OK' });
  } catch (err) {
    console.error('[WxPay] pay notify failed:', err.message);
    return res.status(500).json({ code: 'FAIL', message: err.message });
  }
};

const wechatRefundNotify = async (req, res) => {
  try {
    const event = req.body || {};
    const resource = await decryptWechatResource(event.resource);
    const payment = await prisma.payment.findUnique({ where: { paymentNo: resource.out_trade_no } });

    if (payment) {
      const refundSuccess = resource.refund_status === 'SUCCESS';
      await prisma.payment.update({
        where: { paymentNo: payment.paymentNo },
        data: {
          status: refundSuccess ? 'refunded' : 'refund_failed',
          refundedAt: refundSuccess ? new Date() : payment.refundedAt,
          refundAmount: Number(resource.amount?.refund || 0) / 100 || payment.refundAmount,
          extra: mergePaymentExtra(payment.extra, { refundNotify: resource }),
        },
      });

      if (refundSuccess) {
        await updateOrderStatusRefunded(payment.orderNo, payment.orderType);
        await rollbackPointsForRefund(payment);
      }
    }

    return res.status(200).json({ code: 'SUCCESS', message: 'OK' });
  } catch (err) {
    console.error('[WxPay] refund notify failed:', err.message);
    return res.status(500).json({ code: 'FAIL', message: err.message });
  }
};

const alipayNotify = async (_req, res) => {
  return res.send('success');
};

const refund = async (req, res) => {
  try {
    const { paymentNo, refundAmount, reason = '订单退款' } = req.body || {};
    if (!paymentNo) return error(res, '缺少支付单号');

    const payment = await prisma.payment.findUnique({ where: { paymentNo } });
    if (!payment) return error(res, '支付记录不存在');
    if (payment.status !== 'success') return error(res, '该订单未支付成功，不能退款');

    const amount = refundAmount ? Number(refundAmount) : Number(payment.amount);
    if (!amount || amount <= 0 || amount > Number(payment.amount)) return error(res, '退款金额不正确');

    const cfg = await getWechatPayConfig();
    const outRefundNo = createOutRefundNo(payment.paymentNo);
    const body = {
      out_trade_no: payment.paymentNo,
      out_refund_no: outRefundNo,
      reason,
      notify_url: cfg.refundNotifyUrl,
      amount: {
        refund: yuanToFen(amount),
        total: yuanToFen(payment.amount),
        currency: 'CNY',
      },
    };

    const wxRes = await wechatRequest('POST', '/v3/refund/domestic/refunds', body, cfg);

    await prisma.payment.update({
      where: { paymentNo },
      data: {
        status: 'refunding',
        refundAmount: amount,
        extra: mergePaymentExtra(payment.extra, { refundRequest: body, refundResponse: wxRes.data }),
      },
    });

    return success(res, { paymentNo, outRefundNo, refundAmount: amount, wxRefund: wxRes.data }, '退款申请成功');
  } catch (err) {
    console.error('[WxPay] refund failed:', err.response?.data || err.message);
    return error(res, '微信退款申请失败: ' + formatWxError(err));
  }
};

const queryPayStatus = async (req, res) => {
  const { paymentNo, orderNo } = req.query;
  const where = paymentNo ? { paymentNo } : { orderNo };
  const payment = await prisma.payment.findFirst({ where, orderBy: { createdAt: 'desc' } });
  if (!payment) return error(res, '支付记录不存在');
  return success(res, {
    paymentNo: payment.paymentNo,
    status: payment.status,
    amount: payment.amount,
    paidAt: payment.paidAt,
    transactionId: payment.transactionId,
  });
};

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

const createWechatJsapiPayParams = async ({ paymentNo, amount, description, openid }) => {
  if (!openid || /^dev_openid_/.test(openid)) {
    throw new Error('缺少真实微信 openid，请先用当前小程序重新登录');
  }

  const cfg = await getWechatPayConfig();
  const body = {
    appid: cfg.appId,
    mchid: cfg.mchId,
    description: String(description || '云舍村订单').slice(0, 127),
    out_trade_no: paymentNo,
    notify_url: cfg.payNotifyUrl,
    amount: { total: yuanToFen(amount), currency: 'CNY' },
    payer: { openid },
  };

  const wxRes = await wechatRequest('POST', '/v3/pay/transactions/jsapi', body, cfg);
  const prepayId = wxRes.data?.prepay_id;
  if (!prepayId) throw new Error('微信未返回 prepay_id');

  const timeStamp = String(Math.floor(Date.now() / 1000));
  const nonceStr = createNonce();
  const packageValue = `prepay_id=${prepayId}`;
  const paySign = signMessage(`${cfg.appId}\n${timeStamp}\n${nonceStr}\n${packageValue}\n`, cfg.privateKey);

  return { timeStamp, nonceStr, package: packageValue, signType: 'RSA', paySign };
};

const resolvePaymentOpenid = async (payload, authMember, order) => {
  if (payload.openid) return payload.openid;
  if (payload.openId) return payload.openId;
  if (authMember?.openid) return authMember.openid;
  if (authMember?.openId) return authMember.openId;

  const memberId = order?.memberId || authMember?.id;
  if (!memberId) return '';
  const member = await prisma.member.findUnique({
    where: { id: Number(memberId) },
    select: { wechatOpenId: true },
  }).catch(() => null);
  return member?.wechatOpenId || '';
};

const wechatRequest = async (method, urlPath, body, cfg) => {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const nonce = createNonce();
  const bodyStr = body ? JSON.stringify(body) : '';
  const signature = signMessage(`${method}\n${urlPath}\n${timestamp}\n${nonce}\n${bodyStr}\n`, cfg.privateKey);
  const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${cfg.mchId}",nonce_str="${nonce}",signature="${signature}",timestamp="${timestamp}",serial_no="${cfg.merchantSerialNumber}"`;

  return axios({
    method,
    url: WX_PAY_HOST + urlPath,
    data: bodyStr || undefined,
    headers: {
      Authorization: authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'yunshecun-backend/1.0',
    },
    timeout: 15000,
  });
};

const getWechatPayConfig = async () => {
  const dbConfig = await getSysConfig([
    'wechat_app_id',
    'wxpay_mch_id',
    'wxpay_serial_no',
    'wxpay_private_key',
    'wxpay_private_key_path',
    'wxpay_api_v3_key',
    'wxpay_notify_url',
    'wxpay_ticket_notify_url',
    'wxpay_refund_notify_url',
  ]);

  const privateKey = normalizePrivateKey(
    dbConfig.wxpay_private_key ||
    process.env.WECHAT_PAY_PRIVATE_KEY ||
    readPrivateKey(dbConfig.wxpay_private_key_path || config.wechatPay.privateKeyPath)
  );

  const cfg = {
    appId: dbConfig.wechat_app_id || config.wechat.appId,
    mchId: dbConfig.wxpay_mch_id || config.wechatPay.mchId,
    merchantSerialNumber: dbConfig.wxpay_serial_no || config.wechatPay.merchantSerialNumber,
    privateKey,
    apiV3Key: dbConfig.wxpay_api_v3_key || config.wechatPay.apiV3Key,
    payNotifyUrl: dbConfig.wxpay_notify_url || config.wechatPay.payNotifyUrl || config.wechatPay.notifyUrl,
    payTicketNotifyUrl: dbConfig.wxpay_ticket_notify_url || config.wechatPay.payTicketNotifyUrl,
    refundNotifyUrl: dbConfig.wxpay_refund_notify_url || config.wechatPay.refundNotifyUrl,
  };

  const missing = Object.entries({
    WECHAT_APP_ID: cfg.appId,
    WECHAT_PAY_MCH_ID: cfg.mchId,
    WECHAT_PAY_SERIAL_NO: cfg.merchantSerialNumber,
    WECHAT_PAY_PRIVATE_KEY_PATH: cfg.privateKey,
    WECHAT_PAY_API_V3_KEY: cfg.apiV3Key,
    WECHAT_PAY_NOTIFY_URL: cfg.payNotifyUrl,
    WECHAT_PAY_REFUND_NOTIFY_URL: cfg.refundNotifyUrl,
  }).filter(([, value]) => !value).map(([key]) => key);

  if (missing.length) throw new Error(`微信支付配置缺失: ${missing.join(', ')}`);
  return cfg;
};

const getSysConfig = async (keys) => {
  try {
    const rows = await prisma.sysConfig.findMany({ where: { key: { in: keys } } });
    return Object.fromEntries(rows.map(row => [row.key, row.value]));
  } catch {
    return {};
  }
};

const getPointConfig = async () => {
  const cfg = await getSysConfig([
    'points_enabled',
    'points_earn_yuan_per_point',
    'points_redeem_value',
    'points_max_deduct_rate',
  ]);
  return {
    enabled: cfg.points_enabled !== 'false',
    earnYuanPerPoint: Math.max(Number(cfg.points_earn_yuan_per_point || 10), 0.01),
    redeemValue: Math.max(Number(cfg.points_redeem_value || 0.1), 0),
    maxDeductRate: Math.min(Math.max(Number(cfg.points_max_deduct_rate || 1), 0), 1),
  };
};

const calculatePointDeduction = async (payload, order, originalAmount) => {
  const cfg = await getPointConfig();
  if (!cfg.enabled || !cfg.redeemValue) return { pointDed: 0, pointMoney: 0, availablePoints: 0 };
  const requested = Number(payload.pointDed || payload.pointsDeduct || payload.usePoints || 0) || 0;
  if (requested <= 0) return { pointDed: 0, pointMoney: 0, availablePoints: 0 };
  const member = await prisma.member.findUnique({ where: { id: Number(order.memberId) }, select: { points: true } });
  const availablePoints = Number(member?.points || 0);
  const maxMoney = roundMoney(originalAmount * cfg.maxDeductRate);
  const maxPointsByAmount = Math.floor(maxMoney / cfg.redeemValue);
  const pointDed = Math.max(0, Math.min(Math.floor(requested), availablePoints, maxPointsByAmount));
  const pointMoney = roundMoney(pointDed * cfg.redeemValue);
  if (requested > 0 && pointDed <= 0) {
    const err = new Error('积分余额不足或当前订单不可抵扣');
    err.code = 'POINTS_INVALID';
    throw err;
  }
  return { pointDed, pointMoney, availablePoints, redeemValue: cfg.redeemValue, maxDeductRate: cfg.maxDeductRate };
};

const calculateEarnPoints = async (amount) => {
  const cfg = await getPointConfig();
  if (!cfg.enabled || !cfg.earnYuanPerPoint) return 0;
  return Math.floor(Number(amount || 0) / cfg.earnYuanPerPoint);
};

const updateOrderPointFields = async (tx, orderNo, orderType, data) => {
  if (orderType === 'travel') return tx.travelOrder.updateMany({ where: { orderNo }, data });
  if (orderType === 'hotel') return tx.hotelOrder.updateMany({ where: { orderNo }, data });
  if (orderType === 'shop') return tx.shopOrder.updateMany({ where: { orderNo }, data });
  if (orderType === 'activity') return tx.activityOrder.updateMany({ where: { orderNo }, data });
};

const applyPointDeduction = async (order, orderNo, orderType, pointsCalc, amount, existingTx = null) => {
  if (!pointsCalc.pointDed) return;
  const run = async (tx) => {
    const exists = await tx.pointTransaction.findFirst({
      where: { memberId: Number(order.memberId), orderId: orderNo, type: 'redeem' },
    });
    if (exists) return;
    await tx.member.update({
      where: { id: Number(order.memberId) },
      data: { points: { decrement: pointsCalc.pointDed } },
    });
    await tx.pointTransaction.create({
      data: {
        memberId: Number(order.memberId),
        points: -pointsCalc.pointDed,
        type: 'redeem',
        description: `订单 ${orderNo} 积分抵扣 ¥${pointsCalc.pointMoney}`,
        orderId: orderNo,
      },
    });
    await updateOrderPointFields(tx, orderNo, orderType, {
      pointDed: pointsCalc.pointDed,
      pointMoney: pointsCalc.pointMoney,
      paidAmount: amount,
    });
  };
  if (existingTx) return run(existingTx);
  return prisma.$transaction(run);
};

const findOrder = async (orderNo, orderType) => {
  if (orderType === 'travel') return prisma.travelOrder.findUnique({ where: { orderNo } });
  if (orderType === 'hotel') return prisma.hotelOrder.findUnique({ where: { orderNo } });
  if (orderType === 'shop') return prisma.shopOrder.findUnique({ where: { orderNo } });
  if (orderType === 'activity') return prisma.activityOrder.findUnique({ where: { orderNo } });

  const travel = await prisma.travelOrder.findUnique({ where: { orderNo } });
  if (travel) return travel;
  const hotel = await prisma.hotelOrder.findUnique({ where: { orderNo } });
  if (hotel) return hotel;
  const shop = await prisma.shopOrder.findUnique({ where: { orderNo } });
  if (shop) return shop;
  return prisma.activityOrder.findUnique({ where: { orderNo } });
};

const detectOrderType = async (order) => {
  if ('checkIn' in order) return 'hotel';
  if ('startDate' in order && 'productId' in order) return 'travel';
  if ('activityDate' in order) return 'activity';
  return 'shop';
};

const markPaymentSuccess = async (payment, transactionId, notifyPayload = null) => {
  if (payment.status === 'success') return;
  const pointEarned = await calculateEarnPoints(payment.amount);

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { paymentNo: payment.paymentNo },
      data: {
        status: 'success',
        paidAt: new Date(),
        transactionId: transactionId || payment.transactionId,
        pointEarned,
        extra: notifyPayload ? mergePaymentExtra(payment.extra, { payNotify: notifyPayload, pointEarned }) : mergePaymentExtra(payment.extra, { pointEarned }),
      },
    });
    await updateOrderStatusPaidTx(tx, payment.orderNo, payment.orderType, {
      paidAmount: payment.amount,
      pointDed: payment.pointDed || 0,
      pointMoney: payment.pointMoney || 0,
      pointEarned,
    });
    if (pointEarned > 0 && payment.memberId) {
      const exists = await tx.pointTransaction.findFirst({
        where: { memberId: payment.memberId, orderId: payment.orderNo, type: 'earn' },
      });
      if (!exists) {
        await tx.member.update({ where: { id: payment.memberId }, data: { points: { increment: pointEarned } } });
        await tx.pointTransaction.create({
          data: {
            memberId: payment.memberId,
            points: pointEarned,
            type: 'earn',
            description: `订单 ${payment.orderNo} 支付获得积分`,
            orderId: payment.orderNo,
          },
        });
      }
    }
  });
};

const updateOrderStatusPaid = async (orderNo, orderType) => {
  const data = { status: 'paid', paymentMethod: 'wechat', paymentTime: new Date() };
  if (orderType === 'travel') await prisma.travelOrder.updateMany({ where: { orderNo }, data });
  else if (orderType === 'hotel') await prisma.hotelOrder.updateMany({ where: { orderNo }, data });
  else if (orderType === 'shop') await prisma.shopOrder.updateMany({ where: { orderNo }, data });
  else if (orderType === 'activity') await prisma.activityOrder.updateMany({ where: { orderNo }, data });
};

const updateOrderStatusPaidTx = async (tx, orderNo, orderType, extra = {}) => {
  const data = { status: 'paid', paymentMethod: 'wechat', paymentTime: new Date(), ...extra };
  if (orderType === 'travel') return tx.travelOrder.updateMany({ where: { orderNo }, data });
  if (orderType === 'hotel') return tx.hotelOrder.updateMany({ where: { orderNo }, data });
  if (orderType === 'shop') return tx.shopOrder.updateMany({ where: { orderNo }, data });
  if (orderType === 'activity') return tx.activityOrder.updateMany({ where: { orderNo }, data });
};

const rollbackPointsForRefund = async (payment) => {
  if (!payment.memberId) return;
  await prisma.$transaction(async (tx) => {
    const pointDed = Number(payment.pointDed || 0);
    const pointEarned = Number(payment.pointEarned || 0);
    if (pointEarned > 0) {
      const exists = await tx.pointTransaction.findFirst({ where: { memberId: payment.memberId, orderId: payment.orderNo, type: 'refund_earn_rollback' } });
      if (!exists) {
        await tx.member.update({ where: { id: payment.memberId }, data: { points: { decrement: pointEarned } } });
        await tx.pointTransaction.create({ data: { memberId: payment.memberId, points: -pointEarned, type: 'refund_earn_rollback', description: `订单 ${payment.orderNo} 退款扣回获得积分`, orderId: payment.orderNo } });
      }
    }
    if (pointDed > 0) {
      const exists = await tx.pointTransaction.findFirst({ where: { memberId: payment.memberId, orderId: payment.orderNo, type: 'refund_redeem_return' } });
      if (!exists) {
        await tx.member.update({ where: { id: payment.memberId }, data: { points: { increment: pointDed } } });
        await tx.pointTransaction.create({ data: { memberId: payment.memberId, points: pointDed, type: 'refund_redeem_return', description: `订单 ${payment.orderNo} 退款返还抵扣积分`, orderId: payment.orderNo } });
      }
    }
  });
};

const updateOrderStatusRefunded = async (orderNo, orderType) => {
  if (orderType === 'travel') await prisma.travelOrder.updateMany({ where: { orderNo }, data: { status: 'refunded' } });
  else if (orderType === 'hotel') await prisma.hotelOrder.updateMany({ where: { orderNo }, data: { status: 'refunded' } });
  else if (orderType === 'shop') await prisma.shopOrder.updateMany({ where: { orderNo }, data: { status: 'refunded' } });
  else if (orderType === 'activity') await prisma.activityOrder.updateMany({ where: { orderNo }, data: { status: 'refunded' } });
};

const decryptWechatResource = async (resource) => {
  if (!resource) throw new Error('微信回调缺少 resource');
  const cfg = await getWechatPayConfig();
  const key = Buffer.from(cfg.apiV3Key || '', 'utf8');
  if (key.length !== 32) throw new Error('WECHAT_PAY_API_V3_KEY 必须是 32 位');

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(resource.nonce, 'utf8'));
  decipher.setAuthTag(Buffer.from(resource.ciphertext, 'base64').subarray(-16));
  decipher.setAAD(Buffer.from(resource.associated_data || '', 'utf8'));
  const ciphertext = Buffer.from(resource.ciphertext, 'base64').subarray(0, -16);
  const decoded = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
  return JSON.parse(decoded);
};

const readPrivateKey = (privateKeyPath) => {
  if (!privateKeyPath) return '';
  try {
    return fs.readFileSync(privateKeyPath, 'utf8');
  } catch (err) {
    throw new Error(`读取微信支付私钥失败: ${privateKeyPath} (${err.message})`);
  }
};

const normalizePrivateKey = (key) => {
  if (!key) return '';
  return key.replace(/\\n/g, '\n');
};

const signMessage = (message, privateKey) => {
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(message, 'utf8');
  return signer.sign(privateKey, 'base64');
};

const yuanToFen = (amount) => Math.round(Number(amount) * 100);
const roundMoney = (amount) => Math.round(Number(amount || 0) * 100) / 100;
const createNonce = () => uuidv4().replace(/-/g, '').slice(0, 32);
const createOutTradeNo = () => `YSC${Date.now()}${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
const createOutRefundNo = (paymentNo) => `RF${paymentNo.slice(0, 28)}${Date.now().toString().slice(-6)}`.slice(0, 64);

const mergePaymentExtra = (oldExtra, patch) => {
  let extra = {};
  try {
    extra = oldExtra ? JSON.parse(oldExtra) : {};
  } catch {
    extra = { raw: oldExtra };
  }
  return JSON.stringify({ ...extra, ...patch });
};

const sanitizePaymentRequest = (payload) => {
  const copy = { ...payload };
  delete copy.memberToken;
  delete copy.password;
  delete copy.verifyCode;
  return copy;
};

const formatWxError = (err) => {
  const data = err.response?.data;
  if (data?.message || data?.code) return `${data.code || ''} ${data.message || ''}`.trim();
  return err.message || 'unknown error';
};

module.exports = {
  pay,
  travelPay,
  shopPay,
  activityPay,
  wechatPayNotify,
  wechatRefundNotify,
  alipayNotify,
  refund,
  getPaymentFailureMessage,
  queryPayStatus,
  adminListPayments,
};
