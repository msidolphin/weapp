Page({
    data: {
        scrollTop: 0
    },
    handleClick () {

    },
    show () {
        let drawer = this.selectComponent('#drawer')
        drawer.show()
    },
    hide () {
        let drawer = this.selectComponent('#drawer')
        drawer.hide()
    },
    onPageScroll (e) {
        if (this.data.scrollTop < e.scrollTop) {
            // 向下滚动 隐藏
            this.hide()
        } else {
            // 向上滚动 显示
            this.show()
        }
        this.setData({
            scrollTop: e.scrollTop
        })
    }
});