! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/filter.js"),
    r = require("../../utils/helper.js"),
    i = require("../../base/product.js"),
    s = e.defineComponent({
      __name: "ExchangeListBox",
      props: {
        list: null
      },
      emits: ["click-item"],
      setup(s, {
        emit: c
      }) {
        const u = c;
        return (c, o) => ({
          a: e.f(s.list, (s, c, o) => e.e({
            a: "ButlerCustomized" == s.categorySub || "DestPackage" == s.categorySub
          }, "ButlerCustomized" == s.categorySub || "DestPackage" == s.categorySub ? {
            b: e.t(c + 1)
          } : {
            c: e.t(c + 1)
          }, {
            d: s.urls && s.urls.length > 0
          }, s.urls && s.urls.length > 0 ? {
            e: e.unref(r.imageMogr2)(s.urls[0].url, "276x")
          } : {}, {
            f: e.t(s.title),
            g: e.t(e.unref(t.valFormat)(s.startingPrice)),
            h: e.unref(i.getPriceModelDesc)(s.specificationsType)
          }, e.unref(i.getPriceModelDesc)(s.specificationsType) ? {
            i: e.t(e.unref(i.getPriceModelDesc)(s.specificationsType))
          } : {}, {
            j: c,
            k: e.o(e => function(e) {
              u("click-item", e)
            }(s), c)
          }))
        })
      }
    }),
    c = e._export_sfc(s, [
      ["__scopeId", "data-v-cbb87eff"]
    ]);
  wx.createComponent(c)
}();