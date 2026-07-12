! function() {
  "use strict";

  function resolved(value) {
    return Promise.resolve(value || "");
  }

  exports.useScanCoupon = function() {
    return {
      scanCode: function() {
        return new Promise((resolve, reject) => {
          try {
            wx.scanCode({
              onlyFromCamera: !0,
              success: res => resolve(res.result || res.path || ""),
              fail: reject
            });
          } catch (err) {
            reject(err);
          }
        });
      },
      bindCoupon: resolved,
      exchangeCoupon: resolved
    };
  };
}();
