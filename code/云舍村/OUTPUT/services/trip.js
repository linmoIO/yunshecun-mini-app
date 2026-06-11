! function() {
  "use strict";
  const t = require("./request/request.js"),
    e = require("../utils/request.js");
  exports.getAdvertiseProductGroup = function(e, r) {
    return t.request({
      url: "/shop-api/productGroup/getAdvertiseProductGroupVo",
      method: "POST",
      data: e,
      ...r
    })
  }, exports.getProductGroupGoodsDataList = function(e, r) {
    return t.request({
      url: "/shop-api/productGroup/getProductGroupGoodsDataList",
      method: "POST",
      data: e,
      ...r
    })
  }, exports.getTripRecommendFeed = function(t) {
    return e.request.post("/shopapi/marketingActivity/tripAssistantRecommendation", t)
  }
}();