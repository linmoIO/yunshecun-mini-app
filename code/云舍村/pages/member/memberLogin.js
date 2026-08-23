! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/channel.js"),
    a = require("../../base/jAlert/jAlert.js"),
    r = require("../../hooks/useAdReport.js"),
    n = require("../../hooks/useSubscribeMessage.js"),
    l = require("../../hooks/useUser.js"),
    t = require("../../hooks/useXhsReport.js"),
    i = require("../../services/user.js"),
    s = require("../../utils/api.js"),
    u = require("../../utils/channelLinkParse.js"),
    c = require("../../utils/config.js"),
    d = require("../../utils/helper.js"),
    v = require("../../utils/log.js"),
    p = require("../../utils/qdTracker.js"),
    m = require("../../utils/umengAdaptor.js"),
    f = require("../../utils/user.js"),
    g = require("../../utils/utils.js"),
    h = require("../../utils/validation.js"),
    b = require("../../utils/wxuser.js");
  Math || (j + k + C + I + _ + y + w)();
  const _ = () => "../../components/Alert.js",
    y = () => "../../components/bottomDialog.js",
    C = () => "../../components/member/AgreementCheckbox.js",
    w = () => "../../components/new/GraphCaptchaDialog.js",
    j = () => "../../components/new/Navigator.js",
    I = () => "../../components/new/SafeArea.js",
    k = () => "../../components/new/StButton.js",
    S = e.defineComponent({
      __name: "memberLogin",
      setup(_) {
        var y, C, w, j, I;
        const k = t.useXshReport(),
          S = r.useAdReport(),
          {
            subscribeMessage: T
          } = n.useSubscribeMessage(["COUPON_CREDITED", "COUPON_VALID", "NEW_ACTIVITY_MA"]),
          {
            user: A,
            wxuser: q,
            refreshUserAsync: R
          } = l.useUser(),
          x = e.ref(""),
          D = e.ref(""),
          N = e.ref(),
          G = e.ref(),
          P = e.ref(!1),
          L = e.ref(!1),
          V = e.ref(!1),
          U = e.ref(),
          E = e.ref(`${c.config.baseUrlmall.replace(/\/api\/?$/, "")}/uploads/images/云舍村-苔藓院落.webp`);
        e.useRequest(s.api.advertisementPage, {
          defaultParams: [{
            hotelCode: c.config.hotelCode,
            hotelGroupCode: c.config.hotelGroupCode,
            showLocation: "3",
            clientTypes: o.defaultChannel,
            firstResult: 0,
            pageSize: 10
          }],
          onSuccess(e) {
            var o, a;
            if (0 === e.result && (null == (a = null == (o = e.retVal) ? void 0 : o.datas) ? void 0 : a.length)) try {
              const o = JSON.parse(e.retVal.datas[0].infos);
              o.imgUrl && (E.value = o.imgUrl)
            } catch (e) {
              console.error("<MemberLogin> {api.advertisementPage} JSON.parse error:", e)
            }
          }
        });
        const z = e.ref(!1),
          B = e.ref({
            hotelGroupCode: null == (y = c.config) ? void 0 : y.hotelGroupCode,
            hotelCode: null == (C = c.config) ? void 0 : C.hotelCode,
            hotelGroupId: null == (w = c.config) ? void 0 : w.hotelGroupId,
            appid: null == (j = c.config) ? void 0 : j.appid,
            componentAppid: null == (I = c.config) ? void 0 : I.componentAppid
          }),
          M = e.ref(""),
          O = e.ref("");

        function Y(e) {
          const {
            type: o,
            result: a,
            isRegister: r,
            failReason: n
          } = e || {}, l = {
            result: a ? "成功" : "失败"
          }, t = {
            login_type: "oauth" === o ? "一键登录" : "输入手机号登录",
            is_success: a ? "是" : "否"
          };
          a && (l.is_register = t.is_register = r ? "是" : "否"), a || (t.failure_reason = n), m.adaptor.sendEvent("customize_login_result", l, "OTHER"), p.qdTracker.track("mini_user_login", t)
        }
        e.watch(() => [P.value, L.value], ([e, o]) => {
          e && o && X(G.value)
        }, {
          immediate: !0
        });
        const H = e.computed(() => z.value ? "getPhoneNumber" : void 0);
        async function $() {
          try {
            const {
              completed: e
            } = await T();
            L.value = e;
          } catch(err) {
            console.warn("订阅消息失败:", err);
            L.value = true;
          }
          if (!H.value && fe() && V.value) try {
            const e = await s.api.cmbchinaGetAuthInfo({
              hotelGroupCode: c.config.hotelGroupCode
            });
            1 === (null == e ? void 0 : e.result) && (null == cmblapi || cmblapi.merchantLogin({
              corpNo: e.retVal.corpNo,
              reAuth: !0,
              authInfo: {
                timestamp: e.retVal.timestamp,
                nonceStr: e.retVal.nonceStr,
                sign: e.retVal.sign
              },
              description: "手机号码将用作您的登录账号，进行预订。",
              success(e) {
                var o, a, r;
                "Y" === e.resultType && X({
                  userDataBase64: e.body,
                  sessionKey: null == (o = q.value) ? void 0 : o.session_key,
                  openid: null == (a = q.value) ? void 0 : a.openid,
                  nickname: null == (r = q.value) ? void 0 : r.nickName
                })
              },
              fail(e) {
                alert(JSON.stringify(e))
              }
            }))
          } catch {
            V.value = !1
          }
        }
        const {
          loading: W,
          run: J
        } = e.useRequest(i.loginByAuthorization, {
          manual: !0,
          onSuccess(e) {
            const {
              headers: o,
              data: a
            } = e || {}, {
              isNew: r,
              member: n
            } = null == a ? void 0 : a.data;
            K("oauth", {
              ...n,
              isNew: r
            }, o)
          },
          onError(e) {
            console.log("loginByAuthorization error", e), Y({
              type: "oauth",
              result: !1,
              failReason: null == e ? void 0 : e.message
            })
          }
        });
        async function Q(e) {
          var o, a, r, n, l, t, i;
          if ("getPhoneNumber:ok" === e.detail.errMsg) {
            q.value = await f.getWxUserInfo();
            // 校验：必须获取到 openid 和 session_key，否则无法继续
            if (!q.value || !q.value.openid || !q.value.session_key) {
              return a.jAlert3("微信信息获取失败，请重试");
            }
            let s = "decrypt";
            (null == (o = e.detail) ? void 0 : o.code) && (s = "code"), G.value = {
              code: null == (a = e.detail) ? void 0 : a.code,
              encryptedData: null == (r = e.detail) ? void 0 : r.encryptedData,
              iv: null == (n = e.detail) ? void 0 : n.iv,
              sessionKey: null == (l = q.value) ? void 0 : l.session_key,
              phoneType: s,
              openid: null == (t = q.value) ? void 0 : t.openid,
              nickname: null == (i = q.value) ? void 0 : i.nickName
            }, P.value = !0
          }
        }
        async function X(e) {
          await ue(), console.warn("🚀 ~ fetchLoginByAuthorization ~ businessData:", B.value), J({
            loginType: U.value,
            authData: e,
            businessData: B.value
          }, {
            isReturnRawData: !0
          })
        }

        function K(o, r, n) {
          // 微信小程序会将自定义响应头规范化为小写，兼容不同基础库/代理行为。
          const headers = n || {},
            accessToken = headers.accessToken || headers.accesstoken || headers["Access-Token"] || r && r.memberToken || "",
            refreshToken = headers.refreshToken || headers.refreshtoken || headers["Refresh-Token"] || accessToken;
          f.setUserToken({
            accessToken,
            refreshToken
          }), b.setStorage("user_new", r), e.index.showLoading({
            title: "账号绑定中...",
            mask: !0
          }), A.value = r, f.updateUserInfo(r), R().then(() => {
            F()
          }).catch(() => {
            a.jAlert3("登录绑定失败，请重试~")
          }).finally(() => {
            e.index.hideLoading()
          }), Y({
            type: o,
            result: !0,
            isRegister: "T" === (null == r ? void 0 : r.isNew)
          }), S("T" === (null == r ? void 0 : r.isNew) ? "REGISTER" : "LOGIN");
          const {
            memberId: l,
            name: t,
            mobile: i,
            cardLevelDescript: s,
            cardId: u,
            cardNo: c,
            cardSrcDescript: d
          } = r || {};
          m.adaptor.appendGlobalProperties({
            _user_id: l,
            _user_nick: t,
            phone_number: i,
            is_vip: "是",
            vip_level: s,
            vip_number: u,
            vip_card_bumber: c,
            vip_first_channel: d || ""
          }), m.adaptor.sendEvent("$$_user_profile", {
            phone_number: i,
            is_vip: "是",
            vip_level: s,
            vip_number: u,
            vip_card_bumber: c,
            vip_first_channel: d || ""
          }, "OTHER")
        }

        function F() {
          if ("back" === N.value) e.index.navigateBack({
            delta: 1
          });
          else if (D.value) {
            const e = decodeURIComponent(D.value);
            g.goPage(e)
          } else e.index.reLaunch({
            url: "/pages/member/memberCenter"
          })
        }
        const Z = e.ref(""),
          ee = e.ref(""),
          oe = e.ref(""),
          ae = e.ref(!1),
          re = e.ref(),
          ne = e.ref(!1);

        function le() {
          ae.value || fe(["agreement", "phone"]) && (ne.value = !0)
        }
        const te = e.ref();

        function ie() {
          ae.value = !1, clearInterval(te.value)
        }
        e.onUnmounted(() => {
          ie()
        });
        const se = e.ref({});
        async function ue() {
          const {
            utm_2_code: e,
            utm_4_code: o
          } = await u.getChannelParamsFromQDTracker();
          B.value.registerChannel = o || "", B.value.utmCampaign = e || "", console.warn("🚀 ~ appendChannelParamsToBusinessData ~ value.utmCampaign:", B.value)
        }

        function ce(e) {
          const {
            sessionId: o,
            code: r
          } = e || {};
          return new Promise(e => {
            s.api.verifyIdentifyCode({
              sessionId: o,
              identifyCode: r,
              ifSendSms: "T",
              mobile: ee.value,
              hotelGroupCode: c.config.hotelGroupCode,
              hotelGroupId: c.config.hotelGroupId,
              hotelCode: c.config.hotelCode,
              hotelId: c.config.hotelId || ""
            }).then(o => {
              1 === o.result && (null == o ? void 0 : o.retVal) ? (se.value.verifyId = o.retVal, e(!0), function(e = 60) {
                e && (re.value = e), ae.value = !0, te.value = setInterval(() => {
                  re.value <= 0 ? ie() : re.value--
                }, 1e3)
              }()) : (e(!1), a.jAlert3((null == o ? void 0 : o.msg) || "验证码错误"))
            }).catch(() => {
              e(!1), a.jAlert3("发生错误，请重试")
            })
          })
        }
        const de = e.ref(),
          {
            loading: ve,
            run: pe
          } = e.useRequest(i.loginByVerificationCode, {
            manual: !0,
            onSuccess(e) {
              const {
                headers: o,
                data: a
              } = e || {}, {
                isNew: r,
                member: n
              } = null == a ? void 0 : a.data;
              K("mobile", {
                ...n,
                isNew: r
              }, o)
            },
            onError(e, o) {
              v.log.error("{loginByVerificationCode} params:", o), v.log.error("{loginByVerificationCode} error:", e), Z.value = (null == e ? void 0 : e.message) || "登录失败，请重试", Y({
                type: "oauth",
                result: !1,
                failReason: null == e ? void 0 : e.message
              })
            }
          });
        async function me() {
          var e;
          fe(["agreement", "phone", "smsCode"]) && (await T().catch(err => console.warn("订阅消息失败:", err)), await ue(), Z.value = "", console.warn("🚀 ~ handlePhoneLogin ~ businessData:", B.value), pe({
            ...se.value,
            businessData: B.value,
            loginType: U.value,
            mobile: ee.value.trim(),
            verifyCode: oe.value.trim(),
            openid: null == (e = q.value) ? void 0 : e.openid
          }, {
            isReturnRawData: !0
          }))
        }

        function fe(e = ["agreement"]) {
          return e.includes("agreement") && !z.value ? (a.jAlert3("请先阅读并勾选同意《用户协议》及《隐私政策》"), !1) : e.includes("phone") && !ee.value ? (a.jAlert3("请输入手机号"), !1) : e.includes("phone") && !h.phoneRegex.test(ee.value) ? (a.jAlert3("请输入正确的手机号"), !1) : !(e.includes("smsCode") && !oe.value && (a.jAlert3("请输入验证码"), 1))
        }

        function ge() {
          var e;
          fe() && (null == (e = de.value) || e.showDialog())
        }
        const he = e.ref(!0);
        return e.onLoad(o => {
          var a;
          B.value.channel = "WECHAT";
          const r = b.getStorage("cardSrc");
          r && (B.value.cardSrc = r), o.cardSrc ? (b.setStorage("cardSrc", o.cardSrc), B.value.cardSrc = o.cardSrc) : k.isXhs() && (B.value.cardSrc = "xcxxhs"), o.memberId && (M.value = o.memberId, O.value = o.ruleCode, o.YQHYId && (B.value.yqhyid = o.YQHYId), "T" === e.toString(o.canGive) && (B.value.referrerId = M.value)), o.redirect_url && (D.value = o.redirect_url), o.mode && (N.value = o.mode), "1" === e.toString(o.forceMobile) && e.nextTick$1(() => {
            var e;
            ee.value = (null == o ? void 0 : o.mobile) || "", he.value = !1, null == (e = de.value) || e.showDialog()
          }), A.value = b.getStorage("user"), "1" === e.toString(o.flagSinglePage) && (null == (a = A.value) ? void 0 : a.memberId) && F()
        }), e.onMounted(() => {
          const _partnerId = b.getStorage("partnerId");
          _partnerId && (x.value = _partnerId, B.value.partnerId = _partnerId);
          U.value = "wechat";

          // ============ 仅检查已有登录 session，不自动触发微信登录 ============
          // 如果用户已经手动登录过且 session 仍有效，直接跳过登录页
          function _checkExistingSession() {
            let _user = null;
            try { _user = wx.getStorageSync('user'); } catch(_e) {}
            if (_user && _user.memberId && _user.memberToken) {
              A.value = _user;
              wx.reLaunch({ url: '/pages/member/memberCenter' });
            }
            // 若无有效 session，停留在登录页，等待用户手动操作
          }

          _checkExistingSession();
        }), (o, a) => ({
          a: e.p({
            fixed: !0,
            background: "transparent",
            color: "white",
            placeholder: !0
          }),
          b: e.o($),
          c: e.o(Q),
          d: e.p({
            block: !0,
            size: "large",
            theme: "white",
            "open-type": H.value,
            loading: e.unref(W)
          }),
          e: e.o(ge),
          f: e.o(e => z.value = e),
          g: e.p({
            modelValue: z.value
          }),
          h: e.p({
            position: "bottom"
          }),
          i: e.p({
            tips: Z.value
          }),
          j: "font-size: " + e.unref(d.pxTransform)(14, 375),
          k: ee.value,
          l: e.o(e => ee.value = e.detail.value),
          m: e.t(ae.value ? `重新获取 ${re.value}s` : "获取验证码"),
          n: e.o(le),
          o: e.p({
            size: "mini",
            theme: "simple",
            disabled: ae.value
          }),
          p: "font-size: " + e.unref(d.pxTransform)(14, 375),
          q: oe.value,
          r: e.o(e => oe.value = e.detail.value),
          s: e.o(me),
          t: e.p({
            block: !0,
            theme: "black",
            loading: e.unref(ve),
            "custom-style": {
              marginTop: e.unref(d.pxTransform)(32, 375)
            }
          }),
          v: e.o(e => z.value = e),
          w: e.p({
            theme: "black",
            "custom-style": {
              marginTop: e.unref(d.pxTransform)(32, 375)
            },
            modelValue: z.value
          }),
          x: e.sr(de, "6ada9f64-4", {
            k: "phoneLoginPopupRef"
          }),
          y: e.p({
            title: "手机号登录",
            closable: he.value
          }),
          z: e.o(e => ne.value = e),
          A: e.p({
            "z-index": 200,
            "before-confirm": ce,
            show: ne.value
          }),
          B: e.unref(W) ? 1 : "",
          C: `url(${e.unref(d.imageMogr2)(E.value,"750x")})`
        })
      }
    }),
    T = e._export_sfc(S, [
      ["__scopeId", "data-v-6ada9f64"]
    ]);
  wx.createPage(T)
}();
