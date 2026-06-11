! function() {
  "use strict";
  const r = require("./adapter/blankApi.js"),
    i = require("./adapter/mp.js");
  exports.QDTracker = {}, void 0 === i.QDTMini ? (console.error("该平台尚未兼容敬请期待"), exports.QDTracker = r.QDTracker) : (exports.QDTracker = i.QDTMini, exports.QDTracker.init, Object.keys(r.QDTracker).forEach(e => {
    e in i.QDTMini || ("object" == typeof i.QDTMini.instance && "function" == typeof i.QDTMini.instance[e] ? exports.QDTracker[e] = i.QDTMini.instance[e].bind(i.QDTMini.instance) : exports.QDTracker[e] = r.QDTracker[e].bind(r.QDTracker)),
      function(r, i) {
        if ("track" === i) {
          const i = r.track;
          r.track = function() {
            const e = [].slice.call(arguments, 0);
            return i.apply(r, e)
          }
        }
      }(exports.QDTracker, e)
  }));
  const e = i.QDTMini.QDTMixin;
  exports.QDTMixin = e
}();