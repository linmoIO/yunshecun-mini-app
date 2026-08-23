! function() {
  "use strict";
  const e = require("../user.js"),
    r = require("../../utils/user.js");
  let n = !1,
    o = 0,
    s = [];

  function t(e, r = null) {
    const n = [...s];
    s = [], n.forEach(({
      resolve: n,
      reject: o
    }) => {
      try {
        e ? o(e) : n(r)
      } catch (e) {
        console.error("[tokenManager] 处理队列中的请求时出错:", e)
      }
    })
  }

  function l(e) {
    var r;
    return 401 === (null == e ? void 0 : e.status) || 401 === (null == (r = null == e ? void 0 : e.data) ? void 0 : r.code)
  }

  function u(e, s) {
    return console.warn(`[services] <request/tokenManager> {refreshTokenAndRetry} ${s}:`, e), n = !1, o = 0, t(new Error(s), null), r.removeUserToken(), null
  }
  exports.isTokenExpired = function(e) {
    return l(e)
  }, exports.refreshTokenAndRetry = async function() {
    if (n && o && Date.now() - o > 1e4 && (console.warn("[tokenManager] Token刷新超时，重置状态"), n = !1, o = 0, t(new Error("Token refresh timeout"), null)), n) return s.length > 100 && (console.warn("[tokenManager] 队列过长，清理一半的请求"), s.splice(0, Math.floor(s.length / 2)).forEach(({
      reject: e
    }) => {
      e(new Error("Token refresh queue overflow"))
    })), new Promise((e, r) => {
      s.push({
        resolve: e,
        reject: r
      })
    });
    n = !0, o = Date.now();
    const c = new Promise((e, r) => {
      setTimeout(() => {
        r(new Error("Token refresh timeout"))
      }, 1e4)
    });
    try {
      const {
        refreshToken: s
      } = r.getUserToken();
      if (!s) return u(null, "没有可用的refresh token");
      const a = await Promise.race([e.refreshToken(), c]);
      if (l(a)) return u(a, "refreshToken接口返回401，refreshToken已过期");
      if (! function(e) {
          var r;
          return 200 === (null == e ? void 0 : e.status) && (null == (r = null == e ? void 0 : e.data) ? void 0 : r.success)
        }(a)) return u(a, "refreshToken接口返回失败");
      const {
        accessToken: i,
        refreshToken: k
      } = function(e) {
        var r, n;
        const headers = (null == e ? void 0 : e.headers) || {};
        return {
          accessToken: headers.accessToken || headers.accesstoken || headers["Access-Token"] || (null == (r = null == e ? void 0 : e.data) ? void 0 : r.accessToken) || (null == e ? void 0 : e.accessToken),
          refreshToken: headers.refreshToken || headers.refreshtoken || headers["Refresh-Token"] || (null == (n = null == e ? void 0 : e.data) ? void 0 : n.refreshToken) || (null == e ? void 0 : e.refreshToken)
        }
      }(a);
      return i && k ? (r.setUserToken({
        accessToken: i,
        refreshToken: k
      }), n = !1, o = 0, t(null, i), i) : u(a, "刷新token失败：响应数据格式错误，未找到有效的token")
    } catch (e) {
      return console.error("[services] <request/tokenManager> {refreshTokenAndRetry} token刷新失败:", e), n = !1, o = 0, t(e, null), r.removeUserToken(), null
    }
  }
}();
