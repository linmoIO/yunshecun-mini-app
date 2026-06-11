! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = e.defineComponent({
      name: "bottomBtn",
      props: {
        layoutFlow: {
          type: Boolean,
          default: !1
        },
        disabled: {
          type: Boolean,
          default: !1
        }
      },
      emits: ["click"],
      setup: (e, {
        emit: t
      }) => ({
        clickButton: () => {
          e.disabled || t("click")
        }
      })
    }),
    o = e._export_sfc(t, [
      ["render", function(t, o, n, c, l, i) {
        return {
          a: t.disabled ? 1 : "",
          b: e.o((...e) => t.clickButton && t.clickButton(...e)),
          c: t.layoutFlow ? 1 : ""
        }
      }],
      ["__scopeId", "data-v-fe6d7eeb"]
    ]);
  wx.createComponent(o)
}();