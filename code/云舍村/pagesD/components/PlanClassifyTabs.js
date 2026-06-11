! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/utils.js"),
    a = e.defineComponent({
      __name: "PlanClassifyTabs",
      props: {
        data: null
      },
      emits: ["change"],
      setup(a, {
        emit: n
      }) {
        const r = n,
          s = a,
          i = e.getCurrentInstance(),
          u = e.ref(0),
          c = e.ref("-1"),
          l = e.ref(0);
        return e.watch(c, e => {
          s.data.forEach((t, a) => {
            t.id == e && (l.value = a)
          }), Promise.all([t.getAllRect(i, ".tab"), t.getRect(i, ".tabs")]).then(([e, t]) => {
            const a = e[l.value],
              n = e.slice(0, l.value).reduce((e, t) => e + t.width, 0);
            u.value = n - (t.width - a.width) / 2
          })
        }), (t, a) => ({
          a: e.f(s.data, (t, a, n) => ({
            a: e.t(t.name),
            b: a,
            c: c.value == t.id ? 1 : "",
            d: e.o(e => {
              return n = t, s = a, void(c.value != n.id && (c.value = n.id, r("change", n, s)));
              var n, s
            }, a)
          })),
          b: u.value
        })
      }
    }),
    n = e._export_sfc(a, [
      ["__scopeId", "data-v-57803ef6"]
    ]);
  wx.createComponent(n)
}();