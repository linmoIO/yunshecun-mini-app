! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    n = e.defineComponent({
      name: "NumberTransition",
      __name: "NumberTransition",
      props: {
        value: null,
        duration: null,
        ease: null,
        format: {
          type: Function
        }
      },
      setup(n) {
        const a = n,
          u = e.ref(a.value || 0),
          t = e.ref(null);
        return e.watch(() => a.value, n => {
          t.value && t.value.kill(), t.value = e.gsapWithCSS.to(u, {
            value: n,
            duration: a.duration || 1,
            ease: a.ease || "expo.out"
          })
        }), e.onUnmounted(() => {
          t.value && t.value.kill()
        }), (n, t) => ({
          a: e.t(a.format ? a.format(u.value) : u.value)
        })
      }
    });
  wx.createComponent(n)
}();