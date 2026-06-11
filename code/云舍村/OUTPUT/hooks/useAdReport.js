! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    o = require("../services/common.js"),
    r = require("../utils/wxuser.js"),
    t = [];
  exports.useAdReport = function() {
    const n = e.ref(""),
      u = e.ref(r.getStorage("wxuser")),
      s = e.ref({});

    function l(e, r) {
      var l, a;
      if (!u.value) return console.log("<useAdReport> {report} wxuser 未获取到，加入队列等待"), void t.push({
        actionType: e,
        otherParams: r
      });
      const c = {
        ...s.value,
        ...null == r ? void 0 : r.query
      };
      (null == r ? void 0 : r.query) && Reflect.deleteProperty(r, "query");
      const {
        qz_gdt: i,
        gdt_vid: d
      } = c || {};
      (i || d) && (s.value = c, n.value = d || i);
      const p = (null == (l = u.value) ? void 0 : l.openid) || "",
        v = (null == (a = u.value) ? void 0 : a.unionid) || "",
        f = {
          gdtVid: c.gdt_vid,
          wxTraceid: c.wx_traceid
        };
      return f.traceParam = {
        ...c
      }, new Promise((u, s) => {
        console.log("<useAdReport> {report.before}", e, r);
        const l = {
          actionType: e,
          wechatOpenId: p,
          wechatUnionId: v,
          query: f,
          ...r
        };
        console.log("<useAdReport> {report.beforeFetch}", l, !!n.value), o.adReport(l).then(e => {
          console.log("<useAdReport> {report.success}", e, l), u(e)
        }).catch(e => {
          s(e)
        }).finally(() => {
          console.log("<useAdReport> {report.finally}", t)
        })
      })
    }
    return function() {
      const o = e.index.getLaunchOptionsSync();
      s.value = o.query
    }(), e.index.$on("app-update-wxuser", o => {
      console.log("<useAdReport> {uni.$on.app-update-wxuser}", o), u.value ? e.index.$off("app-update-wxuser") : (u.value = o, setTimeout(() => {
        t.forEach((e, o) => {
          var r;
          null == (r = l(e.actionType, e.otherParams)) || r.finally(() => {
            t.splice(o, 1)
          })
        })
      }, 300))
    }), l
  }
}();