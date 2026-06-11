! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../assets/index.js"),
    l = e.defineComponent({
      __name: "StRadio",
      props: {
        modelValue: null,
        disabled: null,
        noEmitted: null,
        customStyle: null
      },
      emits: ["update:modelValue"],
      setup(l, {
        emit: a
      }) {
        const d = l,
          o = a,
          n = e.ref(d.modelValue);

        function s() {
          d.disabled || d.noEmitted || o("update:modelValue", !n.value)
        }
        return e.watch(() => d.modelValue, e => {
          n.value = e
        }), (a, d) => e.e({
          a: l.disabled
        }, l.disabled ? {
          b: e.unref(t.assets).icRadioDisabled
        } : {
          c: e.n({
            active: n.value
          }),
          d: e.n({
            active: !n.value
          })
        }, {
          e: e.o(s),
          f: e.s(l.customStyle)
        })
      }
    }),
    a = e._export_sfc(l, [
      ["__scopeId", "data-v-0776e303"]
    ]);
  wx.createComponent(a)
}();