let id = 0

Component({
    externalClasses: ['i-class'],

    relations: {
        '../grid-item/index': {
            type: 'child',
            linked () {
                this.setGridItemWidth();
            },
            linkChanged () {
                this.setGridItemWidth();
            },
            unlinked () {
                this.setGridItemWidth();
            }
        }
    },

    properties: {

        data: { // 传入的菜单数据
            type: Array,
            value: []
        },
        column: { // 每行列数
            type: Number,
            value: 3
        },
        maxRow: { // 最大行数
            type: Number,
            value: 3
        },
        bordered: { // 是否有边框
            type: Boolean,
            value: false
        },
        swiper: { // 是否轮播
            type: Boolean,
            value: false
        },
        props: {
            type: Object,
            value: {}
        }

    },

    data: {
        itemWidth: 33.3,
        _data: [],
        defaultProps: {
            key: 'id',
            text: 'text',
            icon: 'icon',
            num: 'num'
        },
        isSwiper: false,
        swiperHeight: 0,
        id: ++id,
        row: 0
    },

    methods: {
        // 计算轮播数
        // 计算每个item的宽度
        _initData () {
            let row = 0 // 统计总行数
            this.setData({
                _data: this.data.data,
                itemWidth: 1 / this.data.column
            })
            // 判断是否轮播且数量大于最大显示数
            let size = this.data.column * this.data.maxRow
            let isSwiper = this.data.swiper && (this.data._data.length > size)
            if (isSwiper) {
                let tmpData = []
                for (let i = 0; i < this.data._data.length; i += size) {
                    tmpData.push(this.data._data.slice(i, i + size))
                }
                this.setData({
                    _data: tmpData
                })
            }
            let tmpData = []
            if (isSwiper) {
                for (let i = 0; i < this.data._data.length; ++i) {
                    let tmp = []
                    let data = this.data._data[i]
                    for (let j = 0; j < data.length; j += this.data.column) {
                        tmp.push(data.slice(j, j + this.data.column))
                    }
                    tmpData.push(tmp)
                }
                 // 补充最后一行空的节点
                let lastIndex = tmpData.length - 1
                let diff = this.data.column - tmpData[lastIndex][tmpData[lastIndex].length - 1].length
                for (let i = 0; i < diff; ++i) {
                    tmpData[lastIndex][tmpData[lastIndex].length - 1].push({})
                }
                // 补充空行
                let diffRow = this.data.maxRow - tmpData[lastIndex].length
                for (let i = 0; i < diffRow; ++i) {
                    tmpData[lastIndex].push(new Array(this.data.column))
                }
                row = this.data.maxRow
            } else {
                for (let i = 0; i < this.data._data.length; i += this.data.column) {
                    tmpData.push(this.data._data.slice(i, i + this.data.column))
                    ++row
                }
                // 补充空的节点
                let lastIndex = tmpData.length - 1
                let diff = this.data.column - tmpData[tmpData.length - 1].length
                for (let i = 0; i < diff; ++i) {
                    tmpData[lastIndex].push({})
                }
            }
            this.setData({
                _data: tmpData,
                isSwiper,
                row
            })
        },
        _initSwiper () {
            const query = wx.createSelectorQuery().in(this)
            query.select('.i-grid-col').boundingClientRect()
            query.exec(res => {
                if (res && res[0]) {
                    this.setData({
                        swiperHeight: this.data.bordered ? this.data.row * res[0].height + 1 : this.data.row * res[0].height
                    })
                }
            })
        }
    },

    attached () {
        this._initData()
        // this.setGridItemWidth();
    },

    ready () {
        this._initSwiper()
    }
});
