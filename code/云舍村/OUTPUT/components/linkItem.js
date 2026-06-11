! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    n = e.defineComponent({
      name: "linkItem",
      props: {
        linkItem: {
          type: Object,
          default: () => ({})
        }
      },
      emits: ["chooseLink"],
      setup: (e, {
        emit: n
      }) => ({
        chooseLink: e => {
          n("chooseLink", e)
        }
      })
    }),
    o = e._export_sfc(n, [
      ["render", function(n, o, t, i, c, s) {
        return {
          a: e.t(n.linkItem.name),
          b: e.o(e => n.chooseLink(n.linkItem))
        }
      }],
      ["__scopeId", "data-v-2a11be81"]
    ]);
  wx.createComponent(o)
}();