! function() {
  "use strict";
  const e = require("../base/jAlert/jAlert.js"),
    t = require("../utils/api.js"),
    a = require("../utils/utils.js"),
    r = require("../utils/wxuser.js"),
    o = require("../utils/umengAdaptor.js"),
    d = require("../base/channel.js"),
    n = require("../common/vendor.js");
  let i = r.getStorage("user"),
    s = r.getStorage("config");
  const l = n.defineComponent({
      name: "notice",
      props: {
        showLocation: {
          type: String,
          default: () => ""
        },
        teamNo: {
          type: String,
          default: () => ""
        },
        masterInfo: {
          type: Object,
          default: () => ({})
        },
        orderNo: {
          type: String,
          default: () => ""
        },
        showInfo: {
          type: String,
          default: () => ""
        }
      },
      setup(r, l) {
        let f = n.ref([]),
          c = n.ref([]),
          u = n.ref([]),
          p = n.ref(""),
          h = n.ref(""),
          g = n.ref(""),
          m = n.ref(!1),
          y = n.ref([]),
          C = n.ref(0),
          v = n.ref({
            R: [{
              serverCode: "00105",
              desc: "您已经提交一个客房用品需求，即将为您服务"
            }, {
              serverCode: "00106",
              desc: "您已经提交一个物品借用需求，即将为您服务"
            }, {
              serverCode: "00104",
              desc: "您已经提交一个客房打扫需求，即将为您服务"
            }],
            I: [{
              serverCode: "00105",
              desc: "您的客房用品需求已经开始服务"
            }, {
              serverCode: "00106",
              desc: "您的物品借用需求已经开始服务"
            }, {
              serverCode: "00104",
              desc: "您的客房打扫需求已经开始服务"
            }],
            O: [{
              serverCode: "00105",
              desc: "您的客房用品需求已经完成"
            }, {
              serverCode: "00106",
              desc: "您的物品借用需求已经完成"
            }, {
              serverCode: "00104",
              desc: "您的客房打扫需求已经完成"
            }],
            S: [{
              serverCode: "00105",
              desc: "您的客房用品需求被挂起，员工将稍后为您服务"
            }, {
              serverCode: "00106",
              desc: "您的物品借用需求被挂起，员工将稍后为您服务"
            }, {
              serverCode: "00104",
              desc: "您的客房打扫需求被挂起，员工将稍后为您服务"
            }],
            X: [{
              serverCode: "00105",
              desc: "您的客房用品需求已取消，感谢您的使用。"
            }, {
              serverCode: "00106",
              desc: "您的物品借用需求已取消，感谢您的使用。"
            }, {
              serverCode: "00104",
              desc: "您的客房打扫需求已取消，感谢您的使用。"
            }]
          }),
          D = n.ref(d.defaultChannel);
        n.watch(() => r.masterInfo, (e, t) => {
          r.masterInfo && r.masterInfo.masterId && (T(), S())
        }), n.watch(() => r.orderNo, (e, t) => {
          r.orderNo && E()
        });
        const j = () => {
            t.api.msgPage({
              hotelCode: s.hotelCode,
              hotelGroupCode: s.hotelGroupCode,
              clientTypes: D.value,
              firstResult: 0,
              pageSize: 10,
              showLocation: r.showLocation
            }).then(t => {
              if (0 == t.result) {
                if (t.retVal.datas && t.retVal.datas.length && t.retVal.datas.length > 0) {
                  if ("1" == r.showInfo) return u.value = [], t.retVal.datas.forEach(e => {
                    let t = JSON.parse(e.infos);
                    n.dayjs().diff(t.startDate, "s") >= 0 && n.dayjs(t.endDate).diff(n.dayjs(), "s") > 0 && V(t)
                  }), !1;
                  let e = JSON.parse(t.retVal.datas[0].infos);
                  n.dayjs().diff(e.startDate, "s") >= 0 && n.dayjs(e.endDate).diff(n.dayjs(), "s") > 0 && ("1" == r.showLocation ? "1" == r.showInfo ? V(e) : I(e) : (u.value = [], u.value.push({
                    link: e.link,
                    content: e.content
                  }), m.value = !0))
                }
              } else e.jAlert3(t.msg)
            })
          },
          S = () => {
            t.api.interfaceTransfer({
              query: {
                pmsId: r.masterInfo.pmsId,
                masterId: r.masterInfo.masterId,
                hotelCode: r.masterInfo.hotelCode,
                replyStatus: 0,
                hotelGroupCode: s.hotelGroupCode,
                userCode: "guest",
                channel: "HKApp"
              },
              config: {
                interfaceType: "POST",
                interfaceModule: "ROOM_SERVICE",
                interfaceMethod: "frontend/getComplaintAndAdviceList",
                interfaceFrom: "ZHZ",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(e => {
              1 == e.result && e.retVal.data && (e.retVal.data.forEach(e => {
                e.type = "complaint", e.content = "您已提交一个意见反馈，即将为您处理"
              }), y.value = e.retVal.data, y.value.length > 0 && (m.value = !0))
            })
          },
          T = () => {
            t.api.interfaceTransfer({
              query: {
                masterId: r.masterInfo.pmsId,
                roomMasterId: r.masterInfo.masterId,
                hotelCode: r.masterInfo.hotelCode,
                pageNo: 1,
                pageSize: 20,
                hotelGroupCode: s.hotelGroupCode,
                userCode: "guest",
                channel: "HKApp"
              },
              config: {
                interfaceType: "POST",
                interfaceModule: "ROOM_SERVICE",
                interfaceMethod: "rsOrder/list",
                interfaceFrom: "ZHZ",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(t => {
              1 == t.result ? (f.value = [], t.retVal.data && (t.retVal.data.data.forEach(e => {
                v.value[e.orderSta] && (v.value[e.orderSta].forEach(t => {
                  t.serverCode == e.serverCode && (e.content = t.desc)
                }), f.value.push(e))
              }), f.value.length > 0 && (m.value = !0)), C.value++, C.value < 20 && "1" == r.showLocation && setTimeout(() => {
                T(), S()
              }, 3e4)) : e.jAlert3(t.msg || t.retVal.msg)
            })
          },
          V = e => {
            t.api.interfaceTransfer({
              query: {
                curPage: 1,
                firstResult: 0,
                isAgency: "T",
                mobile: i.mobile,
                pageSize: 999,
                unitCode: s.hotelGroupCode
              },
              config: {
                interfaceType: "POST",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/myTravelList",
                interfaceFrom: "GC",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(t => {
              1 == t.result && 0 == t.retVal.result && (t.retVal.retVal.length > 0 && t.retVal.retVal.forEach(t => {
                t.teamNo == r.teamNo && (t.beginDate && (t.dayDiff = n.dayjs().diff(t.beginDate, "day"), t.dayDiffDate = n.dayjs(t.beginDate).add(1, "day").diff(n.dayjs(), "day"), t.dayEndDiff = n.dayjs(t.endDate).diff(n.dayjs(), "day")), n.dayjs(t.beginDate).add(1, "day").diff(n.dayjs(), "day") > 0 && t.dayEndDiff >= 0 ? t.dayDiff <= -2 ? (t.tripSta = "1", t.pageTitle = "行前2天以上") : (t.tripSta = "2", t.pageTitle = "行前2天内") : n.dayjs(t.beginDate).add(1, "day").diff(n.dayjs(), "day") <= 0 && t.dayEndDiff >= 0 ? (t.tripSta = "3", t.pageTitle = "行中") : t.dayEndDiff < 0 && (t.dayEndDiff >= -7 ? (t.tripSta = "4", t.pageTitle = "行后7天内") : (t.tripSta = "5", t.pageTitle = "暂无行程")), e.items.forEach(e => {
                  e.startTime == t.pageTitle && (-1 != e.content.indexOf("${time}") ? t.dayDiffDate > 0 && u.value.push({
                    link: e.link,
                    content: e.content.replace("${time}", t.dayDiffDate).replace("${travel}", t.productDesc)
                  }) : u.value.push({
                    link: e.link,
                    content: e.content.replace("${time}", t.dayDiffDate).replace("${travel}", t.productDesc)
                  }))
                }))
              }), u.value.length > 0 && (m.value = !0))
            })
          },
          I = e => {
            t.api.interfaceTransfer({
              query: {
                curPage: 1,
                firstResult: 0,
                isAgency: "T",
                mobile: i.mobile,
                pageSize: 999,
                unitCode: s.hotelGroupCode
              },
              config: {
                interfaceType: "POST",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/myTravelList",
                interfaceFrom: "GC",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(t => {
              1 == t.result && 0 == t.retVal.result && (u.value = [], t.retVal.retVal.length > 0 && t.retVal.retVal.forEach(t => {
                t.beginDate && (t.dayDiff = n.dayjs().diff(t.beginDate, "day"), t.dayDiffDate = n.dayjs(t.beginDate).add(1, "day").diff(n.dayjs(), "day"), t.dayEndDiff = n.dayjs(t.endDate).diff(n.dayjs(), "day")), "W" == t.orderSta ? t.dayDiff <= -2 ? (t.tripSta = "1", t.pageTitle = "行前2天以上") : (t.tripSta = "2", t.pageTitle = "行前2天内") : "I" == t.orderSta ? (t.tripSta = "3", t.pageTitle = "行中") : "O" == t.orderSta && (t.dayEndDiff >= -7 ? (t.tripSta = "4", t.pageTitle = "行后7天内") : (t.tripSta = "5", t.pageTitle = "暂无行程")), e.items.forEach(e => {
                  e.startTime == t.pageTitle && (-1 != e.content.indexOf("${time}") ? t.dayDiffDate > 0 && u.value.push({
                    link: e.link,
                    content: e.content.replace("${time}", t.dayDiffDate).replace("${travel}", t.productDesc)
                  }) : u.value.push({
                    link: e.link,
                    content: e.content.replace("${time}", t.dayDiffDate).replace("${travel}", t.productDesc)
                  }))
                })
              }), u.value.length > 0 && (m.value = !0))
            })
          },
          E = () => {
            r.teamNo && r.orderNo && t.api.interfaceTransfer({
              query: {
                unitCode: s.hotelGroupCode,
                phone: i.mobile,
                teamNo: r.teamNo
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/adjustCustomer/list",
                interfaceFrom: "GC",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(e => {
              c.value = [], 1 == e.result && 0 == e.retVal.result && (e.retVal.retVal = e.retVal.retVal.filter(e => "S" !== e.adjustSta && "W" !== e.adjustSta && "M" !== e.adjustSta && "X" !== e.adjustSta), e.retVal.retVal.length > 0 && (e.retVal.retVal.forEach(e => {
                if ("X" != e.adjustSta)
                  if ("T" == e.isRsvMan) {
                    if ("U" == e.adjustSta) {
                      let t = !1;
                      e.guestDtos.forEach(e => {
                        "WAIT" == e.confirmSta && r.orderNo == e.orderNo && (t = !0)
                      }), t && c.value.push({
                        content: "您有一个行程变更待确认",
                        link: "/pagesD/trip/tripChange?teamNo=" + r.teamNo
                      })
                    }
                  } else e.guestDtos.forEach(e => {
                    e.guestPhone == i.mobile && "WAIT" == e.confirmSta && c.value.push({
                      content: "您有一个行程变更待确认",
                      link: "/pagesD/trip/tripChange?teamNo=" + r.teamNo
                    })
                  })
              }), c.value.length > 0 && (m.value = !0)))
            })
          };
        return n.onMounted(() => {
          j(), E()
        }), {
          msgPage: j,
          content: p,
          teamOrder: h,
          getOrderList: I,
          link: g,
          toLink: e => {
            o.adaptor.sendEvent("click_notice_control", {
              button_id: "1",
              button_name: "消息通知点击"
            }), e.serverCode ? a.goPage(`/pagesG/order/detail/index?orderNo=${e.oderNo}&masterId=${e.roomMasterId}&hotelCode=${e.hotelCode}&pmsId=${e.masterId}`) : "complaint" == e.type ? a.goPage(`/pagesG/suggest-detail?id=${e.id}&hotelCode=${e.hotelCode}`) : e && a.goPage(e)
          },
          show: m,
          channel: D,
          notices: f,
          serviceDesc: v,
          complaints: y,
          travelNotices: u,
          adjustNotices: c,
          getAdjustList: E,
          updateData: () => {
            j(), E()
          }
        }
      }
    }),
    f = n._export_sfc(l, [
      ["render", function(e, t, a, r, o, d) {
        return n.e({
          a: e.show
        }, e.show ? n.e({
          b: e.adjustNotices.length > 0
        }, e.adjustNotices.length > 0 ? {
          c: n.f(e.adjustNotices, (t, a, r) => n.e({
            a: n.t(t.content),
            b: t.link
          }, (t.link, {}), {
            c: n.o(a => e.toLink(t.link), a),
            d: a
          }))
        } : {}, {
          d: e.notices.length > 0
        }, e.notices.length > 0 ? {
          e: n.f(e.notices, (t, a, r) => ({
            a: n.t(t.content),
            b: n.o(a => e.toLink(t), a),
            c: a
          }))
        } : {}, {
          f: e.complaints.length > 0
        }, e.complaints.length > 0 ? {
          g: n.f(e.complaints, (t, a, r) => ({
            a: n.t(t.content),
            b: n.o(a => e.toLink(t), a),
            c: a
          }))
        } : {}, {
          h: e.travelNotices.length > 0
        }, e.travelNotices.length > 0 ? {
          i: n.f(e.travelNotices, (t, a, r) => n.e({
            a: n.t(t.content),
            b: t.link
          }, (t.link, {}), {
            c: n.o(a => e.toLink(t.link), a),
            d: a
          }))
        } : {}) : {})
      }],
      ["__scopeId", "data-v-2fd5f372"]
    ]);
  wx.createComponent(f)
}();