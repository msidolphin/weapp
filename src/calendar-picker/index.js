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
    placeholder: '请选择日期',
    touchMove: true,
    animate: true,
    closeOnSelect: false,
    weekHeader: true,
    toolbar: true,
    value: [new Date().getTime()],
    direction: 'vertical', // or 'horizontal',
    fill: true, // 是否在本月填充上一个月或下一个月的日期,
    lunar: true, // 是否显示农历,
    firstDay: 0, // First day of the week, Monday
    markers: [],
    minDate: null,
    maxDate: null,
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
    data: {
        ...defaults,
        visible: false
    },
    methods: {
        initOptions (opts = {}) {
            const options = this.merge(Object.assign({}, defaults, opts))
            this.isH = this.data.direction === 'horizontal'
            if (options.value && !Array.isArray(options.value)) options.value = [options.value]
            this.setData({ ...options })
            if (options.value) {
                // 允许open时设置默认值
                this.setValue(options.value)
            }
        },
        initData (options = {}) {
            this.monthsTranslate = 0
            this.initOptions(options)
            this.init()
        },
        onConfirm () {
            if (typeof this.fns.onChange === 'function') {
                this.fns.onChange.call(this, this.multiple ? this.data.currentValues : this.data.currentValues[0], this.data.multiple ? this.data.formatValue : this.data.formatValue[0])
            }
            this.close()
        },
        /**
         * 打开日历
         * @param {Object} opts
         */
        open () {
            this.setData({ visible: true })
            if (typeof this.fns.onOpen === 'function') {
                this.fns.onOpen.call(this)
            }
        },
        handleClickMask () {
            this.setData({
                visible: false
            })
        }
    }
})