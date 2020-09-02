// pages/product/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    price:'9999',
    name:'商品名',
    specialty:[
      '好看',
      '好玩',
      '好用'
    ],
    isShow:false,
    animation:'',
    // 商品数量
    num:1,
    sections:[
      {
        id:0,
        kind:'颜色',
        option:'白色'
      },
      {
        id:1,
        kind:'颜色',
        option:'黑色'
      },
      {
        id:2,
        kind:'颜色',
        option:'黑色'
      },
      {
        id:3,
        kind:'颜色',
        option:'黑色'
      },
      {
        id:4,
        kind:'颜色',
        option:'黑色'
      },
      {
        id:5,
        kind:'颜色',
        option:'黑色'
      },
      {
        id:6,
        kind:'颜色',
        option:'黑色'
      },
      {
        id:7,
        kind:'颜色',
        option:'黑色'
      },
      {
        id:8,
        kind:'颜色',
        option:'黑色'
      }
    ],
    products:[
      {
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      },
       {
        id: 1,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      }, 
      {
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      },
       {
        id: 3,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
      },
       {
        id: 4,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
      },
       {
        id: 5,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
      }, 
      {
        id: 6,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      }
    ],
    ids:''
   
  },
  selectops:function(e){
    var ids = e.currentTarget.dataset.id
    this.setData({
      ids:ids
    })
  },
  // 跳转评论页
  toRemarks:function(){
    wx.navigateTo({
      url: '/pages/remarks/remarks',
    })
  },
  // 用户地址页
  toAddress:function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  // 打开弹出框
  showModel:function(){
    // 创建一个animation对象
    let animation=wx.createAnimation({
      delay: 0,
      duration:300,       //动画持续时间
      timingFunction: 'linear',
    })
    this.animation = animation
    // 动画效果
    animation.translateY(1000).step()
    this.setData({
      // 导出动画效果
      animation:animation.export(),
      isShow:true
    })
    // 定时器，延迟执行动画
    setTimeout(function(){
      animation.translateY(0).step()
      this.setData({
        animation: animation.export()
      })
    }.bind(this),100)
  },
  // 关闭弹出框
  close:function(){
    let animation=wx.createAnimation({
      delay: 0,
      duration:300,       //动画持续时间
      timingFunction: 'linear',
    })
    this.animation = animation
    // 动画效果
    animation.translateY(1000).step()
    this.setData({
      // 导出动画效果
      animation:animation.export(),
    })
    // 定时器，延迟执行动画
    setTimeout(function(){
      animation.translateY(0).step()
      this.setData({
        animation: animation.export(),
        isShow:false
      })
    }.bind(this),100)
  },
  minus:function(){
    var num = this.data.num
    console.log(num)
    if(num>1){
      num--   
      this.setData({
        num:num
      })
      console.log(this.data.num)
    }
  },
  plus:function(){
    var num = this.data.num
    num++
    this.setData({
      num:num
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // 防止可以移动弹出框一下的页面
  touchMove: function() {
  },

  maskTouchMove: function() {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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