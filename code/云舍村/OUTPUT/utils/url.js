! function() {
  "use strict";

  function r(r) {
    const [t, n] = null == r ? void 0 : r.split("?");
    let e = {};
    return n && (e = n.split("&").reduce((r, t) => {
      const [n, e] = t.split("=");
      return r[n] = e, r
    }, {})), {
      origin: t,
      query: e
    }
  }
  exports.addUrlQuery = function(t, n) {
    const {
      origin: e,
      query: i
    } = r(t);
    return `${e}?${Object.entries({...i,...n}).map(([r,t])=>`
    $ {
      r
    } = $ {
      t
    }
    `).join("&")}`
  }, exports.joinUrl = function(r, t) {
    return `${r}?${Object.entries(t).map(([r,t])=>`${r}=${t}`).join("&")}`
  }, exports.parseUrl = r
}();