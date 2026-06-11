! function() {
  "use strict";
  const o = require("../base/jAlert/jAlert.js"),
    e = require("./api.js"),
    r = require("./wxuser.js");
  exports.checkCouponExclusion = async function(t, n) {
    if (!t || 0 === n.length) return !1;
    const c = r.getStorage("config");
    try {
      const r = await e.api.checkCouponExclusion({
        currentCouponNo: t,
        selectedCouponNoList: n,
        hotelGroupCode: c.hotelGroupCode
      });
      if (1 === r.result && 0 === r.retVal.result) {
        const {
          exclusionCouponInfoList: e,
          hasExclusion: t
        } = r.retVal.retVal;
        if (t) {
          const r = e.map(o => o.couponName).join("、");
          return o.jAlert3(`该券与您选择的 ${r} 不可叠加使用，请重新选择`), !0
        }
      }
    } catch (o) {
      console.error("checkCouponExclusion error:", o)
    }
    return !1
  }
}();