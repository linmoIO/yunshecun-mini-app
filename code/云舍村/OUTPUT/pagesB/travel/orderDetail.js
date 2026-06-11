! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../base/jAlert/jAlert.js"),
    u = require("../../utils/api.js"),
    l = require("../../utils/filter.js"),
    t = require("../../utils/helper.js"),
    o = require("../../utils/utils.js"),
    r = require("../../utils/wxuser.js");
  Array || e.resolveComponent("template")(), Math || (n + v + c + i + s + p)();
  const v = () => "../../components/collapse.js",
    n = () => "../../components/coustomHead.js",
    s = () => "../../components/exchangeDialog.js",
    i = () => "../../components/kfDialog.js",
    c = () => "../../components/new/StButton.js",
    p = () => "../../components/order/OrderCancelDialog.js",
    m = e.defineComponent({
      __name: "orderDetail",
      setup(v) {
        const n = e.ref(null),
          s = e.ref(!1),
          i = r.getStorage("user"),
          c = r.getStorage("config"),
          p = e.ref(""),
          m = e.ref(""),
          d = e.ref(),
          y = e.ref(),
          f = e.ref(""),
          h = e.ref(""),
          g = e.ref({}),
          D = e.ref([]),
          S = e.ref({}),
          T = e.ref([]),
          b = e.ref("F"),
          C = e.ref("F"),
          R = e.ref("F"),
          P = e.ref(""),
          F = e.ref(null),
          N = e.ref([]),
          I = e.ref(0),
          O = e.ref({}),
          G = e.ref({}),
          x = e.ref(""),
          L = e.ref([]),
          Y = e.ref(),
          A = e.ref(""),
          k = e.ref({}),
          V = e.ref([]),
          M = e.ref("F"),
          $ = e.ref(!1),
          j = e.ref("NI"),
          w = e.reactive({
            11: "外交护照",
            12: "公务护照",
            13: "因公普通护照",
            14: "护照",
            15: "中华人民共和国旅行证",
            16: "台湾居民来往大陆通行证",
            17: "海员证",
            18: "机组人员证",
            19: "铁路员工证",
            20: "中华人民共和国出入境通行证",
            21: "港澳通行证",
            23: "前往港澳通行证",
            24: "港澳同胞回乡证",
            30: "外国人出入境通行证",
            31: "外国人旅行证",
            32: "外国人回国证件",
            33: "外国人居留证",
            34: "户口簿",
            35: "居留许可证",
            36: "港澳居民来往内地通行证",
            51: "APEC商务旅行卡",
            52: "户籍证明",
            53: "军官离、退休证",
            54: "通行证",
            55: "旅行证",
            56: "特殊重要证件",
            96: "学信网",
            97: "留学offer证明",
            98: "学生证",
            99: "其他证件（包括联合国通行证、欧洲共同体护照等）",
            "01": "身份证",
            "02": "临时身份证",
            "03": "军(警)官证",
            "04": "士兵证",
            "05": "驾驶证",
            "06": "结婚证",
            "07": "暂住证"
          }),
          B = [{
            name: "已下单",
            val: "R"
          }, {
            name: "待出行",
            val: "RW",
            desc: "松赞期待与您相遇。"
          }, {
            name: "待签约",
            val: "DQY"
          }, {
            name: "待出行",
            val: "RD",
            desc: "松赞期待与您相遇。"
          }, {
            name: "待付款",
            val: "DFK",
            desc: "请尽快完成支付。"
          }, {
            name: "待退款",
            val: "DTK",
            desc: "正在等待后台审核。"
          }, {
            name: "退款中",
            val: "TKZ",
            desc: "预计3个工作天到账。"
          }, {
            name: "出行中",
            val: "I",
            desc: "松赞祝您旅途愉快。"
          }, {
            name: "已完成",
            val: "O",
            desc: "松赞感谢您的支持。"
          }, {
            name: "已取消",
            val: "X",
            desc: "松赞期待与您相遇。"
          }, {
            name: "已退款",
            val: "YTK",
            desc: "松赞祝您旅途愉快。"
          }, {
            name: "待使用",
            val: "3",
            desc: "松赞祝您旅途愉快。"
          }];

        function E() {
          "CI" === j.value ? e.index.navigateTo({
            url: `/pagesF/invoice/applyInvoice?orderNo=${p.value}&orderType=L&productType=${S.value.orderType}`
          }) : e.index.navigateTo({
            url: `/pagesF/invoice/invoiceDetails?orderNo=${p.value}&orderType=L&productType=${S.value.orderType}`
          })
        }

        function K() {
          g.value.teamOrder.productCode && o.goPage("/pagesB/travel/travelDetail?travelType=" + g.value.teamOrder.productCode)
        }

        function z(e) {
          o.goPage(`/pagesB/travel/travelDetail?travelType=${e.travelType}&couponNo=${e.couponNo}`)
        }

        function q() {
          let e = 0,
            a = !1;
          const l = [],
            t = [],
            r = [],
            v = [];
          T.value.forEach(u => {
            "I" === u.couponSta && (e++, u.couponCodeUseConfigProductDtoList.forEach(e => {
              "Custom" === e.orderType && (a = !0, A.value = e.orderType), "4" === e.type && l.push(e.productCode), "3" === e.type && t.push(e.productCode), "2" === e.type && "Custom" !== e.productPrimaryClassification && r.push(e.productPrimaryClassification), "1" === e.type && v.push(e.productCode)
            }))
          });
          const n = {
            hotelGroupCode: c.hotelGroupCode,
            unitCode: c.hotelGroupCode
          };
          r.length > 0 && (n.categorySubs = r), t.length > 0 && (n.itineraryCodes = t), v.length > 0 && (n.travelTypes = v), l.length > 0 && (n.travelGroupCodes = l), a ? u.api.interfaceTransfer({
            query: n,
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/travelGroup/listTravelProductForWechatTdqV2",
              interfaceFrom: "GC",
              hotelGroupCode: c.hotelGroupCode
            }
          }).then(a => {
            1 === a.result && 0 === a.retVal.result && (a.retVal.retVal && a.retVal.retVal.length > 0 ? 1 === e ? o.goPage("/pagesB/exchangeCoupon/exchangeList?couponNo=" + T.value[0].couponNo) : y.value.showDialog() : d.value.showDialog())
          }) : 1 === e ? o.goPage("/pagesB/exchangeCoupon/exchangeList?couponNo=" + T.value[0].couponNo) : y.value.showDialog()
        }

        function Q() {
          $.value = !0
        }
        e.onPageScroll(e => {});
        const _ = e.computed(() => "T" === S.value.agency && "F" === S.value.isAgency),
          H = e.computed(() => S.value.orderType && ["FreeTravel", "ThemeGroup", "ButlerCustomized", "DestPackage"].includes(S.value.orderType) && !S.value.isOrderGuestFinish);

        function U() {
          if ("SingleRoom" === S.value.orderType) {
            const a = h.value || S.value.orderType;
            e.index.redirectTo({
              url: `/pagesB/other/pay?orderNo=${p.value}&productType=${a}`
            })
          } else if ("shop" === h.value) {
            const a = h.value || S.value.orderType;
            e.index.redirectTo({
              url: `/pagesB/other/pay?orderNo=${m.value}&productType=${a}`
            })
          } else {
            const a = h.value || S.value.orderType;
            let u = `/pagesB/other/pay?orderNo=${p.value}&productType=${a}`;
            _.value && (u += "&contractFlag=1"), H.value && (u += "&addContactFlag=1"), e.index.redirectTo({
              url: u
            })
          }
        }
        const W = e.computed(() => S.value.orderType && !["SingleRoom", "DestPackage"].includes(S.value.orderType)),
          X = e.computed(() => H.value && ["RW", "RD", "DQY"].includes(S.value.sta));

        function J() {
          let e = "/pagesB/travel/orderGuest?orderNo=" + p.value;
          _.value && (e += "&contractFlag=1"), o.goPage(e)
        }

        function Z() {
          o.queryOrderGuestIsAll({
            unitCode: c.hotelGroupCode,
            orderNo: p.value
          }, () => {
            var a;
            (a = "/pagesD/trip/takeInfo?orderNo=" + p.value) && e.index.navigateTo({
              url: a
            })
          })
        }

        function ee() {
          o.queryOrderGuestIsAll({
            unitCode: c.hotelGroupCode,
            orderNo: p.value
          }, () => {
            e.index.redirectTo({
              url: "/pagesB/travel/tips?orderNo=" + p.value
            })
          })
        }

        function ae(u) {
          e.index.setClipboardData({
            data: u,
            success() {
              a.jAlert3("复制成功")
            }
          })
        }

        function ue(e, a) {
          const u = new Set(e),
            l = new Set(a);
          return u.size === l.size && [...u].every(e => l.has(e))
        }

        function le(e) {
          const a = [];
          for (const u of e) {
            const e = {};
            u.roomList.forEach(a => {
              const l = `${u.arrDate}_${a.rmtype}_${a.hotelDesc}`;
              e[l] ? e[l].rmnum += a.rmnum : e[l] = {
                ...a
              }
            }), u.roomList = Object.values(e), u.key = [], u.roomList.forEach(e => {
              u.key.push(`${e.rmtype}_${e.hotelDesc}_${e.rmnum}`)
            }), console.log(a, u);
            const l = a.find(e => u.roomList.every(a => e.roomList.some((a, l) => !(u.arrDate !== e.depDate || !ue(u.key, e.key)))));
            l ? (l.depDate = u.depDate, l.night += u.night) : a.push(u)
          }
          return a
        }

        function te(a) {
          return e.dayjs(a).format("MM.DD")
        }
        const oe = e.ref(!1);

        function re() {
          oe.value = !0, u.api.orderDetail({
            memberNo: i.memberId,
            memberId: i.memberId,
            hotelGroupCode: c.hotelGroupCode,
            hotelCode: c.hotelCode,
            travelOrderNo: p.value,
            mobile: i.mobile
          }).then(l => {
            var t, o;
            if (1 === l.result) {
              g.value = l.retVal, console.log("<OrderDetail> api.orderDetail res:", l.retVal), S.value = l.retVal.reserveOrder;
              const r = null == (t = l.retVal.payOrderList.find(e => e.memberNo === i.memberId)) ? void 0 : t.underTakerDtos,
                v = l.retVal.guests;
              r.length && v.length && (D.value = v.filter(e => r.some(a => a.guestNo === e.guestNo)));
              const n = null == (o = S.value.paySta) ? void 0 : o.toString();
              if (D.value = D.value.length > 0 ? [...D.value] : [...l.retVal.guests], "WJ" === S.value.sta && (S.value.sta = "O"), "W" !== S.value.sta && "D" !== S.value.sta && "RD" !== S.value.sta || (S.value.sta = "RW"), "X" !== S.value.sta ? "T" === S.value.agency && "F" === S.value.isAgency ? S.value.sta = "DQY" : "1" !== n && "8" !== n || "R" !== S.value.sta ? "2" === n && "R" === S.value.sta ? S.value.sta = "RW" : "4" === n ? S.value.sta = "DTK" : "5" === n ? S.value.sta = "YTK" : "7" === n && (S.value.sta = "YTZ") : S.value.sta = "DFK" : "5" === n && (S.value.sta = "YTK"), "T" === S.value.isAgency && "T" === S.value.agency && function() {
                  const e = {
                    hotelGroupCode: c.hotelGroupCode,
                    gcRsvNo: p.value,
                    memberId: i.memberId
                  };
                  u.api.getContractNoByGcRsvNo(e).then(e => {
                    1 === e.result ? e.retVal.url && V.value.push({
                      name: "线路合同",
                      url: e.retVal.url
                    }) : a.jAlert3(e.msg)
                  })
                }(), "DQY" !== S.value.sta && "DFK" !== S.value.sta || "8" !== n && S.value.countdown && (F.value = setInterval(() => {
                  S.value.countdown > 0 ? (S.value.countdown--, P.value = ve(S.value.countdown)) : (clearInterval(F.value), S.value.sta = "X")
                }, 1e3)), g.value.itineraryInfos && g.value.itineraryInfos.length > 0 && g.value.itineraryInfos[0].teamItineraries.length > 0) {
                const e = [];
                g.value.itineraryInfos[0].teamItineraries.forEach(a => {
                  if (a.teamRsvSrcs && a.teamRsvSrcs.length > 0) {
                    const u = {
                      roomList: []
                    };
                    a.teamRsvSrcs.forEach(e => {
                      u.arrDate = e.arrDate, u.depDate = e.depDate, u.hotelDesc = e.hotelDesc, u.night = 1, u.roomList.push({
                        rmtypeDesc: e.rmtypeDesc,
                        rmtype: e.rmtype,
                        rmnum: e.rmnum,
                        hotelDesc: e.hotelDesc
                      }), e.shareOrderNo && (M.value = "T")
                    }), e.push(u)
                  }
                }), N.value = le(e)
              }
              if (g.value.teamRsvSrcs && g.value.teamRsvSrcs.length > 0) {
                const a = [];
                g.value.teamRsvSrcs.forEach(u => {
                  const l = {
                    roomList: []
                  };
                  l.arrDate = u.arrDate, l.depDate = u.depDate, l.hotelDesc = u.hotelDesc, l.night = e.dayjs(e.dayjs(l.depDate).format("YYYY-MM-DD")).diff(e.dayjs(l.arrDate).format("YYYY-MM-DD"), "d"), l.roomList.push({
                    rmtypeDesc: u.rmtypeDesc,
                    rmtype: u.rmtype,
                    rmnum: u.rmnum,
                    hotelDesc: u.hotelDesc
                  }), a.push(l)
                }), N.value = le(a)
              }
              const {
                adult: s = 0,
                bigChildren: m = 0,
                children: d = 0,
                baby: y = 0
              } = g.value.reserveOrder || {};
              I.value = s + m + d + y, g.value.guests.forEach(e => {
                  e.chitNo && "2" === e.chitSta.toString() && V.value.push({
                    name: "保险单",
                    url: `${c.baseUrlmall.replace("/guardian","")}/api/fdd/insuranceDownload?insuranceNo=${e.chitNo}&hotelGroupCode=${c.hotelGroupCode}`
                  })
                }), S.value.beginDateF = e.dayjs(S.value.beginDate).format("YYYY.MM.DD"), S.value.endDateF = e.dayjs(S.value.endDate).format("YYYY.MM.DD"),
                function() {
                  const e = {
                    unitCode: c.hotelGroupCode,
                    otaChannel: "wechat",
                    ota: "DIRECT",
                    isGroup: "T",
                    payType: O.value.payType,
                    orderNo: p.value,
                    cardLevel: i.cardLevel,
                    cardType: i.cardType,
                    memberId: i.memberId
                  };
                  u.api.interfaceTransfer({
                    query: e,
                    config: {
                      interfaceType: "POST",
                      interfaceModule: "GC_TRAVEL_ORDER",
                      interfaceMethod: "/api/reserve/order/queryPayDetail",
                      interfaceFrom: "GC",
                      hotelGroupCode: c.hotelGroupCode
                    }
                  }).then(e => {
                    var a, u;
                    if (1 === e.result && 0 === e.retVal.result) {
                      O.value = e.retVal.retVal, O.value.travelRateSumDto && (O.value = Object.assign(O.value, O.value.travelRateSumDto)), g.value.reserveOrder && "SingleRoom" === g.value.reserveOrder.orderType && (O.value.basicTeamRateSum = O.value.rateSum), O.value.aleadyPayPrice = Number((O.value.alreadyPayFund + O.value.alreadyPayMember + O.value.alreadyPayOther).toFixed(2)), "Custom" !== S.value.orderType && O.value.activityChangeRateSum && (O.value.rateSum = O.value.rateSum + O.value.activityChangeRateSum), O.value.memberDscAmount = O.value.memberDscAmount || 0, O.value.needPay = Number((O.value.rateSum - O.value.memberDscAmount - O.value.couponRateSum - O.value.gwDiscount - O.value.point).toFixed(2)), O.value.allRateSum = Number((O.value.memberDscAmount + O.value.gwDiscount + O.value.point).toFixed(2));
                      const l = null == (a = S.value.paySta) ? void 0 : a.toString();
                      O.value.readyPay > 0 && "X" !== S.value.sta && ("9" === l || "8" === l) && "DQY" !== S.value.sta && (S.value.sta = "DFK"), O.value.couponSimpleInfoDtoList && O.value.couponSimpleInfoDtoList.length > 0 && (O.value.couponDesc = "", O.value.couponSimpleInfoDtoList.forEach((e, a) => {
                        a === O.value.couponSimpleInfoDtoList.length - 1 ? e.num > 1 ? O.value.couponDesc += `${e.descript} x${e.num}` : O.value.couponDesc += "" + e.descript : e.num > 1 ? O.value.couponDesc += `${e.descript} x${e.num};` : O.value.couponDesc += e.descript + ";"
                      })), O.value.memberLevelDesc = `${O.value.memberLevelDesc}会员${u=10*O.value.memberDiscount,Number(Number(u).toFixed(2))}折`, "DQY" === S.value.sta && ["1", "8"].includes(O.value.paySta) && (S.value.sta = "DFK")
                    }
                  }).finally(() => {
                    setTimeout(() => {
                      oe.value = !1
                    }, 300)
                  })
                }()
            } else oe.value = !1
          }).catch(() => {
            oe.value = !1
          })
        }

        function ve(e) {
          const a = Math.floor(e / 3600),
            u = Math.floor(e % 3600 / 60),
            l = e % 60;
          return `${String(a).padStart(2,"0")}小时${String(u).padStart(2,"0")}分${String(l).padStart(2,"0")}秒`
        }
        return e.onUnload(() => {
          clearInterval(F.value)
        }), e.onLoad(e => {
          p.value = e.orderNo, m.value = e.orderId, e.productType && (h.value = e.productType)
        }), e.onMounted(() => {
          const a = e.getCurrentInstance();
          n.value = a, e.index.getSystemInfo({
            success: e => {
              f.value = e.statusBarHeight + 60
            },
            fail(e) {
              console.log(e)
            }
          }), "shop" === h.value ? u.api.shopOrderDetail({
            equipment: c.equipment,
            hotelGroupCode: c.hotelGroupCode,
            hotelGroupId: c.hotelGroupId,
            id: m.value || p.value
          }).then(a => {
            var l;
            if (1 === a.result) {
              if (S.value = a.retVal, S.value.rsvMan = S.value.receiver, S.value.mobile = S.value.contact, S.value.basicTeamRateSum = S.value.totalPrice, O.value.basicTeamRateSum = S.value.totalPrice, O.value.rateSum = S.value.totalPrice, O.value.aleadyPayPrice = S.value.aleadyPayPrice, O.value.alreadyPay = Number((S.value.aleadyPayPrice - S.value.aleadyChuzhiPrice).toFixed(2)), O.value.alreadyPayMember = S.value.aleadyChuzhiPrice, O.value.alreadyPayFund = Number((S.value.aleadyPayPrice - S.value.aleadyChuzhiPrice).toFixed(2)), O.value.balanceDeduction = S.value.aleadyChuzhiPrice, O.value.readyPay = Number((S.value.actualPrice - S.value.aleadyPayPrice).toFixed(2)), O.value.needPay = S.value.actualPrice, O.value.point = S.value.originalTotalCredit, O.value.couponRateSum = 0, O.value.memberDscAmount = 0, G.value = S.value.listShopOrderItemVO[0].shopGoods, S.value.listShopOrderItemVO[0].extraConfig && (G.value.extraConfig = JSON.parse(S.value.listShopOrderItemVO[0].extraConfig)), O.value.point > 0 ? O.value.payType = "INTEGRALCASH" : O.value.payType = "CASH", S.value.couponAttr && JSON.parse(S.value.couponAttr).forEach(e => {
                  "coupon" === e.type && (O.value.couponDesc = e.couponName, O.value.couponRateSum = e.concessionaryPrice), "member" === e.type && (O.value.memberLevelDesc = e.memberLevelDesc, O.value.memberDscAmount = e.concessionaryPrice)
                }), O.value.allRateSum = Number((O.value.couponRateSum + O.value.memberDscAmount).toFixed(2)), T.value = S.value.listShopOrderItemVO[0].counponList, T.value.length > 0) {
                T.value.reduce((e, a, u) => ("I" === a.couponSta && e.push(u), e), []).forEach(e => {
                  T.value.splice(0, 0, T.value.splice(e, 1)[0])
                }), x.value = T.value[0].promotionRule;
                let e = !1;
                T.value.forEach(a => {
                  const l = [];
                  "I" === a.couponSta && (a.couponCodeUseConfigProductDtoList.forEach(e => {
                    e.couponNo = a.couponNo, l.push(e)
                  }), e && "pack" !== G.value.vrType || (e = !0, function(e, a) {
                    L.value = [];
                    const l = [],
                      t = [],
                      o = [],
                      r = [],
                      v = {
                        unitCode: c.hotelGroupCode,
                        hotelGroupCode: c.hotelGroupCode
                      };
                    e.forEach(e => {
                      var a;
                      const u = null == (a = e.type) ? void 0 : a.toString();
                      "4" === u && l.push(e.productCode), "3" === u && o.push(e.productCode), "2" === u && "Custom" !== e.productPrimaryClassification && r.push(e.productPrimaryClassification), "1" === u && t.push(e.productCode)
                    }), o.length > 0 && (v.itineraryCodes = o), t.length > 0 && (v.travelTypes = t), r.length > 0 && (v.categorySubs = r), l.length > 0 && (v.travelGroupCodes = l), u.api.interfaceTransfer({
                      query: v,
                      config: {
                        interfaceType: "POST",
                        interfaceModule: "GC_PRODUCT_JOURNEY",
                        interfaceMethod: "/api/travelGroup/listTravelProductForWechatTdqV2",
                        interfaceFrom: "GC",
                        hotelGroupCode: c.hotelGroupCode
                      }
                    }).then(e => {
                      if (1 === e.result && 0 === e.retVal.result && e.retVal.retVal) {
                        const u = e.retVal.retVal;
                        a.productNum = u.length, u.forEach(e => {
                          e.couponNo = a.couponNo, L.value.push(e)
                        })
                      }
                      console.log(L.value)
                    })
                  }(l, a)))
                })
              }
              if (T.value && T.value.length > 0 && (S.value.useTime = `${e.dayjs(T.value[0].couponStarttime).format("YYYY.MM.DD")} - ${e.dayjs(T.value[0].couponEndtime).format("YYYY.MM.DD")}`), S.value.listShopOrderItemVO[0].skuId) {
                let e = [],
                  a = "";
                const u = JSON.parse(S.value.listShopOrderItemVO[0].skuInfo);
                e = "string" == typeof u[0].sku ? JSON.parse(u[0].sku) : u[0].sku;
                for (const u in e) a += e[u].itemValue;
                S.value.skuInfoStr = a
              }
              const t = null == (l = S.value.orderStatus) ? void 0 : l.toString();
              if ("1" === t) {
                S.value.sta = "DFK", S.value.webPay = 0;
                let a = S.value.payOvertime;
                a || (a = 30);
                let u = e.dayjs(S.value.createDatetime).add(Number(a), "minutes").diff(e.dayjs(), "s");
                F.value = setInterval(() => {
                  u > 0 ? (u--, P.value = ve(u)) : S.value.sta = "X"
                }, 1e3)
              } else "2" === t ? (S.value.sta = "X", S.value.webPay = 0) : "3" === t ? (S.value.sta = "3", S.value.webPay = S.value.actualPrice) : "4" === t || "12" === t ? (S.value.sta = "TKZ", S.value.webPay = S.value.actualPrice) : "5" === t ? (S.value.sta = "YTK", S.value.webPay = S.value.actualPrice) : (S.value.sta = "O", S.value.webPay = S.value.actualPrice)
            }
          }) : (u.api.getOrderInvoiceSta({
            hotelCode: c.hotelCode,
            hotelGroupCode: c.hotelGroupCode,
            orderNo: p.value,
            orderType: "L"
          }).then(e => {
            1 === e.result && (j.value = e.retVal.invoiceSta, "HI" === j.value && u.api.getInvoiceOrder({
              hotelCode: c.hotelCode,
              hotelGroupCode: c.hotelGroupCode,
              orderNo: p.value,
              orderType: "R"
            }).then(e => {
              1 === e.result && 0 === e.retVal.resultCode && (k.value = e.retVal.orderInvoice, k.value.eiinvoicePdfUrl && V.value.push({
                name: "发票",
                url: k.value.eiinvoicePdfUrl
              })), console.log(e)
            }))
          }), re())
        }), e.watch(() => oe.value, a => {
          e.nextTick$1(() => {
            var u;
            !a && e.index.createSelectorQuery().in(null == (u = n.value) ? void 0 : u.proxy).select(".footer > .btns").boundingClientRect().exec(e => {
              s.value = null === e[0], console.log("emptyFooter", s.value)
            })
          })
        }), (a, u) => e.e({
          a: S.value.orderNo
        }, S.value.orderNo ? e.e({
          b: e.p({
            color: "#fff",
            title: "订单详情",
            "custom-class": "X" === S.value.sta ? "" : "customPattern",
            "bg-color": "X" === S.value.sta ? "#7f7d75" : ""
          }),
          c: !oe.value
        }, oe.value ? {} : e.e({
          d: e.f(B, (a, u, l) => e.e({
            a: a.val === S.value.sta
          }, a.val === S.value.sta ? e.e({
            b: e.t(a.name),
            c: "DFK" === S.value.sta && "8" !== S.value.paySta
          }, "DFK" === S.value.sta && "8" !== S.value.paySta ? e.e({
            d: "CRS" !== S.value.otaChannel && S.value.countdown > 0
          }, "CRS" !== S.value.otaChannel && S.value.countdown > 0 ? {
            e: e.t(P.value)
          } : {}) : {
            f: e.t(a.desc)
          }, {
            g: "X" === S.value.sta ? 1 : "",
            h: f.value + "px"
          }) : {}, {
            i: u
          })),
          e: "shop" === h.value
        }, "shop" === h.value ? e.e({
          f: e.unref(t.imageMogr2)(S.value.listShopOrderItemVO[0].goodsLogo, "160x"),
          g: e.o(a => e.unref(o.goPage)("/pagesB/exchangeCoupon/exchangeCouponDetail?id=" + S.value.listShopOrderItemVO[0].goodsId)),
          h: e.t(S.value.listShopOrderItemVO[0].goodsName),
          i: S.value.skuInfoStr || G.value.extraConfig.peopleNum
        }, S.value.skuInfoStr || G.value.extraConfig.peopleNum ? e.e({
          j: S.value.skuInfoStr
        }, S.value.skuInfoStr ? {
          k: e.t(S.value.skuInfoStr)
        } : {}, {
          l: e.t(S.value.orderTypeDesc),
          m: G.value.extraConfig.peopleNum
        }, G.value.extraConfig.peopleNum ? {
          n: e.t(G.value.extraConfig.peopleNum)
        } : {}) : {}, {
          o: "pack" !== G.value.vrType && S.value.useTime
        }, "pack" !== G.value.vrType && S.value.useTime ? {
          p: e.t(S.value.useTime)
        } : {}, {
          q: T.value.length > 0
        }, T.value.length > 0 ? e.e({
          r: e.f(T.value, (a, u, l) => e.e(T.value.length > 1 ? {
            a: e.t(u + 1)
          } : {}, {
            b: e.t(a.couponNo),
            c: "I" === a.couponSta
          }, "I" === a.couponSta ? {
            d: e.o(e => ae(a.couponNo), u)
          } : ("O" === a.couponSta || "U" === a.couponSta || a.couponSta, {}), {
            e: "O" === a.couponSta || "U" === a.couponSta || "LO" === a.couponSta,
            f: "I" !== a.couponSta ? 1 : "",
            g: a.productNum > 0 && "pack" === G.value.vrType
          }, a.productNum > 0 && "pack" === G.value.vrType ? {
            h: e.f(L.value, (u, l, t) => e.e({
              a: a.couponNo === u.couponNo
            }, a.couponNo === u.couponNo ? {
              b: e.t(u.title),
              c: e.o(e => z(u), l)
            } : {}, {
              d: l
            }))
          } : {}, {
            i: u
          })),
          s: T.value.length > 1,
          t: "pack" === G.value.vrType ? 1 : "",
          v: x.value
        }, x.value ? e.e({
          w: x.value,
          x: e.p({
            "default-height": "90px",
            btn: "T"
          }),
          y: "F" === b.value && Y.value
        }, "F" === b.value && Y.value ? {
          z: e.o(e => b.value = "T")
        } : Y.value ? {
          B: e.o(e => b.value = "F")
        } : {}, {
          A: Y.value
        }) : {}) : {}, {
          C: L.value.length > 0 && "pack" !== G.value.vrType
        }, L.value.length > 0 && "pack" !== G.value.vrType ? {
          D: e.f(L.value, (a, u, l) => ({
            a: e.t(a.title),
            b: u,
            c: e.o(e => z(a), u)
          }))
        } : {}) : e.e({
          E: S.value.productUrl ? e.unref(t.imageMogr2)(S.value.productUrl, "160x") : "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/defaultImage.png",
          F: e.o(K),
          G: g.value.teamOrder
        }, g.value.teamOrder ? e.e({
          H: e.t(S.value.productDesc),
          I: g.value.itineraryInfos && g.value.itineraryInfos.length > 0
        }, g.value.itineraryInfos && g.value.itineraryInfos.length > 0 ? {
          J: e.t(S.value.orderTypeDesc ? S.value.orderTypeDesc + " · " : ""),
          K: e.t(g.value.itineraryInfos[0].itineraryName)
        } : {}, {
          L: e.t(S.value.beginDateF),
          M: e.t(S.value.endDateF),
          N: I.value > 0
        }, I.value > 0 ? {
          O: e.t(I.value)
        } : {}) : {}, {
          P: !D.value.length
        }, (D.value.length, {}), {
          Q: N.value.length > 0
        }, N.value.length > 0 ? e.e({
          R: "T" === M.value
        }, (M.value, {}), {
          S: e.f(N.value, (a, u, l) => e.e({
            a: "T" === R.value ? u > -1 : u < 3
          }, ("T" === R.value ? u > -1 : u < 3) ? e.e({
            b: a.arrDate
          }, a.arrDate ? e.e({
            c: e.t(te(a.arrDate)),
            d: a.depDate
          }, a.depDate ? {
            e: e.t(te(a.depDate))
          } : {}) : {}, {
            f: e.t(a.night),
            g: e.t(a.hotelDesc),
            h: e.f(a.roomList, (a, l, t) => ({
              a: e.t(a.rmtypeDesc),
              b: e.t(a.rmnum),
              c: `room-${u}-${l}`
            }))
          }) : {}, {
            i: "hotel-" + u
          })),
          T: N.value.length > 3
        }, N.value.length > 3 ? e.e({
          U: "F" === R.value
        }, "F" === R.value ? {
          V: e.o(e => R.value = "T")
        } : {
          W: e.o(e => R.value = "F")
        }) : {}) : {}, {
          X: D.value.length > 0
        }, D.value.length > 0 ? {
          Y: e.f(D.value, (a, u, t) => ({
            a: e.t(a.name),
            b: e.t(w[a.idCode]),
            c: e.t(e.unref(l.hideIdCard)(a.idNo)),
            d: "guest-" + u
          }))
        } : {}), {
          Z: "T" !== C.value
        }, "T" !== C.value ? e.e({
          aa: "CASH" === O.value.payType
        }, ("CASH" === O.value.payType || "INTEGRALCASH" === O.value.payType || O.value.payType, {}), {
          ab: "INTEGRALCASH" === O.value.payType,
          ac: "INTEGRAL" === O.value.payType,
          ad: O.value.rateSum || !O.value.point
        }, O.value.rateSum || !O.value.point ? {
          ae: e.t(e.unref(l.valFormat)(O.value.rateSum))
        } : {}, {
          af: ("DFK" === S.value.sta || "DQY" === S.value.sta) && O.value.readyPay > 0
        }, ("DFK" === S.value.sta || "DQY" === S.value.sta) && O.value.readyPay > 0 ? {
          ag: e.t(e.unref(l.valFormat)(O.value.readyPay))
        } : {}, {
          ah: O.value.aleadyPayPrice
        }, O.value.aleadyPayPrice ? {
          ai: e.t(e.unref(l.valFormat)(O.value.aleadyPayPrice))
        } : {}) : {}, {
          aj: "T" === C.value
        }, "T" === C.value ? e.e({
          ak: O.value.rateSum || !O.value.point
        }, O.value.rateSum || !O.value.point ? {
          al: e.t(e.unref(l.valFormat)(O.value.rateSum))
        } : {}, {
          am: "CASH" === O.value.payType
        }, ("CASH" === O.value.payType || "INTEGRALCASH" === O.value.payType || O.value.payType, {}), {
          an: "INTEGRALCASH" === O.value.payType,
          ao: "INTEGRAL" === O.value.payType,
          ap: "shop" === h.value
        }, "shop" === h.value ? e.e({
          aq: "Custom" !== S.value.orderType
        }, "Custom" !== S.value.orderType ? e.e({
          ar: O.value.basicTeamRateSum || !O.value.point
        }, O.value.basicTeamRateSum || !O.value.point ? {
          as: e.t(e.unref(l.valFormat)(O.value.basicTeamRateSum))
        } : {}) : {}) : e.e({
          at: O.value.basicTeamRateSum || !O.value.point
        }, O.value.basicTeamRateSum || !O.value.point ? {
          av: e.t(e.unref(l.valFormat)(O.value.basicTeamRateSum))
        } : {}, {
          aw: "Custom" !== S.value.orderType && "ButlerCustomized" !== S.value.orderType
        }, "Custom" !== S.value.orderType && "ButlerCustomized" !== S.value.orderType ? e.e({
          ax: O.value.adultTeamRateSum
        }, O.value.adultTeamRateSum ? e.e({
          ay: O.value.adultTeamRateSum || !O.value.point
        }, O.value.adultTeamRateSum || !O.value.point ? {
          az: e.t(e.unref(l.valFormat)(O.value.adultTeamRateSum))
        } : {}) : {}, {
          aA: O.value.bigChildrenTeamRateSum
        }, O.value.bigChildrenTeamRateSum ? {
          aB: e.t(e.unref(l.valFormat)(O.value.bigChildrenTeamRateSum))
        } : {}, {
          aC: O.value.midChildrenTeamRateSum
        }, O.value.midChildrenTeamRateSum ? {
          aD: e.t(e.unref(l.valFormat)(O.value.midChildrenTeamRateSum))
        } : {}, {
          aE: O.value.babyTeamRateSum
        }, O.value.babyTeamRateSum ? {
          aF: e.t(e.unref(l.valFormat)(O.value.babyTeamRateSum))
        } : {}, {
          aG: O.value.singleRoomRateSum
        }, O.value.singleRoomRateSum ? {
          aH: e.t(e.unref(l.valFormat)(O.value.singleRoomRateSum))
        } : {}, {
          aI: O.value.addBedSum
        }, O.value.addBedSum ? {
          aJ: e.t(e.unref(l.valFormat)(O.value.addBedSum))
        } : {}, {
          aK: O.value.addBfSum
        }, O.value.addBfSum ? {
          aL: e.t(e.unref(l.valFormat)(O.value.addBfSum))
        } : {}, {
          aM: O.value.upRmTypeSum
        }, O.value.upRmTypeSum ? {
          aN: e.t(e.unref(l.valFormat)(O.value.upRmTypeSum))
        } : {}, {
          aO: O.value.guaranteedPrice
        }, O.value.guaranteedPrice ? {
          aP: e.t(e.unref(l.valFormat)(O.value.guaranteedPrice))
        } : {}) : {}, {
          aQ: O.value.activityChangeRateSum
        }, O.value.activityChangeRateSum ? {
          aR: e.t(e.unref(l.valFormat)(O.value.activityChangeRateSum))
        } : {}), {
          aS: "ButlerCustomized" === S.value.orderType
        }, "ButlerCustomized" === S.value.orderType ? e.e({
          aT: O.value.addBedSum
        }, O.value.addBedSum ? {
          aU: e.t(e.unref(l.valFormat)(O.value.addBedSum))
        } : {}, {
          aV: O.value.addBfSum
        }, O.value.addBfSum ? {
          aW: e.t(e.unref(l.valFormat)(O.value.addBfSum))
        } : {}) : {}, {
          aX: O.value.couponRateSum
        }, O.value.couponRateSum ? e.e({
          aY: e.t(e.unref(l.valFormat)(O.value.couponRateSum)),
          aZ: "shop" === h.value
        }, "shop" === h.value ? e.e({
          ba: O.value.couponDesc
        }, O.value.couponDesc ? {
          bb: e.t(O.value.couponDesc),
          bc: e.t(e.unref(l.valFormat)(O.value.couponRateSum))
        } : {}) : e.e({
          bd: O.value.couponSimpleInfoDtoList && O.value.couponSimpleInfoDtoList.length > 0
        }, O.value.couponSimpleInfoDtoList && O.value.couponSimpleInfoDtoList.length > 0 ? {
          be: e.f(O.value.couponSimpleInfoDtoList, (a, u, t) => e.e({
            a: e.t(a.descript),
            b: a.num > 1
          }, a.num > 1 ? {
            c: e.t(a.num)
          } : {}, {
            d: e.t(e.unref(l.valFormat)(a.realValue)),
            e: u
          }))
        } : {})) : {}, {
          bf: O.value.allRateSum
        }, O.value.allRateSum ? e.e({
          bg: e.t(e.unref(l.valFormat)(O.value.allRateSum)),
          bh: O.value.point
        }, O.value.point ? {
          bi: e.t(e.unref(l.valFormat)(O.value.point))
        } : {}, {
          bj: O.value.memberDscAmount
        }, O.value.memberDscAmount ? {
          bk: e.t(O.value.memberLevelDesc),
          bl: e.t(e.unref(l.valFormat)(O.value.memberDscAmount))
        } : {}, {
          bm: O.value.gwDiscount
        }, O.value.gwDiscount ? {
          bn: e.t(e.unref(l.valFormat)(O.value.gwDiscount))
        } : {}) : {}, {
          bo: O.value.needPay || !O.value.point
        }, O.value.needPay || !O.value.point ? {
          bp: e.t(e.unref(l.valFormat)(O.value.needPay))
        } : {}, {
          bq: O.value.aleadyPayPrice
        }, O.value.aleadyPayPrice ? {
          br: e.t(e.unref(l.valFormat)(O.value.aleadyPayPrice))
        } : {}, {
          bs: ("DFK" === S.value.sta || "DQY" === S.value.sta) && O.value.readyPay > 0
        }, ("DFK" === S.value.sta || "DQY" === S.value.sta) && O.value.readyPay > 0 ? {
          bt: e.t(e.unref(l.valFormat)(O.value.readyPay))
        } : {}, {
          bv: O.value.breakMoney
        }, O.value.breakMoney ? {
          bw: e.t(O.value.breakMoney),
          bx: e.t(e.unref(l.valFormat)(O.value.breakMoney))
        } : {}) : {}, {
          by: "F" === C.value
        }, "F" === C.value ? {
          bz: e.o(e => C.value = "T")
        } : {
          bA: e.o(e => C.value = "F")
        }, {
          bB: e.t(S.value.orderNo),
          bC: e.o(e => ae(S.value.orderNo)),
          bD: e.t(S.value.createDatetime),
          bE: e.t(S.value.contactName),
          bF: e.t(S.value.contactMobile),
          bG: V.value.length > 0
        }, V.value.length > 0 ? {
          bH: e.f(V.value, (a, u, l) => ({
            a: e.t(a.name),
            b: u,
            c: e.o(e => {
              return u = a, void o.goPage(u.url);
              var u
            }, u)
          }))
        } : {}, {
          bI: O.value.isChangeActivity && "T" === O.value.isChangeActivity
        }, O.value.isChangeActivity && "T" === O.value.isChangeActivity ? {
          bJ: e.o(a => e.unref(o.goPage)("/pagesD/trip/tripChange?teamNo=" + O.value.teamNo))
        } : {}, {
          bK: ("3" === S.value.sta.toString() || "O" === S.value.sta.toString() && "NI" !== j.value || "DFK" === S.value.sta || "DQY" === S.value.sta || "RW" === S.value.sta || "RD" === S.value.sta) && !s.value
        }, "3" !== S.value.sta.toString() && ("O" !== S.value.sta.toString() || "NI" === j.value) && "DFK" !== S.value.sta && "DQY" !== S.value.sta && "RW" !== S.value.sta && "RD" !== S.value.sta || s.value ? {} : e.e({
          bL: ("RD" === S.value.sta || "RW" === S.value.sta) && !X.value && W.value
        }, "RD" !== S.value.sta && "RW" !== S.value.sta || X.value || !W.value ? {} : {
          bM: e.o(Z),
          bN: e.p({
            theme: "simple",
            size: "small",
            "custom-style": {
              marginLeft: e.unref(t.pxTransform)(8, 375)
            }
          })
        }, {
          bO: "O" === S.value.sta.toString() && "NI" !== j.value
        }, "O" === S.value.sta.toString() && "NI" !== j.value ? {
          bP: e.o(E),
          bQ: e.p({
            theme: "simple",
            size: "small",
            "custom-style": {
              marginLeft: e.unref(t.pxTransform)(8, 375)
            }
          })
        } : {}, {
          bR: "3" === S.value.sta.toString()
        }, "3" === S.value.sta.toString() ? {
          bS: e.o(q),
          bT: e.p({
            theme: "simple",
            size: "small",
            "custom-style": {
              marginLeft: e.unref(t.pxTransform)(8, 375)
            }
          })
        } : {}, {
          bU: "DFK" === S.value.sta || "DQY" === S.value.sta || X.value
        }, "DFK" === S.value.sta || "DQY" === S.value.sta || X.value ? e.e({
          bV: e.o(Q),
          bW: e.p({
            theme: "simple",
            size: "small",
            "custom-style": {
              marginLeft: e.unref(t.pxTransform)(8, 375)
            }
          }),
          bX: "DFK" === S.value.sta
        }, "DFK" === S.value.sta ? {
          bY: e.o(U),
          bZ: e.p({
            theme: "black",
            size: "small",
            "custom-style": {
              marginLeft: e.unref(t.pxTransform)(8, 375)
            }
          })
        } : X.value ? {
          cb: e.o(J),
          cc: e.p({
            theme: "black",
            size: "small",
            "custom-style": {
              marginLeft: e.unref(t.pxTransform)(8, 375)
            }
          })
        } : "DQY" === S.value.sta ? {
          ce: e.o(ee),
          cf: e.p({
            theme: "black",
            size: "small",
            "custom-style": {
              marginLeft: e.unref(t.pxTransform)(8, 375)
            }
          })
        } : {}, {
          ca: X.value,
          cd: "DQY" === S.value.sta
        }) : {})), {
          cg: e.sr(d, "4e23aa1e-9", {
            k: "kf"
          }),
          ch: e.p({
            title: "一键咨询"
          }),
          ci: e.sr(y, "4e23aa1e-10", {
            k: "exchange"
          }),
          cj: e.p({
            "order-id": m.value
          }),
          ck: e.o(e => $.value = e),
          cl: e.p({
            "order-no": p.value,
            "order-id": m.value,
            "product-type": h.value || S.value.orderType,
            show: $.value
          })
        }) : {})
      }
    });
  m.__runtimeHooks = 1;
  const d = e._export_sfc(m, [
    ["__scopeId", "data-v-4e23aa1e"]
  ]);
  wx.createPage(d)
}();