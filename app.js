//app.js
import http from '/utils/request.js'
App({
  http,
  globalData: {
    userimg:"/image/user-img.png",
    username:"用户名",
    hasUserInfo:false,
    userInfo: null,
    url: 'http://localhost:8080',
    navHeight: '',
    navTop: '',
    windowHeight: '',
    statusBarHeight: '',
    menuButtonHeight: '',
    menuButtonTop: ''
  },

  onLaunch: function () {
    const that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('登录')
        var data = {
          code: res.code
        }
        that.http.get('/wxlogin/getcode', data).then(res => {
          console.log('获取openId和session_key')
          wx.setStorageSync('openId', res.openId)
          wx.setStorageSync('sessionKey', res.sessionKey)
        })

        var data1= {
          openId:wx.getStorageSync('openId')
        }
        that.http.get('/userInfo/getUserInfo',data1).then(res1=>{

          if(res1!= null){
            that.globalData.userimg = res1.avatarUrl
            that.globalData.username = res1.nickName
            that.globalData.hasUserInfo = true
          }
          
        })


      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取胶囊信息
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    // 获取设备信息
    var systemInfo = wx.getSystemInfoSync()
    // console.log(systemInfo)
    let statusBarHeight = systemInfo.statusBarHeight,
      navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
      navHeight = menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
    this.globalData.navHeight = navHeight;
    this.globalData.navTop = navTop;
    this.globalData.windowHeight = systemInfo.windowHeight;
    this.globalData.statusBarHeight = statusBarHeight;
    this.globalData.menuButtonHeight = menuButtonObject.height
    this.globalData.menuButtonTop = menuButtonObject.top
    // console.log(this.globalData)
  }
})