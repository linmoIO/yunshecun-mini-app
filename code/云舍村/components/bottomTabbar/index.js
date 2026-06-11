Component({
  properties: {
    selected: {
      type: Number,
      value: 0,
    },
  },

  data: {
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/pages/images/home.png",
        selectedIconPath: "/pages/images/home-active.png",
        text: "预订",
      },
      {
        pagePath: "/pages/list/index",
        iconPath: "/pages/images/yuyue.png",
        selectedIconPath: "/pages/images/yuyue-active.png",
        text: "在地体验",
      },
      {
        pagePath: "/pages/user/index",
        iconPath: "/pages/images/user.png",
        selectedIconPath: "/pages/images/user-active.png",
        text: "我的",
      },
    ],
  },

  methods: {
    switchTab(event) {
      const { path } = event.currentTarget.dataset;
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const currentUrl = `/${currentPage.route}`;
      if (path === currentUrl) {
        return;
      }
      wx.redirectTo({
        url: path,
      });
    },
  },
});
