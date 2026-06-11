! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../base/channel.js"),
    t = require("../../base/jAlert/jAlert.js"),
    o = require("../../hooks/useScroll.js"),
    r = require("../../utils/api.js"),
    l = require("../../utils/utils.js"),
    u = require("../../utils/wxuser.js");
  Math || (n + v + c + s + i + d)();
  const i = () => "../../components/bottomDialog.js",
    n = () => "../../components/coustomHead.js",
    s = () => "../../components/moreText.js",
    c = () => "../../components/swiperBox.js",
    v = () => "../../components/tripNav.js",
    d = () => "../components/v-previewImage.js",
    f = e.defineComponent({
      __name: "tripDetail",
      setup(i) {
        const {
          scrollTop: n,
          onPageScroll: s
        } = o.useScroll(), c = u.getStorage("config");
        let v = u.getStorage("user");
        const d = e.ref([]),
          f = e.ref([]),
          m = e.ref(""),
          p = e.ref({}),
          g = e.ref(),
          h = e.ref([]);
        e.ref(a.defaultChannel);
        const D = e.ref(),
          y = e.ref([]);
        e.reactive(u.getStorage("wxuser"));
        const C = e.ref(""),
          T = e.ref(""),
          N = e.ref(""),
          b = e.ref(1),
          S = e.reactive({
            indicatorDots: !1,
            autoplay: !1,
            slot: !0,
            dotPosStyle: "bottom:0px;left:50%;transform: translate(-50%);background:rgba(204, 204, 204, 0.28);",
            dotStyle: "background:#000;",
            duration: 300
          }),
          G = e.ref({});
        let E = e.reactive({});
        const j = e.ref({}),
          M = e.ref([]),
          _ = e.ref({}),
          V = e.ref({}),
          R = e.ref([]),
          x = e.ref([]),
          F = e.ref({}),
          w = e.ref([]),
          I = e.ref([]),
          L = e.ref(!1);
        e.ref({
          img: "",
          desc: ""
        });
        const O = e.ref(),
          k = e.ref(!1),
          A = e.reactive([{
            name: "早上",
            icon: "icon-a-12_zaoshang"
          }, {
            name: "上午",
            icon: "icon-a-12_shangwu"
          }, {
            name: "中午",
            icon: "icon-a-12_zhongwu"
          }, {
            name: "下午",
            icon: "icon-a-12_xiawu"
          }, {
            name: "晚上",
            icon: "icon-a-12_wanshang"
          }]);

        function U(e) {
          r.api.interfaceTransfer({
            query: {
              type: "Transportation",
              unitCode: c.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_INFOMATION_CENTER",
              interfaceMethod: "api/codeBaseapi/listCodeBase",
              interfaceFrom: "GC",
              hotelGroupCode: c.hotelGroupCode
            }
          }).then(a => {
            1 === a.result && 0 === a.retVal.result && (R.value = a.retVal.retVal, e && e())
          })
        }

        function B() {
          var a;
          a = "/pagesD/trip/tripHotel?teamNo=" + M.value[0].teamNo, e.index.navigateTo({
            url: a
          })
        }

        function q(e) {
          p.value = e,
            function(e) {
              const a = e;
              r.api.interfaceTransfer({
                query: {
                  unitCode: c.hotelGroupCode,
                  categoryName: a
                },
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_UCBASE_URL",
                  interfaceMethod: "albumCategory/photoByName",
                  interfaceFrom: "GC",
                  hotelGroupCode: c.hotelGroupCode
                }
              }).then(e => {
                1 === e.result && 0 === e.retVal.result ? p.value.photos = e.retVal.retVal : t.jAlert3(e.result.msg || e.msg)
              })
            }(p.value.activeName), g.value.showDialog()
        }

        function $() {
          L.value ? e.index.navigateTo({
            url: `/pagesD/trip/takeInfo?orderNo=${G.value.orderNo}&teamNo=${j.value.teamNo}&memberNo=${G.value.memberNo}&mobile=${G.value.mobile}`
          }) : e.index.showToast({
            title: "该订单未添加出行人，请添加出行人后再试",
            icon: "none",
            duration: 4e3
          })
        }

        function P(a) {
          _.value = a,
            function(a) {
              x.value = [];
              let t = "",
                o = "",
                r = {};
              if (!_.value.itineraryCode && M.value.length > 0 && ("1" !== j.value.tripSta && "2" !== j.value.tripSta || (r = M.value[0]), "4" !== j.value.tripSta && "5" !== j.value.tripSta || (r = M.value[M.value.length - 1]), "3" === j.value.tripSta && M.value.forEach(a => {
                  a.bizDateF === e.dayjs().format("M月D日") && (r = a)
                })), _.value.itineraryCode && (r = _.value), r.teamRsvSrcs && r.teamRsvSrcs.length > 0 && (o = r.teamRsvSrcs[0].hotelDesc), I.value.forEach(e => {
                  e.name === o && e.albumPhotos.forEach((e, a) => {
                    a < 2 && x.value.push(e)
                  })
                }), r.actives && r.actives.length > 0)
                for (let e = 0; e < r.actives.length && (t = r.actives[e].activeName, w.value.forEach(e => {
                    e.name === t && e.albumPhotos.forEach((e, a) => {
                      x.value.length < 4 && x.value.push(e)
                    })
                  }), !(x.value.length >= 4)); e++);
              a && a()
            }(() => {
              _.value.itineraryCode && e.nextTick$1(() => {
                setTimeout(() => {
                  e.index.pageScrollTo({
                    selector: "#trip-detail",
                    offsetTop: -100,
                    complete: e => {}
                  })
                }, 100)
              })
            })
        }

        function z(a) {
          a && r.api.interfaceTransfer({
            query: {
              orderNo: a,
              unitCode: c.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/shuttle/listByOrderNo",
              interfaceFrom: "GC",
              hotelGroupCode: c.hotelGroupCode
            }
          }).then(a => {
            1 === a.result && 0 === a.retVal.result ? a.retVal.retVal.forEach(a => {
              a.trafficTypeDesc = function(e) {
                let a = "";
                return R.value.forEach(t => {
                  t.code === e && (a = t.descript)
                }), a
              }(a.trafficType), a.beginDateF = e.dayjs(a.beginDate).format("M月D日"), "J" === a.shuttleType && d.value.push(a), "S" === a.shuttleType && f.value.push(a)
            }) : t.jAlert3(a.retVal.msg || a.msg)
          })
        }
        return s(e => {
          n.value = e.scrollTop
        }), e.onShow(() => {
          d.value = [], f.value = [], v = u.getStorage("user"), v && v.memberId ? E.reserveOrders ? (U(() => {
            z(G.value.orderNo)
          }), O.value.updateData()) : (v = u.getStorage("user"), h.value = [], r.api.interfaceTransfer({
            query: {
              mobile: v.mobile,
              unitCode: c.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/team/order/detail/" + m.value,
              interfaceFrom: "GC",
              hotelGroupCode: c.hotelGroupCode
            }
          }).then(a => {
            if (1 === a.result && 0 === a.retVal.result) {
              if (E = a.retVal.retVal, a.retVal.retVal.guests.forEach(e => {
                  e.mobile === v.mobile && (V.value = e)
                }), E.driverButlerDtos && E.driverButlerDtos.forEach(e => {
                  "HOUSEKEEP" === e.personType && (F.value = e)
                }), 0 === E.reserveOrders.length) return void l.goPage("/pages/travel/index");
              const o = E.reserveOrders.filter(e => e.mobile === v.mobile),
                u = E.guests.map(e => e.orderNo),
                i = E.guests.find(e => e.mobile === v.mobile);
              o.length ? G.value = C.value ? o.find(e => e.orderNo === C.value) : o[0] : G.value = (null == i ? void 0 : i.orderNo) ? E.reserveOrders.find(e => e.orderNo === i.orderNo) : o[0], L.value = u.includes(G.value.orderNo), j.value = E.teamOrder, "Custom" === j.value.orderType && (j.value.productCode = j.value.id, j.value.productDesc = j.value.teamName), M.value = E.teamItineraryInfos[0].teamItineraries, j.value.dayDiff = e.dayjs().diff(j.value.beginDate, "day"), j.value.dayEndDiff = e.dayjs(j.value.endDate).diff(e.dayjs(), "day"), M.value.forEach(a => {
                  if (a.actives && a.actives.length > 0 && a.actives.forEach(e => {
                      a.activesTl ? a.activesTl += " - " + e.activeName : a.activesTl = e.activeName
                    }), a.bizDateF = e.dayjs(j.value.beginDate).add(a.dayNum - 1, "day").format("M月D日"), a.moon = e.dayjs(j.value.beginDate).add(a.dayNum - 1, "day").format("M"), a.days = e.dayjs(j.value.beginDate).add(a.dayNum - 1, "day").format("D"), a.teamRsvSrcs.length > 0) {
                    const t = a.teamRsvSrcs[0];
                    t.arrDateF = e.dayjs(t.arrDate).format("M月D日"), t.depDateF = e.dayjs(t.depDate).format("M月D日"), h.value.push(t)
                  }
                }), "W" === j.value.orderSta ? j.value.dayDiff <= -2 ? (j.value.tripSta = "1", j.value.pageTitle = "行前2天以上") : (j.value.tripSta = "2", j.value.pageTitle = "行前2天内") : "I" === j.value.orderSta ? (j.value.tripSta = "3", j.value.pageTitle = "行中") : "O" === j.value.orderSta && (j.value.dayEndDiff >= -7 ? (j.value.tripSta = "4", j.value.pageTitle = "行后7天内") : (j.value.tripSta = "5", j.value.pageTitle = "行后7天后")), j.value.tripTime = `${e.dayjs(j.value.beginDate).format("M月DD日")}-${e.dayjs(j.value.endDate).format("M月DD日")}`,
                function() {
                  const e = {
                    fromDate: "",
                    toDate: "",
                    otaChannel: "WECHAT",
                    hotelGroupCodes: c.hotelGroupCode,
                    cardLevel: "",
                    hasPriceMin: "T",
                    clientLatitude: "",
                    clientLongitude: "",
                    position: "",
                    positionValue: "",
                    keyWord: "",
                    radius: "",
                    pageSize: 999,
                    firstResult: 0,
                    cardType: "",
                    appid: c.appid,
                    componentAppid: c.componentAppid,
                    memberNo: ""
                  };
                  r.api.findHotel(e).then(e => {
                    1 === e.result && h.value.forEach(a => {
                      e.retVal.resultInfos.forEach((e, t) => {
                        a.hotelCode === e.code && (a.extraLogo = e.extraLogo, a.phone = e.phone, a.pictures = e.pictures, a.hotelLatitude = e.hotelLatitude, a.hotelLongitude = e.hotelLongitude)
                      })
                    })
                  }).catch(e => {
                    console.log(e)
                  }).finally(e => {})
                }(), "5" === j.value.tripSta && (k.value = !0), U(() => {
                  z(G.value.orderNo)
                }), r.api.interfaceTransfer({
                  query: {
                    unitCode: c.hotelGroupCode,
                    teamNo: m.value
                  },
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_UCBASE_URL",
                    interfaceMethod: "albumCategory/listRootCategory",
                    interfaceFrom: "GC",
                    hotelGroupCode: c.hotelGroupCode
                  }
                }).then(e => {
                  1 === e.result && 0 === e.retVal.result ? e.retVal.retVal.forEach(e => {
                    "活动相册" === e.name && r.api.interfaceTransfer({
                      query: {
                        unitCode: c.hotelGroupCode,
                        categoryId: e.categoryId,
                        teamNo: m.value
                      },
                      config: {
                        interfaceType: "GET",
                        interfaceModule: "GC_UCBASE_URL",
                        interfaceMethod: "albumCategory/photoByRemark",
                        interfaceFrom: "GC",
                        hotelGroupCode: c.hotelGroupCode
                      }
                    }).then(e => {
                      1 === e.result && 0 === e.retVal.result ? (w.value = e.retVal.retVal, P({})) : t.jAlert3(e.result.msg || e.msg)
                    }), "酒店相册" === e.name && r.api.interfaceTransfer({
                      query: {
                        unitCode: c.hotelGroupCode,
                        categoryId: e.categoryId,
                        teamNo: m.value
                      },
                      config: {
                        interfaceType: "GET",
                        interfaceModule: "GC_UCBASE_URL",
                        interfaceMethod: "albumCategory/photoByRemark",
                        interfaceFrom: "GC",
                        hotelGroupCode: c.hotelGroupCode
                      }
                    }).then(e => {
                      1 === e.result && 0 === e.retVal.result ? (I.value = e.retVal.retVal, P({})) : t.jAlert3(e.result.msg || e.msg)
                    })
                  }) : t.jAlert3(e.result.msg || e.msg)
                })
            }
          })) : l.toLogin()
        }), e.onLoad(a => {
          if (a.teamNo && (m.value = a.teamNo), a.orderNo && "undefined" !== a.orderNo && (C.value = a.orderNo), a.scene) {
            const e = l.getUrlParams(decodeURIComponent(decodeURIComponent(a.scene)));
            e.teamNo && (m.value = e.teamNo)
          }
          a.unitCode && (T.value = a.unitCode.toString(), N.value = a.itineraryCode.toString(), b.value = a.type.toString()), 1 === a.destDateCode && setTimeout(() => {
            M.value.forEach((a, t) => {
              const o = (new Date).setHours(0, 0, 0, 0);
              new Date(e.dayjs(a.bizDate).format("YYYY-MM-DD")).setHours(0, 0, 0, 0) === o && P(M.value[t])
            })
          }, 2e3)
        }), e.onMounted(() => {}), (a, t) => e.e({
          a: e.p({
            color: e.unref(n) > 50 ? "#000" : "#fff",
            bgColor: e.unref(n) > 50 ? "#fff" : ""
          }),
          b: e.t(j.value.productDesc),
          c: e.t(j.value.tripTime),
          d: G.value.productUrl,
          e: M.value && M.value[0] && "5" !== j.value.tripSta
        }, M.value && M.value[0] && "5" !== j.value.tripSta ? {
          f: e.sr(O, "be6650ff-1", {
            k: "tripNavRef"
          }),
          g: e.o(e => {
            k.value = !0
          }),
          h: e.p({
            page: "detail",
            dayEndDiff: j.value.dayEndDiff,
            dayDiff: j.value.dayDiff,
            orderNo: G.value.orderNo,
            teamOrder: j.value,
            unitCode: T.value,
            itineraryCode: N.value,
            teamNo: M.value[0].teamNo,
            typeNumber: b.value.toString()
          })
        } : {}, {
          i: 1 !== b.value
        }, (b.value, {}), {
          j: !k.value
        }, k.value ? e.e({
          k: h.value.length > 0
        }, h.value.length > 0 ? {
          l: e.o(e => B())
        } : {}, {
          m: h.value.length > 0
        }, h.value.length > 0 ? {
          n: e.w(({
            item: a
          }, t, o) => ({
            a: a.extraLogo + "?imageView2/1/w/214/h/160&x-oss-process=image/resize,m_fill,w_214,h_160",
            b: e.t(a.arrDateF),
            c: e.t(a.depDateF),
            d: e.t(a.hotelDesc),
            e: e.t(a.rmtypeDesc),
            f: e.o(t => {
              return o = a.phone, void e.index.makePhoneCall({
                phoneNumber: o
              });
              var o
            }),
            g: e.o(t => {
              return o = a, console.log(229222, o), void e.index.navigateTo({
                url: `/pagesD/trip/hotelInfo?hotelCode=${o.hotelCode}&arrDate=${o.arrDateF}&depDate=${o.depDateF}&rmtype=${o.rmtype}&rmtypeDesc=${o.rmtypeDesc}&type=1`
              });
              var o
            }),
            h: o,
            i: t
          }), {
            name: "item",
            path: "n",
            vueId: "be6650ff-2"
          }),
          o: e.p({
            slides: h.value,
            swiperConfig: S
          })
        } : {}, {
          p: M.value.length > 0
        }, M.value.length > 0 ? {
          q: _.value.id ? "" : 1,
          r: e.o(e => P({})),
          s: e.f(M.value, (a, t, o) => e.e({
            a: e.t(a.bizDateF),
            b: 0 === t
          }, {}, {
            c: e.t(a.destinationDesc),
            d: 0 !== t && t === M.value.length - 1
          }, (0 !== t && M.value.length, {}), {
            e: t,
            f: _.value.id === a.id ? 1 : "",
            g: e.o(e => P(a), t)
          }))
        } : {}, {
          t: d.value.length <= 0 && "O" !== j.value.orderSta
        }, d.value.length <= 0 && "O" !== j.value.orderSta ? {
          v: e.o(e => $())
        } : {
          w: e.f(d.value, (a, t, o) => e.e({
            a: "F" !== a.isShuttle
          }, "F" !== a.isShuttle ? e.e({
            b: d.value.length > 1
          }, d.value.length > 1 ? {
            c: e.t(t + 1)
          } : {}, {
            d: a.carNo
          }, a.carNo ? e.e({
            e: e.t(a.carNo),
            f: a.carModelDesc
          }, a.carModelDesc ? {
            g: e.t(a.carModelDesc)
          } : {}, {
            h: e.t(a.beginDateF),
            i: e.t(a.startTime),
            j: a.station
          }, a.station ? {
            k: e.t(a.station)
          } : {}) : {}, {
            l: e.f(a.guests, (a, t, o) => ({
              a: e.t(a.name),
              b: t
            })),
            m: e.t(a.trafficTypeDesc),
            n: e.t(a.trips)
          }) : {}, {
            o: t
          }))
        }, {
          x: d.value.length > 0 && "O" !== j.value.orderSta
        }, (d.value.length > 0 && j.value.orderSta, {}), {
          y: !_.value.id
        }, _.value.id ? {
          A: e.f(_.value.actives, (a, t, o) => ({
            a: e.f(A, (t, o, r) => e.e({
              a: t.name === a.activityTimeDesc
            }, t.name === a.activityTimeDesc ? {
              b: e.n("iconfont " + t.icon),
              c: e.t(a.activityTimeDesc)
            } : {}, {
              d: o
            })),
            b: e.t(a.activeName),
            c: e.t(a.startTime),
            d: a.productUrl,
            e: e.o(e => q(a), t),
            f: t
          }))
        } : {
          z: e.f(M.value, (a, t, o) => e.e({
            a: e.t(a.moon),
            b: e.t(a.days),
            c: 0 === t
          }, 0 === t ? {} : M.value[t - 1] && M.value[t - 1].destinationDesc && M.value[t - 1].destinationDesc !== a.destinationDesc ? {
            e: e.t(M.value[t - 1].destinationDesc)
          } : {}, {
            d: M.value[t - 1] && M.value[t - 1].destinationDesc && M.value[t - 1].destinationDesc !== a.destinationDesc,
            f: e.t(a.destinationDesc),
            g: 0 !== t && t === M.value.length - 1
          }, (0 !== t && M.value.length, {}), {
            h: a.teamRsvSrcs && a.teamRsvSrcs.length > 0
          }, a.teamRsvSrcs && a.teamRsvSrcs.length > 0 ? {
            i: e.t(a.teamRsvSrcs[0].hotelDesc)
          } : {}, {
            j: e.t(a.activesTl),
            k: t,
            l: e.o(e => P(a), t)
          }))
        }, {
          B: f.value.length <= 0 && "O" !== j.value.orderSta
        }, f.value.length <= 0 && "O" !== j.value.orderSta ? {
          C: e.o(e => $())
        } : {
          D: e.f(f.value, (a, t, o) => e.e({
            a: "F" !== a.isShuttle
          }, "F" !== a.isShuttle ? e.e({
            b: f.value.length > 1
          }, f.value.length > 1 ? {
            c: e.t(t + 1)
          } : {}, {
            d: a.carNo
          }, a.carNo ? e.e({
            e: e.t(a.carNo),
            f: a.carModelDesc
          }, a.carModelDesc ? {
            g: e.t(a.carModelDesc)
          } : {}, {
            h: e.t(a.beginDateF),
            i: e.t(a.startTime),
            j: a.station
          }, a.station ? {
            k: e.t(a.station)
          } : {}) : {}, {
            l: e.f(a.guests, (a, t, o) => ({
              a: e.t(a.name),
              b: t
            })),
            m: e.t(a.trafficTypeDesc),
            n: e.t(a.trips)
          }) : {}, {
            o: t
          }))
        }, {
          E: x.value.length > 0
        }, x.value.length > 0 ? {
          F: e.o(e => (u.setStorage("teamInfo", {
            guestId: V.value.id,
            guestName: V.value.name,
            teamNo: j.value.teamNo,
            teamName: j.value.teamName,
            teamBeginTime: j.value.beginDate,
            teamEndTime: j.value.endDate
          }), void l.goPage(`/pagesD/trip/album?guestId=${V.value.id}&teamNo=${j.value.teamNo}`))),
          G: e.f(x.value, (a, t, o) => ({
            a: t,
            b: a.photoUrl + "?imageView2/1/w/332/h/248&x-oss-process=image/resize,m_fill,w_332,h_248",
            c: e.o(t => {
              return o = a.photoUrl, r = x.value, y.value = [], r.forEach(e => {
                y.value.push(e.photoUrl)
              }), void e.nextTick$1(() => {
                D.value.open(o)
              });
              var o, r
            }, t)
          }))
        } : {}) : {}, {
          H: e.t(p.value.activeName),
          I: p.value.activeDesc
        }, p.value.activeDesc ? {
          J: e.p({
            content: p.value.activeDesc
          })
        } : {}, {
          K: e.f(p.value.photos, (e, a, t) => ({
            a: e.photoUrl,
            b: a
          })),
          L: e.sr(g, "be6650ff-3", {
            k: "album"
          }),
          M: e.p({
            maxDialog: !0,
            titleBorder: !0
          }),
          N: e.sr(D, "be6650ff-5", {
            k: "previewImageBox"
          }),
          O: e.p({
            urls: y.value
          })
        })
      }
    });
  f.__runtimeHooks = 1;
  const m = e._export_sfc(f, [
    ["__scopeId", "data-v-be6650ff"]
  ]);
  wx.createPage(m)
}();