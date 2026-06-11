! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../utils/utils.js"),
    o = e.defineComponent({
      __name: "wersal",
      props: {
        item: {
          type: Object,
          default: {}
        },
        index: {
          type: Number,
          default: 1
        }
      },
      emits: ["imageLoad"],
      setup(o, {
        emit: i
      }) {
        const n = i;
        let r = o;
        const m = () => {
            "MUSIC" == r.item.productType && e.index.navigateTo({
              url: "/pagesCommon/content/audio?id=" + r.item.goodsId
            }), "VIDEO" == r.item.productType && e.index.navigateTo({
              url: "/pagesCommon/content/video?id=" + r.item.goodsId
            }), "PIC" == r.item.productType && t.goPage(r.item.sourceUrl + "&goodsName=" + r.item.goodsName + "&goodsId=" + r.item.goodsId)
          },
          d = e.getCurrentInstance(),
          u = () => {
            e.index.createSelectorQuery().in(d).select("#video-item-" + r.index).boundingClientRect(e => {
              const t = JSON.parse(JSON.stringify(r.item));
              t.element = e, n("imageLoad", t)
            }).exec()
          };
        return (t, o) => e.e({
          a: e.unref(r).item.picture,
          b: e.o(u),
          c: "VIDEO" == e.unref(r).item.productType
        }, (e.unref(r).item.productType, {}), {
          d: "MUSIC" == e.unref(r).item.productType
        }, (e.unref(r).item.productType, {}), {
          e: e.t(e.unref(r).item.goodsName),
          f: e.f(e.unref(r).item.tagList, (t, o, i) => ({
            a: e.t(t),
            b: o
          }))
        }, {}, {
          g: e.t(e.unref(r).item.collectNum),
          h: e.o(m),
          i: "video-item-" + e.unref(r).index
        })
      }
    });
  wx.createComponent(o)
}();