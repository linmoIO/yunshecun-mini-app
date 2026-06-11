! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../utils/request.js");
  exports.adReport = (e, s) => t.request.post("/advertise-server/app-api/advertise/app/appReport", e, {}, {
    newModel: !0,
    ...s
  }), exports.getRecommendProducts = e => t.request.post("/shopapi/marketingActivity/payCompletionPageRecommendation", e), exports.getSysOptionsByCode = e => t.request.get("/api/travel/getSysOptionsByCode", e), exports.refreshQtPageConfigData = ({
    timeStamp: t
  }) => new Promise((s, o) => {
    e.index.request({
      method: "GET",
      url: "https://songtsam-internal-static.oss-cn-chengdu.aliyuncs.com/mobile/qt-page-config.json?timeStamp=" + t
    }).then(e => {
      200 === e.statusCode && s(e.data)
    }).catch(o)
  })
}();