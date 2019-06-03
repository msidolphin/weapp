const minAlpha = 0
const maxAlpha = 0.3

Component({
    data: {
        height: 500, // 限制高度 单位像素 需要转化为rpx
        bottom: 100, // 距离底部100像素
        maxY: 330, // 最大top值 要计算得到
        speed: 1.25,
        startY: 0, // 移动开始点
        endY: -100, // 移动结束点
        y: -100, // 移动起始位置
        scrollViewStyle: '',
        styles: 'transform: translateY(-100px)',
        // mask
        opacity: '',
        maskStyle: 'background: rgba(0, 0, 0, 0)',
        showMask: false
    },
    methods: {
        onTouchStart (e) {
            console.log(e)
            let touches = e.touches[0]
            this.setData({
                startY: touches.pageY
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
                styles: `transform: translateY(${endY}px)`,
                endY: endY,
                maskStyle: `background: rgba(0, 0, 0, ${opacity})`,
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
            console.log('reached bottom')
        },
        onMaskTap () {
            // let startY = this.data.endY
            // let once = startY / 300
            // let timer = setInterval(() => {
            //     let endY = this.data.endY - once
            //     if (endY >= -this.data.bottom) {
            //         endY = -this.data.bottom
            //         clearInterval(timer)
            //         this.setData({
            //             y: endY
            //         })
            //     }
            //     let k = (maxAlpha - minAlpha) / this.data.maxY
            //     let opacity = minAlpha + k * (Math.abs(endY) - 0)
            //     this.setData({
            //         styles: `transform: translateY(${endY}px)`,
            //         endY: endY,
            //         maskStyle: `background: rgba(0, 0, 0, ${opacity})`,
            //         showMask: endY !== -this.data.bottom
            //     })
            // }, 1)
        }
    },
    attached () {
        wx.getSystemInfo({
            success: (res) => {
                let windowHeight = res.windowHeight
                // 固定高
                let height = this.data.height <= windowHeight ? this.data.height : windowHeight
                this.setData({
                    maxY:  height,
                    scrollViewStyle: `height: ${height - 30}px;` // 减去头部的高度
                })
                // 动态高
                // setTimeout(() => {
                //     const query = this.createSelectorQuery()
                //     query.select('.bottom-drawer').boundingClientRect()
                //     query.exec(res => {
                //         if (res && res[0]) {
                //             console.log(res[0].height)
                //             let height = res[0].height < windowHeight ? res[0].height : windowHeight
                //             this.setData({
                //                 maxY:  height,
                //                 scrollViewStyle: `height: ${height - 30}px;`,
                //             })
                //         }
                //     })
                // }, 0)
            }
        })
    }
})
