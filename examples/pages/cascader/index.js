Page({
  data: {
    visible: false,
    visible1: false,
    value: ['440000', '440400', '440404'],
    labels: '广东省/珠海市/金湾区',
    value1: [3, 34],
    labels1: '其它/电焊工',
    options: []
  },

  open () {
    this.setData({
      visible1: true
    })
  },

  openRegion () {
    this.setData({
      visible: true
    })
  },

  onRegionClose () {
    this.setData({
      visible: false
    })
  },

  onClose() {
    this.setData({
      visible1: false
    })
  },

  onChange (e) {
    this.setData({
      labels: e.detail.options.map(o => o.label).join('/')
    })
  },

  onChange1(e) {
    this.setData({
      labels1: e.detail.options.map(o => o.label).join('/')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      this.setData({
        options: [
          {
            id: 1,
            label: '土建',
            children: [
              {
                id: 11,
                label: '瓦工'
              },
              {
                id: 12,
                label: '木工'
              },
              {
                id: 13,
                label: '钢筋工'
              },
              {
                id: 14,
                label: '混凝土工'
              },
              {
                id: 15,
                label: '油漆工'
              }
            ]
          },
          {
            id: 2,
            label: '安装材料',
            children: [
              {
                id: 21,
                label: '电气设备'
              },
              {
                id: 22,
                label: '给排水'
              },
              {
                id: 23,
                label: '消防安装'
              },
              {
                id: 24,
                label: '通风空调'
              }
            ]
          },
          {
            id: 3,
            label: '其它',
            children: [
              {
                id: 31,
                label: '塔吊司机'
              },
              {
                id: 32,
                label: '塔吊指挥'
              },
              {
                id: 33,
                label: '司索工'
              },
              {
                id: 34,
                label: '电焊工'
              },
              {
                id: 35,
                label: '保安'
              },
              {
                id: 36,
                label: '后勤'
              },
              {
                id: 37,
                label: '挖掘机司机'
              },
              {
                id: 38,
                label: '电工'
              }
            ]
          }
        ]
      })
    }, 1000)
  }
})