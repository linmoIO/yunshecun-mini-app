! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../assets/index.js"),
    r = require("../../base/channel.js"),
    o = require("../../base/common.js"),
    t = require("../../base/jAlert/jAlert.js"),
    u = require("../../hooks/useNavigatorRect.js"),
    l = require("../../utils/umengAdaptor.js"),
    n = require("../../utils/wxuser.js"),
    i = require("../../utils/api.js");
  require("../../utils/config.js"), require("../../utils/log.js");
  const s = require("../../utils/qdTracker.js");
  require("../../base/product.js"), require("../../services/request/request.js"), require("../../utils/request.js");
  const d = require("../../hooks/useAdReport.js"),
    m = require("../hooks/useLoadingSync.js"),
    c = require("../../hooks/useSubscribeMessage.js"),
    v = require("../../hooks/useXhsReport.js"),
    p = require("../../services/common.js"),
    f = require("../../utils/filter.js"),
    b = require("../../utils/helper.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (D + y + R + S + A + N + C + g + h + T + P)();
  const y = () => "../../components/bottomDialog.js",
    g = () => "../../components/calendar.js",
    D = () => "../../components/coustomHead.js",
    h = () => "../../components/kfDialog.js",
    T = () => "../../components/new/CustomerRetentionDialog.js",
    C = () => "../../components/new/NumberTransition.js",
    R = () => "../../components/new/Stepper.js",
    S = () => "../../components/new/StRadio.js",
    N = () => "../../components/order/OrderContactTipNotice.js",
    A = () => "../components/order/OrderDiscountPlan.js",
    P = () => "../../components/RetryModal.js",
    I = e.defineComponent({
      __name: "confirmOrder",
      setup(y) {
        const g = d.useAdReport(),
          {
            subscribeMessage: D
          } = c.useSubscribeMessage(["ORDER_CANCEL_NOTICE", "NOT_COMPLETE_FIRST_PAYMENT"]),
          h = v.useXshReport(),
          T = u.useNavigatorRect(),
          C = n.getStorage("config"),
          R = null == C ? void 0 : C.version,
          S = n.getStorage("user"),
          N = n.getStorage("wxuser"),
          A = n.getStorage("travelInfo"),
          P = e.computed(() => "ThemeGroup" === A.orderType && "FAMILY" !== A.priceModel || "ButlerCustomized" === A.orderType || "FreeTravel" === A.orderType || "DestPackage" === A.orderType),
          I = e.ref(!1),
          O = e.ref(),
          M = e.ref(""),
          G = e.computed(() => "shop" === M.value),
          k = e.ref(),
          _ = e.ref(!1),
          L = e.ref(""),
          j = e.ref(""),
          F = e.ref(1),
          E = e.ref(),
          V = e.ref([]),
          x = e.ref(!1),
          q = e.ref(r.defaultOtaChannel),
          w = e.ref([]),
          Y = e.ref(e.dayjs().format("YYYY-MM-DD")),
          B = e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD")),
          U = e.reactive({
            remark: "",
            fromDate: "",
            toDate: ""
          });

        function H(a) {
          U.fromDate = e.dayjs(a.checkInDay).format("YYYY.MM.DD"), U.toDate = e.dayjs(a.checkOutDay).format("YYYY.MM.DD")
        }
        const $ = e.ref(!0),
          z = e.ref(0),
          J = e.ref(0),
          K = e.ref(!0),
          Q = e.ref(!1),
          W = e.ref([]),
          Z = e.ref(!1),
          X = e.ref({
            basicTeamRateSum: 0,
            exchangeRateSum: 0,
            point: 0,
            rateSum: 0,
            readyPay: 0,
            memberDscAmount: 0,
            couponRateSum: 0,
            singleRoomRateSum: 0,
            guaranteedPrice: 0
          }),
          ee = e.computed(() => X.value.orderPrice),
          ae = e.ref(!1);
        m.useLoadingSync(ae);
        const re = e.reactive({
            openid: null == N ? void 0 : N.openid,
            reserveOrderDto: {
              shareRoom: "",
              shareRoomType: "",
              appid: C.appid,
              price: 0,
              integral: 0,
              productUrl: A.productUrl,
              unitCode: C.hotelGroupCode,
              orderNo: "",
              otaRsvNo: "",
              teamNo: A.travelGroupCode,
              adviceNo: "",
              itineraryCode: A.itineraryCode,
              orderType: A.orderType,
              orderTypeDesc: A.orderTypeDesc,
              orderSource: "",
              orderSubSource: "",
              rsvClass: "",
              rsvMan: "",
              mobile: "",
              contactName: "",
              contactMobile: "",
              otaChannel: q.value,
              productCode: A.travelType,
              productDesc: A.title,
              meetingPoint: A.meetingPoint,
              memberNo: S.memberId,
              memberId: S.memberId,
              memberLevel: S.memberLevel,
              cardId: S.cardId,
              cardNo: S.cardNo,
              cardLevel: S.cardLevel,
              cardType: S.cardType,
              companyNo: "",
              companyDesc: "",
              beginDate: A.groupBeginDate,
              endDate: A.groupEndDate,
              priceType: A.specificationsType,
              specificationsType: A.specificationsType,
              adult: 0,
              bigChildren: 0,
              children: 0,
              baby: 0,
              num: A.number || 1,
              realRate: 0,
              rateSum: 0,
              singleRoomPrice: 0,
              counselor: "",
              isMiniProgram: "",
              agency: A.isSigning,
              belongMain: "",
              belongSeason: "",
              remark: "",
              payType: "CASH"
            },
            dscAmountInfoDto: {
              cardNo: S.cardNo,
              memberDiscount: "",
              memberDiscountAmount: "",
              memberNo: S.memberId,
              pay: 0,
              payType: "",
              point: "",
              pointMoney: "",
              memberLevelDesc: "",
              adultTeamRateSum: "",
              basicTeamRateSum: "",
              childrenTeamRateSum: "",
              singleRoomRateSum: "",
              guaranteedPrice: 0
            },
            rsvDtos: [{
              arr: "",
              dep: "",
              hotelGroupCode: C.hotelGroupCode,
              hotelCode: C.hotelCode,
              rmtype: "",
              rmtypeDesc: "",
              productCode: A.travelType,
              num: 1,
              rmClass: "",
              guestDtos: []
            }]
          }),
          oe = e.ref(),
          te = e.ref(!1),
          ue = e.ref(),
          le = e.ref("");

        function ne() {
          le.value && ue.value.showDialog()
        }!async function() {
          var e;
          try {
            const a = await p.getSysOptionsByCode({
              hotelCode: C.hotelCode,
              hotelGroupCode: C.hotelGroupCode,
              code: "RoomDescription"
            });
            (null == (e = null == a ? void 0 : a.retVal) ? void 0 : e.value) && (le.value = a.retVal.value)
          } catch {}
        }();
        const ie = e.ref(0),
          se = e.ref(0),
          de = e.ref(0),
          me = e.ref(0),
          ce = e.computed(() => ie.value + (se.value + de.value + me.value)),
          ve = e.ref(1),
          pe = e.computed(() => {
            var e;
            return (null == (e = A.priceDtos.find(e => "CASH" === e.payType)) ? void 0 : e.singleSupplement) || 0
          }),
          fe = e.computed(() => {
            if ("PEOPLE" === A.priceModel && "singleRoom" === oe.value) {
              const e = 2 * ve.value - ce.value;
              return e > 0 ? e : 0
            }
            return 0
          }),
          be = e.ref(1),
          ye = e.ref(""),
          ge = e.ref();

        function De(e) {
          te.value = !0, oe.value = e
        }
        const he = e.computed(() => "T" === (null == A ? void 0 : A.groupPt) && 1 === ce.value && "SCF" === ge.value);
        e.watch(() => [he.value, fe.value], ([e, a]) => {
          e ? te.value || (oe.value = "shareRoom") : oe.value = "singleRoom"
        }, {
          immediate: !0
        });
        const Te = e.ref(),
          Ce = e.ref(),
          Re = e.computed(() => {
            var e;
            return (null == (e = Te.value) ? void 0 : e.memberDiscountData) || {}
          });

        function Se(e) {
          Te.value = e, w.value = e.usedCoupons || []
        }
        let Ne = {};
        const Ae = e.ref(!1),
          Pe = e.ref(!1),
          Ie = e.debounce((async function() {
            const a = Pe.value;
            if (a && (Pe.value = !1), a || (ae.value = !0), G.value) return X.value.point = 0, X.value.basicTeamRateSum = Number(Number(U.price * U.number).toFixed(2)),
              function() {
                var e, a, r;
                X.value.guaranteedPrice || (X.value.guaranteedPrice = 0);
                const o = X.value.basicTeamRateSum + X.value.guaranteedPrice;
                o > 0 && "member" === (null == (e = Te.value) ? void 0 : e.pointStrategy) && (null == (a = Re.value) ? void 0 : a.discount) < 1 ? J.value = Number((Number(1 - (null == (r = Re.value) ? void 0 : r.discount) || 0) * Number(o)).toFixed(2)) : J.value = 0, z.value = 0;
                const t = Number(o - J.value);
                w.value.forEach(e => {
                  const a = e;
                  let r = 0;
                  "LZ" === a.discountType || "MZ" === a.discountType ? (r = Number(o) * Number((1 - Number(a.discountNum)).toFixed(2)), z.value += r) : Number(Number(a.discountNum).toFixed(2)) >= Number(o) ? (r = Number(o), z.value += r) : (r = Number(Number(a.discountNum).toFixed(2)), z.value += r), z.value > t ? e.realValue = t - z.value + r > 0 ? Number((t + r - z.value).toFixed(2)) : 0 : e.realValue = r
                }), z.value > t && (z.value = t), z.value = Number(z.value.toFixed(2))
              }(), X.value.memberDscAmount = J.value, X.value.couponRateSum = z.value, X.value.readyPay = Number((X.value.basicTeamRateSum - J.value - z.value).toFixed(2)), void(a || (ae.value = !1));
            const r = function() {
              var a, r, o, t, u, l, n, i;
              const s = {
                unitCode: C.hotelGroupCode,
                travelType: A.travelType,
                payType: re.reserveOrderDto.payType,
                otaChannel: q.value,
                ota: "DIRECT",
                num: A.number,
                isGroup: "T",
                endDate: A.groupEndDate,
                beginDate: A.groupBeginDate,
                cardLevel: S.cardLevel,
                cardType: S.cardType,
                travelGroupCode: A.travelGroupCode,
                roomNum: ve.value,
                babyNum: 0,
                bigChildrenNum: 0,
                memberDiscount: null == (r = null == (a = Te.value) ? void 0 : a.memberDiscountData) ? void 0 : r.discount,
                memberDiscountEnable: "member" === (null == (o = Te.value) ? void 0 : o.pointStrategy),
                memberId: S.memberIdStr,
                coupons: ((null == (t = Te.value) ? void 0 : t.usedCoupons) || []).map(e => e.couponNo),
                pointStrategy: null == (u = Te.value) ? void 0 : u.pointStrategy,
                point: (null == (l = Te.value) ? void 0 : l.usedPoint) || 0
              };
              if ("实时计价" === A.price) {
                const a = e.dayjs(A.groupEndDate).diff(A.groupBeginDate, "day") + 1;
                s.rsvRmClassList = [];
                for (let r = 0; r < a; r++) re.rsvDtos.forEach(a => {
                  s.rsvRmClassList.push({
                    rmClass: a.rmClass,
                    rmNum: a.num,
                    rsvDate: e.dayjs(A.groupBeginDate).add(r, "day").format("YYYY-MM-DD")
                  })
                })
              }
              return "FreeTravel" === A.orderType ? s.isFreeTravel = "T" : s.isFreeTravel = "F", (null == (n = A.specificationsPriceDtos) ? void 0 : n.length) > 0 && (s.specificationsType = A.specificationsPriceDtos[0].specificationsType), (null == (i = w.value) ? void 0 : i.length) > 0 && (s.isTdq = "FWQ" === w.value[0].couponType ? "T" : "F", s.memberStacking = w.value[0].memberStacking), s.adultNum = ie.value || 0, s.babyNum = me.value || 0, s.childrenNum = de.value || 0, s.bigChildrenNum = se.value || 0, s.singleRoomPeople = fe.value || 0, s
            }();
            if (e.isEqual(Ne, r)) a || (ae.value = !1);
            else {
              Ne = r;
              try {
                const o = await i.api.interfaceTransfer({
                  query: r,
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "GC_TRAVEL_ORDER",
                    interfaceMethod: "/api/reserve/order/queryPayDetail",
                    interfaceFrom: "GC",
                    hotelGroupCode: C.hotelGroupCode
                  }
                });
                1 === o.result && 0 === o.retVal.result ? (Ae.value = !0, _.value = !0, X.value = o.retVal.retVal, r.point !== X.value.point && (a || (ae.value = !1), setTimeout(() => {
                  e.index.showToast({
                    title: "已为您按照最佳优惠方案调整积分抵扣金额",
                    icon: "none",
                    duration: 3e3
                  })
                }, 200), Pe.value = !0, Ce.value.setUsedPoint(X.value.point)), X.value.rsvRmClassList && (V.value = X.value.rsvRmClassList), X.value.travelRateSumDto && (X.value = Object.assign(X.value, X.value.travelRateSumDto)), "FreeTravel" === A.orderType ? X.value.babyRoomNum = r.babyRoomNum : X.value.babyRoomNum = 0, X.value.exchangeSum = Number((X.value.exchangeRateSum + X.value.memberDscAmount + X.value.couponRateSum).toFixed(2)), X.value.orderPrice = (X.value.basicTeamRateSum || 0) + (X.value.singleRoomRateSum || 0) + (X.value.guaranteedPrice || 0), w.value.forEach(e => {
                  const a = X.value.couponSimpleInfoDtoList.find(a => a.num === e.couponNo);
                  a && (e.realValue = a.realValue || 0)
                })) : ("实时计价" === A.price ? $.value && ($.value = !1, e.index.showModal({
                  title: "请联系云舍村客服或顾问",
                  content: "您选择的产品因资源保障原因暂无法购买，请联系在线客服。",
                  cancelText: "联系客服",
                  confirmText: "重新选择",
                  success(a) {
                    a.confirm ? ($.value = !0, e.index.navigateBack({
                      delta: 1
                    })) : a.cancel && ($.value = !0, E.value.showDialog())
                  }
                })) : t.jAlert3(o.retVal.msg || o.msg), _.value = !1)
              } catch (e) {
                console.error("queryPayDetail error", e)
              } finally {
                a || (ae.value = !1)
              }
            }
          }), 500);

        function Oe(e) {
          return Number(Number(e).toFixed(2))
        }

        function Me() {
          k.value.showDialog()
        }

        function Ge(a) {
          e.index.redirectTo({
            url: a
          })
        }

        function ke(e) {
          "add" === e ? U.number < U.stock && U.number++ : U.number > F.value && U.number--
        }

        function _e() {
          x.value = !1, I.value = !0
        }

        function Le(e) {
          x.value = e.showGuardDialog
        }
        e.watch(() => {
          var e, a, r;
          return [X.value.basicTeamRateSum, null == (e = Te.value) ? void 0 : e.usedCoupons, null == (a = Te.value) ? void 0 : a.usedPoint, null == (r = Te.value) ? void 0 : r.pointStrategy, oe.value]
        }, () => {
          Ie()
        }), e.watch(() => {
          var e;
          return [U.number, null == (e = Re.value) ? void 0 : e.discount]
        }, () => {
          G.value && Ie()
        }, {
          immediate: !0
        }), e.watch(() => [ve.value, ge.value], ([e, a]) => {
          re.rsvDtos = Array.from({
            length: Number(e)
          }).fill(null).map(() => ({
            arr: "",
            dep: "",
            hotelGroupCode: C.hotelGroupCode,
            hotelCode: C.hotelCode,
            productCode: A.travelType,
            num: 1,
            rmClass: a,
            guestDtos: []
          })), Ie()
        });
        const je = e.ref(!1);

        function Fe() {
          l.adaptor.sendEvent("click_travel_book_control"), G.value ? function() {
            var a;
            if (!re.reserveOrderDto.contactName) return void t.jAlert3("请填写联系人姓名");
            if (!re.reserveOrderDto.contactMobile) return void t.jAlert3("请填写联系人手机号");
            if (!K.value) return;
            const r = {
                hotelCode: C.hotelCode,
                hotelGroupCode: C.hotelGroupCode,
                hotelGroupId: C.hotelGroupId,
                channel: "mini_app",
                domain: "",
                appid: C.appid,
                listShopGoods: [],
                totalCredit: X.value.point,
                original: 1,
                paymentMode: "1",
                address: "",
                addressId: "",
                area: "",
                city: "",
                contact: re.reserveOrderDto.mobile,
                receiver: re.reserveOrderDto.rsvMan,
                remark: U.remark,
                openid: null == N ? void 0 : N.openid,
                formId: "",
                fromOriginal: n.getStorage("staticFrom") || C.hotelCode,
                cardNo: S.cardNo,
                cardName: S.name,
                memberId: S.memberId,
                cardId: S.cardId,
                cardLevel: S.cardLevel,
                winterCampAddInfo: `${U.fromDate} - ${U.toDate}`,
                notMemberContact: (null == S ? void 0 : S.memberId) ? "F" : "T",
                sourceActivityId: L.value,
                sourceActivityName: j.value,
                userCouponVersion: 1,
                cardLevelDescript: S.cardLevelDescript,
                utm_params: l.adaptor.getUtmParam("ALL")
              },
              u = [];
            let d = 0;
            if (w.value.length > 0) {
              const e = {};
              w.value.forEach(a => {
                e.couponNo = a.couponNo, e.concessionaryPrice = z.value, e.type = "coupon", e.couponName = a.couponName
              }), r.scCouponNo = e.couponNo, d += z.value, u.push(e)
            }
            if ("member" === (null == (a = Te.value) ? void 0 : a.pointStrategy) && Re.value) {
              const {
                discount: e,
                desc: a
              } = Te.value.memberDiscountData;
              re.dscAmountInfoDto.memberDiscount = e, re.dscAmountInfoDto.memberLevelDesc = `${a}${Oe(10*e)}折`
            }
            J.value > 0 && (u.push({
              type: "member",
              concessionaryPrice: J.value,
              memberLevelDesc: re.dscAmountInfoDto.memberLevelDesc
            }), d += J.value);
            const m = [];
            A.number = U.number, u.length > 0 && (r.couponAttr = u), X.value.point <= 0 && (A.paymentMethod = "onlyPrice"), r.concessionaryPrice = Number(d), A.concessionaryPrice = Number(d), m.push(A), r.listShopGoods = m, e.index.showLoading({
              title: "下单中..."
            }), K.value = !1, i.api.submitOrder(r).then(a => {
              e.index.hideLoading(), Q.value = !1, 1 === a.result ? (g("COMPLETE_ORDER", {
                payCharge: 100 * Number(X.value.rateSum),
                orderNo: a.retVal.orderNo
              }), s.qdTracker.track("mini_order", {
                commodity_id: A.goodsId,
                commodity_name: A.goodsName,
                order_id: a.retVal.orderNo
              }), h.report(h.actionTypeEnum.order, {
                orderNo: a.retVal.orderNo,
                orderType: "2",
                orderCount: U.number,
                payCharge: X.value.rateSum,
                productId: a.retVal.listShopGoods[0].goodsId,
                productName: a.retVal.listShopGoods[0].goodsName,
                productPrice: ee.value,
                productCategory: "通兑券"
              }), "3" === a.retVal.orderStatus ? Ge(`/pagesB/travel/paySuccess?orderNo=${a.retVal.id}&productType=shop`) : Ge(`/pagesB/other/pay?orderNo=${a.retVal.id}&productType=shop`)) : "" === a.msg ? t.jAlert3(a.retVal.resultMsg) : t.jAlert3(a.msg)
            }).catch(e => {
              (null == e ? void 0 : e.code) === o.RateLimitStatusCode || (null == e ? void 0 : e.status) === o.RateLimitStatusCode ? Q.value = !0 : t.jAlert3("网络异常，请重试")
            }).finally(() => {
              K.value = !0, e.index.hideLoading()
            })
          }() : async function() {
            var a, r, u, n, d;
            if (!ae.value)
              if (re.reserveOrderDto.contactName)
                if (re.reserveOrderDto.contactMobile)
                  if (je.value)
                    if (null == (a = Te.value) ? void 0 : a.pointStrategy) {
                      if (K.value) {
                        if (await D(), e.index.showLoading({
                            title: "下单中..."
                          }), K.value = !1, re.couponUseDtoList = [], re.memberDiscountEnable = "member" === (null == (r = Te.value) ? void 0 : r.pointStrategy), w.value.length > 0 && (w.value.forEach(e => {
                            e.beginDate = e.beginDatetime, e.channel = e.salesChannel, e.endDate = e.endDatetime, e.couponDetailCode = e.couponNo, e.isTdq = "FWQ" === e.couponType ? "T" : "F"
                          }), re.couponUseDtoList = w.value), re.dscAmountInfoDto.payType = re.reserveOrderDto.payType, re.dscAmountInfoDto.couponDscAmount = X.value.couponRateSum, re.utm_params = l.adaptor.getUtmParam("ALL"), re.tagDesc = A.tagDesc, "member" === (null == (u = Te.value) ? void 0 : u.pointStrategy) && Re.value) {
                          const {
                            type: e,
                            discount: a,
                            partnerId: r
                          } = (null == (n = Te.value) ? void 0 : n.memberDiscountData) || {};
                          "member" === e ? (re.dscAmountInfoDto.memberDiscount = Number(a.toFixed(2)), re.dscAmountInfoDto.memberDiscountAmount = X.value.memberDscAmount, re.dscAmountInfoDto.memberLevelDesc = "" + S.cardLevelDescript) : "partner" === e && (re.dscAmountInfoDto.distributorNo = r, re.dscAmountInfoDto.distributorDiscount = a, re.dscAmountInfoDto.memberLevelDesc = `合伙人${Oe(10*a)}折`, re.dscAmountInfoDto.distributorDiscountAmount = J.value)
                        }
                        "FreeTravel" === A.orderType && "PACKAGE" !== A.priceModel && (re.reserveOrderDto.num = ce.value), re.dscAmountInfoDto.pay = X.value.readyPay, re.dscAmountInfoDto.point = X.value.point, re.dscAmountInfoDto.pointMoney = X.value.pointMoney || 0, re.dscAmountInfoDto.adultTeamRateSum = X.value.adultTeamRateSum, re.dscAmountInfoDto.basicTeamRateSum = X.value.basicTeamRateSum, re.dscAmountInfoDto.childrenTeamRateSum = X.value.childrenTeamRateSum, re.dscAmountInfoDto.bigChildrenTeamRateSum = X.value.bigChildrenTeamRateSum, re.dscAmountInfoDto.midChildrenTeamRateSum = X.value.midChildrenTeamRateSum, re.dscAmountInfoDto.babyChildrenTeamRateSum = X.value.babyTeamRateSum, re.dscAmountInfoDto.singleRoomRateSum = X.value.singleRoomRateSum, re.dscAmountInfoDto.guaranteedPrice = X.value.guaranteedPrice, re.dscAmountInfoDto.pointStrategy = null == (d = Te.value) ? void 0 : d.pointStrategy, re.reserveOrderDto.bookingPersonMustTravel = "T", ie.value && (re.reserveOrderDto.adult = ie.value), se.value && (re.reserveOrderDto.bigChildren = se.value), de.value && (re.reserveOrderDto.children = de.value), me.value && (re.reserveOrderDto.baby = me.value), "singleRoom" === oe.value && fe.value > 0 ? (re.reserveOrderDto.singleRoomNum = fe.value, re.reserveOrderDto.singleRoomPrice = pe.value * fe.value) : (re.reserveOrderDto.singleRoomNum = 0, re.reserveOrderDto.singleRoomPrice = 0), "shareRoom" === oe.value && (re.reserveOrderDto.shareRoom = "T"), re.sourceActivityId = L.value, re.sourceActivityName = j.value, re.reserveOrderDto.orderSource = "DirectCustomer", re.reserveOrderDto.orderSourceDesc = "直客", re.reserveOrderDto.customerType = "PERSONAL", re.reserveOrderDto.orderSubSource = "71", re.reserveOrderDto.orderSubSourceDesc = "小程序", "实时计价" === A.price && (re.rsvRmClassList = V.value), _.value ? i.api.saveOrder({
                          ...re,
                          version: R
                        }).then(a => {
                          var r, o;
                          if (Q.value = !1, 1 === a.result) {
                            g("COMPLETE_ORDER", {
                              payCharge: 100 * Number(X.value.readyPay),
                              orderNo: a.msg
                            });
                            let e = {
                              order_id: a.msg,
                              price: X.value.rateSum,
                              preferential_scheme: re.reserveOrderDto.payType
                            };
                            if ((null == A ? void 0 : A.category) && ["BZT", "DestPackage"].includes(A.category) && (e = {
                                ...e,
                                order_type: "旅行产品",
                                order_name: A.title,
                                business_type: A.orderTypeDesc,
                                start_date: A.groupBeginDate,
                                end_date: A.groupEndDate,
                                trip_people_count: ce.value,
                                room_count: ve.value,
                                travel_path: A.itineraryDesc
                              }, l.adaptor.sendEvent("customize_produce_order", e, "OTHER"), s.qdTracker.track("mini_order", {
                                commodity_id: A.travelType,
                                commodity_name: A.title,
                                travel_date: A.groupBeginDate,
                                adult_num: (null == (r = null == A ? void 0 : A.specificationsPriceDtos) ? void 0 : r[0]) ? ie.value : A.adult,
                                children_num: (null == (o = null == A ? void 0 : A.specificationsPriceDtos) ? void 0 : o[0]) ? me.value + de.value + se.value : A.children,
                                order_id: e.order_id
                              }), h.report(h.actionTypeEnum.order, {
                                orderNo: a.msg,
                                orderType: "1",
                                orderCount: 1,
                                payCharge: re.dscAmountInfoDto.pay,
                                productId: re.reserveOrderDto.productCode,
                                productName: re.reserveOrderDto.productDesc,
                                productPrice: ee.value,
                                productCategory: "旅行产品"
                              })), X.value.readyPay <= 0) Ge("/pagesB/travel/orderDetail?orderNo=" + a.msg);
                            else {
                              let e = `/pagesB/other/pay?orderNo=${a.msg}&productType=${A.orderType}&addContactFlag=1`;
                              "T" === A.isSigning && (e += "&contractFlag=1"), Ge(e)
                            }
                          } else {
                            const r = a.msg.includes("超过允许使用张数");
                            e.index.showModal({
                              title: "下单失败",
                              content: a.msg,
                              showCancel: !1,
                              confirmText: "我知道了",
                              confirmColor: "#333333",
                              success(a) {
                                a.confirm && !r && e.index.navigateBack({
                                  delta: 1
                                })
                              }
                            })
                          }
                        }).catch(e => {
                          (null == e ? void 0 : e.code) === o.RateLimitStatusCode || (null == e ? void 0 : e.status) === o.RateLimitStatusCode ? Q.value = !0 : t.jAlert3("网络异常，请重试")
                        }).finally(() => {
                          K.value = !0, e.index.hideLoading()
                        }) : e.index.hideLoading()
                      }
                    } else t.jAlert3("请选择会员折扣方案");
            else t.jAlert3("请勾选我已知晓订单预定人本人必须为出行人");
            else t.jAlert3("请填写联系人手机号");
            else t.jAlert3("请填写联系人姓名")
          }()
        }
        return e.onLoad(e => {
          M.value = null == e ? void 0 : e.productType, L.value = null == e ? void 0 : e.sourceActivityId, e.sourceActivityName && (j.value = decodeURIComponent(e.sourceActivityName))
        }), e.onMounted(async () => {
          var e;
          if (setTimeout(() => {
              g("VIEW_CONTENT", {
                actionParam: {
                  object: "travelConfirmOrder"
                }
              })
            }, 300), re.reserveOrderDto.rsvMan = S.name || "", "T" === S.isRealName && S.name ? re.reserveOrderDto.contactName = S.name : re.reserveOrderDto.rsvMan = S.nickname, S.mobile && (re.reserveOrderDto.mobile = S.mobile, re.reserveOrderDto.contactMobile = S.mobile), G.value) {
            if (_.value = !0, setTimeout(() => {
                O.value.init({
                  checkInDay: Y.value,
                  checkOutDay: B.value,
                  isCheckedInTxt: "开始日期",
                  isCheckedOutTxt: "结束日期"
                })
              }, 500), A.skuId) {
              let e = [],
                a = "";
              const r = A.skuInfo;
              e = "string" == typeof r[0].sku ? JSON.parse(r[0].sku) : r[0].sku;
              for (const r in e) a += e[r].itemValue;
              A.skuInfoStr = a
            }
            Object.assign(U, A), A.minLimit && (F.value = A.minLimit, U.number = A.minLimit)
          } else {
            if ("PEOPLE" === A.priceModel) ie.value = A.adult, de.value = A.children;
            else if ((null == (e = null == A ? void 0 : A.specificationsPriceDtos) ? void 0 : e[0]) && A.number) {
              const {
                adult: e,
                children: a,
                childType: r
              } = A.specificationsPriceDtos[0];
              ie.value = e * A.number, "BIGCHILDREN" === r ? se.value = a * A.number : "CHILDREN" === r ? de.value = a * A.number : "BABY" === r && (me.value = a * A.number)
            }
            await async function() {
              var e, a, r, o, t, u, l;
              try {
                if (1 === ie.value && se.value + de.value + me.value === 2) be.value = 1;
                else {
                  const o = await i.api.interfaceTransfer({
                    query: {
                      unitCode: C.hotelGroupCode,
                      travelGroupCode: A.travelGroupCode,
                      specsCode: (null == (a = null == (e = null == A ? void 0 : A.specificationsPriceDtos) ? void 0 : e[0]) ? void 0 : a.specificationsType) || ""
                    },
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_PRODUCT_JOURNEY",
                      interfaceMethod: "/api/travelGroup/getTravelGroupHotelAvailableNum",
                      interfaceFrom: "GC",
                      hotelGroupCode: C.hotelGroupCode
                    }
                  });
                  0 === (null == (r = null == o ? void 0 : o.retVal) ? void 0 : r.result) && o.retVal.retVal && (be.value = Math.min(Math.ceil(ce.value / 2), o.retVal.retVal))
                }
                if (P.value) {
                  const e = await i.api.interfaceTransfer({
                    query: {
                      unitCode: C.hotelGroupCode,
                      isHalt: "T"
                    },
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_PRODUCT_JOURNEY",
                      interfaceMethod: "/api/itinerary/listTravelRmclassDto",
                      interfaceFrom: "GC",
                      hotelGroupCode: C.hotelGroupCode
                    }
                  });
                  if (1 === e.result && 0 === e.retVal.result) {
                    W.value = e.retVal.retVal.map(e => ({
                      ...e,
                      invalid: !0,
                      name: e.rmclassDescript,
                      rmClass: e.rmclass
                    }));
                    const a = await i.api.interfaceTransfer({
                      query: {
                        unitCode: C.hotelGroupCode,
                        travelGroupCode: A.travelGroupCode
                      },
                      config: {
                        interfaceType: "POST",
                        interfaceModule: "GC_PRODUCT_JOURNEY",
                        interfaceMethod: "/api/travelGroup/listTravelGroupRmtypes",
                        interfaceFrom: "GC",
                        hotelGroupCode: C.hotelGroupCode
                      }
                    });
                    if (1 === a.result && 0 === a.retVal.result && (null == (t = null == (o = a.retVal) ? void 0 : o.retVal) ? void 0 : t.length)) {
                      const e = a.retVal.retVal.map(e => e.rmClass);
                      W.value.forEach(a => {
                        e.includes(a.rmClass) && (a.invalid = !1, ge.value || (ge.value = a.rmClass))
                      })
                    }
                  }
                } else {
                  const e = await i.api.interfaceTransfer({
                    query: {
                      unitCode: C.hotelGroupCode,
                      travelGroupCode: A.travelGroupCode
                    },
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_PRODUCT_JOURNEY",
                      interfaceMethod: "/api/travelGroup/getHotelRoomTypeByTravelGroupCode",
                      interfaceFrom: "GC",
                      hotelGroupCode: C.hotelGroupCode
                    }
                  });
                  if (0 === (null == (u = null == e ? void 0 : e.retVal) ? void 0 : u.result) && (null == (l = null == e ? void 0 : e.retVal) ? void 0 : l.retVal)) {
                    const {
                      tips: a,
                      rmClass: r
                    } = e.retVal.retVal;
                    ye.value = a, ge.value = r
                  } else ye.value = "", ge.value = void 0
                }
              } catch {
                ye.value = "", ge.value = void 0
              }
            }()
          }
          Z.value = !0
        }), (r, o) => {
          var u, l;
          return e.e({
            a: e.o(Le),
            b: e.p({
              color: "#fff",
              title: "确认订单",
              "custom-class": "customPattern",
              "go-back-next": I.value
            }),
            c: G.value
          }, G.value ? e.e({
            d: e.t(e.unref(A).goodsName),
            e: e.unref(A).skuInfoStr
          }, e.unref(A).skuInfoStr ? {
            f: e.t(e.unref(A).skuInfoStr)
          } : {}, {
            g: e.unref(A).peopleNum
          }, e.unref(A).peopleNum ? {
            h: e.t(e.unref(A).peopleNum)
          } : {}, {
            i: "pack" !== e.unref(A).vrType
          }, "pack" !== e.unref(A).vrType ? {
            j: e.t(e.unref(A).useTime)
          } : {}, {
            k: e.unref(b.addCssUnit)(null == (u = e.unref(T)) ? void 0 : u.outerHeight)
          }) : e.e({
            l: e.t(e.unref(A).title),
            m: e.t(e.unref(A).itineraryDesc),
            n: e.t(e.unref(A).groupBeginDateFormat),
            o: e.t(e.unref(A).groupEndDateFormat),
            p: "PACKAGE" === e.unref(A).priceModel
          }, "PACKAGE" === e.unref(A).priceModel ? {
            q: e.t(e.unref(A).number),
            r: e.t(ce.value)
          } : {
            s: e.t(ce.value)
          }, {
            t: e.t(ve.value),
            v: e.unref(b.addCssUnit)(null == (l = e.unref(T)) ? void 0 : l.outerHeight)
          }), {
            w: G.value
          }, G.value ? e.e({
            x: "pack" !== e.unref(A).vrType
          }, "pack" !== e.unref(A).vrType ? {
            y: U.number <= F.value ? 1 : "",
            z: e.o(e => ke("reduce")),
            A: e.t(U.number),
            B: U.number >= U.stock ? 1 : "",
            C: e.o(e => ke("add"))
          } : {}, {
            D: U.remark,
            E: e.o(e => U.remark = e.detail.value)
          }) : {}, {
            F: !G.value
          }, G.value ? {} : e.e({
            G: le.value
          }, le.value ? {
            H: e.unref(a.assets).icQuestionGray
          } : {}, {
            I: e.o(ne),
            J: le.value
          }, le.value ? {
            K: e.t(le.value),
            L: e.sr(ue, "5c545993-1", {
              k: "roomNumInfoPopup"
            }),
            M: e.p({
              title: "房间数说明",
              "max-dialog": !0
            })
          } : {}, {
            N: e.o(e => ve.value = e),
            O: e.p({
              min: be.value,
              max: ie.value,
              modelValue: ve.value
            }),
            P: P.value
          }, P.value ? e.e({
            Q: e.f(W.value, (a, r, o) => ({
              a: "5c545993-3-" + o,
              b: e.p({
                "model-value": ge.value === a.rmClass,
                disabled: a.invalid
              }),
              c: e.t(a.name),
              d: "room-" + a.rmClass,
              e: e.n({
                "form-radio--disabled": a.invalid
              }),
              f: e.o(e => function(e) {
                if (e.invalid) return t.jAlert3("您所选的出行日期没有" + e.name);
                ge.value = e.rmClass
              }(a), "room-" + a.rmClass)
            })),
            R: he.value
          }, he.value ? {
            S: e.p({
              "model-value": "shareRoom" === oe.value
            }),
            T: e.o(e => De("shareRoom")),
            U: e.p({
              "model-value": "singleRoom" === oe.value
            }),
            V: e.o(e => De("singleRoom"))
          } : {}, {
            W: "shareRoom" === oe.value || fe.value > 0
          }, "shareRoom" === oe.value || fe.value > 0 ? e.e({
            X: "shareRoom" === oe.value
          }, "shareRoom" === oe.value ? {} : fe.value > 0 ? {
            Z: e.t(e.unref(f.priceFormat)(pe.value)),
            aa: e.t(fe.value)
          } : {}, {
            Y: fe.value > 0
          }) : {}) : ye.value ? {
            ac: e.t(ye.value)
          } : {}, {
            ab: ye.value,
            ad: P.value
          }, (P.value, {})), {
            ae: re.reserveOrderDto.contactName,
            af: e.o(e => re.reserveOrderDto.contactName = e.detail.value),
            ag: re.reserveOrderDto.contactMobile,
            ah: e.o(e => re.reserveOrderDto.contactMobile = e.detail.value),
            ai: e.sr(Ce, "5c545993-6", {
              k: "discountPlanRef"
            }),
            aj: e.o(Se),
            ak: e.p({
              ready: Z.value,
              "product-type": G.value ? "Shop" : "Travel",
              "pay-price": X.value,
              "travel-info": e.unref(A),
              "shop-info": e.unref(A),
              "fetch-pay-detail-loading": ae.value
            }),
            al: !G.value
          }, G.value ? {} : {
            am: e.o(e => je.value = e),
            an: e.p({
              modelValue: je.value
            })
          }, {
            ao: !_.value
          }, _.value ? e.e({
            ap: X.value.readyPay >= 0
          }, X.value.readyPay >= 0 ? {
            aq: e.p({
              value: X.value.readyPay,
              format: e.unref(f.priceFormat)
            })
          } : {}, {
            ar: e.o(e => Me())
          }) : {}, {
            as: e.o(e => Fe()),
            at: ee.value > 0
          }, ee.value > 0 ? {
            av: e.t(e.unref(f.priceFormat)(ee.value))
          } : {}, {
            aw: G.value
          }, G.value ? {
            ax: e.t(e.unref(A).goodsName),
            ay: e.t(e.unref(f.priceFormat)(X.value.basicTeamRateSum / U.number)),
            az: e.t(U.number)
          } : {}, {
            aA: !G.value
          }, G.value ? {} : e.e({
            aB: X.value.basicTeamRateSum
          }, X.value.basicTeamRateSum ? {
            aC: e.t(e.unref(f.priceFormat)(X.value.basicTeamRateSum))
          } : {}), {
            aD: X.value.adultTeamRateSum > 0
          }, X.value.adultTeamRateSum > 0 ? {
            aE: e.t(e.unref(f.priceFormat)(X.value.adultTeamRateSum / X.value.adult)),
            aF: e.t(X.value.adult)
          } : {}, {
            aG: X.value.bigChildrenTeamRateSum > 0
          }, X.value.bigChildrenTeamRateSum > 0 ? {
            aH: e.t(e.unref(f.priceFormat)(X.value.bigChildrenTeamRateSum / X.value.bigChildren)),
            aI: e.t(X.value.bigChildren)
          } : {}, {
            aJ: X.value.midChildrenTeamRateSum > 0
          }, X.value.midChildrenTeamRateSum > 0 ? {
            aK: e.t("FAMILY" === e.unref(A).priceModel ? "含中童" : "含儿童"),
            aL: e.t(e.unref(f.priceFormat)(X.value.midChildrenTeamRateSum / X.value.midChildren)),
            aM: e.t(X.value.midChildren)
          } : {}, {
            aN: X.value.babyTeamRateSum > 0
          }, X.value.babyTeamRateSum > 0 ? {
            aO: e.t(e.unref(f.priceFormat)(X.value.babyTeamRateSum / (X.value.baby - X.value.babyRoomNum))),
            aP: e.t(X.value.baby - X.value.babyRoomNum)
          } : {}, {
            aQ: X.value.singleRoomRateSum > 0
          }, X.value.singleRoomRateSum > 0 ? {
            aR: e.t(e.unref(f.priceFormat)(pe.value)),
            aS: e.t(fe.value)
          } : {}, {
            aT: X.value.guaranteedPrice
          }, X.value.guaranteedPrice ? {
            aU: e.t(e.unref(f.priceFormat)(X.value.guaranteedPrice))
          } : {}, {
            aV: X.value.couponRateSum > 0
          }, X.value.couponRateSum > 0 ? {
            aW: e.t(e.unref(f.priceFormat)(X.value.couponRateSum))
          } : {}, {
            aX: w.value.length > 0
          }, w.value.length > 0 ? {
            aY: e.f(w.value, (a, r, o) => ({
              a: e.t(a.couponName),
              b: e.t(e.unref(f.valFormat)(a.realValue)),
              c: r
            }))
          } : {}, {
            aZ: X.value.pointMoney + X.value.memberDscAmount > 0
          }, X.value.pointMoney + X.value.memberDscAmount > 0 ? {
            ba: e.t(e.unref(f.priceFormat)((X.value.pointMoney || 0) + (X.value.memberDscAmount || 0)))
          } : {}, {
            bb: X.value.pointMoney > 0
          }, X.value.pointMoney > 0 ? {
            bc: e.t(e.unref(f.priceFormat)(X.value.pointMoney))
          } : {}, {
            bd: X.value.memberDscAmount > 0
          }, X.value.memberDscAmount > 0 ? {
            be: e.t(e.unref(f.priceFormat)(X.value.memberDscAmount))
          } : {}, {
            bf: X.value.readyPay >= 0
          }, X.value.readyPay >= 0 ? {
            bg: e.t(e.unref(f.priceFormat)(X.value.readyPay))
          } : {}, {
            bh: e.o(e => Me()),
            bi: e.o(e => Fe()),
            bj: e.sr(k, "5c545993-9", {
              k: "priceInfo"
            }),
            bk: e.p({
              title: "费用明细"
            }),
            bl: e.sr(O, "5c545993-10", {
              k: "calendarCompent"
            }),
            bm: e.o(H),
            bn: e.p({
              "check-in-day": Y.value,
              "check-out-day": B.value
            }),
            bo: e.sr(E, "5c545993-11", {
              k: "kf"
            }),
            bp: e.p({
              title: "联系客服"
            }),
            bq: e.o(_e),
            br: e.o(() => x.value = !1),
            bs: e.o(e => x.value = e),
            bt: e.p({
              "tracking-data": {
                commodity_id: e.unref(A).travelType || e.unref(A).goodsId,
                commodity_name: e.unref(A).title || e.unref(A).goodsName,
                series: e.unref(A).series,
                theme: e.unref(A).themes,
                rendezvous: e.unref(A).rendezvousDesc,
                dissolution: e.unref(A).dissolutionDesc,
                travel_route: e.unref(A).itineraryDesc,
                travel_date: e.unref(A).groupBeginDate,
                end_date: e.unref(A).groupEndDate
              },
              show: x.value
            }),
            bv: e.o(e => Fe()),
            bw: e.o(e => Q.value = e),
            bx: e.p({
              visible: Q.value
            }),
            by: !x.value,
            bz: e.p({
              "tracking-data": {
                commodity_id: e.unref(A).travelType || e.unref(A).goodsId,
                commodity_name: e.unref(A).title || e.unref(A).goodsName
              }
            })
          })
        }
      }
    }),
    O = e._export_sfc(I, [
      ["__scopeId", "data-v-5c545993"]
    ]);
  wx.createPage(O)
}();
