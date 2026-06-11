! function() {
  "use strict";
  const t = require("../../../common/vendor.js"),
    e = require("../../../hooks/useLimiting.js");
  Math || o();
  const o = () => "../StDialog.js",
    n = t.defineComponent({
      __name: "LimitingRetryDialog",
      props: {
        show: {
          type: Boolean
        },
        title: {
          default: "家人您的手速太快啦！"
        },
        message: {
          default: "远方的朋友呀，此刻提交的人数如雪山融水般涌来，请稍后再来试试吧~"
        },
        zIndex: {
          default: 10
        },
        onRetry: {
          type: Function
        }
      },
      emits: ["retry", "update:show"],
      setup(o, {
        emit: n
      }) {
        const i = o,
          s = n,
          {
            countdown: u,
            isCounting: r,
            startCountdown: a,
            stopCountdown: m
          } = e.useLimiting();

        function c() {
          r.value || (s("update:show", !1), s("retry"))
        }
        return t.watch(() => i.show, t => {
          t ? a() : m()
        }, {
          immediate: !0
        }), (e, n) => ({
          a: t.o(c),
          b: t.p({
            show: o.show,
            "z-index": o.zIndex,
            title: o.title,
            message: o.message,
            "confirm-button-disabled": t.unref(r),
            "show-cancel-button": !1,
            "confirm-button-text": t.unref(r) ? t.unref(u) + "秒后重试" : "重试",
            "confirm-button-style": {
              color: "#000000"
            }
          })
        })
      }
    });
  wx.createComponent(n)
}();