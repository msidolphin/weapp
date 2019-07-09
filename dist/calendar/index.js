import CalendarMixins from '../mixins/calendar'

const defaults = {
    prefixCls: 'i-calendar',
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    weekendDays: [0, 6], // Sunday and Saturday
    multiple: false,
    dateFormat: 'yyyy-mm-dd',
    touchMove: true,
    animate: true,
    closeOnSelect: true,
    weekHeader: true,
    toolbar: true,
    value: [],
    onMonthAdd() {},
    onChange() {},
    onOpen() {},
    onClose() {},
    onDayClick() {},
    onMonthYearChangeStart() {},
    onMonthYearChangeEnd() {},
}

Component({
    behaviors: [CalendarMixins],
    properties: {
        direction: {
            type: String,
            value: 'horizontal' // or 'vertical'
        },
        fill: { // 是否在本月填充上一个月或下一个月的日期
            type: Boolean,
            value: true
        },
        lunar: { // 是否显示农历
            type: Boolean,
            value: true
        },
        firstDay: {
            type: Number,
            value: 0
        }, // First day of the week, Monday
        markers: { // 标记点
            type: Array,
            value: [],
            observer () {
                this.setMarkers(this.data.months, true)
            }
        },
        minDate: {
            type: [String, Number, Object],
            value: null
        },
        maxDate: {
            type: [String, Number, Object],
            value: null
        }
    },
    data: {
        ...defaults
    },
    methods: {
        /**
         * 打开日历
         * @param {Object} opts
         */
        open (opts = {}) {
            const options = this.merge(Object.assign({}, defaults, opts))

            this.monthsTranslate = 0
            this.isH = this.data.direction === 'horizontal'

            this.setData({ visible: true, ...options })
            this.init()
            this.setValue(options.value)

            if (typeof this.fns.onOpen === 'function') {
                this.fns.onOpen.call(this)
            }
        }
    },
    ready () {
        this.open()
    }
})
