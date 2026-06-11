! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../hooks/useNavigatorRect.js");
  require("../../utils/umengAdaptor.js"), require("../../utils/config.js");
  const t = require("../../utils/utils.js");
  require("../../utils/request.js"), require("../../base/product.js"), require("../../utils/qdTracker.js"), require("../../services/request/request.js");
  const l = require("../../utils/helper.js"),
    u = e.defineComponent({
      __name: "Navigator",
      props: {
        fixed: {
          type: Boolean,
          default: !1
        },
        scrollTop: null,
        title: null,
        theme: {
          default: "white"
        },
        color: null,
        background: null,
        useImmersiveStyle: {
          type: Boolean
        },
        useBlurStyle: {
          type: Boolean
        },
        distance: {
          default: 100
        },
        placeholder: {
          type: Boolean
        },
        showShare: {
          type: Boolean
        },
        showLeftAction: {
          type: Boolean,
          default: !0
        },
        showBackAction: {
          type: Boolean,
          default: !0
        },
        showHomeAction: {
          type: Boolean,
          default: !0
        },
        customStyle: null,
        customBackClick: {
          type: Function
        }
      },
      emits: ["share", "click"],
      setup(u, {
        emit: a
      }) {
        const i = u,
          s = a,
          n = o.useNavigatorRect(),
          r = e.ref(i.scrollTop || 0),
          c = e.computed(() => !(r.value > 0)),
          d = e.computed(() => i.useImmersiveStyle || i.useBlurStyle ? Math.min(r.value / 100, 1) : 1);
        e.watch(() => i.scrollTop, e => {
          r.value = e || 0
        }, {
          immediate: !0
        }), e.onPageScroll(e => {
          void 0 === i.scrollTop && (r.value = e.scrollTop)
        });
        const p = e.ref([]),
          v = e.computed(() => p.value.length > 1);

        function m() {
          i.customBackClick ? i.customBackClick() : e.index.navigateBack()
        }

        function h() {
          t.goPage("/pages/travel/index")
        }
        e.onMounted(() => {
          p.value = getCurrentPages()
        });
        const g = e.computed(() => ({
            height: (null == n ? void 0 : n.value.height) ? l.addCssUnit(null == n ? void 0 : n.value.height) : ""
          })),
          f = e.computed(() => {
            var e, o, t, u;
            const a = {
              paddingTop: l.addCssUnit(null == (e = n.value.padding) ? void 0 : e.top) || "",
              paddingRight: l.addCssUnit(null == (o = n.value.padding) ? void 0 : o.right) || "",
              paddingBottom: l.addCssUnit(null == (t = n.value.padding) ? void 0 : t.bottom) || "",
              paddingLeft: l.addCssUnit(null == (u = n.value.padding) ? void 0 : u.left) || ""
            };
            return i.background && (a["--navigator-bg-color"] = i.background), i.color && (a["--navigator-color"] = i.color), a
          });
        return (o, t) => e.e({
          a: d.value,
          b: u.showLeftAction
        }, u.showLeftAction ? e.e({
          c: u.showBackAction && v.value
        }, u.showBackAction && v.value ? {
          d: e.o(m)
        } : {}, {
          e: u.showHomeAction
        }, u.showHomeAction ? {
          f: e.o(h)
        } : {}) : {}, {
          g: e.t(u.title),
          h: u.showShare
        }, (u.showShare, {}), {
          i: e.s(g.value),
          j: e.n("navigator--" + u.theme),
          k: e.n({
            fixed: u.fixed,
            immersive: (u.useImmersiveStyle || u.useBlurStyle) && c.value,
            blur: u.useBlurStyle && !c.value
          }),
          l: e.s(f.value),
          m: e.s(u.customStyle),
          n: e.o(e => s("click")),
          o: u.placeholder
        }, u.placeholder ? {
          p: e.unref(l.addCssUnit)(e.unref(n).outerHeight)
        } : {})
      }
    });
  u.__runtimeHooks = 1;
  const a = e._export_sfc(u, [
    ["__scopeId", "data-v-45650f7f"]
  ]);
  wx.createComponent(a)
}();