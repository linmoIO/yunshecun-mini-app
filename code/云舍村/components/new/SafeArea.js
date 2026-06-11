! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = e.defineComponent({
      __name: "SafeArea",
      props: {
        position: {
          default: "bottom"
        },
        customStyle: null
      },
      setup(o) {
        const t = o;
        return (n, s) => ({
          a: e.n("safe-area--" + t.position),
          b: e.s(o.customStyle)
        })
      }
    });
  wx.createComponent(o)
}();