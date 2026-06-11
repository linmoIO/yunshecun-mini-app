Page({
  data: {
    title: "行程地图",
    tabs: ["概览", "DAY 1", "DAY 2", "DAY 3", "DAY 4"],
    tabIndex: 0,
    latitude: 27.45,
    longitude: 99.7,
    scale: 6,
    markers: [{
      id: 1,
      latitude: 26.87,
      longitude: 100.22,
      title: "DAY 1/2",
      width: 22,
      height: 22
    }, {
      id: 2,
      latitude: 27.83,
      longitude: 99.7,
      title: "DAY 3/4/5",
      width: 22,
      height: 22
    }],
    polyline: [{
      points: [{
        latitude: 26.87,
        longitude: 100.22
      }, {
        latitude: 27.83,
        longitude: 99.7
      }],
      color: "#C44735",
      width: 4
    }]
  },
  onLoad(options) {
    if (options && options.title) {
      this.setData({
        title: decodeURIComponent(options.title)
      });
    }
  },
  onBack() {
    wx.navigateBack({
      fail: () => {
        wx.reLaunch({
          url: "/pagesTravelAssistant/plan/detail"
        });
      }
    });
  },
  onSwitchTab(e) {
    this.setData({
      tabIndex: Number(e.currentTarget.dataset.index || 0)
    });
  }
});
