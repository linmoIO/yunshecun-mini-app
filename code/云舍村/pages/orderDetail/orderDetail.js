// pages/toBePaid/toBePaid.js
import {
  request
} from "@/utils/request";
import {
  interval
} from "@/utils/util";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    insertTime: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    var id = options.id;
    if (id != undefined) {
      this.getOrderDetail(id)
    }
  },

  async getOrderDetail(id) {
    var _this = this
    const res = await request({
      path: '/applet/ticket/order/detail',
      method: "POST",
      data: {
        id: id
      }
    });
    console.log(res);
    if (res.code == 0) {
      var detail = res.data
      this.setData({
        detail: detail
      })

      var startDate = detail.orderTime;
      startDate = Date.parse(startDate);
        if (detail.orderStatus == 0){
          interval(startDate, _this, 0);
          var payInfo = await request({
            path: '/applet/ticket/pay/' + detail.orderNo,
            method: "GET",
          });

          if (payInfo.code == 0) {
            this.setData({
              [`detail.payInfo`]: payInfo.data
            })
          }
        }
      
    }
  },

  toPay () {
    var that = this;
    var detail = this.data.detail;
    var wdata = detail.payInfo;
    console.log(detail);
    if (wdata && detail.orderStatus == 0) {
      wx.requestPayment({
        nonceStr: wdata.nonceStr + "",
        package: wdata.packageVal + "",
        signType: wdata.signType + "",
        timeStamp: wdata.timeStamp + "",
        paySign: wdata.paySign + "",
        success: function (res) {
          app.showNone('支付成功', 2000);
          that.getOrderDetail(detail.orderId);
        },
        fail: function (res) {
          app.showNone('支付失败', 2000);
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