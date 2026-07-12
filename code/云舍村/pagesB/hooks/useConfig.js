! function() {
  "use strict";
  const e = require("../../utils/config.js");
  exports.useConfig = function() {
    return { config: e.config || {} };
  };
}();
