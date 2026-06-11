! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    r = e.index.getRealtimeLogManager ? e.index.getRealtimeLogManager() : null,
    i = {
      info(...e) {
        (null == r ? void 0 : r.info) && r.info(e)
      },
      warn(...e) {
        (null == r ? void 0 : r.warn) && r.warn(e)
      },
      error(...e) {
        (null == r ? void 0 : r.error) && r.error(e)
      },
      setFilterMsg(e) {
        (null == r ? void 0 : r.setFilterMsg) && r.setFilterMsg(e)
      },
      addFilterMsg(e) {
        (null == r ? void 0 : r.addFilterMsg) && r.addFilterMsg(e)
      }
    };
  exports.log = i
}();