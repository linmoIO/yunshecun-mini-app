!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function gt() {
    try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; }
  }

  Page({
    data: { topDest: [], topCat: [], orderCount: 0, manualPref: {}, loading: true,
      seasons: ['春', '夏', '秋', '冬'],
      styles: ['休闲度假', '探险徒步', '文化体验', '亲子游', '蜜月旅行'],
      editSeason: '', editStyle: '', saving: false },

    onLoad() {
      wx.setNavigationBarTitle({ title: '出行偏好' });
      this.loadPref();
    },

    loadPref() {
      var s = this;
      wx.request({
        url: BASE + '/member/travel-preference',
        method: 'GET',
        header: { 'Authorization': 'Bearer ' + gt() },
        success: res => {
          var d = res.data;
          if (d && d.code === 0 && d.data) {
            s.setData({
              topDest: d.data.topDest || [],
              topCat: d.data.topCat || [],
              orderCount: d.data.orderCount || 0,
              manualPref: d.data.manualPref || {},
              editSeason: (d.data.manualPref && d.data.manualPref.season) || '',
              editStyle: (d.data.manualPref && d.data.manualPref.style) || '',
              loading: false
            });
          } else {
            s.setData({ loading: false });
          }
        },
        fail: () => s.setData({ loading: false })
      });
    },

    selectSeason(e) { this.setData({ editSeason: e.currentTarget.dataset.val }); },
    selectStyle(e) { this.setData({ editStyle: e.currentTarget.dataset.val }); },

    savePref() {
      if (this.data.saving) return;
      var s = this;
      s.setData({ saving: true });
      wx.request({
        url: BASE + '/member/travel-preference',
        method: 'POST',
        data: { season: s.data.editSeason, style: s.data.editStyle },
        header: { 'Authorization': 'Bearer ' + gt(), 'Content-Type': 'application/json' },
        success: res => {
          s.setData({ saving: false });
          wx.showToast({ title: '保存成功', icon: 'success' });
          s.loadPref();
        },
        fail: () => { s.setData({ saving: false }); wx.showToast({ title: '保存失败', icon: 'none' }); }
      });
    }
  });
}();
