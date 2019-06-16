Component({
    externalClasses: ['i-class', 'i-class-mask', 'i-class-header'],

    options: {
        multipleSlots: true
    },

    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        maskClosable: {
            type: Boolean,
            value: true
        },
        showCancel: {
            type: Boolean,
            value: false
        },
        cancelText: {
            type: String,
            value: '取消'
        },
        actions: {
            type: Array,
            value: []
        },
        theme: {
            type: String,
            value: 'ios'
        }
    },

    data: {
        hasHeader: false // 判断是否存在header
    },

    methods: {
        handleClickMask () {
            // if (!this.data.maskClosable) return
            this.handleClickCancel()
        },

        handleClickItem ({ currentTarget = {} }) {
            const dataset = currentTarget.dataset || {}
            const { index } = dataset
            this.triggerEvent('click', { index })
        },

        handleClickCancel () {
            this.triggerEvent('cancel')
        }
    },

    ready () {
        this.createSelectorQuery().select('.i-as-header')
        .boundingClientRect()
        .exec(res => {
            if (res && res[0]) {
                this.setData({
                    hasHeader: res[0].height > 0
                })
            }
        })
    }

})
