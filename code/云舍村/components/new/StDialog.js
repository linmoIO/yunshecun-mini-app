! function() {
  "use strict";
  const t = require("../../common/vendor.js"),
    e = t.defineComponent({
      __name: "StDialog",
      props: {
        show: {
          type: Boolean
        },
        title: null,
        message: null,
        messageAlign: {
          default: "center"
        },
        messageStyle: null,
        showCancelButton: {
          type: Boolean,
          default: !0
        },
        cancelButtonDisabled: {
          type: Boolean
        },
        cancelButtonText: {
          default: "取消"
        },
        showConfirmButton: {
          type: Boolean,
          default: !0
        },
        confirmButtonDisabled: {
          type: Boolean
        },
        confirmButtonText: {
          default: "确认"
        },
        mark: {
          type: Boolean,
          default: !0
        },
        closeOnClickMark: {
          type: Boolean
        },
        rounded: {
          type: Boolean,
          default: !0
        },
        zIndex: {
          default: 10
        },
        customStyle: null,
        contentStyle: null,
        cancelButtonStyle: null,
        confirmButtonStyle: null
      },
      emits: ["cancel", "confirm", "update:show"],
      setup(e, {
        emit: n
      }) {
        const o = e,
          l = n;

        function a() {
          o.cancelButtonDisabled || (l("cancel"), l("update:show", !1))
        }

        function s() {
          o.confirmButtonDisabled || (l("confirm"), l("update:show", !1))
        }

        function c() {
          o.closeOnClickMark && l("update:show", !1)
        }
        return (n, o) => t.e({
          a: t.o(c),
          b: t.t(e.title),
          c: t.t(e.message),
          d: t.s(e.messageStyle),
          e: t.n("align-" + e.messageAlign),
          f: t.s(e.contentStyle),
          g: e.showCancelButton
        }, e.showCancelButton ? {
          h: t.t(e.cancelButtonText),
          i: t.n({
            "st-dialog-action--disabled": e.cancelButtonDisabled
          }),
          j: t.s(e.cancelButtonStyle),
          k: t.o(a)
        } : {}, {
          l: e.showConfirmButton
        }, e.showConfirmButton ? {
          m: t.t(e.confirmButtonText),
          n: t.n({
            "st-dialog-action--disabled": e.confirmButtonDisabled
          }),
          o: t.s(e.confirmButtonStyle),
          p: t.o(s)
        } : {}, {
          q: t.n({
            rounded: e.rounded
          }),
          r: t.n({
            "st-dialog--show": e.show
          }),
          s: e.zIndex,
          t: t.s(e.customStyle),
          v: t.o(() => {})
        })
      }
    }),
    n = t._export_sfc(e, [
      ["__scopeId", "data-v-01cc2a5a"]
    ]);
  wx.createComponent(n)
}();