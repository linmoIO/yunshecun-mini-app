// pages/orderConfirm/orderConfirm.js
import { checkIDCard,checkPhone } from "@/utils/check";
import { request } from "@/utils/request";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex:null, //打开弹窗的对应下标
    checked: '',
    mobile: '',
    inputList: ['']
  },

  addInput: function() {
    var inputList = this.data.inputList
    for (let i = 0; i < inputList.length; i++) {
      const element = inputList[i];
      if (element == '') {
        app.showNone('请将上一个身份证号填写完成再添加')
        return false;
      }
    }
    inputList.push(''); // 添加一个新的空白输入框
    this.setData({
      inputList: inputList
    });
  },

  handleInput: function(e) {
    var index = e.currentTarget.dataset.index;
    var value = e.detail.value;
    this.data.inputList[index] = value; // 更新输入框的值
    this.setData({
      inputList: this.data.inputList
    });
  },

  bindmobile: function(event) {
    var mobile = event.detail.value;
    this.setData({
      mobile: mobile
    });
  },

  radioChange: function(e) {
    var checked = this.data.checked == '' ? 'checked' : '';
    this.setData({
      checked:checked
    });
  },

  // 打开弹窗
  openPopup(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      showIndex:index
    })
  },
  
  //关闭弹窗
  closePopup(){
    this.setData({
      showIndex:null
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    // console.log(option.query)
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      // console.log(data);
      that.setData({
        date: data.date,
        priceList: data.priceList,
        totalPrice: data.totalPrice * 1
      })
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

  },

  async toBuy(){
    var data = this.data
    // for (let i = 0; i < data.inputList.length; i++) {
    //   const element = data.inputList[i];
    //   if (!checkIDCard(element)) {
    //     app.showNone('请填写有效的身份证号');
    //     return false;
    //   }
    // }
    // if (!checkPhone(data.mobile)) {
    //   app.showNone('手机号格式错误');
    //   return false;
    // }
    if (data.checked == '') {
      app.showNone('请确认您已同意接受条款与细则。');
      return false;
    }

    var formData = {
      date: data.date,
      idCardList: data.inputList,
      phoneNo: data.mobile,
      priceList: [],
      totalAmount: data.totalPrice
    }

    data.priceList.forEach(element => {
      if (element.count > 0) {
        formData.priceList.push({
          id: element.id,
          num: element.count,
          price: element.price
        })
      }
    });

    console.log(formData);

    const res = await request({
      path: '/applet/ticket/order/submit',
      method: "POST",
      data: formData,
    });
    console.log(res.data);
    if (res.code === "0") {
      formData.payInfo = res.data,
      formData.priceList = data.priceList,
      wx.navigateTo({
        url: '/pages/confirmBuy/confirmBuy',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { formData:formData })
        }
      })
    } else {
      app.showNone(res.msg)
      return false;
    }
  }
})