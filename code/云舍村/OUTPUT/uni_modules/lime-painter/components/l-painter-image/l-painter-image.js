! function() {
  "use strict";
  const e = require("../common/relation.js"),
    n = require("../../../../common/vendor.js"),
    r = {
      name: "lime-painter-image",
      mixins: [e.children("painter")],
      props: {
        id: String,
        css: [String, Object],
        src: String
      },
      data: () => ({
        type: "image",
        el: {
          css: {},
          src: null
        }
      })
    },
    i = n._export_sfc(r, [
      ["render", function(e, n, r, i, t, c) {
        return {}
      }]
    ]);
  wx.createComponent(i)
}();