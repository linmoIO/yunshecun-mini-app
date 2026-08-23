! function() {
  "use strict";
  const e = require("./request/request.js"),
    t = require("../utils/request.js"),
    c = require("../utils/config.js");

  const PUBLIC_BASE_URL = c.config.baseUrlmall.replace(/\/api\/?$/, "");

  const HOME_IMG = {
    banner1: PUBLIC_BASE_URL + "/uploads/images/云舍村-苔藓院落.webp",
    banner2: PUBLIC_BASE_URL + "/uploads/images/云舍村-村落风景-03.webp",
    banner3: PUBLIC_BASE_URL + "/uploads/images/云舍村-村落风景-02.webp",
    banner4: PUBLIC_BASE_URL + "/uploads/images/云舍村-泛舟夜景.webp",
    banner5: PUBLIC_BASE_URL + "/uploads/images/云舍村-村落风景-05.webp",
    room: PUBLIC_BASE_URL + "/uploads/images/合院1-室内.jpg",
    embroidery: PUBLIC_BASE_URL + "/uploads/images/非遗-桃源绣.jpg",
    tea: PUBLIC_BASE_URL + "/uploads/images/擂茶宴.jpg",
    farming: PUBLIC_BASE_URL + "/uploads/images/云舍村-稻田耕牛.jpg",
    theatre: PUBLIC_BASE_URL + "/uploads/images/戏楼.jpg"
  };

  function createAd(id, name, fileUrl, path) {
    return {
      id,
      name,
      fileUrl,
      fileType: 1,
      path
    };
  }

  function createHomeFallback() {
    return {
      retVal: [{
        location: 1,
        infos: {
          topCarousel: [
            createAd("home-top-1", "水上泛舟", HOME_IMG.banner4, "/pages/activity-guide/detail?activity=泛舟"),
            createAd("home-top-2", "桃花源·云舍村舍", HOME_IMG.room, "/pagesC/order/hotel?hotelCode=DEMO-HOTEL-YUNSHE")
          ]
        }
      }, {
        location: 2,
        infos: {
          homePageLogin: [
            createAd("home-login-1", "加入云舍村会员，获取到访与活动信息", HOME_IMG.banner1, "/pages/member/memberLogin")
          ]
        }
      }, {
        location: 3,
        infos: {
          homePageIntroduction: [
            createAd("home-what-1", "什么是云舍村", HOME_IMG.banner2, "/pages/scenery/culture-detail")
          ]
        }
      }, {
        location: 4,
        infos: {
          ul: [createAd("dest-ul", "云舍村序章", HOME_IMG.banner1, "/pages/village/detail?part=序章")],
          ur1: [createAd("dest-ur1", "建村与营造", HOME_IMG.banner3, "/pages/village/detail?part=营造")],
          ur2: [createAd("dest-ur2", "东方村落文明", HOME_IMG.banner2, "/pages/village/detail?part=文明")],
          dl1: [createAd("dest-dl1", "村落空间", HOME_IMG.banner4, "/pages/village/detail?part=空间")],
          dl2: [createAd("dest-dl2", "四时景致", HOME_IMG.banner5, "/pages/village/detail?part=四时")],
          dr: [createAd("dest-dr", "村落生活", HOME_IMG.banner3, "/pages/village/detail?part=生活")]
        }
      }, {
        location: 5,
        infos: {
          up: [createAd("hot-up", "水上泛舟", HOME_IMG.banner4, "/pages/activity-guide/detail?activity=泛舟")],
          down1: [createAd("hot-down-1", "桃源绣娘刺绣课程", HOME_IMG.embroidery, "/pages/activity-guide/detail?activity=刺绣")],
          down2: [createAd("hot-down-2", "擂茶与烧烤", HOME_IMG.tea, "/pages/activity-guide/detail?activity=擂茶")],
          down3: [createAd("hot-down-3", "田园耕种", HOME_IMG.farming, "/pages/activity-guide/detail?activity=农事")],
          down4: [createAd("hot-down-4", "戏曲表演", HOME_IMG.theatre, "/pages/activity-guide/detail?activity=戏曲")]
        }
      }, {
        location: 6,
        infos: {
          row1: [createAd("explore-1", "旅行攻略", HOME_IMG.banner2, "/pages/travel/destinations")],
          row2: [createAd("explore-2", "专属旅程", HOME_IMG.banner5, "/pages/trip/index")],
          row3: [createAd("explore-3", "入住指南", HOME_IMG.banner3, "/pages/stay-guide/index")]
        }
      }, {
        location: 7,
        infos: {
          homePageGlobalPopUp: [
            createAd("popup-1", "云舍村", HOME_IMG.banner1, "/pages/scenery/culture-detail"),
            createAd("popup-2", "水溪庭园", HOME_IMG.banner3, "/pages/scenery/culture-detail")
          ].map((e) => ({
            ...e,
            popUpNumber: 1
          }))
        }
      }]
    };
  }

  function createGroundActivitiesFallback() {
    return {
      retVal: [{
        location: 1,
        infos: {
          topCarousel: [
            createAd("ground-top-1", "传统院落", HOME_IMG.banner2, "/pages/scenery/culture-detail"),
            createAd("ground-top-2", "水岸泛舟", HOME_IMG.banner4, "/pages/scenery/culture-detail")
          ]
        }
      }, {
        location: 8,
        infos: {
          homePageGlobalPopUp: [
            createAd("ground-bottom-1", "苔痕庭院", HOME_IMG.banner1, "/pages/scenery/culture-detail"),
            createAd("ground-bottom-2", "水溪庭园", HOME_IMG.banner3, "/pages/scenery/culture-detail")
          ]
        }
      }]
    };
  }

  function buildFallbackAdData(params = {}) {
    return "ON_SITE_ACTIVITIES" === params.pageType ? createGroundActivitiesFallback() : createHomeFallback();
  }

  function createDestinationsSeriesFallback() {
    return [{ productSeriesName: "桃花源·云舍村", productSeriesCode: "taoyuan" }];
  }

  function createDestinationsProductsFallback(params = {}) {
    return [];
  }

  exports.getAdData = async function(e, r) {
    try {
      return await t.request.get("/shopapi/sz/advertisementPage/v2", e, {}, {
        newModel: !0,
        ...r
      });
    } catch (a) {
      return console.warn("[services/home] getAdData fallback:", null == a ? void 0 : a.errMsg), buildFallbackAdData(e);
    }
  }, exports.getDestinationsConfigSeries = async function(t, r) {
    try {
      return await e.request({
        url: "/shop-api/productShelfApp/getProductShelfConfigApp",
        method: "GET",
        params: t,
        ...r,
        showErrorToast: !1
      });
    } catch (o) {
      return console.warn("[services/home] getDestinationsConfigSeries fallback:", null == o ? void 0 : o.message), createDestinationsSeriesFallback();
    }
  }, exports.getDestinationsProductsByTab = async function(t, r) {
    try {
      return await e.request({
        url: "/shop-api/productShelfApp/getProductShelfInfoList",
        method: "POST",
        data: t,
        ...r,
        showErrorToast: !1
      });
    } catch (o) {
      return console.warn("[services/home] getDestinationsProductsByTab fallback:", null == o ? void 0 : o.message), createDestinationsProductsFallback(t);
    }
  }, exports.getSearchHotWordList = function(e, r) {
    return t.request.get("/shopapi/search/getHomeHotWordList", e, {}, {
      newModel: !0,
      ...r
    })
  }, exports.quickSearch = function(e, r) {
    return t.request.post("/shopapi/search/product/title", e, {}, {
      ...r
    })
  }, exports.search = function(e, r) {
    return t.request.post("/shopapi/search/product", e, {}, {
      ...r
    })
  }
}();
