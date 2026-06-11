! function() {
  "use strict";
  const e = require("../../common/vendor.js");
  Math || o();
  const o = () => "../../components/centerDialog.js",
    n = e.defineComponent({
      options: {
        styleIsolation: "shared"
      },
      __name: "ConfirmationDialog",
      props: {
        modelValue: {
          type: Boolean,
          default: !1
        }
      },
      emits: ["update:modelValue", "confirm"],
      setup(o, {
        emit: n
      }) {
        const t = n,
          a = o;
        e.watch(() => a.modelValue, o => {
          o && e.nextTick$1(() => {
            var e;
            null == (e = null == l ? void 0 : l.value) || e.showDialog()
          })
        }, {
          immediate: !0
        });
        const l = e.ref(),
          i = e => {
            0 === e && t("update:modelValue", !1)
          },
          s = () => {
            var e;
            null == (e = null == l ? void 0 : l.value) || e.hideDialog(), t("update:modelValue", !1), t("confirm")
          };
        return (o, n) => ({
          a: e.o(s),
          b: e.sr(l, "63770bb8-0", {
            k: "confirmationDialog"
          }),
          c: e.o(i)
        })
      }
    }),
    t = e._export_sfc(n, [
      ["__scopeId", "data-v-63770bb8"]
    ]);
  wx.createComponent(t)
}();