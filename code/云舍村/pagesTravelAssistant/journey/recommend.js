const RECOMMEND_LIST = [{
  id: "plan-1",
  image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg",
  title: "香格里拉环线｜回到远方的家 6晚7天",
  subTitle: "丽江2晚-塔城2晚-香格里拉（绿谷）2晚",
  desc: "从自古便是茶马古道重镇的丽江出发，经过物产丰饶的恬静村庄塔城，最终抵达香格里拉。",
  tags: ["旅行", "云舍经典", "在地生活"],
  price: "¥17000 /人起"
}, {
  id: "plan-2",
  image: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
  title: "梅里环线｜雪山与秘境 6晚7天",
  subTitle: "石月亮2晚-茨中2晚-梅里-香格里拉",
  desc: "从云南最后的秘境怒江大峡谷出发，穿越孔雀山，见证梅里雪山与澜沧江同框绝景。",
  tags: ["旅行", "秘境探索"],
  price: "¥16000 /人起"
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
