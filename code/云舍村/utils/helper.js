! function() {
  "use strict";
  const t = require("../common/vendor.js"),
    n = require("./config.js");

  function o(t) {
    if (!t || "string" != typeof t) return t;
    if (t.startsWith("/uploads/")) {
      const e = (n.config.baseUrlmall || "http://localhost:3000/api").replace(/\/api\/?$/, "");
      return e + t;
    }
    return t;
  }

  function e({
    url: t,
    mode: e = 0,
    width: r,
    height: n
  }) {
    if (t = o(t), t.includes("?")) return t;
    let i = `${t}?imageView2/${e}`;
    return r && (i += "/w/" + r), n && (i += "/h/" + n), i
  }

  function r(t, e) {
    return t ? (t = o(t), t.includes("?") ? t : `${t}?imageMogr2/thumbnail/${e}`) : ""
  }
  exports.addCssUnit = function(t, e = "px") {
    return "number" == typeof t ? `${t}${e}` : t
  }, exports.imageMogr2 = r, exports.imageView2 = e, exports.pxTransform = function(e, r, n) {
    if (!e) return e;
    const i = r || 750,
      o = n || !1,
      s = t.index.getWindowInfo().windowWidth;
    return o ? s / i * e : s / i * e + "px"
  }, exports.shareImageTransfrom = function(t, n = "message", i) {
    return i || (i = "message" === n ? 320 : 120), "message" === n ? r(t, i + "x") : e({
      url: t,
      mode: 1,
      width: i
    })
  }, exports.transformHttps = function(t) {
    if (!t) return t;
    if (t = o(t), t.startsWith("http://localhost") || t.startsWith("http://127.0.0.1")) return t;
    return t.startsWith("http://") ? t.replace("http://", "https://") : t;
  }, exports.waitTime = function(t) {
    return new Promise(e => {
      setTimeout(e, t)
    })
  }
}();
