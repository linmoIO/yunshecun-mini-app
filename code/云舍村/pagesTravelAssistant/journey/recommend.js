const cfg = require('../../utils/config.js');
const PUBLIC_BASE_URL = (cfg.config.baseUrlmall || 'http://localhost:3000/api').replace(/\/api\/?$/, '');
const image = (name) => `${PUBLIC_BASE_URL}/uploads/images/${name}`;

const RECOMMEND_LIST = [{
  id: "plan-1",
  image: image('云舍村-村落风景-03.webp'),
  title: "云舍村归居两日",
  subTitle: "传统院落-村落漫游-茶事与地方风味",
  desc: "走进青石板路串联的湖湘院落，在村落日常中慢下来。",
  tags: ["归居院落", "村落漫游", "地方风味"],
  price: "以预约确认信息为准"
}, {
  id: "plan-2",
  image: image('云舍村-村落风景-04.webp'),
  title: "东方村落文化一日",
  subTitle: "湖湘民居-桃源绣-擂茶",
  desc: "从传统建筑、园林到民间手艺，感受东方村落文明的日常表达。",
  tags: ["湖湘民居", "桃源绣", "擂茶"],
  price: "以预约确认信息为准"
}];

Page({
  data: {
    routeTitle: "",
    selectedText: "",
    recommendList: RECOMMEND_LIST
  },
  onLoad(options) {
    this.setData({
      routeTitle: decodeURIComponent((options && options.route) || ""),
      selectedText: decodeURIComponent((options && options.selected) || "")
    });
  },
  onBack() {
    wx.navigateBack({
      fail() {
        wx.reLaunch({
          url: "/pagesTravelAssistant/journey/destination"
        });
      }
    });
  },
  onSkip() {
    wx.navigateTo({
      url: "/pagesTravelAssistant/plan/detail?fromType=create"
    });
  },
  onOpenPlan(e) {
    const index = Number(e.currentTarget.dataset.index || 0);
    const item = this.data.recommendList[index];
    wx.navigateTo({
      url: `/pagesTravelAssistant/plan/detail?fromType=recommend&planTitle=${encodeURIComponent(item.title)}&planId=${item.id}`
    });
  }
});
