! function() {
  "use strict";
  const e = {
      name: "uniSwipeAction",
      data: () => ({}),
      created() {
        this.children = []
      },
      methods: {
        resize() {},
        closeAll() {
          this.children.forEach(e => {
            e.is_show = "none"
          })
        },
        closeOther(e) {
          this.openItem && this.openItem !== e && (this.openItem.is_show = "none"), this.openItem = e
        }
      }
    },
    n = require("../../../../common/vendor.js")._export_sfc(e, [
      ["render", function(e, n, t, o, s, i) {
        return {}
      }]
    ]);
  wx.createComponent(n)
}();