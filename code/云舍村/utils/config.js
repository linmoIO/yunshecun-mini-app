! function() {
  "use strict";
  var o, e;
  const p = require("../common/vendor.js");

  // 本地开发后端地址（开发时将此设为 true 并填写本地服务器地址）
  const USE_LOCAL_BACKEND = true;
  const LOCAL_BACKEND_URL = "http://localhost:3000/api";

  const _prodConfig = {
    env: "production",
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
    baseUrlmall: USE_LOCAL_BACKEND ? LOCAL_BACKEND_URL : "",
    baseUrlApi: USE_LOCAL_BACKEND ? LOCAL_BACKEND_URL : "",
    // 使用本地后端时清空 appkey/appsecret 以跳过签名
    appkey: USE_LOCAL_BACKEND ? "" : "81756736",
    appsecret: USE_LOCAL_BACKEND ? "" : "DB6424FE510A11EEBFC917C3812AE482",
    aplusQueueAppKey: "8cazk1duqp299e0q778jljmo",
    qidianAppkey: "0MA006JIWVKVC962",
    qidianApiHost: ""
  };
  exports.config = _prodConfig, exports.config.componentAppid && (exports.config = (null == (e = (o = p.index).getExtConfigSync) ? void 0 : e.call(o)) || {})
}();
