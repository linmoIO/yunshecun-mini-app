! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../assets/index.js"),
    s = require("../../hooks/useSubscribeMessage.js");
  require("../../store/index.js");
  const i = require("../../store/modules/micro.js");
  Math || o();
  const o = () => "../../components/new/StButton.js",
    n = e.defineComponent({
      __name: "SubscribeMessage",
      props: {
        scenes: {
          default: () => []
        },
        pageId: null,
        visible: {
          type: Boolean
        },
        title: {
          default: "订阅活动通知"
        },
        subTitle: {
          default: "不错过任何优惠信息和限时活动"
        },
        confirmText: {
          default: "立即订阅"
        },
        cancelText: {
          default: "稍后再说"
        }
      },
      setup(o) {
        const n = o,
          r = i.useMicroStore(),
          u = e.ref(!0),
          c = e.computed(() => n.visible && u.value),
          {
            subscribeMessage: a
          } = s.useSubscribeMessage(n.scenes);
        async function l() {
          await a(), r.addSubscribePopupRecord(n.pageId), u.value = !1
        }

        function p() {
          u.value = !1
        }
        return (s, i) => e.e({
          a: c.value
        }, c.value ? {
          b: e.unref(t.assets).icMessageBell,
          c: e.t(o.title),
          d: e.t(o.subTitle),
          e: e.t(o.cancelText),
          f: e.o(p),
          g: e.p({
            theme: "simple",
            "custom-style": {
              height: "28px",
              width: "72px",
              fontSize: "12px",
              lineHeight: "12px",
              borderColor: "white",
              background: "transparent",
              color: "white"
            }
          }),
          h: e.t(o.confirmText),
          i: e.o(l),
          j: e.p({
            theme: "white",
            "custom-style": {
              height: "28px",
              width: "72px",
              fontSize: "12px",
              lineHeight: "12px",
              marginLeft: "8px"
            }
          })
        } : {})
      }
    }),
    r = e._export_sfc(n, [
      ["__scopeId", "data-v-e17ccabf"]
    ]);
  wx.createComponent(r)
}();