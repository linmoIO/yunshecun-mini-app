const cfg = require('../../utils/config.js');

const BASE = cfg.config.baseUrlmall || '';
const PUBLIC_BASE = BASE.replace(/\/api\/?$/, '');

function assetUrl(value) {
  if (!value || /^https?:\/\//i.test(value)) return value || '';
  return value.indexOf('/') === 0 ? PUBLIC_BASE + value : value;
}

Page({
  data: { loading: true, content: null },

  onLoad() {
    wx.setNavigationBarTitle({ title: '入住指南' });
    this.loadContent();
  },

  loadContent() {
    wx.request({
      url: BASE + '/cms/stay_guide',
      method: 'GET',
      success: ({ data }) => {
        const content = data && data.code === 0 && data.data && data.data.content;
        if (!content || typeof content !== 'object') return;
        this.setData({
          content: {
            ...content,
            heroImage: assetUrl(content.heroImage),
            slides: Array.isArray(content.slides) ? content.slides.map(slide => ({ ...slide, image: assetUrl(slide.image) })) : [],
            highlights: Array.isArray(content.highlights) ? content.highlights : [],
            sections: Array.isArray(content.sections) ? content.sections : [],
            schedules: Array.isArray(content.schedules) ? content.schedules : [],
          },
        });
      },
      complete: () => this.setData({ loading: false }),
    });
  },

  previewImage(event) {
    const current = event.currentTarget.dataset.current;
    const slides = (this.data.content && this.data.content.slides) || [];
    const urls = slides.map(item => item.image).filter(Boolean);
    if (current && urls.length) wx.previewImage({ current, urls });
  },
});
