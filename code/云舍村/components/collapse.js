! function() {
  "use strict";
  const t = require("../common/vendor.js"),
    e = {
      name: "Collapse",
      data: () => ({
        isCollapsed: !0,
        contentHeight: "",
        wrapperHeight: "",
        isCollapseButtonVisible: !1
      }),
      props: {
        btn: {
          type: String,
          default: "F"
        },
        arrowStyle: {
          type: String
        },
        iconName: {
          type: String,
          default: "icon-a-12_xialajiantou_hei"
        },
        defaultHeight: {
          type: String,
          default: "200px"
        },
        open: {
          type: Boolean,
          default: !1
        }
      },
      computed: {
        collapsed() {
          return this.isCollapsed
        }
      },
      mounted() {
        setTimeout(() => {
          this.$nextTick(() => {
            this.updata()
          })
        }, 500)
      },
      methods: {
        toggleCollapse() {
          this.isCollapsed = !this.isCollapsed, this.wrapperHeight = this.isCollapsed ? this.defaultHeight : this.contentHeight
        },
        updata() {
          var e = t.index.createSelectorQuery().in(this);
          e.select(".content-wrapper").boundingClientRect(), e.exec(t => {
            this.contentHeight = t[0].height + "px", console.log(this.contentHeight), parseFloat(this.contentHeight) > parseFloat(this.defaultHeight) ? this.isCollapseButtonVisible = !0 : (this.isCollapseButtonVisible = !1, this.contentHeight = "auto", this.wrapperHeight = "auto"), this.isCollapseButtonVisible && (this.open ? (this.wrapperHeight = this.contentHeight, this.isCollapsed = !1) : this.wrapperHeight = this.defaultHeight)
          })
        }
      }
    },
    i = t._export_sfc(e, [
      ["render", function(e, i, l, o, s, a) {
        return t.e({
          a: s.contentHeight,
          b: s.isCollapseButtonVisible && "F" == l.btn
        }, s.isCollapseButtonVisible && "F" == l.btn ? {
          c: t.n(a.collapsed ? l.iconName : l.iconName + " rotate"),
          d: t.o((...t) => a.toggleCollapse && a.toggleCollapse(...t)),
          e: t.s(l.arrowStyle)
        } : {}, {
          f: s.wrapperHeight,
          g: s.isCollapseButtonVisible && "T" == l.btn && a.collapsed
        }, s.isCollapseButtonVisible && "T" == l.btn && a.collapsed ? {
          h: t.o((...t) => a.toggleCollapse && a.toggleCollapse(...t))
        } : {}, {
          i: s.isCollapseButtonVisible && "T" == l.btn && !a.collapsed
        }, s.isCollapseButtonVisible && "T" == l.btn && !a.collapsed ? {
          j: t.o((...t) => a.toggleCollapse && a.toggleCollapse(...t))
        } : {})
      }],
      ["__scopeId", "data-v-8d8411d2"]
    ]);
  wx.createComponent(i)
}();