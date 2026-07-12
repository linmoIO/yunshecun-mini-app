! function() {
  "use strict";
  const t = require("../../../../../common/vendor.js");
  var e = function() {
    return (e = Object.assign || function(t) {
      for (var e, i = 1, n = arguments.length; i < n; i++)
        for (var r in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      return t
    }).apply(this, arguments)
  };

  function i(t, e, i, n) {
    return new(i || (i = Promise))((function(e, r) {
      function o(t) {
        try {
          a(n.next(t))
        } catch (t) {
          r(t)
        }
      }

      function s(t) {
        try {
          a(n.throw(t))
        } catch (t) {
          r(t)
        }
      }

      function a(t) {
        var n;
        t.done ? e(t.value) : (n = t.value, n instanceof i ? n : new i((function(t) {
          t(n)
        }))).then(o, s)
      }
      a((n = n.apply(t, [])).next())
    }))
  }

  function n(t, e) {
    var i, n, r, o, s = {
      label: 0,
      sent: function() {
        if (1 & r[0]) throw r[1];
        return r[1]
      },
      trys: [],
      ops: []
    };
    return o = {
      next: a(0),
      throw: a(1),
      return: a(2)
    }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
      return this
    }), o;

    function a(o) {
      return function(a) {
        return function(o) {
          if (i) throw new TypeError("Generator is already executing.");
          for (; s;) try {
            if (i = 1, n && (r = 2 & o[0] ? n.return : o[0] ? n.throw || ((r = n.return) && r.call(n), 0) : n.next) && !(r = r.call(n, o[1])).done) return r;
            switch (n = 0, r && (o = [2 & o[0], r.value]), o[0]) {
              case 0:
              case 1:
                r = o;
                break;
              case 4:
                return s.label++, {
                  value: o[1],
                  done: !1
                };
              case 5:
                s.label++, n = o[1], o = [0];
                continue;
              case 7:
                o = s.ops.pop(), s.trys.pop();
                continue;
              default:
                if (!((r = (r = s.trys).length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                  s = 0;
                  continue
                }
                if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                  s.label = o[1];
                  break
                }
                if (6 === o[0] && s.label < r[1]) {
                  s.label = r[1], r = o;
                  break
                }
                if (r && s.label < r[2]) {
                  s.label = r[2], s.ops.push(o);
                  break
                }
                r[2] && s.ops.pop(), s.trys.pop();
                continue
            }
            o = e.call(t, s)
          } catch (t) {
            o = [6, t], n = 0
          } finally {
            i = r = 0
          }
          if (5 & o[0]) throw o[1];
          return {
            value: o[0] ? o[1] : void 0,
            done: !0
          }
        }([o, a])
      }
    }
  }
  var r = {
      MP_WEIXIN: "mp-weixin",
      MP_BAIDU: "mp-baidu",
      MP_TOUTIAO: "mp-toutiao",
      H5: "h5",
      WEB: "web",
      PLUS: "plus"
    },
    o = ["contentSize", "clientSize", "borderSize", "offsetSize"],
    s = "view",
    a = "text",
    h = "image",
    d = "qrcode",
    c = "block",
    l = "absolute",
    f = "fixed",
    u = {
      display: c,
      color: "#000000",
      lineHeight: "1.4em",
      fontSize: 14,
      fontWeight: 400,
      fontFamily: "sans-serif",
      lineCap: "butt",
      flexDirection: "row",
      flexWrap: "nowrap",
      textAlign: "left",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      position: "static",
      transformOrigin: "center center"
    },
    g = {
      upx2px: function(t) {
        return window.innerWidth / 750 * t
      },
      getSystemInfoSync: function() {
        return {
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight
        }
      },
      getImageInfo: function(t) {
        var e = t.src,
          i = t.success,
          n = t.fail,
          r = new Image;
        r.onload = function() {
          i({
            width: r.naturalWidth,
            height: r.naturalHeight,
            path: r.src,
            src: e
          })
        }, r.onerror = n, r.src = e
      }
    },
    p = "object" == typeof window ? void 0 === t.index || void 0 !== t.index && !t.index.addInterceptor ? r.WEB : r.H5 : "object" == typeof swan ? r.MP_BAIDU : "object" == typeof tt ? r.MP_TOUTIAO : "object" == typeof plus ? r.PLUS : "object" == typeof t.wx$1 ? r.MP_WEIXIN : void 0,
    v = p == r.MP_WEIXIN ? t.wx$1 : void 0 !== t.index ? t.index.getImageInfo ? {
      upx2px: function(e) {
        return t.index.upx2px(e)
      },
      getSystemInfoSync: function() {
        return t.index.getSystemInfoSync()
      },
      getImageInfo: function(e) {
        return t.index.getImageInfo(e)
      },
      downloadFile: function(e) {
        return t.index.downloadFile(e)
      }
    } : Object.assign(t.index, g) : "undefined" != typeof window ? g : t.index;
  if (!v.upx2px) {
    var x = ((v.getSystemInfoSync && v.getSystemInfoSync()).screenWidth || 375) / 750;
    v.upx2px = function(t) {
      return x * t
    }
  }

  function b(t) {
    return /^-?\d+(\.\d+)?$/.test(t)
  }

  function y(t, e, i) {
    if (b(t)) return 1 * t;
    if ("string" == typeof t) {
      var n = /^-?([0-9]+)?([.]{1}[0-9]+){0,1}(em|rpx|vw|vh|px|%)$/g.exec(t);
      if (!t || !n) return 0;
      var r = n[3];
      t = parseFloat(t);
      var o = 0;
      if ("rpx" === r) o = v.upx2px(t);
      else if ("px" === r) o = 1 * t;
      else if ("%" === r && e) o = t * y(e) / 100;
      else if ("em" === r && e) o = t * y(e || 14);
      else if (["vw", "vh"].includes(r)) {
        var s = v.getSystemInfoSync(),
          a = s.screenWidth,
          h = s.screenHeight;
        o = t * ("vw" == r ? a : h) / 100
      }
      return 1 * o.toFixed(2)
    }
    return 0
  }

  function m(t) {
    return /%$/.test(t)
  }

  function w(t) {
    for (var e = [], i = [], n = 0, r = t.substring(0, t.length - 1).split("%,"); n < r.length; n++) {
      var o = r[n];
      e.push(o.substring(0, o.lastIndexOf(" ")).trim()), i.push(o.substring(o.lastIndexOf(" "), o.length) / 100)
    }
    return {
      colors: e,
      percents: i
    }
  }

  function S(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = i, t
  }

  function z() {
    return (z = Object.assign || function(t) {
      for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
      }
      return t
    }).apply(this, arguments)
  }

  function M(t, e) {
    return (M = Object.setPrototypeOf || function(t, e) {
      return t.__proto__ = e, t
    })(t, e)
  }

  function k(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
    return n
  }

  function W(t, e) {
    var i = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
    if (i) return (i = i.call(t)).next.bind(i);
    if (Array.isArray(t) || (i = function(t, e) {
        if (t) {
          if ("string" == typeof t) return k(t, e);
          var i = Object.prototype.toString.call(t).slice(8, -1);
          return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? k(t, e) : void 0
        }
      }(t)) || e) {
      i && (t = i);
      var n = 0;
      return function() {
        return n >= t.length ? {
          done: !0
        } : {
          done: !1,
          value: t[n++]
        }
      }
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
  }

  function I(t) {
    return "number" == typeof t
  }

  function B(t) {
    return "auto" === t || null === t
  }

  function P(t) {
    return /%$/.test(t)
  }
  var R = h,
    L = a,
    T = d,
    O = l,
    F = f;
  var A, C = 0,
    j = function() {
      function t() {
        S(this, "elements", []), S(this, "afterElements", []), S(this, "beforeElements", []), S(this, "ids", []), S(this, "width", 0), S(this, "height", 0), S(this, "top", 0), S(this, "left", 0), S(this, "pre", null), S(this, "offsetX", 0), S(this, "offsetY", 0), C++, this.id = C
      }
      var e = t.prototype;
      return e.fixedBind = function(t, e) {
        void 0 === e && (e = 0), this.container = e ? t.parent : t.root, this.container.fixedLine = this, this.fixedAdd(t)
      }, e.fixedAdd = function(t) {
        if (!this.ids.includes(t.id)) {
          this.ids.push(t.id), this.elements.push(t);
          var e = t.computedStyle.zIndex;
          (void 0 === e ? 0 : e) >= 0 ? this.afterElements.push(t) : this.beforeElements.push(t), this.refreshLayout()
        }
      }, e.bind = function(t) {
        this.container = t.parent, this.container.line = null, this.container.lines ? (this.container.lines.push(this), this.pre = this.getPreLine(), this.top = this.pre.top + this.pre.height, this.left = this.container.contentSize.left) : (this.top = this.container.contentSize.top, this.left = this.container.contentSize.left, this.container.lines = [this]), this.isInline = t.isInline(), this.container.line = this, this.outerWidth = t.parent && t.parent.contentSize.width ? t.parent.contentSize.width : 1 / 0, this.add(t)
      }, e.getPreLine = function() {
        return this.container.lines[this.container.lines.length - 2]
      }, e.canIEnter = function(t) {
        return this.outerWidth || t.parent && t.parent.contentSize.width, !((100 * t.offsetSize.width + 100 * this.width) / 100 > this.outerWidth && (this.closeLine(), 1))
      }, e.closeLine = function() {
        delete this.container.line
      }, e.add = function(t) {
        this.ids.includes(t.id) || (this.ids.push(t.id), this.elements.push(t), this.refreshWidthHeight(t))
      }, e.refreshWidthHeight = function(t) {
        t.offsetSize.height > this.height && (this.height = t.offsetSize.height), this.width += t.offsetSize.width || 0, (this.container.lineMaxWidth || 0) < this.width && (this.container.lineMaxWidth = this.width)
      }, e.refreshXAlign = function() {
        if (this.isInline) {
          var t = this.container.contentSize.width - this.width,
            e = this.container.style.textAlign;
          "center" === e ? t /= 2 : "left" === e && (t = 0), this.offsetX = t
        }
      }, e.getOffsetY = function(t) {
        if (!t || !t.style) return 0;
        var e = (t.style || {}).verticalAlign;
        return "bottom" === e ? this.height - t.contentSize.height : "middle" === e ? (this.height - t.contentSize.height) / 2 : 0
      }, e.setIndent = function(t) {
        var e = t.style.textIndent;
        if (e && /^calc/.test(e)) {
          var i = /^calc\((.+)\)$/.exec(e);
          if (i && i[1]) {
            var n = function t(e) {
              e = e.trim();
              for (var i = new Array, n = "+", r = "", o = e.length, s = 0; s < o; ++s) {
                if ("." === e[s] || !isNaN(Number(e[s])) && " " !== e[s]) r += e[s];
                else if ("(" === e[s]) {
                  for (var a = 1, h = s; a > 0;) "(" === e[h += 1] && (a += 1), ")" === e[h] && (a -= 1);
                  r = "" + t(e.slice(s + 1, h)), s = h
                }
                if (isNaN(Number(e[s])) && "." !== e[s] || s === o - 1) {
                  var d = parseFloat(r);
                  switch (n) {
                    case "+":
                      i.push(d);
                      break;
                    case "-":
                      i.push(-d);
                      break;
                    case "*":
                      i.push(i.pop() * d);
                      break;
                    case "/":
                      i.push(i.pop() / d)
                  }
                  n = e[s], r = ""
                }
              }
              for (var c = 0; i.length;) c += i.pop();
              return c
            }(i[1].replace(/([^\s\(\+\-\*\/]+)\.(left|right|bottom|top|width|height)/g, (function(e) {
              var i = e.split("."),
                n = i[0],
                r = i[1],
                o = t.parent.querySelector(n);
              if (o && o.offsetSize) {
                var s = {
                  right: o.offsetSize.left + o.offsetSize.width,
                  bottom: o.offsetSize.top + o.offsetSize.height
                };
                return o.offsetSize[r] || s[r] || 0
              }
            })).replace(new RegExp(/-?[0-9]+(\.[0-9]+)?(rpx|px|%)/, "g"), y));
            t.style.textIndent = n
          }
        }
      }, e.layout = function(t, e) {
        var i = this;
        this.refreshXAlign(), this.pre ? (this.top = this.pre.top + this.pre.height + this.offsetY, this.left = e + this.offsetX) : (this.top = Math.max(this.top, this.container.contentSize.top, t) + this.offsetY, this.left = Math.max(this.left, this.container.contentSize.left, e) + this.offsetX), this.elements.forEach((function(t, e) {
          i.setIndent(t);
          var n = i.elements[e - 1],
            r = i.getOffsetY(t);
          t.style.top = i.top + r, t.style.left = n ? n.offsetSize.left + n.offsetSize.width : i.left, t.getBoxPosition()
        }))
      }, e.refreshLayout = function() {
        this.afterElements = this.afterElements.sort((function(t, e) {
          return t.computedStyle.zIndex - e.computedStyle.zIndex
        })), this.beforeElements = this.beforeElements.sort((function(t, e) {
          return t.computedStyle.zIndex - e.computedStyle.zIndex
        }))
      }, t
    }(),
    E = ((A = {}).row = {
      width: "width",
      contentWidth: "width",
      lineMaxWidth: "lineMaxWidth",
      left: "left",
      top: "top",
      height: "height",
      lineMaxHeight: "lineMaxHeight",
      marginLeft: "marginLeft"
    }, A.column = {
      width: "height",
      contentWidth: "height",
      lineMaxWidth: "lineMaxHeight",
      left: "top",
      top: "left",
      height: "width",
      lineMaxHeight: "lineMaxWidth",
      marginLeft: "marginTop"
    }, A),
    H = function(t) {
      var e, i;

      function n() {
        var e;
        return S(function(t) {
          if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t
        }(e = t.call(this) || this), "outerWidth", 0), e.exactValue = 0, e.flexTotal = 0, e.width = 0, e.key = null, e.flexDirection = "row", e
      }
      i = t, (e = n).prototype = Object.create(i.prototype), e.prototype.constructor = e, M(e, i);
      var r = n.prototype;
      return r.bind = function(t) {
        this.container = t.parent, this.container.line = this, this.container.lines ? (this.container.lines.push(this), this.pre = this.getPreLine(), this.top = this.pre.top + this.pre.height, this.left = this.container.contentSize.left) : (this.top = this.container.contentSize.top, this.left = this.container.contentSize.left, this.container.lines = [this]), t.parent && (this.flexDirection = t.parent.style.flexDirection, this.key = E[this.flexDirection]), this.initHeight(t), this.outerWidth = t.parent && t.parent.contentSize[this.key.contentWidth] ? t.parent.contentSize[this.key.contentWidth] : 1 / 0, this.add(t)
      }, r.add = function(t) {
        this.ids.push(t.id);
        var e = t.style.flex;
        I(e) ? this.flexTotal += e : I(this.getWidth(t.style)) && (this.exactValue += this.getWidth(t.offsetSize)), this.elements.push(t), this.refreshWidthHeight(t), t.next || this.closeLine()
      }, r.closeLine = function() {
        this.calcFlex()
      }, r.initHeight = function(t) {
        this[this.key.height] = 0
      }, r.getWidth = function(t) {
        return t[this.key.width] || 0
      }, r.getHeight = function(t) {
        return t[this.key.height] || 0
      }, r.setWidth = function(t, e) {
        t[this.key.width] = e
      }, r.setHeight = function(t, e) {
        t[this.key.height] = e
      }, r.calcFlex = function() {
        var t = this,
          e = this.container.contentSize[this.key.contentWidth],
          i = 0;
        this.elements.forEach((function(n) {
          var r = n.style,
            o = n.contentSize,
            s = t.getWidth(r) || t.getWidth(o);
          I(r.flex) && (s = r.flex / t.flexTotal * (e - t.exactValue)), t.setWidth(n.computedStyle, s), n.isFlexCalc = !0, delete n.line, delete n.lines, delete n.lineMaxWidth, n.getBoxWidthHeight(), i = Math.max(i, t.getHeight(n.offsetSize))
        })), this.setHeight(this, i)
      }, r.refreshWidthHeight = function(t) {
        var e = this.container.style.alignItems;
        e && !t.style.alignSelf && (t.style.alignSelf = e);
        var i = this.getHeight(t.offsetSize);
        i > this[this.key.height] && (this.container[this.key.lineMaxHeight] = this[this.key.height] = i), this[this.key.width] += this.getWidth(t.offsetSize);
        var n = Math.min(this.getWidth(this), !this.getWidth(this.container.contentSize) && 1 / 0);
        (this.container[this.key.lineMaxWidth] || 0) < n && (this.container[this.key.lineMaxWidth] = n)
      }, r.refreshXAlign = function() {
        var t, e, i = this,
          n = this.elements.reduce((function(t, e) {
            return t + i.getWidth(e.offsetSize)
          }), 0),
          r = (this.outerWidth == 1 / 0 ? 0 : this.outerWidth - n) || 0,
          o = this.container.style.justifyContent;
        "center" === o ? r /= 2 : "flex-start" === o ? r = 0 : ["space-between", "space-around"].includes(o) && (t = "space-between" == o, void 0 === (e = r) && (e = 0), e /= i.elements.length + (t ? -1 : 1), i.elements.forEach((function(n, r) {
          var o;
          t && !r || (n.style.margin ? n.style.margin[i.key.marginLeft] += e : n.style.margin = ((o = {})[i.key.marginLeft] = e, o), n.getBoxPosition())
        })), e = 0, r = 0), this.offsetX = r || 0, this.refreshYAlign()
      }, r.refreshYAlign = function() {
        var t = this;
        if (1 == this.container.lines.length) return 0;
        var e = this.container.lines.reduce((function(e, i) {
            return e + t.getHeight(i)
          }), 0),
          i = this.container.style.alignItems,
          n = this.getHeight(this.container.contentSize);
        if ("center" === i) {
          var r = (n - e) / (this.container.lines.length + 1);
          this.container.lines.forEach((function(t) {
            t.offsetY = r
          }))
        }
        if ("flex-end" === i) {
          var o = n - e;
          this.container.lines[0].offsetY = o
        }
      }, r.getOffsetY = function(t) {
        if (this.container.lines.length > 1) return 0;
        var e = t.style.alignSelf,
          i = this.getHeight(this.container.contentSize),
          n = i - this.getHeight(t.offsetSize);
        return "flex-end" === e ? n : "center" === e ? n / 2 : "stretch" === e ? (n && "view" == t.name && (t.style[this.key.width] = this.getWidth(t.offsetSize), t.style[this.key.height] = i, delete t.line, delete t.lines, t.getBoxWidthHeight()), 0) : 0
      }, r.layout = function(t, e) {
        var i = this;
        this.refreshXAlign(), this.pre ? (this.top = this.pre.top + this.pre.height + this.offsetY, this.left = e + this.offsetX) : (this.top = Math.max(this.top, this.container.contentSize.top, t) + this.offsetY, this.left = Math.max(this.left, this.container.contentSize.left, e) + this.offsetX), this.elements.forEach((function(t, e) {
          i.setIndent(t);
          var n = i.elements[e - 1],
            r = i.getOffsetY(t);
          t.style[i.key.top] = i[i.key.top] + r, t.style[i.key.left] = n ? n.offsetSize[i.key.left] + i.getWidth(n.offsetSize) : i[i.key.left], t.getBoxPosition()
        }))
      }, n
    }(j),
    $ = h,
    Y = a,
    U = s,
    D = "flex",
    X = l,
    N = 0,
    _ = {
      left: null,
      top: null,
      width: null,
      height: null
    },
    V = function() {
      function t(t, i, n, r) {
        var o = this;
        S(this, "id", N++), S(this, "style", {
          left: null,
          top: null,
          width: null,
          height: null
        }), S(this, "computedStyle", {}), S(this, "originStyle", {}), S(this, "children", {}), S(this, "layoutBox", z({}, _)), S(this, "contentSize", z({}, _)), S(this, "clientSize", z({}, _)), S(this, "borderSize", z({}, _)), S(this, "offsetSize", z({}, _)), this.ctx = r, this.root = n, i && (this.parent = i), this.name = t.name || t.type, this.attributes = this.getAttributes(t);
        var s = function(t, i) {
          var n = ["color", "fontSize", "lineHeight", "verticalAlign", "fontWeight", "textAlign"],
            r = t.css,
            o = void 0 === r ? {} : r,
            s = t.type,
            a = void 0 === s ? "view" : s,
            h = (i || {}).computedStyle,
            d = e({}, u);
          if ([L, R, T].includes(a) && !o.display && (d.display = "inline-block"), h)
            for (var c = 0; c < n.length; c++) {
              var l = n[c];
              (o[l] || h[l]) && (o[l] = o[l] || h[l])
            }
          for (var f = function(t) {
              var e, i, n, r, s = o[t];
              if (/-/.test(t) && (t = t.replace(/-([a-z])/g, (function(t, e) {
                  return e.toUpperCase()
                })), d.key = s), /^(box|text)?shadow$/i.test(t)) {
                var h = [];
                return s.replace(/((-?\d+(rpx|px|vw|vh)?\s+?){3})(.+)/, (function() {
                  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                  h = t[1].match(/-?\d+(rpx|px|vh|vw)?/g).map((function(t) {
                    return y(t)
                  })).concat(t[4])
                })), /^text/.test(t) ? d.textShadow = h : d.boxShadow = h, "continue"
              }
              if (/^border/i.test(t) && !/radius$/i.test(t)) {
                var c = t.match(/^border([BTRLa-z]+)?/)[0],
                  l = t.match(/[W|S|C][a-z]+/),
                  f = s.replace(/([\(,])\s+|\s+([\),])/g, "$1$2").split(" ").map((function(t) {
                    return /^\d/.test(t) ? y(t, "") : t
                  }));
                return d[c] || (d[c] = {}), 1 == f.length && l ? d[c][c + l[0]] = f[0] : d[c] = ((e = {})[c + "Width"] = b(f[0]) ? f[0] : 0, e[c + "Style"] = f[1] || "solid", e[c + "Color"] = f[2] || "black", e), "continue"
              }
              if (/^background(color)?$/i.test(t)) return d.backgroundColor = s, "continue";
              if (/^objectPosition$/i.test(t)) return d[t] = s.split(" "), "continue";
              if (/padding|margin|radius/i.test(t)) {
                var u = /radius$/i.test(t),
                  g = u ? "borderRadius" : t.match(/[a-z]+/)[0],
                  p = [0, 0, 0, 0].map((function(t, e) {
                    return u ? ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"][e] : [g + "Top", g + "Right", g + "Bottom", g + "Left"][e]
                  })),
                  v = "margin";
                if ("padding" === t || t === v || /^(border)?radius$/i.test(t)) {
                  f = ("" + s).split(" ").map((function(e) {
                    return /^-?\d+(rpx|px|vh|vw)?$/.test(e) ? y(e) : t != v && /auto/.test(e) ? 0 : e
                  }), []) || [0];
                  var x = u ? "borderRadius" : t,
                    m = f[0],
                    w = f[1],
                    S = f[2],
                    z = f[3];
                  d[x] = ((i = {})[p[0]] = B(m) ? 0 : m, i[p[1]] = b(w) || B(w) ? w : m, i[p[2]] = B(b(S) ? S : m) ? 0 : b(S) ? S : m, i[p[3]] = b(z) ? z : w || m, i)
                } else "object" == typeof d[g] || (d[g] = ((n = {})[p[0]] = d[g] || 0, n[p[1]] = d[g] || 0, n[p[2]] = d[g] || 0, n[p[3]] = d[g] || 0, n)), d[g][t] = g == v && B(s) || P(s) ? s : y(s);
                return "continue"
              }
              if (/^transform$/i.test(t)) return d[t] = {}, s.replace(/([a-zA-Z]+)\(([0-9,-\.%rpxdeg\s]+)\)/g, (function(e, i, n) {
                var r = n.split(",").map((function(t) {
                    return t.replace(/(^\s*)|(\s*$)/g, "")
                  })),
                  s = function(t, e) {
                    return t.includes("deg") ? 1 * t : e && !P(e) ? y(t, e) : t
                  };
                i.includes("matrix") ? d[t][i] = r.map((function(t) {
                  return 1 * t
                })) : i.includes("rotate") ? d[t][i] = 1 * n.match(/^-?\d+(\.\d+)?/)[0] : /[X, Y]/.test(i) ? d[t][i] = /[X]/.test(i) ? s(r[0], o.width) : s(r[0], o.height) : (d[t][i + "X"] = s(r[0], o.width), d[t][i + "Y"] = s(r[1] || r[0], o.height))
              })), "continue";
              if (/^font$/i.test(t) && console.warn("font 涓嶆敮鎸佺畝鍐?), /^textindent/i.test(t) && (d[t] = /^calc/.test(s) ? s : y(s)), /^textstroke/i.test(t)) {
                var M = t.match(/color|width|type$/i),
                  k = (c = "textStroke", s.split(" ").map((function(t) {
                    return /^\d+(rpx|px|vh|vw)?$/.test(t) ? y(t) : t
                  })));
                return M ? d[c] ? d[c][M[0]] = k[0] : d[c] = ((r = {})[M[0]] = k[0], r) : d[c] = {
                  width: k[0],
                  color: k[1],
                  type: k[2]
                }, "continue"
              }
              /^left|top$/i.test(t) && ![O, F].includes(o.position) ? d[t] = 0 : d[t] = /^-?[\d\.]+(px|rpx|vw|vh)?$/.test(s) ? y(s) : /em$/.test(s) && a == L ? y(s, o.fontSize) : s
            }, g = 0, p = Object.keys(o); g < p.length; g++) f(p[g]);
          return d
        }(t, i);
        this.isAbsolute = s.position == X, this.isFixed = "fixed" == s.position, this.originStyle = s, Object.keys(s).forEach((function(t) {
          Object.defineProperty(o.style, t, {
            configurable: !0,
            enumerable: !0,
            get: function() {
              return s[t]
            },
            set: function(e) {
              s[t] = e
            }
          })
        }));
        var a = {
          contentSize: z({}, this.contentSize),
          clientSize: z({}, this.clientSize),
          borderSize: z({}, this.borderSize),
          offsetSize: z({}, this.offsetSize)
        };
        Object.keys(a).forEach((function(t) {
          Object.keys(o[t]).forEach((function(e) {
            Object.defineProperty(o[t], e, {
              configurable: !0,
              enumerable: !0,
              get: function() {
                return a[t][e]
              },
              set: function(i) {
                a[t][e] = i
              }
            })
          }))
        })), this.computedStyle = this.style
      }
      var i = t.prototype;
      return i.add = function(t) {
        t.parent = this, this.children[t.id] = t
      }, i.getChildren = function() {
        var t = this;
        return Object.keys(this.children).map((function(e) {
          return t.children[e]
        }))
      }, i.prev = function(t) {
        void 0 === t && (t = this);
        var e = t.parent.getChildren();
        return e[e.findIndex((function(e) {
          return e.id == t.id
        })) - 1]
      }, i.querySelector = function(t) {
        var e = this.getChildren();
        return "string" != typeof t ? null : e.find((function(e) {
          var i = e.id,
            n = e.attributes;
          return i == t || n && n.uid == t
        })) || this.parent.querySelector && this.parent.querySelector(t) || null
      }, i.getLineRect = function(t, e) {
        var i = e ? e.lines : this.parent && this.parent.lines;
        return i && i.find((function(e) {
          return e.ids.includes(t)
        })) || {
          width: 0,
          height: 0
        }
      }, i.setPosition = function(t, e) {
        var i = {
          left: "width",
          top: "height",
          right: "width",
          bottom: "height"
        };
        Object.keys(i).forEach((function(n) {
          var r = "right" == n ? "left" : "top";
          ["right", "bottom"].includes(n) && void 0 !== t.style[n] && "number" != typeof t.originStyle[r] ? t.style[r] = e[i[n]] - t.offsetSize[i[n]] - y(t.style[n], e[i[n]]) : t.style[n] = y(t.style[n], e[i[n]])
        }))
      }, i.getAttributes = function(t) {
        var e = t.attributes,
          i = void 0 === e ? {} : e,
          n = t.uid,
          r = t.url,
          o = t.src,
          s = t.replace,
          a = t.text;
        return n && (i.uid = n), (r || o) && (i.src = i.src || r || o), s && (i.replace = s), a && (i.text = a), i
      }, i.getOffsetSize = function(t, e, i) {
        void 0 === i && (i = o[3]);
        var n = e || {},
          r = n.margin,
          s = (r = void 0 === r ? {} : r).marginLeft,
          a = void 0 === s ? 0 : s,
          h = r.marginTop,
          d = void 0 === h ? 0 : h,
          c = r.marginRight,
          l = void 0 === c ? 0 : c,
          f = r.marginBottom,
          u = void 0 === f ? 0 : f,
          g = n.padding,
          p = (g = void 0 === g ? {} : g).paddingLeft,
          v = void 0 === p ? 0 : p,
          x = g.paddingTop,
          b = void 0 === x ? 0 : x,
          y = g.paddingRight,
          m = void 0 === y ? 0 : y,
          w = g.paddingBottom,
          S = void 0 === w ? 0 : w,
          z = n.border,
          M = (z = void 0 === z ? {} : z).borderWidth,
          k = void 0 === M ? 0 : M,
          W = n.borderTop,
          I = (W = void 0 === W ? {} : W).borderTopWidth,
          B = void 0 === I ? k : I,
          P = n.borderBottom,
          R = (P = void 0 === P ? {} : P).borderBottomWidth,
          L = void 0 === R ? k : R,
          T = n.borderRight,
          O = (T = void 0 === T ? {} : T).borderRightWidth,
          F = void 0 === O ? k : O,
          A = n.borderLeft,
          C = (A = void 0 === A ? {} : A).borderLeftWidth,
          j = void 0 === C ? k : C,
          E = a < 0 && l < 0 ? Math.abs(a + l) : 0,
          H = d < 0 && u < 0 ? Math.abs(d + u) : 0,
          $ = a >= 0 && l < 0,
          Y = d >= 0 && u < 0;
        return i == o[0] && (this[i].left = t.left + a + v + j + ($ ? 2 * -l : 0), this[i].top = t.top + d + b + B + (Y ? 2 * -u : 0), this[i].width = t.width + (this[i].widthAdd ? 0 : E), this[i].height = t.height + (this[i].heightAdd ? 0 : H), this[i].widthAdd = E, this[i].heightAdd = H), i == o[1] && (this[i].left = t.left + a + j + ($ < 0 ? -l : 0), this[i].top = t.top + d + B + (Y ? -u : 0), this[i].width = t.width + v + m, this[i].height = t.height + b + S), i == o[2] && (this[i].left = t.left + a + j / 2 + ($ < 0 ? -l : 0), this[i].top = t.top + d + B / 2 + (Y ? -u : 0), this[i].width = t.width + v + m + j / 2 + F / 2, this[i].height = t.height + b + S + L / 2 + B / 2), i == o[3] && (this[i].left = t.left + ($ < 0 ? -l : 0), this[i].top = t.top + (Y ? -u : 0), this[i].width = t.width + v + m + j + F + a + l, this[i].height = t.height + b + S + L + B + u + d), this[i]
      }, i.layoutBoxUpdate = function(t, e, i, n) {
        var r = this;
        if (void 0 === i && (i = -1), "border-box" == e.boxSizing) {
          var s = e || {},
            a = s.border,
            h = (a = void 0 === a ? {} : a).borderWidth,
            d = void 0 === h ? 0 : h,
            c = s.borderTop,
            l = (c = void 0 === c ? {} : c).borderTopWidth,
            f = void 0 === l ? d : l,
            u = s.borderBottom,
            g = (u = void 0 === u ? {} : u).borderBottomWidth,
            p = void 0 === g ? d : g,
            v = s.borderRight,
            x = (v = void 0 === v ? {} : v).borderRightWidth,
            b = void 0 === x ? d : x,
            y = s.borderLeft,
            m = (y = void 0 === y ? {} : y).borderLeftWidth,
            w = void 0 === m ? d : m,
            S = s.padding,
            z = (S = void 0 === S ? {} : S).paddingTop,
            M = void 0 === z ? 0 : z,
            k = S.paddingRight,
            W = void 0 === k ? 0 : k,
            I = S.paddingBottom,
            B = void 0 === I ? 0 : I,
            P = S.paddingLeft,
            R = void 0 === P ? 0 : P;
          i || (t.width -= R + W + b + w), 1 !== i || n || (t.height -= M + B + f + p)
        }
        this.layoutBox && (o.forEach((function(i) {
          return r.layoutBox[i] = r.getOffsetSize(t, e, i)
        })), this.layoutBox = Object.assign({}, this.layoutBox, this.layoutBox.borderSize))
      }, i.getBoxPosition = function() {
        var t = this.computedStyle,
          e = this.fixedLine,
          i = this.lines,
          n = t.left,
          r = void 0 === n ? 0 : n,
          o = t.top,
          s = void 0 === o ? 0 : o,
          a = t.padding || {},
          h = a.paddingBottom,
          d = void 0 === h ? 0 : h,
          c = a.paddingRight,
          l = void 0 === c ? 0 : c,
          f = z({}, this.contentSize, {
            left: r,
            top: s
          }),
          u = this.contentSize.top - this.offsetSize.top,
          g = this.contentSize.left - this.offsetSize.left;
        if (this.root.fixedLine && !this.root.isDone) {
          this.root.isDone = !0;
          for (var p, v = W(this.root.fixedLine.elements); !(p = v()).done;) {
            var x = p.value;
            x.setPosition(x, this.root.offsetSize), x.getBoxPosition()
          }
        }
        if (e)
          for (var b, y = W(e.elements); !(b = y()).done;) {
            var m = b.value;
            m.setPosition(m, f), m.style.left += r + g + l, m.style.top += s + u + d, m.getBoxPosition()
          }
        if (i)
          for (var w, S = W(i); !(w = S()).done;) w.value.layout(f.top + u, f.left + g);
        return this.layoutBoxUpdate(f, t), this.layoutBox
      }, i.getBoxState = function(t, e) {
        return this.isBlock(t) || this.isBlock(e)
      }, i.isBlock = function(t) {
        return void 0 === t && (t = this), t && "block" == t.style.display
      }, i.isFlex = function(t) {
        return void 0 === t && (t = this), t && t.style.display == D
      }, i.isInFlow = function() {
        return !(this.isAbsolute || this.isFixed)
      }, i.inFlexBox = function(t) {
        return void 0 === t && (t = this), !!t.isInFlow() && !!t.parent && (!(!t.parent || t.parent.style.display !== D) || void 0)
      }, i.isInline = function(t) {
        return void 0 === t && (t = this), t && "inline-block" == t.style.display
      }, i.contrastSize = function(t, e, i) {
        var n = t;
        return i && (n = Math.min(n, i)), e && (n = Math.max(n, e)), n
      }, i.measureText = function(t, e) {
        var i = this.ctx.measureText(t),
          n = i.width,
          r = i.actualBoundingBoxAscent,
          o = i.actualBoundingBoxDescent;
        return {
          ascent: r,
          descent: o,
          width: n,
          fontHeight: r + o || .7 * e + 1
        }
      }, i.getBoxWidthHeight = function() {
        var t = this,
          e = this.name,
          i = this.computedStyle,
          n = this.attributes,
          r = this.parent,
          o = void 0 === r ? {} : r,
          s = this.ctx,
          a = this.getChildren(),
          h = i.left,
          d = void 0 === h ? 0 : h,
          c = i.top,
          l = void 0 === c ? 0 : c,
          f = i.bottom,
          u = i.right,
          g = i.width,
          p = void 0 === g ? 0 : g,
          v = i.minWidth,
          x = i.maxWidth,
          b = i.minHeight,
          m = i.maxHeight,
          w = i.height,
          S = void 0 === w ? 0 : w,
          z = i.fontSize,
          M = void 0 === z ? 14 : z,
          k = i.fontWeight,
          W = i.fontFamily,
          I = i.fontStyle,
          B = i.position,
          R = i.lineClamp,
          L = i.lineHeight,
          T = i.padding,
          O = void 0 === T ? {} : T,
          F = i.margin,
          A = void 0 === F ? {} : F,
          C = i.border,
          E = (C = void 0 === C ? {} : C).borderWidth,
          D = void 0 === E ? 0 : E,
          N = i.borderRight,
          _ = (N = void 0 === N ? {} : N).borderRightWidth,
          V = void 0 === _ ? D : _,
          q = i.borderLeft,
          G = (q = void 0 === q ? {} : q).borderLeftWidth,
          J = void 0 === G ? D : G,
          Q = o.contentSize && o.contentSize.width,
          Z = o.contentSize && o.contentSize.height;
        if (P(p) && Q && (p = y(p, Q)), P(p) && !Q && (p = null), P(S) && Z && (S = y(S, Z)), P(S) && !Z && (S = null), P(v) && Q && (v = y(v, Q)), P(x) && Q && (x = y(x, Q)), P(b) && Z && (b = y(b, Z)), P(m) && Z && (m = y(m, Z)), i.padding && Q)
          for (var K in i.padding) Object.hasOwnProperty.call(i.padding, K) && (i.padding[K] = y(i.padding[K], Q));
        var tt = O.paddingRight,
          et = void 0 === tt ? 0 : tt,
          it = O.paddingLeft,
          nt = void 0 === it ? 0 : it;
        if (i.margin && [i.margin.marginLeft, i.margin.marginRight].includes("auto"))
          if (p) {
            var rt = Q && Q - p - et - nt - J - V || 0;
            i.margin.marginLeft == i.margin.marginRight ? i.margin.marginLeft = i.margin.marginRight = rt / 2 : "auto" == i.margin.marginLeft ? i.margin.marginLeft = rt : i.margin.marginRight = rt
          } else i.margin.marginLeft = i.margin.marginRight = 0;
        var ot = A.marginRight,
          st = void 0 === ot ? 0 : ot,
          at = A.marginLeft,
          ht = {
            width: p,
            height: S,
            left: 0,
            top: 0
          },
          dt = nt + et + J + V + (void 0 === at ? 0 : at) + st;
        if (this.offsetWidth = dt, e == Y && !this.attributes.widths) {
          var ct = n.text || "";
          s.save(), s.setFonts({
            fontFamily: W,
            fontSize: M,
            fontWeight: k,
            fontStyle: I
          });
          var lt = new Map;
          ct.split("\n").map((function(e) {
            var i = e.split("").map((function(e) {
                var i = /^[\u4e00-\u9fa5]+$/.test(e) ? "cn" : e,
                  n = lt.get(i);
                if (n) return {
                  width: n,
                  text: e
                };
                var r = t.measureText(e, M).width;
                return lt.set(i, r), {
                  width: r,
                  text: e
                }
              })),
              n = t.measureText(e, M),
              r = n.fontHeight,
              o = n.ascent,
              s = n.descent;
            t.attributes.fontHeight = r, t.attributes.ascent = o, t.attributes.descent = s, t.attributes.widths || (t.attributes.widths = []), t.attributes.widths.push({
              widths: i,
              total: i.reduce((function(t, e) {
                return t + e.width
              }), 0)
            })
          })), s.restore()
        }
        if (e == $ && null == p) {
          var ft = n.width,
            ut = n.height;
          ht.width = this.contrastSize(Math.round(ft * S / ut) || 0, v, x), this.layoutBoxUpdate(ht, i, 0)
        }
        if (e == Y && null == p) {
          var gt = this.attributes.widths,
            pt = Math.max.apply(Math, gt.map((function(t) {
              return t.total
            })));
          o && Q > 0 && (pt > Q || this.isBlock(this)) && !this.isAbsolute && !this.isFixed && (pt = Q), ht.width = this.contrastSize(pt, v, x), this.layoutBoxUpdate(ht, i, 0)
        }
        if (e == Y && (o.style.flex || !this.attributes.lines)) {
          var vt = this.attributes.widths.length;
          this.attributes.widths.forEach((function(t) {
            return t.widths.reduce((function(t, e, i) {
              return t + e.width > ht.width ? (vt++, e.width) : t + e.width
            }), 0)
          })), vt = R && vt > R ? R : vt, this.attributes.lines = vt
        }
        if (e == $ && null == S) {
          var xt = n.width,
            bt = n.height;
          ht.height = this.contrastSize(y(ht.width * bt / xt) || 0, b, m), this.layoutBoxUpdate(ht, i, 1)
        }
        e == Y && null == S && (L = y(L, M), ht.height = this.contrastSize(y(this.attributes.lines * L), b, m), this.layoutBoxUpdate(ht, i, 1, !0)), !p && o && o.children && Q && (!this.isFlex(o) || o.isFlexCalc) && ([U, Y].includes(e) && this.isFlex() || e == U && this.isBlock(this) && this.isInFlow()) && (ht.width = this.contrastSize(Q - (o.isFlexCalc ? 0 : dt), v, x), this.layoutBoxUpdate(ht, i)), p && !P(p) && (ht.width = this.contrastSize(p, v, x), this.layoutBoxUpdate(ht, i, 0)), S && !P(S) && (ht.height = this.contrastSize(ht.height, b, m), this.layoutBoxUpdate(ht, i, 1));
        var yt = 0;
        if (a.length) {
          var mt = null;
          a.forEach((function(e, n) {
            e.getBoxWidthHeight();
            var r = a[n + 1];
            if (r && r.isInFlow() && (e.next = r), e.isInFlow() && !e.inFlexBox()) {
              var o = t.getBoxState(mt, e);
              t.line && t.line.canIEnter(e) && !o ? t.line.add(e) : (new j).bind(e), mt = e
            } else e.inFlexBox() ? t.line && (t.line.canIEnter(e) || "nowrap" == i.flexWrap) ? t.line.add(e) : (new H).bind(e) : e.isFixed ? t.root.fixedLine ? t.root.fixedLine.fixedAdd(e) : (new j).fixedBind(e) : t.fixedLine ? t.fixedLine.fixedAdd(e) : (new j).fixedBind(e, 1)
          })), this.lines && (yt = this.lines.reduce((function(t, e) {
            return t + e.height
          }), 0))
        }
        var wt = 0,
          St = 0;
        if (!p && (this.isAbsolute || this.isFixed) && Q) {
          var zt = B == X ? Q : this.root.width,
            Mt = zt - (P(d) ? y(d, zt) : d) - (P(u) ? y(u, zt) : u);
          wt = i.left ? Mt : this.lineMaxWidth
        }
        if (!S && (null != l ? l : this.isAbsolute || this.isFixed && Z)) {
          var kt = B == X ? Z : this.root.height,
            Wt = kt - (P(l) ? y(l, kt) : l) - (P(f) ? y(f, kt) : f);
          St = i.top ? Wt : 0
        }
        if (p && !P(p) || ht.width || (ht.width = wt || this.contrastSize((this.isBlock(this) && !this.isInFlow() ? Q || o.lineMaxWidth : this.lineMaxWidth) || this.lineMaxWidth, v, x), this.layoutBoxUpdate(ht, i, 0)), S || !yt && !St || (ht.height = St || this.contrastSize(yt, b, m), this.layoutBoxUpdate(ht, i)), i.borderRadius && this.borderSize && this.borderSize.width)
          for (var It in i.borderRadius) Object.hasOwnProperty.call(i.borderRadius, It) && (i.borderRadius[It] = y(i.borderRadius[It], this.borderSize.width));
        return this.layoutBox
      }, i.layout = function() {
        return this.getBoxWidthHeight(), this.root.offsetSize = this.offsetSize, this.getBoxPosition(), this.offsetSize
      }, t
    }(),
    q = function() {
      var t, e, i, n, r, o, s = [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28],
        a = [3220, 1468, 2713, 1235, 3062, 1890, 2119, 1549, 2344, 2936, 1117, 2583, 1330, 2470, 1667, 2249, 2028, 3780, 481, 4011, 142, 3098, 831, 3445, 592, 2517, 1776, 2234, 1951, 2827, 1070, 2660, 1345, 3177],
        h = [30660, 29427, 32170, 30877, 26159, 25368, 27713, 26998, 21522, 20773, 24188, 23371, 17913, 16590, 20375, 19104, 13663, 12392, 16177, 14854, 9396, 8579, 11994, 11245, 5769, 5054, 7399, 6608, 1890, 597, 3340, 2107],
        d = [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30],
        c = [255, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175],
        l = [1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 0],
        f = [],
        u = [],
        g = [],
        p = [],
        v = [],
        x = 2;

      function b(t, e) {
        var i;
        t > e && (i = t, t = e, e = i), i = e, i *= e, i += e, i >>= 1, p[i += t] = 1
      }

      function y(t, i) {
        var n;
        for (g[t + e * i] = 1, n = -2; n < 2; n++) g[t + n + e * (i - 2)] = 1, g[t - 2 + e * (i + n + 1)] = 1, g[t + 2 + e * (i + n)] = 1, g[t + n + 1 + e * (i + 2)] = 1;
        for (n = 0; n < 2; n++) b(t - 1, i + n), b(t + 1, i - n), b(t - n, i - 1), b(t + n, i + 1)
      }

      function m(t) {
        for (; t >= 255;) t = ((t -= 255) >> 8) + (255 & t);
        return t
      }
      var w = [];

      function S(t, e, i, n) {
        var r, o, s;
        for (r = 0; r < n; r++) f[i + r] = 0;
        for (r = 0; r < e; r++) {
          if (255 != (s = c[f[t + r] ^ f[i]]))
            for (o = 1; o < n; o++) f[i + o - 1] = f[i + o] ^ l[m(s + w[n - o])];
          else
            for (o = i; o < i + n; o++) f[o] = f[o + 1];
          f[i + n - 1] = 255 == s ? 0 : l[m(s + w[0])]
        }
      }

      function z(t, e) {
        var i;
        return t > e && (i = t, t = e, e = i), i = e, i += e * e, i >>= 1, p[i += t]
      }

      function M(t) {
        var i, n, r, o;
        switch (t) {
          case 0:
            for (n = 0; n < e; n++)
              for (i = 0; i < e; i++) i + n & 1 || z(i, n) || (g[i + n * e] ^= 1);
            break;
          case 1:
            for (n = 0; n < e; n++)
              for (i = 0; i < e; i++) 1 & n || z(i, n) || (g[i + n * e] ^= 1);
            break;
          case 2:
            for (n = 0; n < e; n++)
              for (r = 0, i = 0; i < e; i++, r++) 3 == r && (r = 0), r || z(i, n) || (g[i + n * e] ^= 1);
            break;
          case 3:
            for (o = 0, n = 0; n < e; n++, o++)
              for (3 == o && (o = 0), r = o, i = 0; i < e; i++, r++) 3 == r && (r = 0), r || z(i, n) || (g[i + n * e] ^= 1);
            break;
          case 4:
            for (n = 0; n < e; n++)
              for (r = 0, o = n >> 1 & 1, i = 0; i < e; i++, r++) 3 == r && (r = 0, o = !o), o || z(i, n) || (g[i + n * e] ^= 1);
            break;
          case 5:
            for (o = 0, n = 0; n < e; n++, o++)
              for (3 == o && (o = 0), r = 0, i = 0; i < e; i++, r++) 3 == r && (r = 0), (i & n & 1) + !(!r | !o) || z(i, n) || (g[i + n * e] ^= 1);
            break;
          case 6:
            for (o = 0, n = 0; n < e; n++, o++)
              for (3 == o && (o = 0), r = 0, i = 0; i < e; i++, r++) 3 == r && (r = 0), (i & n & 1) + (r && r == o) & 1 || z(i, n) || (g[i + n * e] ^= 1);
            break;
          case 7:
            for (o = 0, n = 0; n < e; n++, o++)
              for (3 == o && (o = 0), r = 0, i = 0; i < e; i++, r++) 3 == r && (r = 0), (r && r == o) + (i + n & 1) & 1 || z(i, n) || (g[i + n * e] ^= 1)
        }
      }

      function k(t) {
        var e, i = 0;
        for (e = 0; e <= t; e++) v[e] >= 5 && (i += 3 + v[e] - 5);
        for (e = 3; e < t - 1; e += 2) v[e - 2] == v[e + 2] && v[e + 2] == v[e - 1] && v[e - 1] == v[e + 1] && 3 * v[e - 1] == v[e] && (0 == v[e - 3] || e + 3 > t || 3 * v[e - 3] >= 4 * v[e] || 3 * v[e + 3] >= 4 * v[e]) && (i += 40);
        return i
      }

      function W() {
        var t, i, n, r, o, s = 0,
          a = 0;
        for (i = 0; i < e - 1; i++)
          for (t = 0; t < e - 1; t++)(g[t + e * i] && g[t + 1 + e * i] && g[t + e * (i + 1)] && g[t + 1 + e * (i + 1)] || !(g[t + e * i] || g[t + 1 + e * i] || g[t + e * (i + 1)] || g[t + 1 + e * (i + 1)])) && (s += 3);
        for (i = 0; i < e; i++) {
          for (v[0] = 0, n = r = t = 0; t < e; t++)(o = g[t + e * i]) == r ? v[n]++ : v[++n] = 1, a += (r = o) ? 1 : -1;
          s += k(n)
        }
        a < 0 && (a = -a);
        var h = a,
          d = 0;
        for (h += h << 2, h <<= 1; h > e * e;) h -= e * e, d++;
        for (s += 10 * d, t = 0; t < e; t++) {
          for (v[0] = 0, n = r = i = 0; i < e; i++)(o = g[t + e * i]) == r ? v[n]++ : v[++n] = 1, r = o;
          s += k(n)
        }
        return s
      }
      var I = null;
      return {
        api: {
          get ecclevel() {
            return x
          },
          set ecclevel(t) {
            x = t
          },
          get size() {
            return _size
          },
          set size(t) {
            _size = t
          },
          get canvas() {
            return I
          },
          set canvas(t) {
            I = t
          },
          getFrame: function(v) {
            return function(v) {
              var k, I, B, P, R, L, T, O;
              P = v.length, t = 0;
              do {
                if (t++, B = 4 * (x - 1) + 16 * (t - 1), i = d[B++], n = d[B++], r = d[B++], o = d[B], P <= (B = r * (i + n) + n - 3 + (t <= 9))) break
              } while (t < 40);
              for (e = 17 + 4 * t, R = r + (r + o) * (i + n) + n, P = 0; P < R; P++) u[P] = 0;
              for (f = v.slice(0), P = 0; P < e * e; P++) g[P] = 0;
              for (P = 0; P < (e * (e + 1) + 1) / 2; P++) p[P] = 0;
              for (P = 0; P < 3; P++) {
                for (B = 0, I = 0, 1 == P && (B = e - 7), 2 == P && (I = e - 7), g[I + 3 + e * (B + 3)] = 1, k = 0; k < 6; k++) g[I + k + e * B] = 1, g[I + e * (B + k + 1)] = 1, g[I + 6 + e * (B + k)] = 1, g[I + k + 1 + e * (B + 6)] = 1;
                for (k = 1; k < 5; k++) b(I + k, B + 1), b(I + 1, B + k + 1), b(I + 5, B + k), b(I + k + 1, B + 5);
                for (k = 2; k < 4; k++) g[I + k + e * (B + 2)] = 1, g[I + 2 + e * (B + k + 1)] = 1, g[I + 4 + e * (B + k)] = 1, g[I + k + 1 + e * (B + 4)] = 1
              }
              if (t > 1)
                for (P = s[t], I = e - 7;;) {
                  for (k = e - 7; k > P - 3 && (y(k, I), !(k < P));) k -= P;
                  if (I <= P + 9) break;
                  y(6, I -= P), y(I, 6)
                }
              for (g[8 + e * (e - 8)] = 1, I = 0; I < 7; I++) b(7, I), b(e - 8, I), b(7, I + e - 7);
              for (k = 0; k < 8; k++) b(k, 7), b(k + e - 8, 7), b(k, e - 8);
              for (k = 0; k < 9; k++) b(k, 8);
              for (k = 0; k < 8; k++) b(k + e - 8, 8), b(8, k);
              for (I = 0; I < 7; I++) b(8, I + e - 7);
              for (k = 0; k < e - 14; k++) 1 & k ? (b(8 + k, 6), b(6, 8 + k)) : (g[8 + k + 6 * e] = 1, g[6 + e * (8 + k)] = 1);
              if (t > 6)
                for (P = a[t - 7], B = 17, k = 0; k < 6; k++)
                  for (I = 0; I < 3; I++, B--) 1 & (B > 11 ? t >> B - 12 : P >> B) ? (g[5 - k + e * (2 - I + e - 11)] = 1, g[2 - I + e - 11 + e * (5 - k)] = 1) : (b(5 - k, 2 - I + e - 11), b(2 - I + e - 11, 5 - k));
              for (I = 0; I < e; I++)
                for (k = 0; k <= I; k++) g[k + e * I] && b(k, I);
              for (R = f.length, L = 0; L < R; L++) u[L] = f.charCodeAt(L);
              if (f = u.slice(0), R >= (k = r * (i + n) + n) - 2 && (R = k - 2, t > 9 && R--), L = R, t > 9) {
                for (f[L + 2] = 0, f[L + 3] = 0; L--;) P = f[L], f[L + 3] |= 255 & P << 4, f[L + 2] = P >> 4;
                f[2] |= 255 & R << 4, f[1] = R >> 4, f[0] = 64 | R >> 12
              } else {
                for (f[L + 1] = 0, f[L + 2] = 0; L--;) P = f[L], f[L + 2] |= 255 & P << 4, f[L + 1] = P >> 4;
                f[1] |= 255 & R << 4, f[0] = 64 | R >> 4
              }
              for (L = R + 3 - (t < 10); L < k;) f[L++] = 236, f[L++] = 17;
              for (w[0] = 1, L = 0; L < o; L++) {
                for (w[L + 1] = 1, T = L; T > 0; T--) w[T] = w[T] ? w[T - 1] ^ l[m(c[w[T]] + L)] : w[T - 1];
                w[0] = l[m(c[w[0]] + L)]
              }
              for (L = 0; L <= o; L++) w[L] = c[w[L]];
              for (B = k, I = 0, L = 0; L < i; L++) S(I, r, B, o), I += r, B += o;
              for (L = 0; L < n; L++) S(I, r + 1, B, o), I += r + 1, B += o;
              for (I = 0, L = 0; L < r; L++) {
                for (T = 0; T < i; T++) u[I++] = f[L + T * r];
                for (T = 0; T < n; T++) u[I++] = f[i * r + L + T * (r + 1)]
              }
              for (T = 0; T < n; T++) u[I++] = f[i * r + L + T * (r + 1)];
              for (L = 0; L < o; L++)
                for (T = 0; T < i + n; T++) u[I++] = f[k + L + T * o];
              for (f = u, k = I = e - 1, B = R = 1, O = (r + o) * (i + n) + n, L = 0; L < O; L++)
                for (P = f[L], T = 0; T < 8; T++, P <<= 1) {
                  128 & P && (g[k + e * I] = 1);
                  do {
                    R ? k-- : (k++, B ? 0 != I ? I-- : (B = !B, 6 == (k -= 2) && (k--, I = 9)) : I != e - 1 ? I++ : (B = !B, 6 == (k -= 2) && (k--, I -= 8))), R = !R
                  } while (z(k, I))
                }
              for (f = g.slice(0), P = 0, I = 3e4, B = 0; B < 8 && (M(B), (k = W()) < I && (I = k, P = B), 7 != P); B++) g = f.slice(0);
              for (P != B && M(P), I = h[P + (x - 1 << 3)], B = 0; B < 8; B++, I >>= 1) 1 & I && (g[e - 1 - B + 8 * e] = 1, B < 6 ? g[8 + e * B] = 1 : g[8 + e * (B + 1)] = 1);
              for (B = 0; B < 7; B++, I >>= 1) 1 & I && (g[8 + e * (e - 7 + B)] = 1, B ? g[6 - B + 8 * e] = 1 : g[7 + 8 * e] = 1);
              return g
            }(v)
          },
          utf16to8: function(t) {
            var e, i, n, r;
            for (e = "", n = t.length, i = 0; i < n; i++)(r = t.charCodeAt(i)) >= 1 && r <= 127 ? e += t.charAt(i) : r > 2047 ? (e += String.fromCharCode(224 | r >> 12 & 15), e += String.fromCharCode(128 | r >> 6 & 63), e += String.fromCharCode(128 | 63 & r)) : (e += String.fromCharCode(192 | r >> 6 & 31), e += String.fromCharCode(128 | 63 & r));
            return e
          },
          draw: function(t, i, n, r, o) {
            i.drawView(n, r);
            var s = i.ctx,
              a = n.contentSize,
              h = a.width,
              d = a.height,
              c = a.left,
              l = a.top;
            r.borderRadius, r.backgroundColor;
            var f = r.color,
              u = void 0 === f ? "#000000" : f;
            if (r.border, n.contentSize.left, n.borderSize.left, n.contentSize.top, n.borderSize.top, x = o || x, s) {
              s.save(), i.setOpacity(r), i.setTransform(n, r);
              var g = Math.min(h, d);
              t = this.utf16to8(t);
              var p = this.getFrame(t),
                v = g / e;
              s.setFillStyle(u);
              for (var b = 0; b < e; b++)
                for (var y = 0; y < e; y++) p[y * e + b] && s.fillRect(c + v * b, l + v * y, v, v);
              s.restore(), i.setBorder(n, r)
            } else console.warn("No canvas provided to draw QR code in!")
          }
        }
      }
    }(),
    G = a,
    J = d,
    Q = s,
    Z = "middle",
    K = function() {
      function t(t) {
        var e, i = this;
        this.v = "1.9.5.1", this.id = null, this.pixelRatio = 1, this.width = 0, this.height = 0, this.sleep = 1e3 / 30, this.count = 0, this.isRate = !1, this.isDraw = !0, this.isCache = !0, this.fixed = "", this.useCORS = !1, this.performance = !1, this.imageBus = [], this.createImage = function(t, e) {
          return new Promise((function(n, r) {
            var o = null;
            window || i.canvas.createImage ? (o = i.canvas && i.canvas.createImage ? i.canvas.createImage() : new Image, e && o.setAttribute("crossOrigin", "Anonymous"), o.src = t, o.onload = function() {
              n({
                width: o.naturalWidth || o.width,
                height: o.naturalHeight || o.height,
                path: o,
                src: this.src
              })
            }, o.onerror = function(t) {
              r(t)
            }) : r({
              fail: "getImageInfo fail",
              src: t
            })
          }))
        }, this.options = t, Object.assign(this, t), this.ctx = ((e = t.context).setFonts = function(t) {
          var i = t.fontFamily,
            n = void 0 === i ? "sans-serif" : i,
            o = t.fontSize,
            s = void 0 === o ? 14 : o,
            a = t.fontWeight,
            h = void 0 === a ? "normal" : a,
            d = t.fontStyle,
            c = void 0 === d ? "normal" : d;
          p == r.MP_TOUTIAO && (h = "bold" == h ? "bold" : "", c = "italic" == c ? "italic" : ""), e.font = c + " " + h + " " + Math.round(s) + "px " + n
        }, e.draw && e.setFillStyle ? e : Object.assign(e, {
          setStrokeStyle: function(t) {
            e.strokeStyle = t
          },
          setLineWidth: function(t) {
            e.lineWidth = t
          },
          setLineCap: function(t) {
            e.lineCap = t
          },
          setFillStyle: function(t) {
            e.fillStyle = t
          },
          setFontSize: function(t) {
            e.font = String(t) + "px sans-serif"
          },
          setGlobalAlpha: function(t) {
            e.globalAlpha = t
          },
          setLineJoin: function(t) {
            e.lineJoin = t
          },
          setTextAlign: function(t) {
            e.textAlign = t
          },
          setMiterLimit: function(t) {
            e.miterLimit = t
          },
          setShadow: function(t, i, n, r) {
            e.shadowOffsetX = t, e.shadowOffsetY = i, e.shadowBlur = n, e.shadowColor = r
          },
          setTextBaseline: function(t) {
            e.textBaseline = t
          },
          createCircularGradient: function() {},
          draw: function() {}
        })), this.progress = 0, this.root = {
          width: t.width,
          height: t.height,
          fontSizeRate: 1,
          fixedLine: null
        }, this.size = this.root;
        var n = 0;
        Object.defineProperty(this, "progress", {
          configurable: !0,
          set: function(t) {
            n = t, i.lifecycle("onProgress", t / i.count)
          },
          get: function() {
            return n || 0
          }
        })
      }
      return t.prototype.lifecycle = function(t, e) {
        this.options.listen && this.options.listen[t] && this.options.listen[t](e)
      }, t.prototype.setContext = function(t) {
        t && (this.ctx = t)
      }, t.prototype.init = function() {
        if (this.canvas.height || r.WEB == p) {
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);
          var t = this.size.height * this.pixelRatio,
            e = this.size.width * this.pixelRatio;
          this.canvas.height = t, this.canvas.width = e, this.ctx.scale(this.pixelRatio, this.pixelRatio)
        }
      }, t.prototype.clear = function() {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height)
      }, t.prototype.clipPath = function(t, e, i, n, r, o, s) {
        void 0 === o && (o = !1), void 0 === s && (s = !1);
        var a = this.ctx;
        if (/polygon/.test(r)) {
          var h = r.match(/-?\d+(rpx|px|%)?\s+-?\d+(rpx|px|%)?/g) || [];
          a.beginPath(), h.map((function(r) {
            var o = r.split(" "),
              s = o[0],
              a = o[1];
            return [y(s, i) + t, y(a, n) + e]
          })).forEach((function(t, e) {
            0 == e ? a.moveTo(t[0], t[1]) : a.lineTo(t[0], t[1])
          })), a.closePath(), s && a.stroke(), o && a.fill()
        }
      }, t.prototype.roundRect = function(t, e, i, n, r, o, s) {
        if (void 0 === o && (o = !1), void 0 === s && (s = !1), !(r < 0)) {
          var a = this.ctx;
          if (a.beginPath(), r) {
            var h = r || {},
              d = h.borderTopLeftRadius,
              c = void 0 === d ? r || 0 : d,
              l = h.borderTopRightRadius,
              f = void 0 === l ? r || 0 : l,
              u = h.borderBottomRightRadius,
              g = void 0 === u ? r || 0 : u,
              p = h.borderBottomLeftRadius,
              v = void 0 === p ? r || 0 : p;
            a.arc(t + i - g, e + n - g, g, 0, .5 * Math.PI), a.lineTo(t + v, e + n), a.arc(t + v, e + n - v, v, .5 * Math.PI, Math.PI), a.lineTo(t, e + c), a.arc(t + c, e + c, c, Math.PI, 1.5 * Math.PI), a.lineTo(t + i - f, e), a.arc(t + i - f, e + f, f, 1.5 * Math.PI, 2 * Math.PI), a.lineTo(t + i, e + n - g)
          } else a.rect(t, e, i, n);
          a.closePath(), s && a.stroke(), o && a.fill()
        }
      }, t.prototype.setTransform = function(t, e) {
        var i = e.transform,
          n = e.transformOrigin,
          r = this.ctx,
          o = i || {},
          s = o.scaleX,
          a = void 0 === s ? 1 : s,
          h = o.scaleY,
          d = void 0 === h ? 1 : h,
          c = o.translateX,
          l = void 0 === c ? 0 : c,
          f = o.translateY,
          u = void 0 === f ? 0 : f,
          g = o.rotate,
          p = void 0 === g ? 0 : g,
          v = o.skewX,
          x = void 0 === v ? 0 : v,
          m = o.skewY,
          w = void 0 === m ? 0 : m,
          S = t.left,
          z = t.top,
          M = t.width,
          k = t.height;
        l = y(l, M) || 0, u = y(u, k) || 0;
        var W = {
            top: y("0%", 1),
            center: y("50%", 1),
            bottom: y("100%", 1)
          },
          I = {
            left: y("0%", 1),
            center: y("50%", 1),
            right: y("100%", 1)
          };
        if (n = n.split(" ").filter((function(t, e) {
            return e < 2
          })).reduce((function(t, e) {
            if (/\d+/.test(e)) {
              var i = y(e, 1) / (/px|rpx$/.test(e) ? b(t.x) ? k : M : 1);
              return b(t.x) ? Object.assign(t, {
                y: i
              }) : Object.assign(t, {
                x: i
              })
            }
            return b(I[e]) && !b(t.x) ? Object.assign(t, {
              x: I[e]
            }) : Object.assign(t, {
              y: W[e] || .5
            })
          }), {}), (l || u) && r.translate(l, u), (a || d) && r.scale(a, d), p) {
          var B = S + M * n.x,
            P = z + k * n.y;
          r.translate(B, P), r.rotate(p * Math.PI / 180), r.translate(-B, -P)
        }(x || w) && r.transform(1, Math.tan(w * Math.PI / 180), Math.tan(x * Math.PI / 180), 1, 0, 0)
      }, t.prototype.setBackground = function(t, e, i, n, o) {
        var s = this.ctx;
        t && "transparent" != t ? function(t) {
          return !(!t || !t.startsWith("linear") && !t.startsWith("radial"))
        }(t) ? function(t, e, i, n, r, o) {
          t.startsWith("linear") ? function(t, e, i, n, r, o) {
            for (var s = function(t, e, i, n, r) {
                void 0 === n && (n = 0), void 0 === r && (r = 0);
                var o = t.match(/([-]?\d{1,3})deg/),
                  s = o && o[1] ? parseFloat(o[1]) : 0;
                if (s >= 360 && (s -= 360), s < 0 && (s += 360), 0 === (s = Math.round(s))) return {
                  x0: Math.round(e / 2) + n,
                  y0: i + r,
                  x1: Math.round(e / 2) + n,
                  y1: r
                };
                if (180 === s) return {
                  x0: Math.round(e / 2) + n,
                  y0: r,
                  x1: Math.round(e / 2) + n,
                  y1: i + r
                };
                if (90 === s) return {
                  x0: n,
                  y0: Math.round(i / 2) + r,
                  x1: e + n,
                  y1: Math.round(i / 2) + r
                };
                if (270 === s) return {
                  x0: e + n,
                  y0: Math.round(i / 2) + r,
                  x1: n,
                  y1: Math.round(i / 2) + r
                };
                var a = Math.round(180 * Math.asin(e / Math.sqrt(Math.pow(e, 2) + Math.pow(i, 2))) / Math.PI);
                if (s === a) return {
                  x0: n,
                  y0: i + r,
                  x1: e + n,
                  y1: r
                };
                if (s === 180 - a) return {
                  x0: n,
                  y0: r,
                  x1: e + n,
                  y1: i + r
                };
                if (s === 180 + a) return {
                  x0: e + n,
                  y0: r,
                  x1: n,
                  y1: i + r
                };
                if (s === 360 - a) return {
                  x0: e + n,
                  y0: i + r,
                  x1: n,
                  y1: r
                };
                var h, d = 0,
                  c = 0,
                  l = 0,
                  f = 0;
                if (s < a || s > 180 - a && s < 180 || s > 180 && s < 180 + a || s > 360 - a) {
                  var u = s * Math.PI / 180,
                    g = s < a || s > 360 - a ? i / 2 : -i / 2,
                    p = Math.tan(u) * g,
                    v = s < a || s > 180 - a && s < 180 ? e / 2 - p : -e / 2 - p;
                  d = -(l = p + (h = Math.pow(Math.sin(u), 2) * v)), c = -(f = g + h / Math.tan(u))
                }
                return (s > a && s < 90 || s > 90 && s < 90 + a || s > 180 + a && s < 270 || s > 270 && s < 360 - a) && (u = (90 - s) * Math.PI / 180, p = s > a && s < 90 || s > 90 && s < 90 + a ? e / 2 : -e / 2, g = Math.tan(u) * p, v = s > a && s < 90 || s > 270 && s < 360 - a ? i / 2 - g : -i / 2 - g, d = -(l = p + (h = Math.pow(Math.sin(u), 2) * v) / Math.tan(u)), c = -(f = g + h)), {
                  x0: d = Math.round(d + e / 2) + n,
                  y0: c = Math.round(i / 2 - c) + r,
                  x1: l = Math.round(l + e / 2) + n,
                  y1: f = Math.round(i / 2 - f) + r
                }
              }(r, t, e, i, n), a = s.x0, h = s.y0, d = s.x1, c = s.y1, l = o.createLinearGradient(a, h, d, c), f = r.match(/linear-gradient\((.+)\)/)[1], u = w(f.substring(f.indexOf(",") + 1)), g = 0; g < u.colors.length; g++) l.addColorStop(u.percents[g], u.colors[g]);
            o.setFillStyle(l)
          }(e, i, n, r, t, o) : t.startsWith("radial") && function(t, e, i, n, r, o) {
            for (var s = w(r.match(/radial-gradient\((.+)\)/)[1]), a = Math.round(t / 2) + i, h = Math.round(e / 2) + n, d = o.createRadialGradient(a, h, 0, a, h, Math.max(t, e) / 2), c = 0; c < s.colors.length; c++) d.addColorStop(s.percents[c], s.colors[c]);
            o.setFillStyle(d)
          }(e, i, n, r, t, o)
        }(t, e, i, n, o, s) : s.setFillStyle(t) : [r.MP_TOUTIAO, r.MP_BAIDU].includes(p) ? s.setFillStyle("rgba(0,0,0,0)") : s.setFillStyle("transparent")
      }, t.prototype.setShadow = function(t) {
        var e = t.boxShadow,
          i = void 0 === e ? [] : e,
          n = this.ctx;
        if (i.length) {
          var r = i[0],
            o = i[1],
            s = i[2],
            a = i[3];
          n.setShadow(r, o, s, a)
        }
      }, t.prototype.setBorder = function(t, e) {
        var i = this.ctx,
          n = t.width,
          r = t.height,
          o = t.left,
          s = t.top,
          a = e.border,
          h = e.borderBottom,
          d = e.borderTop,
          c = e.borderRight,
          l = e.borderLeft,
          f = e.borderRadius,
          u = e.lineCap,
          g = a || {},
          v = g.borderWidth,
          x = void 0 === v ? 0 : v,
          b = g.borderStyle,
          y = g.borderColor,
          m = h || {},
          w = m.borderBottomWidth,
          S = void 0 === w ? x : w,
          z = m.borderBottomStyle,
          M = void 0 === z ? b : z,
          k = m.borderBottomColor,
          W = void 0 === k ? y : k,
          I = d || {},
          B = I.borderTopWidth,
          P = void 0 === B ? x : B,
          R = I.borderTopStyle,
          L = void 0 === R ? b : R,
          T = I.borderTopColor,
          O = void 0 === T ? y : T,
          F = c || {},
          A = F.borderRightWidth,
          C = void 0 === A ? x : A,
          j = F.borderRightStyle,
          E = void 0 === j ? b : j,
          H = F.borderRightColor,
          $ = void 0 === H ? y : H,
          Y = l || {},
          U = Y.borderLeftWidth,
          D = void 0 === U ? x : U,
          X = Y.borderLeftStyle,
          N = void 0 === X ? b : X,
          _ = Y.borderLeftColor,
          V = void 0 === _ ? y : _,
          q = f || {},
          G = q.borderTopLeftRadius,
          J = void 0 === G ? f || 0 : G,
          Q = q.borderTopRightRadius,
          Z = void 0 === Q ? f || 0 : Q,
          K = q.borderBottomRightRadius,
          tt = void 0 === K ? f || 0 : K,
          et = q.borderBottomLeftRadius,
          it = void 0 === et ? f || 0 : et;
        if (h || l || d || c || a) {
          var nt = function(t, e, n) {
              "dashed" == e ? /mp/.test(p) ? i.setLineDash([Math.ceil(4 * t / 3), Math.ceil(4 * t / 3)]) : i.setLineDash([Math.ceil(6 * t), Math.ceil(6 * t)]) : "dotted" == e && i.setLineDash([t, t]), i.setStrokeStyle(n)
            },
            rt = function(t, e, n, r, o, s, a, h, d, c, l, f, g, p, v) {
              i.save(), i.setLineCap(v ? "square" : u), i.setLineWidth(f), nt(f, g, p), i.beginPath(), i.arc(t, e, a, Math.PI * d, Math.PI * c), i.lineTo(n, r), i.arc(o, s, h, Math.PI * c, Math.PI * l), i.stroke(), i.restore()
            };
          if (i.save(), a && !h && !l && !d && !c) return i.setLineWidth(x), nt(x, b, y), this.roundRect(o, s, n, r, f, !1, !!y), void i.restore();
          S && rt(o + n - tt, s + r - tt, o + it, s + r, o + it, s + r - it, tt, it, .25, .5, .75, S, M, W, D && C), D && rt(o + it, s + r - it, o, s + J, o + J, s + J, it, J, .75, 1, 1.25, D, N, V, P && S), P && rt(o + J, s + J, o + n - Z, s, o + n - Z, s + Z, J, Z, 1.25, 1.5, 1.75, P, L, O, D && C), C && rt(o + n - Z, s + Z, o + n, s + r - tt, o + n - tt, s + r - tt, Z, tt, 1.75, 2, .25, C, E, $, P && S)
        }
      }, t.prototype.setOpacity = function(t) {
        var e = t.opacity,
          i = void 0 === e ? 1 : e;
        this.ctx.setGlobalAlpha(i)
      }, t.prototype.drawPattern = function(t, e, r) {
        return i(this, 0, void 0, (function() {
          var i = this;
          return n(this, (function(n) {
            return [2, new Promise((function(n, o) {
              i.drawView(e, r, !0, !1, !0);
              var s = i,
                a = s.ctx;
              s.canvas;
              var h, d, c = e.width,
                l = e.height,
                f = e.left,
                u = e.top,
                g = r || {},
                p = g.borderRadius,
                v = void 0 === p ? 0 : p,
                x = g.backgroundImage,
                b = g.backgroundRepeat,
                y = void 0 === b ? "repeat" : b;
              x && (h = t, d = a.createPattern(h.src, y), a.setFillStyle(d), i.roundRect(f, u, c, l, v, !0, !1), i.setBorder(e, r), n())
            }))]
          }))
        }))
      }, t.prototype.drawView = function(t, e, i, n, r) {
        void 0 === i && (i = !0), void 0 === n && (n = !0), void 0 === r && (r = !0);
        var o = this.ctx,
          s = t.width,
          a = t.height,
          h = t.left,
          d = t.top,
          c = e || {},
          l = c.borderRadius,
          f = void 0 === l ? 0 : l,
          u = c.backgroundColor,
          g = void 0 === u ? "transparent" : u,
          p = c.overflow;
        e.opacity && this.setOpacity(e), this.setTransform(t, e), r && (o.save(), this.setShadow(e)), i && this.setBackground(g, s, a, h, d), e.clipPath ? this.clipPath(h, d, s, a, e.clipPath, i, !1) : this.roundRect(h, d, s, a, f, i, !1), r && o.restore(), n && this.setBorder(t, e), "hidden" == p && o.clip()
      }, t.prototype.drawImage = function(t, e, o, s) {
        return void 0 === e && (e = {}), void 0 === o && (o = {}), void 0 === s && (s = !0), i(this, 0, void 0, (function() {
          var a = this;
          return n(this, (function(h) {
            switch (h.label) {
              case 0:
                return [4, new Promise((function(h, d) {
                  return i(a, 0, void 0, (function() {
                    var i, a, d, c, l, f, u, g, v, x, b, w, S, z, M, k, W, I, B, P = this;
                    return n(this, (function(n) {
                      return i = this.ctx, a = o.borderRadius, d = void 0 === a ? 0 : a, c = o.backgroundColor, l = void 0 === c ? "transparent" : c, f = o.objectFit, u = void 0 === f ? "fill" : f, g = o.backgroundSize, v = void 0 === g ? "fill" : g, x = o.objectPosition, b = o.backgroundPosition, w = o.boxShadow, o.backgroundImage && (u = v, x = b), w && this.drawView(e, Object.assign(o, {
                          backgroundColor: l || w && (l || "#ffffff")
                        }), !0, !1, !0), S = e.width, z = e.height, M = e.left, k = e.top, i.save(), W = e.contentSize.left - e.borderSize.left, I = e.contentSize.top - e.borderSize.top, s || (this.setOpacity(o), this.setTransform(e, o), this.setBackground(l, S, z, M, k), this.roundRect(M, k, S, z, d, !!(d || !w && l), !1)), M += W, k += I, i.clip(), B = function() {
                          i.restore(), P.drawView(e, o, !1, !0, !1), h(1)
                        },
                        function(t) {
                          if ("fill" !== u) {
                            var n = function(t, e, i) {
                                var n = t.objectFit,
                                  r = t.objectPosition,
                                  o = e.width / e.height,
                                  s = i.width / i.height,
                                  a = 1;
                                "contain" == n && o >= s || "cover" == n && o < s ? a = e.height / i.height : ("contain" == n && o < s || "cover" == n && o >= s) && (a = e.width / i.width);
                                var h = i.width * a,
                                  d = i.height * a,
                                  c = r || [],
                                  l = c[0],
                                  f = c[1],
                                  u = function(t) {
                                    return /^\d+px|rpx$/.test(t)
                                  },
                                  g = u(l) ? y(l, e.width) : (e.width - h) * (m(l) ? y(l, 1) : {
                                    left: 0,
                                    center: .5,
                                    right: 1
                                  } [l || "center"]),
                                  p = u(f) ? y(f, e.height) : (e.height - d) * (m(f) ? y(f, 1) : {
                                    top: 0,
                                    center: .5,
                                    bottom: 1
                                  } [f || "center"]),
                                  v = function(t, e) {
                                    return [(t - g) / a, (e - p) / a]
                                  },
                                  x = v(0, 0),
                                  b = x[0],
                                  w = x[1],
                                  S = v(e.width, e.height),
                                  z = S[0],
                                  M = S[1];
                                return {
                                  sx: Math.max(b, 0),
                                  sy: Math.max(w, 0),
                                  sw: Math.min(z - b, i.width),
                                  sh: Math.min(M - w, i.height),
                                  dx: Math.max(g, 0),
                                  dy: Math.max(p, 0),
                                  dw: Math.min(h, e.width),
                                  dh: Math.min(d, e.height)
                                }
                              }({
                                objectFit: u,
                                objectPosition: x
                              }, e.contentSize, t),
                              o = n.sx,
                              s = n.sy,
                              a = n.sh,
                              h = n.sw,
                              d = n.dx,
                              c = n.dy,
                              l = n.dh,
                              f = n.dw;
                            p == r.MP_BAIDU ? i.drawImage(t.src, d + M, c + k, f, l, o, s, h, a) : i.drawImage(t.src, o, s, h, a, d + M, c + k, f, l)
                          } else i.drawImage(t.src, M, k, S, z)
                        }(t), B(), [2]
                    }))
                  }))
                }))];
              case 1:
                return h.sent(), [2]
            }
          }))
        }))
      }, t.prototype.drawText = function(t, e, i, n) {
        var r = this,
          o = this.ctx,
          s = e.borderSize,
          a = e.contentSize,
          h = e.left,
          d = e.top,
          c = a.width,
          l = a.height,
          f = a.left - s.left,
          u = a.top - s.top,
          g = i.color,
          p = void 0 === g ? "#000000" : g,
          v = i.lineHeight,
          x = void 0 === v ? "1.4em" : v,
          m = i.fontSize,
          w = void 0 === m ? 14 : m,
          S = i.fontWeight,
          z = i.fontFamily,
          M = i.fontStyle,
          k = i.textIndent,
          W = void 0 === k ? 0 : k,
          I = i.textAlign,
          B = void 0 === I ? "left" : I,
          P = i.textStroke,
          R = i.verticalAlign,
          L = void 0 === R ? Z : R,
          T = i.backgroundColor,
          O = i.lineClamp,
          F = i.backgroundClip,
          A = i.textShadow,
          C = i.textDecoration;
        if (W = b(W) ? W : 0, this.drawView(e, i, F != G), x = y(x, w), t) {
          o.save(), h += f, d += u;
          var j = n.fontHeight,
            E = n.descent + n.ascent;
          switch (o.setFonts({
              fontFamily: z,
              fontSize: w,
              fontWeight: S,
              fontStyle: M
            }), o.setTextBaseline(Z), o.setTextAlign(B), F ? this.setBackground(T, c, l, h, d) : o.setFillStyle(p), B) {
            case "left":
              break;
            case "center":
              h += .5 * c;
              break;
            case "right":
              h += c
          }
          var H = n.lines * x,
            $ = Math.ceil((l - H) / 2);
          switch ($ < 0 && ($ = 0), L) {
            case "top":
              break;
            case Z:
              d += $;
              break;
            case "bottom":
              d += 2 * $
          }
          var Y = (x - j) / 2,
            U = x / 2,
            D = function(t) {
              var e = o.measureText(t),
                i = e.actualBoundingBoxDescent,
                n = void 0 === i ? 0 : i,
                r = e.actualBoundingBoxAscent;
              return "top" == L ? {
                fix: E ? void 0 === r ? 0 : r : U - Y / 2,
                lineY: E ? 0 : Y - Y / 2
              } : L == Z ? {
                fix: E ? U + n / 4 : U,
                lineY: E ? 0 : Y
              } : "bottom" == L ? {
                fix: E ? x - n : U + Y / 2,
                lineY: E ? 2 * Y : Y + Y / 2
              } : {
                fix: 0,
                height: 0,
                lineY: 0
              }
            },
            X = function(t, e, i) {
              var r = t;
              switch (B) {
                case "left":
                  r += i;
                  break;
                case "center":
                  r = (t -= i / 2) + i;
                  break;
                case "right":
                  r = t, t -= i
              }
              if (C) {
                o.setLineWidth(w / 13), o.beginPath();
                var s = .1 * n.fontHeight;
                /\bunderline\b/.test(C) && (o.moveTo(t, e + n.fontHeight + s), o.lineTo(r, e + n.fontHeight + s)), /\boverline\b/.test(C) && (o.moveTo(t, e - s), o.lineTo(r, e - s)), /\bline-through\b/.test(C) && (o.moveTo(t, e + .5 * n.fontHeight), o.lineTo(r, e + .5 * n.fontHeight)), o.closePath(), o.setStrokeStyle(p), o.stroke()
              }
            },
            N = function(t, e, i) {
              var n = function() {
                  o.setLineWidth(P.width), o.setStrokeStyle(P.color), o.strokeText(t, e, i)
                },
                s = "outset";
              P && P.type !== s ? (o.save(), r.setShadow({
                boxShadow: A
              }), o.fillText(t, e, i), o.restore(), n()) : P && P.type == s ? (o.save(), r.setShadow({
                boxShadow: A
              }), n(), o.restore(), o.save(), o.fillText(t, e, i), o.restore()) : (r.setShadow({
                boxShadow: A
              }), o.fillText(t, e, i))
            };
          if (!n.widths || 1 == n.widths.length && n.widths[0].total + W <= a.width) {
            var _ = D(t),
              V = _.fix,
              q = _.lineY;
            return N(t, h + W, d + V), X(h + W, d + q, n && n.widths && n.widths[0].total || n.text), d += x, o.restore(), void this.setBorder(e, i)
          }
          for (var J = d, Q = h, K = "", tt = 0, et = o.measureText("...").width, it = n.widths, nt = 0; nt < it.length; nt++) {
            var rt = it[nt].widths,
              ot = 0;
            K = "", d += 1 == (tt += 1) ? 0 : x, 1 == tt && W && (ot = W, Q = h + W);
            for (var st = 0; st < rt.length; st++) {
              1 !== tt && W && (Q = h);
              var at = rt[st],
                ht = at.width,
                dt = at.text,
                ct = (rt[st + 1] || {}).width;
              if (K += dt, (ot += ht) + (void 0 === ct ? 0 : ct) + (0 == tt ? W : 0) + (tt == O ? et : 0) > a.width) {
                tt >= O && (K += "鈥?), tt++, ot = 0;
                var lt = D(K);
                V = lt.fix, q = lt.lineY, N(K, Q, d + V), X(Q, d + q, ot), d += x, K = ""
              } else if (st == rt.length - 1) {
                nt != it.length - 1 && tt == O && et + ot < a.width && (K += "鈥?);
                var ft = D(K);
                V = ft.fix, q = ft.lineY, N(K, Q, d + V), X(Q, d + q, ot)
              }
              if (d > J + l || tt > O) break
            }
          }
          o.restore()
        }
      }, t.prototype.source = function(t) {
        return i(this, 0, void 0, (function() {
          var e, i, r, o, s = this;
          return n(this, (function(n) {
            switch (n.label) {
              case 0:
                if (this.node = null, e = +new Date, "{}" == JSON.stringify(t)) return [2];
                if (!t.type)
                  for (i in t.type = Q, t.css = t.css || {}, t)["views", "children", "type", "css"].includes(i) || (t.css[i] = t[i], delete t[i]);
                return t.css.boxSizing || (t.css.boxSizing = "border-box"), [4, this.create(t)];
              case 1:
                return (r = n.sent()) ? (o = r.layout() || {}, this.size = o, this.node = r, this.onEffectFinished().then((function(t) {
                  return s.lifecycle("onEffectSuccess", t)
                })).catch((function(t) {
                  return s.lifecycle("onEffectFail", t)
                })), this.performance && console.log("甯冨眬鐢ㄦ椂锛? + (+new Date - e) + "ms"), [2, this.size]) : [2, console.warn("no node")]
            }
          }))
        }))
      }, t.prototype.getImageInfo = function(t) {
        return this.imageBus[t] || (this.imageBus[t] = this.createImage(t, this.useCORS)), this.imageBus[t]
      }, t.prototype.create = function(t, r) {
        return i(this, 0, void 0, (function() {
          var i, o, s, a, h, d, c, l, f, u, g, p, v, x, b, y, m;
          return n(this, (function(n) {
            switch (n.label) {
              case 0:
                if (i = "image" == t.type, o = [G, J].includes(t.type), s = t.css || {}, a = s.backgroundImage, h = s.display, i && !t.src && !t.url || o && !t.text) return [2];
                if ("none" == h) return [2];
                if (o && (t.text = String(t.text)), !(i || t.type == Q && a)) return [3, 4];
                d = i ? t.src : "", c = /url\((.+)\)/.exec(a), a && c && c[1] && (d = c[1] || ""), n.label = 1;
              case 1:
                return n.trys.push([1, 3, , 4]), [4, this.getImageInfo(d)];
              case 2:
                return l = n.sent(), f = l.width, u = l.height, !(g = l.path) && i ? [2] : (g && (t.attributes = Object.assign(t.attributes || {}, {
                  width: f,
                  height: u,
                  path: g,
                  src: g,
                  naturalSrc: d
                })), [3, 4]);
              case 3:
                return p = n.sent(), t.type != Q ? [2] : (this.lifecycle("onEffectFail", e(e({}, p), {
                  src: d
                })), [3, 4]);
              case 4:
                if (this.count += 1, v = new V(t, r, this.root, this.ctx), !(x = t.views || t.children)) return [3, 8];
                b = 0, n.label = 5;
              case 5:
                return b < x.length ? (y = x[b], [4, this.create(y, v)]) : [3, 8];
              case 6:
                (m = n.sent()) && v.add(m), n.label = 7;
              case 7:
                return b++, [3, 5];
              case 8:
                return [2, v]
            }
          }))
        }))
      }, t.prototype.drawNode = function(t, e) {
        return void 0 === e && (e = !1), i(this, 0, void 0, (function() {
          var i, r, o, s, a, h, d, c, l, f, u, g, p, v, x, b, y, m, w, S, z, M, k;
          return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return i = t.layoutBox, r = t.computedStyle, o = t.attributes, s = t.name, a = t.children, h = t.fixedLine, d = t.attributes, c = d.src, l = d.text, f = r.position, u = r.backgroundImage, g = r.backgroundRepeat, ["fixed"].includes(f) && !e ? [2] : (this.ctx.save(), s !== Q ? [3, 7] : c && u ? g ? [4, this.drawPattern(o, i, r)] : [3, 2] : [3, 5]);
              case 1:
                return n.sent(), [3, 4];
              case 2:
                return [4, this.drawImage(o, i, r, !1)];
              case 3:
                n.sent(), n.label = 4;
              case 4:
                return [3, 6];
              case 5:
                this.drawView(i, r), n.label = 6;
              case 6:
                return [3, 10];
              case 7:
                return "image" === s && c ? [4, this.drawImage(o, i, r, !1)] : [3, 9];
              case 8:
                return n.sent(), [3, 10];
              case 9:
                s === G ? this.drawText(l, i, r, o) : s === J && q.api && q.api.draw(l, this, i, r), n.label = 10;
              case 10:
                if (this.progress += 1, v = (p = h || {}).beforeElements, x = p.afterElements, !v) return [3, 14];
                b = 0, y = v, n.label = 11;
              case 11:
                return b < y.length ? (k = y[b], [4, this.drawNode(k)]) : [3, 14];
              case 12:
                n.sent(), n.label = 13;
              case 13:
                return b++, [3, 11];
              case 14:
                if (!a) return [3, 18];
                m = Object.values ? Object.values(a) : Object.keys(a).map((function(t) {
                  return a[t]
                })), w = 0, S = m, n.label = 15;
              case 15:
                return w < S.length ? "absolute" === (k = S[w]).computedStyle.position ? [3, 17] : [4, this.drawNode(k)] : [3, 18];
              case 16:
                n.sent(), n.label = 17;
              case 17:
                return w++, [3, 15];
              case 18:
                if (!x) return [3, 22];
                z = 0, M = x, n.label = 19;
              case 19:
                return z < M.length ? (k = M[z], [4, this.drawNode(k)]) : [3, 22];
              case 20:
                n.sent(), n.label = 21;
              case 21:
                return z++, [3, 19];
              case 22:
                return this.ctx.restore(), [2]
            }
          }))
        }))
      }, t.prototype.render = function(t) {
        var e = this;
        return void 0 === t && (t = 30), new Promise((function(r, o) {
          return i(e, 0, void 0, (function() {
            var e, i, s, a, h, d, c, l, f, u;
            return n(this, (function(n) {
              switch (n.label) {
                case 0:
                  return e = +new Date, this.init(), [4, (g = t, void 0 === g && (g = 0), new Promise((function(t) {
                    return setTimeout(t, g)
                  })))];
                case 1:
                  n.sent(), n.label = 2;
                case 2:
                  if (n.trys.push([2, 14, , 15]), !this.node) return [3, 12];
                  if (i = this.root.fixedLine || {}, s = i.beforeElements, a = i.afterElements, !s) return [3, 6];
                  h = 0, d = s, n.label = 3;
                case 3:
                  return h < d.length ? (f = d[h], [4, this.drawNode(f, !0)]) : [3, 6];
                case 4:
                  n.sent(), n.label = 5;
                case 5:
                  return h++, [3, 3];
                case 6:
                  return [4, this.drawNode(this.node)];
                case 7:
                  if (n.sent(), !a) return [3, 11];
                  c = 0, l = a, n.label = 8;
                case 8:
                  return c < l.length ? (f = l[c], [4, this.drawNode(f, !0)]) : [3, 11];
                case 9:
                  n.sent(), n.label = 10;
                case 10:
                  return c++, [3, 8];
                case 11:
                  return r(this.node), [3, 13];
                case 12:
                  this.lifecycle("onEffectFail", "node is empty"), n.label = 13;
                case 13:
                  return [3, 15];
                case 14:
                  return u = n.sent(), this.lifecycle("onEffectFail", u), o(u), [3, 15];
                case 15:
                  return this.performance && console.log("娓叉煋鐢ㄦ椂锛? + (+new Date - e - 30) + "ms"), [2]
              }
              var g
            }))
          }))
        }))
      }, t.prototype.onEffectFinished = function() {
        var t = this,
          e = Object.keys(this.imageBus).map((function(e) {
            return t.imageBus[e]
          }));
        return Promise.all(e)
      }, t.prototype.destroy = function() {
        this.node = []
      }, t.prototype.save = function(t) {
        try {
          var e = t || {},
            i = e.fileType,
            n = void 0 === i ? "png" : i,
            r = e.quality,
            o = void 0 === r ? 1 : r;
          return this.canvas.toDataURL("image/" + n, o)
        } catch (t) {
          return this.lifecycle("onEffectFail", "image cross domain"), t
        }
      }, t
    }();
  r.WEB == p && (window.Painter = K), exports.Mt = K
}();
