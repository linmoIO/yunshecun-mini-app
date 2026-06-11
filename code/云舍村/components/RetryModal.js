! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = {
      __name: "RetryModal",
      props: {
        visible: {
          type: Boolean,
          default: !1
        },
        closeOnMask: {
          type: Boolean,
          default: !0
        },
        countdownSeconds: {
          type: Number,
          default: 3
        }
      },
      emits: ["update:visible", "retry"],
      setup(t, {
        emit: o
      }) {
        const l = t,
          n = o,
          a = e.ref(0);
        let s = null;
        const u = e.computed(() => a.value > 0 ? a.value + "S后重试" : "重试");
        e.watch(() => l.visible, e => {
          e ? c() : r()
        });
        const c = () => {
            r(), a.value = l.countdownSeconds, s = setInterval(() => {
              a.value--, a.value <= 0 && r()
            }, 1e3)
          },
          r = () => {
            s && (clearInterval(s), s = null)
          },
          v = () => {
            a.value = 3, c(), n("retry")
          };
        return e.onUnmounted(() => {
          r()
        }), (o, l) => e.e({
          a: t.visible
        }, t.visible ? {
          b: e.t(u.value),
          c: e.o(v),
          d: a.value > 0,
          e: e.o(() => {}),
          f: e.o(e => t.closeOnMask && void n("update:visible", !1))
        } : {})
      }
    },
    o = e._export_sfc(t, [
      ["__scopeId", "data-v-11f788e6"]
    ]);
  wx.createComponent(o)
}();