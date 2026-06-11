const {
  getActivityDetailData,
  subscribeActivityNotice,
} = require("../../utils/activityApi");

Page({
  data: {
    activity: null,
    infoTabs: [
      { key: "highlight", name: "产品亮点" },
      { key: "detail", name: "详情" },
      { key: "notice", name: "预订须知" },
      { key: "qa", name: "问答" },
    ],
    activeInfoTab: "highlight",
    selectedDateIndex: 0,
    selectedPackageIndex: 0,
    bookingSheetVisible: false,
    packageCount: 1,
  },

  async onLoad(options) {
    const activity = await getActivityDetailData(options.id);
    this.setData({
      activity,
    });
  },

  onShareAppMessage() {
    const activity = this.data.activity || {};
    return {
      title: activity.title || "活动详情",
      path: `/pages/activityDetail/index?id=${activity.id || ""}`,
      imageUrl: activity.cover || "",
    };
  },

  switchInfoTab(event) {
    this.setData({
      activeInfoTab: event.currentTarget.dataset.key,
    });
  },

  selectDate(event) {
    this.setData({
      selectedDateIndex: Number(event.currentTarget.dataset.index),
    });
  },

  selectPackage(event) {
    this.setData({
      selectedPackageIndex: Number(event.currentTarget.dataset.index),
    });
  },

  openBookingSheet() {
    this.setData({
      bookingSheetVisible: true,
      packageCount: 1,
    });
  },

  closeBookingSheet() {
    this.setData({
      bookingSheetVisible: false,
    });
  },

  decreasePackageCount() {
    this.setData({
      packageCount: Math.max(1, this.data.packageCount - 1),
    });
  },

  increasePackageCount() {
    this.setData({
      packageCount: Math.min(9, this.data.packageCount + 1),
    });
  },

  async subscribeNotice() {
    try {
      const res = await subscribeActivityNotice({
        scene: "detail",
        activityId: (this.data.activity || {}).id || "",
      });
      wx.showToast({
        title: res.code === "0" ? "订阅成功" : res.msg || "订阅失败",
        icon: "none",
      });
    } catch (error) {
      console.log(error);
      wx.showToast({
        title: "订阅失败",
        icon: "none",
      });
    }
  },

  nextStep() {
    const { activity, selectedPackageIndex } = this.data;
    const currentPackage = (activity.packages || [])[selectedPackageIndex];
    if (!currentPackage) {
      return;
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const startTimestamp = Date.now() + 7 * oneDay;
    const endTimestamp = startTimestamp + currentPackage.nights * oneDay;

    wx.navigateTo({
      url:
        `/pages/order-detail/order-detail?adultNumber=2&childrenNumber=0&homeNumber=1` +
        `&startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}` +
        `&roomId=1&userNum=2&roomName=${encodeURIComponent(currentPackage.name)}` +
        `&price=${currentPackage.price}&roomNum=1` +
        `&village=${encodeURIComponent(activity.destination || "目的地酒店")}` +
        `&facilities=${encodeURIComponent("精品酒店配套")}` +
        `&bathroom=${encodeURIComponent("独立卫浴")}`,
    });
  },

  backTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 220,
    });
  },

  noop() {},
});
