// components/top-info/top-info.js
import {
  request
} from "@/utils/request";
const app = getApp();
Component({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex: null, //打开弹窗的对应下标
  },

  methods: {
    // 打开弹窗
    openPopup(e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var notice = that.data.notice;
      notice.forEach(element => {
        if (element.id == id) {
          that.setData({
            noticeDetail: element
          })
          console.log(that.data.noticeDetail);
        }
      });
      
      that.setData({
        showIndex: index
      })
    },

    //关闭弹窗
    closePopup() {
      this.setData({
        showIndex: null
      })
    },

    makePhoneCall(event) {
      const phoneNumber = event.currentTarget.dataset.tel; // 替换成要拨打的电话号码
      console.log(phoneNumber)
      wx.makePhoneCall({
        phoneNumber: phoneNumber
      })
    }
  },

  async created () {
    console.log("created")

    const res = await request({
      path: "/applet/home/notice",
      method: "GET",
    });
    if (res.code === "0") {
      this.setData({
        notice: res.data,
      })
    }

    console.log(this.data.notice);
    
  },

  attached: function () {
    console.log("attached")
  },

})