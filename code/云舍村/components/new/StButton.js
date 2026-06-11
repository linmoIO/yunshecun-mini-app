! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    n = require("../../utils/helper.js");
  Math || o();
  const o = () => "./Spin.js",
    l = e.defineComponent({
      __name: "StButton",
      props: {
        theme: {
          default: "white"
        },
        size: {
          default: "default"
        },
        color: null,
        disabled: {
          type: Boolean
        },
        loading: {
          type: Boolean
        },
        loadingIconSize: null,
        block: {
          type: Boolean
        },
        preventDisabledDefault: {
          type: Boolean
        },
        allowClickWhenDisabled: {
          type: Boolean
        },
        customStyle: null,
        openType: null,
        getPhoneNumber: null
      },
      emits: ["click", "getPhoneNumber"],
      setup(o, {
        emit: l
      }) {
        const t = o,
          i = l;

        function a() {
          t.loading || !t.preventDisabledDefault && !t.allowClickWhenDisabled && t.disabled || i("click")
        }
        const c = e.computed(() => ({
          white: "black",
          black: "white",
          simple: "black"
        } [t.theme]));

        function s(e) {
          i("getPhoneNumber", e)
        }
        return (l, i) => e.e({
          a: o.loading
        }, o.loading ? {
          b: e.p({
            theme: c.value,
            size: o.loadingIconSize ? e.unref(n.addCssUnit)(o.loadingIconSize) : e.unref(n.pxTransform)(72)
          })
        } : {}, {
          c: e.n("button--" + o.theme),
          d: e.n("button--" + o.size),
          e: e.n({
            block: t.block,
            disabled: t.disabled
          }),
          f: o.openType,
          g: e.s(o.customStyle),
          h: e.o(a),
          i: e.o(s)
        })
      }
    }),
    t = e._export_sfc(l, [
      ["__scopeId", "data-v-ccf051cd"]
    ]);
  wx.createComponent(t)
}();