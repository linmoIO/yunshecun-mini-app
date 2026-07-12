! function() {
  "use strict";
  const c = require("../../utils/config.js");
  Page({
    data: { content: '', loading: true, title: '合作品牌权益合集' },
    onLoad(opt) {
      if (opt && opt.title) this.setData({ title: opt.title });
      wx.setNavigationBarTitle({ title: this.data.title });
      const key = 'page_member_right';
      wx.request({
        url: c.config.baseUrlmall + '/cache/sysOptions/getMultiSysOptionCommon.json?codes=' + key + '&hotelGroupCode=' + c.config.hotelGroupCode + '&clientType=wechat_mini&appid=' + c.config.appid,
        method: 'GET',
        success: res => {
          const d = res.data;
          const item = d && d.retVal && Array.isArray(d.retVal) ? d.retVal.find(x => x.code === key) : null;
          this.setData({ content: (item && item.value) || '', loading: false });
        },
        fail: () => this.setData({ loading: false })
      });
    }
  });
}();
