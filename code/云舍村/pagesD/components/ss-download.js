! function() {
  "use strict";
  const e = require("../../common/vendor.js");
  require("../../utils/umengAdaptor.js");
  const o = require("../../utils/wxuser.js"),
    t = require("../../utils/api.js"),
    s = require("../../base/jAlert/jAlert.js"),
    i = {
      name: "ss-download",
      props: {
        fileUrl: {
          type: String,
          default: ""
        },
        fileType: {
          type: String,
          default: ""
        },
        isPrivate: {
          type: Boolean,
          default: !1
        },
        current: {
          type: Number,
          default: 0
        }
      },
      data: () => ({
        isAjax: !1,
        isLoading: !1
      }),
      methods: {
        toDownload(e) {
          this.isAjax || (this.isAjax = !0, 1 == e.type ? this.saveToPhotosAlbum(e.src) : 2 == e.type ? this.saveFile(e.src) : this.getDownVideo(e.src))
        },
        downloadH5(o) {
          this.isLoading = !0, e.index.downloadFile({
            url: o,
            success: e => {
              if (console.log(e), 200 === e.statusCode) {
                console.log("下载成功"), this.staticSave();
                var o = document.createElement("a");
                o.download = "", o.href = e.tempFilePath, document.body.appendChild(o), o.click(), o.remove()
              }
              this.isAjax = !1
            },
            fail: e => {
              this.isAjax = !1
            }
          })
        },
        saveFile(o) {
          e.index.showLoading(), e.index.downloadFile({
            url: o,
            success: o => {
              var t = o.tempFilePath;
              e.index.saveFile({
                tempFilePath: t,
                success: function(o) {
                  e.index.openDocument({
                    filePath: o.savedFilePath,
                    fileType: "pdf",
                    showMenu: !0,
                    success: function(o) {
                      e.index.hideLoading()
                    },
                    fail: function(o) {
                      e.index.hideLoading()
                    }
                  })
                },
                fail(o) {
                  console.log(o), e.index.hideLoading(), console.log("保存失败")
                }
              })
            }
          })
        },
        getDownVideo(o) {
          e.index.showLoading({
            mask: !0,
            title: "下载中..."
          });
          let t = (new Date).valueOf();
          e.index.downloadFile({
            url: o,
            filePath: e.wx$1.env.USER_DATA_PATH + "/" + t + ".mp4",
            success: o => {
              let s = o.filePath;
              e.index.saveVideoToPhotosAlbum({
                filePath: s,
                success: o => {
                  e.index.showToast({
                    title: "已保存至手机",
                    icon: "success"
                  }), e.wx$1.getFileSystemManager().unlink({
                    filePath: e.wx$1.env.USER_DATA_PATH + "/" + t + ".mp4",
                    success: function(e) {
                      console.log("unlink-getFileSystemManager"), console.log(e)
                    }
                  })
                },
                fail(o) {
                  e.index.showToast({
                    title: "保存失败",
                    icon: "none"
                  })
                },
                complete(o) {
                  console.log("saveVideoToPhotosAlbum-complete"), console.log(o), e.index.hideLoading()
                }
              })
            },
            fail(o) {
              e.index.showToast({
                title: "下载失败,请稍后再试",
                icon: "none"
              })
            },
            complete(e) {
              console.log(e)
            }
          }).onProgressUpdate(this.onProgress)
        },
        staticSave() {
          this.isLoading = !1;
          let e = o.getStorage("config"),
            i = o.getStorage("teamInfo");
          i.isPrivate = this.isPrivate, t.api.interfaceTransfer({
            query: i,
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_UCBASE_URL",
              interfaceMethod: "albumPhoto/staticSave",
              interfaceFrom: "GC",
              hotelGroupCode: e.hotelGroupCode
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result || s.jAlert3(e.result.msg || e.msg)
          })
        },
        onProgress(o) {
          e.index.showLoading({
            mask: !0,
            title: o.progress ? "下载中" + o.progress + "%" : "下载中..."
          })
        },
        saveToPhotosAlbum(o) {
          e.index.showLoading({
            title: "图片保存中..."
          }), this.isLoading = !0, e.index.downloadFile({
            url: o,
            success: o => {
              const {
                statusCode: t,
                tempFilePath: s
              } = o;
              200 === t ? e.index.saveImageToPhotosAlbum({
                filePath: s,
                success: o => {
                  this.staticSave(), console.log("data-----------------\x3e", o), e.index.showToast({
                    title: "已保存至手机",
                    icon: "success"
                  })
                },
                complete: o => {
                  e.index.hideLoading(), this.isAjax = !1
                },
                fail: o => {
                  e.index.getSetting({
                    success(o) {
                      o.authSetting["scope.writePhotosAlbum"] || e.index.showToast({
                        icon: "none",
                        title: "保存图片失败，请到设置中打开权限后重试"
                      })
                    }
                  })
                }
              }) : (e.index.showToast({
                title: "下载失败",
                icon: "none"
              }), this.isAjax = !1)
            },
            complete: e => {
              console.log(e)
            }
          }).onProgressUpdate(e => {})
        },
        saveFileToApp(o) {
          var t = plus.downloader.createDownload(o, {}, (function(o, t) {
            e.index.showToast({
              title: "下载完成",
              mask: !1,
              duration: 1e3
            }), console.log("status: " + t), 200 == t ? (console.log("下载成功：" + o.filename), console.log("plus.io.convertLocalFileSystemURL(d.filename): " + plus.io.convertLocalFileSystemURL(o.filename)), plus.runtime.openFile(plus.io.convertLocalFileSystemURL(o.filename), {}, (function(e) {
              console.log("打开成功")
            }), (function(e) {
              console.log("打开失败")
            }))) : e.index.showToast({
              title: "下载失败-02",
              mask: !1,
              duration: 1500
            })
          }));
          try {
            t.start();
            var s = 0,
              i = plus.nativeUI.showWaiting("正在下载");
            t.addEventListener("statechanged", (function(e, o) {
              switch (e.state) {
                case 1:
                  i.setTitle("正在下载");
                  break;
                case 2:
                  i.setTitle("已连接到服务器");
                  break;
                case 3:
                  s = parseInt(parseFloat(e.downloadedSize) / parseFloat(e.totalSize) * 100), i.setTitle("  正在下载" + s + "%  ");
                  break;
                case 4:
                  plus.nativeUI.closeWaiting()
              }
            }))
          } catch (o) {
            plus.nativeUI.closeWaiting(), e.index.showToast({
              title: "更新失败-03",
              mask: !1,
              duration: 1500
            })
          }
        }
      }
    },
    n = e._export_sfc(i, [
      ["render", function(o, t, s, i, n, a) {
        return {
          a: e.o(e => a.toDownload({
            src: s.fileUrl,
            type: s.fileType
          }))
        }
      }],
      ["__scopeId", "data-v-bf51e621"]
    ]);
  wx.createComponent(n)
}();