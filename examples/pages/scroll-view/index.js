
function genData() {
  var data = []
  for (let i = 0; i < 20 + Math.floor(Math.random() * 15); ++i) {
    data.push(`列表项${Math.floor(Math.random() * 2001)}`)
  }
  return data
}

var data = genData()

Page({
  data: {
    data
  },
  onLoad () {
    this.scrollView = this.selectComponent('#scrollView')
  },
  onRefresh () {
    var data = genData()
    setTimeout(() => {
      this.setData({
        data
      })
      this.scrollView.stopPullDownRefresh()
    }, 2000)
  },
  onLoadMore () {
    var data = genData()
    setTimeout(() => {
      this.setData({
        data: this.data.data.concat(data)
      })
    }, 1000)
  }
})