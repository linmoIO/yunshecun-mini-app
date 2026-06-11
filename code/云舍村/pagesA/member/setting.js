Page({
  data: {},
  onLoad() {
    wx.setNavigationBarTitle({ title: '设置' });
  },
  goPage(e) {
    var url = e.currentTarget.dataset.url;
    if (!url) return;
    wx.navigateTo({
      url: url,
      fail: function() {
        wx.reLaunch({ url: url });
      }
    });
  },
});
