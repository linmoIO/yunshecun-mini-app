! function() {
  "use strict";
  const e = require("../../../../../common/vendor.js"),
    t = e => /^data:image\/(\w+);base64/.test(e),
    {
      platform: n,
      SDKVersion: r
    } = e.index.getSystemInfoSync(),
    s = /windows|mac/.test(n);
  let a = {};

  function o(t) {
    const [, n] = /^data:image\/(\w+);base64,/.exec(t) || [];
    return new Promise((r, s) => {
      const a = e.index.getFileSystemManager();
      n || s(new Error("ERROR_BASE64SRC_PARSE"));
      const o = (new Date).getTime(),
        i = `${e.wx$1.env.USER_DATA_PATH}/${o}.${n}`;
      a.writeFile({
        filePath: i,
        data: t.split(",")[1],
        encoding: "base64",
        success() {
          r(i)
        },
        fail(e) {
          console.error(e), s(e)
        }
      })
    })
  }
  exports.base64ToPath = o, exports.canIUseCanvas2d = function() {
    return function(e) {
      return function(e, t) {
        e = e.split("."), t = t.split(".");
        const n = Math.max(e.length, t.length);
        for (; e.length < n;) e.push("0");
        for (; t.length < n;) t.push("0");
        for (let r = 0; r < n; r++) {
          const n = parseInt(e[r], 10),
            s = parseInt(t[r], 10);
          if (n > s) return 1;
          if (n < s) return -1
        }
        return 0
      }(r, e) >= 0
    }("2.9.2")
  }, exports.getImageInfo = function(n, r) {
    const i = this && this.canvas && this.canvas.createImage;
    return new Promise(async (r, c) => {
      let u = n.replace(/^@\//, "/");
      if (a[n] && a[n].errMsg) r(a[n]);
      else {
        try {
          !t(n) || i && !s || (u = await o(n))
        } catch (e) {
          c({
            ...e,
            src: u
          })
        }
        if (i && !s) {
          const e = this.canvas.createImage();
          return e.onload = function() {
            const t = {
              path: e,
              width: e.width,
              height: e.height
            };
            a[n] = t, r(a[n])
          }, e.onerror = function(e) {
            c({
              err: e,
              path: n
            })
          }, void(e.src = u)
        }
        e.index.getImageInfo({
          src: u,
          success: e => {
            if (e.path = /^\.|^\/(?=[^\/])/.test(u) ? "/" + e.path : e.path, i) {
              const t = this.canvas.createImage();
              return t.onload = function() {
                e.path = t, a[n] = e, r(a[n])
              }, t.onerror = function(e) {
                c({
                  err: e,
                  path: n
                })
              }, void(t.src = u)
            }
            a[n] = e, r(a[n])
          },
          fail(e) {
            console.error({
              err: e,
              path: n
            }), c({
              err: e,
              path: n
            })
          }
        })
      }
    })
  }, exports.isBase64 = t, exports.isPC = s, exports.pathToBase64 = function(t) {
    return /^data:/.test(t) ? t : new Promise((n, r) => {
      e.index.canIUse("getFileSystemManager") && e.index.getFileSystemManager().readFile({
        filePath: t,
        encoding: "base64",
        success: e => {
          n("data:image/png;base64," + e.data)
        },
        fail: e => {
          console.error({
            error: e,
            path: t
          }), r(e)
        }
      })
    })
  }, exports.sleep = function(e) {
    return new Promise(t => setTimeout(t, e))
  }, exports.toPx = function t(n, r, s = !1) {
    if ("number" == typeof n) return n;
    if (function(e) {
        return /^-?\d+(\.\d+)?$/.test(e)
      }(n)) return 1 * n;
    if ("string" == typeof n) {
      const a = /^-?([0-9]+)?([.]{1}[0-9]+){0,1}(em|rpx|px|%)$/g.exec(n);
      if (!n || !a) return 0;
      const o = a[3];
      n = parseFloat(n);
      let i = 0;
      return "rpx" === o ? i = e.index.upx2px(n) : "px" === o ? i = 1 * n : "%" === o ? i = n * t(r) / 100 : "em" === o && (i = n * t(14)), s ? 1 * i.toFixed(2) : Math.round(i)
    }
    return 0
  }
}();
