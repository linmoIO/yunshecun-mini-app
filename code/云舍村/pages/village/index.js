const cfg = require('../../utils/config.js');

const BASE = cfg.config.baseUrlmall || '';
const PUBLIC_BASE = BASE.replace(/\/api\/?$/, '');

function assetUrl(value) {
  if (!value || /^https?:\/\//i.test(value)) return value || '';
  return value.indexOf('/') === 0 ? PUBLIC_BASE + value : value;
}

Page({
  data: {
    loading: true,
    title: '探索云舍村',
    subtitle: '',
    heroImage: '',
    intro: '',
    parts: [],
    contact: {},
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '探索云舍村' });
    this.loadContent();
  },

  loadContent() {
    wx.request({
      url: BASE + '/cms/village_story',
      method: 'GET',
      success: ({ data }) => {
        const content = data && data.code === 0 && data.data && data.data.content;
        if (!content || typeof content !== 'object') return;
        this.setData({
          title: content.title || '探索云舍村',
          subtitle: content.subtitle || '',
          heroImage: assetUrl(content.heroImage),
          intro: content.intro || '',
          parts: Array.isArray(content.parts) ? content.parts.map((part, index) => ({
            ...part,
            displayIndex: String(index + 1).padStart(2, '0'),
            cover: assetUrl(part.cover),
          })) : [],
          contact: content.contact || {},
        });
      },
      complete: () => this.setData({ loading: false }),
    });
  },

  openPart(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/village/detail?part=${encodeURIComponent(id)}` });
  },

  callPhone() {
    const phone = String(this.data.contact.phone || '').replace(/[^0-9+]/g, '');
    if (!phone) return wx.showToast({ title: '暂无咨询电话', icon: 'none' });
    wx.makePhoneCall({ phoneNumber: phone, fail: () => wx.showToast({ title: '暂无法拨打，请稍后重试', icon: 'none' }) });
  },
});
