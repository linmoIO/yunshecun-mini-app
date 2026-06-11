! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../hooks/useLoading.js"),
    o = require("../../hooks/useSubscribeMessage.js"),
    l = require("../../hooks/useSysOptions.js"),
    u = require("../../utils/api.js"),
    n = require("../../utils/config.js"),
    a = require("../../utils/user.js"),
    i = require("../../utils/wxuser.js");
  Array || e.resolveComponent("mp-html")(), Math || ((() => "../../uni_modules/mp-html/components/mp-html/mp-html.js") + c)();
  const c = () => "../new/StDialog.js",
    r = "user_agreement",
    s = e.defineComponent({
      __name: "UserAgreement",
      emits: ["close"],
      setup(c, {
        emit: s
      }) {
        const v = s,
          {
            subscribeMessage: d
          } = o.useSubscribeMessage(["NEW_ACTIVITY_MA", "POINT_VALID_MA", "TRAVEL_GUIDE_MA"]),
          m = e.getCurrentInstance(),
          p = e.ref(),
          g = e.ref(!1),
          f = e.ref(),
          h = e.ref(!1),
          b = e.ref(!1),
          y = e.ref(),
          {
            result: A,
            refresh: x
          } = l.useSysOptions(["rule", "PrivacyRule", "memberRule"], {
            manual: !0
          }),
          _ = t.useLoading(!1);
        e.watch(A, e => {
          e.length && (_.value = !1)
        });
        const w = e.computed(() => A.value.map(e => ({
            code: e.code,
            modifyDatetime: e.modifyDatetime
          }))),
          C = e.ref(!1),
          j = e.ref(!1),
          T = [{
            code: "rule",
            label: "用户协议"
          }, {
            code: "PrivacyRule",
            label: "隐私政策"
          }, {
            code: "memberRule",
            label: "会员政策"
          }],
          S = e.ref(0),
          I = e.ref([]),
          M = e.ref(0),
          P = e.computed(() => T[S.value]),
          R = e.computed(() => {
            const e = P.value.code,
              t = A.value.find(t => t.code === e);
            return t ? t.value : ""
          }),
          V = e.computed(() => I.value.length),
          q = e.computed(() => I.value.length === T.length),
          U = e.computed(() => T.filter(e => !I.value.includes(e.code)).map(e => e.label).join("、"));

        function D(e) {
          I.value.includes(e) || I.value.push(e)
        }
        let k;

        function G() {
          D(P.value.code)
        }

        function L() {
          I.value.includes(P.value.code) || setTimeout(() => {
            const t = e.index.createSelectorQuery().in(m);
            t.select(".scroll-content").boundingClientRect(), t.select(".html-container").boundingClientRect(), t.exec(([e, t]) => {
              e && t && t.bottom - e.bottom < 50 && D(P.value.code)
            })
          }, 300)
        }

        function E() {
          C.value = !1, j.value = !0
        }
        async function O() {
          q.value && (C.value = !1, g.value = !0, f.value = !0, w.value.length && (y.value = {
            isAgree: !0,
            agreementVersions: w.value
          }, i.setStorage(r, y.value)), await d(), v("close"))
        }

        function z() {
          g.value = !0, f.value = !1, j.value = !1, e.index.exitMiniProgram(), v("close")
        }

        function F() {
          j.value = !1, C.value = !0
        }
        return e.watch(R, t => {
          if (clearTimeout(k), !t) return;
          const o = P.value.code;
          let l = 0,
            u = 0;
          const n = () => {
            if (o !== P.value.code || I.value.includes(o)) return;
            if (++u > 10) return;
            const t = e.index.createSelectorQuery().in(m);
            t.select(".scroll-content").boundingClientRect(), t.select(".html-container").boundingClientRect(), t.exec(([e, t]) => {
              if (o === P.value.code && !I.value.includes(o) && (null == e ? void 0 : e.height) && (null == t ? void 0 : t.height)) return t.height !== l ? (l = t.height, void(k = setTimeout(n, 300))) : void(t.height <= e.height + 10 && D(o))
            })
          };
          k = setTimeout(n, 300)
        }), e.watch([p, g], () => {
          var e;
          (null == (e = p.value) ? void 0 : e.openid) && g.value && async function() {
            var e, t;
            (null == (e = p.value) ? void 0 : e.openid) && !h.value && g.value && (await u.api.saveUserViewPrivacyPop({
              hotelGroupCode: n.config.hotelGroupCode,
              openId: null == (t = p.value) ? void 0 : t.openid,
              isAgree: f.value ? "T" : "F"
            }), h.value = !0)
          }()
        }), e.watch(b, e => {
          e && !C.value && (C.value = !0)
        }), e.onMounted(async () => {
          var e;
          if (a.getWxUserInfo().then(e => {
              p.value = e
            }), y.value = i.getStorage(r), !(null == (e = y.value) ? void 0 : e.isAgree)) return _.value = !0, x(), void(b.value = !0);
          v("close"),
            function() {
              var e, t;
              console.log("<UserAgreement> {getAgreementUpdateFlag} cachedUserAgreement:", y.value), (null == (t = null == (e = y.value) ? void 0 : e.agreementVersions) ? void 0 : t.length) && u.api.getUserViewPrivacyPop({
                appid: n.config.appid,
                componentAppid: n.config.componentAppid,
                clientType: "wechat_mini",
                hotelGroupCode: n.config.hotelGroupCode,
                codeParamList: y.value.agreementVersions.map(e => ({
                  code: e.code,
                  modifyDatetime: e.modifyDatetime
                }))
              }).then(e => {
                1 === e.result && e.retVal && i.removeStorage(r)
              }).catch(e => {
                console.log(e)
              })
            }()
        }), (t, o) => e.e({
          a: e.f(T, (t, o, l) => e.e({
            a: e.t(t.label),
            b: I.value.includes(t.code)
          }, (I.value.includes(t.code), {}), {
            c: S.value === o
          }, (S.value, {}), {
            d: t.code,
            e: S.value === o ? 1 : "",
            f: e.o(t => function(t) {
              S.value = t, M.value = .001, e.nextTick$1(() => {
                M.value = 0
              })
            }(o), t.code)
          })),
          b: e.p({
            content: R.value
          }),
          c: M.value,
          d: e.o(G),
          e: e.o(L),
          f: q.value
        }, q.value ? {} : {
          g: e.t(U.value)
        }, {
          h: e.t(V.value),
          i: q.value ? 1 : "",
          j: e.o(E),
          k: q.value ? "" : 1,
          l: e.o(O),
          m: e.p({
            show: C.value,
            "z-index": 1e4
          }),
          n: e.o(z),
          o: e.o(F),
          p: e.p({
            show: j.value,
            "z-index": 1e4,
            title: "是否确定退出",
            "cancel-button-text": "不同意并退出",
            "confirm-button-text": "再次查看协议"
          })
        })
      }
    }),
    v = e._export_sfc(s, [
      ["__scopeId", "data-v-885b046c"]
    ]);
  wx.createComponent(v)
}();