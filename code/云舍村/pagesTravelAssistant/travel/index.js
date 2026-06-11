const TIPS = [{
  title: "出行提示",
  desc: "高原地区昼夜温差较大，请准备保暖外套与防晒用品。"
}, {
  title: "交通安排",
  desc: "机场接送服务请至少提前24小时确认航班信息。"
}, {
  title: "健康建议",
  desc: "初到高海拔地区建议放慢活动节奏，避免剧烈运动。"
}, {
  title: "在地体验",
  desc: "建议预留半天自由时间，体验村落步道与当地手作活动。"
}];

Page({
  data: {
    title: "行程助手",
    subTitle: "出行新思路 · 路线参考",
    cover: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
    tips: TIPS
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
  onCreatePlan() {
    wx.navigateTo({
      url: "/pagesTravelAssistant/journey/edit"
    });
  }
});
