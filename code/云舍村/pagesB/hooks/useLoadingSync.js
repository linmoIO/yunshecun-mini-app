! function() {
  "use strict";
  const e = require("../../common/vendor.js");
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
