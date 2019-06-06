Component({
    externalClasses: ['i-class'],

    properties: {
        span: {
            type: [Number, String],
            value: 4,
            observer () {
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
        }
    },
    
    data: {
        imgList: [],
        $span: '25'
    },

    methods: {
        setSpan () {
            this.setData({
                $span: ((1 / Number(this.data.span)) * 100).toFixed(2)
            })
        },
        viewImage (e) {
            wx.previewImage({
                urls: this.data.imgList,
                current: e.currentTarget.dataset.url
            })
        },
        chooseImage () {
            wx.chooseImage({
                count: this.data.limit - this.data.imgList.length, // 默认 4
                sizeType: this.data.sizeType, //可以指定是原图还是压缩图，默认二者都有
                sourceType: this.data.sourceType, //从相册选择
                success: (res) => {
                  if (this.data.imgList.length != 0) {
                    this.setData({
                      imgList: this.data.imgList.concat(res.tempFilePaths)
                    }, () => {
                        this.emitChange()
                    })
                  } else {
                    this.setData({
                      imgList: res.tempFilePaths
                    }, () => {
                        this.emitChange()
                    })
                  }
                }
            })
        },
        delImage (e) {
            this.data.imgList.splice(e.currentTarget.dataset.index, 1);
            this.setData({
                imgList: this.data.imgList
            }, () => {
                this.emitChange()
            })
        },
        emitChange () {
            this.triggerEvent('change', {value: this.data.imgList})
        },
        clear () {
            this.setData({
                imgList: []
            })
        }
    },
    
    attached () {
        this.setSpan()
    }
})