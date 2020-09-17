// pages/scan/scan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg: app.globalData.userimg,
    qrcode: ''
  },
  checklogin: function () {
    var that = this
    var data = {
      nickName: wx.getStorageSync('userInfo').nickName,
      avatarUrl: wx.getStorageSync('userInfo').avatarUrl,
      uuid: that.data.qrcode,
      openId: wx.getStorageSync('openId')
    }
    app.http.get('/userInfo/checkQrcode', data).then(res => {
      console.log('发送UUID和openID')
      console.log(res)
      if (res == 1) {
        wx.showToast({
          title: '成功',
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/index/index',
          });
        }, 1500);
       
      } else {
        wx.showToast({
          title: '失败',
        })
      }

    }).catch(res => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qrcode = options.qrcode
    this.setData({
      qrcode: qrcode,
      userimg: app.globalData.userimg
    })


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