! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/jAlert/jAlert.js");
  Math || t();
  const t = () => "../new/StCheckbox.js",
    a = e.defineComponent({
      __name: "OrderContactTipNotice",
      props: {
        modelValue: {
          type: Boolean
        }
      },
      emits: ["update:modelValue"],
      setup(t, {
        emit: a
      }) {
        const n = t,
          l = a,
          u = e.ref(n.modelValue || !1);

        function r() {
          u.value = !u.value, l("update:modelValue", u.value)
        }

        function c() {
          o.jAlert3("根据会员政策，订单预定人本人必须为出行人。若仅有亲友出行并希望享受本人的预定权益，可将亲友设置为关联人，再由亲友自行下单。具体可在【我的】-【会员受益人】-【权益关联人】中设置。")
        }
        return e.ref(!1), (o, t) => ({
          a: e.p({
            "model-value": u.value,
            block: !0
          }),
          b: e.o(c),
          c: e.o(r)
        })
      }
    }),
    n = e._export_sfc(a, [
      ["__scopeId", "data-v-8c1159a5"]
    ]);
  wx.createComponent(n)
}();