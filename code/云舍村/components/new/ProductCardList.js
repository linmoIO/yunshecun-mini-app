! function() {
  "use strict";
  const t = require("../../common/vendor.js"),
    e = require("../../utils/helper.js");
  Math || s();
  const s = () => "./ProductCard.js",
    o = t.defineComponent({
      __name: "ProductCardList",
      props: {
        list: null,
        customStyle: null,
        itemCustomStyle: null
      },
      setup: s => (o, l) => t.e({
        a: s.list && s.list.length
      }, s.list && s.list.length ? {
        b: t.f(s.list, (o, l, n) => ({
          a: "product-" + l,
          b: "e8e82a80-0-" + n,
          c: t.p({
            product: o,
            "custom-style": {
              marginTop: l > 0 ? t.unref(e.pxTransform)(24) : 0,
              ...s.itemCustomStyle
            }
          })
        })),
        c: t.s(s.customStyle)
      } : {})
    }),
    l = t._export_sfc(o, [
      ["__scopeId", "data-v-e8e82a80"]
    ]);
  wx.createComponent(l)
}();