! function() {
  "use strict";
  const e = require("./request/request.js"),
    t = require("../utils/request.js");

  const HOME_IMG = {
    banner1: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-1.jpg",
    banner2: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-2.jpg",
    banner3: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-3.jpg",
    banner4: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-4.jpg",
    banner5: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/homeDetailList-bg-5.jpg"
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
            createAd("home-top-1", "冰川环线", HOME_IMG.banner2, "/pagesB/travel/theme?tab=meili"),
            createAd("home-top-2", "五一避峰", HOME_IMG.banner3, "/pages/travel/destinations"),
            createAd("home-top-3", "低海拔云南春天", HOME_IMG.banner4, "/pagesB/travel/theme?tab=shangri-la")
          ]
        }
      }, {
        location: 2,
        infos: {
          homePageLogin: [
            createAd("home-login-1", "加入云舍村会员，尊享专享折扣", HOME_IMG.banner1, "/pages/member/memberLogin")
          ]
        }
      }, {
        location: 3,
        infos: {
          homePageIntroduction: [
            createAd("home-what-1", "什么是云舍村", "https://songtsam-internal-static.oss-cn-chengdu.aliyuncs.com/mobile/assets/h5/culture/what-is-songtsam-banner.jpg", "/pages/scenery/culture-detail")
          ]
        }
      }, {
        location: 4,
        infos: {
          ul: [createAd("dest-ul", "2026会员季焕新", HOME_IMG.banner1, "/pages/travel/destinations")],
          ur1: [createAd("dest-ur1", "昆明度假上新", HOME_IMG.banner3, "/pages/travel/destinations")],
          ur2: [createAd("dest-ur2", "户外徒步", HOME_IMG.banner2, "/pages/travel/destinations")],
          dl1: [createAd("dest-dl1", "高原杜鹃季", HOME_IMG.banner4, "/pages/travel/destinations")],
          dl2: [createAd("dest-dl2", "云南低海拔春天", HOME_IMG.banner5, "/pages/travel/destinations")],
          dr: [createAd("dest-dr", "五一避开人潮", HOME_IMG.banner3, "/pages/travel/destinations")]
        }
      }, {
        location: 5,
        infos: {
          up: [createAd("hot-up", "新手攻略第一次来云舍村怎么选", HOME_IMG.banner3, "/pagesB/travel/theme?tab=meili")],
          down1: [createAd("hot-down-1", "旅行历", HOME_IMG.banner5, "/pagesB/travel/theme?tab=lhasa")],
          down2: [createAd("hot-down-2", "马背上的云舍", HOME_IMG.banner2, "/pagesB/travel/theme?tab=shangri-la")],
          down3: [createAd("hot-down-3", "昆明citywalk", HOME_IMG.banner4, "/pages/travel/destinations")],
          down4: [createAd("hot-down-4", "银发族", HOME_IMG.banner1, "/pages/travel/destinations")]
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
            createAd("popup-1", "会员季礼金", HOME_IMG.banner1, "/pages/travel/destinations"),
            createAd("popup-2", "五一长假限定活动", HOME_IMG.banner3, "/pages/travel/destinations")
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
            createAd("ground-top-1", "在地体验精选", HOME_IMG.banner2, "/pages/travel/destinations"),
            createAd("ground-top-2", "轻徒步与手作体验", HOME_IMG.banner4, "/pages/travel/destinations")
          ]
        }
      }, {
        location: 8,
        infos: {
          homePageGlobalPopUp: [
            createAd("ground-bottom-1", "在地活动推荐", HOME_IMG.banner1, "/pages/travel/destinations"),
            createAd("ground-bottom-2", "更多活动", HOME_IMG.banner3, "/pages/travel/destinations")
          ]
        }
      }]
    };
  }

  function buildFallbackAdData(params = {}) {
    return "ON_SITE_ACTIVITIES" === params.pageType ? createGroundActivitiesFallback() : createHomeFallback();
  }

  function createDestinationsSeriesFallback() {
    return [{
      productSeriesName: "梅里环线",
      productSeriesCode: "meili"
    }, {
      productSeriesName: "拉萨环线",
      productSeriesCode: "lasa"
    }, {
      productSeriesName: "香格里拉环线",
      productSeriesCode: "shangri-la"
    }, {
      productSeriesName: "冰川环线",
      productSeriesCode: "glacier"
    }];
  }

  function createDestinationsProductsFallback(params = {}) {
    const seriesCode = params.productSeriesCode || "meili";
    const seriesNameMap = {
      meili: "梅里环线",
      lasa: "拉萨环线",
      "shangri-la": "香格里拉环线",
      glacier: "冰川环线"
    };
    const seriesName = seriesNameMap[seriesCode] || "云舍村线路";
    return [{
      productId: seriesCode + "-travel-1",
      productType: "travel",
      categorySub: "Travel",
      travelType: seriesCode + "-route-1",
      title: `${seriesName} | 雪山与秘境 6晚7天`,
      secondTitle: "深度探索在地风景与文化",
      productItineraryDesc: "以云舍村山居为节点，串联核心景观点位与在地体验。",
      pics: HOME_IMG.banner2,
      themes: ["旅行", "云舍村经典"],
      tagApiDtos: [{
        tageDesc: "主题团"
      }, {
        tageDesc: "私享管家"
      }],
      specificationsType: "PEOPLE",
      skuFlag: !0,
      minPriceDto: {
        payType: "CASH",
        price: 16000
      }
    }, {
      productId: seriesCode + "-travel-2",
      productType: "travel",
      categorySub: "DestPackage",
      travelType: seriesCode + "-route-2",
      title: `${seriesName} | 在地生活 5晚6天`,
      secondTitle: "轻徒步、手作与地方风物",
      productItineraryDesc: "适合首访云舍村的慢节奏线路，兼顾舒适与深度。",
      pics: HOME_IMG.banner3,
      themes: ["旅行", "在地生活"],
      tagApiDtos: [{
        tageDesc: "自由行"
      }],
      specificationsType: "PEOPLE",
      skuFlag: !0,
      minPriceDto: {
        payType: "CASH",
        price: 12800
      }
    }, {
      productId: seriesCode + "-daily-1",
      productType: "daily",
      title: `${seriesName} | 山野漫游体验`,
      secondTitle: "半日轻徒步与风景摄影",
      pics: HOME_IMG.banner4,
      themes: ["Fun肆玩"],
      tagApiDtos: [{
        tageDesc: "半日活动"
      }],
      minPriceDto: {
        payType: "CASH",
        price: 680
      }
    }];
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
