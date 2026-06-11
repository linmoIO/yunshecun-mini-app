! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = e.defineComponent({
      name: "searchInput",
      props: {
        modelValue: {
          type: String,
          default: () => ""
        },
        searchIconStyle: {
          type: String,
          default: () => ""
        },
        placeholder: {
          type: String,
          default: () => ""
        }
      },
      emits: ["update:modelValue"],
      setup(t, n) {
        let u = e.ref(!1);
        return {
          handelInput: function(e) {
            n.emit("update:modelValue", e.detail.value), n.emit("input")
          },
          clearInput: function() {
            n.emit("update:modelValue", ""), n.emit("clear")
          },
          confirmInput: function(e) {
            n.emit("submit", e.detail.value)
          },
          clickInput: function(e) {
            n.emit("click", e)
          },
          isFocus: u,
          setFocus: function(e) {
            u.value = e
          }
        }
      }
    }),
    n = e._export_sfc(t, [
      ["render", function(t, n, u, o, c, l) {
        return e.e({
          a: e.s(t.searchIconStyle),
          b: t.isFocus ? 1 : "",
          c: t.placeholder,
          d: e.o((...e) => t.handelInput && t.handelInput(...e)),
          e: t.searchIconStyle,
          f: t.modelValue,
          g: e.o((...e) => t.confirmInput && t.confirmInput(...e)),
          h: e.o((...e) => t.clickInput && t.clickInput(...e)),
          i: t.isFocus,
          j: e.o(e => t.setFocus(!1)),
          k: e.o(e => t.setFocus(!0)),
          l: t.modelValue.length > 0
        }, t.modelValue.length > 0 ? {
          m: e.o((...e) => t.clearInput && t.clearInput(...e))
        } : {})
      }],
      ["__scopeId", "data-v-b648dd5b"]
    ]);
  wx.createComponent(n)
}();