! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../base/common.js"),
    o = require("../../base/jAlert/jAlert.js"),
    t = require("../../hooks/useAdReport.js"),
    l = require("../../hooks/useScanCoupon.js"),
    u = require("../../hooks/useSubscribeMessage.js"),
    r = require("../../hooks/useXhsReport.js"),
    n = require("../../utils/api.js"),
    v = require("../../utils/coupon.js"),
    i = require("../../utils/filter.js"),
    c = require("../../utils/makeOrder.js"),
    d = require("../../utils/qdTracker.js"),
    s = require("../../utils/umengAdaptor.js"),
    m = require("../../utils/utils.js"),
    p = require("../../utils/wxuser.js");
  Array || (e.resolveComponent("mp-html") + e.resolveComponent("FloatButtonKf"))(), Math || (g + D + (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js") + C + f + y + h + b + T)();
  const f = () => "../../components/bottomDialog.js",
    h = () => "../../components/couponItem.js",
    g = () => "../../components/coustomHead.js",
    y = () => "../../components/empty.js",
    b = () => "../../components/new/CustomerRetentionDialog.js",
    C = () => "../../components/order/OrderContactTipNotice.js",
    D = () => "../../components/order/OrderDiscountPlan.js",
    T = () => "../../components/RetryModal.js",
    N = e.defineComponent({
      __name: "bookInfo",
      setup(f) {
        const h = r.useXshReport(),
          {
            scanCode: g,
            bindCoupon: y,
            exchangeCoupon: b
          } = l.useScanCoupon(),
          C = t.useAdReport(),
          {
            subscribeMessage: D
          } = u.useSubscribeMessage(["SINGLE_ROOM_PAY_SUCCESS", "SINGLE_CANCEL_NOTICE"]);
        setTimeout(() => {
          C("VIEW_CONTENT", {
            object: "hotelConfirmOrder"
          })
        }, 300);
        const T = p.getStorage("config"),
          N = p.getStorage("user"),
          I = p.getStorage("wxuser"),
          A = e.ref(""),
          j = e.ref(""),
          E = e.ref(""),
          R = e.ref(""),
          M = e.ref(""),
          _ = e.ref(""),
          F = e.ref(""),
          k = e.ref(""),
          P = e.ref(""),
          V = e.ref(""),
          L = e.ref(""),
          G = e.ref(""),
          O = e.ref(""),
          x = e.ref(1),
          S = e.ref(""),
          Y = e.ref(""),
          H = e.ref(""),
          q = e.ref(""),
          w = e.ref(""),
          B = e.ref(""),
          U = e.ref(""),
          $ = e.ref(""),
          W = e.ref(""),
          X = e.ref(""),
          Q = e.ref(!1),
          K = e.ref(!1),
          z = e.ref(""),
          J = e.ref(!0),
          Z = e.ref([]),
          ee = e.ref(""),
          ae = e.ref(""),
          oe = e.ref(0),
          te = e.ref([]),
          le = e.ref(""),
          ue = e.ref(!0),
          re = e.ref(0),
          ne = e.ref([]),
          ve = e.ref(""),
          ie = e.ref(),
          ce = e.ref(),
          de = e.ref(),
          se = e.ref([]),
          me = e.ref([0]),
          pe = e.ref(""),
          fe = e.ref(""),
          he = e.reactive(p.getStorage("hotelOrderRoom")),
          ge = e.ref(""),
          ye = e.ref([]),
          be = e.ref(!1),
          Ce = e.ref(!1),
          De = e.ref(0),
          Te = e.ref(!1),
          Ne = e.ref([{
            name: "",
            guestId: "",
            mobile: "",
            idCode: "",
            idNo: "",
            sex: ""
          }]),
          Ie = e.reactive({
            "01": "身份证",
            "02": "临时身份证",
            14: "护照",
            21: "港澳通行证"
          }),
          Ae = e.ref(""),
          je = e.ref(),
          Ee = e.ref("");
        e.ref(!0);
        const Re = e.ref([]),
          Me = e.ref(""),
          _e = e.ref(!0),
          Fe = e.ref(""),
          ke = e.ref(!1),
          Pe = e.ref(""),
          Ve = e.ref(0),
          Le = e.ref(0),
          Ge = e.ref(0),
          Oe = e.ref(0);
        if (he.roomDescript && Re.value.push(he.roomDescript), he.productTags && he.productTags.length > 0) {
          const e = [];
          he.productTags.forEach(a => {
            e.push(a.tagName)
          }), Me.value = e.join(",")
        }
        he.gcRoomExtra && he.gcRoomExtra.bedNum && he.gcRoomExtra.bedType && Re.value.push(`${he.gcRoomExtra.bedType}床x${he.gcRoomExtra.bedNum}`);
        const xe = e.computed(() => {
            const e = new Date(j.value.replace(/-/g, "/")).getTime();
            let a = new Date(E.value.replace(/-/g, "/")).getTime() - e;
            return a = Math.round(a / 864e5), a
          }),
          Se = e.computed(() => {
            let e = 0;
            for (let a = 0; a < ne.value.length; a++) ne.value[a].choosed && e++;
            return e
          });

        function Ye() {
          Ce.value = !1, be.value = !0
        }

        function He(e) {
          Ce.value = e.showGuardDialog
        }

        function qe() {
          g().then(e => {
            y(e).then(e => {
              o.jAlert3("兑换成功"), ra()
            })
          })
        }

        function we() {
          b(Pe.value).then(e => {
            Pe.value = "", o.jAlert3("兑换成功"), ra()
          })
        }

        function Be(e) {
          ke.value = e
        }

        function Ue() {
          Z.value = [], ne.value.forEach((e, a) => {
            e.choosed && Z.value.push(e)
          }), ce.value.hideDialog()
        }

        function $e() {}
        async function We(e) {
          if ((xe.value > 1 || x.value > 1) && ("FR" === e.couponType || "RF" === e.couponType)) return o.jAlert3("当前优惠券只能选一个房晚"), !1;
          for (let a = 0; a < ne.value.length; a++) {
            if (("FR" === e.couponType || "RF" === e.couponType) && e.choosed) return e.choosed = !e.choosed, !1;
            if ("FR" === ne.value[a].couponType && ne.value[a].choosed || "RF" === e.couponType && ne.value[a].choosed) return o.jAlert3("此券仅限使用一张"), !1
          }
          if (Se.value >= re.value && !e.choosed) return o.jAlert3(`可使用优惠券数${re.value}张`);
          if (!e.choosed) {
            const a = ne.value.filter(e => e.choosed).map(e => e.couponNo);
            if (await v.checkCouponExclusion(e.couponNo, a)) return !1
          }
          e.choosed = !e.choosed
        }

        function Xe() {
          ie.value.showDialog()
        }

        function Qe(a) {
          let t = x.value;
          if ("plus" === a && Z.value.length > 0 && ("FR" === Z.value[0].couponType || "RF" === Z.value[0].couponType)) return o.jAlert3("当前优惠券只能选一个房晚"), !1;
          if ("mins" === a) {
            if (Z.value.length === x.value && x.value > 1) return o.jAlert3("您当前选择的房间数量小于可使用的优惠券数量,请先取消一张优惠券再选择房间数量"), !1;
            if (x.value <= 1) return !1;
            if (Q.value) return !1;
            t = x.value - 1
          } else "plus" === a && (t = x.value + 1);
          if (K.value) return !1;
          K.value = !0;
          const l = {
            rmNum: t,
            fromDate: j.value,
            toDate: E.value,
            rsvMan: "testMan",
            mobile: 18888888888,
            remark: z.value,
            hotelCode: L.value,
            hotelGroupCode: $.value || T.hotelGroupCode,
            clientChannel: "WECHAT",
            otaChannel: W.value,
            productCode: A.value,
            openid: null == I ? void 0 : I.openid,
            memberNo: "",
            cardLevel: "",
            cardType: "",
            memberId: "",
            checkInGuests: [{
              name: "testMan"
            }],
            appid: T.appid,
            componentAppid: T.componentAppid,
            srcHotelGroupCode: T.hotelGroupCode
          };
          N && N.memberId && (l.memberNo = N.cardNo ? N.cardNo : "", l.cardLevel = N.cardLevel ? N.cardLevel : "", l.cardType = N.cardType ? N.cardType : "", l.memberId = N.memberId ? N.memberId : ""), n.api.resrvCheck(c.makeOrder(l)).then(l => {
            K.value = !1, 1 === l.result ? (0 === l.retVal.isBookAble && (J.value = !0, Q.value = !1, x.value = t, function(e) {
              "mins" === e ? Ne.value.pop() : "plus" === e && Ne.value.push({
                name: "",
                idNo: ""
              })
            }(a), "init" === a && (ee.value = l.retVal.gcProductDetailDto.arrivalFrom || "12:00", ae.value = l.retVal.gcProductDetailDto.arrivalTo || "23:59", l.retVal.gcProductDetailDto && l.retVal.gcProductDetailDto.productGcLevel && "000" !== l.retVal.gcProductDetailDto.productGcLevel && (_e.value = !1, N && N.memberId && n.api.getAllCardLevel({
              isPhysical: "F",
              hotelGroupId: T.hotelGroupId,
              hotelGroupCode: T.hotelGroupCode,
              cardType: N.cardType
            }).then(e => {
              1 === e.result && e.retVal.listLevelDto && e.retVal.listLevelDto.length > 0 && e.retVal.listLevelDto.forEach(e => {
                console.log(e.code, N.cardLevel), e.code === N.cardLevel && (Fe.value = `已享受${e.descript}会员价`)
              })
            })))), oe.value = Number(l.retVal.rateSum), l.retVal.everyDayDetails.forEach((a, o) => {
              a.rsvDateDesc = a.rsvDate, a.rsvDate = e.dayjs(a.rsvDate).format("MM-DD")
            }), te.value = l.retVal.everyDayDetails, le.value = l.retVal.gcProductDetailDto.tickets || "", N && N.memberId && (Z.value = [], ra())) : (1 === t && (J.value = !1), o.jAlert3(l.msg)), "init" === a && function() {
              const a = [],
                o = Number(ee.value.split(":")[0]) || 12,
                t = 25 - o;
              for (let e = 0; e < t; e++) {
                let t = o + e;
                t < 10 && (t = "0" + t);
                let l = `${j.value} ${t}:00`;
                24 === t && (l = j.value + " 23:59"), a.push(l)
              }
              for (let o = 0; o < a.length; o++) {
                let t = !0;
                e.dayjs(a[o]).isBefore(e.dayjs()) && (t = !1), a[o] = {
                  canTap: t,
                  time: a[o],
                  isTap: !1,
                  displayTime: a[o].split(" ")[1],
                  chooseTime: a[o].split(" ")[1]
                }
              }
              se.value = a, se.value.forEach((e, a) => {
                if (ve.value) return !1;
                e.canTap && (e.isTap = !0, ve.value = e.chooseTime, setTimeout(() => {
                  me.value = [a]
                }, 0))
              })
            }()
          })
        }
        const Ke = e.computed(() => J.value ? "SCORE" === V.value || "TICKET" === V.value ? "兑换" : "立即预订" : "不可订"),
          ze = e.computed(() => {
            if (!Z.value.length) return 0;
            const e = [];
            if (te.value.forEach((a, o) => {
                for (let o = 0; o < Number(x.value); o++) e.push(a.realPrice)
              }), e.sort(), 1 === Z.value.length) {
              const e = Z.value[0];
              return "DF" === e.couponType || "CP" === e.couponType ? Number(Number(e.presentValue).toFixed(2)) >= Number(oe.value) ? Number(oe.value) : Number(Number(e.presentValue).toFixed(2)) : "FR" === e.couponType ? -(Number(Number(e.presentValue).toFixed(2)) - Number(oe.value)) : "RF" === e.couponType ? Number(oe.value) * Number((1 - Number(e.presentValue)).toFixed(2)) : 0
            } {
              let a = 0;
              for (let o = 0; o < Z.value.length; o++) {
                const t = e.pop();
                t - Number(Z.value[o].presentValue) >= 0 ? a += Number(Z.value[o].presentValue) : a += Number(t)
              }
              return Number(a)
            }
          }),
          Je = e.ref({}),
          Ze = e.ref(0);
        let ea = {};
        const aa = e.ref({});

        function oa(e) {
          aa.value = e
        }
        const ta = e.debounce((async function() {
          var a, o, t;
          const l = oe.value || 0;
          let u, r, n, v = l;
          ze.value && (u = ze.value || 0, v -= u), (null == (a = aa.value) ? void 0 : a.usedPoint) && (r = aa.value.usedPoint, v -= r), "member" === aa.value.pointStrategy && (null == (t = null == (o = aa.value) ? void 0 : o.memberDiscountData) ? void 0 : t.discount) < 1 && (n = v * (1 - aa.value.memberDiscountData.discount), v -= n), v < 0 && (v = 0);
          const i = {
            orderPrice: l,
            readyPay: v,
            couponRateSum: u,
            pointMoney: r,
            memberDscAmount: n
          };
          e.isEqual(ea, i) || (Ze.value = Number(i.readyPay.toFixed(2)), Je.value = i, ea = i)
        }), 500);

        function la() {
          const [e] = me.value;
          ve.value = se.value[e].chooseTime, ie.value.hideDialog()
        }

        function ua(e) {
          me.value = e.detail.value, console.log(e)
        }

        function ra() {
          "NONE" !== P.value && N && N.memberId ? (ue.value = !0, "NONE" === P.value ? re.value = 0 : "ROOM" === P.value ? re.value = x.value : "ROOM_NIGHT" === P.value ? re.value = x.value * xe.value : "RESRV" === P.value && (re.value = 1), function() {
            const a = {
              couponType: "",
              rateCode: F.value,
              rmtype: k.value,
              useDate: j.value,
              hotelCode: L.value,
              memberId: N.memberId,
              hotelGroupCode: T.hotelGroupCode,
              hotelGroupId: T.hotelGroupId,
              totalPrice: Ze.value,
              couponCode: le.value,
              suitGroupCode: $.value || T.hotelGroupCode,
              channel: "WECHAT",
              firstPrice: "",
              couponTypeReal: ""
            };
            _e.value || (a.couponTypeReal = "DF,VF,CP"), console.log(), te.value && te.value.length && te.value[0] && (a.firstPrice = te.value[0].realPrice), n.api.findCouponDetailListByCondi(a).then(a => {
              var t;
              1 === a.result ? (a.retVal.listCouponDetailWebDtos.forEach(a => {
                a.choosed = !1, a.descript = a.couponName, a.validFromDate && (a.validFromDate = e.dayjs(a.validFromDate).format("YYYY.MM.DD")), a.validToDate && (a.validToDate = e.dayjs(a.validToDate).format("YYYY.MM.DD")), "RF" === a.couponType ? a.discountNum = Number.parseFloat((10 * a.presentValue).toFixed(1)) : a.discountNum = a.presentValue
              }), ne.value = null == (t = a.retVal.listCouponDetailWebDtos) ? void 0 : t.filter(e => "KFQ" !== e.discountType)) : o.jAlert3(a.msg)
            })
          }()) : ue.value = !1
        }
        e.watch(() => {
          var e, a;
          return [oe.value, ze.value, null == (e = aa.value) ? void 0 : e.usedPoint, null == (a = aa.value) ? void 0 : a.pointStrategy]
        }, () => {
          ta()
        });
        const na = e.ref(!1);

        function va() {
          var t;
          const l = /^1\d{10}$/;
          let u = fe.value;
          return u.includes("*") && (u = N.mobile), !!J.value && (pe.value ? /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(pe.value) ? (o.jAlert3("请不要输入特殊字符"), !1) : l.test(pe.value) ? (o.jAlert3("为了保障您入住过程顺利，请填写真实姓名"), !1) : /^[\u4E00-\u9FA5]{2,5}$|^[a-z/ ]{2,20}$/i.test(pe.value) ? u ? (u = u.trim(), l.test(u) ? ve.value ? 0 === Ne.value.length || Ne.value && Ne.value[0] && "" === Ne.value[0].name ? (o.jAlert3("请输入入住人"), !1) : "TICKET" === V.value && 0 === Z.value.length ? (o.jAlert3("券兑换产品需要选择优惠券进行下单"), !1) : void(na.value ? (null == (t = aa.value) ? void 0 : t.pointStrategy) ? m.requestMsg(Ae.value).then(() => {
            let t = "";
            const l = [];
            Z.value.forEach((e, a) => {
              l.push(e.couponNo)
            }), t = l.join(";");
            const r = Ne.value.filter(e => e.name),
              v = {
                rmNum: x.value,
                fromDate: j.value,
                toDate: E.value,
                rsvMan: N.name || "",
                mobile: N.mobile,
                contactName: pe.value,
                contactMobile: u,
                remark: z.value,
                hotelCode: L.value,
                hotelGroupCode: $.value || T.hotelGroupCode,
                clientChannel: "WECHAT",
                otaChannel: W.value,
                productCode: A.value,
                memberNo: "",
                cardLevel: "",
                cardType: "",
                memberId: "",
                couponDetailCodes: t,
                openid: I.openid,
                hotelGroupId: T.hotelGroupId,
                formId: "",
                appid: T.appid,
                componentAppid: T.componentAppid,
                distributorId: "",
                checkInGuests: r,
                payMethod: V.value,
                arriveTime: ve.value,
                srcHotelGroupCode: T.hotelGroupCode,
                serviceCouponDetailCodes: "",
                rsvClass: "F",
                depTime: "",
                sourceActivityId: R.value,
                sourceActivityName: M.value,
                utm_params: s.adaptor.getUtmParam("ALL")
              };
            if (N && N.memberId && (v.memberNo = N.cardNo ? N.cardNo : "", v.cardLevel = N.cardLevel ? N.cardLevel : "", v.cardType = N.cardType ? N.cardType : "", v.memberId = N.memberId ? N.memberId : ""), "HOUR" === W.value) {
              v.rsvClass = "D";
              const a = Number(X.value),
                o = `${e.dayjs().format("YYYY-MM-DD")} ${ve.value}:00`,
                t = e.dayjs().format("YYYY-MM-DD") + " 23:59:59",
                l = e.dayjs(o).add(a, "hours").format("YYYY-MM-DD HH:mm:ss");
              e.dayjs(l).isAfter(t) ? v.depTime = "23:59:59" : v.depTime = e.dayjs(o).add(a, "hours").format("HH:mm:ss")
            }!async function(t) {
              var l, u, r, v;
              if (K.value) return !1;
              K.value = !0, await D(), t.bookOrderInfoRQ.pointStrategy = null == (l = aa.value) ? void 0 : l.pointStrategy, t.bookOrderInfoRQ.memberDiscount = null == (r = null == (u = aa.value) ? void 0 : u.memberDiscountData) ? void 0 : r.discount, t.bookOrderInfoRQ.bookingPersonMustTravel = "T", t.bookOrderInfoRQ.pointDed = (null == (v = aa.value) ? void 0 : v.usedPoint) || 0, o.jAlert3("正在提交订单"), n.api.resrvCheck(t).then(l => {
                1 === l.result ? n.api.makeOrder(t).then(async a => {
                  var l, u;
                  if (1 === a.result) {
                    Te.value = !1, h.report(h.actionTypeEnum.order, {
                      orderNo: a.retVal,
                      orderType: "1",
                      orderCount: t.bookOrderInfoRQ.rmNum,
                      payCharge: Ze.value,
                      productId: t.productCode,
                      productName: G.value,
                      productPrice: oe.value,
                      productCategory: "酒店"
                    }), C("COMPLETE_ORDER", {
                      payCharge: 100 * Number(Ze.value),
                      orderNo: a.retVal
                    }), null == (l = null == t ? void 0 : t.bookOrderInfoRQ) || l.guests.forEach(e => {
                      "adult" === e.ageType && Ve.value++, "baby" === e.ageType && Le.value++, "children" === e.ageType && Ge.value++, "bigChildren" === e.ageType && Oe.value++
                    }), d.qdTracker.track("hotel_order", {
                      order_id: a.retVal,
                      hotel_name: G.value,
                      checkin_date: j.value,
                      checkout_date: E.value,
                      room_type: he.roomDescript,
                      room_remark: Me.value,
                      room_num: x.value,
                      arrival_time: ve.value,
                      contact_name: pe.value,
                      adult_num: Ve.value,
                      child_num: Le.value + Ge.value + Oe.value,
                      coupon_code: ((null == (u = Z.value) ? void 0 : u.map(e => e.couponCode)) || []).join(",")
                    });
                    const o = {
                      orderNo: a.retVal,
                      productType: "hotel"
                    };
                    e.index.redirectTo({
                      url: "/pagesB/other/pay?" + m.createUrl(o)
                    }), K.value = !1
                  } else K.value = !1, o.jAlert3(a.msg)
                }).catch(e => {
                  (null == e ? void 0 : e.code) !== a.RateLimitStatusCode && (null == e ? void 0 : e.status) !== a.RateLimitStatusCode || (K.value = !1, Te.value = !0)
                }) : (K.value = !1, o.jAlert3(l.msg))
              }).catch(e => {
                (null == e ? void 0 : e.code) !== a.RateLimitStatusCode && (null == e ? void 0 : e.status) !== a.RateLimitStatusCode || (K.value = !1, Te.value = !0)
              })
            }(c.makeOrder(v))
          }) : o.jAlert3("请选择会员折扣方案") : o.jAlert3("请勾选我已知晓订单预定人本人必须为出行人")) : (o.jAlert3("请选择到店时间"), !1) : (o.jAlert3("手机号码有误"), !1)) : (o.jAlert3("请输入手机号码"), !1) : (o.jAlert3("为了保障您入住过程顺利，请填写真实姓名"), !1) : (o.jAlert3("请输入联系人姓名"), !1))
        }

        function ia() {
          if (1 === x.value) return !1;
          const e = ye.value.filter(e => e.active);
          ye.value.forEach(a => {
            a.active || (e.length === x.value ? a.activeNotCan = !0 : a.activeNotCan = !1)
          })
        }
        return e.onShow(() => {
          N && N.memberId && n.api.listGuestLinkExtraInfoWithMemberIdOrOpenId({
            channel: "WECHAT",
            hotelGroupCode: T.hotelGroupCode,
            hotelCode: T.hotelCode,
            memberId: N.memberId,
            openIdType: "WECHAT"
          }).then(e => {
            if (1 === e.result && 0 === e.retVal.result && e.retVal.retVal.length) {
              const a = [];
              e.retVal.retVal.forEach(e => {
                e.guestId && (e.guestLinkRelationExtraSimpleDtoList.forEach(a => {
                  "EXTRA_IDCODE" === a.type && (e.idCode = a.value), "EXTRA_IDNO" === a.type && (e.idNo = a.value), "CAMP_SEX" === a.type && (e.sex = a.value), "EXTRA_EMAIL" === a.type && (e.email = a.value), "EXTRA_MOBILE" === a.type && (e.mobile = a.value), "EXTRA_NAME" === a.type && (e.name = a.value), "EXTRA_BIRTH" === a.type && (e.birth = a.value)
                }), ye.value.forEach(a => {
                  e.guestId === a.guestId && (e.active = a.active, e.activeNotCan = a.activeNotCan)
                }), a.push(e))
              }), ye.value = a
            }
          })
        }), e.onMounted(() => {
          e.index.getSystemInfo({
              success: e => {
                console.log(e), De.value = e.statusBarHeight + 60
              },
              fail(e) {
                console.log(e)
              }
            }),
            function() {
              const e = {
                arrDateStr: j.value,
                cancelPrehour: q.value,
                cancelPretime: w.value,
                cancelPredays: B.value,
                cancelCondition: U.value,
                hotelGroupCode: $.value || T.hotelGroupCode,
                miniAppid: T.appid,
                miniHotelCode: T.hotelCode,
                productHotelCode: L.value,
                productCode: A.value
              };
              n.api.getCancelRule(m.createUrl(e)).then(e => {
                1 === e.result && (ge.value = e.retVal.cancelRule)
              })
            }(), Qe("init"), N && N.memberId && (N.mobile && (fe.value = N.mobile), "T" === N.isRealName && (pe.value = N.name))
        }), e.onLoad(e => {
          console.log(e, 11111111111), A.value = e.productCode || "", j.value = e.fromDate || "", E.value = e.toDate || "", _.value = decodeURIComponent(e.productName), F.value = e.rateCode, k.value = e.rmtype, P.value = e.ticket, V.value = e.payMethod, L.value = e.hotelCode, G.value = decodeURIComponent(e.descript), O.value = decodeURIComponent(e.address), x.value = Number(e.resrvNumMin) || 1, S.value = decodeURIComponent(e.prepayTimeLimit), Y.value = e.prepayHoldTimeMax, H.value = e.prepayMethod, q.value = e.cancelPrehour, w.value = decodeURIComponent(e.cancelPretime), B.value = e.cancelPredays, U.value = e.cancelCondition, $.value = e.hotelGroupCode, W.value = e.otaChannel || "WECHAT", X.value = e.stayTime || 4, e.sourceActivityId && (R.value = e.sourceActivityId), e.sourceActivityName && (M.value = decodeURIComponent(e.sourceActivityName))
        }), (a, t) => {
          var l, u, r, n;
          return e.e({
            a: e.o(He),
            b: e.p({
              color: "#fff",
              title: "确认订单",
              "custom-class": "customPattern",
              "go-back-next": be.value
            }),
            c: e.t(G.value),
            d: e.t(e.unref(i.timeFilterMD)(j.value)),
            e: e.t(e.unref(i.timeFilterMD)(E.value)),
            f: e.t(xe.value),
            g: e.t(Re.value.join("，")),
            h: e.t(Me.value),
            i: De.value + "px",
            j: 1 === x.value ? 1 : "",
            k: e.o(e => Qe("mins")),
            l: e.t(x.value),
            m: e.o(e => Qe("plus")),
            n: e.f(Ne.value, (a, o, t) => e.e({
              a: a.name
            }, a.name ? {
              b: e.o(e => {
                return Ne.value, a = o, ye.value.forEach(e => {
                  e.name === Ne.value[a].name && (e.active = !1)
                }), Ne.value[a] = {
                  name: "",
                  idNo: ""
                }, void ia();
                var a
              }, o),
              c: e.t(a.name),
              d: e.t(Ie[a.idCode]),
              e: e.t(e.unref(i.hideIdCard)(a.idNo, a.idCode))
            } : {
              f: e.o(e => {
                return a = o, Ne.value.length > 1 ? Ee.value = a : Ee.value = "", ye.value.forEach(e => {
                  e.active = !1, Ne.value.forEach(a => {
                    a.name === e.name && (e.active = !0)
                  })
                }), void je.value.showDialog();
                var a
              }, o)
            }, {
              g: o
            })),
            o: ve.value,
            p: e.o(e => ve.value = e.detail.value),
            q: e.o(Xe),
            r: z.value,
            s: e.o(e => z.value = e.detail.value),
            t: pe.value,
            v: e.o(e => pe.value = e.detail.value),
            w: fe.value,
            x: e.o(e => fe.value = e.detail.value),
            y: e.o(oa),
            z: e.p({
              ready: !0,
              "product-type": "Hotel",
              "pay-price": Je.value,
              "hotel-info": {
                hotelCode: L.value
              }
            }),
            A: e.p({
              content: ge.value
            }),
            B: e.o(e => na.value = e),
            C: e.p({
              modelValue: na.value
            }),
            D: e.t(e.unref(i.valFormat)(Ze.value)),
            E: e.o(e => {
              de.value.showDialog()
            }),
            F: e.t(Ke.value),
            G: e.o(va),
            H: e.o(a => e.unref(m.goPage)("/pagesB/travel/travelersInfo")),
            I: e.f(ye.value, (a, o, t) => e.e({
              a: e.o(o => e.unref(m.goPage)("/pagesB/travel/travelersInfo?type=edit&id=" + a.guestId), o),
              b: e.t(a.name),
              c: e.t(Ie[a.idCode]),
              d: e.t(e.unref(i.hideIdCard)(a.idNo, a.idCode)),
              e: a.activeNotCan
            }, (a.activeNotCan || a.active, {}), {
              f: a.active,
              g: o,
              h: e.o(e => function(e) {
                let a = ye.value.filter(e => e.active);
                return 1 === x.value && 1 === a.length ? (ye.value.forEach(e => {
                  e.active = !1
                }), e.active = !0, !1) : !(!e.active && a >= x.value) && (e.active = !e.active, a = ye.value.filter(e => e.active), void ia())
              }(a), o)
            })),
            J: e.o(a => function() {
              const a = [];
              if (ye.value.forEach(o => {
                  if (o.active) {
                    o.guestId && (o.birth && (o.age = e.dayjs(E.value).diff(o.birth, "year")), o.age >= 18 ? (o.ageType = "adult", o.ageTypeDesc = "成人") : o.age >= 12 ? (o.ageType = "bigChildren", o.ageTypeDesc = "大童") : o.age >= 6 ? (o.ageType = "children", o.ageTypeDesc = "中童") : (o.ageType = "baby", o.ageTypeDesc = "幼童"));
                    const t = {
                      guestId: o.guestId,
                      name: o.name,
                      mobile: o.mobile,
                      idCode: o.idCode,
                      idNo: o.idNo,
                      birth: o.birth ? e.dayjs(o.birth).format("YYYY-MM-DD") : "",
                      sex: o.sex || "",
                      age: o.age,
                      ageType: o.ageType,
                      ageTypeDesc: o.ageTypeDesc
                    };
                    a.push(t)
                  }
                }), a.length > x.value) return o.jAlert3(`最多选择${x.value}人`), !1;
              if (a.forEach(e => {
                  e.activeNotCan = !0
                }), a.length < Ne.value.length) {
                const e = Ne.value.length - a.length;
                for (let o = 0; o < e; o++) a.push({
                  name: "",
                  guestId: "",
                  mobile: "",
                  idCode: "",
                  idNo: "",
                  sex: "",
                  age: "",
                  ageType: "",
                  ageTypeDesc: ""
                })
              }
              Ne.value = a, je.value.hideDialog()
            }()),
            K: e.sr(je, "e7b28f9e-4", {
              k: "checkIn"
            }),
            L: e.p({
              title: "选择入住人",
              "max-dialog": !0
            }),
            M: e.o(e => Be(!1)),
            N: e.o(e => Be(!0)),
            O: Pe.value,
            P: e.o(e => Pe.value = e.detail.value),
            Q: ke.value || Pe.value
          }, ke.value || Pe.value ? {
            R: e.o(we)
          } : {}, {
            S: e.o(qe),
            T: 0 === ne.value.length
          }, 0 === ne.value.length ? {
            U: e.p({
              tips: "暂无可用券"
            })
          } : {
            V: e.f(ne.value, (a, o, t) => ({
              a: e.o($e, "coupon-" + o),
              b: e.o(We, "coupon-" + o),
              c: "e7b28f9e-7-" + t + ",e7b28f9e-5",
              d: e.p({
                "coupon-item": a,
                mode: "select"
              }),
              e: "coupon-" + o
            }))
          }, {
            W: e.o(Ue),
            X: e.sr(ce, "e7b28f9e-5", {
              k: "couponListLayer"
            }),
            Y: e.p({
              title: "选择券包"
            }),
            Z: e.t(e.unref(i.valFormat)(oe.value)),
            aa: e.f(te.value, (a, o, t) => ({
              a: e.t(a.rsvDateDesc),
              b: e.t(e.unref(i.valFormat)(a.realPrice)),
              c: o
            })),
            ab: e.t(x.value),
            ac: (Je.value.pointMoney || 0 + Je.value.memberDscAmount || 0) > 0
          }, (Je.value.pointMoney || 0 + Je.value.memberDscAmount || 0) > 0 ? {
            ad: e.t(e.unref(i.valFormat)((Je.value.pointMoney || 0) + (Je.value.memberDscAmount || 0)))
          } : {}, {
            ae: (null == (l = Je.value) ? void 0 : l.pointMoney) > 0
          }, (null == (u = Je.value) ? void 0 : u.pointMoney) > 0 ? {
            af: e.t(e.unref(i.valFormat)(Je.value.pointMoney))
          } : {}, {
            ag: (null == (r = Je.value) ? void 0 : r.memberDscAmount) > 0
          }, (null == (n = Je.value) ? void 0 : n.memberDscAmount) > 0 ? {
            ah: e.t(e.unref(i.valFormat)(Je.value.memberDscAmount))
          } : {}, {
            ai: e.t(e.unref(i.valFormat)(Ze.value)),
            aj: e.o(e => {
              de.value.hideDialog()
            }),
            ak: e.o(va),
            al: e.sr(de, "e7b28f9e-8", {
              k: "priceInfo"
            }),
            am: e.p({
              title: "费用明细"
            }),
            an: e.f(se.value, (a, o, t) => ({
              a: e.t(a.displayTime),
              b: o
            })),
            ao: me.value,
            ap: e.o(ua),
            aq: e.o(la),
            ar: e.sr(ie, "e7b28f9e-9", {
              k: "timeSelect"
            }),
            as: e.p({
              title: "预计到店时间"
            }),
            at: e.o(Ye),
            av: e.o(() => Ce.value = !1),
            aw: e.o(e => Ce.value = e),
            ax: e.p({
              "tracking-data": {
                commodity_id: L.value,
                commodity_name: G.value,
                room_type: he.roomDescript,
                room_product_name: he.name,
                travel_date: j.value,
                end_date: E.value
              },
              show: Ce.value
            }),
            ay: !Ce.value,
            az: e.p({
              "tracking-data": {
                commodity_id: L.value,
                commodity_name: G.value,
                room_type: he.roomDescript,
                room_product_name: he.name
              }
            }),
            aA: e.o(va),
            aB: e.o(e => Te.value = e),
            aC: e.p({
              visible: Te.value
            })
          })
        }
      }
    }),
    I = e._export_sfc(N, [
      ["__scopeId", "data-v-e7b28f9e"]
    ]);
  wx.createPage(I)
}();