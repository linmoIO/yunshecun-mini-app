! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = e.defineComponent({
      __name: "Stepper",
      props: {
        modelValue: null,
        min: {
          default: 1
        },
        max: null
      },
      emits: ["update:modelValue"],
      setup(a, {
        emit: u
      }) {
        const m = a,
          l = u,
          t = e.ref(m.modelValue || m.min);

        function n(a) {
          const u = t.value + a;
          e.isNumber(m.min) && u < m.min || e.isNumber(m.max) && u > m.max || (t.value = u, l("update:modelValue", u))
        }
        return e.watch(() => m.modelValue, a => {
          e.isNil(a) || a === t.value || (a < m.min ? (t.value = m.min, l("update:modelValue", t.value)) : m.max && a > m.max ? (t.value = m.max, l("update:modelValue", t.value)) : t.value = a)
        }), e.watch(() => m.min, e => {
          e > t.value && (t.value = e, l("update:modelValue", e))
        }, {
          immediate: !0
        }), e.watch(() => m.max, e => {
          e && e < t.value && (t.value = e, l("update:modelValue", e))
        }, {
          immediate: !0
        }), (u, m) => ({
          a: e.unref(e.isNumber)(a.min) && t.value <= a.min ? 1 : "",
          b: e.o(e => n(-1)),
          c: e.t(t.value),
          d: e.unref(e.isNumber)(a.max) && t.value >= a.max ? 1 : "",
          e: e.o(e => n(1))
        })
      }
    }),
    u = e._export_sfc(a, [
      ["__scopeId", "data-v-77a393cd"]
    ]);
  wx.createComponent(u)
}();