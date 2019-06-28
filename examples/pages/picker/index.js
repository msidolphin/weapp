Page({
  data: {
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
    visible5: false,
    visible6: false,
    visible7: false,
    visible8: false,
    text1: [],
    text2: [],
    value1: [2, 21, 212],
    value2: ['440000', '440400', '440403'],
    date1: '',
    date2: '',
    date3: '',
    date4: '',
    date5: '',
    date6: ''
  },
  onLoad () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    setTimeout(() => {
      this.setData({
        data: [{
          id: 1,
          label: '分类1',
          children: [
            {
              id: 11,
              label: '分类11',
              children: [
                {
                  id: 111,
                  label: '分类111'
                },
                {
                  id: 112,
                  label: '分类112'
                },
                {
                  id: 113,
                  label: '分类113'
                },
                {
                  id: 114,
                  label: '分类114'
                }
              ]
            },
            {
              id: 12,
              label: '分类12',
              children: [
                {
                  id: 121,
                  label: '分类121'
                },
                {
                  id: 122,
                  label: '分类122'
                },
                {
                  id: 123,
                  label: '分类123'
                },
                {
                  id: 124,
                  label: '分类124'
                }
              ]
            },
            {
              id: 13,
              label: '分类13',
              children: [
                {
                  id: 131,
                  label: '分类131'
                },
                {
                  id: 132,
                  label: '分类132'
                },
                {
                  id: 133,
                  label: '分类133'
                },
                {
                  id: 134,
                  label: '分类134'
                }
              ]
            }
          ]
        },
          {
            id: 2,
            label: '分类2',
            children: [{
              id: 21,
              label: '分类21',
              children: [
                {
                  id: 211,
                  label: '分类211'
                },
                {
                  id: 212,
                  label: '分类212'
                },
                {
                  id: 213,
                  label: '分类213'
                }
              ]
            }]
          }]
      })
      wx.hideLoading()
    }, 1000)
  },
  onTap1 () {
    this.setData({
      visible1: true
    })
  },
  onTap2() {
    this.setData({
      visible2: true
    })
  },
  onTap3 () {
    this.setData({
      visible3: true
    })
  },
  onTap4 () {
    this.setData({
      visible4: true
    })
  },
  onTap5 () {
    this.setData({
      visible5: true
    })
  },
  onTap6 () {
    this.setData({
      visible6: true
    })
  },
  onTap7 () {
    this.setData({
      visible7: true
    })
  },
  onTap8 () {
    this.setData({
      visible8: true
    })
  },
  onChange1 (e) {
    this.setData({
      value1: e.detail.value,
      text1: e.detail.text
    })
  },
  onChange2 (e) {
    this.setData({
      value2: e.detail.value,
      text2: e.detail.text
    })
  },
  onChange3 (e) {
    this.setData({
      date1: e.detail.text
    })
  },
  onChange4 (e) {
    this.setData({
      date2: e.detail.text
    })
  },
  onChange5 (e) {
    this.setData({
      date3: e.detail.text
    })
  },
  onChange6 (e) {
    this.setData({
      date4: e.detail.text
    })
  },
  onChange7 (e) {
    this.setData({
      date5: e.detail.text
    })
  },
  onChange8 (e) {
    this.setData({
      date6: e.detail.text
    })
  },
  onClose1 () {
    this.setData({
      visible1: false
    })
  },
  onClose2 () {
    this.setData({
      visible2: false
    })
  },
  onClose3 () {
    this.setData({
      visible3: false
    })
  },
  onClose4 () {
    this.setData({
      visible4: false
    })
  },
  onClose5 () {
    this.setData({
      visible5: false
    })
  },
  onClose6 () {
    this.setData({
      visible6: false
    })
  },
  onClose7 () {
    this.setData({
      visible7: false
    })
  },
  onClose8 () {
    this.setData({
      visible8: false
    })
  }
});