! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    o = require("../../utils/wxuser.js"),
    a = require("../../base/jAlert/jAlert.js");
  Math || (u + r)();
  const r = () => "../../components/bottomBtn.js",
    u = () => "../../components/coustomHead.js",
    n = e.defineComponent({
      __name: "bindBaggage",
      setup(r) {
        o.getStorage("user");
        let u = o.getStorage("config"),
          n = e.ref(""),
          s = e.ref(""),
          l = e.ref(""),
          i = e.ref(""),
          c = e.ref(!1);
        const d = () => {
          c.value || (c.value = !0, t.api.interfaceTransfer({
            query: {
              unitCode: u.hotelGroupCode,
              teamNo: n.value,
              guestId: s.value,
              serialNo: l.value,
              guestName: i.value
            },
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_UCBASE_URL",
              interfaceMethod: "/baggageBindInfo/bindForGuest",
              interfaceFrom: "GC",
              hotelGroupCode: u.hotelGroupCode
            }
          }).then(t => {
            1 == t.result && 0 == t.retVal.result ? (a.jAlert3("绑定成功"), setTimeout(() => {
              e.index.navigateBack({
                delta: 1
              })
            }, 2e3)) : (c.value = !1, a.jAlert3(t.msg || t.retVal.msg))
          }))
        };
        return e.onLoad(e => {
          s.value = e.guestId, n.value = e.teamNo, l.value = e.serialNo, i.value = e.guestName
        }), e.onMounted(() => {}), (t, o) => ({
          a: e.p({
            title: "行李吊牌",
            nativeMode: !0
          }),
          b: e.t(e.unref(l)),
          c: e.o(d)
        })
      }
    }),
    s = e._export_sfc(n, [
      ["__scopeId", "data-v-b7b6f672"]
    ]);
  wx.createPage(s)
}();