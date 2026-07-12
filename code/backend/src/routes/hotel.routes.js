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
router.post('/hotel/product/resrvCheck.json', optionalAuth, (req, res) => {
  const body = req.body || {};
  const rq = body.bookOrderInfoRQ || body;
  const rmNum = Number(rq.rmNum || body.rooms || 1);
  const fromDate = rq.fromDate || body.checkIn || '';
  const toDate = rq.toDate || body.checkOut || '';
  const amount = Number(body.money || body.totalAmount || rq.money || 0);
  return res.json({
    code: 0,
    result: 1,
    msg: 'success',
    retVal: {
      result: 0,
      isBookAble: 0,
      msg: '',
      rateSum: amount,
      everyDayDetails: [{ rsvDate: fromDate, realPrice: amount }],
      gcProductDetailDto: { arrivalFrom: '12:00', arrivalTo: '23:59', productGcLevel: '000', tickets: '' },
      rmNum,
      fromDate,
      toDate,
    },
  });
});

// 需要登录
router.post('/hotel/product/makeOrder.json', authMiddleware, ctrl.makeHotelOrder);
router.get('/pagesC/order/list', authMiddleware, ctrl.getHotelOrderList);

// 鏈嶅姟
router.get('/hotelapi/hotelServiceManage/listHotelServiceBySta', optionalAuth, require('../controllers/service.controller').getHotelServices);
router.get('/hotelapi/MapModeConfig/checkPointCustomize', (req, res) => res.json({ code: 0, data: {} }));

module.exports = router;
