'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/activity.controller');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

// 公开
router.get('/singleActivity/list', optionalAuth, ctrl.getActivityList);

// 需要登录
router.post('/singleActivity/saveSingleActivityOrder', authMiddleware, ctrl.saveActivityOrder);
router.get('/singleActivity/querySingleActivityOrder', authMiddleware, ctrl.getActivityOrder);
router.post('/singleActivity/getSingleActivityOrderPrice', authMiddleware, ctrl.calculateActivityPrice);
router.get('/singleActivity/cancelSingleActivityOrder', authMiddleware, ctrl.cancelActivityOrder);
router.get('/singleActivity/payDetail', authMiddleware, (req, res) => res.json({ code: 0, data: {} }));

module.exports = router;
