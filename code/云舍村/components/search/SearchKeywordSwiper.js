! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = e.defineComponent({
      __name: "SearchKeywordSwiper",
      props: {
        list: null,
        current: null,
        autoplay: {
          type: Boolean
        },
        customStyle: null
      },
      emits: ["change"],
      setup(t, {
        emit: n
      }) {
        const o = t,
          r = n,
          a = e.ref(o.current || 0);

        function c(e) {
          const t = e.detail.current;
          a.value = t, r("change", o.list[a.value], a.value)
        }
        return (n, o) => ({
          a: e.f(t.list, (t, n, o) => ({
            a: e.t(t.text),
            b: "keyword-" + n,
            c: e.o(() => !0, "keyword-" + n)
          })),
          b: t.current,
          c: t.autoplay,
          d: e.o(() => !0),
          e: e.o(c)
        })
      }
    }),
    n = e._export_sfc(t, [
      ["__scopeId", "data-v-083a73ba"]
    ]);
  wx.createComponent(n)
}();