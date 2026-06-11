! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/wxuser.js");
  Math || o();
  const o = () => "../../components/coustomHead.js",
    n = e.defineComponent({
      __name: "checkInSucceed",
      setup(o) {
        let n = t.getStorage("currentHotel");
        return e.onLoad(e => {}), (t, o) => ({
          a: e.p({
            title: "已办理入住",
            nativeMode: !0
          }),
          b: e.t(e.unref(n).hotelDesc),
          c: e.o(t => ("400-0000-830", void e.index.makePhoneCall({
            phoneNumber: "400-0000-830"
          }))),
          d: e.o(t => {
            e.index.switchTab({
              url: "/pages/trip/index"
            })
          })
        })
      }
    }),
    c = e._export_sfc(n, [
      ["__scopeId", "data-v-cb3c7c01"]
    ]);
  wx.createPage(c)
}();