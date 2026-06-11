! function() {
  "use strict";
  const e = {
      data: () => ({}),
      props: ["datas"],
      components: {},
      methods: {},
      created() {},
      mounted() {},
      beforeDestroy() {},
      computed: {}
    },
    t = require("../../common/vendor.js")._export_sfc(e, [
      ["render", function(e, t, o, n, r, s) {
        return {
          a: o.datas.num + "px"
        }
      }]
    ]);
  wx.createComponent(t)
}();