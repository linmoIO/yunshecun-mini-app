! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    l = require("../../utils/helper.js"),
    t = require("../../utils/utils.js"),
    n = e.defineComponent({
      __name: "StImage",
      props: {
        src: null,
        mode: {
          default: "widthFix"
        },
        hotAreas: null,
        width: null,
        height: null,
        naturalWidth: null,
        naturalHeight: null,
        wrapConfig: null,
        beforeClickHotArea: {
          type: Function
        }
      },
      setup(n) {
        const i = n,
          a = e.ref(!1),
          u = e.ref(0),
          o = e.ref(!1),
          r = e.ref(""),
          d = e.ref(!1);

        function h() {
          a.value = !0, u.value = 0, d.value = !1
        }

        function v() {
          d.value || (u.value <= 3 ? (d.value = !0, u.value++, setTimeout(() => {
            r.value = `${i.src}?retry=${u.value}&t=${Date.now()}`, d.value = !1
          }, 300)) : o.value = !0)
        }
        e.watch(() => i.src, (e, l) => {
          e && e !== l && (r.value = e, a.value = !1, o.value = !1, d.value = !1, u.value = 0)
        }, {
          immediate: !0
        });
        const s = e.computed(() => {
          var t, n, a, u, o, r, d, h;
          const v = {};
          if (i.width && i.height) v.width = l.addCssUnit(i.width), v.height = l.addCssUnit(i.height);
          else if (i.naturalWidth && i.naturalHeight) {
            const s = e.index.getWindowInfo().windowWidth,
              f = ((null == (n = null == (t = i.wrapConfig) ? void 0 : t.margin) ? void 0 : n.left) || 0) + ((null == (u = null == (a = i.wrapConfig) ? void 0 : a.margin) ? void 0 : u.right) || 0) + ((null == (r = null == (o = i.wrapConfig) ? void 0 : o.padding) ? void 0 : r.left) || 0) + ((null == (h = null == (d = i.wrapConfig) ? void 0 : d.padding) ? void 0 : h.right) || 0),
              g = l.pxTransform(f, 375, !0),
              c = Math.max(s - g, 1),
              p = c * (i.naturalHeight / i.naturalWidth);
            v.width = l.addCssUnit(c), v.height = l.addCssUnit(p)
          }
          return v
        });
        return (l, u) => {
          var d, f;
          return e.e({
            a: !o.value
          }, o.value ? {} : e.e({
            b: r.value,
            c: n.mode,
            d: a.value ? 1 : 0,
            e: e.o(h),
            f: e.o(v),
            g: null == (d = n.hotAreas) ? void 0 : d.length
          }, (null == (f = n.hotAreas) ? void 0 : f.length) ? {
            h: e.f(n.hotAreas, (l, n, u) => ({
              a: l.x,
              b: l.x + "%",
              c: l.y + "%",
              d: l.width + "%",
              e: l.height + "%",
              f: e.o(e => function(e) {
                var l;
                null == (l = i.beforeClickHotArea) || l.call(i, e), a.value && (null == e ? void 0 : e.link) && t.goPage(e.link)
              }(l), l.x)
            }))
          } : {}, {
            i: e.s(s.value)
          }))
        }
      }
    }),
    i = e._export_sfc(n, [
      ["__scopeId", "data-v-69d0f93e"]
    ]);
  wx.createComponent(i)
}();