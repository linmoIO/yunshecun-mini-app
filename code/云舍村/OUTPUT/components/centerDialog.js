! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../utils/platform.js"),
    o = require("../utils/preventScroll.js"),
    a = e.defineComponent({
      name: "centerDialog",
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
        noMaskEvent: {
          type: Boolean,
          default: () => !1
        }
      },
      emits: ["openState"],
      setup(a, {
        emit: l
      }) {
        let i = e.ref(!1),
          n = e.ref("90vh"),
          s = e.ref("70vh");
        const r = e.computed(() => {
          var e = "";
          return a.maxDialog && (e = `max-height:${s.value};overflow-y: auto;`), e
        });
        return e.onMounted(() => {
          e.index.getSystemInfo({
            success: e => {
              const o = t.getMenuButtonBoundingClientRect();
              n.value = e.screenHeight - e.statusBarHeight - 50 + "px", s.value = e.screenHeight - o.bottom - (o.top - e.statusBarHeight) - 56 + "px"
            },
            fail(e) {
              console.log(e)
            }
          })
        }), {
          isShowDialog: i,
          showDialog: () => {
            i.value = !0, l("openState", 1), o.preventScroll()
          },
          hideDialog: () => {
            i.value = !1, l("openState", 0), o.restoreScroll()
          },
          maxHeight: n,
          maxDialogHeight: s,
          maxDialogStyle: r
        }
      }
    }),
    l = e._export_sfc(a, [
      ["render", function(t, o, a, l, i, n) {
        return e.e({
          a: e.o(e => t.noMaskEvent ? "" : t.hideDialog),
          b: t.isShowDialog ? 1 : "",
          c: t.isShowDialog ? 1 : "",
          d: t.closable ? "" : 1,
          e: e.t(t.title),
          f: t.titleBorder
        }, (t.titleBorder, {}), {
          g: t.maxDialog
        }, t.maxDialog ? {
          h: e.s(t.maxDialogStyle)
        } : {}, {
          i: t.isShowDialog && !t.sideslip ? 1 : "",
          j: t.isShowDialog && t.sideslip ? 1 : "",
          k: t.isShowDialog ? 1 : "",
          l: t.maxHeight,
          m: t.isShowDialog
        })
      }],
      ["__scopeId", "data-v-6272428b"]
    ]);
  wx.createComponent(l)
}();