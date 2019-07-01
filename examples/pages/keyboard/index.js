function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

let data = []
for (let i = 0; i < 200; ++i) {
  data.push(random(0, 10))
}



Page({
  data: {
    data,
    contentHeight: 0,
    contentStyle: '',
    visible: false,
    value: '',
    index: 0
  },
  onLoad () {
    this.y = 0
    let res = wx.getSystemInfoSync()
    this.setData({
      contentHeight: res.windowHeight
    })
  },
  onTap (e) {
    let { index, value } = e.currentTarget.dataset
    let query = wx.createSelectorQuery()
    query.select(`.item-${index}`).boundingClientRect()
    query.exec(res => {
      if (!res[0]) return
      let keyboard = this.selectComponent('#keyboard')
      let { height, top } = res[0]
      let y = keyboard.getScrollTop(height, top)
      if (y === null) {
        this.setData({
          visible: true,
          value,
          index
        })
      } else {
        this.y += y
        this.setData({
          visible: true,
          value,
          index,
          contentStyle: `transform:translateY(${this.y}px)`
        })
      }
    })
  },
  onClose () {
    this.setData({
      visible: false,
      contentStyle: `transform:translateY(${0}px)`
    })
  },
  onInput (e) {
    this.setData({
      [`data[${this.data.index}]`]: e.detail.value
    })
  }
})