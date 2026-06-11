Component({

  properties: {
    visible: {
      value: true,
      type: Boolean,
    },
    home: {
      value: 1,
      type: Number,
    },
    adult: {
      value: 1,
      type: Number,
    },
    children: {
      value: 0,
      type: Number,
    },
  },
  data: {
    cur: {},
    position: [{
        value: "top",
        text: "顶部弹出"
      },
      {
        value: "left",
        text: "左侧弹出"
      },
      {
        value: "center",
        text: "中间弹出"
      },
      {
        value: "bottom",
        text: "底部弹出"
      },
      {
        value: "right",
        text: "右侧弹出"
      },
    ],
    homeNumber: 1,
    adultNumber: 1,
    childrenNumber: 0,
  },

  observers: {
    "home, adult, children": function (home, adult, children) {
      this.setData({
        homeNumber: this.properties.home,
        adultNumber: this.properties.adult,
        childrenNumber: this.properties.children,
      });
      console.log(this.properties.home)
      console.log(this.properties.adult)
      console.log(this.properties.children)
    },
  },
  methods: {
    handlePopup(e) {
      const {
        item
      } = e.currentTarget.dataset;
      this.setData({
          cur: item,
        },
        () => {
          this.setData({
            visible: true
          });
        }
      );
    },
    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
    closePopup() {
      this.setData({
        visible: false,
      });
    },
    submit() {
      let homeNumber = this.data.homeNumber;
      let adultNumber = this.data.adultNumber;
      let childrenNumber = this.data.childrenNumber;
      this.triggerEvent("getNumber", {
        homeNumber: homeNumber,
        adultNumber: adultNumber,
        childrenNumber: childrenNumber,
      });
      this.setData({
        visible: false
      });
    },
    changeNumber(e) {
      let type = e.currentTarget.dataset.s;
      let number = e.detail.value;
      let obj = {};
      obj[type] = number;
      this.setData(obj);
    },
  },
 
});