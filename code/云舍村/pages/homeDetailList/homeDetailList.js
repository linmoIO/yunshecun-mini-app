import dayjs from "dayjs";
const {
  request
} = require("../../utils/request");
const app = getApp();

function objectToUrlParams(obj) {
  const params = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(obj[key]);
      params.push(`${encodedKey}=${encodedValue}`);
    }
  }

  return params.join("&");
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dialogVisible: false,
    calendarVisible: false,
    orderList: [],
    newsList: [],
    startDay: "",
    startMonth: "",
    endDay: "",
    endMonth: "",
    days: "",
    adultNumber: 1,
    childrenNumber: 0,
    homeNumber: 1,
    startTimestamp: 0,
    endTimestamp: 0,
    roomNum: null,
    defaultValue: [],
    images: [],
    showImages: false,
    current: 0,
    options: {},
    bottomDialogVisible: false,
    format(day) {
      // day.suffix = '';
      if (day.type == 'start') {
        day.suffix = '入村';
      }
      if (day.type == 'end') {
        day.suffix = '离村';
      }
      return day;
    },
  },
  nav: function () {
    wx.openLocation({
      latitude: 28.79133, //维度
      longitude: 111.442009, //经度
      name: "湖南省常德市桃花源风景区", //目的地定位名称
      scale: 15, //缩放比例
      address: "湖南省常德市桃花源风景区" //导航详细地址
    })
  },
  onShareAppMessage() {
    return {
      title: '桃花源·云舍村',
      path: '/pages/home/home',
      imageUrl: 'https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/applet_shar_img.png'
    }
  },
  makePhoneCall() {
    const phoneNumber = '073670666'; // 替换成要拨打的电话号码
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },
  swiperChange() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '预约'
    })
    const {
      adultNumber,
      childrenNumber,
      homeNumber,
      startTimestamp,
      endTimestamp,
    } = options;
    this.setData({
      options,
      startTimestamp: +startTimestamp,
      endTimestamp: +endTimestamp,
      startDay: dayjs(+startTimestamp).format("MM-DD"),
      startMonth: dayjs(+startTimestamp).format("YYYY-MM"),
      endDay: dayjs(+endTimestamp).format("MM-DD"),
      endMonth: dayjs(+endTimestamp).format("YYYY-MM"),
      days: dayjs(+endTimestamp).diff(dayjs(+startTimestamp), "day"),
      adultNumber: +adultNumber,
      childrenNumber: +childrenNumber,
      homeNumber: +homeNumber,
      defaultValue: [+startTimestamp, +endTimestamp],
      bottomDialogVisible: true
    });
    wx.loadFontFace({
      family: 'I.PenCrane-s',
      source: 'url("https://yunshecun.oss-cn-guangzhou.aliyuncs.com/website/font/TengXiangTongSongTi-2.ttf")',
      complete: function (res) {
        console.log('插入字体');
        console.log(res);
      },
      success: function (res) {
        console.log('成功');
        console.log(res);
      },
      fail: function (res) {
        console.log('失败');
        console.log(res);
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const env = wx.getAccountInfoSync().miniProgram.envVersion
    const tokenKey = env + "token";
    if (wx.getStorageSync(tokenKey)) {
      this.getRooms();
    } else {
      app.onLoginCallback = this.getRooms;
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  showDialog() {
    this.setData({
      dialogVisible: true,
    });
  },
  getNumber(e) {
    const {
      adultNumber,
      childrenNumber,
      homeNumber
    } = e.detail;
    this.setData({
      childrenNumber,
      homeNumber,
      adultNumber
    }, () => {
      this.getRooms();
    });
  },
  openCalendar() {
    this.setData({
      calendarVisible: true
    });
  },
  handleConfirm(e) {
    const [start, end] = e.detail.value;
    this.setData({
        startTimestamp: start,
        endTimestamp: end,
        startDay: dayjs(start).format("MM-DD"),
        startMonth: dayjs(start).format("YYYY-MM"),
        endDay: dayjs(end).format("MM-DD"),
        endMonth: dayjs(end).format("YYYY-MM"),
        days: dayjs(end).diff(dayjs(start), "day"),
        defaultValue: [start, end],
      },
      () => {
        this.getRooms();
      }
    );
  },
  async getRooms() {
    wx.showLoading();
    try {
      const res = await request({
        path: "/applet/room/search",
        method: "POST",
        data: {
          adultNum: this.data.adultNumber,
          arriveTime: dayjs(this.data.startTimestamp).format("YYYY-MM-DD"),
          childrenNum: this.data.childrenNumber,
          leaveTime: dayjs(this.data.endTimestamp).format("YYYY-MM-DD"),
          roomNum: this.data.homeNumber,
        },
      });

      if (res.code === "0") {
        this.data.newsList = res.data.roomList.sort(function (a, b) {
          return (b.status - a.status)
        });
        console.log(this.data.newsList)
        this.setData({
          orderList: this.data.newsList || [],
          roomNum: res.data.roomNum,
        });
      }
    } catch (e) {
      console.log(e);
    }
    wx.hideLoading();
  },
  subscribe(e) {
    const {
      roomId,
      userNum,
      roomName,
      price,
      village,
      facilities,
      bathroom
    } = e.detail;
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?roomId=${roomId}&userNum=${userNum}&roomName=${roomName}&adultNumber=${this.data.adultNumber}&childrenNumber=${this.data.childrenNumber}&homeNumber=${this.data.homeNumber}&price=${price}&startTimestamp=${this.data.startTimestamp}&endTimestamp=${this.data.endTimestamp}&roomNum=${this.data.roomNum}&facilities=${facilities}&bathroom=${bathroom}&village=${village}`,
    });
  },
  showImages(e) {
    this.setData({
      images: this.data.orderList.find(
        (item) => item.categoryId === +e.detail.orderId
      ).imageList || [],
      showImages: true,
    });
  },
  onVisibleChange() {
    this.setData({
      showImages: false,
    });
    setTimeout(() => {
      this.setData({
        current: 0,
      });
    }, 300);
  },
  handleSwiperChange(e) {
    this.setData({
      current: e.detail.current
    });
  },
  previewSwiperClose() {
    this.setData({
      showImages: false,
    });
  }
});