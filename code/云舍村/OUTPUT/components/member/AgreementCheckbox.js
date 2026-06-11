! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/url.js");
  Math || o();
  const o = () => "../new/StCheckbox.js",
    l = e.defineComponent({
      __name: "AgreementCheckbox",
      props: {
        modelValue: {
          type: Boolean
        },
        theme: null,
        customStyle: null
      },
      emits: ["update:modelValue"],
      setup(o, {
        emit: l
      }) {
        const n = l,
          u = {
            rule: "用户协议",
            PrivacyRule: "隐私政策"
          };

        function c(o) {
          const l = {
            title: decodeURIComponent(u[o] || ""),
            code: o
          };
          e.index.navigateTo({
            url: t.addUrlQuery("/pagesA/other/codeText", l)
          })
        }
        return (t, l) => ({
          a: e.o(e => c("rule")),
          b: e.o(e => c("PrivacyRule")),
          c: e.n("agreement-text--" + o.theme),
          d: e.o(e => n("update:modelValue", e)),
          e: e.p({
            "model-value": o.modelValue,
            block: !0,
            "custom-style": o.customStyle
          })
        })
      }
    }),
    n = e._export_sfc(l, [
      ["__scopeId", "data-v-06d53b6d"]
    ]);
  wx.createComponent(n)
}();