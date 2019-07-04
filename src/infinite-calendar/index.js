import Calendar from '../lib/calendar'

const HEADER_HEIGHT = 95

Component({
    externalClasses: ['i-class'],

    behaviors: [Calendar],

    properties: {
        fill: {
            type: Boolean,
            value: false
        }
    },

    data: {
        months: [],
        weeks: [],
        scrollTop: 0,
        height: 0,
        loading: false,
        startDate: null,
        endDate: null
    },
    methods: {
        initWeeks () {
            let weeks = this.setWeekHeader()
            this.setData({
                weeks
            })
        },
        /**
         * 生成近三个月的数据
         */
        initMonths () {
            let now = new Date()
            let currentMonth = now.getMonth()
            let months = []
            let currentMonths = this.monthHTML(new Date(now.getFullYear(), currentMonth, 1))
            let lastMonths = this.monthHTML(new Date(now.getFullYear(), currentMonth - 1, 1))
            let lastTwoMonths =  this.monthHTML(new Date(now.getFullYear(), currentMonth - 2, 1))
            this.lastMonth = currentMonth - 2
            this.year = now.getFullYear()
            months.push(lastTwoMonths, lastMonths, currentMonths)
            this.setData({
                months
            })
        },
        onScroll (e) {
            if (this.scrollTop === undefined) this.scrollTop = e.detail.scrollTop
            else {
                this.scrollTop += e.detail.scrollTop
            }
        },

        /**
         * 到达顶部加载更多
         */
        onScrollToUpper (e) {
            if (this.data.months.length + 3 >= 81) {
                this.setData({
                    isLast: true
                })
                return // 防止溢出
            }
            if (this.data.loading) return
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
            this.scrollTop = 0
            this.loading = true
            this.setData({
                loading: true
            })
            this.timer = setTimeout(() => {
                let months = this.data.months
                let month
                let totalHeight = 0
                for (let i = 1; i <= 3; ++i) {
                    month = this.lastMonth - i
                    let prevMonth = this.monthHTML(new Date(this.year, month, 1))
                    totalHeight += prevMonth.height + 62
                    months.unshift(prevMonth)
                }
                this.lastMonth = month
                this.setData({
                    months,
                    loading: false,
                    scrollTop: totalHeight
                })
            }, 1000)
        },
        /**
         * @description 点击日期
         */
        onDayClick (e) {
            if (e.currentTarget.dataset.empty) return
            const dataset = e.currentTarget.dataset
            const date = dataset.date
            const datetime = dataset.datetime
            const type = dataset.type
            if (type.disabled) return
            let startDate = this.data.startDate
            let endDate = this.data.endDate
            let d = {
                date: this.formatDate(date.replace(/-/g, '/')),
                datetime
            }
            if (startDate && !endDate && startDate.datetime === datetime) {
                startDate = null
            } else if (endDate && !startDate && endDate.datetime === datetime) {
                endDate = null
            } else if (!startDate) {
                startDate = d
            } else if (startDate && !endDate) {
                endDate = d
            } else if (startDate && endDate && (startDate.datetime === datetime || endDate.datetime === datetime)) {
                // 若选中的时间等于起始时间或结束时间，那么结束时间置空，并设置起始时间
                if (startDate.datetime === datetime) {
                    startDate = endDate
                    endDate = null
                } else {
                    endDate = null
                }
                
            } else {
                // 如果起始时间和结束时间都选择，那么情况当前时间并设置为起始时间
                startDate = d
                endDate = null
            }      
            // 若结束时间小于起始时间，进行交换
            if (startDate && endDate && endDate.datetime < startDate.datetime) {
                let t = endDate
                endDate = startDate
                startDate = t
            }
            this.setData({
                startDate,
                endDate
            })
        }
    },
    attached () {
        let res = wx.getSystemInfoSync()
        this.setData({
            height: res.windowHeight - HEADER_HEIGHT
        })
        this.initWeeks()
        this.initMonths()
    },
    ready () {
        this.setData({
            scrollTop: 10000000
        })
    }
})
