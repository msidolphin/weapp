Component({
    properties: {
        direction: {
            type: String,
            value: ''
        },
        visible: {
            type: Boolean,
            value: false,
            observer (val) {
                this.setData({
                    show: val
                })
            }
        },
        transition: {
            type: String,
            value: 'fade'
        },
        zIndex: {
            type: Number,
            value: 1000
        }
    },
    data: {
        _zIndex: 1000,
        show: false
    },
    methods: {
        close () {
            setTimeout(() => {
                this.setData({
                    show: false
                })
                this.triggerEvent('close')
            }, 100)
        }
    }
})
