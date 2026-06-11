! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/common.js"),
    u = require("../../base/jAlert/jAlert.js"),
    t = require("../../hooks/useSubscribeMessage.js"),
    l = require("../../hooks/useUser.js"),
    n = require("../../services/micro.js"),
    a = require("../../store/modules/micro.js"),
    r = require("../../utils/index.js"),
    i = require("../../utils/config.js"),
    c = require("../../utils/helper.js"),
    s = require("../../utils/qdTracker.js"),
    d = require("../../utils/umengAdaptor.js"),
    p = require("../../utils/utils.js");
  Math || (h + m + v)();
  const m = () => "../../components/bottomDialog.js",
    v = () => "../../components/new/LimitingRetry/LimitingRetryDialog.js",
    h = () => "../../components/new/StButton.js",
    T = e.defineComponent({
      __name: "Coupons",
      props: {
        list: null,
        customStyle: null,
        memberActivityId: null
      },
      emits: ["click-after"],
      setup(m, {
        emit: v
      }) {
        const h = m,
          T = v,
          {
            user: f,
            wxuser: y,
            isLogged: C
          } = l.useUser(),
          g = e.ref();

        function _() {
          const [e] = p.getCurrentCard();
          g.value = e
        }
        e.onMounted(() => {
          _()
        });
        const b = a.useMicroStore(),
          {
            subscribeMessage: N
          } = t.useSubscribeMessage(["COUPON_CREDITED", "COUPON_VALID", "NEW_ACTIVITY_MA"]),
          k = e.ref(!1),
          j = e.ref({
            list: [],
            title: "N选M",
            totalNum: 0,
            selectedNum: 0
          }),
          w = {
            YH: "优惠券",
            XJ: "现金券",
            CP: "现金券",
            FWQ: "通用券",
            mn: "N选M",
            pack: "大礼包"
          },
          A = e.computed(() => {
            var e;
            return null == (e = h.list) ? void 0 : e.map(e => ({
              ...e,
              value: E(e)
            }))
          }),
          I = e.ref([]),
          q = e.ref();

        function V(e) {
          k.value = e
        }

        function E(e) {
          return e.couponType && 0 !== e.presentValue ? "MZ" === e.discountType || "LZ" === e.discountType ? (10 * e.presentValue || 0) + "折" : "¥" + e.presentValue : e.discountNum ? `${"Z"!==e.discountTypeDesc?"¥":""}${e.discountNum}${"Z"===e.discountTypeDesc?"折":""}` : void 0
        }
        const M = e.ref(new Map),
          O = e.ref(!1);

        function R() {
          k.value ? D() : P(q.value)
        }

        function L() {
          var e, o, t;
          return C.value ? "T" !== (null == (e = q.value) ? void 0 : e.canReceived) ? ("T" === (null == (o = q.value) ? void 0 : o.hadReceived) ? u.jAlert3("您已达到最大领取数量") : u.jAlert3("您不符合领取条件，可咨询客服了解更多优惠"), !1) : !((null == (t = q.value) ? void 0 : t.stock) < 1 && (u.jAlert3("手慢了，券被抢光了！"), 1)) : (u.jAlert3("请先登录"), O.value = !0, setTimeout(() => {
            r.jumpLogin()
          }, 500), !1)
        }

        function D() {
          if (I.value.length !== Number(j.value.selectedNum)) return void u.jAlert3(`请选择正确的优惠券数量，该活动需要选择${j.value.selectedNum}张优惠券`);
          if (!L()) return;
          const o = {
              couponCode: q.value.code || q.value.couponCode,
              hotelCode: q.value.hotelCode,
              couponType: q.value.couponType,
              ...e.pick(q.value.memberType[0], ["promotionNo", "promotionCode", "cardId", "cardNo"])
            },
            t = [];
          j.value.list.forEach(e => {
            I.value.forEach(u => {
              "couponNo" === e.type && e.code === u.code && (t.push(e.rewardValue), o.rewardValue = t.join(",")), "ACCOUNT" === e.type && e.rewardValue === u.rewardValue && (o.treatMoney = e.rewardValue), "POINT" === e.type && e.rewardValue === u.rewardValue && (o.treatPoint = e.rewardValue)
            })
          }), U(o, () => {
            setTimeout(() => {
              k.value = !1
            }, 300)
          })
        }

        function P(o) {
          var u;
          if (q.value = o, ["member", "memberConsume", "memberRegister", "orderPendding"].includes(o.ruleType)) return k.value = !0, I.value = [], j.value.list = o.memberType[0].runRecordDetailDtoList.map(e => (e.check = !1, e)), j.value.title = o.name, j.value.selectedNum = o.memberType[0].selectedNum, void(j.value.totalNum = o.memberType[0].totalNum);
          L() && ((null == (u = g.value) ? void 0 : u.memberId) || _(), U({
            couponCode: q.value.couponCode,
            ...e.pick(g.value, ["cardId", "cardNo", "cardLevel"])
          }))
        }
        e.onShow(() => {
          console.log("<Coupons> {onShow} isLogged:", C.value), O.value && q.value && setTimeout(() => {
            C.value && R()
          }, 0), O.value = !1
        });
        const x = e.ref(!1);

        function S() {
          x.value = !1, R()
        }
        async function U(e, t) {
          d.adaptor.sendEvent("click_miniweb_coupons_card_control", {
            button_name: q.value.name,
            coupon_id: q.value.code,
            coupon_name: q.value.name,
            coupon_type: w[q.value.pmsCouponType] || ""
          }, "OTHER"), e = {
            memberId: f.value.memberId,
            mobile: f.value.mobile,
            openid: y.value.openid,
            appid: i.config.appid,
            hotelGroupId: i.config.hotelGroupId,
            hotelGroupCode: i.config.hotelGroupCode,
            hotelCode: q.value.hotelCode,
            couponType: q.value.couponType,
            ...e
          }, (null == h ? void 0 : h.memberActivityId) && (e.memberActivityId = h.memberActivityId), await N(), T("click-after", q.value);
          const l = q.value.id;
          M.value.set(l, !0);
          const a = p.createUrl(e);
          return n.receiveCoupon(a, {
            showErrorToast: !1
          }).then(e => {
            var o;
            (null == (o = null == e ? void 0 : e.couponDetailList) ? void 0 : o.length) && e.couponDetailList.forEach(e => {
              s.qdTracker.track("mini_receive_coupon", {
                current_module_name: "微页面",
                conpons_result: "成功",
                coupon_id: e.no,
                coupon_name: e.descript,
                coupon_type: w[e.couponType] || "",
                coupon_code: e.couponCode
              })
            }), d.adaptor.sendEvent("customize_conpons_result", {
              result: 1
            }, "OTHER"), u.jAlert3("领取成功，请到我的 - 券包内查看"), null == t || t()
          }).catch(e => {
            var t, l, n;
            (null == (t = null == e ? void 0 : e.data) ? void 0 : t._serverLimiting) ? x.value = !0: u.jAlert3((null == (l = null == e ? void 0 : e.data) ? void 0 : l.message) || o.defaultErrorMessage), s.qdTracker.track("mini_receive_coupon", {
              current_module_name: "微页面",
              conpons_result: "失败",
              conpons_fail_reason: (null == (n = null == e ? void 0 : e.data) ? void 0 : n.message) || ""
            }), d.adaptor.sendEvent("customize_conpons_result", {
              result: 0
            }, "OTHER")
          }).finally(() => {
            M.value.has(l) && M.value.delete(l), b.refreshCoupon(l)
          })
        }
        return (o, u) => e.e({
          a: m.list.length > 0
        }, m.list.length > 0 ? e.e({
          b: e.f(A.value, (o, u, t) => e.e({
            a: "YH" === o.pmsCouponType
          }, "YH" === o.pmsCouponType ? {
            b: e.t(w[o.pmsCouponType])
          } : {}, {
            c: "XJ" === o.pmsCouponType || "CP" === o.pmsCouponType
          }, "XJ" === o.pmsCouponType || "CP" === o.pmsCouponType ? {
            d: e.t(w[o.pmsCouponType])
          } : {}, {
            e: "FWQ" === o.pmsCouponType
          }, "FWQ" === o.pmsCouponType ? {
            f: e.t(w[o.pmsCouponType])
          } : {}, {
            g: e.t(o.name),
            h: e.t(o.secondName),
            i: o.value
          }, o.value ? {
            j: e.t(o.value)
          } : {}, {
            k: "T" === o.canReceived
          }, "T" === o.canReceived ? {
            l: e.t(o.stock > 0 ? "立即领取" : "已抢光")
          } : {}, {
            m: e.o(e => P(o), o.id),
            n: "84dd9d4c-0-" + t,
            o: e.p({
              "custom-style": {
                minWidth: e.unref(c.pxTransform)(70, 375)
              },
              theme: "black",
              size: "mini",
              loading: M.value.get(o.id),
              "loading-icon-size": e.unref(c.pxTransform)(24, 375),
              disabled: !("T" === o.canReceived && o.stock > 0),
              "allow-click-when-disabled": !0
            }),
            p: o.id
          })),
          c: k.value && j.value.list.length > 0
        }, k.value && j.value.list.length > 0 ? {
          d: e.f(j.value.list, (o, u, t) => e.e({
            a: "couponNo" === o.type
          }, "couponNo" === o.type ? {
            b: e.t(o.descript)
          } : {}, {
            c: "POINT" === o.type
          }, "POINT" === o.type ? {
            d: e.t(o.rewardValue + "积分")
          } : {}, {
            e: "ACCOUNT" === o.type
          }, "ACCOUNT" === o.type ? {
            f: e.t(o.rewardValue + "元")
          } : {}, {
            g: j.value.selectedNum !== I.value.length || o.check
          }, j.value.selectedNum !== I.value.length || o.check ? e.e({
            h: !o.check
          }, (o.check, {}), {
            i: o.check
          }, (o.check, {})) : {}, {
            j: "batch_" + o.id,
            k: e.o(e => function(e) {
              (e.check || j.value.selectedNum !== I.value.length) && (e.check = !e.check, I.value = j.value.list.filter(e => e.check))
            }(o), "batch_" + o.id)
          })),
          e: e.o(D),
          f: e.p({
            "custom-style": {
              minWidth: e.unref(c.pxTransform)(70, 375)
            },
            theme: "black",
            size: "mini",
            loading: M.value.get(q.value.id),
            "loading-icon-size": e.unref(c.pxTransform)(24, 375)
          })
        } : {}, {
          g: e.o(V),
          h: e.p({
            title: `${j.value.title} ${j.value.totalNum}选${j.value.selectedNum}`,
            sideslip: !1
          }),
          i: e.o(S),
          j: e.o(e => x.value = e),
          k: e.p({
            show: x.value
          }),
          l: e.s(m.customStyle)
        }) : {})
      }
    }),
    f = e._export_sfc(T, [
      ["__scopeId", "data-v-84dd9d4c"]
    ]);
  wx.createComponent(f)
}();