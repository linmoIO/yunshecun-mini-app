! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../hooks/useScroll.js"),
    t = require("../../utils/api.js"),
    a = require("../../utils/filter.js"),
    r = require("../../utils/helper.js"),
    n = require("../../utils/utils.js"),
    u = require("../../utils/wxuser.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (i + p + h + s + l + c + d)();
  const i = () => "../../components/coustomHead.js",
    s = () => "../../components/empty.js",
    c = () => "../../components/exchangeDialog.js",
    l = () => "../../components/kfDialog.js",
    d = () => "../../components/order/OrderCancelDialog.js",
    p = () => "../../components/searchInput.js",
    h = () => "../../components/switchBar.js",
    v = e.defineComponent({
      __name: "orderList",
      setup(i) {
        const s = {
            freetravel: "旅行",
            butcustom: "旅行",
            themegroup: "旅行",
            destpack: "目的地套餐",
            room: "酒店",
            custom: "私人定制",
            shop: "通兑券",
            activity: "Fun肆玩",
            pack: "组合",
            spa: "餐饮",
            travelroom: "酒店"
          },
          c = e.ref({
            room: "hotel",
            custom: "Custom",
            destpack: "DestPackage",
            butcustom: "ButlerCustomized",
            freetravel: "FreeTravel",
            themegroup: "ThemeGroup",
            shop: "shop",
            activity: "activity",
            travelroom: "SingleRoom"
          }),
          l = e.ref(!1),
          d = e.ref(),
          {
            scrollTop: p,
            onPageScroll: h
          } = o.useScroll(),
          v = e.ref(!0),
          m = u.getStorage("config"),
          f = u.getStorage("user"),
          g = e.reactive(u.getStorage("wxuser")),
          y = e.ref(0),
          S = e.ref(8),
          w = e.ref(1),
          C = e.ref([]),
          T = e.ref([]),
          N = e.ref(!1),
          I = e.ref(0),
          b = e.ref(""),
          P = e.ref(),
          k = e.ref(),
          D = e.reactive([{
            name: "全部",
            active: !0,
            value: ""
          }, {
            name: "待签约",
            active: !1,
            value: "8"
          }, {
            name: "待付款",
            active: !1,
            value: "1"
          }, {
            name: "退款/售后",
            active: !1,
            value: "2,4"
          }]),
          x = e.reactive([{
            name: "全部",
            active: !0,
            value: "1"
          }, {
            name: "待付款",
            active: !1,
            value: "2"
          }, {
            name: "待发货",
            active: !1,
            value: "3"
          }, {
            name: "待收货",
            active: !1,
            value: "4"
          }, {
            name: "待评价",
            active: !1,
            value: "5"
          }, {
            name: "退款/售后",
            active: !1,
            value: "6"
          }]),
          A = e.ref(!1),
          L = e.ref(""),
          G = e.reactive([{
            name: "酒旅订单",
            value: 1,
            active: !0
          }, {
            name: "风物订单",
            value: 2,
            active: !1
          }]),
          B = e.ref(1);

        function j(e) {
          var o;
          b.value = e.orderId, o = b.value, t.api.shopOrderDetail({
            equipment: m.equipment,
            hotelGroupCode: m.hotelGroupCode,
            hotelGroupId: m.hotelGroupId,
            id: o
          }).then(e => {
            if (1 === e.result) {
              let o = 0,
                a = !1;
              const r = e.retVal.listShopOrderItemVO[0].counponList,
                u = [],
                i = [],
                s = [],
                c = [],
                l = {
                  hotelGroupCode: m.hotelGroupCode,
                  unitCode: m.hotelGroupCode
                };
              r.forEach(e => {
                "I" === e.couponSta && (o++, e.couponCodeUseConfigProductDtoList.forEach(e => {
                  "Custom" === e.orderType && (a = !0), "4" === e.type && i.push(e.productCode), "3" === e.type && c.push(e.productCode), "2" === e.type && "Custom" !== e.productPrimaryClassification && u.push(e.productPrimaryClassification), "1" === e.type && s.push(e.productCode)
                }))
              }), u.length > 0 && (l.categorySubs = u), c.length > 0 && (l.itineraryCodes = c), s.length > 0 && (l.travelTypes = s), i.length > 0 && (l.travelGroupCodes = i), a ? t.api.interfaceTransfer({
                query: l,
                config: {
                  interfaceType: "POST",
                  interfaceModule: "GC_PRODUCT_JOURNEY",
                  interfaceMethod: "/api/travelGroup/listTravelProductForWechatTdqV2",
                  interfaceFrom: "GC",
                  hotelGroupCode: m.hotelGroupCode
                }
              }).then(e => {
                1 === e.result && 0 === e.retVal.result && (e.retVal.retVal && e.retVal.retVal.length > 0 ? 1 === o ? n.goPage("/pagesB/exchangeCoupon/exchangeList?couponNo=" + r[0].couponNo) : P.value.showDialog() : k.value.showDialog())
              }) : 1 === o ? n.goPage("/pagesB/exchangeCoupon/exchangeList?couponNo=" + r[0].couponNo) : P.value.showDialog()
            }
          })
        }

        function F() {
          const o = {
            freetravel: "icon-travel-line",
            butcustom: "icon-travel-line",
            themegroup: "icon-travel-line",
            destpack: "icon-a-12_jiudiantaocan_hui",
            room: "icon-a-12_jiudian_hei",
            custom: "icon-a-16_dingzhilvhang_hei",
            shop: "icon-exchange-coupon",
            activity: "icon-activity-line",
            pack: "icon-a-12_jiudiantaocan_hui",
            spa: "icon-a-16_quanbulvhang",
            travelroom: "icon-a-12_jiudian_hei"
          };
          if (A.value) return !1;
          A.value = !0, e.index.showLoading({
            title: "加载中"
          });
          let a = "",
            r = "",
            u = "";
          f && f.mobile && (r = f.memberId, u = f.memberToken || ""), g && g.openid && (a = g.openid);
          const i = e.ref(""),
            c = {
              firstResult: y.value,
              mobile: "",
              channel: "",
              orderStatus: L.value,
              payStatus: "",
              pageSize: S.value,
              openid: a,
              memberid: r,
              hotelGroupCode: m.hotelGroupCode,
              searchword: i.value,
              memberToken: u,
              version: "1.0.1"
            };
          t.api.orderAggregation(c).then(t => {
            if (A.value = !1, 1 === t.result) {
              const e = {
                1: "待付款",
                2: "已退款",
                3: "待出行",
                4: "退款中",
                5: "已取消",
                7: "待评价",
                8: "待签约",
                9: "已完成",
                11: "出行中"
              };
              t.retVal.orderList.forEach((t, a) => {
                var r;
                if ("7" === t.orderStatus && (t.orderStatus = "9"), t.channelDesc = s[t.channel], t.iconfont = o[t.channel], (null == (r = t.iconfont) ? void 0 : r.startsWith("st-icon")) && (t.isNewIconfont = !0), t.orderStaDesc = e[t.orderStatus], "shop" !== t.channel && "activity" !== t.channel || 3 !== t.orderStatus || (t.orderStaDesc = "待使用"), "1" !== t.orderStatus && "8" !== t.orderStatus || (t.enhanceSta = !0), t.webPay = 0, t.num = 0, t.activityDate = "", t.rateSum = t.price, t.extraJson) {
                  const e = JSON.parse(t.extraJson);
                  ["butcustom", "freetravel", "themegroup", "destpack"].includes(t.channel) && (t.itineraryDesc = `${e.orderTypeDesc} · ${e.itineraryName}`), e.webPay && (t.webPay = Number(e.webPay)), e.num && (t.num = e.num), e.activityDate && (t.activityDate = e.activityDate), e.prepayHoldSeconds && t.enhanceSta && 0 === t.webPay && (t.countdown = e.prepayHoldSeconds, t.countTime = _(t.countdown)), e.couponNo && (t.couponNo = e.couponNo), e.rateSum && (t.price = e.rateSum, t.rateSum = e.rateSum), (e.dscAmount > 0 || e.dscAmount < 0) && (t.price = n.subtraction(Number(t.price), Number(e.dscAmount)), "room" === t.channel && (t.price = n.subtraction(Number(t.price), Number(e.webPay)))), e.webPay < t.price && (t.needPay = n.subtraction(Number(t.price), Number(e.webPay)))
                } ["8"].includes(t.orderStatus) && (t.showSign = !0), ["freetravel", "butcustom", "themegroup", "destpack"].includes(t.channel) && !t.isOrderGuestFinish && (t.isNeedAddContact = !0), ["8", "3"].includes(t.orderStatus) && t.isNeedAddContact && (t.isShowAddContactBtn = !0), ["2", "3", "4", "5", "9"].includes(t.orderStatus) || t.isShowAddContactBtn ? t.showKf = !0 : ["2", "3", "4", "5", "7", "9"].includes(t.orderStatus) || (t.showCancel = !0), ["1"].includes(t.orderStatus) && (t.showPay = !0), ["3"].includes(t.orderStatus) && ["shop"].includes(t.channel) && (t.showExchange = !0), ["9"].includes(t.orderStatus) && t.extraJson && "1" === JSON.parse(t.extraJson).invoiceStaV2 && (t.showInvoice = !0), ["3"].includes(t.orderStatus) && ["custom", "destpack", "butcustom", "freetravel", "themegroup"].includes(t.channel) && t.extraJson && "F" === JSON.parse(t.extraJson).isTransfer && (t.showTransfer = !0)
              }), C.value = C.value.concat(t.retVal.orderList), y.value += S.value
            }
            e.index.stopPullDownRefresh(), e.index.hideLoading()
          })
        }

        function _(e) {
          const o = Math.floor(e / 3600),
            t = Math.floor(e % 3600 / 60),
            a = e % 60;
          return `${String(o).padStart(2,"0")}:${String(t).padStart(2,"0")}:${String(a).padStart(2,"0")}`
        }
        e.onUnload(() => {
          clearInterval(I.value)
        });
        const O = e.ref("订单查询");

        function q(e) {
          e > 0 && n.goWmUrl("orderList")
        }

        function V(e) {
          if (A.value) return !1;
          D.forEach(e => {
            e.active = !1
          }), D[e].active = !0, L.value = D[e].value, R()
        }

        function $() {}

        function E(e) {
          R()
        }

        function J() {
          R()
        }

        function R() {
          C.value = [], y.value = 0, F()
        }

        function M() {
          T.value = [], w.value = 1, z()
        }

        function z() {
          e.index.showLoading({
            title: "加载中"
          }), t.api.shopOrderListSearch({
            hotelCode: m.hotelCode,
            hotelGroupCode: m.hotelGroupCode,
            pageNum: w.value,
            pageSize: 100,
            queryWmcShopOrderListParam: {
              keyword: "",
              mobile: f.mobile,
              orderDomains: [1, 2, 3],
              queryTime: {
                endTime: e.dayjs().valueOf(),
                startTime: e.dayjs().subtract(30, "days").valueOf()
              }
            }
          }).then(o => {
            N.value = !0, 1 === o.result && o.retVal.code && 0 === o.retVal.code.errcode && o.retVal.data && o.retVal.data.pageList.length > 0 && (o.retVal.data.pageList.forEach(e => {
              var o;
              (null == (o = e.orderInfo.orderBaseInfo) ? void 0 : o.autoCancelTime) && (e.countDown = e.orderInfo.orderBaseInfo.autoCancelTime / 1e3), e.price = 0, e.orderInfo.payInfo.shouldPayAmount && (e.price = e.orderInfo.payInfo.shouldPayAmount, e.orderInfo.payInfo.payAmount < e.orderInfo.payInfo.shouldPayAmount && (e.needPay = n.subtraction(Number(e.orderInfo.payInfo.shouldPayAmount), Number(e.orderInfo.payInfo.payAmount)), e.webPay = e.orderInfo.payInfo.payAmount)), e.orderStatus = "" + e.orderInfo.orderBaseInfo.orderStatus, 9 === e.orderStatus && (e.invalid = !0), e.orderStaDesc = {
                0: "待付款",
                1: "待付款",
                2: "待发货",
                3: "待发货",
                4: "待发货",
                5: "待收货",
                7: "已完成",
                8: "已完成",
                9: "已取消"
              } [e.orderInfo.orderBaseInfo.orderStatus], e.orderInfo.items.length > 0 && (e.title = e.orderInfo.items[0].goodsTitle, e.link = e.orderInfo.items[0].imageUrl, e.orderTimeStr = e.orderInfo.items[0].skuAttrInfo), ["0", "1"].includes(e.orderStatus) && (e.showPay = !0), ["3", "4", "5"].includes(e.orderStatus) && (e.showAfterSales = !0), ["3", "4", "5"].includes(e.orderStatus) && (e.showConfirm = !0), ["7"].includes(e.orderStatus) && (e.showCommit = !0), ["7", "8"].includes(e.orderStatus), ["7", "8", "9"].includes(e.orderStatus) && (e.showBook = !0)
            }), T.value = T.value.concat(o.retVal.data.pageList), w.value += 1), e.index.hideLoading()
          })
        }

        function U() {
          1 === B.value && R(), 2 === B.value && M()
        }
        return e.onMounted(() => {
          U(), I.value = setInterval((function() {
            C.value.forEach(e => {
              e.countdown > 0 && (e.countTime = _(e.countdown), e.countdown = e.countdown - 1)
            }), T.value.forEach(e => {
              e.countdown > 0 && (e.countTime = _(e.countdown), e.countdown = e.countdown - 1)
            })
          }), 1e3)
        }), e.onPullDownRefresh(() => {
          setTimeout(() => {
            U(), e.index.stopPullDownRefresh()
          }, 1e3)
        }), h(e => {
          p.value = e.scrollTop
        }), e.onReachBottom(() => {
          1 === B.value ? F() : z()
        }), e.onShow(() => {
          1 === B.value && C.value.length > 0 && R(), 2 === B.value && T.value.length > 0 && M()
        }), e.onLoad(e => {
          e.orderType && (B.value = e.orderType || 1), G.forEach(e => {
            e.value === B.value ? e.active = !0 : e.active = !1
          })
        }), (o, t) => {
          var u, i, s;
          return e.e({
            a: e.f(G, (o, t, a) => ({
              a: e.t(o.name),
              b: t,
              c: o.active ? 1 : "",
              d: e.o(e => {
                return t = o, B.value = t.value, G.forEach(e => {
                  e.active = !1
                }), t.active = !0, void U();
                var t
              }, t)
            })),
            b: e.p({
              position: "relative",
              bgColor: "#fff",
              nativeMode: "true"
            }),
            c: 1 === B.value
          }, 1 === B.value ? {
            d: e.o(E),
            e: e.o(J),
            f: e.o($),
            g: e.o(e => o.keyword = e),
            h: e.p({
              placeholder: O.value,
              modelValue: o.keyword
            }),
            i: e.o(V),
            j: e.p({
              switchList: D,
              padding: 16
            })
          } : {}, {
            k: 2 === B.value
          }, 2 === B.value ? {
            l: e.o(o => e.unref(n.goWmUrl)("orderList")),
            m: e.p({
              placeholder: O.value
            }),
            n: e.o(q),
            o: e.p({
              switchList: x,
              padding: 16
            })
          } : {}, {
            p: v.value ? 1 : "",
            q: v.value
          }, (v.value, {}), {
            r: 1 === B.value
          }, 1 === B.value ? e.e({
            s: 0 === C.value.length && !A.value
          }, 0 !== C.value.length || A.value ? {} : {
            t: e.p({
              tips: "暂无订单",
              subTips: "松赞，期待与您相遇。"
            })
          }, {
            v: e.f(C.value, (o, t, u) => e.e({
              a: e.n(o.iconfont),
              b: e.n(o.isNewIconfont ? "st-iconfont" : "iconfont"),
              c: e.t(o.channelDesc),
              d: e.t(o.orderStaDesc),
              e: o.countTime
            }, o.countTime ? {
              f: e.t(o.countTime)
            } : {}, {
              g: o.enhanceSta ? 1 : "",
              h: 9 === o.orderStatus ? 1 : "",
              i: o.link ? e.unref(r.imageMogr2)(o.link, "160x") : "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/defaultImage.png",
              j: e.t(o.title),
              k: o.itineraryDesc
            }, o.itineraryDesc ? {
              l: e.t(o.itineraryDesc)
            } : {}, {
              m: o.activityDate
            }, o.activityDate ? {
              n: e.t(o.activityDate)
            } : {}, {
              o: o.num > 0
            }, o.num > 0 ? {
              p: e.t(o.num)
            } : {}, {
              q: o.couponNo
            }, o.couponNo ? {
              r: e.t(o.couponNo)
            } : {}, {
              s: 5 === o.orderStatus || 4 === o.orderStatus || 2 === o.orderStatus
            }, 5 === o.orderStatus || 4 === o.orderStatus || 2 === o.orderStatus ? {
              t: e.t(e.unref(a.valFormat)(o.rateSum))
            } : e.e({
              v: o.needPay
            }, o.needPay ? e.e({
              w: e.t(e.unref(a.valFormat)(o.price)),
              x: o.webPay > 0
            }, o.webPay > 0 ? {
              y: e.t(e.unref(a.valFormat)(o.needPay))
            } : {}) : {
              z: e.t(e.unref(a.valFormat)(o.price))
            }), {
              A: o.showCancel
            }, o.showCancel ? {
              B: e.o(e => function(e) {
                d.value = e, l.value = !0
              }(o), t)
            } : o.showKf ? {
              D: e.o(e => {
                k.value.showDialog()
              }, t)
            } : o.showInvoice ? {
              F: e.o(t => function(o) {
                e.index.navigateTo({
                  url: `/pagesF/invoice/applyInvoice?orderNo=${o.orderNo}&orderType=${{room:"R",custom:"L",destpack:"L",butcustom:"L",freetravel:"L",themegroup:"L",shop:"S",activity:"A",travelroom:"L"}[o.channel]}&productType=${c.value[o.channel]}`
                })
              }(o), t)
            } : {}, {
              C: o.showKf,
              E: o.showInvoice,
              G: o.showExchange
            }, o.showExchange ? {
              H: e.o(e => j(o), t)
            } : o.showPay ? {
              J: e.o(t => function(o) {
                const t = {
                    room: "hotel",
                    custom: "CUSTOM",
                    destpack: "DestPackage",
                    butcustom: "ButlerCustomized",
                    freetravel: "FreeTravel",
                    themegroup: "ThemeGroup",
                    shop: "shop",
                    activity: "activity",
                    pack: "pack",
                    spa: "spa",
                    travelroom: "SingleRoom"
                  },
                  a = "shop" === o.channel ? o.orderId : o.orderNo;
                if ("freetravel" === o.channel || "themegroup" === o.channel || "destpack" === o.channel || "custom" === o.channel || "butcustom" === o.channel || "travelroom" === o.channel) {
                  let r = `/pagesB/other/pay?orderNo=${a}&productType=${t[o.channel]}`;
                  "T" === o.agency && "F" === o.isAgency && (r += "&contractFlag=1"), o.isNeedAddContact && (r += "&addContactFlag=1"), e.index.navigateTo({
                    url: r
                  })
                } else e.index.navigateTo({
                  url: `/pagesB/other/pay?orderNo=${a}&productType=${t[o.channel]}`
                })
              }(o), t)
            } : !o.showPay && o.isShowAddContactBtn ? {
              L: e.o(e => function(e) {
                let o = "/pagesB/travel/orderGuest?orderNo=" + e.orderNo;
                "T" === e.agency && "F" === e.isAgency && (o += "&contractFlag=1"), n.goPage(o)
              }(o), t)
            } : o.showSign ? {
              N: e.o(t => function(o) {
                n.queryOrderGuestIsAll({
                  unitCode: m.hotelGroupCode,
                  orderNo: o.orderNo
                }, () => {
                  e.index.navigateTo({
                    url: "/pagesB/travel/tips?orderNo=" + o.orderNo
                  })
                })
              }(o), t)
            } : o.showTransfer && !["room", "destpack"].includes(o.channel) ? {
              P: e.o(t => function(o) {
                n.queryOrderGuestIsAll({
                  unitCode: m.hotelGroupCode,
                  orderNo: o.orderNo
                }, () => {
                  e.index.navigateTo({
                    url: "/pagesD/trip/takeInfo?orderNo=" + o.orderNo
                  })
                })
              }(o), t)
            } : {}, {
              I: o.showPay,
              K: !o.showPay && o.isShowAddContactBtn,
              M: o.showSign,
              O: o.showTransfer && !["room", "destpack"].includes(o.channel),
              Q: t,
              R: 5 === o.orderStatus || 4 === o.orderStatus || 2 === o.orderStatus ? 1 : "",
              S: e.o(t => function(o) {
                return "room" === o.channel ? (e.index.navigateTo({
                  url: `/pagesC/order/orderInfo?orderNo=${o.orderNo}&hotelCode=${o.hotelCode}`
                }), !1) : "freetravel" === o.channel || "themegroup" === o.channel || "destpack" === o.channel || "custom" === o.channel || "butcustom" === o.channel || "travelroom" === o.channel ? (e.index.navigateTo({
                  url: "/pagesB/travel/orderDetail?orderNo=" + o.orderNo
                }), !1) : "shop" === o.channel ? (e.index.navigateTo({
                  url: `/pagesB/travel/orderDetail?orderId=${o.orderId}&orderNo=${o.orderNo}&productType=shop`
                }), !1) : "activity" === o.channel ? (e.index.navigateTo({
                  url: `/pagesE/dailyActivity/dailyOrderDetail?orderNo=${o.orderNo}&productType=activity`
                }), !1) : void 0
              }(o), t)
            }))
          }) : {}, {
            w: 2 === B.value
          }, 2 === B.value ? e.e({
            x: 0 === T.value.length && N.value
          }, 0 === T.value.length && N.value ? {
            y: e.p({
              tips: "暂无订单",
              subTips: "松赞，期待与您相遇。"
            })
          } : {}, {
            z: e.f(T.value, (o, t, r) => e.e({
              a: e.t(o.orderStaDesc),
              b: o.countTime
            }, o.countTime ? {
              c: e.t(o.countTime)
            } : {}, {
              d: o.enhanceSta ? 1 : "",
              e: o.link ? o.link : "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/defaultImage.png",
              f: e.t(o.title),
              g: e.t(o.orderTimeStr),
              h: o.couponNo
            }, o.couponNo ? {
              i: e.t(o.couponNo)
            } : {}, {
              j: e.t(e.unref(a.valFormat)(o.price)),
              k: o.showAfterSales
            }, (o.showAfterSales, {}), {
              l: o.showConfirm
            }, (o.showConfirm, {}), {
              m: o.showBook
            }, (o.showBook, {}), {
              n: o.showInvoice
            }, (o.showInvoice, {}), {
              o: o.showCommit
            }, (o.showCommit, {}), {
              p: o.showPay
            }, (o.showPay, {}), {
              q: t,
              r: o.invalid ? 1 : "",
              s: e.o(o => e.unref(n.goWmUrl)("orderList"), t)
            }))
          }) : {}, {
            A: e.sr(k, "03807442-7", {
              k: "kf"
            }),
            B: e.p({
              title: "一键咨询"
            }),
            C: e.sr(P, "03807442-8", {
              k: "exchange"
            }),
            D: e.p({
              orderId: b.value
            }),
            E: !l.value,
            F: e.o(e => l.value = e),
            G: e.p({
              orderNo: null == (u = d.value) ? void 0 : u.orderNo,
              orderId: null == (i = d.value) ? void 0 : i.orderId,
              productType: c.value[null == (s = d.value) ? void 0 : s.channel],
              show: l.value
            })
          })
        }
      }
    });
  v.__runtimeHooks = 1;
  const m = e._export_sfc(v, [
    ["__scopeId", "data-v-03807442"]
  ]);
  wx.createPage(m)
}();