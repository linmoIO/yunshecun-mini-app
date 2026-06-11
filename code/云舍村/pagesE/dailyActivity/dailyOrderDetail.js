! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../base/channel.js"),
    t = require("../../base/jAlert/jAlert.js"),
    u = require("../../utils/api.js"),
    l = require("../../utils/filter.js"),
    v = require("../../utils/utils.js"),
    r = require("../../utils/wxuser.js");
  Math || (o + n + i)();
  const o = () => "../../components/coustomHead.js",
    n = () => "../../components/kfDialog.js",
    i = () => "../../components/order/OrderCancelDialog.js",
    c = e.defineComponent({
      __name: "dailyOrderDetail",
      setup(o) {
        let n = r.getStorage("user"),
          i = r.getStorage("config");
        const c = e.ref(!1),
          p = e.ref(""),
          m = e.ref(),
          s = e.ref("60"),
          d = e.ref(""),
          f = e.ref({}),
          y = e.ref({
            activityInfo: {}
          });
        let b = e.ref(a.defaultActivityChannel);
        const h = e.ref([]),
          S = e.ref("F"),
          C = e.ref("F"),
          D = e.ref(""),
          T = e.ref(null);
        e.ref({}), e.ref(0), e.ref(0);
        const g = e.ref({}),
          F = e.ref(!1),
          I = e.ref({});
        let P = e.ref({});
        e.ref(""), e.ref([]);
        const x = e.ref([]);
        let N = e.ref([]),
          R = e.ref({}),
          A = e.ref("NI");
        e.ref(""), e.ref();
        let L = e.reactive({
          "01": "身份证",
          "02": "临时身份证",
          14: "护照",
          21: "港澳通行证"
        });
        const G = [{
          name: "已下单",
          val: "R"
        }, {
          name: "待使用",
          val: "RW",
          desc: "云舍村期待与您相遇。"
        }, {
          name: "待签约",
          val: "DQY"
        }, {
          name: "待使用",
          val: "RD",
          desc: "云舍村期待与您相遇。"
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
          desc: "云舍村祝您旅途愉快。"
        }, {
          name: "已完成",
          val: "O",
          desc: "云舍村感谢您的支持。"
        }, {
          name: "已取消",
          val: "X",
          desc: "云舍村期待与您相遇。"
        }, {
          name: "已退款",
          val: "YTK",
          desc: "云舍村祝您旅途愉快。"
        }, {
          name: "待使用",
          val: "3",
          desc: "云舍村祝您旅途愉快。"
        }];

        function E() {
          "CI" == A.value ? e.index.navigateTo({
            url: `/pagesF/invoice/applyInvoice?orderNo=${p.value}&orderType=A&productType=activity`
          }) : "HI" == A.value && e.index.navigateTo({
            url: `/pagesF/invoice/invoiceDetails?orderNo=${p.value}&orderType=A&productType=activity`
          })
        }

        function V() {
          m.value.showDialog()
        }

        function K() {
          c.value = !0
        }

        function H(a) {
          e.index.setClipboardData({
            data: a,
            success() {
              t.jAlert3("复制成功")
            }
          })
        }

        function M(e) {
          if (e) return function(e, a, t) {
            let u = e.length;
            if (u < 6 || u < t) return e;
            let l = e.substring(0, 6),
              v = e.substring(t, u);
            e = "";
            let r = 0;
            try {
              for (r = 0; r < t - 6; r++) e += "*"
            } catch (e) {}
            return l + e + v
          }(e, 0, e.length - 2)
        }
        return e.onPageScroll(e => {}), e.onUnload(() => {
          clearInterval(T.value)
        }), e.onLoad(e => {
          p.value = e.orderNo, e.productType && (d.value = e.productType)
        }), e.onMounted(() => {
          e.index.getSystemInfo({
            success: e => {
              s.value = e.statusBarHeight + 60
            },
            fail(e) {
              console.log(e)
            }
          }), u.api.getPayDetail({
            memberNo: n.memberId,
            hotelGroupCode: i.hotelGroupCode,
            hotelCode: i.hotelCode,
            actRsvNo: p.value,
            memberToken: n.memberToken
          }).then(e => {
            if (1 == e.result) {
              g.value = e.retVal;
              let a = e.retVal.couponName ? e.retVal.couponName.split(",") : [],
                t = e.retVal.couponNo ? e.retVal.couponNo.split(",") : [],
                u = e.retVal.couponDisPriceStr ? e.retVal.couponDisPriceStr.split(",") : [],
                l = [];
              a.map((e, a) => {
                let v = {
                  couponName: e,
                  couponNo: t[a],
                  couponDisPriceStr: u[a]
                };
                l.push(v)
              }), x.value = l, F.value = !!e.retVal.payTypes.includes("chuzhi")
            }
          }), e.index.showLoading({
            title: "加载中..."
          }), u.api.activityOrder({
            memberNo: n.memberId,
            hotelGroupCode: i.hotelGroupCode,
            hotelCode: i.hotelCode,
            actRsvNo: p.value,
            memberToken: n.memberToken
          }).then(a => {
            var t;
            1 == a.result && (f.value = a.retVal, y.value = a.retVal, I.value = a.retVal.aggregationOrder, a.retVal.verifyList.map(e => {
              e.couponNo = e.verifyCode, e.couponSta = e.verifySta
            }), h.value = a.retVal.verifyList, 2 == I.value.payStatus && 1 == I.value.orderStatus ? y.value.sta = "DFK" : "T" == y.value.agency && "R" == y.value.sta && "F" == y.value.isAgency ? y.value.sta = "DQY" : "1" != y.value.paySta && "8" != y.value.paySta || "R" != y.value.sta && "W" != y.value.sta ? "2" != y.value.paySta || "R" != y.value.sta && "W" != y.value.sta ? "4" == y.value.paySta ? y.value.sta = "DTK" : "5" == y.value.paySta ? y.value.sta = "YTK" : "7" == y.value.paySta && (y.value.sta = "YTZ") : y.value.sta = "RW" : y.value.sta = "DFK", "DQY" != y.value.sta && "DFK" != y.value.sta || "8" != y.value.paySta && y.value.leftTimeSeconds && (T.value = setInterval(() => {
              y.value.leftTimeSeconds > 0 ? (y.value.leftTimeSeconds--, D.value = function(e) {
                const a = Math.floor(e / 3600),
                  t = Math.floor(e % 3600 / 60),
                  u = e % 60;
                return `${String(a).padStart(2,"0")}小时${String(t).padStart(2,"0")}分${String(u).padStart(2,"0")}秒`
              }(y.value.leftTimeSeconds)) : (clearInterval(T.value), y.value.sta = "X")
            }, 1e3)), y.value.indexPicture = y.value.activityInfo.indexPicture, y.value.bizDatetimeF = e.dayjs(y.value.bizDatetime).format("YYYY.MM.DD"), t = y.value, u.api.interfaceTransfer({
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_ACTIVITIES_CENTER",
                interfaceMethod: "api/activity/getOneActivityIntroduce",
                interfaceFrom: "GC",
                hotelGroupCode: i.hotelGroupCode
              },
              query: {
                unitCode: i.hotelGroupCode,
                activityCode: t.activityInfo.activityCode,
                activityName: t.activityInfo.name
              }
            }).then(e => {
              1 == e.result && 0 == e.retVal.result && (P.value = e.retVal.retVal)
            }))
          }).finally(() => {
            e.index.hideLoading(),
              function() {
                let e = {
                  unitCode: i.hotelGroupCode,
                  otaChannel: b.value,
                  ota: "DIRECT",
                  isGroup: "T",
                  payType: y.value.payType,
                  orderNo: p.value,
                  cardLevel: n.cardLevel,
                  cardType: n.cardType,
                  memberId: n.memberId
                };
                u.api.interfaceTransfer({
                  query: e,
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "GC_TRAVEL_ORDER",
                    interfaceMethod: "/api/reserve/order/queryPayDetail",
                    interfaceFrom: "GC",
                    hotelGroupCode: i.hotelGroupCode
                  }
                }).then(e => {
                  1 == e.result && 0 == e.retVal.result && (g.value = e.retVal.retVal, g.value.activityRateSumDto && (g.value = Object.assign(g.value, g.value.activityRateSumDto)), g.value.needPay = Number((g.value.rateSum - g.value.memberDscAmount - g.value.couponRateSum - g.value.exchangeRateSum - g.value.gwDiscount).toFixed(2)), g.value.aleadyPayPrice = Number((g.value.alreadyPayFund + g.value.alreadyPayMember + g.value.alreadyPayOther).toFixed(2)), console.log(g.value.aleadyPayPrice, " payData.value.aleadyPayPrice-------"), g.value.allRateSum = Number((g.value.memberDscAmount + g.value.couponRateSum + g.value.gwDiscount).toFixed(2)), g.value.couponSimpleInfoDtoList && g.value.couponSimpleInfoDtoList.length > 0 && (g.value.couponDesc = "", g.value.couponSimpleInfoDtoList.forEach((e, a) => {
                    a == g.value.couponSimpleInfoDtoList.length - 1 ? e.num > 1 ? g.value.couponDesc += `${e.descript} x${e.num}` : g.value.couponDesc += "" + e.descript : e.num > 1 ? g.value.couponDesc += `${e.descript} x${e.num};` : g.value.couponDesc += e.descript + ";"
                  })))
                })
              }()
          }), u.api.getOrderInvoiceSta({
            hotelCode: i.hotelCode,
            hotelGroupCode: i.hotelGroupCode,
            orderNo: p.value,
            orderType: "A"
          }).then(e => {
            1 == e.result && (A.value = e.retVal.invoiceSta, "HI" == A.value && u.api.getInvoiceOrder({
              hotelCode: i.hotelCode,
              hotelGroupCode: i.hotelGroupCode,
              orderNo: p.value,
              orderType: "A"
            }).then(e => {
              1 == e.result && 0 == e.retVal.resultCode && (R.value = e.retVal.orderInvoice, R.value.eiinvoicePdfUrl && N.value.push({
                name: "发票",
                url: R.value.eiinvoicePdfUrl
              })), console.log(e)
            }))
          })
        }), (a, t) => e.e({
          a: e.p({
            color: "#fff",
            title: "订单详情",
            customClass: "X" == y.value.sta ? "" : "customPattern",
            bgColor: "X" == y.value.sta ? "#7f7d75" : ""
          }),
          b: e.f(G, (a, t, u) => e.e({
            a: a.val == y.value.sta
          }, a.val == y.value.sta ? e.e({
            b: e.t(a.name),
            c: "DFK" == y.value.sta && "8" != y.value.paySta
          }, "DFK" == y.value.sta && "8" != y.value.paySta ? e.e({
            d: D.value
          }, D.value ? {
            e: e.t(D.value)
          } : {}) : {
            f: e.t(a.desc)
          }, {
            g: "X" == y.value.sta ? 1 : "",
            h: s.value + "px"
          }) : {}, {
            i: t
          })),
          c: y.value.indexPicture,
          d: e.t(y.value.activityInfo.name),
          e: y.value.activityInfo.minCapacity || y.value.activityInfo.maxCapacity
        }, y.value.activityInfo.minCapacity || y.value.activityInfo.maxCapacity ? e.e({
          f: e.t(y.value.activityInfo.minCapacity),
          g: y.value.activityInfo.minCapacity && y.value.activityInfo.maxCapacity
        }, (y.value.activityInfo.minCapacity && y.value.activityInfo.maxCapacity, {}), {
          h: e.t(y.value.activityInfo.maxCapacity),
          i: "CHILD" == y.value.activityInfo.adapterPeople
        }, (y.value.activityInfo.adapterPeople, {}), {
          j: "ADULT" == y.value.activityInfo.adapterPeople
        }, (y.value.activityInfo.adapterPeople, {}), {
          k: "ALL" == y.value.activityInfo.adapterPeople
        }, (y.value.activityInfo.adapterPeople, {})) : {}, {
          l: e.t(y.value.bizDatetimeF),
          m: e.t(y.value.activityInfo.activityBegin),
          n: e.t(y.value.activityInfo.activityEnd),
          o: e.o(a => {
            return t = y.value.activityInfo, void e.index.navigateTo({
              url: "/pagesE/dailyActivity/dailyActivityDetail?activityCode=" + t.activityCode
            });
            var t
          }),
          p: "X" == y.value.sta
        }, (y.value.sta, {}), {
          q: h.value.length > 0
        }, h.value.length > 0 ? {
          r: e.f(h.value, (a, t, u) => e.e(h.value.length > 1 ? {
            a: e.t(Number(t) + 1)
          } : {}, {
            b: e.t(a.couponNo),
            c: "WAIT" == a.couponSta
          }, "WAIT" == a.couponSta ? {
            d: e.o(e => H(a.couponNo), t)
          } : ("USED" == a.couponSta || a.couponSta, {}), {
            e: "USED" == a.couponSta,
            f: "OUTDATE" == a.couponSta,
            g: "WAIT" != a.couponSta ? 1 : "",
            h: t
          })),
          s: h.value.length > 1
        } : {}, {
          t: e.unref(P).activityCode
        }, e.unref(P).activityCode ? {
          v: e.unref(P).priceExplain,
          w: e.unref(P).extraTips,
          x: e.unref(P).resrvNotice
        } : {}, {
          y: "T" == S.value ? 1 : "",
          z: "F" == S.value && (e.unref(P).priceExplain || e.unref(P).extraTips || e.unref(P).resrvNotice)
        }, "F" == S.value && (e.unref(P).priceExplain || e.unref(P).extraTips || e.unref(P).resrvNotice) ? {
          A: e.o(e => S.value = "T")
        } : e.unref(P).priceExplain || e.unref(P).extraTips || e.unref(P).resrvNotice ? {
          C: e.o(e => S.value = "F")
        } : {}, {
          B: e.unref(P).priceExplain || e.unref(P).extraTips || e.unref(P).resrvNotice,
          D: y.value.adult || y.value.bigChildren || y.value.children || y.value.baby
        }, y.value.adult || y.value.bigChildren || y.value.children || y.value.baby ? {
          E: e.t(y.value.adult + y.value.bigChildren + y.value.children + y.value.baby)
        } : {}, {
          F: e.f(y.value.guestInfo, (a, t, u) => ({
            a: e.t(a.name),
            b: e.t(e.unref(L)[a.licenseType || "01"]),
            c: e.t(M(a.license)),
            d: e.t(a.phone),
            e: t
          })),
          G: y.value.remark
        }, y.value.remark ? {
          H: e.t(y.value.remark)
        } : {}, {
          I: "T" != C.value
        }, "T" != C.value ? e.e({
          J: g.value.rateSum || !g.value.point
        }, g.value.rateSum || !g.value.point ? {
          K: e.t(g.value.exchangeRateSum ? e.unref(l.valFormat)(g.value.rateSum - g.value.exchangeRateSum) : e.unref(l.valFormat)(g.value.rateSum))
        } : {}, {
          L: g.value.rateSum && g.value.point
        }, (g.value.rateSum && g.value.point, {}), {
          M: g.value.point
        }, g.value.point ? {
          N: e.t(e.unref(l.valFormat)(g.value.point))
        } : {}, {
          O: "CASH" == g.value.payType
        }, ("CASH" == g.value.payType || "INTEGRALCASH" == g.value.payType || g.value.payType, {}), {
          P: "INTEGRALCASH" == g.value.payType,
          Q: "INTEGRAL" == g.value.payType
        }) : {}, {
          R: "T" == C.value
        }, "T" == C.value ? e.e({
          S: "SINGLE" == g.value.priceType
        }, "SINGLE" == g.value.priceType ? e.e({
          T: g.value.rateSum || !g.value.point
        }, g.value.rateSum || !g.value.point ? {
          U: e.t(g.value.exchangeRateSum ? e.unref(l.valFormat)(g.value.rateSum - g.value.exchangeRateSum) : e.unref(l.valFormat)(g.value.rateSum))
        } : {}, {
          V: g.value.rateSum && g.value.point
        }, (g.value.rateSum && g.value.point, {}), {
          W: g.value.point
        }, g.value.point ? {
          X: e.t(e.unref(l.valFormat)(g.value.point))
        } : {}, {
          Y: "CASH" == y.value.payType
        }, ("CASH" == y.value.payType || "INTEGRALCASH" == y.value.payType || y.value.payType, {}), {
          Z: "INTEGRALCASH" == y.value.payType,
          aa: "INTEGRAL" == y.value.payType,
          ab: g.value.point
        }, g.value.point ? {
          ac: e.t(g.value.exchangeRateSum ? e.unref(l.valFormat)(g.value.rateSum - g.value.exchangeRateSum) : e.unref(l.valFormat)(g.value.rateSum)),
          ad: e.t(e.unref(l.valFormat)(g.value.point))
        } : {
          ae: e.t(e.unref(l.valFormat)(g.value.rateSum))
        }, {
          af: g.value.point
        }, g.value.point ? {
          ag: e.t(g.value.exchangeRateSum ? e.unref(l.valFormat)(g.value.priceCache - g.value.exchangeRateSum / (g.value.adult + g.value.bigChildren + g.value.children + g.value.baby)) : e.unref(l.valFormat)(g.value.priceCache)),
          ah: e.t(e.unref(l.valFormat)(g.value.point) / (g.value.adult + g.value.bigChildren + g.value.children + g.value.baby)),
          ai: e.t(g.value.adult + g.value.bigChildren + g.value.children + g.value.baby)
        } : {
          aj: e.t(e.unref(l.valFormat)(g.value.priceCache)),
          ak: e.t(g.value.adult + g.value.bigChildren + g.value.children + g.value.baby)
        }, {
          al: g.value.allRateSum
        }, g.value.allRateSum ? e.e({
          am: e.t(e.unref(l.valFormat)(g.value.allRateSum)),
          an: g.value.memberDscAmount
        }, g.value.memberDscAmount ? e.e({
          ao: e.t(g.value.memberLevelDesc),
          ap: g.value.memberDiscount
        }, g.value.memberDiscount ? {
          aq: e.t(Number(10 * g.value.memberDiscount).toFixed(1))
        } : {}, {
          ar: e.t(e.unref(l.valFormat)(g.value.memberDscAmount))
        }) : {}, {
          as: g.value.couponDesc
        }, g.value.couponDesc ? {
          at: e.t(g.value.couponDesc),
          av: e.t(e.unref(l.valFormat)(g.value.couponRateSum))
        } : {}, {
          aw: g.value.gwDiscount
        }, g.value.gwDiscount ? {
          ax: e.t(e.unref(l.valFormat)(g.value.gwDiscount))
        } : {}) : {}) : e.e({
          ay: g.value.rateSum || !g.value.point
        }, g.value.rateSum || !g.value.point ? {
          az: e.t(g.value.exchangeRateSum ? e.unref(l.valFormat)(g.value.rateSum - g.value.exchangeRateSum) : e.unref(l.valFormat)(g.value.rateSum))
        } : {}, {
          aA: g.value.rateSum && g.value.point
        }, (g.value.rateSum && g.value.point, {}), {
          aB: g.value.point
        }, g.value.point ? {
          aC: e.t(e.unref(l.valFormat)(g.value.point))
        } : {}, {
          aD: "CASH" == y.value.payType
        }, ("CASH" == y.value.payType || "INTEGRALCASH" == y.value.payType || y.value.payType, {}), {
          aE: "INTEGRALCASH" == y.value.payType,
          aF: "INTEGRAL" == y.value.payType,
          aG: g.value.point
        }, g.value.point ? {
          aH: e.t(g.value.exchangeRateSum ? e.unref(l.valFormat)(g.value.rateSum - g.value.exchangeRateSum) : e.unref(l.valFormat)(g.value.rateSum)),
          aI: e.t(e.unref(l.valFormat)(g.value.point))
        } : {
          aJ: e.t(e.unref(l.valFormat)(g.value.rateSum))
        }, {
          aK: g.value.adult && g.value.priceCache
        }, g.value.adult && g.value.priceCache ? e.e({
          aL: g.value.point
        }, g.value.point ? {
          aM: e.t(g.value.exchangeRateSum ? e.unref(l.valFormat)(g.value.priceCache - g.value.exchangeRateSum / g.value.adult) : e.unref(l.valFormat)(g.value.priceCache)),
          aN: e.t(e.unref(l.valFormat)(g.value.point / g.value.adult)),
          aO: e.t(g.value.adult)
        } : {
          aP: e.t(e.unref(l.valFormat)(g.value.priceCache)),
          aQ: e.t(g.value.adult)
        }) : {}, {
          aR: g.value.bigChildren && g.value.bigChildPriceCache
        }, g.value.bigChildren && g.value.bigChildPriceCache ? {
          aS: e.t(e.unref(l.valFormat)(g.value.bigChildPriceCache)),
          aT: e.t(g.value.bigChildren)
        } : {}, {
          aU: g.value.children && g.value.childPriceCache
        }, g.value.children && g.value.childPriceCache ? {
          aV: e.t(e.unref(l.valFormat)(g.value.childPriceCache)),
          aW: e.t(g.value.children)
        } : {}, {
          aX: g.value.babyPriceCache && g.value.baby
        }, g.value.babyPriceCache && g.value.baby ? {
          aY: e.t(e.unref(l.valFormat)(g.value.babyPriceCache)),
          aZ: e.t(g.value.baby)
        } : {}, {
          ba: g.value.allRateSum
        }, g.value.allRateSum ? e.e({
          bb: e.t(e.unref(l.valFormat)(g.value.allRateSum)),
          bc: g.value.memberDscAmount
        }, g.value.memberDscAmount ? e.e({
          bd: e.t(g.value.memberLevelDesc),
          be: g.value.memberDiscount
        }, g.value.memberDiscount ? {
          bf: e.t(Number(10 * g.value.memberDiscount).toFixed(1))
        } : {}, {
          bg: e.t(e.unref(l.valFormat)(g.value.memberDscAmount))
        }) : {}, {
          bh: g.value.couponSimpleInfoDtoList && g.value.couponSimpleInfoDtoList.length > 0
        }, g.value.couponSimpleInfoDtoList && g.value.couponSimpleInfoDtoList.length > 0 ? {
          bi: e.f(g.value.couponSimpleInfoDtoList, (a, t, u) => e.e({
            a: e.t(a.descript),
            b: a.num > 1
          }, a.num > 1 ? {
            c: e.t(a.num)
          } : {}, {
            d: e.t(a.realValue),
            e: t
          }))
        } : {}, {
          bj: g.value.gwDiscount
        }, g.value.gwDiscount ? {
          bk: e.t(e.unref(l.valFormat)(g.value.gwDiscount))
        } : {}) : {})) : {}, {
          bl: g.value.needPay || !g.value.point
        }, g.value.needPay || !g.value.point ? {
          bm: e.t(e.unref(l.valFormat)(g.value.needPay))
        } : {}, {
          bn: g.value.needPay && g.value.point
        }, (g.value.needPay && g.value.point, {}), {
          bo: g.value.point
        }, g.value.point ? {
          bp: e.t(e.unref(l.valFormat)(g.value.point))
        } : {}, {
          bq: g.value.point
        }, g.value.point ? {
          br: e.t(e.unref(l.valFormat)(g.value.point))
        } : {}, {
          bs: g.value.aleadyPayPrice
        }, g.value.aleadyPayPrice ? {
          bt: e.t(e.unref(l.valFormat)(g.value.aleadyPayPrice))
        } : {}, {
          bv: "DFK" == y.value.sta || "DQY" == y.value.sta
        }, "DFK" == y.value.sta || "DQY" == y.value.sta ? {
          bw: e.t(e.unref(l.valFormat)(g.value.readyPay))
        } : {}, {
          bx: g.value.breakMoney && "T" == C.value
        }, g.value.breakMoney && "T" == C.value ? {
          by: e.t(e.unref(l.valFormat)(g.value.breakMoney)),
          bz: e.t(e.unref(l.valFormat)(g.value.breakMoney))
        } : {}, {
          bA: "F" == C.value
        }, "F" == C.value ? {
          bB: e.o(e => C.value = "T")
        } : {
          bC: e.o(e => C.value = "F")
        }, {
          bD: e.t(g.value.orderNo),
          bE: e.o(e => H(g.value.orderNo)),
          bF: e.t(y.value.createDatetime),
          bG: y.value.payDatetime
        }, y.value.payDatetime ? {
          bH: e.t(y.value.payDatetime)
        } : {}, {
          bI: e.t(y.value.contactMan),
          bJ: e.t(y.value.contactPhone),
          bK: e.unref(N).length > 0
        }, e.unref(N).length > 0 ? {
          bL: e.f(e.unref(N), (a, t, u) => ({
            a: e.t(a.name),
            b: t,
            c: e.o(t => e.unref(v.goPage)(a.url), t)
          }))
        } : {}, {
          bM: "DFK" != y.value.sta
        }, "DFK" != y.value.sta ? e.e({
          bN: "DFK" != y.value.sta
        }, "DFK" != y.value.sta ? {
          bO: e.o(V)
        } : {}) : {}, {
          bP: "O" == y.value.sta && "NI" != e.unref(A)
        }, "O" == y.value.sta && "NI" != e.unref(A) ? {
          bQ: e.o(E)
        } : {}, {
          bR: "DFK" == y.value.sta || "DQY" == y.value.sta
        }, "DFK" == y.value.sta || "DQY" == y.value.sta ? e.e({
          bS: "DFK" == y.value.sta
        }, "DFK" == y.value.sta ? {
          bT: e.o(K)
        } : {}, {
          bU: "DFK" == y.value.sta
        }, "DFK" == y.value.sta ? {
          bV: e.o(a => function() {
            let a = d.value || y.value.orderType;
            e.index.redirectTo({
              url: `/pagesB/other/pay?orderNo=${p.value}&productType=${a}`
            })
          }())
        } : {}) : {}, {
          bW: e.sr(m, "6a654bd5-1", {
            k: "kf"
          }),
          bX: e.p({
            title: "联系客服"
          }),
          bY: e.o(e => c.value = e),
          bZ: e.p({
            orderNo: p.value,
            productType: d.value || y.value.orderType,
            show: c.value
          })
        })
      }
    });
  c.__runtimeHooks = 1;
  const p = e._export_sfc(c, [
    ["__scopeId", "data-v-6a654bd5"]
  ]);
  wx.createPage(p)
}();