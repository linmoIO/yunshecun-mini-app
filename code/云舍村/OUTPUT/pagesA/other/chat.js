!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  function getToken() {
    try {
      const u = wx.getStorageSync('user');
      return (u && u.memberToken) ? u.memberToken : '';
    } catch(e) { return ''; }
  }

  function getUserAvatar() {
    try {
      const u = wx.getStorageSync('user');
      return (u && u.avatar) ? u.avatar : '/static/images/default_avatar.png';
    } catch(e) { return '/static/images/default_avatar.png'; }
  }

  function formatTime(dateStr) {
    const d = new Date(dateStr);
    const h = d.getHours().toString().padStart(2,'0');
    const m = d.getMinutes().toString().padStart(2,'0');
    const mo = d.getMonth() + 1;
    const day = d.getDate();
    return mo + '月' + day + '日 ' + h + ':' + m;
  }

  function request(method, url, data) {
    return new Promise(function(resolve, reject) {
      wx.request({
        url: BASE + url,
        method: method,
        data: data,
        header: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' },
        success: function(res) {
          if (res.data && res.data.code === 0) { resolve(res.data.data); }
          else { reject(new Error((res.data && res.data.msg) || '请求失败')); }
        },
        fail: function(err) { reject(err); }
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
    _lastCount: 0,

    onLoad: function() {
      this.setData({ userAvatar: getUserAvatar() });
      this._loadMessages();
    },

    onShow: function() {
      this._startPoll();
    },

    onHide: function() {
      this._stopPoll();
    },

    onUnload: function() {
      this._stopPoll();
    },

    _startPoll: function() {
      const self = this;
      this._stopPoll();
      this._pollTimer = setInterval(function() { self._loadMessages(true); }, 3000);
    },

    _stopPoll: function() {
      if (this._pollTimer) { clearInterval(this._pollTimer); this._pollTimer = null; }
    },

    _loadMessages: function(silent) {
      const self = this;
      if (!getToken()) {
        wx.showToast({ title: '请先登录', icon: 'none' });
        setTimeout(function() { wx.navigateBack(); }, 1500);
        return;
      }
      request('GET', '/chat/messages', {}).then(function(d) {
        const rawList = (d && d.list) ? d.list : [];
        if (rawList.length === self._lastCount && silent) return;
        self._lastCount = rawList.length;
        let prevTime = null;
        const msgs = rawList.map(function(m) {
          const ts = new Date(m.createdAt).getTime();
          const showTime = !prevTime || (ts - prevTime > 5 * 60 * 1000);
          if (showTime) prevTime = ts;
          return {
            id: m.id,
            content: m.content,
            fromAdmin: m.fromAdmin,
            showTime: showTime,
            timeLabel: showTime ? formatTime(m.createdAt) : '',
          };
        });
        self.setData({ messages: msgs, scrollTo: 'msgEnd', conversationId: (d && d.conversationId) || null }, function() {
          self.setData({ scrollTo: 'msgEnd' });
        });
      }).catch(function() {});
    },

    onInput: function(e) {
      this.setData({ inputVal: e.detail.value });
    },

    sendMsg: function() {
      const content = this.data.inputVal.trim();
      if (!content) return;
      if (!getToken()) { wx.showToast({ title: '请先登录', icon: 'none' }); return; }
      const self = this;
      this.setData({ inputVal: '' });
      request('POST', '/chat/send', { content: content }).then(function() {
        self._loadMessages(false);
      }).catch(function(err) {
        wx.showToast({ title: (err && err.message) || '发送失败', icon: 'none' });
        self.setData({ inputVal: content });
      });
    },
  });
}();
