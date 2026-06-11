! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    o = require("../utils/api.js"),
    t = require("../utils/config.js"),
    n = new Map;
  exports.useSysOptions = function(i, u) {
    const r = e.shallowRef([]),
      c = e.computed(() => e.unref(i));

    function l(e = !1) {
      if (!c.value.length && !e) return;
      const i = c.value.filter(e => !n.has(e));
      if (!i.length) return void s();
      const u = {
        appid: t.config.appid,
        codes: i.join(","),
        componentAppid: t.config.componentAppid,
        hotelCode: t.config.hotelCode || 0,
        hotelGroupCode: t.config.hotelGroupCode,
        clientType: "wechat_mini"
      };
      o.api.getMultiSysOptionCommon(u).then(e => {
        var o;
        1 === e.result && (null == (o = e.retVal) ? void 0 : o.length) && e.retVal.forEach(e => {
          n.set(e.code, e)
        }), s()
      }).catch(e => {
        console.log(e), s()
      })
    }

    function s() {
      r.value = c.value.reduce((e, o) => {
        const t = n.get(o);
        return t && e.push(t), e
      }, [])
    }
    return e.watch(c, () => {
      (null == u ? void 0 : u.manual) || l()
    }, {
      immediate: !0
    }), {
      result: r,
      refresh: l
    }
  }
}();