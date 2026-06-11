! function() {
  "use strict";
  const s = require("../common/vendor.js");
  exports.processRsApi = (e, o, n) => {
    if (e.includes("/rsapi")) {
      const {
        code: e,
        message: i
      } = o.data;
      0 !== e && (s.index.showToast({
        title: i,
        icon: "none"
      }), n(i))
    }
  }
}();