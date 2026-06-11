! function() {
  "use strict";
  const t = require("../common/vendor.js");
  exports.useLayoutStart = () => {
    let e = "";
    try {
      let {
        height: n,
        top: o
      } = t.index.getMenuButtonBoundingClientRect();
      e = n + o + 6 + "px"
    } catch (t) {}
    return {
      layoutStart: e
    }
  }
}();