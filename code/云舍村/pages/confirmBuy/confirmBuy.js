// pages/confirmBuy/confirmBuy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      // console.log(data);
      that.setData({
        formData: data.formData,
      })
    })
  },

  toPay () {
    let wdata = this.data.formData.payInfo;
    if (wdata) {
      wx.requestPayment({
        nonceStr: wdata.nonceStr + "",
        package: wdata.packageVal + "",
        signType: wdata.signType + "",
        timeStamp: wdata.timeStamp + "",
        paySign: wdata.paySign + "",
        success: function (res) {
          console.log(res, "支付成功");
          wx.showToast({
            title: "支付成功",
            icon: "none",
            duration: 2000,
            success: function () {
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/orderList/orderList',
                })
              }, 2000);
            },
          });
        },
        fail: function (res) {
          wx.showToast({
            title: "支付失败",
            icon: "none",
            duration: 2000,
            success: function () {
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/orderList/orderList',
                })
              }, 2000);
            },
          });
        },
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})