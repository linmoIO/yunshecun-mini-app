! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/api.js"),
    n = require("../../utils/helper.js"),
    a = require("../../utils/index.js");
  Math || (t + u + s)();
  const t = () => "./Spin.js",
    u = () => "./StButton.js",
    s = () => "./StDialog.js",
    l = e.defineComponent({
      __name: "GraphCaptchaDialog",
      props: {
        show: {
          type: Boolean
        },
        beforeConfirm: {
          type: Function
        }
      },
      emits: ["update:show"],
      setup(t, {
        emit: u
      }) {
        const s = t,
          l = u;

        function i() {
          l("update:show", !1)
        }
        const r = e.ref(""),
          f = e.ref(""),
          c = e.ref(!1),
          v = e.ref(""),
          {
            run: p,
            loading: d
          } = e.useRequest(o.api.verifyCode, {
            manual: !0,
            onSuccess(e) {
              var o;
              (null == (o = e.retVal) ? void 0 : o.path) && (c.value = !0, f.value = e.retVal.path)
            }
          }),
          m = e.debounce((function() {
            v.value = a.genSessionId(24), c.value || (r.value = "", p({
              sessionId: v.value
            }))
          }), 300, {
            leading: !0
          });
        e.onMounted(() => {
          m()
        });
        const h = e.ref(!1);
        async function b() {
          const e = r.value.trim();
          if (/\d{4}/.test(e))
            if (h.value = !0, "function" != typeof s.beforeConfirm) "boolean" == typeof s.beforeConfirm && (h.value = !1, !1 === s.beforeConfirm && m());
            else try {
              const o = await (null == s ? void 0 : s.beforeConfirm({
                sessionId: v.value,
                code: e
              }));
              h.value = !1, o ? i() : m()
            } catch {
              h.value = !1, m()
            }
        }
        const w = e.ref(!0);
        return e.watch(() => s.show, e => {
          e && !w.value && m(), e && w.value && (w.value = !1)
        }), (o, a) => ({
          a: r.value,
          b: e.o(e => r.value = e.detail.value),
          c: e.p({
            spinning: e.unref(d) || c.value,
            size: e.unref(n.pxTransform)(32, 375)
          }),
          d: f.value,
          e: c.value || e.unref(d) ? 1 : "",
          f: e.o(e => c.value = !1),
          g: e.o(e => c.value = !1),
          h: e.o((...o) => e.unref(m) && e.unref(m)(...o)),
          i: e.o(b),
          j: e.p({
            block: !0,
            theme: "black",
            loading: h.value
          }),
          k: e.unref(d) ? 1 : "",
          l: e.o(i),
          m: e.p({
            show: s.show,
            title: "输入图形验证码",
            "close-on-click-mark": !0,
            ...s,
            "custom-style": {
              paddingBottom: "100vw"
            }
          })
        })
      }
    }),
    i = e._export_sfc(l, [
      ["__scopeId", "data-v-f0b9b977"]
    ]);
  wx.createComponent(i)
}();