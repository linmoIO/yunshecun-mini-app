! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    s = require("../../assets/index.js"),
    n = require("../../utils/helper.js"),
    t = e.defineComponent({
      __name: "Spin",
      props: {
        size: {
          default: 24
        },
        theme: {
          default: "black"
        },
        spinning: {
          type: Boolean,
          default: !0
        }
      },
      setup(t) {
        const i = t,
          a = e.computed(() => ({
            white: s.assets.spinWhite,
            black: s.assets.spinBlack
          } [i.theme])),
          p = e.computed(() => n.addCssUnit(i.size));
        return (s, n) => ({
          a: a.value,
          b: t.spinning,
          c: e.n({
            hidden: !t.spinning
          }),
          d: e.s("--spin-size: " + p.value)
        })
      }
    }),
    i = e._export_sfc(t, [
      ["__scopeId", "data-v-9d1ac0a5"]
    ]);
  wx.createComponent(i)
}();