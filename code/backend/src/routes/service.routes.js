'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/service.controller');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

// 服务字典
router.get('/rsapi/rhkMiniapp/mapSysDic', ctrl.getServiceDictionary);
router.get('/hotelapi/hotelServiceManage/listHotelServiceBySta', ctrl.getHotelServices);

// 需要登录
router.post('/rsapi/rsOrder/createServerOrderV2', authMiddleware, ctrl.createServiceOrder);
router.post('/rsapi/rsOrder/list', authMiddleware, ctrl.getServiceOrderList);
router.post('/rsapi/rsOrder/updateOrder', authMiddleware, ctrl.updateServiceOrder);
router.post('/rsapi/rsIsOrder/updateInstantRsOrder', authMiddleware, ctrl.updateServiceOrder);
router.post('/rsapi/rhkMiniapp/saveRecommV2', optionalAuth, ctrl.saveRecommendation);
router.post('/rsapi/frontend/getComplaintAndAdvice', authMiddleware, ctrl.getComplaintAndAdvice);
router.get('/rsapi/rsDuty/queryUserInfo', authMiddleware, (req, res) => res.json({ code: 0, data: {} }));

// 其他常用服务
router.get('/selfBook/guestCheck.json', authMiddleware, (req, res) => res.json({ code: 0, data: {} }));
router.post('/selfBook/guestCheck.json', authMiddleware, (req, res) => res.json({ code: 0, data: {} }));

module.exports = router;
