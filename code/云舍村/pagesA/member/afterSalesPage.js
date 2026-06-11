!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function gt() { try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; } }

  Page({
    data: {
      orderNo: '',
      reasons: ['退款退货（7天无理由）', '商品质量问题', '商品与描述不符', '未收到商品', '其他问题'],
      selectedReason: -1,
      detail: '',
      submitting: false,
    },

    onLoad: function(opts) {
      this.setData({ orderNo: opts.orderNo || '' });
      wx.setNavigationBarTitle({ title: '申请售后' });
    },

    selectReason: function(e) {
      this.setData({ selectedReason: parseInt(e.currentTarget.dataset.idx) });
    },

    onDetailInput: function(e) { this.setData({ detail: e.detail.value }); },

    submit: function() {
      if (this.data.submitting) return;
      if (this.data.selectedReason < 0) { wx.showToast({ title: '请选择售后原因', icon: 'none' }); return; }
      var reason = this.data.reasons[this.data.selectedReason];
      var self = this;
      self.setData({ submitting: true });
      wx.request({
        url: BASE + '/shop/after-sales',
        method: 'POST',
        data: { orderNo: self.data.orderNo, reason: reason, detail: self.data.detail },
        header: { 'Authorization': 'Bearer ' + gt(), 'Content-Type': 'application/json' },
        success: function(res) {
          self.setData({ submitting: false });
          var d = res.data;
          if (d && d.code === 0) {
            wx.showModal({
              title: '申请已提交', confirmText: '好的', showCancel: false,
              content: '售后申请已提交，客服将在1-3个工作日内处理。\n原因：' + reason,
              success: function() { wx.navigateBack(); }
            });
          } else {
            wx.showModal({ title: '提交失败', content: (d && d.msg) || '请稍后重试或联系客服', confirmText: '联系客服', cancelText: '返回',
              success: function(r) { if (r.confirm) wx.navigateTo({ url: '/pagesA/other/chat' }); else wx.navigateBack(); }
            });
          }
        },
        fail: function() {
          self.setData({ submitting: false });
          wx.showModal({ title: '网络错误', content: '请检查网络后重试，或联系在线客服。', confirmText: '联系客服', cancelText: '返回',
            success: function(r) { if (r.confirm) wx.navigateTo({ url: '/pagesA/other/chat' }); else wx.navigateBack(); }
          });
        }
      });
    },
  });
}();
