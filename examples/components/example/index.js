const app = getApp()

// components/example/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    code: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: {},
    show: false
  },

  watch: {},

  /**
   * 组件的方法列表
   */
  methods: {
    _initData () {
      let data = app.towxml.toJson(this.data.code, 'markdown', this)
      this.setData({
        data
      })
      console.log(data)
    },
    trigger () {
      this.setData({
        show: !this.data.show
      })
    }
  },

  attached () {
    this._initData()
  }
})
