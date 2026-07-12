'use strict';

const request = require('./request/request.js');

function normalizeResult(res) {
  return res && (res.data || res.retVal || res.result || res);
}

async function getMicroPageData(params = {}) {
  try {
    const res = await request.request({
      url: '/micro/page',
      method: 'GET',
      data: params,
    });
    return normalizeResult(res);
  } catch (_) {
    return {
      page: { config: { props: { title: '' }, wrap: {} } },
      items: [],
      serverData: [],
    };
  }
}

async function receiveCoupon(data = {}, options = {}) {
  try {
    const res = await request.request({
      url: '/coupon/receiveGiftCoupon.json',
      method: 'GET',
      data,
      ...options,
    });
    return normalizeResult(res);
  } catch (err) {
    return { result: 0, code: -1, msg: err.message || '领取失败' };
  }
}

module.exports = {
  getMicroPageData,
  receiveCoupon,
};
