Component({
    externalClasses: ['i-class'],

    relations: {
        '../tab/index': {
            type: 'child',
            linked (target) {
                this.changeCurrent();
                if (target) this.data.items.push(target)
            },
            linkChanged () {
                this.changeCurrent();
            },
            unlinked () {
                this.changeCurrent();
            }
        }
    },

    properties: {
        current: {
            type: String,
            value: '',
            observer: 'changeCurrent'
        },
        color: {
            type: String,
            value: ''
        },
        scroll: {
            type: Boolean,
            value: false
        },
        fixed: {
            type: Boolean,
            value: false
        }
    },

    data: {
        items: [],
        width: 0, // tab宽度
        overflowMap: {}, // 溢出列表
        scrollLeft: 0
    },

    methods: {
        changeCurrent (val = this.data.current) {
            let items = this.getRelationNodes('../tab/index')
            const len = items.length
            if (len > 0) {
                items.forEach(item => {
                    item.changeScroll(this.data.scroll)
                    item.changeCurrent(item.data.key === val)
                    item.changeCurrentColor(this.data.color)
                })
            }
            // debugger
            if (this.data.scroll) {
                this._isOverflow()
            }
        },
        emitEvent (key) {
            this.triggerEvent('change', { key })
        },
        _init () {
            // 初始化
            if (this.data.scroll) this._initWidth()
        },
        _initWidth () {
            // 初始化宽度
            setTimeout(() => {
                Promise.all(this.data.items.map(item => item.getWidth())).then(() => {
                    const query = this.createSelectorQuery()
                    query.select('.i-tabs').boundingClientRect()
                    query.exec(res => {
                        this.setData({
                            width: res && res[0] ? res[0].width : 0
                        }, () => {
                            this._initOverflow()
                            this._isOverflow()
                        })
                    })
                })
            }, 20)
        },
        /**
         * @description 初始化溢出列表
         */
        _initOverflow () {
            let total = 0
            this.data.items.forEach(item => {
                total += item.data.width
                if (total + 60 > this.data.width) {
                    this.data.overflowMap[item.data.key] = {
                        left: total - this.data.width + 60
                    }
                }
            })
        },
        /**
         * @description 判断当前是否溢出
         */
        _isOverflow () {
            // debugger
            if (this.data.overflowMap[this.data.current]) {
                this.setData({
                    scrollLeft: this.data.overflowMap[this.data.current].left
                })
            } else {
                this.setData({
                    scrollLeft: 0
                })
            }
        }
    },

    ready () {
        this._init()
    }
})
