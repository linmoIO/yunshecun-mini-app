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

// 模拟支付成功（开发测试用）
router.get('/pay/mock', ctrl.mockPaySuccess);

// 回调（不需要登录）
router.post('/pay/wechat/notify', ctrl.wechatPayNotify);
router.post('/pay/alipay/notify', ctrl.alipayNotify);

// 小红书支付
router.post('/redminiapi/deal/query_pay_token', authMiddleware, (req, res) => res.json({ code: 0, data: { token: 'mock_token' } }));

module.exports = router;
