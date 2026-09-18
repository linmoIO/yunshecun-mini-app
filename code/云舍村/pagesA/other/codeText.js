!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  // 前端协议 code → 后台 CMS pageCode
  const CMS_CODE = {
    rule: 'user_agreement',
    PrivacyRule: 'privacy_policy',
    reservationProtocol: 'member_policy',
  };

  Page({
    data: { content: '', loading: true },

    onLoad: function(options) {
      const code = options.code || '';
      const title = options.title ? decodeURIComponent(options.title) : '';
      if (title) wx.setNavigationBarTitle({ title: title });
      wx.request({
        url: BASE + '/cms/' + (CMS_CODE[code] || code),
        method: 'GET',
        success: res => {
          const d = res.data;
          const content = d && d.code === 0 && d.data && d.data.content ? d.data.content : '';
          this.setData({ content: content, loading: false });
        },
        fail: () => this.setData({ loading: false }),
      });
    },
  });
}();
