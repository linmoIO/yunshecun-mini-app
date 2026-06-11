! function() {
  "use strict";
  const e = require("../services/channelManage.js"),
    r = require("./qdTracker.js"),
    n = require("./qidian-sdk/index.js"),
    t = require("./url.js"),
    a = /^utm_\d+_code$/;
  let s = null;
  async function o(t) {
    const s = Object.entries(t).filter(([e]) => e.startsWith("utm_")),
      o = s.map(([, e]) => e);
    console.warn("🚀 ~ parseQueryAndReport ~ channelParamCodes:", o);
    const i = await e.getNamesByCodes({
      codes: o
    });
    console.warn("🚀 ~ parseQueryAndReport ~ namesRes:", i);
    const d = new Map(i.map(e => [e.code, e.name]));
    console.warn("🚀 ~ parseQueryAndReport ~ codeNameMap:", d);
    const l = {},
      u = {};
    s.forEach(([e, r]) => {
      l[e] = d.get(r), u[e + "_code"] = r || ""
    }), console.warn("🚀 ~ parseQueryAndReport ~ nameQuery:", l), console.warn("🚀 ~ parseQueryAndReport ~ codeQuery:", u);
    const m = c(),
      y = Object.keys(m).filter(e => a.test(e)),
      k = new Set(Object.keys(u)),
      p = {};
    y.forEach(e => {
      if (!k.has(e)) {
        p[e] = "";
        const r = e.replace("_code", "");
        p[r] = ""
      }
    }), console.warn("🚀 ~ parseQueryAndReport ~ keysToReset:", p), r.qdTracker.setData({
      ...p,
      ...l,
      ...u
    }), console.warn("🚀 ~ QDTracker CommonParams", n.QDTracker.instance.getCommonParams())
  }

  function c() {
    var e;
    const r = n.QDTracker.instance.getCommonParams(),
      t = (null == (e = null == r ? void 0 : r[0]) ? void 0 : e.properties) || {},
      s = {
        utm_1_code: "",
        ...Object.fromEntries(Object.entries(t).filter(([e]) => a.test(e))),
        ...t.tid && {
          tid: t.tid
        }
      };
    return s.utm_4_code || (s.utm_4_code = "Wechat"), s
  }
  exports.channelLinkParse = function(a) {
    if (!a.query) return void(s = Promise.resolve());
    if (a.query.scene) {
      const e = decodeURIComponent(a.query.scene);
      console.warn("🚀 ~ channelLinkParse ~ sceneParam:", e);
      const {
        query: r
      } = t.parseUrl("?" + e), n = r.tid;
      n && (a.query.tid = n)
    }
    const i = c();
    if (a.query.tid) return i.tid && i.tid === a.query.tid ? (console.warn("🚀 ~ channelLinkParse ~ tid已处理过，跳过:", a.query.tid), void(s = Promise.resolve())) : void(s = async function(a) {
      r.qdTracker.setData({
        tid: a
      }), console.warn("🚀 ~ QDTracker CommonParams", n.QDTracker.instance.getCommonParams());
      const s = await e.getLongLinkByTid({
        tid: a
      });
      if (console.warn("🚀 ~ handleShortLink ~ res:", s), s) {
        const {
          query: e
        } = t.parseUrl(s.path);
        await o(e)
      }
    }(a.query.tid));
    if (i.tid && r.qdTracker.setData({
        tid: ""
      }), console.warn("🚀 ~ QDTracker CommonParams", n.QDTracker.instance.getCommonParams()), Object.keys(a.query).some(e => e.startsWith("utm_") && a.query[e])) {
      console.warn("🚀 ~ channelLinkParse ~ channelParams:", i);
      const e = Object.entries(a.query).filter(([e]) => e.startsWith("utm_")).reduce((e, [r, n]) => ({
        ...e,
        [r + "_code"]: n
      }), {});
      console.warn("🚀 ~ channelLinkParse ~ currentUtmParams:", e);
      const r = Object.entries(e).every(([e, r]) => i[e] === r);
      if (console.warn("🚀 ~ channelLinkParse ~ isAllMatched:", r), r && Object.keys(e).length > 0) return console.warn("🚀 ~ channelLinkParse ~ utm参数已处理过，跳过:", e), void(s = Promise.resolve());
      s = o(a.query)
    } else s = Promise.resolve()
  }, exports.getChannelParamsFromQDTracker = async function() {
    return await (s || Promise.resolve()), c()
  }
}();