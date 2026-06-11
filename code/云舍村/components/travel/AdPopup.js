! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../assets/index.js"),
    a = require("../../utils/utils.js"),
    n = require("../../utils/helper.js"),
    u = require("../../hooks/useNavigatorRect.js"),
    o = require("../../utils/umengAdaptor.js"),
    t = require("../../utils/wxuser.js");
  require("../../utils/request.js"), require("../../base/product.js");
  const s = require("../../utils/qdTracker.js");
  require("../../services/request/request.js");
  const i = e.defineComponent({
      __name: "AdPopup",
      props: {
        items: null
      },
      emits: ["close"],
      setup(i, {
        emit: l
      }) {
        const c = {
            1: 1,
            2: 7,
            3: 30
          },
          d = i,
          p = l,
          v = u.useNavigatorRect(),
          m = e.ref(t.getStorage("home_popup_exposure_record") || {}),
          f = e.computed(() => {
            const r = [],
              a = e.dayjs();
            return Object.keys(m.value).forEach(r => {
              e.dayjs(m.value[r].endDate).isBefore(a, "day") && Reflect.deleteProperty(m.value, r)
            }), d.items.forEach(n => {
              var u;
              const o = n.popUpNumber && c[null == n ? void 0 : n.popUpNumber] || 1;
              (null == (u = m.value[n.id]) ? void 0 : u.clickDate) && a.isBefore(e.dayjs(m.value[n.id].clickDate).add(o, "day"), "day") || r.push(n)
            }), r
          }),
          _ = e.ref(!0),
          b = e.ref(0);

        function j(e) {
          b.value = e.detail.current
        }

        function g() {
          var e;
          _.value = !1, s.qdTracker.track("mini_homepage_banner_click", {
            banner_num: b.value + 1,
            banner_type: "棣栭〉鍏ㄥ眬寮圭獥",
            banner_name: (null == (e = f.value[b.value]) ? void 0 : e.name) || "鍏ㄥ睆骞垮憡-" + (b.value + 1),
            action: "close"
          }), q(f.value[b.value]), p("close")
        }
        const k = e.ref();

        function q(r) {
          k.value || (k.value = {
            ...m.value
          });
          const a = e.dayjs(),
            n = r.popUpNumber && c[null == r ? void 0 : r.popUpNumber] || 1;
          k.value[r.id] = {
            clickDate: a.toDate(),
            endDate: a.add(n, "day").toDate()
          }, t.setStorage("home_popup_exposure_record", k.value)
        }
        return e.onMounted(() => {
          _.value = !0
        }), (u, t) => e.e({
          a: f.value.length
        }, f.value.length ? {
          b: e.unref(n.pxTransform)(156),
          c: e.f(f.value, (r, u, t) => ({
            a: e.unref(n.imageMogr2)(r.fileUrl, "610x"),
            b: e.o(e => function(e, r) {
              o.adaptor.sendEvent("click_book_page_subject_control", {
                banner_name: "鍏ㄥ睆骞垮憡-" + (r + 1)
              }), s.qdTracker.track("mini_homepage_banner_click", {
                banner_num: r + 1,
                banner_type: "棣栭〉鍏ㄥ眬寮圭獥",
                banner_name: (null == e ? void 0 : e.name) || "鍏ㄥ睆骞垮憡-" + (r + 1),
                action: "click"
              }), q(e), e.path && a.goPage(e.path)
            }(r, u), "banner-" + r.id),
            c: "banner-" + r.id
          })),
          d: e.unref(n.pxTransform)(50),
          e: e.unref(n.pxTransform)(50),
          f: b.value,
          g: e.o(j),
          h: e.unref(r.assets).icCloseLineRoundBlack,
          i: e.o(g),
          j: e.unref(n.pxTransform)(24),
          k: e.n({
            show: _.value
          }),
          l: e.unref(n.addCssUnit)(e.unref(v).outerHeight),
          m: e.o(() => {})
        } : {})
      }
    }),
    l = e._export_sfc(i, [
      ["__scopeId", "data-v-ddb07ca7"]
    ]);
  wx.createComponent(l)
}();

