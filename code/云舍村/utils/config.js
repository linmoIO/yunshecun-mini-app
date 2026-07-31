! function() {
  "use strict";
  var o, e;
  const p = require("../common/vendor.js");

  // 测试环境切换：false 使用云端，true 使用本地 Docker HTTPS。
  const USE_LOCAL_BACKEND = true;
  const CLOUD_API_BASE_URL = "https://test.yunshecun.com/api";
  const LOCAL_API_BASE_URL = "https://localhost:3443/api";
  const API_BASE_URL = USE_LOCAL_BACKEND ? LOCAL_API_BASE_URL : CLOUD_API_BASE_URL;
  // 当前云端后端不使用旧系统 appkey/appsecret 签名
  const ENABLE_LEGACY_API_SIGNATURE = false;

  const _prodConfig = {
    env: USE_LOCAL_BACKEND ? "development" : "production",
    version: "3.1.0",
    hotelGroupCode: "SONGTSAM",
    hotelGroupId: 1,
    hotelCode: 0,
    hotelId: 0,
    appid: "wxc8e2d82494b5b533",
    hotelGroupName: "云舍村",
    componentAppid: "",
    isOpenHotelGroupBook: "T",
    isOpenDistribution: "T",
    isOpenAdvancedSearch: "T",
    mallAppid: "",
    isOpenBook: "T",
    equipment: "desktop",
    isOpenHotelListBigPictureMode: "T",
    domain: "",
    baseUrlmall: API_BASE_URL,
    baseUrlApi: API_BASE_URL,
    appkey: ENABLE_LEGACY_API_SIGNATURE ? "81756736" : "",
    appsecret: ENABLE_LEGACY_API_SIGNATURE ? "DB6424FE510A11EEBFC917C3812AE482" : "",
    aplusQueueAppKey: "8cazk1duqp299e0q778jljmo",
    qidianAppkey: "0MA006JIWVKVC962",
    qidianApiHost: ""
  };
  exports.config = _prodConfig, exports.config.componentAppid && (exports.config = (null == (e = (o = p.index).getExtConfigSync) ? void 0 : e.call(o)) || {})
}();
