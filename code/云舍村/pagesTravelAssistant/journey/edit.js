const ROUTE_GROUPS = [{
  title: "滇藏线",
  options: ["拉萨", "来古", "如美", "波密", "梅里", "香格里拉"]
}, {
  title: "香格里拉环线",
  options: ["泸沽湖", "丽江", "塔城", "香格里拉", "亚丁"]
}, {
  title: "梅里环线",
  options: ["石月亮", "茨中", "梅里", "奔子栏", "香格里拉"]
}, {
  title: "拉萨环线",
  options: ["拉萨", "百巴", "林芝", "乃朗", "巴松措"]
}, {
  title: "冰川环线",
  options: ["来古", "南迦巴瓦", "波密"]
}, {
  title: "昆明/普洱",
  options: ["景迈山", "普洱", "昆明"]
}];

const PREFERENCE_OPTIONS = ["美食美酒", "自然风光", "宗教文化", "深度户外", "民间艺术", "历史人文", "户外轻徒步"];
const CITY_OPTIONS = ["广东 广州", "上海 上海", "北京 北京", "四川 成都", "云南 昆明"];

function pad(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

function formatDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function initRouteGroups() {
  return ROUTE_GROUPS.map((group) => ({
    title: group.title,
    options: group.options.map((name) => ({
      name,
      selected: false
    }))
  }));
}

function initPreferences() {
  return PREFERENCE_OPTIONS.map((name) => ({
    name,
    selected: false
  }));
}

Page({
  data: {
    title: "开启旅行计划",
    subtitle: "提交需求 > 确认方案 > 签约付款 > 轻松出行",
    headerImage: "https://songtsam-internal-static.oss-cn-chengdu.aliyuncs.com/mobile/assets/travel-assistant/guide_bg_img.jpeg",
    name: "",
    phone: "",
    startDate: "",
    endDate: "",
    minDate: "",
    dateRangeText: "",
    routeGroups: initRouteGroups(),
    preferences: initPreferences(),
    remark: "",
    cityOptions: CITY_OPTIONS,
    departureCityIndex: 0,
    returnCityIndex: 0,
    people: {
      adult: 0,
      bigChild: 0,
      midChild: 0,
      baby: 0,
      senior: 0,
      hkmo: 0,
      foreigner: 0
    }
  },
  onLoad(options) {
    const today = new Date();
    const nextDay = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const startDate = formatDate(today);
    const endDate = formatDate(nextDay);
    this.setData({
      startDate,
      endDate,
      minDate: startDate,
      dateRangeText: `${startDate} - ${endDate}`
    });

    if (options && options.fromType === "travelDetail") {
      this.setData({
        title: "创建行程计划"
      });
    }
  },
  onBack() {
    wx.navigateBack({
      fail() {
        wx.reLaunch({
          url: "/pages/guide/guide"
        });
      }
    });
  },
  onNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },
  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    });
  },
  onStartDateChange(e) {
    const startDate = e.detail.value;
    let {
      endDate
    } = this.data;
    if (startDate > endDate) {
      endDate = startDate;
    }
    this.setData({
      startDate,
      endDate,
      dateRangeText: `${startDate} - ${endDate}`
    });
  },
  onEndDateChange(e) {
    const endDate = e.detail.value;
    let {
      startDate
    } = this.data;
    if (endDate < startDate) {
      startDate = endDate;
    }
    this.setData({
      startDate,
      endDate,
      dateRangeText: `${startDate} - ${endDate}`
    });
  },
  onToggleDestination(e) {
    const groupIndex = Number(e.currentTarget.dataset.groupIndex);
    const optionIndex = Number(e.currentTarget.dataset.optionIndex);
    const routeGroups = this.data.routeGroups.slice();
    const option = routeGroups[groupIndex].options[optionIndex];
    option.selected = !option.selected;
    this.setData({
      routeGroups
    });
  },
  onTogglePreference(e) {
    const index = Number(e.currentTarget.dataset.index);
    const preferences = this.data.preferences.slice();
    preferences[index].selected = !preferences[index].selected;
    this.setData({
      preferences
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
  onDepartureChange(e) {
    this.setData({
      departureCityIndex: Number(e.detail.value)
    });
  },
  onReturnChange(e) {
    this.setData({
      returnCityIndex: Number(e.detail.value)
    });
  },
  onQuickConsult() {
    wx.navigateTo({
      url: "/pagesE/consultationForm/index"
    });
  },
  onSubmitDemand() {
    const {
      name,
      phone,
      routeGroups
    } = this.data;
    if (!name) {
      wx.showToast({
        title: "请输入姓名",
        icon: "none"
      });
      return;
    }
    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({
        title: "请输入正确手机号",
        icon: "none"
      });
      return;
    }

    const selected = [];
    routeGroups.forEach((group) => {
      group.options.forEach((item) => {
        if (item.selected) {
          selected.push(item.name);
        }
      });
    });

    const selectedQuery = encodeURIComponent(selected.join(","));
    wx.navigateTo({
      url: `/pagesTravelAssistant/journey/destination?selected=${selectedQuery}`
    });
  }
});
