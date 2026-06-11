!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function gt() { try { var u = wx.getStorageSync('user'); return (u && u.memberToken) ? u.memberToken : ''; } catch(e) { return ''; } }

  Page({
    data: {
      agreeTerms: false,
      loginMode: 'wechat', // 'wechat' | 'phone'
      phone: '', code: '', codeCountdown: 0,
      captchaId: '', captchaImage: '', captchaCode: '',
      showCaptchaModal: false,
      loading: false,
    },

    onLoad: function() {
      wx.setNavigationBarTitle({ title: '登录' });
    },

    // 一键登录
    wechatLogin: function() {
      if (!this.data.agreeTerms) { wx.showToast({ title: '请先勾选同意协议', icon: 'none' }); return; }
      var self = this;
      self.setData({ loading: true });
      wx.login({
        success: function(res) {
          if (!res.code) { wx.showToast({ title: '获取登录凭证失败', icon: 'none' }); self.setData({ loading: false }); return; }
          // 获取用户信息（不需要用户授权，只获取基础信息）
          wx.getUserInfo({
            withCredentials: true,
            success: function(userRes) {
              var openid = '', sessionKey = '';
              // 实际的 openid 需要通过后端 code 换取，这里做演示
              wx.request({
                url: BASE + '/microSoftWare/getOpenidSessionKeyV2.json',
                method: 'POST',
                data: { code: res.code },
                header: { 'Content-Type': 'application/json' },
                success: function(wxRes) {
                  var d = wxRes.data;
                  if (d && d.code === 0 && d.data && d.data.memberToken) {
                    // 登录成功
                    var memberData = d.data;
                    var user = {
                      memberId: memberData.memberId,
                      memberToken: memberData.memberToken,
                      openId: memberData.openId,
                      nickname: userRes.userInfo.nickName || '云舍村家人',
                      avatar: userRes.userInfo.avatarUrl || '',
                      cardLevel: '普通会员',
                      cardListDto: [], points: 0, mobile: '', phone: '',
                    };
                    try { wx.setStorageSync('user', user); } catch(e) {}
                    wx.showToast({ title: '登录成功', icon: 'success' });
                    setTimeout(function() { wx.reLaunch({ url: '/pages/user/index' }); }, 500);
                  } else {
                    wx.showToast({ title: (d && d.msg) || '登录失败', icon: 'none' });
                    self.setData({ loading: false });
                  }
                },
                fail: function() {
                  wx.showToast({ title: '网络错误', icon: 'none' });
                  self.setData({ loading: false });
                }
              });
            },
            fail: function() {
              // 用户拒绝授权，提示切换到手机号登录
              wx.showModal({
                title: '获取用户信息失败', content: '需要授权用户信息才能一键登录，请切换为手机号登录或重新授权',
                confirmText: '切换为手机号登录', success: function(r) {
                  if (r.confirm) self.setData({ loginMode: 'phone', loading: false });
                  else self.setData({ loading: false });
                }
              });
            }
          });
        },
        fail: function() { wx.showToast({ title: '微信登录失败', icon: 'none' }); self.setData({ loading: false }); }
      });
    },

    // 获取图形验证码
    getCaptcha: function() {
      var self = this;
      wx.request({
        url: BASE + '/member/getCaptcha',
        method: 'GET',
        success: function(res) {
          var d = res.data;
          if (d && d.code === 0 && d.data) {
            self.setData({ captchaId: d.data.captchaId, captchaImage: d.data.image, captchaCode: '', showCaptchaModal: true });
          } else { wx.showToast({ title: '获取验证码失败', icon: 'none' }); }
        },
        fail: function() { wx.showToast({ title: '网络错误', icon: 'none' }); }
      });
    },

    // 关闭验证码弹层
    closeCaptchaModal: function() { this.setData({ showCaptchaModal: false }); },

    // 发送短信验证码
    sendCode: function() {
      var self = this;
      if (!self.data.phone) { wx.showToast({ title: '请输入手机号', icon: 'none' }); return; }
      if (!/^1\d{10}$/.test(self.data.phone)) { wx.showToast({ title: '请输入正确手机号', icon: 'none' }); return; }
      if (!self.data.captchaId || !self.data.captchaCode) { wx.showToast({ title: '请先输入并验证图形验证码', icon: 'none' }); return; }

      self.setData({ loading: true });
      wx.request({
        url: BASE + '/member/createIdentifyCode.json?mobile=' + self.data.phone + '&captchaId=' + self.data.captchaId + '&captchaCode=' + self.data.captchaCode,
        method: 'GET',
        success: function(res) {
          self.setData({ loading: false, showCaptchaModal: false });
          var d = res.data;
          if (d && d.code === 0) {
            wx.showToast({ title: '验证码已发送', icon: 'success' });
            self.setData({ codeCountdown: 60 });
            var timer = setInterval(function() {
              var c = self.data.codeCountdown - 1;
              self.setData({ codeCountdown: c });
              if (c <= 0) clearInterval(timer);
            }, 1000);
          } else { wx.showToast({ title: (d && d.msg) || '发送失败', icon: 'none' }); }
        },
        fail: function() { self.setData({ loading: false }); wx.showToast({ title: '网络错误', icon: 'none' }); }
      });
    },

    // 手机号登录
    phoneLogin: function() {
      if (!this.data.agreeTerms) { wx.showToast({ title: '请先勾选同意协议', icon: 'none' }); return; }
      var self = this;
      if (!self.data.phone || !/^1\d{10}$/.test(self.data.phone)) { wx.showToast({ title: '请输入正确手机号', icon: 'none' }); return; }
      if (!self.data.code) { wx.showToast({ title: '请输入验证码', icon: 'none' }); return; }

      self.setData({ loading: true });
      wx.request({
        url: BASE + '/member/memberLoginByMobileCode.json',
        method: 'POST',
        data: { mobile: self.data.phone, verifyCode: self.data.code },
        header: { 'Content-Type': 'application/json' },
        success: function(res) {
          self.setData({ loading: false });
          var d = res.data;
          if (d && d.code === 0 && d.data && d.data.memberToken) {
            var memberData = d.data;
            var user = {
              memberId: memberData.memberId || memberData.userId,
              memberToken: memberData.memberToken,
              phone: self.data.phone,
              mobile: self.data.phone,
              nickname: memberData.nickname || '云舍村用户',
              avatar: memberData.avatar || '',
              cardLevel: memberData.cardLevel || '普通会员',
              cardListDto: [], points: memberData.points || 0, openId: memberData.openId || '',
            };
            try { wx.setStorageSync('user', user); } catch(e) {}
            wx.showToast({ title: '登录成功', icon: 'success' });
            setTimeout(function() { wx.reLaunch({ url: '/pages/user/index' }); }, 500);
          } else {
            wx.showToast({ title: (d && d.msg) || '登录失败，请检查验证码是否正确', icon: 'none' });
          }
        },
        fail: function() { self.setData({ loading: false }); wx.showToast({ title: '网络错误', icon: 'none' }); }
      });
    },

    // 切换登录模式
    switchLoginMode: function(e) {
      var mode = e.currentTarget.dataset.mode;
      this.setData({ loginMode: mode, phone: '', code: '', captchaCode: '', captchaId: '', codeCountdown: 0, showCaptchaModal: false });
    },

    // 输入框绑定
    onPhoneInput: function(e) { this.setData({ phone: e.detail.value }); },
    onCodeInput: function(e) { this.setData({ code: e.detail.value }); },
    onCaptchaInput: function(e) { this.setData({ captchaCode: e.detail.value }); },
    toggleAgree: function() { this.setData({ agreeTerms: !this.data.agreeTerms }); },
  });
}();
