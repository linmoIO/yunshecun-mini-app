! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../hooks/useNavigatorRect.js");
  require("../../utils/umengAdaptor.js"), require("../../utils/config.js");
  const t = require("../../utils/utils.js");
  require("../../utils/request.js"), require("../../base/product.js"), require("../../utils/qdTracker.js"), require("../../services/request/request.js");
  const o = require("../../utils/helper.js");
  Math || (a + n + s + l + u + i)();
  const s = () => "../../components/new/StButton.js",
    a = () => "../../components/new/Navigator.js",
    u = () => "../../components/new/SafeArea.js",
    n = () => "../../components/new/ProgressBar.js",
    l = () => "../../components/RecommendProducts.js",
    i = () => "../../components/new/FloatButtonKf.js",
    c = e.defineComponent({
      __name: "orderGuestSuccess",
      setup(s) {
        const a = r.useNavigatorRect(),
          u = e.ref(""),
          n = e.ref(""),
          l = e.ref(""),
          i = e.computed(() => {
            const e = [{
              status: 1,
              title: "支付订单"
            }, {
              status: 2,
              title: "完善出行人信息"
            }];
            return "1" === l.value && e.push({
              status: 3,
              title: "完成签约"
            }), e
          }),
          c = () => {
            t.goPage("/pagesB/travel/tips?orderNo=" + u.value, !0)
          },
          d = () => {
            "hotel" == n.value ? t.goPage("/pagesC/order/orderInfo?orderNo=" + u.value) : "shop" == n.value ? t.goPage(`/pagesB/travel/orderDetail?orderNo=${u.value}&productType=${n.value}`) : "activity" == n.value ? t.goPage(`/pagesE/dailyActivity/dailyOrderDetail?orderNo=${u.value}&productType=${n.value}`) : t.goPage("/pagesB/travel/orderDetail?orderNo=" + u.value)
          };
        return e.onLoad(e => {
          u.value = e.orderNo, n.value = e.productType, l.value = e.contractFlag
        }), (r, s) => e.e({
          a: e.p({
            fixed: !0,
            "use-immersive-style": !0
          }),
          b: "1" === l.value
        }, (l.value, {}), {
          c: e.p({
            steps: i.value,
            "current-step": 2
          }),
          d: "1" === l.value
        }, "1" === l.value ? {
          e: e.o(c),
          f: e.p({
            block: !0,
            theme: "black"
          })
        } : {}, {
          g: e.o(d),
          h: e.o(r => e.unref(t.goPage)("/pages/travel/index")),
          i: e.unref(o.addCssUnit)(e.unref(a).outerHeight),
          j: e.p({
            "order-no": u.value
          })
        })
      }
    }),
    d = e._export_sfc(c, [
      ["__scopeId", "data-v-88c0df89"]
    ]);
  wx.createPage(d)
}();