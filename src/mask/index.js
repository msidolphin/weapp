// 需要重写

Component({
    properties: {
        mask: {
            type: Boolean,
            value: true
        },
        customStyle: {
            type: String,
            value: ''
        },
        show: {
            type: Boolean,
            value: false,
            observer (val) {
                this.setData({
                    visible: val
                })
            }
        }
    },
    data: {
        visible: false,
        isShow: false,
        zIndex: 1000
    },
    methods: {
        handleMaskClick () {
            let mask = this.selectComponent('#i-mask')
            if (mask) mask.leave()
            this.triggerEvent('close')
        },
        trigger (e) {
            let visible = e.detail
            if (!visible) {
                this.setData({
                    visible: false
                }, () => {
                    this.triggerEvent('closed', false)
                })
            }
        }
    }
})