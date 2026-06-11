!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  const STATUS_MAP = {
    pending: { text: '待支付', cls: 'pending' },
    paid: { text: '已支付', cls: 'paid' },
    confirmed: { text: '已确认', cls: 'paid' },
    processing: { text: '处理中', cls: 'paid' },
    shipped: { text: '已发货', cls: 'shipped' },
    completed: { text: '已完成', cls: 'completed' },
    cancelled: { text: '已取消', cls: 'cancelled' },
    refunded: { text: '已退款', cls: 'cancelled' },
  };

  function getToken() {
    try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; }
  }

  function fmtDate(s) {
    if (!s) return '';
    var d = new Date(s);
    return (d.getMonth()+1) + '月' + d.getDate() + '日 ' + ('0'+d.getHours()).slice(-2) + ':' + ('0'+d.getMinutes()).slice(-2);
  }

  Page({
    data: { orders: [], loading: false },

    onLoad: function() { this.loadOrders(); },
    onShow: function() { this.loadOrders(); },

    loadOrders: function() {
      var self = this;
      self.setData({ loading: true });
      wx.request({
        url: BASE + '/shop/my-orders?pageNum=1&pageSize=30',
        method: 'GET',
        header: { 'Authorization': 'Bearer ' + getToken() },
        success: function(res) {
          var d = res.data;
          var list = (d && d.code === 0 && d.data && d.data.list) ? d.data.list : [];
          var sm = STATUS_MAP;
          list = list.map(function(o) {
            var st = sm[o.status] || { text: o.status, cls: '' };
            return Object.assign({}, o, {
              statusText: st.text, statusClass: st.cls,
              createdAtFmt: fmtDate(o.createdAt),
              notes: (o.notes || '').replace(/\s*\|\s*/g, '\n'),
            });
          });
          self.setData({ orders: list, loading: false });
        },
        fail: function() { self.setData({ loading: false }); }
      });
    },

    copyTracking: function(e) {
      var no = e.currentTarget.dataset.no;
      wx.setClipboardData({ data: no, success: function() { wx.showToast({ title: '已复制运单号', icon: 'success' }); } });
    },
  });
}();
