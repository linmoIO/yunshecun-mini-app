! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = e.defineComponent({
      __name: "index",
      setup(o) {
        const a = e.ref("");
        return e.onLoad(e => {
          const {
            requestDomain: o,
            activeCodeType: d,
            activeCodeId: n,
            bizId: t,
            corpId: c,
            agentId: i
          } = e || {};
          o && n && t && c && d && i && (a.value = `${o}/wxwork/midpage/active-qrcode?id=${n}&bizId=${t}&corpId=${c}&activeCodeType=${d}&agentId=${i}`)
        }), (o, d) => e.e({
          a: a.value
        }, a.value ? {
          b: a.value
        } : {})
      }
    });
  wx.createPage(o)
}();