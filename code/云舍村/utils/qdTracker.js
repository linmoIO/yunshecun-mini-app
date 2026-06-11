! function() {
  "use strict";
  const e = require("./config.js"),
    t = require("./qidian-sdk/index.js"),
    o = t.QDTMixin,
    r = t.QDTracker,
    a = {
      set: e => {
        Object.keys(e).length > 0 && (console.log("[utils/qdTracker] {commonData} {set}", e), r.setCommonData(e))
      },
      reset: e => {
        Object.keys(e).length > 0 && (Object.keys(e).forEach(t => {
          e[t] = ""
        }), console.log("[utils/qdTracker] {commonData} {reset}", e), r.setCommonData(e))
      }
    },
    n = {
      init: () => {
        r.init({
          debug: !1,
          appid: e.config.appid,
          appkey: e.config.qidianAppkey,
          application: "云舍村",
          apiHost: e.config.qidianApiHost,
          encryptMode: "close",
          track_interval: 0,
          batch_max_time: 1,
          session_interval: 18e5,
          autoTrack: {
            appLaunch: !0,
            appShow: !0,
            appHide: !0,
            pageShow: !0,
            pageHide: !0,
            pageShare: !0,
            mpClick: !1
          }
        })
      },
      track: (e, t) => {
        const o = getCurrentPages(),
          a = o[o.length - 1],
          n = o.length > 1 ? o[o.length - 2] : void 0;
        t = {
          ...t,
          ...(null == a ? void 0 : a.route) && {
            current_page: a.route
          },
          ...(null == n ? void 0 : n.route) && {
            previous_page: n.route
          }
        }, console.log("[utils/qdTracker] {track}", e, t), r.track(e, t)
      },
      setData: a.set,
      resetData: a.reset
    },
    i = new Proxy(r, {
      get(e, t, o) {
        if (t in n) return n[t];
        const r = Reflect.get(e, t, o);
        return "function" == typeof r ? function(...o) {
          return console.log(`[utils/qdTracker] proxy {${t.toString()}} args:`, ...o), r.apply(e, o)
        } : r
      }
    });
  exports.QDTMixin = o, exports.qdTracker = i
}();