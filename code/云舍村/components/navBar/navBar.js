const App = getApp();

Component({
  properties: {
    title: {
      value: '',
      type: String
    },
    hideBack:{
      value: false,
      type: Boolean
    },
    iconWhite:{
        value: false,
        type: Boolean
      },
  },
  data: {
    // title: '',
    navH:"",
    navInfo:{
      top: 10,
      bottom: 30,
    }
  },
  methods: {
    navBack() {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  attached(){
    let navInfo = App.globalData.navInfo
    this.setData({
      navInfo
    })
  }
})