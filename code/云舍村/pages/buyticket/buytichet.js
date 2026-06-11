// pages/buyticket/buytichet.js
import { getNowFormatDate } from "@/utils/util";
import { request } from "@/utils/request";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    minusStatus: 'disabled',
    date: '',
    totalPrice: 0,
    priceList:[],
    daySurplus: 1,
    datetimeVisible: true,
    datetime: '2024-05-10',
    datetimeText: '',
    pageBackgroundColor:'#e7dfc7'
  },
  // 设置背景颜色数据
  changeColor(e) {
    const id = e.currentTarget.dataset.index;
    this.setData({
      viewnum: id
    });
  },
  onConfirm(e) {
    const { value, formatValue } = e?.detail;

    this.setData({
      datetime: value.valueOf(),
      datetimeText: formatValue,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var date = getNowFormatDate('YYYY-mm-dd')
    this.setData({
      date:date
    })
    this.getPrice();
    this.getStock();
  },

  async getPrice() {
    var date = this.data.date;
    const res = await request({
      path: '/applet/ticket/price',
      method: "POST",
      data: {date:date}
    });
    console.log(res.data);
    if (res.code === "0") {
      var priceList = res.data.priceList
      priceList.forEach(element => {
        element.count = 0
      });
      
      this.setData({
        price: res.data,
        priceList: priceList,
      });
    } else {
      app.showNone(res.msg)
      return false;
    }
  },

  async getStock() {
    const res = await request({
      path: '/applet/ticket/stock',
      method: "GET",
    });
    console.log(res.data);
    if (res.code === "0") {
      this.setData({
        stock: res.data,
      });
    } else {
      app.showNone(res.msg)
      return false;
    }
  },

  increment(event) {
    var key = event.currentTarget.dataset.key,
      count = event.currentTarget.dataset.count;
    count ++; 
    this.getTotalPrice(key, count);
  },
  decrement(event) {
    var key = event.currentTarget.dataset.key,
      count = event.currentTarget.dataset.count;
    if (count > 0) {
      count --;
      this.getTotalPrice(key, count);
    }
  },
  bindManual(event) { 
    var key = event.currentTarget.dataset.key,
        count = event.detail.value; 

    this.getTotalPrice(key, count);
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

  },

  bindDateChange (e) {
    this.setData({
      date: e.detail.value
    })
    this.getPrice();
  },

  getTotalPrice(key, count){
    var priceList = this.data.priceList,
    daySurplus = this.data.priceList;
    // 将数值与状态写回 
    priceList[key].count = count
    var totalPrice = 0;
    priceList.forEach(element => {
      totalPrice +=  element['price'] * element['count'];
    });
    this.setData({
      priceList: priceList,
      totalPrice: totalPrice.toFixed(2)
    });
  },

  
  toConfirm(){
    var totalPrice = this.data.totalPrice,
        date = this.data.date,
        priceList = this.data.priceList
    if (totalPrice == 0) {
      app.showNone('请选择要购买的门票')
      return false;
    }
    wx.navigateTo({
      url: '/pages/orderConfirm/orderConfirm',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { date:date, totalPrice: totalPrice, priceList: priceList })
      }
    })
  }

})