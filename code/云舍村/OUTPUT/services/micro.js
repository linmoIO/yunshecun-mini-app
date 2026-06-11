! function() {
  "use strict";
  const e = require("./request/request.js"),
    r = "/shop-api/microPage";
  exports.getMicroPageData = function(o, t, s) {
    return e.request({
      url: `${r}/get/${o}`,
      method: "GET",
      params: t,
      ...s,
      showErrorToast: !1
    })
  }, exports.receiveCoupon = function(r, o) {
    return e.request({
      url: "/api/shop/receiveSCCouponNew?" + r,
      method: "POST",
      ...o
    })
  }, exports.refreshCouponInfo = function(o, t) {
    const s = o.id;
    return delete o.id, e.request({
      url: `${r}/coupon/refresh/${s}`,
      method: "GET",
      params: o,
      ...t,
      showErrorToast: !1
    })
  }
}();