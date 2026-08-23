!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function getToken() {
    try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; }
  }

  function post(url, data) {
    return new Promise(function(resolve, reject) {
      wx.request({
        url: BASE + url, method: 'POST', data: data,
        header: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' },
        success: function(res) {
          var d = res.data;
          if (d && d.code === 0) resolve(d);
          else reject(new Error((d && d.msg) || '提交失败'));
        },
        fail: function(e) { reject(new Error('网络错误')); }
      });
    });
  }

  Page({
    data: {
      title: '定制专属行程',
      intro: '',
      content: '',
      heroImage: '',
      submitting: false,
      form: { destinations: '', startDate: '', duration: '', persons: '', budget: '', requirements: '', name: '', phone: '' },
    },

    onLoad: function() {
      var publicBase = BASE.replace(/\/api\/?$/, '');
      this.setData({ heroImage: publicBase + '/uploads/images/云舍村-航拍全景.jpg' });
      // 预填用户信息
      try {
        var u = wx.getStorageSync('user');
        if (u && u.realName) this.setData({ 'form.name': u.realName });
        if (u && u.mobile) this.setData({ 'form.phone': u.mobile });
      } catch(e) {}
      // 加载后台自定义内容
      this.loadConfig();
    },

    loadConfig: function() {
      var self = this;
      wx.request({
        url: BASE + '/diy/config', method: 'GET',
        success: function(res) {
          var d = res.data;
          if (d && d.code === 0 && d.data) {
            self.setData({ title: d.data.title || '定制专属行程', content: d.data.content || '' });
          }
        }, fail: function() {}
      });
    },

    onInput: function(e) {
      var k = e.currentTarget.dataset.key, update = {};
      update['form.' + k] = e.detail.value;
      this.setData(update);
    },

    submit: function() {
      if (this.data.submitting) return;
      var f = this.data.form;
      if (!/^1\d{10}$/.test(f.phone)) { wx.showToast({ title: '请填写正确的手机号', icon: 'none' }); return; }
      if (!f.destinations && !f.requirements) { wx.showToast({ title: '请填写目的地或需求说明', icon: 'none' }); return; }

      this.setData({ submitting: true });
      var self = this;
      post('/diy/submit', f).then(function() {
        self.setData({ submitting: false });
        wx.showModal({
          title: '已收到定制需求',
          content: '感谢您的信任！我们的专属顾问将在1个工作日内联系您，为您量身定制专属行程。',
          confirmText: '好的', showCancel: false,
          success: function() { wx.navigateBack(); }
        });
      }).catch(function(e) {
        self.setData({ submitting: false });
        wx.showToast({ title: (e && e.message) || '提交失败', icon: 'none' });
      });
    },
  });
}();
