! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = e.defineComponent({
      name: "Alert",
      props: {
        type: {
          type: String,
          default: () => "error"
        },
        tips: {
          type: String,
          default: () => ""
        },
        showClose: {
          type: Boolean,
          default: () => !0
        }
      },
      emits: ["close"],
      setup: (e, {
        emit: t
      }) => ({
        tapClose: () => {
          t("close")
        }
      })
    }),
    o = e._export_sfc(t, [
      ["render", function(t, o, s, n, p, r) {
        return e.e({
          a: t.tips
        }, t.tips ? e.e({
          b: e.t(t.tips),
          c: t.showClose
        }, t.showClose ? {
          d: e.o((...e) => t.tapClose && t.tapClose(...e))
        } : {}, {
          e: e.n(t.type)
        }) : {})
      }],
      ["__scopeId", "data-v-9c0ea3b1"]
    ]);
  wx.createComponent(o)
}();