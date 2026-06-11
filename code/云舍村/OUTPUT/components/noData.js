! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    n = e.defineComponent({
      name: "noData",
      setup: (n, t) => (e.onMounted(() => {}), {
        back: () => {
          1 == getCurrentPages().length ? e.index.reLaunch({
            url: "/pages/travel/index"
          }) : e.index.navigateBack({
            delta: 1
          })
        }
      })
    }),
    t = e._export_sfc(n, [
      ["render", function(n, t, a, o, r, c) {
        return {
          a: e.o((...e) => n.back && n.back(...e))
        }
      }],
      ["__scopeId", "data-v-d9640da5"]
    ]);
  wx.createComponent(t)
}();