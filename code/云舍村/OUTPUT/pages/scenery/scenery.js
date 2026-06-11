!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function req(method, url) {
    return new Promise(function(resolve, reject) {
      wx.request({
        url: BASE + url, method: method,
        header: { 'Content-Type': 'application/json' },
        success: function(res) { resolve(res.data || {}); },
        fail: function(e) { reject(e); }
      });
    });
  }

  Page({
    data: {
      banners: [],
      categories: [],
      activeCategory: '',
      products: [],
      loading: false,
      hasMore: true,
      pageNum: 1,
      pageSize: 20,
      scrollH: 600,
    },

    // uni-app 子组件事件代理（bottomNav 等 vue 组件需要）
    __l: function() {},

    onLoad: function() {
      var self = this;
      // bottomNav.js 第36行会读 getCurrentPages()[last].$page.fullPath
      // 本页是 plain Page()，没有 uni-app 注入的 $page，需手动补全
      try {
        var pages = getCurrentPages();
        var cur = pages[pages.length - 1];
        if (cur && !cur.$page) {
          cur.$page = { fullPath: '/pages/scenery/scenery' };
        }
      } catch(e) {}

      wx.getSystemInfo({
        success: function(info) {
          var navH = 49;
          self.setData({ scrollH: info.windowHeight - navH });
        }
      });
      this.loadBanners();
      this.loadProducts(true);
    },

    onShow: function() {
      // 每次进入页面刷新底部导航高亮
    },

    onPullDownRefresh: function() {
      this.loadProducts(true, function() { wx.stopPullDownRefresh(); });
    },

    loadBanners: function() {
      var self = this;
      req('GET', '/banners/public?limit=3').then(function(d) {
        var list = (d && d.data && d.data.list) ? d.data.list : [];
        list = list.filter(function(b) { return b.imageUrl; }).slice(0, 3);
        self.setData({ banners: list });
      }).catch(function() {});
    },

    loadProducts: function(reset, cb) {
      if (this.data.loading) return;
      var pageNum = reset ? 1 : this.data.pageNum;
      var cat = this.data.activeCategory;
      var self = this;
      this.setData({ loading: true });
      var url = '/shop/products?pageNum=' + pageNum + '&pageSize=' + self.data.pageSize + (cat ? '&category=' + cat : '');
      req('GET', url).then(function(d) {
        var list = (d && d.data && d.data.list) ? d.data.list : [];
        var total = (d && d.data && d.data.total) ? d.data.total : list.length;
        var newList = reset ? list : self.data.products.concat(list);
        self.setData({ products: newList, loading: false, pageNum: pageNum + 1, hasMore: newList.length < total });
        if (cb) cb();
      }).catch(function() {
        self.setData({ loading: false });
        if (cb) cb();
      });
    },

    loadMore: function() {
      if (!this.data.hasMore || this.data.loading) return;
      this.loadProducts(false);
    },

    onCatTap: function(e) {
      var id = e.currentTarget.dataset.id;
      if (id === this.data.activeCategory) return;
      this.setData({ activeCategory: id });
      this.loadProducts(true);
    },

    onBannerTap: function(e) {
      var url = e.currentTarget.dataset.url;
      if (url) wx.navigateTo({ url: url, fail: function() { wx.reLaunch({ url: url }); } });
    },

    goDetail: function(e) {
      wx.navigateTo({ url: '/pagesA/other/productDetail?id=' + e.currentTarget.dataset.id });
    },

    onShareAppMessage: function() {
      return { title: '云舍村风物好物', path: '/pages/scenery/scenery' };
    },
  });
}();
