! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../assets/index.js"),
    o = require("../../base/defaultConfig.js"),
    r = e.defineComponent({
      __name: "ErrorBlock",
      props: {
        title: {
          default: "提示"
        },
        description: {
          default: o.defaultConfig.errorMessage
        },
        customStyle: null,
        iconType: {
          default: "error"
        },
        icon: null
      },
      setup(o) {
        const r = o,
          s = {
            error: t.assets.netError,
            empty: t.assets.empty
          },
          n = e.computed(() => e.isNil(r.icon) ? s[r.iconType] || "" : r.icon);
        return (t, r) => ({
          a: n.value,
          b: e.t(o.title),
          c: e.t(o.description),
          d: e.s(o.customStyle)
        })
      }
    }),
    s = e._export_sfc(r, [
      ["__scopeId", "data-v-4a7c5756"]
    ]);
  wx.createComponent(s)
}();