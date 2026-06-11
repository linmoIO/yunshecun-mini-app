! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = e.defineComponent({
      __name: "FixedBottomView",
      props: {
        theme: {
          default: "transform"
        },
        customStyle: null
      },
      setup: t => (o, n) => ({
        a: e.s(t.customStyle)
      })
    }),
    o = e._export_sfc(t, [
      ["__scopeId", "data-v-ab36b57e"]
    ]);
  wx.createComponent(o)
}();