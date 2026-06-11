// pages/orderList/orderList.js
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
    orderStatus: '',
    currentData: 0,
    insertTime: [],
  },

  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current,
        orderStatus: e.target.dataset.status
      })
      that.getOrderList();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    // that.countDown();
    that.getOrderList();
  },

  getTime: function (e) {
    var id = e.currentTarget.dataset.id;
    var _this = this;
    var timeList = _this.data.timeList;
  },

  async getOrderList() {
    var _this = this;
    var status = this.data.orderStatus;
    const res = await request({
      path: '/applet/ticket/order/list',
      method: "POST",
      data: {
        orderStatus: status
      }
    });
    console.log(res.data);
    if (res.code === "0") {
      res.data.forEach((element, index) => {
        if (element.orderStatus == 0) {
          var startDate = element.orderTime;
          startDate = Date.parse(startDate);
          interval(startDate, _this, index);
        }
        // console.log(v, i);
      });

      this.setData({
        list: res.data,
      });
    } else {
      app.showNone(res.msg)
      return false;
    }
  },

  toDetail(event) {
    var id = event.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/orderDetail/orderDetail?id=' + id,
    })
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