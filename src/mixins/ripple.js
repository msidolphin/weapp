const threshold = 192

/**
 * @description 判断颜色是否足够亮
 * 灰度模型: r * .299 + g * .587 + b* .114 < 某阈值,表示足够暗
 * @param {Number, String} r - red
 * @param {Number, String} g - green
 * @param {Number, String} b - blue
 * @param {Number, String} a - alpha
 */
function isLight (r, g, b, a) {
    return (parseInt(r) * 0.299 + parseInt(g) * 0.578 + parseInt(b) * 0.114 >= threshold * a)
}


export default Behavior({
    properties: {
        ripple: {
            type: Boolean,
            value: true
        },
        rippleBgColor: {
            type: Boolean,
            value: '#fff'
        }
    },
    data: {
        $rippleId: 0,
        $rippleEl: '.i-ripple-el',
        $ripples: []
    },
    methods: {
        $pushRipple (e, hold) {
            if (!this.data.ripple) return
            this.createSelectorQuery().select(this.data.$rippleEl).fields({
                size: true,
                rect: true,
                computedStyle: ['backgroundColor']
            }).selectViewport().scrollOffset().exec(res => {
                if (res && res.length > 1 && res[0] && res[1]) {
                    const { width, height, left, top, backgroundColor = 'rgba(255, 255, 255, 1)' } = res[0]
                    const { scrollLeft, scrollTop } = res[1]
                    const targetWidth = parseInt(width)
                    const targetHeight = parseInt(height)
                    const [r, g, b, a = '1'] = backgroundColor.match(/(\b[0-9]{1,3}\b)/g)
                    // 获取ripple的尺寸
                    const rippleDimension = targetWidth > targetHeight ? targetWidth : targetHeight
                    const rippleLeft = (e.detail.x - (left + scrollLeft)) - rippleDimension / 2
                    const rippleTop = (e.detail.y - (top + scrollTop)) - rippleDimension / 2
                    this.data.$ripples.push({
                        id: `i-ripple-${this.data.$rippleId++}`,
                        width: rippleDimension,
                        height: rippleDimension,
                        left: rippleLeft,
                        top: rippleTop,
                        backgroundColor: isLight(r, g, b, a) ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)',
                        start: true,
                        hold: hold || false
                    })
                    this.setData({
                        $ripples: this.data.$ripples
                    })
                } else {
                    throw new Error(`elements ${this.data.$rippleEl} not found.`)
                }
            })
        },
        /**
         * @description ripple出栈，动画结束后调用
         */
        $popRipple () {
            if (this.$rippleTimer !== null && this.$rippleTimer !== undefined) {
                clearTimeout(this.$rippleTimer)
                this.$rippleTimer = null
            }
            if (this.$rippleDeleteCount === undefined || this.$rippleDeleteCount === null) this.$rippleDeleteCount = 0
            this.$rippleDeleteCount++
            this.$rippleTimer = setTimeout(() => {
                let ripples = this.data.$ripples
                ripples.splice(0, this.$rippleDeleteCount)
                clearTimeout(this.$rippleTimer)
                this.$rippleTimer = null
                this.$rippleDeleteCount = 0
                this.setData({
                    $ripples: ripples
                })
            }, 200)
        },
        noop () {}
    }
})