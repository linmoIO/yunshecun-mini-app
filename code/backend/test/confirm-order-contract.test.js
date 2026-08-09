'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const assert = require('node:assert/strict');
const test = require('node:test');

const baseUrl = process.env.LOCAL_TEST_BASE_URL || 'https://localhost:3443';

test('旅行确认订单计价返回完整的可选字段', async () => {
  const response = await fetch(baseUrl + '/api/sync/interfaceTransfer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: {
        unitCode: 'SONGTSAM',
        travelType: 'DEMO-TRAVEL-ROOTS-01',
        payType: 'CASH',
        otaChannel: 'WECHAT',
        ota: 'DIRECT',
        num: 1,
        isGroup: 'T',
        beginDate: '2026-08-09',
        endDate: '2026-08-10',
        travelGroupCode: 'DEMO-TRAVEL-ROOTS-01',
        adultNum: 1,
        babyNum: 0,
        childrenNum: 0,
        bigChildrenNum: 0,
        singleRoomPeople: 0,
        roomNum: 1,
        point: 0,
      },
      config: {
        interfaceType: 'POST',
        interfaceModule: 'GC_TRAVEL_ORDER',
        interfaceMethod: '/api/reserve/order/queryPayDetail',
        interfaceFrom: 'GC',
        hotelGroupCode: 'SONGTSAM',
      },
    }),
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.code, 0);
  assert.equal(body.result, 1);
  assert.equal(body.retVal.result, 0);

  const price = body.retVal.retVal;
  assert.equal(typeof price.readyPay, 'number');
  assert.equal(typeof price.adultTeamRateSum, 'number');
  assert.equal(typeof price.bigChildrenTeamRateSum, 'number');
  assert.equal(typeof price.midChildrenTeamRateSum, 'number');
  assert.equal(typeof price.babyTeamRateSum, 'number');
  assert.ok(Array.isArray(price.couponSimpleInfoDtoList));
});

test('日活动确认订单按出行人数计价并保持旧页面响应契约', async () => {
  const login = await fetch(baseUrl + '/api/member/memberLoginOpen.json?memberId=9f825402-2c46-498a-9e90-b10c49875226');
  assert.equal(login.status, 200);
  const loginBody = await login.json();
  const token = loginBody.data.memberToken;
  assert.ok(token);

  const response = await fetch(baseUrl + '/api/singleActivity/getSingleActivityOrderPrice', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      activityCode: 'DEMO-ACTIVITY-TEA',
      adult: 2,
      baby: 0,
      bigChild: 0,
      child: 0,
    }),
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.code, 0);
  assert.equal(body.result, 1);
  assert.equal(body.retVal.totalPrice, 336);
  assert.equal(body.retVal.totalCredit, 0);

  const save = await fetch(baseUrl + '/api/singleActivity/saveSingleActivityOrder', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      activityCode: 'DEMO-ACTIVITY-TEA',
      adult: 2,
      baby: 0,
      bigChild: 0,
      child: 0,
      contactMan: '演示联系人',
      contactPhone: '13800138000',
      bizDatetime: '2026-08-09 10:00',
      guestDtoList: [{ name: '演示联系人' }, { name: '同行人' }],
    }),
  });
  assert.equal(save.status, 200);
  const saveBody = await save.json();
  assert.equal(saveBody.result, 1);
  assert.equal(saveBody.retVal.totalAmount, 336);
  assert.ok(saveBody.retVal.orderNo);

  const detail = await fetch(baseUrl + '/api/singleActivity/querySingleActivityOrder?actRsvNo=' + encodeURIComponent(saveBody.retVal.orderNo), {
    headers: { Authorization: 'Bearer ' + token },
  });
  assert.equal(detail.status, 200);
  const detailBody = await detail.json();
  assert.equal(detailBody.result, 1);
  assert.equal(detailBody.retVal.payRate, 336);
  assert.equal(detailBody.retVal.aggregationOrder.descript, '演示·桃源擂茶入门');
  assert.ok(Array.isArray(detailBody.retVal.verifyList));
  assert.equal(detailBody.retVal.activityInfo.name, '演示·桃源擂茶入门');

  const payDetail = await fetch(baseUrl + '/api/sync/interfaceTransfer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: { orderNo: saveBody.retVal.orderNo, payType: 'CASH' },
      config: {
        interfaceType: 'POST',
        interfaceModule: 'GC_TRAVEL_ORDER',
        interfaceMethod: '/api/reserve/order/queryPayDetail',
        interfaceFrom: 'GC',
        hotelGroupCode: 'SONGTSAM',
      },
    }),
  });
  assert.equal(payDetail.status, 200);
  const payDetailBody = await payDetail.json();
  assert.equal(payDetailBody.result, 1);
  assert.equal(payDetailBody.retVal.retVal.readyPay, 336);

  const paySummary = await fetch(baseUrl + '/api/singleActivity/payDetail?actRsvNo=' + encodeURIComponent(saveBody.retVal.orderNo), {
    headers: { Authorization: 'Bearer ' + token },
  });
  assert.equal(paySummary.status, 200);
  const paySummaryBody = await paySummary.json();
  assert.equal(paySummaryBody.result, 1);
  assert.equal(paySummaryBody.retVal.payRate, 336);
  assert.ok(Array.isArray(paySummaryBody.retVal.payTypes));

  const cancel = await fetch(baseUrl + '/api/singleActivity/cancelSingleActivityOrder?orderNo=' + encodeURIComponent(saveBody.retVal.orderNo), {
    headers: { Authorization: 'Bearer ' + token },
  });
  assert.equal(cancel.status, 200);
  const cancelBody = await cancel.json();
  assert.equal(cancelBody.code, 0);
});

test('日活动确认页辅助接口返回可消费的默认结构', async () => {
  const response = await fetch(baseUrl + '/api/sync/interfaceTransfer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: { activityCode: 'DEMO-ACTIVITY-TEA' },
      config: {
        interfaceType: 'GET',
        interfaceModule: 'GC_ACTIVITIES_CENTER',
        interfaceMethod: '/api/singleWechat/getPriceDefine',
        interfaceFrom: 'GC',
        hotelGroupCode: 'SONGTSAM',
      },
    }),
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.result, 1);
  assert.equal(body.retVal.result, 0);
  assert.equal(body.retVal.retVal.price, 168);
});

test('确认订单的入住人接口同时返回新旧页面可消费的结构', async () => {
  const login = await fetch(baseUrl + '/api/member/memberLoginOpen.json?memberId=9f825402-2c46-498a-9e90-b10c49875226');
  const loginBody = await login.json();
  const token = loginBody.data.memberToken;
  assert.ok(token);

  const response = await fetch(baseUrl + '/api/memberapi/guestBase/listGuestLinkExtraInfoWithMemberIdOrOpenId', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ channel: 'WECHAT' }),
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.code, 0);
  assert.equal(body.result, 1);
  assert.ok(Array.isArray(body.data.list));
  assert.equal(body.retVal.result, 0);
  assert.ok(Array.isArray(body.retVal.retVal));
  for (const guest of body.retVal.retVal) {
    assert.equal(typeof guest.guestId, 'string');
    assert.ok(Array.isArray(guest.guestLinkRelationExtraSimpleDtoList));
  }
});

test('酒店确认订单预校验返回与真实房型一致的价格明细', async () => {
  const response = await fetch(baseUrl + '/api/hotel/product/resrvCheck.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookOrderInfoRQ: {
        hotelCode: 'DEMO-HOTEL-YUNSHE',
        rmtype: 'DEMO-COURTYARD-A',
        fromDate: '2026-08-09',
        toDate: '2026-08-11',
        rmNum: 1,
      },
    }),
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.result, 1);
  assert.equal(body.retVal.isBookAble, 0);
  assert.equal(body.retVal.rateSum, 1960);
  assert.deepEqual(body.retVal.everyDayDetails.map((item) => item.realPrice), [980, 980]);
});

test('商城确认订单拒绝无效数量，避免生成异常订单', async () => {
  const login = await fetch(baseUrl + '/api/member/memberLoginOpen.json?memberId=9f825402-2c46-498a-9e90-b10c49875226');
  const token = (await login.json()).data.memberToken;
  const products = await fetch(baseUrl + '/api/shop/products');
  const product = (await products.json()).data.list[0];
  assert.ok(product?.id);

  const response = await fetch(baseUrl + '/api/shop/order', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId: product.id,
      quantity: 0,
      contactName: '演示联系人',
      contactPhone: '13800138000',
      address: '云舍村 1 号',
    }),
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.code, -1);
  assert.equal(body.msg, '商品数量不正确');
});

test('酒店创建订单拒绝无效房型，避免生成零金额订单', async () => {
  const login = await fetch(baseUrl + '/api/member/memberLoginOpen.json?memberId=9f825402-2c46-498a-9e90-b10c49875226');
  const token = (await login.json()).data.memberToken;
  const response = await fetch(baseUrl + '/api/hotel/product/makeOrder.json', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bookOrderInfoRQ: {
        hotelCode: 'DEMO-HOTEL-YUNSHE',
        rmtype: 'MISSING-ROOM',
        fromDate: '2026-08-09',
        toDate: '2026-08-10',
        rmNum: 1,
        contactName: '演示联系人',
        contactMobile: '13800138000',
      },
    }),
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.code, -1);
  assert.equal(body.msg, '房型不存在或已下架');
});
