! function() {
  "use strict";
  const e = require("../../common/vendor.js");
  require("../../hooks/useNavigatorRect.js");
  const t = require("../../utils/umengAdaptor.js"),
    a = require("../../hooks/useSearchHotel.js"),
    r = require("../../hooks/useSearchTravel.js"),
    o = require("../../utils/helper.js"),
    l = require("../../utils/utils.js"),
    u = require("../../utils/qdTracker.js");
  Math || (s + v + n + c + i)();
  const n = () => "../../components/new/Spin.js",
    i = () => "../../components/new/SafeArea.js",
    s = () => "../../components/new/Navigator.js",
    c = () => "../../components/search/AutoComplete.js",
    v = () => "../../components/search/SearchBar.js",
    d = e.defineComponent({
      __name: "index",
      setup(n) {
        const i = [{
            title: "旅行",
            value: "travel"
          }, {
            title: "酒店",
            value: "hotel"
          }],
          s = e.ref("initial"),
          c = e.ref("travel"),
          v = e.ref(""),
          d = e.ref("");
        e.watch(() => d.value, e => {
          e || (s.value = "initial")
        });
        const h = e.ref(),
          {
            formatedSearchHistoryList: f,
            refreshHistoryList: p,
            clearSearchHistoryList: k,
            hotSearchList: m,
            quickSearchResult: _,
            quickSearchLoading: y,
            debounceQuickSearch: g
          } = r.useSearchTravel();

        function w(e, a) {
          "history" === a ? t.adaptor.sendEvent("click_old_search_control", {
            key_word: e.text
          }) : "hot" === a && (t.adaptor.sendEvent("click_hot_search_control", {
            key_word: e.text
          }), u.qdTracker.track("hot_search_click", {
            current_module_name: "旅行",
            content_id: e.id,
            content_name: e.text
          })), e.link ? l.goPage(e.link) : e.text && (h.value = {
            ...e,
            type: a
          }, A(a))
        }
        const {
          startDate: x,
          endDate: q,
          onChangeDate: S,
          areaHotelList: j,
          fetchAreaHotel: T,
          fetchAreaHotelLoading: H,
          onClickHotel: b,
          quickSearchLoading: D,
          quickSearchHotel: L,
          debounceQuickSearchHotel: $,
          getCurrentHotelUrl: P
        } = a.useSearchHotel();

        function A(e) {
          var a, r, o, n, i;
          "input" === e && !d.value && v.value && (d.value = v.value);
          let f = d.value;
          if ("input" !== e && (f = (null == (a = h.value) ? void 0 : a.text) || ""), !(null == f ? void 0 : f.trim())) return !1;
          if (t.adaptor.sendEvent("click_search_control", {
              key_word: f,
              is_preset: "hot" === e ? "是" : "否"
            }), "input" === e && (h.value = {
              text: f,
              type: "input"
            }), "travel" === c.value) u.qdTracker.track("mini_user_search", {
            current_module_name: "旅行",
            keyword: null == (r = h.value) ? void 0 : r.text
          }), l.goPage(`/pages/search/result?keyword=${null==(o=h.value)?void 0:o.text}&type=${null==(n=h.value)?void 0:n.type}`);
          else if ("hotel" === c.value) {
            u.qdTracker.track("mini_user_search", {
              current_module_name: "酒店",
              keyword: f,
              checkin_date: x.value,
              checkout_date: q.value
            });
            let e = "/pages/search/result-hotel?keyword=" + f;
            (null == (i = h.value) ? void 0 : i.type) && (e += "&type=" + h.value.type), x.value && (e += "&startDate=" + x.value), q.value && (e += "&endDate=" + q.value), l.goPage(e)
          }
          setTimeout(() => {
            s.value = "initial"
          }, 300)
        }

        function C(e) {
          d.value = e, d.value && (s.value = "quickView", "hotel" === c.value ? $(d.value) : "travel" === c.value && g(d.value))
        }
        e.watch(() => c.value, e => {
          var t;
          "hotel" !== e || H.value || (null == (t = j.value) ? void 0 : t.length) || T()
        }, {
          immediate: !0
        });
        const E = e.ref(!1);
        return e.onLoad(e => {
          (null == e ? void 0 : e.type) && (c.value = e.type), (null == e ? void 0 : e.keyword) && (v.value = e.keyword), (null == e ? void 0 : e.startDate) && (null == e ? void 0 : e.endDate) && (x.value = e.startDate, q.value = e.endDate), setTimeout(() => {
            E.value = !0
          }, 300)
        }), e.onShow(() => {
          e.nextTick$1(() => {
            p()
          })
        }), (t, a) => {
          var r, u;
          return e.e({
            a: e.f(i, (t, a, r) => ({
              a: e.t(t.title),
              b: "tab-" + t.value,
              c: e.n({
                active: c.value === t.value
              }),
              d: e.o(e => {
                return a = t.value, d.value = "", void(c.value = a);
                var a
              }, "tab-" + t.value)
            })),
            b: e.p({
              "show-home-action": !1
            }),
            c: e.o(C),
            d: e.o(e => A("input")),
            e: e.o(e.unref(S)),
            f: e.p({
              value: d.value,
              placeholder: "travel" === c.value && v.value || "目的地/关键词",
              "show-calendar": !0,
              "show-date": "hotel" === c.value,
              "start-date": e.unref(x),
              "end-date": e.unref(q)
            }),
            g: null == (r = e.unref(f)) ? void 0 : r.length
          }, (null == (u = e.unref(f)) ? void 0 : u.length) ? {
            h: e.o((...t) => e.unref(k) && e.unref(k)(...t)),
            i: e.f(e.unref(f), (t, a, r) => ({
              a: e.t(t.showText),
              b: e.t(t.hasEllipsis ? "..." : ""),
              c: "history-search-" + a,
              d: e.o(e => w(t, "history"), "history-search-" + a)
            })),
            j: e.s("--hairline-rounded: " + e.unref(o.pxTransform)(8))
          } : {}, {
            k: e.f(e.unref(m), (t, a, r) => e.e({
              a: t.icon
            }, t.icon ? {
              b: e.unref(o.imageMogr2)(t.icon, "64x")
            } : {}, {
              c: e.t(t.text),
              d: "hot-" + t.id,
              e: e.o(e => w(t, "hot"), "hot-" + t.id)
            })),
            l: e.s("--hairline-rounded: " + e.unref(o.pxTransform)(8)),
            m: "travel" === c.value,
            n: e.f(e.unref(j), (t, a, r) => ({
              a: e.t(t.provinceDesc),
              b: e.f(t.hotelBaseQtoList, (t, r, o) => ({
                a: e.t(t.descript),
                b: `hotel-${a}-${r}`,
                c: e.o(a => e.unref(b)(t), `hotel-${a}-${r}`)
              })),
              c: "area-" + a
            })),
            o: e.s("--hairline-rounded: " + e.unref(o.pxTransform)(8)),
            p: "hotel" === c.value,
            q: "initial" === s.value,
            r: e.p({
              size: 32
            }),
            s: e.s(e.unref(y) || e.unref(D) ? "" : "display: none"),
            t: e.p({
              options: "travel" === c.value ? e.unref(_) : e.unref(L),
              "custom-click": e => function(e) {
                if ("Hotel" !== e.type) e.path && l.goPage(e.path);
                else {
                  const t = P(e.id);
                  l.goPage(t)
                }
              }(e)
            }),
            v: e.s(e.unref(y) || e.unref(D) ? "display: none" : ""),
            w: "quickView" === s.value,
            x: e.p({
              "custom-style": {
                height: e.unref(o.pxTransform)(24, 375)
              }
            })
          })
        }
      }
    }),
    h = e._export_sfc(d, [
      ["__scopeId", "data-v-2cc5369c"]
    ]);
  wx.createPage(h)
}();