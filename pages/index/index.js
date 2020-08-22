//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    TabCur: 0,
    navHeight:app.globalData.navHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    // 图片数组
    index_slides: [
      {slide_url:"https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/37dfdc929ee9a4313facb0b23ebcd721.jpg?thumb=1&w=720&h=360"},
      {slide_url:"https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/37dfdc929ee9a4313facb0b23ebcd721.jpg?thumb=1&w=720&h=360"},
      {slide_url:"https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/37dfdc929ee9a4313facb0b23ebcd721.jpg?thumb=1&w=720&h=360"},
      {slide_url:"https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/37dfdc929ee9a4313facb0b23ebcd721.jpg?thumb=1&w=720&h=360"},
      {slide_url:"https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/37dfdc929ee9a4313facb0b23ebcd721.jpg?thumb=1&w=720&h=360"}
    ],
    // 是否显示指示点
    indicatorDots: true,
    // 是否自动切换
    autoplay: false,
    // 切换时间间隔
    interval: 2000,
    // 滑动动画时长
    duration: 1000,
    // 三个承诺的所有数据
    promiseData: [
      {
        url:"",
        promisImg:"../../image/wait.png",
        promiseTitle:"官方商城"
      },
      {
        url:"",
        promisImg:"../../image/quality.png",
        promiseTitle:"正品保证"
      },
      {
        url:"",
        promisImg:"../../image/send.png",
        promiseTitle:"满99包邮"
      }
    ],
    icons: [
      [
      {
        id: 0,
        iconsImg:"../../image/testimages/phone.png",
        iconsTitle:"11",
        url:"123456"
      },
      {
      iconsImg:"../../image/testimages/auction.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/bag.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/book.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/camera.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/cosmetics.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/dress.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/game.png",
      iconsTitle:"第一",
      url:""
      }],
      [
      {
      iconsImg:"../../image/testimages/glasses.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/ktv.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/music.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/perfume.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/watch.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/plain.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/shoes.png",
      iconsTitle:"第一",
      url:""
      },
      {
      iconsImg:"../../image/testimages/swim.png",
      iconsTitle:"第一",
      url:""
      }]
    ],
    scrollLeft: 0,
    navbarActiveIndex: 0,
    navbarTitle: [
      "第一",
      "第二",
      "第三",
      "第四",
      "第五",
      "第六",
      '第七',
      '第八',
      '第九'
    ],
    products:[
      {
        id: 0 ,
        name: '商品名',
        url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/d880ff45a9a3b70527770e01521fc939.jpg?thumb=1&w=200&h=200&f=webp&q=90',
        price:5299,
        title:'描述++++++'
      },
      {
        id: 1 ,
        name: '商品名',
        url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/d880ff45a9a3b70527770e01521fc939.jpg?thumb=1&w=200&h=200&f=webp&q=90',
        price:5299,
        title:'描述++++++'
      },
      {
        id: 2 ,
        name:'商品名',
        url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/d880ff45a9a3b70527770e01521fc939.jpg?thumb=1&w=200&h=200&f=webp&q=90',
        price:5299,
        title:'描述++++++'
      },
      {
        id: 3 ,
        name: '商品名',
        url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/d880ff45a9a3b70527770e01521fc939.jpg?thumb=1&w=200&h=200&f=webp&q=90',
        price:5299,
        title:'描述++++++'
      }
    ]

  },
  navigateTo:function(){
    wx.navigateTo({
      url: '/pages/product/product'
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    console.log('点击了：'+e.currentTarget.dataset.id)
  },
  
  swiperchange: function(e) {
    var that = this 
    console.log(e.detail.current) 
    that.setData({
      'currentTab': e.detail.current
    })
  },


  iconsInfo: function(e){
   console.log(e.currentTarget.dataset)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this 
    

    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})
