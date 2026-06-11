Component({
  properties: {
    selected: {
      type: Number,
      default: 0,
    },
  },
  data: {
    // selected: 0,
    color: "#7A7E83",
    selectedColor: "#985a31",
    list: [{
        pagePath: "/pages/home/home",
        iconPath: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/logo1.svg",
        selectedIconPath: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/wz.png",
        text: "首页",
      },
      {
        pagePath: "/pages/index/index",
        iconPath: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/logo2.png",
        selectedIconPath: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/dwz.png",
        text: "预约",
      },
      {
        pagePath: "/pages/user/index",
        iconPath: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/logo3.png",
        selectedIconPath: "https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/zzwz.png",
        text: "我的",
        creatweb: false,
      },
    ],
   
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const currentUrl = `/${currentPage.route}`
      // console.log(data)
      if (data.path === currentUrl) return;
      const url = data.path;
      // console.log(data.path)
      wx.reLaunch({
        url
      });
    },
  },
});