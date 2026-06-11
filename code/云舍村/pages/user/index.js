// pages/user/index.js
import { request } from "@/utils/request";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    isManage: 1,
    // userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var recommend = wx.getStorageSync('recommend');
    console.log(recommend);
    if (recommend == undefined) {
      var recommend = wx.getStorageSync('recommend');
      console.log(recommend);
    }
    
    console.log(app.globalData.userInfo);
    this.setData({
      recommend:recommend,
      userInfo: app.globalData.userInfo,
    })
  },

  async Notice(){
    var that = this;
    try {
      const res = await request({
        path: "/applet/home/notice",
        method: "GET",
        data: {},
      });
        that.setData({
          official_announcement:res.data,
        })
    }catch (e) {
      console.log(e);
    }
    wx.hideLoading();
  },

  bindname: function(event) {
    var name = event.detail.value;
    this.setData({
      name: name
    });
  },

  async toManage(){
    var that = this;
    var name = this.data.name
    var name = '测试'
    if (name == '') {
      app.showNone('请填写姓名！')
      return false;
    }
    
    const res = await request({
      path: "/applet/ticket/check/manage",
      method: "POST",
      data: {name:name},
    });
    if (res.code == "0") {
      app.showNone('提交成功')
      var userinfo = this.data.userInfo
      userinfo.isManage = 1
      this.setData({
        list: res.data,
        userinfo: userinfo
      });
    } else {
      app.showNone(res.msg)
      return false;
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
    return {
      title: "云舍村",
      path: `/pages/index/index?recommend=` + this.data.userInfo.isManage,
    };
  },
})