! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/wxuser.js"),
    s = require("../../utils/utils.js"),
    n = e.defineComponent({
      __name: "travels",
      setup: n => (e.onLoad(e => {
        e.type && t.setStorage("type", e.type)
      }), e.onMounted(() => {
        s.goPage("/pages/travel/index")
      }), (e, t) => ({}))
    });
  wx.createPage(n)
}();