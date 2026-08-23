const cfg = require('../../utils/config.js');

const BASE = cfg.config.baseUrlmall || '';
const PUBLIC_BASE = BASE.replace(/\/api\/?$/, '');

function assetUrl(value) {
  if (!value || /^https?:\/\//i.test(value)) return value || '';
  return value.indexOf('/') === 0 ? PUBLIC_BASE + value : value;
}

Page({
  data: { loading: true, activity: null },

  onLoad(query) {
    this.activityId = query && decodeURIComponent(query.activity || '');
    this.loadActivity();
  },

  loadActivity() {
    wx.request({
      url: BASE + '/cms/activity_guides',
      method: 'GET',
      success: ({ data }) => {
        const content = data && data.code === 0 && data.data && data.data.content;
        const activities = Array.isArray(content) ? content : [];
        const activity = activities.find(item => item.id === this.activityId) || null;
        if (!activity) return;
        this.setData({
          activity: {
            ...activity,
            image: assetUrl(activity.image),
            details: Array.isArray(activity.details) ? activity.details : [],
          },
        });
        wx.setNavigationBarTitle({ title: activity.title || '云舍村活动' });
      },
      complete: () => this.setData({ loading: false }),
    });
  },

  openGuide() {
    wx.navigateTo({ url: '/pages/stay-guide/index' });
  },
});
