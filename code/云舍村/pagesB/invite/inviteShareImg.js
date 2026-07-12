! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/wxuser.js");
  require("../../utils/request.js"), require("../../utils/config.js"), require("../../utils/log.js"), require("../../utils/qdTracker.js"), require("../../utils/umengAdaptor.js");
  const o = require("../../utils/preventScroll.js"),
    i = e.defineComponent({
      name: "share",
      props: {
        posterInfo: {
          type: Object,
          default: () => ({})
        }
      },
      setup(i, s) {
        let n = t.getStorage("user"),
          r = t.getStorage("wxuser"),
          p = e.ref(""),
          l = e.ref();
        return e.onMounted(() => {
          o.preventScroll()
        }), {
          posterImg: p,
          doDownloadImg: () => {
            e.index.showLoading({
              title: "图片保存中..."
            }), l.value.canvasToTempFilePathSync({
              fileType: "jpg",
              pathType: "url",
              quality: 1,
              success: t => {
                console.log(t.tempFilePath), e.index.saveImageToPhotosAlbum({
                  filePath: t.tempFilePath,
                  success: function() {
                    e.index.hideLoading(), e.index.showModal({
                      title: "保存成功",
                      showCancel: !1,
                      content: "图片已保存到手机相册"
                    })
                  },
                  fail: function() {
                    e.index.hideLoading(), e.index.getSetting({
                      success(t) {
                        t.authSetting["scope.writePhotosAlbum"] || e.index.showToast({
                          icon: "none",
                          title: "保存图片失败，请到设置中打开权限后重试"
                        })
                      }
                    })
                  },
                  complete: function() {}
                })
              }
            })
          },
          cancelDialog: () => {
            o.restoreScroll(), s.emit("close")
          },
          getPoster: e => {
            console.log(i.posterInfo, "posterInfo66666"), p.value = e
          },
          painter: l,
          user: n,
          wxuser: r
        }
      }
    });
  Array || (e.resolveComponent("l-painter-image") + e.resolveComponent("l-painter-view") + e.resolveComponent("l-painter-text") + e.resolveComponent("l-painter"))(), Math || ((() => "../uni_modules/lime-painter/components/l-painter-image/l-painter-image.js") + (() => "../uni_modules/lime-painter/components/l-painter-view/l-painter-view.js") + (() => "../uni_modules/lime-painter/components/l-painter-text/l-painter-text.js") + (() => "../uni_modules/lime-painter/components/l-painter/l-painter.js"))();
  const s = e._export_sfc(i, [
    ["render", function(t, o, i, s, n, r) {
      return e.e({
        a: t.posterImg,
        b: t.posterInfo.posterImage
      }, t.posterInfo.posterImage ? {
        c: e.p({
          src: t.posterInfo.posterImage,
          css: "width:375px;height:562px;object-fit: cover;border-radius:8px 8px 0 0"
        })
      } : {
        d: e.p({
          css: "width:375px;height:562px;"
        })
      }, {
        e: e.p({
          src: t.wxuser.avatarUrl + "?imageView2/4/w/32/h/32/q/90&x-oss-process=image/resize,m_fill,w_32,h_32",
          css: "width:32px;height:32px;margin-right:8px;border-radius:50%"
        }),
        f: e.p({
          text: t.user.cardLevelDescript,
          css: "line-height:18px;color:#808080;font-size:12px;text-align: left;"
        }),
        g: e.p({
          text: t.user.name || t.wxuser.nickname,
          css: "line-height:18px;color:#808080;font-size:14px;text-align: left;"
        }),
        h: e.p({
          css: "display:flex;flex-direction:column"
        }),
        i: e.p({
          css: "display:flex;align-items:center"
        }),
        j: e.p({
          text: "邀您扫码体验云舍村",
          css: "line-clamp:1;line-height:18px;color:#000;font-size:12px;margin-top:20px;"
        }),
        k: e.p({
          css: "display:flex;flex-direction:column"
        }),
        l: e.p({
          src: t.posterInfo.qrCode,
          css: "width:64px;height:64px;"
        }),
        m: e.p({
          css: "margin-left: 24px; margin-right: 24px;margin-top:32px;display:flex;align-items:center;justify-content: space-between;"
        }),
        n: e.sr("painter", "9e6a9aba-0"),
        o: e.o(e => t.getPoster(e)),
        p: e.p({
          isCanvasToTempFilePath: !0,
          hidden: !0,
          css: "width: 375px;height:690px;background:#fff;border-radius: 8px;padding-bottom:24px;"
        }),
        q: e.o((...e) => t.doDownloadImg && t.doDownloadImg(...e)),
        r: e.o((...e) => t.cancelDialog && t.cancelDialog(...e))
      })
    }],
    ["__scopeId", "data-v-9e6a9aba"]
  ]);
  wx.createComponent(s)
}();
