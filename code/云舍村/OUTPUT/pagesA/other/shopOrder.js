!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';
  const IS_DEV = BASE.indexOf('localhost') >= 0 || BASE.indexOf('127.0.0.1') >= 0;

  function getToken() {
    try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; }
  }

  function request(method, url, data) {
    return new Promise(function(resolve, reject) {
      wx.request({
        url: BASE + url, method: method, data: data || {},
        header: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' },
        success: function(res) {
          var d = res.data;
          if (d && d.code === 0) resolve(d.data);
          else reject(new Error((d && d.msg) || '请求失败'));
        },
        fail: function(e) { reject(new Error('网络错误')); }
      });
    });
  }

  // 调用模拟支付（开发环境）
  function mockPay(mockPayUrl) {
    return new Promise(function(resolve) {
      wx.request({
        url: 'http://localhost:3000' + mockPayUrl, method: 'GET',
        success: function() { resolve(); },
        fail: function() { resolve(); }
      });
    });
  }

  Page({
    data: {
      productId: '', productName: '', qty: 1, price: 0,
      submitting: false, paying: false,
      selectedAddr: null,
      form: { contactName: '', contactPhone: '', province: '', city: '', address: '', notes: '' },
    },

    onLoad: function(opts) {
      this.setData({ productId: opts.id || '', qty: parseInt(opts.qty) || 1, price: parseFloat(opts.price) || 0 });
      try {
        var u = wx.getStorageSync('user');
        if (u && u.realName) this.setData({ 'form.contactName': u.realName });
        if (u && u.mobile) this.setData({ 'form.contactPhone': u.mobile });
      } catch(e) {}
      var self = this;
      wx.request({
        url: BASE + '/shop/products/' + opts.id, method: 'GET',
        header: { 'Authorization': 'Bearer ' + getToken() },
        success: function(res) {
          if (res.data && res.data.code === 0 && res.data.data) self.setData({ productName: res.data.data.name || '' });
        }, fail: function() {}
      });
    },

    onInput: function(e) {
      var key = e.currentTarget.dataset.key;
      var update = {}; update['form.' + key] = e.detail.value;
      this.setData(update);
    },

    submit: function() {
      if (this.data.submitting || this.data.paying) return;
      var f = this.data.form;
      if (!f.contactName.trim()) { wx.showToast({ title: '请填写收件人姓名', icon: 'none' }); return; }
      if (!/^1\d{10}$/.test(f.contactPhone)) { wx.showToast({ title: '请填写正确的手机号', icon: 'none' }); return; }
      if (!f.address.trim()) { wx.showToast({ title: '请填写详细地址', icon: 'none' }); return; }

      var self = this;
      this.setData({ submitting: true });
      wx.showLoading({ title: '提交中...' });

      // 第一步：创建订单
      request('POST', '/shop/order', {
        productId: self.data.productId, quantity: self.data.qty,
        contactName: f.contactName, contactPhone: f.contactPhone,
        province: f.province, city: f.city, address: f.address, notes: f.notes,
      }).then(function(orderData) {
        self.setData({ submitting: false });
        wx.hideLoading();
        self._orderData = orderData;
        // 第二步：发起支付
        self._doPay(orderData);
      }).catch(function(e) {
        self.setData({ submitting: false });
        wx.hideLoading();
        wx.showToast({ title: (e && e.message) || '提交失败', icon: 'none', duration: 3000 });
      });
    },

    _doPay: function(orderData) {
      var self = this;
      self.setData({ paying: true });
      wx.showLoading({ title: '拉起支付...' });

      // 调后端创建支付单
      request('POST', '/shop/pay.json', { orderNo: orderData.orderNo, payMethod: 'wechat' })
        .then(function(payData) {
          wx.hideLoading();
          var params = payData.payParams || {};

          // 调起微信支付
          wx.requestPayment({
            timeStamp: params.timeStamp || String(Math.floor(Date.now() / 1000)),
            nonceStr: params.nonceStr || '',
            package: params.package || '',
            signType: params.signType || 'RSA',
            paySign: params.paySign || '',
            success: function() {
              self.setData({ paying: false });
              self._showSuccess(orderData.orderNo, orderData.totalAmount);
            },
            fail: function(err) {
              self.setData({ paying: false });
              // 开发环境：自动走模拟支付
              if (IS_DEV && payData.mockPayUrl) {
                mockPay(payData.mockPayUrl).then(function() {
                  self._showSuccess(orderData.orderNo, orderData.totalAmount);
                });
              } else if (err && err.errMsg && err.errMsg.indexOf('cancel') >= 0) {
                wx.showToast({ title: '已取消支付', icon: 'none' });
              } else {
                wx.showModal({
                  title: '支付提示',
                  content: '微信支付暂未配置，订单已保存。\n订单号：' + orderData.orderNo,
                  confirmText: '好的', showCancel: false,
                  success: function() { self._navBack(); }
                });
              }
            }
          });
        })
        .catch(function() {
          self.setData({ paying: false });
          wx.hideLoading();
          wx.showToast({ title: '支付发起失败，请重试', icon: 'none' });
        });
    },

    _showSuccess: function(orderNo, amount) {
      var self = this;
      wx.showModal({
        title: '支付成功 🎉',
        content: '订单号：' + orderNo + '\n金额：¥' + amount + '\n我们将尽快发货，请留意快递通知！',
        confirmText: '好的', showCancel: false,
        success: function() { self._navBack(); }
      });
    },

    // 选择收货地址
    chooseAddress: function() {
      wx.navigateTo({ url: '/pagesA/member/address?select=1' });
    },
    // 被 address.js 回调
    onAddressSelected: function(addr) {
      this.setData({
        selectedAddr: addr,
        'form.contactName': addr.name,
        'form.contactPhone': addr.phone,
        'form.province': addr.province || '',
        'form.city': addr.city || '',
        'form.address': [addr.district, addr.address].filter(Boolean).join(' '),
      });
    },

    goMyOrders: function() {
      wx.navigateTo({ url: '/pagesA/other/myShopOrders' });
    },

    _navBack: function() {
      var pages = getCurrentPages();
      if (pages.length >= 2) wx.navigateBack({ delta: 2 });
      else wx.reLaunch({ url: '/pages/scenery/scenery' });
    },
  });
}();
