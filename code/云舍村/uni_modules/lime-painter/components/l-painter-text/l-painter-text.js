! function() {
  "use strict";
  const e = require("../common/relation.js"),
    t = require("../../../../common/vendor.js"),
    n = {
      name: "lime-painter-text",
      mixins: [e.children("painter")],
      props: {
        uid: String,
        css: [String, Object],
        text: [String, Number],
        replace: Object
      },
      data: () => ({
        type: "text",
        el: {
          css: {},
          text: null
        }
      })
    },
    r = t._export_sfc(n, [
      ["render", function(e, t, n, r, i, c) {
        return {}
      }]
    ]);
  wx.createComponent(r)
}();