! function() {
  "use strict";
  const t = require("../../../common/vendor.js"),
    e = require("../../../hooks/useLimiting.js"),
    o = require("../../../utils/helper.js");
  Math || (s + n)();
  const n = () => "../ErrorBlock.js",
    s = () => "../StButton.js",
    i = t.defineComponent({
      __name: "index",
      props: {
        show: {
          type: Boolean
        },
        title: {
          default: "家人您的手速太快啦！"
        },
        description: {
          default: "远方的朋友呀，此刻提交的人数如雪山融水般涌来，请稍后再来试试吧~"
        },
        showButton: {
          type: Boolean,
          default: !0
        }
      },
      emits: ["retry", "update:show"],
      setup(n, {
        emit: s
      }) {
        const i = n,
          r = s,
          {
            countdown: u,
            isCounting: a,
            startCountdown: c,
            stopCountdown: d
          } = e.useLimiting();

        function p() {
          a.value || (r("update:show", !1), r("retry"))
        }
        return t.watch(() => i.show, t => {
          t ? c() : d()
        }, {
          immediate: !0
        }), (e, s) => t.e({
          a: n.showButton
        }, n.showButton ? {
          b: t.t(t.unref(a) ? t.unref(u) + "秒后重试" : "重试"),
          c: t.o(p),
          d: t.p({
            block: !0,
            theme: "black",
            "custom-style": {
              marginTop: t.unref(o.pxTransform)(24, 375)
            },
            disabled: t.unref(a)
          })
        } : {}, {
          e: t.p({
            title: n.title,
            description: n.description,
            "custom-style": {
              display: n.show ? "" : "none"
            }
          })
        })
      }
    });
  wx.createComponent(i)
}();