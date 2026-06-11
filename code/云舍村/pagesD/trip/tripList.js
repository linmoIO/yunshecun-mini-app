!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function getToken() { try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; } }
  function getUser() { try { return wx.getStorageSync('user') || null; } catch(e) { return null; } }

  function get(url) {
    return new Promise(function(resolve, reject) {
      wx.request({ url: BASE + url, method: 'GET', header: { 'Authorization': 'Bearer ' + getToken() },
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
  const ORDER_STATUS = {
    '1': '待付款', '3': '待出行', '5': '已取消', '9': '已完成',
    pending: '待付款', confirmed: '待出行', completed: '已完成', cancelled: '已取消',
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
      // 行程计划 = 酒旅订单列表
      orders: [],
      ordersLoading: true,
      // 我的行程 = DIY 回复方案
      responses: [],
      responsesLoading: true,
    },

    __l: function() {},

    onLoad: function(opts) {
      // type=2 是老的导航参数，现在统一进入行程计划(tab 0)
      this.setData({ activeTab: 0 });
      this.loadOrders();
      this.loadResponses();
    },

    onShow: function() {
      this.loadOrders();
      this.loadResponses();
    },

    switchTab: function(e) {
      this.setData({ activeTab: parseInt(e.currentTarget.dataset.idx) });
    },

    // 行程计划：从 orderAggregation 加载酒旅订单
    loadOrders: function() {
      var self = this, u = getUser();
      if (!u) { self.setData({ ordersLoading: false }); return; }
      self.setData({ ordersLoading: true });
      var params = '?openid=' + (u.openid || '') + '&memberid=' + (u.memberId || '');
      wx.request({
        url: BASE + '/orderAggregation/orderList.json' + params,
        method: 'GET',
        header: { 'Authorization': 'Bearer ' + getToken() },
        success: function(res) {
          var d = res.data;
          var list = (d && d.result === 1 && d.retVal && d.retVal.orderList) ? d.retVal.orderList : [];
          list = list.map(function(o) {
            return Object.assign({}, o, {
              statusText: ORDER_STATUS[o.orderStatus] || ORDER_STATUS[o.status] || o.orderStatus || '—',
              channelText: o.channel === 'room' ? '酒店' : '旅游套餐',
              isRoom: o.channel === 'room',
            });
          });
          self.setData({ orders: list, ordersLoading: false });
        },
        fail: function() { self.setData({ ordersLoading: false }); }
      });
    },

    // 我的行程：从 diy/my-requests 加载 DIY 回复方案
    loadResponses: function() {
      var self = this, u = getUser();
      if (!u || !u.memberId) { self.setData({ responsesLoading: false }); return; }
      self.setData({ responsesLoading: true });
      get('/diy/my-requests').then(function(d) {
        var list = (d && d.data && d.data.list) ? d.data.list : [];
        list = list.filter(function(r) { return r.responsePlan || (r.responseImages && r.responseImages !== '[]'); })
          .map(function(r) {
            var imgs = [];
            try { if (r.responseImages) imgs = JSON.parse(r.responseImages); } catch {}
            var st = STATUS[r.status] || { text: r.status, color: '#888' };
            return Object.assign({}, r, { imgs: imgs, statusText: st.text, statusColor: st.color, createdAtFmt: fmtDate(r.createdAt) });
          });
        self.setData({ responses: list, responsesLoading: false });
      }).catch(function() { self.setData({ responsesLoading: false }); });
    },

    goNewPlan: function() {
      wx.navigateTo({ url: '/pagesA/other/diyTrip' });
    },

    goOrderDetail: function(e) {
      var order = this.data.orders[e.currentTarget.dataset.idx];
      if (!order) return;
      var tp = order.channel === 'room' ? 'hotel' : 'travel';
      wx.navigateTo({ url: '/pagesA/member/orderDetail?orderNo=' + order.orderNo + '&type=' + tp });
    },

    viewResponse: function(e) {
      var idx = e.currentTarget.dataset.idx;
      var resp = this.data.responses[idx];
      if (!resp) return;
      if (resp.imgs && resp.imgs.length) wx.previewImage({ current: resp.imgs[0], urls: resp.imgs });
    },
  });
}();
