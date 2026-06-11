! function() {
  "use strict";
  const r = require("./request/request.js"),
    e = "/auth-center/api";
  exports.loginByAuthorization = function(t, o) {
    return r.request({
      url: e + "/login/authorization",
      method: "POST",
      data: t,
      ...o
    })
  }, exports.loginByVerificationCode = function(t, o) {
    return r.request({
      url: e + "/login/verification/code",
      method: "POST",
      data: t,
      ...o
    })
  }, exports.refreshToken = function() {
    return r.request({
      url: e + "/auth/refresh/token",
      method: "POST",
      showErrorToast: !1,
      _retry: !1,
      isReturnRawData: !0,
      skipErrorHandler: !0
    })
  }
}();