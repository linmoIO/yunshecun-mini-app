! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    l = require("../../utils/utils.js"),
    a = require("../../utils/wxuser.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (u + t + r + o)();
  const o = () => "../../components/kfDialog.js",
    u = () => "../../components/new/ProgressBar.js",
    t = () => "../../components/new/StButton.js",
    r = () => "../../components/RecommendProducts.js",
    v = e.defineComponent({
      __name: "paySuccess",
      setup(o) {
        const u = e.ref(),
          t = a.getStorage("config"),
          r = e.ref(""),
          v = e.ref(""),
          n = e.ref(""),
          s = e.ref(""),
          c = e.ref(),
          d = e.ref(1),
          i = e.ref(0),
          p = e.computed(() => {
            const e = [{
              status: 1,
              title: "支付订单"
            }];
            return "1" === c.value && e.push({
              status: 2,
              title: "完善出行人信息"
            }), "1" === s.value && e.push({
              status: 3,
              title: "完成签约"
            }), e
          });

        function g(e) {
          i.value = e
        }

        function f() {
          let e = "/pagesB/travel/orderGuest?orderNo=" + r.value;
          "1" === s.value && (e += "&contractFlag=1"), l.goPage(e, !0)
        }

        function m() {
          let e = `/pagesB/other/pay?orderNo=${r.value}&productType=${n.value}`;
          s.value && (e += "&contractFlag=" + s.value), c.value && (e += "&addContactFlag=" + c.value), l.goPage(e, !0)
        }

        function h() {
          u.value.showDialog()
        }
        const b = e.ref(),
          k = e.computed(() => b.value ? "支付成功" : "支付完成");

        function y() {
          l.queryOrderGuestIsAll({
            unitCode: t.hotelGroupCode,
            orderNo: r.value
          }, () => {
            l.goPage("/pagesB/travel/tips?orderNo=" + r.value, !0)
          })
        }
        return e.onLoad(e => {
          r.value = null == e ? void 0 : e.orderNo, v.value = null == e ? void 0 : e.orderId, n.value = null == e ? void 0 : e.productType, s.value = null == e ? void 0 : e.contractFlag, c.value = null == e ? void 0 : e.addContactFlag, b.value = (null == e ? void 0 : e.payRate) > 0
        }), (a, o) => {
          var t, P, B, N;
          return e.e({
            a: e.t(k.value),
            b: b.value
          }, b.value ? {} : e.e({
            c: (null == (t = p.value) ? void 0 : t.length) > 1
          }, (null == (P = p.value) ? void 0 : P.length) > 1 ? e.e({
            d: "1" === c.value || "1" === s.value
          }, "1" === c.value || "1" === s.value ? e.e({
            e: "1" === c.value
          }, (c.value, {}), {
            f: "1" === c.value && "1" === s.value
          }, ("1" === c.value && s.value, {}), {
            g: "1" === s.value
          }, (s.value, {})) : {}) : {}), {
            h: !b.value && (null == (B = p.value) ? void 0 : B.length) > 1
          }, !b.value && (null == (N = p.value) ? void 0 : N.length) > 1 ? {
            i: e.p({
              steps: p.value,
              "current-step": d.value
            })
          } : {}, {
            j: b.value
          }, b.value ? {
            k: e.o(m),
            l: e.p({
              block: !0,
              theme: "black"
            })
          } : e.e({
            m: "1" === c.value
          }, "1" === c.value ? {
            n: e.o(f),
            o: e.p({
              block: !0,
              theme: "black"
            })
          } : "1" === s.value ? {
            q: e.o(y),
            r: e.p({
              block: !0,
              theme: "black"
            })
          } : {
            s: e.o(h),
            t: e.p({
              block: !0,
              theme: "black"
            })
          }, {
            p: "1" === s.value
          }), {
            v: e.o(e => function() {
              if ("hotel" === n.value) l.goPage("/pagesC/order/orderInfo?orderNo=" + r.value);
              else if ("shop" === n.value) {
                let e = "/pagesB/travel/orderDetail?productType=" + n.value;
                v.value && (e += "&orderId=" + v.value), r.value && (e += "&orderNo=" + r.value), l.goPage(e)
              } else "activity" === n.value ? l.goPage(`/pagesE/dailyActivity/dailyOrderDetail?orderNo=${r.value}&productType=${n.value}`) : l.goPage("/pagesB/travel/orderDetail?orderNo=" + r.value)
            }()),
            w: e.p({
              block: !0,
              theme: "borderless"
            }),
            x: e.o(a => e.unref(l.goPage)("/pages/travel/index")),
            y: e.p({
              block: !0,
              theme: "borderless"
            }),
            z: e.p({
              "order-no": r.value
            }),
            A: !i.value,
            B: e.sr(u, "c46c5bd0-9", {
              k: "kf"
            }),
            C: e.o(g),
            D: e.p({
              title: "一键咨询"
            })
          })
        }
      }
    }),
    n = e._export_sfc(v, [
      ["__scopeId", "data-v-c46c5bd0"]
    ]);
  wx.createPage(n)
}();