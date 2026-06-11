! function() {
  "use strict";
  const o = require("../common/vendor.js");
  exports.useScroll = function() {
    return {
      scrollTop: o.ref(0),
      onPageScroll: o.onPageScroll
    }
  }
}();