Component({
  externalClasses: ['i-class'],
  options: {
    multipleSlots: true
  },
  properties: {
    lowerThresHold: {
      type: Number,
      value: 50
    },
    scrollWithAnimation: {
      type: Boolean,
      value: false
    },
    enableBackToTop: {
      type: Boolean,
      value: false
    },
    scrollIntoView: {
      type: String,
      value: ''
    },
    reactive: {
      type: Boolean,
      value: true
    },
    top: {
      type: Number,
      value: 160
    },
    color: { // 下拉刷新 颜色
      type: String,
      value: '#ffb700'
    },
    backgroundColor: { // 下拉刷新 背景颜色
      type: String,
      value: "#fff",
    }
  },
  data: {
    refreshed: false,
    scrollY: true
  },
  methods: {
    scroll (e) {
      this.scrollTop = e.detail.scrollTop
      if (!this.refresh) this.getRefreshRef()
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        if (this.scrollTop <= 0) {
          if (this.refresh && !this.refresh.isReachTop()) {
            this.refresh.reachTop()
          }
        } else {
          if (this.refresh && this.refresh.isReachTop()) {
            this.refresh.unReachTop()
          }
        }
      }, 20)
      this.triggerEvent('scroll', e.detail.scrollTop)
    },
    scrollToLower () {
      this.triggerEvent('pullupload')
    },
    scrollToUpper () {
      if (!this.refresh) this.getRefreshRef()
      if (this.refresh && !this.refresh.isReachTop()) {
        this.refresh.reachTop()
      }
    },
    onRefresh () {
      this.setData({
        refreshed: false
      })
      this.triggerEvent('pulldownrefresh')
    },
    stopPullDownRefresh () {
      this.setData({
        refreshed: true
      })
    },
    getRefreshRef () {
      this.refresh = this.selectComponent('#refresh')
    }
  },
  ready () {
    this.getRefreshRef()
  }
})