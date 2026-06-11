! function() {
  "use strict";
  const e = require("../utils/wxuser.js"),
    r = require("../utils/api.js");
  let o = e.getStorage("config");
  const t = {
    visit: 124,
    regist: 123,
    order: 1
  };
  let i = !1,
    c = "";
  exports.useXshReport = function() {
    return {
      init: function(e) {
        e && (c = e, console.log(c, "set report isVisit false"), i = !1)
      },
      isXhs: function() {
        return !!c
      },
      report: function n(s, p) {
        if (console.log("report isVisit:", i, c), (s !== t.visit || !i) && c) {
          console.log("report xhs");
          const u = e.getStorage("wxuser");
          if (u) {
            const n = e.getStorage("user"),
              d = {
                memberId: n ? n.memberId : null,
                openId: u.openid,
                deviceId: "",
                actionType: s,
                clickId: c,
                orderNo: "",
                orderType: "",
                otherInfo: {
                  orderCount: "",
                  payCharge: "",
                  productId: "",
                  productName: "",
                  productPrice: "",
                  productCategory: ""
                }
              };
            s === t.order && (d.orderNo = p.orderNo, d.orderType = p.orderType, d.otherInfo = {
              orderCount: p.orderCount,
              payCharge: p.payCharge,
              productId: p.productId,
              productName: p.productName,
              productPrice: p.productPrice,
              productCategory: p.productCategory
            }), r.api.interfaceTransfer({
              config: {
                interfaceType: "POST",
                interfaceModule: "GC_ADVERTISE_SERVER",
                interfaceMethod: "advertise/app/xhs/appReport/",
                interfaceFrom: "GC",
                hotelGroupCode: o.hotelGroupCode
              },
              query: d
            }).then(() => {
              s === t.visit && (console.log("set report isVisit true"), i = !0)
            })
          } else setTimeout(() => {
            n(s, p)
          }, 300)
        }
      },
      actionTypeEnum: t
    }
  }
}();