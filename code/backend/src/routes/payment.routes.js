'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/payment.controller');
const { authMiddleware } = require('../middleware/auth');

// 统一支付
router.get('/pay/pay.json', authMiddleware, ctrl.pay);
router.post('/pay/pay.json', authMiddleware, ctrl.pay);
router.post('/travel/pay.json', authMiddleware, ctrl.travelPay);
router.post('/shop/pay.json', authMiddleware, ctrl.shopPay);
router.post('/singleActivity/pay', authMiddleware, ctrl.activityPay);

// 查询支付状态
router.get('/pay/status', authMiddleware, ctrl.queryPayStatus);

// 退款
router.post('/pay/refund', authMiddleware, ctrl.refund);


// 回调（不需要登录）
router.post('/pay/wechat/notify', ctrl.wechatPayNotify);
router.post('/pay/alipay/notify', ctrl.alipayNotify);
router.post('/notify/payOk', ctrl.wechatPayNotify);
router.post('/notify/payTicketOk', ctrl.wechatPayNotify);
router.post('/notify/refundOk', ctrl.wechatRefundNotify);

// 小红书支付未接入真实通道时不返回模拟 token，避免误判支付成功。
router.post('/redminiapi/deal/query_pay_token', authMiddleware, (req, res) => {
  res.json({ code: -1, result: 0, msg: '小红书支付未配置，请使用微信支付', data: null });
});

module.exports = router;
