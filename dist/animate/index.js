// 不使用，菜鸡测试微信动画的

function getAnimate (name, opts = {}, reverse) {

  function create (options = {}) {
    return wx.createAnimation({
      ...options
    })
  }

  let animate = {
    fade () {
      let animate = create(opts)
      if (reverse) {
        animate.opacity(0).step()
      } else animate.opacity(1).step()
      return animate.export()
    },
    scale () {
      let animate = create(opts)
      if (reverse) {
        animate.scale(0, 0).step()
      } else animate.scale(1, 1).step()
      return animate.export()
    }
  }

  if (animate[name]) return animate[name]()
  else return {}

}



Component({
    externalClasses: ['i-class'],
    properties: {
        customStyle: String,
        show: {
          type: Boolean,
          value: false,
          observer: 'handleEnterOrLeave'
        },
        duration: {
          type: [Number, Object],
          value: 300
        },
        name: {
          type: String,
          value: 'fade'
        },
        customClass: {
          type: String,
          value: ''
        }
      },
  
    data: {
        animation: {},
        type: '',
        inited: false,
        display: false,
        isEnter: false
    },
    methods: {
    },
    ready () {
      if (this.data.show) {
        this.enter()
      }
    },
    methods: {
      enter () {
        const { duration } = this.data
        this.setData({
          isEnter: true,
          animation: getAnimate(this.data.name, {duration})
        })
      },
      leave () {
        const { duration } = this.data
        this.setData({
          isEnter: false,
          animation: getAnimate(this.data.name, {duration}, true)
        })
      },
      handleEnterOrLeave (val) {
        if (val) {
          this.enter()
        } else {
          this.leave()
        }
      },
      onAnimationEnd () {
        this.triggerEvent('trigger', this.data.isEnter)
      }
    }
})
