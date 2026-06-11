! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    o = require("../utils/platform.js"),
    t = require("../utils/preventScroll.js"),
    l = e.defineComponent({
      name: "BottomDialog",
      props: {
        title: {
          type: String,
          default: () => ""
        },
        titleBorder: {
          type: Boolean,
          default: () => !1
        },
        closable: {
          type: Boolean,
          default: () => !0
        },
        maxDialog: {
          type: Boolean,
          default: () => !1
        },
        sideslip: {
          type: Boolean,
          default: () => !1
        },
        visible: {
          type: Boolean,
          default: () => !1
        },
        noMaskEvent: {
          type: Boolean,
          default: () => !1
        },
        customWrapStyle: String
      },
      emits: ["openState"],
      setup(l, {
        emit: i
      }) {
        const a = e.ref(!1),
          s = e.ref("90vh"),
          n = e.ref("70vh"),
          r = e.computed(() => {
            let e = l.customWrapStyle || "";
            return l.maxDialog && (e += `max-height:${n.value};overflow-y: auto;`), e
          });
        return e.onMounted(() => {
          e.index.getSystemInfo({
            success: e => {
              const t = o.getMenuButtonBoundingClientRect();
              s.value = e.screenHeight - e.statusBarHeight - 50 + "px", n.value = e.screenHeight - t.bottom - (t.top - e.statusBarHeight) - 56 + "px"
            },
            fail(e) {
              console.log(e)
            }
          })
        }), {
          isShowDialog: a,
          showDialog: () => {
            a.value = !0, i("openState", 1), t.preventScroll()
          },
          hideDialog: () => {
            a.value = !1, i("openState", 0), t.restoreScroll()
          },
          maxHeight: s,
          maxDialogHeight: n,
          maxDialogStyle: r
        }
      },
      watch: {
        visible(e) {
          e ? this.showDialog() : this.hideDialog()
        }
      }
    }),
    i = e._export_sfc(l, [
      ["render", function(o, t, l, i, a, s) {
        return e.e({
          a: o.isShowDialog ? 1 : "",
          b: o.isShowDialog ? 1 : "",
          c: o.closable ? "" : 1,
          d: e.o(e => o.noMaskEvent ? "" : o.hideDialog),
          e: e.t(o.title),
          f: o.titleBorder
        }, (o.titleBorder, {}), {
          g: o.sideslip
        }, o.sideslip ? e.e({
          h: o.closable
        }, o.closable ? {
          i: e.o((...e) => o.hideDialog && o.hideDialog(...e))
        } : {}) : e.e({
          j: o.closable
        }, o.closable ? {
          k: e.o((...e) => o.hideDialog && o.hideDialog(...e))
        } : {}), {
          l: o.maxDialog
        }, o.maxDialog ? {
          m: e.s(o.maxDialogStyle)
        } : {}, {
          n: !o.maxDialog
        }, (o.maxDialog, {}), {
          o: o.isShowDialog && !o.sideslip ? 1 : "",
          p: o.isShowDialog && o.sideslip ? 1 : "",
          q: o.isShowDialog ? 1 : "",
          r: o.maxHeight,
          s: o.isShowDialog
        })
      }],
      ["__scopeId", "data-v-d0919d32"]
    ]);
  wx.createComponent(i)
}();