const { request } = require("./request");
const {
  heroBanners,
  destinationTabs,
  routeTabs,
  activities,
  getActivityById,
  getActivitiesByRoute,
  getDestinationsByKey,
  getFeaturedPackages,
} = require("./activityData");

// 预留后端接口：后端上线后将该开关改为 true 即可切换
const USE_REMOTE_ACTIVITY_API = false;

const ACTIVITY_ENDPOINTS = {
  home: "/applet/activity/home",
  list: "/applet/activity/list",
  detail: "/applet/activity/detail",
  subscribe: "/applet/activity/subscribe",
};

function filterActivities(routeKey = "all", keyword = "") {
  const routeFiltered = getActivitiesByRoute(routeKey);
  const kw = (keyword || "").trim().toLowerCase();
  if (!kw) {
    return routeFiltered;
  }
  return routeFiltered.filter((item) => {
    const source = [item.title, item.destination, item.shortDesc, ...(item.tags || [])]
      .join(" ")
      .toLowerCase();
    return source.includes(kw);
  });
}

async function getHomeActivityData() {
  if (USE_REMOTE_ACTIVITY_API) {
    try {
      const res = await request({
        path: ACTIVITY_ENDPOINTS.home,
        method: "GET",
      });
      if (res.code === "0" && res.data) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const noticeRes = await request({
      path: "/applet/home/notice",
      method: "GET",
    });
    return {
      heroBanners,
      destinationTabs,
      destinationCards: getDestinationsByKey("all"),
      featuredPackages: getFeaturedPackages(),
      notices:
        noticeRes.code === "0" && Array.isArray(noticeRes.data)
          ? noticeRes.data.slice(0, 3)
          : [],
    };
  } catch (error) {
    console.log(error);
    return {
      heroBanners,
      destinationTabs,
      destinationCards: getDestinationsByKey("all"),
      featuredPackages: getFeaturedPackages(),
      notices: [],
    };
  }
}

// 将后端产品格式转换为页面所需格式
function convertBackendProducts(list, routeKey, keyword) {
  const DEST_NAME = {
    meili: "梅里环线", lhasa: "拉萨环线", lasa: "拉萨环线",
    "shangri-la": "香格里拉环线", glacier: "冰川环线",
  };
  const kw = (keyword || "").trim().toLowerCase();
  return list
    .filter(p => {
      if (routeKey && routeKey !== "all" && p.destination !== routeKey) return false;
      if (kw) {
        const src = [p.title, p.subtitle, p.description, p.destination].join(" ").toLowerCase();
        return src.includes(kw);
      }
      return true;
    })
    .map(p => ({
      id: p.productCode || String(p.id),
      routeKey: p.destination || "all",
      title: p.title || "",
      destination: DEST_NAME[p.destination] || p.destination || "",
      days: p.duration ? `${p.duration}天` : "",
      shortDesc: p.subtitle || p.description || "",
      priceFrom: p.price || 0,
      cover: p.coverImage || "",
      tags: Array.isArray(p.tags) ? p.tags : [],
      // 保留跳转所需字段
      productCode: p.productCode,
      category: p.category,
    }));
}

async function getActivityListData({ routeKey = "all", keyword = "" } = {}) {
  try {
    // 拉后端上架产品（旅游 + 酒店）
    const res = await request.post("/shopapi/sz/travelProductList", { pageNum: 1, pageSize: 100 });
    const backendList = res && (res.data?.list || res.retVal || []);
    if (Array.isArray(backendList) && backendList.length > 0) {
      const all = convertBackendProducts(backendList, routeKey, keyword);
      return {
        routeTabs,                        // 导航条保持原样
        galleryItems: all.slice(0, 3),    // 顶部画廊用真实产品
        activities: all,
      };
    }
  } catch (error) {
    console.log("[getActivityListData] 后端请求失败，使用本地数据:", error);
  }

  // 后端无数据时降级到本地硬编码
  return {
    routeTabs,
    galleryItems: activities.slice(0, 3),
    activities: filterActivities(routeKey, keyword),
  };
}

async function getActivityDetailData(id) {
  if (USE_REMOTE_ACTIVITY_API) {
    try {
      const res = await request({
        path: ACTIVITY_ENDPOINTS.detail,
        method: "GET",
        data: { id },
      });
      if (res.code === "0" && res.data) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return getActivityById(id);
}

async function subscribeActivityNotice(payload = {}) {
  if (USE_REMOTE_ACTIVITY_API) {
    return request({
      path: ACTIVITY_ENDPOINTS.subscribe,
      method: "POST",
      data: payload,
    });
  }
  return Promise.resolve({ code: "0", msg: "ok" });
}

module.exports = {
  USE_REMOTE_ACTIVITY_API,
  ACTIVITY_ENDPOINTS,
  getHomeActivityData,
  getActivityListData,
  getActivityDetailData,
  subscribeActivityNotice,
};
