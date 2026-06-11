! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    a = require("../../utils/wxuser.js"),
    r = require("../../utils/utils.js"),
    u = require("../../utils/filter.js"),
    o = require("../../base/jAlert/jAlert.js");
  Math || s();
  const s = () => "../../components/coustomHead.js",
    d = e.defineComponent({
      __name: "tripChange",
      setup(s) {
        let d = a.getStorage("user"),
          n = a.getStorage("config"),
          l = e.ref(""),
          i = e.ref(""),
          f = e.ref({}),
          j = e.ref([]),
          c = e.ref(),
          v = e.ref(!0),
          S = e.ref({}),
          m = e.ref({}),
          p = e.ref(""),
          h = e.computed(() => {
            let e = !1;
            return 1 == j.value.length && ("W" == j.value[0].adjustSta || "U" == j.value[0].adjustSta || "P" == j.value[0].adjustSta && "T" == j.value[0].isRsvMan) && (e = !0), e
          });
        const g = e => {
            S.value.guestNo && "T" != e.isRsvMan ? N(e, S.value) : r.goPage(`/pagesD/trip/tripChangeLetter?teamNo=${l.value}&adjustNo=${e.adjustNo}&orderNo=${p.value}`)
          },
          D = e => {
            try {
              return e.replace("分", ":").replace("秒", "")
            } catch (t) {
              return e
            }
          };
        e.onUnload(() => {
          clearInterval(c.value)
        });
        const N = (e, t) => {
          r.goPage(`/pagesD/trip/tripChangeLetter?teamNo=${l.value}&adjustNo=${e.adjustNo}&guestNo=${t.guestNo}&orderNo=${p.value}`)
        };
        return e.onLoad(e => {
          e.teamNo && (l.value = e.teamNo), e.adjustNo && (i.value = e.adjustNo)
        }), e.onShow(() => {
          var a;
          a = () => {
            t.api.interfaceTransfer({
              query: {
                unitCode: n.hotelGroupCode,
                phone: d.mobile,
                teamNo: l.value
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/adjustCustomer/list",
                interfaceFrom: "GC",
                hotelGroupCode: n.hotelGroupCode
              }
            }).then(t => {
              1 == t.result && 0 == t.retVal.result && (v.value = !1, t.retVal.retVal.length > 0 && (j.value = [], t.retVal.retVal.forEach(t => {
                t.adjustOrderDtos.forEach(a => {
                  "ADD" != a.adjustType && "MODIFY" != a.adjustType || (t.hasAdd = !0), "DELETE" == a.adjustType && (t.hasDelete = !0), a.changeTime = e.dayjs(a.bizDatetime).format("MM月DD日") + " " + a.activityBegin + "-" + a.activityEnd
                });
                let a = !0,
                  r = !0;
                t.guestDtos.forEach(e => {
                  "ONLINE" != e.confirmSta && "OFFLINE" != e.confirmSta && (a = !1), "U" == t.adjustSta && ("T" == t.isRsvMan ? "WAIT" == e.confirmSta && e.orderNo == p.value && (r = !1) : e.guestPhone == d.mobile && "WAIT" == e.confirmSta && e.orderNo == p.value && (r = !1))
                }), a && "U" == t.adjustSta ? t.adjustSta = "M" : r && "U" == t.adjustSta && (t.adjustSta = "D"), i.value == t.adjustNo && j.value.push(t)
              }), t.retVal.retVal = t.retVal.retVal.filter(e => "S" !== e.adjustSta && "W" !== e.adjustSta && "M" !== e.adjustSta && "X" !== e.adjustSta), i.value || (j.value = t.retVal.retVal), j.value.forEach(t => {
                var a = e.dayjs(t.confirmDatetime).add(60, "m").diff(e.dayjs(), "s");
                c.value = setInterval(() => {
                  a > 0 && (a--, t.countdown = (e => {
                    const t = Math.floor(e / 60),
                      a = e % 60;
                    return `${String(t).padStart(2,"0")}分${String(a).padStart(2,"0")}秒`
                  })(a))
                }, 1e3), t.guestDtos.forEach(e => {
                  e.guestPhone == d.mobile && (S.value = e)
                })
              }), 1 == j.value.length && "P" == j.value[0].adjustSta && "T" == j.value[0].isRsvMan && (p.value = j.value[0].guestDtos[0].orderNo)))
            })
          }, t.api.interfaceTransfer({
            query: {
              unitCode: n.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/team/order/detail/" + l.value,
              interfaceFrom: "GC",
              hotelGroupCode: n.hotelGroupCode
            }
          }).then(e => {
            if (1 == e.result && 0 == e.retVal.result) {
              if (e.retVal.retVal.guests.forEach(t => {
                  t.mobile == d.mobile && e.retVal.retVal.reserveOrders.forEach(e => {
                    e.orderNo == t.orderNo && (p.value = e.orderNo)
                  })
                }), e.retVal.retVal.reserveOrders.forEach(e => {
                  p.value == e.orderNo && (m.value = e)
                }), e.retVal.retVal.driverButlerDtos) {
                let t = {},
                  a = {};
                e.retVal.retVal.driverButlerDtos.forEach(e => {
                  "GW" == e.personType && (t = e), "T" == e.isPartButler && (a = e), "GW" == e.personType && "T" == e.isHostHousekeep && (f.value = e)
                }), f.value.code || (t.code ? f.value = t : f.value = a)
              }
              a && a()
            }
          })
        }), (t, a) => e.e({
          a: e.p({
            title: "行程变更",
            nativeMode: !0
          }),
          b: !e.unref(v)
        }, e.unref(v) ? {} : e.e({
          c: 1 == e.unref(j).length
        }, 1 == e.unref(j).length ? {
          d: e.f(e.unref(j), (t, a, r) => e.e({
            a: "M" != t.adjustSta
          }, "M" != t.adjustSta ? e.e({
            b: "W" == t.adjustSta || "U" == t.adjustSta
          }, "W" == t.adjustSta || "U" == t.adjustSta ? {
            c: e.t(t.countdown)
          } : {}, {
            d: "X" == t.adjustSta
          }, (t.adjustSta, {}), {
            e: "P" == t.adjustSta
          }, "P" == t.adjustSta ? e.e({
            f: "T" != t.isRsvMan
          }, (t.isRsvMan, {})) : {}, {
            g: "D" == t.adjustSta
          }, "D" == t.adjustSta ? {
            h: e.t(t.countdown)
          } : {}, {
            i: "O" == t.adjustSta
          }, (t.adjustSta, {})) : {}, {
            j: t.hasAdd
          }, t.hasAdd ? {
            k: e.f(t.adjustOrderDtos, (t, a, r) => e.e({
              a: "ADD" == t.adjustType || "MODIFY" == t.adjustType
            }, "ADD" == t.adjustType || "MODIFY" == t.adjustType ? {
              b: e.t(t.activityName),
              c: e.t(t.dayCount),
              d: e.t(t.changeTime)
            } : {}, {
              e: a
            }))
          } : {}, {
            l: t.hasDelete
          }, t.hasDelete ? {
            m: e.f(t.adjustOrderDtos, (t, a, r) => e.e({
              a: "DELETE" == t.adjustType
            }, "DELETE" == t.adjustType ? {
              b: e.t(t.activityName),
              c: e.t(t.dayCount),
              d: e.t(t.changeTime)
            } : {}, {
              e: a
            }))
          } : {}, {
            n: "T" == t.isRsvMan
          }, "T" == t.isRsvMan ? e.e({
            o: "O" == t.adjustSta
          }, "O" == t.adjustSta ? {
            p: e.t(e.unref(u.valFormat)(t.newSum)),
            q: e.t(e.unref(u.valFormat)(t.originSum)),
            r: e.t(e.unref(u.valFormat)(t.adjustMoneySum))
          } : {}, {
            s: e.f(t.guestDtos, (a, r, u) => e.e({
              a: a.orderNo == e.unref(p)
            }, a.orderNo == e.unref(p) ? e.e({
              b: e.t(a.name),
              c: "WAIT" == a.confirmSta
            }, (a.confirmSta, {}), {
              d: "ONLINE" == a.confirmSta || "OFFLINE" == a.confirmSta
            }, "ONLINE" == a.confirmSta || "OFFLINE" == a.confirmSta ? {
              e: e.t(a.confirmDatetime),
              f: e.o(e => N(t, a), r)
            } : {}) : {}, {
              g: r
            }))
          }) : "ONLINE" == e.unref(S).confirmSta || "OFFLINE" == e.unref(S).confirmSta ? {
            t: e.o(e => g(t), a)
          } : {}, {
            v: a
          })),
          e: "ONLINE" == e.unref(S).confirmSta || "OFFLINE" == e.unref(S).confirmSta
        } : {}, {
          f: e.unref(j).length > 1
        }, e.unref(j).length > 1 ? {
          g: e.f(e.unref(j), (t, a, u) => e.e({
            a: e.t(e.unref(j).length - a),
            b: "W" == t.adjustSta || "U" == t.adjustSta
          }, "W" == t.adjustSta || "U" == t.adjustSta ? {
            c: e.t(D(t.countdown))
          } : {}, {
            d: "P" == t.adjustSta && "T" == t.isRsvMan
          }, ("P" == t.adjustSta && t.isRsvMan, {}), {
            e: "P" == t.adjustSta && "T" != t.isRsvMan
          }, ("P" == t.adjustSta && t.isRsvMan, {}), {
            f: "D" == t.adjustSta
          }, "D" == t.adjustSta ? {
            g: e.t(t.countdown)
          } : {}, {
            h: "X" == t.adjustSta
          }, (t.adjustSta, {}), {
            i: "O" == t.adjustSta
          }, (t.adjustSta, {}), {
            j: t.hasAdd
          }, t.hasAdd ? {
            k: e.f(t.adjustOrderDtos, (t, a, r) => e.e({
              a: "ADD" == t.adjustType || "MODIFY" == t.adjustType
            }, "ADD" == t.adjustType || "MODIFY" == t.adjustType ? {
              b: e.t(t.activityName)
            } : {}, {
              c: a
            }))
          } : {}, {
            l: t.hasDelete
          }, t.hasDelete ? {
            m: e.f(t.adjustOrderDtos, (t, a, r) => e.e({
              a: "DELETE" == t.adjustType
            }, "DELETE" == t.adjustType ? {
              b: e.t(t.activityName)
            } : {}, {
              c: a
            }))
          } : {}, {
            n: e.t(t.submitDatetime),
            o: "W" == t.adjustSta || "U" == t.adjustSta
          }, "W" == t.adjustSta || "U" == t.adjustSta ? {
            p: e.o(e => {
              g(t)
            })
          } : {}, {
            q: e.o(e => (e => {
              r.goPage(`/pagesD/trip/tripChange?teamNo=${l.value}&adjustNo=${e.adjustNo}&orderNo=${p.value}`)
            })(t))
          }))
        } : {}, {
          h: 0 == e.unref(j).length
        }, 0 == e.unref(j).length ? e.e({
          i: e.unref(f).code
        }, e.unref(f).code ? e.e({
          j: e.unref(f).mainPic
        }, e.unref(f).mainPic ? {
          k: e.unref(f).mainPic
        } : {}, {
          l: e.t(e.unref(f).name),
          m: e.unref(f).mobile
        }, e.unref(f).mobile ? {
          n: e.o(t => {
            var a;
            (a = e.unref(f).mobile) ? e.index.makePhoneCall({
              phoneNumber: a
            }): o.jAlert3("暂无手机号")
          })
        } : {}) : {}) : {}), {
          o: e.unref(h)
        }, e.unref(h) ? e.e({
          p: "P" == e.unref(j)[0].adjustSta && "T" == e.unref(j)[0].isRsvMan
        }, "P" == e.unref(j)[0].adjustSta && "T" == e.unref(j)[0].isRsvMan ? {
          q: e.o(e => {
            r.goPage(`/pagesB/other/pay?orderNo=${m.value.orderNo}&productType=${m.value.orderType}`)
          })
        } : {
          r: e.o(t => g(e.unref(j)[0]))
        }) : {})
      }
    }),
    n = e._export_sfc(d, [
      ["__scopeId", "data-v-6f5255df"]
    ]);
  wx.createPage(n)
}();