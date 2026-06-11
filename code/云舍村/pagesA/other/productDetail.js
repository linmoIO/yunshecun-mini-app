!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function request(method, url, data) {
    return new Promise(function(resolve, reject) {
      var token = '';
      try { var u = wx.getStorageSync('user'); token = (u && u.memberToken) ? u.memberToken : ''; } catch(e) {}
      wx.request({
        url: BASE + url, method: method, data: data || {},
        header: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        success: function(res) {
          var d = res.data;
          if (d && d.code === 0) resolve(d.data);
          else reject(new Error((d && d.msg) || '请求失败'));
        },
        fail: function(e) { reject(e); }
      });
    });
  }

  Page({
    data: { product: null, images: [], qty: 1, total: 0, loading: true, reviews: [], reviewTotal: 0, avgRating: 0 },

    onLoad: function(opts) {
      this._id = opts.id;
      this.loadProduct();
      this.loadReviews();
    },

    loadProduct: function() {
      var self = this;
      request('GET', '/shop/products/' + this._id).then(function(p) {
        var imgs = [];
        if (p.coverImage) imgs.push(p.coverImage);
        if (p.images && Array.isArray(p.images)) { p.images.forEach(function(i) { if (i && imgs.indexOf(i) < 0) imgs.push(i); }); }
        if (!imgs.length) imgs = [''];
        self.setData({ product: p, images: imgs, total: p.price, loading: false });
        wx.setNavigationBarTitle({ title: p.name || '商品详情' });
      }).catch(function(e) {
        self.setData({ loading: false });
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
    },

    loadReviews: function() {
      var self = this;
      wx.request({
        url: BASE + '/shop/products/' + self._id + '/reviews?pageNum=1&pageSize=5',
        method: 'GET',
        success: function(res) {
          var d = res.data;
          if (d && d.code === 0 && d.data) {
            var reviews = (d.data.list || []).map(function(r) {
              return Object.assign({}, r, { firstChar: (r.nickname || '匿').charAt(0) });
            });
            self.setData({ reviews: reviews, reviewTotal: d.data.total || 0, avgRating: d.data.avgRating || 0 });
          }
        }
      });
    },

    previewReviewImg: function(e) {
      var urls = e.currentTarget.dataset.urls;
      var current = e.currentTarget.dataset.src;
      wx.previewImage({ current: current, urls: urls });
    },

    decQty: function() {
      var q = Math.max(1, this.data.qty - 1);
      this.setData({ qty: q, total: (this.data.product.price * q).toFixed(2) * 1 });
    },

    incQty: function() {
      var p = this.data.product;
      var maxQ = (p.stock != null && p.stock > 0) ? p.stock : 99;
      var q = Math.min(maxQ, this.data.qty + 1);
      this.setData({ qty: q, total: (p.price * q).toFixed(2) * 1 });
    },

    previewImg: function(e) {
      wx.previewImage({ current: e.currentTarget.dataset.src, urls: this.data.images });
    },

    goBuy: function() {
      var p = this.data.product;
      if (p.stock === 0) { wx.showToast({ title: '该商品已售罄', icon: 'none' }); return; }
      var u = null;
      try { u = wx.getStorageSync('user'); } catch(e) {}
      if (!u || !u.memberId) { wx.navigateTo({ url: '/pages/member/memberLogin' }); return; }
      // 跳转到订单填写页
      wx.navigateTo({ url: '/pagesA/other/shopOrder?id=' + this._id + '&qty=' + this.data.qty + '&price=' + this.data.total });
    },
  });
}();
