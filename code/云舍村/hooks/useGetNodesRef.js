! function() {
  "use strict";
  const e = require("../common/vendor.js");
  exports.useGetNodesRef = function({
    selector: r,
    instance: l,
    enabled: t = !0,
    isSelectAll: n
  }) {
    const u = e.ref(),
      c = e.ref(),
      o = e.ref(),
      a = e.ref(0);

    function i() {
      a.value = 0, clearInterval(o.value)
    }
    return e.watch(() => e.unref(t), t => {
      t && r && (c.value = !1, o.value = setInterval(() => {
        if (!(a.value >= 10)) return u.value ? (c.value = !0, void i()) : void((null == l ? void 0 : l.proxy) ? u.value = n ? e.index.createSelectorQuery().in(l.proxy).selectAll(r) : e.index.createSelectorQuery().in(l.proxy).select(r) : u.value = n ? e.index.createSelectorQuery().selectAll(r) : e.index.createSelectorQuery().select(r));
        i()
      }, 300))
    }, {
      immediate: !0
    }), e.onUnmounted(() => {
      o.value && i()
    }), {
      ready: c,
      nodesRef: u
    }
  }
}();