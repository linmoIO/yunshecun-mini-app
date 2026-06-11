! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../base/common.js"),
    s = require("../../base/jAlert/jAlert.js"),
    n = require("../../utils/config.js"),
    o = require("../../utils/user.js"),
    t = require("../../utils/utils.js"),
    i = require("./tokenManager.js"),
    u = e.un.create({}),
    a = {
      showErrorToast: !0,
      baseUrl: n.config.baseUrlApi
    };
  async function c(n) {
    const {
      config: a,
      data: d,
      status: l
    } = n || {};
    if (null == a ? void 0 : a.skipErrorHandler) return (null == a ? void 0 : a.showLoading) && e.index.hideLoading(), Promise.reject(n);
    if ((null == a ? void 0 : a.retryCount) && a.retryCount > 0 && !i.isTokenExpired(n) && (a._currentRetryCount || 0) < a.retryCount) return async function(r, s) {
      const {
        retryCount: n = 0,
        _currentRetryCount: o = 0
      } = r;
      if (o >= n) return Promise.reject(s);
      const t = {
        ...r,
        _currentRetryCount: o + 1
      };
      t.showLoading && e.index.showLoading({
        title: "加载中..."
      });
      try {
        return await u.request(t)
      } catch (e) {
        return c(e.response || e)
      }
    }(a, n);
    if ((null == a ? void 0 : a.showLoading) && e.index.hideLoading(), i.isTokenExpired(n) && !(null == a ? void 0 : a._retry) && !(null == a ? void 0 : a._isTokenRefresh)) try {
      const e = {
        ...a,
        _retry: !0
      };
      if (!await i.refreshTokenAndRetry()) throw new Error("Failed to refresh token");
      const {
        accessToken: r,
        refreshToken: s
      } = o.getUserToken(), n = {
        ...e.headers
      };
      r && (n.accessToken = r), s && (n.refreshToken = s);
      const t = {
        ...e,
        headers: n
      };
      return u.request(t)
    } catch (e) {
      return console.error("[services] <request> {instance.interceptors.response} Token刷新失败: ", e), (null == a ? void 0 : a.showErrorToast) && s.jAlert3("登录已过期，请重新登录"), t.toLogin(), Promise.reject(n)
    }
    return (null == a ? void 0 : a.showErrorToast) && s.jAlert3((null == d ? void 0 : d.message) || r.defaultErrorMessage), 429 === l && (d._serverLimiting = !0), Promise.reject(n)
  }
  u.interceptors.request.use(r => {
    if (!r._isTokenRefresh) {
      const {
        accessToken: e,
        refreshToken: s
      } = o.getUserToken();
      (null == r ? void 0 : r.headers) || (r.headers = {}), e && (r.headers.accessToken = e), s && (r.headers.refreshToken = s)
    }
    const s = {
      ...a,
      ...r
    };
    return s.showLoading && e.index.showLoading({
      title: "加载中..."
    }), s
  }, e => Promise.reject(e)), u.interceptors.response.use(r => {
    const {
      config: s,
      data: n,
      status: o
    } = r;
    return (null == s ? void 0 : s.showLoading) && e.index.hideLoading(), 200 === o && (null == n ? void 0 : n.success) ? (null == s ? void 0 : s.isReturnRawData) ? r : null == n ? void 0 : n.data : c(r)
  }, async e => c(e.response)), exports.request = function(e) {
    return u.request(e)
  }
}();