! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/utils.js"),
    t = require("../../utils/wxuser.js"),
    o = require("../../utils/api.js"),
    l = require("../../base/jAlert/jAlert.js"),
    r = require("../../hooks/useScroll.js");
  Math || (s + i + n + u)();
  const i = () => "../../components/bottomDialog.js",
    u = () => "../../components/centerDialog.js",
    n = () => "../../components/kfDialog.js",
    s = () => "../../components/coustomHead.js",
    d = e.defineComponent({
      __name: "allServices",
      setup(i) {
        r.useScroll();
        let u = e.ref(40),
          n = t.getStorage("user"),
          s = t.getStorage("config");
        const d = e.ref([{
            name: "松赞相册",
            icon: "icon-a-20_lvhangxiangce_hei",
            type: "album"
          }, {
            name: "行程问卷",
            icon: "icon-a-20_hangchengwenjuan1",
            type: "questionnaire"
          }]),
          c = e.ref([{
            name: "出行提示",
            icon: "icon-a-20_linhangxinxi",
            type: "tips"
          }, {
            name: "出行偏好",
            icon: "icon-a-20_chuhangpianhao",
            type: "preference"
          }, {
            name: "行程顾问",
            icon: "icon-a-20_hangchengbangzhu1",
            type: "help"
          }, {
            name: "行李吊牌",
            icon: "icon-a-20_hanglipai",
            type: "baggage"
          }, {
            name: "服务团队",
            icon: "icon-a-20_tuanduijianli1",
            type: "team"
          }]),
          v = e.ref([{
            name: "移动入住",
            icon: "icon-a-20_yidongruzhu",
            type: "checkIn"
          }]),
          p = e.ref(),
          h = e.ref({}),
          m = e.ref(""),
          f = e.ref(""),
          g = e.ref(!1),
          y = e.ref({}),
          D = e.ref(),
          C = e.ref(),
          T = e.ref(),
          b = e.ref(),
          I = e.ref([]),
          V = e.ref({}),
          E = e.ref({}),
          G = e.ref(""),
          N = e.ref(""),
          S = e.ref(""),
          $ = e.ref([0]),
          R = e.ref([]),
          j = e.ref(),
          M = e.ref("WECHAT"),
          _ = e.ref(e.dayjs().format("YYYY-MM-DD")),
          L = e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD")),
          x = e.ref(""),
          A = e.ref(""),
          P = e.ref({}),
          k = e.ref(!0),
          w = e.ref({});
        let H = e.ref([]);
        const O = e.ref({}),
          q = e.ref(""),
          Y = e.ref(""),
          F = e.ref(""),
          W = e.ref(""),
          B = e.ref(""),
          z = e.ref(""),
          X = e.ref({
            app: "实用app",
            bookMovie: "书籍与电影推荐",
            fightInfo: "推荐航班信息",
            kindReminder: "温馨提示"
          });
        e.watch(() => k.value, (a, t) => {
          k.value || e.index.hideLoading()
        });
        const K = () => {
            let e = {
              hotelCode: s.hotelCode,
              hotelGroupCode: s.hotelGroupCode,
              firstResult: 0,
              pageSize: 100,
              channel: "WECHAT",
              memberId: y.value.guestId,
              isGuest: "T"
            };
            o.api.interfaceTransfer({
              config: {
                interfaceFrom: "member",
                interfaceMethod: "/crm/v2/queryMemberTag",
                hotelGroupCode: s.hotelGroupCode,
                interfaceType: "POST"
              },
              query: e
            }).then(e => {
              1 == e.result && 0 == e.retVal.result && (0 == e.retVal.retVal.totalRows ? c.value.forEach((e, a) => {
                "preference" == e.type && (e.drop = !0)
              }) : c.value.forEach((e, a) => {
                "preference" == e.type && (e.drop = !1)
              }))
            })
          },
          U = () => {
            o.api.interfaceTransfer({
              query: {
                teamNo: m.value,
                idNo: y.value.idNo,
                arr: e.dayjs().format("YYYY-MM-DD")
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/reserve/order/queryCheckInHotel",
                interfaceFrom: "GC",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(e => {
              1 == e.result && 0 == e.retVal.result && e.retVal.retVal.length > 0 && (Y.value = e.retVal.retVal)
            }).finally((function(e) {
              t.setStorage("checkHotelCode", Y.value), Q()
            }))
          },
          Q = () => {
            var e = {
              fromDate: "",
              toDate: "",
              otaChannel: "WECHAT",
              hotelGroupCodes: s.hotelGroupCode,
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
              appid: s.appid,
              componentAppid: s.componentAppid,
              memberNo: ""
            };
            o.api.findHotel(e).then(e => {
              1 == e.result && (H.value.forEach(a => {
                e.retVal.resultInfos.forEach((e, t) => {
                  a.hotelCode == e.code && (a.extraLogo = e.extraLogo, a.phone = e.phone, a.pictures = e.pictures, a.hotelLatitude = e.hotelLatitude, a.hotelLongitude = e.hotelLongitude)
                })
              }), O.value = H.value.find(e => e.hotelCode == Y.value))
            }).catch((function(e) {
              console.log(e)
            })).finally((function(e) {
              w.value = O.value
            }))
          },
          J = a => {
            a ? e.index.makePhoneCall({
              phoneNumber: a
            }) : l.jAlert3("暂无手机号")
          },
          Z = () => {
            o.api.interfaceTransfer({
              query: {
                unitCode: s.hotelGroupCode,
                teamNo: m.value,
                idNo: y.value.idNo
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/findHotelMasterInfoByTeamNo",
                interfaceFrom: "GC",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(e => {
              1 == e.result && 0 == e.retVal.result && (e.retVal.retVal.length > 0 ? (P.value = e.retVal.retVal[0], ee(P.value.hotelCode)) : k.value = !1)
            })
          },
          ee = e => {
            o.api.listHotelServiceBySta({
              hotelGroupCode: s.hotelGroupCode,
              hotelCode: e,
              sta: "N"
            }).then(e => {
              k.value = !1, e.retVal.forEach(e => {
                e.type = "hotelService", e.name = e.serviceName
              }), v.value = [...e.retVal, ...v.value], v.value.push({
                name: "服务记录",
                icon: "icon-a-20_fuwudan",
                type: "serviceRecord"
              })
            })
          },
          ae = e => {
            g.value || (g.value = !0, o.api.interfaceTransfer({
              query: {
                teamNo: m.value,
                unitCode: s.hotelGroupCode
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/listDriverButlerDto",
                interfaceFrom: "GC",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(a => {
              if (g.value = !1, 1 == a.result && 0 == a.retVal.result) {
                I.value = a.retVal.retVal;
                let t = {},
                  o = {};
                I.value.forEach(e => {
                  "GW" == e.personType && (t = e), "T" == e.isPartButler && (o = e), "GW" == e.personType && "T" == e.isHostHousekeep && (V.value = e)
                }), V.value.code || (t.code ? V.value = t : V.value = o), e && e()
              } else l.jAlert3(a.retVal.msg || a.msg)
            }))
          },
          te = r => {
            "questionnaire" == r.type && a.goPage(q.value), "tips" == r.type && a.goPage(`/pagesTravelAssistant/travel/index?teamNo=${m.value}&itineraryCode=${z.value}&unitCode=${B.value}`), "shuttle" == r.type && a.goPage(`/pagesD/trip/takeInfo?orderNo=${f.value}&memberNo=${x.value}&mobile=${A.value}`), "preference" == r.type && a.goPage(`/pagesA/member/travelPreference?type=guest&guestId=${y.value.guestId}&orderNo=${f.value}&orderType=${W.value}`), "trip" == r.type && a.goPage("/pagesD/trip/tripDetail?teamNo=" + m.value), "baggage" == r.type && a.goPage(`/pagesD/baggage/addBaggage?teamNo=${m.value}&guestId=${y.value.id}&guestName=${y.value.name}&memberGuestId=${y.value.guestId}`), "serviceRecord" == r.type && (y.value.idNo ? o.api.interfaceTransfer({
              query: {
                unitCode: s.hotelGroupCode,
                teamNo: m.value,
                idNo: y.value.idNo
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/findHotelByTeamNo",
                interfaceFrom: "GC",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(t => {
              1 == t.result && 0 == t.retVal.result ? (e.index.setStorageSync("crossHotelList", t.retVal.retVal.map(e => ({
                hotelCode: e.hotelCode,
                masterId: e.masterId
              }))), a.goPage("/pagesG/order/list/index")) : l.jAlert3(t.retVal.msg || t.msg)
            }) : (t.removeStorage("crossHotelList"), a.goPage("/pagesG/order/list/index"))), "hotelService" == r.type && (-1 != r.link.indexOf("?") ? a.goPage(`${r.link}&masterId=${P.value.masterId}&areaCode=${P.value.rmno}&name=${P.value.name}&serviceName=${r.serviceName}&serviceItemCode=${r.serviceItemCode}&pmsId=${P.value.pmsId}&floor=${P.value.floor}&floorDesc=${P.value.floorDesc}&building=${P.value.building}&hotelCode=${P.value.hotelCode}&hotelDesc=${F.value}`) : a.goPage(`${r.link}?masterId=${P.value.masterId}&areaCode=${P.value.rmno}&name=${P.value.name}&serviceName=${r.serviceName}&serviceItemCode=${r.serviceItemCode}&pmsId=${P.value.pmsId}&floor=${P.value.floor}&floorDesc=${P.value.floorDesc}&building=${P.value.building}&hotelCode=${P.value.hotelCode}&hotelDesc=${F.value}`)), "checkIn" == r.type && (w.value ? oe() : l.jAlert3("暂无可办理入住酒店")), "contact" == r.type && b.value.showDialog(), "album" == r.type && (t.setStorage("teamInfo", {
              guestId: y.value.id,
              guestName: y.value.name,
              teamNo: h.value.teamNo,
              teamName: h.value.teamName,
              teamBeginTime: h.value.beginDate,
              teamEndTime: h.value.endDate
            }), a.goPage("/pagesD/trip/album?teamNo=" + m.value + "&guestId=" + y.value.id)), "hotelAlbum" == r.type && a.goPage("/pagesD/trip/hotelAlbumDetail?name=" + h.value.productDesc), "all" == r.type && a.goPage(`/pagesD/trip/allServices?teamNo=${m.value}&guestId=${y.value.id}&orderType=${W.value}`), "help" == r.type && (0 == I.value.length ? ae(() => {
              J(V.value.mobile)
            }) : J(V.value.mobile)), "team" == r.type && (0 == I.value.length ? ae(() => {
              C.value.showDialog()
            }) : C.value.showDialog()), "departureTime" == r.type && (ie(), j.value.showDialog()), "extend" == r.type && a.goPage(`/pagesC/order/hotel?hotelCode=${h.value.hotelCode}&fromDate${_.value}&toDate=${L.value}&otaChannel=${M.value}`), "tripChange" == r.type && a.goPage("/pagesD/trip/tripChange?teamNo=" + m.value)
          },
          oe = () => {
            e.index.getSetting({
              success(a) {
                console.log(a), a.authSetting["scope.userLocation"] ? e.index.getLocation({
                  type: "wgs84",
                  success: function(e) {
                    le(e)
                  },
                  fail(a) {
                    e.index.showToast({
                      title: "请勿频繁调用！",
                      icon: "none"
                    }), console.log("失败", a)
                  }
                }) : e.index.authorize({
                  scope: "scope.userLocation",
                  success() {
                    e.index.getLocation({
                      type: "wgs84",
                      success: function(e) {
                        le(e)
                      },
                      fail(e) {
                        console.log("失败", e)
                      }
                    })
                  },
                  fail(a) {
                    console.log("拒绝授权", a), e.index.showModal({
                      title: "提示",
                      content: "若点击不授权，将无法使用位置功能",
                      cancelText: "不授权",
                      cancelColor: "#999",
                      confirmText: "授权",
                      confirmColor: "#f94218",
                      success(a) {
                        console.log(a), a.confirm ? e.index.openSetting({
                          success(e) {
                            console.log(e.authSetting)
                          }
                        }) : a.cancel && console.log("用户点击不授权")
                      }
                    })
                  }
                })
              }
            })
          },
          le = e => {
            var t = {
              hotelCode: w.value.hotelCode,
              hotelGroupCode: w.value.hotelGroupCode,
              checkPointLongitude: e.longitude,
              checkPointLatitude: e.latitude,
              anoCheckPointLongitude: w.value.hotelLongitude,
              anoCheckPointLatitude: w.value.hotelLatitude,
              circleRadius: 2e3
            };
            o.api.checkPointCustomize(t).then(e => {
              1 == e.result ? a.goPage(`/pagesD/mobileCheckIn/checkIn?hotelCode=${s.hotelCode}&mobile=${n.mobile}&teamNo=${m.value}`) : p.value.showDialog()
            })
          },
          re = () => {
            p.value.hideDialog()
          },
          ie = () => {
            var a = [];
            let t = Number(G.value.split(":")[0]) || 12,
              o = 25 - t;
            for (let e = 0; e < o; e++) {
              var l = t + e;
              l < 10 && (l = "0" + l), a.push(`${S.value} ${l}:00`)
            }
            for (let t = 0; t < a.length; t++) {
              var r = !0;
              e.dayjs(a[t]).isBefore(e.dayjs()) && (r = !1), a[t] = {
                canTap: r,
                time: a[t],
                isTap: !1,
                displayTime: a[t].split(" ")[1],
                chooseTime: a[t].split(" ")[1]
              }
            }
            R.value = a, console.log(R.value), ue()
          },
          ue = () => {
            R.value.forEach((function(e, a) {
              if (N.value) return !1;
              e.canTap && (e.isTap = !0, N.value = e.chooseTime, setTimeout(() => {
                $.value = [a]
              }, 0))
            }))
          },
          ne = () => {
            o.api.interfaceTransfer({
              query: {
                unitCode: s.hotelGroupCode,
                phone: n.mobile,
                teamNo: m.value
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/adjustCustomer/list",
                interfaceFrom: "GC",
                hotelGroupCode: s.hotelGroupCode
              }
            }).then(e => {
              if (1 == e.result && 0 == e.retVal.result && (e.retVal.retVal = e.retVal.retVal.filter(e => "S" !== e.adjustSta && "W" !== e.adjustSta && "M" !== e.adjustSta && "X" !== e.adjustSta), e.retVal.retVal.length > 0)) {
                let a = !1;
                e.retVal.retVal.forEach(e => {
                  "X" != e.adjustSta && ("T" == e.isRsvMan ? "U" == e.adjustSta && e.guestDtos.forEach(e => {
                    "WAIT" == e.confirmSta && e.orderNo == f.value && (a = !0)
                  }) : e.guestDtos.forEach(e => {
                    e.guestPhone == n.mobile && "WAIT" == e.confirmSta && (a = !0)
                  }))
                }), d.value.forEach(e => {
                  "tripChange" == e.type && (e.sureDrop = !!a)
                })
              }
            })
          };
        return e.onLoad(e => {
          e.teamNo && (m.value = e.teamNo), e.orderType && (W.value = e.orderType), e.unitCode && (console.log(0x3f28cb71571c7), B.value = e.unitCode, z.value = e.itineraryCode)
        }), e.onShow(() => {
          y.value.guestId && K(), f.value && ne()
        }), e.onMounted(() => {
          var a, t;
          e.index.showLoading({
            title: "加载中"
          }), e.index.getSystemInfo({
            success: e => {
              u.value = (e.statusBarHeight || 0) + u.value
            },
            fail(e) {
              console.log(e)
            }
          }), o.api.batchQueryShopConfig({
            hotelGroupCode: s.hotelGroupCode,
            hotelCode: s.hotelCode,
            configItem: "questionnaire"
          }).then(e => {
            e.retVal.forEach(e => {
              "questionnaire" == e.configItem && e.itemValue && (q.value = e.itemValue)
            })
          }), "SingleRoom" == W.value ? (c.value = [{
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
          }], v.value = [], t = () => {
            var e;
            h.value.guestList && (h.value.guestList.forEach(e => {
              e.mobile == n.mobile && (y.value = e)
            }), y.value.idNo ? Z() : k.value = !1, e = () => {
              K()
            }, o.api.listGuestLinkExtraInfoWithMemberIdOrOpenId({
              channel: "WECHAT",
              hotelGroupCode: s.hotelGroupCode,
              hotelCode: s.hotelCode,
              memberId: n.memberId,
              openIdType: "WECHAT"
            }).then(a => {
              1 == a.result && 0 == a.retVal.result && (a.retVal.retVal.forEach(e => {
                e.guestLinkRelationExtraSimpleDtoList.forEach(a => {
                  "EXTRA_IDCODE" == a.type && (e.idCode = a.value), "EXTRA_IDNO" == a.type && (e.idNo = a.value), "CAMP_SEX" == a.type && (e.sex = a.value), "EXTRA_EMAIL" == a.type && (e.email = a.value), "EXTRA_MOBILE" == a.type && (e.mobile = a.value), "EXTRA_NAME" == a.type && (e.name = a.value), "EXTRA_BIRTH" == a.type && (e.birth = a.value)
                }), n.mobile == e.mobile && (y.value.guestId = e.guestId)
              }), e && e())
            }))
          }, o.api.showOrder({
            orderNo: m.value,
            hotelGroupCode: s.hotelGroupCode
          }).then(a => {
            1 == a.result ? (h.value.guestList = a.retVal.guestList, h.value.arrivalFrom = a.retVal.arrStr, h.value.hotelCode = a.retVal.hotelCode, ("N" == a.retVal.sta || "R" == a.retVal.sta && 2 == a.retVal.paySta) && (h.value.orderSta = "W", h.value.dayDiff <= -2 ? (h.value.tripSta = "1", h.value.pageTitle = "行前2天以上") : (h.value.tripSta = "2", h.value.pageTitle = "行前2天内")), "I" == a.retVal.sta && (h.value.orderSta = "I", h.value.tripSta = "3", h.value.pageTitle = "行中"), "O" == a.retVal.sta && (h.value.orderSta = "O", h.value.dayEndDiff >= -7 ? (h.value.tripSta = "4", h.value.pageTitle = "行后7天内") : (h.value.tripSta = "5", h.value.pageTitle = "行后7天后")), F.value = a.retVal.hotelDescript, h.value.productDesc = a.retVal.hotelDescript, h.value.tripTime = `${e.dayjs(h.value.beginDate).format("M月DD日")}-${e.dayjs(h.value.endDate).format("M月DD日")}丨共${e.dayjs(h.value.endDate).diff(h.value.beginDate,"day")}晚`, t && t()) : l.jAlert3(a.msg)
          })) : (d.value.push({
            name: "行程变更",
            icon: "icon-a-20_hangchengbiangeng",
            type: "tripChange"
          }), H.value = [], o.api.interfaceTransfer({
            query: {
              mobile: n.mobile,
              unitCode: s.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/team/order/detail/" + m.value,
              interfaceFrom: "GC",
              hotelGroupCode: s.hotelGroupCode
            }
          }).then(a => {
            if (1 == a.result && 0 == a.retVal.result) {
              let o = a.retVal.retVal.teamItineraryInfos[0].teamItineraries;
              for (var t in o) e.dayjs(o[t].bizDate).format("YYYY-MM-DD") == e.dayjs().format("YYYY-MM-DD") && o[t].teamRsvSrcs && o[t].teamRsvSrcs.length > 0 && (o[t].teamRsvSrcs[0].hotelCode, F.value = o[t].teamRsvSrcs[0].hotelDesc);
              h.value = a.retVal.retVal.teamOrder, W.value = h.value.orderType, a.retVal.retVal.guests.forEach(e => {
                e.mobile == n.mobile && (y.value = e, a.retVal.retVal.reserveOrders.forEach(a => {
                  a.orderNo == e.orderNo && (f.value = a.orderNo, x.value = a.memberId, A.value = a.mobile)
                }))
              }), y.value.idNo ? (Z(), U()) : k.value = !1, ne(), K(), a.retVal.retVal.reserveBeforeInfo && (E.value = a.retVal.retVal.reserveBeforeInfo), E.value.weathersDtos = a.retVal.retVal.weathersDtos, E.value.beforeInfoHotelsDtos = a.retVal.retVal.beforeInfoHotelsDtos, (a.retVal.retVal.teamItineraryInfos[0].teamItineraries || []).forEach(a => {
                if (a.actives && a.actives.length > 0 && a.actives.forEach(e => {
                    a.activesTl ? a.activesTl += " - " + e.activeName : a.activesTl = e.activeName
                  }), a.bizDateF = e.dayjs(h.value.beginDate).add(a.dayNum - 1, "day").format("M月D日"), a.moon = e.dayjs(h.value.beginDate).add(a.dayNum - 1, "day").format("M"), a.days = e.dayjs(h.value.beginDate).add(a.dayNum - 1, "day").format("D"), a.teamRsvSrcs.length > 0) {
                  let t = a.teamRsvSrcs[0];
                  t.arrDateF = e.dayjs(t.arrDate).format("M月D日"), t.depDateF = e.dayjs(t.depDate).format("M月D日"), H.value.push(t)
                }
              })
            } else l.jAlert3(a.retVal.msg || a.msg)
          })), "SingleRoom" !== W.value && "DestPackage" !== W.value && (null == (a = c.value) || a.splice(1, 0, {
            name: "接送需求",
            icon: "icon-a-20_jiesonganpai1",
            type: "shuttle"
          }))
        }), (t, o) => e.e({
          a: e.p({
            title: "全部服务",
            nativeMode: !0
          }),
          b: !k.value
        }, k.value ? {} : e.e({
          c: d.value.length > 0
        }, d.value.length > 0 ? {
          d: e.f(d.value, (a, t, o) => e.e({
            a: a.sureDrop
          }, (a.sureDrop, {}), {
            b: e.n("iconfont " + a.icon),
            c: e.t(a.name),
            d: t,
            e: e.o(e => te(a), t)
          }))
        } : {}, {
          e: c.value.length > 0
        }, c.value.length > 0 ? {
          f: e.f(c.value, (a, t, o) => e.e({
            a: a.drop
          }, (a.drop, {}), {
            b: e.n("iconfont " + a.icon),
            c: e.t(a.name),
            d: t,
            e: e.o(e => te(a), t)
          }))
        } : {}, {
          g: v.value.length > 0
        }, v.value.length > 0 ? {
          h: e.f(v.value, (a, t, o) => e.e({
            a: a.icon
          }, a.icon ? {
            b: e.n("iconfont " + a.icon)
          } : {
            c: a.logo
          }, {
            d: e.t(a.name),
            e: t,
            f: e.o(e => te(a), t)
          }))
        } : {}), {
          i: e.t(V.value.name),
          j: e.o(e => J(V.value.mobile)),
          k: e.sr(T, "e9d42207-1", {
            k: "tipsHelp"
          }),
          l: e.p({
            title: "行程顾问"
          }),
          m: e.t(y.value.name),
          n: 1 == y.value.sex
        }, (y.value.sex, {}), {
          o: e.f(E.value.reserveBeforePersonalizes, (a, t, o) => e.e({
            a: a.teamGuestId == y.value.id && a.description
          }, a.teamGuestId == y.value.id && a.description ? {
            b: e.t(X.value[a.itemName]),
            c: e.t(a.description)
          } : {}, {
            d: t
          })),
          p: E.value.weathersDtos && E.value.weathersDtos.length > 0
        }, E.value.weathersDtos && E.value.weathersDtos.length > 0 ? {
          q: e.f(E.value.weathersDtos[0].weathersDtos, (a, t, o) => e.e({
            a: a.hotelDesc
          }, a.hotelDesc ? e.e({
            b: e.t(a.hotelDesc),
            c: a.weatherFcEntity
          }, a.weatherFcEntity ? {
            d: e.t(a.weatherFcEntity.low),
            e: e.t(a.weatherFcEntity.high)
          } : {}, {
            f: a.altitude
          }, a.altitude ? {
            g: e.t(a.altitude)
          } : {}) : {}, {
            h: t
          }))
        } : {}, {
          r: E.value.dressing
        }, E.value.dressing ? {
          s: e.t(E.value.dressing)
        } : {}, {
          t: E.value.health
        }, E.value.health ? {
          v: e.t(E.value.health)
        } : {}, {
          w: E.value.taboo
        }, E.value.taboo ? {
          x: e.t(E.value.taboo)
        } : {}, {
          y: E.value.carInfo
        }, E.value.carInfo ? {
          z: e.t(E.value.carInfo)
        } : {}, {
          A: E.value.roomDiningDesc
        }, E.value.roomDiningDesc ? {
          B: e.t(E.value.roomDiningDesc)
        } : {}, {
          C: E.value.beforeInfoHotelsDtos && E.value.beforeInfoHotelsDtos.length > 0
        }, E.value.beforeInfoHotelsDtos && E.value.beforeInfoHotelsDtos.length > 0 ? {
          D: e.f(E.value.beforeInfoHotelsDtos, (a, t, o) => e.e({
            a: a.nearestHospital
          }, a.nearestHospital ? {
            b: e.t(a.hotelDesc),
            c: e.t(a.nearestHospital)
          } : {}, {
            d: t
          }))
        } : {}, {
          E: e.sr(D, "e9d42207-2", {
            k: "tripInfo"
          }),
          F: e.p({
            title: "",
            maxDialog: !0
          }),
          G: e.f(I.value, (t, o, l) => e.e({
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
            i: e.o(e => J(t.mobile), o)
          } : {}, {
            j: e.t(t.biographicalNotes),
            k: o,
            l: e.o(e => (e => {
              "GW" != e.personType && a.goPage("/pagesD/trip/houseKeep?code=" + e.code)
            })(t), o)
          })),
          H: e.sr(C, "e9d42207-3", {
            k: "serviceTeam"
          }),
          I: e.p({
            title: "服务团队",
            maxDialog: !0
          }),
          J: e.sr(b, "e9d42207-4", {
            k: "kf"
          }),
          K: e.p({
            title: "如需取消订单请联系客服"
          }),
          L: "预计到店时间" == t.arrTitle
        }, "预计到店时间" == t.arrTitle ? {
          M: e.o(e => t.showKf())
        } : {
          N: e.o(e => t.showKf())
        }, {
          O: R.value[$.value]
        }, R.value[$.value] ? {
          P: e.t(R.value[$.value].displayTime)
        } : {}, {
          Q: e.sr(j, "e9d42207-5", {
            k: "timeSelect"
          }),
          R: e.p({
            title: t.arrTitle
          }),
          S: e.o(re),
          T: e.sr(p, "e9d42207-6", {
            k: "checkIn"
          })
        })
      }
    });
  d.__runtimeHooks = 1;
  const c = e._export_sfc(d, [
    ["__scopeId", "data-v-e9d42207"]
  ]);
  wx.createPage(c)
}();