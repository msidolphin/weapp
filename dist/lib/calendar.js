import calendar from './calendarinit'

const defaults = {
    prefixCls: 'i-infinite-calendar',
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    weekendDays: [5, 6], // Sunday and Saturday
    dateFormat: 'yyyy-mm-dd',
    minDate: null,
    maxDate: null,
    lunar: true,
    firstDay: 1,
    weekHeader: true,
    value: []
}

export default Behavior({
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
            value: 1
        }, // First day of the week, Monday
    },
    data: {
        ...defaults,
    },
    methods: {
        /**
         * 设置星期
         */
        setWeekHeader() {
            const { weekHeader, firstDay, dayNamesShort, weekendDays } = this.data
            const weeks = []

            if (weekHeader) {
                for (let i = 0; i < 7; i++) {
                    const weekDayIndex = (i + firstDay > 6) ? (i - 7 + firstDay) : (i + firstDay)
                    const dayName = dayNamesShort[weekDayIndex]
                    const weekend = weekendDays.indexOf(weekDayIndex) >= 0

                    weeks.push({
                        weekend,
                        dayName,
                    })
                }
            }

            return weeks
        },
        /**
         * 判断日期是否存在
         */
        daysInMonth(date) {
            const d = new Date(date)
            return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
        },
        /**
         * 设置月份数据
         */
        monthHTML(date, offset) {
            // debugger
            date = new Date(date)
            let year = date.getFullYear(),
                month = date.getMonth(),
                time = date.getTime()

            const monthHTML = {
                year,
                month,
                time,
                items: [],
            }

            if (offset === `next`) {
                if (month === 11) date = new Date(year + 1, 0)
                else date = new Date(year, month + 1, 1)
            }

            if (offset === `prev`) {
                if (month === 0) date = new Date(year - 1, 11)
                else date = new Date(year, month - 1, 1)
            }

            if (offset === `next` || offset === `prev`) {
                month = date.getMonth()
                year = date.getFullYear()
                time = date.getTime()
            }

            let daysInPrevMonth = this.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
                daysInMonth = this.daysInMonth(date),
                firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay()
            if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7 // 周日
            // 判断是否固定高度
            let remain = daysInMonth % 7 // 剩余天数
            let rows = Math.ceil(daysInMonth / 7)
            if (firstDayOfMonthIndex - 1 > 6 - remain + 1 || remain === 0 && firstDayOfMonthIndex !== 1) rows += 1
            let height = rows * 51 // 51单行高度

            let dayDate, currentValues = [],
                cols = 7,
                dayIndex = 0 + (this.data.firstDay - 1),
                today = new Date().setHours(0, 0, 0, 0),
                minDate = this.data.minDate ? new Date(this.data.minDate).getTime() : null,
                maxDate = this.data.maxDate ? new Date(this.data.maxDate).getTime() : null

            if (this.data.value && this.data.value.length) {
                for (let i = 0; i < this.data.value.length; i++) {
                    currentValues.push(new Date(this.data.value[i]).setHours(0, 0, 0, 0))
                }
            }

            // 本月中是否存在上一月或下一个的日期
            let hasNextMonth = false
            let hasPrevMonth = false

            for (let i = 1; i <= rows; i++) {
                let rowHTML = []
                let row = i

                for (let j = 1; j <= cols; j++) {
                    let col = j
                    dayIndex++
                    let dayNumber = dayIndex - firstDayOfMonthIndex
                    let type = {}

                    if (dayNumber < 0) {
                        if (this.data.fill) {
                            // prev month
                            if (!hasNextMonth) hasNextMonth = true
                            dayNumber = daysInPrevMonth + dayNumber + 1
                            type.prev = true
                            dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime()
                        } else {
                            type.empty = true
                        }
                    } else {
                        dayNumber = dayNumber + 1
                        if (dayNumber > daysInMonth) {
                            if (this.data.fill) {
                                // next month
                                if (!hasPrevMonth) hasPrevMonth = true
                                dayNumber = dayNumber - daysInMonth
                                type.next = true
                                dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime()
                            } else {
                                type.empty = true
                            } 
                        } else {
                            dayDate = new Date(year, month, dayNumber).getTime()
                            if (dayNumber === 1) type.first = true
                            if (col === 1) type.first = true
                            if (dayNumber === daysInMonth) type.last = true
                            if (col === 7) type.last = true

                        }
                    }

                    if (!type.empty) {
                        // Today
                        if (dayDate === today) type.today = true

                        // Selected
                        if (currentValues.indexOf(dayDate) >= 0) type.selected = true

                        // Weekend
                        if (this.data.weekendDays.indexOf(col - 1) >= 0) {
                            type.weekend = true
                        }

                        // Disabled
                        if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
                            type.disabled = true
                        }

                        dayDate = new Date(dayDate)
                        const dayYear = dayDate.getFullYear()
                        const dayMonth = dayDate.getMonth()

                        // 农历
                        let lunar = {}
                        lunar = this.data.lunar ? calendar.solar2lunar(dayYear, dayMonth + 1, dayNumber) : {}
                        rowHTML.push({
                            type,
                            year: dayYear,
                            lunar,
                            empty: false,
                            month: dayMonth,
                            day: dayNumber,
                            datetime: dayDate.getTime(),
                            date: `${dayYear}-${dayMonth + 1}-${dayNumber}`,
                        })
                    } else {
                        rowHTML.push({
                            type,
                            date: '',
                            empty: true,
                            day: '',
                            year: '',
                            month: '',
                            datetime: '',
                            lunar: {}
                        })
                    }
                }

                monthHTML.year = year
                monthHTML.height = height
                monthHTML.month = month
                monthHTML.time = time
                monthHTML.prev = hasPrevMonth
                monthHTML.next = hasNextMonth
                monthHTML.yearMonth = `${year}年${month + 1 < 10 ? '0' + (month + 1) : month + 1}月`

                monthHTML.items.push(rowHTML)
            }

            return monthHTML
        },
        /**
         * 格式化日期
         */
        formatDate(date) {
            date = new Date(date)
            const year = date.getFullYear()
            const month = date.getMonth()
            const month1 = month + 1
            const day = date.getDate()
            const weekDay = date.getDay()

            return this.data.dateFormat
                .replace(/yyyy/g, year)
                .replace(/yy/g, (year + '').substring(2))
                .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
                .replace(/m/g, month1)
                .replace(/MM/g, this.data.monthNames[month])
                .replace(/M/g, this.data.monthNamesShort[month])
                .replace(/dd/g, day < 10 ? '0' + day : day)
                .replace(/d/g, day)
                .replace(/DD/g, this.data.dayNames[weekDay])
                .replace(/D/g, this.data.dayNamesShort[weekDay])
        },
        noop() {},
    }
})