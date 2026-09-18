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

  function get(url, data) {
    return new Promise(function(resolve) {
      wx.request({
        url: BASE + url,
        method: 'GET',
        data: data || {},
        header: { Authorization: 'Bearer ' + getToken() },
        success: function(res) {
          const d = res.data || {};
          resolve(d.code === 0 && d.data ? d.data : null);
        },
        fail: function() { resolve(null); },
      });
    });
  }

  function fmtTime(s) {
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return '';
    const pad = function(n) { return n < 10 ? '0' + n : '' + n; };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  Page({
    data: { points: 0, list: [], loading: true },

    onLoad: function() {
      this.loadData();
    },

    onPullDownRefresh: function() {
      this.loadData();
    },

    loadData: function() {
      const self = this;
      self.setData({ loading: true });
      Promise.all([
        get('/member/getAccountIncludeTreatList.json'),
        get('/member/listPoint.json', { pageNum: 1, pageSize: 100 }),
      ]).then(function(r) {
        const account = r[0];
        const rows = r[1] && Array.isArray(r[1].list) ? r[1].list : [];
        if (!account && !r[1]) wx.showToast({ title: '网络异常，请稍后重试', icon: 'none' });
        self.setData({
          points: account && account.points ? account.points : 0,
          list: rows.map(function(p) {
            const n = Number(p.points) || 0;
            return {
              id: p.id,
              desc: p.description || (n >= 0 ? '积分获得' : '积分使用'),
              time: fmtTime(p.createdAt),
              amount: (n >= 0 ? '+' : '') + n,
              plus: n >= 0,
            };
          }),
          loading: false,
        });
        wx.stopPullDownRefresh();
      });
    },
  });
}();
