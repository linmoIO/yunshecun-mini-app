! function() {
  "use strict";
  const noop = function() {};
  const getEmpty = function() {
    return {};
  };
  const instance = {
    init: noop,
    track: noop,
    setData: noop,
    resetData: noop,
    setCommonData: noop,
    setAccountInfo: noop,
    setCommonParams: noop,
    getCommonData: getEmpty,
    getCommonParams: getEmpty
  };
  exports.QDTracker = {
    instance,
    init: noop,
    track: noop,
    setData: noop,
    resetData: noop,
    setCommonData: noop,
    setAccountInfo: noop,
    setCommonParams: noop,
    getCommonData: instance.getCommonData,
    getCommonParams: instance.getCommonParams
  };
  exports.QDTMixin = {};
}();
