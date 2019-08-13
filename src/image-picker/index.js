const defaultFieldNames = {
    url: 'url',
    value: 'id'
}

function isPlainObject(target) {
    return Object.prototype.toString.call(target) === '[object Object]' && Object.getPrototypeOf(target) === Object.prototype
}

Component({
    externalClasses: ['i-class'],

    properties: {
        span: {
            type: [Number, String],
            value: 4,
            observer() {
                this.setSpan()
            }
        },
        limit: {
            type: Number,
            value: 4
        },
        sizeType: {
            type: Array,
            value: ['original', 'compressed']
        },
        sourceType: {
            type: Array,
            value: ['album', 'camera']
        },
        backgroundColor: {
            type: String,
            value: '#fff'
        },
        iconType: {
            type: String,
            value: 'camera'
        },
        iconSize: {
            type: Number,
            value: 32
        },
        iconColor: {
            type: String,
            value: '#80848f'
        },
        object: {
            type: Boolean,
            value: false
        },
        defaultList: {
            type: Array,
            value: [],
            observer(val) {
                if (val) {
                    this.setData({
                        imgList: JSON.parse(JSON.stringify(val))
                    })
                }
            }
        },
        props: {
            type: Object,
            value: {}
        }
    },

    data: {
        imgList: [],
        isObject: {},
        $span: '25'
    },

    methods: {
        setSpan() {
            this.setData({
                $span: ((1 / Number(this.data.span)) * 100).toFixed(2)
            })
        },
        viewImage(e) {
            wx.previewImage({
                urls: this.data.object ? this.data.imgList.map(f => f[this.data.fieldNames.url]) : this.data.imgList,
                current: e.currentTarget.dataset.url
            })
        },
        chooseImage() {
            wx.chooseImage({
                count: this.data.limit - this.data.imgList.length, // 默认 4
                sizeType: this.data.sizeType, //可以指定是原图还是压缩图，默认二者都有
                sourceType: this.data.sourceType, //从相册选择
                success: (res) => {
                    let files = res.tempFilePaths
                    if (this.data.object) {
                        files = files.map(f => {
                            return {
                                [this.data.fieldNames.value]: '',
                                [this.data.fieldNames.url]: f
                            }
                        })
                    }
                    if (this.data.imgList.length != 0) {
                        this.setData({
                            imgList: this.data.imgList.concat(files)
                        }, () => {
                            this.emitChange()
                        })
                    } else {
                        this.setData({
                            imgList: files
                        }, () => {
                            this.emitChange()
                        })
                    }
                }
            })
        },
        delImage(e) {
            this.data.imgList.splice(e.currentTarget.dataset.index, 1);
            this.setData({
                imgList: this.data.imgList
            }, () => {
                this.emitChange()
            })
        },
        emitChange() {
            this.triggerEvent('change', { value: this.data.imgList })
        },
        clear() {
            this.setData({
                imgList: []
            })
        }
    },

    attached() {
        this.setData({
            fieldNames: Object.assign({}, defaultFieldNames, this.data.props)
        })
        this.setSpan()
    }
})