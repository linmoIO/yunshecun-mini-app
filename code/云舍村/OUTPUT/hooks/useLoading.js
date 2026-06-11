! function() {
  "use strict";
  const e = require("../common/vendor.js");
  exports.useLoading = function(n = !0, o = "加载中...") {
    const t = e.ref(n);
    return e.watchEffect(() => {
      t.value ? e.index.showLoading({
        title: o,
        mask: !0
      }) : e.index.hideLoading()
    }), t
  }
}();