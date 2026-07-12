! function() {
  "use strict";
  const e = require("../common/vendor.js");

  exports.useLoading = function(initialValue, title) {
    const loading = e.ref(!!initialValue);
    let visible = !1;

    function sync(value) {
      if (value && !visible) {
        visible = !0;
        e.index.showLoading({ title: title || "加载中", mask: !0 });
      } else if (!value && visible) {
        visible = !1;
        e.index.hideLoading();
      }
    }

    e.watch(() => loading.value, sync, { immediate: !0 });
    return loading;
  };
}();
