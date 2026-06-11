const ROUTE_CARDS = [{
  code: "shangri-la",
  title: "香格里拉环线",
  desc: "香格里拉，云舍村的故事和起点。",
  image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-1.jpg",
  items: [{
    name: "丽江和香格里拉",
    desc: "丽江和香格里拉是滇西北的重要门户，也是探索者的大本营。",
    image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg"
  }, {
    name: "塔城",
    desc: "位于金沙江畔山峦间的塔城，是滇西北物产丰饶的鱼米乡。",
    image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-3.jpg"
  }, {
    name: "亚丁",
    desc: "仙乃日、央迈勇和夏诺多吉三座神山脚下，是旷世奇作。",
    image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg"
  }]
}, {
  code: "meili",
  title: "梅里环线",
  desc: "三江并流地理奇观，亚洲最迷人的地区之一。",
  image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-5.jpg",
  items: [{
    name: "梅里雪山",
    desc: "从金沙江河谷中的小镇奔子栏到令人神往的梅里雪山。",
    image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-5.jpg"
  }, {
    name: "怒江",
    desc: "怒江大峡谷，秘境中的秘境，云雾缭绕的原始山谷。",
    image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg"
  }]
}, {
  code: "lhasa",
  title: "拉萨环线",
  desc: "西藏经典，满足人们对西藏的所有想象。",
  image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
  items: [{
    name: "拉萨",
    desc: "圣城拉萨，信仰与历史交汇的高原之城。",
    image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-3.jpg"
  }, {
    name: "林芝",
    desc: "雪山森林与峡谷河流，四季风光各具层次。",
    image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-1.jpg"
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
