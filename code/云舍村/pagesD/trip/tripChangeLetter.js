! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js"),
    a = require("../../base/jAlert/jAlert.js");
  require("../../utils/config.js"), require("../../utils/log.js"), require("../../utils/qdTracker.js"), require("../../utils/umengAdaptor.js"), Math || u();
  const u = () => "../../components/coustomHead.js",
    o = e.defineComponent({
      __name: "tripChangeLetter",
      setup(u) {
        let o = r.getStorage("user"),
          n = r.getStorage("config"),
          f = e.ref(""),
          i = e.ref({}),
          s = e.ref(""),
          c = e.ref(!1),
          l = e.ref(!0),
          d = e.ref(""),
          m = e.ref({}),
          N = e.ref(!1),
          v = e.ref("");
        e.onLoad(e => {
          e.teamNo && (f.value = e.teamNo), e.adjustNo && (s.value = e.adjustNo), e.guestNo && (d.value = e.guestNo), e.orderNo && (v.value = e.orderNo)
        }), e.watch(() => i.value, () => {
          var e = !0;
          i.value.guestDtos.forEach(t => {
            t.orderNo == v.value && ("ONLINE" == t.confirmSta || "OFFLINE" == t.confirmSta || t.checked || (e = !1))
          }), c.value = e
        }, {
          deep: !0
        });
        const S = t => e.dayjs(t).format("YYYY-MM-DD HH:mm"),
          h = () => {
            if (!N.value) {
              N.value = !0;
              var r = [];
              if ("T" == i.value.isRsvMan) {
                if (i.value.guestDtos.forEach(e => {
                    e.checked && e.orderNo == v.value && r.push(e.guestNo)
                  }), 0 == r.length) return void a.jAlert3("请选择确认人")
              } else i.value.guestDtos.forEach(e => {
                d.value == e.guestNo && r.push(e.guestNo)
              });
              t.api.interfaceTransfer({
                query: {
                  dataList: r,
                  adjustNo: s.value
                },
                config: {
                  interfaceType: "POST",
                  interfaceModule: "GC_TRAVEL_ORDER",
                  interfaceMethod: "/api/adjustCustomer/onlineConfirm",
                  interfaceFrom: "GC",
                  hotelGroupCode: n.hotelGroupCode
                }
              }).then(t => {
                1 == t.result && 0 == t.retVal.result && (a.jAlert3("确认完成"), setTimeout(() => {
                  if ("T" == i.value.isRsvMan) {
                    var t = !0;
                    i.value.guestDtos.forEach(e => {
                      "ONLINE" == e.confirmSta || "OFFLINE" == e.confirmSta || e.checked || (t = !1)
                    }), t ? e.index.navigateBack({
                      delta: 1
                    }) : (E("confirm"), N.value = !1)
                  } else N.value = !1, e.index.navigateBack({
                    delta: 1
                  })
                }, 2e3))
              })
            }
          },
          j = () => {
            i.value.guestDtos.forEach(e => {
              e.orderNo == v.value && "WAIT" == e.confirmSta && (c.value ? e.checked = !1 : e.checked = !0)
            })
          },
          E = r => {
            t.api.interfaceTransfer({
              query: {
                unitCode: n.hotelGroupCode,
                phone: o.mobile,
                teamNo: f.value
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/adjustCustomer/list",
                interfaceFrom: "GC",
                hotelGroupCode: n.hotelGroupCode
              }
            }).then(t => {
              1 == t.result && 0 == t.retVal.result && (l.value = !0, t.retVal.retVal = t.retVal.retVal.filter(e => "S" !== e.adjustSta && "W" !== e.adjustSta && "M" !== e.adjustSta && "X" !== e.adjustSta), t.retVal.retVal.forEach(e => {
                e.adjustNo == s.value && (i.value = e, e.guestDtos.forEach(e => {
                  d.value ? d.value == e.guestNo && (m.value = e) : e.orderNo == v.value && "WAIT" == e.confirmSta && (l.value = !1)
                }))
              }), l.value && "confirm" == r && e.index.navigateBack({
                delta: 1
              }))
            })
          };
        return e.onMounted(() => {
          E("init")
        }), (t, r) => e.e({
          a: e.p({
            title: "行程变更确认书",
            nativeMode: !0
          }),
          b: e.f(e.unref(i).adjustOrderDtos, (t, r, a) => {
            return e.e({
              a: e.t(r + 1),
              b: "ADD" == t.adjustType
            }, (t.adjustType, {}), {
              c: "MODIFY" == t.adjustType
            }, (t.adjustType, {}), {
              d: "DELETE" == t.adjustType
            }, (t.adjustType, {}), {
              e: e.t(t.activityName),
              f: e.t((u = t.bizDatetime, e.dayjs(u).format("YYYY-MM-DD"))),
              g: e.t(t.activityBegin),
              h: r
            });
            var u
          }),
          c: e.t(e.unref(i).teamNo),
          d: e.t(e.unref(i).submitButlerDescript),
          e: e.unref(d) && ("ONLINE" == e.unref(m).confirmSta || "OFFLINE" == e.unref(m).confirmSta)
        }, !e.unref(d) || "ONLINE" != e.unref(m).confirmSta && "OFFLINE" != e.unref(m).confirmSta ? "T" == e.unref(i).isRsvMan ? e.e({
          l: e.unref(c)
        }, (e.unref(c), {}), {
          m: e.o(j),
          n: e.f(e.unref(i).guestDtos, (t, r, a) => e.e({
            a: t.orderNo == e.unref(v)
          }, t.orderNo == e.unref(v) ? e.e({
            b: e.t(t.name),
            c: "WAIT" == t.confirmSta
          }, "WAIT" == t.confirmSta ? {} : "ONLINE" == t.confirmSta ? {
            e: e.t(S(t.confirmDatetime))
          } : "OFFLINE" == t.confirmSta ? {
            g: e.t(S(t.confirmDatetime))
          } : {}, {
            d: "ONLINE" == t.confirmSta,
            f: "OFFLINE" == t.confirmSta,
            h: "ONLINE" == t.confirmSta || "OFFLINE" == t.confirmSta
          }, ("ONLINE" == t.confirmSta || "OFFLINE" == t.confirmSta || t.checked, {}), {
            i: t.checked,
            j: e.o(e => (e => {
              "WAIT" == e.confirmSta && (e.checked ? e.checked = !1 : e.checked = !0)
            })(t), r)
          }) : {}, {
            k: r
          }))
        }) : {} : e.e({
          f: e.t(e.unref(m).name),
          g: "ONLINE" == e.unref(m).confirmSta
        }, "ONLINE" == e.unref(m).confirmSta ? {
          h: e.t(S(e.unref(m).confirmDatetime))
        } : "OFFLINE" == e.unref(m).confirmSta ? {
          j: e.t(S(e.unref(m).confirmDatetime))
        } : {}, {
          i: "OFFLINE" == e.unref(m).confirmSta
        }), {
          k: "T" == e.unref(i).isRsvMan,
          o: (e.unref(d) && "WAIT" == e.unref(m).confirmSta || "T" == e.unref(i).isRsvMan && !e.unref(d) && !e.unref(l)) && "X" != e.unref(i).adjustSta
        }, (e.unref(d) && "WAIT" == e.unref(m).confirmSta || "T" == e.unref(i).isRsvMan && !e.unref(d) && !e.unref(l)) && "X" != e.unref(i).adjustSta ? {
          p: e.o(h)
        } : {})
      }
    }),
    n = e._export_sfc(o, [
      ["__scopeId", "data-v-14418009"]
    ]);
  wx.createPage(n)
}();