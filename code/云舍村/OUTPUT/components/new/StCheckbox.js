! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../assets/index.js"),
    t = e.defineComponent({
      __name: "StCheckbox",
      props: {
        modelValue: {
          type: Boolean
        },
        disabled: {
          type: Boolean
        },
        customStyle: null,
        label: null,
        block: {
          type: Boolean
        }
      },
      emits: ["update:modelValue"],
      setup(t, {
        emit: l
      }) {
        const s = t,
          a = l;

        function n() {
          if (s.disabled) return;
          const e = !s.modelValue;
          a("update:modelValue", e)
        }
        return (l, a) => e.e({
          a: t.disabled
        }, t.disabled ? {
          b: e.unref(o.assets).icCheckboxDisabled
        } : {
          c: e.unref(o.assets).icCheckboxChecked,
          d: e.n({
            active: s.modelValue
          }),
          e: e.unref(o.assets).icCheckbox,
          f: e.n({
            active: !s.modelValue
          })
        }, {
          g: e.t(t.label),
          h: t.block ? 1 : "",
          i: e.s(t.customStyle),
          j: e.o(n)
        })
      }
    }),
    l = e._export_sfc(t, [
      ["__scopeId", "data-v-b38a3921"]
    ]);
  wx.createComponent(l)
}();