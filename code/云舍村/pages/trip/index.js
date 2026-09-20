! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../common/assets.js"),
    r = require("../../utils/umengAdaptor.js"),
    o = require("../../utils/wxuser.js"),
    a = require("../../utils/api.js"),
    l = require("../../utils/utils.js"),
    i = require("../../base/channel.js"),
    n = require("../../base/jAlert/jAlert.js"),
    u = require("../../services/trip.js"),
    s = require("../../utils/qdTracker.js"),
    cfig = require("../../utils/config.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (c + m + p)();
  const c = () => "../../components/notice.js",
    p = () => "../../components/bottomDialog.js",
    m = () => "../../components/water.js",
    g = e.defineComponent({
      __name: "index",
      setup(c) {
        let p = e.ref(o.getStorage("user") || {}),
          m = o.getStorage("config");
        const g = e.ref({});
        e.ref(!1), e.ref({
          imgUrl: "",
          desc: ""
        });
        let f = e.ref([]),
          y = e.ref(348),
          v = e.ref(0),
          h = e.ref(1),
          T = e.ref(""),
          S = e.ref(48);
        e.ref(!1);
        let C = e.ref(48),
          D = e.ref([]),
          b = e.ref(!0),
          N = e.ref(!0),
          _ = e.ref([
            [],
            []
          ]),
          I = e.ref([]),
          E = e.ref([]),
          G = e.ref([]),
          R = e.ref([]);
        e.ref([]);
        let $ = e.ref([]),
          x = e.ref(""),
          V = e.ref(""),
          j = e.ref(i.defaultChannel);
        e.ref(e.dayjs().format("YYYY-MM-DD")), e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD"));
        let P = e.ref([]),
          F = e.ref({}),
          M = e.ref(),
          k = e.ref();
        e.ref("");
        let A = e.ref([]),
          U = e.ref(!1),
          O = e.ref(),
          w = e.ref(!0);
        const L = e.ref([]),
          q = e.ref({}),
          W = e.ref(),
          B = e.ref(!1),
          Q = e.ref(""),
          z = e.ref(""),
          Y = e.ref(!0);

        function H() {
          e.index.navigateBack()
        }
        e.watch(() => V.value, () => {
          M.value && M.value.initData()
        });
        const J = e => e.toFixed(7).slice(0, 3),
          K = (t, o) => {
            let i = "行中",
              n = "出行人",
              d = "日活动";
            if (i = "W" == t.orderSta ? "行前" : (t.orderSta, "已结束"), n = "guest" == t.currentUserIdentity ? "出行人" : "预订人", console.log(t), d = "DayActivity" == t.orderType ? "日活动" : "SingleRoom" == t.orderType ? "单订房" : "Custom" == t.orderType ? "私人订制" : "DestPackage" == t.orderType ? "目的地套餐 " : "ButlerCustomized" == t.orderType ? "管家定制 " : "FreeTravel" == t.orderType ? "自由行" : "主题团", console.log(9999, n), console.log(9999, d), console.log(9999, i), r.adaptor.sendEvent("click_traveled_card_control", {
                button_name: o,
                button_id: "1",
                guest_type: n,
                travel_type: d,
                travel_status: i
              }), e.index.setStorageSync("refresh", 1), "SingleRoom" == t.teamType || "DestPackage" == t.orderType) return "guest" == t.currentUserIdentity ? l.goPage(`/pagesD/trip/hotelInfo?teamNo=${t.teamNo}&hotelCode=${t.teamRsvSrcs[0].hotelCode}&arrDate=${e.dayjs(t.beginDate).format("M月D日")}&depDate=${e.dayjs(t.endDate).format("M月D日")}&rmtype=${t.teamRsvSrcs[0].rmtype}&type=1`) : l.goPage(`/pagesD/trip/hotelInfo?teamNo=${t.teamNo}&hotelCode=${t.teamRsvSrcs[0].hotelCode}&arrDate=${e.dayjs(t.beginDate).format("M月D日")}&depDate=${e.dayjs(t.endDate).format("M月D日")}&rmtype=${t.teamRsvSrcs[0].rmtype}&type=2`), !1;
            a.api.interfaceTransfer({
              query: {
                mobile: p.value.mobile,
                unitCode: m.hotelGroupCode
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/detail/" + t.teamNo,
                interfaceFrom: "GC",
                hotelGroupCode: m.hotelGroupCode
              }
            }).then(r => {
              r.retVal.retVal.teamItineraryInfos[0].teamItineraries.forEach(r => {
                if (r.teamRsvSrcs && r.teamRsvSrcs.length > 0 && (console.log(t), t.dayNum == r.dayNum)) {
                  const t = r.teamRsvSrcs[0];
                  t.arrDateF = e.dayjs(t.arrDate).format("M月D日"), t.depDateF = e.dayjs(t.depDate).format("M月D日"), "guest" == r.currentUserIdentity ? l.goPage(`/pagesD/trip/hotelInfo?rmtype=${t.rmtype}&hotelCode=${t.hotelCode}&arrDate=${t.arrDateF}&depDate=${t.depDateF}&rmtypeDesc=${t.rmtypeDesc}&type=1`) : l.goPage(`/pagesD/trip/hotelInfo?rmtype=${t.rmtype}&hotelCode=${t.hotelCode}&arrDate=${t.arrDateF}&depDate=${t.depDateF}&rmtypeDesc=${t.rmtypeDesc}&type=2`)
                }
              })
            })
          },
          X = t => {
            let o = "行中",
              i = "出行人",
              n = "日活动";
            if (o = "W" == t.orderSta ? "行前" : (t.orderSta, "已结束"), i = "guest" == t.currentUserIdentity ? "出行人" : "预订人", n = "DayActivity" == t.orderType ? "日活动" : "SingleRoom" == t.orderType ? "单订房" : "Custom" == t.orderType ? "私人订制" : "DestPackage" == t.orderType ? "目的地套餐 " : "ButlerCustomized" == t.orderType ? "管家定制 " : "FreeTravel" == t.orderType ? "自由行" : "主题团", r.adaptor.sendEvent("click_traveled_card_control", {
                button_name: "云舍村相册",
                button_id: "2",
                guest_type: i,
                travel_type: n,
                travel_status: o
              }), e.index.setStorageSync("refresh", 1), !b.value) return !1;
            b.value = !1, a.api.interfaceTransfer({
              query: {
                mobile: p.value.mobile,
                unitCode: m.hotelGroupCode
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/detail/" + t.teamNo,
                interfaceFrom: "GC",
                hotelGroupCode: m.hotelGroupCode
              }
            }).then(e => {
              e.retVal.retVal.guests.forEach(e => {
                e.mobile == p.value.mobile && (T.value = e)
              }), b.value = !0, l.goPage("/pagesD/trip/album?teamNo=" + t.teamNo + "&guestId=" + T.value.id)
            })
          },
          Z = e => {
            Q.value = e.teamNo, ee(e => {
              W.value.showDialog()
            });
            let t = "行中",
              o = "出行人",
              a = "日活动";
            t = "W" == e.orderSta ? "行前" : (e.orderSta, "已结束"), o = "guest" == e.currentUserIdentity ? "出行人" : "预订人", a = "DayActivity" == e.orderType ? "日活动" : "SingleRoom" == e.orderType ? "单订房" : "Custom" == e.orderType ? "私人订制" : "DestPackage" == e.orderType ? "目的地套餐 " : "ButlerCustomized" == e.orderType ? "管家定制 " : "FreeTravel" == e.orderType ? "自由行" : "主题团", console.log(9999, o), console.log(9999, a), console.log(9999, t), r.adaptor.sendEvent("click_traveled_card_control", {
              button_name: "司机管家",
              button_id: "3",
              guest_type: o,
              travel_type: a,
              travel_status: t
            })
          },
          ee = e => {
            B.value || (B.value = !0, a.api.interfaceTransfer({
              query: {
                teamNo: Q.value,
                unitCode: m.hotelGroupCode
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/listDriverButlerDto",
                interfaceFrom: "GC",
                hotelGroupCode: m.hotelGroupCode
              }
            }).then(t => {
              if (B.value = !1, 1 == t.result && 0 == t.retVal.result) {
                L.value = t.retVal.retVal;
                let r = {},
                  o = {};
                L.value.forEach(e => {
                  "GW" == e.personType && (r = e), "T" == e.isPartButler && (o = e), "GW" == e.personType && "T" == e.isHostHousekeep && (q.value = e)
                }), q.value.code || (r.code ? q.value = r : q.value = o), e && e()
              } else n.jAlert3(t.retVal.msg || t.msg)
            }))
          },
          te = t => {
            let i = "行中",
              n = "出行人",
              d = "日活动";
            if (i = "W" == t.orderSta ? "行前" : (t.orderSta, "已结束"), n = "guest" == t.currentUserIdentity ? "出行人" : "预订人", d = "DayActivity" == t.orderType ? "日活动" : "SingleRoom" == t.orderType ? "单订房" : "Custom" == t.orderType ? "私人订制" : "DestPackage" == t.orderType ? "目的地套餐 " : "ButlerCustomized" == t.orderType ? "管家定制 " : "FreeTravel" == t.orderType ? "自由行" : "主题团", console.log(9999, n), console.log(9999, d), console.log(9999, i), r.adaptor.sendEvent("click_traveled_card_control", {
                button_name: "接送安排",
                button_id: "4",
                guest_type: n,
                travel_type: d,
                travel_status: i
              }), e.index.setStorageSync("refresh", 1), !b.value) return !1;
            b.value = !1;
            let u = o.getStorage("user");
            a.api.interfaceTransfer({
              query: {
                mobile: u.mobile,
                unitCode: m.hotelGroupCode
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/detail/" + t.teamNo,
                interfaceFrom: "GC",
                hotelGroupCode: m.hotelGroupCode
              }
            }).then(r => {
              var o;
              const a = (null == (o = r.retVal.retVal) ? void 0 : o.guests) || [];
              let i = {};
              r.retVal.retVal.reserveOrders.forEach(e => {
                e.orderNo == t.orderNo && (i = {
                  ...e
                })
              }), a.map(e => e.orderNo).includes(t.orderNo) ? l.goPage(`/pagesD/trip/takeInfo?orderNo=${i.orderNo}&memberNo=${i.memberId}&mobile=${i.mobile}`) : e.index.showToast({
                title: "该订单未添加出行人，请添加出行人后再试",
                icon: "none",
                duration: 4e3
              }), b.value = !0
            })
          },
          re = t => {
            let o = "行中",
              a = "出行人",
              i = "日活动";
            if (o = "W" == t.orderSta ? "行前" : (t.orderSta, "已结束"), a = "guest" == t.currentUserIdentity ? "出行人" : "预订人", i = "DayActivity" == t.orderType ? "日活动" : "SingleRoom" == t.orderType ? "单订房" : "Custom" == t.orderType ? "私人订制" : "DestPackage" == t.orderType ? "目的地套餐 " : "ButlerCustomized" == t.orderType ? "管家定制 " : "FreeTravel" == t.orderType ? "自由行" : "主题团", console.log(9999, a), console.log(9999, i), console.log(9999, o), r.adaptor.sendEvent("click_traveled_card_control", {
                button_name: "今日详情",
                button_id: "9",
                guest_type: a,
                travel_type: i,
                travel_status: o
              }), e.index.setStorageSync("refresh", 1), "SingleRoom" == t.teamType || "DestPackage" == t.orderType) return "guest" == t.currentUserIdentity ? l.goPage(`/pagesD/trip/hotelInfo?teamNo=${t.teamNo}&hotelCode=${t.teamRsvSrcs[0].hotelCode}&arrDate=${e.dayjs(t.beginDate).format("M月D日")}&depDate=${e.dayjs(t.endDate).format("M月D日")}&rmtype=${t.teamRsvSrcs[0].rmtype}&type=1`) : l.goPage(`/pagesD/trip/hotelInfo?teamNo=${t.teamNo}&hotelCode=${t.teamRsvSrcs[0].hotelCode}&arrDate=${e.dayjs(t.beginDate).format("M月D日")}&depDate=${e.dayjs(t.endDate).format("M月D日")}&rmtype=${t.teamRsvSrcs[0].rmtype}&type=2`), !1;
            "guest" == t.currentUserIdentity ? l.goPage(`/pagesD/trip/tripDetail?teamNo=${t.teamNo}&guestId=${T.value.id}&unitCode=${t.unitCode}&itineraryCode=${t.itineraryCode}&type=1&destDateCode=1`) : l.goPage(`/pagesD/trip/tripDetail?teamNo=${t.teamNo}&guestId=${T.value.id}&unitCode=${t.unitCode}&itineraryCode=${t.itineraryCode}&type=2&destDateCodes=1`)
          },
          oe = () => {
            let e = {
              hotelGroupCode: m.hotelGroupCode,
              firstResult: 0,
              pageSize: 15,
              clientTypes: j.value
            };
            a.api.marketingPage(e).then(e => {
              0 == e.result ? e.retVal && e.retVal.datas && e.retVal.datas.length > 0 && e.retVal.datas.forEach(e => {
                if ("2" == e.showLocation) {
                  let t = JSON.parse(e.infos);
                  t && t.length > 0 && t.forEach((e, t) => {
                    let r = {
                      id: e.id,
                      title: e.title,
                      link: e.link,
                      desc: e.desc,
                      items: []
                    };
                    P.value.push(r), e.productChoose && e.productChoose.length > 0 && a.api.queryMarketingProducts({
                      hotelGroupCode: m.hotelGroupCode,
                      hotelCode: m.hotelCode,
                      products: e.productChoose
                    }).then(e => {
                      e.retVal.forEach(e => {
                        if (e.pics && (e.pics = e.pics.split(",")[0]), "daily" == e.productType) try {
                          e.payType = e.minPriceDto.payType.includes("INTEGRALCASH") ? "mix" : "money", e.price = e.minPriceDto.mixPrice || 0, e.credit = e.minPriceDto.mixCredit
                        } catch (t) {
                          e.price = 0
                        }
                      }), P.value[t].items = e.retVal
                    })
                  })
                }
              }) : n.jAlert3(e.msg, 2e3)
            })
          },
          ae = t => {
            e.index.setStorageSync("refresh", 1), t && e.index.navigateTo({
              url: t,
              fail: () => {
                e.index.reLaunch({
                  url: t
                })
              }
            })
          },
          le = () => {
            s.qdTracker.track("diy_travel_click"), ae("/pagesA/other/diyTrip")
          },
          ie = () => {
            const t = "#wrap" + v.value,
              r = e.index.createSelectorQuery();
            r.selectAll(t).boundingClientRect(), r.exec(e => {
              y.value = e[0][v.value].height + 20
            })
          },
          ne = t => {
            v.value = t.detail.current, G.value = f.value[v.value].itineraryHotelList, h.value = 1, w.value = !0, Se(f.value[v.value]), Y.value = !1, setTimeout(() => {
              Y.value = !0
            }, 1), e.nextTick$1(() => {
              ie(), clearTimeout(O.value), O.value = setTimeout(() => {
                U.value = !0, se()
              }, 1500)
            })
          },
          de = () => {
            p.value = o.getStorage("user"), a.api.interfaceTransfer({
              query: {
                isAgency: "T",
                memberNo: p.value.memberId,
                payStas: [],
                mobile: p.value.mobile,
                unitCode: m.hotelGroupCode,
                curPage: 1,
                pageSize: 30,
                firstResult: 0
              },
              config: {
                interfaceType: "POST",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/myTravelList",
                interfaceFrom: "GC",
                hotelGroupCode: m.hotelGroupCode
              }
            }).then(t => {
              1 == t.result && 0 == t.retVal.result ? t.retVal.retVal.length > 0 && (t.retVal.retVal.forEach((t, r) => {
                if (t.beginDate && (t.dayDiff = e.dayjs().diff(t.beginDate, "day"), t.dayEndDiff = e.dayjs(t.endDate).diff(e.dayjs(), "day")), e.dayjs(t.beginDate).add(1, "day").diff(e.dayjs(), "day") > 0 && t.dayEndDiff >= 0) t.orderSta = "W", t.dayDiff <= -2 ? (t.tripSta = "1", t.pageTitle = "行前2天以上") : (t.tripSta = "2", t.pageTitle = "行前2天内"), t.tripTime = `${e.dayjs(t.beginDate).format("M月DD日")}-${e.dayjs(t.endDate).format("M月DD日")}`, e.dayjs(t.beginDate).add(1, "day").diff(e.dayjs(), "day") > 0 && (t.tripDay = e.dayjs(t.beginDate).add(1, "day").diff(e.dayjs(), "day") + "天后出发");
                else if (t.dayEndDiff < 0) t.orderSta = "O", t.dayEndDiff > -7 ? (t.tripSta = "4", t.pageTitle = "行后7天内", t.tripTime = `${e.dayjs(t.beginDate).format("M月DD日")}-${e.dayjs(t.endDate).format("M月DD日")}`, t.tripDay = "已结束") : (t.tripSta = "5", t.pageTitle = "行后7天后");
                else if (e.dayjs(t.beginDate).add(1, "day").diff(e.dayjs(), "day") <= 0 && t.dayEndDiff >= 0) {
                  t.orderSta = "I", t.tripSta = "3", t.pageTitle = "行中", t.tripTime = `${e.dayjs(t.beginDate).format("M月DD日")}-${e.dayjs(t.endDate).format("M月DD日")}`, t.tripDay = "DAY  " + (t.dayDiff + 1), t.dayNum = t.dayDiff + 1;
                  const r = (new Date).setHours(0, 0, 0, 0),
                    o = new Date(e.dayjs(t.endDate).format("YYYY-MM-DD")).setHours(0, 0, 0, 0);
                  t.travelEnds = !0, r == o && (t.travelEnds = !1)
                }
                R.value.findIndex(e => {
                  e.goodsType.forEach(r => {
                    r == t.orderType && e.startTime == t.pageTitle && (t.imgUrl = e.imgUrl)
                  })
                })
              }), f.value = [], JSON.parse(JSON.stringify(t.retVal.retVal)).forEach((e, t) => {
                "行后7天后" == e.pageTitle || (f.value.push(e), me(e), Te(e))
              }), Se(f.value[v.value]), G.value = f.value[0].itineraryHotelList, setTimeout(() => {
                ie()
              }, 120)) : n.jAlert3(t.msg || t.retVal.msg)
            })
          },
          ue = () => {
            p.value = o.getStorage("user"), a.api.shopGetGoodsIsCollection({
              hotelGroupCode: m.hotelGroupCode,
              mobile: p.value.mobile,
              memberId: p.value.memberId,
              goodsId: ""
            }).then(e => {
              A.value = e && Array.isArray(e.retVal) ? e.retVal : []
            }, () => {
              A.value = []
            }).then(se)
          },
          se = () => {
            var t;
            e.index.showLoading({
              mask: !0,
              title: "加载中"
            }), U.value && (_.value = [
              [],
              []
            ], I.value = [], U.value = !1), p.value = o.getStorage("user");
            const r = f.value[v.value];
            u.getTripRecommendFeed({
              hotelGroupCode: m.hotelGroupCode,
              curPage: h.value,
              mobile: null == (t = p.value) ? void 0 : t.mobile,
              teamNo: null == r ? void 0 : r.teamNo,
              isRecommendDayActivity: !0,
              firstResult: 0,
              channel: i.defaultChannel,
              pageSize: 8
            }).then(t => {
              8 != t.retVal.datas.length && (w.value = !1), U.value ? (_.value = [
                [],
                []
              ], I.value = [], U.value = !1, setTimeout(() => {
                e.index.hideLoading()
              }, 1500)) : setTimeout(() => {
                e.index.hideLoading()
              }, 1e3);
              const r = t.retVal.datas;
              A.value.length && A.value.forEach((e, t) => {
                r.findIndex((t, r) => {
                  e.goodsId == t.id && (t.isCollect = !0)
                })
              }), r.forEach((e, t) => (e.count = I.value.length + t, e)), I.value = [...I.value, ...r], I.value.forEach((e, t) => {
                e.numberOfPreviews >= 1e4 && (I.value[t].numberOfPreviews = parseFloat(e.numberOfPreviews / 1e4).toFixed(1) + "w")
              });
              const o = ce(r, 2),
                a = [
                  [],
                  []
                ];
              o.forEach(e => e.forEach((e, t) => a[t].push(e))), _.value[0] = [..._.value[0], ...a[0]], _.value[1] = [..._.value[1], ...a[1]]
            }).catch(t => {
              console.error("tripRecommendFeed failed:", t), w.value = !1, e.index.hideLoading()
            })
          },
          ce = (e = [], t = 1) => {
            let r = [],
              o = [];
            return e.forEach((a, l) => (o.push(a), l % t == t - 1 || l === e.length - 1 ? (r.push(o), o = []) : null)), r
          },
          pe = e => {
            const t = I.value.findIndex(t => t.id == e.id);
            I.value[t] = e;
            const r = I.value.filter(e => e.element);
            if (r.length !== I.value.length) return;
            const o = [
              [],
              []
            ];
            let a = 0,
              l = 0;
            r.forEach(e => a <= l ? (a += e.element.height, o[0].push(e)) : (o[1].push(e), l += e.element.height)), _.value = o
          },
          me = e => {
            let t = o.getStorage("user");
            a.api.interfaceTransfer({
              query: {
                mobile: t.mobile,
                unitCode: m.hotelGroupCode
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/detail/" + e.teamNo,
                interfaceFrom: "GC",
                hotelGroupCode: m.hotelGroupCode
              }
            }).then(t => {
              console.log(111111211, t), t.retVal.retVal.guests.forEach(r => {
                t.retVal.retVal.reserveOrders.forEach(t => {
                  t.orderNo == r.orderNo && (e.orderNo = t.orderNo)
                })
              })
            })
          },
          ge = (t, i) => {
            let n = "行中",
              d = "出行人",
              u = "日活动";
            if (n = "W" == t.orderSta ? "行前" : (t.orderSta, "已结束"), d = "guest" == t.currentUserIdentity ? "出行人" : "预订人", u = "DayActivity" == t.orderType ? "日活动" : "SingleRoom" == t.orderType ? "单订房" : "Custom" == t.orderType ? "私人订制" : "DestPackage" == t.orderType ? "目的地套餐 " : "ButlerCustomized" == t.orderType ? "管家定制 " : "FreeTravel" == t.orderType ? "自由行" : "主题团", console.log(9999, d), console.log(9999, u), console.log(9999, n), r.adaptor.sendEvent("click_traveled_card_control", {
                button_name: i,
                button_id: "5",
                guest_type: d,
                travel_type: u,
                travel_status: n
              }), e.index.setStorageSync("refresh", 1), e.index.showLoading({
                title: "加载中",
                mask: !0
              }), !b.value) return !1;
            b.value = !1;
            let s = o.getStorage("user");
            a.api.interfaceTransfer({
              query: {
                mobile: s.mobile,
                unitCode: m.hotelGroupCode
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/detail/" + t.teamNo,
                interfaceFrom: "GC",
                hotelGroupCode: m.hotelGroupCode
              }
            }).then(r => {
              r.retVal.retVal.guests.forEach(o => {
                r.retVal.retVal.reserveOrders.forEach(r => {
                  if (o.mobile == s.mobile && r.orderNo == o.orderNo) return a.api.getWjxUrl({
                    hotelGroupCode: m.hotelGroupCode,
                    teamNo: t.teamNo,
                    orderNo: r.orderNo,
                    guestNo: t.guestNo
                  }).then(t => (e.index.hideLoading(), b.value = !0, t.msg ? (l.goPage(t.msg), !1) : (e.index.showToast({
                    title: "当前暂无问卷",
                    icon: "none"
                  }), !1))), !1
                })
              })
            })
          },
          fe = (t, o) => {
            let a = "行中",
              i = "出行人",
              n = "日活动";
            if (a = "W" == t.orderSta ? "行前" : (t.orderSta, "已结束"), i = "guest" == t.currentUserIdentity ? "出行人" : "预订人", n = "DayActivity" == t.orderType ? "日活动" : "SingleRoom" == t.orderType ? "单订房" : "Custom" == t.orderType ? "私人订制" : "DestPackage" == t.orderType ? "目的地套餐 " : "ButlerCustomized" == t.orderType ? "管家定制 " : "FreeTravel" == t.orderType ? "自由行" : "主题团", e.index.showLoading({
                title: "加载中"
              }), 1 == o) return r.adaptor.sendEvent("click_traveled_card_control", {
              button_name: "行程天气",
              button_id: "6",
              guest_type: i,
              travel_type: n,
              travel_status: a
            }), e.index.hideLoading(), l.goPage(`/pagesA/other/diyTrip`), !1;
            r.adaptor.sendEvent("click_traveled_card_control", {
              button_name: "出行提示",
              button_id: "7",
              guest_type: i,
              travel_type: n,
              travel_status: a
            }), e.index.hideLoading(), l.goPage(`/pagesA/other/diyTrip`)
          },
          ye = () => {
            if (p.value = o.getStorage("user"), !p.value || !p.value.memberId) return !1;
            a.api.interfaceTransfer({
              query: {
                unitCode: m.hotelGroupCode,
                memberId: p.value.memberId
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ASSISTANT",
                interfaceMethod: "/api/itinerary/plan/recommend/planList",
                interfaceFrom: "GC",
                hotelGroupCode: m.hotelGroupCode
              }
            }).then(e => {
              D.value = e.retVal.retVal
            })
          },
          ve = t => {
            let o = "行中",
              l = "出行人",
              i = "日活动";
            o = "W" == t.orderSta ? "行前" : (t.orderSta, "已结束"), l = "guest" == t.currentUserIdentity ? "出行人" : "预订人", i = "DayActivity" == t.orderType ? "日活动" : "SingleRoom" == t.orderType ? "单订房" : "Custom" == t.orderType ? "私人订制" : "DestPackage" == t.orderType ? "目的地套餐 " : "ButlerCustomized" == t.orderType ? "管家定制 " : "FreeTravel" == t.orderType ? "自由行" : "主题团", console.log(9999, l), console.log(9999, i), console.log(9999, o), r.adaptor.sendEvent("click_traveled_card_control", {
              button_name: "联系顾问",
              button_id: "8",
              guest_type: l,
              travel_type: i,
              travel_status: o
            }), a.api.interfaceTransfer({
              query: {
                teamNo: t.teamNo,
                unitCode: m.hotelGroupCode
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/listDriverButlerDto",
                interfaceFrom: "GC",
                hotelGroupCode: m.hotelGroupCode
              }
            }).then(t => {
              1 == t.result && 0 == t.retVal.result ? e.index.makePhoneCall({
                phoneNumber: t.retVal.retVal[0].mobile
              }) : n.jAlert3(t.retVal.msg || t.msg)
            })
          };
        e.onLoad(t => {
          if (e.index.showLoading({
              title: "加载中",
              mask: !0
            }), p.value = o.getStorage("user"), a.api.msgPage({
              hotelCode: m.hotelCode,
              hotelGroupCode: m.hotelGroupCode,
              clientTypes: j.value,
              firstResult: 0,
              pageSize: 999,
              showLocation: "1"
            }).then(e => {
              $.value = e.retVal.datas
            }), a.api.batchQueryShopConfig({
              hotelGroupCode: m.hotelGroupCode,
              hotelCode: m.hotelCode,
              configItem: "questionnaire"
            }).then(e => {
              e.retVal.forEach(e => {
                "questionnaire" == e.configItem && e.itemValue && (E.value = e.itemValue)
              })
            }), t.scene) {
            let e = l.getUrlParams(decodeURIComponent(decodeURIComponent(t.scene)));
            e.teamNo && (x.value = e.teamNo)
          }
          p.value && p.value.memberId ? (setTimeout(() => {
            ye()
          }, 200), setTimeout(() => {
            ue()
          }, 1200), g.value.productCode ? (M.value.updateData(), k.value.updateData()) : oe()) : setTimeout(() => {
            se()
          }, 1200)
        }), e.onReachBottom(() => {
          w.value && (h.value++, se())
        }), e.onPullDownRefresh(() => {
          p.value = o.getStorage("user"), p.value && p.value.memberId ? (setTimeout(() => {
            w.value = !0, h.value = 1, U.value = !0, ue()
          }, 1200), de(), ye()) : setTimeout(() => {
            w.value = !0, h.value = 1, U.value = !0, se()
          }, 1200), g.value.productCode ? (M.value.updateData(), k.value.updateData()) : oe(), setTimeout(() => {
            e.index.stopPullDownRefresh()
          }, 1e3)
        });
        const he = () => {
            e.index.setStorageSync("refLogin", 1), l.toLogin()
          },
          Te = t => {
            console.log(999999999, t.imgUrl), e.index.request({
              url: t.imgUrl + "?imageAve",
              method: "POST",
              success: e => {
                t.bjColor = "#" + e.data.RGB.slice(2, 8)
              },
              fail: e => {
                console.error("Failed to get average hue:", e)
              }
            })
          },
          Se = t => {
            e.index.request({
              url: t.imgUrl + "?imageAve",
              method: "POST",
              success: e => {
                z.value = "#" + e.data.RGB.slice(2, 8)
              },
              fail: e => {
                console.error("Failed to get average hue:", e)
              }
            })
          };
        return e.onShow(() => {
          p.value = o.getStorage("user");
          const t = e.index.getStorageSync("refresh"),
            r = e.index.getStorageSync("showRefresh"),
            l = e.index.getStorageSync("refLogin"),
            n = e.index.getStorageSync("imageText");
          if (n && setTimeout(() => {
              var t;
              t = n, p.value = o.getStorage("user"), a.api.shopGetGoodsIsCollection({
                hotelGroupCode: m.hotelGroupCode,
                mobile: p.value.mobile,
                memberId: p.value.memberId,
                goodsId: t
              }).then(r => {
                _.value[0].forEach(e => {
                  e.id == t && (0 == r.retVal.length ? e.isCollect = !1 : e.isCollect = !0)
                }), _.value[1].forEach(e => {
                  e.id == t && (0 == r.retVal.length ? e.isCollect = !1 : e.isCollect = !0)
                }), e.index.removeStorageSync("imageText")
              })
            }, 99), 1 == t) return 1 == r && ((() => {
            const t = e.index.getStorageSync("idValue"),
              r = e.index.getStorageSync("whether"),
              o = e.index.getStorageSync("quantity");
            _.value[0].forEach(a => {
              t == a.id && (a.isCollect = r, a.collectNum = o, e.index.removeStorageSync("idValue"), e.index.removeStorageSync("whether"), e.index.removeStorageSync("quantity"))
            }), _.value[1].forEach(a => {
              t == a.id && (a.isCollect = r, a.collectNum = o, e.index.removeStorageSync("idValue"), e.index.removeStorageSync("whether"), e.index.removeStorageSync("quantity"))
            })
          })(), e.index.removeStorageSync("showRefresh")), (() => {
            var e;
            p.value = o.getStorage("user");
            const t = f.value[v.value];
            u.getTripRecommendFeed({
              hotelGroupCode: m.hotelGroupCode,
              curPage: h.value,
              mobile: null == (e = p.value) ? void 0 : e.mobile,
              teamNo: null == t ? void 0 : t.teamNo,
              pageSize: 10,
              firstResult: 0,
              channel: i.defaultChannel,
              isRecommendDayActivity: !0
            }).then(e => {
              e.retVal.datas.forEach(e => {
                _.value[0].findIndex(t => {
                  e.id == t.id && (t.collectNum = e.collectNum)
                }), _.value[1].findIndex(t => {
                  e.id == t.id && (t.collectNum = e.collectNum)
                })
              })
            })
          })(), e.index.removeStorageSync("refresh"), !1;
          1 == l && p.value && p.value.memberId && (v.value = 0, N.value = !1, setTimeout(() => {
            N.value = !0
          }, 120), e.index.removeStorageSync("refLogin")), p.value && p.value.memberId && (a.api.advertisementPage({
            hotelCode: m.hotelCode,
            hotelGroupCode: m.hotelGroupCode,
            clientTypes: j.value,
            firstResult: 0,
            pageSize: 99,
            showLocation: "4"
          }).then(e => {
            if (0 == e.result && e.retVal && e.retVal.datas && e.retVal.datas.length > 0) {
              let t = [];
              e.retVal.datas.forEach(e => {
                JSON.parse(e.infos).forEach((e, r) => {
                  t.push(e)
                })
              }), R.value = t, de()
            }
          }), ye())
        }), e.onMounted(() => {
          S.value = e.index.getMenuButtonBoundingClientRect().top - 2, e.index.getSystemInfo({
            success: t => {
              let r = e.index.getMenuButtonBoundingClientRect();
              C.value = r.bottom + 62
            },
            fail(e) {
              console.log(e)
            }
          })
        }), (i, u) => e.e({
          a: e.unref(p) && e.unref(p).memberId
        }, e.unref(p) && e.unref(p).memberId ? e.e({
          b: e.o(H),
          c: e.o(e => ae("/pagesD/trip/tripList?type=2")),
          d: 0 != e.unref(f).length
        }, 0 != e.unref(f).length ? {
          e: e.o(e => ae("/pagesTravelAssistant/journey/edit"))
        } : {}, {
          f: e.unref(S) + "px",
          g: e.unref(S) < 23 ? 1 : "",
          h: e.unref(S) + 40 + "px",
          i: 0 == e.unref(f).length
        }, 0 == e.unref(f).length ? {
          j: t._imports_0,
          k: e.o(le),
          l: e.f(e.unref(D), (t, r, a) => e.e({
            a: t.picUrl + "?imageView2/1/&x-oss-process=image/resize,m_fill",
            b: t.isCollect
          }, (t.isCollect, {}), {
            c: 0 == t.collectNum
          }, (t.collectNum, {}), {
            d: t.collectNum > 0 && t.collectNum < 1e3
          }, t.collectNum > 0 && t.collectNum < 1e3 ? {
            e: e.t(t.collectNum)
          } : {}, {
            f: t.collectNum >= 1e3 && t.collectNum < 1e4
          }, t.collectNum >= 1e3 && t.collectNum < 1e4 ? {
            g: e.t(J(t.collectNum / 1e3))
          } : {}, {
            h: t.collectNum >= 1e4 && t.collectNum < 1e5
          }, t.collectNum >= 1e4 && t.collectNum < 1e5 ? {
            i: e.t(J(t.collectNum / 1e4))
          } : {}, {
            j: t.collectNum >= 1e5
          }, t.collectNum >= 1e5 ? {
            k: e.t((t.collectNum / 1e4).toFixed(0))
          } : {}, {
            l: r,
            m: e.o(e => (e => {
              p.value = o.getStorage("user"), l.goPage(`/pagesA/other/diyTrip`)
            })(t), r)
          }))
        } : e.e({
          m: e.f(e.unref(f), (t, o, i) => e.e({
            a: t.imgUrl,
            b: e.t(t.tripDay),
            c: `linear-gradient(to top, ${t.bjColor?t.bjColor:z.value} 65%, rgba(81, 99, 135, 0) 100%)`,
            d: e.t(t.tripTime),
            e: e.t(t.itineraryName),
            f: "SingleRoom" == t.orderType || "DestPackage" == t.orderType
          }, "SingleRoom" == t.orderType || "DestPackage" == t.orderType ? e.e({
            g: "W" == t.orderSta
          }, "W" == t.orderSta ? {
            h: e.o(e => K(t, "酒店介绍"), o)
          } : {}, {
            i: "O" == t.orderSta
          }, "O" == t.orderSta ? e.e({
            j: "F" == t.ifFillQuestion && "guest" == t.currentUserIdentity
          }, "F" == t.ifFillQuestion && "guest" == t.currentUserIdentity ? {
            k: e.o(e => X(t), o)
          } : {}, {
            l: "T" == t.ifFillQuestion
          }, "T" == t.ifFillQuestion ? {
            m: e.o(e => ge(t, "问卷反馈"), o)
          } : {}) : {}, {
            n: "guest" == t.currentUserIdentity
          }, "guest" == t.currentUserIdentity ? e.e({
            o: "W" == t.orderSta
          }, "W" == t.orderSta ? e.e({
            p: "行前2天以上" == t.pageTitle
          }, "行前2天以上" == t.pageTitle ? {
            q: e.o(e => fe(t), o)
          } : {}, {
            r: "行前2天内" == t.pageTitle
          }, "行前2天内" == t.pageTitle ? {
            s: e.o(e => fe(t, 1), o)
          } : {}) : {}, {
            t: "I" == t.orderSta
          }, "I" == t.orderSta ? {
            v: e.o(e => K(t, "酒店介绍"), o)
          } : {}, {
            w: "O" == t.orderSta
          }, "O" == t.orderSta ? e.e({
            x: "F" == t.ifFillQuestion
          }, "F" == t.ifFillQuestion ? {
            y: e.o(e => ge(t, "填写问卷"), o)
          } : {}, {
            z: "T" == t.ifFillQuestion
          }, "T" == t.ifFillQuestion ? {
            A: e.o(e => X(t), o)
          } : {}) : {}) : e.e({
            B: "W" == t.orderSta
          }, "W" == t.orderSta ? e.e({
            C: "行前2天以上" == t.pageTitle
          }, "行前2天以上" == t.pageTitle ? {
            D: e.o(e => fe(t), o)
          } : {}, {
            E: "行前2天内" == t.pageTitle
          }, "行前2天内" == t.pageTitle ? {
            F: e.o(e => fe(t, 1), o)
          } : {}) : {}, {
            G: "I" == t.orderSta
          }, "I" == t.orderSta ? {
            H: e.o(e => K(t, "酒店介绍"), o)
          } : {}, {
            I: "O" == t.orderSta
          }, "O" == t.orderSta ? {
            J: e.o(e => X(t), o)
          } : {}), {
            K: t.bjColor ? t.bjColor : z.value
          }) : e.e({
            L: "guest" == t.currentUserIdentity
          }, "guest" == t.currentUserIdentity ? {
            M: e.o(e => (e => {
              if (!b.value) return !1;
              b.value = !1, a.api.interfaceTransfer({
                query: {
                  mobile: p.value.mobile,
                  unitCode: m.hotelGroupCode
                },
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_TRAVEL_ORDER",
                  interfaceMethod: "/api/team/order/detail/" + e.teamNo,
                  interfaceFrom: "GC",
                  hotelGroupCode: m.hotelGroupCode
                }
              }).then(t => {
                t.retVal.retVal.guests.forEach(e => {
                  e.mobile == p.value.mobile && (T.value = e)
                }), b.value = !0, l.goPage(`/pagesD/trip/allServices?teamNo=${e.teamNo}&guestId=${T.value.id}&unitCode=${e.unitCode}&itineraryCode=${e.itineraryCode}&orderType=${e.orderType}`)
              })
            })(t), o)
          } : {}, {
            N: "W" == t.orderSta
          }, "W" == t.orderSta ? e.e({
            O: "S" == t.formationStatus
          }, "S" == t.formationStatus ? e.e({
            P: "行前2天以上" == t.pageTitle
          }, "行前2天以上" == t.pageTitle ? {
            Q: e.o(e => fe(t), o)
          } : {}, {
            R: "行前2天内" == t.pageTitle
          }, "行前2天内" == t.pageTitle ? e.e({
            S: "S" == t.formationStatus
          }, "S" == t.formationStatus ? e.e({
            T: "T" == t.ifShuttle
          }, "T" == t.ifShuttle ? {
            U: e.o(e => Z(t), o)
          } : {
            V: e.o(e => te(t), o)
          }) : {
            W: e.o(e => fe(t), o)
          }) : {}) : e.e({
            X: "行前2天以上" == t.pageTitle
          }, "行前2天以上" == t.pageTitle ? {
            Y: e.o(e => te(t), o)
          } : {}, {
            Z: "行前2天内" == t.pageTitle
          }, "行前2天内" == t.pageTitle ? {
            aa: e.o(e => fe(t), o)
          } : {})) : {}, {
            ab: "I" == t.orderSta
          }, "I" == t.orderSta ? e.e({
            ac: t.travelEnds
          }, t.travelEnds ? {
            ad: e.o(e => K(t, "酒店介绍"), o)
          } : {
            ae: e.o(e => re(t), o)
          }) : {}, {
            af: "O" == t.orderSta
          }, "O" == t.orderSta ? e.e({
            ag: "F" == t.ifFillQuestion && "guest" == t.currentUserIdentity
          }, "F" == t.ifFillQuestion && "guest" == t.currentUserIdentity ? {
            ah: e.o(e => X(t), o)
          } : {}, {
            ai: "T" == t.ifFillQuestion
          }, "T" == t.ifFillQuestion ? {
            aj: e.o(e => ge(t, "问卷反馈"), o)
          } : {}) : {}, {
            ak: "guest" == t.currentUserIdentity
          }, "guest" == t.currentUserIdentity ? e.e({
            al: "W" == t.orderSta
          }, "W" == t.orderSta ? e.e({
            am: "S" == t.formationStatus
          }, "S" == t.formationStatus ? e.e({
            an: "行前2天以上" == t.pageTitle
          }, "行前2天以上" == t.pageTitle ? e.e({
            ao: "T" == t.ifShuttle
          }, "T" == t.ifShuttle ? {
            ap: e.o(e => Z(t), o)
          } : {
            aq: e.o(e => te(t), o)
          }) : {}, {
            ar: "行前2天内" == t.pageTitle
          }, "行前2天内" == t.pageTitle ? {
            as: e.o(e => fe(t, 1), o)
          } : {}) : e.e({
            at: "行前2天以上" == t.pageTitle
          }, "行前2天以上" == t.pageTitle ? {
            av: e.o(e => fe(t), o)
          } : {}, {
            aw: "行前2天内" == t.pageTitle
          }, "行前2天内" == t.pageTitle ? {
            ax: e.o(e => ve(t), o)
          } : {})) : {}, {
            ay: "I" == t.orderSta
          }, "I" == t.orderSta ? e.e({
            az: t.travelEnds
          }, t.travelEnds ? {
            aA: e.o(e => re(t), o)
          } : {
            aB: e.o(e => te(t), o)
          }) : {}, {
            aC: "O" == t.orderSta
          }, "O" == t.orderSta ? e.e({
            aD: "F" == t.ifFillQuestion
          }, "F" == t.ifFillQuestion ? {
            aE: e.o(e => ge(t, "填写问卷"), o)
          } : {}, {
            aF: "T" == t.ifFillQuestion
          }, "T" == t.ifFillQuestion ? {
            aG: e.o(e => X(t), o)
          } : {}) : {}) : e.e({
            aH: "W" == t.orderSta
          }, "W" == t.orderSta ? e.e({
            aI: "S" == t.formationStatus
          }, "S" == t.formationStatus ? e.e({
            aJ: "行前2天以上" == t.pageTitle
          }, "行前2天以上" == t.pageTitle ? e.e({
            aK: "T" == t.ifShuttle
          }, "T" == t.ifShuttle ? {
            aL: e.o(e => Z(t), o)
          } : {
            aM: e.o(e => te(t), o)
          }) : {}, {
            aN: "行前2天内" == t.pageTitle
          }, "行前2天内" == t.pageTitle ? {
            aO: e.o(e => fe(t, 1), o)
          } : {}) : e.e({
            aP: "行前2天以上" == t.pageTitle
          }, "行前2天以上" == t.pageTitle ? {
            aQ: e.o(e => fe(t), o)
          } : {}, {
            aR: "行前2天内" == t.pageTitle
          }, "行前2天内" == t.pageTitle ? {
            aS: e.o(e => ve(t), o)
          } : {})) : {}, {
            aT: "I" == t.orderSta
          }, "I" == t.orderSta ? e.e({
            aU: t.travelEnds
          }, t.travelEnds ? {
            aV: e.o(e => re(t), o)
          } : {
            aW: e.o(e => te(t), o)
          }) : {}, {
            aX: "O" == t.orderSta
          }, "O" == t.orderSta ? {
            aY: e.o(e => X(t), o)
          } : {}), {
            aZ: t.bjColor ? t.bjColor : z.value
          }), {
            ba: e.o(o => (t => {
              let o = "行中",
                a = "出行人",
                i = "日活动";
              if (o = "W" == t.orderSta ? "行前" : (t.orderSta, "已结束"), a = "guest" == t.currentUserIdentity ? "出行人" : "预订人", i = "DayActivity" == t.orderType ? "日活动" : "SingleRoom" == t.orderType ? "单订房" : "Custom" == t.orderType ? "私人订制" : "DestPackage" == t.orderType ? "目的地套餐 " : "ButlerCustomized" == t.orderType ? "管家定制 " : "FreeTravel" == t.orderType ? "自由行" : "主题团", console.log(9999, a), console.log(9999, i), console.log(9999, o), r.adaptor.sendEvent("click_traveled_card_control", {
                  button_name: "卡片详情",
                  button_id: "9",
                  guest_type: a,
                  travel_type: i,
                  travel_status: o
                }), e.index.setStorageSync("refresh", 1), "SingleRoom" == t.teamType || "DestPackage" == t.orderType) return "guest" == t.currentUserIdentity ? l.goPage(`/pagesD/trip/hotelInfo?teamNo=${t.teamNo}&hotelCode=${t.teamRsvSrcs[0].hotelCode}&arrDate=${e.dayjs(t.beginDate).format("M月D日")}&depDate=${e.dayjs(t.endDate).format("M月D日")}&rmtype=${t.teamRsvSrcs[0].rmtype}&type=1`) : l.goPage(`/pagesD/trip/hotelInfo?teamNo=${t.teamNo}&hotelCode=${t.teamRsvSrcs[0].hotelCode}&arrDate=${e.dayjs(t.beginDate).format("M月D日")}&depDate=${e.dayjs(t.endDate).format("M月D日")}&rmtype=${t.teamRsvSrcs[0].rmtype}&type=2`), !1;
              "guest" == t.currentUserIdentity ? l.goPage(`/pagesD/trip/tripDetail?orderNo=${t.orderNo}&teamNo=${t.teamNo}&guestId=${T.value.id}&unitCode=${t.unitCode}&itineraryCode=${t.itineraryCode}&type=1`) : l.goPage(`/pagesD/trip/tripDetail?orderNo=${t.orderNo}&teamNo=${t.teamNo}&guestId=${T.value.id}&unitCode=${t.unitCode}&itineraryCode=${t.itineraryCode}&type=2`)
            })(t), o),
            bb: o
          })),
          n: "wrap" + e.unref(v),
          o: e.o(ne),
          p: e.unref(y) + "px",
          q: 1 != e.unref(f).length
        }, 1 != e.unref(f).length ? {
          r: e.f(e.unref(f), (t, r, o) => ({
            a: r,
            b: r == e.unref(v) ? 1 : ""
          }))
        } : {}, {
          s: Y.value
        }, Y.value ? {
          t: e.sr(k, "64fa72d1-0", {
            k: "noticeRef"
          }),
          v: e.p({
            showLocation: 1,
            teamNo: e.unref(f)[e.unref(v)].teamNo,
            orderNo: e.unref(f)[e.unref(v)].orderNo,
            masterInfo: e.unref(F),
            showInfo: 1
          })
        } : {})) : {
          w: `${cfig.config.baseUrlmall.replace(/\/api\/?$/, "")}/uploads/images/云舍村-航拍全景.jpg`,
          x: e.o(e => he()),
          y: e.o(e => he())
        }, {
          z: 0 != e.unref(_)[0].length
        }, (e.unref(_)[0].length, {}), {
          A: e.f(e.unref(_), (t, r, o) => ({
            a: e.f(t, (t, r, a) => ({
              a: e.o(pe, r),
              b: "64fa72d1-1-" + o + "-" + a,
              c: e.p({
                item: t
              }),
              d: r
            })),
            b: r
          })),
          B: e.unref(N),
          C: e.f(L.value, (t, r, o) => e.e({
            a: t.mainPic
          }, t.mainPic ? {
            b: t.mainPic
          } : {}, {
            c: "HOUSEKEEP" == t.personType
          }, ("HOUSEKEEP" == t.personType || "DRIVER" == t.personType || t.personType, {}), {
            d: "DRIVER" == t.personType,
            e: "GW" == t.personType,
            f: e.t(t.name),
            g: "GW" != t.personType
          }, (t.personType, {}), {
            h: t.mobile
          }, t.mobile ? {
            i: e.o(r => {
              var o;
              (o = t.mobile) ? e.index.makePhoneCall({
                phoneNumber: o
              }): n.jAlert3("暂无手机号")
            }, r)
          } : {}, {
            j: e.t(t.biographicalNotes),
            k: r,
            l: e.o(e => (e => {
              "GW" != e.personType && l.goPage("/pagesD/trip/houseKeep?code=" + e.code)
            })(t), r)
          })),
          D: e.sr(W, "64fa72d1-2", {
            k: "serviceTeam"
          }),
          E: e.p({
            title: "服务团队",
            maxDialog: !0
          })
        })
      }
    });
  wx.createPage(g)
}();
