! function() {
  "use strict";
  var o, e;
  const p = require("../common/vendor.js");
  exports.config = {
    env: "production",
    version: "3.1.0",
    hotelGroupCode: "SONGTSAM",
    hotelGroupId: 1,
    hotelCode: 0,
    hotelId: 0,
    appid: "wxf26084f7c2585736",
    hotelGroupName: "松赞旅行",
    componentAppid: "",
    isOpenHotelGroupBook: "T",
    isOpenDistribution: "T",
    isOpenAdvancedSearch: "T",
    mallAppid: "",
    isOpenBook: "T",
    equipment: "desktop",
    isOpenHotelListBigPictureMode: "T",
    domain: "https://m.songtsam.com",
    baseUrlmall: "https://apiwx.songtsam.com/guardian",
    baseUrlApi: "https://api.songtsam.com",
    appkey: "81756736",
    appsecret: "DB6424FE510A11EEBFC917C3812AE482",
    aplusQueueAppKey: "8cazk1duqp299e0q778jljmo",
    qidianAppkey: "0MA006JIWVKVC962",
    qidianApiHost: "https://event.songtsam.com"
  }, exports.config.componentAppid && (exports.config = (null == (e = (o = p.index).getExtConfigSync) ? void 0 : e.call(o)) || {})
}();