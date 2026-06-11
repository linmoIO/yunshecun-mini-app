! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/jAlert/jAlert.js"),
    r = require("../../hooks/useSubscribeMessage.js"),
    t = require("../../utils/api.js"),
    l = require("../../utils/utils.js"),
    u = require("../../utils/wxuser.js");
  Math || (n + i + a)();
  const a = () => "../kfDialog.js",
    n = () => "../new/StButton.js",
    i = () => "../bottomDialog.js",
    d = e.defineComponent({
      __name: "OrderCancelDialog",
      props: {
        show: {
          type: Boolean,
          default: !1
        },
        orderNo: {
          default: ""
        },
        orderId: null,
        productType: {
          default: ""
        }
      },
      emits: ["cancel", "update:show"],
      setup(a, {
        emit: n
      }) {
        const i = a,
          d = n,
          {
            subscribeMessage: s
          } = r.useSubscribeMessage(["REFUND_SUCCESS"]),
          c = e.ref(),
          f = e.ref(),
          p = u.getStorage("config"),
          v = e.ref(""),
          h = e.ref(),
          C = e.ref(0),
          g = e.ref(100),
          m = e.ref(),
          b = e.ref(""),
          y = e.ref(),
          j = e.ref(!1);

        function G(e) {
          d("update:show", e > 0)
        }

        function T(e) {
          d("update:show", e > 0)
        }

        function w(e) {
          var o;
          C.value = null == (o = e.detail.value) ? void 0 : o.length
        }

        function _() {
          t.api.interfaceTransfer({
            query: {
              unitCode: p.hotelGroupCode,
              orderNo: i.orderNo
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/orderCancel/queryOrderCancel",
              interfaceFrom: "GC",
              hotelGroupCode: p.hotelGroupCode
            }
          }).then(e => {
            var o, r, t, l;
            0 === e.retVal.result && (null == (r = null == (o = e.retVal) ? void 0 : o.retVal) ? void 0 : r.orderNo) ? null == (t = c.value) || t.showDialog() : null == (l = f.value) || l.showDialog()
          })
        }
        async function q() {
          var e;
          if (!m.value) return o.jAlert3("请选择您取消订单的原因");
          let {
            enumCode: r,
            reason: u
          } = m.value;
          if ("100" === r) {
            if (u = (null == (e = b.value) ? void 0 : e.trim()) || "", console.log("reason", u), !u) return o.jAlert3("请输入您取消订单的原因");
            if ((null == u ? void 0 : u.length) > 100) return o.jAlert3("最大可输入长度为100");
            if (l.hasIllegalInputValue(u)) return o.jAlert3("不能输入emoji & 特殊字符")
          }
          await s(), j.value = !0, t.api.interfaceTransfer({
            query: {
              unitCode: p.hotelGroupCode,
              orderNo: i.orderNo,
              enumCode: r,
              reason: u,
              orderType: i.productType
            },
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/orderCancel/insert",
              interfaceFrom: "GC",
              hotelGroupCode: p.hotelGroupCode
            }
          }).then(e => {
            j.value = !1, 0 === e.retVal.result ? l.goPage(`/pagesB/travel/orderCancel?productType=${i.productType}&orderId=${i.orderId}&orderNo=${i.orderNo}`, !0) : o.jAlert3(e.retVal.msg)
          }).catch(() => {
            j.value = !1
          })
        }
        return e.onMounted(() => {
          e.index.getSystemInfo({
            success: e => {
              v.value = e.statusBarHeight || 0
            },
            fail(e) {
              console.log(e)
            }
          });
          const o = e.index.getSystemInfoSync().windowHeight;
          h.value = o - Number(v.value) - 44, t.api.interfaceTransfer({
            query: {
              unitCode: p.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/ordercancelenum/query",
              interfaceFrom: "GC",
              hotelGroupCode: p.hotelGroupCode
            }
          }).then(e => {
            1 === e.result && (y.value = e.retVal.retVal)
          })
        }), e.watch(() => i.show, e => {
          e && (null == _ || _())
        }), (o, r) => {
          var t, l;
          return e.e({
            a: e.f(y.value, (o, r, t) => {
              var l, u;
              return e.e({
                a: e.t(o.reason),
                b: (null == (l = m.value) ? void 0 : l.enumCode) === (null == o ? void 0 : o.enumCode)
              }, (null == (u = m.value) || u.enumCode, null == o || o.enumCode, {}), {
                c: r,
                d: e.o(e => function(e) {
                  m.value = e
                }(o), r)
              })
            }),
            b: "100" === (null == (t = m.value) ? void 0 : t.enumCode)
          }, "100" === (null == (l = m.value) ? void 0 : l.enumCode) ? {
            c: e.o([e => b.value = e.detail.value, w]),
            d: b.value,
            e: e.t(C.value),
            f: e.t(g.value)
          } : {}, {
            g: e.o(q),
            h: e.p({
              theme: "black",
              "custom-style": "width:100%",
              loading: j.value
            }),
            i: e.s(`height: ${h.value}px`),
            j: e.sr(f, "8cbce24b-0", {
              k: "bottomDialogRef"
            }),
            k: e.o(G),
            l: e.p({
              "max-dialog": !0,
              title: "选择取消原因",
              "no-mask-event": !0
            }),
            m: e.sr(c, "8cbce24b-2", {
              k: "kf"
            }),
            n: e.o(T),
            o: e.p({
              title: "一键咨询"
            })
          })
        }
      }
    }),
    s = e._export_sfc(d, [
      ["__scopeId", "data-v-8cbce24b"]
    ]);
  wx.createComponent(s)
}();