! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = e.defineComponent({
      __name: "contract",
      setup: t => (e.onMounted(() => {
        setTimeout(() => {
          e.index.navigateTo({
            url: "/pagesB/other/pay"
          })
        }, 5e3)
      }), (e, t) => ({}))
    }),
    o = e._export_sfc(t, [
      ["__scopeId", "data-v-e97a7c80"]
    ]);
  wx.createPage(o)
}();