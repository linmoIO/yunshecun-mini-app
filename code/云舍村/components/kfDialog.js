! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../utils/wxuser.js"),
    o = require("../utils/utils.js"),
    a = require("../hooks/useAdReport.js"),
    r = require("../utils/umengAdaptor.js"),
    u = require("../utils/qdTracker.js"),
    c = require("../hooks/useSysOptions.js");
  Math || s();
  const s = () => "./bottomDialog.js",
    l = e.defineComponent({
      __name: "kfDialog",
      props: {
        sideslip: {
          type: Boolean,
          default: !1
        },
        title: {
          default: "客服服务"
        },
        trackingData: {
          default: {}
        }
      },
      emits: ["openState"],
      setup(s, {
        expose: l,
        emit: i
      }) {
        const n = a.useAdReport(),
          v = s,
          d = i,
          p = e.ref(),
          m = e.ref("400-0000-830"),
          _ = e.ref(""),
          h = e.ref(""),  // 留空，由 wxCustomerServiceUrl 配置决定；为空时弹提示
          f = e.ref(""),
          k = e.ref(t.getStorage("user")),
          g = e.ref(!0),
          {
            result: C
          } = c.useSysOptions(["customerServiceInfo", "tripContactPhone", "wxCustomerServiceUrl", "wxCustomerCorpId"]);
        e.watch(C, e => {
          var t, o;
          e.forEach(e => {
            "customerServiceInfo" === e.code && e.value && (_.value = e.value), "tripContactPhone" === e.code && e.value && (m.value = e.value), "wxCustomerServiceUrl" === e.code && e.value && (h.value = e.value), "wxCustomerCorpId" === e.code && e.value && (f.value = e.value)
          }), _.value || (_.value = "解答咨询、预订、会员及订单相关问题");
          const a = (null == (t = k.value) ? void 0 : t.name) || "",
            r = (null == (o = k.value) ? void 0 : o.mobile) || "";
          h.value && (h.value = `${h.value}&nickName=${a}&phone=${r}`)
        }, {
          immediate: !0
        });
        const x = e => {
            d("openState", e)
          },
          S = () => {
            n("CONSULT", {
              actionParam: {
                consult_type: "ONLINE_CONSULT"
              }
            }), r.adaptor.sendEvent("click_customer_service_control", {
              button_name: "在线客服"
            }), u.qdTracker.track("consult_customer_service", {
              ...v.trackingData,
              service_type: "在线客服"
            });
            // 优先走内置聊天页，外部链接作为备选
            if (h.value && (h.value.startsWith('http://') || h.value.startsWith('https://'))) {
              o.goPage(h.value);
            } else {
              try {
                e.index.navigateTo({ url: '/pagesA/other/chat' });
              } catch(_e) {
                const _phone = (m && m.value) ? String(m.value) : '400-0000-830';
                try { e.index.showToast({ title: '客服热线：' + _phone, icon: 'none', duration: 3000 }); } catch(_e2) {}
              }
            }
          };
        return l({
          showDialog: () => {
            p.value.showDialog()
          },
          hideDialog: () => {
            p.value.hideDialog()
          }
        }), e.onMounted(() => {}), (t, o) => e.e({
          a: g.value
        }, g.value ? {
          b: e.t(_.value),
          c: e.o(S)
        } : {}, {
          d: e.t(m.value),
          e: e.o(t => {
            return o = m.value, n("CONSULT", {
              actionParam: {
                consult_type: "MAKE_PHONE_CALL"
              }
            }), r.adaptor.sendEvent("click_customer_service_control", {
              button_name: "电话客服"
            }), u.qdTracker.track("consult_customer_service", {
              ...v.trackingData,
              service_type: "电话客服"
            }), void e.index.makePhoneCall({
              phoneNumber: o
            });
            var o
          }),
          f: e.sr(p, "211bd79c-0", {
            k: "kfDialog"
          }),
          g: e.o(x),
          h: e.p({
            title: s.title,
            sideslip: s.sideslip
          })
        })
      }
    }),
    i = e._export_sfc(l, [
      ["__scopeId", "data-v-211bd79c"]
    ]);
  wx.createComponent(i)
}();