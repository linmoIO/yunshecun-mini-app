! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = e.defineComponent({
      name: "lastText",
      components: {},
      props: {
        tips: {
          type: String,
          default: "暂无数据"
        }
      },
      setup: (e, t) => ({})
    }),
    n = e._export_sfc(t, [
      ["render", function(t, n, o, r, s, p) {
        return {
          a: e.t(t.tips)
        }
      }],
      ["__scopeId", "data-v-949ca873"]
    ]);
  wx.createComponent(n)
}();