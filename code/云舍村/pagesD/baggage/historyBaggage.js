! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js"),
    o = require("../../base/jAlert/jAlert.js");
  Math || (n + a)();
  const n = () => "../../components/coustomHead.js",
    a = () => "../../components/empty.js",
    u = e.defineComponent({
      __name: "historyBaggage",
      setup(n) {
        let a = r.getStorage("config"),
          u = e.ref(""),
          s = e.ref(!0),
          i = e.ref([]);
        return e.onLoad(e => {
          u.value = e.guestId
        }), e.onMounted(() => {
          t.api.interfaceTransfer({
            query: {
              unitCode: a.hotelGroupCode,
              memberGuestId: u.value
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_UCBASE_URL",
              interfaceMethod: "/baggageBindInfo/historyForGuest",
              interfaceFrom: "GC",
              hotelGroupCode: a.hotelGroupCode
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result ? i.value = e.retVal.retVal : o.jAlert3(e.result.msg || e.msg), s.value = !1
          })
        }), (t, r) => e.e({
          a: e.p({
            title: "历史行李牌",
            nativeMode: !0
          }),
          b: !e.unref(s) && 0 == e.unref(i).length
        }, e.unref(s) || 0 != e.unref(i).length ? {} : {
          c: e.p({
            tips: "暂无行李吊牌"
          })
        }, {
          d: e.f(e.unref(i), (t, r, o) => ({
            a: e.t(t.serialNo),
            b: r
          }))
        })
      }
    }),
    s = e._export_sfc(u, [
      ["__scopeId", "data-v-0a84e6d4"]
    ]);
  wx.createPage(s)
}();