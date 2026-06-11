// component/homeList.js
import dayjs from "dayjs";
const {
  request
} = require("../../utils/request");
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidShowStatus: {
      value: false,
      type: Boolean,
    },
    ListInfo: {
      value: [],
      type: Object,
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    orderStatusEnum: {
      0: "待支付",
      1: "已预约",
      10: "已取消",
      2: "申请退款",
      20: "拒绝退款",
      21: "已退款",
      22: "退款中",
      23: "退款失败",
      3: "已入村",
      4: "已离村",
      5: "已取消",
      100: "已取消",
    },
    color: '#9A5C2E',
    color_2: '#B0A85D',
    color_3: '#929292',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goOrderPage(e) {
      console.log(e);
      this.triggerEvent("subscribe", {
        roomId: e.currentTarget.dataset["roomId"],
        userNum: e.currentTarget.dataset["userNum"],
        roomName: e.currentTarget.dataset["roomName"],
        price: e.currentTarget.dataset["price"],
        village: e.currentTarget.dataset["village"],
        facilities: e.currentTarget.dataset["facilities"],
        bathroom: e.currentTarget.dataset["bathroom"]
      });
    },
    checkOrder(e) {
      // if (!this.data.hidShowStatus) return;
      this.triggerEvent("check", {
        orderId: e.currentTarget.dataset["id"],
      });
    },
    async continue_payment(e){
      var that = this
      wx.showLoading();
      try {
        const res = await request({
          path: `/applet/room/pay/${e.target.dataset.id}`,
          method: "GET",
          data: {},
        });
        console.log(res.data);
        if (res.code === "0") {
          that.pay({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.packageVal,
            signType: res.data.signType,
            paySign: res.data.paySign,
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: "error",
            duration: 2000,
            mask: false,
          });
        }
      } catch (e) {
        console.log(e);
      }
      wx.hideLoading();
    },
     // 支付
 pay({
  timeStamp,
  nonceStr,
  package: packageStr,
  signType,
  paySign
}) {
  wx.requestPayment({
    timeStamp,
    nonceStr,
    package: packageStr,
    signType,
    paySign,
    success: () => {
      setTimeout(() => {
        wx.switchTab({
          url: "/pages/index/index"
        });
      }, 2000);
      wx.showToast({
        title: "預約成功",
        icon: "success",
        duration: 2000,
        mask: true,
      });
    },
    fail: (res) => {
      console.log(res);
      wx.showToast({
        title: "預約失败",
        icon: "error",
        duration: 2000,
        mask: false,
      });
    },
  });
},
  },
  
});