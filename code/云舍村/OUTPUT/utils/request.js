! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    o = require("./config.js"),
    t = require("./signature.js"),
    r = require("./wxuser.js"),
    s = require("./requsetPostProcess.js"),
    a = require("../base/jAlert/jAlert.js"),
    n = require("../base/defaultConfig.js"),
    d = require("../base/common.js"),
    l = {
      default: o.config.baseUrlmall,
      st: ""
    };
  let i = {};

  function u(e, o, t) {
    console.log("<utils/request> {handleRequestError}", {
      err: e,
      config: o,
      url: t
    }), (null == o ? void 0 : o.showToast) && a.jAlert3((null == e ? void 0 : e.msg) || n.defaultConfig.errorMessage)
  }

  function p(o) {
    var t, r, s, a;
    const {
      startDate: n,
      id: d,
      isError: l,
      level: i = 0,
      method: u,
      requestHeaders: p,
      params: c,
      response: m
    } = o || {}, f = +new Date - n, g = JSON.stringify(m.data).slice(0, 1e3);
    let v = "unknown";
    e.isNil(null == (t = m.data) ? void 0 : t.msg) || (v = null == (r = m.data) ? void 0 : r.msg);
    let h = 10240002;
    l ? h = 10240001 : e.isNil(null == (s = m.data) ? void 0 : s.code) || (h = null == (a = m.data) ? void 0 : a.code), e.index.reportEvent("wxdata_perf_monitor", {
      wxdata_perf_monitor_id: d,
      wxdata_perf_monitor_level: i,
      wxdata_perf_error_code: h,
      wxdata_perf_error_msg: v,
      wxdata_perf_cost_time: f,
      wxdata_perf_extra_info1: JSON.stringify({
        method: u,
        params: c,
        requestHeaders: p,
        responseHeaders: null == m ? void 0 : m.header,
        statusCode: null == m ? void 0 : m.statusCode,
        responseDataPart: g
      })
    })
  } ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"].forEach(a => {
    i[a.toLowerCase()] = function(n, i, c = {}, m = {
      module: "default"
    }) {
      const f = l[m.module || "default"];
      if (0 !== (n = n.trim()).indexOf("http") && (n = f + n), i && i.memberId) {
        let e = r.getStorage("user");
        e && e.memberToken && (i.memberToken = e.memberToken, c.memberToken = e.memberToken)
      }
      return (null == m ? void 0 : m.newModel) && !(null == m ? void 0 : m.hasGroupCode) && (m.hasGroupCode = !0), (null == m ? void 0 : m.hasGroupCode) && (i || (i = {}), i.hotelGroupCode = o.config.hotelGroupCode), n.indexOf("/api/cache/sysOptions/getMultiSysOptionCommon.json"), n.indexOf("rsapi") >= 0 && (c = Object.assign({
        hotelGroupCode: o.config.hotelGroupCode,
        hotelCode: e.index.getStorageSync("hotelCode") || 0,
        usercode: "guest",
        channel: "HKApp"
      }, c)), new Promise((o, l) => {
        1 == n.indexOf("baiduAk") && (n = n.replace("api", "map"));
        let f = "",
          g = "",
          v = r.getStorage("config");
        if (v.appkey && v.appsecret && (f = v.appkey, g = v.appsecret), f && g) {
          let e = function(e) {
            for (let o in e) e.hasOwnProperty(o) && void 0 === e[o] && (e[o] = "");
            return e
          };
          0 !== n.indexOf("http") && (n = "/guardian" + n), i = e(i), t.o({
            url: n,
            data: i,
            method: a,
            header: c || {}
          }, {
            appkey: f,
            appsecret: g,
            originQuery: "GET" == a || "application/x-www-form-urlencoded" == c["Content-Type"] ? i : {}
          })
        }
        const h = {
          startDate: +new Date,
          id: n,
          method: a,
          params: i,
          level: null == m ? void 0 : m.weLevel,
          requestHeaders: c
        };
        e.index.request({
          url: n,
          data: i,
          method: a,
          header: c || {},
          success: e => {
            var t, r;
            if (console.log("<utils/request> success.res:", e), h.response = e, p(h), console.log("请求地址:" + n), console.log("请求参数:" + (i ? JSON.stringify(i) : "")), console.log("返回数据:" + (null == e ? void 0 : e.data)), (null == e ? void 0 : e.statusCode) === d.RateLimitStatusCode) {
              const o = {
                code: d.RateLimitStatusCode,
                data: e.data
              };
              return m.newModel && u(o, m, n), void l(o)
            }
            m.newModel ? 200 !== (null == e ? void 0 : e.statusCode) || 0 !== (null == (t = null == e ? void 0 : e.data) ? void 0 : t.code) && 0 !== (null == (r = null == e ? void 0 : e.data) ? void 0 : r.result) ? (u(e.data, m, n), l(e.data)) : o(e.data) : (s.processRsApi(n, e, l), o(e.data))
          },
          fail: e => {
            if (console.log("<utils/request> fail.err:", n, e), h.isError = !0, h.response = e, p(h), !m.newModel) return Promise.resolve(l);
            u(e, m, n)
          }
        })
      })
    }
  }), exports.request = i
}();