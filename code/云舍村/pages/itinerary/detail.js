// 推荐行程详情：内容来自 CMS trip_itineraries（deploy/导入在地体验内容.js 写入）
const cfg = require('../../utils/config.js');

const BASE = cfg.config.baseUrlmall || '';

Page({
  data: { loading: true, itinerary: null, notice: '', phone: '', bookPath: '' },

  onLoad(query) {
    this.itineraryId = decodeURIComponent((query && query.id) || '');
    this.load();
  },

  load() {
    wx.request({
      url: `${BASE}/cms/trip_itineraries`,
      method: 'GET',
      success: ({ data }) => {
        const content = data && data.code === 0 && data.data && data.data.content;
        const list = content && Array.isArray(content.itineraries) ? content.itineraries : [];
        const itinerary = list.find(item => item.id === this.itineraryId);
        if (!itinerary) return;
        this.setData({
          itinerary: {
            ...itinerary,
            cover: itinerary.cover ? `${itinerary.cover}?imageMogr2/thumbnail/1200x` : '',
            meta: [itinerary.duration, itinerary.season].filter(Boolean).join(' · '),
            tags: Array.isArray(itinerary.tags) ? itinerary.tags : [],
            days: Array.isArray(itinerary.days) ? itinerary.days : [],
          },
          notice: content.notice || '',
          phone: content.phone || '',
          bookPath: content.bookPath || '',
        });
        wx.setNavigationBarTitle({ title: itinerary.title || '推荐行程' });
      },
      complete: () => this.setData({ loading: false }),
    });
  },

  callButler() {
    if (this.data.phone) wx.makePhoneCall({ phoneNumber: this.data.phone });
  },

  book() {
    if (this.data.bookPath) wx.navigateTo({ url: this.data.bookPath });
  },

  onShareAppMessage() {
    const { itinerary } = this.data;
    return {
      title: itinerary ? itinerary.title : '云舍村推荐行程',
      path: `/pages/itinerary/detail?id=${encodeURIComponent(this.itineraryId || '')}`,
    };
  },
});
