! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    r = require("./config.js");
  require("./request.js"), require("./log.js"), require("./qdTracker.js"), require("./umengAdaptor.js"), exports.getStorage = function(n) {
    var o, t;
    let i = "";
    if ("config" == n) return i = r.config, r.config.componentAppid && (i = (null == (t = (o = e.index).getExtConfigSync) ? void 0 : t.call(o)) || {}), i;
    try {
      i = e.index.getStorageSync(n)
    } catch (e) {
      console.error("[utils/wxuser] e", n, e)
    }
    return i
  }, exports.login = function() {
    return new Promise((r, n) => {
      e.index.login({
        success: r,
        fail: n
      })
    })
  }, exports.removeStorage = function(r) {
    return new Promise((n, o) => {
      e.index.setStorage({
        key: r,
        data: "",
        success: n,
        fail: o
      })
    })
  }, exports.setStorage = function(r, n) {
    e.index.setStorageSync(r, n)
  }
}();