// 在地体验页：当前节气（二十四节气·东方村落文明）与推荐行程，内容来自 CMS
const cfg = require('../../utils/config.js');
const { findCurrentTerm } = require('../../utils/solarTerm.js');

const BASE = cfg.config.baseUrlmall || '';

function getCms(pageCode) {
  return new Promise(resolve => {
    wx.request({
      url: `${BASE}/cms/${pageCode}`,
      method: 'GET',
      success: ({ data }) => resolve(data && data.code === 0 && data.data && data.data.content && typeof data.data.content === 'object' ? data.data.content : null),
      fail: () => resolve(null),
    });
  });
}

Component({
  data: { term: null, nextTerm: null, itineraries: [] },

  lifetimes: {
    attached() {
      this.load();
    },
  },

  methods: {
    async load() {
      const [trip, solar] = await Promise.all([getCms('trip_itineraries'), getCms('solar_terms')]);
      const { current, next } = findCurrentTerm(solar && Array.isArray(solar.terms) ? solar.terms : []);
      const itineraries = (trip && Array.isArray(trip.itineraries) ? trip.itineraries : []).map(item => ({
        id: item.id,
        title: item.title || '',
        // 标题已包含天数和季节（如“云舍村春·秋 2天1晚”），副行改为展示行程亮点标签
        meta: (Array.isArray(item.tags) ? item.tags : []).slice(0, 3).join(' · '),
        cover: item.cover ? `${item.cover}?imageMogr2/thumbnail/600x` : '',
      }));
      this.setData({ term: current, nextTerm: next, itineraries });
    },

    openTerms() {
      wx.navigateTo({ url: '/pages/solar-terms/index' });
    },

    openItinerary(e) {
      const { id } = e.currentTarget.dataset;
      if (id) wx.navigateTo({ url: `/pages/itinerary/detail?id=${encodeURIComponent(id)}` });
    },
  },
});
