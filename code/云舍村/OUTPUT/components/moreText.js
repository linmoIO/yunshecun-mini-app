! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = {
      data: () => ({
        open: !1,
        state: {
          isExpand: !1,
          containerHeight: 0,
          needMore: !1,
          maxHeight: 0
        }
      }),
      name: "moreText",
      props: {
        content: {
          type: String
        },
        maxLine: {
          type: Number,
          default: 3
        },
        lineHeight: {
          type: Number,
          default: 22
        },
        openText: {
          type: String,
          default: "展开"
        }
      },
      methods: {
        toggleShowAll() {
          this.state.isExpand = !this.state.isExpand
        }
      },
      computed: {
        height() {
          var e = "";
          return this.state.containerHeight && (this.state.isExpand || !this.state.needMore ? (this.open = !0, e += "max-height: none;") : (this.open = !1, e += `height:${this.state.maxHeight}px;-webkit-line-clamp: ${this.maxLine};`)), e
        }
      },
      mounted() {
        setTimeout(() => {
          e.index.createSelectorQuery().in(this).select(".content-hide").boundingClientRect(e => {
            const t = e.height;
            console.log(e);
            const n = Math.round(t / this.lineHeight) > this.maxLine,
              i = this.maxLine * this.lineHeight;
            this.state.containerHeight = t, this.state.needMore = n, this.state.maxHeight = i
          }).exec()
        }, 100)
      }
    },
    n = e._export_sfc(t, [
      ["render", function(t, n, i, o, s, a) {
        return e.e({
          a: s.state.needMore
        }, s.state.needMore ? e.e({
          b: s.state.isExpand
        }, s.state.isExpand ? {
          c: e.o((...e) => a.toggleShowAll && a.toggleShowAll(...e))
        } : {
          d: e.t(i.openText),
          e: e.o((...e) => a.toggleShowAll && a.toggleShowAll(...e))
        }) : {}, {
          f: i.content,
          g: i.content,
          h: e.s(a.height),
          i: s.open ? 1 : ""
        })
      }],
      ["__scopeId", "data-v-b7c28bbc"]
    ]);
  wx.createComponent(n)
}();