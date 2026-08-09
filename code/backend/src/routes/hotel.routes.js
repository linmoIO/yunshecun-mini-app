'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/hotel.controller');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

// 鍏紑鎺ュ彛
router.get('/hotel/info.json', optionalAuth, ctrl.getHotelInfo);
router.post('/hotel/hotelListAllNew.json', optionalAuth, ctrl.getHotelList);
router.get('/hotelapi/aggregateProductList/pageHotelListForApp', optionalAuth, ctrl.getHotelList);
router.post('/hotel/findHotelByCondition.json', optionalAuth, ctrl.getHotelList);
router.get('/hotel/product/showOrder.json', optionalAuth, ctrl.showOrder);
router.post('/hotel/product/resrvCheck.json', optionalAuth, ctrl.checkHotelReservation);

// 需要登录
router.post('/hotel/product/makeOrder.json', authMiddleware, ctrl.makeHotelOrder);
router.get('/pagesC/order/list', authMiddleware, ctrl.getHotelOrderList);

// 鏈嶅姟
router.get('/hotelapi/hotelServiceManage/listHotelServiceBySta', optionalAuth, require('../controllers/service.controller').getHotelServices);
router.get('/hotelapi/MapModeConfig/checkPointCustomize', (req, res) => res.json({ code: 0, data: {} }));

module.exports = router;
