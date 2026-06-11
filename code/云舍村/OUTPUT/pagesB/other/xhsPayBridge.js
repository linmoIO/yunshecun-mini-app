! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = e.defineComponent({
      __name: "xhsPayBridge",
      setup: o => (e.onLoad(e => {
        if (e.redirect_url) {
          let o = decodeURIComponent(e.redirect_url);
          window.location.href = o
        }
      }), e.onMounted(() => {}), (e, o) => ({}))
    });
  wx.createPage(o)
}();