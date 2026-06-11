! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = e.defineComponent({
      name: "empty",
      components: {},
      props: {
        emptyUrl: {
          type: String,
          default: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/empty.png"
        },
        tips: {
          type: String,
          default: "暂无数据"
        },
        subTips: {
          type: String,
          default: ""
        },
        mode: {
          type: String,
          default: "image"
        }
      },
      setup: (e, t) => ({})
    }),
    n = e._export_sfc(t, [
      ["render", function(t, n, o, p, s, m) {
        return e.e({
          a: "image" == t.mode
        }, "image" == t.mode ? {
          b: t.emptyUrl,
          c: e.t(t.tips),
          d: e.t(t.subTips)
        } : {}, {
          e: "text" == t.mode
        }, "text" == t.mode ? {
          f: e.t(t.tips)
        } : {}, {
          g: e.n(t.mode)
        })
      }],
      ["__scopeId", "data-v-6f55fdd0"]
    ]);
  wx.createComponent(n)
}();