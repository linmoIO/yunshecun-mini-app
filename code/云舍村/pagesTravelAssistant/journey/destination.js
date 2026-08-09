const cfg = require('../../utils/config.js');
const PUBLIC_BASE_URL = (cfg.config.baseUrlmall || 'http://localhost:3000/api').replace(/\/api\/?$/, '');
const image = (name) => `${PUBLIC_BASE_URL}/uploads/images/${name}`;

const ROUTE_CARDS = [{
  code: "taoyuan",
  title: "桃花源·云舍村",
  desc: "一处可居、可游、可感知的东方村落空间。",
  image: image('云舍村-苔藓院落.webp'),
  items: [{
    name: "归居院落",
    desc: "在传统湖湘院落中安顿身心，感受村落日常。",
    image: image('云舍村-村落风景-03.webp')
  }, {
    name: "茶事与擂茶",
    desc: "从茶饮与地方风味中，认识云舍村的日常待客之道。",
    image: image('云舍村-村落风景-07.webp')
  }, {
    name: "四季菜园与农事",
    desc: "在四季菜园和稻田景色中感受地方生活与自然。",
    image: image('云舍村-稻田鸭群.png')
  }]
}];

Page({
  data: {
    routeIndex: 0,
    routeCards: ROUTE_CARDS,
    destinationList: ROUTE_CARDS[0].items,
    selectedDestinations: []
  },
  onLoad(options) {
    const selected = (options && decodeURIComponent(options.selected || "").split(",").filter(Boolean)) || [];
    if (selected.length) {
      const first = ROUTE_CARDS.findIndex((route) => route.items.some((item) => selected.includes(item.name)));
      if (first >= 0) {
        this.setData({
          routeIndex: first,
          destinationList: ROUTE_CARDS[first].items
        });
      }
    }
    this.applySelectedState();
  },
  onBack() {
    wx.navigateBack({
      fail() {
        wx.reLaunch({
          url: "/pagesTravelAssistant/journey/edit"
        });
      }
    });
  },
  onSwitchRoute(e) {
    const routeIndex = Number(e.currentTarget.dataset.index || 0);
    this.setData({
      routeIndex,
      destinationList: ROUTE_CARDS[routeIndex].items
    });
    this.applySelectedState();
  },
  onToggleDestination(e) {
    const itemIndex = Number(e.currentTarget.dataset.index || 0);
    const currentRoute = ROUTE_CARDS[this.data.routeIndex];
    const target = currentRoute.items[itemIndex];
    const selectedDestinations = this.data.selectedDestinations.slice();
    const exists = selectedDestinations.findIndex((item) => item.name === target.name && item.routeCode === currentRoute.code);

    if (exists >= 0) {
      selectedDestinations.splice(exists, 1);
    } else {
      if (selectedDestinations.length >= 5) {
        wx.showToast({
          title: "最多选择5个目的地",
          icon: "none"
        });
        return;
      }
      selectedDestinations.push({
        routeCode: currentRoute.code,
        routeTitle: currentRoute.title,
        name: target.name
      });
    }

    this.setData({
      selectedDestinations
    });
    this.applySelectedState();
  },
  onRemoveSelected(e) {
    const index = Number(e.currentTarget.dataset.index || 0);
    const selectedDestinations = this.data.selectedDestinations.slice();
    selectedDestinations.splice(index, 1);
    this.setData({
      selectedDestinations
    });
    this.applySelectedState();
  },
  onCreatePlan() {
    const {
      selectedDestinations
    } = this.data;
    if (!selectedDestinations.length) {
      wx.showToast({
        title: "请先选择至少1个目的地",
        icon: "none"
      });
      return;
    }
    const selectedText = encodeURIComponent(selectedDestinations.map((item) => item.name).join(","));
    const routeTitle = encodeURIComponent(ROUTE_CARDS[this.data.routeIndex].title);
    wx.navigateTo({
      url: `/pagesTravelAssistant/journey/recommend?selected=${selectedText}&route=${routeTitle}`
    });
  },
  applySelectedState() {
    const selectedMap = {};
    this.data.selectedDestinations.forEach((item) => {
      selectedMap[`${item.routeCode}_${item.name}`] = true;
    });
    const currentRoute = ROUTE_CARDS[this.data.routeIndex];
    const destinationList = currentRoute.items.map((item) => ({
      ...item,
      selected: !!selectedMap[`${currentRoute.code}_${item.name}`]
    }));
    this.setData({
      destinationList
    });
  }
});
