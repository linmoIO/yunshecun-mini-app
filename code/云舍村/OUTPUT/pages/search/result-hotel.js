! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../hooks/useNavigatorRect.js"),
    s = require("../../utils/umengAdaptor.js"),
    a = require("../../hooks/useSearchHotel.js");
  require("../../utils/config.js"), require("../../utils/request.js"), require("../../utils/log.js"), require("../../utils/qdTracker.js"), require("../../base/product.js"), require("../../services/request/request.js");
  const u = require("../../utils/helper.js");
  Math || (l + o + r + i + c + n)();
  const o = () => "../../components/new/Navigator.js",
    r = () => "../../components/new/Spin.js",
    n = () => "../../components/new/SafeArea.js",
    i = () => "../../components/search/AutoComplete.js",
    l = () => "../../components/search/SearchBar.js",
    c = () => "../../components/new/ProductCardList.js",
    d = e.defineComponent({
      __name: "result-hotel",
      setup(o) {
        const r = t.useNavigatorRect(),
          n = e.ref("resultView"),
          i = e.ref("");
        e.watch(() => i.value, t => {
          t || e.index.navigateBack()
        });
        const {
          startDate: l,
          endDate: c,
          onChangeDate: d,
          loading: v,
          quickSearchLoading: h,
          quickSearchHotel: p,
          debounceQuickSearchHotel: f,
          searchResult: m,
          search: w
        } = a.useSearchHotel({
          onSearchSuccess(e) {
            const t = (null == e ? void 0 : e.length) || 0;
            s.adaptor.sendEvent("customize_search_result", {
              search_type: "酒店",
              key_word: i.value,
              is_preset: "否",
              result_count: t
            })
          }
        }), q = e.debounce(() => {
          w(i.value)
        }, 300, {
          leading: !0
        });
        e.watch(() => [l.value, c.value], () => {
          i.value && q()
        });
        const g = e.ref(!1),
          j = e.computed(() => !g.value || v.value || h.value);

        function k(e) {
          i.value = e, i.value && (n.value = "quickView", f(i.value))
        }

        function _() {
          i.value && (setTimeout(() => {
            n.value = "resultView"
          }, 300), q())
        }
        return e.onLoad(e => {
          (null == e ? void 0 : e.startDate) && (null == e ? void 0 : e.endDate) && (l.value = e.startDate, c.value = e.endDate), (null == e ? void 0 : e.keyword) && (i.value = e.keyword, setTimeout(() => {
            g.value = !0, _()
          }, 500))
        }), (t, s) => ({
          a: e.o(e.unref(d)),
          b: e.o(k),
          c: e.o(_),
          d: e.p({
            value: i.value,
            "is-in-navigator": !0,
            placeholder: "目的地/关键词",
            "show-calendar": !0,
            "show-date": !0,
            mini: !0,
            "start-date": e.unref(l),
            "end-date": e.unref(c)
          }),
          e: e.unref(u.addCssUnit)(e.unref(r).height),
          f: e.p({
            "show-home-action": !1,
            "custom-style": {
              position: "sticky",
              top: 0,
              zIndex: 20,
              backgroundColor: "white"
            }
          }),
          g: e.p({
            size: 32
          }),
          h: e.s(j.value ? "" : "display: none"),
          i: e.p({
            options: e.unref(p),
            "custom-style": "quickView" === n.value ? "" : "display: none"
          }),
          j: e.p({
            list: e.unref(m)
          }),
          k: "resultView" === n.value,
          l: e.s(j.value ? "display: none" : ""),
          m: e.p({
            "custom-style": {
              height: e.unref(u.pxTransform)(24, 375)
            }
          }),
          n: "resultView" === n.value ? "#f8f8f8" : ""
        })
      }
    }),
    v = e._export_sfc(d, [
      ["__scopeId", "data-v-7803decc"]
    ]);
  wx.createPage(v)
}();