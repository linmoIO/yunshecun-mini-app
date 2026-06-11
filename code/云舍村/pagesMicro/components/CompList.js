! function() {
  "use strict";
  const o = require("../../common/vendor.js");
  require("../../store/index.js");
  const e = require("../../utils/helper.js"),
    n = require("../../utils/qdTracker.js"),
    a = require("../../utils/umengAdaptor.js"),
    t = require("../../store/modules/micro.js");
  Math || (d + m + r + i + c + p + s)();
  const i = () => "../../components/new/ProductCardList.js",
    r = () => "../../components/new/StImage.js",
    p = () => "./Carousel.js",
    c = () => "./Coupons.js",
    s = () => "./MicroVideo.js",
    m = () => "./Paragraph.js",
    d = () => "./Tabs.js",
    g = o.defineComponent({
      __name: "CompList",
      props: {
        indexPrefix: null,
        items: null,
        parentCompName: {
          default: "page"
        },
        tabOffsetTop: null,
        trackData: {
          default: () => ({
            activity_page_id: "",
            activity_page_name: ""
          })
        }
      },
      setup(i) {
        const r = i,
          p = t.useMicroStore(),
          c = {
            tabs: "标签栏",
            image: "图片",
            carousel: "轮播",
            video: "视频"
          },
          s = o.ref({});

        function m(o, e) {
          var a;
          const t = {
            activity_page_id: r.trackData.activity_page_id,
            activity_page_name: r.trackData.activity_page_name,
            comp_name: o.componentName || "",
            comp_type: c[e]
          };
          "tabs" === e && (t.tab_name = (null == (a = s.value) ? void 0 : a.label) || ""), n.qdTracker.track("activity_page_click", t)
        }

        function d(o) {
          var n, a;
          const t = {};
          return (null == o ? void 0 : o.margin) && (t.margin = `${e.pxTransform(o.margin.top,375)} ${e.pxTransform(o.margin.right,375)} ${e.pxTransform(o.margin.bottom,375)} ${e.pxTransform(o.margin.left,375)}`), (null == o ? void 0 : o.padding) && (t.padding = `${e.pxTransform(o.padding.top,375)} ${e.pxTransform(o.padding.right,375)} ${e.pxTransform(o.padding.bottom,375)} ${e.pxTransform(o.padding.left,375)}`), "color" === (null == (n = null == o ? void 0 : o.background) ? void 0 : n.type) && (t.backgroundColor = o.background.value), "image" === (null == (a = null == o ? void 0 : o.background) ? void 0 : a.type) && (t.backgroundImage = `url(${o.background.value})`), t
        }
        return (e, n) => {
          var t, r;
          return o.e({
            a: null == (t = i.items) ? void 0 : t.length
          }, (null == (r = i.items) ? void 0 : r.length) ? {
            b: o.f(i.items, (e, n, t) => o.e({
              a: "tabs" === e.component
            }, "tabs" === e.component ? {
              b: o.o((o, n) => function(o, e, n) {
                s.value = n.tabs[e], m(n, "tabs")
              }(0, n, e.config.props), e._id),
              c: "73604e56-0-" + t,
              d: o.p({
                ...e.config.props,
                "index-prefix": `${i.indexPrefix?i.indexPrefix+"-":""}${n}`,
                sticky: e.config.props.sticky,
                "offset-top": i.tabOffsetTop,
                "track-data": i.trackData
              })
            } : {}, {
              e: "paragraph" === e.component
            }, "paragraph" === e.component ? {
              f: "73604e56-1-" + t,
              g: o.p({
                ...e.config.props
              })
            } : {}, {
              h: "image" === e.component
            }, "image" === e.component ? {
              i: "73604e56-2-" + t,
              j: o.p({
                ...e.config.props,
                "wrap-config": e.config.wrap,
                "before-click-hot-area": o => function(o, e) {
                  o.link && (a.adaptor.sendEvent("click_hot_zone_control", {
                    button_name: e.componentName,
                    hot_zone_url: o.link
                  }), m(e, "image"))
                }(o, e.config.props)
              })
            } : {}, {
              k: "product" === e.component
            }, "product" === e.component ? {
              l: "73604e56-3-" + t,
              m: o.p({
                ...e.config.props
              })
            } : {}, {
              n: "coupon" === e.component
            }, "coupon" === e.component ? {
              o: "73604e56-4-" + t,
              p: o.p({
                ...e.config.props,
                "member-activity-id": o.unref(p).memberActivityId
              })
            } : {}, {
              q: "carousel" === e.component
            }, "carousel" === e.component ? {
              r: "73604e56-5-" + t,
              s: o.p({
                ...e.config.props,
                "before-click-carousel-item": o => {
                  m(e.config.props, "carousel")
                }
              })
            } : {}, {
              t: "video" === e.component
            }, "video" === e.component ? {
              v: "73604e56-6-" + t,
              w: o.p({
                ...e.config.props,
                "selector-id": "video-" + n,
                "index-prefix": `${i.indexPrefix?i.indexPrefix+"-":""}${n}`,
                "tracking-name": "activity_page_click",
                "tracking-data": {
                  activity_page_id: i.trackData.activity_page_id,
                  activity_page_name: i.trackData.activity_page_name,
                  comp_name: e.config.props.componentName,
                  comp_type: c.video
                }
              })
            } : {}, {
              x: o.s(d(e.config.wrap)),
              y: e._id
            }))
          } : {})
        }
      }
    });
  wx.createComponent(g)
}();