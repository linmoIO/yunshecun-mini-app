! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../utils/utils.js"),
    i = require("../assets/index.js"),
    n = e.defineComponent({
      __name: "water",
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
      setup(n, {
        emit: m
      }) {
        const c = m;
        let o = n;
        const u = e.computed(() => {
            var e;
            let t = 0;
            return "ACTIVITY_PRODUCT" === o.item.contentType && (null == (e = o.item) ? void 0 : e.minPriceDto) && (t = "money" == (o.item.minPriceDto.payType.includes("CASH") ? "money" : "mix") ? o.item.minPriceDto.price || 0 : o.item.minPriceDto.mixPrice || 0), t
          }),
          l = () => {
            e.index.setStorageSync("refresh", 1), "MUSIC" == o.item.contentType ? e.index.navigateTo({
              url: "/pagesCommon/content/audio?id=" + o.item.id
            }) : "VIDEO" == o.item.contentType ? e.index.navigateTo({
              url: "/pagesCommon/content/video?id=" + o.item.id
            }) : "ACTIVITY_PRODUCT" === o.item.contentType && o.item.activityCode ? t.goPage("/pagesE/dailyActivity/dailyActivityDetail?activityCode=" + o.item.activityCode) : "PIC" == o.item.contentType && (e.index.setStorageSync("imageText", o.item.id), t.goPage(o.item.sourceUrl + "&goodsName=" + o.item.title + "&goodsId=" + o.item.id))
          },
          r = e => e.toFixed(7).slice(0, 3),
          a = e.getCurrentInstance(),
          s = () => {
            e.index.createSelectorQuery().in(a).select("#video-item-" + o.index).boundingClientRect(e => {
              const t = JSON.parse(JSON.stringify(o.item));
              t.element = e, c("imageLoad", t)
            }).exec()
          },
          d = [{
            name: "ACTIVITY_PRODUCT",
            title: "Fun肆玩",
            icon: i.assets.icProductDayActivity
          }],
          f = e.computed(() => d.find(e => e.name === o.item.contentType));
        return (t, i) => e.e({
          a: f.value
        }, f.value ? {
          b: f.value.icon,
          c: e.t(f.value.title)
        } : {}, {
          d: e.unref(o).item.coverUrl + "?imageView2/1/&x-oss-process=image/resize,m_fill",
          e: e.o(s),
          f: "VIDEO" == e.unref(o).item.contentType
        }, (e.unref(o).item.contentType, {}), {
          g: "MUSIC" == e.unref(o).item.contentType
        }, (e.unref(o).item.contentType, {}), {
          h: e.t(e.unref(o).item.title),
          i: e.f(e.unref(o).item.tagList, (t, i, n) => e.e({
            a: t.length <= 7
          }, t.length <= 7 ? {
            b: e.t(t)
          } : {
            c: e.t(t.slice(0, 7))
          }, {
            d: i
          })),
          j: "ACTIVITY_PRODUCT" !== e.unref(o).item.contentType
        }, "ACTIVITY_PRODUCT" !== e.unref(o).item.contentType ? e.e({
          k: e.unref(o).item.isCollect
        }, (e.unref(o).item.isCollect, {}), {
          l: 0 == e.unref(o).item.collectNum
        }, (e.unref(o).item.collectNum, {}), {
          m: e.unref(o).item.collectNum > 0 && e.unref(o).item.collectNum < 1e3
        }, e.unref(o).item.collectNum > 0 && e.unref(o).item.collectNum < 1e3 ? {
          n: e.t(e.unref(o).item.collectNum)
        } : {}, {
          o: e.unref(o).item.collectNum >= 1e3 && e.unref(o).item.collectNum < 1e4
        }, e.unref(o).item.collectNum >= 1e3 && e.unref(o).item.collectNum < 1e4 ? {
          p: e.t(r(e.unref(o).item.collectNum / 1e3))
        } : {}, {
          q: e.unref(o).item.collectNum >= 1e4 && e.unref(o).item.collectNum < 1e5
        }, e.unref(o).item.collectNum >= 1e4 && e.unref(o).item.collectNum < 1e5 ? {
          r: e.t(r(e.unref(o).item.collectNum / 1e4))
        } : {}, {
          s: e.unref(o).item.collectNum >= 1e5
        }, e.unref(o).item.collectNum >= 1e5 ? {
          t: e.t((e.unref(o).item.collectNum / 1e4).toFixed(0))
        } : {}) : {}, {
          v: "ACTIVITY_PRODUCT" === e.unref(o).item.contentType
        }, "ACTIVITY_PRODUCT" === e.unref(o).item.contentType ? e.e({
          w: !u.value
        }, u.value ? {
          x: e.t(u.value)
        } : {}) : {}, {
          y: e.o(l),
          z: "video-item-" + e.unref(o).index
        })
      }
    }),
    m = e._export_sfc(n, [
      ["__scopeId", "data-v-8151ee4f"]
    ]);
  wx.createComponent(m)
}();