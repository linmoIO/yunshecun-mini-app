!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  Page({
    data: { content: '', loading: true },
    onLoad() {
      wx.setNavigationBarTitle({ title: '会员政策' });
      wx.request({
        url: BASE + '/cms/member_policy',
        method: 'GET',
        success: res => {
          var d = res.data;
          var content = (d && d.code === 0 && d.data && d.data.content) ? d.data.content : '';
          this.setData({ content: content, loading: false });
        },
        fail: () => this.setData({ loading: false })
      });
    }
  });
}();
