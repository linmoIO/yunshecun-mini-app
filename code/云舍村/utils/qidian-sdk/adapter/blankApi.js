! function() {
  "use strict";
  const o = {
    instance: null,
    init: () => {
      console.log("QDT|uni|init 该平台缺少 初始化方法")
    },
    setAccountInfo: () => {
      console.log("QDT|uni|setAccountInfo 该平台缺少 设置自定义身份方法")
    },
    setCommonData: () => {
      console.log("QDT|uni|setCommonData 该平台缺少 设置自定义属性方法")
    },
    track: () => {
      console.log("QDT|uni|track 该平台缺少 自定义上报方法")
    },
    setAes: () => {
      console.log("QDT|uni|track 该平台缺少 自定义上报方法")
    },
    getIDs: () => {
      console.log("QDT|uni|getIDs 该平台缺少 获取用户账号信息")
    },
    addParamsToUrl: () => {
      console.log("QDT|uni|addParamsToUrl 该平台缺少 给路径地址添加参数")
    }
  };
  exports.QDTracker = o
}();