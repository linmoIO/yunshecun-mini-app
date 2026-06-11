! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../utils/utils.js"),
    i = e.defineComponent({
      name: "SwitchBar",
      props: {
        switchList: {
          type: Array,
          default: () => []
        },
        color: {
          type: String,
          default: () => ""
        },
        bold: {
          type: String,
          default: () => ""
        },
        padding: {
          type: Number,
          default: () => 0
        },
        initialActiveIndex: {
          type: Number,
          default: () => 0
        }
      },
      emits: ["changeIndex"],
      setup(i, {
        emit: n
      }) {
        const a = e.ref("");
        return e.watch([() => i.switchList.length, () => i.initialActiveIndex], async () => {
          i.switchList.length > 0 && (a.value = "", await e.nextTick$1(), a.value = "switchItem-" + i.initialActiveIndex)
        }, {
          immediate: !0
        }), {
          changeIndex: e => {
            n("changeIndex", e)
          },
          getReallyPx: t.getReallyPx,
          scrollIntoView: a
        }
      }
    }),
    n = e._export_sfc(i, [
      ["render", function(t, i, n, a, c, d) {
        return {
          a: e.f(t.switchList, (i, n, a) => ({
            a: e.t(i.name),
            b: "switchItem-" + n,
            c: n,
            d: i.active ? 1 : "",
            e: e.o(e => t.changeIndex(n), n)
          })),
          b: t.switchList.length > 5 ? 1 : "",
          c: t.color,
          d: t.bold,
          e: t.scrollIntoView,
          f: e.s(`padding: 0px ${t.getReallyPx(t.padding)}px`)
        }
      }],
      ["__scopeId", "data-v-fac072d1"]
    ]);
  wx.createComponent(n)
}();