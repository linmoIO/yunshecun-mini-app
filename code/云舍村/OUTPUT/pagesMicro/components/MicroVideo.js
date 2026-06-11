! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/helper.js");
  Math || o();
  const o = () => "../../components/new/StAd.js",
    n = e.defineComponent({
      __name: "MicroVideo",
      props: {
        selectorId: null,
        src: null,
        poster: null,
        height: {
          default: 250
        },
        mute: {
          type: Boolean,
          default: !1
        },
        rounded: {
          type: Boolean,
          default: !1
        },
        autoplay: {
          type: Boolean,
          default: !1
        },
        trackingData: null
      },
      setup(o) {
        const n = e.ref("video");
        return (a, r) => ({
          a: o.selectorId,
          b: e.p({
            id: o.selectorId,
            "file-type": n.value,
            "play-btn-postion": "center",
            "play-btn-size": "large",
            "file-url": o.src,
            "video-cover-url": o.poster,
            muted: o.mute,
            rounded: o.rounded,
            autoplay: o.autoplay,
            "tracking-name": "activity_page_click",
            "tracking-data": o.trackingData
          }),
          c: e.unref(t.pxTransform)(o.height, 375)
        })
      }
    });
  wx.createComponent(n)
}();