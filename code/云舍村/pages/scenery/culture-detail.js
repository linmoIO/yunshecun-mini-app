Page({
  data: {
    heroImage: '',
    contentImage: '',
    title: '东方村落文明的一种诠释',
    paragraphs: [
      '村落是我们最早的家园，是扎在大地上最深的根。',
      '作为东方村落文明的一种诠释，云舍村秉承着对中华传统文化的尊崇和极具匠心的追寻，致力于保护和传承东方的村落文明。以陶渊明笔下的《桃花源记》与刘禹锡的《陋室铭》为意境，呈现出千百年来历久弥新的民间工艺与智慧，赋予无尽薪火相传的民间文化遗产以时代价值，使之焕发新生，为当代和未来的造访者再现梦中的世外桃源……',
      '保护与传承东方村落文明是云舍村的出发点和落脚点，也贯穿了村落营造的全过程。',
    ],
    address: '湖南省桃源县桃花源镇桃花源村二组息楼西北方向880米',
    phone: '0736-7070666',
    gallery: [],
  },
  onLoad() {
    const cfg = require('../../utils/config.js');
    const base = cfg.config.baseUrlmall || 'http://localhost:3000/api';
    const publicBase = base.replace(/\/api\/?$/, '');
    const fallback = {
      heroImage: publicBase + '/uploads/images/云舍村-苔藓院落.webp',
      contentImage: publicBase + '/uploads/images/云舍村-青石板古道.jpg',
    };
    this.setData(fallback);
    wx.request({
      url: base + '/cms/culture_intro',
      method: 'GET',
      success: (res) => {
        const content = res.data && res.data.code === 0 && res.data.data && res.data.data.content;
        if (content && typeof content === 'object') {
          this.setData({
            ...content,
            contentImage: content.contentImage || content.image || fallback.contentImage,
            paragraphs: Array.isArray(content.paragraphs) ? content.paragraphs : [],
            gallery: Array.isArray(content.gallery) ? content.gallery : [],
          });
        }
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
