! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    o = require("../../utils/filter.js"),
    t = require("../../utils/utils.js");
  Math || l();
  const l = () => "../../components/coustomHead.js",
    u = e.defineComponent({
      __name: "browserPay",
      setup(l) {
        const u = e.ref(""),
          r = e.ref(""),
          n = e.ref(""),
          c = e.ref(0),
          i = e.ref(""),
          s = e.ref(""),
          v = e.ref(""),
          d = e.ref();
        e.onLoad(e => {
          const a = JSON.parse(null == e ? void 0 : e.params);
          u.value = null == a ? void 0 : a.qrCode, r.value = null == a ? void 0 : a.merchantTxnNo, n.value = null == e ? void 0 : e.orderNo, c.value = null == e ? void 0 : e.price, i.value = null == e ? void 0 : e.paySubject, s.value = null == e ? void 0 : e.productType, v.value = null == e ? void 0 : e.contractFlag, d.value = null == e ? void 0 : e.addContactFlag
        });
        const f = () => {
            e.index.setClipboardData({
              data: u.value,
              success: function() {
                e.index.hideToast(), e.index.showModal({
                  content: "复制成功，请粘贴到浏览器跳转支付，请勿多平台重复支付！",
                  showCancel: !1,
                  confirmText: "我知道了",
                  confirmColor: "#333333"
                }), m.value = !0, y()
              }
            })
          },
          p = e.ref(),
          m = e.ref(!1);

        function y() {
          p.value && clearTimeout(p.value), p.value = setTimeout(() => {
            T()
          }, 3e3)
        }

        function C() {
          m.value = !1, clearTimeout(p.value)
        }
        const T = async () => {
          var e;
          if (m.value) try {
            const o = await a.api.orderQueryStatusApi({
              orderNo: n.value,
              merchantTxnNo: r.value
            });
            if (1 === o.result && "SUCCESS" === (null == (e = o.retVal) ? void 0 : e.status)) return C(), void
            function() {
              let e = `/pagesB/travel/paySuccess?orderNo=${n.value}&productType=${s.value}&payRate=0`;
              v.value && (e += "&contractFlag=" + v.value), d.value && (e += "&addContactFlag=" + d.value), t.goPage(e)
            }();
            y()
          } catch (e) {
            y()
          }
        };
        return e.onBeforeUnmount(() => {
          C()
        }), (a, t) => ({
          a: e.p({
            title: "浏览器支付",
            color: "#ffffff"
          }),
          b: e.t(e.unref(o.valFormat)(c.value)),
          c: e.t(i.value),
          d: e.o(f)
        })
      }
    }),
    r = e._export_sfc(u, [
      ["__scopeId", "data-v-3cd849b3"]
    ]);
  wx.createPage(r)
}();