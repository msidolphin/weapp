Page({
  data: {
    value1: '',
    imageList: [
      {
        id: '',
        url: 'http://photocdn.sohu.com/20120128/Img333056814.jpg'
      }
    ]
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