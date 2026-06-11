! function() {
  "use strict";
  const e = require("../../common/vendor.js");
  Math || o();
  const o = () => "../../components/new/FloatButton.js",
    n = e.defineComponent({
      __name: "Collect",
      props: {
        articleId: null
      },
      setup(o) {
        const n = o;

        function t() {
          console.log("[pagesMicro] <Collect> {handleClick} articleId:", n.articleId)
        }
        return (o, n) => ({
          a: e.o(t),
          b: e.p({
            fixed: !0
          })
        })
      }
    });
  wx.createComponent(n)
}();