! function() {
  "use strict";
  const e = require("./request/request.js");
  exports.getLongLinkByTid = function(t) {
    return e.request({
      url: "/shop-api/channel/link/tidToPath",
      method: "GET",
      params: t
    })
  }, exports.getNamesByCodes = function(t) {
    return e.request({
      url: "/shop-api/channel/param/codesToNames/get",
      method: "GET",
      params: {
        codeStr: t.codes.join(",")
      }
    })
  }
}();