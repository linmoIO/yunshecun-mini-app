const heroBanners = [
  {
    id: "spring-kunming",
    title: "开启春日漫游",
    subtitle: "慢赏昆明春光与美食",
    cta: "点击查看",
    image:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-1.jpg",
    activityId: "kunming-3d2n",
  },
  {
    id: "shangri-la",
    title: "云舍度假 畅享愈时光",
    subtitle: "即日起至3月31日，香格里拉限时产品",
    cta: "限时订阅",
    image:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-3.jpg",
    activityId: "shangri-la-5d4n",
  },
  {
    id: "meili",
    title: "梅里环线 转山寻脉",
    subtitle: "葡萄酒之旅 5晚6天",
    cta: "进入画廊",
    image:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg",
    activityId: "meili-6d5n",
  },
];

const destinationTabs = [
  { key: "all", name: "全部目的地" },
  { key: "meili", name: "梅里环线" },
  { key: "lhasa", name: "拉萨环线" },
  { key: "shangri-la", name: "香格里拉环线" },
];

const destinations = [
  {
    id: "dest-kunming",
    key: "all",
    name: "春城漫游",
    subtitle: "滇池落日与城市慢行",
    image:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
    activityId: "kunming-3d2n",
  },
  {
    id: "dest-meili",
    key: "meili",
    name: "梅里转山",
    subtitle: "雪山与村落的共鸣",
    image:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg",
    activityId: "meili-6d5n",
  },
  {
    id: "dest-lhasa",
    key: "lhasa",
    name: "拉萨环线",
    subtitle: "高原城市的沉浸旅居",
    image:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-5.jpg",
    activityId: "lhasa-5d4n",
  },
  {
    id: "dest-shangri-la",
    key: "shangri-la",
    name: "香格里拉之门",
    subtitle: "云舍度假 4晚5天",
    image:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-3.jpg",
    activityId: "shangri-la-5d4n",
  },
  {
    id: "dest-food",
    key: "all",
    name: "美食与佳酿",
    subtitle: "深度漫游云南风土",
    image:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-1.jpg",
    activityId: "kunming-3d2n",
  },
];

const routeTabs = [
  { key: "all", name: "全部目的地" },
  { key: "meili", name: "梅里环线" },
  { key: "lhasa", name: "拉萨环线" },
  { key: "shangri-la", name: "香格里拉环线" },
];

const activities = [
  {
    id: "shangri-la-5d4n",
    routeKey: "shangri-la",
    title: "云舍度假 | 推开香巴拉之门 4晚5天",
    destination: "香格里拉",
    days: "4晚5天",
    shortDesc:
      "以云舍村主题酒店为据点，完成一场关于雪山云海、藏地文化与自我修复的深度旅程。",
    priceFrom: 16800,
    tags: ["旅行", "云舍经典", "目的地套餐"],
    heroNotice: "订阅活动通知",
    cover:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-3.jpg",
    gallery: [
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-3.jpg",
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-5.jpg",
    ],
    scheduleDates: [
      { date: "03/26", weekday: "周四", price: 16800, soldOut: false },
      { date: "03/27", weekday: "周五", price: 16800, soldOut: false },
      { date: "03/29", weekday: "周日", price: 20000, soldOut: false },
      { date: "03/30", weekday: "周一", price: 21200, soldOut: false },
    ],
    packages: [
      {
        id: "pkg-shangri-la-a",
        name: "目的地套餐·圣湖巡游",
        summary: "身心涤净之旅（夏季）",
        nights: 4,
        days: 5,
        price: 18800,
      },
      {
        id: "pkg-shangri-la-b",
        name: "目的地套餐·雪山徒步",
        summary: "探索香巴拉秘境",
        nights: 4,
        days: 5,
        price: 19800,
      },
    ],
    highlights: [
      {
        title: "五元素能量觉醒",
        description: "从山水、风土与饮食入手，让节奏慢下来，找回稳定与清醒。",
        image:
          "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-1.jpg",
      },
      {
        title: "深度探索香巴拉智慧",
        description: "在藏地叙事和地方生活之间切换视角，重新理解旅行的意义。",
        image:
          "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg",
      },
    ],
    detail:
      "你将进入一个慢节奏的高原叙事场，日程围绕自然体验、在地酒店活动和当地文化展开。每一天都保留自由时段，保证弹性。",
    notices: [
      "每套可供2人使用，不支持与陌生人拼团。",
      "价格包含行程内酒店住宿、活动体验与指定餐食。",
      "出发前48小时可免费改签1次，具体以客服确认信息为准。",
    ],
    qa: [
      { q: "是否适合首次高原旅行？", a: "适合，行程已包含海拔适应节奏与休整安排。" },
      { q: "是否提供接送服务？", a: "支持指定机场接送，需在下单后补充航班信息。" },
    ],
  },
  {
    id: "meili-6d5n",
    routeKey: "meili",
    title: "梅里环线 | 转山寻脉：葡萄酒之旅 5晚6天",
    destination: "梅里环线",
    days: "5晚6天",
    shortDesc:
      "沿着雪山与河谷前行，体验山地风土、在地酒庄和藏地村落的层次变化。",
    priceFrom: 14200,
    tags: ["旅行", "在地风味", "Fun探玩"],
    heroNotice: "订阅活动通知",
    cover:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg",
    gallery: [
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg",
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-1.jpg",
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
    ],
    scheduleDates: [
      { date: "04/11", weekday: "周六", price: 14200, soldOut: false },
      { date: "04/18", weekday: "周六", price: 14600, soldOut: false },
      { date: "04/30", weekday: "周四", price: 15600, soldOut: false },
    ],
    packages: [
      {
        id: "pkg-meili-a",
        name: "环线套餐·酒庄探索",
        summary: "葡萄酒与雪山景观",
        nights: 5,
        days: 6,
        price: 14200,
      },
    ],
    highlights: [
      {
        title: "高原酒庄沉浸体验",
        description: "由在地酿造师带领，感受海拔与风土如何改变酒体结构。",
        image:
          "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
      },
    ],
    detail:
      "行程串联了梅里雪山观景点、葡萄酒庄园和村落街巷，适合喜欢自然与风味叙事的人群。",
    notices: [
      "套餐含5晚住宿与日间活动。",
      "部分徒步路段建议穿着防滑鞋。",
    ],
    qa: [{ q: "适合亲子吗？", a: "建议8岁以上儿童参加，部分路段有轻度体力要求。" }],
  },
  {
    id: "lhasa-5d4n",
    routeKey: "lhasa",
    title: "拉萨环线 | 城市与圣湖 4晚5天",
    destination: "拉萨环线",
    days: "4晚5天",
    shortDesc:
      "城市漫游与圣湖景观结合，平衡文化参访、自然观景与自由活动时间。",
    priceFrom: 15800,
    tags: ["旅行", "酒店", "目的地套餐"],
    heroNotice: "订阅活动通知",
    cover:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-5.jpg",
    gallery: [
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-5.jpg",
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-3.jpg",
    ],
    scheduleDates: [{ date: "05/03", weekday: "周日", price: 15800, soldOut: false }],
    packages: [
      {
        id: "pkg-lhasa-a",
        name: "拉萨套餐·圣湖静修",
        summary: "在地文化与湖区体验",
        nights: 4,
        days: 5,
        price: 15800,
      },
    ],
    highlights: [
      {
        title: "城市文化路线",
        description: "聚焦经典文化点位与在地生活场景。",
        image:
          "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-3.jpg",
      },
    ],
    detail: "适合首次拉萨旅行用户，节奏舒缓，兼顾深度与舒适性。",
    notices: ["入住前请确认有效身份证件信息。"],
    qa: [{ q: "可以单人报名吗？", a: "支持单人报名，默认安排单间差。" }],
  },
  {
    id: "kunming-3d2n",
    routeKey: "all",
    title: "昆明 | 初遇春城 3晚4天",
    destination: "昆明",
    days: "3晚4天",
    shortDesc: "在春城完成一次轻量的城市漫游，兼顾花市、美食与山水近郊体验。",
    priceFrom: 9800,
    tags: ["旅行", "城市漫游"],
    heroNotice: "订阅活动通知",
    cover:
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-1.jpg",
    gallery: [
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-1.jpg",
      "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
    ],
    scheduleDates: [
      { date: "04/25", weekday: "周六", price: 9800, soldOut: false },
      { date: "05/01", weekday: "周五", price: 10800, soldOut: false },
    ],
    packages: [
      {
        id: "pkg-kunming-a",
        name: "春城套餐·美食与花事",
        summary: "城市漫游与近郊体验",
        nights: 3,
        days: 4,
        price: 9800,
      },
    ],
    highlights: [
      {
        title: "春日花事路线",
        description: "围绕花市与城市街区展开，适合轻量化出行。",
        image:
          "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
      },
    ],
    detail: "更轻量的旅行产品，适合作为节假日短途目的地。",
    notices: ["可在支付前联系顾问调整出发日期。"],
    qa: [{ q: "是否可加订酒店？", a: "支持加订，提交后由顾问联系确认。" }],
  },
];

function getActivityById(id) {
  return activities.find((item) => item.id === id) || activities[0];
}

function getActivitiesByRoute(routeKey) {
  if (!routeKey || routeKey === "all") {
    return activities;
  }
  return activities.filter((item) => item.routeKey === routeKey);
}

function getDestinationsByKey(key) {
  if (!key || key === "all") {
    return destinations;
  }
  return destinations.filter((item) => item.key === key);
}

function getFeaturedPackages() {
  return activities.slice(0, 3).map((activity) => ({
    id: activity.id,
    title: activity.title,
    summary: activity.shortDesc,
    priceFrom: activity.priceFrom,
    image: activity.cover,
  }));
}

module.exports = {
  heroBanners,
  destinationTabs,
  destinations,
  routeTabs,
  activities,
  getActivityById,
  getActivitiesByRoute,
  getDestinationsByKey,
  getFeaturedPackages,
};
