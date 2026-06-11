! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    a = require("../../utils/wxuser.js"),
    o = require("../../utils/utils.js"),
    r = require("../../hooks/useScanCoupon.js"),
    n = require("../../base/jAlert/jAlert.js");
  Math || (s + l + u)();
  const u = () => "../../components/bottomBtn.js",
    s = () => "../../components/coustomHead.js",
    l = () => "../../components/empty.js",
    i = e.defineComponent({
      __name: "addBaggage",
      setup(u) {
        let s = a.getStorage("config");
        const {
          scanCode: l
        } = r.useScanCoupon();
        let i = e.ref(""),
          g = e.ref(""),
          c = e.ref(!0),
          f = e.ref(!1),
          d = e.ref(""),
          m = e.ref([]),
          p = e.ref("");
        const h = () => {
            l().then(e => {
              o.goPage(`/pagesD/baggage/bindBaggage?guestId=${g.value}&teamNo=${i.value}&guestName=${d.value}&serialNo=${e}`)
            })
          },
          v = () => {
            o.goPage("/pagesD/baggage/historyBaggage?guestId=" + p.value)
          },
          C = () => {
            t.api.interfaceTransfer({
              query: {
                unitCode: s.hotelGroupCode,
                teamNo: i.value,
                guestId: g.value
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_UCBASE_URL",
                interfaceMethod: "/baggageBindInfo/listForGuest",
                interfaceFrom: "GC",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(e => {
              1 == e.result && 0 == e.retVal.result ? m.value = e.retVal.retVal : n.jAlert3(e.result.msg || e.msg), c.value = !1
            })
          };
        return e.onLoad(e => {
          g.value = e.guestId, i.value = e.teamNo, d.value = e.guestName, p.value = e.memberGuestId
        }), e.onShow(() => {
          C()
        }), (a, o) => e.e({
          a: e.p({
            title: "行李吊牌",
            nativeMode: !0
          }),
          b: !e.unref(c) && 0 == e.unref(m).length
        }, e.unref(c) || 0 != e.unref(m).length ? {} : {
          c: e.p({
            tips: "暂无行李吊牌"
          })
        }, {
          d: e.unref(m).length >= 0
        }, e.unref(m).length >= 0 ? {
          e: e.f(e.unref(m), (a, o, r) => ({
            a: e.t(a.serialNo),
            b: e.t(a.itineraryName),
            c: e.o(o => (a => {
              f.value || (f.value = !0, e.index.showModal({
                title: "是否作废行李牌",
                content: "行李牌一经作废将无法使用",
                cancelText: "否",
                cancelColor: "#000",
                confirmText: "是",
                confirmColor: "#000",
                success(e) {
                  e.confirm ? t.api.interfaceTransfer({
                    query: {
                      unitCode: s.hotelGroupCode,
                      serialNo: a.serialNo
                    },
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_UCBASE_URL",
                      interfaceMethod: "/baggageBindInfo/invalid",
                      interfaceFrom: "GC",
                      hotelGroupCode: s.hotelGroupCode
                    }
                  }).then(e => {
                    1 == e.result && 0 == e.retVal.result ? (n.jAlert3("行李牌作废成功"), C()) : n.jAlert3(e.result.msg || e.msg), f.value = !1
                  }) : e.cancel && (f.value = !1)
                }
              }))
            })(a), o),
            d: o
          }))
        } : {}, {
          f: e.o(v),
          g: e.o(h)
        })
      }
    }),
    g = e._export_sfc(i, [
      ["__scopeId", "data-v-3a77aafa"]
    ]);
  wx.createPage(g)
}();