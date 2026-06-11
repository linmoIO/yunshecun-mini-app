! function() {
  "use strict";
  const o = require("../common/vendor.js"),
    e = require("../utils/filter.js"),
    t = require("../utils/wxuser.js");
  Math || n();
  const n = () => "./new/StButton.js",
    u = o.defineComponent({
      name: "CouponItem",
      __name: "couponItem",
      props: {
        couponItem: {
          default: () => ({
            validToDate: "",
            validFromDate: ""
          })
        },
        mode: {
          default: ""
        },
        singleSelect: {
          type: Boolean,
          default: !1
        },
        showBtn: {
          type: Boolean,
          default: !1
        },
        showMemberStackingFlag: {
          type: Boolean
        },
        disabled: {
          type: Boolean
        }
      },
      emits: ["chooseCoupon", "toggleCoupon"],
      setup(n, {
        emit: u
      }) {
        const c = n,
          p = u,
          m = o.computed(() => "select" === c.mode),
          i = o.computed(() => "receive" === c.mode);

        function s(o) {
          if (!c.disabled) return m.value ? (function(o) {
            p("toggleCoupon", o)
          }(o), !1) : void p("chooseCoupon", o)
        }
        return (u, c) => {
          return o.e({
            a: n.couponItem.groupName
          }, n.couponItem.groupName ? {
            b: o.t(n.couponItem.groupName),
            c: o.n(n.couponItem.groupCode)
          } : {}, {
            d: n.couponItem.no
          }, n.couponItem.no ? o.e({
            e: !n.couponItem.isHistory
          }, n.couponItem.isHistory ? {
            h: o.t("P" === n.couponItem.sta ? "已过期" : "已使用")
          } : o.e({
            f: n.showMemberStackingFlag && "F" === n.couponItem.memberStacking
          }, (n.showMemberStackingFlag && n.couponItem.memberStacking, {}), {
            g: o.o(e => {
              return u = n.couponItem, t.setStorage("coupon", u), void o.index.navigateTo({
                url: "/pagesA/member/couponInfo?couponNo=" + u.no
              });
              var u
            })
          })) : {}, {
            i: o.t(n.couponItem.descript),
            j: n.couponItem.beginDatetime && n.couponItem.endDatetime
          }, n.couponItem.beginDatetime && n.couponItem.endDatetime ? {
            k: o.t(o.unref(e.timeDay2)(n.couponItem.beginDatetime)),
            l: o.t(o.unref(e.timeDay2)(n.couponItem.endDatetime))
          } : {}, {
            m: "EXCHANGECOUPON" !== n.couponItem.groupCode && n.couponItem.discountNum > 0
          }, "EXCHANGECOUPON" !== n.couponItem.groupCode && n.couponItem.discountNum > 0 ? o.e({
            n: "RF" === n.couponItem.couponType
          }, "RF" === n.couponItem.couponType ? {
            o: o.t(n.couponItem.discountNum)
          } : "LZ" === n.couponItem.discountType || "MZ" === n.couponItem.discountType ? {
            q: o.t((a = 10 * n.couponItem.discountNum, Number(Number(a).toFixed(2))))
          } : {
            r: o.t(o.unref(e.valFormat)(n.couponItem.discountNum))
          }, {
            p: "LZ" === n.couponItem.discountType || "MZ" === n.couponItem.discountType
          }) : {}, {
            s: n.couponItem.discountPriceBegin > 0
          }, n.couponItem.discountPriceBegin > 0 ? {
            t: o.t(o.unref(e.valFormat)(n.couponItem.discountPriceBegin))
          } : {}, {
            v: m.value
          }, m.value ? o.e({
            w: "EXCHANGECOUPON" === n.couponItem.groupCode && !n.singleSelect
          }, "EXCHANGECOUPON" !== n.couponItem.groupCode || n.singleSelect ? o.e({
            y: n.couponItem.choosed
          }, (n.couponItem.choosed, {})) : o.e({
            x: n.couponItem.choosed
          }, (n.couponItem.choosed, {})), {
            z: n.disabled ? 1 : ""
          }) : {}, {
            A: i.value
          }, i.value ? {
            B: o.t(n.couponItem.stock <= 0 ? "已抢光" : "立即领取"),
            C: o.p({
              block: !0,
              theme: "black",
              "custom-style": {
                height: "30px",
                width: "94px",
                fontSize: "14px",
                lineHeight: "14px"
              },
              disabled: n.couponItem.stock <= 0
            }),
            D: o.o(o => s(n.couponItem))
          } : {}, {
            E: n.showBtn && "EXCHANGECOUPON" === n.couponItem.groupCode
          }, n.showBtn && "EXCHANGECOUPON" === n.couponItem.groupCode ? {
            F: o.o(o => {
              return e = n.couponItem, void p("chooseCoupon", e, "T");
              var e
            })
          } : {}, {
            G: n.couponItem.showGift
          }, (n.couponItem.showGift, {}), {
            H: n.couponItem.isHistory ? 1 : "",
            I: o.o(o => !i.value && s(n.couponItem))
          });
          var a
        }
      }
    }),
    c = o._export_sfc(u, [
      ["__scopeId", "data-v-69a10e74"]
    ]);
  wx.createComponent(c)
}();