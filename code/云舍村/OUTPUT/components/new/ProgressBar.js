! function() {
  "use strict";
  const t = require("../../common/vendor.js"),
    e = t.defineComponent({
      __name: "ProgressBar",
      props: {
        steps: {
          default: () => [{
            status: 1,
            title: "支付订单"
          }, {
            status: 2,
            title: "完善出行人信息"
          }, {
            status: 3,
            title: "完成签约"
          }]
        },
        currentStep: {
          default: 1
        },
        defaultColor: {
          default: "#cccccc"
        },
        activeColor: {
          default: "#000000"
        }
      },
      setup: e => (o, r) => ({
        a: t.f(e.steps, (o, r, s) => t.e({
          a: e.currentStep >= o.status ? e.activeColor : e.defaultColor,
          b: e.currentStep >= o.status ? e.activeColor : e.defaultColor,
          c: e.currentStep >= o.status ? e.activeColor : e.defaultColor,
          d: o.title
        }, o.title ? {
          e: t.t(o.title),
          f: e.currentStep >= o.status ? e.activeColor : e.defaultColor
        } : {}, {
          g: o.description
        }, o.description ? {
          h: t.t(o.description),
          i: e.currentStep >= o.status ? e.activeColor : e.defaultColor
        } : {}, {
          j: r
        }))
      })
    }),
    o = t._export_sfc(e, [
      ["__scopeId", "data-v-22331b5d"]
    ]);
  wx.createComponent(o)
}();