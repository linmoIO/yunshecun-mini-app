// 二十四节气·东方村落文明活动：内容来自 CMS solar_terms（deploy/导入在地体验内容.js 写入）
const cfg = require('../../utils/config.js');
const { findCurrentTerm } = require('../../utils/solarTerm.js');

const BASE = cfg.config.baseUrlmall || '';

Page({
  data: { loading: true, intro: '', daily: [], months: [], expanded: {} },

  onLoad() {
    this.load();
  },

  load() {
    wx.request({
      url: `${BASE}/cms/solar_terms`,
      method: 'GET',
      success: ({ data }) => {
        const content = data && data.code === 0 && data.data && data.data.content;
        const terms = content && Array.isArray(content.terms) ? content.terms : [];
        if (!terms.length) return;
        const { current } = findCurrentTerm(terms);
        const months = [];
        terms.forEach((term, index) => {
          let group = months[months.length - 1];
          if (!group || group.month !== term.month) {
            group = { month: term.month, terms: [] };
            months.push(group);
          }
          group.terms.push({ ...term, key: `t${index}`, isCurrent: !!current && term.name === current.name });
        });
        this.setData({
          intro: content.intro || '',
          daily: Array.isArray(content.daily) ? content.daily : [],
          months,
        }, () => {
          const target = months.reduce((all, m) => all.concat(m.terms), []).find(t => t.isCurrent);
          if (target) setTimeout(() => wx.pageScrollTo({ selector: `#${target.key}`, offsetTop: -16, duration: 300 }), 300);
        });
      },
      complete: () => this.setData({ loading: false }),
    });
  },

  toggleNote(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [`expanded.${key}`]: !this.data.expanded[key] });
  },

  onShareAppMessage() {
    return { title: '二十四节气 · 东方村落文明', path: '/pages/solar-terms/index' };
  },
});
