// components/searchBox.js

const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerText:{
      type:String,
      value:'default value'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    navHeight:app.globalData.navHeight,
    menuButtonHeight:app.globalData.menuButtonHeight,
    menuButtonTop:app.globalData.menuButtonTop,
    // 这里是一些组件内部数据
    someData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    opensearch: function(){
      wx.navigateTo({
        url: '../search/search',
      })
    },
    scan:function(){
      wx.scanCode({
        onlyFromCamera: true,
        success:res=>{
          console.log('扫码成功'),
          console.log(res),
          wx.navigateTo({
            url: '../scan/scan?qrcode='+res.result,
          })
        },
        fail:err=>{
          console.log('扫码失败'),
          console.log(err)
        }

      })
    }
  }
})
