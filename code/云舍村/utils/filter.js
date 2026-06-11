! function() {
  "use strict";
  const t = require("../common/vendor.js");
  exports.hideIdCard = (t, e) => {
    try {
      return t.substring(0, 3) + "*".repeat(t.length - 6) + t.substring(t.length - 3)
    } catch (e) {
      return t
    }
  }, exports.priceFormat = t => t.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"), exports.sensitiveIdNo = t => {
    try {
      return t ? t.substring(0, 3) + "*".repeat(t.length - 6) + t.substring(t.length - 3) : ""
    } catch (t) {
      return ""
    }
  }, exports.sensitiveName = t => {
    try {
      return t ? `${t[0]}${"*".repeat(t.length-1)}` : ""
    } catch (t) {
      return ""
    }
  }, exports.sensitivePhone = t => {
    try {
      return t ? t.replace(/(\d{3})\d*(\d{4})/, "$1****$2") : ""
    } catch (t) {
      return ""
    }
  }, exports.timeDay = e => t.dayjs(e).format("YYYY.MM.DD"), exports.timeDay2 = e => t.dayjs(e).format("YYYY-MM-DD"), exports.timeFilterMD = e => t.dayjs(e).format("MM月DD日"), exports.timeFilterMD2 = e => t.dayjs(e).format("MM.DD"), exports.valFormat = t => t ? (t = Number(t), Number(t.toFixed(2)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")) : 0
}();