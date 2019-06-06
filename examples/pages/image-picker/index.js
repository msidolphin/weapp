Page({
  data: {
    value1: '',
    imageList: []
  },
  onChange (e) {
    this.setData({
      imageList: e.detail.value
    })
  },
  onValue1Change (e) {
    this.setData({
      value1: e.detail.value
    })
  }
})