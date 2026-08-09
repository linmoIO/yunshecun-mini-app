!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  Page({
    data: { content: '', loading: true },
    onLoad() {
      wx.request({
        url: BASE + '/cms/privacy_policy',
        method: 'GET',
        success: (res) => {
          const data = res.data && res.data.code === 0 ? res.data.data : null;
          this.setData({ content: data && data.content ? data.content : '', loading: false });
        },
        fail: () => this.setData({ loading: false }),
      });
    },
  });
}();
