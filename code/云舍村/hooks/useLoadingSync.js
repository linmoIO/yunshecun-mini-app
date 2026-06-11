! function() {
  "use strict";
  const e = require("../common/vendor.js");
  // 将 loading ref 同步到 wx.showLoading / wx.hideLoading
  exports.useLoadingSync = function(loadingRef) {
    if (!loadingRef) return;
    e.watch(() => e.unref(loadingRef), (val) => {
      if (val) {
        e.index.showLoading({ title: "加载中...", mask: true });
      } else {
        e.index.hideLoading();
      }
    });
  };
}();
