// pages/scan-code/scan-code.js
import {
  request
} from "@/utils/request";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  scanCode () {
    var that = this
    wx.scanCode({
      success: (res) => {
        var data = res.path.split('=');
        if (data[1] != undefined) {
          console.log(data[1]);
          that.getTicket(data[1])
        }
      },
      fail: (res) =>{
        app.showNone('请选择核销码？')
        return false;
      }
    })
  },

  async getTicket(orderSn = '') {
    const res = await request({
      path: '/applet/ticket/check',
      method: "POST",
      data: {
        qrCodeContent: orderSn
      }
    });
    if (res.code === "0") {
      var data = res.data
      // app.showNone('核销成功。')
      wx.navigateTo({
        url: '/pages/scanCode/scanCode',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data:data })
        }
      })
      return false;
    } else {
      app.showNone(res.msg)
      return false;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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