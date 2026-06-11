! function() {
  "use strict";
  const t = require("../../common/vendor.js"),
    o = require("../../utils/utils.js"),
    e = require("../../base/product.js"),
    n = t.defineComponent({
      __name: "AutoComplete",
      props: {
        options: null,
        customClick: {
          type: Function
        },
        customStyle: null
      },
      setup(n) {
        const c = n;
        return (p, i) => ({
          a: t.f(n.options, (n, p, i) => {
            var u, r;
            return t.e({
              a: n.type && (null == (u = t.unref(e.productTypeMeta)[n.type]) ? void 0 : u.iconfont)
            }, n.type && (null == (r = t.unref(e.productTypeMeta)[n.type]) ? void 0 : r.iconfont) ? {
              b: t.n(n.iconfont)
            } : {}, {
              c: t.t(n.title),
              d: t.o(e => function(e) {
                var n;
                c.customClick ? null == (n = c.customClick) || n.call(c, e) : e.path && (e.jumpAppId ? t.index.navigateToMiniProgram({
                  appId: "wx85856dcb803b16cc",
                  path: e.path
                }) : o.goPage(e.path))
              }(n), "search-option-" + n.id),
              e: "search-option-" + n.id
            })
          }),
          b: t.s(n.customStyle)
        })
      }
    }),
    c = t._export_sfc(n, [
      ["__scopeId", "data-v-6c526cf7"]
    ]);
  wx.createComponent(c)
}();