! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/preventScroll.js"),
    o = require("../../assets/index.js"),
    i = e.defineComponent({
      name: "share",
      props: {
        posterInfo: {
          type: Object,
          default: () => ({})
        }
      },
      setup(i, s) {
        let n = e.ref(""),
          p = e.ref();
        e.onMounted(() => {
          t.preventScroll()
        });
        const r = {
            BZT: {
              icon: o.assets.icProductTravel,
              title: "旅行"
            },
            DestPackage: {
              icon: o.assets.icProductPackage,
              title: "目的地套餐"
            },
            coupon: {
              icon: o.assets.icProductCoupon,
              title: "通兑券"
            },
            hotel: {
              icon: o.assets.icProductHotel,
              title: "酒店"
            },
            dayActivity: {
              icon: o.assets.icProductDayActivity,
              title: "日活动"
            }
          },
          c = e.computed(() => r[i.posterInfo.type]),
          a = e.computed(() => {
            const e = (i.posterInfo.themes || []).map(e => ({
              type: "text",
              text: e,
              css: {
                color: "#336735",
                border: "1px solid #336735",
                padding: "4px",
                marginRight: "4px",
                borderRadius: "4px",
                fontSize: "12px",
                lineHeight: "12px"
              }
            }));
            return {
              css: {
                width: "375px",
                background: "white",
                borderRadius: "8px",
                overflow: "hidden",
                paddingBottom: "20px"
              },
              views: [{
                type: "image",
                src: i.posterInfo.posterImage,
                css: {
                  width: "375px",
                  height: "562px",
                  objectFit: "cover"
                }
              }, {
                type: "view",
                css: {
                  padding: "20px 20px 0"
                },
                views: [{
                  type: "view",
                  css: {
                    display: "flex",
                    alignItems: "center"
                  },
                  views: [{
                    type: "view",
                    css: {
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                      borderRadius: "4px",
                      padding: "4px",
                      marginRight: "4px"
                    },
                    views: [{
                      type: "image",
                      src: c.value.icon,
                      css: {
                        width: "12px",
                        height: "12px",
                        marginRight: "2px"
                      }
                    }, {
                      type: "text",
                      text: c.value.title,
                      css: {
                        color: "#F0E7D4",
                        fontSize: "12px",
                        lineHeight: "12px"
                      }
                    }]
                  }, ...e]
                }, {
                  type: "view",
                  views: [{
                    type: "text",
                    text: i.posterInfo.title,
                    css: {
                      marginTop: "12px",
                      fontSize: "20px",
                      lineHeight: "30px",
                      fontWeight: "bold",
                      color: "#000"
                    }
                  }]
                }, {
                  type: "view",
                  views: [{
                    type: "text",
                    text: i.posterInfo.desc,
                    css: {
                      marginTop: "8px",
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#000"
                    }
                  }]
                }, {
                  type: "view",
                  css: {
                    marginTop: "38px",
                    paddingRight: "88px"
                  },
                  views: [{
                    type: "view",
                    text: i.posterInfo.desc,
                    css: {
                      marginTop: "34px",
                      display: "flex",
                      alignItems: "flex-end"
                    },
                    views: [{
                      type: "text",
                      text: i.posterInfo.price,
                      css: {
                        color: "#A43127",
                        fontWeight: "bold",
                        fontSize: "20px",
                        lineHeight: "20px"
                      }
                    }, {
                      type: "text",
                      text: i.posterInfo.priceModelDesc,
                      css: {
                        fontSize: "12px",
                        lineHeight: "12px",
                        color: "#000"
                      }
                    }]
                  }, {
                    type: "view",
                    text: i.posterInfo.desc,
                    css: {
                      marginTop: "8px"
                    },
                    views: [{
                      type: "text",
                      text: i.posterInfo.priceTime,
                      css: {
                        fontSize: "12px",
                        lineHeight: "18px",
                        color: "#808080"
                      }
                    }]
                  }, {
                    type: "image",
                    src: i.posterInfo.qrCode,
                    css: {
                      width: "80px",
                      height: "80px",
                      position: "absolute",
                      right: 0,
                      bottom: 0
                    }
                  }]
                }]
              }]
            }
          });
        return {
          posterImg: n,
          doDownloadImg: () => {
            e.index.showLoading({
              title: "图片保存中..."
            }), p.value.canvasToTempFilePathSync({
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
            t.restoreScroll(), s.emit("close")
          },
          getPoster: e => {
            n.value = e
          },
          painter: p,
          current: c,
          posterBoard: a
        }
      }
    });
  Array || e.resolveComponent("l-painter")(), Math;
  const s = e._export_sfc(i, [
    ["render", function(t, o, i, s, n, p) {
      return {
        a: t.posterImg,
        b: e.sr("painter", "51e2d2be-0"),
        c: e.o(e => t.getPoster(e)),
        d: e.p({
          isCanvasToTempFilePath: !0,
          hidden: !0,
          board: t.posterBoard
        }),
        e: e.o((...e) => t.doDownloadImg && t.doDownloadImg(...e)),
        f: e.o((...e) => t.cancelDialog && t.cancelDialog(...e))
      }
    }],
    ["__scopeId", "data-v-51e2d2be"]
  ]);
  wx.createComponent(s)
}();
