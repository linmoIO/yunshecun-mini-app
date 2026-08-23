! function() {
  "use strict";
  const e = require("../utils/api.js"),
    t = require("../utils/wxuser.js"),
    a = require("../utils/utils.js"),
    r = require("../utils/qdTracker.js"),
    s = require("../common/vendor.js");
  var i = {};
  const g = {
      data: () => ({
        navList: [
          { logoA: "/images/reservationTabbarIcon.png", logoB: "/images/reservationTabbarIcon.png", isLarge: "F", desc: "预订", url: "/pages/travel/index" },
          { logoA: "/images/indexTabBarIcon.png", logoB: "/images/indexTabBarIcon.png", isLarge: "F", desc: "在地体验", url: "/pages/trip/index" },
          { logoA: "/images/Vector.png", logoB: "/images/Vector.png", isLarge: "F", desc: "全部产品", url: "/pages/travel/destinations" },
          { logoA: "/images/table_bar_icon2.png", logoB: "/images/table_bar_icon2_selected.png", isLarge: "F", desc: "风物", url: "/pages/scenery/scenery" },
          { logoA: "/images/profileTabbarIcon.png", logoB: "/images/profileTabbarIcon.png", isLarge: "F", desc: "我的", url: "/pages/member/memberCenter" }
        ],
        curPage: !1
      }),
      props: {
        icon: {
          type: String
        }
      },
      methods: {
        tabbarUrl(e) {
          r.qdTracker.track("bottom_nevigation_click", {
            content_name: e.desc
          }), e.curPage || (e.query ? t.setStorage("query", e.query) : t.removeStorage("query"), a.goPage(e.url))
        },
        getNav() {
          e.api.getShopButtonConfig({
            hotelGroupCode: i.hotelGroupCode,
            appid: i.appid,
            businessType: "2"
          }).then(e => {
            1 == e.result && e.retVal.length > 0 && (this.navList = JSON.parse(e.retVal[0].info), this.setDefaultPage())
          })
        },
        setDefaultPage() {
          var e = getCurrentPages(),
            _lastPage = e[e.length - 1],
            a = (_lastPage && _lastPage.$page && _lastPage.$page.fullPath) ? _lastPage.$page.fullPath : ((_lastPage && _lastPage.route) ? '/' + _lastPage.route : '');
          a.indexOf("?") > 0 && (a = a.split("?")[0]), this.navList.forEach(e => {
            -1 != e.url.indexOf("https") && (e.isH5 = !0), e.query = e.url.split("?")[1], e.path = e.url.split("?")[0], e.curPage = !1, (a == e.url || "/pages/guide/guide" === e.url && "/pages/trip/index" === a) && (e.curPage = !0, this.curPage = !0)
          }), t.setStorage("navList", this.navList)
        }
      },
      mounted() {
        this.navList = [
          { logoA: "/images/reservationTabbarIcon.png", logoB: "/images/reservationTabbarIcon.png", isLarge: "F", desc: "预订", url: "/pages/travel/index" },
          { logoA: "/images/indexTabBarIcon.png", logoB: "/images/indexTabBarIcon.png", isLarge: "F", desc: "在地体验", url: "/pages/trip/index" },
          { logoA: "/images/Vector.png", logoB: "/images/Vector.png", isLarge: "F", desc: "全部产品", url: "/pages/travel/destinations" },
          { logoA: "/images/table_bar_icon2.png", logoB: "/images/table_bar_icon2_selected.png", isLarge: "F", desc: "风物", url: "/pages/scenery/scenery" },
          { logoA: "/images/profileTabbarIcon.png", logoB: "/images/profileTabbarIcon.png", isLarge: "F", desc: "我的", url: "/pages/member/memberCenter" }
        ], this.setDefaultPage()
      },
      created() {
        i = t.getStorage("config")
      }
    },
    u = s._export_sfc(g, [
      ["render", function(e, t, a, r, i, g) {
        return s.e({
          a: i.navList.length > 0
        }, i.navList.length > 0 ? {
          b: s.f(i.navList, (e, t, a) => s.e({
            a: !e.curPage
          }, e.curPage ? {} : {
            b: e.logoA,
            c: "T" == e.isLarge ? 1 : ""
          }, {
            d: e.curPage
          }, e.curPage ? {
            e: e.logoB,
            f: "T" == e.isLarge ? 1 : ""
          } : {}, {
            g: s.t(e.desc),
            h: "T" == e.isLarge ? 1 : "",
            i: e.curPage ? 1 : "",
            j: s.o(t => g.tabbarUrl(e), t),
            k: t
          })),
          c: s.f(i.navList, (e, t, a) => ({
            a: "T" == e.isLarge,
            b: t
          }))
        } : {})
      }],
      ["__scopeId", "data-v-73de3d25"]
    ]);
  wx.createComponent(u)
}();
