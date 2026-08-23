const cfg = require('../../utils/config.js');

const BASE = cfg.config.baseUrlmall || '';
const PUBLIC_BASE = BASE.replace(/\/api\/?$/, '');

function assetUrl(value) {
  if (!value || /^https?:\/\//i.test(value)) return value || '';
  return value.indexOf('/') === 0 ? PUBLIC_BASE + value : value;
}

Page({
  data: { loading: true, part: null },

  onLoad(query) {
    this.partId = query && query.part;
    this.loadContent();
  },

  loadContent() {
    wx.request({
      url: BASE + '/cms/village_story',
      method: 'GET',
      success: ({ data }) => {
        const content = data && data.code === 0 && data.data && data.data.content;
        const part = content && Array.isArray(content.parts)
          ? content.parts.find(item => item.id === this.partId) || content.parts[0]
          : null;
        if (!part) return;
        const visuals = Array.isArray(part.visuals)
          ? part.visuals.map(item => ({ ...item, image: assetUrl(item.image) }))
          : (part.pages || []).map(image => ({ image: assetUrl(image), caption: '' }));
        const usableVisuals = visuals.length ? visuals : [{ image: assetUrl(part.cover), caption: '' }];
        const blocks = [];
        const paragraphs = Array.isArray(part.paragraphs) ? part.paragraphs : [];
        paragraphs.forEach((value, index) => {
          blocks.push({ type: 'text', value });
          if (usableVisuals.length && (index % 2 === 1 || index === paragraphs.length - 1)) {
            const image = usableVisuals[Math.min(Math.floor(index / 2), usableVisuals.length - 1)];
            blocks.push({ type: 'image', value: image });
          }
        });
        if (!paragraphs.length) usableVisuals.forEach(value => blocks.push({ type: 'image', value }));
        this.setData({
          part: {
            ...part,
            cover: assetUrl(part.cover),
            paragraphs: Array.isArray(part.paragraphs) ? part.paragraphs : [],
            visuals: usableVisuals,
            blocks,
          },
        });
        wx.setNavigationBarTitle({ title: part.title || '云舍村' });
      },
      complete: () => this.setData({ loading: false }),
    });
  },

  previewImage(event) {
    const current = event.currentTarget.dataset.current;
    const urls = ((this.data.part && this.data.part.visuals) || []).map(item => item.image);
    if (current && urls.length) wx.previewImage({ current, urls });
  },

});
