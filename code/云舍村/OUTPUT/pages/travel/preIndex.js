! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    n = e.defineComponent({
      __name: "preIndex",
      setup: n => (e.onMounted(() => {
        e.index.switchTab({
          url: "/pages/travel/index"
        })
      }), (e, n) => ({}))
    }),
    t = e._export_sfc(n, [
      ["__scopeId", "data-v-88866915"]
    ]);
  wx.createPage(t)
}();