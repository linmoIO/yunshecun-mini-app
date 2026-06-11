! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../utils/utils.js"),
    o = require("../utils/wxuser.js"),
    a = require("../utils/api.js"),
    r = require("../base/jAlert/jAlert.js");
  let i = o.getStorage("user"),
    l = o.getStorage("config");
  const n = e.defineComponent({
    name: "travelItem",
    components: {
      bottomDialog: () => "./bottomDialog.js",
      kfDialog: () => "./kfDialog.js"
    },
    props: {
      teamNo: {
        type: String,
        default: ""
      },
      dayDiff: {
        type: Number,
        default: 0
      },
      productCode: {
        type: String,
        default: ""
      },
      typeNumber: {
        type: String,
        default: ""
      },
      unitCode: {
        type: String,
        default: ""
      },
      itineraryCode: {
        type: String,
        default: ""
      },
      teamOrder: {
        type: Object,
        default: {}
      },
      page: {
        type: String,
        default: ""
      },
      dayEndDiff: {
        type: Number,
        default: 0
      },
      type: {
        type: String,
        default: ""
      },
      hotelCode: {
        type: String,
        default: "0"
      }
    },
    setup(n, s) {
      const u = e.ref({}),
        c = e.ref([]),
        d = e.ref({}),
        m = e.ref(!1),
        p = e.ref({}),
        f = e.ref(),
        h = e.ref(),
        g = e.ref(),
        v = e.ref(),
        y = e.ref([]),
        D = e.ref({}),
        I = e.ref({}),
        C = e.ref(""),
        T = e.ref(""),
        b = e.ref(""),
        N = e.ref([12]),
        E = e.ref([]),
        _ = e.ref(),
        $ = e.ref("WECHAT"),
        x = e.ref(e.dayjs().format("YYYY-MM-DD")),
        B = e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD")),
        V = e.ref(""),
        G = e.ref({}),
        P = e.ref(""),
        S = e.ref(""),
        O = e.ref(!1),
        M = e.ref(""),
        A = e.ref({
          app: "实用app",
          bookMovie: "书籍与电影推荐",
          fightInfo: "推荐航班信息",
          kindReminder: "温馨提示"
        }),
        w = () => {
          S.value && a.api.interfaceTransfer({
            query: {
              orderNo: S.value,
              unitCode: l.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/shuttle/listByOrderNo",
              interfaceFrom: "GC",
              hotelGroupCode: l.hotelGroupCode
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result ? e.retVal.retVal.length <= 0 ? c.value.forEach(e => {
              "shuttle" == e.type && (e.drop = !0)
            }) : c.value.forEach(e => {
              "shuttle" == e.type && (e.drop = !1)
            }) : r.jAlert3(e.retVal.msg || e.msg)
          })
        },
        k = e => {
          a.api.listGuestLinkExtraInfoWithMemberIdOrOpenId({
            channel: "WECHAT",
            hotelGroupCode: l.hotelGroupCode,
            hotelCode: l.hotelCode,
            memberId: i.memberId,
            openIdType: "WECHAT"
          }).then(t => {
            1 == t.result && 0 == t.retVal.result && (t.retVal.retVal.forEach(e => {
              e.guestLinkRelationExtraSimpleDtoList.forEach(t => {
                "EXTRA_IDCODE" == t.type && (e.idCode = t.value), "EXTRA_IDNO" == t.type && (e.idNo = t.value), "CAMP_SEX" == t.type && (e.sex = t.value), "EXTRA_EMAIL" == t.type && (e.email = t.value), "EXTRA_MOBILE" == t.type && (e.mobile = t.value), "EXTRA_NAME" == t.type && (e.name = t.value), "EXTRA_BIRTH" == t.type && (e.birth = t.value)
              }), i.mobile == e.mobile && (p.value.guestId = e.guestId)
            }), e && e())
          })
        },
        L = t => {
          m.value || (m.value = !0, a.api.interfaceTransfer({
            query: {
              mobile: i.mobile,
              unitCode: l.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/team/order/detail/" + n.teamNo,
              interfaceFrom: "GC",
              hotelGroupCode: l.hotelGroupCode
            }
          }).then(o => {
            if (m.value = !1, 1 == o.result && 0 == o.retVal.result) {
              let a = o.retVal.retVal,
                r = {};
              const l = a.reserveOrders.filter(e => e.mobile === i.mobile),
                u = a.guests.map(e => e.orderNo),
                c = a.guests.find(e => e.mobile === i.mobile);
              if (r = l.length ? n.orderNo ? l.find(e => e.orderNo === n.orderNo) : l[0] : (null == c ? void 0 : c.orderNo) ? a.reserveOrders.find(e => e.orderNo == c.orderNo) : l[0], S.value = r.orderNo, V.value = r.memberId, O.value = u.includes(r.orderNo), s.emit("getOrderNo", S.value), a.teamItineraryInfos && a.teamItineraryInfos.length > 0) {
                let t = "";
                a.teamItineraryInfos[0].teamItineraries.forEach(o => {
                  e.dayjs(o.bizDate).format("MM-DD") == e.dayjs().format("MM-DD") && o.actives && o.actives.length > 0 && o.actives.forEach(e => {
                    t ? t += " - " + e.activeName : t = e.activeName
                  })
                }), s.emit("getActives", t)
              }
              p.value.idNo && q("travel"), G.value = o.retVal.retVal.teamOrder, o.retVal.retVal.reserveBeforeInfo && (I.value = o.retVal.retVal.reserveBeforeInfo), I.value.weathersDtos = o.retVal.retVal.weathersDtos, I.value.beforeInfoHotelsDtos = o.retVal.retVal.beforeInfoHotelsDtos, t && t()
            } else r.jAlert3(o.retVal.msg || o.msg)
          }))
        },
        R = t => {
          t ? e.index.makePhoneCall({
            phoneNumber: t
          }) : r.jAlert3("暂无手机号")
        },
        j = e => {
          m.value || (m.value = !0, a.api.interfaceTransfer({
            query: {
              teamNo: n.teamNo,
              unitCode: l.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/team/order/listDriverButlerDto",
              interfaceFrom: "GC",
              hotelGroupCode: l.hotelGroupCode
            }
          }).then(t => {
            if (m.value = !1, 1 == t.result && 0 == t.retVal.result) {
              y.value = t.retVal.retVal;
              let o = {},
                a = {};
              y.value.forEach(e => {
                "GW" == e.personType && (o = e), "T" == e.isPartButler && (a = e), "GW" == e.personType && "T" == e.isHostHousekeep && (D.value = e)
              }), D.value.code || (o.code ? D.value = o : D.value = a), e && e()
            } else r.jAlert3(t.retVal.msg || t.msg)
          }))
        },
        H = () => {
          _.value.hideDialog(), v.value.showDialog()
        },
        q = e => {
          a.api.interfaceTransfer({
            query: {
              unitCode: l.hotelGroupCode,
              teamNo: n.teamNo,
              idNo: p.value.idNo
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/team/order/findHotelMasterInfoByTeamNo",
              interfaceFrom: "GC",
              hotelGroupCode: l.hotelGroupCode
            }
          }).then(t => {
            1 == t.result && 0 == t.retVal.result && t.retVal.retVal.length > 0 && (d.value = t.retVal.retVal[0], s.emit("getMasterInfo", t.retVal.retVal[0]), "hotel" == e && F(t.retVal.retVal[0].hotelCode))
          })
        },
        F = e => {
          a.api.listHotelServiceBySta({
            hotelGroupCode: l.hotelGroupCode,
            hotelCode: e,
            sta: "N"
          }).then(e => {
            e.retVal.forEach(e => {
              e.type = "hotelService", e.name = e.serviceName
            }), c.value = [...c.value, ...e.retVal], c.value.length > 8 && (c.value = c.value.slice(0, 7), c.value.push({
              name: "全部服务",
              icon: "icon-a-20_quanbufuwu_hei",
              type: "all"
            })), console.log("iconList==", c.value)
          })
        },
        W = o => {
          var r = {
            hotelCode: l.hotelCode,
            hotelGroupCode: l.hotelGroupCode,
            checkPointLongitude: o.longitude,
            checkPointLatitude: o.latitude,
            anoCheckPointLongitude: u.value.hotelLongitude,
            anoCheckPointLatitude: u.value.hotelLatitude,
            circleRadius: 2e3
          };
          a.api.checkPointCustomize(r).then(o => {
            1 == o.result ? t.goPage(`/pagesD/mobileCheckIn/checkIn?hotelCode=${l.hotelCode}&mobile=${i.mobile}&teamNo=${n.teamNo}`) : e.index.showModal({
              title: "无法办理",
              content: "需在酒店2公里内才可办理入住",
              showCancel: !1,
              confirmText: "我知道了",
              confirmColor: "#000000"
            })
          })
        },
        z = () => {
          var t = [];
          for (let e = 0; e < 25; e++) {
            var o = 0 + e;
            o < 10 && (o = "0" + o), t.push(`${b.value} ${o}:00`)
          }
          for (let o = 0; o < t.length; o++) e.dayjs(t[o]).isBefore(e.dayjs()), t[o] = {
            canTap: !1,
            time: t[o],
            isTap: !1,
            displayTime: t[o].split(" ")[1],
            chooseTime: t[o].split(" ")[1]
          };
          E.value = t
        },
        Y = e => {
          let t = {
            hotelCode: l.hotelCode,
            hotelGroupCode: l.hotelGroupCode,
            firstResult: 0,
            pageSize: 100,
            channel: "WECHAT",
            memberId: p.value.guestId,
            isGuest: "T"
          };
          a.api.interfaceTransfer({
            config: {
              interfaceFrom: "member",
              interfaceMethod: "/crm/v2/queryMemberTag",
              hotelGroupCode: l.hotelGroupCode,
              interfaceType: "POST"
            },
            query: t
          }).then(t => {
            1 == t.result && 0 == t.retVal.result && (0 == t.retVal.retVal.totalRows ? e.drop = !0 : e.drop = !1)
          })
        },
        K = () => {
          i = o.getStorage("user"), c.value = [], u.value = o.getStorage("currentHotel"), "SingleRoom" == n.teamOrder.orderType ? ("W" == n.teamOrder.orderSta && (c.value = [{
            name: "出行偏好",
            icon: "icon-a-20_chuhangpianhao",
            type: "preference"
          }, {
            name: "到店时间",
            icon: "icon-a-20_daodianshijian",
            type: "arrTime"
          }, {
            name: "松赞相册",
            icon: "icon-a-20_lvhangxiangce_hei",
            type: "hotelAlbum"
          }, {
            name: "联系酒店",
            icon: "icon-a-20_dianhua",
            type: "contact"
          }]), "I" == n.teamOrder.orderSta && (c.value = [{
            name: "出行偏好",
            icon: "icon-a-20_chuhangpianhao",
            type: "preference"
          }, {
            name: "离店时间",
            icon: "icon-a-20_lidianshijian",
            type: "departureTime"
          }, {
            name: "松赞相册",
            icon: "icon-a-20_lvhangxiangce_hei",
            type: "hotelAlbum"
          }, {
            name: "联系酒店",
            icon: "icon-a-20_dianhua",
            type: "contact"
          }, {
            name: "续住",
            icon: "icon-a-20_xuzhu",
            type: "extend"
          }], n.teamOrder.guestList && (n.teamOrder.guestList.forEach(e => {
            e.mobile == i.mobile && (p.value = e)
          }), p.value.idNo && q("hotel"))), "O" == n.teamOrder.orderSta && (c.value = [{
            name: "松赞相册",
            icon: "icon-a-20_lvhangxiangce_hei",
            type: "hotelAlbum"
          }, {
            name: "联系酒店",
            icon: "icon-a-20_dianhua",
            type: "contact"
          }]), c.value.forEach((e, t) => {
            "preference" == e.type && k(() => {
              Y(e)
            })
          })) : L(() => {
            var e, t;
            s.emit("finish"), c.value = [{
              name: "出行提示",
              icon: "icon-a-20_linhangxinxi",
              type: "tips"
            }, {
              name: "出行偏好",
              icon: "icon-a-20_chuhangpianhao",
              type: "preference"
            }, {
              name: "行程详情",
              icon: "icon-a-20_hangchengxiangqing1",
              type: "trip"
            }, {
              name: "松赞相册",
              icon: "icon-a-20_lvhangxiangce_hei",
              type: "album"
            }, {
              name: "行程顾问",
              icon: "icon-a-20_hangchengbangzhu1",
              type: "help"
            }, {
              name: "服务团队",
              icon: "icon-a-20_tuanduijianli1",
              type: "team"
            }, {
              name: "全部服务",
              icon: "icon-a-20_quanbufuwu_hei",
              type: "all"
            }], "DestPackage" !== n.teamOrder.orderType && (null == (e = c.value) || e.splice(1, 0, {
              name: "接送需求",
              icon: "icon-a-20_jiesonganpai1",
              type: "shuttle"
            }));
            let o = !0;
            "I" != n.teamOrder.orderSta && (n.dayDiff <= -2 ? (c.value = [{
              name: "出行提示",
              icon: "icon-a-20_linhangxinxi",
              type: "tips"
            }, {
              name: "出行偏好",
              icon: "icon-a-20_chuhangpianhao",
              type: "preference"
            }, {
              name: "行程详情",
              icon: "icon-a-20_hangchengxiangqing1",
              type: "trip"
            }, {
              name: "松赞相册",
              icon: "icon-a-20_lvhangxiangce_hei",
              type: "album"
            }], "DestPackage" !== n.teamOrder.orderType && (null == (t = c.value) || t.splice(1, 0, {
              name: "接送需求",
              icon: "icon-a-20_jiesonganpai1",
              type: "shuttle"
            }))) : n.dayEndDiff < 0 && (c.value = [{
              name: "松赞相册",
              icon: "icon-a-20_lvhangxiangce_hei",
              type: "album"
            }, {
              name: "联系顾问",
              icon: "icon-a-20_dianhua",
              type: "help"
            }], o = !1)), c.value.forEach((e, t) => {
              "trip" == e.type && "detail" == n.page && c.value.splice(t, 1), "preference" == e.type && Y(e)
            }), o && w()
          })
        };
      return e.onMounted(() => {
        K(), M.value = n.typeNumber
      }), {
        goModulePage: a => {
          if (n.page, "tips" == a.type && (I.value.id ? t.goPage(`/pagesTravelAssistant/travel/index?teamNo=${n.teamNo}&itineraryCode=${n.itineraryCode}&unitCode=${n.unitCode}`) : L(() => {
              t.goPage(`/pagesTravelAssistant/travel/index?teamNo=${n.teamNo}&itineraryCode=${n.itineraryCode}&unitCode=${n.unitCode}`)
            })), "shuttle" == a.type) {
            if (!O.value) return void e.index.showToast({
              title: "该订单未添加出行人，请添加出行人后再试",
              icon: "none",
              duration: 4e3
            });
            t.goPage(`/pagesD/trip/takeInfo?orderNo=${S.value}&memberNo=${V.value}`)
          }
          "preference" == a.type && t.goPage(`/pagesA/member/travelPreference?type=guest&guestId=${p.value.guestId}&orderNo=${S.value}&orderType=${n.teamOrder.orderType}`), "trip" == a.type && t.goPage("/pagesD/trip/tripDetail?teamNo=" + n.teamNo), "extend" == a.type && t.goPage(`/pagesC/order/hotel?hotelCode=${n.hotelCode}&fromDate${x.value}&toDate=${B.value}&otaChannel=${$.value}`), "contact" == a.type && H(), "album" == a.type && (o.setStorage("teamInfo", {
            guestId: p.value.id,
            guestName: p.value.name,
            teamNo: G.value.teamNo,
            teamName: G.value.teamName,
            teamBeginTime: G.value.beginDate,
            teamEndTime: G.value.endDate
          }), p.value.id ? t.goPage("/pagesD/trip/album?teamNo=" + n.teamNo + "&guestId=" + p.value.id) : L(() => {
            t.goPage("/pagesD/trip/album?teamNo=" + n.teamNo + "&guestId=" + p.value.id)
          })), "hotelAlbum" == a.type && t.goPage("/pagesD/trip/hotelAlbumDetail?name=" + n.teamOrder.productDesc), "all" == a.type && ("SingleRoom" == n.teamOrder.orderType ? t.goPage(`/pagesD/trip/allServices?teamNo=${n.teamNo}&orderType=SingleRoom`) : "DestPackage" == n.teamOrder.orderType ? t.goPage(`/pagesD/trip/allServices?teamNo=${n.teamNo}&orderType=DestPackage`) : t.goPage(`/pagesD/trip/allServices?teamNo=${n.teamNo}&guestId=${p.value.id}`)), "help" == a.type && (0 == y.value.length ? j(() => {
            R(D.value.mobile)
          }) : R(D.value.mobile)), "team" == a.type && (0 == y.value.length ? j(() => {
            h.value.showDialog()
          }) : h.value.showDialog()), "arrTime" == a.type && (N.value = [], N.value.push(Number(e.dayjs(n.teamOrder.arrivalFrom).format("H"))), console.log(N.value), P.value = "预计到店时间", z(), _.value.showDialog()), "departureTime" == a.type && (N.value = [12], P.value = "预计离店时间", z(), _.value.showDialog()), "checkIn" == a.type && e.index.getSetting({
            success(t) {
              console.log(t), t.authSetting["scope.userLocation"] ? e.index.getLocation({
                type: "wgs84",
                success: function(e) {
                  W(e)
                },
                fail(t) {
                  e.index.showToast({
                    title: "请勿频繁调用！",
                    icon: "none"
                  }), console.log("失败", t)
                }
              }) : e.index.authorize({
                scope: "scope.userLocation",
                success() {
                  e.index.getLocation({
                    type: "wgs84",
                    success: function(e) {
                      W(e)
                    },
                    fail(e) {
                      console.log("失败", e)
                    }
                  })
                },
                fail(t) {
                  console.log("拒绝授权", t), e.index.showModal({
                    title: "提示",
                    content: "若点击不授权，将无法使用位置功能",
                    cancelText: "不授权",
                    cancelColor: "#999",
                    confirmText: "授权",
                    confirmColor: "#f94218",
                    success(t) {
                      console.log(t), t.confirm ? e.index.openSetting({
                        success(e) {
                          console.log(e.authSetting)
                        }
                      }) : t.cancel && console.log("用户点击不授权")
                    }
                  })
                }
              })
            }
          }), "hotelService" == a.type && (-1 != a.link.indexOf("?") ? t.goPage(`${a.link}&masterId=${d.value.masterId}&areaCode=${d.value.rmno}&name=${d.value.name}&serviceName=${a.serviceName}&serviceItemCode=${a.serviceItemCode}&pmsId=${d.value.pmsId}&floor=${d.value.floor}&floorDesc=${d.value.floorDesc}&building=${d.value.building}&hotelCode=${d.value.hotelCode}&hotelDesc=${n.teamOrder.productDesc}`) : t.goPage(`${a.link}?masterId=${d.value.masterId}&areaCode=${d.value.rmno}&name=${d.value.name}&serviceName=${a.serviceName}&serviceItemCode=${a.serviceItemCode}&pmsId=${d.value.pmsId}&floor=${d.value.floor}&floorDesc=${d.value.floorDesc}&building=${d.value.building}&hotelCode=${d.value.hotelCode}&hotelDesc=${n.teamOrder.productDesc}`))
        },
        hotelMsg: u,
        tipsHelp: g,
        serviceTeam: h,
        iconList: c,
        tripInfo: f,
        reserveBeforeInfo: I,
        getTeamDetail: L,
        guest: p,
        listDriverButlerDto: j,
        listDriverButler: y,
        makePhoneCall: R,
        consultant: D,
        toDriverButler: e => {
          "GW" != e.personType && t.goPage("/pagesD/trip/houseKeep?code=" + e.code)
        },
        kf: v,
        timeSelect: _,
        createArriveTime: z,
        chooseTimeIndex: N,
        timeList: E,
        arrivalFrom: C,
        arriveTime: T,
        fromDate: b,
        otaChannel: $,
        hotelFromDate: x,
        hotelToDate: B,
        dateFormat: t => e.dayjs(t).format("MM-DD"),
        teamOrder: G,
        arrTitle: P,
        showKf: H,
        itemNames: A,
        orderNo: S,
        listByOrderNo: w,
        queryMasterInfo: q,
        querySaveTag: Y,
        initData: K,
        updateData: () => {
          "SingleRoom" == n.teamOrder.orderType ? c.value.forEach((e, t) => {
            "preference" == e.type && k(() => {
              Y(e)
            })
          }) : c.value.forEach((e, t) => {
            "preference" == e.type && Y(e), "shuttle" == e.type && w()
          })
        },
        masterInfo: d
      }
    }
  });
  Array || (e.resolveComponent("bottom-dialog") + e.resolveComponent("kf-dialog"))();
  const s = e._export_sfc(n, [
    ["render", function(t, o, a, r, i, l) {
      return e.e({
        a: 1 == t.typeNumber
      }, 1 == t.typeNumber ? e.e({
        b: t.iconList.length > 0
      }, t.iconList.length > 0 ? {
        c: e.f(t.iconList, (o, a, r) => e.e({
          a: o.icon
        }, o.icon ? e.e({
          b: o.drop
        }, (o.drop, {}), {
          c: e.n("iconfont " + o.icon)
        }) : {
          d: o.logo
        }, {
          e: e.t(o.name),
          f: a,
          g: e.o(e => t.goModulePage(o), a)
        })),
        d: t.iconList.length < 4 ? 1 : ""
      } : {}) : {}, {
        e: e.t(t.consultant.name),
        f: e.o(e => t.makePhoneCall(t.consultant.mobile)),
        g: e.sr("tipsHelp", "795ed0c5-0"),
        h: e.p({
          title: "行程顾问"
        }),
        i: e.t(t.guest.name),
        j: 1 == t.guest.sex
      }, (t.guest.sex, {}), {
        k: e.f(t.reserveBeforeInfo.reserveBeforePersonalizes, (o, a, r) => e.e({
          a: o.teamGuestId == t.guest.id && o.description
        }, o.teamGuestId == t.guest.id && o.description ? {
          b: e.t(t.itemNames[o.itemName]),
          c: e.t(o.description)
        } : {}, {
          d: a
        })),
        l: t.reserveBeforeInfo.weathersDtos && t.reserveBeforeInfo.weathersDtos.length > 0
      }, t.reserveBeforeInfo.weathersDtos && t.reserveBeforeInfo.weathersDtos.length > 0 ? {
        m: e.f(t.reserveBeforeInfo.weathersDtos[0].weathersDtos, (t, o, a) => e.e({
          a: t.hotelDesc
        }, t.hotelDesc ? e.e({
          b: t.hotelDesc
        }, t.hotelDesc ? {
          c: e.t(t.hotelDesc)
        } : {}, {
          d: t.weatherFcEntity
        }, t.weatherFcEntity ? {
          e: e.t(t.weatherFcEntity.low),
          f: e.t(t.weatherFcEntity.high)
        } : {}, {
          g: t.altitude
        }, t.altitude ? {
          h: e.t(t.altitude)
        } : {}) : {}, {
          i: o
        }))
      } : {}, {
        n: t.reserveBeforeInfo.dressing
      }, t.reserveBeforeInfo.dressing ? {
        o: e.t(t.reserveBeforeInfo.dressing)
      } : {}, {
        p: t.reserveBeforeInfo.health
      }, t.reserveBeforeInfo.health ? {
        q: e.t(t.reserveBeforeInfo.health)
      } : {}, {
        r: t.reserveBeforeInfo.taboo
      }, t.reserveBeforeInfo.taboo ? {
        s: e.t(t.reserveBeforeInfo.taboo)
      } : {}, {
        t: t.reserveBeforeInfo.carInfo
      }, t.reserveBeforeInfo.carInfo ? {
        v: e.t(t.reserveBeforeInfo.carInfo)
      } : {}, {
        w: t.reserveBeforeInfo.roomDiningDesc
      }, t.reserveBeforeInfo.roomDiningDesc ? {
        x: e.t(t.reserveBeforeInfo.roomDiningDesc)
      } : {}, {
        y: t.reserveBeforeInfo.beforeInfoHotelsDtos && t.reserveBeforeInfo.beforeInfoHotelsDtos.length > 0
      }, t.reserveBeforeInfo.beforeInfoHotelsDtos && t.reserveBeforeInfo.beforeInfoHotelsDtos.length > 0 ? {
        z: e.f(t.reserveBeforeInfo.beforeInfoHotelsDtos, (t, o, a) => e.e({
          a: t.nearestHospital
        }, t.nearestHospital ? {
          b: e.t(t.hotelDesc),
          c: e.t(t.nearestHospital)
        } : {}, {
          d: o
        }))
      } : {}, {
        A: e.sr("tripInfo", "795ed0c5-1"),
        B: e.p({
          title: "",
          maxDialog: !0
        }),
        C: e.f(t.listDriverButler, (o, a, r) => e.e({
          a: o.mainPic
        }, o.mainPic ? {
          b: o.mainPic
        } : {}, {
          c: "HOUSEKEEP" == o.personType
        }, ("HOUSEKEEP" == o.personType || "DRIVER" == o.personType || o.personType, {}), {
          d: "DRIVER" == o.personType,
          e: "GW" == o.personType,
          f: e.t(o.name),
          g: "GW" != o.personType
        }, (o.personType, {}), {
          h: o.mobile
        }, o.mobile ? {
          i: e.o(e => t.makePhoneCall(o.mobile), a)
        } : {}, {
          j: e.t(o.biographicalNotes),
          k: a,
          l: e.o(e => t.toDriverButler(o), a)
        })),
        D: e.sr("serviceTeam", "795ed0c5-2"),
        E: e.p({
          title: "服务团队",
          maxDialog: !0
        }),
        F: "预计到店时间" == t.arrTitle
      }, "预计到店时间" == t.arrTitle ? {
        G: e.o(e => t.showKf())
      } : {
        H: e.o(e => t.showKf())
      }, {
        I: t.timeList[t.chooseTimeIndex]
      }, t.timeList[t.chooseTimeIndex] ? {
        J: e.t(t.timeList[t.chooseTimeIndex].displayTime)
      } : {}, {
        K: e.sr("timeSelect", "795ed0c5-3"),
        L: e.p({
          title: t.arrTitle
        }),
        M: e.sr("kf", "795ed0c5-4"),
        N: e.p({
          title: "一键咨询"
        })
      })
    }],
    ["__scopeId", "data-v-795ed0c5"]
  ]);
  wx.createComponent(s)
}();