const app = getApp()
Page({
  data: {
   
    TabCur: 0,            // index值
    MainCur: 0,           //scroll into view左右同步值
    VerticalNavTop: 0,    //设置竖向滚动条位置
    list: [],             //显示的数据
    load: true
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true          //是否显示透明蒙层，防止触摸穿透
    });
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  //点击左边的右边跳转
  tabSelect(e) {
    console.log(e)
    this.setData({
      // index值
      TabCur: e.currentTarget.dataset.id,
      // 跳转右边的内容
      MainCur: e.currentTarget.dataset.id,
      // 竖向滚动条位置50px
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  // 右边滚动时左边跟随变化
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        // 获取节点#main-x的信息
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 240;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})