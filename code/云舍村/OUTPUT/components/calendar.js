! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../base/jAlert/jAlert.js"),
    i = require("../utils/wxuser.js"),
    s = require("../utils/utils.js"),
    a = require("../utils/platform.js"),
    h = require("../utils/preventScroll.js"),
    r = {
      name: "calendar",
      data: () => ({
        isShowDialog: !1,
        title: "住店日期",
        maxMonth: 12,
        flag: 0,
        timeArr: [],
        isTap: !1,
        checkInDay: "",
        checkOutDay: "",
        colorTheme: i.getStorage("colorTheme"),
        fadeColor: "",
        isCheckedInTxt: "入住",
        isCheckedOutTxt: "离店",
        maxHeight: "80vh",
        isAutoColse: "T",
        stayMax: null
      }),
      mounted() {
        this.colorTheme && (this.fadeColor = s.hexToRgba(this.colorTheme, .2)), e.index.getSystemInfo({
          success: e => {
            const t = a.getMenuButtonBoundingClientRect();
            console.log(t, e.screenHeight, e.statusBarHeight), this.maxHeight = e.screenHeight - t.top - t.height - 6 - 56 - 36 + "px"
          },
          fail(e) {
            console.log(e)
          }
        })
      },
      beforeUnmount() {},
      methods: {
        getStyles(e) {
          if (e.isCheckedBetween) return {
            backgroundColor: this.fadeColor
          }
        },
        showDialog() {
          this.isShowDialog = !0, this.$emit("no-scroll", !0), h.preventScroll()
        },
        hideDialog() {
          this.isShowDialog = !1, this.$emit("no-scroll", !1), h.restoreScroll()
        },
        createDate() {
          let t = 366,
            s = i.getStorage("calendarDays");
          s && !isNaN(Number(s)) && (t = Number(s) - 1);
          let a = t - e.dayjs().endOf("month").diff(e.dayjs(), "day");
          a = Math.ceil(a / 30) + 1, this.maxMonth = a;
          for (var h = 0; h < this.maxMonth; h++) {
            var r = new Object,
              c = e.dayjs().add(h, "months").format("YYYY年M月"),
              d = e.dayjs().date(1).add(h, "months").toDate(),
              o = [],
              n = new Date(d.setDate(1)).getDay(),
              l = (C = d.getFullYear(), p = d.getMonth() + 1, new Date(C, p, 0).getDate());
            r.currentTitle = c;
            for (var y = 0; y < n; y++) {
              var u = {
                day: "",
                canTap: !1,
                isCheckedIn: !1,
                isCheckedOut: !1,
                isCheckedBetween: !1,
                displayDay: ""
              };
              o.push(u)
            }
            for (var D = 0; D < l; D++) {
              var k = e.dayjs(d).add(D, "days"),
                f = !0,
                g = k.format("YYYY-MM-DD") == e.dayjs().format("YYYY-MM-DD"),
                m = e.dayjs().add(t, "days");
              k.isBefore(e.dayjs()) && !g && (f = !1), k.isAfter(m) && (f = !1), u = {
                day: k.format("YYYY-MM-DD"),
                canTap: f,
                isCheckedIn: !1,
                isCheckedOut: !1,
                isCheckedBetween: !1,
                displayDay: g ? "今天" : "",
                displayDay2: k.format("D")
              }, this.isDawn() && "T" == i.getStorage("isOpenMidNight") && u.day == e.dayjs().subtract(1, "days").format("YYYY-MM-DD") && (u.canTap = !0), o.push(u)
            }
            r.days = o, this.timeArr.push(r)
          }
          var C, p
        },
        isDawn() {
          var t = e.dayjs().format("YYYY-MM-DD 00:00"),
            i = e.dayjs().format("YYYY-MM-DD 06:00");
          let s = !1;
          return e.dayjs().isAfter(t) && e.dayjs().isBefore(i) && (s = !0), s
        },
        chooseDay(i) {
          if (!i.canTap) return !1;
          if (this.isTap) return !1;
          if (this.isTap = !0, 0 == this.flag) return this.reSelect(), this.checkInDay = i.day, i.isCheckedIn = !0, this.flag = 1, t.jAlert3(`请选择${this.isCheckedOutTxt}时间`), this.isTap = !1, !1;
          if (1 == this.flag) {
            if (e.dayjs(i.day).isBefore(e.dayjs(this.checkInDay)) || this.checkInDay == i.day) this.reSelect(), this.checkInDay = i.day, i.isCheckedIn = !0, this.isTap = !1;
            else {
              if (this.stayMax && e.dayjs(i.day).diff(this.checkInDay, "day") > this.stayMax) return t.jAlert3(`最多选择${this.stayMax}天`), this.isTap = !1, !1;
              this.checkOutDay = i.day, i.isCheckedOut = !0, this.selcetBetween(), this.flag = 0, this.emitSelectDay(), "T" == this.isAutoColse ? setTimeout(() => {
                this.hideDialog(), this.isTap = !1
              }, 1e3) : this.isTap = !1
            }
            return !1
          }
        },
        reSelect() {
          for (let t = 0; t < this.timeArr.length; t++)
            for (let i = 0; i < this.timeArr[t].days.length; i++) {
              var e = this.timeArr[t].days[i];
              e.isCheckedIn = !1, e.isCheckedOut = !1, e.isCheckedBetween = !1
            }
        },
        selcetBetween() {
          for (let i = 0; i < this.timeArr.length; i++)
            for (let s = 0; s < this.timeArr[i].days.length; s++) {
              var t = this.timeArr[i].days[s];
              e.dayjs(t.day).isAfter(e.dayjs(this.checkInDay)) && e.dayjs(t.day).isBefore(e.dayjs(this.checkOutDay)) && (t.isCheckedIn = !1, t.isCheckedOut = !1, t.isCheckedBetween = !0)
            }
        },
        initCalendar() {
          this.reSelect();
          for (let t = 0; t < this.timeArr.length; t++)
            for (let i = 0; i < this.timeArr[t].days.length; i++) {
              var e = this.timeArr[t].days[i];
              e.day == this.checkInDay && (e.isCheckedIn = !0, e.isCheckedOut = !1, e.isCheckedBetween = !1), e.day == this.checkOutDay && (e.isCheckedIn = !1, e.isCheckedOut = !0, e.isCheckedBetween = !1)
            }
          this.selcetBetween()
        },
        emitSelectDay() {
          this.$emit("change-date", {
            checkInDay: this.checkInDay,
            checkOutDay: this.checkOutDay
          })
        },
        init(e) {
          this.checkInDay = e.checkInDay, this.checkOutDay = e.checkOutDay, e.title && (this.title = e.title), e.isCheckedInTxt && (this.isCheckedInTxt = e.isCheckedInTxt), e.isCheckedOutTxt && (this.isCheckedOutTxt = e.isCheckedOutTxt), e.isAutoColse && (this.isAutoColse = e.isAutoColse || "T"), e.stayMax && (this.stayMax = e.stayMax || ""), this.createDate(), this.initCalendar()
        },
        addPrice(e) {
          let t = {};
          e.forEach(e => {
            t[e.rsvDate] = e.price
          }), this.timeArr.forEach(e => {
            e.days.forEach(e => {
              t[e.day] && (e.price = t[e.day])
            })
          }), this.$forceUpdate()
        }
      },
      computed: {
        zday() {
          if (this.checkInDay && this.checkOutDay) {
            var e = new Date(this.checkInDay.replace(/\-/g, "/")).getTime(),
              t = new Date(this.checkOutDay.replace(/\-/g, "/")).getTime() - e;
            return Math.round(t / 864e5)
          }
        }
      }
    },
    c = e._export_sfc(r, [
      ["render", function(t, i, s, a, h, r) {
        return {
          a: h.isShowDialog ? 1 : "",
          b: h.isShowDialog ? 1 : "",
          c: e.t(h.title),
          d: e.o((...e) => r.hideDialog && r.hideDialog(...e)),
          e: e.f(h.timeArr, (t, i, s) => ({
            a: e.t(t.currentTitle),
            b: e.f(t.days, (t, i, s) => e.e({
              a: t.isCheckedIn
            }, t.isCheckedIn ? {
              b: e.t(h.isCheckedInTxt)
            } : t.isCheckedOut ? {
              d: e.t(h.isCheckedOutTxt)
            } : e.e({
              e: t.displayDay
            }, t.displayDay ? {
              f: e.t(t.displayDay)
            } : {}), {
              c: t.isCheckedOut,
              g: e.t(t.displayDay2),
              h: t.price > 0
            }, t.price > 0 ? {
              i: e.t(t.price)
            } : {}, {
              j: e.o(e => r.chooseDay(t), i),
              k: t.canTap ? "" : 1,
              l: t.isCheckedIn ? 1 : "",
              m: t.isCheckedOut ? 1 : "",
              n: t.isCheckedBetween ? 1 : "",
              o: (t.isCheckedIn || t.isCheckedOut) && 1 == r.zday ? 1 : "",
              p: i,
              q: e.s(r.getStyles(t))
            })),
            c: i
          })),
          f: h.maxHeight,
          g: h.isShowDialog ? 1 : "",
          h: h.isShowDialog ? 1 : "",
          i: h.isShowDialog
        }
      }]
    ]);
  wx.createComponent(c)
}();