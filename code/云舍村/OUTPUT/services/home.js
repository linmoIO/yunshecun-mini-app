! function() {
  "use strict";
  const e = require("./request/request.js"),
    t = require("../utils/request.js");
  exports.getAdData = function(e, r) {
    return t.request.get("/shopapi/sz/advertisementPage/v2", e, {}, {
      newModel: !0,
      ...r
    })
  }, exports.getDestinationsConfigSeries = function(t, r) {
    return e.request({
      url: "/shop-api/productShelfApp/getProductShelfConfigApp",
      method: "GET",
      params: t,
      ...r,
      showErrorToast: !1
    })
  }, exports.getDestinationsProductsByTab = function(t, r) {
    return e.request({
      url: "/shop-api/productShelfApp/getProductShelfInfoList",
      method: "POST",
      data: t,
      ...r,
      showErrorToast: !1
    })
  }, exports.getSearchHotWordList = function(e, r) {
    return t.request.get("/shopapi/search/getHomeHotWordList", e, {}, {
      newModel: !0,
      ...r
    })
  }, exports.quickSearch = function(e, r) {
    return t.request.post("/shopapi/search/product/title", e, {}, {
      ...r
    })
  }, exports.search = function(e, r) {
    return t.request.post("/shopapi/search/product", e, {}, {
      ...r
    })
  }
}();