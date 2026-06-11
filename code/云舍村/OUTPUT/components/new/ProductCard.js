! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../assets/index.js"),
    r = require("../../base/channel.js"),
    o = require("../../base/product.js"),
    a = require("../../utils/filter.js"),
    u = require("../../utils/helper.js"),
    c = require("../../utils/qdTracker.js"),
    s = require("../../utils/umengAdaptor.js"),
    d = require("../../utils/utils.js"),
    i = e.defineComponent({
      __name: "ProductCard",
      props: {
        product: null,
        customStyle: null
      },
      setup(i) {
        const l = i,
          p = e.inject("handleSubscribeMessage", void 0),
          n = {
            hotelNew: t.assets.icNewStar
          },
          g = e.computed(() => o.productTypeMetaList.find(e => e.name === l.product.type));
        async function v() {
          p && await p();
          const {
            id: e,
            type: t,
            extra: o,
            trackTask: a,
            path: u,
            seriesDesc: i = ""
          } = l.product || {};
          if (null == a || a.forEach(e => {
              "umeng" === e.type ? s.adaptor.sendEvent(e.event, e.params, e.umengEventType) : "qd" === e.type && c.qdTracker.track(e.event, e.params)
            }), u) d.goPage(u);
          else {
            let a = "";
            if ("Travel" === t || "DestPackage" === t) a = "/pagesB/travel/travelDetail?travelType=" + e;
            else if ("ExchangeCoupon" === t) a = "/pagesB/exchangeCoupon/exchangeCouponDetail?id=" + e;
            else if ("Hotel" === t) {
              const {
                fromDate: t,
                toDate: u
              } = o || {};
              a = `/pagesC/order/hotel?hotelCode=${e}&otaChannel=${r.defaultOtaChannel}`, t && (a += "&fromDate=" + t), u && (a += "&toDate=" + u)
            } else if ("DayActivity" === t) a = "/pagesE/dailyActivity/dailyActivityDetail?activityCode=" + e;
            else if ("Mall" === t) return void(a = `/ec_goods/detail?vid=0&productInstanceId=13545845204&id=${e}&appid=wx85856dcb803b16cc`);
            i && (a += "&seriesDesc=" + encodeURIComponent(i)), (null == o ? void 0 : o.pathQuery) && (a += "&" + o.pathQuery), d.goPage(a)
          }
        }
        return (t, r) => {
          var o, c, s, d;
          return e.e({
            a: i.product.image
          }, i.product.image ? {
            b: e.unref(u.imageMogr2)(e.unref(u.transformHttps)(i.product.image), "750x")
          } : {}, {
            c: "Mall" !== i.product.type && (null == (o = g.value) ? void 0 : o.title)
          }, "Mall" !== i.product.type && (null == (c = g.value) ? void 0 : c.title) ? {
            d: g.value.icon,
            e: e.t(g.value.title)
          } : {}, {
            f: i.product.showNewTag
          }, i.product.showNewTag ? {
            g: (d = "hotelNew", n[d] ? n[d] : d)
          } : {}, {
            h: i.product.themes && i.product.themes.length
          }, i.product.themes && i.product.themes.length ? {
            i: e.f([...i.product.themes].splice(0, 2), (t, r, o) => ({
              a: e.t(t.label),
              b: "theme-" + r
            }))
          } : {}, {
            j: e.t(i.product.title),
            k: i.product.subtitle
          }, i.product.subtitle ? {
            l: e.t(i.product.subtitle)
          } : {}, {
            m: i.product.desc
          }, i.product.desc ? {
            n: e.t(i.product.desc)
          } : {}, {
            o: i.product.tags && i.product.tags.length
          }, i.product.tags && i.product.tags.length ? {
            p: e.f(i.product.tags, (t, r, o) => ({
              a: e.t(t),
              b: "tag-" + r
            }))
          } : {}, {
            q: e.f(null == (s = i.product) ? void 0 : s.pfTags, (t, r, o) => ({
              a: e.t(1 === (null == t ? void 0 : t.sex) ? "男" : "女"),
              b: e.f(null == t ? void 0 : t.dates, (r, o, a) => {
                var u;
                return {
                  a: e.t(r),
                  b: e.t(o + 1 < (null == (u = null == t ? void 0 : t.dates) ? void 0 : u.length) ? "、" : ""),
                  c: "date" + o
                }
              }),
              c: r
            })),
            r: void 0 !== i.product.price
          }, void 0 !== i.product.price ? {
            s: e.t(e.unref(a.valFormat)(i.product.price))
          } : {}, {
            t: i.product.priceDesc
          }, i.product.priceDesc ? {
            v: e.t(i.product.priceDesc)
          } : {}, {
            w: e.s(i.customStyle),
            x: e.o(v)
          })
        }
      }
    });
  wx.createComponent(i)
}();