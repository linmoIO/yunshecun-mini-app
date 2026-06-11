! function() {
  "use strict";
  const e = require("../../common/vendor.js");
  require("../../utils/config.js"), require("../../utils/request.js"), require("../../utils/log.js"), require("../../utils/qdTracker.js"), require("../../utils/umengAdaptor.js");
  const o = {
    props: {
      urls: {
        type: Array,
        required: !0,
        default: () => []
      },
      isPrivate: {
        type: Boolean,
        default: () => !1
      }
    },
    data: () => ({
      show: !1,
      current: 0,
      scale: 1,
      isZooming: !1,
      navHeight: 32,
      menuTop: 0,
      isCmb: !1
    }),
    methods: {
      open(o) {
        e.index.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: "#000000"
        }), setTimeout(() => {
          this.current = this.urls.findIndex(e => e === o), this.show = !0, this.$emit("open")
        }, 200)
      },
      close() {
        this.isZooming || (this.show = !1, this.current = 0, e.index.setNavigationBarColor({
          frontColor: "#000000",
          backgroundColor: "#ffffff"
        }), this.$emit("close"))
      },
      swiperChange(e) {
        this.current = e.detail.current
      },
      onLongpress(e) {
        this.$emit("onLongpress", e)
      },
      handleTouchStart() {
        console.log(555555), this.isZooming = !0
      },
      handleTouchEnd() {
        this.isZooming = !1
      }
    },
    mounted() {
      if (e.index.getMenuButtonBoundingClientRect) {
        let o = e.index.getMenuButtonBoundingClientRect();
        this.menuTop = o.top, this.navHeight = o.height
      }
    },
    components: {
      vDownload: () => "./ss-download.js"
    }
  };
  Array || e.resolveComponent("v-download")();
  const t = e._export_sfc(o, [
    ["render", function(o, t, n, r, s, i) {
      return e.e({
        a: s.show
      }, s.show ? e.e({
        b: e.o((...e) => i.close && i.close(...e)),
        c: n.urls.length > 0
      }, n.urls.length > 0 ? {
        d: e.t(s.current + 1),
        e: e.t(n.urls.length)
      } : {}, {
        f: s.navHeight + "px",
        g: s.menuTop + "px",
        h: e.f(n.urls, (o, t, n) => ({
          a: t,
          b: o,
          c: e.o(e => i.onLongpress(o), t),
          d: t
        })),
        i: s.scale,
        j: s.current,
        k: e.o((...e) => i.swiperChange && i.swiperChange(...e)),
        l: e.o((...e) => i.handleTouchStart && i.handleTouchStart(...e)),
        m: e.o((...e) => i.handleTouchEnd && i.handleTouchEnd(...e)),
        n: e.o((...e) => i.close && i.close(...e)),
        o: !s.isCmb
      }, s.isCmb ? {} : {
        p: e.p({
          isPrivate: n.isPrivate,
          fileUrl: n.urls[s.current],
          current: s.current,
          fileType: "1"
        })
      }) : {})
    }],
    ["__scopeId", "data-v-ee37603d"]
  ]);
  wx.createComponent(t)
}();