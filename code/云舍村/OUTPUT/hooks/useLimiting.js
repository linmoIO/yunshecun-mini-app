! function() {
  "use strict";
  const n = require("../common/vendor.js");
  exports.useLimiting = function() {
    const t = n.ref(3),
      e = n.ref(!1);
    let o = null;

    function u() {
      o && (clearInterval(o), o = null), e.value = !1
    }
    return n.onUnmounted(() => {
      u()
    }), {
      countdown: t,
      isCounting: e,
      startCountdown: function() {
        e.value = !0, t.value = 3, o = setInterval(() => {
          t.value--, t.value <= 0 && u()
        }, 1e3)
      },
      stopCountdown: u
    }
  }
}();