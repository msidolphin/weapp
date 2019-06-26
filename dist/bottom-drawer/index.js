const minAlpha = 0
const maxAlpha = 0.3

Component({
    externalClasses: ['i-class'],
    options: {
        multipleSlots: true
    },
    properties: {
        amend: { // 修正高度
            type: Number,
            value: 0
        },
        height: {
            type: Number,
            value: 500,
            observer (val, old) {
                if (val !== old) {
                    this.initHeight()
                }
            }
        },
        bottom: {
            type: Number,
            value: 100,
            observer(val, old) {
                if (val !== old) {
                    this.setData({
                        styles: `transform: translateY(-${val}px)!important;transition: unset!important;`,
                        y: -val
                    })
                }
            }
        },
        threshold: { // 阈值，超过100则自动置顶
            type: Number,
            value: 100
        }
    },
    data: {
        maxY: 0, // 最大top值 由计算得到
        speed: 1.25,
        startY: 0, // 移动开始点
        endY: -100, // 移动结束点
        y: -100, // 移动起始位置
        scrollViewStyle: '',
        styles: 'transform: translateY(-100px)',
        // mask
        maskStyle: 'background: rgba(0, 0, 0, 0)',
        showMask: false,
        backgroundAnimation: null,
        animation: null
    },
    methods: {
        onTouchStart(e) {
            let touches = e.touches[0]
            this.moveY = 0
            this.setData({
                startY: touches.pageY
            })
            this.setData({
                animation: null
            })
        },
        setShowMask (e) {
            this.setData({
                showMask: e.show
            })
        },
        setReachedTop (e) {
            this.reachedTop = e.value
        },
        setReachedBottom (e) {
            this.reachedBottom = e.value
        },
        setY (e) {
            this.setData({
                y: e.value
            })
        },
        onTouchMove(e) {
            // 移动模式 阈值模式TODO
            let touches = e.touches[0]
            let target = e.currentTarget
            let moveY = (touches.pageY - this.data.startY) * this.data.speed
            let orignY = target.dataset.y
            let endY = orignY + moveY >= -this.data.bottom ? -this.data.bottom : orignY + moveY
            if (endY <= -this.data.maxY) endY = -this.data.maxY
            // 计算透明度
            // 系数
            let k = (maxAlpha - minAlpha) / this.data.maxY
            let opacity = minAlpha + k * (Math.abs(endY) - 0)
            if (endY === -this.data.bottom) opacity = 0
            this.moveY += (touches.pageY - this.data.startY)
            this.endY = endY
            this.setData({
                styles: `transform: translateY(${endY}px)!important;transition: unset!important;`,
                maskStyle: `background: rgba(0, 0, 0, ${opacity})!important;`,
                showMask: endY !== -this.data.bottom
            })
            // 是否到达顶部
            this.reachedTop = endY === -this.data.maxY
            this.reachedBottom = endY === -this.data.bottom
        },
        onTouchEnd() {
            if (Math.abs(this.moveY) === 0) {
                this.complete()
            } else {
                if (this.reachedTop) {
                    this.setData({
                        y: -this.data.maxY
                    })
                } else if (this.reachedBottom) {
                    this.setData({
                        y: -this.data.bottom
                    })
                } else {
                    let min = -(this.data.maxY - this.data.threshold)
                    let max = -(this.data.bottom + this.data.threshold)
                    if (this.moveY < 0) {
                        // 朝上
                        if (this.endY <= max) {
                            this.complete()
                        } else {
                            this.restart(true)
                        }
                    } else {
                        // 朝下
                        if (this.endY >= min) {
                            this.restart(true)
                        } else {
                            this.complete()
                        }
                    }
                }
            }
            this.moveY = 0
        },
        noop () {},
        onScrollToBottom() {
            this.triggerEvent('reached-bottom')
        },
        show () {
            this.restart(false)
        },
        handleAnimationEnd() {
            this.setData({
                animated: false
            })
        },
        hide() {
            if (this.data.y === 0 || this.data.animated) return
            var animation = wx.createAnimation({
                duration: 200,
                timingFunction: 'linear',
                delay: 0
            })
            animation.translate(0, 0).step()
            this.setData({
                animation: animation.export(),
                y: 0,
                animated: true,
                showMask: false
            })
            this.reachedTop = false
            this.reachedBottom = false
        },
        restart (opacity = true) {
            if (this.reachedBottom || this.data.animated) return
            var animation = wx.createAnimation({
                duration: 200,
                timingFunction: 'linear',
                delay: 0
            })
            animation.translate(0, -this.data.bottom).step()
            if (opacity) {
                var backgroundAnimation = wx.createAnimation({
                    duration: 200,
                    timingFunction: 'linear',
                    delay: 0
                })
                backgroundAnimation.backgroundColor(`rgba(0, 0, 0, 0)`).step()
                this.setData({
                    animation: animation.export(),
                    backgroundAnimation: backgroundAnimation.export(),
                    y: -this.data.bottom,
                    animated: true,
                    showMask: false
                })
            } else {
                this.setData({
                    animation: animation.export(),
                    y: -this.data.bottom,
                    animated: true,
                    showMask: false
                })
            }
            this.reachedTop = false
            this.reachedBottom = true
        },
        complete () {
            if (this.reachedTop || this.data.animated) return
            var animation = wx.createAnimation({
                duration: 200,
                timingFunction: 'linear',
                delay: 0
            })
            var backgroundAnimation = wx.createAnimation({
                duration: 200,
                timingFunction: 'linear',
                delay: 0
            })
            backgroundAnimation.backgroundColor(`rgba(0, 0, 0, ${maxAlpha})`).step()
            animation.translate(0, -this.data.maxY).step()
            this.setData({
                animation: animation.export(),
                backgroundAnimation: backgroundAnimation.export(),
                y: -this.data.maxY,
                animated: true,
                showMask: true
            })
            this.reachedTop = true
            this.reachedBottom = false
        },
        onMaskTap() {
            this.restart()
        },
        initHeight() {
            wx.getSystemInfo({
                success: (res) => {
                    setTimeout(() => {
                        const query = this.createSelectorQuery()
                        query.select('.bottom-drawer-header').boundingClientRect()
                        query.exec(qRes => {
                            let windowHeight = res.windowHeight - this.data.amend
                            let headerHeight = qRes.length && qRes[0] ? qRes[0].height : 30
                            // 固定高
                            let height = this.data.height <= windowHeight ? this.data.height : windowHeight
                            this.setData({
                                maxY: height,
                                headerHeight: headerHeight,
                                scrollViewStyle: `height: ${height - headerHeight}px;` // 减去头部的高度
                            })
                        })
                    }, 100)
                }
            })
        }
    },
    ready () {
        this.reachedTop = false
        this.initHeight()
    }
})
