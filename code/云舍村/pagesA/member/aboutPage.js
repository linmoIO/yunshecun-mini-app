!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  Page({
    data: { content: '', logoUrl: '', version: '1.0.0', loading: true },

    onLoad() {
      wx.setNavigationBarTitle({ title: '关于云舍村' });
      var publicBase = BASE.replace(/\/api\/?$/, '');
      this.setData({ logoUrl: publicBase + '/images/云舍村-中文品牌标识.png' });
      // 从后端 CMS 加载关于页内容
      wx.request({
        url: BASE + '/cms/about_us',
        method: 'GET',
        success: res => {
          var d = res.data;
          var content = (d && d.code === 0 && d.data && d.data.content) ? d.data.content : '';
          this.setData({ content: content, loading: false });
        },
        fail: () => this.setData({ loading: false })
      });
      // 获取小程序版本号
      try {
        var accInfo = wx.getAccountInfoSync();
        this.setData({ version: (accInfo && accInfo.miniProgram && accInfo.miniProgram.version) || '1.0.0' });
      } catch(e) {}
    },

    goPage(e) {
      var url = e.currentTarget.dataset.url;
      if (!url) return;
      wx.navigateTo({ url: url, fail: function() { wx.reLaunch({ url: url }); } });
    },

    goChat() {
      wx.navigateTo({ url: '/pagesA/other/chat' });
    },

    callPhone() {
      wx.makePhoneCall({
        phoneNumber: '0736-7070666',
        fail: function() { wx.showToast({ title: '暂无法拨打，请稍后重试', icon: 'none' }); },
      });
    },
  });
}();
