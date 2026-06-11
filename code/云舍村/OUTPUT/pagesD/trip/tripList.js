!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function getToken() {
    try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; }
  }
  function getUser() { try { return wx.getStorageSync('user') || null; } catch(e) { return null; } }

  function get(url) {
    return new Promise(function(resolve, reject) {
      wx.request({
        url: BASE + url, method: 'GET',
        header: { 'Authorization': 'Bearer ' + getToken() },
        success: function(res) { resolve(res.data || {}); },
        fail: function(e) { reject(e); }
      });
    });
  }

  const STATUS = {
    new: { text: '待处理', color: '#f39c12' },
    processing: { text: '处理中', color: '#2196f3' },
    done: { text: '已完成', color: '#27ae60' },
  };

  function fmtDate(s) {
    if (!s) return '';
    var d = new Date(s);
    return (d.getMonth()+1) + '/' + d.getDate() + ' ' + ('0'+d.getHours()).slice(-2) + ':' + ('0'+d.getMinutes()).slice(-2);
  }

  Page({
    data: {
      activeTab: 0,
      tabs: [{ name: '行程计划', value: 0 }, { name: '我的行程', value: 1 }],
      // 行程计划 = 我提交的DIY需求
      plans: [],
      plansLoading: true,
      // 我的行程 = 后台给我的回复方案
      responses: [],
      responsesLoading: true,
    },

    __l: function() {},

    onLoad: function(opts) {
      if (opts && opts.type == 2) this.setData({ activeTab: 1 });
      this.loadPlans();
      this.loadResponses();
    },

    onShow: function() {
      this.loadPlans();
      this.loadResponses();
    },

    switchTab: function(e) {
      this.setData({ activeTab: e.currentTarget.dataset.idx });
    },

    loadPlans: function() {
      var self = this, u = getUser();
      if (!u || !u.memberId) { self.setData({ plansLoading: false }); return; }
      get('/diy/my-requests').then(function(d) {
        var list = (d && d.data && d.data.list) ? d.data.list : [];
        list = list.map(function(r) {
          var st = STATUS[r.status] || { text: r.status, color: '#888' };
          return Object.assign({}, r, { statusText: st.text, statusColor: st.color, createdAtFmt: fmtDate(r.createdAt) });
        });
        self.setData({ plans: list, plansLoading: false });
      }).catch(function() { self.setData({ plansLoading: false }); });
    },

    loadResponses: function() {
      var self = this, u = getUser();
      if (!u || !u.memberId) { self.setData({ responsesLoading: false }); return; }
      get('/diy/my-requests').then(function(d) {
        var list = (d && d.data && d.data.list) ? d.data.list : [];
        // 只显示有回复方案的记录
        list = list.filter(function(r) { return r.responsePlan || r.responseImages; }).map(function(r) {
          var imgs = [];
          try { if (r.responseImages) imgs = JSON.parse(r.responseImages); } catch {}
          return Object.assign({}, r, { imgs: imgs, createdAtFmt: fmtDate(r.createdAt) });
        });
        self.setData({ responses: list, responsesLoading: false });
      }).catch(function() { self.setData({ responsesLoading: false }); });
    },

    goNewPlan: function() {
      wx.navigateTo({ url: '/pagesA/other/diyTrip' });
    },

    viewDetail: function(e) {
      var idx = e.currentTarget.dataset.idx;
      var plan = this.data.plans[idx];
      if (!plan) return;
      wx.showModal({
        title: '需求详情',
        content: '目的地：' + (plan.destinations||'-') + '\n出发：' + (plan.startDate||'-') + '\n天数：' + (plan.duration||'-') + '\n人数：' + (plan.persons||'-') + '\n预算：' + (plan.budget||'-') + '\n说明：' + (plan.requirements||'-'),
        confirmText: '关闭', showCancel: false,
      });
    },

    viewResponse: function(e) {
      var idx = e.currentTarget.dataset.idx;
      var resp = this.data.responses[idx];
      if (!resp) return;
      if (resp.imgs && resp.imgs.length) {
        wx.previewImage({ current: resp.imgs[0], urls: resp.imgs });
      }
    },
  });
}();
