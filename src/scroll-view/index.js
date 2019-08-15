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
      this.triggerEvent('scroll', e.detail.scrollTop)
    },
    scrollToLower () {
      this.triggerEvent('pullupload')
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
    }
  }
})