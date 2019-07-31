import rippleBehavior from '../mixins/ripple'

Component({
    behaviors: [rippleBehavior],

    externalClasses: ['i-class'],

    properties: {
        // default, primary, ghost, info, success, warning, error
        type: {
            type: String,
            value: '',
        },
        inline: {
            type: Boolean,
            value: false
        },
        // default, large, small
        size: {
            type: String,
            value: '',
        },
        // circle, square
        shape: {
            type: String,
            value: 'square'
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        loading: {
            type: Boolean,
            value: false,
        },
        long: {
            type: Boolean,
            value: false
        },
        openType: String,
        appParameter: String,
        hoverStopPropagation: Boolean,
        hoverStartTime: {
            type: Number,
            value: 20
        },
        hoverStayTime: {
            type: Number,
            value: 70
        },
        lang: {
            type: String,
            value: 'en'
        },
        sessionFrom: {
            type: String,
            value: ''
        },
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean
    },

    methods: {
        handleLongpress (e) {
            if (this.data.disabled || this.data.loading) return false
            this.$pushRipple(e)
            this.triggerEvent('long-press', e)
        },
        handleTap (e) {
            if (this.data.disabled || this.data.loading) return false
            this.$pushRipple(e)
            this.triggerEvent('click')
        },
        bindgetuserinfo({ detail = {} } = {}) {
            this.triggerEvent('getuserinfo', detail)
        },
        bindcontact({ detail = {} } = {}) {
            this.triggerEvent('contact', detail)
        },
        bindgetphonenumber({ detail = {} } = {}) {
            this.triggerEvent('getphonenumber', detail)
        },
        binderror({ detail = {} } = {}) {
            this.triggerEvent('error', detail)
        },
        bindopensetting ({ detail = {} } = {}) {
            this.triggerEvent('opensetting', detail)
        },
        bindlaunchapp ({ detail = {} } = {}) {
            this.triggerEvent('launchapp', detail)
        }
    }
})
