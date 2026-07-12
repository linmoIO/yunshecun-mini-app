! function() {
  "use strict";
  const e = require("../../../common/vendor.js"),
    a = require("../../../base/jAlert/jAlert.js"),
    o = require("../../../utils/api.js"),
    l = require("../../../utils/coupon.js"),
    t = require("../../../utils/filter.js"),
    u = require("../../../utils/helper.js"),
    r = require("../../../utils/utils.js"),
    n = require("../../../utils/wxuser.js");
  Math || (v + c + p + i + s + d)();
  const i = () => "../../../components/bottomDialog.js",
    v = () => "../../../components/couponItem.js",
    c = () => "../../../components/new/ErrorBlock.js",
    p = () => "../../../components/new/SafeArea.js",
    d = () => "../../../components/new/StDialog.js",
    s = () => "../../../components/new/StRadio.js",
    m = e.defineComponent({
      __name: "OrderDiscountPlan",
      props: {
        ready: {
          type: Boolean,
          default: !1
        },
        productType: {
          default: "Travel"
        },
        payPrice: null,
        travelInfo: {
          default: () => ({})
        },
        shopInfo: null,
        hotelInfo: null,
        fetchPayDetailLoading: {
          type: Boolean
        }
      },
      emits: ["change"],
      setup(i, {
        expose: v,
        emit: c
      }) {
        const p = i,
          d = c,
          s = e.computed(() => ["Travel", "Shop"].includes(p.productType)),
          m = e.computed(() => ["Travel", "Hotel"].includes(p.productType)),
          f = n.getStorage("user"),
          y = n.getStorage("config") || {},
          h = e.ref(),
          g = e.ref(),
          b = e.ref([]),
          T = e.ref(!1),
          S = e.ref([]),
          P = e.ref(),
          I = e.ref({});

        function C() {
          T.value && d("change", I.value)
        }
        const D = e.ref(!0);
        e.watch(() => [m.value, T.value], () => {
          D.value && T.value && !m.value && (D.value = !1, ae("member"))
        }, {
          immediate: !0
        });
        const w = e.ref(!1),
          j = e.computed(() => {
            var e, a, o;
            const l = ((null == (e = p.payPrice) ? void 0 : e.basicTeamRateSum) || 0) + ((null == (a = p.payPrice) ? void 0 : a.singleRoomRateSum) || 0) + ((null == (o = p.payPrice) ? void 0 : o.guaranteedPrice) || 0);
            return S.value.filter(e => l >= e.discountPriceBegin)
          }),
          x = e.ref([]),
          F = e.ref([]);
        e.watch(() => {
          var e;
          return [null == (e = I.value) ? void 0 : e.pointStrategy, j.value, b.value]
        }, () => {
          var e, a;
          (null == (e = j.value) ? void 0 : e.length) && (x.value = [], F.value = [], "member" !== (null == (a = I.value) ? void 0 : a.pointStrategy) ? x.value = j.value : j.value.forEach(e => {
            "F" === e.memberStacking ? F.value.push(e) : x.value.push(e)
          }))
        }, {
          immediate: !0
        });
        const M = e.computed(() => {
            var e;
            return null == (e = b.value.filter(e => "member" !== I.value.pointStrategy || "F" !== e.memberStacking)) ? void 0 : e.length
          }),
          k = e.computed(() => {
            var e;
            return null == (e = x.value.filter(e => "member" !== I.value.pointStrategy || "F" !== e.memberStacking)) ? void 0 : e.length
          }),
          R = e.ref(),
          G = e.computed(() => {
            var e, a;
            return (null == (e = p.payPrice) ? void 0 : e.readyPay) + ((null == (a = p.payPrice) ? void 0 : a.pointMoney) || R.value || 0)
          }),
          N = e.ref(0),
          q = e.computed(() => Math.min(N.value || 0, G.value)),
          A = e.ref(""),
          E = e.computed(() => Number(A.value) || 0),
          V = e.computed(() => E.value > q.value);

        function B() {
          var e;
          ! function() {
            const e = {
              memberId: f.memberId,
              firstResult: 0,
              pageSize: 10,
              hotelGroupId: y.hotelGroupId,
              hotelGroupCode: y.hotelGroupCode,
              pointType: ""
            };
            o.api.listPointByMemberId(e).then(e => {
              1 === e.result && (N.value = Math.floor(e.retVal.pointBalance || 0))
            })
          }(), A.value = String(R.value || ""), null == (e = g.value) || e.showDialog()
        }

        function H() {
          A.value = String(Math.floor(q.value))
        }

        function L() {
          var e;
          V.value || (R.value = E.value || 0, I.value.usedPoint = R.value, null == (e = g.value) || e.hideDialog(), C())
        }

        function _() {
          var e;
          S.value.forEach(e => {
            e.choosed = b.value.some(a => a.couponNo === e.couponNo)
          }), null == (e = h.value) || e.showDialog()
        }

        function O(a) {
          "Shop" === p.productType ? function(e) {
            S.value.forEach(a => {
              a.choosed = a.couponNo === e.couponNo && !a.choosed
            })
          }(a) : async function(a) {
            if (!a.choosed) {
              if ("YH" === a.couponType) {
                const a = S.value.find(e => "YH" === e.couponType && e.choosed);
                if (a) return void e.index.showModal({
                  title: "提示",
                  content: "优惠券仅限使用1张，已使用优惠券：" + a.descript,
                  showCancel: !1
                })
              }
              const o = j.value.filter(e => e.choosed).map(e => e.couponNo);
              if (await l.checkCouponExclusion(a.couponNo, o)) return
            }
            a.choosed = !a.choosed
          }(a)
        }
        e.watchEffect(() => {
          p.ready && async function() {
            T.value || (await async function() {
              var e, a, l, t, u;
              const r = {
                goodsId: p.travelInfo.travelType,
                hotelGroupCode: y.hotelGroupCode,
                memberId: null == f ? void 0 : f.memberId,
                mobile: null == f ? void 0 : f.mobile,
                orderType: p.travelInfo.orderType,
                rightsType: "travelProductsRightsType"
              };
              "Shop" === p.productType ? (r.orderType = "shop", r.rightsType = "exchangeCouponRightsType", r.goodsId = p.shopInfo.goodsId) : "Hotel" === p.productType && (r.orderType = "SingleRoom", r.hotelCode = p.hotelInfo.hotelCode, Reflect.deleteProperty(r, "goodsId"));
              try {
                const n = await o.api.getDiscountOfMember(r);
                if (1 !== n.result) return;
                const {
                  memberDiscount: i,
                  partnerDiscount: v,
                  comment: c
                } = n.retVal || {};
                if (n.retVal.memberDiscount <= ((null == (e = n.retVal) ? void 0 : e.partnerDiscount) || 1) ? P.value = {
                    type: "member",
                    discount: i,
                    desc: c
                  } : P.value = {
                    type: "partner",
                    discount: v,
                    partnerId: null == (a = n.retVal) ? void 0 : a.partnerId,
                    desc: c
                  }, P.value) {
                  w.value = (null == (l = P.value) ? void 0 : l.discount) < 1;
                  let e = Math.round(100 * ((null == (t = P.value) ? void 0 : t.discount) || 1));
                  e % 10 == 0 && (e /= 10), P.value.formatedDesc = `${null==(u=P.value)?void 0:u.desc}${w.value?e+"折":""}`, I.value.memberDiscountData = P.value, C()
                }
              } catch {}
            }(), s.value && function() {
              S.value = [];
              const e = {
                beginDate: p.travelInfo.groupBeginDate,
                cardNo: null == f ? void 0 : f.cardNo,
                hotelGroupCode: y.hotelGroupCode,
                memberId: null == f ? void 0 : f.memberId,
                orderType: "TRAVEL",
                productCode: p.travelInfo.travelType,
                suitChannel: "WECHAT"
              };
              "Shop" === p.productType ? (e.orderType = "SHOP", e.productCode = p.shopInfo.goodsId, e.productPrimaryClassification = 3, e.useSource = "SC") : (e.itineraryCode = p.travelInfo.itineraryCode, e.productCode = p.travelInfo.travelType, e.productPrimaryClassification = p.travelInfo.orderType, e.travelType = p.travelInfo.travelGroupCode), o.api.interfaceTransfer({
                query: e,
                config: {
                  interfaceFrom: "coupon",
                  interfaceMethod: "api/coupon/listCouponByUse",
                  interfaceModule: "",
                  interfaceType: "POST",
                  hotelGroupCode: y.hotelGroupCode
                }
              }).then(e => {
                1 === e.result && 0 === e.retVal.result && (S.value = (e.retVal.retVal || []).filter(e => !("KFQ" === e.discountType || "Shop" === p.productType && "FWQ" === e.couponType)))
              })
            }(), T.value = !0)
          }()
        });
        const z = e.ref(),
          Q = e.ref();

        function U() {
          var e, a;
          m.value && (Q.value !== (null == (e = I.value) ? void 0 : e.pointStrategy) && (Q.value = I.value.pointStrategy), null == (a = z.value) || a.showDialog())
        }
        const W = e.computed(() => {
            var e;
            return r.subtraction(r.addNum(.05, 1), (null == (e = P.value) ? void 0 : e.discount) || 1)
          }),
          Y = e.computed(() => {
            var e, a;
            return ((null == (e = p.payPrice) ? void 0 : e.readyPay) || 0) + ((null == (a = p.payPrice) ? void 0 : a.memberDscAmount) || 0)
          }),
          K = e.computed(() => Math.ceil(Y.value * W.value)),
          $ = e.computed(() => w.value ? Number((Y.value * (1 - P.value.discount)).toFixed(2)) : 0);

        function J(e) {
          "member" !== e || w.value ? Q.value = e : a.jAlert3("暂无可用折扣")
        }
        const X = e.ref(),
          Z = e.ref(0);

        function ee() {
          var e;
          X.value = !1, null == (e = z.value) || e.hideDialog()
        }

        function ae(e) {
          var a, o;
          e !== I.value.pointStrategy ? (I.value.pointStrategy = e, b.value.forEach(a => {
            "member" === e && "F" === a.memberStacking ? (a.choosed = !1, a.disabled = !0) : a.disabled = !1
          }), b.value = b.value.filter(e => !e.disabled), I.value.usedCoupons = b.value, null == (o = z.value) || o.hideDialog(), C()) : null == (a = z.value) || a.hideDialog()
        }

        function oe() {
          X.value = !1, ae("member")
        }

        function le() {
          if (Q.value) {
            if (Z.value = 0, "member" === Q.value) return Z.value = b.value.filter(e => "F" === e.memberStacking).length, void(Z.value > 0 ? X.value = !0 : ae("member"));
            ae(Q.value)
          }
        }
        return v({
          setUsedPoint: function(e) {
            R.value = e, I.value.usedPoint = R.value, C()
          }
        }), (a, o) => {
          var l, r, n, v, c, p, d, f, y, T;
          return e.e({
            a: s.value
          }, s.value ? e.e({
            b: "Travel" === i.productType && M.value
          }, "Travel" === i.productType && M.value ? {
            c: e.t(M.value)
          } : (k.value, {}), {
            d: k.value,
            e: k.value
          }, k.value ? e.e({
            f: null == (l = i.payPrice) ? void 0 : l.couponRateSum
          }, (null == (r = i.payPrice) ? void 0 : r.couponRateSum) ? {
            g: e.t(e.unref(t.valFormat)(i.payPrice.couponRateSum))
          } : {
            h: e.t(k.value)
          }) : {}, {
            i: e.o(_)
          }) : {}, {
            j: x.value.length
          }, x.value.length ? {
            k: e.f(x.value, (a, o, l) => ({
              a: e.o(() => O(a), "coupon-" + o),
              b: "4a645e2c-1-" + l + ",4a645e2c-0",
              c: e.p({
                mode: "select",
                "coupon-item": a,
                "single-select": "Travel" === i.productType,
                "show-member-stacking-flag": !0
              }),
              d: "coupon-" + o
            }))
          } : {}, {
            l: F.value.length
          }, F.value.length ? {
            m: e.f(F.value, (a, o, l) => ({
              a: "4a645e2c-2-" + l + ",4a645e2c-0",
              b: e.p({
                mode: "select",
                "coupon-item": a,
                "single-select": "Travel" === i.productType,
                "show-member-stacking-flag": !0,
                disabled: !0
              }),
              c: "unavailable-coupon-" + o
            }))
          } : {}, {
            n: !j.value.length
          }, j.value.length ? {} : {
            o: e.p({
              "icon-type": "empty",
              title: "",
              description: "暂无可用券包"
            })
          }, {
            p: e.p({
              "custom-style": {
                height: e.unref(u.pxTransform)(96, 375)
              }
            }),
            q: x.value.length
          }, x.value.length ? {
            r: e.o(e => function() {
              var e;
              x.value.length && (null == (e = h.value) || e.hideDialog(), b.value = S.value.filter(e => e.choosed), I.value.usedCoupons = b.value.filter(e => !e.disabled), C())
            }())
          } : {}, {
            s: e.sr(h, "4a645e2c-0", {
              k: "couponListLayer"
            }),
            t: e.p({
              title: "选择券包"
            }),
            v: m.value
          }, m.value ? e.e({
            w: !R.value
          }, R.value ? {
            x: e.t(R.value)
          } : {}, {
            y: null == (n = i.payPrice) ? void 0 : n.pointMoney
          }, (null == (v = i.payPrice) ? void 0 : v.pointMoney) ? {
            z: e.t(e.unref(t.valFormat)(i.payPrice.pointMoney))
          } : {}, {
            A: e.o(B)
          }) : {}, {
            B: e.t(e.unref(t.valFormat)(N.value)),
            C: A.value,
            D: V.value ? 1 : "",
            E: A.value ? "" : 1,
            F: e.o(e => A.value = String(e.detail.value).replace(/\D/g, "")),
            G: e.o(H),
            H: V.value
          }, V.value ? {
            I: e.t(E.value > N.value ? "可用积分额度不足" : "不能超过待支付金额 ¥" + G.value)
          } : E.value > 0 ? {
            K: e.t(E.value.toFixed(2))
          } : {}, {
            J: E.value > 0,
            L: V.value ? 1 : "",
            M: e.p({
              "custom-style": {
                height: e.unref(u.pxTransform)(96, 375)
              }
            }),
            N: V.value ? 1 : "",
            O: e.o(L),
            P: e.sr(g, "4a645e2c-5", {
              k: "integralLayer"
            }),
            Q: e.p({
              title: "积分抵扣"
            }),
            R: !(null == (c = I.value) ? void 0 : c.pointStrategy)
          }, (null == (p = I.value) ? void 0 : p.pointStrategy) ? "member" === I.value.pointStrategy ? {
            T: e.t(P.value.formatedDesc)
          } : (I.value.pointStrategy, {}) : {}, {
            S: "member" === I.value.pointStrategy,
            U: "point" === I.value.pointStrategy,
            V: null == (d = i.payPrice) ? void 0 : d.memberDscAmount
          }, (null == (f = i.payPrice) ? void 0 : f.memberDscAmount) ? {
            W: e.t(e.unref(t.valFormat)(null == (y = i.payPrice.memberDscAmount) ? void 0 : y.toFixed(2)))
          } : {}, {
            X: m.value
          }, (m.value, {}), {
            Y: e.o(U),
            Z: e.t(null == (T = P.value) ? void 0 : T.formatedDesc),
            aa: $.value
          }, $.value ? {
            ab: e.t(e.unref(t.valFormat)($.value))
          } : {}, {
            ac: e.p({
              "model-value": "member" === Q.value,
              disabled: !w.value
            }),
            ad: e.n({
              "point-strategy-item--disabled": !w.value
            }),
            ae: e.o(e => J("member")),
            af: m.value
          }, m.value ? e.e({
            ag: K.value
          }, K.value ? {
            ah: e.t(K.value)
          } : {}, {
            ai: e.p({
              "model-value": "point" === Q.value
            }),
            aj: e.o(e => J("point"))
          }) : {}, {
            ak: e.p({
              "custom-style": {
                height: e.unref(u.pxTransform)(96, 375)
              }
            }),
            al: Q.value ? "" : 1,
            am: e.o(le),
            an: e.sr(z, "4a645e2c-7", {
              k: "pointStrategyLayer"
            }),
            ao: e.p({
              title: "会员折扣"
            }),
            ap: e.t(Z.value),
            aq: e.o(ee),
            ar: e.o(oe),
            as: e.p({
              show: X.value,
              "z-index": 1e4,
              title: "温馨提醒",
              "cancel-button-text": "使用优惠券",
              "confirm-button-text": "使用会员折扣",
              "cancel-button-style": {
                color: "#000"
              },
              "confirm-button-style": {
                color: "#000"
              }
            })
          })
        }
      }
    }),
    f = e._export_sfc(m, [
      ["__scopeId", "data-v-4a645e2c"]
    ]);
  wx.createComponent(f)
}();
