! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../assets/index.js"),
    l = require("../../base/common.js"),
    t = require("../../base/jAlert/jAlert.js"),
    u = require("../../hooks/useAdReport.js"),
    o = require("../../hooks/useLoading.js"),
    r = require("../../hooks/useSubscribeMessage.js"),
    v = require("../../utils/api.js"),
    i = require("../../utils/channelLinkParse.js"),
    n = require("../../utils/filter.js"),
    d = require("../../utils/qdTracker.js"),
    s = require("../../utils/umengAdaptor.js"),
    c = require("../../utils/utils.js"),
    p = require("../../utils/wxuser.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (h + g + m + y + f + S)();
  const m = () => "../../components/bottomDialog.js",
    y = () => "../../components/centerDialog.js",
    h = () => "../../components/coustomHead.js",
    f = () => "../../components/new/CustomerRetentionDialog.js",
    g = () => "../../components/new/StRadio.js",
    S = () => "../../components/RetryModal.js",
    b = e.defineComponent({
      __name: "pay",
      setup(m) {
        const y = u.useAdReport(),
          h = e.ref(""),
          f = e.ref(""),
          g = e.ref([]),
          {
            subscribeMessage: S
          } = r.useSubscribeMessage(g),
          b = o.useLoading(!1),
          C = p.getStorage("config"),
          T = e.ref(p.getStorage("user")),
          pointAccount = e.ref({}),
          N = p.getStorage("wxuser"),
          _ = e.ref(!0),
          I = e.ref(!1),
          R = e.ref(""),
          P = e.ref(),
          V = e.ref(),
          D = e.ref("WECHAT"),
          A = e.ref(!1),
          O = e.ref(0),
          j = e.ref(""),
          w = e.ref(!1),
          F = e.ref(),
          G = e.ref(),
          k = e.ref(!1),
          x = e.ref("weChatPay"),
          L = e.ref(),
          M = e.ref({}),
          q = e.ref(0),
          U = e.ref(""),
          E = e.ref(!1),
          $ = e.ref(!1),
          z = e.ref(""),
          B = e.ref("test" === C.env ? 1 : 1e4),
          H = e.ref(""),
          W = e.ref([1, 2, 3, 4, 5, 6, 7, 8, 9]),
          J = e.ref(!1),
          Q = e.ref([{
            icon: "icPayWeChat",
            title: "微信支付",
            value: "weChatPay",
            subTitle: "",
            hasNotice: !1
          }, {
            icon: "icPayWallet",
            title: "定金支付",
            value: "partPay",
            subTitle: "可避免支付限额等情况，最低支付 ¥" + n.valFormat(B.value),
            hasNotice: !0
          }, {
            icon: "icPayLink",
            title: "浏览器支付",
            value: "browserPay",
            subTitle: "复制链接跳转浏览器打开页面付款",
            hasNotice: !1
          }]),
          K = e.ref(!0),
          Y = e.ref(!0),
          X = e.ref(!1),
          Z = e.ref(!0);
        e.ref(!1);
        const paymentFailureMessage = "支付暂时不可用，请稍后重试";
        const ee = e.ref("http://netpay.netpay.bas.cmburl.cn:801/netpayment/BaseHttp.dll?MB_APPPay"),
          ae = e.ref(""),
          le = e.ref(!1),
          te = e.ref(""),
          ue = e.ref(""),
          oe = e.computed(() => {
            var e, a;
            return (null == (e = pointAccount.value) ? void 0 : e.pointMoney) || (((null == (a = T.value) ? void 0 : a.points) || 0) * (((null == pointAccount.value ? void 0 : pointAccount.value.pointsRedeemValue) || .1)))
          }),
          pointValue = e.computed(() => (null == pointAccount.value ? void 0 : pointAccount.value.pointsRedeemValue) || .1),
          re = e.computed(() => {
            var e;
            let a = 0;
            return (null == (e = M.value) ? void 0 : e.payRate) && (a = M.value.payRate < oe.value ? M.value.payRate : oe.value), a
          }),
          pointDed = e.computed(() => Math.floor(re.value / pointValue.value)),
          ve = e.computed(() => {
            let e = M.value.payRate || 0;
            return w.value && re.value && (e -= re.value), e < 0 && (e = 0), e.toFixed(2)
          }),
          ie = e.computed(() => ve.value > B.value && "shop" !== f.value),
          ne = e.computed(() => {
            const e = Q.value.slice(0, 2);
            return ie.value ? e : e.slice(0, 1)
          }),
          de = e.computed(() => {
            const e = Q.value;
            return ie.value ? e : e.filter(e => "partPay" !== e.value)
          }),
          se = e.computed(() => {
            let e = M.value.payRate - O.value;
            return w.value && (e -= re.value), Number(e.toFixed(2))
          });

        function ce(e) {
          e || (O.value = 0, j.value = "")
        }

        function pe() {
          k.value = !1, A.value = !0
        }

        function me(e) {
          k.value = e.showGuardDialog
        }

        function ye() {
          Z.value = !1
        }

        function he(e) {
          if ("." === e) j.value.includes(".") && (j.value += ".");
          else if ("del" === e) j.value = j.value.slice(0, -1);
          else {
            if (j.value.includes(".") && 2 === j.value.split(".")[1].length) return;
            j.value += e.toString()
          }
          M.value.payRate - Number(j.value) < 0 && (j.value = M.value.payRate.toString()), O.value = Number(j.value)
        }

        function fe(e) {
          let a = "";
          return "shop" === f.value && (a = v.api.shopPay(e)), "hotel" === f.value && (a = v.api.pay(e)), "activity" === f.value && (a = v.api.activityPay(e)), ["ThemeGroup", "DestPackage", "ButlerCustomized", "FreeTravel", "CUSTOM", "Custom", "SingleRoom"].includes(f.value) && (a = v.api.travelPay(e)), a
        }

        function ge(e) {
          var a, l, t, u, o, r, v, i, n, d, c, p, m;
          let y = {
            hotelGroupCode: C.hotelGroupCode,
            hotelCode: C.hotelCode,
            payType: e,
            crsNo: h.value,
            channel: "WECHAT",
            otaChannel: "WECHAT",
            openid: null == N ? void 0 : N.openid,
            pointDed: "",
            moneyDed: "",
            configUuid: "",
            appid: C.appid,
            componentAppid: C.componentAppid,
            orderType: {
              ticket: "ticket",
              cart: "aggregate",
              combination: "hotel",
              hotel: "hotel",
              pos: "pos",
              annualCard: "ticket"
            } [f.value],
            memberId: "",
            cardId: "",
            cardNo: "",
            isDeposit: $.value
          };
          if ("hotel" === f.value) {
            const e = s.adaptor.getUtmParam("ALL") || {};
            y = {
              ...y,
              ...e
            }
          } else y.utm_params = s.adaptor.getUtmParam("ALL");
          return "" === y.moneyDed && (y.configUuid = ""), T.value && (null == (a = T.value) ? void 0 : a.memberId) && (y.memberId = null == (l = T.value) ? void 0 : l.memberId, y.cardId = null == (t = T.value) ? void 0 : t.cardId, y.cardNo = null == (u = T.value) ? void 0 : u.cardNo), "chuzhi" === y.payType && (y.cardId = null == (o = T.value) ? void 0 : o.cardId, y.cardNo = null == (r = T.value) ? void 0 : r.cardNo, y.password = "", y.verifyId = "", y.verifyCode = "", y.memberId = null == (v = T.value) ? void 0 : v.memberId, y.money = M.value.rateSum, y.noPasswordPay = "T"), "ticket" !== f.value && "annualCard" !== f.value || (y.money = M.value.totalPrice, y.hotelCode = M.value.hotelCode, y.crsNo = M.value.mainOrderCode), "cart" === f.value && (y.orderType = "aggregate", y.crsNo = h.value, y.hotelCode = ""), "combination" === f.value && (y.orderType = "hotel", y.crsNo = M.value.valueCode, y.hotelCode = M.value.hotelCode), "hotel" === f.value && ("chuzhi" === y.payType && (y.orderType = "chuzhi"), y.crsNo = M.value.crsNo, y.hotelCode = M.value.hotelCode, w.value && re.value < M.value.payRate && (y.chuzhiMoney = re.value), $.value ? y.money = O.value : y.money = M.value.payRate), "pos" === f.value && (y.orderType = "pos", y.crsNo = M.value.gcRsvNo, y.hotelCode = M.value.hotelCode), "chuzhi" === y.payType && oe.value < M.value.rateSum && (y.money = oe.value), ["ThemeGroup", "ButlerCustomized", "DestPackage", "FreeTravel", "CUSTOM", "shop", "activity", "Custom", "SingleRoom"].includes(f.value) && ($.value ? y.money = O.value : y.money = M.value.payRate, "chuzhi" === y.payType ? (y.money = 0, "activity" === f.value && (y.money = ""), w.value && re.value > 0 && (y.chuzhiMoney = re.value)) : w.value && re.value > 0 && (y.chuzhiMoney = re.value, y.cardId = null == (i = T.value) ? void 0 : i.cardId, y.cardNo = null == (n = T.value) ? void 0 : n.cardNo, y.memberId = null == (d = T.value) ? void 0 : d.memberId, $.value ? y.money = O.value : y.money = (M.value.payRate - y.chuzhiMoney).toFixed(2)), y.orderNo = h.value), w.value && pointDed.value > 0 && (y.pointDed = pointDed.value), "shop" === f.value && ("WECHAT_MINI_APP" === y.payType && (y.payType = "wechat_mini_app"), y.orderNo = M.value.orderNo, y.subject = M.value.paySubject), "activity" === f.value && (y.orderNo = h.value, y.mobile = null == (c = T.value) ? void 0 : c.mobile, y.cardId = null == (p = T.value) ? void 0 : p.cardId, y.cardNo = null == (m = T.value) ? void 0 : m.cardNo), le.value && (y.requireOrder = te.value, y.traceId = ue.value), y
        }

        function Se(e) {
          t.jAlert3(e, 1500), "超过待付金额" === e && setTimeout(() => {
            Ne(() => {
              "sxshop" === M.value.staticFrom && (le.value = !0, le.value && (K.value = !1, Y.value = !1, Pe()))
            })
          }, 1500)
        }
        async function be(a) {
          if (z.value = a, "browserPay" === x.value) {
            const a = ge("h5_alipay");
            if (E.value) return !1;
            E.value = !0, await S(), e.index.showLoading({
              title: "加载中"
            }), fe(a).then(a => {
              var l;
              if (e.index.hideLoading(), 1 === a.result) {
                E.value = !1, L.value = a.retVal;
                let e = `/pagesB/other/browserPay?params=${L.value}&price=${ve.value}&paySubject=${null==(l=M.value)?void 0:l.paySubject}&orderNo=${h.value}&productType=${f.value}`;
                return R.value && (e += "&contractFlag=" + R.value), P.value && (e += "&addContactFlag=" + P.value), c.goPage(e)
              }
              E.value = !1, Se(paymentFailureMessage)
            })
          }
          if ("partPay" !== x.value || F.value.isShowDialog) {
            if ("part" === a) {
              if ($.value = !0, O.value < B.value) return void t.jAlert3("最少支付金额 ¥" + n.valFormat(B.value));
              let e = 0;
              if (w.value && re.value > 0 && (e = re.value), O.value > M.value.payRate - e) return void t.jAlert3("输入金额大于最大金额 ¥" + n.valFormat(M.value.payRate - e))
            } else $.value = !1;
            D.value = "WECHAT", "WECHAT" === D.value && async function() {
              const _wx = e;
              const a = ge("WECHAT_MINI_APP");
              if (E.value) return !1;
              E.value = !0, await S();
              const l = fe(a);
              try { _wx.index.showLoading({ title: "支付中" }); } catch(_e) {}
              l.then(a => {
                try { _wx.index.hideLoading(); } catch(_e) {}
                if (1 === a.result) {
                  if (a.paid) {
                    clearInterval(q.value), Te();
                    return;
                  }
                  try {
                    const l = "string" === typeof a.retVal ? JSON.parse(a.retVal) : a.retVal || a.data || {};
                    let u = "undefined" !== typeof wx && wx.requestPayment ? wx.requestPayment : _wx.index.requestPayment;
                    if (!u) {
                      E.value = !1, t.jAlert3("当前环境不支持微信支付，请在微信环境中支付"); return;
                    }
                    le.value && "undefined" !== typeof wx && wx.requestOrderPayment && (u = wx.requestOrderPayment);
                    u({
                      timeStamp: l.timeStamp, nonceStr: l.nonceStr,
                      package: l.package, signType: l.signType || "RSA", paySign: l.paySign,
                      success: () => { clearInterval(q.value), Te() },
                      fail() { E.value = !1, t.jAlert3("取消支付") }
                    });
                  } catch(_err) {
                    E.value = !1, t.jAlert3("支付参数异常，请稍后重试");
                  }
                } else {
                  E.value = !1, t.jAlert3("微信支付暂时不可用，请稍后重试");
                }
              }).catch(() => {
                try { _wx.index.hideLoading(); } catch(_e) {}
                E.value = !1, t.jAlert3("微信支付暂时不可用，请稍后重试")
              })
            }(), "chuzhi" === D.value && async function() {
              const a = ge("chuzhi");
              if (E.value) return !1;
              E.value = !0, await S();
              const l = fe(a);
              e.index.showLoading({
                title: "支付中"
              }), l.then(a => {
                console.log("<Pay> {payApi} res:", a), e.index.hideLoading(), 1 === a.result ? (clearInterval(q.value), Te()) : (E.value = !1, Se(paymentFailureMessage))
              }).catch(e => {
                console.log("<Pay> {payApi} error:", e), e.index.hideLoading(), E.value = !1, Se(paymentFailureMessage)
              })
            }(), "cmbPay" === D.value && function() {
              const a = ge("cmbPay");
              if (E.value) return !1;
              E.value = !0;
              const l = fe(a);
              e.index.showLoading({
                title: "支付中"
              }), l.then(a => {
                if (e.index.hideLoading(), 1 === a.result) {
                  let e = JSON.parse(a.retVal);
                  e = (e => {
                    const a = JSON.parse(e.billInfo);
                    return a.reqData.payNoticeUrl = encodeURIComponent(a.reqData.payNoticeUrl), e.billInfo = JSON.stringify(a), e
                  })(e), console.log({
                    charset: "UTF-8",
                    jsonRequestData: e.billInfo
                  }), cmblapi.netpay({
                    url: ee.value,
                    param: {
                      charset: "UTF-8",
                      jsonRequestData: e.billInfo
                    },
                    success(e) {
                      E.value = !1, setTimeout(() => {
                        t.jAlert5("确认是否支付成功", () => {
                          Te()
                        })
                      }, 2e3)
                    },
                    fail(e) {
                      E.value = !1, t.jAlert3(paymentFailureMessage)
                    }
                  })
                } else E.value = !1, Se(paymentFailureMessage)
              })
            }(), "h5_alipay" === D.value && function() {
              const a = ge("h5_alipay");
              if (E.value) return !1;
              E.value = !0;
              const l = fe(a);
              e.index.showLoading({
                title: "支付中"
              }), l.then(a => {
                var l;
                if (e.index.hideLoading(), 1 === a.result) {
                  E.value = !1;
                  const e = null == (l = JSON.parse(null == a ? void 0 : a.retVal)) ? void 0 : l.qrCode;
                  window.location.href = e, setTimeout(() => {
                    t.jAlert5("确认是否支付成功", () => {
                      Te()
                    })
                  }, 2e3)
                } else E.value = !1, Se(paymentFailureMessage)
              })
            }(), "xhsPay" === D.value && function() {
              const a = ge("h5_alipay");
              if (E.value) return !1;
              E.value = !0;
              const l = fe(a);
              e.index.showLoading({
                title: "支付中"
              }), l.then(l => {
                var u;
                if (e.index.hideLoading(), 1 === l.result) {
                  const e = null == (u = JSON.parse(null == l ? void 0 : l.retVal)) ? void 0 : u.qrCode;
                  let o = h.value;
                  "shop" === f.value && (o = a.orderNo), v.api.xhsPay({
                    appid: C.appid,
                    body: {
                      out_order_id: o,
                      open_id: null == N ? void 0 : N.openid
                    }
                  }).then(a => {
                    0 === a.result ? xhs.requestOrderPayment({
                      orderInfo: {
                        orderId: a.retVal.order_id,
                        payToken: a.retVal.pay_token,
                        payMethod: "third",
                        zfbUrl: `${C.domain}/pagesB/other/xhsPayBridge?redirect_url=${encodeURIComponent(e)}`
                      },
                      success(e) {
                        E.value = !1, setTimeout(() => {
                          t.jAlert5("确认是否支付成功", () => {
                            Te()
                          })
                        }, 5e3)
                      },
                      fail(e) {
                        E.value = !1, t.jAlert3(paymentFailureMessage)
                      }
                    }) : (E.value = !1, t.jAlert3(paymentFailureMessage))
                  })
                } else E.value = !1, Se(paymentFailureMessage)
              })
            }()
          } else F.value.showDialog()
        }
        const Ce = {
          ThemeGroup: "主题团",
          FreeTravel: "自由行",
          ButlerCustomized: "绉佷韩绠″",
          DestPackage: "目的地套餐",
          hotel: "閰掑簵",
          activity: "日活动",
          shop: "通兑券"
        };

        function Te() {
          const a = 100 * (Number($.value ? O.value : ve.value) || 0);
          y("PURCHASE", {
            payCharge: a
          });
          const l = {
            order_id: h.value,
            order_type: Ce[f.value] || "unknown",
            product_name: M.value.paySubject,
            order_price: M.value.payRate,
            pay_price: a / 100,
            balance_pay_price: re.value,
            is_installment: $.value ? "是" : "否"
          };
          s.adaptor.sendEvent("customize_pay_order_result", l, "OTHER");
          const t = {
            order_id: h.value
          };
          if (["ThemeGroup", "DestPackage", "ButlerCustomized", "FreeTravel", "CUSTOM", "Custom", "SingleRoom"].includes(f.value)) {
            const {
              productCode: e,
              productDesc: a,
              beginDate: l,
              adult: u,
              baby: o,
              children: r,
              bigChildren: v
            } = M.value;
            t.commodity_id = e, t.commodity_name = a, t.travel_date = l, t.adult_num = u, t.children_num = o + r + v
          }
          if ("hotel" === f.value) {
            const {
              hotelCode: e,
              hotelDescript: a,
              roomDescript: l,
              productDesc: u,
              arr: o,
              adult: r,
              baby: v,
              children: i,
              bigChildren: n
            } = M.value;
            t.commodity_id = e, t.commodity_name = a, t.room_type = l, t.room_product_name = u, t.travel_date = o, t.adult_num = r, t.children_num = v + i + n
          }
          if ("shop" === f.value) {
            const {
              id: e,
              name: a
            } = M.value.listShopOrderItemVO[0].shopGoods;
            t.commodity_id = e, t.commodity_name = a, t.order_id = M.value.orderNo
          }
          if ("activity" === f.value) {
            const {
              bizDatetime: e,
              activityInfo: a,
              adult: l,
              baby: u,
              children: o,
              bigChildren: r
            } = M.value;
            t.commodity_id = a.activityCode, t.commodity_name = a.name, t.travel_date = e, t.adult_num = l, t.children_num = u + o + r
          }
          let u;
          d.qdTracker.track("mini_pay", t), ["ThemeGroup", "DestPackage", "ButlerCustomized", "FreeTravel", "CUSTOM", "Custom", "SingleRoom", "activity", "hotel"].includes(f.value) ? u = Ie : "shop" === f.value && (u = _e), e.index.showLoading({
            title: "支付中"
          }), F.value.hideDialog(), u ? setTimeout(() => {
            u(() => {
              E.value = !1, I.value = !0, async function() {
                var e;
                const {
                  utm_1_code: a
                } = await i.getChannelParamsFromQDTracker(), l = {
                  firstOrderSource: a,
                  memberId: null == (e = T.value) ? void 0 : e.memberId,
                  hotelGroupCode: C.hotelGroupCode
                };
                try {
                  v.api.firstOrderSourceRecorder(l).then(e => {})
                } catch {}
              }()
            })
          }, 5e3) : E.value = !1
        }

        function Ne(e) {
          "hotel" === f.value && function(e) {
            v.api.showOrder({
              orderNo: h.value,
              hotelGroupCode: C.hotelGroupCode,
              appid: C.appid,
              componentAppid: C.componentAppid
            }).then(a => {
              1 === a.result ? (M.value = a.retVal, M.value.leftTimeSeconds > 0 && 0 !== M.value.payRate && (q.value = setInterval(() => {
                M.value.leftTimeSeconds > 0 ? (M.value.leftTimeSeconds--, U.value = Re(M.value.leftTimeSeconds)) : clearInterval(q.value)
              }, 1e3)), e && e()) : t.jAlert3(paymentFailureMessage)
            })
          }(e), ["ThemeGroup", "DestPackage", "ButlerCustomized", "FreeTravel", "CUSTOM", "Custom", "SingleRoom"].includes(f.value) && function(e) {
            var a, l, t;
            v.api.orderDetail({
              memberNo: null == (a = T.value) ? void 0 : a.memberId,
              memberId: null == (l = T.value) ? void 0 : l.memberId,
              hotelGroupCode: C.hotelGroupCode,
              hotelCode: C.hotelCode,
              travelOrderNo: h.value,
              mobile: null == (t = T.value) ? void 0 : t.mobile
            }).then(async a => {
              var l;
              1 === a.result && (M.value = a.retVal.reserveOrder, M.value.paySubject = a.retVal.reserveOrder.productDesc, M.value.leftTimeSeconds = M.value.countdown, M.value.leftTimeSeconds > 0 && "1" === (null == (l = M.value.paySta) ? void 0 : l.toString()) ? q.value = setInterval(() => {
                M.value.leftTimeSeconds > 0 ? (M.value.leftTimeSeconds--, U.value = Re(M.value.leftTimeSeconds)) : clearInterval(q.value)
              }, 1e3) : M.value.leftTimeSeconds = 0, Ie(() => {}), e && e())
            })
          }(e), "shop" === f.value && _e(e), "activity" === f.value && function(e) {
            var a, l;
            v.api.activityOrder({
              memberNo: null == (a = T.value) ? void 0 : a.memberId,
              hotelGroupCode: C.hotelGroupCode,
              hotelCode: C.hotelCode,
              actRsvNo: h.value,
              memberToken: null == (l = T.value) ? void 0 : l.memberToken
            }).then(async a => {
              1 === a.result && (M.value = a.retVal, M.value.paySubject = a.retVal.aggregationOrder.descript || a.retVal.aggregationOrder.title, M.value.leftTimeSeconds > 0 && "1" === M.value.paySta && (q.value = setInterval(() => {
                M.value.leftTimeSeconds > 0 ? (M.value.leftTimeSeconds--, U.value = Re(M.value.leftTimeSeconds)) : clearInterval(q.value)
              }, 1e3)), Ie(() => {}), e && e())
            })
          }(e)
        }

        function _e(e) {
          b.value = !0, v.api.shopOrderDetail({
            equipment: C.equipment,
            hotelGroupCode: C.hotelGroupCode,
            hotelGroupId: C.hotelGroupId,
            id: h.value
          }).then(a => {
            b.value = !1, 1 === a.result && (M.value = a.retVal, M.value.rateSum = a.retVal.actualPrice, M.value.payRate = a.retVal.actualPrice - a.retVal.aleadyPayPrice, M.value.paySubject = a.retVal.listShopOrderItemVO[0].goodsName, e && e())
          })
        }

        function Ie(a) {
          var t, u, o;
          const r = {
            unitCode: C.hotelGroupCode,
            otaChannel: "wechat",
            ota: "DIRECT",
            isGroup: "T",
            payType: M.value.priceType,
            orderNo: h.value,
            cardLevel: null == (t = T.value) ? void 0 : t.cardLevel,
            cardType: null == (u = T.value) ? void 0 : u.cardType,
            memberId: null == (o = T.value) ? void 0 : o.memberId
          };
          b.value = !0, v.api.interfaceTransfer({
            query: r,
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/reserve/order/queryPayDetail",
              interfaceFrom: "GC",
              hotelGroupCode: C.hotelGroupCode
            }
          }).then(e => {
            var l;
            b.value = !1, J.value = !1, 1 === e.result && 0 === e.retVal.result && ("activity" === f.value ? e.retVal.retVal.activityRateSumDto && (e.retVal.retVal = Object.assign(e.retVal.retVal, e.retVal.retVal.activityRateSumDto)) : e.retVal.retVal.travelRateSumDto && (e.retVal.retVal = Object.assign(e.retVal.retVal, e.retVal.retVal.travelRateSumDto)), e.retVal.retVal.activityChangeRateSum > 0 && (K.value = !1), M.value.rateSum = Number((e.retVal.retVal.rateSum - e.retVal.retVal.memberDscAmount - e.retVal.retVal.couponRateSum - e.retVal.retVal.exchangeRateSum - e.retVal.retVal.gwDiscount).toFixed(2)), M.value.payRate = e.retVal.retVal.readyPay, _.value = (null == (l = e.retVal.retVal) ? void 0 : l.readyPay) > 0, M.value.rateSum && M.value.rateSum > M.value.payRate && (M.value.leftTimeSeconds = 0), a && a())
          }).catch(a => {
            (null == a ? void 0 : a.code) !== l.RateLimitStatusCode && (null == a ? void 0 : a.status) !== l.RateLimitStatusCode || (J.value = !0, e.index.hideLoading())
          })
        }

        function Re(e) {
          const a = Math.floor(e / 3600),
            l = Math.floor(e % 3600 / 60),
            t = e % 60;
          return `${String(a).padStart(2,"0")}:${String(l).padStart(2,"0")}:${String(t).padStart(2,"0")}`
        }

        function Pe() {
          e.wx$1.checkBeforeAddOrder({
            success(e) {
              "checkBeforeAddOrder:ok" === e.errMsg ? (te.value = e.data.requireOrder, ue.value = e.data.traceId) : t.jAlert3(paymentFailureMessage)
            },
            fail(e) {
              t.jAlert3(paymentFailureMessage)
            }
          })
        }
        function Oe() {
          v.api.listAccount({}).then(e => {
            e && e.data && (pointAccount.value = e.data)
          }).catch(() => {})
        }
        return e.onLoad(e => {
          h.value = e.orderNo, f.value = e.productType, ae.value = e.staticFrom || "", R.value = e.contractFlag, P.value = e.addContactFlag, "hotel" !== f.value && "shop" !== f.value || (K.value = !1), D.value = "WECHAT", Ne(() => {
            "sxshop" === M.value.staticFrom && (le.value = !0, le.value && (K.value = !1, Y.value = !1, Pe()))
          }), ["ThemeGroup", "DestPackage", "ButlerCustomized", "FreeTravel", "CUSTOM", "Custom", "SingleRoom"].includes(f.value) ? g.value = ["NOT_COMPLETE_ALL_PAYMENT", "NOT_SIGNING"] : "activity" === f.value ? g.value = ["NOT_SIGNING"] : "shop" === f.value && (g.value = ["UNIVERSAL_VOUCHER_CREDITED", "UNIVERSAL_VOUCHER_VALID", "COUPON_USE_MA"])
        }), e.onMounted(() => {
          "hotel" === f.value ? H.value = "/pagesC/order/orderInfo?orderNo=" + h.value : "shop" === f.value ? H.value = `/pagesB/travel/orderDetail?orderNo=${h.value}&productType=${f.value}` : "activity" === f.value ? H.value = `/pagesE/dailyActivity/dailyOrderDetail?orderNo=${h.value}&productType=${f.value}` : H.value = "/pagesB/travel/orderDetail?orderNo=" + h.value,
            function() {
              const e = {
                appid: C.appid,
                codes: ["cmbPayUrl"].join(","),
                componentAppid: C.componentAppid,
                hotelCode: C.hotelCode ? C.hotelCode : 0,
                hotelGroupCode: C.hotelGroupCode,
                clientType: "wechat_mini"
              };
              v.api.getMultiSysOptionCommon(e).then(e => {
                1 === e.result && e.retVal.forEach(e => {
                  "cmbPayUrl" === e.code && e.value && (ee.value = e.value)
                })
              })
          }(), Oe(), c.refreshMemberInfo(e => {
            T.value = e
          })
        }), e.onShow(() => {
          Oe(),
          c.refreshMemberInfo(e => {
            T.value = e
          })
        }), e.onUnload(() => {
          clearInterval(q.value)
        }), e.watch(() => Q.value, e => {
          Z.value = (null == e ? void 0 : e.length) > 2
        }, {
          immediate: !0
        }), e.watch(() => I.value, e => {
          e && function() {
            var e, a, l, t, u;
            let o = `/pagesB/travel/paySuccess?orderNo=${h.value}&productType=${f.value}&payRate=${null==(e=M.value)?void 0:e.payRate}`;
            "shop" === f.value && (null == (a = M.value) ? void 0 : a.orderNo) && (o = `/pagesB/travel/paySuccess?orderId=${h.value}&orderNo=${null==(l=M.value)?void 0:l.orderNo}&productType=${f.value}&payRate=${null==(t=M.value)?void 0:t.payRate}`), R.value && (o += "&contractFlag=" + R.value), P.value && (o += "&addContactFlag=" + P.value), c.goPage(o, !(null == (u = M.value) ? void 0 : u.payRate))
          }()
        }), (l, t) => {
          var u, o;
          return e.e({
            a: e.sr(V, "bf26b57e-0", {
              k: "coustomHeadRef"
            }),
            b: e.o(me),
            c: e.p({
              title: "支付订单",
              "native-mode": !0,
              "custom-page": H.value,
              "payment-required": _.value,
              "go-back-next": A.value
            }),
            d: M.value.leftTimeSeconds > 0
          }, M.value.leftTimeSeconds > 0 ? {
            e: e.t(U.value)
          } : {}, {
            f: e.t(e.unref(n.valFormat)(ve.value)),
            g: M.value.rateSum && M.value.rateSum > ve.value
          }, M.value.rateSum && M.value.rateSum > ve.value ? {
            h: e.t(e.unref(n.valFormat)(M.value.rateSum))
          } : {}, {
            i: e.t(M.value.paySubject),
            j: Y.value
          }, Y.value ? e.e({
            k: !w.value
          }, w.value ? {
            m: e.t(e.unref(n.valFormat)(re.value))
          } : {
            l: e.t(oe.value > 0 ? `${pointDed.value}积分可抵扣 ¥${e.unref(n.valFormat)(re.value)}` : "暂无可用积分")
          }, {
            n: e.o(e => w.value = e),
            o: e.p({
              disabled: !oe.value,
              "no-emitted": !0,
              modelValue: w.value
            }),
            p: e.o(e => {
              re.value <= 0 || (w.value = !w.value, w.value && ve.value <= 0 ? (x.value = "", X.value = !0) : X.value = !1, ve.value > 0 && (x.value = "weChatPay"))
            })
          }) : {}, {
            q: w.value && oe.value < M.value.payRate
          }, (w.value && (oe.value, M.value.payRate), {}), {
            r: e.f(Z.value ? ne.value : de.value, (l, t, u) => e.e({
              a: e.unref(a.assets)[l.icon],
              b: e.t(l.title),
              c: l.hasNotice
            }, l.hasNotice ? {
              d: e.unref(a.assets).icQuestionGray,
              e: e.o(e => G.value.showDialog(), l.value)
            } : {}, {
              f: l.subTitle
            }, l.subTitle ? {
              g: e.t(l.subTitle)
            } : {}, {
              h: "bf26b57e-2-" + u,
              i: e.p({
                "model-value": x.value === l.value,
                disabled: X.value
              }),
              j: e.n("payment-mode " + (l.subTitle ? "" : "line-one")),
              k: e.o(e => function(e) {
                oe.value >= M.value.payRate && w.value || (x.value = e, console.log("payMode", x.value))
              }(l.value), l.value),
              l: l.value
            })),
            s: Z.value
          }, Z.value ? {
            t: e.o(ye)
          } : {}, {
            v: e.o(e => be("")),
            w: "" === j.value
          }, "" === j.value ? {
            x: e.t(e.unref(n.valFormat)(B.value))
          } : {
            y: e.t(j.value)
          }, {
            z: e.o(e => function() {
              let e = 0;
              w.value && re.value > 0 && (e = re.value), O.value = M.value.payRate - e, j.value = O.value.toString()
            }()),
            A: e.t(e.unref(n.valFormat)(se.value)),
            B: e.f(W.value, (a, l, t) => ({
              a: e.t(a),
              b: l,
              c: e.o(e => he(a), l)
            })),
            C: e.o(e => he(0)),
            D: e.o(e => he(".")),
            E: e.o(e => he("del")),
            F: e.o(e => be("part")),
            G: e.sr(F, "bf26b57e-3", {
              k: "partPayLayer"
            }),
            H: e.o(ce),
            I: e.p({
              title: "定金支付"
            }),
            J: e.t(e.unref(n.valFormat)(B.value)),
            K: e.t(e.unref(n.valFormat)(B.value)),
            L: e.t(e.unref(n.valFormat)(B.value)),
            M: e.o(e => G.value.hideDialog()),
            N: e.sr(G, "bf26b57e-4", {
              k: "partPayDialog"
            }),
            O: e.p({
              "max-dialog": !0
            }),
            P: e.o(pe),
            Q: e.o(() => k.value = !1),
            R: e.o(e => k.value = e),
            S: e.p({
              show: k.value
            }),
            T: e.o(e => be(z.value)),
            U: e.o(e => J.value = e),
            V: e.p({
              visible: J.value
            }),
            W: !k.value && !(null == (u = F.value) ? void 0 : u.isShowDialog) && !(null == (o = G.value) ? void 0 : o.isShowDialog)
          })
        }
      }
    }),
    C = e._export_sfc(b, [
      ["__scopeId", "data-v-bf26b57e"]
    ]);
  wx.createPage(C)
}();
