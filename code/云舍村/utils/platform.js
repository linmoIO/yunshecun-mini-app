! function() {
  "use strict";
  const e = require("../common/vendor.js");
  exports.getMenuButtonBoundingClientRect = function() {
    return e.index.getMenuButtonBoundingClientRect()
  }, exports.makeTel = function(n) {
    e.index.makePhoneCall({
      phoneNumber: n
    })
  }, exports.previewImage = function(n) {
    e.index.previewImage({
      current: n.current,
      urls: n.urls
    })
  }, exports.setClipboardData = function(n) {
    e.index.setClipboardData({
      data: n.data,
      success: () => {
        n.success && n.success()
      }
    })
  }
}();