const {
  request
} = require("../../utils/request");
const app = getApp();
// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imges:'',
    num: 0,
    current:0,
    currentIndex:0,
    index:1,
    startX: 0, //touchStart开始坐标
    startY: 0,
    slide_direction:1,
    interval: '',
  },
  onShareAppMessage() {
    return {
      title: '桃花源·云舍村',
      path: '/pages/home/home',
      imageUrl: 'https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/applet_shar_img.png'
    }
  },
  touchstart(e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },
  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      index: e.detail.current + 1
    })
    console.log(this.data.index);
  },
  touchend(e) {
    let {startX,startY} = this.data;
    let slidingRange = 45; //
    let touchMoveX = e.changedTouches[0].clientX;
    let touchMoveY = e.changedTouches[0].clientY;
    let angle = this.angle({
      X: startX,
      Y: startY
    }, {
      X: touchMoveX,
      Y: touchMoveY
    });
    //为了方便计算取绝对值判断
    if (Math.abs(angle) > slidingRange && touchMoveY < startY) {
      this.setData({
        slide_direction:0,
      })
      // 向上滑动
    };
    if (Math.abs(angle) > slidingRange && touchMoveY > startY ) {
      this.setData({
        slide_direction:1,
      })
      // 向下滑动
    }
  },
  //计算滑动角度 start 起点坐标 end 终点坐标
  angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y;
    //返回角度 Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  async merry_go_round(){
    wx.showLoading();
    try {
      const res = await request({
        path: "/applet/home/image",
        method: "GET", 
        data: {},
      });
     this.setData({
       imges:res.data
     })
    } catch (e) {
      console.log(e);
    }
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.app = getApp()
    wx.loadFontFace({
      family: 'I.PenCrane-s',
      source: 'url("https://yunshecun.oss-cn-guangzhou.aliyuncs.com/website/font/TengXiangTongSongTi-2.ttf")',
      complete: function (res) {
        console.log('插入字体');
      },
      success: function (res) {
        console.log('成功');
      },
      fail: function (res) {
        console.log('失败');
      },
    })
    this.merry_go_round();
    // 自动切换图片、
    this.intervalImage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
 
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  intervalImage() {
    this.setData({
      interval: setInterval(() => {
        this.changeImage();
      }, 7000)
    })
  },
  clickImage() {
    clearInterval(this.data.interval);
    this.changeImage();
    this.intervalImage();
  },
  /**
   * 用户点击右上角分享
   */
  changeImage() {
    this.setData({ num: this.data.num >= this.data.imges.length - 1  ? 0 : this.data.num + 1 });
  },

  // handleNext(e) {
  //   const index = e.currentTarget.dataset["index"];
  //   this.setData({
  //     ["currentSwiper" + index]: Math.min(
  //       this.data["currentSwiper" + index] + 1,
  //       2
  //     ),
  //   });
  // },
});
