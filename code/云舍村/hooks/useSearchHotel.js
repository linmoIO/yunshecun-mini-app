! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../base/channel.js"),
    a = require("../utils/wxuser.js"),
    r = require("../utils/utils.js"),
    o = require("../utils/api.js"),
    l = require("../base/product.js"),
    u = require("./useRequest.js"),
    n = require("../utils/qdTracker.js");
  exports.useSearchHotel = function(i) {
    const {
      onSearchSuccess: c
    } = i || {}, s = a.getStorage("config"), d = e.ref(a.getStorage("user"));
    e.onShow(() => {
      d.value = a.getStorage("user")
    });
    const v = e.ref(),
      f = e.ref(),
      h = e.ref([]),
      {
        loading: p,
        run: C
      } = u.useRequest(() => o.api.interfaceTransfer({
        config: {
          interfaceType: "GET",
          interfaceModule: "GC_INFOMATION_CENTER",
          interfaceMethod: "api/hotelGroup/getGcHotelListByStatus",
          interfaceFrom: "GC",
          hotelGroupCode: s.hotelGroupCode
        },
        query: {
          hotelGroupCode: s.hotelGroupCode,
          sta: "I",
          resrvSync: "T"
        }
      }), {
        manual: !0,
        onSuccess(e) {
          var t;
          const {
            result: a,
            retVal: r
          } = e || {};
          1 === a && (null == (t = null == r ? void 0 : r.retVal) ? void 0 : t.length) && (h.value = r.retVal)
        }
      }),
      g = e => {
        let a = `/pagesC/order/hotel?hotelCode=${e}&otaChannel=${t.defaultOtaChannel}`;
        return v.value && (a += "&fromDate=" + v.value), f.value && (a += "&toDate=" + f.value), a
      },
      G = e.ref([]),
      m = e.ref(!1),
      y = e.ref(""),
      T = e.debounce(async e => {
        var t;
        if (e = null == e ? void 0 : e.trim()) {
          if (e !== y.value || !p.value) {
            m.value = !0, y.value = e;
            try {
              const a = await o.api.interfaceTransfer({
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_INFOMATION_CENTER",
                    interfaceMethod: "api/hotelGroup/getGcHotelListByName",
                    interfaceFrom: "GC",
                    hotelGroupCode: s.hotelGroupCode
                  },
                  query: {
                    hotelGroupCode: s.hotelGroupCode,
                    hotelName: e,
                    sta: "I",
                    resrvSync: "T"
                  }
                }),
                {
                  result: r,
                  retVal: l
                } = a || {};
              1 === r && (null == (t = null == l ? void 0 : l.retVal) ? void 0 : t.length) && (G.value = l.retVal.map(e => ({
                type: "Hotel",
                id: e.code,
                title: e.descript,
                path: g(e.code),
                iconfont: "icon-a-12_jiudian_hei"
              }))), m.value = !1
            } catch {
              G.value = []
            } finally {
              m.value = !1
            }
          }
        } else G.value = []
      }, 300),
      q = e.ref(!1),
      S = e.ref([]),
      H = e.ref();
    return {
      startDate: v,
      endDate: f,
      onChangeDate: function(e) {
        v.value = e[0], f.value = e[1]
      },
      fetchAreaHotelLoading: p,
      areaHotelList: h,
      fetchAreaHotel: C,
      onClickHotel: function(e) {
        n.qdTracker.track("hotel_search_click", {
          hotel_name: e.descript,
          checkin_date: v.value,
          checkout_date: f.value
        });
        const t = e.code,
          a = g(t);
        r.goPage(a)
      },
      quickSearchLoading: m,
      quickSearchHotel: G,
      debounceQuickSearchHotel: T,
      loading: q,
      searchResult: S,
      search: async e => {
        var a, r;
        if ((e = null == e ? void 0 : e.trim()) && (e !== H.value || !p.value)) {
          q.value = !0, H.value = e;
          try {
            const u = {
              fromDate: v.value,
              toDate: f.value,
              otaChannel: t.defaultOtaChannel,
              hotelGroupCodes: s.hotelGroupCode,
              hasPriceMin: "T",
              keyWord: e,
              pageSize: 99,
              firstResult: 0,
              appid: s.appid,
              componentAppid: s.componentAppid
            };
            (null == (a = d.value) ? void 0 : a.cardLevel) && (u.cardLevel = d.value.cardLevel), (null == (r = d.value) ? void 0 : r.cardType) && (u.cardType = d.value.cardType);
            const n = await o.api.findHotel(u),
              {
                result: i,
                retVal: h
              } = n || {};
            if (1 === i) {
              const e = l.formatFeedProductList({
                list: ((null == h ? void 0 : h.resultInfos) || []).map(e => ({
                  ...e,
                  type: "Hotel"
                })),
                fromDate: v.value,
                toDate: f.value
              });
              S.value = e, null == c || c(e)
            }
            q.value = !1
          } catch {
            S.value = []
          } finally {
            q.value = !1
          }
        }
      },
      getCurrentHotelUrl: g
    }
  }
}();
