! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/utils.js"),
    a = require("../../utils/helper.js"),
    l = require("../../assets/index.js");
  Math || u();
  const u = () => "../new/ProductCardList.js",
    n = e.defineComponent({
      __name: "SearchResult",
      props: {
        data: null,
        tabbarSticky: {
          type: Boolean
        },
        tabbarStickyTop: null,
        customStyle: null
      },
      setup(u) {
        const n = u,
          r = [{
            title: "全部",
            value: "All"
          }, {
            title: "旅行",
            value: "Travel"
          }, {
            title: "目的地套餐",
            value: "DestPackage"
          }, {
            title: "通兑券",
            value: "ExchangeCoupon"
          }, {
            title: "酒店",
            value: "Hotel"
          }, {
            title: "Fun肆玩",
            value: "DayActivity"
          }],
          s = e.ref(r[0]),
          i = e.ref(0),
          o = e.computed(() => {
            let e = i.value;
            return i.value < 2 && (e = 0), "destinations-tab-" + e
          }),
          v = e.computed(() => {
            var e;
            return (null == (e = n.data) ? void 0 : e[s.value.value]) ? n.data[s.value.value] : []
          });
        return (n, c) => {
          var d, p;
          return e.e({
            a: e.f(r, (t, a, l) => {
              var u;
              return {
                a: e.t(t.title),
                b: "tab-" + t.value,
                c: "destinations-tab-" + a,
                d: e.n({
                  active: (null == (u = s.value) ? void 0 : u.value) === t.value
                }),
                e: e.o(e => function(e, t) {
                  t !== i.value && (s.value = e, i.value = t)
                }(t, a), "tab-" + t.value)
              }
            }),
            b: o.value,
            c: u.tabbarSticky ? "sticky" : "",
            d: e.unref(a.addCssUnit)(u.tabbarStickyTop),
            e: null == (d = v.value) ? void 0 : d.length
          }, (null == (p = v.value) ? void 0 : p.length) ? {
            f: e.p({
              list: v.value
            }),
            g: e.unref(l.assets).adCustomTravel,
            h: e.o(a => e.unref(t.goPage)("/pagesE/consultationForm/index"))
          } : {
            i: e.unref(l.assets).empty
          }, {
            j: e.s(u.customStyle)
          })
        }
      }
    }),
    r = e._export_sfc(n, [
      ["__scopeId", "data-v-2978d863"]
    ]);
  wx.createComponent(r)
}();