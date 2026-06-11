// pages/searchDate/searchDate.js
import dayjs from "dayjs";
const { numberToTraditionalChinese } = require("../../utils/util");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    enterDay: "",
    enterYearMonth: "",
    LeaveDay: "",
    LeaveYearMonth: "",
    adultNumber: 1,
    childrenNumber: 0,
    homeNumber: 1,
    dialogVisible: false,
    calendarVisible: false,
    startTimestamp: 0,
    endTimestamp: 0,
    days: 1,
    daysCN: "1",
  },
  onShareAppMessage() {
    return {
      title: '桃花源·云舍村',
      path: '/pages/home/home',
      imageUrl: 'https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/applet_shar_img.png'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let day = dayjs().format("DD");
    let yearMonth = dayjs().format("YYYY-MM");
    let nextDay = dayjs().add(1, "day").format("DD");
    let nextYearMonth = dayjs().add(1, "day").format("YYYY-MM");

    this.setData({
      enterDay: day,
      enterYearMonth: yearMonth,
      leaveDay: nextDay,
      leaveYearMonth: nextYearMonth,
      startTimestamp: dayjs().startOf("day").valueOf(),
      endTimestamp: dayjs().add(1, "day").endOf("day").valueOf(),
    });
  },
  bindDateChangeEnter: function (e) {
    this.setData({
      date: e.detail.value,
    });
  },
  getNumber(e) {
    const { adultNumber, childrenNumber, homeNumber } = e.detail;
    this.setData({ childrenNumber, homeNumber, adultNumber });
  },
  showDialog() {
    this.setData({
      dialogVisible: true,
    });
  },
  openCalendar() {
    this.setData({ calendarVisible: true });
  },
  handleConfirm(e) {
    const [start, end] = e.detail.value;
    const days = dayjs(end).diff(dayjs(start), "day");
    this.setData({
      startTimestamp: start,
      endTimestamp: end,
      enterDay: dayjs(start).format("DD"),
      enterYearMonth: dayjs(start).format("YYYY-MM"),
      leaveDay: dayjs(end).format("DD"),
      leaveYearMonth: dayjs(end).format("YYYY-MM"),
      days,
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
