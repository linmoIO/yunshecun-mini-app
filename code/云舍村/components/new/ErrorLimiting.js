! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../assets/index.js");
  Math || n();
  const n = () => "./StButton.js",
    o = e.defineComponent({
      __name: "ErrorLimiting",
      props: {
        show: {
          type: Boolean
        }
      },
      emits: ["retry"],
      setup(n, {
        emit: o
      }) {
        const r = n,
          a = o,
          s = e.ref(3),
          l = e.ref(!0);
        let u = null;
        const c = () => {
            l.value = !0, s.value = 3, u = setInterval(() => {
              s.value--, s.value <= 0 && i()
            }, 1e3)
          },
          i = () => {
            u && (clearInterval(u), u = null), l.value = !1
          },
          v = () => {
            l.value || (a("retry"), c())
          };
        return e.watch(() => r.show, e => {
          e ? c() : i()
        }, {
          immediate: !0
        }), e.onUnmounted(() => {
          i()
        }), (o, r) => e.e({
          a: n.show
        }, n.show ? {
          b: e.unref(t.assets).netError,
          c: e.t(l.value ? s.value + "秒后重试" : "重试"),
          d: e.o(v),
          e: e.p({
            disabled: l.value,
            block: !0,
            theme: "black"
          })
        } : {})
      }
    }),
    r = e._export_sfc(o, [
      ["__scopeId", "data-v-7207bea8"]
    ]);
  wx.createComponent(r)
}();