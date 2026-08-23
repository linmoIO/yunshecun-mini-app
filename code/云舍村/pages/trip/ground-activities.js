! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/channel.js"),
    a = require("../../base/home.js"),
    n = require("../../hooks/useNavigatorRect.js"),
    t = require("../../hooks/useScroll.js"),
    r = require("../../services/home.js"),
    l = require("../../utils/helper.js"),
    u = require("../../utils/wxuser.js");
  Math || (d + s + c + i)();
  const i = () => "../../components/bottomNav.js",
    s = () => "../../components/groundActivities/Banner.js",
    c = () => "../../components/groundActivities/GoodsGroup.js",
    d = () => "../../components/new/Navigator.js",
    p = e.defineComponent({
      __name: "ground-activities",
      setup(i) {
        const s = u.getStorage("config"),
          {
            scrollTop: c,
            onPageScroll: d
          } = t.useScroll(),
          p = n.useNavigatorRect(),
          v = e.ref(""),
          h = e.ref({
            banner: [],
            adCustomTravel: [],
            loggedMember: [],
            whatIs: [],
            travelType: [],
            fullScreen: [],
            hotRecommendTop: [],
            hotRecommendSwiper: []
          }),
          f = e.ref(`${s.baseUrlmall.replace(/\/api\/?$/, "")}/uploads/images/云舍村-水岸泛舟.jpg`),
          m = e.ref(!1),
          g = e.ref(!1),
          b = e.ref(),
          T = e.computed(() => {
            var e;
            const o = null == (e = p.value.padding) ? void 0 : e.top,
              a = p.value.height;
            return "" + l.addCssUnit(o + a + 28)
          });
        async function _() {
          var e, n;
          const t = {
              hotelGroupCode: s.hotelGroupCode,
              clientTypes: o.defaultChannel,
              channel: o.defaultShopChannel,
              showLocation: "1,2,3,4,5,6,7,8",
              pageType: "ON_SITE_ACTIVITIES"
            },
            l = await r.getAdData(t),
            u = new Map;
          l.retVal.forEach(e => {
            u.set(e.location, e.infos)
          });
          const i = u.get(1);
          (null == (e = null == i ? void 0 : i.topCarousel) ? void 0 : e.length) && (h.value.banner = i.topCarousel.map((e, o) => {
            var n;
            return {
              ...e,
              url: e.fileUrl,
              type: null == (n = a.AdFileTypeMeta[e.fileType]) ? void 0 : n.name,
              path: e.path,
              trackingData: {
                banner_id: e.id,
                banner_name: (null == e ? void 0 : e.name) || "在地活动页顶部轮播-" + (o + 1)
              }
            }
          }));
          const c = u.get(8);
          (null == (n = null == c ? void 0 : c.homePageGlobalPopUp) ? void 0 : n.length) && (h.value.adCustomTravel = c.homePageGlobalPopUp.map((e, o) => {
            var n;
            return {
              ...e,
              url: e.fileUrl,
              type: null == (n = a.AdFileTypeMeta[e.fileType]) ? void 0 : n.name,
              path: e.path,
              trackingData: {
                banner_id: e.id,
                banner_name: (null == e ? void 0 : e.name) || "在地活动页末尾轮播-" + (o + 1)
              }
            }
          }))
        }
        d(e => {
          c.value = e.scrollTop
        });
        const j = e.ref();

        function w(e) {
          e && (f.value = e)
        }

        function C(e) {
          m.value = e
        }

        function y(e) {
          v.value = e
        }

        function k(o) {
          var a;
          g.value = o, g.value && (null == (a = e.index) || a.stopPullDownRefresh())
        }
        return e.onMounted(() => {
          _()
        }), e.onPullDownRefresh(() => {
          var e;
          null == (e = b.value) || e.reachData(), _()
        }), (o, a) => ({
          a: e.p({
            fixed: !0,
            "show-home-action": !1,
            "show-back-action": !1,
            theme: "white",
            background: m.value ? "#fff" : "transparent"
          }),
          b: e.o(e => ("top-banner", void(j.value = "top-banner"))),
          c: e.o(w),
          d: e.p({
            list: h.value.banner,
            "is-force-pause-video": m.value
          }),
          e: T.value,
          f: f.value ? `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${encodeURI(f.value)})` : "none",
          g: e.t(v.value),
          h: e.sr(b, "3cd7f3c9-2", {
            k: "goodsGroupRef"
          }),
          i: e.o(k),
          j: e.o(C),
          k: e.o(y),
          l: e.p({
            "ad-custom-travel-list": h.value.adCustomTravel
          })
        })
      }
    });
  p.__runtimeHooks = 1;
  const v = e._export_sfc(p, [
    ["__scopeId", "data-v-3cd7f3c9"]
  ]);
  wx.createPage(v)
}();
