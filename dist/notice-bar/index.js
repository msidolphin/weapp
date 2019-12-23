const VALID_MODE = ['closeable'];
const FONT_COLOR = '#f60';
const BG_COLOR = '#fff7cc';

Component({
    externalClasses: ['i-class'],

    properties: {
        closable: {
            type: Boolean,
            value: false
        },
        icon: {
            type: String,
            value: ''
        },
        loop: {
            type: Boolean,
            value: false
        },
        // 背景颜色
        backgroundcolor: {
            type: String,
            value: '#fefcec'
        },
        // 字体及图标颜色
        color: {
            type: String,
            value: '#f76a24'
        },
        speed: {
            type: String,
            value: '6s'
        },
        content: {
            type: String,
            value: ''
        }
    },

    data: {
        show: true
    },
    methods: {
        handleClose() {
            this.setData({
                show: false
            })
        }
    }
})
