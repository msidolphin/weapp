import CalendarMixins from '../mixins/calendar'
import { convertToDate } from '../base/date'

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
    value: [],
    range: false,
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
    onMonthChange () {},
    onDayClick() {},
    onMonthYearChangeStart() {},
    onMonthYearChangeEnd() {},
}


Component({
    behaviors: [CalendarMixins],
    data: {
        ...defaults,
        visible: false,
        startDate: '',
        endDate: ''
    },
    methods: {
        initOptions (opts = {}) {
            const options = this.merge(Object.assign({}, this.data, opts))
            this.isH = this.data.direction === 'horizontal'
            if (options.value && !Array.isArray(options.value)) options.value = [options.value]
            this.setData({ ...options })
            if (options.range) {
                this.initRange()
            }
            if (!options.range && options.value) {
                // 允许open时设置默认值
                this.setValue(options.value)
            }
            this.updateView()
        },
        initData (options = {}) {
            this.monthsTranslate = 0
            this.initOptions(options)
            // TODO 如果是范围选择，那么初始化的年月应该未开始时间的年月
            this.init()
        },
        /**
         * @description 初始化范围
         */
        initRange () {
            let value = this.data.value
            if (value) {
                let [startDate, endDate] = value
                if (startDate && endDate) {
                    let startDate = convertToDate(startDate)
                    let endDate = convertToDate(endDate)
                    // TODO 是否可以相等
                    if (startDate > endDate) {
                        let t = endDate
                        endDate = startDate
                        startDate = t
                    }
                    let formatStart = startDate ? this.formatDate(startDate) : ''
                    let formatEnd = endDate ? this.formatDate(endDate) : ''
                    this.setData({
                        startDate: startDate.getTime(),
                        endDate: endDate.getTime(),
                        formatValue: `${formatStart && formatEnd ? formatStart + ' - ' : formatStart}${formatEnd}`
                    })
                }
            }
        },
        onConfirm () {
            // 范围选择必须选择开始和结束
            if (this.data.range && (!this.data.startDate || !this.data.endDate)) return
            if (typeof this.fns.onChange === 'function') {
                let values = this.multiple ? this.data.currentValues : this.data.currentValues[0]
                if (this.data.range) values = [this.formatDate(this.data.startDate), this.formatDate(this.data.endDate)]
                this.fns.onChange.call(this, values, this.data.multiple || this.data.range ? this.data.formatValue : this.data.formatValue[0])
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