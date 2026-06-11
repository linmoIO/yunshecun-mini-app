! function() {
  "use strict";
  var t, e;
  const i = require("../common/vendor.js");
  let n = {};
  n = (null == (e = null == (t = i.index) ? void 0 : t.getWindowInfo) ? void 0 : e.call(t)) || {}, exports.useNavigatorRect = function() {
    const t = i.ref({}),
      e = i.ref();
    return i.onMounted(() => {
      var l, o;
      e.value = null == (o = null == (l = i.index) ? void 0 : l.getMenuButtonBoundingClientRect) ? void 0 : o.call(l),
        function() {
          var i, l, o, u;
          const a = n.windowWidth - ((null == (i = e.value) ? void 0 : i.right) || 0);
          t.value.padding = {
            left: a,
            top: (null == (l = e.value) ? void 0 : l.top) || 0,
            right: ((null == (o = e.value) ? void 0 : o.width) || 0) + 2 * a,
            bottom: a
          }, t.value.width = n.windowWidth, t.value.height = (null == (u = e.value) ? void 0 : u.height) || 0, t.value.outerHeight = t.value.height + t.value.padding.top + t.value.padding.bottom, t.value.statusBarHeight = n.statusBarHeight, t.value.originPadding = a
        }()
    }), t
  }
}();