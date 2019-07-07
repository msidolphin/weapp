Component({
    properties: {
        percent: {
            type: [String, Number],
            value: 0,
            observer () {
                this.draw()
            }
        },
        trailColor: {
            type: String,
            value: '#eaeef2'
        },
        strokeColor: {
            type: String,
            value: '#FFB700'
        },
        size: {
            type: String,
            value: '240rpx'
        }
    },
    data: {
        leftStyle: '',
        rightStyle: ''
    },
    methods: {
        transformToDeg (percent) {
            let deg = 0
            if (percent >= 100) {
                deg = 360
            } else {
                deg = parseInt(360 * percent / 100)
            }
            return deg
        },
        transformToPercent (deg) {
            let percent = 0
            if (deg >= 360) {
                percent = 100
            } else {
                percent = parseInt(100 * deg / 360)
            }
            return percent
        },
        rotateLeft(deg) { // 大于180时，执行的动画
            this.setData({
                leftStyle: `transform:rotate(${deg - 180}deg)`
            })
        },
        rotateRight(deg) { // 小于180时，执行的动画
            this.setData({
                rightStyle: `transform:rotate(${deg}deg)`
            })
        },
        draw () {
            let deg = this.transformToDeg(this.data.percent)
            this.animationing = true
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.percent = this.transformToPercent(this.initDeg) // 百分比数据滚动动画
                if (deg > this.initDeg) { // 递增动画
                    this.initDeg += Number(this.speed)
                    if (this.initDeg >= 180) {
                        this.rotateLeft(this.initDeg)
                        this.rotateRight(180) // 为避免前后两次传入的百分比转换为度数后的值不为步距的整数，可能出现的左右转动不到位的情况。
                    } else {
                        this.rotateRight(this.initDeg)
                    }
                } else { // 递减动画
                    this.initDeg -= Number(this.speed)
                    if (this.initDeg >= 180) {
                        this.rotateLeft(this.initDeg)
                    } else {
                        this.rotateLeft(180) // 为避免前后两次传入的百分比转换为度数后的值不为步距的整数，可能出现的左右转动不到位的情况。
                        this.rotateRight(this.initDeg)
                    }
                }                
                const remainer = Number(deg) - this.initDeg
                if (Math.abs(remainer) <= this.speed) {
                    this.initDeg += remainer
                    if (this.initDeg > 180) {
                        this.rotateLeft(deg)
                    } else {
                        this.rotateRight(deg)
                    }
                    this.animationFinished()
                }
            }, 10)
        },
        animationFinished () {
            this.percent = this.data.precent // 百分比数据滚动动画
            this.animationing = false
            clearInterval(this.timer)
            this.timer = null
        }
    },
    created () {
        this.initDeg = 0
        this.speed = 2
        this.precent = 0
    }
})