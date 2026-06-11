! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    u = require("../../hooks/useNavigatorRect.js"),
    s = require("../../utils/umengAdaptor.js");
  require("../../utils/config.js"), require("../../utils/request.js"), require("../../utils/log.js"), require("../../utils/qdTracker.js"), require("../../base/product.js");
  const t = require("../../hooks/useSearchTravel.js"),
    a = require("../../utils/helper.js");
  Math || (c + o + r + l + i + n)();
  const o = () => "../../components/new/Navigator.js",
    r = () => "../../components/new/Spin.js",
    n = () => "../../components/new/SafeArea.js",
    l = () => "../../components/search/AutoComplete.js",
    i = () => "../../components/search/SearchResult.js",
    c = () => "../../components/search/SearchBar.js",
    v = e.defineComponent({
      __name: "result",
      setup(o) {
        const r = u.useNavigatorRect(),
          n = e.ref("resultView"),
          l = e.ref("input"),
          i = e.ref(""),
          c = e.ref("");
        e.watch(() => i.value, u => {
          u || e.index.navigateBack()
        });
        const {
          search: v,
          loading: d,
          searchResult: p,
          quickSearchLoading: h,
          quickSearchResult: f,
          debounceQuickSearch: m
        } = t.useSearchTravel({
          onSearchSuccess: e => {
            var u;
            const t = (null == (u = null == e ? void 0 : e.All) ? void 0 : u.length) || 0;
            s.adaptor.sendEvent("customize_search_result", {
              search_type: "旅行",
              key_word: i.value,
              is_preset: c.value === i.value && "hot" === l.value ? "是" : "否",
              result_count: t
            })
          }
        }), y = e.ref(!1), k = e.computed(() => !y.value || d.value || h.value), g = e.debounce(() => {
          i.value && v({
            text: i.value
          })
        }, 300);

        function j(e) {
          i.value = e, i.value && (n.value = "quickView", m(i.value))
        }

        function w() {
          i.value = i.value.trim(), i.value && (setTimeout(() => {
            n.value = "resultView"
          }, 300), g())
        }
        return e.onLoad(e => {
          (null == e ? void 0 : e.keyword) && (i.value = e.keyword, c.value = e.keyword, w()), (null == e ? void 0 : e.type) && "undefined" !== (null == e ? void 0 : e.type) && (l.value = e.type), setTimeout(() => {
            y.value = !0
          }, 300)
        }), (u, s) => ({
          a: e.o(j),
          b: e.o(w),
          c: e.p({
            value: i.value,
            "is-in-navigator": !0,
            placeholder: "目的地/关键词"
          }),
          d: e.unref(a.addCssUnit)(e.unref(r).height),
          e: e.p({
            "show-home-action": !1,
            "custom-style": {
              position: "sticky",
              top: 0,
              zIndex: 20,
              backgroundColor: "white"
            }
          }),
          f: e.p({
            size: 32
          }),
          g: e.s(k.value ? "" : "display: none"),
          h: e.p({
            options: e.unref(f),
            "custom-style": "quickView" === n.value ? "" : "display: none"
          }),
          i: e.p({
            data: e.unref(p),
            "custom-style": "resultView" === n.value ? "" : "display: none",
            "tabbar-sticky": !0,
            "tabbar-sticky-top": "" + e.unref(a.addCssUnit)(e.unref(r).outerHeight || 0)
          }),
          j: e.s(k.value ? "display: none" : ""),
          k: e.p({
            "custom-style": {
              height: e.unref(a.pxTransform)(24, 375)
            }
          }),
          l: "resultView" === n.value ? "#f8f8f8" : ""
        })
      }
    }),
    d = e._export_sfc(v, [
      ["__scopeId", "data-v-94b5ea67"]
    ]);
  wx.createPage(d)
}();