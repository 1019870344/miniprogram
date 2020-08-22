// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      userimg:"/image/user-img.png",
      username:"点击获取头像和用户名"
    },
    hasUserInfo: false,
    session_key:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("用户信息："+app.globalData.userInfo);
      if(app.globalData.userInfo){
      console.log("已登录");
      this.setData({
        userInfo : app.globalData.userInfo,
        hasUserInfo:true
      })
      }else{
      console.log("未登录")
      }

      
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
              console.log("获取到的用户数据：");
              console.log(ures2);
              JSON.stringify(ures2)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(ures2)
              }
              // 解密
              wx.request({
                url: app.globalData.url+'/wxlogin/getid',
                data: {
                  session_key:app.globalData.session_key,
                  encryptedData: ures2.encryptedData,
                  iv: ures2.iv
                },
                success: res_allinfo=> {
                  console.log("解密后的数据：");
                  console.log(res_allinfo.data.userInfo);
                  this.data.session_key = res_allinfo.data.userInfo.session_key;
                  app.globalData.userInfo = res_allinfo.data.userInfo;
                  // 解密后的数据插入数据库
                  wx.request({
                    url:  app.globalData.url+'/wxlogin/useinfo',
                    data:{
                      openId:res_allinfo.data.userInfo.openId,
                      sessionKey:res_allinfo.data.userInfo.session_key,
                      nickName:res_allinfo.data.userInfo.nickName,
                      gender:res_allinfo.data.userInfo.gender,
                      avatarUrl:res_allinfo.data.userInfo.avatarUrl
                    },
                    method:'post',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success:function(res_userinfo){
                      console.log("插入成功");
                    }
                  })
                  
                  if(app.globalData.userInfo){
                    console.log("已登录");
                    that.setData({
                      userInfo : app.globalData.userInfo,
                      hasUserInfo:true
                    })
                  }

                },
                fail: function (error) {
                  console.log(error);
                  console.log("解密失败");
                }
              })
              
            }
          })               
        }
      }
    })
         
        
   
  },

  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    console.log(e.detail.encryptedData);
    console.log(e.detail.iv);
    console.log(app.globalData.session_key);
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: app.globalData.url+'/wxlogin/getphone',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: app.globalData.session_key,
        },
        method:'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res);
        }
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