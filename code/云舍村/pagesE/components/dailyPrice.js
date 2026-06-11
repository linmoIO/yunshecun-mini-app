! function() {
  "use strict";
  const e = require("../../utils/wxuser.js");
  require("../../utils/request.js");
  const t = require("../../common/vendor.js");
  require("../../utils/config.js"), require("../../utils/log.js"), require("../../utils/qdTracker.js"), require("../../utils/umengAdaptor.js");
  const a = require("../../utils/filter.js"),
    i = {
      name: "dailyPrice",
      data: () => ({
        title: "请选择出发日期",
        timeArr: [],
        dayList: [],
        currentIndex: 0,
        currentDays: [],
        timeRangeList: [],
        selectDay: {},
        isCollapsed: !0,
        contentHeight: "",
        wrapperHeight: "150px"
      }),
      created() {
        e.getStorage("config")
      },
      mounted() {
        this.createDate(), this.toggleCollapse()
      },
      onUnload() {},
      methods: {
        toggleCollapse() {
          this.isCollapsed = !this.isCollapsed, this.wrapperHeight = this.isCollapsed ? "150px" : "400px"
        },
        changeCurrent(e, t) {
          this.currentIndex = t, this.currentDays = this.timeArr[this.currentIndex].days, this.timeArr.forEach(e => {
            e.isActive = !1
          }), e.isActive = !0
        },
        chooseTime(e) {
          if (e.canSelect) {
            this.timeRangeList.forEach(t => {
              e.startDate == t.startDate ? t.isActive = !0 : t.isActive = !1
            });
            let t = {
              time: e.startDate + "-" + e.endDate,
              ...e
            };
            this.selectDay = Object.assign(this.selectDay, t, {
              nextTime: t
            }), this.$emit("change-dailyPrice", this.selectDay)
          }
        },
        chooseDay(e) {
          if (e.canTap && e.number > 0) {
            this.currentDays.forEach(t => {
              e.embarkDate == t.embarkDate ? t.isActive = !0 : t.isActive = !1
            });
            let a = e;
            this.selectDay = a;
            let i = t.dayjs().add(0 == e.earlyDay ? -24 : e.earlyDay, "hour");
            a.calendarWithPriceDto.map(a => {
              a.capacityType = e.capacityType;
              let s = a.bizDate + " " + a.startDate + ":00";
              !t.dayjs(s).isAfter(t.dayjs(i)) && "ONE_HOUR" == e.resrvRule && t.dayjs(t.dayjs().format("YYYY-MM-DD")).isSame(t.dayjs(a.bizDate).format("YYYY-MM-DD")) ? a.canSelect = !1 : a.canSelect = !0
            }), this.timeRangeList = a.calendarWithPriceDto, this.$emit("change-dailyPrice", a)
          }
        },
        createDate(e = []) {
          this.timeArr = [], this.dayList = [], this.currentIndex = 0, this.currentDays = [];
          let i = this.dayList.length > 0 ? this.dayList[0].resrvRule : "",
            s = this.dayList.length > 0 ? this.dayList[0].earlyDay : 1;
          e.forEach(e => {
            console.log(t.dayjs(e.embarkDate).diff(t.dayjs().endOf("month"), "month")), t.dayjs(e.embarkDate).diff(t.dayjs().endOf("month"), "month") >= 0 && this.dayList.push(e)
          });
          let r = new Object,
            c = [];
          this.dayList.forEach(e => {
            let a = t.dayjs(e.embarkDate).format("YYYY-MM");
            r[a] || (r[a] = e.price), r[a] && e.price < r[a].price && (r[a].price = e.price)
          }), Object.keys(r).map(e => {
            c.push({
              time: e,
              price: r[e]
            })
          });
          let n = c.slice(0, 3);
          for (var o = 0; o < n.length; o++) {
            var d = new Object,
              l = t.dayjs(n[o].time).format("YYYY年M月"),
              y = t.dayjs(n[o].time).date(1).add(0, "months").toDate(),
              p = [],
              h = new Date(y.setDate(1)).getDay(),
              m = (T = y.getFullYear(), b = y.getMonth() + 1, new Date(T, b, 0).getDate());
            d.currentTitle = l, d.minPrice = n[o].price, d.isActive = !0;
            for (var D = 0; D < h; D++) {
              var u = {
                day: "",
                canTap: !1,
                isActive: !1,
                displayDay: ""
              };
              p.push(u)
            }
            for (var g = 0; g < m; g++) {
              var f = t.dayjs(y).add(g, "days"),
                Y = !0,
                j = t.dayjs().add(366, "days");
              t.dayjs();
              let e = t.dayjs().add("ONE_DAY" == i ? s - 1 : -1, "day").format("YYYY-MM-DD");
              Y = !!t.dayjs(f).isAfter(t.dayjs(e)), f.isAfter(j) && (Y = !1), u = {
                day: f.format("YYYY-MM-DD"),
                canTap: Y,
                displayDay: f.format("D"),
                price: "",
                isActive: !1,
                voyageNo: "",
                isShow: !0
              }, this.dayList.forEach(e => {
                t.dayjs(e.embarkDate).format("YYYY-MM-DD") == f.format("YYYY-MM-DD") && ((u = Object.assign(u, e)).price = a.valFormat(e.price), u.number = e.sumCapacity, u.priceType = e.priceType, u.capacityType = e.capacityType)
              }), u.dateList && -1 == u.dateList.calendarWithPriceDto.findIndex(e => e.canSelect) && (u.canTap = !1), p.push(u)
            }
            d.days = p, this.timeArr.push(d), this.timeArr.map(e => {
              this.currentDays = this.currentDays.concat(e.days)
            })
          }
          var T, b
        }
      }
    };
  Array || t.resolveComponent("sapn")();
  const s = t._export_sfc(i, [
    ["render", function(e, a, i, s, r, c) {
      return t.e({
        a: t.f(r.timeArr, (e, a, i) => ({
          a: t.t(e.currentTitle),
          b: t.f(e.days, (e, a, s) => t.e({
            a: "INFINITY" != e.capacityType
          }, "INFINITY" != e.capacityType ? {
            b: t.t(e.number),
            c: e.number && e.number > 0 ? "" : 1,
            d: "0415ce0e-0-" + i + "-" + s
          } : {}, {
            e: e.number <= 0
          }, e.number <= 0 ? {
            f: "0415ce0e-1-" + i + "-" + s
          } : {
            g: "0415ce0e-2-" + i + "-" + s
          }, {
            h: t.t(e.displayDay),
            i: "FREE" == e.priceType
          }, "FREE" == e.priceType ? {} : t.e({
            j: e.price
          }, e.price ? {
            k: t.t(e.price)
          } : {}), {
            l: t.o(t => c.chooseDay(e), a),
            m: !e.canTap || e.number <= 0 || !e.number ? 1 : "",
            n: e.isActive ? 1 : "",
            o: a
          })),
          c: a
        })),
        b: r.isCollapsed ? "" : 1,
        c: r.wrapperHeight,
        d: r.isCollapsed
      }, r.isCollapsed ? {
        e: t.o((...e) => c.toggleCollapse && c.toggleCollapse(...e))
      } : {}, {
        f: !r.isCollapsed
      }, r.isCollapsed ? {} : {
        g: t.o((...e) => c.toggleCollapse && c.toggleCollapse(...e))
      }, {
        h: t.f(r.timeRangeList, (e, a, i) => t.e({
          a: t.t(e.startDate),
          b: t.t(e.endDate),
          c: "INFINITY" != e.capacityType
        }, "INFINITY" != e.capacityType ? {
          d: t.t(e.capacity)
        } : {}, {
          e: t.o(t => c.chooseTime(e), a),
          f: e.isActive ? 1 : "",
          g: e.canSelect ? "" : 1,
          h: a
        }))
      })
    }]
  ]);
  wx.createComponent(s)
}();