! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/filter.js"),
    a = {
      name: "DailyPrice",
      data: () => ({
        title: "请选择出发日期",
        timeArr: [],
        dayList: [],
        currentIndex: 0
      }),
      created() {},
      mounted() {},
      onUnload() {},
      methods: {
        valFormat2: e => t.valFormat(e),
        chooseDay(e) {
          if (e.canTap && e.number && (e.price || 0 === e.price)) {
            this.timeArr.forEach(t => {
              t.days.forEach(t => {
                e.embarkDate === t.embarkDate ? t.isActive = !0 : t.isActive = !1
              })
            });
            const t = e;
            console.log(t), this.$emit("change-dailyPrice", t)
          }
        },
        createDate(t) {
          this.timeArr = [], this.dayList = [], this.currentIndex = 0, t.forEach(t => {
            console.log(e.dayjs(t.embarkDate).diff(e.dayjs().endOf("month"), "month")), e.dayjs(t.embarkDate).diff(e.dayjs().endOf("month"), "month") >= 0 && this.dayList.push(t)
          });
          const a = new Object,
            r = [];
          this.dayList.forEach(t => {
            const r = e.dayjs(t.embarkDate).format("YYYY-MM");
            a[r] || (a[r] = t.price), a[r] && t.price < a[r].price && (a[r].price = t.price)
          }), Object.keys(a).forEach(e => {
            r.push({
              time: e,
              price: a[e]
            })
          });
          const i = r.slice(0, 12);
          for (let t = 0; t < i.length; t++) {
            const a = new Object,
              r = e.dayjs(i[t].time).format("YYYY年MM月"),
              o = e.dayjs(i[t].time).date(1).add(0, "months").toDate(),
              n = [],
              d = new Date(o.setDate(1)).getDay(),
              m = (s = o.getFullYear(), c = o.getMonth() + 1, new Date(s, c, 0).getDate());
            a.currentTitle = r, a.minPrice = i[t].price, a.isActive = 0 === t;
            for (let e = 0; e < d; e++) {
              const e = {
                day: "",
                canTap: !1,
                isActive: !1,
                displayDay: ""
              };
              n.push(e)
            }
            for (let t = 0; t < m; t++) {
              const a = e.dayjs(o).add(t, "days");
              let r = !0;
              const i = e.dayjs().add(366, "days");
              a.isBefore(e.dayjs()) && (r = !1), a.isAfter(i) && (r = !1);
              let s = {
                day: a.format("YYYY-MM-DD"),
                canTap: r,
                displayDay: a.format("D"),
                price: "",
                isActive: !1,
                voyageNo: ""
              };
              this.dayList.forEach(t => {
                e.dayjs(t.embarkDate).format("YYYY-MM-DD") === a.format("YYYY-MM-DD") && (s = Object.assign(s, t))
              }), n.push(s)
            }
            a.days = n, this.timeArr.push(a)
          }
          var s, c
        }
      }
    },
    r = e._export_sfc(a, [
      ["render", function(t, a, r, i, s, c) {
        return {
          a: e.f(s.timeArr, (t, a, r) => ({
            a: e.t(t.currentTitle),
            b: e.f(t.days, (t, a, r) => e.e({
              a: t.number <= 0
            }, t.number <= 0 ? {} : t.number ? {
              c: e.t(t.number)
            } : {}, {
              b: t.number,
              d: e.t(t.displayDay),
              e: t.price || 0 === t.price
            }, t.price || 0 === t.price ? {
              f: e.t(c.valFormat2(t.price))
            } : {}, {
              g: a,
              h: !t.canTap || !t.price && 0 !== t.price || t.number <= 0 ? 1 : "",
              i: t.isActive ? 1 : "",
              j: e.o(e => c.chooseDay(t), a)
            })),
            c: a,
            d: t.isActive ? 1 : ""
          }))
        }
      }]
    ]);
  wx.createComponent(r)
}();