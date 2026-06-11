! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../assets/index.js"),
    i = require("./channel.js"),
    o = {
      PEOPLE: "人",
      PACKAGE: "套",
      FAMILY: "家庭"
    },
    a = {
      Travel: "旅行",
      DestPackage: "目的地套餐",
      ExchangeCoupon: "通兑券",
      Hotel: "酒店",
      DayActivity: "日活动",
      Mall: "风物"
    },
    c = [{
      name: "Travel",
      icon: t.assets.icProductTravel,
      iconfont: "icon-travel-line",
      title: "旅行",
      order: 10
    }, {
      name: "DestPackage",
      icon: t.assets.icProductPackage,
      iconfont: "icon-a-12_jiudiantaocan_hui",
      title: "目的地套餐",
      order: 9
    }, {
      icon: t.assets.icProductCoupon,
      iconfont: "icon-exchange-coupon",
      title: "通兑券",
      name: "ExchangeCoupon",
      order: 8
    }, {
      icon: t.assets.icProductHotel,
      iconfont: "icon-a-12_jiudian_hei",
      title: "酒店",
      name: "Hotel",
      order: 7
    }, {
      icon: t.assets.icProductDayActivity,
      iconfont: "icon-a-16_huodong",
      title: "Fun肆玩",
      name: "DayActivity",
      order: 6
    }, {
      icon: t.assets.icProductDayActivity,
      title: "风物",
      name: "Mall",
      order: 5
    }],
    r = {};

  function l(e, t) {
    const i = {};
    for (const o in t) i[o] = e[t[o]];
    return i
  }

  function n(e) {
    return o[e] || ""
  }

  function s(e, t, o) {
    const a = {
      url: ""
    };
    return "Travel" === e.type || "DestPackage" === e.type ? a.url = "/pagesB/travel/travelDetail?travelType=" + e.id : "ExchangeCoupon" === e.type ? a.url = "/pagesB/exchangeCoupon/exchangeCouponDetail?id=" + e.id : "Hotel" === e.type ? (a.url = `/pagesC/order/hotel?hotelCode=${e.id}&otaChannel=${i.defaultOtaChannel}`, t && (a.url += "&fromDate=" + t), o && (a.url += "&toDate=" + o)) : "DayActivity" === e.type ? a.url = "/pagesE/dailyActivity/dailyActivityDetail?activityCode=" + e.id : "Mall" === e.type && (a.url = `/ec_goods/detail?vid=0&productInstanfceId=13545845204&id=${e.id}&appid=wx85856dcb803b16cc`), e.seriesDesc && (a.url += "&seriesDesc=" + encodeURIComponent(e.seriesDesc)), a
  }
  c.forEach(e => {
    r[e.name] = e
  }), exports.ProductChildTypeMeta = {
    BIGCHILDREN: "大童",
    CHILDREN: "中童",
    BABY: "幼童"
  }, exports.formatFeedProductList = function(t) {
    const {
      list: i,
      fromDate: o,
      toDate: c,
      seriesList: r = []
    } = t;
    return i.map(t => {
      var i, d, p, u, y, m, v, g;
      let D = {
          ...t
        },
        h = {};
      const P = (t.themes || []).map(e => ({
        label: e
      }));
      (null == P ? void 0 : P.length) && (D.themes = P);
      const _ = (t.tagApiDtos || []).map(e => e.tageDesc);
      (null == _ ? void 0 : _.length) && (D.tags = _);
      let T = "";
      ["Travel", "DestPackage"].includes(t.type) ? T = t.series : "Hotel" === t.type ? T = null == (i = (null == t ? void 0 : t.series.split(",")) || []) ? void 0 : i.map(e => {
        var t;
        return null == (t = r.find(t => e === t.value)) ? void 0 : t.title
      }).join(",") : "DayActivity" === t.type && (null == (d = t.productSeriesList) ? void 0 : d.length) > 0 ? T = null == (p = null == t ? void 0 : t.productSeriesList) ? void 0 : p.map(e => e.name).join(",") : "ExchangeCoupon" === t.type && (null == (u = t.seriesList) ? void 0 : u.length) > 0 && (T = t.seriesList.map(e => e.seriesName).join(",")), D.seriesDesc = T;
      let f = "";
      if ("Hotel" === t.type ? (D.price = t.priceMin, "false" === t.roomAvailable || -1 === t.priceMin ? (D.price = void 0, f = "今日满房") : (f = "/起", (!o || o && e.dayjs(o).isSame(e.dayjs(), "day")) && (f += "（今日价格）"))) : "DayActivity" === t.type ? (D.price = null == (y = t.minPriceDto) ? void 0 : y.price, "FREE" === t.priceType && (f = "免费")) : (f += "/", "ExchangeCoupon" === t.type && (f += "份"), ["Travel", "DestPackage"].includes(t.type) ? f += n(t.specificationsType) : t.priceModelDesc && (f += t.priceModelDesc), (t.skuFlag || "ExchangeCoupon" !== t.type) && (f += "起")), D.priceDesc = f, "Travel" === t.type || "DestPackage" === t.type) {
        if (h = l(t, {
            id: "travelType",
            title: "title",
            desc: "subtitle",
            subtitle: "productItineraryDesc",
            price: "startingPrice"
          }), h.extra = {
            travelType: t.travelType
          }, null == (m = t.urls) ? void 0 : m.length) {
          const e = t.urls.find(e => !!(null == e ? void 0 : e.url));
          e && (h.image = e.url)
        }
      } else "ExchangeCoupon" === t.type ? (h = l(t, {
        id: "id",
        title: "name",
        desc: "secondTitle",
        image: "logo"
      }), !t.price && t.startingPrice && (h.price = t.startingPrice)) : "Hotel" === t.type ? (h = l(t, {
        id: "code",
        title: "descript",
        desc: "gcHotelPicTag",
        image: "extraLogo"
      }), h.extra = {
        priceMin: t.priceMin,
        roomAvailable: t.roomAvailable,
        fromDate: o,
        toDate: c
      }) : h = "DayActivity" === t.type ? l(t, {
        id: "activityCode",
        title: "name",
        desc: "subtitle",
        image: "indexPicture"
      }) : {
        ...t
      };
      D = {
        ...D,
        ...h
      };
      const {
        url: x,
        appId: A
      } = s(D, null == (v = null == D ? void 0 : D.extra) ? void 0 : v.fromDate, null == (g = null == D ? void 0 : D.extra) ? void 0 : g.toDate);
      return A && (D.jumpAppId = A), D.path = x, D.trackTask = [{
        type: "umeng",
        event: "click_book_page_product_card_control",
        params: {
          card_id: D.id,
          card_name: D.title,
          price: D.price
        }
      }, {
        type: "qd",
        event: "all_product_click",
        params: {
          commodity_line: D.seriesDesc,
          commodity_type: a[D.type],
          commodity_id: D.id,
          commodity_name: D.title
        }
      }], D
    })
  }, exports.formatTravelThemeProducts = function(t, i) {
    const {
      pathQuery: o,
      fromDate: a
    } = i || {};
    return t.map(t => {
      var c, l, d, p;
      t.type = t.productType, t.minPriceDto && (t.payType = t.minPriceDto.payType.includes("CASH") ? "money" : "mix", t.price = "money" === t.payType ? t.minPriceDto.price || 0 : t.minPriceDto.mixPrice || 0, t.credit = t.minPriceDto.mixCredit);
      const u = {
        ...t,
        id: t.productId,
        desc: t.secondTitle,
        image: t.pics
      };
      let y = "";
      "travel" === t.type ? y = "DestPackage" === t.categorySub ? "DestPackage" : "Travel" : "tdq" === t.type ? y = "ExchangeCoupon" : "hotel" === t.type ? y = "Hotel" : "daily" === t.type ? y = "DayActivity" : "weimob" === t.type && (y = "Mall"), u.type = y;
      const m = (t.themes || []).map(e => ({
        label: e
      }));
      (null == m ? void 0 : m.length) && (u.themes = m);
      const v = (t.tagApiDtos || []).map(e => e.tageDesc);
      (null == v ? void 0 : v.length) && (u.tags = v), ["Travel", "DestPackage"].includes(u.type) && (u.id = t.travelType, u.subtitle = t.productItineraryDesc);
      let g = "";
      "Hotel" === u.type ? "false" === t.roomAvailable || -1 === t.price ? (u.price = void 0, g = "今日满房") : (g = "/起", (!a || a && e.dayjs(a).isSame(e.dayjs(), "day")) && (g += "（今日价格）")) : "DayActivity" === u.type ? (u.price = null == (c = t.minPriceDto) ? void 0 : c.price, void 0 === u.price && (g = "免费")) : void 0 !== u.price && (g += "/", "ExchangeCoupon" === u.type && (g += "份"), ["Travel", "DestPackage"].includes(u.type) ? g += n(t.specificationsType) : t.priceModelDesc && (g += t.priceModelDesc), !t.skuFlag && ["ExchangeCoupon"].includes(u.type) || (g += "起")), u.priceDesc = g, u.extra = {
        pathQuery: o
      }, u.iconfont = null == (l = r[y]) ? void 0 : l.iconfont;
      let {
        url: D,
        appId: h
      } = s(u, null == (d = null == u ? void 0 : u.extra) ? void 0 : d.fromDate, null == (p = null == u ? void 0 : u.extra) ? void 0 : p.toDate);
      h && (u.jumpAppId = h), o && (D += "&" + o), u.path = D;
      const P = {
        card_id: u.id,
        card_name: u.title,
        price: u.price
      };
      if ((null == i ? void 0 : i.commodityTab) && (P.tab_name = null == i ? void 0 : i.commodityTab), u.trackTask = [{
          type: "umeng",
          event: "click_book_page_product_card_control",
          params: P
        }], ["theme", "microPage"].includes(null == i ? void 0 : i.currentPage)) {
        const e = {
          commodity_id: u.id,
          commodity_name: u.title
        };
        (null == i ? void 0 : i.sourceActivityId) && (e.activity_page_id = null == i ? void 0 : i.sourceActivityId), (null == i ? void 0 : i.sourceActivityName) && (e.activity_page_name = null == i ? void 0 : i.sourceActivityName), "microPage" === (null == i ? void 0 : i.currentPage) && (e.current_module_name = "微页面"), (null == i ? void 0 : i.commodityTab) && (e.tab_name = null == i ? void 0 : i.commodityTab), u.trackTask.push({
          type: "qd",
          event: "activity_page_click",
          params: e
        })
      }
      return u
    })
  }, exports.getPriceModelDesc = n, exports.productTypeMeta = r, exports.productTypeMetaList = c
}();