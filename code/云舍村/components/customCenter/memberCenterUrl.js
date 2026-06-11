! function() {
  "use strict";
  const t = require("../../utils/utils.js"),
    e = require("../../base/jAlert/jAlert.js");
  require("../../utils/umengAdaptor.js");
  const s = require("../../utils/qdTracker.js"),
    r = require("../../common/vendor.js"),
    o = {
      data: () => ({
        kfName: "在线客服"
      }),
      props: ["datas"],
      components: {},
      methods: {
        goTitle() {
          this.datas && this.datas.titleUrl && t.goPage(this.datas.titleUrl)
        },
        goUrlAction(r) {
          if (s.qdTracker.track("my_page_click", {
              button_name: r.desc
            }), r.desc !== this.kfName) {
            if (!r.url) return e.jAlert3("敬请期待"), !1;
            if ("invite" == r.business) return void this.$emit("inviteClick");
            t.goPageWithUser(r.url)
          } else this.$emit("kfClick")
        }
      },
      created() {},
      mounted() {},
      beforeUnmount() {},
      computed: {
        urls() {
          let t = [];
          return this.datas.items && this.datas.items.length > 0 && (t = [...this.datas.items]), t
        }
      },
      watch: {}
    },
    a = r._export_sfc(o, [
      ["render", function(t, e, s, o, a, i) {
        return r.e({
          a: s.datas.title
        }, s.datas.title ? {
          b: r.t(s.datas.title),
          c: s.datas.titleUrl ? 1 : "",
          d: r.o((...t) => i.goTitle && i.goTitle(...t))
        } : {}, {
          e: r.f(i.urls, (t, e, o) => r.e({
            a: t.logo
          }, t.logo ? {
            b: t.logo
          } : {}, {
            c: r.t(t.desc)
          }, "rows" !== s.datas.sortType ? r.e({
            d: t.descLogo
          }, t.descLogo ? {
            e: t.descLogo
          } : {}, {
            f: t.moreDesc
          }, t.moreDesc ? {
            g: r.t(t.moreDesc)
          } : {}) : {}, {
            h: e,
            i: r.o(e => i.goUrlAction(t), e)
          })),
          f: "rows" !== s.datas.sortType,
          g: "rows" == s.datas.sortType ? 1 : "",
          h: r.n(s.datas.sortType)
        })
      }],
      ["__scopeId", "data-v-03ba02eb"]
    ]);
  wx.createComponent(a)
}();