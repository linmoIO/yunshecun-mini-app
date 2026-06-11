! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/channel.js"),
    r = require("../../base/product.js"),
    i = require("../../services/micro.js"),
    n = require("../../store/modules/micro.js"),
    l = require("../../utils/config.js"),
    a = require("../../utils/helper.js");
  exports.useMicroPage = function(t, u) {
    const {
      onError: s
    } = {}, c = e.computed(() => e.unref(t)), p = e.ref(!1), v = e.ref(!1), d = e.ref(!1), f = n.useMicroStore(), g = e.ref(new Map);
    e.watch(f.refreshedCouponInfoMap, e => {
      Array.from(e.values()).forEach(e => {
        var o;
        const r = g.value.get(e.id);
        r && e.isRefresh && (null == (o = Object.keys(e)) || o.forEach(o => {
          r[o] = e[o]
        }), g.value.set(e.id, {
          ...r,
          ...e
        }), e.isRefresh = !1)
      })
    }, {
      deep: !0
    });
    const {
      data: m,
      run: h
    } = e.useRequest(i.getMicroPageData, {
      manual: !0,
      debounceInterval: 300,
      onSuccess: async e => {
        var o, r, i;
        ! function() {
          var e, o, r;
          if (null == (e = m.value) ? void 0 : e.items) {
            const e = [...null == (o = m.value) ? void 0 : o.items];
            g.value = new Map((null == (r = m.value.serverData) ? void 0 : r.map(e => [e.id, e])) || []);
            const i = b(e, g.value);
            M.value = i
          }
        }(), await a.waitTime((null == (i = null == (r = null == (o = e.page) ? void 0 : o.config) ? void 0 : r.props) ? void 0 : i.immersiveNav) ? 300 : 100), p.value = !1
      },
      onError: e => {
        var o;
        (null == (o = null == e ? void 0 : e.data) ? void 0 : o._serverLimiting) && (d.value = !0), v.value = !0, p.value = !1, null == s || s(e)
      }
    }), E = e.computed(() => {
      var e;
      return null == (e = m.value) ? void 0 : e.page
    }), M = e.ref([]);

    function T(t, e) {
      const l = Array.isArray(t) ? t : [];
      const i = t => {
        const i = {
          ...t
        };
        let n = i.productType || i.type || "";
        "travel" === n ? n = "DestPackage" === i.categorySub ? "DestPackage" : "Travel" : "tdq" === n ? n = "ExchangeCoupon" : "hotel" === n ? n = "Hotel" : "daily" === n ? n = "DayActivity" : "weimob" === n && (n = "Mall"), i.type = n, ["Travel", "DestPackage"].includes(n) ? i.id = i.travelType || i.productId || i.id : "Hotel" === n ? i.id = i.code || i.id : "DayActivity" === n ? i.id = i.activityCode || i.id : i.id = i.productId || i.id, i.title = i.title || i.name || i.descript || "", i.desc = i.secondTitle || i.subtitle || i.gcHotelPicTag || "", i.image = i.pics || i.logo || i.extraLogo || i.indexPicture || i.image || "";
        let r = "";
        return "Travel" !== n && "DestPackage" !== n || (r = "/pagesB/travel/travelDetail?travelType=" + i.id), "ExchangeCoupon" === n && (r = "/pagesB/exchangeCoupon/exchangeCouponDetail?id=" + i.id), "Hotel" === n && (r = `/pagesC/order/hotel?hotelCode=${i.id}&otaChannel=${o.defaultOtaChannel}`), "DayActivity" === n && (r = "/pagesE/dailyActivity/dailyActivityDetail?activityCode=" + i.id), "Mall" === n && (r = `/ec_goods/detail?vid=0&productInstanfceId=13545845204&id=${i.id}&appid=wx85856dcb803b16cc`), i.path = r, i
      };
      try {
        if (r && "function" == typeof r.formatTravelThemeProducts) return r.formatTravelThemeProducts(l, e)
      } catch (t) {
        console.warn("[useMicroPage] format via cached product module failed:", t)
      }
      try {
        const t = require("../../base/product.js");
        if (t && "function" == typeof t.formatTravelThemeProducts) return t.formatTravelThemeProducts(l, e)
      } catch (t) {
        console.warn("[useMicroPage] format via dynamic product module failed:", t)
      }
      return console.warn("[useMicroPage] fallback: formatTravelThemeProducts unavailable"), l.map(t => i(t))
    }

    function O(t) {
      return a.replaceBrandInData ? a.replaceBrandInData(t) : t
    }

    function b(e, o, i) {
      return e.filter(e => {
        var o, r;
        return !(null == (r = null == (o = e.config) ? void 0 : o.wrap) ? void 0 : r.hidden)
      }).map(e => {
        var n, l, t, u, s, c, p, v, d, f, g;
        if (e.config || (e.config = {}), e.config.props || (e.config.props = {}), "product" === e.component) {
          const a = [];
          null == (l = null == (n = e.config.props) ? void 0 : n.list) || l.forEach(e => {
            const r = o.get(e.id);
            r && a.push({
              ...e,
              ...r
            })
          });
          const p = T(a, {
            currentPage: "microPage",
            pathQuery: "isMarketingPage=true",
            sourceActivityId: null == (t = m.value) ? void 0 : t.id,
            sourceActivityName: null == (c = null == (s = null == (u = E.value) ? void 0 : u.config) ? void 0 : s.props) ? void 0 : c.title,
            commodityTab: i
          });
          e.config.props.list = p
        }
        if ("coupon" === e.component) {
          const r = [];
          null == (v = null == (p = e.config.props) ? void 0 : p.list) || v.forEach(e => {
            const i = o.get(e.id);
            i && (i.hotelCode = i.hotelCode || "0", r.push(i))
          }), e.config.props.list = r
        }
        return "image" === e.component && (null == (d = e.config.props) ? void 0 : d.src) && (e.config.props.src = a.imageMogr2(a.transformHttps(e.config.props.src), "750x")), "carousel" === e.component && (null == (g = null == (f = e.config.props) ? void 0 : f.list) ? void 0 : g.length) && e.config.props.list.forEach(e => {
          e.imgUrl && (e.imgUrl = a.imageMogr2(a.transformHttps(e.imgUrl), "750x"))
        }), "tabs" === e.component && e.config.props.tabs.forEach(e => {
          e.children = b(e.children, o, null == e ? void 0 : e.label)
        }), O(e)
      })
    }

    function j() {
      p.value = !0, v.value = !1, d.value = !1, h(c.value, {
        appid: l.config.appid,
        channel: o.defaultOtaChannel
      })
    }
    return e.watch(c, e => {
      e && j()
    }, {
      immediate: !0
    }), {
      data: m,
      page: E,
      items: M,
      loading: p,
      isError: v,
      isServerLimiting: d,
      refresh: j
    }
  }
}();
