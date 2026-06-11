! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/wxuser.js"),
    s = e.defineComponent({
      __name: "submitSucceed",
      setup(s) {
        let u = e.ref("success");
        return r.getStorage("user"), e.onLoad(e => {
          e && e.type && (u.value = e.type)
        }), (r, s) => e.e({
          a: "success" == e.unref(u)
        }, (e.unref(u), {}), {
          b: "success" == e.unref(u)
        }, (e.unref(u), {}), {
          c: "edit" == e.unref(u)
        }, (e.unref(u), {}), {
          d: "success" == e.unref(u)
        }, "success" == e.unref(u) ? {
          e: e.o(r => {
            e.index.switchTab({
              url: "/pages/travel/index"
            })
          })
        } : {}, {
          f: "edit" == e.unref(u)
        }, "edit" == e.unref(u) ? {
          g: e.o(r => {
            e.index.redirectTo({
              url: "/pagesA/member/memberAuth"
            })
          })
        } : {})
      }
    }),
    u = e._export_sfc(s, [
      ["__scopeId", "data-v-5730ea34"]
    ]);
  wx.createPage(u)
}();