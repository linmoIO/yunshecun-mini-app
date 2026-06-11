! function() {
  "use strict";
  const t = require("../../common/vendor.js"),
    e = require("../../utils/helper.js"),
    o = t.defineComponent({
      __name: "FloatButton",
      props: {
        zIndex: {
          default: 90
        },
        top: null,
        right: null,
        bottom: null,
        left: null,
        fixed: {
          type: Boolean
        },
        rounded: {
          type: Boolean,
          default: !0
        },
        customStyle: null
      },
      emits: ["click"],
      setup(o, {
        emit: n
      }) {
        const d = o,
          l = n,
          r = t.computed(() => {
            const t = {
              zIndex: d.zIndex
            };
            return d.top ? (t.top = e.addCssUnit(d.top), d.bottom && (t.bottom = e.addCssUnit(d.bottom))) : t.bottom = e.pxTransform(96, 375), d.left ? (t.left = e.addCssUnit(d.left), d.right && (t.right = e.addCssUnit(d.right))) : t.right = e.pxTransform(12, 375), {
              ...t,
              ...d.customStyle
            }
          });
        return (e, n) => ({
          a: t.n({
            rounded: o.rounded,
            "float-button--fixed": o.fixed
          }),
          b: t.s(r.value),
          c: t.o(t => l("click"))
        })
      }
    }),
    n = t._export_sfc(o, [
      ["__scopeId", "data-v-6be2dd14"]
    ]);
  wx.createComponent(n)
}();