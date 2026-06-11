! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("./useRequest.js"),
    r = require("../utils/wxuser.js"),
    a = require("../base/channel.js"),
    o = require("../base/product.js"),
    s = require("../services/home.js");
  exports.useSearchTravel = function(l) {
    const {
      onSearchSuccess: i
    } = l || {}, u = r.getStorage("config"), c = r.getStorage("user"), n = e.ref(r.getStorage("search_history") || []);

    function d(e) {
      const t = n.value.findIndex(t => e.id && t.id === e.id || t.text === e.text);
      t > -1 && n.value.splice(t, 1), n.value.unshift(e), r.setStorage("search_history", n.value)
    }
    const h = e.computed(() => {
        var e;
        return ((null == (e = n.value) ? void 0 : e.splice(0, 30)) || []).map(e => {
          var t;
          const r = (null == (t = e.text) ? void 0 : t.length) > 15;
          return {
            ...e,
            showText: e.text.substring(0, 15),
            hasEllipsis: r
          }
        })
      }),
      v = e.ref([]),
      {
        run: m
      } = t.useRequest(s.getSearchHotWordList, {
        manual: !0,
        onSuccess: e => {
          var t;
          (null == (t = null == e ? void 0 : e.retVal) ? void 0 : t.length) && (v.value = e.retVal.map(e => ({
            id: e.dictionaryCode,
            text: e.dictionaryDesc,
            link: e.jumpUrl,
            icon: e.picUrl,
            searchDisplay: e.searchDisplay
          })))
        }
      });
    e.onMounted(() => {
      var e;
      (null == (e = v.value) ? void 0 : e.length) || m()
    });
    const f = e.ref({}),
      {
        loading: T,
        run: g
      } = t.useRequest(s.search, {
        manual: !0,
        onSuccess(e) {
          if (null == e ? void 0 : e.retVal) {
            const {
              journeyList: t,
              destPackageList: r,
              goodsList: a,
              hotelList: s,
              activitiesList: l
            } = (null == e ? void 0 : e.retVal) || {}, u = o.formatTravelThemeProducts(t), c = o.formatTravelThemeProducts(r), n = o.formatTravelThemeProducts(a), d = o.formatTravelThemeProducts(s), h = o.formatTravelThemeProducts(l), v = {
              All: [...u, ...c, ...n, ...d, ...h],
              Travel: u,
              DestPackage: c,
              ExchangeCoupon: n,
              Hotel: d,
              DayActivity: h
            };
            f.value = v, null == i || i(v)
          }
        }
      }),
      p = e.ref(!1),
      y = e.ref([]),
      L = e.debounce(e => {
        (e = null == e ? void 0 : e.trim()) ? function(e) {
          const t = {
            keyword: e,
            firstNum: 1,
            pageSize: 10,
            hotelGroupCode: u.hotelGroupCode,
            otaChannel: a.defaultOtaChannel
          };
          return (null == c ? void 0 : c.cardLevel) && (t.cardLevel = c.cardLevel), (null == c ? void 0 : c.cardType) && (t.cardType = c.cardType), p.value = !0, new Promise((e, r) => {
            s.quickSearch(t).then(t => {
              if (null == t ? void 0 : t.retVal) {
                const {
                  journeyList: r,
                  destPackageList: a,
                  goodsList: s,
                  hotelList: l,
                  activitiesList: i
                } = (null == t ? void 0 : t.retVal) || {}, u = [...o.formatTravelThemeProducts(r), ...o.formatTravelThemeProducts(a), ...o.formatTravelThemeProducts(s), ...o.formatTravelThemeProducts(l), ...o.formatTravelThemeProducts(i)];
                console.log("[index] <useSearchTravel> result::", u), e(u.splice(0, 10))
              } else r(t)
            }).catch(r).finally(() => {
              setTimeout(() => {
                p.value = !1
              }, 300)
            })
          })
        }(e).then(e => {
          y.value = e
        }).catch(() => {
          y.value = []
        }): y.value = []
      }, 300);
    return {
      searchHistoryList: n,
      formatedSearchHistoryList: h,
      refreshHistoryList: function() {
        n.value = r.getStorage("search_history") || []
      },
      clearSearchHistoryList: function() {
        n.value = [], r.setStorage("search_history", [])
      },
      hotSearchList: v,
      search: function(e) {
        var t;
        const r = null == (t = e.text) ? void 0 : t.trim();
        if (!r) return;
        const o = {
          keyword: r,
          firstNum: 1,
          pageSize: 999,
          hotelGroupCode: u.hotelGroupCode,
          otaChannel: a.defaultOtaChannel
        };
        (null == c ? void 0 : c.cardLevel) && (o.cardLevel = c.cardLevel), (null == c ? void 0 : c.cardType) && (o.cardType = c.cardType), d(e), g(o)
      },
      loading: T,
      searchResult: f,
      quickSearchLoading: p,
      addSearchHistory: d,
      quickSearchResult: y,
      debounceQuickSearch: L
    }
  }
}();