! function() {
  "use strict";
  const t = require("../common/vendor.js"),
    e = require("../utils/umengAdaptor.js");

  function o(t) {
    return t.replace(/^data-/, "").replace(/[-](.)/g, (t, e) => e.toUpperCase())
  }
  exports.useQTAutoClk = function({
    props: a,
    buttonNamePrefix: n
  } = {
    cssSelector: "click_auto_control",
    eventName: "click_custom_auto_clk_control",
    props: ["data-button-name"]
  }) {
    const c = t.computed(() => (a || []).map(t => o(t))),
      r = t.ref(!0);
    return {
      handleQTClick: function(t) {
        var a;
        if (!r.value) return;
        if (!(null == (a = t.target) ? void 0 : a.dataset) || !Object.keys(t.target.dataset).length) return;
        const u = {};
        let s = !1;
        Object.keys(t.target.dataset).forEach(e => {
          const a = o(e);
          if (c.value.includes(a)) {
            const o = a.replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, "");
            u[o] = `${n&&"buttonName"===a?n:""}${t.target.dataset[e]}`
          }
          "qtAutoClk" === a && (s = !0)
        }), s && e.adaptor.sendEvent("click_custom_auto_clk_control", u)
      },
      startListen: function() {
        r.value = !0
      },
      stopListen: function() {
        r.value = !1
      }
    }
  }
}();