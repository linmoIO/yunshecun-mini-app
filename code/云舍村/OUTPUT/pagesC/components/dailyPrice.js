! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = {
      props: {},
      name: "dailyPrice",
      data: () => ({
        title: "请选择出发日期",
        timeArr: [],
        dayList: [],
        currentIndex: 0,
        currentDays: []
      }),
      created() {},
      mounted() {
        this.createDate()
      },
      onUnload() {},
      methods: {
        changeCurrent(e, t) {
          this.currentIndex = t, this.currentDays = this.timeArr[this.currentIndex].days, this.timeArr.forEach(e => {
            e.isActive = !1
          }), e.isActive = !0
        },
        chooseDay(e) {
          if (e.canTap && e.number && (e.price || 0 === e.price)) {
            this.currentDays.forEach(t => {
              e.embarkDate == t.embarkDate ? t.isActive = !0 : t.isActive = !1
            });
            let t = e;
            console.log(t), this.$emit("change-dailyPrice", t)
          }
        },
        createDate(t = []) {
          this.timeArr = [], this.dayList = [], this.currentIndex = 0, this.currentDays = [], t.forEach(t => {
            console.log(e.dayjs(t.embarkDate).diff(e.dayjs().endOf("month"), "month")), e.dayjs(t.embarkDate).diff(e.dayjs().endOf("month"), "month") >= 0 && this.dayList.push(t)
          });
          let r = new Object,
            a = [];
          this.dayList.forEach(t => {
            let a = e.dayjs(t.embarkDate).format("YYYY-MM");
            r[a] || (r[a] = t.price), r[a] && t.price < r[a].price && (r[a].price = t.price)
          }), Object.keys(r).map(e => {
            a.push({
              time: e,
              price: r[e]
            })
          });
          let i = a.slice(0, 3);
          for (var s = 0; s < i.length; s++) {
            var c = new Object,
              n = e.dayjs(i[s].time).format("M月"),
              o = e.dayjs(i[s].time).date(1).add(0, "months").toDate(),
              d = [],
              m = new Date(o.setDate(1)).getDay(),
              h = (b = o.getFullYear(), v = o.getMonth() + 1, new Date(b, v, 0).getDate());
            c.currentTitle = n, c.minPrice = i[s].price, c.isActive = 0 == s;
            for (var y = 0; y < m; y++) {
              var p = {
                day: "",
                canTap: !1,
                isActive: !1,
                displayDay: ""
              };
              d.push(p)
            }
            for (var u = 0; u < h; u++) {
              var D = e.dayjs(o).add(u, "days"),
                f = !0,
                l = e.dayjs().add(366, "days");
              D.isBefore(e.dayjs()) && (f = !1), D.isAfter(l) && (f = !1), p = {
                day: D.format("YYYY-MM-DD"),
                canTap: f,
                displayDay: D.format("D"),
                price: "",
                isActive: !1,
                voyageNo: ""
              }, this.dayList.forEach(t => {
                e.dayjs(t.embarkDate).format("YYYY-MM-DD") == D.format("YYYY-MM-DD") && (p = Object.assign(p, t))
              }), d.push(p)
            }
            c.days = d, this.timeArr.push(c), console.log(this.timeArr), this.currentDays = this.timeArr[0].days
          }
          var b, v
        }
      }
    },
    r = e._export_sfc(t, [
      ["render", function(t, r, a, i, s, c) {
        return {
          a: e.f(s.timeArr, (t, r, a) => ({
            a: e.t(t.currentTitle),
            b: r,
            c: t.isActive ? 1 : "",
            d: e.o(e => c.changeCurrent(t, r), r)
          })),
          b: e.f(s.currentDays, (r, a, i) => e.e({
            a: r.number <= 0
          }, r.number <= 0 ? {} : r.number ? {
            c: e.t(r.number)
          } : {}, {
            b: r.number,
            d: e.t(r.displayDay),
            e: r.price || 0 === r.price
          }, r.price || 0 === r.price ? {
            f: e.t(t.valFormat(r.price))
          } : {}, {
            g: e.o(e => c.chooseDay(r), a),
            h: !r.canTap || !r.price && 0 !== r.price || r.number <= 0 ? 1 : "",
            i: r.isActive ? 1 : "",
            j: a
          }))
        }
      }]
    ]);
  wx.createComponent(r)
}();