// pages/calendar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [
      {
        year: new Date().getFullYear(), // 当前年份
        month: new Date().getMonth() + 1, // 当前月份
        days: [{value: 1, color: 'red'}, 2, 3, 4, 5, 6] // 当月已记工日期   
      }
    ],
    maxDate: new Date().toLocaleDateString()
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