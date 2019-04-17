// pages/mask/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    showTop: false,
    showRight: false,
    showBottom: false,
    showLeft: false,
  },
  _open (d) {
    this.setData({
      [`show${d ? d : ''}`]: true
    })
  },
  _close (d) {
    this.setData({
      [`show${d ? d : ''}`]: false
    })
  },
  open () {
    this._open()
  },
  openTop () {
    this._open('Top')
  },
  openRight () {
    this._open('Right')
  },
  openBottom () {
    this._open('Bottom')
  },
  openLeft () {
    this._open('Left')
  },
  close () {
    this._close()
  },
  closeTop () {
    this._close('Top')
  },
  closeRight () {
    this._close('Right')
  },
  closeBottom () {
    this._close('Bottom')
  },
  closeLeft () {
    this._close('Left')
  }
})