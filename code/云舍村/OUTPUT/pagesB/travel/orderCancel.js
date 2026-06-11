! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/utils.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (r + l + a)();
  const r = () => "../../components/new/StButton.js",
    a = () => "../../components/kfDialog.js",
    l = () => "../../components/RecommendProducts.js",
    t = e.defineComponent({
      __name: "orderCancel",
      setup(r) {
        const a = e.ref(),
          l = e.ref(""),
          t = e.ref(""),
          d = e.ref(""),
          u = e.ref(0),
          n = e => {
            u.value = e
          },
          s = () => {
            a.value.showDialog()
          };
        return e.onLoad(e => {
          l.value = null == e ? void 0 : e.orderNo, t.value = null == e ? void 0 : e.orderId, d.value = null == e ? void 0 : e.productType
        }), (r, v) => ({
          a: e.o(s),
          b: e.p({
            block: !0,
            theme: "black"
          }),
          c: e.o(e => {
            "hotel" == d.value ? o.goPage("/pagesC/order/orderInfo?orderNo=" + l.value) : "shop" == d.value ? o.goPage(`/pagesB/travel/orderDetail?orderId=${t.value}&orderNo=${l.value}&productType=${d.value}`) : "activity" == d.value ? o.goPage(`/pagesE/dailyActivity/dailyOrderDetail?orderNo=${l.value}&productType=${d.value}`) : o.goPage("/pagesB/travel/orderDetail?orderNo=" + l.value)
          }),
          d: e.p({
            block: !0,
            theme: "borderless"
          }),
          e: e.o(r => e.unref(o.goPage)("/pages/travel/index")),
          f: e.p({
            block: !0,
            theme: "borderless"
          }),
          g: e.p({
            "order-no": l.value
          }),
          h: !u.value,
          i: e.sr(a, "f28ce492-5", {
            k: "kf"
          }),
          j: e.o(n),
          k: e.p({
            title: "一键咨询"
          })
        })
      }
    }),
    d = e._export_sfc(t, [
      ["__scopeId", "data-v-f28ce492"]
    ]);
  wx.createPage(d)
}();