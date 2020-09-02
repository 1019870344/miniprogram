// pages/mine/mine.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      userimg: app.globalData.userimg,
      username: app.globalData.username,
      hasUserInfo: app.globalData.hasUserInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userimg:app.globalData.userimg,
      username:app.globalData.nickName,
      hasUserInfo:app.globalData.hasUserInfo
    })
  },

  getUserInfo:function(){
    var that = this;
     // 检查用户是否授权
     wx.getSetting({
      success: ures => {
        // 检查是否授权用户信息
        if (ures.authSetting['scope.userInfo']) {
          // 如果已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: ures2 => {
              // 可以将 ures2 发送给后台解码出 unionId   
              console.log("获取用户数据：");
              console.log(ures2.userInfo);
              wx.setStorageSync('userInfo', ures2.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(ures2)
              }
              // 数据插入数据库
              var data = {
                openId: wx.getStorageSync('openId'),
                avatarUrl: ures2.userInfo.avatarUrl,
                nickName: ures2.userInfo.nickName,
                country: ures2.userInfo.country,
                province: ures2.userInfo.province,
                city: ures2.userInfo.city
              }
              app.http.post('/userInfo/selectByOpenId',data).then(res=>{
                console.log(res)
                app.globalData.userInfo =ures2.userInfo
                that.setData({
                  userimg:ures2.userInfo.avatarUrl,
                  username:ures2.userInfo.nickName
                })
              })
              
              
            }
          })               
        }
      }
    })
         
        
   
  },

  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      var data = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        sessionKey: wx.getStorageSync('sessionKey')
      }
      app.http.get('/wxlogin/getphone',data).then(res=>{
        console.log('获取电话号码： '+res.phoneNumber);
        wx.setStorageSync('tel', res.phoneNumber)

      })
    
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})