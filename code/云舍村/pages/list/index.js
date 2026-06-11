const { getActivityListData } = require("../../utils/activityApi");

Page({
  data: {
    routeTabs: [],
    activeRouteKey: "all",
    keyword: "",
    galleryItems: [],
    activeGallery: 0,
    filteredActivities: [],
  },

  onLoad(options) {
    const nextState = {};
    if (options.route) {
      nextState.activeRouteKey = options.route;
    }
    if (options.keyword) {
      nextState.keyword = decodeURIComponent(options.keyword);
    }
    this.setData(nextState, () => {
      this.loadListData();
    });
  },

  onShareAppMessage() {
    return {
      title: "全部产品",
      path: "/pages/list/index",
    };
  },

  async loadListData() {
    const { activeRouteKey, keyword } = this.data;
    const data = await getActivityListData({
      routeKey: activeRouteKey,
      keyword,
    });
    this.setData({
      routeTabs: data.routeTabs || [],
      galleryItems: data.galleryItems || [],
      filteredActivities: data.activities || [],
      activeGallery: 0,
    });
  },

  onGalleryChange(event) {
    this.setData({
      activeGallery: event.detail.current,
    });
  },

  switchRoute(event) {
    this.setData(
      {
        activeRouteKey: event.currentTarget.dataset.key,
      },
      () => {
        this.loadListData();
      }
    );
  },

  bindKeywordInput(event) {
    this.setData({
      keyword: event.detail.value,
    });
  },

  submitKeyword() {
    this.loadListData();
  },

  clearKeyword() {
    this.setData(
      {
        keyword: "",
      },
      () => {
        this.loadListData();
      }
    );
  },

  openHotel() {
    wx.navigateTo({
      url: "/pages/lodging/lodging",
    });
  },

  openActivityDetail(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/activityDetail/index?id=${id}`,
    });
  },
});
