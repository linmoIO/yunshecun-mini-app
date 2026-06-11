! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    l = require("../../utils/utils.js"),
    t = require("../../utils/wxuser.js"),
    u = require("../../utils/filter.js"),
    r = require("../../base/jAlert/jAlert.js"),
    o = require("../../base/common.js"),
    n = require("../../base/channel.js"),
    i = require("../../utils/helper.js"),
    d = require("../../utils/umengAdaptor.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (v + p + h + g + c + s)();
  const v = () => "../../components/new/StCheckbox.js",
    s = () => "../../components/new/FixedBottomView.js",
    c = () => "../../components/new/StButton.js",
    g = () => "../../components/new/StDialog.js",
    p = () => "../../components/new/StRadio.js",
    h = () => "../../components/new/SafeArea.js",
    f = e.defineComponent({
      __name: "orderGuest",
      setup(v) {
        const s = t.getStorage("config"),
          c = e.ref(""),
          g = e.ref(""),
          p = e.ref(""),
          h = e.ref(""),
          f = e.ref(""),
          y = e.ref(new Map),
          b = e.ref(!1),
          m = e.ref([]),
          T = e.ref([]),
          x = e.computed(() => {
            const e = new Map;
            return T.value.forEach(a => {
              e.set(a.guestId, a)
            }), e
          });
        e.watch(() => [m.value, f.value], ([a, l]) => {
          if (a.length && l) {
            const l = [];
            a.forEach(a => {
              a.guestId && (a.guestLinkRelationExtraSimpleDtoList.forEach(e => {
                "EXTRA_IDCODE" == e.type && (a.idCode = e.value), "EXTRA_IDNO" == e.type && (a.idNo = e.value), "CAMP_SEX" == e.type && (a.sex = e.value), "EXTRA_EMAIL" == e.type && (a.email = e.value), "EXTRA_MOBILE" == e.type && (a.mobile = e.value), "EXTRA_NAME" == e.type && (a.name = e.value), "EXTRA_BIRTH" == e.type && (a.birth = e.value)
              }), a.birth && (a.age = e.dayjs(f.value).diff(a.birth, "year")), a.age >= 18 ? (a.ageType = "adult", a.ageTypeDesc = "成人") : a.age >= 12 ? (a.ageType = "bigChildren", a.ageTypeDesc = "大童") : a.age >= 6 ? (a.ageType = "children", a.ageTypeDesc = "中童") : (a.ageType = "baby", a.ageTypeDesc = "幼童"), l.push(a), T.value = l)
            })
          }
        });
        const C = e.ref(),
          I = e.computed(() => "FAMILY" === C.value ? "中童" : "儿童"),
          A = e.ref({
            adult: 0,
            bigChildren: 0,
            children: 0,
            baby: 0
          }),
          E = e.ref({
            adult: 0,
            bigChildren: 0,
            children: 0,
            baby: 0
          }),
          j = e.computed(() => A.value.adult - E.value.adult),
          M = e.computed(() => A.value.bigChildren - E.value.bigChildren),
          _ = e.computed(() => A.value.children - ("FAMILY" === C.value ? E.value.children : E.value.bigChildren + E.value.children + E.value.baby)),
          w = e.computed(() => A.value.baby - E.value.baby),
          R = e.computed(() => A.value.adult + A.value.bigChildren + A.value.children + A.value.baby),
          D = e.ref(!1);

        function L(e) {
          let a = !0;
          if (R.value <= 1) {
            if ("adult" !== e.ageType) return void(a = !1);
            y.value.clear(), y.value.set(null == e ? void 0 : e.guestId, !0), E.value[e.ageType] = 1
          } else {
            const l = !y.value.get(null == e ? void 0 : e.guestId);
            if (l && ("adult" === e.ageType ? j.value <= 0 && (a = !1, r.jAlert3("成人已满")) : "FAMILY" === C.value ? "children" === e.ageType && _.value <= 0 ? (a = !1, r.jAlert3("中童已满")) : "bigChildren" === e.ageType && M.value <= 0 ? (a = !1, r.jAlert3("大童已满")) : "baby" === e.ageType && w.value <= 0 && (a = !1, r.jAlert3("幼童已满")) : _.value <= 0 && (a = !1, r.jAlert3("儿童已满"))), !a) return;
            const t = l ? 1 : -1;
            E.value[e.ageType] += t, y.value.set(null == e ? void 0 : e.guestId, l)
          }
        }

        function G() {}
        e.onShow(() => {
          (() => {
            const e = t.getStorage("config"),
              l = t.getStorage("user");
            return a.api.listGuestLinkExtraInfoWithMemberIdOrOpenId({
              channel: "WECHAT",
              hotelGroupCode: e.hotelGroupCode,
              hotelCode: e.hotelCode,
              memberId: l.memberId,
              openIdType: "WECHAT"
            }).then(e => {
              var a, l, t;
              0 == (null == (a = e.retVal) ? void 0 : a.result) && (null == (t = null == (l = e.retVal) ? void 0 : l.retVal) ? void 0 : t.length) && (m.value = e.retVal.retVal)
            })
          })().then(() => {
            if (y.value.size > 0) {
              const a = {
                adult: 0,
                bigChildren: 0,
                children: 0,
                baby: 0
              };
              for (let [l, t] of y.value.entries())
                if (t) {
                  const t = x.value.get(l);
                  if (t && (e = t.ageType, ["adult", "bigChildren", "children", "baby"].includes(e))) {
                    const e = "adult" !== t.ageType ? "children" : "adult";
                    a[e] < A.value[e] ? a[e]++ : y.value.set(l, !1)
                  }
                } E.value = a
            }
            var e
          })
        }), e.watch(() => g.value, e => {
          e && (async () => {
            var e, l;
            try {
              const t = await a.api.interfaceTransfer({
                query: {
                  unitCode: s.hotelGroupCode,
                  teamNo: p.value,
                  orderNo: g.value,
                  ota: "DIRECT",
                  otaChannel: n.defaultOtaChannel
                },
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_TRAVEL_ORDER",
                  interfaceMethod: "/api/reserve/order/getReserveOrderByOrderNo",
                  interfaceFrom: "GC",
                  hotelGroupCode: s.hotelGroupCode
                }
              });
              if (0 === (null == (e = null == t ? void 0 : t.retVal) ? void 0 : e.result)) {
                const {
                  adult: e = 0,
                  bigChildren: a = 0,
                  children: u = 0,
                  baby: r = 0,
                  priceModel: o,
                  endDate: n
                } = (null == (l = t.retVal) ? void 0 : l.retVal) || {};
                C.value = o, f.value = n, A.value.adult = e, A.value.bigChildren = a, A.value.children = u, A.value.baby = r, D.value = !0
              }
            } catch (e) {
              D.value = !1, r.jAlert3(o.defaultErrorMessage)
            }
          })()
        }), e.watch(() => [T.value, R.value], ([e, a]) => {
          const l = null == e ? void 0 : e.length;
          if (1 === a && l)
            for (let a = 0; a < l; a++)
              if ("adult" === e[a].ageType && j.value) {
                L(e[a]);
                break
              }
        });
        const S = e.computed(() => {
            let e = !1;
            return e = !!j.value || ("FAMILY" === C.value ? !!(M.value || _.value || w.value) : !!_.value), e
          }),
          N = e.ref(!1);

        function O() {
          if (N.value) return;
          const t = {
            guestDtos: [],
            orderNo: g.value
          };
          e.index.showLoading({
            title: "提交中..."
          });
          let u = 0;
          for (let [e, a] of y.value.entries())
            if (a) {
              const a = x.value.get(e);
              a && (t.guestDtos.push({
                id: "",
                guestSign: a.guestId,
                guestNo: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                  var a = 16 * Math.random() | 0;
                  return ("x" == e ? a : 3 & a | 8).toString(16)
                })),
                name: a.name,
                mobile: a.mobile,
                sex: a.sex,
                ageType: a.ageType,
                age: a.age,
                nation: "",
                rmtype: "",
                prmno: u,
                idCode: a.idCode,
                idNo: a.idNo,
                remark: "",
                ageTypeDesc: a.ageTypeDesc,
                birthday: a.birth,
                relationshipWithMe: a.relationship
              }), u++)
            } N.value = !0;
          const {
            adult: n,
            bigChildren: i,
            children: v,
            baby: c
          } = E.value, p = {
            adult: n,
            children: (i || 0) + (v || 0) + (c || 0)
          };
          a.api.interfaceTransfer({
            query: t,
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/reserve/order/saveOrderGuests",
              interfaceFrom: "GC",
              hotelGroupCode: s.hotelGroupCode
            }
          }).then(e => {
            var a, t;
            if (0 !== (null == (a = null == e ? void 0 : e.retVal) ? void 0 : a.result)) return p.result = 0, d.adaptor.sendEvent("customize_travelers_result", p, "OTHER"), void r.jAlert3((null == (t = null == e ? void 0 : e.retVal) ? void 0 : t.msg) || o.defaultErrorMessage);
            p.result = 1, d.adaptor.sendEvent("customize_travelers_result", p, "OTHER");
            let u = "/pagesB/travel/orderGuestSuccess?orderNo=" + g.value;
            "1" === h.value && (u += "&contractFlag=1"), l.goPage(u, !0)
          }).finally(() => {
            N.value = !1, e.index.hideLoading()
          })
        }
        const q = () => {
          l.goPage("/pagesB/travel/travelersInfo")
        };

        function F() {
          b.value = !0
        }
        return e.onLoad(e => {
          c.value = e.source, g.value = e.orderNo, p.value = e.teamNo, h.value = e.contractFlag
        }), (a, t) => e.e({
          a: D.value && R.value > 1
        }, D.value && R.value > 1 ? e.e({
          b: e.t(A.value.adult),
          c: A.value.bigChildren > 0
        }, A.value.bigChildren > 0 ? {
          d: e.t(A.value.bigChildren)
        } : {}, {
          e: A.value.children > 0
        }, A.value.children > 0 ? {
          f: e.t(A.value.children),
          g: e.t(I.value)
        } : {}, {
          h: A.value.baby > 0
        }, A.value.baby > 0 ? {
          i: e.t(A.value.baby)
        } : {}) : {}, {
          j: e.o(q),
          k: e.f(T.value, (a, t, r) => e.e({
            a: e.o(e => (e => {
              l.goPage("/pagesB/travel/travelersInfo?type=edit&id=" + e.guestId)
            })(a), a.guestId),
            b: e.t(a.name),
            c: a.ageType && "adult" !== a.ageType
          }, a.ageType && "adult" !== a.ageType ? {
            d: e.t(a.ageTypeDesc)
          } : {}, {
            e: e.t(e.unref(o.IdTypeMeta)[a.idCode]),
            f: e.t(e.unref(u.hideIdCard)(a.idNo))
          }, R.value > 1 ? {
            g: "7406a8a5-0-" + r,
            h: e.p({
              "model-value": y.value.get(a.guestId),
              disabled: !y.value.get(a.guestId) && ("FAMILY" === C.value ? A.value[a.ageType] - E.value[a.ageType] <= 0 : ("adult" === a.ageType ? j.value : _.value) <= 0)
            })
          } : {
            i: "7406a8a5-1-" + r,
            j: e.p({
              "model-value": y.value.get(a.guestId),
              disabled: "adult" !== a.ageType
            })
          }, {
            k: a.guestId,
            l: e.o(e => L(a), a.guestId)
          })),
          l: R.value > 1,
          m: e.p({
            "custom-style": {
              height: e.unref(i.pxTransform)(96, 375)
            }
          }),
          n: e.o(G),
          o: e.o(O),
          p: e.o(e => b.value = e),
          q: e.p({
            title: "确认提交出行人信息",
            message: "请确认您选择的出行人及出行人信息无误",
            "cancel-button-text": "我再想想",
            "confirm-button-text": "确认无误",
            show: b.value
          }),
          r: S.value && R.value > 1
        }, S.value && R.value > 1 ? e.e({
          s: e.t(j.value ? j.value + "成人" : ""),
          t: "FAMILY" === C.value
        }, "FAMILY" === C.value ? {
          v: e.t(M.value ? M.value + "大童" : ""),
          w: e.t(_.value ? _.value + "中童" : ""),
          x: e.t(w.value ? w.value + "幼童" : "")
        } : {
          y: e.t(_.value ? _.value + "儿童" : "")
        }) : {}, {
          z: e.o(F),
          A: e.p({
            theme: "black",
            block: !0,
            disabled: S.value,
            loading: N.value
          }),
          B: e.p({
            "custom-style": {
              backgroundColor: "white"
            }
          })
        })
      }
    }),
    y = e._export_sfc(f, [
      ["__scopeId", "data-v-7406a8a5"]
    ]);
  wx.createPage(y)
}();