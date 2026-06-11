! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js");
  Math || (r + o + n + l)();
  const n = () => "../../components/kfDialog.js",
    l = () => "./ConfirmationDialog.js",
    o = () => "../../components/empty.js",
    r = () => "./PlanClassifyTabs.js",
    u = e.defineComponent({
      __name: "myTrip",
      setup(n) {
        const l = {
          D: "草稿",
          P: "计划中",
          I: "跟进中",
          O: "已下单",
          X: "已终止"
        };
        let o = "";
        const r = t.getStorage("config"),
          u = e.ref(!1),
          i = e.ref(t.getStorage("user") || {}),
          s = e.ref([]),
          d = e.ref(1),
          p = e.ref();
        e.ref(!1), e.ref(!1), e.ref("加载中..."), e.ref("加载更多中...");
        const c = e.ref(!0),
          m = e.ref(!1),
          f = e.ref(0),
          h = e.ref([{
            id: "-1",
            name: "全部（0）",
            subName: "全部",
            count: 0,
            planStatus: ""
          }, {
            id: "0",
            name: "计划中（0）",
            subName: "计划中",
            count: 0,
            planStatus: "P"
          }, {
            id: "1",
            name: "跟进中（0）",
            subName: "跟进中",
            count: 0,
            planStatus: "I"
          }, {
            id: "2",
            name: "已下单（0）",
            subName: "已下单",
            count: 0,
            planStatus: "O"
          }, {
            id: "3",
            name: "已终止（0）",
            subName: "已终止",
            count: 0,
            planStatus: "X"
          }]);
        e.onLoad(e => {
          c.value = !0
        }), e.onShow(() => {
          console.log("onShow"), T()
        }), e.onMounted(() => {
          C(), T(), e.index.getSystemInfo({
            success: e => {
              const a = e.statusBarHeight || 0;
              f.value = a + 45, f.value = a + 40 + 45
            },
            fail(e) {
              console.log(e)
            }
          })
        }), e.onReachBottom(() => {
          d.value++, C()
        }), e.onPullDownRefresh(() => {
          m.value = !0, setTimeout(() => {
            d.value = 1, C().then(e => {
              0 === e.retVal.retVal.datas.length && (s.value = [])
            }), T(), e.index.stopPullDownRefresh(), m.value = !1
          }, 1e3)
        });
        const y = (a, t) => {
            o = a.planStatus, d.value = 1, C().then(e => {
              0 === e.retVal.retVal.datas.length && (s.value = [])
            }), e.index.pageScrollTo({
              scrollTop: 0
            })
          },
          S = e => e > 0 && e <= 999 ? {
            count: "" + e,
            type: "origin"
          } : e > 999 && e <= 9999 ? {
            count: (Math.floor(e / 100) / 10).toFixed(1) + "千",
            type: "format"
          } : e > 9999 ? {
            count: (Math.floor(e / 1e3) / 10).toFixed(1) + "万",
            type: "format"
          } : {
            count: "0",
            type: "invalid"
          },
          v = a => {
            e.index.navigateTo({
              url: "/pagesTravelAssistant/journey/edit?fromType=planDetail&itineraryPlanCode=" + a.itineraryPlanCode
            })
          },
          g = () => {
            p.value.showDialog()
          },
          T = () => {
            a.api.interfaceTransfer({
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ASSISTANT",
                interfaceMethod: "/api/itinerary/plan/myItineraryPlanCount",
                interfaceFrom: "GC",
                hotelGroupCode: r.hotelGroupCode
              },
              query: {
                memberId: i.value.memberId,
                unitCode: r.hotelGroupCode
              }
            }).then(a => {
              if (console.log("handleGetPlanClassifyList", a), 0 === a.retVal.result) {
                let e = 0;
                h.value.forEach(t => {
                  t.count = 0, t.name = t.subName + "（0）";
                  for (let n = 0; n < a.retVal.retVal.length; n++) {
                    const o = a.retVal.retVal[n];
                    if (o.planStatus === t.planStatus) {
                      e += o.count, t.count = o.count, t.name = `${l[o.planStatus]}（${o.count}）`;
                      break
                    }
                  }
                }), h.value[0].name = `全部（${e}）`
              } else e.index.showToast({
                title: a.retVal.msg,
                icon: "none"
              })
            })
          },
          C = () => new Promise((t, n) => {
            e.index.showLoading({
              title: "加载中"
            }), a.api.interfaceTransfer({
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ASSISTANT",
                interfaceMethod: "/api/itinerary/plan/myItineraryPlan",
                interfaceFrom: "GC",
                hotelGroupCode: r.hotelGroupCode
              },
              query: {
                memberId: i.value.memberId,
                unitCode: r.hotelGroupCode,
                curPage: d.value,
                pageSize: 10,
                firstResult: 10 * (d.value - 1),
                planStatus: o
              }
            }).then(a => {
              if (e.index.hideLoading(), 0 === a.retVal.result) {
                if (a.retVal.retVal.datas.length > 0) {
                  console.log(a.retVal.retVal.datas, "1111111111111111111");
                  let t = a.retVal.retVal.datas;
                  for (let a = 0; a < t.length; a++) t[a].collectNumber = S(t[a].collectNum), t[a].startDate && (t[a].starDay = e.dayjs(t[a].startDate).add(0, "day").format("MM月DD日")), t[a].endDate && (t[a].endDay = e.dayjs(t[a].endDate).add(0, "day").format("MM月DD日")), t[a].updateDate && (t[a].updateDay = e.dayjs(t[a].updateDate).add(0, "day").format("MM月DD日HH:mm:ss"));
                  1 === d.value ? s.value = t : s.value = [...s.value, ...t], console.log(s.value, "页面页面页面页面")
                }
                t(a)
              } else n(a)
            }).catch(a => {
              e.index.hideLoading(), n(a)
            })
          });
        return (t, n) => e.e({
          a: e.o(y),
          b: e.p({
            data: h.value
          }),
          c: f.value + "px",
          d: s.value.length > 0
        }, s.value.length > 0 ? e.e({
          e: m.value
        }, (m.value, {}), {
          f: e.f(s.value, (t, n, l) => e.e({
            a: "P" === t.planStatus
          }, (t.planStatus, {}), {
            b: "I" === t.planStatus
          }, (t.planStatus, {}), {
            c: "O" === t.planStatus
          }, (t.planStatus, {}), {
            d: "X" === t.planStatus
          }, (t.planStatus, {}), {
            e: e.t("adviser" === t.modifyType ? "顾问" : "我"),
            f: e.t(t.updateDay),
            g: t.isCollectShown
          }, t.isCollectShown ? {
            h: e.t(t.collectNumber.count)
          } : {}, {
            i: t.photo[0] + "?imageView2/1/w/343/h/193&x-oss-process=image/resize,m_fill,w_343,h_193",
            j: e.t(t.itineraryPlanName),
            k: 0 !== t.adultNum
          }, 0 !== t.adultNum ? {
            l: e.t(t.adultNum)
          } : {}, {
            m: 0 !== t.childNum
          }, 0 !== t.childNum ? {
            n: e.t(t.childNum)
          } : {}, {
            o: t.starDay
          }, (t.starDay, {}), {
            p: e.t(t.starDay),
            q: t.endDay
          }, (t.endDay, {}), {
            r: e.t(t.endDay),
            s: 0 !== t.childNum
          }, (t.childNum, {}), {
            t: e.t(1 === t.needButler ? "含管家" : "不含管家"),
            v: "adviser" === t.modifyType
          }, "adviser" === t.modifyType ? {} : {
            w: e.t(t.estimatedPrice)
          }, {
            x: "P" === t.planStatus || "I" === t.planStatus || "D" === t.planStatus
          }, "P" === t.planStatus || "I" === t.planStatus || "D" === t.planStatus ? {
            y: e.o(e => v(t), n)
          } : {}, {
            z: "P" === t.planStatus
          }, "P" === t.planStatus ? {
            A: e.o(l => ((t, n) => {
              e.index.showLoading({
                title: "加载中"
              }), a.api.interfaceTransfer({
                config: {
                  interfaceType: "POST",
                  interfaceModule: "GC_TRAVEL_ASSISTANT",
                  interfaceMethod: "/api/itinerary/plan/saveAdviceOrder",
                  interfaceFrom: "GC",
                  hotelGroupCode: r.hotelGroupCode
                },
                query: {
                  itineraryPlanCode: t.itineraryPlanCode,
                  memberId: i.value.memberId,
                  unitCode: r.hotelGroupCode
                }
              }).then(a => {
                e.index.hideLoading(), 0 === a.retVal.result ? (s.value.splice(n, 1), u.value = !0, T()) : e.index.showToast({
                  title: a.retVal.msg,
                  icon: "none"
                })
              })
            })(t, n), n)
          } : {}, {
            B: "I" === t.planStatus || "O" === t.planStatus
          }, "I" === t.planStatus || "O" === t.planStatus ? {
            C: e.o(g, n)
          } : {}, {
            D: "X" === t.planStatus
          }, "X" === t.planStatus ? {
            E: e.o(e => v(t), n)
          } : {}, {
            F: n,
            G: e.o(a => {
              return n = t, void e.index.navigateTo({
                url: `/pagesTravelAssistant/plan/detail?itineraryPlanCode=${n.itineraryPlanCode}&memberId=${i.value.memberId}`
              });
              var n
            }, n)
          }))
        }) : {
          g: e.p({
            tips: "暂无行程",
            subTips: "云舍村，期待与您相遇。"
          })
        }, {
          h: e.sr(p, "aef4e11b-2", {
            k: "kf"
          }),
          i: e.p({
            title: "一键咨询"
          }),
          j: e.o(e => u.value = e),
          k: e.p({
            modelValue: u.value
          })
        })
      }
    }),
    i = e._export_sfc(u, [
      ["__scopeId", "data-v-aef4e11b"]
    ]);
  wx.createComponent(i)
}();