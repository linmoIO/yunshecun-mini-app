! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    u = require("../base/common.js");
  exports.useRequest = (a, t) => {
    const {
      manual: l,
      onSuccess: n,
      onError: o,
      onRateLimit: r
    } = t || {}, s = e.ref(!1), i = e.ref(!1), v = e.ref(!1), c = e.ref(!1), d = e.ref(void 0), m = async (...e) => {
      s.value = !0, i.value = !1, v.value = !1, c.value = !1;
      const t = e[0];
      return a(...e).then(e => {
        d.value = (null == e ? void 0 : e.data) || e, i.value = !0, c.value = !1, null == n || n(d.value, t)
      }).catch(e => {
        v.value = !0, (null == e ? void 0 : e.code) === u.RateLimitStatusCode || (null == e ? void 0 : e.status) === u.RateLimitStatusCode ? (c.value = !0, null == r || r(e, t)) : null == o || o(e, t)
      }).finally(() => {
        s.value = !1
      })
    };
    return e.onMounted(() => {
      l || m()
    }), {
      data: d,
      run: m,
      isSuccess: i,
      isError: v,
      loading: s,
      isRateLimited: c
    }
  }
}();