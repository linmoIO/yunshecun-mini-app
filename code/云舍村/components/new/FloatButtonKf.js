! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/helper.js");
  Math || (o + a)();
  const a = () => "../kfDialog.js",
    o = () => "./FloatButton.js",
    n = e.defineComponent({
      __name: "FloatButtonKf",
      props: {
        trackingData: null
      },
      setup(a) {
        const o = a,
          n = e.ref(),
          r = e.ref(0),
          s = e.ref(44),
          u = e => {},
          l = e.ref(!0);

        function f() {
          var e;
          null == (e = n.value) || e.showDialog()
        }
        const c = e => {
            l.value = !e
          },
          i = e.computed(() => (null == o ? void 0 : o.trackingData) || {});
        return e.onMounted(() => {
          e.index.getSystemInfo({
            success: e => {
              r.value = e.statusBarHeight || 0, s.value = (e.statusBarHeight || 0) + s.value
            },
            fail(e) {
              console.log(e)
            }
          })
        }), e.watchEffect(() => {}), (a, o) => e.e({
          a: l.value
        }, l.value ? {
          b: e.o(f)
        } : {}, {
          c: e.unref(t.pxTransform)(375, 375, !0),
          d: e.unref(t.pxTransform)(540, 375, !0),
          e: e.o(u),
          f: e.s("top:" + e.unref(t.pxTransform)(s.value, 375)),
          g: e.sr(n, "5b07848a-1", {
            k: "kf"
          }),
          h: e.o(c),
          i: e.p({
            title: "一键咨询",
            "tracking-data": i.value
          })
        })
      }
    }),
    r = e._export_sfc(n, [
      ["__scopeId", "data-v-5b07848a"]
    ]);
  wx.createComponent(r)
}();