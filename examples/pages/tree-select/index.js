const { $Message } = require('../../dist/base/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    visibleMultiple: false,
    multipleValue1: [12, 23, 34],
    multipleValue2: [12, 23, 34],
    value1: 34,
    value2: 34,
    options: [],
    multipleValueModel1: [
      {
        id: 12,
        label: '木工'
      },
      {
        id: 23,
        label: '消防安装'
      },
      {
        id: 34,
        label: '电焊工'
      }
    ],
    multipleValueModel2: ['木工', '消防安装', '电焊工'],
    valueModel1: {
      id: 34,
      label: '电焊工'
    },
    valueModel2: {
      id: 34,
      label: '电焊工'
    }
  },
  onTap() {
    this.setData({
      visible: true
    })
  },
  onMultipleTap() {
    this.setData({
      visibleMultiple: true
    })
  },
  onChange (e) {
    let {value, options} = e.detail
    this.setData({
      value1: value,
      valueModel1: options
    })
  },

  onMultipleChange (e) {
    let { value, options } = e.detail
    this.setData({
      multipleValue1: value,
      multipleValueModel1: options
    })
  },
  onPopupChange (e) {
    let { value, options } = e.detail
    this.setData({
      value2: value,
      valueModel2: options
    })
  },
  onPopupMultipleChange (e) {
    debugger
    let { value, options } = e.detail
    this.setData({
      multipleValue2: value,
      multipleValueModel2: options.map(item => item.label)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 模拟异步加载
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
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
      }, () => {
        wx.hideLoading()
      })
    }, 1000)
  },

  onExceed () {
    $Message({
      type: 'error',
      content: `最大选中数量不能超过5个`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})