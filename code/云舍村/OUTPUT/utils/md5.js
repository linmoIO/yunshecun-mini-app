! function() {
  "use strict";

  function r(r, n, t, e, o, f) {
    return u((a = u(u(n, r), u(e, f))) << (c = o) | a >>> 32 - c, t);
    var a, c
  }

  function n(n, t, e, o, u, f, a) {
    return r(t & e | ~t & o, n, t, u, f, a)
  }

  function t(n, t, e, o, u, f, a) {
    return r(t & o | e & ~o, n, t, u, f, a)
  }

  function e(n, t, e, o, u, f, a) {
    return r(t ^ e ^ o, n, t, u, f, a)
  }

  function o(n, t, e, o, u, f, a) {
    return r(e ^ (t | ~o), n, t, u, f, a)
  }

  function u(r, n) {
    var t = (65535 & r) + (65535 & n);
    return (r >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t
  }
  exports.hex_md5 = function(r) {
    return function(r) {
      for (var n, t = "0123456789abcdef", e = "", o = 0; o < r.length; o++) n = r.charCodeAt(o), e += t.charAt(n >>> 4 & 15) + t.charAt(15 & n);
      return e
    }(function(r) {
      return function(r) {
        for (var n = "", t = 0; t < 32 * r.length; t += 8) n += String.fromCharCode(r[t >> 5] >>> t % 32 & 255);
        return n
      }(function(r, f) {
        r[f >> 5] |= 128 << f % 32, r[14 + (f + 64 >>> 9 << 4)] = f;
        for (var a = 1732584193, c = -271733879, h = -1732584194, i = 271733878, g = 0; g < r.length; g += 16) {
          var C = a,
            d = c,
            l = h,
            v = i;
          a = n(a, c, h, i, r[g + 0], 7, -680876936), i = n(i, a, c, h, r[g + 1], 12, -389564586), h = n(h, i, a, c, r[g + 2], 17, 606105819), c = n(c, h, i, a, r[g + 3], 22, -1044525330), a = n(a, c, h, i, r[g + 4], 7, -176418897), i = n(i, a, c, h, r[g + 5], 12, 1200080426), h = n(h, i, a, c, r[g + 6], 17, -1473231341), c = n(c, h, i, a, r[g + 7], 22, -45705983), a = n(a, c, h, i, r[g + 8], 7, 1770035416), i = n(i, a, c, h, r[g + 9], 12, -1958414417), h = n(h, i, a, c, r[g + 10], 17, -42063), c = n(c, h, i, a, r[g + 11], 22, -1990404162), a = n(a, c, h, i, r[g + 12], 7, 1804603682), i = n(i, a, c, h, r[g + 13], 12, -40341101), h = n(h, i, a, c, r[g + 14], 17, -1502002290), a = t(a, c = n(c, h, i, a, r[g + 15], 22, 1236535329), h, i, r[g + 1], 5, -165796510), i = t(i, a, c, h, r[g + 6], 9, -1069501632), h = t(h, i, a, c, r[g + 11], 14, 643717713), c = t(c, h, i, a, r[g + 0], 20, -373897302), a = t(a, c, h, i, r[g + 5], 5, -701558691), i = t(i, a, c, h, r[g + 10], 9, 38016083), h = t(h, i, a, c, r[g + 15], 14, -660478335), c = t(c, h, i, a, r[g + 4], 20, -405537848), a = t(a, c, h, i, r[g + 9], 5, 568446438), i = t(i, a, c, h, r[g + 14], 9, -1019803690), h = t(h, i, a, c, r[g + 3], 14, -187363961), c = t(c, h, i, a, r[g + 8], 20, 1163531501), a = t(a, c, h, i, r[g + 13], 5, -1444681467), i = t(i, a, c, h, r[g + 2], 9, -51403784), h = t(h, i, a, c, r[g + 7], 14, 1735328473), a = e(a, c = t(c, h, i, a, r[g + 12], 20, -1926607734), h, i, r[g + 5], 4, -378558), i = e(i, a, c, h, r[g + 8], 11, -2022574463), h = e(h, i, a, c, r[g + 11], 16, 1839030562), c = e(c, h, i, a, r[g + 14], 23, -35309556), a = e(a, c, h, i, r[g + 1], 4, -1530992060), i = e(i, a, c, h, r[g + 4], 11, 1272893353), h = e(h, i, a, c, r[g + 7], 16, -155497632), c = e(c, h, i, a, r[g + 10], 23, -1094730640), a = e(a, c, h, i, r[g + 13], 4, 681279174), i = e(i, a, c, h, r[g + 0], 11, -358537222), h = e(h, i, a, c, r[g + 3], 16, -722521979), c = e(c, h, i, a, r[g + 6], 23, 76029189), a = e(a, c, h, i, r[g + 9], 4, -640364487), i = e(i, a, c, h, r[g + 12], 11, -421815835), h = e(h, i, a, c, r[g + 15], 16, 530742520), a = o(a, c = e(c, h, i, a, r[g + 2], 23, -995338651), h, i, r[g + 0], 6, -198630844), i = o(i, a, c, h, r[g + 7], 10, 1126891415), h = o(h, i, a, c, r[g + 14], 15, -1416354905), c = o(c, h, i, a, r[g + 5], 21, -57434055), a = o(a, c, h, i, r[g + 12], 6, 1700485571), i = o(i, a, c, h, r[g + 3], 10, -1894986606), h = o(h, i, a, c, r[g + 10], 15, -1051523), c = o(c, h, i, a, r[g + 1], 21, -2054922799), a = o(a, c, h, i, r[g + 8], 6, 1873313359), i = o(i, a, c, h, r[g + 15], 10, -30611744), h = o(h, i, a, c, r[g + 6], 15, -1560198380), c = o(c, h, i, a, r[g + 13], 21, 1309151649), a = o(a, c, h, i, r[g + 4], 6, -145523070), i = o(i, a, c, h, r[g + 11], 10, -1120210379), h = o(h, i, a, c, r[g + 2], 15, 718787259), c = o(c, h, i, a, r[g + 9], 21, -343485551), a = u(a, C), c = u(c, d), h = u(h, l), i = u(i, v)
        }
        return Array(a, c, h, i)
      }(function(r) {
        for (var n = Array(r.length >> 2), t = 0; t < n.length; t++) n[t] = 0;
        for (t = 0; t < 8 * r.length; t += 8) n[t >> 5] |= (255 & r.charCodeAt(t / 8)) << t % 32;
        return n
      }(r), 8 * r.length))
    }(function(r) {
      for (var n, t, e = "", o = -1; ++o < r.length;) n = r.charCodeAt(o), t = o + 1 < r.length ? r.charCodeAt(o + 1) : 0, 55296 <= n && n <= 56319 && 56320 <= t && t <= 57343 && (n = 65536 + ((1023 & n) << 10) + (1023 & t), o++), n <= 127 ? e += String.fromCharCode(n) : n <= 2047 ? e += String.fromCharCode(192 | n >>> 6 & 31, 128 | 63 & n) : n <= 65535 ? e += String.fromCharCode(224 | n >>> 12 & 15, 128 | n >>> 6 & 63, 128 | 63 & n) : n <= 2097151 && (e += String.fromCharCode(240 | n >>> 18 & 7, 128 | n >>> 12 & 63, 128 | n >>> 6 & 63, 128 | 63 & n));
      return e
    }(r)))
  }
}();