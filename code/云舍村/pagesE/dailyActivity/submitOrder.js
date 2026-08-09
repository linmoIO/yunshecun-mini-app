! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../base/channel.js"),
    a = require("../../base/common.js"),
    t = require("../../base/jAlert/jAlert.js"),
    o = require("../../hooks/useAdReport.js"),
    u = require("../../hooks/useLoading.js"),
    l = require("../../hooks/useScanCoupon.js"),
    i = require("../../hooks/useSubscribeMessage.js"),
    v = require("../../hooks/useXhsReport.js"),
    d = require("../../utils/api.js"),
    c = require("../../utils/filter.js"),
    n = require("../../utils/qdTracker.js"),
    s = require("../../utils/umengAdaptor.js"),
    p = require("../../utils/utils.js"),
    y = require("../../utils/wxuser.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (h + C + m + T + D + g + b + f + O)();
  const m = () => "../../components/bottomDialog.js",
    b = () => "../../components/calendar.js",
    D = () => "../../components/couponItem.js",
    h = () => "../../components/coustomHead.js",
    T = () => "../../components/empty.js",
    f = () => "../../components/new/CustomerRetentionDialog.js",
    C = () => "../../components/radioBox.js",
    O = () => "../../components/RetryModal.js",
    g = () => "../components/dailyPrice.js",
    N = e.defineComponent({
      __name: "submitOrder",
      setup(m) {
        const b = v.useXshReport(),
          D = u.useLoading(!1, "下单中..."),
          {
            scanCode: h,
            bindCoupon: T,
            exchangeCoupon: f
          } = l.useScanCoupon(),
          C = o.useAdReport(),
          {
            subscribeMessage: O
          } = i.useSubscribeMessage(["ORDER_CANCEL_NOTICE", "NOT_COMPLETE_FIRST_PAYMENT"]);
        setTimeout(() => {
          C("VIEW_CONTENT")
        }, 300);
        const asObject = e => e && "object" == typeof e && !Array.isArray(e) ? e : {},
          g = asObject(y.getStorage("config")),
          N = asObject(y.getStorage("user")),
          S = asObject(y.getStorage("wxuser")),
          storedActivityInfo = asObject(y.getStorage("dailyActivityInfo")),
          A = {
            title: "",
            activityCode: "",
            hotels: [],
            minSaleSize: 1,
            minPriceList: [],
            dailyPriceList: [],
            curDailyPrice: {
              sumCapacity: 1,
              embarkDate: "",
              time: "",
              onSaleCode: ""
            },
            minPriceDto: {
              payType: "CASH",
              price: 0
            },
            ...storedActivityInfo
          };
        Array.isArray(A.hotels) || (A.hotels = []), Array.isArray(A.minPriceList) || (A.minPriceList = []), Array.isArray(A.dailyPriceList) || (A.dailyPriceList = []), A.curDailyPrice = {
          sumCapacity: 1,
          embarkDate: "",
          time: "",
          onSaleCode: "",
          ...asObject(A.curDailyPrice)
        }, A.minPriceDto = {
          payType: "CASH",
          price: 0,
          ...asObject(A.minPriceDto)
        };
          E = e.ref(r.defaultActivityChannel),
          I = e.ref(),
          R = e.ref();
        e.ref([]), e.ref(0);
        const P = e.ref(""),
          G = e.ref(),
          L = e.ref(),
          F = e.ref(!1),
          x = e.ref([]);
        e.ref("");
        const H = e.ref(""),
          j = e.ref(""),
          M = e.ref(""),
          _ = e.ref(0);
        e.ref(0), e.ref(0);
        const V = e.ref(0),
          k = e.ref(""),
          q = e.ref(),
          w = e.ref([]),
          Y = e.ref(),
          B = e.ref(1),
          W = e.ref(""),
          X = e.ref([]),
          U = e.ref(!0),
          z = e.ref([]);
        e.ref([]), e.ref("");
        const $ = e.ref(e.dayjs().format("YYYY-MM-DD")),
          Q = e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD")),
          Z = e.ref(!1),
          K = e.ref(!1);
        e.ref(!1);
        const J = e.ref(!0),
          ee = e.ref(!0),
          re = e.ref("35px");
        e.reactive([]);
        const ae = e.ref(!1),
          te = e.ref(),
          oe = e.ref(),
          ue = e.ref({}),
          le = e.ref(0),
          ie = e.ref(0),
          ve = e.ref(0),
          de = e.ref(!0),
          ce = e.ref({
            basicTeamRateSum: 0,
            exchangeRateSum: 0,
            point: 0,
            rateSum: 0,
            memberDscAmount: 0,
            couponRateSum: 0
          }),
          ne = e.ref({
            price: 0,
            priceType: "",
            creditPrice: "",
            credit: ""
          }),
          se = e.ref(!1),
          pe = e.ref(!1),
          ye = e.ref(!1),
          me = e.reactive({
            "01": "身份证",
            "02": "临时身份证",
            14: "护照",
            21: "港澳通行证"
          }),
          be = e.reactive([{
            id: "CASH",
            name: "现金"
          }, {
            id: "INTEGRALCASH",
            name: "现金+积分"
          }, {
            id: "INTEGRAL",
            name: "积分"
          }]);
        let De = e.reactive({
          remark: "",
          fromDate: "",
          toDate: ""
        });

        function he(r) {
          De.fromDate = e.dayjs(r.checkInDay).format("YYYY.MM.DD"), De.toDate = e.dayjs(r.checkOutDay).format("YYYY.MM.DD")
        }
        const Te = e.reactive({
            reserveOrderDto: {
              appid: g.appid,
              price: 0,
              integral: 0,
              productUrl: A.productUrl,
              unitCode: g.hotelGroupCode,
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
              rsvMan: N.name,
              otaChannel: "",
              mobile: N.mobile,
              productCode: A.travelType,
              productDesc: A.title,
              meetingPoint: A.meetingPoint,
              memberNo: N.memberId,
              memberId: N.memberId,
              memberLevel: N.memberLevel,
              cardId: N.cardId,
              cardNo: N.cardNo,
              companyNo: "",
              companyDesc: "",
              beginDate: A.groupBeginDate,
              endDate: A.groupEndDate,
              priceType: "",
              adult: 0,
              bigChildren: 0,
              children: 0,
              baby: 0,
              num: A.number,
              realRate: 0,
              rateSum: 0,
              singleRoomPrice: 0,
              counselor: "",
              isMiniProgram: "",
              isAgency: A.isSigning,
              belongMain: "",
              belongSeason: "",
              remark: "",
              payType: ""
            },
            rsvDtos: []
          }),
          fe = e.ref(!1),
          Ce = e.ref("");

        function Oe(e) {
          De.onSaleCode = e.onSaleCode, De.toDate = e.bizDate, De.number = e.sumCapacity, De.time = e.time, e.onSaleCode && Ye(e.onSaleCode)
        }

        function ge() {
          ae.value ? ae.value = !1 : ae.value = !0
        }

        function Ne() {
          pe.value = !1, se.value = !0
        }

        function Se(e) {
          pe.value = e.showGuardDialog
        }

        function Ae() {
          const r = {
            title: decodeURIComponent("预约协议"),
            code: "reservationProtocol"
          };
          e.index.navigateTo({
            url: "/pagesA/other/codeText?" + p.createUrl(r)
          })
        }

        function Ee() {
          ee.value = !ee.value, re.value = ee.value ? "35px" : "auto"
        }

        function Ie() {
          Z.value && X.value.length ? "FWQ" === X.value[0].couponType ? t.jAlert3("通兑券不能与会员折扣共享") : t.jAlert3("折扣券不能与会员折扣共享") : (w.value.forEach(e => {
            e.type === k.value ? e.choosed = !0 : e.choosed = !1
          }), Y.value.showDialog())
        }
        const Re = e.computed(() => {
          const e = JSON.parse(JSON.stringify(z.value));
          for (let r = 0; r < e.length; r++) {
            const a = e[r];
            let t = 0;
            if (t = "SINGLE" === ne.value.priceType ? "CASH" === Te.reserveOrderDto.payType ? ce.value.basicTeamRateSum * B.value : ne.value.mixPrice * B.value : "CASH" === Te.reserveOrderDto.payType ? ne.value.price * Te.reserveOrderDto.adult + ne.value.bigChildPrice * Te.reserveOrderDto.bigChildren + ne.value.childPrice * Te.reserveOrderDto.children + ne.value.babyPrice * Te.reserveOrderDto.baby : ne.value.mixPrice * Te.reserveOrderDto.adult + ne.value.bigChildPrice * Te.reserveOrderDto.bigChildren + ne.value.childPrice * Te.reserveOrderDto.children + ne.value.babyPrice * Te.reserveOrderDto.baby, t < a.discountPriceBegin) {
              for (let e = 0; e < X.value.length; e++) X.value[e].no === a.no && (X.value.splice(e, 1), e--);
              e.splice(r, 1), r--
            }
            "KFQ" === a.discountType && (e.splice(r, 1), r--)
          }
          return e
        });

        function Pe() {
          k.value = "", q.value = "", w.value.forEach(e => {
            e.choosed && (k.value = e.type, q.value = e.code)
          }), Y.value.hideDialog()
        }

        function Ge(e) {
          w.value.forEach(e => {
            e.choosed = !1
          }), e.choosed = !0
        }

        function Le() {
          x.value.forEach(e => {
            e.active = !1, Te.rsvDtos.forEach(r => {
              r.guestId === e.guestId && (e.active = !0)
            })
          }), R.value.showDialog()
        }

        function Fe() {
          L.value.showDialog()
        }

        function xe(r) {
          e.index.navigateTo({
            url: r
          })
        }

        function He() {
          X.value = [], z.value.forEach((e, r) => {
            e.choosed && X.value.push(e)
          }), G.value.hideDialog()
        }

        function je(e) {
          console.log(e)
        }

        function Me(e) {
          z.value.forEach(r => {
            e.no === r.no && (r.choosed ? r.choosed = !1 : r.choosed = !0)
          }), "FWQ" === e.couponType ? z.value.forEach(e => {
            "FWQ" !== e.couponType && (e.choosed = !1)
          }) : z.value.forEach(r => {
            e.couponNo !== r.couponNo && (r.choosed = !1)
          })
        }

        function _e(e) {
          "add" === e ? B.value < De.number && B.value++ : B.value > 1 && B.value--
        }

        function Ve() {
          h().then(e => {
            T(e).then(e => {
              t.jAlert3("兑换成功"), we()
            })
          })
        }

        function ke() {
          f(Ce.value).then(e => {
            Ce.value = "", t.jAlert3("兑换成功"), we()
          })
        }

        function qe(e) {
          fe.value = e
        }

        function we() {
          const e = {
            hotelGroupCode: g.hotelGroupCode,
            memberId: N.memberId,
            productCode: A.activityCode,
            orderType: "ACTIVITY",
            productPrimaryClassification: A.activityClass,
            productReclassify: A.activityType,
            beginDate: A.curDailyPrice.embarkDate,
            cardNo: N.cardNo,
            suitChannel: "WECHAT"
          };
          d.api.interfaceTransfer({
            query: e,
            config: {
              interfaceType: "POST",
              interfaceModule: "",
              interfaceMethod: "api/coupon/listCouponByUse",
              interfaceFrom: "coupon",
              hotelGroupCode: g.hotelGroupCode
            }
          }).then(e => {
            1 === e.result && e.retVal && 0 === e.retVal.result && (z.value = [], Array.isArray(e.retVal.retVal) && e.retVal.retVal.length > 0 && (z.value = e.retVal.retVal), W.value && z.value.forEach(e => {
              e.couponNo === W.value && (Me(e), He())
            }))
          })
        }

        function Ye(e) {
          const r = {
            unitCode: g.hotelGroupCode,
            activityCode: A.activityCode,
            onSaleCode: e
          };
          d.api.interfaceTransfer({
            query: r,
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_ACTIVITIES_CENTER",
              interfaceMethod: "/api/singleWechat/getPriceDefine",
              interfaceFrom: "GC",
              hotelGroupCode: g.hotelGroupCode
            }
          }).then(e => {
            1 === e.result && e.retVal && 0 === e.retVal.result && e.retVal.retVal && (ne.value = e.retVal.retVal, ce.value.basicTeamRateSum = e.retVal.retVal.price || 0)
          })
        }

        function Be() {
          let r = "";
          "CASH" === Te.reserveOrderDto.payType ? X.value.length > 0 && ie.value <= 0 ? r = "coupon" : ie.value > 0 && X.value.length <= 0 ? r = "member" : ie.value > 0 && X.value.length > 0 && (r = "member,coupon") : "INTEGRAL" === Te.reserveOrderDto.payType ? r = "credit" : "INTEGRALCASH" === Te.reserveOrderDto.payType && (r = "credit", X.value.length > 0 && ie.value <= 0 ? r = "coupon,credit" : ie.value > 0 && X.value.length <= 0 ? r = "member,credit" : ie.value > 0 && X.value.length > 0 && (r = "member,coupon,credit"));
          let a = e.reactive({});
          a = {
            activityDesc: A.title,
            unitCode: g.hotelGroupCode,
            hotelCode: g.hotelCode,
            hotelGroupCode: g.hotelGroupCode,
            hotelGroupId: g.hotelGroupId,
            cardNo: N.cardNo,
            cardName: N.name,
            memberId: N.memberId,
            cardId: N.cardId,
            cardLevel: N.cardLevel,
            activityCode: A.activityCode,
            channel: E.value,
            appid: g.appid,
            guestDtoList: Te.rsvDtos,
            contactMan: Te.reserveOrderDto.rsvMan,
            contactPhone: Te.reserveOrderDto.mobile,
            rsvMan: N.name,
            rsvPhone: N.mobile,
            remark: De.remark,
            payType: Te.reserveOrderDto.payType,
            rateCredit: ce.value.point ? ce.value.point : 0,
            rateSum: ce.value.rateSum ? ce.value.rateSum : 0,
            onSaleCode: De.onSaleCode,
            adult: Te.reserveOrderDto.adult,
            baby: Te.reserveOrderDto.baby,
            bigChild: Te.reserveOrderDto.bigChildren,
            child: Te.reserveOrderDto.children,
            bizDatetime: `${De.toDate} ${De.time}`,
            disType: r,
            couponNo: X.value.length > 0 && "INTEGRAL" !== Te.reserveOrderDto.payType ? X.value[0].couponNo : "",
            memberDiscountCode: -1 === q.value ? "" : q.value
          }, a.orderSource = "DirectCustomer", a.orderSourceDesc = "直客", a.customerType = "PERSONAL", a.orderSubSource = "71", a.orderSubSourceDesc = "小程序", d.api.calculatePrice(a).then(e => {
            1 === e.result ? (H.value = e.retVal.totalCredit, j.value = e.retVal.totalCreditPrice, M.value = e.retVal.totalPrice, ce.value.rateSum = e.retVal.totalPrice, ce.value.point = e.retVal.totalCredit, K.value = !0, function() {
              let e = "";
              ("CASH" === Te.reserveOrderDto.payType || "INTEGRALCASH" === Te.reserveOrderDto.payType) && (e = ce.value.rateSum), k.value && e > 0 ? (w.value.forEach(e => {
                e.choosed && (V.value = e.discount)
              }), ie.value = Number((Number(1 - V.value) * Number(e)).toFixed(2))) : ie.value = 0, le.value = 0, X.value.forEach(r => {
                const a = r;
                "LZ" === a.discountType || "MZ" === a.discountType ? le.value += Number(e) * Number((1 - Number(a.discountNum)).toFixed(2)) : Number(Number(a.discountNum).toFixed(2)) >= Number(e) ? le.value += Number(e) : le.value += Number(Number(a.discountNum).toFixed(2))
              }), le.value > Number(e - ie.value) && (le.value = Number(e - ie.value)), "CASH" === Te.reserveOrderDto.payType && (ce.value.rateSum = ce.value.rateSum - ie.value - le.value, ce.value.point = 0, ve.value = ie.value + le.value, ce.value.rateSum = ce.value.rateSum < 0 ? 0 : ce.value.rateSum), "INTEGRAL" === Te.reserveOrderDto.payType && (ce.value.rateSum = 0, ce.value.point = H.value), "INTEGRALCASH" === Te.reserveOrderDto.payType && (ce.value.rateSum = ce.value.rateSum - ie.value - le.value, ce.value.point = H.value, ce.value.rateSum = ce.value.rateSum < 0 ? 0 : ce.value.rateSum, ve.value = ie.value + le.value)
            }()) : K.value = !1
          })
        }

        function We() {
          !async function() {
            if (!De.toDate) return void t.jAlert3("请选择预约时间");
            if (B.value < A.minSaleSize) return void t.jAlert3(`订单最小${A.minSaleSize}份起售`);
            if (Te.rsvDtos.length !== B.value) return void t.jAlert3("预约份数需和出行人数量一致");
            if (Te.rsvDtos.length < 1) return void t.jAlert3("请选择出行人");
            if (!Te.reserveOrderDto.rsvMan) return void t.jAlert3("请填写联系人姓名");
            if (!Te.reserveOrderDto.mobile) return void t.jAlert3("请填写联系人手机号");
            if (!ae.value) return t.jAlert3("请同意协议"), !1;
            if ("INTEGRAL" === Te.reserveOrderDto.payType && ce.value.point > N.pointBalance) return void t.jAlert3("当前用户积分不够,请换支付方式");
            if (!J.value) return;
            J.value = !1, await O(), D.value = !0;
            let r = "";
            "CASH" === Te.reserveOrderDto.payType ? X.value.length > 0 && ie.value <= 0 ? r = "coupon" : ie.value > 0 && X.value.length <= 0 ? r = "member" : ie.value > 0 && X.value.length > 0 && (r = "member,coupon") : "INTEGRAL" === Te.reserveOrderDto.payType ? r = "credit" : "INTEGRALCASH" === Te.reserveOrderDto.payType && (r = "credit", X.value.length > 0 && ie.value <= 0 ? r = "coupon,credit" : ie.value > 0 && X.value.length <= 0 ? r = "member,credit" : ie.value > 0 && X.value.length > 0 && (r = "member,coupon,credit")), Te.rsvDtos.length && Te.rsvDtos.forEach(e => {
              e.gender = e.sex
            });
            let o = "";
            S && S.openid && (o = S.openid);
            let u = e.reactive({});
            u = {
              openid: o,
              activityDesc: A.title,
              unitCode: g.hotelGroupCode,
              hotelCode: g.hotelCode,
              hotelGroupCode: g.hotelGroupCode,
              hotelGroupId: g.hotelGroupId,
              cardNo: N.cardNo,
              cardName: N.name,
              memberId: N.memberId,
              cardId: N.cardId,
              cardLevel: N.cardLevel,
              activityCode: A.activityCode,
              channel: E.value,
              appid: g.appid,
              guestDtoList: Te.rsvDtos,
              sta: "W",
              contactMan: Te.reserveOrderDto.rsvMan,
              contactPhone: Te.reserveOrderDto.mobile,
              rsvMan: N.name,
              rsvPhone: N.mobile,
              remark: De.remark,
              payType: Te.reserveOrderDto.payType,
              rateCredit: ce.value.point ? ce.value.point : 0,
              rateSum: ce.value.rateSum ? ce.value.rateSum : 0,
              onSaleCode: De.onSaleCode,
              adult: Te.reserveOrderDto.adult,
              baby: Te.reserveOrderDto.baby,
              bigChild: Te.reserveOrderDto.bigChildren,
              child: Te.reserveOrderDto.children,
              bizDatetime: `${De.toDate} ${De.time}`,
              disType: r,
              couponNo: X.value.length > 0 && "INTEGRAL" !== Te.reserveOrderDto.payType ? X.value[0].couponNo : "",
              memberDiscountCode: -1 === q.value ? "" : q.value,
              productUrl: A.indexPicture,
              productPrimaryClassification: A.activityClass,
              productReclassify: A.activityType,
              utm_params: s.adaptor.getUtmParam("ALL")
            }, u.orderSource = "DirectCustomer", u.orderSourceDesc = "直客", u.customerType = "PERSONAL", u.orderSubSource = "71", u.orderSubSourceDesc = "小程序", d.api.saveActivityOrder(u).then(async e => {
              var r, a, o, l;
              if (1 === e.result) {
                if (ye.value = !1, s.adaptor.sendEvent("customize_produce_order", {
                    order_type: "日活动",
                    order_id: null == (r = null == e ? void 0 : e.retVal) ? void 0 : r.orderNo,
                    price: ce.value.rateSum,
                    preferential_scheme: Te.reserveOrderDto.payType,
                    order_name: A.title,
                    start_date: `${De.toDate} ${De.time}`,
                    trip_people_count: B.value
                  }, "OTHER"), C("COMPLETE_ORDER", {
                    payCharge: 100 * Number(null == (a = ce.value) ? void 0 : a.rateSum),
                    orderNo: null == (o = e.retVal) ? void 0 : o.orderNo
                  }), n.qdTracker.track("mini_order", {
                    commodity_id: A.activityCode,
                    commodity_name: A.name,
                    travel_date: De.toDate,
                    adult_num: Te.reserveOrderDto.adult,
                    children_num: Te.reserveOrderDto.baby + Te.reserveOrderDto.children + Te.reserveOrderDto.bigChildren,
                    order_id: null == (l = e.retVal) ? void 0 : l.orderNo
                  }), "CASH" === Te.reserveOrderDto.payType || "INTEGRALCASH" === Te.reserveOrderDto.payType) {
                  let r = 0;
                  "CASH" === Te.reserveOrderDto.payType && ce.value.basicTeamRateSum ? r = Number(ce.value.basicTeamRateSum * B.value) : "INTEGRALCASH" === Te.reserveOrderDto.payType && ne.value.mixPrice && (r = Number(ne.value.mixPrice * B.value)), b.report(b.actionTypeEnum.order, {
                    orderNo: e.retVal.orderNo,
                    orderType: "3",
                    orderCount: B.value,
                    payCharge: u.rateSum,
                    productId: u.activityCode,
                    productName: u.activityDesc,
                    productPrice: r,
                    productCategory: "日活动"
                  })
                }
                "3" === e.retVal.orderStatus ? xe(`/pagesB/travel/paySuccess?orderNo=${e.retVal.orderNo}&productType=activity`) : xe(`/pagesB/other/pay?orderNo=${e.retVal.orderNo}&productType=activity`)
              } else t.jAlert3(e.msg);
              J.value = !0
            }).catch(e => {
              (null == e ? void 0 : e.code) !== a.RateLimitStatusCode && (null == e ? void 0 : e.status) !== a.RateLimitStatusCode || (J.value = !0, ye.value = !0)
            }).finally(() => {
              D.value = !1
            })
          }()
        }
        return e.watch(() => ce.value.basicTeamRateSum, (e, r) => {
          Be()
        }), e.watch(() => X.value, (e, r) => {
          X.value.length > 0 && ("FWQ" === X.value[0].couponType || "LZ" === X.value[0].discountType || "MZ" === X.value[0].discountType) ? (Z.value = !0, k.value = "", w.value.forEach(e => {
            e.choosed = !1
          })) : Z.value = !1, Be()
        }), e.watch(() => k.value, (e, r) => {
          Be()
        }), e.watch(() => Te.reserveOrderDto.payType, (e, r) => {
          Be()
        }), e.watch(() => B.value, (e, r) => {
          Be()
        }), e.watch(() => De.onSaleCode, (e, r) => {
          Ye(e)
        }), e.watch(() => Te.rsvDtos, (e, r) => {
          Te.reserveOrderDto.adult = 0, Te.reserveOrderDto.baby = 0, Te.reserveOrderDto.children = 0, Te.reserveOrderDto.bigChildren = 0, Te.rsvDtos.forEach(e => {
            "adult" === e.ageType && Te.reserveOrderDto.adult++, "baby" === e.ageType && Te.reserveOrderDto.baby++, "children" === e.ageType && Te.reserveOrderDto.children++, "bigChildren" === e.ageType && Te.reserveOrderDto.bigChildren++, Te.allPeople++
          }), Be()
        }, {
          deep: !0
        }), e.watch(() => Te.allPeople, (e, r) => {
          Te.allPeople ? Be() : K.value = !1
        }), e.onLoad(e => {
          e.productType && (P.value = e.productType), setTimeout(() => {
            oe.value.createDate(A.dailyPriceList)
          }, 1e3)
        }), e.onShow(() => {
          d.api.listGuestLinkExtraInfoWithMemberIdOrOpenId({
            channel: E.value,
            hotelGroupCode: g.hotelGroupCode,
            hotelCode: g.hotelCode,
            memberId: N.memberId,
            openIdType: E.value
          }).then(r => {
            if (1 === r.result && r.retVal && 0 === r.retVal.result && Array.isArray(r.retVal.retVal) && r.retVal.retVal.length) {
              const a = [];
              r.retVal.retVal.forEach(r => {
                (Array.isArray(r.guestLinkRelationExtraSimpleDtoList) ? r.guestLinkRelationExtraSimpleDtoList : []).forEach(e => {
                  "EXTRA_IDCODE" === e.type && (r.idCode = e.value), "EXTRA_IDNO" === e.type && (r.idNo = e.value), "CAMP_SEX" === e.type && (r.sex = e.value), "EXTRA_EMAIL" === e.type && (r.email = e.value), "EXTRA_MOBILE" === e.type && (r.mobile = e.value), "EXTRA_NAME" === e.type && (r.name = e.value), "EXTRA_BIRTH" === e.type && (r.birth = e.value)
                }), r.guestNo = r.guestId, r.license = r.idNo, r.phone = r.mobile, r.relationshipWithMe = r.relationship, r.guestId && (r.birth && (r.age = e.dayjs(Te.reserveOrderDto.endDate).diff(r.birth, "year")), r.age >= 18 ? (r.ageType = "adult", r.ageTypeDesc = "成人") : r.age >= 12 ? (r.ageType = "bigChildren", r.ageTypeDesc = "大童") : r.age >= 6 ? (r.ageType = "children", r.ageTypeDesc = "中童") : (r.ageType = "baby", r.ageTypeDesc = "幼童"), x.value.forEach(e => {
                  r.guestId === e.guestId && (r.active = e.active, r.activeNotCan = e.activeNotCan)
                }), a.push(r))
              }), x.value = a
            }
          })
        }), e.onMounted(() => {
          ! function() {
            const e = {
              unitCode: g.hotelGroupCode,
              hotelGroupCode: g.hotelGroupCode,
              memberId: N.memberId,
              rightsType: "activityProductsRightsType"
            };
            d.api.interfaceTransfer({
              query: e,
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_ACTIVITIES_CENTER",
                interfaceMethod: "/crm/v2/queryCardLevelRightsWithMemberId",
                interfaceFrom: "member",
                hotelGroupCode: g.hotelGroupCode
              }
            }).then(e => {
              1 === e.result && e.retVal && 0 === e.retVal.result && (w.value = Array.isArray(e.retVal.retVal) ? e.retVal.retVal : [], w.value.forEach(e => {
                e.discount = e.rightsValue, e.type = "member", e.desc = e.rightsItemDescript
              }), w.value.length > 0 && !W.value && (Ge(w.value[0]), Pe()), w.value.push({
                discount: 1,
                type: "",
                desc: "不使用折扣",
                code: -1
              }))
            })
          }(), d.api.interfaceTransfer({
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_ACTIVITIES_CENTER",
              interfaceMethod: "api/activity/getOneActivityIntroduce",
              interfaceFrom: "GC",
              hotelGroupCode: g.hotelGroupCode
            },
            query: {
              unitCode: g.hotelGroupCode,
              activityCode: A.activityCode,
              activityName: A.title
            }
          }).then(e => {
            1 === e.result && e.retVal && 0 === e.retVal.result && (ue.value = e.retVal.retVal || {})
          }), we(), e.index.getSystemInfo({
            success: e => {
              _.value = e.statusBarHeight + 60
            },
            fail(e) {
              console.log(e)
            }
          });
          const r = {
            number: A.curDailyPrice.sumCapacity,
            toDate: A.curDailyPrice.embarkDate,
            time: A.curDailyPrice.time,
            onSaleCode: A.curDailyPrice.onSaleCode
          };
          De = Object.assign(De, r), B.value = 1, be.forEach(e => {
            A.minPriceList.forEach(r => {
              r.payType === e.id && (r.name = e.name), (N.pointBalance < r.mixCredit || N.pointBalance <= 0) && ("INTEGRAL" !== r.payType && "INTEGRALCASH" !== r.payType || (r.invalid = !0)), Te.reserveOrderDto.payType || r.invalid || (Te.reserveOrderDto.payType = r.payType)
            })
          }), Ye(A.curDailyPrice.onSaleCode)
        }), (r, a) => e.e({
          a: e.o(Se),
          b: e.p({
            color: "#fff",
            title: "确认订单",
            "custom-class": "customPattern",
            "go-back-next": se.value
          }),
          c: e.t(e.unref(A).title),
          d: e.t(e.unref(De).toDate),
          e: e.t(e.unref(De).time),
          f: e.f(e.unref(A).hotels, (r, a, t) => ({
            a: e.t(r.descript),
            b: a
          })),
          g: ee.value && e.unref(A).hotels.length >= 2
        }, ee.value && e.unref(A).hotels.length >= 2 ? {
          h: e.o(Ee)
        } : {}, {
          i: !ee.value && e.unref(A).hotels.length >= 2
        }, !ee.value && e.unref(A).hotels.length >= 2 ? {
          j: e.o(Ee)
        } : {}, {
          k: re.value,
          l: _.value + "px",
          m: B.value <= 1 ? 1 : "",
          n: e.o(e => _e("reduce")),
          o: e.t(B.value),
          p: B.value >= e.unref(De).number ? 1 : "",
          q: e.o(e => _e("add")),
          r: !e.unref(De).toDate
        }, e.unref(De).toDate ? {
          s: e.t(e.unref(De).toDate),
          t: e.t(e.unref(De).time)
        } : {}, {
          v: e.o(e => {
            te.value.showDialog()
          }),
          w: Te.rsvDtos.length > 0
        }, Te.rsvDtos.length > 0 ? {
          x: e.f(Te.rsvDtos, (r, a, t) => e.e({
            a: e.o(e => {
              return r = Te.rsvDtos, t = Number(a), x.value.forEach(e => {
                e.guestId === r[t].guestId && (e.active = !1, e.activeNotCan = !1)
              }), void r.splice(t, 1);
              var r, t
            }, a),
            b: e.t(r.name),
            c: "adult" !== r.ageType
          }, "adult" !== r.ageType ? {
            d: e.t(r.ageTypeDesc)
          } : {}, {
            e: e.t(me[r.idCode]),
            f: e.t(e.unref(c.hideIdCard)(r.idNo)),
            g: a
          }))
        } : {}, {
          y: 0 === Te.rsvDtos.length && Te.rsvDtos.length <= B.value
        }, 0 === Te.rsvDtos.length && Te.rsvDtos.length <= B.value ? {
          z: e.o(e => Le())
        } : Te.rsvDtos.length > 0 && Te.rsvDtos.length < B.value ? {
          B: e.o(e => Le())
        } : {}, {
          A: Te.rsvDtos.length > 0 && Te.rsvDtos.length < B.value,
          C: e.unref(De).remark,
          D: e.o(r => e.unref(De).remark = r.detail.value),
          E: Te.reserveOrderDto.rsvMan,
          F: e.o(e => Te.reserveOrderDto.rsvMan = e.detail.value),
          G: Te.reserveOrderDto.mobile,
          H: e.o(e => Te.reserveOrderDto.mobile = e.detail.value),
          I: "FREE" !== e.unref(A).priceType
        }, "FREE" !== e.unref(A).priceType ? e.e({
          J: e.unref(A).minPriceList
        }, e.unref(A).minPriceList ? {
          K: e.sr("daysRadio", "9ce70134-1"),
          L: e.o(e => Te.reserveOrderDto.payType = e),
          M: e.p({
            datas: e.unref(A).minPriceList,
            dataKey: "payType",
            val: Te.reserveOrderDto.payType
          })
        } : {}, {
          N: "INTEGRAL" === Te.reserveOrderDto.payType || "INTEGRALCASH" === Te.reserveOrderDto.payType
        }, "INTEGRAL" === Te.reserveOrderDto.payType || "INTEGRALCASH" === Te.reserveOrderDto.payType ? {
          O: e.t(ce.value.point ? e.unref(c.valFormat)(ce.value.point) : 0)
        } : {}, {
          P: ("CASH" === Te.reserveOrderDto.payType || "INTEGRALCASH" === Te.reserveOrderDto.payType) && w.value.length > 1
        }, ("CASH" === Te.reserveOrderDto.payType || "INTEGRALCASH" === Te.reserveOrderDto.payType) && w.value.length > 1 ? e.e({
          Q: !k.value
        }, k.value ? {
          T: e.t(e.unref(c.valFormat)(ie.value))
        } : {
          R: e.t(w.value[0].desc),
          S: e.t(Number(10 * w.value[0].discount).toFixed(1))
        }, {
          U: F.value
        }, (F.value, {}), {
          V: e.o(Ie)
        }) : {}, {
          W: "CASH" === Te.reserveOrderDto.payType || "INTEGRALCASH" === Te.reserveOrderDto.payType
        }, "CASH" === Te.reserveOrderDto.payType || "INTEGRALCASH" === Te.reserveOrderDto.payType ? e.e({
          X: Re.value.length >= 0
        }, Re.value.length >= 0 ? e.e({
          Y: 0 === X.value.length
        }, 0 === X.value.length ? {
          Z: e.t(Re.value.length)
        } : {
          aa: e.t(e.unref(c.valFormat)(Number(le.value)))
        }, {
          ab: e.o(e => {
            G.value.showDialog()
          })
        }) : {}) : {}) : {}, {
          ac: ue.value.activityCode
        }, ue.value.activityCode ? {
          ad: ue.value.priceExplain,
          ae: ue.value.extraTips,
          af: ue.value.resrvNotice
        } : {}, {
          ag: ae.value
        }, (ae.value, {}), {
          ah: e.o(Ae),
          ai: e.o(ge),
          aj: Te.rsvDtos.length <= 0
        }, Te.rsvDtos.length <= 0 ? {} : e.e({
          ak: ce.value.rateSum || ce.value.point
        }, ce.value.rateSum || ce.value.point ? e.e({
          al: "CASH" === Te.reserveOrderDto.payType
        }, "CASH" === Te.reserveOrderDto.payType ? {
          am: e.t(e.unref(c.valFormat)(ce.value.rateSum))
        } : {}, {
          an: "INTEGRAL" === Te.reserveOrderDto.payType
        }, "INTEGRAL" === Te.reserveOrderDto.payType ? {
          ao: e.t(e.unref(c.valFormat)(ce.value.point))
        } : {}, {
          ap: "INTEGRALCASH" === Te.reserveOrderDto.payType
        }, "INTEGRALCASH" === Te.reserveOrderDto.payType ? {
          aq: e.t(e.unref(c.valFormat)(ce.value.rateSum)),
          ar: e.t(e.unref(c.valFormat)(ce.value.point))
        } : {}, {
          as: "INTEGRAL" === Te.reserveOrderDto.payType ? 1 : ""
        }) : {}, {
          at: !ce.value.rateSum && !ce.value.point
        }, ce.value.rateSum || ce.value.point ? {} : e.e({
          av: "FREE" === e.unref(A).priceType
        }, (e.unref(A).priceType, {})), {
          aw: e.o(e => Fe())
        }), {
          ax: e.o(e => We()),
          ay: de.value,
          az: e.o(e => xe("/pagesB/travel/travelersInfo")),
          aA: e.f(x.value, (r, a, t) => e.e({
            a: e.o(e => xe("/pagesB/travel/travelersInfo?type=edit&id=" + r.guestId), a),
            b: e.t(r.name),
            c: "adult" !== r.ageType
          }, "adult" !== r.ageType ? {
            d: e.t(r.ageTypeDesc)
          } : {}, {
            e: e.t(me[r.idCode]),
            f: e.t(e.unref(c.hideIdCard)(r.idNo)),
            g: r.activeNotCan
          }, (r.activeNotCan || r.active, {}), {
            h: r.active,
            i: a,
            j: e.o(e => function(e) {
              e.activeNotCan || (e.active = !e.active)
            }(r), a)
          })),
          aB: e.o(e => function() {
            let e = 0;
            if (x.value.forEach(r => {
                (r.active || r.activeNotCan) && e++
              }), e > B.value) return t.jAlert3(`最多选择${B.value}人`), !1;
            x.value.forEach(e => {
              e.active && !e.activeNotCan && (e.guestId, e.guestId, e.name, e.mobile, e.sex, e.ageType, e.age, e.idCode, e.idNo, e.activeNotCan = !0, Te.rsvDtos.push(e))
            }), R.value.hideDialog()
          }()),
          aC: e.sr(R, "9ce70134-2", {
            k: "checkIn"
          }),
          aD: e.p({
            title: "出行人"
          }),
          aE: e.o(e => qe(!1)),
          aF: e.o(e => qe(!0)),
          aG: Ce.value,
          aH: e.o(e => Ce.value = e.detail.value),
          aI: fe.value || Ce.value
        }, fe.value || Ce.value ? {
          aJ: e.o(ke)
        } : {}, {
          aK: e.o(Ve),
          aL: 0 === Re.value.length
        }, 0 === Re.value.length ? {
          aM: e.p({
            tips: "暂无可用券"
          })
        } : {
          aN: e.f(Re.value, (r, a, t) => ({
            a: e.o(je, a),
            b: e.o(Me, a),
            c: "9ce70134-5-" + t + ",9ce70134-3",
            d: e.p({
              "coupon-item": r,
              mode: "select"
            }),
            e: a
          }))
        }, {
          aO: e.o(He),
          aP: e.sr(G, "9ce70134-3", {
            k: "couponListLayer"
          }),
          aQ: e.p({
            title: "选择券包"
          }),
          aR: "SINGLE" === ne.value.priceType
        }, "SINGLE" === ne.value.priceType ? e.e({
          aS: "FREE" !== e.unref(A).priceType
        }, "FREE" !== e.unref(A).priceType ? e.e({
          aT: "CASH" === Te.reserveOrderDto.payType
        }, "CASH" === Te.reserveOrderDto.payType ? {
          aU: e.t(ce.value.basicTeamRateSum ? e.unref(c.valFormat)(Number(ce.value.basicTeamRateSum * B.value)) : 0)
        } : "INTEGRALCASH" === Te.reserveOrderDto.payType ? {
          aW: e.t(ne.value.mixPrice ? e.unref(c.valFormat)(Number(ne.value.mixPrice * B.value)) : 0),
          aX: e.t(ne.value.mixCredit ? e.unref(c.valFormat)(ne.value.mixCredit * B.value) : 0)
        } : e.e({
          aY: ce.value.point
        }, ce.value.point ? {
          aZ: e.t(ne.value.mixCredit ? e.unref(c.valFormat)(ne.value.mixCredit * B.value) : 0)
        } : {}), {
          aV: "INTEGRALCASH" === Te.reserveOrderDto.payType
        }) : {}) : e.e({
          ba: "FREE" !== e.unref(A).priceType
        }, "FREE" !== e.unref(A).priceType ? e.e({
          bb: "CASH" === Te.reserveOrderDto.payType
        }, "CASH" === Te.reserveOrderDto.payType ? {
          bc: e.t(ne.value.price * Te.reserveOrderDto.adult + ne.value.bigChildPrice * Te.reserveOrderDto.bigChildren + ne.value.childPrice * Te.reserveOrderDto.children + ne.value.babyPrice * Te.reserveOrderDto.baby ? e.unref(c.valFormat)(Number(ne.value.price * Te.reserveOrderDto.adult + ne.value.bigChildPrice * Te.reserveOrderDto.bigChildren + ne.value.childPrice * Te.reserveOrderDto.children + ne.value.babyPrice * Te.reserveOrderDto.baby)) : 0)
        } : "INTEGRALCASH" === Te.reserveOrderDto.payType ? {
          be: e.t(ne.value.mixPrice * Te.reserveOrderDto.adult + ne.value.bigChildPrice * Te.reserveOrderDto.bigChildren + ne.value.childPrice * Te.reserveOrderDto.children + ne.value.babyPrice * Te.reserveOrderDto.baby ? e.unref(c.valFormat)(Number(ne.value.mixPrice * Te.reserveOrderDto.adult + ne.value.bigChildPrice * Te.reserveOrderDto.bigChildren + ne.value.childPrice * Te.reserveOrderDto.children + ne.value.babyPrice * Te.reserveOrderDto.baby)) : 0),
          bf: e.t(ne.value.mixCredit ? e.unref(c.valFormat)(Number(ne.value.mixCredit * Te.reserveOrderDto.adult)) : 0)
        } : e.e({
          bg: ne.value.credit
        }, ne.value.credit ? {
          bh: e.t(ne.value.credit ? e.unref(c.valFormat)(Number(ne.value.credit * Te.reserveOrderDto.adult)) : 0)
        } : {}), {
          bd: "INTEGRALCASH" === Te.reserveOrderDto.payType
        }) : {}), {
          bi: "SINGLE" === ne.value.priceType
        }, "SINGLE" === ne.value.priceType ? e.e({
          bj: "FREE" !== e.unref(A).priceType
        }, "FREE" !== e.unref(A).priceType ? e.e({
          bk: "CASH" === Te.reserveOrderDto.payType
        }, "CASH" === Te.reserveOrderDto.payType ? {
          bl: e.t(ce.value.basicTeamRateSum ? e.unref(c.valFormat)(Number(ce.value.basicTeamRateSum * B.value)) : 0)
        } : "INTEGRALCASH" === Te.reserveOrderDto.payType ? {
          bn: e.t(ne.value.mixPrice ? e.unref(c.valFormat)(Number(ne.value.mixPrice * B.value)) : 0),
          bo: e.t(ne.value.mixCredit ? e.unref(c.valFormat)(Number(ne.value.mixCredit * B.value)) : 0)
        } : e.e({
          bp: ce.value.point
        }, ce.value.point ? {
          bq: e.t(ne.value.mixCredit ? e.unref(c.valFormat)(Number(ne.value.mixCredit * B.value)) : 0)
        } : {}), {
          bm: "INTEGRALCASH" === Te.reserveOrderDto.payType
        }) : {}) : e.e({
          br: "FREE" !== e.unref(A).priceType
        }, "FREE" !== e.unref(A).priceType ? e.e({
          bs: "CASH" === Te.reserveOrderDto.payType
        }, "CASH" === Te.reserveOrderDto.payType ? {
          bt: e.t(ne.value.price * Te.reserveOrderDto.adult + ne.value.bigChildPrice * Te.reserveOrderDto.bigChildren + ne.value.childPrice * Te.reserveOrderDto.children + ne.value.babyPrice * Te.reserveOrderDto.baby ? e.unref(c.valFormat)(Number(ne.value.price * Te.reserveOrderDto.adult + ne.value.bigChildPrice * Te.reserveOrderDto.bigChildren + ne.value.childPrice * Te.reserveOrderDto.children + ne.value.babyPrice * Te.reserveOrderDto.baby)) : 0)
        } : "INTEGRALCASH" === Te.reserveOrderDto.payType ? {
          bw: e.t(ne.value.mixPrice * Te.reserveOrderDto.adult + ne.value.bigChildPrice * Te.reserveOrderDto.bigChildren + ne.value.childPrice * Te.reserveOrderDto.children + ne.value.babyPrice * Te.reserveOrderDto.baby ? e.unref(c.valFormat)(Number(ne.value.mixPrice * Te.reserveOrderDto.adult + ne.value.bigChildPrice * Te.reserveOrderDto.bigChildren + ne.value.childPrice * Te.reserveOrderDto.children + ne.value.babyPrice * Te.reserveOrderDto.baby)) : 0),
          bx: e.t(ne.value.mixCredit ? e.unref(c.valFormat)(Number(ne.value.mixCredit * Te.reserveOrderDto.adult)) : 0)
        } : e.e({
          by: ne.value.credit
        }, ne.value.credit ? {
          bz: e.t(ne.value.credit ? e.unref(c.valFormat)(Number(ne.value.credit * Te.reserveOrderDto.adult)) : 0)
        } : {}), {
          bv: "INTEGRALCASH" === Te.reserveOrderDto.payType
        }) : {}), {
          bA: B.value > 0 && "SINGLE" === ne.value.priceType
        }, B.value > 0 && "SINGLE" === ne.value.priceType ? e.e({
          bB: "INTEGRAL" !== Te.reserveOrderDto.payType
        }, "INTEGRAL" !== Te.reserveOrderDto.payType ? e.e({
          bC: "CASH" === Te.reserveOrderDto.payType
        }, "CASH" === Te.reserveOrderDto.payType ? {
          bD: e.t(ce.value.basicTeamRateSum ? e.unref(c.valFormat)(Number(ce.value.basicTeamRateSum)) : 0),
          bE: e.t(B.value)
        } : {}, {
          bF: "INTEGRALCASH" === Te.reserveOrderDto.payType
        }, "INTEGRALCASH" === Te.reserveOrderDto.payType ? {
          bG: e.t(ne.value.mixPrice ? e.unref(c.valFormat)(Number(ne.value.mixPrice)) : 0),
          bH: e.t(ne.value.mixCredit ? e.unref(c.valFormat)(Number(ne.value.mixCredit)) : 0),
          bI: e.t(B.value)
        } : {}) : {}, {
          bJ: "INTEGRAL" === Te.reserveOrderDto.payType
        }, "INTEGRAL" === Te.reserveOrderDto.payType ? {
          bK: e.t(ne.value.mixCredit ? e.unref(c.valFormat)(Number(ne.value.mixCredit)) : 0),
          bL: e.t(B.value)
        } : {}) : e.e({
          bM: "INTEGRAL" !== Te.reserveOrderDto.payType
        }, "INTEGRAL" !== Te.reserveOrderDto.payType ? e.e({
          bN: "CASH" === Te.reserveOrderDto.payType
        }, "CASH" === Te.reserveOrderDto.payType ? e.e({
          bO: Te.reserveOrderDto.adult && ne.value.price
        }, Te.reserveOrderDto.adult && ne.value.price ? {
          bP: e.t(ne.value.price ? e.unref(c.valFormat)(Number(ne.value.price)) : 0),
          bQ: e.t(Te.reserveOrderDto.adult)
        } : {}, {
          bR: Te.reserveOrderDto.bigChildren && ne.value.bigChildPrice
        }, Te.reserveOrderDto.bigChildren && ne.value.bigChildPrice ? {
          bS: e.t(ne.value.bigChildPrice ? e.unref(c.valFormat)(Number(ne.value.bigChildPrice)) : 0),
          bT: e.t(Te.reserveOrderDto.bigChildren)
        } : {}, {
          bU: Te.reserveOrderDto.children && ne.value.childPrice
        }, Te.reserveOrderDto.children && ne.value.childPrice ? {
          bV: e.t(ne.value.childPrice ? e.unref(c.valFormat)(Number(ne.value.childPrice)) : 0),
          bW: e.t(Te.reserveOrderDto.children)
        } : {}, {
          bX: Te.reserveOrderDto.baby && ne.value.babyPrice
        }, Te.reserveOrderDto.baby && ne.value.babyPrice ? {
          bY: e.t(ne.value.babyPrice ? e.unref(c.valFormat)(Number(ne.value.babyPrice)) : 0),
          bZ: e.t(Te.reserveOrderDto.baby)
        } : {}) : {}, {
          ca: "INTEGRALCASH" === Te.reserveOrderDto.payType
        }, "INTEGRALCASH" === Te.reserveOrderDto.payType ? e.e({
          cb: Te.reserveOrderDto.adult
        }, Te.reserveOrderDto.adult ? {
          cc: e.t(ne.value.mixPrice ? e.unref(c.valFormat)(Number(ne.value.mixPrice)) : 0),
          cd: e.t(ne.value.mixCredit ? e.unref(c.valFormat)(Number(ne.value.mixCredit)) : 0),
          ce: e.t(Te.reserveOrderDto.adult)
        } : {}, {
          cf: Te.reserveOrderDto.bigChildren && ne.value.bigChildPrice
        }, Te.reserveOrderDto.bigChildren && ne.value.bigChildPrice ? {
          cg: e.t(ne.value.bigChildPrice ? e.unref(c.valFormat)(Number(ne.value.bigChildPrice)) : 0),
          ch: e.t(Te.reserveOrderDto.bigChildren)
        } : {}, {
          ci: Te.reserveOrderDto.children && ne.value.childPrice
        }, Te.reserveOrderDto.children && ne.value.childPrice ? {
          cj: e.t(ne.value.childPrice ? e.unref(c.valFormat)(Number(ne.value.childPrice)) : 0),
          ck: e.t(Te.reserveOrderDto.children)
        } : {}, {
          cl: Te.reserveOrderDto.baby && ne.value.babyPrice
        }, Te.reserveOrderDto.baby && ne.value.babyPrice ? {
          cm: e.t(ne.value.babyPrice ? e.unref(c.valFormat)(Number(ne.value.babyPrice)) : 0),
          cn: e.t(Te.reserveOrderDto.baby)
        } : {}) : {}) : {}, {
          co: "INTEGRAL" === Te.reserveOrderDto.payType
        }, "INTEGRAL" === Te.reserveOrderDto.payType ? e.e({
          cp: Te.reserveOrderDto.adult
        }, Te.reserveOrderDto.adult ? {
          cq: e.t(ne.value.credit ? e.unref(c.valFormat)(Number(ne.value.credit)) : 0),
          cr: e.t(Te.reserveOrderDto.adult)
        } : {}) : {}), {
          cs: ve.value > 0 && "INTEGRAL" !== Te.reserveOrderDto.payType
        }, ve.value > 0 && "INTEGRAL" !== Te.reserveOrderDto.payType ? {
          ct: e.t(e.unref(c.valFormat)(Number(ve.value)))
        } : {}, {
          cv: ie.value > 0 && "INTEGRAL" !== Te.reserveOrderDto.payType
        }, ie.value > 0 && "INTEGRAL" !== Te.reserveOrderDto.payType ? {
          cw: e.t(e.unref(c.valFormat)(Number(ie.value)))
        } : {}, {
          cx: le.value > 0 && "INTEGRAL" !== Te.reserveOrderDto.payType
        }, le.value > 0 && "INTEGRAL" !== Te.reserveOrderDto.payType ? {
          cy: e.t(e.unref(c.valFormat)(Number(le.value)))
        } : {}, {
          cz: ae.value
        }, (ae.value, {}), {
          cA: e.o(Ae),
          cB: e.o(ge),
          cC: ce.value.rateSum || ce.value.point
        }, ce.value.rateSum || ce.value.point ? e.e({
          cD: "CASH" === Te.reserveOrderDto.payType
        }, "CASH" === Te.reserveOrderDto.payType ? {
          cE: e.t(e.unref(c.valFormat)(Number(ce.value.rateSum)))
        } : {}, {
          cF: "INTEGRAL" === Te.reserveOrderDto.payType
        }, "INTEGRAL" === Te.reserveOrderDto.payType ? {
          cG: e.t(e.unref(c.valFormat)(Number(ce.value.point)))
        } : {}, {
          cH: "INTEGRALCASH" === Te.reserveOrderDto.payType
        }, "INTEGRALCASH" === Te.reserveOrderDto.payType ? {
          cI: e.t(e.unref(c.valFormat)(Number(ce.value.rateSum))),
          cJ: e.t(e.unref(c.valFormat)(Number(ce.value.point)))
        } : {}, {
          cK: ce.value.rateSum <= 0 && ce.value.point >= 0 ? 1 : ""
        }) : {}, {
          cL: !ce.value.rateSum && !ce.value.point
        }, ce.value.rateSum || ce.value.point ? {} : e.e({
          cM: "FREE" === e.unref(A).priceType
        }, (e.unref(A).priceType, {})), {
          cN: e.o(e => Fe()),
          cO: e.o(e => We()),
          cP: e.sr(L, "9ce70134-6", {
            k: "priceInfo"
          }),
          cQ: e.p({
            title: "费用明细"
          }),
          cR: e.sr(oe, "9ce70134-8,9ce70134-7", {
            k: "dailyPrices"
          }),
          cS: e.o(Oe),
          cT: e.o(e => {
            te.value.hideDialog()
          }),
          cU: e.sr(te, "9ce70134-7", {
            k: "orderLayer"
          }),
          cV: e.p({
            title: "预约时间"
          }),
          cW: e.f(w.value, (r, a, t) => e.e({
            a: e.t(r.desc),
            b: r.type
          }, r.type ? {
            c: e.t(Number(10 * r.discount).toFixed(1))
          } : {}, U.value ? e.e({
            d: r.choosed
          }, (r.choosed, {})) : {}, {
            e: a,
            f: e.o(e => Ge(r), a)
          })),
          cX: U.value,
          cY: e.o(Pe),
          cZ: e.sr(Y, "9ce70134-9", {
            k: "discountListLayer"
          }),
          da: e.p({
            title: "选择折扣"
          }),
          db: e.sr(I, "9ce70134-10", {
            k: "calendarCompent"
          }),
          dc: e.o(he),
          dd: e.p({
            "check-in-day": $.value,
            "check-out-day": Q.value
          }),
          de: e.o(Ne),
          df: e.o(() => pe.value = !1),
          dg: e.o(e => pe.value = e),
          dh: e.p({
            "tracking-data": {
              commodity_id: e.unref(A).activityCode,
              commodity_name: e.unref(A).name
            },
            show: pe.value
          }),
          di: !pe.value,
          dj: e.p({
            "tracking-data": {
              commodity_id: e.unref(A).activityCode,
              commodity_name: e.unref(A).name
            }
          }),
          dk: e.o(e => We()),
          dl: e.o(e => ye.value = e),
          dm: e.p({
            visible: ye.value
          })
        })
      }
    }),
    S = e._export_sfc(N, [
      ["__scopeId", "data-v-9ce70134"]
    ]);
  wx.createPage(S)
}();
