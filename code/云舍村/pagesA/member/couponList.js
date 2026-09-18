!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function getToken() {
    try {
      const u = wx.getStorageSync('user');
      return u && u.memberToken ? u.memberToken : '';
    } catch (e) {
      return '';
    }
  }

  function fmtDate(s) {
    if (!s) return '';
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return '';
    return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate();
  }

  function toView(mc) {
    const c = mc.coupon || {};
    const expired = c.endDate && new Date(c.endDate).getTime() < Date.now();
    let statusText = '可使用';
    if (mc.status === 1) statusText = '已使用';
    else if (mc.status !== 0 || expired) statusText = '已失效';
    let valueText = '';
    if (c.discountAmount) valueText = '¥' + Number(c.discountAmount);
    else if (c.discountRate) valueText = Number((c.discountRate * 10).toFixed(1)) + '折';
    const start = fmtDate(c.startDate);
    const end = fmtDate(c.endDate);
    return {
      id: mc.id,
      name: c.name || '优惠券',
      desc: c.description || '',
      valueText: valueText,
      condText: c.minAmount ? '满' + Number(c.minAmount) + '元可用' : '无门槛',
      timeText: end ? (start ? start + ' - ' : '') + end + ' 有效' : '长期有效',
      statusText: statusText,
      usable: statusText === '可使用',
    };
  }

  Page({
    data: { list: [], loading: true },

    onLoad: function() {
      this.loadList();
    },

    onPullDownRefresh: function() {
      this.loadList();
    },

    loadList: function() {
      const self = this;
      self.setData({ loading: true });
      wx.request({
        url: BASE + '/member/findCouponDetailListByCondi.json',
        method: 'GET',
        data: { pageNum: 1, pageSize: 100 },
        header: { Authorization: 'Bearer ' + getToken() },
        success: function(res) {
          const d = res.data || {};
          const list = d.code === 0 && d.data && Array.isArray(d.data.list) ? d.data.list : [];
          self.setData({ list: list.map(toView), loading: false });
        },
        fail: function() {
          self.setData({ list: [], loading: false });
          wx.showToast({ title: '网络异常，请稍后重试', icon: 'none' });
        },
        complete: function() {
          wx.stopPullDownRefresh();
        },
      });
    },
  });
}();
