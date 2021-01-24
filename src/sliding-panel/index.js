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
                        styles: {
                            transform: `translateY(-${val}px)!important`,
                            transition: 'unset!important'
                        },
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
        styles: {},
        // mask
        maskStyle: 'background: rgba(0, 0, 0, 0)',
        showMask: false
    },
    methods: {
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
        noop () {},
        onScrollToBottom() {
            this.triggerEvent('reached-bottom')
        },
        show () {
            this.setData({
                styles: {
                    transform: `translateY(-${this.data.bottom}px)!important`,
                    transition: '.3s transform!important'
                },
                y: -this.data.bottom,
                showMask: false
            })
        },
        hide() {
            this.setData({
                styles: {
                    transform: 'translateY(0px)!important',
                    transition: '.3s transform!important'
                },
                y: 0,
                showMask: false
            })
        },
        initHeight() {
            wx.getSystemInfo({
                success: (res) => {
                    setTimeout(() => {
                        const query = this.createSelectorQuery()
                        query.select('.sliding-panel-header').boundingClientRect()
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
    attached () {
        this.initHeight()
    },
    ready () {
        this.reachedTop = false
    }
})
