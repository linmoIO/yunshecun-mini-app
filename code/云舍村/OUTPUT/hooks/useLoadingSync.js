! function() {
  "use strict";
  const n = require("../common/vendor.js");
  exports.useLoadingSync = function(e, i = {
    title: "加载中...",
    mask: !0
  }) {
    n.watchEffect(() => {
      n.unref(e) ? n.index.showLoading(i) : n.index.hideLoading()
    })
  }
}();