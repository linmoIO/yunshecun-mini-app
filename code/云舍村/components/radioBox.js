! function() {
  "use strict";
  const a = require("../common/vendor.js"),
    e = a.defineComponent({
      name: "radioGroup",
      props: {
        datas: {
          type: Array,
          default: () => []
        },
        val: {
          type: String,
          default: () => ""
        },
        dataKey: {
          type: String,
          default: () => ""
        },
        auto: {
          type: Boolean,
          default: () => !1
        }
      },
      emits: ["update:val"],
      setup(e, t) {
        const o = a.ref(""),
          n = a.ref(),
          l = a.computed(() => (n.value = e.val || "", o.value = e.val, e.datas));
        return a.onMounted(() => {}), {
          chooseData: a => {
            a.invalid || (o.value = a[e.dataKey], t.emit("update:val", a[e.dataKey]))
          },
          newDatas: l,
          clear: () => {
            o.value = "", console.log(o.value), t.emit("update:val", o.value)
          },
          initVal: n,
          chooseVal: o
        }
      }
    }),
    t = a._export_sfc(e, [
      ["render", function(e, t, o, n, l, u) {
        return {
          a: a.f(e.newDatas, (t, o, n) => ({
            a: a.t(t.name),
            b: o,
            c: a.o(a => e.chooseData(t), o),
            d: e.chooseVal == t[e.dataKey] ? 1 : "",
            e: t.invalid ? 1 : ""
          })),
          b: e.auto ? 1 : ""
        }
      }],
      ["__scopeId", "data-v-6afb3b7c"]
    ]);
  wx.createComponent(t)
}();