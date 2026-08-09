const cfg = require('../../utils/config.js');
const PUBLIC_BASE_URL = (cfg.config.baseUrlmall || 'http://localhost:3000/api').replace(/\/api\/?$/, '');
const image = (name) => `${PUBLIC_BASE_URL}/uploads/images/${name}`;

const DAY_LIST = [{
  key: "overview",
  label: "概览"
}, {
  key: "day1",
  label: "第1日"
}, {
  key: "day2",
  label: "第2日"
}, {
  key: "day3",
  label: "第3日"
}, {
  key: "day4",
  label: "第4日"
}];

const ITINERARY = [{
  key: "day1",
  date: "第1日",
  title: "抵达云舍村",
  subTitle: "走进桃花源·云舍村",
  image: image('云舍村-村落风景-03.webp'),
  desc: "沿青石板路走进村落，安顿后自由漫游院落、园林与溪流。"
}, {
  key: "day2",
  date: "第2日",
  title: "院落与茶事",
  subTitle: "茶坊与地方风味",
  image: image('云舍村-村落风景-07.webp'),
  desc: "在茶饮与地方风味中感受村落待客之道，享受慢下来的日常。"
}, {
  key: "day3",
  date: "第3日",
  title: "民间手艺",
  subTitle: "桃源绣体验",
  image: image('云舍村-村落风景-04.webp'),
  desc: "认识桃源绣的民间工艺与吉祥纹样，在手作中感受地方文化。"
}, {
  key: "day4",
  date: "第4日",
  title: "自然与农事",
  subTitle: "菜园与村落步道",
  image: image('云舍村-稻田鸭群.png'),
  desc: "在四季菜园与村落步道中观察自然，感受传统乡居的节律。"
}, {
  key: "day5",
  date: "第5日",
  title: "泛舟与返程",
  subTitle: "按确认时间离村",
  image: image('云舍村-泛舟夜景.webp'),
  desc: "如已预约泛舟体验，可按确认安排参与；随后结束本次云舍村到访。"
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
    heroImage: image('云舍村-村落风景-03.webp'),
    title: "云舍村到访行程计划",
    subInfo: "1成人 · 待确认日期",
    price: "预约确认后显示",
    tabs: DAY_LIST,
    tabIndex: 0,
    needButler: false,
    showTip: true,
    itineraryList: ITINERARY,
    displayList: ITINERARY,
    showPicker: false,
    people: getDefaultPeople(),
    arrivalDate: "",
    departureCity: "湖南 常德",
    returnCity: "湖南 常德",
    cityOptions: ["湖南 常德", "湖南 长沙", "广东 广州", "上海 上海", "北京 北京"],
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
