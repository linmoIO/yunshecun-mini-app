! function() {
  "use strict";
  const t = require("../utils/wxuser.js");
  exports.useConfig = function() {
    return {
      config: t.getStorage("config")
    }
  }
}();