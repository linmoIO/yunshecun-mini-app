// pages/writeOffHistory/writeOffHistory.js
import { request } from "@/utils/request";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCheckHistory()
  },

  async getCheckHistory() {
    const keyword = this.data.keyword
    const res = await request({
      path: '/applet/ticket/check/history',
      method: "POST",
      data: {keyword:keyword}
    });
    console.log(res.data);
    if (res.code === "0") {
      this.setData({
        list: res.data,
      });
    } else {
      app.showNone(res.msg)
      return false;
    }
  },

  bindkeyword: function(event) {
    var keyword = event.detail.value;
    this.setData({
      keyword: keyword
    });
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