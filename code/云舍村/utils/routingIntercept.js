! function() {
  "use strict";
  const e = require("../common/vendor.js");
  exports.routingIntercept = function() {
    let o = !1;
    ["navigateTo", "redirectTo", "reLaunch"].forEach(t => {
      e.index.addInterceptor(t, {
        invoke: e => !o && (o = !0, !0),
        success(e) {},
        fail(e) {
          console.log("interceptor-fail", e)
        },
        complete(e) {
          setTimeout(() => {
            o = !1
          }, 500), console.log("interceptor-complete", e)
        }
      })
    })
  }
}();