Component({
    externalClasses: ['i-class-content', 'i-class-title', 'i-class'],

    relations: {
        '../collapse/index': {
            type: 'parent',
            linked: function (target) {
                const options = {
                    accordion: target.data.accordion
                }
                this.setData(options)
            }
        }
    },

    properties: {
        title: String,
        name: String,
        label: String,
        extra: String,
        collapse: { // 初始化是否展开
            type: Boolean,
            value: true,
            observer: '_collapseChange'
        },
        collapsable: {
            type: Boolean,
            value: true
        },
        cell: {
            type: Boolean,
            value: false
        }
    },

    data: {
        accordion: false,
        height: 0, // 内容高度
        isCollapse: true,
        contentHeight: 0,
        isLastCell: true
    },

    options: {
        multipleSlots: true
    },

    methods: {
        trigger () {
            if (!this.data.collapsable) return
            this.setData({
                isCollapse: !this.data.isCollapse
            }, () => {
                this._handleCollapse()
                if (!this.data.isCollapse && this.data.accordion) {
                    let parent = this.getRelationNodes('../collapse/index')[0]
                    if (parent) parent.accordionHandle(this)
                }
            })
        },
        _init () {
            this.setData({
                isCollapse: this.data.collapse
            })
            this._initHeight()
        },
        _initHeight () {
            this.createSelectorQuery()
            .select('.i-cell-collapse-content')
            .boundingClientRect()
            .exec(res => {
                if (res && res[0]) {
                    this.setData({
                        contentHeight: res[0].height
                    }, () => {
                        this._handleCollapse()
                    })
                }
            })
        },
        _collapseChange (val) {
            this.setData({
                isCollapse: val
            }, () => {
                this._initHeight()
            })
        },
        _handleCollapse () {
            if (this.data.isCollapse) {
                this.setData({
                    height: 0
                })
            } else {
                this.setData({
                    height: this.data.contentHeight
                })
            }
        },
        updateIsLastCell (isLastCell) {
            this.setData({ isLastCell })
        },
        close () {
            this.setData({
                isCollapse: true
            }, () => {
                this._handleCollapse()
            })
        },
        open () {
            this.setData({
                isCollapse: false
            }, () => {
                this._handleCollapse()
            })
        }
    },

    ready () {
        this._init()
    }
})

