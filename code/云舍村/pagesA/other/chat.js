!function() {
  'use strict';

  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function getUser() {
    try { return wx.getStorageSync('user') || {}; } catch(e) { return {}; }
  }

  function getToken() {
    const user = getUser();
    return user.memberToken || user.token || '';
  }

  function getUserAvatar() {
    const user = getUser();
    return user.avatar || user.headImgUrl || '/static/images/default_avatar.png';
  }

  function formatTime(dateStr) {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return '';
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    return (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + h + ':' + m;
  }

  function request(method, url, data) {
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
          const body = res.data || {};
          if (body.code === 0 || body.success === true) return resolve(body.data || body.retVal || {});
          reject(new Error(body.msg || body.message || '请求失败'));
        },
        fail: reject,
      });
    });
  }

  Page({
    data: {
      messages: [],
      inputVal: '',
      loading: false,
      scrollTo: 'msgEnd',
      userAvatar: '',
      conversationId: null,
    },

    _pollTimer: null,
    _lastCount: -1,

    onLoad: function() {
      wx.setNavigationBarTitle({ title: '在线客服' });
      this.setData({ userAvatar: getUserAvatar() });
      this._loadMessages(false);
    },

    onShow: function() { this._startPoll(); },
    onHide: function() { this._stopPoll(); },
    onUnload: function() { this._stopPoll(); },

    _ensureLogin: function() {
      if (getToken()) return true;
      wx.showToast({ title: '请先登录后联系客服', icon: 'none' });
      setTimeout(function() {
        wx.navigateTo({ url: '/pages/login/login', fail: function() { wx.navigateBack(); } });
      }, 800);
      return false;
    },

    _startPoll: function() {
      const self = this;
      this._stopPoll();
      this._pollTimer = setInterval(function() { self._loadMessages(true); }, 3000);
    },

    _stopPoll: function() {
      if (this._pollTimer) {
        clearInterval(this._pollTimer);
        this._pollTimer = null;
      }
    },

    _loadMessages: function(silent) {
      if (!this._ensureLogin()) return;
      const self = this;
      if (!silent) this.setData({ loading: true });
      request('GET', '/chat/messages').then(function(d) {
        const rawList = Array.isArray(d.list) ? d.list : [];
        if (silent && rawList.length === self._lastCount) return;
        self._lastCount = rawList.length;

        let prevTime = null;
        const messages = rawList.map(function(m) {
          const ts = new Date(m.createdAt).getTime();
          const showTime = !prevTime || (ts - prevTime > 5 * 60 * 1000);
          if (showTime) prevTime = ts;
          return {
            id: m.id,
            content: m.content || '',
            fromAdmin: !!m.fromAdmin,
            showTime: showTime,
            timeLabel: showTime ? formatTime(m.createdAt) : '',
          };
        });

        self.setData({
          messages: messages,
          loading: false,
          conversationId: d.conversationId || null,
          scrollTo: 'msgEnd',
        }, function() {
          self.setData({ scrollTo: 'msgEnd' });
        });
      }).catch(function(err) {
        self.setData({ loading: false });
        if (!silent) wx.showToast({ title: err.message || '客服消息加载失败', icon: 'none' });
      });
    },

    onInput: function(e) {
      this.setData({ inputVal: e.detail.value || '' });
    },

    sendMsg: function() {
      if (!this._ensureLogin()) return;
      const content = String(this.data.inputVal || '').trim();
      if (!content) return;

      const self = this;
      this.setData({ inputVal: '' });
      request('POST', '/chat/send', { content: content }).then(function() {
        self._loadMessages(false);
      }).catch(function(err) {
        wx.showToast({ title: err.message || '发送失败，请稍后重试', icon: 'none' });
        self.setData({ inputVal: content });
      });
    },
  });
}();
