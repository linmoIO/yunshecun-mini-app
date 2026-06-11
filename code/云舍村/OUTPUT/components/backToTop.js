! function() {
  "use strict";
  const o = require("../common/vendor.js"),
    e = o.defineComponent({
      name: "backToTop",
      props: {
        backToTopStyle: {
          type: String,
          default: () => ""
        },
        scrollFn: {
          type: null,
          default: () => ""
        }
      },
      setup: (e, n) => ({
        backToTop: () => {
          e.scrollFn ? e.scrollFn() : o.index.pageScrollTo({
            scrollTop: 0,
            duration: 300
          })
        }
      })
    }),
    n = o._export_sfc(e, [
      ["render", function(e, n, t, c, r, l) {
        return {
          a: o.o(o => e.backToTop()),
          b: o.s(e.backToTopStyle)
        }
      }],
      ["__scopeId", "data-v-bf3ca8e9"]
    ]);
  wx.createComponent(n)
}();