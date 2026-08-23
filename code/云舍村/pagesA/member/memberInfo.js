!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function gt() { try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; } }
  function getUser() { try { return wx.getStorageSync('user') || {}; } catch(e) { return {}; } }
  function setUser(u) { try { wx.setStorageSync('user', u); } catch(e) {} }

  function api(method, url, data) {
    return new Promise(function(resolve, reject) {
      wx.request({ url: BASE + url, method: method, data: data || {},
        header: { 'Authorization': 'Bearer ' + gt(), 'Content-Type': 'application/json' },
        success: function(r) { var d = r.data; if (d && d.code === 0) resolve(d.data); else reject(new Error((d && d.msg) || '请求失败')); },
        fail: function() { reject(new Error('网络错误')); }
      });
    });
  }

  Page({
    data: {
      info: {}, bindingPhone: false,
      phoneForm: { phone: '', code: '' }, sendingCode: false, countdown: 0,
    },

    onLoad: function() {
      wx.setNavigationBarTitle({ title: '个人信息' });
      this.loadInfo();
    },

    loadInfo: function() {
      var self = this;
      api('GET', '/member/memberInfo.json').then(function(d) {
        var u = getUser();
        var info = Object.assign({}, u, d || {});
        info.phone = info.phone || info.mobile || '';
        info.mobile = info.mobile || info.phone || '';
        self.setData({ info: info });
        setUser(Object.assign({}, u, info));
      }).catch(function() { self.setData({ info: getUser() }); });
    },

    changeAvatar: function() {
      var self = this;
      wx.chooseMedia({ count: 1, mediaType: ['image'], sizeType: ['compressed'], success: function(res) {
        wx.showLoading({ title: '上传中...' });
        wx.uploadFile({
          url: BASE + '/admin/media/upload/image', filePath: res.tempFiles[0].tempFilePath,
          name: 'file', header: { 'Authorization': 'Bearer ' + gt() },
          success: function(r) {
            wx.hideLoading();
            try {
              var d = JSON.parse(r.data);
              if (d && d.data && d.data.url) {
                var avatarUrl = d.data.url;
                self.setData({ 'info.avatar': avatarUrl, 'info.headPortraitUrl': avatarUrl });
                api('POST', '/member/updateMemberBaseInfo.json', { headPortraitUrl: avatarUrl }).then(function() {
                  var u = getUser(); u.avatar = avatarUrl; u.headPortraitUrl = avatarUrl; setUser(u);
                  wx.showToast({ title: '头像已更新', icon: 'success' });
                }).catch(function() {});
              }
            } catch(e) { wx.showToast({ title: '上传失败', icon: 'none' }); }
          },
          fail: function() { wx.hideLoading(); wx.showToast({ title: '上传失败', icon: 'none' }); }
        });
      }});
    },

    editNickname: function() {
      var self = this;
      wx.showModal({ title: '修改昵称', editable: true, placeholderText: '昵称（2-20字）',
        success: function(r) {
          if (!r.confirm) return;
          var nick = (r.content || '').trim();
          if (nick.length < 2 || nick.length > 20) { wx.showToast({ title: '昵称2-20字符', icon: 'none' }); return; }
          api('POST', '/member/updateMemberBaseInfo.json', { nickname: nick }).then(function() {
            self.setData({ 'info.nickname': nick });
            var u = getUser(); u.nickname = nick; setUser(u);
            wx.showToast({ title: '昵称已更新', icon: 'success' });
          }).catch(function(e) { wx.showToast({ title: e.message, icon: 'none' }); });
        }
      });
    },

    onBirthdayChange: function(e) {
      var val = e.detail.value;
      this.setData({ 'info.birthday': val });
      api('POST', '/member/updateMemberBaseInfo.json', { birthday: val }).catch(function() {});
    },

    selectGender: function(e) {
      var g = parseInt(e.currentTarget.dataset.val);
      this.setData({ 'info.gender': g });
      api('POST', '/member/updateMemberBaseInfo.json', { gender: g }).catch(function() {});
    },

    showPhoneBind: function() { this.setData({ bindingPhone: true }); },
    cancelBind: function() { this.setData({ bindingPhone: false, phoneForm: { phone: '', code: '' }, countdown: 0 }); },
    onPhoneInput: function(e) { this.setData({ 'phoneForm.phone': e.detail.value }); },
    onCodeInput: function(e) { this.setData({ 'phoneForm.code': e.detail.value }); },

    sendCode: function() {
      var self = this;
      if (self.data.sendingCode || self.data.countdown > 0) return;
      var phone = self.data.phoneForm.phone;
      if (!/^1\d{10}$/.test(phone)) { wx.showToast({ title: '请输入正确手机号', icon: 'none' }); return; }
      self.setData({ sendingCode: true });
      wx.request({
        url: BASE + '/member/createIdentifyCode.json?mobile=' + phone, method: 'GET',
        header: { 'Authorization': 'Bearer ' + gt() },
        success: function() {
          self.setData({ sendingCode: false, countdown: 60 });
          var t = setInterval(function() { var c = self.data.countdown - 1; self.setData({ countdown: c }); if (c <= 0) clearInterval(t); }, 1000);
        },
        fail: function() { self.setData({ sendingCode: false }); wx.showToast({ title: '发送失败', icon: 'none' }); }
      });
    },

    bindPhone: function() {
      var self = this;
      var phone = self.data.phoneForm.phone, code = self.data.phoneForm.code;
      if (!/^1\d{10}$/.test(phone)) { wx.showToast({ title: '请输入正确手机号', icon: 'none' }); return; }
      if (!code) { wx.showToast({ title: '请输入验证码', icon: 'none' }); return; }
      wx.request({
        url: BASE + '/member/bind-phone', method: 'POST',
        data: { phone: phone, code: code },
        header: { 'Authorization': 'Bearer ' + gt(), 'Content-Type': 'application/json' },
        success: function(r) {
          var d = r.data;
          if (d && d.code === 0) {
            self.setData({ 'info.phone': phone, 'info.mobile': phone, bindingPhone: false });
            var u = getUser(); u.phone = phone; u.mobile = phone; setUser(u);
            wx.showToast({ title: '绑定成功', icon: 'success' });
          } else { wx.showToast({ title: (d && d.msg) || '绑定失败', icon: 'none' }); }
        },
        fail: function() { wx.showToast({ title: '网络错误', icon: 'none' }); }
      });
    },
  });
}();
