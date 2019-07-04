const app = getApp()

Page({
  data: {
    top: app.globalData && app.globalData.device && app.globalData.device.navbarHeight ? app.globalData.device.navbarHeight : 0,
    ch: 200, // 图表高度
    cb: 32, // 查看趋势图高度
    cStyle: '', // 图表容器样式
    chStyle: '', // 图表样式
    cbStyle: '', // 图表底部样式
    tabStyle: '',
    bs: 'display:none'
  },
  onLoad () {
    this.scrollTop = 0
    this.tabHeight = 40 // tabbar的高度
    this.top = -(200 - 120 - 32) + this.data.top // 图表固定时top值
    this.topThreshold = this.data.ch - 2 * this.data.cb // 查看趋势图展开阈值
    this.tabThreshold = this.data.ch - this.data.cb // 收起查看趋势图阈值
  },
  back2Top () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  onPageScroll (e) {
    if (e.scrollTop > this.tabThreshold) {
      if (e.scrollTop - this.tabThreshold < this.data.cb) { // 查看趋势图未完全收起
        // 改变图表容器的top值
        let top = this.top - e.scrollTop + this.tabThreshold
        this.setData({
          cStyle: `position:fixed; width:100%; top:${top}px;left:0;`,
          tabStyle: '', // 此时tab未固定
          bs: `display:block;height:${this.data.ch}px` // 占位元素维持原高度
        })
      } else {
        // 固定tab
        this.setData({
          tabStyle: `position:fixed; width:100%; top:${120 + this.data.top}px;left:0;`,
          bs: `display:block;height:${this.data.ch + this.tabHeight}px`
        })
      }
    } else if (e.scrollTop >= this.topThreshold) {
      let y = -(e.scrollTop - this.topThreshold)
      if (y <= -this.data.cb) y = -this.data.cb
      this.setData({
        chStyle: `transform:translateY(${y}px)`,
        cStyle: y === -this.data.cb ? `position:fixed; width:100%; top:${this.top}px;left:0;` : '',
        bs: y === -this.data.cb  ? `display:block;height:${this.data.ch}px` : ''
      })
    } else {
      this.setData({
        chStyle: `transform:translateY(0px)`,
        cStyle: '',
        bs: '',
        tabStyle: ''
      })
    }
  }
})