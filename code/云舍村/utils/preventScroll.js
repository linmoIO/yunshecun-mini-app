! function() {
  "use strict";
  const e = require("../common/vendor.js");
  exports.preventScroll = function() {
    e.wx$1.setPageStyle({
      style: {
        overflow: "hidden"
      }
    })
  }, exports.restoreScroll = function() {
    e.wx$1.setPageStyle({
      style: {
        overflow: ""
      }
    })
  }
}();