// pages/cascader/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: true,
    value: ['440000', '440400', '440404'],
    labels: '广东省/珠海市/金湾区'
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

  onChange (e) {
    this.setData({
      labels: e.detail.options.map(o => o.label).join('/')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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