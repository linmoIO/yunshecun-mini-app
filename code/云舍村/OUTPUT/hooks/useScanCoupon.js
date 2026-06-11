! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    r = require("../utils/api.js"),
    o = require("../utils/wxuser.js"),
    t = require("../base/jAlert/jAlert.js");
  exports.useScanCoupon = function() {
    return {
      scanCode: function() {
        return new Promise((r, o) => {
          e.index.scanCode({
            success: e => {
              r(e.result)
            },
            fail: e => {
              o(e)
            }
          })
        })
      },
      bindCoupon: function(e) {
        let n = o.getStorage("config"),
          u = o.getStorage("user");
        return new Promise((o, s) => {
          r.api.bindCouponToMemberForPlatform({
            hotelGroupCode: n.hotelGroupCode,
            couponNo: e,
            cardNo: u.cardNo,
            memberId: u.memberId,
            memberName: u.name,
            password: ""
          }).then(r => {
            1 == r.result ? 0 == r.retVal.result ? (t.jAlert3("绑定成功"), o(e)) : (t.jAlert3(r.retVal.msg), s(r.retVal.msg)) : (t.jAlert3(r.msg), s(r.msg))
          })
        })
      },
      exchangeCoupon: function(e) {
        let n = o.getStorage("config"),
          u = o.getStorage("user");
        return new Promise((o, s) => {
          r.api.interfaceTransfer({
            query: {
              hotelGroupCode: n.hotelGroupCode,
              memberId: u.memberId,
              channel: "wechat",
              code: e,
              hotelCode: n.hotelCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "",
              interfaceMethod: "api/coupon/activityCodeExchange",
              interfaceFrom: "coupon",
              hotelGroupCode: n.hotelGroupCode
            }
          }).then(r => {
            1 == r.result ? 0 == r.retVal.result ? (t.jAlert3("绑定成功"), o(e)) : (t.jAlert3(r.retVal.msg), s(r.retVal.msg)) : (t.jAlert3(r.msg), s(r.msg))
          })
        })
      }
    }
  }
}();