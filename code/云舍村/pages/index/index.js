const {
  getHomeActivityData,
  subscribeActivityNotice,
} = require("../../utils/activityApi");
const { getDestinationsByKey } = require("../../utils/activityData");

Page({
  data: {
    promoVisible: true,
    activeQuickTab: "travel",
    searchKeyword: "",
    heroBanners: [],
    activeBanner: 0,
    promoBanner: {},
    notices: [],
    destinationTabs: [],
    activeDestinationKey: "all",
    destinationCards: [],
    featuredPackages: [],
  },

  onLoad() {
    this.loadHomeData();
  },

  async onPullDownRefresh() {
    await this.loadHomeData();
    wx.stopPullDownRefresh();
  },

  async loadHomeData() {
    const data = await getHomeActivityData();
    const nextBanners = data.heroBanners || [];
    this.setData({
      heroBanners: nextBanners,
      activeBanner: 0,
      promoBanner: nextBanners[0] || {},
      notices: data.notices || [],
      destinationTabs: data.destinationTabs || [],
      destinationCards: data.destinationCards || [],
      featuredPackages: data.featuredPackages || [],
    });

    if (!(data.notices || []).length) {
      this.setData({
        notices: [
          { id: "fallback-1", title: "订阅桃花源·云舍村活动通知，抢先获取限时产品与团期更新。", content: "" },
        ],
      });
    }
  },

  closePromo() {
    this.setData({
      promoVisible: false,
    });
  },

  openPromoActivity() {
    const target = this.data.promoBanner || this.data.heroBanners[0];
    if (!target || !target.activityId) {
      return;
    }
    this.setData({
      promoVisible: false,
    });
    wx.navigateTo({
      url: `/pages/activityDetail/index?id=${target.activityId}`,
    });
  },

  switchQuickTab(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      activeQuickTab: key,
    });
    if (key === "hotel") {
      wx.navigateTo({
        url: "/pages/lodging/lodging",
      });
    }
  },

  bindSearchInput(event) {
    this.setData({
      searchKeyword: event.detail.value,
    });
  },

  submitSearch() {
    if (this.data.activeQuickTab === "hotel") {
      wx.navigateTo({
        url: "/pages/lodging/lodging",
      });
      return;
    }
    const keyword = encodeURIComponent(this.data.searchKeyword || "");
    wx.navigateTo({
      url: `/pages/list/index?keyword=${keyword}`,
    });
  },

  handleBannerChange(event) {
    const nextIndex = event.detail.current;
    const nextBanner = this.data.heroBanners[nextIndex] || this.data.heroBanners[0];
    this.setData({
      activeBanner: nextIndex,
      promoBanner: nextBanner,
    });
  },

  switchDestinationTab(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      activeDestinationKey: key,
      destinationCards: getDestinationsByKey(key),
    });
  },

  openDestination(event) {
    const { activityId } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/activityDetail/index?id=${activityId}`,
    });
  },

  openPackage(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/activityDetail/index?id=${id}`,
    });
  },

  openActivityGallery() {
    wx.navigateTo({
      url: "/pages/list/index",
    });
  },

  openNotices() {
    if (!this.data.notices.length) {
      return;
    }
    const first = this.data.notices[0];
    wx.showModal({
      title: "活动通知",
      content: first.content || first.title,
      showCancel: false,
    });
  },

  async subscribeActivities() {
    try {
      const res = await subscribeActivityNotice({ scene: "home" });
      if (res.code === "0") {
        wx.showToast({
          title: "已开启活动通知",
          icon: "none",
        });
        return;
      }
      wx.showToast({
        title: res.msg || "订阅失败",
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

  noop() {},
});
