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

  var EMPTY_FORM = { name: '', phone: '', province: '', city: '', district: '', address: '', isDefault: false };

  Page({
    data: { addresses: [], loading: true, form: Object.assign({}, EMPTY_FORM), editId: null, saving: false, showForm: false },

    onLoad: function(opts) {
      this.loadAddresses();
      // 如果是选择模式（从下单页跳来），显示选择UI
      this._selectMode = opts && opts.select === '1';
    },
    onShow: function() { this.loadAddresses(); },

    loadAddresses: function() {
      var self = this;
      req('GET', '/member/addresses').then(function(d) {
        self.setData({ addresses: d.list || [], loading: false });
      }).catch(function() { self.setData({ loading: false }); });
    },

    newAddr: function() {
      this.setData({ form: Object.assign({}, EMPTY_FORM), editId: null });
      wx.pageScrollTo({ selector: '#addrForm', duration: 300 });
    },

    editAddr: function(e) {
      var addr = this.data.addresses[e.currentTarget.dataset.idx];
      if (!addr) return;
      this.setData({ form: { name: addr.name, phone: addr.phone, province: addr.province || '', city: addr.city || '', district: addr.district || '', address: addr.address, isDefault: addr.isDefault }, editId: addr.id });
      wx.pageScrollTo({ selector: '#addrForm', duration: 300 });
    },

    onInput: function(e) { var k = e.currentTarget.dataset.key, u = {}; u['form.' + k] = e.detail.value; this.setData(u); },
    onDefaultChange: function(e) { this.setData({ 'form.isDefault': e.detail.value }); },

    saveAddr: function() {
      if (this.data.saving) return;
      var f = this.data.form;
      if (!f.name.trim()) { wx.showToast({ title: '请填写收件人姓名', icon: 'none' }); return; }
      if (!/^1\d{10}$/.test(f.phone)) { wx.showToast({ title: '请填写正确手机号', icon: 'none' }); return; }
      if (!f.address.trim()) { wx.showToast({ title: '请填写详细地址', icon: 'none' }); return; }
      var self = this;
      self.setData({ saving: true });
      var id = this.data.editId;
      var p = id ? req('PUT', '/member/addresses/' + id, f) : req('POST', '/member/addresses', f);
      p.then(function() {
        self.setData({ saving: false, form: Object.assign({}, EMPTY_FORM), editId: null });
        wx.showToast({ title: '保存成功', icon: 'success' });
        self.loadAddresses();
      }).catch(function(e) { self.setData({ saving: false }); wx.showToast({ title: (e && e.message) || '保存失败', icon: 'none' }); });
    },

    cancelEdit: function() { this.setData({ form: Object.assign({}, EMPTY_FORM), editId: null }); },

    setDefault: function(e) {
      var self = this, id = e.currentTarget.dataset.id, idx = e.currentTarget.dataset.idx;
      req('PUT', '/member/addresses/' + id, Object.assign({}, this.data.addresses[idx], { isDefault: true })).then(function() {
        wx.showToast({ title: '已设为默认', icon: 'success' }); self.loadAddresses();
      });
    },

    delAddr: function(e) {
      var self = this, id = e.currentTarget.dataset.id;
      wx.showModal({ title: '确认删除', content: '确定删除该收货地址？', success: function(r) {
        if (!r.confirm) return;
        req('DELETE', '/member/addresses/' + id).then(function() { wx.showToast({ title: '已删除', icon: 'success' }); self.loadAddresses(); });
      }});
    },

    // 选择模式：选中地址后返回
    selectAddr: function(e) {
      if (!this._selectMode) return;
      var addr = this.data.addresses[e.currentTarget.dataset.idx];
      var pages = getCurrentPages();
      if (pages.length >= 2) {
        var prev = pages[pages.length - 2];
        if (prev && prev.onAddressSelected) prev.onAddressSelected(addr);
      }
      wx.navigateBack();
    },
  });
}();
