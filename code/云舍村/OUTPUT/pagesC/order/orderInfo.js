! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../base/jAlert/jAlert.js"),
    l = require("../../utils/api.js"),
    t = require("../../utils/filter.js"),
    u = require("../../utils/utils.js"),
    o = require("../../utils/wxuser.js");
  Array || e.resolveComponent("mp-html")(), Math || (v + m + (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js") + r + n + s)();
  const r = () => "../../components/bottomDialog.js",
    v = () => "../../components/coustomHead.js",
    n = () => "../../components/kfDialog.js",
    m = () => "../../components/linkItem.js",
    s = () => "../../components/order/OrderCancelDialog.js",
    d = e.defineComponent({
      __name: "orderInfo",
      setup(r) {
        const v = o.getStorage("user"),
          n = o.getStorage("config"),
          m = e.ref(""),
          s = e.ref({}),
          d = e.ref({}),
          i = e.ref(""),
          c = e.ref("F"),
          p = e.ref(),
          f = e.ref(),
          h = e.ref(),
          S = e.ref("NI"),
          y = e.ref("60"),
          g = e.ref(""),
          C = e.reactive({
            "01": "身份证",
            "02": "临时身份证",
            14: "护照",
            21: "港澳通行证"
          }),
          D = e.ref(!1),
          R = e.ref([]),
          T = e.ref({}),
          b = e.ref({}),
          I = e.ref(0),
          F = e.ref(0),
          N = e.ref(0),
          A = e.ref(0),
          G = e.ref(0),
          L = e.ref(0),
          j = e.ref(0),
          P = e.ref(0),
          x = e.ref(0),
          w = e.ref(0),
          V = e.ref(0),
          M = e.ref(0),
          H = e.ref(""),
          _ = e.ref(null);

        function k(e) {
          const a = Math.floor(e / 3600),
            l = Math.floor(e % 3600 / 60),
            t = e % 60;
          return `剩余${String(a).padStart(2,"0")}小时${String(l).padStart(2,"0")}分${String(t).padStart(2,"0")}秒`
        }

        function q() {
          "CI" === S.value ? e.index.navigateTo({
            url: `/pagesF/invoice/applyInvoice?orderNo=${m.value}&orderType=R&productType=hotel`
          }) : e.index.navigateTo({
            url: `/pagesF/invoice/invoiceDetails?orderNo=${m.value}&orderType=R&productType=hotel`
          })
        }

        function O() {
          D.value = !0
        }

        function X() {
          e.index.redirectTo({
            url: `/pagesB/other/pay?orderNo=${s.value.crsNo}&productType=hotel`
          })
        }
        e.ref();
        const $ = e.reactive([{
          name: "预订政策",
          type: "dialog"
        }]);

        function B(e) {
          "dialog" === e.type && f.value.showDialog()
        }

        function E() {
          p.value.showDialog()
        }
        e.onPageScroll(e => {});
        const U = e.computed(() => {
            const e = new Date(s.value.arr.replace(/-/g, "/")).getTime();
            let a = new Date(s.value.dep.replace(/-/g, "/")).getTime() - e;
            return a = Math.round(a / 864e5), a
          }),
          z = e.computed(() => {
            let e = "",
              a = "";
            return "R" === s.value.sta && "2" !== b.value.paySta && (e = "待付款", a = "请尽快完成支付。"), "R" === s.value.sta && "2" === b.value.paySta && (e = "待出行", a = "松赞期待与您相遇。"), "I" === s.value.sta && (e = "出行中", a = "松赞祝您旅途愉快。"), "O" === s.value.sta && (e = "已完成", a = "松赞感谢您的支持。"), "X" === s.value.sta && (e = "已取消", a = "松赞期待与您相遇。"), "N" === s.value.sta && (e = "预订未到店", a = "松赞期待与您相遇。"), "S" === s.value.sta && (e = "已挂账", a = "松赞期待与您相遇。"), "W" === s.value.sta && (e = "待处理", a = "松赞期待与您相遇。"), {
              topSta: e,
              subSta: a
            }
          });

        function W() {
          l.api.showOrder({
            orderNo: m.value,
            hotelGroupCode: n.hotelGroupCode
          }).then(e => {
            1 === e.result ? (s.value = e.retVal, i.value = s.value.hotelCode, "000" !== s.value.memberLevel && v && v.memberId && l.api.getAllCardLevel({
              isPhysical: "F",
              hotelGroupId: n.hotelGroupId,
              hotelGroupCode: n.hotelGroupCode,
              cardType: s.value.cardType
            }).then(e => {
              1 === e.result && e.retVal.listLevelDto && e.retVal.listLevelDto.length > 0 && e.retVal.listLevelDto.forEach(e => {
                e.code === s.value.cardLevel && (g.value = `已享受${e.descript}会员价`)
              })
            }), l.api.hotelInfo({
              channel: "wechat",
              hotelCode: i.value,
              hotelGroupCode: s.value.hotelGroupCode || n.hotelGroupCode
            }).then(e => {
              1 === e.result ? d.value = e.retVal : a.jAlert3(e.msg)
            }), function() {
              const e = {
                gcRsvNo: s.value.crsNo,
                hotelGroupCode: s.value.hotelGroupCode || n.hotelGroupCode,
                miniAppid: n.appid,
                miniHotelCode: 0,
                productHotelCode: s.value.hotelCode,
                productCode: s.value.productCode
              };
              l.api.getCancelRule(u.createUrl(e)).then(e => {
                1 === e.result && (h.value = e.retVal.cancelRule), console.log(e)
              })
            }(), l.api.getOrderInvoiceSta({
              hotelCode: s.value.hotelCode,
              hotelGroupCode: n.hotelGroupCode,
              orderNo: s.value.crsNo,
              orderType: "R"
            }).then(e => {
              1 === e.result && (S.value = e.retVal.invoiceSta, "HI" === S.value && l.api.getInvoiceOrder({
                hotelCode: s.value.hotelCode,
                hotelGroupCode: n.hotelGroupCode,
                orderNo: m.value,
                orderType: "R"
              }).then(e => {
                1 === e.result && 0 === e.retVal.resultCode && (T.value = e.retVal.orderInvoice, T.value.eiinvoicePdfUrl && R.value.push({
                  name: "发票",
                  url: T.value.eiinvoicePdfUrl
                })), console.log(e)
              }))
            }), s.value.leftTimeSeconds && "2" !== b.value.paySta && "R" === s.value.sta && (H.value = k(s.value.leftTimeSeconds), _.value = setInterval(() => {
              s.value.leftTimeSeconds > 0 ? (s.value.leftTimeSeconds--, H.value = k(s.value.leftTimeSeconds)) : (H.value = "", clearInterval(_.value))
            }, 1e3))) : a.jAlert3(e.msg)
          })
        }
        return e.onUnload(() => {
          clearInterval(_.value)
        }), e.onLoad(e => {
          m.value = e.orderNo
        }), e.onShow(() => {
          clearInterval(_.value), e.index.getSystemInfo({
              success: e => {
                y.value = e.statusBarHeight + 60
              },
              fail(e) {
                console.log(e)
              }
            }), R.value = [], W(),
            function() {
              const e = {
                unitCode: n.hotelGroupCode,
                orderNo: m.value,
                memberId: v.memberId
              };
              l.api.interfaceTransfer({
                query: e,
                config: {
                  interfaceType: "POST",
                  interfaceModule: "GC_TRAVEL_ORDER",
                  interfaceMethod: "/api/reserve/order/queryPayDetail",
                  interfaceFrom: "GC",
                  hotelGroupCode: n.hotelGroupCode
                }
              }).then(e => {
                var a;
                1 === e.result && 0 === e.retVal.result && (b.value = e.retVal.retVal, F.value = b.value.rateSum, N.value = b.value.couponRateSum || 0, b.value.travelRateSumDto && b.value.travelRateSumDto.singleRoomRateSum && (G.value = b.value.travelRateSumDto.singleRoomRateSum), b.value.travelRateSumDto && b.value.travelRateSumDto.addBedSum && (L.value = b.value.travelRateSumDto.addBedSum), b.value.travelRateSumDto && b.value.travelRateSumDto.addBfSum && (j.value = b.value.travelRateSumDto.addBfSum), b.value.travelRateSumDto && b.value.travelRateSumDto.upRmTypeSum && (P.value = b.value.travelRateSumDto.upRmTypeSum), b.value && b.value.exchangeRateSum && (V.value = b.value.exchangeRateSum), b.value && b.value.point && (M.value = b.value.point), b.value.memberDscAmount = b.value.memberDscAmount || 0, b.value.memberLevelDesc = `${b.value.memberLevelDesc}会员${a=10*b.value.memberDiscount,Number(Number(a).toFixed(2))}折`, x.value = b.value.breakMoney, A.value = b.value.gwDiscount, w.value = Number((F.value - b.value.memberDscAmount - N.value - A.value - b.value.point).toFixed(2)), I.value = F.value - G.value - j.value - L.value - P.value, b.value.allRateSum = Number((b.value.memberDscAmount + b.value.gwDiscount + +b.value.point).toFixed(2)))
              })
            }()
        }), (l, o) => {
          return e.e({
            a: s.value && s.value.hotelCode
          }, s.value && s.value.hotelCode ? e.e({
            b: e.p({
              color: "#fff",
              title: "订单详情",
              customClass: "X" === s.value.sta ? "" : "customPattern",
              bgColor: "X" === s.value.sta ? "#7f7d75" : ""
            }),
            c: e.t(z.value.topSta),
            d: e.t(H.value ? H.value : z.value.subSta),
            e: "X" === s.value.sta ? 1 : "",
            f: y.value + "px",
            g: s.value.logoUrl ? s.value.logoUrl : "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/defaultImage.png",
            h: e.t(s.value.hotelDescript),
            i: e.t(s.value.roomDescript),
            j: e.t(e.unref(t.timeFilterMD)(s.value.arr)),
            k: e.t(e.unref(t.timeFilterMD)(s.value.dep)),
            l: e.t(U.value),
            m: e.t(s.value.rmnum),
            n: e.f(s.value.guestList, (a, l, u) => ({
              a: e.t(0 === l ? "入住人" : ""),
              b: e.t(a.name),
              c: e.t(C[a.idCode]),
              d: e.t(e.unref(t.hideIdCard)(a.idNo, a.idCode)),
              e: e.t(a.mobile),
              f: l
            })),
            o: e.t((r = s.value.arrStr, e.dayjs(r).format("HH:mm"))),
            p: "T" !== c.value
          }, "T" !== c.value ? {
            q: e.t(e.unref(t.valFormat)(F.value))
          } : {}, {
            r: "T" === c.value
          }, "T" === c.value ? e.e({
            s: e.t(e.unref(t.valFormat)(F.value)),
            t: "CASH" === b.value.payType
          }, ("CASH" === b.value.payType || "INTEGRALCASH" === b.value.payType || b.value.payType, {}), {
            v: "INTEGRALCASH" === b.value.payType,
            w: "INTEGRAL" === b.value.payType,
            x: F.value > 0
          }, F.value > 0 ? {
            y: e.t(e.unref(t.valFormat)(I.value))
          } : {}, {
            z: G.value > 0
          }, G.value > 0 ? {
            A: e.t(G.value)
          } : {}, {
            B: L.value > 0
          }, L.value > 0 ? {
            C: e.t(L.value)
          } : {}, {
            D: j.value > 0
          }, j.value > 0 ? {
            E: e.t(e.unref(t.valFormat)(j.value))
          } : {}, {
            F: P.value > 0
          }, P.value > 0 ? {
            G: e.t(e.unref(t.valFormat)(P.value))
          } : {}, {
            H: b.value.couponRateSum > 0
          }, b.value.couponRateSum > 0 ? e.e({
            I: e.t(e.unref(t.valFormat)(b.value.couponRateSum)),
            J: b.value.couponSimpleInfoDtoList && b.value.couponSimpleInfoDtoList.length > 0
          }, b.value.couponSimpleInfoDtoList && b.value.couponSimpleInfoDtoList.length > 0 ? {
            K: e.f(b.value.couponSimpleInfoDtoList, (a, l, u) => e.e({
              a: e.t(a.descript),
              b: a.num > 1
            }, a.num > 1 ? {
              c: e.t(a.num)
            } : {}, {
              d: e.t(e.unref(t.valFormat)(a.realValue)),
              e: l
            }))
          } : {}) : {}, {
            L: b.value.allRateSum > 0
          }, b.value.allRateSum > 0 ? e.e({
            M: e.t(e.unref(t.valFormat)(b.value.allRateSum)),
            N: b.value.point
          }, b.value.point ? {
            O: e.t(e.unref(t.valFormat)(b.value.point))
          } : {}, {
            P: b.value.memberDscAmount
          }, b.value.memberDscAmount ? {
            Q: e.t(b.value.memberLevelDesc),
            R: e.t(e.unref(t.valFormat)(b.value.memberDscAmount))
          } : {}, {
            S: A.value > 0
          }, A.value > 0 ? {
            T: e.t(e.unref(t.valFormat)(A.value))
          } : {}) : {}, {
            U: e.t(e.unref(t.valFormat)(w.value)),
            V: b.value.alreadyPayFund + b.value.alreadyPayMember > 0
          }, b.value.alreadyPayFund + b.value.alreadyPayMember > 0 ? {
            W: e.t(e.unref(t.valFormat)(b.value.alreadyPayFund + b.value.alreadyPayMember))
          } : {}, {
            X: "2" !== b.value.paySta && b.value.readyPay > 0 && "X" !== s.value.sta
          }, "2" !== b.value.paySta && b.value.readyPay > 0 && "X" !== s.value.sta ? {
            Y: e.t(e.unref(t.valFormat)(b.value.readyPay))
          } : {}, {
            Z: x.value
          }, x.value ? {
            aa: e.t(e.unref(t.valFormat)(x.value)),
            ab: e.t(e.unref(t.valFormat)(x.value))
          } : {}) : {}, {
            ac: "F" === c.value
          }, "F" === c.value ? {
            ad: e.o(e => c.value = "T")
          } : {
            ae: e.o(e => c.value = "F")
          }, {
            af: e.t(s.value.crsNo),
            ag: e.o(l => function(l) {
              e.index.setClipboardData({
                data: l,
                success() {
                  a.jAlert3("复制成功")
                }
              })
            }(s.value.crsNo)),
            ah: e.t(s.value.createDatetime),
            ai: e.t(s.value.crsPayDatetime),
            aj: e.t(s.value.rsvMan),
            ak: e.t(s.value.mobile),
            al: R.value.length > 0
          }, R.value.length > 0 ? {
            am: e.f(R.value, (a, l, t) => ({
              a: e.t(a.name),
              b: l,
              c: e.o(l => e.unref(u.goPage)(a.url), l)
            }))
          } : {}, {
            an: e.f($, (a, l, t) => ({
              a: l,
              b: e.o(B, l),
              c: "1e8cdee1-1-" + t,
              d: e.p({
                linkItem: a
              })
            })),
            ao: "R" === s.value.sta
          }, "R" === s.value.sta ? e.e({
            ap: e.o(O),
            aq: "2" !== b.value.paySta
          }, "2" !== b.value.paySta ? {
            ar: e.o(X)
          } : {}) : {}, {
            as: "X" === s.value.sta
          }, "X" === s.value.sta ? {
            at: e.o(E)
          } : {}, {
            av: "O" === s.value.sta
          }, "O" === s.value.sta ? e.e({
            aw: e.o(E),
            ax: "NI" !== S.value
          }, "NI" !== S.value ? {
            ay: e.o(q)
          } : {}) : {}, {
            az: e.p({
              content: h.value
            }),
            aA: e.sr(f, "1e8cdee1-2", {
              k: "ruleCompent"
            }),
            aB: e.p({
              title: "预订政策"
            }),
            aC: e.sr(p, "1e8cdee1-4", {
              k: "kf"
            }),
            aD: e.p({
              title: "如需取消订单请联系客服"
            }),
            aE: e.o(e => D.value = e),
            aF: e.p({
              orderNo: m.value,
              productType: "hotel",
              show: D.value
            })
          }) : {});
          var r
        }
      }
    });
  d.__runtimeHooks = 1;
  const i = e._export_sfc(d, [
    ["__scopeId", "data-v-1e8cdee1"]
  ]);
  wx.createPage(i)
}();