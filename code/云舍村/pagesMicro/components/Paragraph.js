! function() {
  "use strict";
  const n = require("../../common/vendor.js"),
    e = n.defineComponent({
      __name: "Paragraph",
      props: {
        content: null
      },
      setup: e => (t, o) => n.e({
        a: e.content
      }, e.content ? {
        b: n.t(e.content)
      } : {})
    }),
    t = n._export_sfc(e, [
      ["__scopeId", "data-v-772662fd"]
    ]);
  wx.createComponent(t)
}();