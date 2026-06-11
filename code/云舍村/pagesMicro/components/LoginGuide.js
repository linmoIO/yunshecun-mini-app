! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/preventScroll.js");
  Math || i();
  const i = () => "../../components/new/StButton.js",
    n = e.defineComponent({
      __name: "LoginGuide",
      props: {
        visible: {
          type: Boolean,
          default: !1
        },
        config: {
          default: () => ({
            title: "",
            description: "",
            image: ""
          })
        }
      },
      emits: ["login", "dismiss"],
      setup(i, {
        emit: n
      }) {
        const t = i,
          l = n,
          u = e.ref(!1),
          c = e.ref("");
        let s = null;

        function r() {
          l("dismiss")
        }

        function a() {
          l("login")
        }
        return e.watch(() => t.visible, e => {
          e ? (s && clearTimeout(s), u.value = !0, c.value = "slideInUp", o.preventScroll()) : (c.value = "slideOutDown", o.restoreScroll(), s = setTimeout(() => {
            u.value = !1
          }, 500))
        }), e.onUnmounted(() => {
          s && clearTimeout(s)
        }), (o, i) => {
          var n, l, s, d, m;
          return e.e({
            a: u.value
          }, u.value ? e.e({
            b: e.t(null == (n = t.config) ? void 0 : n.title),
            c: e.t(null == (l = t.config) ? void 0 : l.description),
            d: null == (s = t.config) ? void 0 : s.image
          }, (null == (d = t.config) ? void 0 : d.image) ? {
            e: null == (m = t.config) ? void 0 : m.image
          } : {}, {
            f: e.o(a),
            g: e.p({
              block: !0,
              theme: "black"
            }),
            h: e.o(r),
            i: e.n(c.value)
          }) : {})
        }
      }
    }),
    t = e._export_sfc(n, [
      ["__scopeId", "data-v-a8f8f7b4"]
    ]);
  wx.createComponent(t)
}();