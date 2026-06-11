! function() {
  "use strict";
  const t = require("../common/vendor.js"),
    e = require("../utils/utils.js"),
    i = {
      data: () => ({
        scrollable: !1,
        scrollLeft: 0,
        currentIndex: 0,
        lineWidth: 32,
        lineHeight: 2,
        duration: .3,
        lineOffsetLeft: 0,
        active: "",
        flex: !1,
        canShow: !1
      }),
      props: {
        canCancel: {
          type: Boolean,
          default: () => !1
        },
        isAjax: {
          type: Boolean,
          default: () => !1
        },
        flexNum: {
          type: String,
          default: () => "5"
        },
        titleStyle: String,
        activeType: {
          type: String,
          default: () => ""
        },
        datas: Array,
        childColor: {
          type: String,
          default: () => ""
        },
        noPadding: {
          type: String,
          default: () => ""
        },
        titleActiveColor: {
          type: String,
          default: () => ""
        },
        type: String,
        color: {
          type: String,
          default: () => ""
        },
        titleInactiveColor: {
          type: String,
          default: () => ""
        },
        activeColor: {
          type: String,
          default: () => ""
        },
        border: {
          type: String,
          default: () => ""
        },
        background: {
          type: String,
          default: () => ""
        },
        canTab: {
          type: Boolean,
          default: () => !0
        },
        borderActiveColor: {
          type: String,
          default: () => ""
        },
        borderColor: {
          type: String,
          default: () => ""
        },
        init: {
          type: Boolean,
          default: () => !0
        },
        fullWidth: {
          type: Boolean,
          default: () => !1
        }
      },
      watch: {
        datas(t, e) {},
        activeType(t, e) {
          this.active = t
        },
        active(t, e) {
          this.datas.forEach((e, i) => {
            e.id == t && (this.currentIndex = i)
          }), this.scrollIntoView()
        }
      },
      computed: {
        lineStyle() {
          return `width: ${this.lineWidth}px; transform: translateX(${this.lineOffsetLeft}px);background-color:${this.color};height:${this.lineHeight}px;transition-duration:${this.duration}s;`
        },
        tabViewStyle() {
          var t = "";
          return "scroll" == this.type && (t += this.titleStyle, t += "height:25px;"), "line" != this.type && "pic" != this.type || (t += `color:${this.titleInactiveColor};`), "fk" == this.type && (t += `color:${this.color};border:1px solid ${this.borderColor};border-radius: 4px;`), "card" == this.type && (t += this.titleStyle), t
        },
        tabViewActStyle() {
          var t = "";
          return "scroll" == this.type && (t += this.titleStyle, t += `border: 1px solid ${this.titleActiveColor};background:${this.titleActiveColor}15;color:${this.titleActiveColor};height:25px;`), "line" != this.type && "pic" != this.type || (t += `color:${this.titleActiveColor};`), "card" == this.type && (t += `color:${this.titleActiveColor};background:${this.color};`, 1 == this.border && (t += "border-radius:15px;"), console.log(this.color)), "fk" == this.type && (t += `color:${this.titleInactiveColor};border:1px solid ${this.borderActiveColor};border-radius: 4px;`), "pic" == this.type && (t += this.titleStyle), t
        }
      },
      mounted() {
        this.activeType && (this.active = this.activeType), !this.activeType && this.init && this.datas && this.datas.length > 0 && (this.active = this.datas[0].id)
      },
      methods: {
        resize() {
          "line" === this.type && Promise.all([e.getAllRect(this, ".tab"), e.getRect(this, ".tabs_line")]).then(([t = [], e]) => {
            const i = t[this.currentIndex];
            if (null == i) return;
            let l = t.slice(0, this.currentIndex).reduce((t, e) => t + e.width, 0);
            l += (i.width - e.width) / 2 + 8, this.lineOffsetLeft = l
          })
        },
        scrollIntoView() {
          Promise.all([e.getAllRect(this, ".tab"), e.getRect(this, ".tabs")]).then(([e, i]) => {
            if (this.canShow) {
              const t = e[this.currentIndex],
                l = e.slice(0, this.currentIndex).reduce((t, e) => t + e.width, 0);
              console.log(i.width), this.scrollLeft = l - (i.width - t.width) / 2, this.resize()
            } else this.canShow = !0, i.width < t.index.getSystemInfoSync().windowWidth && (this.flex = !0), this.$nextTick(() => {
              this.scrollIntoView()
            })
          })
        },
        clickTab(t, e) {
          if (!this.isAjax) {
            if (this.active == t.id) {
              if (!this.canCancel) return;
              t = {}
            }
            this.canTab && (this.active = t.id, this.$emit("clickTab", t, e))
          }
        }
      }
    },
    l = t._export_sfc(i, [
      ["render", function(e, i, l, r, o, s) {
        return t.e({
          a: "line" === l.type
        }, "line" === l.type ? {
          b: t.s(s.lineStyle)
        } : {}, {
          c: t.f(l.datas, (e, i, r) => t.e("img" != l.type ? {
            a: t.t(e.name)
          } : {}, "2" == l.border ? {
            b: l.color
          } : {}, {
            c: i,
            d: t.s(o.active == e.id ? s.tabViewActStyle : s.tabViewStyle),
            e: o.active == e.id ? 1 : "",
            f: t.o(t => s.clickTab(e, i), i)
          })),
          d: "img" != l.type,
          e: "2" == l.border,
          f: l.fullWidth ? 1 : "",
          g: t.n(o.flex ? "flex " + l.type : l.type),
          h: o.scrollLeft,
          i: "T" == l.noPadding ? 1 : "",
          j: l.background,
          k: o.canShow ? 1 : ""
        })
      }],
      ["__scopeId", "data-v-b12f0bae"]
    ]);
  wx.createComponent(l)
}();