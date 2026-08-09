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
    banner5: PUBLIC_BASE_URL + "/uploads/images/云舍村-村落风景-05.webp"
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
            createAd("home-top-1", "桃花源·云舍村", HOME_IMG.banner2, "/pages/scenery/culture-detail"),
            createAd("home-top-2", "湖湘民居与庭院", HOME_IMG.banner2, "/pages/scenery/culture-detail"),
            createAd("home-top-3", "水岸泛舟", HOME_IMG.banner4, "/pages/scenery/culture-detail")
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
          ul: [createAd("dest-ul", "归居院落", HOME_IMG.banner1, "/pages/scenery/culture-detail")],
          ur1: [createAd("dest-ur1", "溪畔漫游", HOME_IMG.banner3, "/pages/scenery/culture-detail")],
          ur2: [createAd("dest-ur2", "传统院落", HOME_IMG.banner2, "/pages/scenery/culture-detail")],
          dl1: [createAd("dest-dl1", "水岸泛舟", HOME_IMG.banner4, "/pages/scenery/culture-detail")],
          dl2: [createAd("dest-dl2", "雨后青石板路", HOME_IMG.banner5, "/pages/scenery/culture-detail")],
          dr: [createAd("dest-dr", "水溪庭园", HOME_IMG.banner3, "/pages/scenery/culture-detail")]
        }
      }, {
        location: 5,
        infos: {
          up: [createAd("hot-up", "水溪与庭园", HOME_IMG.banner3, "/pages/scenery/culture-detail")],
          down1: [createAd("hot-down-1", "雨后青石板路", HOME_IMG.banner5, "/pages/scenery/culture-detail")],
          down2: [createAd("hot-down-2", "传统院落", HOME_IMG.banner2, "/pages/scenery/culture-detail")],
          down3: [createAd("hot-down-3", "水岸泛舟", HOME_IMG.banner4, "/pages/scenery/culture-detail")],
          down4: [createAd("hot-down-4", "苔痕庭院", HOME_IMG.banner1, "/pages/scenery/culture-detail")]
        }
      }, {
        location: 6,
        infos: {
          row1: [createAd("explore-1", "旅行攻略", HOME_IMG.banner2, "/pages/travel/destinations")],
          row2: [createAd("explore-2", "专属旅程", HOME_IMG.banner5, "/pages/trip/index")],
          row3: [createAd("explore-3", "行程助手", HOME_IMG.banner3, "/pages/guide/guide")]
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
