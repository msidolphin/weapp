// pages/select/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '440000',
    multipleValue: ['440000', '420000'],
    visible: false,
    multipleVisible: false,
    labels: '广东省',
    multipleLables: '广东省、湖北省',
    options: []
  },
  
  open () {
    this.setData({
      visible: true
    })
  },
  openMultiple () {
    this.setData({
      multipleVisible: true
    })
  },

  onClose () {
    this.setData({
      visible: false
    })
  },
  onMultipleClose () {
    this.setData({
      multipleVisible: false
    })
  },
  onChange (e) {
    this.setData({
      value: e.detail.value,
      labels: e.detail.options.label
    })
  },
  onMultipleChange (e) {
    this.setData({
      multipleValue: e.detail.value,
      multipleLables: e.detail.options.map(o => o.label).join('、')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    setTimeout(() => {
      this.setData({
        options: [
          { id: "110000", label: "北京市" },
          { id: "120000", label: "天津市" },
          { id: "130000", label: "河北省" },
          { id: "140000", label: "山西省" },
          { id: "150000", label: "内蒙古自治区" },
          { id: "210000", label: "辽宁省" },
          { id: "220000", label: "吉林省" },
          { id: "230000", label: "黑龙江省" },
          { id: "310000", label: "上海市" },
          { id: "320000", label: "江苏省" },
          { id: "330000", label: "浙江省" },
          { id: "340000", label: "安徽省" },
          { id: "350000", label: "福建省" },
          { id: "360000", label: "江西省" },
          { id: "370000", label: "山东省" },
          { id: "410000", label: "河南省" },
          { id: "420000", label: "湖北省" },
          { id: "430000", label: "湖南省" },
          { id: "440000", label: "广东省" },
          { id: "450000", label: "广西壮族自治区" },
          { id: "460000", label: "海南省" },
          { id: "500000", label: "重庆市" },
          { id: "510000", label: "四川省" },
          { id: "520000", label: "贵州省" },
          { id: "530000", label: "云南省" },
          { id: "540000", label: "西藏自治区" },
          { id: "610000", label: "陕西省" },
          { id: "620000", label: "甘肃省" },
          { id: "630000", label: "青海省" },
          { id: "640000", label: "宁夏回族自治区" },
          { id: "650000", label: "新疆维吾尔自治区" },
          { id: "710000", label: "台湾省" },
          { id: "810000", label: "香港特别行政区" },
          { id: "820000", label: "澳门特别行政区" }
        ]
      }, () => {
        wx.hideLoading()
      })
    }, 1000)
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