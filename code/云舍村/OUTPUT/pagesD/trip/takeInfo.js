! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../base/jAlert/jAlert.js"),
    a = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || l();
  const l = () => "../../components/coustomHead.js",
    u = e.defineComponent({
      __name: "takeInfo",
      setup(l) {
        const u = r.getStorage("config"),
          i = r.getStorage("user"),
          o = e.dayjs().format("YYYY-MM-DD"),
          s = e.ref(""),
          c = e.ref(""),
          n = e.ref([]),
          f = e.ref([]),
          v = e.ref({}),
          h = e.ref([]),
          p = e.ref([]),
          T = e.ref([]),
          y = e.ref(!0),
          d = e.ref(""),
          m = e.ref(!1),
          g = [{
            value: "T",
            name: "需要接送"
          }, {
            value: "F",
            name: "无需接送"
          }],
          N = e.ref([]),
          S = e.computed(() => {
            const e = [];
            return T.value.forEach((t, a) => {
              e.push({
                isShuttleIndex: 0,
                isShuttleDesc: ""
              }), g.forEach((r, l) => {
                r.value === t.isShuttle && (e[a].isShuttleDesc = r.name, e[a].isShuttleIndex = l)
              })
            }), e
          }),
          b = e.computed(() => {
            let e = 0;
            return T.value.forEach((t, a) => {
              "S" === t.shuttleType && e++
            }), e
          }),
          C = e.computed(() => {
            let e = 0;
            return T.value.forEach((t, a) => {
              "J" === t.shuttleType && e++
            }), e
          }),
          G = e.computed(() => {
            let e = 0,
              t = !0;
            return T.value.forEach((t, a) => {
              "J" === t.shuttleType && t.arrivalGuests.forEach(t => {
                t.active && e++
              })
            }), n.value.forEach(t => {
              t.activeNotCan && e++
            }), e === n.value.length && (t = !1), t
          }),
          E = e.computed(() => {
            let e = 0,
              t = !0;
            return T.value.forEach((t, a) => {
              "S" === t.shuttleType && t.returnGuests.forEach(t => {
                t.active && e++
              })
            }), f.value.forEach(t => {
              t.activeNotCan && e++
            }), e === f.value.length && (t = !1), t
          });

        function D(e) {
          let t = 0;
          return T.value.forEach((a, r) => {
            r <= e && "J" === a.shuttleType && t++
          }), t
        }

        function J(e) {
          let t = 0;
          return T.value.forEach((a, r) => {
            r <= e && "S" === a.shuttleType && t++
          }), t
        }

        function j(e, t) {
          if (e.activeNotCan) return;
          const a = e.active;
          for (let r = 0; r < T.value.length; r++) {
            const l = T.value[r];
            "S" === t && "S" === l.shuttleType && l.returnGuests.forEach(t => {
              t.guestNo === e.guestNo && (t.activeNotCan = !a)
            }), "J" === t && "J" === l.shuttleType && l.arrivalGuests.forEach(t => {
              t.guestNo === e.guestNo && (t.activeNotCan = !a)
            })
          }
          e.activeNotCan = !1, e.active ? e.active = !1 : e.active = !0
        }

        function A(e, t) {
          "J" === t ? T.value[e].arrivalGuests.forEach(e => {
            e.active && j(e, t)
          }) : T.value[e].returnGuests.forEach(e => {
            e.active && j(e, t)
          }), T.value.splice(e, 1)
        }

        function M(e) {
          if ("S" === e) {
            let a = !1;
            if (f.value.forEach(e => {
                e.active || e.activeNotCan || (a = !0)
              }), !a) return void t.jAlert3("已选择所有出行人信息");
            const r = JSON.parse(JSON.stringify(f.value));
            r.forEach(e => {
              e.active && (e.active = !1, e.activeNotCan = !0)
            }), T.value.push({
              beginDate: "",
              cityName: "",
              guestNos: [],
              guestName: "",
              isShuttle: "",
              mobile: "",
              orderNo: s.value,
              remark: "",
              shuttleType: e,
              startTime: "",
              station: "",
              teamNo: "",
              trafficType: "",
              trips: "",
              unitCode: u.hotelGroupCode,
              returnGuests: r
            })
          } else {
            let a = !1;
            if (n.value.forEach(e => {
                e.active || e.activeNotCan || (a = !0)
              }), !a) return void t.jAlert3("已选择所有出行人信息");
            const r = JSON.parse(JSON.stringify(n.value));
            r.forEach(e => {
              e.active && (e.active = !1, e.activeNotCan = !0)
            }), T.value.splice(C.value, 0, {
              beginDate: "",
              cityName: "",
              guestNos: [],
              guestName: "",
              isShuttle: "",
              mobile: "",
              orderNo: s.value,
              remark: "",
              shuttleType: e,
              startTime: "",
              station: "",
              teamNo: "",
              trafficType: "",
              trips: "",
              unitCode: u.hotelGroupCode,
              arrivalGuests: r
            })
          }
        }

        function O() {
          s.value && a.api.interfaceTransfer({
            query: {
              orderNo: s.value,
              unitCode: u.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/shuttle/listByOrderNo",
              interfaceFrom: "GC",
              hotelGroupCode: u.hotelGroupCode
            }
          }).then(a => {
            if (1 === a.result && 0 === a.retVal.result)
              if (a.retVal.retVal.length <= 0) n.value.forEach(e => {
                e.mobile === d.value && (e.active = !0)
              }), f.value.forEach(e => {
                e.mobile === d.value && (e.active = !0)
              }), T.value = [{
                beginDate: "",
                cityName: "",
                guestNos: [],
                guestName: "",
                isShuttle: "",
                mobile: "",
                orderNo: s.value,
                remark: "",
                shuttleType: "J",
                startTime: "",
                station: "",
                teamNo: "",
                trafficType: "",
                trips: "",
                unitCode: u.hotelGroupCode,
                arrivalGuests: n.value
              }, {
                beginDate: "",
                cityName: "",
                guestNos: [],
                guestName: "",
                isShuttle: "",
                mobile: "",
                orderNo: s.value,
                remark: "",
                shuttleType: "S",
                startTime: "",
                station: "",
                teamNo: "",
                trafficType: "",
                trips: "",
                unitCode: u.hotelGroupCode,
                returnGuests: f.value
              }], y.value = !1;
              else {
                T.value = [], h.value = [], p.value = [];
                let t = 0,
                  r = 0;
                a.retVal.retVal.forEach(a => {
                  a.trafficTypeDesc = function(e) {
                    let t = "";
                    return N.value.forEach(a => {
                      a.code === e && (t = a.descript)
                    }), t
                  }(a.trafficType), a.beginDateF = e.dayjs(a.beginDate).format("M月D日"), "J" === a.shuttleType && (a.guests.forEach(e => {
                    n.value.forEach(a => {
                      e.guestNo === a.guestNo && (a.active = !1, a.activeNotCan = !0, t++)
                    })
                  }), h.value.push(a)), "S" === a.shuttleType && (a.guests.forEach(e => {
                    f.value.forEach(t => {
                      e.guestNo === t.guestNo && (t.active = !1, t.activeNotCan = !0, r++)
                    })
                  }), p.value.push(a))
                }), t < n.value.length && (y.value = !1), r < n.value.length && (y.value = !1)
              }
            else t.jAlert3(a.retVal.msg || a.msg)
          })
        }
        return e.onLoad(e => {
          e.memberNo && (c.value = e.memberNo), e.mobile ? d.value = e.mobile : d.value = i.mobile, s.value = e.orderNo, a.api.orderDetail({
            memberNo: c.value || i.memberId,
            hotelGroupCode: u.hotelGroupCode,
            hotelCode: u.hotelCode,
            travelOrderNo: s.value,
            memberId: c.value || i.memberId,
            mobile: d.value || i.mobile
          }).then(e => {
            var r;
            1 === e.result ? (v.value = e.retVal.reserveOrder, n.value = JSON.parse(JSON.stringify(e.retVal.guests)), f.value = JSON.parse(JSON.stringify(e.retVal.guests)), r = () => {
              O()
            }, a.api.interfaceTransfer({
              query: {
                type: "Transportation",
                unitCode: u.hotelGroupCode
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_INFOMATION_CENTER",
                interfaceMethod: "api/codeBaseapi/listCodeBase",
                interfaceFrom: "GC",
                hotelGroupCode: u.hotelGroupCode
              }
            }).then(e => {
              1 === e.result && 0 === e.retVal.result && (N.value = e.retVal.retVal, r && r())
            })) : t.jAlert3(e.msg)
          })
        }), e.onMounted(() => {}), (r, l) => e.e({
          a: e.p({
            title: "接送信息",
            nativeMode: !0
          }),
          b: h.value.length > 0
        }, (h.value.length, {}), {
          c: e.f(h.value, (t, a, r) => e.e({
            a: "F" !== t.isShuttle
          }, "F" !== t.isShuttle ? e.e({
            b: h.value.length > 1
          }, h.value.length > 1 ? {
            c: e.t(Number(a) + 1)
          } : {}, {
            d: t.carNo
          }, t.carNo ? e.e({
            e: e.t(t.carNo),
            f: t.carModelDesc
          }, t.carModelDesc ? {
            g: e.t(t.carModelDesc)
          } : {}, {
            h: e.t(t.beginDateF),
            i: e.t(t.startTime),
            j: t.station
          }, t.station ? {
            k: e.t(t.station)
          } : {}) : {}, {
            l: e.f(t.guests, (t, a, r) => ({
              a: e.t(t.name),
              b: a
            })),
            m: e.t(t.trafficTypeDesc),
            n: e.t(t.trips)
          }) : e.e({
            o: h.value.length > 1
          }, h.value.length > 1 ? {
            p: e.t(Number(a) + 1)
          } : {}, {
            q: e.f(t.guests, (t, a, r) => ({
              a: e.t(t.name),
              b: a
            }))
          }), {
            r: a
          })),
          d: e.f(p.value, (t, a, r) => e.e({
            a: "F" !== t.isShuttle
          }, "F" !== t.isShuttle ? e.e({
            b: p.value.length > 1
          }, p.value.length > 1 ? {
            c: e.t(Number(a) + 1)
          } : {}, {
            d: t.carNo
          }, t.carNo ? e.e({
            e: e.t(t.carNo),
            f: t.carModelDesc
          }, t.carModelDesc ? {
            g: e.t(t.carModelDesc)
          } : {}, {
            h: e.t(t.beginDate),
            i: e.t(t.startTime),
            j: t.station
          }, t.station ? {
            k: e.t(t.station)
          } : {}) : {}, {
            l: e.f(t.guests, (t, a, r) => ({
              a: e.t(t.name),
              b: a
            })),
            m: e.t(t.trafficTypeDesc),
            n: e.t(t.trips)
          }) : e.e({
            o: p.value.length > 1
          }, p.value.length > 1 ? {
            p: e.t(Number(a) + 1)
          } : {}, {
            q: e.f(t.guests, (t, a, r) => ({
              a: e.t(t.name),
              b: a
            }))
          }), {
            r: a
          })),
          e: e.f(T.value, (t, a, r) => e.e({
            a: "J" === t.shuttleType
          }, "J" === t.shuttleType ? e.e({
            b: C.value > 1
          }, C.value > 1 ? {
            c: e.t(D(a))
          } : {}, {
            d: C.value > 1
          }, C.value > 1 ? {
            e: e.o(e => A(a, "J"), a)
          } : {}) : {}, {
            f: "S" === t.shuttleType
          }, "S" === t.shuttleType ? e.e({
            g: b.value > 1
          }, b.value > 1 ? {
            h: e.t(J(a))
          } : {}, {
            i: b.value > 1
          }, b.value > 1 ? {
            j: e.o(e => A(a, "S"), a)
          } : {}) : {}, {
            k: "J" === t.shuttleType
          }, "J" === t.shuttleType ? {
            l: e.f(t.arrivalGuests, (t, a, r) => ({
              a: e.t(t.name),
              b: a,
              c: t.active ? 1 : "",
              d: t.activeNotCan ? 1 : "",
              e: e.o(e => j(t, "J"), a)
            }))
          } : {}, {
            m: "S" === t.shuttleType
          }, "S" === t.shuttleType ? {
            n: e.f(t.returnGuests, (t, a, r) => ({
              a: e.t(t.name),
              b: a,
              c: t.active ? 1 : "",
              d: t.activeNotCan ? 1 : "",
              e: e.o(e => j(t, "S"), a)
            }))
          } : {}, {
            o: "J" === t.shuttleType
          }, (t.shuttleType, {}), {
            p: "S" === t.shuttleType
          }, (t.shuttleType, {}), {
            q: t.isShuttle
          }, t.isShuttle ? {
            r: e.t(S.value[a].isShuttleDesc)
          } : e.e({
            s: "J" === t.shuttleType
          }, (t.shuttleType, {})), {
            t: S.value[a].isShuttleIndex,
            v: e.o(e => function(e, t) {
              const a = e.detail.value,
                r = g[a].value;
              T.value[t].isShuttle = r
            }(e, Number(a)), a),
            w: "F" !== t.isShuttle
          }, "F" !== t.isShuttle ? e.e({
            x: "J" === t.shuttleType
          }, (t.shuttleType, {}), {
            y: "S" === t.shuttleType
          }, (t.shuttleType, {}), {
            z: "aircraft" === t.trafficType
          }, "aircraft" === t.trafficType ? {
            A: e.t(t.trafficTypeDesc)
          } : e.e({
            B: "J" === t.shuttleType
          }, (t.shuttleType, {}), {
            C: "S" === t.shuttleType
          }, (t.shuttleType, {})), {
            D: t.trafficType,
            E: N.value,
            F: e.o(e => function(e, t) {
              T.value[t].trafficType = N.value[e.detail.value].code, T.value[t].trafficTypeDesc = N.value[e.detail.value].descript
            }(e, Number(a)), a),
            G: "aircraft" === t.trafficType || "train" === t.trafficType
          }, "aircraft" === t.trafficType || "train" === t.trafficType ? e.e({
            H: "aircraft" === t.trafficType
          }, (t.trafficType, {}), {
            I: "train" === t.trafficType
          }, (t.trafficType, {}), {
            J: "aircraft" === t.trafficType
          }, "aircraft" === t.trafficType ? {
            K: t.trips,
            L: e.o(e => t.trips = e.detail.value, a)
          } : {}, {
            M: "train" === t.trafficType
          }, "train" === t.trafficType ? {
            N: t.trips,
            O: e.o(e => t.trips = e.detail.value, a)
          } : {}) : {}, {
            P: t.trafficType
          }, t.trafficType ? e.e({
            Q: "J" === t.shuttleType
          }, (t.shuttleType, {}), {
            R: "S" === t.shuttleType
          }, (t.shuttleType, {}), {
            S: "other" === t.trafficType
          }, "other" === t.trafficType ? {
            T: t.station,
            U: e.o(e => t.station = e.detail.value, a)
          } : {}, {
            V: "aircraft" === t.trafficType
          }, "aircraft" === t.trafficType ? {
            W: t.station,
            X: e.o(e => t.station = e.detail.value, a)
          } : {}, {
            Y: "train" === t.trafficType
          }, "train" === t.trafficType ? {
            Z: t.station,
            aa: e.o(e => t.station = e.detail.value, a)
          } : {}) : {}, {
            ab: "J" === t.shuttleType
          }, (t.shuttleType, {}), {
            ac: "S" === t.shuttleType
          }, (t.shuttleType, {}), {
            ad: t.beginDate
          }, t.beginDate ? {
            ae: e.t(t.beginDate)
          } : e.e({
            af: "J" === t.shuttleType
          }, (t.shuttleType, {}), {
            ag: "S" === t.shuttleType
          }, (t.shuttleType, {})), {
            ah: t.beginDate,
            ai: e.unref(o),
            aj: "2099-01-01",
            ak: e.o(e => function(e, t) {
              const a = e.detail.value;
              T.value[t].beginDate = a
            }(e, Number(a)), a),
            al: t.trafficType
          }, t.trafficType ? e.e({
            am: "J" === t.shuttleType
          }, (t.shuttleType, {}), {
            an: "S" === t.shuttleType
          }, (t.shuttleType, {}), {
            ao: t.startTime
          }, t.startTime ? {
            ap: e.t(t.startTime)
          } : e.e({
            aq: "J" === t.shuttleType
          }, (t.shuttleType, {}), {
            ar: "S" === t.shuttleType
          }, (t.shuttleType, {})), {
            as: t.startTime,
            at: e.o(e => function(e, t) {
              const a = e.detail.value;
              T.value[t].startTime = a
            }(e, Number(a)), a)
          }) : {}, {
            av: t.mobile,
            aw: e.o(e => t.mobile = e.detail.value, a),
            ax: t.remark,
            ay: e.o(e => t.remark = e.detail.value, a)
          }) : {}, {
            az: a
          })),
          f: g,
          g: G.value
        }, G.value ? {
          h: e.o(e => M("J"))
        } : {}, {
          i: E.value
        }, E.value ? {
          j: e.o(e => M("S"))
        } : {}, {
          k: !y.value
        }, y.value ? {} : {
          l: e.o(r => function() {
            let r = 0;
            for (let e = 0; e < T.value.length; e++) {
              const a = T.value[e];
              let l = "抵达";
              "S" === a.shuttleType && (l = "返程");
              let u = !1;
              if (a.guestNos = [], a.hasGuest = !1, "S" === a.shuttleType ? a.returnGuests.forEach(e => {
                  e.active && (a.guestNos.push(e.guestNo), u = !0)
                }) : a.arrivalGuests.forEach(e => {
                  e.active && (a.guestNos.push(e.guestNo), u = !0)
                }), u) {
                if (a.hasGuest = !0, r++, !a.isShuttle) return void t.jAlert3(`请选择${l}接站需求`);
                if ("T" === a.isShuttle) {
                  if (!a.trips) {
                    if ("aircraft" === a.trafficType) return void t.jAlert3("请选择航班号");
                    if ("train" === a.trafficType) return void t.jAlert3("请选择列车号")
                  }
                  if (!a.station) return void t.jAlert3(`请选择${l}站点`);
                  if (!a.beginDate) return void t.jAlert3(`请选择${l}日期`);
                  if (!a.beginDate) return void t.jAlert3(`请选择${l}日期`);
                  if (!a.startTime) return void t.jAlert3(`请选择${l}时间`);
                  if (!a.mobile) return void t.jAlert3(`请输入${l}联系电话`)
                }
              }
            }
            m.value || (T.value.length <= 0 ? t.jAlert3("请添加抵达接送或返程接送") : 0 !== r ? (m.value = !0, e.index.showModal({
              title: "确认提交",
              content: "接送信息提交后，如需修改请联系顾问或管家。",
              cancelText: "返回",
              confirmText: "确认",
              confirmColor: "#000000",
              success: l => {
                if (console.log(l), l.confirm) {
                  let l = 0;
                  console.log(T.value), T.value.forEach(i => {
                    if (console.log(i), i.hasGuest) {
                      const o = i;
                      o.unitCode = u.hotelGroupCode, o.orderNo = s.value, o.teamNo = v.value.teamNo, a.api.interfaceTransfer({
                        query: o,
                        config: {
                          interfaceType: "POST",
                          interfaceModule: "GC_TRAVEL_ORDER",
                          interfaceMethod: "/api/shuttle/save",
                          interfaceFrom: "GC",
                          hotelGroupCode: u.hotelGroupCode
                        }
                      }).then(a => {
                        1 === a.result && 0 === a.retVal.result && (l++, l === r && (t.jAlert3("提交成功"), m.value = !1, O(), e.index.navigateBack({
                          delta: 1
                        })))
                      })
                    }
                  })
                } else m.value = !1
              }
            })) : t.jAlert3("请选择接送人"))
          }())
        })
      }
    }),
    i = e._export_sfc(u, [
      ["__scopeId", "data-v-3c50ebd3"]
    ]);
  wx.createPage(i)
}();