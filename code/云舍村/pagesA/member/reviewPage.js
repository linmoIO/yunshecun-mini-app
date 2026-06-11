!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function gt() { try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; } }

  Page({
    data: {
      orderNo: '', productId: '', productName: '',
      rating: 5, content: '', images: [],
      submitting: false,
      stars: [1, 2, 3, 4, 5],
      ratingLabels: { 1: '非常差', 2: '较差', 3: '一般', 4: '不错', 5: '非常好' },
    },

    onLoad: function(opts) {
      wx.setNavigationBarTitle({ title: '写评价' });
      this.setData({ orderNo: opts.orderNo || '', productId: opts.productId || '', productName: opts.productName || '商品' });
    },

    setStar: function(e) {
      this.setData({ rating: parseInt(e.currentTarget.dataset.star) });
    },

    onContentInput: function(e) { this.setData({ content: e.detail.value }); },

    addImage: function() {
      var self = this;
      var remain = 9 - this.data.images.length;
      if (remain <= 0) { wx.showToast({ title: '最多上传9张图片', icon: 'none' }); return; }
      wx.chooseMedia({
        count: remain, mediaType: ['image'], sizeType: ['compressed'],
        success: function(res) {
          wx.showLoading({ title: '上传中...' });
          var tasks = res.tempFiles.map(function(f) {
            return new Promise(function(resolve) {
              wx.uploadFile({
                url: BASE + '/admin/media/upload/image',
                filePath: f.tempFilePath,
                name: 'file',
                header: { 'Authorization': 'Bearer ' + gt() },
                success: function(r) {
                  try { var d = JSON.parse(r.data); resolve(d.data && d.data.url ? d.data.url : ''); } catch(e) { resolve(''); }
                },
                fail: function() { resolve(''); }
              });
            });
          });
          Promise.all(tasks).then(function(urls) {
            wx.hideLoading();
            var valid = urls.filter(Boolean);
            self.setData({ images: self.data.images.concat(valid) });
          });
        }
      });
    },

    removeImage: function(e) {
      var idx = e.currentTarget.dataset.idx;
      var imgs = this.data.images.slice();
      imgs.splice(idx, 1);
      this.setData({ images: imgs });
    },

    previewImg: function(e) {
      wx.previewImage({ current: e.currentTarget.dataset.src, urls: this.data.images });
    },

    submit: function() {
      if (this.data.submitting) return;
      if (!this.data.content.trim() && !this.data.images.length) {
        wx.showToast({ title: '请填写评价内容或上传图片', icon: 'none' }); return;
      }
      var self = this;
      self.setData({ submitting: true });
      wx.request({
        url: BASE + '/shop/reviews',
        method: 'POST',
        data: {
          productId: self.data.productId,
          orderNo: self.data.orderNo,
          rating: self.data.rating,
          content: self.data.content,
          images: self.data.images,
        },
        header: { 'Authorization': 'Bearer ' + gt(), 'Content-Type': 'application/json' },
        success: function(res) {
          self.setData({ submitting: false });
          var d = res.data;
          if (d && d.code === 0) {
            wx.showModal({ title: '评价成功', content: '感谢您的评价！', confirmText: '好的', showCancel: false,
              success: function() { wx.navigateBack(); }
            });
          } else { wx.showToast({ title: (d && d.msg) || '提交失败', icon: 'none' }); }
        },
        fail: function() { self.setData({ submitting: false }); wx.showToast({ title: '网络错误', icon: 'none' }); }
      });
    },
  });
}();
