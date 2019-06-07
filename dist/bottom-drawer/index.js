const minAlpha = 0
const maxAlpha = 0.3

Component({

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
            value: 500
        },
        bottom: {
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
        opacity: '',
        maskStyle: 'background: rgba(0, 0, 0, 0)',
        showMask: false,
        backgroundAnimation: null,
        animation: null
    },
    methods: {
        onTouchStart (e) {
            let touches = e.touches[0]
            this.setData({
                startY: touches.pageY
            })
            this.setData({
                animation: null
            })
        },
        onTouchMove (e) {
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
            if (endY === -100) opacity = 0
            this.setData({
                styles: `transform: translateY(${endY}px)!important;transition: unset!important;`,
                endY: endY,
                maskStyle: `background: rgba(0, 0, 0, ${opacity})!important;`,
                showMask: endY !== -this.data.bottom
            })
        },
        onTouchEnd () {
            this.setData({
                y: this.data.endY
            })
        },
        doNothing () {},
        onScrollToBottom () {
            this.triggerEvent('reached-bottom')
        },
        show (duration = 200) {
            if (this.data.y === -this.data.bottom || this.data.animated) return
            var animation = wx.createAnimation({
                duration,
                timingFunction: 'linear',
                delay: 0
            })
            animation.translate(0, -this.data.bottom).step()
            this.setData({
                animation: animation.export(),
                animated: true,
                y: -this.data.bottom,
                showMask: false
            })
        },
        handleAnimationEnd () {
            this.setData({
                animated: false
            })
        },
        hide () {
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
        },
        onMaskTap () {
            if (this.data.y === -this.data.bottom || this.data.animated) return
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
            backgroundAnimation.backgroundColor('rgba(0, 0, 0, 0)').step()
            animation.translate(0, -this.data.bottom).step()
            this.setData({
                animation: animation.export(),
                backgroundAnimation: backgroundAnimation.export(),
                animated: true,
                y: -this.data.bottom,
                showMask: false
            })
        }
    },
    ready () {
        wx.getSystemInfo({
            success: (res) => {
                const query = this.createSelectorQuery()
                query.select('#header').boundingClientRect()
                query.exec(qRes => {
                    let windowHeight = res.windowHeight - this.data.amend
                    let headerHeight = qRes.length ? qRes[0].height : 30
                    // 固定高
                    let height = this.data.height <= windowHeight ? this.data.height : windowHeight
                    this.setData({
                        maxY:  height,
                        headerHeight: headerHeight,
                        scrollViewStyle: `height: ${height - headerHeight}px;` // 减去头部的高度
                    })
                })
            }
        })
    }
})
