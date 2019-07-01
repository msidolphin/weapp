Page({
  // onLoad () {
  //   wx.getUserInfo({
  //     lang: 'zh_CN',
  //     success: res => {
  //       let userInfo = res.userInfo
  //       this.setData(userInfo)
  //     }
  //   })
  // },
  // onGotUserInfo (res) {
  //   if (!this.data.nickName) {
  //     let userInfo = res.detail.userInfo
  //     this.setData(userInfo)
  //   }
  //   this.$push({
  //     url: '/pages/posts/posts',
  //     query: {
  //       id: '123',
  //       name: 'jack'
  //     }
  //   }, false, true)
  // },
  data: {
    top: 120,
    ch: 200,
    cb: 32,
    cCls: '',
    cbCls: '',
    cStyle: '', // 图表容器样式
    chStyle: '', // 图表样式
    cbStyle: '', // 图表底部样式
    fixed: false,
    bs: 'display:none',
    animation: null
  },
  onLoad () {
    this.scrollTop = 0
  },
  onPageScroll (e) {
    let topThreshold = (this.data.ch - 2 * this.data.cb) // 收缩阈值
      if (e.scrollTop >= topThreshold) {
        let y = -(e.scrollTop - topThreshold)
        if (y <= -this.data.cb) y = -this.data.cb
        this.setData({
          chStyle: `transform:translateY(${y}px)`,
          cStyle: y === -32 ? `position:fixed; width:100%; top:${120 - 168}px;left:0;` : '',
          bs: y === -32 ? `display:block;height:${this.data.ch}px` : ''
        })
      } else {
        this.setData({
          chStyle: `transform:translateY(0px)`,
          cStyle: '',
          bs: ''
        })
    }
  }
})