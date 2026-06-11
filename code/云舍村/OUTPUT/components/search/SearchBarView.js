! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../hooks/useNavigatorRect.js"),
    l = require("../../utils/helper.js"),
    n = require("../../utils/utils.js");
  Math || a();
  const a = () => "./SearchKeywordSwiper.js",
    u = e.defineComponent({
      __name: "SearchBarView",
      props: {
        list: null
      },
      setup(a) {
        const u = a,
          o = t.useNavigatorRect(),
          r = e.ref(null),
          i = e.ref(!1),
          s = e.ref();
        e.onMounted(() => {
          const t = e.getCurrentInstance();
          r.value = t, e.browserExports.nextTick(() => {
            ! function() {
              var t;
              if (!s.value) {
                const l = e.index.createIntersectionObserver(null == (t = r.value) ? void 0 : t.proxy, {
                  thresholds: [0, .3, .7, 1]
                });
                s.value = l
              }
              s.value.relativeTo(".fixed-search-bar").observe(".search-bar", e => {
                var t;
                let l = null == (t = e.boundingClientRect) ? void 0 : t.y;
                i.value = !(e.intersectionRatio < .3 && l >= 0)
              })
            }()
          })
        });
        const v = e.ref(0),
          d = e.ref();

        function c(e, t) {
          v.value = t, d.value = e
        }
        const h = e.computed(() => ((null == u ? void 0 : u.list) || []).filter(e => "F" === e.searchDisplay));

        function p() {
          var e;
          let t = "/pages/search/index?type=travel";
          (null == (e = d.value) ? void 0 : e.text) && (t += "&keyword=" + d.value.text), n.goPage(t)
        }
        e.watch(() => h.value, e => {
          (null == e ? void 0 : e.length) && (d.value = e[0])
        }, {
          immediate: !0
        });
        const g = e.computed(() => {
          var e, t, n;
          let a = null == (e = o.value.padding) ? void 0 : e.top;
          return `${l.addCssUnit(a)} ${l.addCssUnit((null==(t=o.value.padding)?void 0:t.right)||0)} ${l.addCssUnit((null==(n=o.value.padding)?void 0:n.bottom)||0)} 0`
        });
        return (t, a) => {
          var u, r, s, d, f;
          return e.e({
            a: null == (u = h.value) ? void 0 : u.length
          }, (null == (r = h.value) ? void 0 : r.length) ? {
            b: e.o(c),
            c: e.p({
              list: h.value,
              current: v.value,
              autoplay: i.value,
              "custom-style": {
                flex: 1
              }
            })
          } : {}, {
            d: e.o(p),
            e: e.o(t => e.unref(n.goPage)("/pages/search/index?type=hotel")),
            f: e.unref(l.addCssUnit)(e.unref(o).height),
            g: e.n({
              show: i.value
            }),
            h: g.value,
            i: null == (s = h.value) ? void 0 : s.length
          }, (null == (d = h.value) ? void 0 : d.length) ? {
            j: e.o(c),
            k: e.p({
              list: h.value,
              current: v.value,
              autoplay: !i.value,
              "custom-style": {
                flex: 1
              }
            })
          } : {}, {
            l: e.o(p),
            m: e.o(t => e.unref(n.goPage)("/pages/search/index?type=hotel")),
            n: e.n({
              show: !i.value
            }),
            o: e.unref(l.addCssUnit)(null == (f = e.unref(o)) ? void 0 : f.outerHeight)
          })
        }
      }
    }),
    o = e._export_sfc(u, [
      ["__scopeId", "data-v-9970aad5"]
    ]);
  wx.createComponent(o)
}();