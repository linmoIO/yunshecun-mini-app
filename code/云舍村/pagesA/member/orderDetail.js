!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function gt() { try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; } }
  function req(url) {
    return new Promise(function(resolve, reject) {
      wx.request({ url: BASE + url, method: 'GET', header: { 'Authorization': 'Bearer ' + gt() },
        success: function(r) { var d = r.data; if (d && d.code === 0) resolve(d.data); else reject(new Error((d && d.msg) || '加载失败')); },
        fail: function() { reject(new Error('网络错误')); }
      });
    });
  }

  const STATUS_TRAVEL = { pending:'待付款', paid:'待出行', confirmed:'待出行', completed:'已完成', cancelled:'已取消', refunded:'已退款' };
  const STATUS_SHOP = { pending:'待付款', paid:'待发货', confirmed:'待发货', shipped:'待收货', completed:'待评价', cancelled:'已取消', refunded:'已退款' };

  Page({
    data: { order: null, type: 'travel', loading: true, orderNo: '' },

    onLoad: function(opts) {
      var orderNo = opts.orderNo || '';
      var type = opts.type || 'travel'; // 'travel'|'hotel'|'shop'
      this.setData({ orderNo: orderNo, type: type });
      wx.setNavigationBarTitle({ title: '订单详情' });
      if (!orderNo) { this.setData({ loading: false }); return; }
      this.loadOrder(orderNo, type);
    },

    loadOrder: function(orderNo, type) {
      var s = this;
      var url = type === 'shop' ? '/shop/order-detail/' + orderNo : '/travel/order-detail/' + orderNo;
      req(url).then(function(d) {
        s.setData({ order: d, loading: false });
      }).catch(function() {
        // 兜底：从 orderAggregation 列表里找
        wx.request({
          url: BASE + '/orderAggregation/orderList.json',
          method: 'GET', header: { 'Authorization': 'Bearer ' + gt() },
          success: function(r) {
            var d = r.data;
            if (d && d.result === 1 && d.retVal && d.retVal.orderList) {
              var found = d.retVal.orderList.find(function(o) { return o.orderNo === orderNo; });
              s.setData({ order: found || null, loading: false });
            } else { s.setData({ loading: false }); }
          },
          fail: function() { s.setData({ loading: false }); }
        });
      });
    },

    goChat: function() { wx.navigateTo({ url: '/pagesA/other/chat' }); },
    goBack: function() { wx.navigateBack(); },
  });
}();
