! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/helper.js"),
    a = require("../../assets/index.js"),
    t = require("../../utils/utils.js");
  Math || (n + o)();
  const o = () => "../../components/new/SafeArea.js",
    n = () => "../../components/new/StButton.js",
    l = e.defineComponent({
      __name: "contractConfirm",
      setup(o) {
        const n = e.ref(),
          l = e.ref(!1),
          u = e.ref(3),
          s = e.ref(null);

        function c() {
          s.value && clearInterval(s.value), t.goPage("/pagesB/travel/orderDetail?orderNo=" + n.value)
        }
        return e.onLoad(e => {
          (null == e ? void 0 : e.orderNo) && (n.value = e.orderNo), l.value = !0, s.value = setInterval(() => {
            u.value <= 1 && (s.value && clearInterval(s.value), l.value = !1, c()), u.value--
          }, 1e3)
        }), (t, o) => e.e({
          a: e.unref(a.assets).contractConfirm,
          b: l.value
        }, l.value ? {
          c: e.t(u.value)
        } : {}, {
          d: e.o(c),
          e: e.p({
            block: !0,
            theme: "black"
          }),
          f: e.p({
            "custom-style": {
              height: e.unref(r.pxTransform)(112, 375)
            }
          })
        })
      }
    }),
    u = e._export_sfc(l, [
      ["__scopeId", "data-v-e6efc577"]
    ]);
  wx.createPage(u)
}();