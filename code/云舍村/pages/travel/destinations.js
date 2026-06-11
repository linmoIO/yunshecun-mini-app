! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../assets/index.js"),
    l = require("../../base/channel.js"),
    u = require("../../base/product.js"),
    n = require("../../services/home.js"),
    o = require("../../utils/helper.js"),
    t = require("../../utils/utils.js"),
    r = require("../../utils/wxuser.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (c + s + v + d + i)();
  const v = () => "../../components/new/ErrorBlock.js",
    i = () => "../../components/new/LimitingRetry/index.js",
    s = () => "../../components/new/ProductCardList.js",
    d = () => "../../components/new/SafeArea.js",
    c = () => "../../components/new/Spin.js",
    f = e.defineComponent({
      __name: "destinations",
      setup(v) {
        const i = r.getStorage("config");

        function s() {
          e.index.pageScrollTo({
            scrollTop: 0,
            duration: 300
          })
        }
        const d = e.ref(),
          c = e.ref();
        e.onLoad(e => {
          (null == e ? void 0 : e.tab) && (d.value = e.tab), (null == e ? void 0 : e.secondTab) && (c.value = e.secondTab)
        });
        const f = e.ref([{
            title: "旅行",
            value: "Travel",
            serverKey: "travel"
          }, {
            title: "目的地套餐",
            value: "DestPackage"
          }, {
            title: "通兑券",
            value: "ExchangeCoupon",
            serverKey: "tdq"
          }, {
            title: "酒店",
            value: "Hotel",
            serverKey: "hotel"
          }, {
            title: "Fun肆玩",
            value: "DayActivity",
            serverKey: "daily"
          }]),
          p = e.ref([]),
          m = e.ref(),
          h = e.ref(0),
          g = e.computed(() => {
            let e = h.value;
            return h.value < 2 && (e = 0), "destinations-tab-" + e
          }),
          y = e.ref(),
          b = e.ref(),
          C = e.computed(() => {
            let e = b.value;
            return b.value < 2 && (e = 0), "destinations-second-tab-" + e
          });

        function T(e, a) {
          var l;
          (null == (l = m.value) ? void 0 : l.value) !== e.value && (m.value = e, h.value = a, y.value = void 0, b.value = void 0, _(), s())
        }
        const j = e.ref(!1),
          x = e.ref(),
          w = e.ref(new Map),
          D = e.ref(new Map),
          q = e.computed(() => j.value || D.value.has(x.value)),
          P = e.ref([]),
          {
            runAsync: S,
            loading: $
          } = e.useRequest(n.getDestinationsProductsByTab, {
            manual: !0,
            loadingKeep: 300,
            onSuccess: (e, a) => {
              const l = Y(null == a ? void 0 : a[0]);
              const t = N(e || []);
              w.value.set(l, t), P.value = t
            },
            onError: (e, a) => {
              var l;
              if (null == (l = null == e ? void 0 : e.data) ? void 0 : l._serverLimiting) {
                const e = Y(null == a ? void 0 : a[0]);
                D.value.set(e, !0)
              }
            }
          }),
          K = e.ref(e.dayjs().format("YYYY-MM-DD")),
          M = e.ref(e.dayjs().add(1, "day").format("YYYY-MM-DD"));

        function Y(e) {
          return `getDestinationsProductsByTab.${null==e?void 0:e.productSeriesCode}.${(null==e?void 0:e.type)||"all"}`
        }
        function N(t) {
          const r = Array.isArray(t) ? t : [];
          try {
            if (u && "function" == typeof u.formatTravelThemeProducts) return u.formatTravelThemeProducts(r)
          } catch (e) {
            console.warn("[destinations] format via cached product module failed:", e)
          }
          try {
            const e = require("../../base/product.js");
            if (e && "function" == typeof e.formatTravelThemeProducts) return e.formatTravelThemeProducts(r)
          } catch (e) {
            console.warn("[destinations] format via dynamic product module failed:", e)
          }
          return r
        }
        async function _() {
          var e, a, u, n;
          P.value = [], $.value = !0;
          const o = !(null == (e = y.value) ? void 0 : e.value),
            t = {
              appid: i.appid,
              hotelGroupCode: i.hotelGroupCode,
              unitCode: i.hotelGroupCode,
              otaChannel: l.defaultOtaChannel,
              productSeriesCode: null == (a = m.value) ? void 0 : a.value,
              isAll: o,
              type: o ? null : (null == (u = y.value) ? void 0 : u.serverKey) || (null == (n = y.value) ? void 0 : n.value),
              fromDate: K.value,
              toDate: M.value,
              hasPriceMin: !0
            },
            r = Y(t);
          if (x.value = r, w.value.has(r)) return P.value = w.value.get(r), void($.value = !1);
          await S(t)
        }
        const {
          loading: A,
          refreshAsync: E
        } = e.useRequest(() => n.getDestinationsConfigSeries({
          hotelGroupCode: i.hotelGroupCode
        }), {
          cacheKey: "getDestinationsConfigSeries",
          onSuccess: function(e) {
            if (p.value = e.map(e => ({
                title: e.productSeriesName,
                value: e.productSeriesCode
              })), m.value) {
              if (c.value) {
                const e = f.value.findIndex(e => e.value === c.value); - 1 !== e && (y.value = f.value[e], b.value = e)
              }
              _()
            } else if (d.value) {
              const e = p.value.findIndex(e => e.value === d.value); - 1 !== e ? T(p.value[e], e) : T(p.value[0], 0)
            } else T(p.value[0], 0)
          },
          onError: e => {
            var a;
            (null == (a = null == e ? void 0 : e.data) ? void 0 : a._serverLimiting) && (j.value = !0)
          }
        });
        async function G() {
          try {
            x.value = void 0, w.value.clear(), await E()
          } finally {
            e.index.stopPullDownRefresh()
          }
        }

        function L() {
          j.value && (G(), j.value = !1), D.value.has(x.value) && (D.value.set(x.value, !1), _())
        }
        return e.onPullDownRefresh(() => {
          G()
        }), (l, u) => {
          var n, r, v, i;
          return e.e({
            a: e.unref(A)
          }, e.unref(A) ? {
            b: e.p({
              size: 48
            })
          } : e.e({
            c: e.o(a => e.unref(t.goPage)("/pages/search/index")),
            d: e.f(p.value, (a, l, u) => {
              var n;
              return {
                a: e.t(a.title),
                b: "destinations-tab-" + l,
                c: "tab-" + a.value,
                d: e.n({
                  active: (null == (n = m.value) ? void 0 : n.value) === a.value
                }),
                e: e.o(e => T(a, l), "tab-" + a.value)
              }
            }),
            e: g.value,
            f: null == (n = m.value) ? void 0 : n.value
          }, (null == (r = m.value) ? void 0 : r.value) ? {
            g: e.f(f.value, (a, l, u) => {
              var n;
              return {
                a: e.t(a.title),
                b: "destinations-second-tab-" + l,
                c: `second-tab-${m.value.value}-${a.value}`,
                d: e.s(`--hairline-rounded: ${e.unref(o.pxTransform)(8,375)}; ${(null==(n=y.value)?void 0:n.value)===a.value?"--hairline-color: #a43127":""}`),
                e: e.o(e => function(e, a) {
                  var l;
                  e.value === (null == (l = y.value) ? void 0 : l.value) ? (y.value = void 0, b.value = void 0) : (y.value = e, b.value = a), _(), s()
                }(a, l), `second-tab-${m.value.value}-${a.value}`)
              }
            }),
            h: C.value
          } : {}, {
            i: e.p({
              size: 48
            }),
            j: e.unref($) ? "" : 1,
            k: e.p({
              list: P.value,
              "custom-style": {
                margin: `${e.unref(o.pxTransform)(32)} ${e.unref(o.pxTransform)(32)} 0`
              }
            }),
            l: e.unref(a.assets).adCustomTravel,
            m: e.o(a => e.unref(t.goPage)("/pagesE/consultationForm/index")),
            n: e.unref($) || !(null == (v = P.value) ? void 0 : v.length) ? 1 : "",
            o: e.p({
              iconType: "empty",
              title: "更多产品敬请期待",
              description: ""
            }),
            p: e.unref($) || (null == (i = P.value) ? void 0 : i.length) || q.value ? 1 : "",
            q: e.p({
              "custom-style": {
                height: e.unref(o.pxTransform)(32, 375)
              }
            })
          }), {
            r: e.o(L),
            s: e.p({
              show: q.value && !e.unref(A) && !e.unref($)
            })
          })
        }
      }
    }),
    p = e._export_sfc(f, [
      ["__scopeId", "data-v-c4667504"]
    ]);
  wx.createPage(p)
}();
