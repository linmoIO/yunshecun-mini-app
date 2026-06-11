! function() {
  "use strict";
  const n = require("../../common/vendor.js");
  exports.jAlert12 = function(e, t, o, c, i, s) {
    n.index.showModal({
      title: e,
      content: s,
      cancelText: t,
      confirmText: o,
      success: function(n) {
        n.confirm || n.cancel && i && i()
      }
    })
  }, exports.jAlert3 = function(e, t) {
    if (!e && e !== 0) return;
    var o = 0;
    if (e && (o = e.length), o > 20) n.index.showModal({
      title: "提示",
      content: e,
      showCancel: !1
    });
    else {
      var c = t || 2e3;
      n.index.showToast({
        title: e,
        icon: "none",
        duration: c
      })
    }
  }, exports.jAlert5 = function(e, t, o, c) {
    n.index.showModal({
      title: e,
      content: c || "",
      success: function(n) {
        n.confirm ? t && t() : n.cancel && o && o()
      }
    })
  }
}();