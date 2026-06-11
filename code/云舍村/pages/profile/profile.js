// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onShareAppMessage() {
    return {
      title: '桃花源·云舍村',
      path: '/pages/home/home',
      imageUrl: 'https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/applet_shar_img.png'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.loadFontFace({
      family: 'I.PenCrane-B',
      source: 'url("https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/font/I-PenCrane-B-2.ttf")',
      complete: function (res) {
        console.log('插入字体');
        console.log(res);
      },
      success: function (res) {
        console.log('成功');
        console.log(res);
      },
      fail: function (res) {
        console.log('失败');
        console.log(res);
      },
    })
  },
  runMyOrderDetail() {
    wx.navigateTo({
      url: '/pages/myOrders/myOrders',
    })
  }
})