!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function getToken() { try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; } }
  function req(method, url, data) {
    return new Promise(function(resolve, reject) {
      wx.request({ url: BASE + url, method: method, data: data || {},
        header: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' },
        success: function(res) { var d = res.data; if (d && d.code === 0) resolve(d.data); else reject(new Error((d && d.msg) || '请求失败')); },
        fail: function(e) { reject(new Error('网络错误')); }
      });
    });
  }

  const STATUS_MAP = { pending: { text: '待处理', cls: 'pending' }, processing: { text: '处理中', cls: 'processing' }, done: { text: '已完成', cls: 'done' }, rejected: { text: '已拒绝', cls: 'rejected' } };
  function fmtDate(s) { if (!s) return ''; var d = new Date(s); return (d.getMonth()+1) + '月' + d.getDate() + '日'; }

  Page({
    data: { tab: 0, orders: [], ordersLoading: true, selectedAmount: 0, invType: 'personal', invTitle: '', invTaxNo: '', invEmail: '', invPhone: '', submitting: false, records: [], recordsLoading: true },

    onLoad: function() { this.loadOrders(); this.loadRecords(); },
    onShow: function() { this.loadRecords(); },

    setTab: function(e) {
      var t = parseInt(e.currentTarget.dataset.t);
      this.setData({ tab: t });
      if (t === 1) this.loadRecords();
    },
    setInvType: function(e) { this.setData({ invType: e.currentTarget.dataset.t }); },

    loadOrders: function() {
      var self = this;
      req('GET', '/orders/all').then(function(d) {
        var list = (d && d.list) ? d.list.map(function(o) { return Object.assign({}, o, { selected: false }); }) : [];
        self.setData({ orders: list, ordersLoading: false });
      }).catch(function() { self.setData({ ordersLoading: false }); });
    },

    toggleOrder: function(e) {
      var idx = e.currentTarget.dataset.idx;
      var orders = this.data.orders.slice();
      orders[idx].selected = !orders[idx].selected;
      var total = orders.filter(function(o) { return o.selected; }).reduce(function(s, o) { return s + (o.amount || 0); }, 0);
      this.setData({ orders: orders, selectedAmount: Math.round(total * 100) / 100 });
    },

    onInput: function(e) { var k = e.currentTarget.dataset.key; var u = {}; u[k] = e.detail.value; this.setData(u); },

    submitInvoice: function() {
      if (this.data.submitting) return;
      var selected = this.data.orders.filter(function(o) { return o.selected; });
      if (!selected.length) { wx.showToast({ title: '请选择需要开票的订单', icon: 'none' }); return; }
      if (!this.data.invTitle.trim()) { wx.showToast({ title: '请填写发票抬头', icon: 'none' }); return; }
      if (this.data.invType === 'company' && !this.data.invTaxNo.trim()) { wx.showToast({ title: '企业发票需填写税号', icon: 'none' }); return; }
      var self = this;
      self.setData({ submitting: true });
      req('POST', '/invoice/request', {
        orderNos: selected.map(function(o) { return o.orderNo; }),
        invoiceType: self.data.invType,
        title: self.data.invTitle,
        taxNo: self.data.invTaxNo,
        email: self.data.invEmail,
        phone: self.data.invPhone,
        amount: self.data.selectedAmount,
      }).then(function() {
        self.setData({ submitting: false });
        wx.showModal({ title: '申请已提交', content: '发票申请已提交，我们将尽快处理并发送到您的邮箱。', confirmText: '好的', showCancel: false, success: function() {
          self.setData({ tab: 1 }); self.loadRecords();
        }});
      }).catch(function(e) { self.setData({ submitting: false }); wx.showToast({ title: (e && e.message) || '提交失败', icon: 'none' }); });
    },

    loadRecords: function() {
      var self = this;
      self.setData({ recordsLoading: true });
      req('GET', '/invoice/my-requests').then(function(d) {
        var list = (d && d.list) ? d.list.map(function(r) {
          var st = STATUS_MAP[r.status] || { text: r.status, cls: '' };
          var imgs = []; try { if (r.invoiceImages) imgs = JSON.parse(r.invoiceImages); } catch {}
          return Object.assign({}, r, { statusText: st.text, statusClass: st.cls, imgs: imgs, createdAtFmt: fmtDate(r.createdAt) });
        }) : [];
        self.setData({ records: list, recordsLoading: false });
      }).catch(function() { self.setData({ recordsLoading: false }); });
    },

    previewImg: function(e) {
      wx.previewImage({ current: e.currentTarget.dataset.url, urls: e.currentTarget.dataset.urls });
    },
  });
}();
