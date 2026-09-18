!function() {
  'use strict';

  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function getToken() {
    try {
      const u = wx.getStorageSync('user');
      return u && u.memberToken ? u.memberToken : '';
    } catch(e) {
      return '';
    }
  }

  function req(method, url, data) {
    return new Promise(function(resolve, reject) {
      wx.request({
        url: BASE + url,
        method: method,
        data: data || {},
        header: {
          Authorization: 'Bearer ' + getToken(),
          memberToken: getToken(),
          'Content-Type': 'application/json',
        },
        success: function(res) {
          const d = res.data || {};
          if (d.code === 0) return resolve(d.data || {});
          reject(new Error(d.msg || d.message || '请求失败'));
        },
        fail: function() { reject(new Error('网络错误')); },
      });
    });
  }

  const STATUS_MAP = {
    pending: { text: '待处理', cls: 'pending' },
    processing: { text: '处理中', cls: 'processing' },
    done: { text: '已完成', cls: 'done' },
    rejected: { text: '已拒绝', cls: 'rejected' },
  };

  function fmtDate(s) {
    if (!s) return '';
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return '';
    return (d.getMonth() + 1) + '月' + d.getDate() + '日';
  }

  Page({
    data: {
      tab: 0,
      orders: [],
      ordersLoading: true,
      selectedAmount: 0,
      invType: 'personal',
      invTitle: '',
      invTaxNo: '',
      invEmail: '',
      invPhone: '',
      submitting: false,
      records: [],
      recordsLoading: true,
    },

    onLoad: function(options) {
      wx.setNavigationBarTitle({ title: '开票信息' });
      if (options && options.tab === '1') this.setData({ tab: 1 });
      this.loadOrders();
      this.loadRecords();
    },

    onShow: function() { this.loadRecords(); },

    onInputTitle: function(e) { this.setData({ invTitle: e.detail.value }); },
    onInputTaxNo: function(e) { this.setData({ invTaxNo: e.detail.value }); },
    onInputEmail: function(e) { this.setData({ invEmail: e.detail.value }); },
    onInputPhone: function(e) { this.setData({ invPhone: e.detail.value }); },

    setTab: function(e) {
      const tab = parseInt(e.currentTarget.dataset.t, 10);
      this.setData({ tab: tab });
      if (tab === 0) this.loadOrders();
      if (tab === 1) this.loadRecords();
    },

    setInvType: function(e) { this.setData({ invType: e.currentTarget.dataset.t }); },

    loadOrders: function() {
      const self = this;
      self.setData({ ordersLoading: true });
      req('GET', '/orders/all').then(function(d) {
        const list = (d.list || []).map(function(o) {
          return Object.assign({}, o, {
            selected: false,
            amountText: Number(o.amount || 0).toFixed(2),
            shortNo: String(o.orderNo || '').slice(-8),
          });
        });
        self.setData({ orders: list, ordersLoading: false, selectedAmount: 0 });
      }).catch(function(err) {
        self.setData({ ordersLoading: false });
        wx.showToast({ title: err.message || '订单加载失败', icon: 'none' });
      });
    },

    toggleOrder: function(e) {
      const idx = Number(e.currentTarget.dataset.idx);
      const orders = this.data.orders.slice();
      if (!orders[idx]) return;
      orders[idx].selected = !orders[idx].selected;
      const total = orders
        .filter(function(o) { return o.selected; })
        .reduce(function(sum, o) { return sum + Number(o.amount || 0); }, 0);
      this.setData({ orders: orders, selectedAmount: Math.round(total * 100) / 100 });
    },

    submitInvoice: function() {
      if (this.data.submitting) return;
      const selected = this.data.orders.filter(function(o) { return o.selected; });
      if (!selected.length) {
        wx.showToast({ title: '请选择需要开票的订单', icon: 'none' });
        return;
      }

      const title = String(this.data.invTitle || '').trim();
      if (!title) {
        wx.showToast({ title: '请填写发票抬头', icon: 'none' });
        return;
      }
      if (this.data.invType === 'company' && !String(this.data.invTaxNo || '').trim()) {
        wx.showToast({ title: '企业发票需填写税号', icon: 'none' });
        return;
      }

      const self = this;
      self.setData({ submitting: true });
      req('POST', '/invoice/request', {
        orderNos: selected.map(function(o) { return o.orderNo; }),
        invoiceType: self.data.invType,
        title: title,
        taxNo: self.data.invTaxNo || '',
        email: self.data.invEmail || '',
        phone: self.data.invPhone || '',
        amount: self.data.selectedAmount,
      }).then(function() {
        self.setData({ submitting: false, tab: 1 });
        wx.showModal({
          title: '申请已提交',
          content: '发票申请已提交，我们将尽快处理。',
          confirmText: '好的',
          showCancel: false,
        });
        self.loadOrders();
        self.loadRecords();
      }).catch(function(err) {
        self.setData({ submitting: false });
        wx.showToast({ title: err.message || '提交失败', icon: 'none' });
      });
    },

    loadRecords: function() {
      const self = this;
      self.setData({ recordsLoading: true });
      req('GET', '/invoice/my-requests').then(function(d) {
        const list = (d.list || []).map(function(r) {
          const st = STATUS_MAP[r.status] || { text: r.status || '', cls: '' };
          let imgs = [];
          try { if (r.invoiceImages) imgs = JSON.parse(r.invoiceImages); } catch(e) {}
          return Object.assign({}, r, {
            statusText: st.text,
            statusClass: st.cls,
            imgs: imgs,
            createdAtFmt: fmtDate(r.createdAt),
            amountText: Number(r.amount || 0).toFixed(2),
          });
        });
        self.setData({ records: list, recordsLoading: false });
      }).catch(function() { self.setData({ recordsLoading: false }); });
    },

    previewImg: function(e) {
      wx.previewImage({
        current: e.currentTarget.dataset.url,
        urls: e.currentTarget.dataset.urls,
      });
    },
  });
}();
