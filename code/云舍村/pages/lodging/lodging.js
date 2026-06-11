// // index.js
// // 获取应用实例
// const app = getApp();
const {
  request
} = require("../../utils/request");
// Page({
//   data: {},
//   // 事件处理函数

//   onLoad() {},
//   onShow() {},
//   runChooseDate() {
//     wx.navigateTo({
//       url: "/pages/searchDate/searchDate",
//     });
//   },
// });
// pages/searchDate/searchDate.js
import dayjs from "../../miniprogram_npm/dayjs/index";
const {
  numberToTraditionalChinese
} = require("../../utils/util");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    enterDay: "",
    enterYearMonth: "",
    LeaveDay: "",
    LeaveYearMonth: "",
    adultNumber: 2,
    childrenNumber: 0,
    homeNumber: 1,
    dialogVisible: false,
    calendarVisible: false,
    startTimestamp: 0,
    endTimestamp: 0,
    days: 1,
    daysCN: "1",
    showIndex:false,//打开弹窗的对应下标
    height:'',//屏幕高度
    bottomDialogVisible:false,
    official_announcement:'',
    convenient_data:'',
    adList:[{
      'url':'',
      'title':'刚刚预约了服务'
    },{
      'url':'',
      'title':'内容内容内容内容内容'
    }],
    format(day) {
      // day.suffix = '';
      if (day.type == 'start') {
        day.suffix = '入村';
      }
      if (day.type == 'end') {
        day.suffix = '离村';
      }
      return day;
    },
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.Notice()
    let day = dayjs().format("MM-DD");
    let yearMonth = dayjs().format("YYYY");
    let nextDay = dayjs().add(1, "day").format("MM-DD");
    let nextYearMonth = dayjs().add(1, "day").format("YYYY");
    this.setData({
      enterDay: day,
      enterYearMonth: yearMonth,
      leaveDay: nextDay,
      leaveYearMonth: nextYearMonth,
      startTimestamp: dayjs().startOf("day").valueOf(),
      endTimestamp: dayjs().add(1, "day").endOf("day").valueOf(),
      bottomDialogVisible: true
    });
    console.log(this.setData)
  },
  onShareAppMessage() {
    return {
      title: '桃花源·云舍村',
      path: '/pages/home/home',
      imageUrl: 'https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/applet_shar_img.png'
    }
  },
  bindDateChangeEnter: function (e) {
    this.setData({
      date: e.detail.value,
    });
  },
  getNumber(e) {
    const {
      adultNumber,
      childrenNumber,
      homeNumber
    } = e.detail;
    this.setData({
      childrenNumber,
      homeNumber,
      adultNumber
    });
  },
  showDialog() {
    this.setData({
    dialogVisible: true,
    });
  },
  openCalendar() {
    this.setData({
      calendarVisible: true
    });
  },
  // 打开弹窗
  openPopup:function(e){
    console.log(e);
    this.setData({
      showIndex:true,
      convenient_data:e.target.dataset.index.title
    })
    console.log(this.data.convenient_data);
  },

  openPopupCurrent(){
    // this.setData({
    //   showIndex:true,
    //   convenient_data:"啊实打实大苏打"
    // })
  },
  //关闭弹窗
  closePopup(){
    this.setData({
      showIndex:false
    })
  },
  makePhoneCall(event) {
    const phoneNumber = event.currentTarget.dataset.tel; // 替换成要拨打的电话号码
    console.log(phoneNumber)
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this;
    // 动态获取屏幕高度
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          height: result.windowHeight
        });
      },
    })
  },
  handleConfirm(e) {
    const [start, end] = e.detail.value;
    const days = dayjs(end).diff(dayjs(start), "day");
    this.setData({
      startTimestamp: start,
      endTimestamp: end,
      enterDay: dayjs(start).format("MM-DD"),
      enterYearMonth: dayjs(start).format("YYYY-MM"),
      leaveDay: dayjs(end).format("MM-DD"),
      leaveYearMonth: dayjs(end).format("YYYY-MM"),
      days: days,
      daysCN: numberToTraditionalChinese(days),
    });
  },
  check() {
    
    if (this.data.adultNumber + this.data.childrenNumber <= 0) {
      wx.showToast({
        title: "請设置人數",
        icon: "error",
        duration: 2000,
        mask: false,
      });
      return;
    } else if (this.data.homeNumber <= 0) {
      wx.showToast({
        title: "請设置客房数",
        icon: "error",
        duration: 2000,
        mask: false,
      });
      return;
    }
    wx.navigateTo({
      url: `/pages/homeDetailList/homeDetailList?adultNumber=${this.data.adultNumber}&childrenNumber=${this.data.childrenNumber}&homeNumber=${this.data.homeNumber}&startTimestamp=${this.data.startTimestamp}&endTimestamp=${this.data.endTimestamp}`,
    });
  },
});