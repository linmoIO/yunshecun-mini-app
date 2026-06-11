! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../hooks/useNavigatorRect.js");
  require("../../utils/umengAdaptor.js"), require("../../utils/config.js"), require("../../utils/request.js"), require("../../utils/log.js"), require("../../utils/qdTracker.js"), require("../../base/product.js"), require("../../services/request/request.js");
  const a = require("../../utils/helper.js");
  Math || r();
  const r = () => "../calendar.js",
    n = e.defineComponent({
      __name: "SearchBar",
      props: {
        value: null,
        placeholder: null,
        isInNavigator: {
          type: Boolean
        },
        showCalendar: {
          type: Boolean
        },
        showDate: {
          type: Boolean
        },
        startDate: null,
        endDate: null,
        mini: {
          type: Boolean
        },
        customStyle: null
      },
      emits: ["input", "confirm", "change-date"],
      setup(r, {
        emit: n
      }) {
        const u = r,
          l = n,
          s = t.useNavigatorRect(),
          o = e.ref(),
          i = e.ref({}),
          d = e.ref({}),
          c = e.computed(() => {
            var e, t, a, r;
            if (!(null == (e = i.value) ? void 0 : e.start) || !(null == (t = i.value) ? void 0 : t.end)) return {
              start: "",
              end: ""
            };
            let n = "MM-DD";
            return (null == (a = i.value) ? void 0 : a.start.get("year")) !== (null == (r = i.value) ? void 0 : r.end.get("year")) && (n = "YYYY-MM-DD"), {
              start: i.value.start.format(n) || "",
              end: i.value.end.format(n) || ""
            }
          });

        function v(t) {
          var a, r;
          i.value = {
            start: e.dayjs(t.checkInDay),
            end: e.dayjs(t.checkOutDay)
          };
          const n = null == (a = i.value.start) ? void 0 : a.format("YYYY-MM-DD"),
            u = null == (r = i.value.end) ? void 0 : r.format("YYYY-MM-DD");
          d.value = {
            start: n,
            end: u
          }, l("change-date", [n, u])
        }

        function m() {
          var e, t;
          null == (t = (e = o.value).showDialog) || t.call(e)
        }

        function f(e) {
          const t = e.detail.value;
          return l("input", t), t
        }

        function h() {
          l("input", "")
        }
        const D = e.ref(!1);
        return e.watch(() => [u.startDate, u.endDate], ([t, a]) => {
          if (D.value) return;
          let r, n;
          if (t && (D.value = !0), t) r = e.dayjs(t), n = a ? e.dayjs(a) : r.add(1, "day");
          else {
            const t = e.dayjs();
            r = t, n = t.add(1, "day")
          }
          i.value = {
            start: r,
            end: n
          }, d.value = {
            start: r.format("YYYY-MM-DD"),
            end: n.format("YYYY-MM-DD")
          }, l("change-date", [r.format("YYYY-MM-DD"), n.format("YYYY-MM-DD")])
        }, {
          immediate: !0
        }), e.watch(() => u.showCalendar, e => {
          e && setTimeout(() => {
            d.value.start && d.value.end && o.value.init({
              checkInDay: d.value.start,
              checkOutDay: d.value.end
            })
          }, 500)
        }, {
          immediate: !0
        }), (t, n) => {
          var u;
          return e.e({
            a: r.showDate
          }, r.showDate ? {
            b: e.t(c.value.start),
            c: e.t(c.value.end),
            d: e.o(m)
          } : {}, {
            e: e.sr(o, "53445f12-0", {
              k: "calendarRef"
            }),
            f: e.o(v),
            g: !r.mini
          }, r.mini ? {} : {
            h: (null == (u = r.value) ? void 0 : u.trim()) ? "black" : ""
          }, {
            i: r.value,
            j: r.placeholder,
            k: e.o(f),
            l: e.o(e => l("confirm")),
            m: e.o(h),
            n: e.n({
              "show-closeable": !!r.value,
              "search-input--mini": r.mini
            }),
            o: r.isInNavigator && e.unref(s).height ? e.unref(a.addCssUnit)(e.unref(s).height) : "",
            p: e.s(r.customStyle)
          })
        }
      }
    }),
    u = e._export_sfc(n, [
      ["__scopeId", "data-v-53445f12"]
    ]);
  wx.createComponent(u)
}();