! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    n = require("./config.js");
  require("./request.js"), require("./log.js"), require("./qdTracker.js"), require("./umengAdaptor.js");
  const i = require("../base/aplusPageConfig.js"),
    o = require("./qt_mini.esm.js"),
    r = n.config.aplusQueueAppKey;
  exports.init = function() {
    var s;
    const u = {
      metaInfo: {
        DEBUG: "production" !== n.config.env,
        appKey: r,
        trackDomain: "quickaplus-he-api-cn-shanghai.aliyuncs.com",
        globalproperty: {
          from: "uniapp"
        },
        ...i.autoConfig
      }
    };
    try {
      const n = e.index.getAccountInfoSync();
      (null == (s = null == n ? void 0 : n.miniProgram) ? void 0 : s.version) && (u.metaInfo.appVersion = n.miniProgram.version)
    } catch (e) {
      console.warn("[utils/aplus] 获取账户信息失败:", e)
    }
    o.la(u)
  }
}();