! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    r = require("./url.js");
  exports.createUrl = function(e) {
    e && e.length;
    var r = "";
    for (var n in e) "url" != n && null !== e[n] && (r += n + "=" + encodeURIComponent(e[n]) + "&");
    return r.substring(0, r.lastIndexOf("&"))
  }, exports.genSessionId = function(e) {
    for (var r = 0, n = ""; r < e; r++) n += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" [Math.floor(64 * Math.random())];
    return n
  }, exports.jumpLogin = function(n) {
    let {
      pageQuery: o,
      query: t = {},
      backPrevPage: u = !0
    } = n || {};
    const s = getCurrentPages().pop(),
      {
        route: a,
        options: i
      } = s || {},
      c = {
        ...i,
        ...o
      };
    u ? (e.isObject(t) || (t = {}), t.mode = "back") : t.redirect_url = encodeURIComponent(r.addUrlQuery("/" + a, c));
    const d = r.addUrlQuery("/pages/member/memberLogin", t);
    e.index.navigateTo({
      url: d
    })
  }
}();