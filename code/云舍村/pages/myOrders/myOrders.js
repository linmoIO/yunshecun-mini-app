const {
  request
} = require("../../utils/request");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    waitPayOrderList: [],
    orderList: [],
    close:false,
  },
  go_ply(){
   this.setData({
    close:true
   })
  },
  onLoad() {
    wx.loadFontFace({
      family: 'I.PenCrane-s',
      source: 'url("https://yunshecun.oss-cn-guangzhou.aliyuncs.com/website/font/TengXiangTongSongTi-2.ttf")',
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
  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getOrderList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '桃花源·云舍村',
      path: '/pages/home/home',
      imageUrl: 'https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/applet_shar_img.png'
    }
  },
  async getOrderList() {
    wx.showLoading();
    try {
      const res = await request({
        path: "/applet/personal/order/list",
        method: "POST",
      });
      console.log(res);
      if (res.code === "0") {
        var waitPayOrderList = [];
        var orderList = [];
        
        for (var i = 0; i < res.data.length; i++) {
          var order = res.data[i];
          console.log(order);
          if(order.orderStatus == 0) {
            waitPayOrderList.push(order);
            continue;
          }
          orderList.push(order);
        }
        this.setData({
          waitPayOrderList: waitPayOrderList,
          orderList: orderList
        });
      }
    } catch (e) {
      console.log(e);
    }
    wx.hideLoading();
  },
  checkOrder(e) {
    console.log(e);
    const id = e.detail.orderId;
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?orderId=${id}`,
    });
  },
});