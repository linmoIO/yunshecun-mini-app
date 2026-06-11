! function() {
  "use strict";
  const t = require("../common/vendor.js");

  function e(t, e, n) {
    return e = g(e), h(t, function() {
      try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
      } catch (t) {}
      return function() {
        return !!t
      }()
    }() ? Reflect.construct(e, [], g(t).constructor) : e.apply(t, n))
  }

  function n(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      e && (r = r.filter((function(e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      }))), n.push.apply(n, r)
    }
    return n
  }

  function r(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = null != arguments[e] ? arguments[e] : {};
      e % 2 ? n(Object(r), !0).forEach((function(e) {
        f(t, e, r[e])
      })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach((function(e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
      }))
    }
    return t
  }

  function a() {
    a = function() {
      return e
    };
    var t, e = {},
      n = Object.prototype,
      r = n.hasOwnProperty,
      o = Object.defineProperty || function(t, e, n) {
        t[e] = n.value
      },
      i = "function" == typeof Symbol ? Symbol : {},
      s = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";

    function p(t, e, n) {
      return Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e]
    }
    try {
      p({}, "")
    } catch (t) {
      p = function(t, e, n) {
        return t[e] = n
      }
    }

    function f(t, e, n, r) {
      var a = e && e.prototype instanceof m ? e : m,
        i = Object.create(a.prototype),
        s = new k(r || []);
      return o(i, "_invoke", {
        value: P(t, n, s)
      }), i
    }

    function l(t, e, n) {
      try {
        return {
          type: "normal",
          arg: t.call(e, n)
        }
      } catch (t) {
        return {
          type: "throw",
          arg: t
        }
      }
    }
    e.wrap = f;
    var g = "suspendedStart",
      _ = "executing",
      h = "completed",
      d = {};

    function m() {}

    function v() {}

    function y() {}
    var S = {};
    p(S, s, (function() {
      return this
    }));
    var I = Object.getPrototypeOf,
      b = I && I(I(M([])));
    b && b !== n && r.call(b, s) && (S = b);
    var E = y.prototype = m.prototype = Object.create(S);

    function A(t) {
      ["next", "throw", "return"].forEach((function(e) {
        p(t, e, (function(t) {
          return this._invoke(e, t)
        }))
      }))
    }

    function T(t, e) {
      function n(a, o, i, s) {
        var c = l(t[a], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            p = u.value;
          return p && "object" == typeof p && r.call(p, "__await") ? e.resolve(p.__await).then((function(t) {
            n("next", t, i, s)
          }), (function(t) {
            n("throw", t, i, s)
          })) : e.resolve(p).then((function(t) {
            u.value = t, i(u)
          }), (function(t) {
            return n("throw", t, i, s)
          }))
        }
        s(c.arg)
      }
      var a;
      o(this, "_invoke", {
        value: function(t, r) {
          function o() {
            return new e((function(e, a) {
              n(t, r, e, a)
            }))
          }
          return a = a ? a.then(o, o) : o()
        }
      })
    }

    function P(e, n, r) {
      var a = g;
      return function(o, i) {
        if (a === _) throw new Error("Generator is already running");
        if (a === h) {
          if ("throw" === o) throw i;
          return {
            value: t,
            done: !0
          }
        }
        for (r.method = o, r.arg = i;;) {
          var s = r.delegate;
          if (s) {
            var c = O(s, r);
            if (c) {
              if (c === d) continue;
              return c
            }
          }
          if ("next" === r.method) r.sent = r._sent = r.arg;
          else if ("throw" === r.method) {
            if (a === g) throw a = h, r.arg;
            r.dispatchException(r.arg)
          } else "return" === r.method && r.abrupt("return", r.arg);
          a = _;
          var u = l(e, n, r);
          if ("normal" === u.type) {
            if (a = r.done ? h : "suspendedYield", u.arg === d) continue;
            return {
              value: u.arg,
              done: r.done
            }
          }
          "throw" === u.type && (a = h, r.method = "throw", r.arg = u.arg)
        }
      }
    }

    function O(e, n) {
      var r = n.method,
        a = e.iterator[r];
      if (a === t) return n.delegate = null, "throw" === r && e.iterator.return && (n.method = "return", n.arg = t, O(e, n), "throw" === n.method) || "return" !== r && (n.method = "throw", n.arg = new TypeError("The iterator does not provide a '" + r + "' method")), d;
      var o = l(a, e.iterator, n.arg);
      if ("throw" === o.type) return n.method = "throw", n.arg = o.arg, n.delegate = null, d;
      var i = o.arg;
      return i ? i.done ? (n[e.resultName] = i.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, d) : i : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, d)
    }

    function w(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
    }

    function C(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e
    }

    function k(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(w, this), this.reset(!0)
    }

    function M(e) {
      if (e || "" === e) {
        var n = e[s];
        if (n) return n.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var a = -1,
            o = function n() {
              for (; ++a < e.length;)
                if (r.call(e, a)) return n.value = e[a], n.done = !1, n;
              return n.value = t, n.done = !0, n
            };
          return o.next = o
        }
      }
      throw new TypeError(typeof e + " is not iterable")
    }
    return v.prototype = y, o(E, "constructor", {
      value: y,
      configurable: !0
    }), o(y, "constructor", {
      value: v,
      configurable: !0
    }), v.displayName = p(y, u, "GeneratorFunction"), e.isGeneratorFunction = function(t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === v || "GeneratorFunction" === (e.displayName || e.name))
    }, e.mark = function(t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, y) : (t.__proto__ = y, p(t, u, "GeneratorFunction")), t.prototype = Object.create(E), t
    }, e.awrap = function(t) {
      return {
        __await: t
      }
    }, A(T.prototype), p(T.prototype, c, (function() {
      return this
    })), e.AsyncIterator = T, e.async = function(t, n, r, a, o) {
      void 0 === o && (o = Promise);
      var i = new T(f(t, n, r, a), o);
      return e.isGeneratorFunction(n) ? i : i.next().then((function(t) {
        return t.done ? t.value : i.next()
      }))
    }, A(E), p(E, u, "Generator"), p(E, s, (function() {
      return this
    })), p(E, "toString", (function() {
      return "[object Generator]"
    })), e.keys = function(t) {
      var e = Object(t),
        n = [];
      for (var r in e) n.push(r);
      return n.reverse(),
        function t() {
          for (; n.length;) {
            var r = n.pop();
            if (r in e) return t.value = r, t.done = !1, t
          }
          return t.done = !0, t
        }
    }, e.values = M, k.prototype = {
      constructor: k,
      reset: function(e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(C), !e)
          for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t)
      },
      stop: function() {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval
      },
      dispatchException: function(e) {
        if (this.done) throw e;
        var n = this;

        function a(r, a) {
          return s.type = "throw", s.arg = e, n.next = r, a && (n.method = "next", n.arg = t), !!a
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            s = i.completion;
          if ("root" === i.tryLoc) return a("end");
          if (i.tryLoc <= this.prev) {
            var c = r.call(i, "catchLoc"),
              u = r.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return a(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return a(i.finallyLoc)
            } else if (c) {
              if (this.prev < i.catchLoc) return a(i.catchLoc, !0)
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return a(i.finallyLoc)
            }
          }
        }
      },
      abrupt: function(t, e) {
        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
          var a = this.tryEntries[n];
          if (a.tryLoc <= this.prev && r.call(a, "finallyLoc") && this.prev < a.finallyLoc) {
            var o = a;
            break
          }
        }
        o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
        var i = o ? o.completion : {};
        return i.type = t, i.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, d) : this.complete(i)
      },
      complete: function(t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), d
      },
      finish: function(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), C(n), d
        }
      },
      catch: function(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.tryLoc === t) {
            var r = n.completion;
            if ("throw" === r.type) {
              var a = r.arg;
              C(n)
            }
            return a
          }
        }
        throw new Error("illegal catch attempt")
      },
      delegateYield: function(e, n, r) {
        return this.delegate = {
          iterator: M(e),
          resultName: n,
          nextLoc: r
        }, "next" === this.method && (this.arg = t), d
      }
    }, e
  }

  function o(t) {
    var e = function(t, e) {
      if ("object" != typeof t || !t) return t;
      var n = t[Symbol.toPrimitive];
      if (void 0 !== n) {
        var r = n.call(t, "string");
        if ("object" != typeof r) return r;
        throw new TypeError("@@toPrimitive must return a primitive value.")
      }
      return String(t)
    }(t);
    return "symbol" == typeof e ? e : String(e)
  }

  function i(t) {
    return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
      return typeof t
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
  }

  function s(t, e, n, r, a, o, i) {
    try {
      var s = t[o](i),
        c = s.value
    } catch (t) {
      return void n(t)
    }
    s.done ? e(c) : Promise.resolve(c).then(r, a)
  }

  function c(t) {
    return function() {
      var e = this,
        n = arguments;
      return new Promise((function(r, a) {
        var o = t.apply(e, n);

        function i(t) {
          s(o, r, a, i, c, "next", t)
        }

        function c(t) {
          s(o, r, a, i, c, "throw", t)
        }
        i(void 0)
      }))
    }
  }

  function u(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
  }

  function p(t, e, n) {
    return e && function(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, o(r.key), r)
      }
    }(t.prototype, e), Object.defineProperty(t, "prototype", {
      writable: !1
    }), t
  }

  function f(t, e, n) {
    return (e = o(e)) in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t
  }

  function l(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(t, "prototype", {
      writable: !1
    }), e && function(t, e) {
      (Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
        return t.__proto__ = e, t
      })(t, e)
    }(t, e)
  }

  function g(t) {
    return (g = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t)
    })(t)
  }

  function _(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t
  }

  function h(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _(t)
  }

  function d(t, e) {
    if (I(t) && void 0 === t.length)
      for (var n in t) t.hasOwnProperty(n) && e(n, t[n], t);
    else {
      var r, a = t.length;
      for (r = 0; r < a && "break" !== e(t[r], r); r++);
    }
  }

  function m(t) {
    return Array.isArray ? Array.isArray(t) : /Array/.test(Object.prototype.toString.call(t))
  }
  var v = {
    isArray: m,
    indexOf: function(t, e) {
      var n = -1;
      try {
        n = t.indexOf(e)
      } catch (a) {
        for (var r = 0; r < t.length; r++) t[r] === e && (n = r)
      } finally {
        return n
      }
    },
    itemMatch: function(t, e) {
      var n = !1;
      try {
        if (!this.isArray(t)) return n;
        n = t.some((function(t) {
          return t && t.length > 0 && -1 !== e.indexOf(t)
        }))
      } catch (a) {
        for (var r = 0; r < t.length; r++)
          if (-1 !== e.indexOf(t[r])) {
            n = !0;
            break
          }
      }
      return n
    },
    find: function(t, e) {
      try {
        return t.find(e)
      } catch (r) {
        for (var n = 0; n < t.length; n++)
          if (e(t[n])) return t[n]
      }
    },
    flat: function t(e) {
      var n = [];
      if (m(e))
        for (var r = 0; r < e.length; r++) {
          var a = e[r];
          m(a) ? (e[r] = t(a), n = n.concat(e[r])) : n.push(a)
        }
      return n
    },
    assign: y,
    some: function(t, e) {
      var n, r = t.length;
      for (n = 0; n < r; n++)
        if (e(t[n])) return !0;
      return !1
    },
    each: d
  };

  function y(t, e) {
    return "function" != typeof Object.assign ? function(t) {
      for (var e = Object(t), n = 1; n < arguments.length; n++) {
        var r = arguments[n];
        if (null !== r)
          for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a])
      }
      return e
    }(t, e) : Object.assign({}, t, e)
  }

  function S(t) {
    var e, n = Array.isArray(t) ? [] : {};
    if ("object" === i(t)) {
      if (JSON && JSON.parse) e = JSON.stringify(t), n = JSON.parse(e);
      else
        for (var r in t) n[r] = "object" === i(t[r]) ? S(t[r]) : t[r];
      return n
    }
  }

  function I(t) {
    if ("object" !== i(t) || null === t) return !1;
    for (var e = t; null !== Object.getPrototypeOf(e);) e = Object.getPrototypeOf(e);
    return Object.getPrototypeOf(t) === e
  }
  var b = {
      isObject: I,
      assign: y,
      cloneDeep: S,
      isEmptyObject: function(t) {
        try {
          if (!t) return !0;
          if ("function" == typeof Object.keys && 0 === Object.keys(t).length) return !0;
          for (var e in t)
            if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
          return !0
        } catch (t) {
          return !1
        }
      },
      each: d,
      eachMap: function(t, e) {
        if (Object && Object.keys)
          for (var n = Object.keys(t), r = n.length, a = 0; a < r; a++) {
            var o = n[a];
            e(o, t[o])
          } else
            for (var i in t) e(i, t[i])
      },
      deleteKeys: function(t, e) {
        return d(e, (function(e) {
          delete t[e]
        })), t
      }
    },
    E = function(t) {
      if (t) try {
        return JSON.stringify(t)
      } catch (t) {}
      return ""
    },
    A = function(t) {
      if (t) try {
        return JSON.parse(t)
      } catch (t) {}
      return null
    },
    T = function(t) {
      if (!t || "string" != typeof t) return {};
      for (var e = t.replace(/['"{}]+/g, "").split(","), n = [], r = 0; r < e.length; r++) n.push(e[r].split(":"));
      return w(n)
    };

  function P(t) {
    return "function" == typeof t
  }

  function O(t) {
    return void 0 === t
  }

  function w(t) {
    var e, n, r, a = {},
      o = t.length;
    for (r = 0; r < o; r++) e = t[r][0] && t[r][0].trim(), n = t[r][1], a[e] = n;
    return a
  }

  function C(t) {
    if ("object" === i(t)) return t;
    var e = {};
    if (!t || "string" != typeof t) return e;
    for (var n = t.split("&"), r = 0; r < n.length; r++) {
      var a = n[r],
        o = a.indexOf("="),
        s = a.split("="),
        c = a.length;
      if (2 === s.length) e[s[0]] = s[1] || "";
      else if (o > 0) {
        var u = a.slice(0, o),
          p = a.slice(o + 1, c) || "";
        e[u] = p
      } else e[s[0]] = ""
    }
    return e
  }
  var k = "::-plain-::";
  var M = {
      isString: function(t) {
        return "[object String]" === Object.prototype.toString.call(t)
      },
      isStartWith: function(t, e) {
        return !(!t || !e || 0 === e.length || e.length > t.length) && 0 === t.indexOf(e)
      },
      isEndWith: function(t, e) {
        if (String.prototype.endsWith) return t.endsWith(e);
        var n = t.length,
          r = e.length;
        return n >= r && t.substring(n - r) === e
      },
      isContain: function(t, e) {
        return t.indexOf(e) > -1
      },
      getRandomStr: function(t) {
        for (var e = "", n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], r = 0; r < Number(t); r++) e += n[Math.round(Math.random() * (n.length - 1))];
        return e
      },
      trim: function(t) {
        return "string" == typeof t ? t.replace(/^\s+|\s+$/g, "") : ""
      },
      query2obj: C
    },
    D = {
      query2obj: C,
      arr2obj: w,
      arr2queryStr: function(t, e) {
        var n, r, a, o = [],
          i = t.length;
        for (a = 0; a < i; a++) {
          n = t[a][0], r = t[a][1];
          var s = 0 === n.indexOf(k),
            c = s || e ? r : encodeURIComponent(r);
          o.push(s ? c : n + "=" + c)
        }
        return o.join("&")
      },
      obj2queryStr: function(t, e) {
        var n, r, a, o = [];
        for (n in t) n && t.hasOwnProperty(n) && (a = "object" === i(t[n]) ? r = "" + this.obj2queryStr(t[n]) : n + "=" + (r = "" + t[n]), e ? o.push(a) : o.push(0 === n.indexOf(k) ? r : a));
        return o.join("&")
      }
    },
    x = function() {
      var t = null,
        e = !1,
        n = "";

      function r() {
        this.setDebug = function(t, r) {
          e = t, n = r ? "[APLUS] -- " : "[QT] -- "
        }, this.i = function() {
          if (e) try {
            "string" == typeof arguments[0] && (arguments[0] = n + arguments[0]), console.info.apply(console, arguments)
          } catch (t) {}
        }, this.e = function() {
          if (e) try {
            "string" == typeof arguments[0] && (arguments[0] = n + arguments[0]), console.error.apply(console, arguments)
          } catch (t) {}
        }, this.w = function() {
          if (e) try {
            "string" == typeof arguments[0] && (arguments[0] = n + arguments[0]), console.warn.apply(console, arguments)
          } catch (t) {}
        }, this.v = function() {
          try {
            "string" == typeof arguments[0] && (arguments[0] = n + arguments[0]), console.warn.apply(console, arguments)
          } catch (t) {}
        }, this.tip_w = function(t) {
          try {
            console.log("%c " + n + t, "background:red; padding: 4px; padding-right: 8px; border-radius: 4px; color: #fff;")
          } catch (t) {}
        }, this.repeat = function(t) {
          for (var e = t; e.length < 86;) e += t;
          return e
        }
      }
      return function() {
        return null === t && (t = new r), t
      }
    }();

  function N() {}
  N.prototype.extend = function() {}, N.prototype.create = function() {}, N.extend = function(t) {
    return this.prototype.extend.call(this, t)
  }, N.prototype.create = function(t) {
    var e = new this;
    for (var n in t) e[n] = t[n];
    return e
  }, N.prototype.extend = function(t) {
    var e = function() {};
    try {
      for (var n in P(Object.create) || (Object.create = function(t) {
          function e() {}
          return e.prototype = t, new e
        }), e.prototype = Object.create(this.prototype), t) e.prototype[n] = t[n];
      e.prototype.constructor = e, e.extend = e.prototype.extend, e.create = e.prototype.create
    } catch (t) {
      x && x().w(t)
    } finally {
      return e
    }
  };
  var R, U = N.extend({
    create: function(t, e) {
      var n = e.apiName,
        r = e.queueName,
        a = new this;
      return a._sdkApiName = n, a._sdkQueueName = r, t[n] = t[n] || (t[n] = {}), t[r] = t[r] || (t[r] = []), a.ctx = t, a
    },
    getSdkApiName: function() {
      return this._sdkApiName
    },
    getSdkQueueName: function() {
      return this._sdkQueueName
    },
    setContextValue: function(t, e) {
      this.ctx[this._sdkApiName] && (this.ctx[this._sdkApiName][t] = e)
    },
    getContextValue: function(t) {
      var e;
      return this.ctx[this._sdkApiName] && (e = this.ctx[this._sdkApiName][t]), !e && this.ctx.goldlog && (e = this.ctx.goldlog[t]), e
    }
  });

  function L() {
    return R
  }

  function j() {
    return L().getSdkApiName()
  }

  function B() {
    return L().getSdkQueueName()
  }

  function F(t) {
    return L().ctx[t]
  }

  function V(t, e) {
    L().ctx[t] = e
  }

  function K(t) {
    return L().getContextValue(t)
  }

  function q(t, e) {
    L().setContextValue(t, e)
  }
  var G = "function",
    H = function() {
      var t = F(j())[j() + "_pubsub"] || {};
      return i(t.publish) === G ? t : ""
    };

  function $(t) {
    var e = H();
    e && i(e.publish) === G && e.publish.apply(e, t)
  }

  function Y(t) {
    var e = H();
    e && i(e.cachePubs) === G && e.cachePubs.apply(e, t)
  }
  var Q = v.indexOf;

  function z() {}

  function W() {
    return {
      init: function(t) {
        this.opts = t, t && "object" === i(t.middleware) && t.middleware.length > 0 ? this.middleware = t.middleware : this.middleware = [], this.plugins_name = []
      },
      pubsubInfo: function(t, e) {
        try {
          var n = t.pubsub;
          n && n.publish("plugins_change_" + t.pubsubType, e)
        } catch (t) {
          console.log(t)
        }
      },
      isConstructor: function(t) {
        var e = !0;
        try {
          new t
        } catch (t) {
          e = !1
        }
        return e
      },
      run: function(t) {
        t || (t = 0);
        var e = this,
          n = this.middleware,
          r = this.opts || {},
          a = r.plugins;
        if (a && "object" === i(a) && a.length > 0) {
          var o = a[t];
          if (this.plugins_name.push(o.name), n.push([function(t, n) {
              var a;
              if (e.pubsubInfo(this, o), o.path && e.isConstructor(o.path) ? a = o.path : o.path.default && e.isConstructor(o.path.default) && (a = o.path.default), a) {
                var i = new a({
                  context: this.context,
                  config: y(o.config || {}, r.config)
                });
                return i.options || (i.init || (i.init = function(t) {
                  this.options = t
                }), i.init({
                  context: this.context,
                  config: y(o.config || {}, r.config)
                })), i.run(t, (function(t) {
                  setTimeout((function() {
                    n(o, t)
                  }), 1)
                }))
              }
            }, o.name]), a[++t]) return this.run(t)
        }
        return n
      }
    }
  }
  z.prototype.create = function(t) {
    for (var e in t) void 0 === this[e] && (this[e] = t[e]);
    return this
  }, z.prototype.calledList = [], z.prototype.setCalledList = function(t) {
    -1 === Q(this.calledList, t) && this.calledList.push(t)
  }, z.prototype.resetCalledList = function() {
    this.calledList = []
  }, z.prototype.wrap = function(t, e) {
    var n = this,
      r = ((this.context || {}).Compose || {}).maxTimeout || 1e4;
    return function(a) {
      var o, i = t.length,
        s = 0,
        c = 0;
      return n.calledList && n.calledList.length > 0 && n.resetCalledList(),
        function u(p, f) {
          if (s !== i) {
            if (-1 === Q(n.calledList, s)) {
              if (n.setCalledList && n.setCalledList(s), !(t && t[s] && P(t[s][0]))) return;
              try {
                a = t[s][0].call(n, a, (function() {
                  s++, c = 1, u(s)
                }))
              } catch (t) {
                console.log(t)
              }
            }
            var l = "number" == typeof a;
            if ("pause" === a || l) {
              c = 0;
              var g = l ? a : r,
                _ = t[s] ? t[s][1] : "";
              o = setTimeout((function() {
                0 === c && (x().w("jump the middleware about " + _ + ", because waiting timeout maxTimeout = " + g), a = null, s++, u())
              }), g)
            } else "done" === a ? u(s = i, a) : (s++, u())
          } else a = "done", n.resetCalledList(), P(e) && f !== a && e.call(n, a), clearTimeout(o)
        }()
    }
  };
  var J = function() {};
  J.prototype.run = function(t, e, n) {
    var r = new W;
    r.init({
      middleware: [],
      config: e.config,
      plugins: t.plugins
    });
    var a = r.run(),
      o = P(t.context) ? new t.context : t.context;
    o.userdata = e.userdata;
    var i = {
        context: o,
        pubsub: K(j() + "_pubsub"),
        pubsubType: e && e.pubsubType
      },
      s = new z;
    s.create(i), s.wrap(a, (function() {
      i.context.status = "complete", e && (e.middlewareMessageKey && $([e.middlewareMessageKey, i.context]), e.messageFnQueue && d(e.messageFnQueue, (function(e) {
        e(getGlobalValue(j()), t)
      }))), P(n) && n(i.context)
    }))()
  };
  var X, Z, et = "mw_change",
    nt = "MetaInfo",
    rt = "append".concat(nt),
    at = "set".concat(nt),
    ot = "_pubsub",
    it = "19999",
    st = "aplus",
    ct = {
      PAGE_ENTER: "PAGE_ENTER",
      CURRENT_PAGE_CONFIG: "CURRENT_PAGE_CONFIG",
      _ANONY_ID: "_anony_id",
      _DEV_ID: "_dev_id",
      _CNA: "cna",
      _browerFP: "_abfpc",
      _USER_ID: "_user_id",
      OTHER: it,
      UNSUBSCRIBE: "".concat(st, ".").concat(st).concat(ot, ".unsubscribe"),
      SUBSCRIBE: "".concat(st, ".").concat(st).concat(ot, ".subscribe"),
      PUBLISH: "".concat(st, ".").concat(st).concat(ot, ".publish"),
      CACHE_PUBS: "".concat(st, ".").concat(st).concat(ot, ".cachePubs"),
      SDK_READY: "".concat(st, "Ready"),
      SDK_PUB: "".concat(st).concat(ot),
      COMPLETE: "complete",
      PV_CODE: "2001",
      EXP_CODE: "2201",
      CLK_CODE: "2101",
      OTHER_CODE: it,
      CLK: "CLK",
      EXP: "EXP",
      SPM_CNT: "spm-cnt",
      SPM_URL: "spm-url",
      SPM_PRE: "spm-pre",
      MW_CHANGE_PV: "".concat(et, "_pv"),
      MW_CHANGE_HJLJ: "".concat(et, "_hjlj"),
      HTTP: "".concat("http", ":"),
      HTTPS: "https:",
      APPEND_META_INFO: rt,
      SET_META_INFO: at,
      SDK_APPEND_META_INFO: "".concat(st, ".").concat(rt),
      SDK_SET_META_INFO: "".concat(st, ".").concat(at),
      PVID: "pvid",
      WEB_PC_PV_SUFFIX: "v.gif",
      WEB_WAP_PV_SUFFIX: "m.gif",
      NATIVE_TRANSP_READY: "".concat(st, "NativeTranspReady")
    },
    ut = ["send", "enter", "sendPV", "record", "combineRecord", "recordUdata", "requestVTConfig", "requestRemoteConfig", "setPageSPM", "setMetaInfo", "appendMetaInfo", "updatePageProperties", "updateNextPageProperties", "updatePageUtparam", "updateNextPageUtparam", "pageAppear", "pageDisappear", "skipPage", "updateSessionProperties", "getPageSpmUrl", "getPageSpmPre", "setPageName", "getElementSPM", "recordAppLink", "onPageShow", "onPageHide", "reportUserInfo"],
    pt = {
      EXP: "2201",
      IMPEXP: "2202",
      CLK: "2101",
      OTHER: it,
      SHOW: "1023",
      H_OR_U: "1010"
    },
    ft = {
      ekvs: "e",
      active_user: "active_user"
    },
    lt = (r(r({}, ft), {}, {
      sessions: "sn"
    }), {
      sdk_type: "sdt",
      device_model: "dm",
      language: "lang",
      device_type: "dt",
      os_version: "ov",
      appkey: "ak",
      sdk_version: "sv",
      resolution: "rl",
      pixel_ratio: "pr",
      _id: "id",
      id_type: "it",
      id_tracking: "itr"
    }),
    gt = (r(r({}, lt), {}, {
      imprint: "imp",
      debugId: "dk"
    }), r(r({}, lt), {}, {
      access: "ac",
      access_subtype: "acs",
      device_manufacturer: "dmf",
      device_name: "dn",
      platform_version: "pv",
      font_size_setting: "fss",
      device_manuid: "did",
      platform_sdk_version: "psv",
      device_brand: "db",
      imprint: "imp",
      miniappDebugId: "dk"
    })),
    _t = {
      uuid: "ud",
      unionid: "und",
      openid: "od",
      anonymousid: "nd",
      alipay_id: "ad",
      device_id: "dd",
      userid: "puid"
    },
    ht = {
      APLUS: st,
      APPKEY: "appKey",
      APLUS_PV_DOMAIN: "aplus-rhost-v",
      APLUS_EKV_DOMAIN: "aplus-rhost-g",
      SESSION_INTERVAL: 3e4,
      PAGE_SCROLL_DURATION: 4e3,
      SESSION_PAUSE_TIME: "session_pause_time",
      IMPRINT: "imprint",
      CURRENT_SESSION: "current_session",
      MAX_EVENTID_LENGTH: 128,
      MAX_PROPERTY_KEY_LENGTH: 256,
      MAX_PROPERTY_KEYS_COUNT: 100,
      FAILED_REQUESTS: "failed_requests",
      REQUESTS: "requests",
      SHARES: "shares",
      EKVS: "ekvs",
      EVENT_MAX_COUNT: 1e4,
      MEMORY_MAX_COUNT: 1,
      MAX_QUEUE_COUNT: 1,
      EVENT_SEND_DEFAULT_INTERVAL: 3e3,
      PAGE_START: "$$_page_start",
      PAGE_END: "$$_page_end",
      APP_START: "$$_app_start",
      APP_END: "$$_app_end",
      USER_PROFILE: "$$_user_profile",
      SHARE_CACHE_INTERVAL: 18e5,
      GLOBAL_PROPERTY: "globalproperty",
      JSBRIDGE_ONLY: "aplus-jsbridge-only",
      JSBRIDGE_AGENT: "Umeng4Aplus",
      APLUS_SKIP_APV_RULES: "aplus-skip-apv-rules",
      APLUS_IMPRINT_VERSION: "APLUS_IMPRINT_VERSION",
      APLUS_REMOTE_CONFIG: "APLUS_REMOTE_CONFIG",
      WEB_EVENT_SUFFIX: "/web_logs",
      PAGE_LEAVE: "$$_page_leave",
      PAGE_STAY: "$$_page_stay",
      APLUS_AUTOTRACK_ENABLED: "aplus-autotrack-enabled",
      APLUS_AUTOTRACK_ENABLED_REMOTE: "apus-autotrack-enabled-remote",
      APLUS_AUTOTRACK_CONFIG: "aplus-autotrack-config",
      APLUS_AUTOTRACK_CONFIG_REMOTE: "aplus-autotrack-config-remote",
      APLUS_DISABLE_AUTOEVENT: "aplus-disable-autoevent",
      APLUS_DISABLE_AUTOEVENT_REMOTE: "aplus-disable-autoevent",
      APLUS_DISABLE_AUTOPV: "aplus-disable-apv",
      APLUS_DISABLE_AUTOPV_REMOTE: "aplus-disable-apv-remote",
      APLUS_EVENT_LIMITRATES: "aplus-event-limitrates",
      APLUS_DEVICE_ENABLE: "aplus-device-enable",
      PERFORMANCE_WARING: "$$_perf_warning",
      START_ID: "START_ID",
      AUTO_GET_OPENID: "autoGetOpenid",
      TRACKDOMAIN: "trackDomain",
      APLUS_MINI_REQUEST_TIMEOUT: "aplus-request-timeout",
      APLUS_LATEAST_UTM: "APLUS_LATEAST_UTM",
      APLUS_FORWARD_APPKEY: "aplus-forward-appkey",
      APLUS_FORWARD_DOMAIN: "aplus-forward-domain",
      APLUS_FORWARD_EVENT_FILTER: "aplus-forward-event-filter",
      CNA_SYNC_READY: "cnaSyncReady",
      PAGE_CONFIG: "pageConfig",
      APLUS_VT_CONFIG_URL: "aplus-vt-cfg-url",
      APLUS_EXPOSURE_EVENT_CAN_REPEAT: "aplus-exposure-event-can-repeat",
      APLUS_MINI_REQUESTS_LIMIT: "aplus-mini-requests-limit",
      DEBUG: "DEBUG",
      APLUS_UTM_EXPIRE_DAYS: "aplus-utm-expire-days",
      APLUS_PAGEVIEW_DURATION_CAN_TRACK: "aplus-pageview-duration-can-track",
      APLUS_PRESET_EVENTS_DISABLED: "aplus-preset-events-disabled",
      APLUS_GLOBALPROPERTY_SYNC_ENABLE: "aplus-globalproperty-sync-enable",
      APLUS_NEXT_PAGE_TRANSP: "aplus-nextpage-properties",
      APLUS_LOCALSTORE_PAGE_TRANSP: "aplus-native-page-properties",
      APLUS_CALLBACK: "qtCallback",
      START_TIME: "start_time"
    },
    dt = {
      record: "".concat(st, ".record"),
      sendPV: "".concat(st, ".sendPV"),
      appendMetaInfo: "".concat(st, ".appendMetaInfo")
    },
    mt = "ekv",
    vt = function(t, e) {
      var n = F(B()),
        r = F(j()),
        a = t.split("."),
        o = r[a[1]],
        i = o ? o[a[2]] : null;
      r && 2 === a.length && o ? o.apply(r, e) : 3 === a.length && i ? i.apply(o, e) : n.push({
        action: t,
        arguments: e
      })
    };

  function yt(t, e) {
    return t && t.getAttribute && t.getAttribute(e) || ""
  }

  function St(t) {
    try {
      return localStorage.getItem(t)
    } catch (t) {
      return ""
    }
  }
  var It = {
      set: function(t, e) {
        try {
          return localStorage.setItem(t, e), !0
        } catch (t) {
          return !1
        }
      },
      get: St,
      test: function() {
        var t = "grey_test_key";
        try {
          return localStorage.setItem(t, 1), localStorage.removeItem(t), !0
        } catch (t) {
          return !1
        }
      },
      remove: function(t) {
        try {
          return localStorage.removeItem(t), !0
        } catch (t) {
          return !1
        }
      },
      getLocalStorageFP: function() {
        var t, e = St(ct._browerFP);
        return e && (t = e.split("_")[0]), t
      }
    },
    bt = function(t, e) {
      var n = e || "";
      if (t) try {
        n = decodeURIComponent(t)
      } catch (t) {}
      return n
    },
    Et = function(t, e) {
      var n, r, a, o = function(t) {
          return X = X || document.getElementsByTagName("head")[0], Z && !t ? Z : X ? Z = X.getElementsByTagName("meta") : []
        }(),
        i = o.length;
      for (n = 0; n < i; n++) yt(r = o[n], "name") === t && (a = yt(r, e || "content"));
      return a || ""
    },
    At = 0,
    Tt = {},
    Pt = {
      getStartId: function() {
        return M.getRandomStr(10) + Date.now() + M.getRandomStr(9)
      },
      getUUID: function() {
        return M.getRandomStr(10) + Date.now() + M.getRandomStr(9)
      },
      fixDomain: function(t) {
        return -1 !== t.indexOf("https://") || -1 !== t.indexOf("http://") ? t : (t = (/^\/\//.test(t) ? "" : "//") + t, /(\d+\.){3,}\d+/.test(t) ? ct.HTTP + t : ct.HTTPS + t)
      },
      getAppKey: function() {
        var t = F(j());
        return t.getMetaInfo("appkey") || t.getMetaInfo("appId") || t.getMetaInfo("appKey")
      },
      getTrackDomain: function() {
        var t = F(j());
        return t.getMetaInfo(ht.APLUS_PV_DOMAIN) || t.getMetaInfo(ht.TRACKDOMAIN)
      },
      checkDomain: function(t, e) {
        var n = new RegExp(/^((http|https|''):\/\/)?([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:[0-9]{1,5})*)(\/.*)?$/),
          r = ((t || "").match(n) || [])[0];
        return !(!t || !r) || (x().tip_w(x().repeat("!")), x().tip_w("trackDomain error, please check ".concat(e, " setting, current value is: ").concat(t) || "undefined"), x().tip_w("we accept these three patterns:"), x().tip_w("eg1: https://test-qtracking-xxx.com:port/a/b/c, port is optional"), x().tip_w("eg2: http://test-qtracking-xxx.com:port/a/b/c, port is optional"), x().tip_w("eg3: test-qtracking-xxx.com:port/a/b/c, port is optional"), x().tip_w(x().repeat("!")), !1)
      },
      checkOpenid: function(t) {
        return !!t || (x().tip_w(x().repeat("!")), x().tip_w("QT need an unique id as QT's deviceid!!"), x().tip_w("setting examples: aplus_queue.push({action: '".concat(j(), ".setMetaInfo', arguments: ['_anony_id', xxxxxx]});")), x().tip_w("referrence document: https://t.tb.cn/1dTHjTTQF0UjOTNHiCkaCS"), x().tip_w(x().repeat("!")), !1)
      },
      checkEvent: function(t, e) {
        if (!t || "string" != typeof t) return x().w("event logkey is invalid, id =", t || "'' event properties = ", E(e.cusp)), !1;
        var n = ["id", "du"],
          r = {};
        if (n.forEach((function(t) {
            r[t] = 1
          })), r[t]) return x().e("eventId has conflict with reservewords: ".concat(n.join(","))), !1;
        if (t.length > ht.MAX_EVENTID_LENGTH) return x().e("The maximum length of event id shall not exceed ".concat(ht.MAX_EVENTID_LENGTH)), !1;
        if (e && ("object" !== i(e) || v.isArray(e)) && "string" != typeof e) return x().e("please check trackEvent properties. properties should be string or object(not include Array)"), !1;
        if ("object" === i(e)) {
          var a = 0;
          for (var o in e)
            if ({}.hasOwnProperty.call(e, o)) {
              if (o.length > ht.MAX_PROPERTY_KEY_LENGTH) return x().e("The maximum length of property key shall not exceed ".concat(ht.MAX_PROPERTY_KEY_LENGTH)), !1;
              if (a >= ht.MAX_PROPERTY_KEYS_COUNT) return x().e("The maximum count of properties shall not exceed ".concat(ht.MAX_PROPERTY_KEYS_COUNT)), !1;
              if (r[o]) return x().e("property key has conflict with reserveWords: ".concat(n.join(","))), !1;
              a += 1
            }
        }
        return !0
      },
      rank: function() {
        return At++, Object.prototype.hasOwnProperty.call(Tt, At) ? At++ : Tt[At] = At, At
      },
      clear: function() {
        At = 0, Tt = {}
      },
      zeroFill: function(t, e, n) {
        var r = "".concat(Math.abs(t)),
          a = e - r.length,
          o = t >= 0,
          i = Math.pow(10, Math.max(0, a)).toString().substring(1) + r;
        return o ? (n ? "+" : "") + i : "-".concat(i)
      },
      date2YYMMDD: function(t) {
        try {
          var e = new Date;
          return [e.getFullYear(), this.zeroFill(e.getMonth() + 1, 2, 0), this.zeroFill(e.getDate(), 2, 0)].join(t || "")
        } catch (t) {
          return ""
        }
      },
      date2YYMMDDHHMMSS: function(t) {
        try {
          var e = new Date;
          return [e.getFullYear(), this.zeroFill(e.getMonth() + 1, 2, 0), this.zeroFill(e.getDate(), 2, 0), this.zeroFill(e.getHours(), 2, 0), this.zeroFill(e.getMinutes(), 2, 0), this.zeroFill(e.getSeconds(), 2, 0)].join(t || "")
        } catch (t) {
          return ""
        }
      },
      mapEventSampleRates: function(t) {
        var e = [];
        return d(t, (function(t) {
          t.eventIds && t.eventIds.length > 0 && d(t.eventIds, (function(n) {
            e.push({
              eventId: n,
              samplingRate: t.samplingRate
            })
          }))
        })), e
      },
      hash: function(t, e) {
        var n, r = e || 1315423911;
        for (n = t.length - 1; n >= 0; n--) r ^= (r << 5) + t.charCodeAt(n) + (r >> 2);
        for (var a = (2147483647 & r).toString(16); a.length < 8;) a += "0";
        return a
      },
      isDebug: function() {
        var t = !1,
          e = F(j());
        try {
          t = /debugMode=true/.test(location.href) || e.getMetaInfo("DEBUG")
        } catch (t) {}
        return t
      },
      localAutoEventDisabled: function() {
        return !!F(j()).getMetaInfo(ht.APLUS_DISABLE_AUTOEVENT)
      },
      localAutoPVDisabled: function() {
        var t = F(j());
        return !(!t.getMetaInfo(ht.APLUS_DISABLE_AUTOPV) && "MAN" !== t.getMetaInfo("aplus-waiting"))
      },
      getAutoTrackStatus: function() {
        return !!F(j()).getMetaInfo(ht.APLUS_AUTOTRACK_ENABLED)
      },
      semicolonStr2Obj: function(t, e, n) {
        e = e || {};
        var r, a, o = t.split(";"),
          i = o.length;
        for (a = 0; a < i; a++) {
          r = o[a].split("=");
          var s = M.trim(r.slice(1).join("="));
          e[M.trim(r[0]) || ""] = n ? s : bt(s)
        }
        return e
      },
      getEtagUrl: function(t) {
        var e = F(j()),
          n = t;
        try {
          var r = e.getMetaInfo(ht.APLUS_PV_DOMAIN);
          r = this.fixDomain(r), n = "".concat(r, "/eg.js")
        } catch (t) {}
        return n
      },
      getImprintFromStorage: function(t) {
        if (It.get && It.test()) {
          var e = "",
            n = It.get(t);
          if (n) {
            var r = n.split("||") || [];
            e = r.length > 1 && r[1]
          }
          return decodeURIComponent(e)
        }
        return ""
      },
      setImprintToStorage: function(t, e) {
        e && It.set && It.test() && It.set(t, "".concat(this.date2YYMMDDHHMMSS(), "||").concat(encodeURIComponent(e)))
      },
      setRemoteConfigToStorage: function(t, e) {
        if (e && It.set && It.test()) {
          var n = b.cloneDeep(e);
          "object" === i(n) && (n = JSON.stringify(n)), It.set(t, "".concat(this.date2YYMMDDHHMMSS(), "||").concat(encodeURIComponent(n)))
        }
      },
      getRemoteConfigFromStorage: function(t) {
        if (It.get && It.test()) {
          var e = "",
            n = It.get(t);
          if (n) {
            var r = n.split("||") || [];
            e = r.length > 1 && r[1]
          }
          return A(decodeURIComponent(e))
        }
        return ""
      },
      setCnaToStorage: function(t, e, n) {
        n && It.set && It.test() && It.set(t, "".concat(e, "_").concat(encodeURIComponent(n)))
      },
      getCnaFromStorage: function(t, e) {
        if (It.get && It.test()) {
          var n = "",
            r = It.get(t);
          if (r) {
            var a = r.split("_") || [];
            n = e ? a.length > 1 && e === a[0] ? a[1] : "" : a.length > 1 ? a[1] : ""
          }
          return decodeURIComponent(n)
        }
        return ""
      },
      deleteInfo: function(t, e) {
        return d(e, (function(e) {
          delete t[e]
        })), t
      },
      resetFn: function() {
        var t = arguments.length > 0 && arguments[0] ? arguments[0] : {},
          e = arguments.length > 1 && arguments[1] ? arguments[1] : "",
          n = arguments.length > 2 && arguments[2] ? arguments[2] : function() {},
          r = t[e];
        t[e] = function() {
          var t = r && r.apply(this, arguments);
          return t ? n.call(this, t) : n.apply(this, arguments)
        }
      },
      rewriteFn: function(t, e, n) {
        var r = t[e];
        t[e] = function(t) {
          n.call(this, t), r && r.call(this, t)
        }
      },
      getHashKey: function(t, e) {
        var n = [e.logkey, e.cssSelector];
        return e.positionSelector && n.push(e.positionSelector), t.id && n.push(t.id), t.index >= 0 && n.push(t.index), t.dataset && t.dataset.privateNodeId && delete t.dataset.privateNodeId, t.dataset && n.push(JSON.stringify(t.dataset)), n.join("_")
      },
      getTimeZone: function() {
        var t = -(new Date).getTimezoneOffset() / 60;
        return Math.abs(parseInt(t, 10))
      },
      convertNativeMapStringToJSON: function(t) {
        var e = t.replace(/(\w+)=([^,]+)/g, '"$1":"$2"').replace(/[{}]/g, ""),
          n = "{".concat(e, "}");
        return JSON.parse(n)
      }
    },
    Ot = {
      rank: Pt.rank,
      clear: Pt.clear
    },
    wt = {
      localAutoEventDisabled: Pt.localAutoEventDisabled,
      localAutoPVDisabled: Pt.localAutoPVDisabled,
      getAutoTrackStatus: Pt.getAutoTrackStatus
    },
    Ct = {
      set: Pt.setRemoteConfigToStorage,
      get: Pt.getRemoteConfigFromStorage
    },
    kt = {
      set: Pt.setImprintToStorage,
      get: Pt.getImprintFromStorage
    },
    Mt = {
      set: Pt.setCnaToStorage,
      get: Pt.getCnaFromStorage
    },
    Dt = {
      resetFn: Pt.resetFn,
      rewriteFn: Pt.rewriteFn
    };
  Pt.LocalCfgUtils = wt, Pt.RemoteCfgUtils = Ct, Pt.CNAUtils = Mt, Pt.ImprintUtils = kt, Pt.AccessType = {
    MOBILE_NETWORK_2G: "2g",
    MOBILE_NETWORK_3G: "3g",
    MOBILE_NETWORK_4G: "4g",
    MOBILE_NETWORK_NONE: "none"
  }, Pt.FunctionUtils = Dt, Pt.RankUtils = Ot;
  var xt, Nt = "httpRequest",
    Rt = "request",
    Ut = function() {};

  function Lt() {
    try {
      return {
        ctx: dd,
        platType: "dd",
        sdkType: "ddmp",
        logDomain: "/ddm_logs"
      }
    } catch (e) {
      try {
        return {
          ctx: my,
          platType: my && my.tb ? "taobao" : "my",
          sdkType: my && my.tb ? "taobaomp" : "mymp",
          logDomain: "/alipaym_logs"
        }
      } catch (e) {
        try {
          return {
            ctx: tt,
            platType: "tt",
            sdkType: "ttmp",
            logDomain: "/bytedancem_logs"
          }
        } catch (e) {
          try {
            return {
              ctx: swan,
              platType: "bd",
              sdkType: "bdmp",
              logDomain: "/baidum_logs"
            }
          } catch (e) {
            try {
              return {
                ctx: xhs,
                platType: "xhs",
                sdkType: "xhsmp",
                logDomain: "/wxm_logs"
              }
            } catch (e) {
              try {
                return {
                  ctx: t.wx$1,
                  platType: "wx",
                  sdkType: "wxmp",
                  logDomain: "/wxm_logs"
                }
              } catch (t) {
                try {
                  return {
                    ctx: jd,
                    platType: "jd",
                    sdkType: "jdmp",
                    logDomain: "/wxm_logs"
                  }
                } catch (t) {
                  return {
                    ctx: {},
                    platType: "UNKNOW",
                    sdkType: "UNKNOW"
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  function jt() {
    return Lt().platType
  }

  function Bt() {
    return Lt().ctx
  }

  function Ft() {
    if ("boolean" == typeof xt) return xt;
    var t = !1;
    try {
      var e = navigator ? navigator.userAgent || navigator.swuserAgent : "";
      if (t = !!/AliApp/i.test(e), /AliApp\((AP|DingTalk|AMAP|UC|QUARK)/i.test(e) && (t = !1), /AliApp\(KB/i.test(e) && (t = !!/Mist/.test(e)), /AlipayIDE Taobao/.test(e) && (t = !0), t) {
        var n = jt().ctx;
        P(n.canIUse) && (t = !!n.canIUse("callUserTrack"))
      }
    } catch (t) {}
    return xt = t, t
  }
  var Vt = {
    getPlatformType: jt,
    getPlatformSdkType: function() {
      return Lt().sdkType
    },
    getPlatformContext: Bt,
    getLogDomain: function() {
      return Lt().logDomain
    },
    getCurrentPage: function() {
      var t = getCurrentPages();
      return t[t.length - 1] || {}
    },
    getReferrerPage: function() {
      var t = getCurrentPages();
      return t[t.length - 2] || {}
    },
    resetIsTB: function(t) {
      xt = t
    },
    initIsTB: Ft,
    isTB: function() {
      return "boolean" == typeof xt ? !!xt : Ft()
    },
    getWxTitle: function(t) {
      if (!t) return "";
      var e = jt(),
        n = "";
      try {
        if ("wx" === e && __wxConfig) {
          var r = __wxConfig,
            a = __wxConfig.page || {},
            o = a[t] || a[t + ".html"],
            i = {},
            s = {};
          if (r.global && r.global.window && r.global.window.navigationBarTitleText && (i.title = r.global.window.navigationBarTitleText), o && o.window && o.window.navigationBarTitleText && (s.title = o.window.navigationBarTitleText), !s.title && __wxAppCode__) {
            var c = __wxAppCode__[t + ".json"];
            c && c.navigationBarTitleText && (s.title = c.navigationBarTitleText)
          }
          var u = L().ctx;
          u[j()].globalTitleMap && eachMap(u[j()].globalTitleMap, (function(e, r) {
            e === t && (n = r)
          })), 0 === n.length && (n = s.title || i.title || "")
        }
        return n
      } catch (t) {
        return x().w("current platform can not track page title"), n
      }
    },
    setStorageSync: function(t, e) {
      try {
        var n = jt(),
          r = Bt();
        "my" === n || "taobao" === n ? r.setStorageSync({
          key: t,
          data: e
        }) : r.setStorageSync(t, e)
      } catch (t) {}
    },
    getStorageSync: function(t) {
      try {
        var e = jt(),
          n = Bt();
        return "my" === e || "taobao" === e ? n.getStorageSync({
          key: t
        }).data : n.getStorageSync(t)
      } catch (t) {}
    },
    request: function(t, e, n, r) {
      var a = F(j()),
        o = Bt();
      P(r) || (r = Ut), P(n) || (n = Ut);
      var s = e.requestMethodName || Rt,
        c = o[s];
      P(c) || s === Rt || (c = o[s = Rt]), P(c) || s === Nt || (c = o[s = Nt]);
      var u, p, f = e && e.dataType ? e.dataType : "base64",
        l = a.getMetaInfo(ht.APLUS_MINI_REQUEST_TIMEOUT),
        g = e && e.timeout ? e.timeout : l,
        _ = e.method || "GET";
      if (t = Pt.fixDomain(t), P(c)) {
        var h = {
          url: t,
          method: _,
          dataType: f,
          timeout: g,
          success: function(t) {
            u || (u = !0, n(t))
          },
          fail: function(t) {
            u || (u = !0, r({
              failure: !0,
              data: t
            }))
          }
        };
        "POST" === _ && "object" === i(e.data) && (h.url = h.url.split("?")[0], Nt === s ? (h.headers = {
          "Content-Type": "application/json"
        }, h.dataType = "json", h.data = JSON.stringify(e.data)) : h.data = e.data);
        var d = (a = F(j())).getMetaInfo("aplus-request-extinfo");
        "object" === i(d) && (h._extInfo = d), c(h)
      } else u || (u = !0, r({
        failure: !0,
        data: p
      }));
      setTimeout((function() {
        u || (u = !0, p = 'aplus log request"' + t + ' timeout", time spend' + g + "ms", console && console.warn(p), r({
          failure: !0,
          data: p
        }))
      }), g)
    },
    getUtmParamsObj: function(t) {
      var e = {};
      try {
        b.eachMap(t, (function(t, n) {
          if (0 === t.indexOf("utm_")) e[t] = "".concat(n);
          else if ("scene" === t && M.isString(n)) {
            var r = decodeURIComponent(n) || "",
              a = M.query2obj(r);
            b.eachMap(a, (function(t, n) {
              0 === t.indexOf("utm_") && (e[t] = "".concat(n))
            }))
          }
        }))
      } catch (t) {}
      return e
    }
  };

  function Kt(t) {
    if (t.__esModule) return t;
    var e = t.default;
    if ("function" == typeof e) {
      var n = function t() {
        if (this instanceof t) {
          var n = [null];
          return n.push.apply(n, arguments), new(Function.bind.apply(e, n))
        }
        return e.apply(this, arguments)
      };
      n.prototype = e.prototype
    } else n = {};
    return Object.defineProperty(n, "__esModule", {
      value: !0
    }), Object.keys(t).forEach((function(e) {
      var r = Object.getOwnPropertyDescriptor(t, e);
      Object.defineProperty(n, e, r.get ? r : {
        enumerable: !0,
        get: function() {
          return t[e]
        }
      })
    })), n
  }

  function qt(t, e) {
    try {
      ! function() {
        if (t && v.isArray(t) && t.length) {
          for (var n = Jt(t).queue, r = {}, a = []; r = n.shift();) Wt(r, e, (function(t) {
            a.push(t)
          }));
          a.length > 0 && setTimeout((function() {
            for (; r = a.shift();) Wt(r, e)
          }), 100)
        }
      }()
    } catch (t) {
      x().w(t)
    }
  }

  function Gt() {
    return (K("_$") || {}).meta_info
  }
  var Ht = [],
    $t = [],
    Yt = [];

  function Qt(t) {
    qt(Ht, t), qt($t, t), qt(Yt, t)
  }

  function zt(t, e) {
    return e && ut.indexOf(t) > -1 && (t = "_".concat(t)), t
  }

  function Wt(t, e, n) {
    var r = !!e.isOpenApi,
      a = t ? t.action : "",
      o = t ? t.arguments : "",
      i = function(t) {
        var e, n = (e = Gt() || {}, "1" !== "".concat(e.uaid) || e._anony_id ? e._hold || e["aplus-waiting"] : "BLOCK"),
          r = Gt() || {},
          a = !0,
          o = t.arguments || [],
          i = o[0],
          s = o[1],
          c = "START";
        return "_hold" === i && s === c || "_anony_id" === i && s ? c : (t && /sendPV|record|setPageSPM|setMetaInfo|appendMetaInfo$/.test(t.action) && "BLOCK" === n && (r[n] || (Yt.push(t), a = !1)), a)
      }(t);
    if (i) {
      var s = L().ctx;
      try {
        if (a && o && v.isArray(o)) {
          var c, u = a.split("."),
            p = s,
            f = s;
          if (3 === u.length) f = (p = s[u[0]][u[1]] || {})[c = zt(u[2], r)] ? p[c] : "";
          else
            for (; u.length;)
              if (f = p = p[c = zt(u.shift(), r)], !p) return void(P(n) && n(t));
          P(f) && f.apply(p, o), "START" === i && Qt(e)
        }
      } catch (t) {
        x().w(t)
      }
    }
  }

  function Jt(t, e) {
    for (var n, r = {
        subscribeMwChangeQueue: [],
        subscribeMetaQueue: [],
        subscribeQueue: [],
        metaQueue: [],
        othersQueue: []
      }, a = {}; a = t.shift();) try {
      var o = a.action,
        i = a.arguments[0];
      /subscribe/.test(o) ? "setMetaInfo" === i ? r.subscribeMetaQueue.push(a) : i === ct.MW_CHANGE_PV || i === ct.MW_CHANGE_HJLJ ? r.subscribeMwChangeQueue.push(a) : r.subscribeQueue.push(a) : /MetaInfo/.test(o) ? r.metaQueue.push(a) : r.othersQueue.push(a)
    } catch (t) {
      x().w(t), r.othersQueue.push(a)
    }
    return e && r[e] && (n = r[e], r[e] = []), {
      queue: r.subscribeMwChangeQueue.concat(r.metaQueue).concat(r.subscribeQueue).concat(r.subscribeMetaQueue, r.othersQueue),
      formatQueue: n
    }
  }
  var Xt = N.extend({
      push: function(t) {
        this.length++, Wt(t, this.opts)
      }
    }),
    Zt = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "processAplusQueue",
        value: function(t) {
          var e = this.options.config || {},
            n = F(t);
          qt(n, e), V(t, Xt.create({
            opts: e,
            startLength: n.length,
            length: 0
          }))
        }
      }, {
        key: "run",
        value: function() {
          var t, e, n = this.options.context.sdk_config.queueName;
          this.processAplusQueue(n), t = n, e = this.options.config, F(t).push({
            action: ct.SUBSCRIBE,
            arguments: [ct.SET_META_INFO, function(t, n) {
              t === ht.DEBUG ? x().setDebug(!!n) : t === ct._USER_ID && n ? qt(Ht, e) : t === ct._ANONY_ID && n ? qt($t, e) : "_hold" === t && "START" === n && Qt(e)
            }]
          })
        }
      }]), t
    }(),
    te = Kt(Object.freeze({
      __proto__: null,
      default: Zt
    })),
    ee = function() {
      var t = null,
        e = "",
        n = null,
        r = !1;

      function a() {
        var t = Vt.getPlatformContext();
        this.load = function(a) {
          n ? (t.removeStorage({
            key: e
          }), P(a) && a()) : (e = "aplus_cache_".concat(Pt.getAppKey()), t.getStorage({
            key: e,
            success: function(o) {
              n = o && o.data && A(o.data) || {}, r = !0, t.removeStorage({
                key: e
              }), P(a) && a()
            },
            fail: function(o) {
              x().w("".concat(e, ": ").concat(o.errMsg)), n = {}, r = !0, t.removeStorage({
                key: e
              }), P(a) && a()
            }
          }))
        }, this.save = function() {
          n && t.setStorage({
            key: e,
            data: E(n)
          })
        }, this.set = function(t, e) {
          n && (n[t] = e)
        }, this.get = function(t) {
          return (n || {})[t]
        }, this.remove = function(t) {
          n && n[t] && delete n[t]
        }, this.getAll = function() {
          return n
        }, this.clear = function() {
          n = null
        }, this.has = function(t) {
          return !!this.get(t)
        }, this.isLoaded = function() {
          return r
        }, this.getSync = function(t) {
          try {
            var e = Vt.getStorageSync(t);
            return t === ht.APLUS_IMPRINT_VERSION ? e : "string" == typeof e ? A(e) : e
          } catch (t) {}
        }, this.setSync = function(t, e) {
          try {
            "object" === i(e) ? Vt.setStorageSync(t, JSON.stringify(e)) : Vt.setStorageSync(t, e)
          } catch (t) {}
        }
      }
      return function() {
        return t || (t = new a), t
      }
    }(),
    ne = function() {
      var t = null,
        e = null,
        n = null;
      return function() {
        return t || (t = {
          resume: function(t) {
            var r = !1;
            return n || (n = ee().get(ht.CURRENT_SESSION)), e = Date.now(), (!n || !n.end_time || e - n.end_time > ht.SESSION_INTERVAL) && (r = !0, function(t) {
              try {
                var e = (n || {}).options || {},
                  r = y({}, function(t) {
                    var e = {};
                    for (var n in t) e[n] = t[n];
                    return e
                  }(t.query));
                r.path = t.path || e.path, r.scene = t.scene ? "".concat(Vt.getPlatformType(), "_").concat(t.scene) : e.scene;
                var a = t.referrerInfo;
                a && (r.referrerAppId = a.appId), x().i("current launch options: ", r);
                var o = F(j()).getMetaInfo("globalproperty"),
                  i = Date.now();
                n = {
                  id: M.getRandomStr(10) + i,
                  start_time: i,
                  options: r,
                  state_s: 1
                }, o && (n.gp = o)
              } catch (t) {
                x().e("generate new session failed, errmsg: ", t)
              }
            }(t)), r
          },
          pause: function() {
            ! function() {
              if (n) {
                var t = new Date;
                n.end_time = Date.now(), "number" != typeof n.duration && (n.duration = 0), n.duration = n.end_time - e, n.state_s = 0, ee().set(ht.CURRENT_SESSION, n), x().i("session end (%s): %s ", n.id, t.toLocaleTimeString(), n)
              }
            }()
          },
          getCurrentSessionId: function() {
            return (n || {}).id
          },
          getCurrentSession: function() {
            return n
          },
          cloneCurrentSession: function() {
            return S(n)
          }
        }), t
      }
    }(),
    re = function() {
      var t, e, n, r = [],
        a = [];

      function o(t, n) {
        var r = (t = t || {})[e];
        return m(r) && r.length ? t[e] = r.concat(n) : t[e] = [].concat(n), t
      }
      return function() {
        return t || (t = {
          addEvent: function(t) {
            t && (e = e || "sessionid") && (r.unshift(t), r.length > ht.MEMORY_MAX_COUNT && (function() {
              if (r.length) {
                var t = ee().get(ht.EKVS);
                (function(t) {
                  var e = 0;
                  for (var n in t) m(t[n]) && (e += t[n].length);
                  return e
                })(t) + r.length <= ht.EVENT_MAX_COUNT && (t = o(t, r), ee().set(ht.EKVS, t))
              }
            }(), r.length = 0))
          },
          setSessionId: function(t) {
            if (e = t, m(a) && a.length && e) {
              for (var n = 0; n < a.length; n++) this.addEvent(a[n]);
              a.length = 0
            }
          },
          setStartId: function(t) {
            n = t
          },
          getStartId: function() {
            return n
          },
          getEkvs: function() {
            var t = ee().get(ht.EKVS);
            return r && r.length && (t = o(t, r)), t
          },
          getEkvsLen: function() {
            var t = (ee().get(ht.EKVS) || {})[e] || [],
              n = r ? r.length : 0;
            return t.length + n
          },
          clear: function() {
            ee().remove(ht.EKVS), r.length = 0, a.length = 0
          }
        }), t
      }
    }();

  function ae(t) {
    var e;
    return (e = function() {
      try {
        return window
      } catch (t) {}
    }() ? Pt.RemoteCfgUtils.get(ht.APLUS_REMOTE_CONFIG) : ee().getSync(ht.APLUS_REMOTE_CONFIG)) && e[t]
  }

  function oe() {
    return F(j()).getMetaInfo(ht.APLUS_DISABLE_AUTOEVENT_REMOTE) || ae("codelessClickEventStatus")
  }

  function ie() {
    var t = F(j());
    return ae("currentDeviceEnable") || t.getMetaInfo(ht.APLUS_DEVICE_ENABLE)
  }

  function se() {
    return F(j()).getMetaInfo(ht.APLUS_DISABLE_AUTOPV_REMOTE) || ae("codelessCollectorPageStatus")
  }

  function ce() {
    return F(j()).getMetaInfo(ht.APLUS_AUTOTRACK_ENABLED_REMOTE) || ae("codelessStatus")
  }

  function ue(t) {
    var e, n, r, a = j(),
      o = F(B());
    t && !b.isEmptyObject(t) && (e = t.codelessClickEventStatus, n = F(B()), r = j(), n.push({
      action: "".concat(r, ".setMetaInfo"),
      arguments: [ht.APLUS_DISABLE_AUTOEVENT_REMOTE, e]
    }), function(t) {
      var e = F(B()),
        n = j();
      e.push({
        action: "".concat(n, ".setMetaInfo"),
        arguments: [ht.APLUS_DISABLE_AUTOPV_REMOTE, t]
      })
    }(t.codelessCollectorPageStatus), function(t) {
      var e = j();
      F(B()).push({
        action: "".concat(e, ".setMetaInfo"),
        arguments: [ht.APLUS_AUTOTRACK_ENABLED_REMOTE, t]
      })
    }(t.codelessStatus), function(t) {
      var e = F(B()),
        n = j();
      e.push({
        action: "".concat(n, ".setMetaInfo"),
        arguments: [ht.APLUS_DEVICE_ENABLE, t]
      })
    }(t.currentDeviceEnable), t.eventSamplingRate && t.eventSamplingRate.length > 0 && o.push({
      action: "".concat(a, ".setMetaInfo"),
      arguments: [ht.APLUS_EVENT_LIMITRATES, Pt.mapEventSampleRates(t.eventSamplingRate)]
    }), t.codelessIgnoreComponent && t.codelessIgnoreComponent.length > 0 && o.push({
      action: "".concat(a, ".setMetaInfo"),
      arguments: [ht.APLUS_AUTOTRACK_CONFIG_REMOTE, t.codelessIgnoreComponent]
    }))
  }
  var pe = {
      getAutoEventStatus: oe,
      enableCfg: ue,
      getAutoTrackStatus: ce,
      getAutoPageStatus: se,
      getDeviceStatus: ie
    },
    fe = new(function() {
      function t() {
        return u(this, t), t.instance || (t.instance = this, t.instance.capacity = 1, t.instance.tokens = 1, t.instance.fillRate = 1, t.instance.lastFillTime = Date.now(), t.instance.loaded = !1), t.instance
      }
      var e;
      return p(t, [{
        key: "run",
        value: function() {
          var t = this;
          setInterval((function() {
            t.fill()
          }), 1e3)
        }
      }, {
        key: "load",
        value: function() {
          if (!this.loaded) {
            var t = F(j()).getMetaInfo(ht.APLUS_MINI_REQUESTS_LIMIT);
            this.capacity = "number" == typeof t && t <= 5 && t >= 1 ? t : 1, this.loaded = !0
          }
        }
      }, {
        key: "fill",
        value: function() {
          var t = Date.now(),
            e = (t - this.lastFillTime) * (this.fillRate / 1e3);
          this.tokens = Math.ceil(Math.min(this.tokens + e, this.capacity)), this.lastFillTime = t
        }
      }, {
        key: "consume",
        value: (e = c(a().mark((function t(e) {
          var n;
          return a().wrap((function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                if (!(e <= this.tokens)) {
                  t.next = 5;
                  break
                }
                return this.tokens -= e, t.abrupt("return", {
                  allowed: !0
                });
              case 5:
                return n = 1e3 * Math.ceil((e - this.tokens) / this.fillRate), t.abrupt("return", {
                  allowed: !1,
                  waitTime: n
                });
              case 7:
              case "end":
                return t.stop()
            }
          }), t, this)
        }))), function(t) {
          return e.apply(this, arguments)
        })
      }]), t
    }());

  function le(t) {
    var e = t,
      n = [];
    this.enqueue = function(t) {
      "number" == typeof e && this.size() >= e && this.dequeue(), n.push(t)
    }, this.dequeue = function() {
      return n.shift()
    }, this.front = function() {
      return n[0]
    }, this.isEmpty = function() {
      return 0 === n.length
    }, this.clear = function() {
      n.length = 0
    }, this.size = function() {
      return n.length
    }, this.items = function() {
      return n
    }, this.print = function() {
      x().i("---queue: ", n.toString())
    }
  }

  function ge(t) {
    var e = {},
      n = t.networkType;
    switch ("none" === n && (n = "unknown"), n = n ? n.toLowerCase() : "") {
      case Pt.AccessType.MOBILE_NETWORK_4G:
        e.access_subtype = "LTE", e.access = "4G";
        break;
      case Pt.AccessType.MOBILE_NETWORK_3G:
        e.access_subtype = "CDMA", e.access = "3G";
        break;
      case Pt.AccessType.MOBILE_NETWORK_2G:
        e.access_subtype = "GRPS", e.access = "2G";
        break;
      default:
        e.access = n, delete e.access_subtype
    }
    return e
  }
  var _e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    he = function(t) {
      for (var e = {}, n = 0, r = t.length; n < r; n++) e[t.charAt(n)] = n;
      return e
    }(_e),
    de = String.fromCharCode,
    me = function(t) {
      var e;
      return t.length < 2 ? (e = t.charCodeAt(0)) < 128 ? t : e < 2048 ? de(192 | e >>> 6) + de(128 | 63 & e) : de(224 | e >>> 12 & 15) + de(128 | e >>> 6 & 63) + de(128 | 63 & e) : (e = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320), de(240 | e >>> 18 & 7) + de(128 | e >>> 12 & 63) + de(128 | e >>> 6 & 63) + de(128 | 63 & e))
    },
    ve = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
    ye = function(t) {
      var e = [0, 2, 1][t.length % 3],
        n = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0);
      return [_e.charAt(n >>> 18), _e.charAt(n >>> 12 & 63), e >= 2 ? "=" : _e.charAt(n >>> 6 & 63), e >= 1 ? "=" : _e.charAt(63 & n)].join("")
    },
    Se = function(t) {
      return t.replace(ve, me).replace(/[\s\S]{1,3}/g, ye)
    };

  function Ie(t, e) {
    return e ? Se(String(t)).replace(/[+\/]/g, (function(t) {
      return "+" === t ? "-" : "_"
    })).replace(/\=/g, "") : Se(String(t))
  }
  var be = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
    Ee = function(t) {
      switch (t.length) {
        case 4:
          var e = ((7 & t.charCodeAt(0)) << 18 | (63 & t.charCodeAt(1)) << 12 | (63 & t.charCodeAt(2)) << 6 | 63 & t.charCodeAt(3)) - 65536;
          return de(55296 + (e >>> 10)) + de(56320 + (1023 & e));
        case 3:
          return de((15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2));
        default:
          return de((31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1))
      }
    },
    Ae = function(t) {
      var e = t.length,
        n = e % 4,
        r = (e > 0 ? he[t.charAt(0)] << 18 : 0) | (e > 1 ? he[t.charAt(1)] << 12 : 0) | (e > 2 ? he[t.charAt(2)] << 6 : 0) | (e > 3 ? he[t.charAt(3)] : 0),
        a = [de(r >>> 16), de(r >>> 8 & 255), de(255 & r)];
      return a.length -= [0, 0, 2, 1][n], a.join("")
    },
    Te = [];

  function Pe(t, e) {
    var n = Oe(t, e);
    return t && t.id_tracking && (n[e.id_tracking || "id_tracking"] = Oe(t.id_tracking, _t)), n
  }

  function Oe(t, e) {
    var n = {};
    for (var r in t) e[r] ? n[e[r]] = t[r] : n[r] = t[r];
    return n
  }

  function we(t, e) {
    var n = {};
    if (t)
      for (var r in t) t[r] && (n[e[r]] = t[r]);
    return n
  }
  var Ce = new(function() {
    function t() {
      u(this, t), this._imprint = ""
    }
    return p(t, [{
      key: "set",
      value: function(t) {
        this._imprint = "string" == typeof t ? t : Ie(JSON.stringify(t))
      }
    }, {
      key: "get",
      value: function() {
        return this._imprint
      }
    }, {
      key: "getImpObj",
      value: function() {
        return A((t = this._imprint, function(t) {
          return t.replace(/[\s\S]{1,4}/g, Ae).replace(be, Ee)
        }(String(t).replace(/[-_]/g, (function(t) {
          return "-" === t ? "+" : "/"
        })).replace(/[^A-Za-z0-9\+\/]/g, ""))));
        var t
      }
    }, {
      key: "getItem",
      value: function(t) {
        var e = this.getImpObj();
        return e && e[t] || ""
      }
    }, {
      key: "load",
      value: function() {
        this._imprint = ee().get(ht.IMPRINT)
      }
    }, {
      key: "save",
      value: function() {
        this._imprint && ee().set(ht.IMPRINT, this._imprint)
      }
    }]), t
  }());

  function ke(t, e, n, a) {
    var o, i = F(j()),
      s = function() {
        var t = {},
          e = F(j()),
          n = e.globalConfig || {},
          r = e._aplus_client || {},
          a = ee().get(ht.IMPRINT);
        a && (t.imprint = a), t.device_type = "Phone", t.sdk_version = n.lver, t.appkey = Pt.getAppKey(), t.device_info = "", t.appid = r.appId, t.app_version = e.getMetaInfo("appVersion") || "devtools";
        var o = e.getMetaInfo("aplus-global-args");
        o && o.debugId ? t.miniappDebugId = o.debugId : ee().get("miniappDebugId") && (t.miniappDebugId = ee().get("miniappDebugId"));
        var i = r || {};
        i.safeArea = i.safeArea || {};
        var s = i.model || "",
          c = i.platform || "",
          u = i.brand || "",
          p = u.toLowerCase();
        t.sdk_type = Vt.getPlatformSdkType(), t.platform = Vt.getPlatformType(), t.platform_sdk_version = i.SDKVersion, t.platform_version = i.platformVersion;
        var f = Math.round(i.screenWidth * i.pixelRatio),
          l = Math.round(i.screenHeight * i.pixelRatio);
        t.resolution = f > l ? "".concat(f, "*").concat(l) : "".concat(l, "*").concat(f), t.pixel_ratio = i.pixelRatio, t.os = c, t.font_size_setting = i.fontSizeSetting, t.device_model = s, t.device_brand = u, t.device_manufacturer = p, t.device_manuid = s, t.device_name = s, t.os_version = i.os_version, t.language = i.language;
        var g = ge(r);
        return t.access = g.access, g.access_subtype && (t.access_subtype = g.access_subtype), t
      }();
    try {
      if ("my" === Vt.getPlatformType() || "taobao" === Vt.getPlatformType() ? (s.id_type = "alipay_id", s.id_tracking = {
          alipay_id: i.getMetaInfo(ct._ANONY_ID) || ee().get(ct._ANONY_ID) || "",
          unionid: i.getMetaInfo(ct._DEV_ID) || ee().get(ct._DEV_ID) || "",
          userId: i.getMetaInfo(ct._USER_ID) || ""
        }) : (s.id_type = "openid", s.id_tracking = {
          openid: i.getMetaInfo(ct._ANONY_ID) || ee().get(ct._ANONY_ID) || "",
          unionid: i.getMetaInfo(ct._DEV_ID) || ee().get(ct._DEV_ID) || "",
          userId: i.getMetaInfo(ct._USER_ID) || ""
        }), Ce.get() && (s[ht.IMPRINT] = Ce.get()), t.analytics) {
        var c = i.getMetaInfo(ct._USER_ID) || Vt.getStorageSync(ct._USER_ID),
          u = i.getMetaInfo("_user_nick");
        t.analytics.active_user = {
          puid: c,
          provider: u
        }
      }
      var p = Date.now();
      t.header = b.assign(s, r(r({}, t.header), {}, {
        traceId: M.getRandomStr(10) + p + M.getRandomStr(9),
        start_id: re().getStartId()
      }));
      var f = {
          h: Pe((o = t).header, gt),
          a: we(o.analytics, ft)
        },
        l = E(f),
        g = function() {
          var t = F(j()),
            e = t.getMetaInfo(ht.TRACKDOMAIN) || t.getMetaInfo(ht.APLUS_PV_DOMAIN);
          if (!Pt.checkDomain(e)) return "";
          var n = Vt.getLogDomain();
          return n ? Pt.fixDomain(e) + n : (x().tip_w("current miniapp framework is not supported!!"), "")
        }(),
        _ = i.getMetaInfo(ht.APLUS_MINI_REQUEST_TIMEOUT) || ht.DEFAULT_REQUEST_TIMEOUT,
        h = {
          url: g,
          method: "POST",
          data: Ie(l),
          timeout: _,
          success: function(r) {
            var a, o, i = r.code || r.status || r.statusCode;
            if (200 === i || 413 === i) {
              x().i("event send success:", t, l);
              try {
                r.profile && ("number" == typeof(o = (a = {
                  end: r.profile.responseEnd,
                  start: r.profile.requestStart
                }).end - a.start) && o >= 300 ? Te.push(o) : Te = [], Te.length >= 10 && (F(j())._record(ht.PERFORMANCE_WARING, "OTHER", {}), Te = []))
              } catch (t) {
                x().w("current miniapp not support profile API")
              }! function(t) {
                var e = ee().getSync(ht.APLUS_IMPRINT_VERSION);
                if (t) {
                  var n = F(j());
                  if (t.imprintVersion && t.imprintVersion !== e) {
                    var r = t.imprintVersion;
                    ee().setSync(ht.APLUS_IMPRINT_VERSION, r);
                    var a = n.getMetaInfo(ht.APLUS_PV_DOMAIN) || n.getMetaInfo(ht.TRACKDOMAIN),
                      o = Pt.fixDomain(a) + r;
                    n.requestRemoteConfig(o, (function(t) {
                      t.data && t.data.data && (ue(t.data.data), ee().setSync(ht.APLUS_REMOTE_CONFIG, t.data.data))
                    }), (function(t) {
                      x().w("remote configuration request failed, errmsg:", t)
                    }))
                  } else ue(ee().getSync(ht.APLUS_REMOTE_CONFIG))
                }
              }(r.data || {}), P(e) && e(r)
            } else x().w("event send failed:", l), P(n) && n()
          },
          fail: function(t) {
            Date.now() - p < d ? (x().w("event send failed:", l), x().w("event send failed because ", t)) : (x().w("current request timeout:", d), x().w("event send timeout:", l)), P(n) && n()
          },
          complete: function() {
            P(a) && a()
          }
        },
        d = i.getMetaInfo(ht.APLUS_MINI_REQUEST_TIMEOUT);
      d && (h.timeout = d),
        function(t) {
          var e = Vt.getPlatformContext();
          try {
            e.request(t)
          } catch (e) {
            try {
              dd && dd.httpRequest(t)
            } catch (t) {
              x().w("request send failed, err msg: ", t)
            }
          }
        }(b.assign(h, "dd" === Vt.getPlatformType() ? {
          headers: {
            "Content-Type": "application/json"
          }
        } : {
          header: {
            "content-type": "application/json"
          }
        }))
    } catch (o) {}
  }
  var Me, De = function(t) {
      return new Promise((function(e) {
        return setTimeout(e, t)
      }))
    },
    xe = function(t) {
      if (t && t.analytics && t.analytics.ekvs) return Object.keys(t.analytics.ekvs)[0]
    },
    Ne = function(t) {
      var e = [];
      if (v.isArray(t) && t.length > 0) {
        Array.from(new Set(t.map((function(t) {
          return t.header.start_id
        })))).forEach((function(n) {
          var r, a = t.filter((function(t) {
            return t.header.start_id === n
          })).reduce((function(t, e, n, a) {
            if (t) {
              r = b.cloneDeep(t);
              var o = xe(t);
              return r.analytics.ekvs[o] = r.analytics.ekvs[o].concat(e.analytics.ekvs[o]), r
            }
            return a[n]
          }));
          e.push(a)
        }));
        for (var n = new Array(e.length).fill([]), r = Object.create(null), a = 0; a < e.length; a++) {
          for (var o = e[a], i = xe(o), s = o.analytics.ekvs[i].filter((function(t) {
              return !!t
            })).map((function(t) {
              return t.uuid
            })), c = 0; c < s.length; c++) {
            var u = s[c];
            r[u] ? n[a].push(c) : r[u] = 1
          }
          n[a].length > 0 && o.analytics.ekvs[i].splice(n[a][0], n[a].length)
        }
      }
      return e
    },
    Re = function() {
      function t() {
        u(this, t), this.queue = new le, this.isProcessing = !1, this.Tag = ""
      }
      var e;
      return p(t, [{
        key: "enqueue",
        value: function(t, e, n) {
          e = e || {};
          var r = function(t) {
            var e, n, r = null;
            switch (t) {
              case "half_session":
                e = null, (n = ne().cloneCurrentSession()) && (e = {
                  header: {
                    st: "1"
                  },
                  analytics: {
                    sessions: [n]
                  }
                }), r = e;
                break;
              case "close_session":
                r = function() {
                  var t = null,
                    e = {},
                    n = ne().cloneCurrentSession();
                  n && (e.sessions = [n]);
                  var r = re().getEkvs();
                  return r && (e.ekvs = S(r), re().clear()), (e.sessions || e.ekvs) && (t = {
                    analytics: e
                  }), t
                }();
                break;
              case mt:
                r = function() {
                  var t = null,
                    e = re().getEkvs();
                  return e && (t = {
                    analytics: {
                      ekvs: S(e)
                    }
                  }, re().clear()), t
                }()
            }
            return r
          }(t);
          if (r) {
            var a = F(j())._aplus_client || {};
            r.header = y(r.header, ge(a)), r.noCache = e.noCache, this.queue.enqueue(r)
          }
          this.isProcessing || this.processQueue(n)
        }
      }, {
        key: "load",
        value: function(t) {
          var e = this,
            n = ee().get(t);
          n && n.length && n.forEach((function(t) {
            e.queue.enqueue(t)
          })), ee().remove(t)
        }
      }, {
        key: "processQueue",
        value: (e = c(a().mark((function t(e) {
          var n, r, o, i;
          return a().wrap((function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                this.isProcessing = !0;
              case 1:
                if (!(this.queue.size() > 0)) {
                  t.next = 17;
                  break
                }
                return n = this.queue.front(), t.next = 5, fe.consume(1);
              case 5:
                if (r = t.sent, o = r.allowed, i = r.waitTime, !o) {
                  t.next = 13;
                  break
                }
                this.queue.dequeue(), Be(n), t.next = 15;
                break;
              case 13:
                return t.next = 15, De(i);
              case 15:
                t.next = 1;
                break;
              case 17:
                this.isProcessing = !1, P(e) && e();
              case 19:
              case "end":
                return t.stop()
            }
          }), t, this)
        }))), function(t) {
          return e.apply(this, arguments)
        })
      }]), t
    }(),
    Ue = function() {
      function t() {
        var n;
        return u(this, t), n = e(this, t), t.instance || (t.instance = _(n)), h(n, t.instance)
      }
      return l(t, Re), p(t, [{
        key: "prepare",
        value: function(t, e, n) {
          var r = F(j());
          Pt.checkOpenid(r.getMetaInfo(ct._ANONY_ID)), t === mt ? this.enqueue(t, e, (function() {
            P(n) && n()
          })) : this.isProcessing || this.processQueue(n)
        }
      }]), t
    }(),
    Le = new(function() {
      function t() {
        var n;
        return u(this, t), n = e(this, t), t.instance || (t.instance = _(n), t.instance.failedRequests = []), h(n, t.instance)
      }
      return l(t, Re), p(t, [{
        key: "prepare",
        value: function() {
          var t = this;
          Ne(this.failedRequests).forEach((function(e) {
            t.queue.enqueue(e)
          }))
        }
      }, {
        key: "clearFailedRequests",
        value: function() {
          this.failedRequests.length = 0
        }
      }, {
        key: "save",
        value: function() {
          var t = (ee().get(ht.FAILED_REQUESTS) || []).concat(this.failedRequests),
            e = Ne(t);
          e && e.length && ee().set(ht.FAILED_REQUESTS, e), this.clearFailedRequests()
        }
      }]), t
    }()),
    je = new Ue,
    Be = (Me = c(a().mark((function t(e) {
      return a().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            e && ke(e, (function() {}), (function() {
              e && !e.noCache && Le.failedRequests.push(e)
            }));
          case 1:
          case "end":
            return t.stop()
        }
      }), t)
    }))), function(t) {
      return Me.apply(this, arguments)
    }),
    Fe = 0;

  function Ve(t, e) {
    var n = {};
    for (var r in e && (n.scene = e), t && t.miniappDebugId && (n.debugId = t.miniappDebugId), t) "$$_share_uid" !== r && 0 !== r.indexOf("$$_utm_") || (n[r] = t[r]);
    return n
  }
  var Ke = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          ["object", "function"].indexOf("undefined" == typeof App ? "undefined" : i(App)) > -1 && function() {
            var t = App,
              e = !1,
              n = !1,
              r = L().ctx,
              a = B(),
              o = Vt.getPlatformContext(),
              s = function(t) {
                Vt.initIsTB();
                var e = t ? t.query : {},
                  n = t ? t.referrerInfo : {};
                if (pe.enableCfg(ee().getSync(ht.APLUS_REMOTE_CONFIG)), Fe += 1, r[a].push({
                    action: dt.appendMetaInfo,
                    arguments: ["aplus-session-args", b.assign(n, {
                      scene: t.scene || ""
                    })]
                  }), e) {
                  var o = {};
                  if (e.spm && (r.aplus.spm_orign = e.spm), t.scene && (o.scene = t.scene), e.miniappDebugId) {
                    var i = e.miniappDebugId.trim(),
                      s = i.split("_");
                    o = b.assign(o, {
                      aplus_work_no: s.length > 2 ? s[1] : i,
                      aplus_track_debug_id: i,
                      aplus_flag: "aplus_test"
                    })
                  }
                  r[a].push({
                    action: dt.appendMetaInfo,
                    arguments: ["aplus-exdata", o]
                  }), r[a].push({
                    action: dt.appendMetaInfo,
                    arguments: ["aplus-cpvdata", o]
                  }), r[a].push({
                    action: dt.appendMetaInfo,
                    arguments: ["aplus-global-args", Ve(e, t.scene)]
                  })
                }
              },
              c = function(t) {
                Fe += 1;
                var n, o = t ? t.query : {},
                  s = t ? t.scene : "";
                r[a].push({
                  action: ct.SDK_APPEND_META_INFO,
                  arguments: ["aplus-global-args", Ve(o, s)]
                }), r[a].push({
                  action: dt.appendMetaInfo,
                  arguments: [ht.GLOBAL_PROPERTY, Vt.getUtmParamsObj(o)]
                }), s && (r[a].push({
                  action: dt.appendMetaInfo,
                  arguments: ["aplus-exdata", {
                    scene: s
                  }]
                }), r[a].push({
                  action: dt.appendMetaInfo,
                  arguments: ["aplus-cpvdata", {
                    scene: s
                  }]
                }), r[a].push({
                  action: dt.appendMetaInfo,
                  arguments: ["aplus-session-args", {
                    scene: s
                  }]
                })), 2 === Fe ? n = 1 : 1 === Fe ? n = 0 : x().w("APP_LAUNCH_TYPE should not reach this, value = ".concat(Fe)), fe.load(), fe.run(), e || (e = !0, function(t) {
                  ee().load((function() {
                    x().w("cache init success"), t.query && t.query.miniappDebugId && t.query.miniappDebugId !== ee().get("miniappDebugId") && ee().set("miniappDebugId", t.query.miniappDebugId)
                  }));
                  var e = {},
                    n = b.cloneDeep(t);
                  for (var r in n) "object" === i(n[r]) ? e = b.assign(n[r], e) : n[r] && (e[r] = n[r]);
                  var a = ne().resume(e),
                    o = ne().getCurrentSessionId();
                  re().setSessionId(o), a && (Le.load(ht.FAILED_REQUESTS), Le.processQueue())
                }(t)), Pt.RankUtils.clear();
                var c = Pt.getStartId();
                re().setStartId(c), r.onAppShowTime = Date.now(), r[B()].push({
                  action: dt.record,
                  arguments: [ht.APP_START, "SHOW", {
                    start_type: n,
                    is_auto: 1,
                    currentPath: t.path || ""
                  }]
                })
              },
              u = function() {
                var t = Date.now() - r.onAppShowTime;
                r[B()].push({
                  action: dt.record,
                  arguments: [ht.APP_END, "H_OR_U", {
                    duration: t,
                    end_type: 0,
                    start_time: r.onAppShowTime,
                    is_auto: 1
                  }]
                }), e = !1, ne().pause(), Le.prepare(), Le.processQueue().then((function() {
                  Le.save(), ee().save()
                })), Fe = 0
              };
            if (t.after) t.after({
              methods: {
                onLaunch: function(t) {
                  t.thisObject && (t.thisObject[j()] = r[j()]), s(t.args)
                },
                onShow: function(t) {
                  c(t.args)
                },
                onHide: function() {
                  u()
                }
              }
            });
            else {
              App = function(e) {
                e[j()] = r[j()], t(e)
              };
              try {
                o.onAppShow((function(t) {
                    var e;
                    n || (e = P(o.getLaunchOptionsSync) ? o.getLaunchOptionsSync() || {} : t, s(e), n = !0), c(t)
                  })), o.onAppHide((function() {
                    u()
                  })),
                  function(t) {
                    try {
                      my && my.onTitleCloseClick && t && my.onTitleCloseClick(t)
                    } catch (t) {}
                  }(u)
              } catch (t) {
                x().w("hook app failed, errmsg = ", t)
              }
            }
          }()
        }
      }]), t
    }(),
    qe = Kt(Object.freeze({
      __proto__: null,
      default: Ke
    })),
    Ge = "",
    He = {};

  function $e(t) {
    var e = F(j()).getMetaInfo("pageConfig") || {},
      n = t || Ge;
    try {
      if (e && "object" === i(e))
        for (var r in e) {
          if (r === n) break;
          if (e[r] && e[r].regRule && e[r].regRule.test(n)) {
            n = r;
            break
          }
        }
    } catch (t) {}
    return e[n]
  }
  var Ye = function() {
      return Ge
    },
    Qe = function(t) {
      return t && -1 !== t.indexOf("?") ? t.split("?")[0] : t
    },
    ze = function(t) {
      t && (Ge = t)
    },
    We = function(t) {
      return function(t, e) {
        if (!t || "-" === t) return "";
        var n = [];
        for (var r in e) n.push("".concat(r, "=").concat(e[r]));
        var a = n.join("&");
        return a ? "".concat(t, "?").concat(a) : t
      }(t, He[t])
    },
    Je = function(t) {
      return ($e(t) || {}).pageName
    },
    Xe = function(t) {
      return ($e(t) || {}).pageName
    },
    Ze = function(t) {
      return ($e(t) || {}).pageTitle || Vt.getWxTitle(t)
    },
    tn = function(t) {
      return ($e(t) || {}).properties
    },
    en = function(t) {
      return ($e(t) || {}).skipMe
    },
    nn = function(t, e, n) {
      t.push({
        action: e,
        arguments: [ct.SDK_READY, function(t) {
          "complete" === t && "function" == typeof n && n()
        }]
      })
    };

  function rn(t, e) {
    var n = Vt.getCurrentPage(),
      r = n.route || n.is || "",
      a = n.options || {},
      o = L().ctx,
      s = B(),
      c = D.obj2queryStr(a, !0),
      u = b.cloneDeep(t);
    c && (r = "".concat(r, "?").concat(c)), b.isEmptyObject(u.query) ? u.query = a : "string" == typeof u.query && (u.query = M.query2obj(u.query)), "object" === i(u.query) && (u.query.$$_share_uid = o[j()].getMetaInfo("_anony_id"), u.query.$$_utm_medium = 3, u.query = D.obj2queryStr(u.query));
    var p = u.path || r,
      f = "$$_share_uid=".concat(u.query.$$_share_uid, "&$$_utm_medium=3");
    return p.indexOf("?") > -1 ? u.path = "".concat(p, "&").concat(f) : u.path = "".concat(p, "?").concat(f), u.status = "ready", t.promise && (u.promise = t.promise), o[s].push({
      action: ct.PUBLISH,
      arguments: [e, u]
    }), u
  }

  function an() {
    L().ctx[B()].push({
      action: ct.PUBLISH,
      arguments: ["onPullDownRefresh", {
        status: "ready"
      }]
    })
  }

  function on() {
    var t = {
      status: "ready",
      context: this
    };
    L().ctx[B()].push({
      action: ct.PUBLISH,
      arguments: ["onReachBottom", t]
    })
  }

  function sn(t) {
    var e = L().ctx,
      n = B();
    try {
      ze(this.route), t && function(t, e) {
        t && (He[t] = e)
      }(this.route, t), x().i("Page onLoad: ", this.route, t);
      var r = this;
      nn(e[n], ct.SUBSCRIBE, (function() {
        var a, o, i, s = (a = Vt.getUtmParamsObj(t), o = L().ctx[j()].getMetaInfo(ht.GLOBAL_PROPERTY), i = Object.keys(a), b.eachMap(o, (function(t) {
          var e = !1;
          d(i, (function(t) {
            if (M.isStartWith(t, "utm_")) return e = !0, "break"
          })), e && 0 === t.indexOf("utm_") && !a[t] && delete o[t]
        })), Object.assign({}, o, a));
        e[j()].appendMetaInfo(ht.GLOBAL_PROPERTY, s), e[n].push({
          action: ct.PUBLISH,
          arguments: ["onLoad", {
            status: "ready",
            context: r
          }]
        });
        var c = Vt.getCurrentPage();
        Pt.resetFn(c, "setData", (function(t) {
          e[n].push({
            action: ct.PUBLISH,
            arguments: ["onPageDataChanged", {
              data: t,
              context: r
            }]
          })
        }))
      }))
    } catch (t) {
      x().w("onPageLoad: ", t)
    }
  }

  function cn() {
    var t = L().ctx,
      e = B(),
      n = this;
    try {
      ze(this.route);
      var r = this;
      setTimeout((function() {
        nn(t[e], ct.SUBSCRIBE, (function() {
          t[e].push({
            action: ct.PUBLISH,
            arguments: ["onShow", {
              status: "ready",
              context: r,
              route: n.route
            }]
          })
        }))
      }), 0)
    } catch (t) {
      x().w("onPageShow: ", t)
    }
  }

  function un() {
    var t = L().ctx,
      e = B();
    try {
      t[e].push({
        action: ct.PUBLISH,
        arguments: ["onReady", {
          status: "ready",
          context: this,
          route: this.route
        }]
      })
    } catch (t) {
      x().w("onPageReady: ", t)
    }
  }

  function pn() {
    var t = L().ctx,
      e = B();
    try {
      t[e].push({
        action: ct.PUBLISH,
        arguments: ["onHide", {
          status: "ready",
          route: this.route
        }]
      })
    } catch (t) {
      x().w("onPageHide: ", t)
    }
  }

  function fn(t) {
    L().ctx[B()].push({
      action: ct.PUBLISH,
      arguments: ["onAplusClk", {
        status: "ready",
        event: t,
        context: this
      }]
    })
  }

  function ln(t) {
    L().ctx[B()].push({
      action: ct.PUBLISH,
      arguments: ["onAplusTouch", {
        status: "ready",
        context: this,
        event: t
      }]
    })
  }

  function gn(t) {
    if (t.onShareAppMessage) {
      var e = t.onShareAppMessage;
      t.onShareAppMessage = function(t) {
        var n = e.call(this, t) || {};
        return n.from = t && t.from, rn(n, "onShareAppMessage")
      }
    }
  }

  function _n() {
    try {
      var t, e = Page;
      e.after && (t = e.after), Page = function(t) {
        Pt.FunctionUtils.rewriteFn(t, "onShow", cn), Pt.FunctionUtils.rewriteFn(t, "onHide", pn), Pt.FunctionUtils.rewriteFn(t, "onUnload", pn), Pt.FunctionUtils.rewriteFn(t, "onLoad", sn), Pt.FunctionUtils.rewriteFn(t, "onReady", un), Pt.FunctionUtils.rewriteFn(t, "onPullDownRefresh", an), Pt.FunctionUtils.rewriteFn(t, "onReachBottom", on), Pt.FunctionUtils.rewriteFn(t, "onAplusClk", fn), Pt.FunctionUtils.rewriteFn(t, "onAplusTouch", ln), gn(t),
          function(t) {
            if (t.onShareTimeline) {
              var e = t.onShareTimeline;
              t.onShareTimeline = function(t) {
                return rn(e.call(this, t) || {}, "onShareTimeline")
              }
            }
          }(t),
          function(t) {
            if (t.onAddToFavorites) {
              var e = t.onAddToFavorites;
              t.onAddToFavorites = function(t) {
                var n = e.call(this, t) || {};
                L().ctx[B()].push({
                  action: ct.PUBLISH,
                  arguments: ["onAddToFavorites", n]
                })
              }
            }
          }(t), e(t)
      }, t && (Page.after = function() {
        t.apply(this, arguments)
      })
    } catch (t) {
      x().w("Page hook error")
    }
  }

  function hn() {
    try {
      var t = Component;
      Component = function(e) {
        try {
          e.methods = e.methods || {};
          var n = e.methods;
          Pt.FunctionUtils.rewriteFn(n, "onShow", cn), Pt.FunctionUtils.rewriteFn(n, "onHide", pn), Pt.FunctionUtils.rewriteFn(n, "onUnload", pn), Pt.FunctionUtils.rewriteFn(n, "onLoad", sn), gn(n), t(e)
        } catch (n) {
          t(e)
        }
      }
    } catch (t) {
      x().w("Component hook error")
    }
  }

  function dn(t, e, n) {
    ["object", "function"].indexOf(i(t)) > -1 ? n() : x().w("typeof ".concat(e, " is not object cant watchExp."))
  }
  var mn = {},
    vn = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          dn(Page, "Page", _n), dn(Component, "Component", hn),
            function() {
              var t = this,
                e = L().ctx,
                n = Vt.getPlatformContext();
              try {
                if (n && n.setNavigationBarTitle) {
                  var r = n.setNavigationBarTitle;
                  Object.defineProperty(n, "setNavigationBarTitle", {
                    get: function() {
                      return function(n) {
                        var a = Vt.getCurrentPage(),
                          o = a.route || a.is;
                        n = b.isObject(n) ? n : {}, mn[o] = n.title, e[j()].globalTitleMap = mn, r.call(t, n)
                      }
                    }
                  })
                }
              } catch (t) {
                x().w(t)
              }
            }()
        }
      }]), t
    }(),
    yn = Kt(Object.freeze({
      __proto__: null,
      default: vn
    })),
    Sn = function(t) {
      for (var e = t.length, n = new Array(e - 1), r = 1; r < e; r++) n[r - 1] = t[r];
      return n
    },
    In = N.extend({
      callable: function(t) {
        if (!P(t)) throw new TypeError(t + " is not a function");
        return t
      },
      create: function(t) {
        var e = new this;
        for (var n in t) e[n] = t[n];
        return e.handlers = [], e.pubs = {}, e
      },
      setHandlers: function(t) {
        this.handlers = t
      },
      subscribe: function(t, e) {
        this.callable(e);
        var n = this,
          r = (n.pubs || {})[t] || [];
        if (r)
          for (var a = 0; a < r.length; a++) {
            var o = r[a]();
            e.apply(n, o)
          }
        var i = n.handlers || [];
        return t in i || (i[t] = []), i[t].push(e), n.setHandlers(i), n
      },
      unsubscribe: function(t, e) {
        this.callable(e);
        try {
          var n = this.handlers[t];
          if (!n) return this;
          if ("object" === i(n) && n.length > 0) {
            for (var r = 0; r < n.length; r++) e.toString() === n[r].toString() && n.splice(r, 1);
            this.handlers[t] = n
          } else delete this.handlers[t]
        } catch (t) {}
        return this
      },
      publish: function(t) {
        var e = Sn(arguments),
          n = this.handlers || [],
          r = n[t] ? n[t].length : 0;
        if (r > 0)
          for (var a = 0; a < r; a++) {
            var o = n[t][a];
            P(o) && o.apply(this, e)
          }
        return this
      },
      cachePubs: function(t) {
        var e = this.pubs || {},
          n = Sn(arguments);
        e[t] || (e[t] = []), e[t].push((function() {
          return n
        }))
      }
    }),
    bn = Kt(Object.freeze({
      __proto__: null,
      default: In
    })),
    En = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          var t = F(j()),
            e = "".concat(j(), "_pubsub");
          if (!t[e]) {
            var n = bn.default.create();
            t[e] = n
          }
        }
      }]), t
    }(),
    An = Kt(Object.freeze({
      __proto__: null,
      default: En
    }));

  function Tn(t, e, n) {
    if (Pt.checkEvent(t, e)) {
      var r = function(t, e) {
        if ("string" != typeof t || !t) return x().w("event logkey is invalid, id =", t || "'' event properties = ", E(e.cusp)), null;
        var n = Object.create(null),
          r = Date.now();
        if (n.id = t, e && e.ts || (n.ts = r), e && e.uuid || (n.uuid = Pt.getUUID()), "object" === i(e))
          for (var a in e)({}).hasOwnProperty.call(e, a) && (n[a] = e[a]);
        return n
      }(t, e);
      r.rank = Pt.RankUtils.rank(), r && r.id === ht.APP_END && (r.amount = r.rank), x().i("event: ", t, e), re().addEvent(r);
      var a = F(B()),
        o = F(j()),
        s = ht.MAX_QUEUE_COUNT,
        c = o.getMetaInfo("max-queue-count");
      (function(t) {
        return "number" == typeof t
      })(c) && !isNaN(parseInt(c, 10)) && (s = parseInt(c, 10));
      var u = o.getMetaInfo(ct._ANONY_ID);
      (t === ht.APP_END || re().getEkvsLen() >= s) && (n ? u ? je.prepare(mt, {
        noCache: !1
      }) : a.push({
        action: ct.SUBSCRIBE,
        arguments: [ct.SET_META_INFO, function(t) {
          t === ct._ANONY_ID && je.prepare(mt, {
            noCache: !1
          })
        }]
      }) : je.prepare(mt, {
        noCache: !1
      }))
    }
  }
  var Pn, On = N.extend({
      subscribeLogs: function(t, e) {
        vt(ct.SUBSCRIBE, [t, function(t) {
          t.status === ct.COMPLETE && e(t)
        }])
      },
      getLogicSymbol: function() {
        return "ALI" === this.format ? "&" : "||"
      },
      handlerMiddleware: function() {},
      watchLOG: function() {
        var t = this;
        t.subscribeLogs(ct.MW_CHANGE_PV, (function(e) {
          t.handlerMiddleware(e, "pv")
        })), t.subscribeLogs(ct.MW_CHANGE_HJLJ, (function(e) {
          t.handlerMiddleware(e, j())
        }))
      },
      run: function() {
        this.watchLOG()
      }
    }).extend({
      handlerMiddleware: function(t) {
        var e, n, r = this.metaInfo && this.metaInfo.autoGetOpenid,
          a = L().ctx,
          o = j(),
          i = t && t.userdata && t.userdata.logkey,
          s = a[o].getMetaInfo(ht.APLUS_PRESET_EVENTS_DISABLED);
        if (!(s && v.isArray(s) && i && i.indexOf("$$_") > -1 && -1 !== s.indexOf(i))) {
          var c, u = t && t.userdata && t.userdata.gmkey,
            p = t && t.what_to_send && t.what_to_send.logdata && t.what_to_send.logdata || {},
            l = a[o].getMetaInfo(ht.GLOBAL_PROPERTY);
          if ("CLK" === u || "EXP" === u || "OTHER" === u || i === ht.APP_START || i === ht.APP_END) {
            e = b.cloneDeep(t && t.userdata && t.userdata.gokey) || {}, n = p.gokey || {};
            var g = {};
            "$$_share" === i && (g.refer_page = p.url, g.share_type = e.share_type), n.scene && (g.scene = "".concat(Vt.getPlatformType(), "_").concat(n.scene)), n.targetAppKey && (g.targetAppKey = e.targetAppKey, delete e.targetAppKey), c = e.page_name || Je(p.url) || p.url || "", g.page_name = c, g.url = p.url || "", g.ref_url = "-" !== p.pre ? p.pre : "", g.ref_page_name = Xe(Qe(g.ref_url)) || Qe(g.ref_url), (e.page_name || e["data-pagename"]) && (delete e.page_name, delete e["data-pagename"]), b.isEmptyObject(l) || (g.gp = l), e.spm && (g["spm-cnt"] = [encodeURIComponent(c), e.spm.c, e.spm.d].filter((function(t) {
              return !!t
            })).join("."), delete e.spm), e.page_title ? (g.page_title = e.page_title, delete e.page_title) : g.page_title = n._page_title || Ze(p.url) || "", e.is_auto ? (g.is_auto = e.is_auto, g.track_type = "1", delete e.is_auto, p.event_code && (g.event_type_id = p.event_code)) : (g.is_auto = 0, g.track_type = "0"), "EXP" !== u && "CLK" !== u || ["element_type", "element_selector", "element_path", "element_content", "element_id", "element_name", "element_class_name"].forEach((function(t) {
              Object.prototype.hasOwnProperty.call(e, t) && (g.ap ? g.ap[t] = e[t] : g.ap = f({}, t, e[t]), delete e[t])
            })), Tn(i, i === ht.APP_START || i === ht.APP_END ? b.assign(g, e) : b.assign(g, {
              cusp: e
            }), r)
          } else if ("2001" === p.event_code) {
            var _ = {},
              h = ht.PAGE_START;
            c = (n = b.cloneDeep(p.gokey) || {}).page_name || Je(p.url) || p.url || "", _.r = p.arg1 || p.logkey || "-", _.page_name = c, n._page_auto_pv ? (_.is_auto = 1, _.url = n.path || "", _.ref_url = "-" !== n.referrer ? n.referrer : "", _.track_type = "1", delete n._page_auto_pv, delete n.referrer, delete n.path, delete n.page_name) : (_.is_auto = 0, _.url = p.url || "", _.ref_url = "-" !== p.pre ? p.pre : "", _.track_type = "0"), n.duration && (_.duration = n.duration, delete n.duration), b.isEmptyObject(l) || (_.gp = l), n.scene && (_.scene = "".concat(Vt.getPlatformType(), "_").concat(n.scene)), n = Pt.deleteInfo(n, ["_anony_id", "_dev_id", "_session_id", "_user_id", "_user_nick", "uaid", "pvid", "scene"]), _["spm-cnt"] = encodeURIComponent(c), n._page_auto_id && (h = n._page_auto_id, delete n._page_auto_id), n.page_start && (_.page_start = n.page_start, delete n.page_start), n.page_title ? (_.page_title = n.page_title, delete n.page_title) : _.page_title = n._page_title || Ze(p.url) || "", delete n._page_title, _.url = We(_.url), _.ref_url = We(_.ref_url), _.ref_page_name = Xe(Qe(_.ref_url)) || Qe(_.ref_url), Tn(h, b.assign(_, {
              cusp: n
            }), r)
          }
        }
      },
      run: function() {
        this.watchLOG()
      }
    }),
    wn = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          var t = this.options.context.sdk_config.metaInfo;
          On.create({
            metaInfo: t
          }).run(this.options)
        }
      }]), t
    }(),
    Cn = Kt(Object.freeze({
      __proto__: null,
      default: wn
    })),
    kn = {};

  function Mn() {
    return Pn || (Pn = kn || {}, kn)
  }

  function Dn(t, e) {
    var n = F(j());
    return Pn || (Pn = {}), "aplus-inject-record-gokey" === t && (function() {
      try {
        x().w("the API aplus-inject-record-gokey is deprecated, if needed please concat APLUS SDK supporter")
      } catch (t) {}
    }(), n.record("/inject.record.gokey", "OTHER", "")), Pn[t] = e, !0
  }

  function xn(t) {
    return Pn || (Pn = {}), Pn[t] || ""
  }

  function Nn(t, e) {
    if (t && e) {
      var n, r = function(n) {
          n.constructor === Array ? function(n) {
            try {
              var r = "string" == typeof e ? JSON.parse(e) : e;
              a(t, n.concat(r))
            } catch (t) {}
          }(n) : function(n) {
            try {
              var r = "string" == typeof e ? JSON.parse(e) : e;
              a(t, Object.assign({}, n, r))
            } catch (t) {}
          }(n)
        },
        a = function(t, e) {
          Rn(t, e)
        },
        o = xn(t);
      if ("aplus-exinfo" === t && (a(t, b.assign(o, C(e))), n = !0), "aplus-page-properties" === t) {
        var s = e;
        if (o)
          for (var c in o) e[c] ? s[c] = b.assign(o[c], e[c]) : s[c] = o[c];
        a(t, s), n = !0
      }
      if (o)
        if ("object" === i(o)) r(o), n = !0;
        else try {
          var u = JSON.parse(o);
          "object" === i(u) && (r(u), n = !0)
        } catch (t) {}
      n || a(t, e)
    }
  }

  function Rn(t, e) {
    var n, r, a = "OVERWRITE",
      o = a;
    if ("object" === i(t) ? (n = t.metaName, r = t.metaValue, o = t.mode || a) : (n = t, r = e), o !== a) return Nn(n, r);
    if (Dn(n, r)) {
      var s = K("_$") || {};
      s.meta_info = Mn();
      var c = q("_$", s),
        u = ["setMetaInfo", n, r, {}];
      return $(u), Y(u), n === ct._ANONY_ID || n === ct._DEV_ID || n === ct._USER_ID ? Vt.setStorageSync(n, r || "") : (!Vt.getStorageSync(ct._ANONY_ID) && s.meta_info[ct._ANONY_ID] && Vt.setStorageSync(ct._ANONY_ID, s.meta_info[ct._ANONY_ID]), !Vt.getStorageSync(ct._DEV_ID) && s.meta_info[ct._DEV_ID] && Vt.setStorageSync(ct._DEV_ID, s.meta_info[ct._DEV_ID]), !Vt.getStorageSync(ct._USER_ID) && s.meta_info[ct._USER_ID] && Vt.setStorageSync(ct._USER_ID, s.meta_info[ct._USER_ID])), c
    }
  }
  var Un = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          var t = this.options.context && this.options.context.sdk_config,
            e = F(j()),
            n = e._$ = e._$ || {};
          for (var r in n.is_terminal = !0, n.send_pv_count = 0, n.spm = {
              data: {}
            }, n.meta_info = Mn() || {}, e.globalConfig = t.globalConfig, t.metaInfo) Dn(r, t.metaInfo[r]);
          e._$ = n, e.isInternational = function() {
            return !1
          }
        }
      }]), t
    }(),
    Ln = Kt(Object.freeze({
      __proto__: null,
      default: Un
    })),
    jn = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "getLogConfig",
        value: function() {
          var t = {},
            e = this.options.config.plugins,
            n = function(n) {
              t[n] = {
                plugins: e[n],
                context: {}
              }, d(e[n], (function(e) {
                t[n].context[e.name] = e.config || {}
              }))
            };
          for (var r in e) n(r);
          return t
        }
      }, {
        key: "run",
        value: function() {
          this.options.context.logConfig = this.getLogConfig(), this.options.context.logConfig.pageLoadTime = this.options.context.PAGE_LOAD_TIME
        }
      }]), t
    }(),
    Bn = Kt(Object.freeze({
      __proto__: null,
      default: jn
    })),
    Fn = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "getMetaInfo",
        value: function() {
          return (K("_$") || {}).meta_info
        }
      }, {
        key: "getAplusWaiting",
        value: function() {
          return (this.getMetaInfo() || {})["aplus-waiting"]
        }
      }, {
        key: "run",
        value: function(t, e) {
          var n = this.options.config || {},
            r = this.getAplusWaiting();
          if (r && n.is_auto) switch (r = "".concat(this.getAplusWaiting()), this.options.context.when_to_sendpv = {
              aplusWaiting: r
            }, r) {
            case ct._USER_ID:
            case ct._ANONY_ID:
            case "MAN":
              return "done";
            case "1":
              return this.options.context.when_to_sendpv.isWait = !0, setTimeout((function() {
                e()
              }), 6e3), 6e3;
            default:
              var a = 1 * r;
              if ("NaN" !== "".concat(a)) return this.options.context.when_to_sendpv.isWait = !0, setTimeout((function() {
                e()
              }), a), a
          }
        }
      }]), t
    }(),
    Vn = Kt(Object.freeze({
      __proto__: null,
      default: Fn
    })),
    Kn = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "getMetaInfo",
        value: function(t) {
          return ((K("_$") || {}).meta_info || {})[t]
        }
      }, {
        key: "getHostUrl",
        value: function() {
          var t = this.getMetaInfo(ht.TRACKDOMAIN) || this.getMetaInfo(ht.APLUS_PV_DOMAIN);
          if (Pt.checkDomain(t)) {
            var e = Vt.getLogDomain();
            return e ? Pt.fixDomain(t) + e : (x().tip_w("current miniapp framework is not supported!!"), "")
          }
        }
      }, {
        key: "run",
        value: function() {
          this.options.context.where_to_send.method = "POST";
          var t = this.getHostUrl();
          if (!t || t.indexOf("https://") < 0 && t.indexOf("http://")) return x().w("current trackDomain invalid: ".concat(t)), "done";
          this.options.context.where_to_send.url = t
        }
      }]), t
    }(),
    qn = Kt(Object.freeze({
      __proto__: null,
      default: Kn
    }));

  function Gn(t, e, n) {
    return t ? Pt.hash(encodeURIComponent(t)).substring(0, e) : n
  }
  var Hn = ct.SPM_CNT,
    $n = ct.SPM_URL,
    Yn = ct.SPM_PRE,
    Qn = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "getCommonParams",
        value: function() {
          var t = F(j()),
            e = this.options.context || {},
            n = e.etag || {},
            r = e.userdata || {},
            a = K("_$") || {},
            o = a.spm || {},
            i = this.options.config || {},
            s = t.getMetaInfo("platformType") || Vt.getPlatformType(),
            c = {
              _dev_id: t.getMetaInfo("_dev_id"),
              _anony_id: t.getMetaInfo(ct._ANONY_ID),
              _user_id: t.getMetaInfo(ct._USER_ID),
              _user_nick: t.getMetaInfo("_user_nick"),
              _session_id: t.getMetaInfo("_session_id"),
              uaid: "1" === "".concat(t.getMetaInfo("uaid")) ? 1 : 0
            },
            u = t._aplus_client || {},
            p = t.globalConfig || {},
            f = "";
          try {
            var l = getCurrentPages(),
              g = l[l.length - 1] || {};
            f = r.gokey && r.gokey.currentPath || g.route || g.is, r.gokey.currentPath && delete r.gokey.currentPath
          } catch (t) {}
          var _ = (new Date).getTime() + f,
            h = u.model + u.networkType + i.title + n.cna,
            d = (p.isDecodeUrl ? "DC_" : "") + function(t, e) {
              var n = function() {
                  var t, e = "",
                    n = !1;

                  function r(t) {
                    return 1 === t ? "0123456789abcdefhijklmnopqrstuvwxyzABCDEFHIJKLMNOPQRSTUVWXYZ".substring(Math.floor(60 * Math.random()), 1) : 2 === t ? "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ".substring(Math.floor(60 * Math.random()), 1) : "0"
                  }
                  for (; e.length < 8;) t = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(Math.floor(62 * Math.random()), 1), !n && e.length <= 2 && ("g" === t.toLowerCase() || "l" === t.toLowerCase()) && (0 === e.length && "g" === t.toLowerCase() ? Math.random() < .5 && (t = r(1), n = !0) : 1 === e.length && "l" === t.toLowerCase() && "g" === e.charAt(0).toLowerCase() && (t = r(2), n = !0)), e += t;
                  return e
                }(),
                r = n.substring(0, 4),
                a = n.substring(0, 6);
              return [Gn(t, 4, r), Gn(e, 4, r), a].join("")
            }(_, h),
            m = Pt.getAppKey();
          m || x().w("please set appKey in aplus metaInfo before sendPV!");
          var v = Object.assign({}, {
              appKey: m,
              cache: d,
              cna: n.cna,
              etag: n,
              pre: a.page_referrer || "-",
              sdk_info: {
                jsver: p.script_name,
                skv: p.lver,
                customSdkId: t.getMetaInfo("customSdkId") || "",
                platformType: s.toLowerCase()
              },
              title: i.title || "",
              url: f,
              client: u,
              timeZone: Pt.getTimeZone(),
              gmkey: r.gmkey || "",
              method: this.options.context.where_to_send.method
            }, c),
            y = c;
          return o.spm_url && (y[$n] = o.spm_url || ""), o.spm_pre && (y[Yn] = o.spm_pre || ""), o.spm_cnt && (y[Hn] = o.spm_cnt || ""), y[ct.PVID] = t.pvid || "", v.sessionArgs = t.getMetaInfo("aplus-session-args"), v.globalArgs = t.getMetaInfo("aplus-global-args"), v.gokey = y, v
        }
      }, {
        key: "getPvParams",
        value: function() {
          var t = F(j()),
            e = this.getCommonParams();
          return this.options.config.is_auto || (e.sdk_info.mansndlog = 1), Object.assign({}, e, {
            event_code: ct.PV_CODE,
            logtype: "1",
            logkey: "/vx.gif",
            event_timestamp: t._$.send_pv_count > 0 ? new Date : t.logConfig.pageLoadTime
          })
        }
      }, {
        key: "getHjljParams",
        value: function() {
          var t = (this.options.context || {}).userdata || {},
            e = {
              event_code: pt[t.gmkey] || t.gmkey,
              logkey: t.logkey,
              event_timestamp: new Date
            };
          return Object.assign({}, this.getCommonParams(), e)
        }
      }, {
        key: "run",
        value: function() {
          var t;
          t = "PV" === this.options.config.recordType ? this.getPvParams() : this.getHjljParams(), this.options.context.what_to_send.logdata = t
        }
      }]), t
    }(),
    zn = Kt(Object.freeze({
      __proto__: null,
      default: Qn
    })),
    Wn = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          var t = Vt.isTB(),
            e = F(j()),
            n = this.options.context.what_to_send.logdata || {},
            r = getCurrentPages(),
            a = r[r.length - 1] || {};
          a && !n.title && (n.title = a.route || "");
          var o = "-";
          if (r.length > 1) {
            var i = r[r.length - 2] || {};
            o = (!t && e.globalConfig.isAli ? "https://".concat(n.client.appId, "_") : "") + (i.route || i.is || "-")
          }
          n.pre = o, n.sdk_info && (n.sdk_info.windmill = "1"), this.options.context.what_to_send.logdata = n
        }
      }]), t
    }(),
    Jn = Kt(Object.freeze({
      __proto__: null,
      default: Wn
    })),
    Xn = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "getUserdata",
        value: function() {
          var t = F(j()),
            e = this.options.config || {},
            n = {};
          e && !e.is_auto && e.gokey && ("string" == typeof e.gokey ? n = C(e.gokey) : "object" === i(e.gokey) && (n = e.gokey));
          var r = function(t) {
            v.isArray(t) ? t.forEach((function(t) {
              n = Object.assign({}, n, t)
            })) : n = Object.assign({}, n, t)
          };
          r(t.getMetaInfo("aplus-cpvdata"));
          var a = Vt.getCurrentPage(),
            o = a.route || a.is || "page",
            s = (t.getMetaInfo("aplus-page-properties") || {})[o];
          return "object" === i(s) && r(s), r((this.options.context || {}).userdata || {}), n
        }
      }, {
        key: "updatePre",
        value: function(t) {
          var e = this.options.config || {},
            n = K("_$") || {};
          return e && e.referrer && (n.page_referrer = e.referrer, t.pre = e.referrer), q("_$", n), t
        }
      }, {
        key: "updateUrl",
        value: function(t) {
          var e = this.options.config || {};
          return e && e.pageUrl && (t.url = e.pageUrl), t
        }
      }, {
        key: "updateSpmUrl",
        value: function(t) {
          var e = this.options.config || {},
            n = e[ct.SPM_URL] || e.spmUrl;
          return O(n) || (t.gokey[ct.SPM_URL] = n), t
        }
      }, {
        key: "updateSpmPre",
        value: function(t) {
          var e = this.options.config || {},
            n = e[ct.SPM_PRE] || e.spmPre;
          return O(n) || (t.gokey[ct.SPM_PRE] = n), t
        }
      }, {
        key: "run",
        value: function() {
          var t = this.options.context.what_to_send.logdata,
            e = Object.assign({}, this.getUserdata(), t.userdata || {});
          t.gokey = Object.assign({}, t.gokey, e), t = this.updatePre(t), t = this.updateUrl(t), t = this.updateSpmUrl(t), t = this.updateSpmPre(t), this.options.context.what_to_send.logdata = t, this.options.context.userdata = t.gokey
        }
      }]), t
    }(),
    Zn = Kt(Object.freeze({
      __proto__: null,
      default: Xn
    }));

  function tr(t, e) {
    var n, r = F(j());
    if (n = ee().getSync(ht.APLUS_REMOTE_CONFIG)) {
      var a = r.getMetaInfo(ht.APLUS_EVENT_LIMITRATES) || Pt.mapEventSampleRates(n.eventSamplingRate);
      if (a && a.length > 0) {
        var o = v.find(a, (function(e) {
          return e.eventId === t
        }));
        if (o && Math.ceil(1e3 * Math.random()) > 1e3 * o.samplingRate) return !0
      }
    }
    return !1
  }

  function er(t) {
    var e = F(j()).getMetaInfo(ht.APLUS_PRESET_EVENTS_DISABLED);
    if (e && v.isArray(e) && t && t.indexOf("$$_") > -1 && -1 !== e.indexOf(t)) return !0
  }
  var nr = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          var t = K("_$") || {},
            e = this.options.context.can_to_sendpv || {},
            n = t.send_pv_count || 0,
            r = this.options.config || {},
            a = Vt.getCurrentPage(),
            o = a.route || a.is,
            i = this.options.context.userdata.page_name || Je() || o;
          if (! function(t, e) {
              return n = t, r = e, a = ie(), o = se(), i = Pt.LocalCfgUtils.localAutoPVDisabled(), !(!a || er(ht.PAGE_START) || tr(r) || n && (2 === o || !o && i));
              var n, r, a, o, i
            }(r.track_type, i)) return "done";
          e.flag = "YES", this.options.context.can_to_sendpv = e, t.send_pv_count = ++n, q("_$", t)
        }
      }]), t
    }(),
    rr = Kt(Object.freeze({
      __proto__: null,
      default: nr
    })),
    ar = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "getUserData",
        value: function() {
          var t = F(j()),
            e = this.options.context || {},
            n = e.userdata || {},
            r = e.what_to_send.logdata.gokey;
          r = b.assign(r, C(n.gokey)), r = b.assign(r, C(t.getMetaInfo("aplus-exinfo") || {}));
          var a = t.getMetaInfo("aplus-exdata");
          return v.isArray(a) ? a.forEach((function(t) {
            r = b.assign(r, t)
          })) : r = b.assign(r, a || {}), r
        }
      }, {
        key: "run",
        value: function() {
          var t = this.options.context.what_to_send.logdata,
            e = this.getUserData();
          "1010" === t.gmkey && (t.arg1 = e.duration || t.logkey), t.gokey = e, this.options.context.what_to_send.logdata = t
        }
      }]), t
    }(),
    or = Kt(Object.freeze({
      __proto__: null,
      default: ar
    })),
    ir = N.extend({
      _send: function(t, e, n, r, a) {
        return "object" === i(e) && "POST" === n ? Vt.request(t, {
          method: n,
          data: e,
          dataType: "base64"
        }, r, a) : Vt.request("".concat(t, "?").concat(e), {
          method: n,
          dataType: "base64"
        }, r, a), t
      },
      _requestVTConfig: function(t, e, n) {
        Vt.request(t, {
          method: "GET",
          dataType: "json"
        }, e, n)
      },
      _requestRemoteConfig: function(t, e, n) {
        Vt.request(t, {
          method: "GET",
          dataType: "json"
        }, e, n)
      },
      _sendPV: function(t, e) {
        var n = F(j());
        (t = t || {}).pageName && n._setMetaInfo("".concat(ht.APLUS, "-pagename"), t.pageName);
        var r = new J;
        t.recordType = "PV", t.method || (t.method = "GET");
        var a = n.logConfig.pv;
        return r.run({
          plugins: a.plugins,
          context: b.cloneDeep(a.context)
        }, {
          config: t,
          userdata: e || {},
          pubsubType: "pv",
          middlewareMessageKey: "mw_change_pv"
        }), !0
      },
      _combineRecord: function(t, e, n, r) {
        var a = F(j()),
          o = "EXP";
        if (!a.globalConfig.isAli || e !== o && "CLK" !== e) x().w("only support EXP or CLK log to combile record!");
        else if (v.isArray(n)) {
          r || (r = "POST");
          var s = [],
            c = "true";
          n.forEach((function(t) {
            s.push({
              exargs: "object" === i(t.exargs) ? t.exargs : {},
              scm: t.scm,
              spm: t.spm,
              aplusContentId: t.aplusContentId
            }), "false" === t._aplus_sendtomy && "true" === c && (c = "false")
          }));
          var u = [];
          u.push((e === o ? "expdata=" : "clkdata=") + JSON.stringify(s)), u.push(e === o ? "_is_auto_exp=1" : "_is_auto_clk=1"), u.push("_eventType=custom"), u.push("_method=".concat(r)), u.push("_pkgSize=".concat(n.length)), "false" === c && u.push("_aplus_sendtomy=false"), a.record(t, e, u.join("&"), r)
        } else x().w("type of gokeys must be ArrayObject!")
      },
      _record: function(t, e, n, r, a) {
        var o, s = F(j());
        return (o = H()) && i(o.subscribe) === G && o.subscribe("aplusInitContext", (function(o) {
          if ("complete" === o.status) {
            n = function(t) {
              var e = xn("aplus-inject-record-gokey");
              return "function" == typeof e ? e(t) : t.gokey
            }({
              logkey: t,
              gmkey: e,
              gokey: n
            }), t += "";
            var i = new J,
              c = s.logConfig.hjlj;
            (function(t, e) {
              return function(t, e) {
                if (!ie()) try {
                  var n = Vt.getPlatformContext();
                  return b.isEmptyObject(n) ? void 0 : e === ht.APP_START || e === ht.APP_END
                } catch (t) {}
                var r = ce(),
                  a = oe(),
                  o = Pt.LocalCfgUtils.getAutoTrackStatus();
                if (("string" == typeof t ? w(function(t) {
                    for (var e, n = t.split("&"), r = 0, a = n.length, o = []; r < a; r++) e = n[r].split("="), o.push([e.shift(), e.join("=")]);
                    return o
                  }(t)) : t || {}).auto_element) {
                  if (2 === a || 2 === r) return;
                  if (!r && !o) return
                }
                return !er(e) && (!tr(e) || void 0)
              }(t, e)
            })(n, t) && i.run({
              plugins: c.plugins,
              context: b.cloneDeep(c.context)
            }, {
              config: {
                recordType: "COMMON_HJLJ",
                method: r || "GET"
              },
              userdata: {
                logkey: t,
                gmkey: e,
                gokey: n
              },
              pubsubType: "hjlj",
              middlewareMessageKey: "mw_change_hjlj"
            }, (function() {
              P(a) && a()
            }))
          }
        })), !0
      },
      getPageSPM: function() {
        var t = ((F(j())._$ || {}).spm || {}).data || {};
        return [t.a, t.b]
      },
      _setPageSPM: function() {
        var t, e, n = {},
          r = arguments;
        "object" === i(r[0]) ? (n = r[0], t = r[1]) : (n.spmCnt = [r[0], r[1], "0", "0"].join("."), t = r[2]), n.spmCnt || n.spmUrl || !xn("pageConfig") ? ($(e = ["setPageSPM", n]), Y(e)) : ($(e = ["clearPageSPM"]), Y(e)), ("function" == typeof t ? t : function() {})(e)
      },
      _setMetaInfo: function(t, e) {
        return Rn(t, e)
      },
      _appendMetaInfo: Nn,
      getMetaInfo: function(t) {
        return xn(t)
      },
      cloneDeep: b.cloneDeep,
      _setPageName: function(t, e) {
        if (t) {
          var n = e || Ye(),
            r = b.cloneDeep(xn("pageConfig") || {});
          r[n] = t, Nn("pageConfig", r)
        } else x().w("setPageName failed: pageName=".concat(t))
      },
      getPageName: function(t) {
        return Je(t)
      },
      _getElementSPM: function(t, e) {
        if (t) {
          var n = Je() || "";
          if ("string" != typeof t) {
            var r = t.dataset && t.dataset.trackerParams || "",
              a = T(r);
            return [n, a.spmC, a.spmD].join(".")
          }
          var o, i = Vt.getPlatformContext(),
            s = xn("aplus-auto-clk") || [],
            c = xn("aplus-auto-exp") || [];
          try {
            var u;
            for (u = 0; u < s.length; u++) {
              var p = s[u];
              if (p.cssSelector === t) {
                o = [p.spmB || n, p.spmC, p.spmD].join(".");
                break
              }
            }
            for (u = 0; u < c.length; u++) {
              var f = c[u];
              if (f.cssSelector === t) {
                o = [f.spmB || n, f.spmC, f.spmD].join(".");
                break
              }
            }
            var l = i.createSelectorQuery().selectAll(t);
            "function" == typeof l.fields && l.fields({
              dataset: !0,
              id: !0
            }, (function(t) {
              var n = [];
              if (t && t.length > 0) {
                for (var r = 1; r <= t.length; r++) n.push("".concat(o, "_").concat(r));
                e && "function" == typeof e && e(n)
              }
            })).exec()
          } catch (t) {
            x().w("current miniapp platform does not support dom element query, errmsg: ", t)
          }
        }
      },
      _recordAppLink: function(t, e, n) {
        return t.targetAppKey ? F(j())._record("$$_app_link", "OTHER", t, e, n) : (x().w("send $$_app_link failed: targetAppKey is null"), !1)
      },
      _updatePageProperties: function(t, e) {
        var n, r = e || Ye(),
          a = F(j()).getMetaInfo(ht.PAGE_CONFIG);
        if (!b.isEmptyObject(t))
          if (a && a[r]) a[r].properties = t, n = a;
          else {
            var o = Object.create(null);
            o[r] = {
              properties: t
            }, n = o
          } n && Nn(ht.PAGE_CONFIG, n)
      },
      _reportUserInfo: function(t, e) {
        var n = {};
        t && ("string" == typeof t ? n._user_email = t : x().w("请输入正确类型的user_email")), e && ("string" == typeof e ? n._user_mobile = e : x().w("请输入正确类型的user_mobile")), Object.keys(n).length && F(j()).record("$$_user_profile", "OTHER", n)
      }
    });
  exports.run = ir;
  var sr = {
      run: ir
    },
    cr = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          ! function(t) {
            var e = F(j());
            if (!e._aplus_api) {
              e._aplus_api = {
                status: ct.COMPLETE
              };
              var n = sr.run.create({
                logConfig: t
              });
              for (var r in n) e[r] = n[r];
              V(j(), e);
              var a = [ct.SDK_READY, ct.COMPLETE];
              $(a), Y(a)
            }
          }(this.options.context.logConfig)
        }
      }]), t
    }(),
    ur = Kt(Object.freeze({
      __proto__: null,
      default: cr
    })),
    pr = {
      lsMinivtConfigKey: "APLUS_MINI_CONFIG",
      getMiniVtTplCdnPath: function() {
        var t = F(j()).getMetaInfo("aplus-track-config-id"),
          e = t && t.turnon,
          n = t && t.value;
        return "1" === e && n ? n : ""
      },
      getVtConfigPath: function() {
        var t = this.getMiniVtTplCdnPath();
        if (t) {
          var e, n = [],
            r = Pt.getAppKey();
          return r && (e = r), e && (n = e.split(".")), 2 === n.length ? this.originSpm = {
            spmA: n[0],
            spmB: n[1]
          } : 1 === n.length && (this.originSpm.spmA = n[0]), t || (2 === n.length ? n.join("_") : 1 === n.length ? n[0] : void 0)
        }
      },
      fetchFromLS: function(t) {
        this.cdnpath || (this.cdnpath = t || this.getMiniVtTplCdnPath());
        var e = Vt.getPlatformContext(),
          n = "".concat(this.lsMinivtConfigKey, "-").concat(this.cdnpath);
        return decodeURIComponent(e.getStorageSync(n)) || {}
      },
      setConfigIntoLs: function(t) {
        this.cdnpath || (this.cdnpath = this.getVtConfigPath()), Vt.getPlatformContext().setStorageSync("".concat(this.lsMinivtConfigKey, "-").concat(this.cdnpath), encodeURIComponent(JSON.stringify(t)))
      }
    },
    fr = "MiniVtConfigBack",
    lr = ct.PUBLISH,
    gr = N.extend(b.assign(pr, {
      pathname: "",
      pageConfig: {},
      originSpm: {
        spmA: "",
        spmB: ""
      },
      updateCfgLs: function() {
        var t = this;
        setTimeout((function() {
          t.fetchFromCdn()
        }), 1e3)
      },
      fetchFromCdn: function() {
        var t = this,
          e = F(j()),
          n = e.getMetaInfo("aplus-vt-cfg-url");
        if (n) {
          var r = (new Date).getTime();
          e.requestVTConfig(n, (function(n) {
            var a = n.data;
            if (e._minicfg_load = (new Date).getTime() - r, a) try {
              e._aplus_vt_cfg = "object" === i(a) ? a : JSON.parse(a), e._aplus_vt_cfg.points && v.each(e._aplus_vt_cfg.points, (function(t) {
                t.selector = decodeURIComponent(t.selector)
              })), t.setConfigIntoLs(e._aplus_vt_cfg)
            } catch (t) {
              e._aplus_vt_cfg = {
                enabled: !1
              }
            }
            vt(lr, [fr, {
              pageConfig: e._aplus_vt_cfg,
              enable: 0
            }])
          }), (function(t) {
            e._aplus_vt_cfg && e._aplus_vt_cfg.enabled && vt(lr, [fr, {
                pageConfig: e._aplus_vt_cfg,
                enable: 0
              }]),
              function(t, e) {
                var n = t;
                "object" === i(e) && e.message && (n = "".concat(n, "_").concat(e.message)), vt("".concat(j(), "._aplus_cplugin_m.do_tracker_jserror"), [{
                  message: n,
                  error: JSON.stringify(e),
                  filename: t
                }])
              }("getTrackerCfg", t)
          }), {
            timeout: 5e3
          })
        }
      },
      getMiniVtData: function(t, e, n) {
        var r = F(j());
        if (r._minicfg_load = 0, t) {
          var a = this.fetchFromLS(t);
          if ("string" == typeof a) try {
            a = JSON.parse(a)
          } catch (t) {
            a = {}
          }
          a && a.enabled && (r._aplus_vt_cfg = a), n ? this.fetchFromCdn(t, e) : vt(lr, [fr, {
            pageConfig: a,
            enable: 0
          }])
        }
      },
      syncMiniVtData: function() {
        var t = this.getVtConfigPath();
        t && this.getMiniVtData(t, "", !0)
      },
      init: function() {
        var t = this;
        vt(ct.SUBSCRIBE, [fr, function(e) {
          e.enable || (t.pageConfig = e.pageConfig), vt(lr, ["MiniVtConfigFormat", {
            pageConfig: t.pageConfig,
            originSpm: t.originSpm
          }]), !e.enable && t.setConfigIntoLs(t.pageConfig)
        }]), t.syncMiniVtData()
      },
      run: function() {
        return this.init(), this
      }
    }));

  function _r(t, e) {
    return t = v.isArray(t) ? t : [], e = v.isArray(e) ? e : [], [].concat(e, t).filter((function(t, e, n) {
      return function(t, e) {
        for (var n = -1, r = 0; r < e.length; r++) {
          var a = e[r];
          if (a.cssSelector === t.cssSelector && a.logkey === t.logkey) {
            n = r;
            break
          }
        }
        return n
      }(t, n) === e
    }))
  }

  function hr(t) {
    return v.isArray(t) ? t.filter((function(t) {
      return void 0 === t._vt
    })) : []
  }

  function dr(t) {
    return /^[.#]/.test(t) ? t : t ? ".".concat(t) : ""
  }

  function mr() {
    var t, e, n, r, a, o = F(j()),
      s = o._aplus_vt_cfg || o._aplus_tracking_cfg;
    if (s && s.pages) {
      var c = (t = Vt.getCurrentPage().route, e = F(j()), n = e._aplus_vt_cfg || e._aplus_tracking_cfg, r = [], a = [], n && n.pages && v.each(n.pages, (function(o) {
          e.setPageName({
            pageName: o.spmB,
            extraParams: o.extraParams
          }, o.matchUrl), o.matchUrl === t && (v.each(n.points, (function(t) {
            o.spmB === t.spmB && ("exposure" === t.trackerType ? r.push({
              cssSelector: dr(t.selector),
              positionSelector: t.positionSelector,
              logkey: t.logkey,
              props: t.props,
              spmB: t.spmB,
              spmC: t.spmC,
              spmD: t.spmD,
              customArgs: t.customArgs,
              _vt: o.template || o.stdId ? 2 : 1
            }) : a.push({
              cssSelector: dr(t.selector),
              logkey: t.logkey,
              props: t.props,
              spmB: t.spmB,
              spmC: t.spmC,
              spmD: t.spmD,
              customArgs: t.customArgs,
              _vt: o.template || o.stdId ? 2 : 1
            }))
          })), n.common_exdata && "object" === i(n.common_exdata) && e.setMetaInfo("aplus-exdata", n.common_exdata), n.common_pvdata && "object" === i(n.common_pvdata) && e.setMetaInfo("aplus-cpvdata", n.common_pvdata))
        })), {
          EXP: r,
          CLK: a
        }),
        u = hr(o.getMetaInfo("aplus-auto-exp"));
      o.setMetaInfo("aplus-auto-exp", _r(u, c.EXP));
      var p = hr(o.getMetaInfo("aplus-auto-clk"));
      o.setMetaInfo("aplus-auto-clk", _r(p, c.CLK))
    }
  }
  var vr = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          var t = F(j());
          ! function() {
            var t, e, n, r = L().ctx,
              a = F(j()),
              o = "".concat(j(), "_pubsub"),
              i = B(),
              s = !1,
              c = {
                ts: Date.now()
              },
              u = {
                onPullDownRefresh: 0,
                onShareTimeline: 0,
                onReachBottom: 0,
                onShareAppMessage: 0
              };

            function p() {
              var a, o = arguments.length > 0 && arguments[0] ? arguments[0] : "",
                p = arguments.length > 1 && arguments[1] ? arguments[1] : {},
                f = p.route || "",
                l = Vt.getCurrentPage(),
                g = f || l.route || l.is;
              switch (o) {
                case "onPullDownRefresh":
                  u.onPullDownRefresh += 1, r[i].push({
                    action: dt.record,
                    arguments: [e.logkey || "$$_pull_down_refresh", "CLK", {
                      event: o,
                      page_name: Je() || g,
                      count: u.onPullDownRefresh,
                      is_auto: 1
                    }]
                  });
                  break;
                case "onReachBottom":
                  u.onReachBottom += 1, r[i].push({
                    action: dt.record,
                    arguments: [t.logkey || "$$_reach_bottom", "CLK", {
                      event: o,
                      page_name: Je() || g,
                      count: u.onReachBottom,
                      is_auto: 1
                    }]
                  });
                  break;
                case "onShareAppMessage":
                  u.onShareAppMessage += 1, r[i].push({
                    action: dt.record,
                    arguments: [n.logkey || "$$_share", "CLK", {
                      event: o,
                      page_name: Je() || g,
                      count: u.onShareAppMessage,
                      share_type: 1,
                      is_auto: 1,
                      $$_share_title: p.title || "",
                      $$_share_from: p.from || ""
                    }]
                  });
                  break;
                case "onShareTimeline":
                  u.onShareTimeline += 1, r[i].push({
                    action: dt.record,
                    arguments: [n.logkey || "$$_share", "CLK", {
                      event: o,
                      page_name: Je() || g,
                      count: u.onShareTimeline,
                      share_type: 0,
                      is_auto: 1,
                      $$_share_title: p.title || ""
                    }]
                  });
                  break;
                case "onAddToFavorites":
                  r[i].push({
                    action: dt.record,
                    arguments: [n.logkey || "$$_addtofavorite", "CLK", {
                      page_name: Je() || g,
                      is_auto: 1,
                      $$_favorite_title: p.title || ""
                    }]
                  });
                  break;
                case "onPageShow":
                  g && !s && ((c = {
                    path: g
                  }).ts = Date.now(), s = !0);
                  break;
                case "onPageHide":
                  if (s) {
                    var _ = Date.now() - c.ts || 0,
                      h = Vt.getReferrerPage().route || Vt.getReferrerPage().is || "-",
                      d = tn(c.path) || {},
                      m = b.assign(d, {
                        duration: _,
                        path: c.path,
                        page_name: d.page_name || Je() || c.path,
                        page_start: c.ts,
                        isMini: !0,
                        _page_auto_id: ht.PAGE_END,
                        _page_auto_pv: !0,
                        referrer: h
                      });
                    en(c.path) || (a = m, r[i].push({
                      action: dt.sendPV,
                      arguments: [{
                        is_auto: !0,
                        track_type: "1"
                      }, a]
                    })), c = null, s = !1
                  }
              }
            }
            r[i].push({
              action: ct.SUBSCRIBE,
              arguments: [ct.SDK_READY, function(r) {
                "complete" === r && (t = a.getMetaInfo("rb_config"), e = a.getMetaInfo("pdr_config"), n = a.getMetaInfo("share_config"))
              }]
            }), a[o].subscribe("onLoad", (function(t) {
              if ("ready" === t.status) try {
                var e = function() {
                  if (Ge) {
                    var t = He[Ge] || {},
                      e = /^\$vt_/,
                      n = decodeURIComponent(t.scene);
                    return n && e.test(n) && n.replace(e, "")
                  }
                }();
                e ? function(t, e) {
                  if (t && e) try {
                    var n = a.getMetaInfo("aplus-api-host"),
                      r = n.match(/[[a-z|\-|\_|0-9\.]+[a-z|\-|\_|0-9](:\d*)?/);
                    if (r && r[0]) {
                      var o = ct.HTTPS;
                      /(\d+\.){3,}\d+/.test(r[0]) && (o = "http:");
                      var i = "".concat(o, "//").concat(n, "/vt/loadTransferConfig?code=").concat(t, "&appInfoId=").concat(e);
                      Vt.request(i, {}, (function(t) {
                        try {
                          var e = t.data && t.data.data && t.data.data.config || "",
                            n = t.data && t.data.data && t.data.data.debugId || "";
                          n && a.appendMetaInfo("aplus-global-args", {
                            debugId: n
                          });
                          var r = Date.now();
                          a._minicfg_load = Date.now() - r, e && (a._aplus_vt_cfg = JSON.parse(e) || {}, mr())
                        } catch (t) {
                          x().w("fetch real-time visualization verification failed, err msg:".concat(t))
                        }
                      }))
                    }
                  } catch (t) {}
                }(e, a.getMetaInfo("appInfoId")) : a.getMetaInfo("aplus-vt-cfg-url") && mr()
              } catch (t) {
                x().w("fetch real-time visualization verification failed, errmsg:".concat(t))
              }
            })), a[o].subscribe("onShow", (function(t) {
              "ready" === t.status && !a.getMetaInfo("aplus-disable-apv") && p("onPageShow", t)
            })), a[o].subscribe("onHide", (function(t) {
              "ready" === t.status && !a.getMetaInfo("aplus-disable-apv") && p("onPageHide", t)
            })), a[o].subscribe("onPullDownRefresh", (function(t) {
              "ready" === t.status && p("onPullDownRefresh")
            })), a[o].subscribe("onReachBottom", (function(t) {
              "ready" === t.status && p("onReachBottom")
            })), a[o].subscribe("onShareAppMessage", (function(t) {
              "ready" === t.status && p("onShareAppMessage", t)
            })), a[o].subscribe("onShareTimeline", (function(t) {
              "ready" === t.status && p("onShareTimeline", t)
            })), a[o].subscribe("onAddToFavorites", (function(t) {
              p("onAddToFavorites", t)
            })), a.getMetaInfo("aplus-vt-cfg-url") && vt(ct.SUBSCRIBE, ["MiniVtConfigFormat", function(t) {
              var e = t.pageConfig;
              e && e.enabled && (a._aplus_vt_cfg = e)
            }])
          }(), t._aplus_aleady_load_minivt || (t._aplus_aleady_load_minivt = 1, gr.create().run())
        }
      }]), t
    }(),
    yr = Kt(Object.freeze({
      __proto__: null,
      default: vr
    }));

  function Sr(t, e) {
    var n = "";
    try {
      var r = Number(t);
      n = parseFloat(r.toFixed(e))
    } catch (e) {
      n = t
    }
    return n
  }
  var Ir = function(t, e, n, r, a, o) {
    var i = F(j()),
      s = n.props,
      c = {},
      u = {};
    if (e)
      for (var p in e) p.toLowerCase().match(/^data-/) ? u[p.toLowerCase().replace(/^data-/, "").replace(/-/g, "")] = e[p] : u[p] = e[p];
    if (s && v.isArray(s))
      for (var f = 0; f < s.length; f++) {
        var l = s[f].toLowerCase().replace(/^data-/, "").replace(/-/g, "");
        c[l] = u[l]
      }
    r && "EXP" === t && (c = Object.assign({}, c, {
      _w: Sr(r.width, 2),
      _h: Sr(r.height, 2),
      _x: Sr(r.x, 2),
      _y: Sr(r.y, 2),
      _rate: Sr(r.viewabilityRate || r.intersectionRatio, 2),
      _viewability: "intersection"
    })), n._vt && (c._vt = n._vt);
    var g = function(t, e, n, r) {
      var a = F(j()).getMetaInfo;
      if ("function" == typeof a) {
        var o = a(t),
          i = {};
        return "function" == typeof o && (i = o(e ? b.cloneDeep(e) : {}, n, r)), D.query2obj(i)
      }
      return {}
    }("EXP" === t ? "aplus-auto-exp-userfn" : "aplus-auto-clk-userfn", r, n.cssSelector, a);
    g.spm || (g.spm = a && a.b ? a : void 0);
    var _, h = e.trackerParams || e["tracker-params"];
    if (h) try {
      var d = JSON.parse(h);
      delete(c = Object.assign(c, d)).trackerParams, delete c.trackerparams
    } catch (t) {}
    if (_ = Object.assign({
        is_auto: 1
      }, c, g, n.customArgs), o) {
      var m = o.route;
      i.record(n.logkey, t, Object.assign({}, _, {
        currentPath: m
      }), "POST")
    } else i.record(n.logkey, t, _, "POST")
  };

  function br(t, e) {
    var n = (K("_aplus_auto_exp") || {}).hashMap || {};
    for (var r in n)
      for (var a = n[r] || [], o = 0; o < a.length; o++) {
        var i = a[o] || {},
          s = i.expConfig || {};
        if (t.cssSelector === s.cssSelector && Pt.getHashKey({
            index: e
          }, s) === i.hash_value) return b.cloneDeep(i.dataset)
      }
  }
  var Er = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          ! function() {
            var t = L().ctx,
              e = F(j()),
              n = B(),
              r = [];
            t[n].push({
              action: ct.SUBSCRIBE,
              arguments: [ct.SDK_READY, function(t) {
                "complete" === t && (r = e.getMetaInfo("aplus-auto-clk"))
              }]
            }), t[n].push({
              action: ct.SUBSCRIBE,
              arguments: ["onAplusClk", function(t) {
                "ready" === t.status && function(t) {
                  r = e.getMetaInfo("aplus-auto-clk");
                  var n = Je(),
                    a = [];

                  function o(e, n) {
                    v.isArray(e) && a.push({
                      config: n,
                      elements: e
                    }), a.length === r.length && function(t, e, n) {
                      var r, a = [];

                      function o(t, e) {
                        var n = {};
                        t && (t.changedTouches ? n = t.changedTouches[0] : t.touches ? n = t.touches[0] : t.detail && (n = t.detail));
                        var r = n.clientX || 0,
                          a = n.clientY || 0,
                          o = e.top,
                          i = e.bottom;
                        return e.scrollTop && (o += e.scrollTop, i += e.scrollTop), e.left < r && r < e.right && o < a && a < i
                      }
                      v.each(e, (function(e) {
                        for (var n = e.elements, r = e.config, i = 0; i < n.length; i++) {
                          var s = n[i];
                          if (o(t, s)) {
                            var c = i + 1,
                              u = s.dataset || br(r, c) || {},
                              p = {},
                              f = T(u.trackerParams) || {};
                            p.b = r.spmB, r.spmC ? p.c = r.spmC : p.c = f.spmC ? encodeURIComponent(f.spmC) : "", r.spmD ? p.d = c ? "".concat(r.spmD, "_").concat(c) : r.spmD : p.d = f.spmD ? encodeURIComponent(f.spmD) : "", a.push({
                              dataset: u,
                              config: r,
                              element: s,
                              spmData: p
                            })
                          }
                        }
                      })), 1 === a.length ? r = a[0] : a.length > 1 && (r = a.reduce((function(t, e) {
                        var n = t,
                          r = t.element,
                          a = e.element;
                        return a.top >= r.top && a.right <= r.right && a.bottom <= r.bottom && a.left >= r.left && (n = e), n
                      }))), r && Ir("CLK", r.dataset, r.config, r.element, r.spmData, n)
                    }(t.event, a, t.context)
                  }
                  v.isArray(r) && r.forEach((function(t) {
                    M.isStartWith(t.cssSelector, ".") || (t.cssSelector = ".".concat(t.cssSelector)), t.spmB || (t.spmB = n);
                    var e = Vt.getPlatformContext().createSelectorQuery().selectAll(t.cssSelector);
                    "function" == typeof e.fields ? e.fields({
                      id: !0,
                      dataset: !0,
                      rect: !0,
                      scrollOffset: !0
                    }, (function(e) {
                      o(e, t)
                    })).exec() : e.boundingClientRect().exec((function(e) {
                      o(e, t)
                    }))
                  }))
                }(t)
              }]
            })
          }()
        }
      }]), t
    }(),
    Ar = Kt(Object.freeze({
      __proto__: null,
      default: Er
    }));

  function Tr(t) {
    var e = F(j());
    return e && e.getMetaInfo ? e.getMetaInfo(t) : Et(t)
  }
  var Pr = function(t) {
      var e = t;
      try {
        var n = Tr("aplus-auto-exp-visible");
        return n && (e = parseFloat(n)), e <= 0 && (e = t), e
      } catch (e) {
        return t
      }
    },
    Or = Pr(.3);
  Pr("aplus-auto-exp-visible"), Pr("aplus-auto-exp-window"),
    function() {
      var t = 300;
      try {
        var e = Tr("aplus-auto-exp-duration"),
          n = parseInt(e, 10);
        "NaN" !== "".concat(n) && (t = n)
      } catch (e) {
        return t
      }
    }();
  var wr, Cr = [];

  function kr(t, e, n, r) {
    wr || (wr = Vt.getPlatformContext());
    var a, o = (K("_aplus_auto_exp") || {}).hashMap || {};

    function i(t, e) {
      var n = Pt.getHashKey(t, e);
      try {
        var r = t.index;
        if (o[e.logkey]) {
          var a = 0;
          o[e.logkey].forEach((function(e) {
            e.hash_value === n && (a = 1, t.id && (e.id = t.id), t.dataset && (e.dataset = t.dataset), t.status && (e.status = t.status))
          })), a || o[e.logkey].push({
            id: t.id,
            hash_value: n,
            status: 0,
            expConfig: e,
            dataset: t.dataset,
            index: r
          })
        } else o[e.logkey] = [{
          id: t.id,
          hash_value: n,
          status: 0,
          expConfig: e,
          dataset: t.dataset,
          index: r
        }]
      } catch (t) {
        x().w("error === ", t)
      }
    }! function r(s) {
      if (s < e.length) {
        var c = e[s];
        a = 0, Cr.forEach((function(t) {
          t.subject[0] === c.cssSelector && t.subject[1] === c.positionSelector && (a = 1)
        }));
        var u = [c.cssSelector, c.positionSelector];
        ! function() {
          var p = u[0];
          p && !M.isStartWith(u[0], ".") && (p = ".".concat(p));
          try {
            var f = wr.createSelectorQuery().selectAll(p);
            "function" == typeof f.fields ? f.fields({
              dataset: !0,
              id: !0
            }, (function(p) {
              v.isArray(p) && p.length > 0 && function(p) {
                if (0 === a || 0 === n) {
                  var f = function(t) {
                    var e = {
                        thresholds: [Or],
                        initialRatio: 0
                      },
                      n = !1;
                    try {
                      my && (n = !0)
                    } catch (t) {}
                    return n ? (e.selectAll = !0, wr.createIntersectionObserver(e)) : (e.observeAll = !0, wr.createIntersectionObserver(t, e))
                  }(t);
                  f.subject = u, Cr.length > e.length - 1 && Cr.shift().disconnect(), Cr.push(f), v.each(p.elements, (function(t, e) {
                      t.index = "".concat(e + 1),
                        function(t, e) {
                          var n = Pt.getHashKey(t, e),
                            r = t.index;
                          return o[e.logkey] && o[e.logkey].forEach((function(t) {
                            if (t.hash_value === n && t.index === r) return !0
                          })), !1
                        }(t, c) || i(t, c)
                    })),
                    function(t, e, n) {
                      var r = e.cssSelector;
                      r && !M.isStartWith(r, ".") && (r = ".".concat(r)), e.positionSelector ? t.relativeTo(e.positionSelector).observe(r, (function(t) {
                        try {
                          n(t, e)
                        } catch (t) {
                          x().w("errorMessage: ", t)
                        }
                      })) : t.relativeToViewport().observe(r, (function(t) {
                        try {
                          n(t, e)
                        } catch (t) {
                          x().w("errorMessage: ", t)
                        }
                      }))
                    }(f, c, (function(t, e) {
                      ! function(t, e, n) {
                        var r = -1;
                        Vt.getPlatformContext().createSelectorQuery().selectAll(t).boundingClientRect().exec((function(t) {
                          v.each(t[0], (function(t, n) {
                            t.width <= e.width && t.height === e.height && t.left === e.left && t.top === e.top && t.right === e.right && t.bottom === e.bottom && (r = n)
                          })), n(r)
                        }))
                      }(e.cssSelector, t.boundingClientRect, (function(n) {
                        var r = n + 1;
                        if (r) {
                          var a = b.cloneDeep(t);
                          a.index = "".concat(r);
                          var o = b.cloneDeep(a.dataset);
                          i({
                              id: a.id,
                              index: a.index,
                              dataset: o
                            }, e),
                            function(t, e, n) {
                              var r = function(t, e, n) {
                                var r = (K("_aplus_auto_exp") || {}).hashMap || {},
                                  a = [];
                                for (var o in r)
                                  if (Object.prototype.hasOwnProperty.call(r, o))
                                    for (var i = r[o] || [], s = 0; s < i.length; s++) {
                                      var c = Pt.getHashKey(e, n),
                                        u = i[s] || {};
                                      if (0 === u.status && u.expConfig && c === u.hash_value) {
                                        var p = e.boundingClientRect || {};
                                        if (p.width && p.height) {
                                          u.dataset = e.dataset, u.x = p.left, u.y = p.top, u.width = p.width, u.height = p.height, u.size = p.width * p.height;
                                          var f = Or;
                                          e.intersectionRatio >= f && (u.exposureTime = t, u.status = 1, a.push(u))
                                        }
                                      }
                                    }
                                return a
                              }((new Date).getTime(), t, n);
                              if (r && r.length > 0) {
                                var a = r[0],
                                  o = {},
                                  i = T(e.trackerParams || {}) || {},
                                  s = a.index;
                                Je() && (o.b = Je()), n.spmC ? o.c = n.spmC : o.c = i.spmC ? encodeURIComponent(i.spmC) : "", n.spmD ? o.d = s ? "".concat(n.spmD, "_").concat(s) : n.spmD : o.d = i.spmD ? encodeURIComponent(i.spmD) : "", Ir("EXP", e, n, Object.assign({}, t, {
                                  x: a.x,
                                  y: a.y,
                                  width: a.width,
                                  height: a.height,
                                  hash_value: a.hash_value
                                }), o)
                              }
                            }(a, o, c)
                        }
                      }))
                    }))
                }
                r(++s)
              }({
                elements: p,
                type: "COMMON"
              })
            })).exec() : x().w("current platform does not support auto exposure tracking!")
          } catch (t) {
            x().w("current platform does not support auto exposure tracking! err = ", t)
          }
        }()
      }
    }(0)
  }

  function Mr() {
    for (var t = 0; t < Cr.length; t++) Cr[t].disconnect();
    Cr = [];
    var e = (K("_aplus_auto_exp") || {}).hashMap || {};
    for (var n in e) delete e[n]
  }
  var Dr = {},
    xr = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          ! function() {
            var t = L().ctx,
              e = 0,
              n = 0,
              r = F(j()),
              a = B();
            if (!r._aplus_auto_exp) {
              r._aplus_auto_exp = {
                hashMap: {}
              };
              var o = [];
              t[a].push({
                action: ct.SUBSCRIBE,
                arguments: ["onShow", function(t) {
                  if ("ready" === t.status) {
                    s(t.context, 1, ct.SUBSCRIBE), 0 === e ? (c(t.context, 1), e = 1) : c(t.context, 0);
                    try {
                      var n = Vt.getCurrentPage(),
                        r = n.route || n.is;
                      Dr[r] = r
                    } catch (t) {}
                  }
                }]
              }), t[a].push({
                action: ct.SUBSCRIBE,
                arguments: ["onAplusTouch", function(t) {
                  "ready" === t.status && (0 === n ? (n = 1, c(t.context, 1)) : u(t))
                }]
              }), t[a].push({
                action: ct.SUBSCRIBE,
                arguments: ["onPageDataChanged", function(t) {
                  setTimeout((function() {
                    u(t)
                  }), 200)
                }]
              }), t[a].push({
                action: ct.SUBSCRIBE,
                arguments: ["onHide", function(t) {
                  "ready" === t.status && (Dr = {}, e = 0, n = 0, s(t.context, 1, ct.UNSUBSCRIBE), Mr())
                }]
              }), t[a].push({
                action: ct.SUBSCRIBE,
                arguments: ["onUnload", function(t) {
                  "ready" === t.status && (Dr = {}, Mr())
                }]
              })
            }

            function s(e, n, r) {
              t[a].push({
                action: r,
                arguments: ["setMetaInfo", function(t, r) {
                  if ("aplus-auto-exp" === t) {
                    var a = function(t) {
                      return function(t, e) {
                        var n, r = [],
                          a = [];
                        try {
                          n = e || Tr(t);
                          var o = [];
                          if (n && "string" == typeof n) try {
                            o = JSON.parse(n)
                          } catch (t) {
                            o = JSON.parse(n.replace(/'/g, '"'))
                          } else "object" === i(n) && n.constructor === Array && (o = n);
                          if (o && o.constructor === Array)
                            for (var s = 0; s < o.length; s++) {
                              var c = o[s] || {},
                                u = c.logkey || "",
                                p = c.tag ? c.tag : "",
                                f = c.filter,
                                l = c.cssSelector;
                              if (!u || !(l || p && f)) throw new Error("meta ".concat(t, " config error, ").concat(JSON.stringify(c)));
                              f = "string" == typeof f ? f.split("=") : [];
                              var g = p;
                              if (f.length >= 2 ? g += "[".concat(f.shift(), '="').concat(decodeURIComponent(f.join("")), '"]') : 1 === f.length && f[0] && (g += "[".concat(decodeURIComponent(f[0]), "]")), l && (g += l), c.elementSelector = g, v.indexOf(a, g) > -1) throw new Error("meta ".concat(t, " config error, tag_filter_cssSelector ").concat(g, " repeated"));
                              a.push(g), r.push(c)
                            }
                          return r
                        } catch (t) {
                          return x().w(t), r
                        }
                      }("aplus-auto-exp", t) || []
                    }(r);
                    if (JSON.stringify(a) === JSON.stringify(o)) return;
                    o = a, r && o && o.length > 0 && kr(e, o, n)
                  }
                }]
              })
            }

            function c(t, e) {
              o = r.getMetaInfo("aplus-auto-exp"), setTimeout((function() {
                kr(t, o, e)
              }), 0)
            }

            function u(t) {
              try {
                var e = Vt.getCurrentPage(),
                  n = e.route || e.is,
                  r = Dr[n],
                  a = JSON.stringify(t.data);
                r !== a && (Dr[n] = a, c(t.context, 0))
              } catch (t) {}
            }
          }()
        }
      }]), t
    }(),
    Nr = Kt(Object.freeze({
      __proto__: null,
      default: xr
    })),
    Rr = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "pushQueue",
        value: function(t, e) {
          F(B()).push({
            action: "".concat(j(), ".").concat(t),
            arguments: e
          })
        }
      }, {
        key: "run",
        value: function() {
          var t = this,
            e = F(j());
          d(ut, (function(n) {
            e[n] = function() {
              var e = [];
              d(arguments, (function(t) {
                e.push(t)
              }));
              var r = "enter" === n ? "_sendPV" : "_".concat(n);
              t.pushQueue(r, e)
            }
          }))
        }
      }]), t
    }(),
    Ur = Kt(Object.freeze({
      __proto__: null,
      default: Rr
    })),
    Lr = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "_getNetworkType",
        value: function(t) {
          var e = Vt.getPlatformContext();
          e.getNetworkType ? e.getNetworkType({
            success: function(e) {
              t(e ? e.networkType : "")
            }
          }) : t("")
        }
      }, {
        key: "_getSystemInfo",
        value: function(t) {
          var e = this,
            n = {},
            r = e.SYSTEM_INFO || {};
          if (r && r.version) t(e.SYSTEM_INFO);
          else try {
            Vt.getPlatformContext().getSystemInfo({
              complete: function(r) {
                r && r.version ? e._getNetworkType((function(n) {
                  r.networkType = n, e.SYSTEM_INFO = r, t(r)
                })) : e._getNetworkType((function(e) {
                  n.networkType = e, t(n)
                }))
              }
            })
          } catch (e) {
            t(n)
          }
        }
      }, {
        key: "_getAccountInfoSync",
        value: function() {
          var t = {};
          try {
            var e = Vt.getPlatformContext();
            if (e.getAccountInfoSync && e.canIUse("getAccountInfoSync")) {
              var n = e.getAccountInfoSync(),
                r = n.miniProgram || {},
                a = n.plugin || {};
              t.appId = r.appId, t.appVersion = r.version || r.envVersion, t.pluginAppId = a.appId, t.pluginAppVersion = a.version
            } else if (e.getAppIdSync && e.canIUse("getAppIdSync")) {
              var o = e.getAppIdSync() || {};
              t.appId = o.appId || ""
            }
          } catch (t) {}
          return t
        }
      }, {
        key: "run",
        value: function(t, e) {
          var n = this;
          return this._getSystemInfo((function(t) {
            t.userAgent = "-", t.os = t.platform ? t.platform.toLocaleUpperCase() : "", t.os_version = t.system ? t.system : "", t.access = t.brand ? t.brand : "";
            var r = "";
            t.host && "string" == typeof t.host.env && (r = t.host.env), t.host = r;
            var a = n._getAccountInfoSync(),
              o = Object.assign({}, t, a);
            F(j())._aplus_client = o, e()
          })), 2e3
        }
      }]), t
    }(),
    jr = Kt(Object.freeze({
      __proto__: null,
      default: Lr
    })),
    Br = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "run",
        value: function() {
          var t = this.options.context.sdk_config.queueName,
            e = L(),
            n = Jt(e[t] || [], "metaQueue");
          e[t] = n.queue, qt(n.formatQueue, this.options.config)
        }
      }]), t
    }(),
    Fr = Kt(Object.freeze({
      __proto__: null,
      default: Br
    })),
    Vr = function() {
      function t(e) {
        u(this, t), this.options = e
      }
      return p(t, [{
        key: "enableSDK",
        value: function(t) {
          L().ctx[B()].push({
            action: ct.SDK_SET_META_INFO,
            arguments: ["_hold", t ? "START" : "BLOCK"]
          })
        }
      }, {
        key: "emptyAnonyID",
        value: function() {
          L().ctx[B()].push({
            action: ct.SDK_SET_META_INFO,
            arguments: [ct._ANONY_ID, ""]
          })
        }
      }, {
        key: "run",
        value: function() {
          var t = this.options.context.sdk_config.metaInfo,
            e = F(j()),
            n = F(B()),
            r = t[ht.AUTO_GET_OPENID],
            a = Vt.getPlatformContext(),
            o = e && e.getMetaInfo && e.getMetaInfo(ct._ANONY_ID);
          if (r && !o) {
            var i = this;
            i.enableSDK(!1);
            var s = Vt.getPlatformType();
            try {
              if ("wx" === s) {
                var c = a.getAccountInfoSync().miniProgram.appId,
                  u = a.getStorageSync && a.getStorageSync(ct._ANONY_ID),
                  p = a.getStorageSync && a.getStorageSync(ct._DEV_ID);
                if (u) n.push({
                  action: ct.SDK_SET_META_INFO,
                  arguments: [ct._ANONY_ID, u]
                }), n.push({
                  action: ct.SDK_SET_META_INFO,
                  arguments: [ct._DEV_ID, p]
                }), i.enableSDK(!0);
                else {
                  var f = t.appKey || Pt.getAppKey();
                  a.login({
                    success: function(r) {
                      if (r.code) {
                        var a = t[ht.APLUS_PV_DOMAIN] || t[ht.TRACKDOMAIN],
                          o = "".concat(a, "/mp/get_openid");
                        Vt.request(o, {
                          method: "POST",
                          dataType: "json",
                          data: {
                            appkey: f,
                            code: r.code,
                            appid: c,
                            platform: s
                          }
                        }, (function(t) {
                          if (t && t.data && 200 === t.data.code) {
                            var r = t.data.data;
                            ee().set(ct._ANONY_ID, r.od), ee().set(ct._DEV_ID, r.ud), e.od = r.od, n.push({
                              action: ct.SDK_SET_META_INFO,
                              arguments: [ct._ANONY_ID, r.od]
                            }), n.push({
                              action: ct.SDK_SET_META_INFO,
                              arguments: [ct._DEV_ID, r.ud]
                            }), i.enableSDK(!0)
                          } else x().w("auto get openid failed errMsg:", t.data.message), i.emptyAnonyID(), i.enableSDK(!0)
                        }), (function(t) {
                          x().w("auto get openid failed, errmsg = ", t && t.message), i.emptyAnonyID(), i.enableSDK(!0)
                        }))
                      } else x().w("auto get openid failed"), i.emptyAnonyID(), i.enableSDK(!0)
                    },
                    fail: function() {
                      x().w("wechat login failed"), i.emptyAnonyID(), i.enableSDK(!0)
                    }
                  })
                }
              } else x().w("current miniapp platform:".concat(s, " not support autoGetOpenid, please setMetaInfo _anony_id by yourself!"))
            } catch (t) {
              x().w("get openid failed, errmsg = ", t), i.emptyAnonyID(), i.enableSDK(!0)
            }
          } else x().w("auto get openid setting is", r ? "true" : "false")
        }
      }]), t
    }(),
    Kr = {
      apiName: "aplus",
      queueName: "aplus_queue",
      metaInfo: {
        sdk_version: "2.1.17",
        trackDomain: "",
        appKey: "",
        sdkId: "qt_mini",
        "aplus-cpvdata": {},
        "aplus-exdata": {},
        "aplus-globaldata": {},
        "aplus-mmstat-timeout": "10000",
        "aplus-disable-autoevent": !1,
        "aplus-disable-apv": !1,
        "aplus-device-enable": !0,
        "aplus-request-timeout": 3e3,
        "aplus-mini-requests-limit": 1
      },
      globalConfig: {
        ETAG_STORAGE_KEY: "__ETAG__CNA__ID__",
        script_name: "qt_mini.js",
        lver: "2.1.17"
      },
      plugins: [{
        name: "aplus_queue",
        path: te
      }, {
        name: "inject_app_um",
        path: qe
      }, {
        name: "inject_page_um",
        path: yn
      }, {
        name: "pubsub",
        path: An
      }, {
        name: "aplus_mini_report_um",
        path: Cn
      }, {
        name: "aplus_meta_inject",
        path: Ln
      }, {
        name: "aplus_log_inject",
        path: Bn,
        deps: ["aplus_meta_inject"],
        config: {
          plugins: {
            pv: [{
              name: "when_to_sendpv",
              path: Vn,
              config: {
                aplusWaiting: ""
              }
            }, {
              name: "where_to_send",
              path: qn
            }, {
              name: "what_to_send",
              path: zn
            }, {
              name: "miniapp_data",
              path: Jn
            }, {
              name: "what_to_sendpv_userdata",
              path: Zn,
              deps: ["what_to_send"]
            }, {
              name: "can_to_sendpv",
              path: rr
            }],
            hjlj: [{
              name: "where_to_send",
              path: qn
            }, {
              name: "what_to_send",
              path: zn,
              deps: []
            }, {
              name: "miniapp_data",
              path: Jn
            }, {
              name: "what_to_hjlj_userdata",
              path: or
            }]
          }
        }
      }, {
        name: "aplus_api",
        path: ur,
        deps: ["aplus_log_inject", "aplus_meta_inject"]
      }, {
        name: "auto_tracker_um",
        path: yr,
        deps: ["inject_page_um"]
      }, {
        name: "aplus_ac",
        path: Ar,
        deps: ["inject_page_um"]
      }, {
        name: "aplus_ae",
        path: Nr,
        deps: ["inject_page_um"]
      }, {
        name: "open_api",
        path: Ur
      }, {
        name: "aplus_client",
        path: jr
      }, {
        name: "meta_queue",
        path: Fr
      }, {
        name: "auto_openid",
        enable: !0,
        path: Kt(Object.freeze({
          __proto__: null,
          default: Vr
        })),
        config: {},
        deps: ["aplus_meta_inject"]
      }]
    };
  exports.la = function(t) {
    return function(t, e, n) {
      var r, a, o, s;
      return r = Vt.getPlatformContext(), a = {
        apiName: e.apiName,
        queueName: e.queueName
      }, R = r._sdk_context || U.create(r, a), "object" === i(t) && (e.metaInfo = Object.assign({}, e.metaInfo, t.metaInfo)), x().setDebug(t.metaInfo.DEBUG), $([ct.SDK_READY, "running"]), o = {
        plugins: e.plugins,
        context: function() {
          var t = {
              PAGE_LOAD_TIME: new Date
            },
            n = [];
          return v.each(e.plugins, (function(e) {
            t[e.name] = e.config, "aplus_log_inject" === e.name && e.config && e.config.plugins && (n = e.config.plugins.pv, v.each(n, (function(e) {
              t[e.name] = e.config
            })))
          })), Object.assign({}, t, {
            sdk_config: e
          })
        }
      }, s = function(t) {
        n && P(n) && n()
      }, (new J).run({
        plugins: o.plugins,
        context: o.context
      }, {
        config: {},
        userdata: {},
        pubsubType: "aplusinit",
        messageFnQueue: [],
        middlewareMessageKey: "mw_change_aplusinit"
      }, (function(t) {
        var e = ["aplusInitContext", t];
        $(e), Y(e), P(s) && s()
      })), L()
    }(t, Kr, (function() {
      x().v("QuickTracking SDK INIT SUCCESS!")
    }))
  }
}();