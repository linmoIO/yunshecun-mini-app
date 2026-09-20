// 开票记录统一使用 pagesA/member/invoicePage 的“开票记录”页签
Page({
  onLoad: function() {
    wx.redirectTo({ url: "/pagesA/member/invoicePage?tab=1" });
  },
});
