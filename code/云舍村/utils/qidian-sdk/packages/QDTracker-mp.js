! function() {
  "use strict";
  const t = require("../../../common/vendor.js");

  function e(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
    return r
  }

  function n(t, e, n) {
    return (e = "symbol" == typeof(r = function(t, e) {
      if ("object" != typeof t || !t) return t;
      var n = t[Symbol.toPrimitive];
      if (void 0 !== n) {
        var r = n.call(t, "string");
        if ("object" != typeof r) return r;
        throw new TypeError("@@toPrimitive must return a primitive value.")
      }
      return String(t)
    }(e)) ? r : r + "") in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t;
    var r
  }

  function r(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      e && (r = r.filter((function(e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      }))), n.push.apply(n, r)
    }
    return n
  }

  function i(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = null != arguments[e] ? arguments[e] : {};
      e % 2 ? r(Object(i), !0).forEach((function(e) {
        n(t, e, i[e])
      })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : r(Object(i)).forEach((function(e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
      }))
    }
    return t
  }

  function o(t, n) {
    return function(t) {
      if (Array.isArray(t)) return t
    }(t) || function(t, e) {
      var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != n) {
        var r, i, o, a, s = [],
          c = !0,
          h = !1;
        try {
          if (o = (n = n.call(t)).next, 0 === e);
          else
            for (; !(c = (r = o.call(n)).done) && (s.push(r.value), s.length !== e); c = !0);
        } catch (t) {
          h = !0, i = t
        } finally {
          try {
            if (!c && null != n.return && (a = n.return(), Object(a) !== a)) return
          } finally {
            if (h) throw i
          }
        }
        return s
      }
    }(t, n) || function(t, n) {
      if (t) {
        if ("string" == typeof t) return e(t, n);
        var r = {}.toString.call(t).slice(8, -1);
        return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? e(t, n) : void 0
      }
    }(t, n) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function a(t) {
    return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
      return typeof t
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
  }
  var s = "smart";
  try {
    t.wx$1 && (s = "wx")
  } catch (R) {}
  try {
    my && (s = "alipay")
  } catch (R) {}
  var c = {
    env: s,
    getCurrentPages: getCurrentPages,
    sdk_version: "6.13.1"
  };
  switch (s) {
    case "wx":
      c.methods = t.wx$1, c.sdk_type = "wxminiprogram", c.lifecycle = {
        app: ["onLaunch", "onShow", "onHide"],
        page: ["onShow", "onHide", "onShareAppMessage"]
      };
      break;
    case "alipay":
      c.methods = my, c.sdk_type = "alipayminiprogram", c.lifecycle = {
        app: ["onLaunch", "onShow", "onHide"],
        page: ["onShow", "onHide"]
      };
      break;
    case "smart":
      c.methods = swan, c.sdk_type = "baiduminiprogram", c.lifecycle = {
        app: ["onLaunch", "onShow", "onHide"],
        page: ["onShow", "onHide"]
      }
  }
  var h = {
    wx: "wx",
    alipay: "ali",
    smart: "baidu"
  };
  c.getEnv = function() {
    return h[c.env]
  };
  var u = {
    config: {
      trackType: "track",
      path: {
        get: "/events/sdk/trace",
        post: "/events/sdk/trace"
      },
      apiMethod: "post",
      encryptMode: "default",
      apiHost: "https://v.qidian.qq.com",
      appkey: "",
      kfuin: "",
      appid: "",
      useId: !1,
      application: "",
      enable_compression: !1,
      track_interval: 5e3,
      batch_max_time: 8,
      url: "",
      session_interval: 18e5,
      autoTrack: {
        appLaunch: !0,
        appShow: !0,
        appHide: !0,
        pageShow: !0,
        pageHide: !0
      },
      property: {
        commonData: {},
        eventCommonData: {}
      }
    },
    accounts: {},
    idData: {},
    systemData: {},
    userDefineDataProperties: {},
    commonDataProperties: {},
    commonDataGlobel: {},
    eventDataProperties: {},
    pageData: {},
    setUserDefineData: function(t) {
      this.userDefineDataProperties = i(i({}, this.userDefineDataProperties), t)
    },
    setCommonData: function(t, e) {
      this.commonDataProperties = i(i({}, this.commonDataProperties), t), this.commonDataGlobel = i(i({}, this.commonDataGlobel), e)
    },
    setEventCommonData: function(t, e) {
      var n = this.eventDataProperties[t];
      this.eventDataProperties[t] = i(i({}, n), e)
    },
    setQdtData: function(t, e) {
      Object.keys(t || {}).forEach((function(n) {
        "title" !== n && t[n] && (e[n] = t[n])
      }))
    },
    setPageData: function(t) {
      this.pageData = t
    },
    setSystemData: function(t) {
      this.systemData = i(i({}, this.systemData), t)
    },
    getSystemData: function(t) {
      return this.systemData[t]
    },
    setConfig: function(t) {
      this.config = i(i({}, this.config), t)
    },
    getConfig: function(t) {
      return this.config[t]
    },
    setIdData: function(t) {
      this.idData = i(i({}, this.idData), t)
    },
    getIdData: function(t) {
      return this.idData[t]
    },
    getIDs: function() {
      return this.idData
    },
    setAccountInfo: function(t) {
      this.accounts = i(i({}, this.accounts), t)
    },
    getParams: function(t, e) {
      var n = this.getIdData("anonymous_id"),
        r = i({
          business_id: this.getIdData("bussid"),
          anonymous_id: n
        }, this.accounts);
      switch (c.env) {
        case "wx":
          r.wx_applet_openid = this.getIdData("openid"), r.wx_unionid = this.getIdData("unionid");
          break;
        case "smart":
          r.baidu_openid = this.getIdData("openid"), r.baidu_unionid = this.getIdData("unionid");
          break;
        case "alipay":
          r.ali_userid = this.getIdData("aliUserId")
      }
      return i({
        type: this.getConfig("trackType"),
        time: Math.floor(+new Date),
        properties: i(i(i(i(i(i({
          application: this.getConfig("application"),
          appid: this.getConfig("appid")
        }, this.systemData), this.pageData), this.commonDataProperties), this.userDefineDataProperties), this.eventDataProperties[e] || {}), t),
        account: r
      }, this.commonDataGlobel)
    },
    popupConfig: {},
    setPopupConfig: function(t) {
      this.popupConfig = i(i({}, this.popupConfig), t)
    },
    getPopupConfig: function(t) {
      return this.popupConfig[t]
    }
  };
  ! function(t) {
    var e = {},
      n = function() {},
      r = e.Base = {
        extend: function(t) {
          n.prototype = this;
          var e = new n;
          return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function() {
            e.$super.init.apply(this, arguments)
          }), e.init.prototype = e, e.$super = this, e
        },
        create: function() {
          var t = this.extend();
          return t.init.apply(t, arguments), t
        },
        init: function() {},
        mixIn: function(t) {
          for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
          t.hasOwnProperty("toString") && (this.toString = t.toString)
        },
        clone: function() {
          return this.init.prototype.extend(this)
        }
      },
      i = e.WordArray = r.extend({
        init: function(t, e) {
          t = this.words = t || [], this.sigBytes = null != e ? e : 4 * t.length
        },
        toString: function(t) {
          return (t || a).stringify(this)
        },
        concat: function(t) {
          var e = this.words,
            n = t.words,
            r = this.sigBytes;
          if (t = t.sigBytes, this.clamp(), r % 4)
            for (var i = 0; i < t; i++) e[r + i >>> 2] |= (n[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 24 - (r + i) % 4 * 8;
          else if (65535 < n.length)
            for (i = 0; i < t; i += 4) e[r + i >>> 2] = n[i >>> 2];
          else e.push.apply(e, n);
          return this.sigBytes += t, this
        },
        clamp: function() {
          var e = this.words,
            n = this.sigBytes;
          e[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, e.length = t.ceil(n / 4)
        },
        clone: function() {
          var t = r.clone.call(this);
          return t.words = this.words.slice(0), t
        },
        random: function(e) {
          for (var n = [], r = 0; r < e; r += 4) n.push(4294967296 * t.random() | 0);
          return new i.init(n, e)
        }
      }),
      o = {},
      a = o.Hex = {
        stringify: function(t) {
          var e = t.words;
          t = t.sigBytes;
          for (var n = [], r = 0; r < t; r++) {
            var i = e[r >>> 2] >>> 24 - r % 4 * 8 & 255;
            n.push((i >>> 4).toString(16)), n.push((15 & i).toString(16))
          }
          return n.join("")
        },
        parse: function(t) {
          for (var e = t.length, n = [], r = 0; r < e; r += 2) n[r >>> 3] |= parseInt(t.substr(r, 2), 16) << 24 - r % 8 * 4;
          return new i.init(n, e / 2)
        }
      },
      s = o.Latin1 = {
        stringify: function(t) {
          var e = t.words;
          t = t.sigBytes;
          for (var n = [], r = 0; r < t; r++) n.push(String.fromCharCode(e[r >>> 2] >>> 24 - r % 4 * 8 & 255));
          return n.join("")
        },
        parse: function(t) {
          for (var e = t.length, n = [], r = 0; r < e; r++) n[r >>> 2] |= (255 & t.charCodeAt(r)) << 24 - r % 4 * 8;
          return new i.init(n, e)
        }
      },
      c = o.Utf8 = {
        stringify: function(t) {
          try {
            return decodeURIComponent(escape(s.stringify(t)))
          } catch (t) {
            throw Error("Malformed UTF-8 data")
          }
        },
        parse: function(t) {
          return s.parse(unescape(encodeURIComponent(t)))
        }
      },
      h = e.BufferedBlockAlgorithm = r.extend({
        reset: function() {
          this._data = new i.init, this._nDataBytes = 0
        },
        _append: function(t) {
          "string" == typeof t && (t = c.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
        },
        _process: function(e) {
          var n = this._data,
            r = n.words,
            o = n.sigBytes,
            a = this.blockSize,
            s = o / (4 * a);
          if (e = (s = e ? t.ceil(s) : t.max((0 | s) - this._minBufferSize, 0)) * a, o = t.min(4 * e, o), e) {
            for (var c = 0; c < e; c += a) this._doProcessBlock(r, c);
            c = r.splice(0, e), n.sigBytes -= o
          }
          return new i.init(c, o)
        },
        clone: function() {
          var t = r.clone.call(this);
          return t._data = this._data.clone(), t
        },
        _minBufferSize: 0
      });
    e.Hasher = h.extend({
      cfg: r.extend(),
      init: function(t) {
        this.cfg = this.cfg.extend(t), this.reset()
      },
      reset: function() {
        h.reset.call(this), this._doReset()
      },
      update: function(t) {
        return this._append(t), this._process(), this
      },
      finalize: function(t) {
        return t && this._append(t), this._doFinalize()
      },
      blockSize: 16,
      _createHelper: function(t) {
        return function(e, n) {
          return new t.init(n).finalize(e)
        }
      },
      _createHmacHelper: function(t) {
        return function(e, n) {
          return new u.HMAC.init(t, n).finalize(e)
        }
      }
    });
    var u = {}
  }(Math);
  var f = {
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encode: function(t) {
        var e, n, r, i, o, a, s, c = "",
          h = 0;
        for (t = this._utf16to8(t); h < t.length;) i = (e = t.charCodeAt(h++)) >> 2, o = (3 & e) << 4 | (n = t.charCodeAt(h++)) >> 4, a = (15 & n) << 2 | (r = t.charCodeAt(h++)) >> 6, s = 63 & r, isNaN(n) ? a = s = 64 : isNaN(r) && (s = 64), c = c + this._keyStr.charAt(i) + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(s);
        return c
      },
      decode: function(t) {
        var e, n, r, i, o, a, s = "",
          c = 0;
        for (t = t.replace(/[^A-Za-z0-9+/=]/g, ""); c < t.length;) e = this._keyStr.indexOf(t.charAt(c++)) << 2 | (i = this._keyStr.indexOf(t.charAt(c++))) >> 4, n = (15 & i) << 4 | (o = this._keyStr.indexOf(t.charAt(c++))) >> 2, r = (3 & o) << 6 | (a = this._keyStr.indexOf(t.charAt(c++))), s += String.fromCharCode(e), 64 != o && (s += String.fromCharCode(n)), 64 != a && (s += String.fromCharCode(r));
        return this._utf8to16(s)
      },
      _utf16to8: function(t) {
        var e, n, r, i;
        for (e = "", r = t.length, n = 0; n < r; n++)(i = t.charCodeAt(n)) >= 1 && i <= 127 ? e += t.charAt(n) : i > 2047 ? (e += String.fromCharCode(224 | i >> 12 & 15), e += String.fromCharCode(128 | i >> 6 & 63), e += String.fromCharCode(128 | 63 & i)) : (e += String.fromCharCode(192 | i >> 6 & 31), e += String.fromCharCode(128 | 63 & i));
        return e
      },
      _utf8to16: function(t) {
        var e, n, r, i, o, a;
        for (e = "", r = t.length, n = 0; n < r;) switch ((i = t.charCodeAt(n++)) >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            e += t.charAt(n - 1);
            break;
          case 12:
          case 13:
            o = t.charCodeAt(n++), e += String.fromCharCode((31 & i) << 6 | 63 & o);
            break;
          case 14:
            o = t.charCodeAt(n++), a = t.charCodeAt(n++), e += String.fromCharCode((15 & i) << 12 | (63 & o) << 6 | 63 & a)
        }
        return e
      }
    },
    l = function() {
      this.max = 8192, this.queue = [], this.batchQueue = [], this.timerId = 0
    };
  l.prototype.run = function(t, e) {
    this.stopping = !1, this.Ping = t
  }, l.prototype.start = function() {
    this.stopping = !1, this.batchSend()
  }, l.prototype.stop = function() {
    this.stopping = !0
  }, l.prototype.push = function(t, e, n, r, i) {
    var o = this;
    this.track_interval = u.getConfig("track_interval") || 0, this.batchMaxTime = u.getConfig("batch_max_time") || 1, this.roundMaxTime = u.getConfig("round_max_time") || 1;
    var a, s, c = this.batchQueue.length,
      h = this.batchQueue[0],
      f = "batchSend";
    if (u.getConfig("debug") && console.log("[QDTRACKER_LOG]", "PingQueue.prototype.push", t, e, n, r, i), 1 !== this.batchMaxTime) {
      var l = i;
      h && (l = h.method), l !== i && (this.batchQueue.length && (a = this.createPing(t, this.batchQueue, 1, i), s = this.createPingCallback(this.batchQueue)), this.batchQueue = [], this.batchQueue.push({
        event: t,
        sendData: e,
        priority: n,
        cb: r,
        method: i
      })), c < this.batchMaxTime - 1 && l === i && this.batchQueue.push({
        event: t,
        sendData: e,
        priority: n,
        cb: r,
        method: i
      }), c === this.batchMaxTime - 1 && (this.batchQueue.push({
        event: t,
        sendData: e,
        priority: n,
        cb: r,
        method: i
      }), a = this.createPing(f, this.batchQueue, n, i), s = this.createPingCallback(this.batchQueue), this.batchQueue = []), this.timerId && clearTimeout(this.timerId), u.getConfig("debug") && console.log("[QDTRACKER_LOG]", "track_interval", this.track_interval), this.timerId = setTimeout((function() {
        u.getConfig("debug") && console.log("[QDTRACKER_LOG]", "setTimeout", o.batchQueue), o.batchQueue.length > 0 ? (a = o.createPing(f, o.batchQueue, n, i), s = o.createPingCallback(o.batchQueue), d(a, n, i, s)) : clearTimeout(o.timerId), o.batchQueue = [], o.timerId = null
      }), this.track_interval);
      var d = function(t, e, n, r) {
        if (!o.stopping)
          if (e && e > 1) o.Ping._send(t, r);
          else {
            var i = 1 === e;
            o.waitForSend(i, t, r)
          }
      };
      a && d(a, n, i, s)
    } else this.Ping._send([e], r)
  }, l.prototype.waitForSend = function(t, e, n) {
    var r = this;
    if (r.batchData = e, r.batchCallback = n, r.batchData.length && !r.heartBeat) {
      var i = t ? 200 : r.track_interval;
      u.getConfig("debug") && console.log("[QDTRACKER_LOG]", "waitForSend", i), r.heartBeat = setTimeout((function() {
        r.heartBeat = null, u.getConfig("debug") && console.log("[QDTRACKER_LOG]", "waitForSendtimeoutCallback", r.batchData), r.Ping._send(r.batchData, r.batchCallback)
      }), i)
    }
  }, l.prototype.createPing = function(t, e) {
    return e.map((function(t) {
      return t.sendData
    }))
  }, l.prototype.createPingCallback = function(t) {
    var e = t.map((function(t) {
      return t.cb
    }));
    return function(t, n) {
      e.forEach((function(e) {
        e && e(t, n)
      }))
    }
  }, l.prototype.remove = function() {
    this.heartBeat && (clearTimeout(this.heartBeat), this.heartBeat = null)
  };
  var d = {
    data: {},
    init: function() {
      try {
        var t;
        (t = "alipay" === c.env ? c.methods.getStorageSync({
          key: "__QDTracker__"
        }).data : c.methods.getStorageSync("__QDTracker__")) ? function(t) {
          try {
            JSON.parse(t)
          } catch (t) {
            return !1
          }
          return !0
        }(t) && (this.data = JSON.parse(t)) : "alipay" === c.env ? c.methods.setStorageSync({
          key: "__QDTracker__",
          data: JSON.stringify({})
        }) : c.methods.setStorageSync("__QDTracker__", JSON.stringify({}))
      } catch (t) {
        console.log("[QDTRACKER_ERROR]", "init localStorage", t)
      }
    },
    setValue: function(t, e, n) {
      this.data[t] = e, n && this.updateLocalStorage()
    },
    getValue: function(t) {
      return this.data[t] || ""
    },
    getCache: function() {
      return this.data
    },
    updateLocalStorage: function() {
      try {
        return "alipay" === c.env ? c.methods.setStorageSync({
          key: "__QDTracker__",
          data: JSON.stringify(this.data)
        }) : c.methods.setStorageSync("__QDTracker__", JSON.stringify(this.data)), !0
      } catch (t) {
        return console.log("[QDTRACKER_ERROR]", "update localStorage", t), !1
      }
    }
  };

  function p(t, e, n, r, i, o) {
    return m((a = m(m(e, t), m(r, o))) << (s = i) | a >>> 32 - s, n);
    var a, s
  }

  function g(t, e, n, r, i, o, a) {
    return p(e & n | ~e & r, t, e, i, o, a)
  }

  function v(t, e, n, r, i, o, a) {
    return p(e & r | n & ~r, t, e, i, o, a)
  }

  function _(t, e, n, r, i, o, a) {
    return p(e ^ n ^ r, t, e, i, o, a)
  }

  function y(t, e, n, r, i, o, a) {
    return p(n ^ (e | ~r), t, e, i, o, a)
  }

  function m(t, e) {
    var n = (65535 & t) + (65535 & e);
    return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
  }
  var k, w, S, b, C, B, D, x, A, P, H, R, E, O = {
    exports: {}
  };
  O.exports = (H = H || function(t) {
    var e = Object.create || function() {
        function t() {}
        return function(e) {
          var n;
          return t.prototype = e, n = new t, t.prototype = null, n
        }
      }(),
      n = {},
      r = n.lib = {},
      i = r.Base = {
        extend: function(t) {
          var n = e(this);
          return t && n.mixIn(t), n.hasOwnProperty("init") && this.init !== n.init || (n.init = function() {
            n.$super.init.apply(this, arguments)
          }), n.init.prototype = n, n.$super = this, n
        },
        create: function() {
          var t = this.extend();
          return t.init.apply(t, arguments), t
        },
        init: function() {},
        mixIn: function(t) {
          for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
          t.hasOwnProperty("toString") && (this.toString = t.toString)
        },
        clone: function() {
          return this.init.prototype.extend(this)
        }
      },
      o = r.WordArray = i.extend({
        init: function(t, e) {
          t = this.words = t || [], this.sigBytes = null != e ? e : 4 * t.length
        },
        toString: function(t) {
          return (t || s).stringify(this)
        },
        concat: function(t) {
          var e = this.words,
            n = t.words,
            r = this.sigBytes,
            i = t.sigBytes;
          if (this.clamp(), r % 4)
            for (var o = 0; o < i; o++) {
              var a = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
              e[r + o >>> 2] |= a << 24 - (r + o) % 4 * 8
            } else
              for (o = 0; o < i; o += 4) e[r + o >>> 2] = n[o >>> 2];
          return this.sigBytes += i, this
        },
        clamp: function() {
          var e = this.words,
            n = this.sigBytes;
          e[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, e.length = t.ceil(n / 4)
        },
        clone: function() {
          var t = i.clone.call(this);
          return t.words = this.words.slice(0), t
        },
        random: function(e) {
          for (var n, r = [], i = function(e) {
              var n = 987654321,
                r = 4294967295;
              return function() {
                var i = ((n = 36969 * (65535 & n) + (n >> 16) & r) << 16) + (e = 18e3 * (65535 & e) + (e >> 16) & r) & r;
                return i /= 4294967296, (i += .5) * (t.random() > .5 ? 1 : -1)
              }
            }, a = 0; a < e; a += 4) {
            var s = i(4294967296 * (n || t.random()));
            n = 987654071 * s(), r.push(4294967296 * s() | 0)
          }
          return new o.init(r, e)
        }
      }),
      a = n.enc = {},
      s = a.Hex = {
        stringify: function(t) {
          for (var e = t.words, n = t.sigBytes, r = [], i = 0; i < n; i++) {
            var o = e[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            r.push((o >>> 4).toString(16)), r.push((15 & o).toString(16))
          }
          return r.join("")
        },
        parse: function(t) {
          for (var e = t.length, n = [], r = 0; r < e; r += 2) n[r >>> 3] |= parseInt(t.substr(r, 2), 16) << 24 - r % 8 * 4;
          return new o.init(n, e / 2)
        }
      },
      c = a.Latin1 = {
        stringify: function(t) {
          for (var e = t.words, n = t.sigBytes, r = [], i = 0; i < n; i++) {
            var o = e[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            r.push(String.fromCharCode(o))
          }
          return r.join("")
        },
        parse: function(t) {
          for (var e = t.length, n = [], r = 0; r < e; r++) n[r >>> 2] |= (255 & t.charCodeAt(r)) << 24 - r % 4 * 8;
          return new o.init(n, e)
        }
      },
      h = a.Utf8 = {
        stringify: function(t) {
          try {
            return decodeURIComponent(escape(c.stringify(t)))
          } catch (t) {
            throw new Error("Malformed UTF-8 data")
          }
        },
        parse: function(t) {
          return c.parse(unescape(encodeURIComponent(t)))
        }
      },
      u = r.BufferedBlockAlgorithm = i.extend({
        reset: function() {
          this._data = new o.init, this._nDataBytes = 0
        },
        _append: function(t) {
          "string" == typeof t && (t = h.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
        },
        _process: function(e) {
          var n = this._data,
            r = n.words,
            i = n.sigBytes,
            a = this.blockSize,
            s = i / (4 * a),
            c = (s = e ? t.ceil(s) : t.max((0 | s) - this._minBufferSize, 0)) * a,
            h = t.min(4 * c, i);
          if (c) {
            for (var u = 0; u < c; u += a) this._doProcessBlock(r, u);
            var f = r.splice(0, c);
            n.sigBytes -= h
          }
          return new o.init(f, h)
        },
        clone: function() {
          var t = i.clone.call(this);
          return t._data = this._data.clone(), t
        },
        _minBufferSize: 0
      });
    r.Hasher = u.extend({
      cfg: i.extend(),
      init: function(t) {
        this.cfg = this.cfg.extend(t), this.reset()
      },
      reset: function() {
        u.reset.call(this), this._doReset()
      },
      update: function(t) {
        return this._append(t), this._process(), this
      },
      finalize: function(t) {
        return t && this._append(t), this._doFinalize()
      },
      blockSize: 16,
      _createHelper: function(t) {
        return function(e, n) {
          return new t.init(n).finalize(e)
        }
      },
      _createHmacHelper: function(t) {
        return function(e, n) {
          return new f.HMAC.init(t, n).finalize(e)
        }
      }
    });
    var f = n.algo = {};
    return n
  }(Math), E = (R = H).lib.WordArray, R.enc.Base64 = {
    stringify: function(t) {
      var e = t.words,
        n = t.sigBytes,
        r = this._map;
      t.clamp();
      for (var i = [], o = 0; o < n; o += 3)
        for (var a = (e[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, s = 0; s < 4 && o + .75 * s < n; s++) i.push(r.charAt(a >>> 6 * (3 - s) & 63));
      var c = r.charAt(64);
      if (c)
        for (; i.length % 4;) i.push(c);
      return i.join("")
    },
    parse: function(t) {
      var e = t.length,
        n = this._map,
        r = this._reverseMap;
      if (!r) {
        r = this._reverseMap = [];
        for (var i = 0; i < n.length; i++) r[n.charCodeAt(i)] = i
      }
      var o = n.charAt(64);
      if (o) {
        var a = t.indexOf(o); - 1 !== a && (e = a)
      }
      return function(t, e, n) {
        for (var r = [], i = 0, o = 0; o < e; o++)
          if (o % 4) {
            var a = n[t.charCodeAt(o - 1)] << o % 4 * 2,
              s = n[t.charCodeAt(o)] >>> 6 - o % 4 * 2;
            r[i >>> 2] |= (a | s) << 24 - i % 4 * 8, i++
          } return E.create(r, i)
      }(t, e, r)
    },
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  }, function(t) {
    var e = H,
      n = e.lib,
      r = n.WordArray,
      i = n.Hasher,
      o = e.algo,
      a = [];
    ! function() {
      for (var e = 0; e < 64; e++) a[e] = 4294967296 * t.abs(t.sin(e + 1)) | 0
    }();
    var s = o.MD5 = i.extend({
      _doReset: function() {
        this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878])
      },
      _doProcessBlock: function(t, e) {
        for (var n = 0; n < 16; n++) {
          var r = e + n,
            i = t[r];
          t[r] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
        }
        var o = this._hash.words,
          s = t[e + 0],
          l = t[e + 1],
          d = t[e + 2],
          p = t[e + 3],
          g = t[e + 4],
          v = t[e + 5],
          _ = t[e + 6],
          y = t[e + 7],
          m = t[e + 8],
          k = t[e + 9],
          w = t[e + 10],
          S = t[e + 11],
          b = t[e + 12],
          C = t[e + 13],
          B = t[e + 14],
          D = t[e + 15],
          x = o[0],
          A = o[1],
          P = o[2],
          H = o[3];
        x = c(x, A, P, H, s, 7, a[0]), H = c(H, x, A, P, l, 12, a[1]), P = c(P, H, x, A, d, 17, a[2]), A = c(A, P, H, x, p, 22, a[3]), x = c(x, A, P, H, g, 7, a[4]), H = c(H, x, A, P, v, 12, a[5]), P = c(P, H, x, A, _, 17, a[6]), A = c(A, P, H, x, y, 22, a[7]), x = c(x, A, P, H, m, 7, a[8]), H = c(H, x, A, P, k, 12, a[9]), P = c(P, H, x, A, w, 17, a[10]), A = c(A, P, H, x, S, 22, a[11]), x = c(x, A, P, H, b, 7, a[12]), H = c(H, x, A, P, C, 12, a[13]), P = c(P, H, x, A, B, 17, a[14]), x = h(x, A = c(A, P, H, x, D, 22, a[15]), P, H, l, 5, a[16]), H = h(H, x, A, P, _, 9, a[17]), P = h(P, H, x, A, S, 14, a[18]), A = h(A, P, H, x, s, 20, a[19]), x = h(x, A, P, H, v, 5, a[20]), H = h(H, x, A, P, w, 9, a[21]), P = h(P, H, x, A, D, 14, a[22]), A = h(A, P, H, x, g, 20, a[23]), x = h(x, A, P, H, k, 5, a[24]), H = h(H, x, A, P, B, 9, a[25]), P = h(P, H, x, A, p, 14, a[26]), A = h(A, P, H, x, m, 20, a[27]), x = h(x, A, P, H, C, 5, a[28]), H = h(H, x, A, P, d, 9, a[29]), P = h(P, H, x, A, y, 14, a[30]), x = u(x, A = h(A, P, H, x, b, 20, a[31]), P, H, v, 4, a[32]), H = u(H, x, A, P, m, 11, a[33]), P = u(P, H, x, A, S, 16, a[34]), A = u(A, P, H, x, B, 23, a[35]), x = u(x, A, P, H, l, 4, a[36]), H = u(H, x, A, P, g, 11, a[37]), P = u(P, H, x, A, y, 16, a[38]), A = u(A, P, H, x, w, 23, a[39]), x = u(x, A, P, H, C, 4, a[40]), H = u(H, x, A, P, s, 11, a[41]), P = u(P, H, x, A, p, 16, a[42]), A = u(A, P, H, x, _, 23, a[43]), x = u(x, A, P, H, k, 4, a[44]), H = u(H, x, A, P, b, 11, a[45]), P = u(P, H, x, A, D, 16, a[46]), x = f(x, A = u(A, P, H, x, d, 23, a[47]), P, H, s, 6, a[48]), H = f(H, x, A, P, y, 10, a[49]), P = f(P, H, x, A, B, 15, a[50]), A = f(A, P, H, x, v, 21, a[51]), x = f(x, A, P, H, b, 6, a[52]), H = f(H, x, A, P, p, 10, a[53]), P = f(P, H, x, A, w, 15, a[54]), A = f(A, P, H, x, l, 21, a[55]), x = f(x, A, P, H, m, 6, a[56]), H = f(H, x, A, P, D, 10, a[57]), P = f(P, H, x, A, _, 15, a[58]), A = f(A, P, H, x, C, 21, a[59]), x = f(x, A, P, H, g, 6, a[60]), H = f(H, x, A, P, S, 10, a[61]), P = f(P, H, x, A, d, 15, a[62]), A = f(A, P, H, x, k, 21, a[63]), o[0] = o[0] + x | 0, o[1] = o[1] + A | 0, o[2] = o[2] + P | 0, o[3] = o[3] + H | 0
      },
      _doFinalize: function() {
        var e = this._data,
          n = e.words,
          r = 8 * this._nDataBytes,
          i = 8 * e.sigBytes;
        n[i >>> 5] |= 128 << 24 - i % 32;
        var o = t.floor(r / 4294967296),
          a = r;
        n[15 + (i + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n[14 + (i + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), e.sigBytes = 4 * (n.length + 1), this._process();
        for (var s = this._hash, c = s.words, h = 0; h < 4; h++) {
          var u = c[h];
          c[h] = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8)
        }
        return s
      },
      clone: function() {
        var t = i.clone.call(this);
        return t._hash = this._hash.clone(), t
      }
    });

    function c(t, e, n, r, i, o, a) {
      var s = t + (e & n | ~e & r) + i + a;
      return (s << o | s >>> 32 - o) + e
    }

    function h(t, e, n, r, i, o, a) {
      var s = t + (e & r | n & ~r) + i + a;
      return (s << o | s >>> 32 - o) + e
    }

    function u(t, e, n, r, i, o, a) {
      var s = t + (e ^ n ^ r) + i + a;
      return (s << o | s >>> 32 - o) + e
    }

    function f(t, e, n, r, i, o, a) {
      var s = t + (n ^ (e | ~r)) + i + a;
      return (s << o | s >>> 32 - o) + e
    }
    e.MD5 = i._createHelper(s), e.HmacMD5 = i._createHmacHelper(s)
  }(Math), C = (b = H).lib, B = C.WordArray, D = C.Hasher, x = b.algo, A = [], P = x.SHA1 = D.extend({
    _doReset: function() {
      this._hash = new B.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
    },
    _doProcessBlock: function(t, e) {
      for (var n = this._hash.words, r = n[0], i = n[1], o = n[2], a = n[3], s = n[4], c = 0; c < 80; c++) {
        if (c < 16) A[c] = 0 | t[e + c];
        else {
          var h = A[c - 3] ^ A[c - 8] ^ A[c - 14] ^ A[c - 16];
          A[c] = h << 1 | h >>> 31
        }
        var u = (r << 5 | r >>> 27) + s + A[c];
        u += c < 20 ? 1518500249 + (i & o | ~i & a) : c < 40 ? 1859775393 + (i ^ o ^ a) : c < 60 ? (i & o | i & a | o & a) - 1894007588 : (i ^ o ^ a) - 899497514, s = a, a = o, o = i << 30 | i >>> 2, i = r, r = u
      }
      n[0] = n[0] + r | 0, n[1] = n[1] + i | 0, n[2] = n[2] + o | 0, n[3] = n[3] + a | 0, n[4] = n[4] + s | 0
    },
    _doFinalize: function() {
      var t = this._data,
        e = t.words,
        n = 8 * this._nDataBytes,
        r = 8 * t.sigBytes;
      return e[r >>> 5] |= 128 << 24 - r % 32, e[14 + (r + 64 >>> 9 << 4)] = Math.floor(n / 4294967296), e[15 + (r + 64 >>> 9 << 4)] = n, t.sigBytes = 4 * e.length, this._process(), this._hash
    },
    clone: function() {
      var t = D.clone.call(this);
      return t._hash = this._hash.clone(), t
    }
  }), b.SHA1 = D._createHelper(P), b.HmacSHA1 = D._createHmacHelper(P), function(t) {
    var e = H,
      n = e.lib,
      r = n.WordArray,
      i = n.Hasher,
      o = e.algo,
      a = [],
      s = [];
    ! function() {
      function e(e) {
        for (var n = t.sqrt(e), r = 2; r <= n; r++)
          if (!(e % r)) return !1;
        return !0
      }

      function n(t) {
        return 4294967296 * (t - (0 | t)) | 0
      }
      for (var r = 2, i = 0; i < 64;) e(r) && (i < 8 && (a[i] = n(t.pow(r, .5))), s[i] = n(t.pow(r, 1 / 3)), i++), r++
    }();
    var c = [],
      h = o.SHA256 = i.extend({
        _doReset: function() {
          this._hash = new r.init(a.slice(0))
        },
        _doProcessBlock: function(t, e) {
          for (var n = this._hash.words, r = n[0], i = n[1], o = n[2], a = n[3], h = n[4], u = n[5], f = n[6], l = n[7], d = 0; d < 64; d++) {
            if (d < 16) c[d] = 0 | t[e + d];
            else {
              var p = c[d - 15],
                g = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3,
                v = c[d - 2],
                _ = (v << 15 | v >>> 17) ^ (v << 13 | v >>> 19) ^ v >>> 10;
              c[d] = g + c[d - 7] + _ + c[d - 16]
            }
            var y = r & i ^ r & o ^ i & o,
              m = (r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22),
              k = l + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & u ^ ~h & f) + s[d] + c[d];
            l = f, f = u, u = h, h = a + k | 0, a = o, o = i, i = r, r = k + (m + y) | 0
          }
          n[0] = n[0] + r | 0, n[1] = n[1] + i | 0, n[2] = n[2] + o | 0, n[3] = n[3] + a | 0, n[4] = n[4] + h | 0, n[5] = n[5] + u | 0, n[6] = n[6] + f | 0, n[7] = n[7] + l | 0
        },
        _doFinalize: function() {
          var e = this._data,
            n = e.words,
            r = 8 * this._nDataBytes,
            i = 8 * e.sigBytes;
          return n[i >>> 5] |= 128 << 24 - i % 32, n[14 + (i + 64 >>> 9 << 4)] = t.floor(r / 4294967296), n[15 + (i + 64 >>> 9 << 4)] = r, e.sigBytes = 4 * n.length, this._process(), this._hash
        },
        clone: function() {
          var t = i.clone.call(this);
          return t._hash = this._hash.clone(), t
        }
      });
    e.SHA256 = i._createHelper(h), e.HmacSHA256 = i._createHmacHelper(h)
  }(Math), function() {
    var t = H,
      e = t.lib.WordArray,
      n = t.enc;

    function r(t) {
      return t << 8 & 4278255360 | t >>> 8 & 16711935
    }
    n.Utf16 = n.Utf16BE = {
      stringify: function(t) {
        for (var e = t.words, n = t.sigBytes, r = [], i = 0; i < n; i += 2) {
          var o = e[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
          r.push(String.fromCharCode(o))
        }
        return r.join("")
      },
      parse: function(t) {
        for (var n = t.length, r = [], i = 0; i < n; i++) r[i >>> 1] |= t.charCodeAt(i) << 16 - i % 2 * 16;
        return e.create(r, 2 * n)
      }
    }, n.Utf16LE = {
      stringify: function(t) {
        for (var e = t.words, n = t.sigBytes, i = [], o = 0; o < n; o += 2) {
          var a = r(e[o >>> 2] >>> 16 - o % 4 * 8 & 65535);
          i.push(String.fromCharCode(a))
        }
        return i.join("")
      },
      parse: function(t) {
        for (var n = t.length, i = [], o = 0; o < n; o++) i[o >>> 1] |= r(t.charCodeAt(o) << 16 - o % 2 * 16);
        return e.create(i, 2 * n)
      }
    }
  }(), function() {
    if ("function" == typeof ArrayBuffer) {
      var t = H.lib.WordArray,
        e = t.init;
      (t.init = function(t) {
        if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) {
          for (var n = t.byteLength, r = [], i = 0; i < n; i++) r[i >>> 2] |= t[i] << 24 - i % 4 * 8;
          e.call(this, r, n)
        } else e.apply(this, arguments)
      }).prototype = t
    }
  }(), function() {
    var t = H,
      e = t.lib,
      n = e.WordArray,
      r = e.Hasher,
      i = t.algo,
      o = n.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
      a = n.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
      s = n.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
      c = n.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
      h = n.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
      u = n.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
      f = i.RIPEMD160 = r.extend({
        _doReset: function() {
          this._hash = n.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
        },
        _doProcessBlock: function(t, e) {
          for (var n = 0; n < 16; n++) {
            var r = e + n,
              i = t[r];
            t[r] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
          }
          var f, y, m, k, w, S, b, C, B, D, x, A = this._hash.words,
            P = h.words,
            H = u.words,
            R = o.words,
            E = a.words,
            O = s.words,
            M = c.words;
          for (S = f = A[0], b = y = A[1], C = m = A[2], B = k = A[3], D = w = A[4], n = 0; n < 80; n += 1) x = f + t[e + R[n]] | 0, x += n < 16 ? l(y, m, k) + P[0] : n < 32 ? d(y, m, k) + P[1] : n < 48 ? p(y, m, k) + P[2] : n < 64 ? g(y, m, k) + P[3] : v(y, m, k) + P[4], x = (x = _(x |= 0, O[n])) + w | 0, f = w, w = k, k = _(m, 10), m = y, y = x, x = S + t[e + E[n]] | 0, x += n < 16 ? v(b, C, B) + H[0] : n < 32 ? g(b, C, B) + H[1] : n < 48 ? p(b, C, B) + H[2] : n < 64 ? d(b, C, B) + H[3] : l(b, C, B) + H[4], x = (x = _(x |= 0, M[n])) + D | 0, S = D, D = B, B = _(C, 10), C = b, b = x;
          x = A[1] + m + B | 0, A[1] = A[2] + k + D | 0, A[2] = A[3] + w + S | 0, A[3] = A[4] + f + b | 0, A[4] = A[0] + y + C | 0, A[0] = x
        },
        _doFinalize: function() {
          var t = this._data,
            e = t.words,
            n = 8 * this._nDataBytes,
            r = 8 * t.sigBytes;
          e[r >>> 5] |= 128 << 24 - r % 32, e[14 + (r + 64 >>> 9 << 4)] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8), t.sigBytes = 4 * (e.length + 1), this._process();
          for (var i = this._hash, o = i.words, a = 0; a < 5; a++) {
            var s = o[a];
            o[a] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8)
          }
          return i
        },
        clone: function() {
          var t = r.clone.call(this);
          return t._hash = this._hash.clone(), t
        }
      });

    function l(t, e, n) {
      return t ^ e ^ n
    }

    function d(t, e, n) {
      return t & e | ~t & n
    }

    function p(t, e, n) {
      return (t | ~e) ^ n
    }

    function g(t, e, n) {
      return t & n | e & ~n
    }

    function v(t, e, n) {
      return t ^ (e | ~n)
    }

    function _(t, e) {
      return t << e | t >>> 32 - e
    }
    t.RIPEMD160 = r._createHelper(f), t.HmacRIPEMD160 = r._createHmacHelper(f)
  }(), function() {
    var t = H,
      e = t.lib.Base,
      n = t.enc.Utf8;
    t.algo.HMAC = e.extend({
      init: function(t, e) {
        t = this._hasher = new t.init, "string" == typeof e && (e = n.parse(e));
        var r = t.blockSize,
          i = 4 * r;
        e.sigBytes > i && (e = t.finalize(e)), e.clamp();
        for (var o = this._oKey = e.clone(), a = this._iKey = e.clone(), s = o.words, c = a.words, h = 0; h < r; h++) s[h] ^= 1549556828, c[h] ^= 909522486;
        o.sigBytes = a.sigBytes = i, this.reset()
      },
      reset: function() {
        var t = this._hasher;
        t.reset(), t.update(this._iKey)
      },
      update: function(t) {
        return this._hasher.update(t), this
      },
      finalize: function(t) {
        var e = this._hasher,
          n = e.finalize(t);
        return e.reset(), e.finalize(this._oKey.clone().concat(n))
      }
    })
  }(), function() {
    var t = H,
      e = t.lib,
      n = e.Base,
      r = e.WordArray,
      i = t.algo,
      o = i.SHA1,
      a = i.HMAC,
      s = i.PBKDF2 = n.extend({
        cfg: n.extend({
          keySize: 4,
          hasher: o,
          iterations: 1
        }),
        init: function(t) {
          this.cfg = this.cfg.extend(t)
        },
        compute: function(t, e) {
          for (var n = this.cfg, i = a.create(n.hasher, t), o = r.create(), s = r.create([1]), c = o.words, h = s.words, u = n.keySize, f = n.iterations; c.length < u;) {
            var l = i.update(e).finalize(s);
            i.reset();
            for (var d = l.words, p = d.length, g = l, v = 1; v < f; v++) {
              g = i.finalize(g), i.reset();
              for (var _ = g.words, y = 0; y < p; y++) d[y] ^= _[y]
            }
            o.concat(l), h[0]++
          }
          return o.sigBytes = 4 * u, o
        }
      });
    t.PBKDF2 = function(t, e, n) {
      return s.create(n).compute(t, e)
    }
  }(), function() {
    var t = H,
      e = t.lib,
      n = e.Base,
      r = e.WordArray,
      i = t.algo,
      o = i.MD5,
      a = i.EvpKDF = n.extend({
        cfg: n.extend({
          keySize: 4,
          hasher: o,
          iterations: 1
        }),
        init: function(t) {
          this.cfg = this.cfg.extend(t)
        },
        compute: function(t, e) {
          for (var n = this.cfg, i = n.hasher.create(), o = r.create(), a = o.words, s = n.keySize, c = n.iterations; a.length < s;) {
            h && i.update(h);
            var h = i.update(t).finalize(e);
            i.reset();
            for (var u = 1; u < c; u++) h = i.finalize(h), i.reset();
            o.concat(h)
          }
          return o.sigBytes = 4 * s, o
        }
      });
    t.EvpKDF = function(t, e, n) {
      return a.create(n).compute(t, e)
    }
  }(), function() {
    var t = H,
      e = t.lib.WordArray,
      n = t.algo,
      r = n.SHA256,
      i = n.SHA224 = r.extend({
        _doReset: function() {
          this._hash = new e.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
        },
        _doFinalize: function() {
          var t = r._doFinalize.call(this);
          return t.sigBytes -= 4, t
        }
      });
    t.SHA224 = r._createHelper(i), t.HmacSHA224 = r._createHmacHelper(i)
  }(), function() {
    var t = H,
      e = t.lib,
      n = e.Base,
      r = e.WordArray,
      i = t.x64 = {};
    i.Word = n.extend({
      init: function(t, e) {
        this.high = t, this.low = e
      }
    }), i.WordArray = n.extend({
      init: function(t, e) {
        t = this.words = t || [], this.sigBytes = null != e ? e : 8 * t.length
      },
      toX32: function() {
        for (var t = this.words, e = t.length, n = [], i = 0; i < e; i++) {
          var o = t[i];
          n.push(o.high), n.push(o.low)
        }
        return r.create(n, this.sigBytes)
      },
      clone: function() {
        for (var t = n.clone.call(this), e = t.words = this.words.slice(0), r = e.length, i = 0; i < r; i++) e[i] = e[i].clone();
        return t
      }
    })
  }(), function(t) {
    var e = H,
      n = e.lib,
      r = n.WordArray,
      i = n.Hasher,
      o = e.x64.Word,
      a = e.algo,
      s = [],
      c = [],
      h = [];
    ! function() {
      for (var t = 1, e = 0, n = 0; n < 24; n++) {
        s[t + 5 * e] = (n + 1) * (n + 2) / 2 % 64;
        var r = (2 * t + 3 * e) % 5;
        t = e % 5, e = r
      }
      for (t = 0; t < 5; t++)
        for (e = 0; e < 5; e++) c[t + 5 * e] = e + (2 * t + 3 * e) % 5 * 5;
      for (var i = 1, a = 0; a < 24; a++) {
        for (var u = 0, f = 0, l = 0; l < 7; l++) {
          if (1 & i) {
            var d = (1 << l) - 1;
            d < 32 ? f ^= 1 << d : u ^= 1 << d - 32
          }
          128 & i ? i = i << 1 ^ 113 : i <<= 1
        }
        h[a] = o.create(u, f)
      }
    }();
    var u = [];
    ! function() {
      for (var t = 0; t < 25; t++) u[t] = o.create()
    }();
    var f = a.SHA3 = i.extend({
      cfg: i.cfg.extend({
        outputLength: 512
      }),
      _doReset: function() {
        for (var t = this._state = [], e = 0; e < 25; e++) t[e] = new o.init;
        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
      },
      _doProcessBlock: function(t, e) {
        for (var n = this._state, r = this.blockSize / 2, i = 0; i < r; i++) {
          var o = t[e + 2 * i],
            a = t[e + 2 * i + 1];
          o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), a = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), (A = n[i]).high ^= a, A.low ^= o
        }
        for (var f = 0; f < 24; f++) {
          for (var l = 0; l < 5; l++) {
            for (var d = 0, p = 0, g = 0; g < 5; g++) d ^= (A = n[l + 5 * g]).high, p ^= A.low;
            var v = u[l];
            v.high = d, v.low = p
          }
          for (l = 0; l < 5; l++) {
            var _ = u[(l + 4) % 5],
              y = u[(l + 1) % 5],
              m = y.high,
              k = y.low;
            for (d = _.high ^ (m << 1 | k >>> 31), p = _.low ^ (k << 1 | m >>> 31), g = 0; g < 5; g++)(A = n[l + 5 * g]).high ^= d, A.low ^= p
          }
          for (var w = 1; w < 25; w++) {
            var S = (A = n[w]).high,
              b = A.low,
              C = s[w];
            C < 32 ? (d = S << C | b >>> 32 - C, p = b << C | S >>> 32 - C) : (d = b << C - 32 | S >>> 64 - C, p = S << C - 32 | b >>> 64 - C);
            var B = u[c[w]];
            B.high = d, B.low = p
          }
          var D = u[0],
            x = n[0];
          for (D.high = x.high, D.low = x.low, l = 0; l < 5; l++)
            for (g = 0; g < 5; g++) {
              var A = n[w = l + 5 * g],
                P = u[w],
                H = u[(l + 1) % 5 + 5 * g],
                R = u[(l + 2) % 5 + 5 * g];
              A.high = P.high ^ ~H.high & R.high, A.low = P.low ^ ~H.low & R.low
            }
          A = n[0];
          var E = h[f];
          A.high ^= E.high, A.low ^= E.low
        }
      },
      _doFinalize: function() {
        var e = this._data,
          n = e.words;
        this._nDataBytes;
        var i = 8 * e.sigBytes,
          o = 32 * this.blockSize;
        n[i >>> 5] |= 1 << 24 - i % 32, n[(t.ceil((i + 1) / o) * o >>> 5) - 1] |= 128, e.sigBytes = 4 * n.length, this._process();
        for (var a = this._state, s = this.cfg.outputLength / 8, c = s / 8, h = [], u = 0; u < c; u++) {
          var f = a[u],
            l = f.high,
            d = f.low;
          l = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8), d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), h.push(d), h.push(l)
        }
        return new r.init(h, s)
      },
      clone: function() {
        for (var t = i.clone.call(this), e = t._state = this._state.slice(0), n = 0; n < 25; n++) e[n] = e[n].clone();
        return t
      }
    });
    e.SHA3 = i._createHelper(f), e.HmacSHA3 = i._createHmacHelper(f)
  }(Math), function() {
    var t = H,
      e = t.lib.Hasher,
      n = t.x64,
      r = n.Word,
      i = n.WordArray,
      o = t.algo;

    function a() {
      return r.create.apply(r, arguments)
    }
    var s = [a(1116352408, 3609767458), a(1899447441, 602891725), a(3049323471, 3964484399), a(3921009573, 2173295548), a(961987163, 4081628472), a(1508970993, 3053834265), a(2453635748, 2937671579), a(2870763221, 3664609560), a(3624381080, 2734883394), a(310598401, 1164996542), a(607225278, 1323610764), a(1426881987, 3590304994), a(1925078388, 4068182383), a(2162078206, 991336113), a(2614888103, 633803317), a(3248222580, 3479774868), a(3835390401, 2666613458), a(4022224774, 944711139), a(264347078, 2341262773), a(604807628, 2007800933), a(770255983, 1495990901), a(1249150122, 1856431235), a(1555081692, 3175218132), a(1996064986, 2198950837), a(2554220882, 3999719339), a(2821834349, 766784016), a(2952996808, 2566594879), a(3210313671, 3203337956), a(3336571891, 1034457026), a(3584528711, 2466948901), a(113926993, 3758326383), a(338241895, 168717936), a(666307205, 1188179964), a(773529912, 1546045734), a(1294757372, 1522805485), a(1396182291, 2643833823), a(1695183700, 2343527390), a(1986661051, 1014477480), a(2177026350, 1206759142), a(2456956037, 344077627), a(2730485921, 1290863460), a(2820302411, 3158454273), a(3259730800, 3505952657), a(3345764771, 106217008), a(3516065817, 3606008344), a(3600352804, 1432725776), a(4094571909, 1467031594), a(275423344, 851169720), a(430227734, 3100823752), a(506948616, 1363258195), a(659060556, 3750685593), a(883997877, 3785050280), a(958139571, 3318307427), a(1322822218, 3812723403), a(1537002063, 2003034995), a(1747873779, 3602036899), a(1955562222, 1575990012), a(2024104815, 1125592928), a(2227730452, 2716904306), a(2361852424, 442776044), a(2428436474, 593698344), a(2756734187, 3733110249), a(3204031479, 2999351573), a(3329325298, 3815920427), a(3391569614, 3928383900), a(3515267271, 566280711), a(3940187606, 3454069534), a(4118630271, 4000239992), a(116418474, 1914138554), a(174292421, 2731055270), a(289380356, 3203993006), a(460393269, 320620315), a(685471733, 587496836), a(852142971, 1086792851), a(1017036298, 365543100), a(1126000580, 2618297676), a(1288033470, 3409855158), a(1501505948, 4234509866), a(1607167915, 987167468), a(1816402316, 1246189591)],
      c = [];
    ! function() {
      for (var t = 0; t < 80; t++) c[t] = a()
    }();
    var h = o.SHA512 = e.extend({
      _doReset: function() {
        this._hash = new i.init([new r.init(1779033703, 4089235720), new r.init(3144134277, 2227873595), new r.init(1013904242, 4271175723), new r.init(2773480762, 1595750129), new r.init(1359893119, 2917565137), new r.init(2600822924, 725511199), new r.init(528734635, 4215389547), new r.init(1541459225, 327033209)])
      },
      _doProcessBlock: function(t, e) {
        for (var n = this._hash.words, r = n[0], i = n[1], o = n[2], a = n[3], h = n[4], u = n[5], f = n[6], l = n[7], d = r.high, p = r.low, g = i.high, v = i.low, _ = o.high, y = o.low, m = a.high, k = a.low, w = h.high, S = h.low, b = u.high, C = u.low, B = f.high, D = f.low, x = l.high, A = l.low, P = d, H = p, R = g, E = v, O = _, M = y, z = m, I = k, T = w, Q = S, U = b, j = C, F = B, $ = D, L = x, K = A, W = 0; W < 80; W++) {
          var N = c[W];
          if (W < 16) var q = N.high = 0 | t[e + 2 * W],
            V = N.low = 0 | t[e + 2 * W + 1];
          else {
            var G = c[W - 15],
              X = G.high,
              J = G.low,
              Z = (X >>> 1 | J << 31) ^ (X >>> 8 | J << 24) ^ X >>> 7,
              Y = (J >>> 1 | X << 31) ^ (J >>> 8 | X << 24) ^ (J >>> 7 | X << 25),
              tt = c[W - 2],
              et = tt.high,
              nt = tt.low,
              rt = (et >>> 19 | nt << 13) ^ (et << 3 | nt >>> 29) ^ et >>> 6,
              it = (nt >>> 19 | et << 13) ^ (nt << 3 | et >>> 29) ^ (nt >>> 6 | et << 26),
              ot = c[W - 7],
              at = ot.high,
              st = ot.low,
              ct = c[W - 16],
              ht = ct.high,
              ut = ct.low;
            q = (q = (q = Z + at + ((V = Y + st) >>> 0 < Y >>> 0 ? 1 : 0)) + rt + ((V += it) >>> 0 < it >>> 0 ? 1 : 0)) + ht + ((V += ut) >>> 0 < ut >>> 0 ? 1 : 0), N.high = q, N.low = V
          }
          var ft, lt = T & U ^ ~T & F,
            dt = Q & j ^ ~Q & $,
            pt = P & R ^ P & O ^ R & O,
            gt = H & E ^ H & M ^ E & M,
            vt = (P >>> 28 | H << 4) ^ (P << 30 | H >>> 2) ^ (P << 25 | H >>> 7),
            _t = (H >>> 28 | P << 4) ^ (H << 30 | P >>> 2) ^ (H << 25 | P >>> 7),
            yt = (T >>> 14 | Q << 18) ^ (T >>> 18 | Q << 14) ^ (T << 23 | Q >>> 9),
            mt = (Q >>> 14 | T << 18) ^ (Q >>> 18 | T << 14) ^ (Q << 23 | T >>> 9),
            kt = s[W],
            wt = kt.high,
            St = kt.low,
            bt = L + yt + ((ft = K + mt) >>> 0 < K >>> 0 ? 1 : 0),
            Ct = _t + gt;
          L = F, K = $, F = U, $ = j, U = T, j = Q, T = z + (bt = (bt = (bt = bt + lt + ((ft += dt) >>> 0 < dt >>> 0 ? 1 : 0)) + wt + ((ft += St) >>> 0 < St >>> 0 ? 1 : 0)) + q + ((ft += V) >>> 0 < V >>> 0 ? 1 : 0)) + ((Q = I + ft | 0) >>> 0 < I >>> 0 ? 1 : 0) | 0, z = O, I = M, O = R, M = E, R = P, E = H, P = bt + (vt + pt + (Ct >>> 0 < _t >>> 0 ? 1 : 0)) + ((H = ft + Ct | 0) >>> 0 < ft >>> 0 ? 1 : 0) | 0
        }
        p = r.low = p + H, r.high = d + P + (p >>> 0 < H >>> 0 ? 1 : 0), v = i.low = v + E, i.high = g + R + (v >>> 0 < E >>> 0 ? 1 : 0), y = o.low = y + M, o.high = _ + O + (y >>> 0 < M >>> 0 ? 1 : 0), k = a.low = k + I, a.high = m + z + (k >>> 0 < I >>> 0 ? 1 : 0), S = h.low = S + Q, h.high = w + T + (S >>> 0 < Q >>> 0 ? 1 : 0), C = u.low = C + j, u.high = b + U + (C >>> 0 < j >>> 0 ? 1 : 0), D = f.low = D + $, f.high = B + F + (D >>> 0 < $ >>> 0 ? 1 : 0), A = l.low = A + K, l.high = x + L + (A >>> 0 < K >>> 0 ? 1 : 0)
      },
      _doFinalize: function() {
        var t = this._data,
          e = t.words,
          n = 8 * this._nDataBytes,
          r = 8 * t.sigBytes;
        return e[r >>> 5] |= 128 << 24 - r % 32, e[30 + (r + 128 >>> 10 << 5)] = Math.floor(n / 4294967296), e[31 + (r + 128 >>> 10 << 5)] = n, t.sigBytes = 4 * e.length, this._process(), this._hash.toX32()
      },
      clone: function() {
        var t = e.clone.call(this);
        return t._hash = this._hash.clone(), t
      },
      blockSize: 32
    });
    t.SHA512 = e._createHelper(h), t.HmacSHA512 = e._createHmacHelper(h)
  }(), function() {
    var t = H,
      e = t.x64,
      n = e.Word,
      r = e.WordArray,
      i = t.algo,
      o = i.SHA512,
      a = i.SHA384 = o.extend({
        _doReset: function() {
          this._hash = new r.init([new n.init(3418070365, 3238371032), new n.init(1654270250, 914150663), new n.init(2438529370, 812702999), new n.init(355462360, 4144912697), new n.init(1731405415, 4290775857), new n.init(2394180231, 1750603025), new n.init(3675008525, 1694076839), new n.init(1203062813, 3204075428)])
        },
        _doFinalize: function() {
          var t = o._doFinalize.call(this);
          return t.sigBytes -= 16, t
        }
      });
    t.SHA384 = o._createHelper(a), t.HmacSHA384 = o._createHmacHelper(a)
  }(), H.lib.Cipher || function() {
    var t = H,
      e = t.lib,
      n = e.Base,
      r = e.WordArray,
      i = e.BufferedBlockAlgorithm,
      o = t.enc;
    o.Utf8;
    var a = o.Base64,
      s = t.algo.EvpKDF,
      c = e.Cipher = i.extend({
        cfg: n.extend(),
        createEncryptor: function(t, e) {
          return this.create(this._ENC_XFORM_MODE, t, e)
        },
        createDecryptor: function(t, e) {
          return this.create(this._DEC_XFORM_MODE, t, e)
        },
        init: function(t, e, n) {
          this.cfg = this.cfg.extend(n), this._xformMode = t, this._key = e, this.reset()
        },
        reset: function() {
          i.reset.call(this), this._doReset()
        },
        process: function(t) {
          return this._append(t), this._process()
        },
        finalize: function(t) {
          return t && this._append(t), this._doFinalize()
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function() {
          function t(t) {
            return "string" == typeof t ? _ : g
          }
          return function(e) {
            return {
              encrypt: function(n, r, i) {
                return t(r).encrypt(e, n, r, i)
              },
              decrypt: function(n, r, i) {
                return t(r).decrypt(e, n, r, i)
              }
            }
          }
        }()
      });
    e.StreamCipher = c.extend({
      _doFinalize: function() {
        return this._process(!0)
      },
      blockSize: 1
    });
    var h = t.mode = {},
      u = e.BlockCipherMode = n.extend({
        createEncryptor: function(t, e) {
          return this.Encryptor.create(t, e)
        },
        createDecryptor: function(t, e) {
          return this.Decryptor.create(t, e)
        },
        init: function(t, e) {
          this._cipher = t, this._iv = e
        }
      }),
      f = h.CBC = function() {
        var t = u.extend();

        function e(t, e, n) {
          var r = this._iv;
          if (r) {
            var i = r;
            this._iv = void 0
          } else i = this._prevBlock;
          for (var o = 0; o < n; o++) t[e + o] ^= i[o]
        }
        return t.Encryptor = t.extend({
          processBlock: function(t, n) {
            var r = this._cipher,
              i = r.blockSize;
            e.call(this, t, n, i), r.encryptBlock(t, n), this._prevBlock = t.slice(n, n + i)
          }
        }), t.Decryptor = t.extend({
          processBlock: function(t, n) {
            var r = this._cipher,
              i = r.blockSize,
              o = t.slice(n, n + i);
            r.decryptBlock(t, n), e.call(this, t, n, i), this._prevBlock = o
          }
        }), t
      }(),
      l = (t.pad = {}).Pkcs7 = {
        pad: function(t, e) {
          for (var n = 4 * e, i = n - t.sigBytes % n, o = i << 24 | i << 16 | i << 8 | i, a = [], s = 0; s < i; s += 4) a.push(o);
          var c = r.create(a, i);
          t.concat(c)
        },
        unpad: function(t) {
          var e = 255 & t.words[t.sigBytes - 1 >>> 2];
          t.sigBytes -= e
        }
      };
    e.BlockCipher = c.extend({
      cfg: c.cfg.extend({
        mode: f,
        padding: l
      }),
      reset: function() {
        c.reset.call(this);
        var t = this.cfg,
          e = t.iv,
          n = t.mode;
        if (this._xformMode == this._ENC_XFORM_MODE) var r = n.createEncryptor;
        else r = n.createDecryptor, this._minBufferSize = 1;
        this._mode && this._mode.__creator == r ? this._mode.init(this, e && e.words) : (this._mode = r.call(n, this, e && e.words), this._mode.__creator = r)
      },
      _doProcessBlock: function(t, e) {
        this._mode.processBlock(t, e)
      },
      _doFinalize: function() {
        var t = this.cfg.padding;
        if (this._xformMode == this._ENC_XFORM_MODE) {
          t.pad(this._data, this.blockSize);
          var e = this._process(!0)
        } else e = this._process(!0), t.unpad(e);
        return e
      },
      blockSize: 4
    });
    var d = e.CipherParams = n.extend({
        init: function(t) {
          this.mixIn(t)
        },
        toString: function(t) {
          return (t || this.formatter).stringify(this)
        }
      }),
      p = (t.format = {}).OpenSSL = {
        stringify: function(t) {
          var e = t.ciphertext,
            n = t.salt;
          if (n) var i = r.create([1398893684, 1701076831]).concat(n).concat(e);
          else i = e;
          return i.toString(a)
        },
        parse: function(t) {
          var e = a.parse(t),
            n = e.words;
          if (1398893684 == n[0] && 1701076831 == n[1]) {
            var i = r.create(n.slice(2, 4));
            n.splice(0, 4), e.sigBytes -= 16
          }
          return d.create({
            ciphertext: e,
            salt: i
          })
        }
      },
      g = e.SerializableCipher = n.extend({
        cfg: n.extend({
          format: p
        }),
        encrypt: function(t, e, n, r) {
          r = this.cfg.extend(r);
          var i = t.createEncryptor(n, r),
            o = i.finalize(e),
            a = i.cfg;
          return d.create({
            ciphertext: o,
            key: n,
            iv: a.iv,
            algorithm: t,
            mode: a.mode,
            padding: a.padding,
            blockSize: t.blockSize,
            formatter: r.format
          })
        },
        decrypt: function(t, e, n, r) {
          return r = this.cfg.extend(r), e = this._parse(e, r.format), t.createDecryptor(n, r).finalize(e.ciphertext)
        },
        _parse: function(t, e) {
          return "string" == typeof t ? e.parse(t, this) : t
        }
      }),
      v = (t.kdf = {}).OpenSSL = {
        execute: function(t, e, n, i) {
          i || (i = r.random(8));
          var o = s.create({
              keySize: e + n
            }).compute(t, i),
            a = r.create(o.words.slice(e), 4 * n);
          return o.sigBytes = 4 * e, d.create({
            key: o,
            iv: a,
            salt: i
          })
        }
      },
      _ = e.PasswordBasedCipher = g.extend({
        cfg: g.cfg.extend({
          kdf: v
        }),
        encrypt: function(t, e, n, r) {
          var i = (r = this.cfg.extend(r)).kdf.execute(n, t.keySize, t.ivSize);
          r.iv = i.iv;
          var o = g.encrypt.call(this, t, e, i.key, r);
          return o.mixIn(i), o
        },
        decrypt: function(t, e, n, r) {
          r = this.cfg.extend(r), e = this._parse(e, r.format);
          var i = r.kdf.execute(n, t.keySize, t.ivSize, e.salt);
          return r.iv = i.iv, g.decrypt.call(this, t, e, i.key, r)
        }
      })
  }(), H.mode.CFB = function() {
    var t = H.lib.BlockCipherMode.extend();

    function e(t, e, n, r) {
      var i = this._iv;
      if (i) {
        var o = i.slice(0);
        this._iv = void 0
      } else o = this._prevBlock;
      r.encryptBlock(o, 0);
      for (var a = 0; a < n; a++) t[e + a] ^= o[a]
    }
    return t.Encryptor = t.extend({
      processBlock: function(t, n) {
        var r = this._cipher,
          i = r.blockSize;
        e.call(this, t, n, i, r), this._prevBlock = t.slice(n, n + i)
      }
    }), t.Decryptor = t.extend({
      processBlock: function(t, n) {
        var r = this._cipher,
          i = r.blockSize,
          o = t.slice(n, n + i);
        e.call(this, t, n, i, r), this._prevBlock = o
      }
    }), t
  }(), H.mode.ECB = ((S = H.lib.BlockCipherMode.extend()).Encryptor = S.extend({
    processBlock: function(t, e) {
      this._cipher.encryptBlock(t, e)
    }
  }), S.Decryptor = S.extend({
    processBlock: function(t, e) {
      this._cipher.decryptBlock(t, e)
    }
  }), S), H.pad.AnsiX923 = {
    pad: function(t, e) {
      var n = t.sigBytes,
        r = 4 * e,
        i = r - n % r,
        o = n + i - 1;
      t.clamp(), t.words[o >>> 2] |= i << 24 - o % 4 * 8, t.sigBytes += i
    },
    unpad: function(t) {
      var e = 255 & t.words[t.sigBytes - 1 >>> 2];
      t.sigBytes -= e
    }
  }, H.pad.Iso10126 = {
    pad: function(t, e) {
      var n = 4 * e,
        r = n - t.sigBytes % n;
      t.concat(H.lib.WordArray.random(r - 1)).concat(H.lib.WordArray.create([r << 24], 1))
    },
    unpad: function(t) {
      var e = 255 & t.words[t.sigBytes - 1 >>> 2];
      t.sigBytes -= e
    }
  }, H.pad.Iso97971 = {
    pad: function(t, e) {
      t.concat(H.lib.WordArray.create([2147483648], 1)), H.pad.ZeroPadding.pad(t, e)
    },
    unpad: function(t) {
      H.pad.ZeroPadding.unpad(t), t.sigBytes--
    }
  }, H.mode.OFB = (w = (k = H.lib.BlockCipherMode.extend()).Encryptor = k.extend({
    processBlock: function(t, e) {
      var n = this._cipher,
        r = n.blockSize,
        i = this._iv,
        o = this._keystream;
      i && (o = this._keystream = i.slice(0), this._iv = void 0), n.encryptBlock(o, 0);
      for (var a = 0; a < r; a++) t[e + a] ^= o[a]
    }
  }), k.Decryptor = w, k), H.pad.NoPadding = {
    pad: function() {},
    unpad: function() {}
  }, function() {
    var t = H,
      e = t.lib.CipherParams,
      n = t.enc.Hex;
    t.format.Hex = {
      stringify: function(t) {
        return t.ciphertext.toString(n)
      },
      parse: function(t) {
        var r = n.parse(t);
        return e.create({
          ciphertext: r
        })
      }
    }
  }(), function() {
    var t = H,
      e = t.lib.BlockCipher,
      n = t.algo,
      r = [],
      i = [],
      o = [],
      a = [],
      s = [],
      c = [],
      h = [],
      u = [],
      f = [],
      l = [];
    ! function() {
      for (var t = [], e = 0; e < 256; e++) t[e] = e < 128 ? e << 1 : e << 1 ^ 283;
      var n = 0,
        d = 0;
      for (e = 0; e < 256; e++) {
        var p = d ^ d << 1 ^ d << 2 ^ d << 3 ^ d << 4;
        p = p >>> 8 ^ 255 & p ^ 99, r[n] = p, i[p] = n;
        var g = t[n],
          v = t[g],
          _ = t[v],
          y = 257 * t[p] ^ 16843008 * p;
        o[n] = y << 24 | y >>> 8, a[n] = y << 16 | y >>> 16, s[n] = y << 8 | y >>> 24, c[n] = y, y = 16843009 * _ ^ 65537 * v ^ 257 * g ^ 16843008 * n, h[p] = y << 24 | y >>> 8, u[p] = y << 16 | y >>> 16, f[p] = y << 8 | y >>> 24, l[p] = y, n ? (n = g ^ t[t[t[_ ^ g]]], d ^= t[t[d]]) : n = d = 1
      }
    }();
    var d = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
      p = n.AES = e.extend({
        _doReset: function() {
          if (!this._nRounds || this._keyPriorReset !== this._key) {
            for (var t = this._keyPriorReset = this._key, e = t.words, n = t.sigBytes / 4, i = 4 * ((this._nRounds = n + 6) + 1), o = this._keySchedule = [], a = 0; a < i; a++)
              if (a < n) o[a] = e[a];
              else {
                var s = o[a - 1];
                a % n ? n > 6 && a % n == 4 && (s = r[s >>> 24] << 24 | r[s >>> 16 & 255] << 16 | r[s >>> 8 & 255] << 8 | r[255 & s]) : (s = r[(s = s << 8 | s >>> 24) >>> 24] << 24 | r[s >>> 16 & 255] << 16 | r[s >>> 8 & 255] << 8 | r[255 & s], s ^= d[a / n | 0] << 24), o[a] = o[a - n] ^ s
              } for (var c = this._invKeySchedule = [], p = 0; p < i; p++) a = i - p, s = p % 4 ? o[a] : o[a - 4], c[p] = p < 4 || a <= 4 ? s : h[r[s >>> 24]] ^ u[r[s >>> 16 & 255]] ^ f[r[s >>> 8 & 255]] ^ l[r[255 & s]]
          }
        },
        encryptBlock: function(t, e) {
          this._doCryptBlock(t, e, this._keySchedule, o, a, s, c, r)
        },
        decryptBlock: function(t, e) {
          var n = t[e + 1];
          t[e + 1] = t[e + 3], t[e + 3] = n, this._doCryptBlock(t, e, this._invKeySchedule, h, u, f, l, i), n = t[e + 1], t[e + 1] = t[e + 3], t[e + 3] = n
        },
        _doCryptBlock: function(t, e, n, r, i, o, a, s) {
          for (var c = this._nRounds, h = t[e] ^ n[0], u = t[e + 1] ^ n[1], f = t[e + 2] ^ n[2], l = t[e + 3] ^ n[3], d = 4, p = 1; p < c; p++) {
            var g = r[h >>> 24] ^ i[u >>> 16 & 255] ^ o[f >>> 8 & 255] ^ a[255 & l] ^ n[d++],
              v = r[u >>> 24] ^ i[f >>> 16 & 255] ^ o[l >>> 8 & 255] ^ a[255 & h] ^ n[d++],
              _ = r[f >>> 24] ^ i[l >>> 16 & 255] ^ o[h >>> 8 & 255] ^ a[255 & u] ^ n[d++],
              y = r[l >>> 24] ^ i[h >>> 16 & 255] ^ o[u >>> 8 & 255] ^ a[255 & f] ^ n[d++];
            h = g, u = v, f = _, l = y
          }
          g = (s[h >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[255 & l]) ^ n[d++], v = (s[u >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[255 & h]) ^ n[d++], _ = (s[f >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[h >>> 8 & 255] << 8 | s[255 & u]) ^ n[d++], y = (s[l >>> 24] << 24 | s[h >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & f]) ^ n[d++], t[e] = g, t[e + 1] = v, t[e + 2] = _, t[e + 3] = y
        },
        keySize: 8
      });
    t.AES = e._createHelper(p)
  }(), function() {
    var t = H,
      e = t.lib,
      n = e.WordArray,
      r = e.BlockCipher,
      i = t.algo,
      o = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
      a = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
      s = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
      c = [{
        0: 8421888,
        268435456: 32768,
        536870912: 8421378,
        805306368: 2,
        1073741824: 512,
        1342177280: 8421890,
        1610612736: 8389122,
        1879048192: 8388608,
        2147483648: 514,
        2415919104: 8389120,
        2684354560: 33280,
        2952790016: 8421376,
        3221225472: 32770,
        3489660928: 8388610,
        3758096384: 0,
        4026531840: 33282,
        134217728: 0,
        402653184: 8421890,
        671088640: 33282,
        939524096: 32768,
        1207959552: 8421888,
        1476395008: 512,
        1744830464: 8421378,
        2013265920: 2,
        2281701376: 8389120,
        2550136832: 33280,
        2818572288: 8421376,
        3087007744: 8389122,
        3355443200: 8388610,
        3623878656: 32770,
        3892314112: 514,
        4160749568: 8388608,
        1: 32768,
        268435457: 2,
        536870913: 8421888,
        805306369: 8388608,
        1073741825: 8421378,
        1342177281: 33280,
        1610612737: 512,
        1879048193: 8389122,
        2147483649: 8421890,
        2415919105: 8421376,
        2684354561: 8388610,
        2952790017: 33282,
        3221225473: 514,
        3489660929: 8389120,
        3758096385: 32770,
        4026531841: 0,
        134217729: 8421890,
        402653185: 8421376,
        671088641: 8388608,
        939524097: 512,
        1207959553: 32768,
        1476395009: 8388610,
        1744830465: 2,
        2013265921: 33282,
        2281701377: 32770,
        2550136833: 8389122,
        2818572289: 514,
        3087007745: 8421888,
        3355443201: 8389120,
        3623878657: 0,
        3892314113: 33280,
        4160749569: 8421378
      }, {
        0: 1074282512,
        16777216: 16384,
        33554432: 524288,
        50331648: 1074266128,
        67108864: 1073741840,
        83886080: 1074282496,
        100663296: 1073758208,
        117440512: 16,
        134217728: 540672,
        150994944: 1073758224,
        167772160: 1073741824,
        184549376: 540688,
        201326592: 524304,
        218103808: 0,
        234881024: 16400,
        251658240: 1074266112,
        8388608: 1073758208,
        25165824: 540688,
        41943040: 16,
        58720256: 1073758224,
        75497472: 1074282512,
        92274688: 1073741824,
        109051904: 524288,
        125829120: 1074266128,
        142606336: 524304,
        159383552: 0,
        176160768: 16384,
        192937984: 1074266112,
        209715200: 1073741840,
        226492416: 540672,
        243269632: 1074282496,
        260046848: 16400,
        268435456: 0,
        285212672: 1074266128,
        301989888: 1073758224,
        318767104: 1074282496,
        335544320: 1074266112,
        352321536: 16,
        369098752: 540688,
        385875968: 16384,
        402653184: 16400,
        419430400: 524288,
        436207616: 524304,
        452984832: 1073741840,
        469762048: 540672,
        486539264: 1073758208,
        503316480: 1073741824,
        520093696: 1074282512,
        276824064: 540688,
        293601280: 524288,
        310378496: 1074266112,
        327155712: 16384,
        343932928: 1073758208,
        360710144: 1074282512,
        377487360: 16,
        394264576: 1073741824,
        411041792: 1074282496,
        427819008: 1073741840,
        444596224: 1073758224,
        461373440: 524304,
        478150656: 0,
        494927872: 16400,
        511705088: 1074266128,
        528482304: 540672
      }, {
        0: 260,
        1048576: 0,
        2097152: 67109120,
        3145728: 65796,
        4194304: 65540,
        5242880: 67108868,
        6291456: 67174660,
        7340032: 67174400,
        8388608: 67108864,
        9437184: 67174656,
        10485760: 65792,
        11534336: 67174404,
        12582912: 67109124,
        13631488: 65536,
        14680064: 4,
        15728640: 256,
        524288: 67174656,
        1572864: 67174404,
        2621440: 0,
        3670016: 67109120,
        4718592: 67108868,
        5767168: 65536,
        6815744: 65540,
        7864320: 260,
        8912896: 4,
        9961472: 256,
        11010048: 67174400,
        12058624: 65796,
        13107200: 65792,
        14155776: 67109124,
        15204352: 67174660,
        16252928: 67108864,
        16777216: 67174656,
        17825792: 65540,
        18874368: 65536,
        19922944: 67109120,
        20971520: 256,
        22020096: 67174660,
        23068672: 67108868,
        24117248: 0,
        25165824: 67109124,
        26214400: 67108864,
        27262976: 4,
        28311552: 65792,
        29360128: 67174400,
        30408704: 260,
        31457280: 65796,
        32505856: 67174404,
        17301504: 67108864,
        18350080: 260,
        19398656: 67174656,
        20447232: 0,
        21495808: 65540,
        22544384: 67109120,
        23592960: 256,
        24641536: 67174404,
        25690112: 65536,
        26738688: 67174660,
        27787264: 65796,
        28835840: 67108868,
        29884416: 67109124,
        30932992: 67174400,
        31981568: 4,
        33030144: 65792
      }, {
        0: 2151682048,
        65536: 2147487808,
        131072: 4198464,
        196608: 2151677952,
        262144: 0,
        327680: 4198400,
        393216: 2147483712,
        458752: 4194368,
        524288: 2147483648,
        589824: 4194304,
        655360: 64,
        720896: 2147487744,
        786432: 2151678016,
        851968: 4160,
        917504: 4096,
        983040: 2151682112,
        32768: 2147487808,
        98304: 64,
        163840: 2151678016,
        229376: 2147487744,
        294912: 4198400,
        360448: 2151682112,
        425984: 0,
        491520: 2151677952,
        557056: 4096,
        622592: 2151682048,
        688128: 4194304,
        753664: 4160,
        819200: 2147483648,
        884736: 4194368,
        950272: 4198464,
        1015808: 2147483712,
        1048576: 4194368,
        1114112: 4198400,
        1179648: 2147483712,
        1245184: 0,
        1310720: 4160,
        1376256: 2151678016,
        1441792: 2151682048,
        1507328: 2147487808,
        1572864: 2151682112,
        1638400: 2147483648,
        1703936: 2151677952,
        1769472: 4198464,
        1835008: 2147487744,
        1900544: 4194304,
        1966080: 64,
        2031616: 4096,
        1081344: 2151677952,
        1146880: 2151682112,
        1212416: 0,
        1277952: 4198400,
        1343488: 4194368,
        1409024: 2147483648,
        1474560: 2147487808,
        1540096: 64,
        1605632: 2147483712,
        1671168: 4096,
        1736704: 2147487744,
        1802240: 2151678016,
        1867776: 4160,
        1933312: 2151682048,
        1998848: 4194304,
        2064384: 4198464
      }, {
        0: 128,
        4096: 17039360,
        8192: 262144,
        12288: 536870912,
        16384: 537133184,
        20480: 16777344,
        24576: 553648256,
        28672: 262272,
        32768: 16777216,
        36864: 537133056,
        40960: 536871040,
        45056: 553910400,
        49152: 553910272,
        53248: 0,
        57344: 17039488,
        61440: 553648128,
        2048: 17039488,
        6144: 553648256,
        10240: 128,
        14336: 17039360,
        18432: 262144,
        22528: 537133184,
        26624: 553910272,
        30720: 536870912,
        34816: 537133056,
        38912: 0,
        43008: 553910400,
        47104: 16777344,
        51200: 536871040,
        55296: 553648128,
        59392: 16777216,
        63488: 262272,
        65536: 262144,
        69632: 128,
        73728: 536870912,
        77824: 553648256,
        81920: 16777344,
        86016: 553910272,
        90112: 537133184,
        94208: 16777216,
        98304: 553910400,
        102400: 553648128,
        106496: 17039360,
        110592: 537133056,
        114688: 262272,
        118784: 536871040,
        122880: 0,
        126976: 17039488,
        67584: 553648256,
        71680: 16777216,
        75776: 17039360,
        79872: 537133184,
        83968: 536870912,
        88064: 17039488,
        92160: 128,
        96256: 553910272,
        100352: 262272,
        104448: 553910400,
        108544: 0,
        112640: 553648128,
        116736: 16777344,
        120832: 262144,
        124928: 537133056,
        129024: 536871040
      }, {
        0: 268435464,
        256: 8192,
        512: 270532608,
        768: 270540808,
        1024: 268443648,
        1280: 2097152,
        1536: 2097160,
        1792: 268435456,
        2048: 0,
        2304: 268443656,
        2560: 2105344,
        2816: 8,
        3072: 270532616,
        3328: 2105352,
        3584: 8200,
        3840: 270540800,
        128: 270532608,
        384: 270540808,
        640: 8,
        896: 2097152,
        1152: 2105352,
        1408: 268435464,
        1664: 268443648,
        1920: 8200,
        2176: 2097160,
        2432: 8192,
        2688: 268443656,
        2944: 270532616,
        3200: 0,
        3456: 270540800,
        3712: 2105344,
        3968: 268435456,
        4096: 268443648,
        4352: 270532616,
        4608: 270540808,
        4864: 8200,
        5120: 2097152,
        5376: 268435456,
        5632: 268435464,
        5888: 2105344,
        6144: 2105352,
        6400: 0,
        6656: 8,
        6912: 270532608,
        7168: 8192,
        7424: 268443656,
        7680: 270540800,
        7936: 2097160,
        4224: 8,
        4480: 2105344,
        4736: 2097152,
        4992: 268435464,
        5248: 268443648,
        5504: 8200,
        5760: 270540808,
        6016: 270532608,
        6272: 270540800,
        6528: 270532616,
        6784: 8192,
        7040: 2105352,
        7296: 2097160,
        7552: 0,
        7808: 268435456,
        8064: 268443656
      }, {
        0: 1048576,
        16: 33555457,
        32: 1024,
        48: 1049601,
        64: 34604033,
        80: 0,
        96: 1,
        112: 34603009,
        128: 33555456,
        144: 1048577,
        160: 33554433,
        176: 34604032,
        192: 34603008,
        208: 1025,
        224: 1049600,
        240: 33554432,
        8: 34603009,
        24: 0,
        40: 33555457,
        56: 34604032,
        72: 1048576,
        88: 33554433,
        104: 33554432,
        120: 1025,
        136: 1049601,
        152: 33555456,
        168: 34603008,
        184: 1048577,
        200: 1024,
        216: 34604033,
        232: 1,
        248: 1049600,
        256: 33554432,
        272: 1048576,
        288: 33555457,
        304: 34603009,
        320: 1048577,
        336: 33555456,
        352: 34604032,
        368: 1049601,
        384: 1025,
        400: 34604033,
        416: 1049600,
        432: 1,
        448: 0,
        464: 34603008,
        480: 33554433,
        496: 1024,
        264: 1049600,
        280: 33555457,
        296: 34603009,
        312: 1,
        328: 33554432,
        344: 1048576,
        360: 1025,
        376: 34604032,
        392: 33554433,
        408: 34603008,
        424: 0,
        440: 34604033,
        456: 1049601,
        472: 1024,
        488: 33555456,
        504: 1048577
      }, {
        0: 134219808,
        1: 131072,
        2: 134217728,
        3: 32,
        4: 131104,
        5: 134350880,
        6: 134350848,
        7: 2048,
        8: 134348800,
        9: 134219776,
        10: 133120,
        11: 134348832,
        12: 2080,
        13: 0,
        14: 134217760,
        15: 133152,
        2147483648: 2048,
        2147483649: 134350880,
        2147483650: 134219808,
        2147483651: 134217728,
        2147483652: 134348800,
        2147483653: 133120,
        2147483654: 133152,
        2147483655: 32,
        2147483656: 134217760,
        2147483657: 2080,
        2147483658: 131104,
        2147483659: 134350848,
        2147483660: 0,
        2147483661: 134348832,
        2147483662: 134219776,
        2147483663: 131072,
        16: 133152,
        17: 134350848,
        18: 32,
        19: 2048,
        20: 134219776,
        21: 134217760,
        22: 134348832,
        23: 131072,
        24: 0,
        25: 131104,
        26: 134348800,
        27: 134219808,
        28: 134350880,
        29: 133120,
        30: 2080,
        31: 134217728,
        2147483664: 131072,
        2147483665: 2048,
        2147483666: 134348832,
        2147483667: 133152,
        2147483668: 32,
        2147483669: 134348800,
        2147483670: 134217728,
        2147483671: 134219808,
        2147483672: 134350880,
        2147483673: 134217760,
        2147483674: 134219776,
        2147483675: 0,
        2147483676: 133120,
        2147483677: 2080,
        2147483678: 131104,
        2147483679: 134350848
      }],
      h = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
      u = i.DES = r.extend({
        _doReset: function() {
          for (var t = this._key.words, e = [], n = 0; n < 56; n++) {
            var r = o[n] - 1;
            e[n] = t[r >>> 5] >>> 31 - r % 32 & 1
          }
          for (var i = this._subKeys = [], c = 0; c < 16; c++) {
            var h = i[c] = [],
              u = s[c];
            for (n = 0; n < 24; n++) h[n / 6 | 0] |= e[(a[n] - 1 + u) % 28] << 31 - n % 6, h[4 + (n / 6 | 0)] |= e[28 + (a[n + 24] - 1 + u) % 28] << 31 - n % 6;
            for (h[0] = h[0] << 1 | h[0] >>> 31, n = 1; n < 7; n++) h[n] = h[n] >>> 4 * (n - 1) + 3;
            h[7] = h[7] << 5 | h[7] >>> 27
          }
          var f = this._invSubKeys = [];
          for (n = 0; n < 16; n++) f[n] = i[15 - n]
        },
        encryptBlock: function(t, e) {
          this._doCryptBlock(t, e, this._subKeys)
        },
        decryptBlock: function(t, e) {
          this._doCryptBlock(t, e, this._invSubKeys)
        },
        _doCryptBlock: function(t, e, n) {
          this._lBlock = t[e], this._rBlock = t[e + 1], f.call(this, 4, 252645135), f.call(this, 16, 65535), l.call(this, 2, 858993459), l.call(this, 8, 16711935), f.call(this, 1, 1431655765);
          for (var r = 0; r < 16; r++) {
            for (var i = n[r], o = this._lBlock, a = this._rBlock, s = 0, u = 0; u < 8; u++) s |= c[u][((a ^ i[u]) & h[u]) >>> 0];
            this._lBlock = a, this._rBlock = o ^ s
          }
          var d = this._lBlock;
          this._lBlock = this._rBlock, this._rBlock = d, f.call(this, 1, 1431655765), l.call(this, 8, 16711935), l.call(this, 2, 858993459), f.call(this, 16, 65535), f.call(this, 4, 252645135), t[e] = this._lBlock, t[e + 1] = this._rBlock
        },
        keySize: 2,
        ivSize: 2,
        blockSize: 2
      });

    function f(t, e) {
      var n = (this._lBlock >>> t ^ this._rBlock) & e;
      this._rBlock ^= n, this._lBlock ^= n << t
    }

    function l(t, e) {
      var n = (this._rBlock >>> t ^ this._lBlock) & e;
      this._lBlock ^= n, this._rBlock ^= n << t
    }
    t.DES = r._createHelper(u);
    var d = i.TripleDES = r.extend({
      _doReset: function() {
        var t = this._key.words;
        this._des1 = u.createEncryptor(n.create(t.slice(0, 2))), this._des2 = u.createEncryptor(n.create(t.slice(2, 4))), this._des3 = u.createEncryptor(n.create(t.slice(4, 6)))
      },
      encryptBlock: function(t, e) {
        this._des1.encryptBlock(t, e), this._des2.decryptBlock(t, e), this._des3.encryptBlock(t, e)
      },
      decryptBlock: function(t, e) {
        this._des3.decryptBlock(t, e), this._des2.encryptBlock(t, e), this._des1.decryptBlock(t, e)
      },
      keySize: 6,
      ivSize: 2,
      blockSize: 2
    });
    t.TripleDES = r._createHelper(d)
  }(), function() {
    var t = H,
      e = t.lib.StreamCipher,
      n = t.algo,
      r = n.RC4 = e.extend({
        _doReset: function() {
          for (var t = this._key, e = t.words, n = t.sigBytes, r = this._S = [], i = 0; i < 256; i++) r[i] = i;
          i = 0;
          for (var o = 0; i < 256; i++) {
            var a = i % n,
              s = e[a >>> 2] >>> 24 - a % 4 * 8 & 255;
            o = (o + r[i] + s) % 256;
            var c = r[i];
            r[i] = r[o], r[o] = c
          }
          this._i = this._j = 0
        },
        _doProcessBlock: function(t, e) {
          t[e] ^= i.call(this)
        },
        keySize: 8,
        ivSize: 0
      });

    function i() {
      for (var t = this._S, e = this._i, n = this._j, r = 0, i = 0; i < 4; i++) {
        n = (n + t[e = (e + 1) % 256]) % 256;
        var o = t[e];
        t[e] = t[n], t[n] = o, r |= t[(t[e] + t[n]) % 256] << 24 - 8 * i
      }
      return this._i = e, this._j = n, r
    }
    t.RC4 = e._createHelper(r);
    var o = n.RC4Drop = r.extend({
      cfg: r.cfg.extend({
        drop: 192
      }),
      _doReset: function() {
        r._doReset.call(this);
        for (var t = this.cfg.drop; t > 0; t--) i.call(this)
      }
    });
    t.RC4Drop = e._createHelper(o)
  }(), H.mode.CTRGladman = function() {
    var t = H.lib.BlockCipherMode.extend();

    function e(t) {
      if (255 & ~(t >> 24)) t += 1 << 24;
      else {
        var e = t >> 16 & 255,
          n = t >> 8 & 255,
          r = 255 & t;
        255 === e ? (e = 0, 255 === n ? (n = 0, 255 === r ? r = 0 : ++r) : ++n) : ++e, t = 0, t += e << 16, t += n << 8, t += r
      }
      return t
    }
    var n = t.Encryptor = t.extend({
      processBlock: function(t, n) {
        var r = this._cipher,
          i = r.blockSize,
          o = this._iv,
          a = this._counter;
        o && (a = this._counter = o.slice(0), this._iv = void 0),
          function(t) {
            0 === (t[0] = e(t[0])) && (t[1] = e(t[1]))
          }(a);
        var s = a.slice(0);
        r.encryptBlock(s, 0);
        for (var c = 0; c < i; c++) t[n + c] ^= s[c]
      }
    });
    return t.Decryptor = n, t
  }(), function() {
    var t = H,
      e = t.lib.StreamCipher,
      n = t.algo,
      r = [],
      i = [],
      o = [],
      a = n.Rabbit = e.extend({
        _doReset: function() {
          for (var t = this._key.words, e = this.cfg.iv, n = 0; n < 4; n++) t[n] = 16711935 & (t[n] << 8 | t[n] >>> 24) | 4278255360 & (t[n] << 24 | t[n] >>> 8);
          var r = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16],
            i = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];
          for (this._b = 0, n = 0; n < 4; n++) s.call(this);
          for (n = 0; n < 8; n++) i[n] ^= r[n + 4 & 7];
          if (e) {
            var o = e.words,
              a = o[0],
              c = o[1],
              h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
              u = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8),
              f = h >>> 16 | 4294901760 & u,
              l = u << 16 | 65535 & h;
            for (i[0] ^= h, i[1] ^= f, i[2] ^= u, i[3] ^= l, i[4] ^= h, i[5] ^= f, i[6] ^= u, i[7] ^= l, n = 0; n < 4; n++) s.call(this)
          }
        },
        _doProcessBlock: function(t, e) {
          var n = this._X;
          s.call(this), r[0] = n[0] ^ n[5] >>> 16 ^ n[3] << 16, r[1] = n[2] ^ n[7] >>> 16 ^ n[5] << 16, r[2] = n[4] ^ n[1] >>> 16 ^ n[7] << 16, r[3] = n[6] ^ n[3] >>> 16 ^ n[1] << 16;
          for (var i = 0; i < 4; i++) r[i] = 16711935 & (r[i] << 8 | r[i] >>> 24) | 4278255360 & (r[i] << 24 | r[i] >>> 8), t[e + i] ^= r[i]
        },
        blockSize: 4,
        ivSize: 2
      });

    function s() {
      for (var t = this._X, e = this._C, n = 0; n < 8; n++) i[n] = e[n];
      for (e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < i[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < i[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < i[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < i[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < i[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < i[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < i[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < i[7] >>> 0 ? 1 : 0, n = 0; n < 8; n++) {
        var r = t[n] + e[n],
          a = 65535 & r,
          s = r >>> 16,
          c = ((a * a >>> 17) + a * s >>> 15) + s * s,
          h = ((4294901760 & r) * r | 0) + ((65535 & r) * r | 0);
        o[n] = c ^ h
      }
      t[0] = o[0] + (o[7] << 16 | o[7] >>> 16) + (o[6] << 16 | o[6] >>> 16) | 0, t[1] = o[1] + (o[0] << 8 | o[0] >>> 24) + o[7] | 0, t[2] = o[2] + (o[1] << 16 | o[1] >>> 16) + (o[0] << 16 | o[0] >>> 16) | 0, t[3] = o[3] + (o[2] << 8 | o[2] >>> 24) + o[1] | 0, t[4] = o[4] + (o[3] << 16 | o[3] >>> 16) + (o[2] << 16 | o[2] >>> 16) | 0, t[5] = o[5] + (o[4] << 8 | o[4] >>> 24) + o[3] | 0, t[6] = o[6] + (o[5] << 16 | o[5] >>> 16) + (o[4] << 16 | o[4] >>> 16) | 0, t[7] = o[7] + (o[6] << 8 | o[6] >>> 24) + o[5] | 0
    }
    t.Rabbit = e._createHelper(a)
  }(), H.mode.CTR = function() {
    var t = H.lib.BlockCipherMode.extend(),
      e = t.Encryptor = t.extend({
        processBlock: function(t, e) {
          var n = this._cipher,
            r = n.blockSize,
            i = this._iv,
            o = this._counter;
          i && (o = this._counter = i.slice(0), this._iv = void 0);
          var a = o.slice(0);
          n.encryptBlock(a, 0), o[r - 1] = o[r - 1] + 1 | 0;
          for (var s = 0; s < r; s++) t[e + s] ^= a[s]
        }
      });
    return t.Decryptor = e, t
  }(), function() {
    var t = H,
      e = t.lib.StreamCipher,
      n = t.algo,
      r = [],
      i = [],
      o = [],
      a = n.RabbitLegacy = e.extend({
        _doReset: function() {
          var t = this._key.words,
            e = this.cfg.iv,
            n = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16],
            r = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];
          this._b = 0;
          for (var i = 0; i < 4; i++) s.call(this);
          for (i = 0; i < 8; i++) r[i] ^= n[i + 4 & 7];
          if (e) {
            var o = e.words,
              a = o[0],
              c = o[1],
              h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
              u = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8),
              f = h >>> 16 | 4294901760 & u,
              l = u << 16 | 65535 & h;
            for (r[0] ^= h, r[1] ^= f, r[2] ^= u, r[3] ^= l, r[4] ^= h, r[5] ^= f, r[6] ^= u, r[7] ^= l, i = 0; i < 4; i++) s.call(this)
          }
        },
        _doProcessBlock: function(t, e) {
          var n = this._X;
          s.call(this), r[0] = n[0] ^ n[5] >>> 16 ^ n[3] << 16, r[1] = n[2] ^ n[7] >>> 16 ^ n[5] << 16, r[2] = n[4] ^ n[1] >>> 16 ^ n[7] << 16, r[3] = n[6] ^ n[3] >>> 16 ^ n[1] << 16;
          for (var i = 0; i < 4; i++) r[i] = 16711935 & (r[i] << 8 | r[i] >>> 24) | 4278255360 & (r[i] << 24 | r[i] >>> 8), t[e + i] ^= r[i]
        },
        blockSize: 4,
        ivSize: 2
      });

    function s() {
      for (var t = this._X, e = this._C, n = 0; n < 8; n++) i[n] = e[n];
      for (e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < i[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < i[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < i[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < i[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < i[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < i[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < i[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < i[7] >>> 0 ? 1 : 0, n = 0; n < 8; n++) {
        var r = t[n] + e[n],
          a = 65535 & r,
          s = r >>> 16,
          c = ((a * a >>> 17) + a * s >>> 15) + s * s,
          h = ((4294901760 & r) * r | 0) + ((65535 & r) * r | 0);
        o[n] = c ^ h
      }
      t[0] = o[0] + (o[7] << 16 | o[7] >>> 16) + (o[6] << 16 | o[6] >>> 16) | 0, t[1] = o[1] + (o[0] << 8 | o[0] >>> 24) + o[7] | 0, t[2] = o[2] + (o[1] << 16 | o[1] >>> 16) + (o[0] << 16 | o[0] >>> 16) | 0, t[3] = o[3] + (o[2] << 8 | o[2] >>> 24) + o[1] | 0, t[4] = o[4] + (o[3] << 16 | o[3] >>> 16) + (o[2] << 16 | o[2] >>> 16) | 0, t[5] = o[5] + (o[4] << 8 | o[4] >>> 24) + o[3] | 0, t[6] = o[6] + (o[5] << 16 | o[5] >>> 16) + (o[4] << 16 | o[4] >>> 16) | 0, t[7] = o[7] + (o[6] << 8 | o[6] >>> 24) + o[5] | 0
    }
    t.RabbitLegacy = e._createHelper(a)
  }(), H.pad.ZeroPadding = {
    pad: function(t, e) {
      var n = 4 * e;
      t.clamp(), t.sigBytes += n - (t.sigBytes % n || n)
    },
    unpad: function(t) {
      for (var e = t.words, n = t.sigBytes - 1; !(e[n >>> 2] >>> 24 - n % 4 * 8 & 255);) n--;
      t.sigBytes = n + 1
    }
  }, H);
  var M = function(t) {
      return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }(O.exports),
    z = function() {},
    I = new l,
    T = {
      track: function(t, e, n) {
        var r = u.getParams(e, t);
        this._normalizeSendData(r), this.setSessionTask(t, r, n)
      },
      _normalizeSendData: function(t) {
        ! function t(e) {
          Object.keys(e).forEach((function(n) {
            var r = e[n];
            "function" == typeof r && (e[n] = e[n]()), r && "object" === a(r) && t(r)
          }))
        }(t || {})
      },
      _send: function(t, e) {
        var n = u.getConfig("apiMethod"),
          r = u.getConfig("path")[n],
          o = u.getConfig("apiHost") + r;
        if (t && t.length > 0)
          if ("get" === n) c.methods.request({
            url: o,
            method: "GET",
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: i({
              appkey: u.getConfig("appkey")
            }, t),
            dataType: "base64",
            success: function(t) {
              e && e(t.header, t.data)
            },
            fail: function(t) {}
          });
          else {
            var a = this.assamblePostParmas(t),
              s = a.data.length,
              h = a.ext,
              f = function(t) {
                return function(t) {
                  for (var e = "0123456789ABCDEF", n = "", r = 0; r < 4 * t.length; r++) n += e.charAt(t[r >> 2] >> r % 4 * 8 + 4 & 15) + e.charAt(t[r >> 2] >> r % 4 * 8 & 15);
                  return n
                }(function(t, e) {
                  t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
                  for (var n = 1732584193, r = -271733879, i = -1732584194, o = 271733878, a = 0; a < t.length; a += 16) {
                    var s = n,
                      c = r,
                      h = i,
                      u = o;
                    n = g(n, r, i, o, t[a + 0], 7, -680876936), o = g(o, n, r, i, t[a + 1], 12, -389564586), i = g(i, o, n, r, t[a + 2], 17, 606105819), r = g(r, i, o, n, t[a + 3], 22, -1044525330), n = g(n, r, i, o, t[a + 4], 7, -176418897), o = g(o, n, r, i, t[a + 5], 12, 1200080426), i = g(i, o, n, r, t[a + 6], 17, -1473231341), r = g(r, i, o, n, t[a + 7], 22, -45705983), n = g(n, r, i, o, t[a + 8], 7, 1770035416), o = g(o, n, r, i, t[a + 9], 12, -1958414417), i = g(i, o, n, r, t[a + 10], 17, -42063), r = g(r, i, o, n, t[a + 11], 22, -1990404162), n = g(n, r, i, o, t[a + 12], 7, 1804603682), o = g(o, n, r, i, t[a + 13], 12, -40341101), i = g(i, o, n, r, t[a + 14], 17, -1502002290), n = v(n, r = g(r, i, o, n, t[a + 15], 22, 1236535329), i, o, t[a + 1], 5, -165796510), o = v(o, n, r, i, t[a + 6], 9, -1069501632), i = v(i, o, n, r, t[a + 11], 14, 643717713), r = v(r, i, o, n, t[a + 0], 20, -373897302), n = v(n, r, i, o, t[a + 5], 5, -701558691), o = v(o, n, r, i, t[a + 10], 9, 38016083), i = v(i, o, n, r, t[a + 15], 14, -660478335), r = v(r, i, o, n, t[a + 4], 20, -405537848), n = v(n, r, i, o, t[a + 9], 5, 568446438), o = v(o, n, r, i, t[a + 14], 9, -1019803690), i = v(i, o, n, r, t[a + 3], 14, -187363961), r = v(r, i, o, n, t[a + 8], 20, 1163531501), n = v(n, r, i, o, t[a + 13], 5, -1444681467), o = v(o, n, r, i, t[a + 2], 9, -51403784), i = v(i, o, n, r, t[a + 7], 14, 1735328473), n = _(n, r = v(r, i, o, n, t[a + 12], 20, -1926607734), i, o, t[a + 5], 4, -378558), o = _(o, n, r, i, t[a + 8], 11, -2022574463), i = _(i, o, n, r, t[a + 11], 16, 1839030562), r = _(r, i, o, n, t[a + 14], 23, -35309556), n = _(n, r, i, o, t[a + 1], 4, -1530992060), o = _(o, n, r, i, t[a + 4], 11, 1272893353), i = _(i, o, n, r, t[a + 7], 16, -155497632), r = _(r, i, o, n, t[a + 10], 23, -1094730640), n = _(n, r, i, o, t[a + 13], 4, 681279174), o = _(o, n, r, i, t[a + 0], 11, -358537222), i = _(i, o, n, r, t[a + 3], 16, -722521979), r = _(r, i, o, n, t[a + 6], 23, 76029189), n = _(n, r, i, o, t[a + 9], 4, -640364487), o = _(o, n, r, i, t[a + 12], 11, -421815835), i = _(i, o, n, r, t[a + 15], 16, 530742520), n = y(n, r = _(r, i, o, n, t[a + 2], 23, -995338651), i, o, t[a + 0], 6, -198630844), o = y(o, n, r, i, t[a + 7], 10, 1126891415), i = y(i, o, n, r, t[a + 14], 15, -1416354905), r = y(r, i, o, n, t[a + 5], 21, -57434055), n = y(n, r, i, o, t[a + 12], 6, 1700485571), o = y(o, n, r, i, t[a + 3], 10, -1894986606), i = y(i, o, n, r, t[a + 10], 15, -1051523), r = y(r, i, o, n, t[a + 1], 21, -2054922799), n = y(n, r, i, o, t[a + 8], 6, 1873313359), o = y(o, n, r, i, t[a + 15], 10, -30611744), i = y(i, o, n, r, t[a + 6], 15, -1560198380), r = y(r, i, o, n, t[a + 13], 21, 1309151649), n = y(n, r, i, o, t[a + 4], 6, -145523070), o = y(o, n, r, i, t[a + 11], 10, -1120210379), i = y(i, o, n, r, t[a + 2], 15, 718787259), r = y(r, i, o, n, t[a + 9], 21, -343485551), n = m(n, s), r = m(r, c), i = m(i, h), o = m(o, u)
                  }
                  return Array(n, r, i, o)
                }(function(t) {
                  for (var e = [], n = 0; n < 8 * t.length; n += 8) e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << n % 32;
                  return e
                }(e = t), 8 * e.length));
                var e
              }("data=".concat(s, "&ext=").concat(h));
            s && c.methods.request({
              url: o,
              method: "POST",
              data: i(i({
                appkey: u.getConfig("appkey")
              }, a), {}, {
                sign: f
              }),
              headers: {
                "content-type": "application/json"
              },
              dataType: "base64",
              success: function(t) {
                e && e(t.header, t.data)
              },
              fail: function(t) {}
            })
          }
      },
      setSessionTask: function(t, e, n) {
        u.getConfig("debug");
        var r = d.getValue("sdk_session"),
          i = u.getConfig("session_interval") || 18e5,
          o = function() {
            return setTimeout((function() {
              e.event = "$SessionEnd", d.setValue("sdk_session", ""), d.setValue("sdk_session_start", "")
            }), i)
          },
          a = d.getValue("sdk_session_start");
        if (e.sessionId = r, r) {
          if (a) {
            var s = d.getValue("sdk_session_time_id");
            clearTimeout(Number(s)), d.setValue("sdk_session_start", (new Date).getTime()), s = o(), d.setValue("sdk_session_time_id", s)
          }
        } else {
          var c = JSON.parse(JSON.stringify(e));
          r = function() {
            var t;
            try {
              var e = new Uint32Array(1);
              window.crypto.getRandomValues(e), t = 2147483647 & e[0]
            } catch (e) {
              t = Math.floor(2147483648 * Math.random())
            }
            return t
          }().toString(36), c.sessionId = r;
          var h = o();
          d.setValue("sdk_session", r), d.setValue("sdk_session_start", (new Date).getTime()), d.setValue("sdk_session_time_id", h), c.event = "$SessionStart"
        }
        e.event = t, I.push(t, e, 0, n || z, u.getConfig("apiMethod"))
      },
      assamblePostParmas: function(t) {
        var e, n, r = u.getConfig("encryptMode"),
          i = JSON.stringify(t || {}),
          o = 3;
        if ("default" === r && (i = f.encode(encodeURIComponent(JSON.stringify(t))), o = 1), "aes" === r) {
          var a = u.getConfig("appkey").substring(0, 16);
          if (a.length < 16)
            for (var s = 16 - a.length, c = 0; c < s; c++) a += "0";
          var h = M ? M.enc.Utf8.parse(a) : "",
            l = {
              iv: h,
              mode: M ? M.mode.ECB : "",
              padding: M ? M.pad.Pkcs7 : ""
            };
          e = h, n = JSON.stringify(t), i = M.AES.encrypt(n, e, l).ciphertext.toString(M.enc.Base64), o = 2
        }
        return {
          data: i,
          ext: o
        }
      }
    };
  I.run(T, u);
  var Q = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"],
    U = ["channel"],
    j = {},
    F = "",
    $ = {
      onLaunchApp: function(t, e) {
        var n, r, i;
        r = {
            scene: (n = e) && n.scene,
            referrer: n && JSON.stringify(n.referrerInfo || {})
          }, i = d.getCache(), !n.query && (n.query = {}), Q.forEach((function(t) {
            r[t] = n.query[t] || "", r["latest_".concat(t)] = i["latest_".concat(t)] || "", d.setValue("latest_".concat(t), r[t], !1)
          })), d.updateLocalStorage(), u.setCommonData(r, {}),
          function(t) {
            var e = t.query || {};
            for (var n in !t.query && (t.query = {}), U.forEach((function(e) {
                j[e] = t.query[e] || ""
              })), e) F += F ? "&" : "?", F += "".concat(n, "=").concat(e[n]);
            j.path_parameter = F, u.setCommonData(j, {})
          }(e), u.getConfig("autoTrack").appLaunch && t.track("$MPLaunch", {})
      },
      onShowApp: function(t, e) {
        ! function(t) {
          if (t) {
            var e = c.getEnv(),
              n = d.getCache(),
              r = {
                weapp_scene: t.scene ? "".concat(e, "_").concat(t.scene) : n.latest_scene || "",
                p_latest_scene: n.latest_scene || ""
              };
            d.setValue("latest_scene", r.weapp_scene, !1), d.updateLocalStorage(), u.setCommonData(r, {})
          }
        }(e);
        var n = +new Date;
        d.setValue("app_show_time", n, !0), u.getConfig("autoTrack").appShow && t.track("$MPShow", {})
      },
      onHideApp: function(t) {
        var e = d.getValue("app_show_time"),
          n = +new Date - e;
        n > Math.pow(10, 12) && (n = 0), u.getConfig("autoTrack").appHide && t.track("$MPHide", {
          dr: n
        })
      }
    };

  function L(t) {
    this.url = t, this.protocol = "", this.host = "", this.pathname = "", this.search = "", this.hash = "", this.parseURL = function() {
      var t = this.url.match(/^(.*?):\/\/([^/?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/);
      t && (this.protocol = t[1], this.host = t[2], this.pathname = t[3] || "", this.search = t[4] || "", this.searchParams = new K(t[4]), this.hash = t[5] || "")
    }, this.toString = function() {
      return this.search = this.searchParams.toString(), this.protocol + "://" + this.host + this.pathname + this.search + this.hash
    }, this.parseURL()
  }

  function K() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    this.search = t, this.toString = function() {
      return this.search
    }, this.append = function(t, e) {
      var n = "".concat(encodeURIComponent(t), "=").concat(encodeURIComponent(e || ""));
      this.search.indexOf("?") >= 0 ? this.search += "&".concat(n) : this.search += "?".concat(n)
    }
  }

  function W(t) {
    return String(t).replace(new RegExp("([.*+?^=!:${}()|[\\]/\\\\-])", "g"), "\\$1")
  }
  var N = {},
    q = 0,
    V = {
      onShowPage: function(t) {
        q = +new Date, N = {};
        var e = c.getCurrentPages();
        N.url = e && e[e.length - 1] && e[e.length - 1].route, N.title = this.data && this.data.qdt && this.data.qdt.title || "", u.setQdtData(this.data.qdt, N);
        var n, r, i, o, a = "".concat(u.getSystemData("sw"), "*").concat(u.getSystemData("sh")).concat(u.getConfig("appid"));
        N.page_id = (n = a, o = "".concat((r = function(t) {
          return t.toString(36)
        })((i = function() {
          return Math.floor(2147483648 * Math.random())
        })() ^ 2147483647 & function(t) {
          var e = 1;
          if (t) {
            var n = 0;
            e = 0;
            for (var r = t.length - 1; r >= 0; r--) e = (e << 6 & 268435455) + (n = t.charCodeAt(r)) + (n << 14), e = 0 != (n = 266338304 & e) ? e ^ n >> 21 : e
          }
          return e
        }(n)), "."), "".concat(r(+new Date), ".").concat(o).concat(i().toString(36))), u.setPageData(N);
        var s = e[e.length - 1],
          h = s.options || s.querySet,
          f = "",
          l = "";
        if (h) {
          for (var d in h) f += f ? "&" : "?", f += "".concat(d, "=").concat(h[d]);
          l = h.channel
        }
        u.setCommonData({
          channel: l,
          path_parameter: f
        }, {}), u.getConfig("autoTrack").pageShow && t.track("$MPPageShow", {})
      },
      onHidePage: function(t) {
        var e = +new Date - q;
        e > Math.pow(10, 12) && (e = 0), u.getConfig("autoTrack").pageHide && t.track("$MPPageHide", {
          dr: e
        })
      },
      onShareAppMessagePage: function(t, e) {
        var n, r, i, o, a = c.getCurrentPages(),
          s = a[a.length - 1].route,
          h = u.idData,
          f = h.anonymous_id,
          l = h.openid,
          d = parseInt(function(t) {
            for (var e, n = new RegExp("(?:&|\\?)?".concat(W(encodeURIComponent("qda_sharelevel")), "=([^&]*)(?:&|$)"), "g"), r = ""; e = n.exec(t);)
              if (e[1]) {
                r = decodeURIComponent(e[1]);
                break
              } return r
          }(s) || 1);
        u.getConfig("debug") && console.log("[QDTRACKER] currentPagePath", s), u.getConfig("autoTrack").pageShare && t.track("$MPShare", {
          share_oid: l,
          share_qid: f,
          share_url_path: s,
          share_level: d
        }), n = s, r = new RegExp("(&|\\?)?".concat(W(encodeURIComponent("qda_sharelevel")), "=([^&]*)(?:&|$)"), "g"), s = function(t, e, n) {
          return t.indexOf("?") > -1 ? t += "&" : t += "?", t + "".concat(encodeURIComponent("qda_sharelevel"), "=").concat(encodeURIComponent(n.toString()))
        }(("&" !== (o = (i = n.replace(r, "$1")).charAt(i.length - 1)) && "?" !== o || (i = i.slice(0, -1)), s = i), 0, isNaN(d) ? 1 : d + 1), e.path = s
      }
    },
    G = {
      data: 1,
      onLoad: 1,
      onShow: 1,
      onReady: 1,
      onPullDownRefresh: 1,
      onShareAppMessage: 1,
      onShareTimeline: 1,
      onReachBottom: 1,
      onPageScroll: 1,
      onResize: 1,
      onTabItemTap: 1,
      onHide: 1,
      onUnload: 1,
      onInit: 1
    };

  function X(t, e, n) {
    var r = t[e];
    t[e] = function(t) {
      var e = r.apply(this, arguments);
      if (t && t.target && t.currentTarget && t.target.id !== t.currentTarget.id) return e;
      var i = void 0;
      return arguments && (i = arguments[0]), i && J(i) && function(t, e) {
        if (t) {
          var n, r = {},
            i = t || {},
            o = i.currentTarget || {};
          i.target;
          var a = o.dataset || {};
          n = i.type, r.element_id = o.id || "", r.element_type = a.type || "", r.element_content = a.content || "", r.element_name = a.name || "";
          var s = u.getConfig("autoTrack");
          if (s && s.tag_attr && s.tag_attr.forEach((function(t) {
              return r[t] = a[t]
            })), J(i.event_prop) && i.event_prop, n && {
              tap: 1,
              longpress: 1,
              longtap: 1
            } [n]) {
            var h = c.getCurrentPages(),
              f = h[h.length - 1],
              l = f && f.route;
            r.url_path = l, e.track("$MPClick", r)
          }
        }
      }(i, n), e
    }
  }

  function J(t) {
    return null != t && "[object Object]" == toString.call(t)
  }
  var Z = ["openid", "aliUserId", "unionid", "bussid"];
  d.init();
  var Y = {
      initFinished: !1,
      idGeted: !1,
      methodsQueue: [],
      init: function(t) {
        var e = this;
        t.mpPltf && Y.setMpPltf(t.mpPltf), u.setConfig(t), t.useId || (this.idGeted = !0);
        var r, i = d.getValue("anonymous_id");
        i || (r = (Math.floor(10 * Math.random()) || 1) + function(t, e) {
          var n, r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
            i = [];
          for (e = e || r.length, n = 0; n < 3; n++) i[n] = r[0 | Math.random() * e];
          return i.join("")
        }(0, 10) + (new Date).getTime().toString().slice(2, 13), i = r.toString(), d.setValue("anonymous_id", i, !0)), u.setIdData({
          anonymous_id: i
        }), c.methods.getNetworkType({
          success: function(t) {
            u.setSystemData({
              network_type: t.networkType,
              carrier: t.operatorName
            })
          },
          complete: this.getSystemInfo.bind(this)
        });
        var a = t.property || {},
          s = a.commonData,
          h = a.eventCommonData;
        Object.entries(s || {}).forEach((function(t) {
          var r = o(t, 2),
            i = r[0],
            a = r[1];
          e.setCommonData(n({}, i, a))
        })), Object.entries(h || {}).forEach((function(t) {
          var r = o(t, 2),
            i = r[0],
            a = r[1];
          Object.entries(a).forEach((function(t) {
            var r = o(t, 2),
              a = r[0],
              s = r[1];
            e.setEventCommonData(i, n({}, a, s))
          }))
        }))
      },
      cacheMethods: function(t) {
        return !(this.initFinished && this.idGeted || (this.methodsQueue.push(t), 0))
      },
      getSystemInfo: function() {
        var t = this;
        c.methods.getSystemInfo({
          success: function(e) {
            var n = "微信小程序";
            "alipay" === c.env ? n = "支付宝小程序" : "smart" === c.env && (n = "百度小程序");
            var r = {
              sdk_type: c.sdk_type,
              sdk_version: c.sdk_version,
              sw: e.screenWidth,
              sh: e.screenHeight,
              os_version: e.system.indexOf(" ") > -1 ? e.system.split(" ")[1] : e.system,
              manufacturer: e.brand,
              model: e.model,
              os: e.system.indexOf(" ") > -1 ? e.system.split(" ")[0] : e.system,
              screen_resolution: "".concat(e.screenWidth, "_").concat(e.screenHeight),
              miniprogram_version: e.SDKVersion,
              platform: e.platform,
              version: e.version,
              system: e.system,
              language: e.language,
              application_type: n,
              application: u.config.application,
              device_type: "移动端"
            };
            u.setSystemData(r), t.initFinished = !0, t.idGeted && t.methodsQueue.length && (t.methodsQueue.forEach((function(e) {
              var n = e[0],
                r = e[1];
              t[n].apply(t, r)
            })), t.methodsQueue = [])
          }
        })
      },
      track: function(t, e, n) {
        this.cacheMethods(["track", arguments]) || T.track(t, e, n)
      },
      setAccountInfo: function(t) {
        try {
          var e = t || {},
            n = e.openid,
            r = e.aliUserId,
            i = e.unionid,
            o = e.bussid,
            a = e.wx_applet_openid,
            s = e.wx_unionid;
          u.setIdData({
            openid: a || n,
            aliUserId: r,
            unionid: s || i,
            bussid: o
          }), t && u.setAccountInfo(t)
        } catch (t) {
          console.log("[QDTRACKER_ERROR]", "setAccountInfo", t)
        }
      },
      getIDs: function() {
        return u.getIDs()
      },
      setCommonData: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = this,
          r = e.openid,
          i = e.aliUserId,
          o = e.unionid,
          a = e.bussid,
          s = function(t, e) {
            if (null == t) return {};
            var n, r, i = function(t, e) {
              if (null == t) return {};
              var n = {};
              for (var r in t)
                if ({}.hasOwnProperty.call(t, r)) {
                  if (e.includes(r)) continue;
                  n[r] = t[r]
                } return n
            }(t, e);
            if (Object.getOwnPropertySymbols) {
              var o = Object.getOwnPropertySymbols(t);
              for (r = 0; r < o.length; r++) n = o[r], e.includes(n) || {}.propertyIsEnumerable.call(t, n) && (i[n] = t[n])
            }
            return i
          }(e, Z);
        r && u.setIdData({
          openid: r
        }), i && u.setIdData({
          aliUserId: i
        }), o && u.setIdData({
          unionid: o
        }), a && u.setIdData({
          bussid: a
        }), ("alipay" !== c.env && r || "alipay" === c.env && i) && (this.idGeted = !0, this.initFinished && this.methodsQueue.length && (this.methodsQueue.forEach((function(t) {
          var e = t[0],
            r = t[1];
          n[e].apply(n, r)
        })), this.methodsQueue = [])), u.setCommonData(t, s), u.setUserDefineData(t)
      },
      setEventCommonData: function(t, e) {
        u.setEventCommonData(t, e)
      },
      use: function(t, e, n) {
        var r = t.apply(this, e);
        n && n(r)
      },
      getCommonParams: function() {
        return [u.getParams()]
      },
      addParamsToUrl: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n = t;
        try {
          var r = {};
          ["anonymous_id"].forEach((function(t) {
            r[t] = u.getConfig(t) || d.getValue(t)
          })), n = function(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              r = new L(t);
            if (Object.keys(e).forEach((function(t) {
                n || r.searchParams.append(t, e[t])
              })), n) {
              var i = "";
              Object.keys(e).forEach((function(t) {
                i += "&".concat(encodeURIComponent(t), "=").concat(encodeURIComponent(e[t]))
              }));
              var o = r.hash || "#";
              o.indexOf("?") >= 0 ? r.hash = o + i : r.hash = o + "?".concat(i.slice(1))
            }
            return r.toString()
          }(t, {
            _qdasdk: JSON.stringify(r)
          }, e)
        } catch (t) {
          console.warn("addParamsToUrl error=", t)
        }
        return n
      },
      getConfig: function(t) {
        return t ? u.getConfig(t) : u.config
      },
      startAppMonitor: function(t) {
        c.lifecycle.app.forEach((function(e) {
          var n, r, i, o;
          n = Y, o = (r = t)[i = e], r[i] = function(t) {
            try {
              $["".concat(i, "App")] && $["".concat(i, "App")].call(this, n, t)
            } catch (t) {
              console.log("[QDTRACKER_ERROR]", "appProxy", t)
            }
            return o && o.call(this, t)
          }
        }))
      },
      startPageMonitor: function(t) {
        c.lifecycle.page.forEach((function(e) {
            var n, r, i, o;
            n = Y, o = (r = t)[i = e], r[i] = function(t) {
              try {
                V["".concat(i, "Page")] && V["".concat(i, "Page")].call(this, n, t)
              } catch (t) {
                console.log("[QDTRACKER_ERROR]", "pageProxy", t)
              }
              return o && o.call(this, t)
            }
          })),
          function(t, e) {
            var n, r, i, o, a, s, h = (u.getConfig("autoTrack").mpClickBlackList || []).reduce((function(t, e) {
              return t[e] = 1, t
            }), {});
            if (!t.$$monitorMounted) {
              var f = "";
              if (!t.$vm && t.$options && (f = t.$options.name), t.$vm && t.$vm.$options && t.$vm.$options.name, !h[f]) {
                var l = [],
                  d = u.getConfig("autoTrack");
                if (d && d.mpClick) {
                  l = function(t) {
                    var e = G,
                      n = [];
                    for (var r in t) "function" != typeof t[r] || e[r] || n.push(r);
                    return n
                  }(t), r = e, i = (n = t).onTabItemTap, a = (o = c.getCurrentPages())[o.length - 1], s = a && a.route, n.onTabItemTap = function(t) {
                    i && i.apply(this, arguments);
                    var e = {};
                    t && (e.element_content = t.text), e.element_type = "tabBar", e.url_path = s, r.track("$MPClick", e)
                  };
                  for (var p = l.length, g = 0; g < p; g++) X(t, l[g], e)
                }
                t.$$monitorMounted = !0
              }
            }
          }(t, Y)
      },
      setMpPltf: function(e) {
        switch (u.getConfig("debug") && console.log("[QDTRACKER_LOG]", "setMpPltf", e), c.env = e, e) {
          case "wx":
            c.methods = t.wx$1, c.sdk_type = "wxminiprogram", c.lifecycle = {
              app: ["onLaunch", "onShow", "onHide"],
              page: ["onShow", "onHide", "onShareAppMessage"]
            };
            break;
          case "alipay":
            c.methods = my, c.sdk_type = "alipayminiprogram", c.lifecycle = {
              app: ["onLaunch", "onShow", "onHide"],
              page: ["onShow", "onHide"]
            };
            break;
          case "smart":
            c.methods = swan, c.sdk_type = "baiduminiprogram", c.lifecycle = {
              app: ["onLaunch", "onShow", "onHide"],
              page: ["onShow", "onHide"]
            }
        }
      }
    },
    tt = App,
    et = Page;
  App = function(t) {
    function e(e) {
      return t.apply(this, arguments)
    }
    return e.toString = function() {
      return t.toString()
    }, e
  }((function(t) {
    App.$$qidian_da_sdk_mounted || (Y.startAppMonitor(t), App.$$qidian_da_sdk_mounted = !0), tt(t)
  })), Page = function(t) {
    Y.startPageMonitor(t), et(t)
  }, exports.et = Y
}();