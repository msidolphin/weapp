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
        loading: false
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
            console.log(months)
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
