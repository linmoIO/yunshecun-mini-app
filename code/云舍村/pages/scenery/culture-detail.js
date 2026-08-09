Page({
  data: {
    heroImage: '',
    contentImage: '',
    title: '这里是云舍村',
    paragraphs: [
      '云舍村位于湖南省桃源县西南水溪附近，是以湖湘传统村落为意境营造的归居式村落。',
      '村内六十余栋院落掩映于茂林修竹之间，青石板路、溪流、园林与传统民居共同构成一处可居、可游、可感知的东方村落空间。',
    ],
    address: '湖南省常德市桃花源风景区',
    phone: '0736-7070666',
    gallery: [],
  },
  onLoad() {
    const cfg = require('../../utils/config.js');
    const base = cfg.config.baseUrlmall || 'http://localhost:3000/api';
    const publicBase = base.replace(/\/api\/?$/, '');
    const fallback = {
      heroImage: publicBase + '/images/云舍村-苔藓院落.webp',
      contentImage: publicBase + '/images/云舍村-村落风景-02.webp',
    };
    this.setData(fallback);
    wx.request({
      url: base + '/cms/culture_intro',
      method: 'GET',
      success: (res) => {
        const content = res.data && res.data.code === 0 && res.data.data && res.data.data.content;
        if (content && typeof content === 'object') this.setData(content);
      },
    });
  },
  makePhoneCall() {
    wx.makePhoneCall({ phoneNumber: this.data.phone });
  },
  onShareAppMessage() {
    return {
      title: "什么是云舍村",
      path: "/pages/scenery/culture-detail"
    };
  }
});
