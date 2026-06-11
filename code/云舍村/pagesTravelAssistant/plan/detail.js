const DAY_LIST = [{
  key: "overview",
  label: "概览"
}, {
  key: "day1",
  label: "5月1日"
}, {
  key: "day2",
  label: "5月2日"
}, {
  key: "day3",
  label: "5月3日"
}, {
  key: "day4",
  label: "5月4日"
}];

const ITINERARY = [{
  key: "day1",
  date: "05月01日",
  title: "抵达地>丽江和香格里拉",
  subTitle: "抵达丽江 - 云舍村丽江山居",
  image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg",
  desc: "避开人头攒动的大研古城和束河古镇，山居坐落在仍延续着纳西传统生活的村落。"
}, {
  key: "day2",
  date: "05月02日",
  title: "丽江和香格里拉",
  subTitle: "云舍村丽江山居",
  image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-3.jpg",
  desc: "在一食一餐中品味当地风物，在语言言谈中走进在地生活，回到亲切温馨的家园。"
}, {
  key: "day3",
  date: "05月03日",
  title: "丽江和香格里拉",
  subTitle: "云舍村香格里拉林卡",
  image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
  desc: "隐匿于如“香巴拉”秘境般自在与安宁的绿色山谷，田园与村落交织。"
}, {
  key: "day4",
  date: "05月04日",
  title: "丽江和香格里拉",
  subTitle: "云舍村香格里拉林卡",
  image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-1.jpg",
  desc: "探索当地节气文化与村落步道，在轻户外体验中收获更完整的旅行记忆。"
}, {
  key: "day5",
  date: "05月05日",
  title: "丽江和香格里拉>离开地",
  subTitle: "离开丽江（含接机/站）",
  image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-5.jpg",
  desc: "告别雪山与峡谷，结束本次行程。"
}];

function getDefaultPeople() {
  return {
    adult: 0,
    bigChild: 0,
    midChild: 0,
    baby: 0,
    senior: 0,
    hkmo: 0,
    foreigner: 0
  };
}

Page({
  data: {
    heroImage: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg",
    title: "丽江和香格里拉 4晚5天 行程计划",
    subInfo: "1成人 · 05月01日抵达",
    price: 17170,
    tabs: DAY_LIST,
    tabIndex: 0,
    needButler: false,
    showTip: true,
    itineraryList: ITINERARY,
    displayList: ITINERARY,
    showPicker: false,
    people: getDefaultPeople(),
    arrivalDate: "2026-05-01",
    departureCity: "广东 广州",
    returnCity: "广东 广州",
    cityOptions: ["广东 广州", "上海 上海", "北京 北京", "四川 成都", "云南 昆明"],
    departureCityIndex: 0,
    returnCityIndex: 0,
    isDetailMode: false,
    showSuccessDialog: false
  },
  onLoad(options) {
    const title = options && options.planTitle ? decodeURIComponent(options.planTitle) : "";
    if (title) {
      this.setData({
        title
      });
    }
    if (options && options.mode === "detail") {
      this.setData({
        isDetailMode: true
      });
    }
    this.updateDisplayList();
  },
  onBack() {
    wx.navigateBack({
      fail: () => {
        wx.reLaunch({
          url: "/pages/trip/index"
        });
      }
    });
  },
  onToggleButler() {
    this.setData({
      needButler: !this.data.needButler
    });
  },
  onSwitchTab(e) {
    const tabIndex = Number(e.currentTarget.dataset.index || 0);
    this.setData({
      tabIndex
    });
    this.updateDisplayList();
  },
  onHideTip() {
    this.setData({
      showTip: false
    });
  },
  onOpenPicker() {
    this.setData({
      showPicker: true
    });
  },
  onClosePicker() {
    this.setData({
      showPicker: false
    });
  },
  onChangeCount(e) {
    const field = e.currentTarget.dataset.field;
    const delta = Number(e.currentTarget.dataset.delta || 0);
    const people = {
      ...this.data.people
    };
    const next = (people[field] || 0) + delta;
    people[field] = next < 0 ? 0 : next;
    this.setData({
      people
    });
  },
  onArrivalDateChange(e) {
    this.setData({
      arrivalDate: e.detail.value
    });
  },
  onDepartureChange(e) {
    const index = Number(e.detail.value || 0);
    this.setData({
      departureCityIndex: index,
      departureCity: this.data.cityOptions[index]
    });
  },
  onReturnChange(e) {
    const index = Number(e.detail.value || 0);
    this.setData({
      returnCityIndex: index,
      returnCity: this.data.cityOptions[index]
    });
  },
  onPickerDone() {
    const total = Object.values(this.data.people).reduce((sum, value) => sum + value, 0);
    if (!total) {
      wx.showToast({
        title: "请至少选择1位成人",
        icon: "none"
      });
      return;
    }
    this.setData({
      showPicker: false,
      subInfo: `${this.data.people.adult || total}成人 · ${this.formatDateLabel(this.data.arrivalDate)}抵达`
    });
  },
  onGoMap() {
    wx.navigateTo({
      url: `/pagesTravelAssistant/journey/map?title=${encodeURIComponent(this.data.title)}`
    });
  },
  onNextStep() {
    const total = Object.values(this.data.people).reduce((sum, value) => sum + value, 0);
    if (!total) {
      this.onOpenPicker();
      return;
    }
    if (this.data.isDetailMode) {
      this.setData({
        showSuccessDialog: true
      });
      return;
    }
    this.setData({
      isDetailMode: true
    });
  },
  onCloseSuccess() {
    this.setData({
      showSuccessDialog: false
    });
  },
  formatDateLabel(dateText) {
    const date = new Date(dateText);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },
  updateDisplayList() {
    if (this.data.tabIndex === 0) {
      this.setData({
        displayList: this.data.itineraryList
      });
      return;
    }
    const key = this.data.tabs[this.data.tabIndex].key;
    this.setData({
      displayList: this.data.itineraryList.filter((item) => item.key === key)
    });
  }
});
