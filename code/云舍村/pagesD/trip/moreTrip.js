! function() {
  "use strict";
  const e = require("../../common/vendor.js");
  Math || t();
  const t = () => "../../components/tabs.js",
    o = e.defineComponent({
      __name: "moreTrip",
      setup(t) {
        let o = e.reactive([{
          id: 0,
          name: "管家定制"
        }, {
          id: 1,
          name: "自由行"
        }]);
        return e.onMounted(() => {}), (t, n) => ({
          a: e.p({
            datas: e.unref(o),
            type: "line",
            color: "#A43127",
            titleInactiveColor: "#808080",
            titleActiveColor: "#000000",
            background: "#fff"
          })
        })
      }
    }),
    n = e._export_sfc(o, [
      ["__scopeId", "data-v-8b4aa604"]
    ]);
  wx.createPage(n)
}();