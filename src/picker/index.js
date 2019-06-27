import area from '../data/area'
import { getYearsByStartDateAndEndDate,
    getMonthsByDate,
    getDaysByDate,
    convertToDate,
    MONTHS,
    getLastDay,
    getDaysRange,
    getMonthsRange
} from '../base/date'
let region = JSON.parse(JSON.stringify(area))
const CN = '86'
const REGION = 'region'
const DATE = 'date'
const DATETIME = 'datetime'

// 处理地区
let province = region[CN]
function mapToTree(areas) {
    if (!areas) return
    let areaData = []
    Object.keys(areas).forEach(code => {
        let area = {
            id: code,
            label: areas[code]
        }
        areaData.push(area)
        area.children = mapToTree(region[code])
        if (!area.children) delete area.children
    })
    return areaData
}

function arrayIsEqul (val1, val2) {
    if (val1.length !== val2.length) return false
    for (let i = 0; i < val1.length; ++i) {
        if (val1[i] !== val2[i]) return false
    }
    return true
}

Component({
    externalClasses: ['i-class', 'i-class-hd'],
    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        mode: {
            type: String // region date
        },
        range: {
            type: Array,
            default: [],
            observer (val) {
                if (this.data.mode !== REGION) {
                    this.init(val ? JSON.parse(JSON.stringify(val)) : [])
                }
            }
        },
        value: {
            type: [Array, String], // value为string时只对date或datetime有作用
            value: [],
            observer (val, old) {
                if (arrayIsEqul(val, old)) return
                if (this.mode !== DATE) this.handleValueChange(val)
            }
        },
        all: { // 是否包含全部
            type: Boolean,
            value: true
        },
        allText: {
            type: Boolean,
            value: '全部'
        },
        allKey: {
            type: [String, Number],
            value: -1
        },
        level: { // 后期自己弄层级
            type: Number,
            value: 3
        },
        title: {
            type: String,
            value: ''
        },
        changeOnSelect: {
            type: Boolean,
            value: false
        },
        immediate: {
            type: Boolean,
            value: true
        },
        // date相关
        start: {
            type: String,
            value: `${new Date().getFullYear() - 70}/02/01 00:00:00`
        },
        end: {
            type: String,
            value: `${new Date().getFullYear() + 20}/11/30 23:59:59`
        },
        fields: { // 对于date有效
            type: String,
            value: 'day' // day year month
        }
    },
  data: {
    data: [],
    refactedRange: [],
    values: [],
    lock: true
  },
  methods: {
    onPickerStart () {
        this.setData({
            lock: true
        })
    },
    onPickerEnd () {
        this.setData({
            lock: false
        })
    },
    handleChange (e) {
        let values = e.detail.value
        let changeIndex = this.getChangeIndex(values, this.data.values)
        if (this.data.mode !== DATE) {
            // 归零
            for (let i = changeIndex + 1; i < this.data.level; ++i) {
                values[i] = 0
            }
        }
        let data = this.data.data
        if (this.data.mode !== DATE) {
            for (let i = changeIndex; i < this.data.level - 1; ++i) {
                let item = data[i][values[i]]
                data[i + 1] = item.children
            }
        } else {
            let data = this.data.data
            let year = Number(data[0][values[0]].id)
            let month = Number(data[1][values[1]].id)
            let day = Number(data[2][values[2]].id)
            let currentDate = convertToDate(`${year}/${month}/${day}`)
            // 判断是否溢出
            let isOverflow = false
            if (month !== currentDate.getMonth() + 1) isOverflow = true
            if (year !== currentDate.getFullYear()) isOverflow = true
            if (day !== currentDate.getDate()) isOverflow = true
            if (isOverflow) {
                if (this.data.fields === 'day') currentDate = new Date(year, month, 0) // 当前月最后一天 month的前一个月也就是当前月份最后一天
            }
            if (currentDate < this.$start) currentDate = this.$start
            else if (currentDate > this.$end) currentDate = this.$end
            let months = []
            let days = []
            // 日期处理
            if (this.data.fields === 'day') {
                if (changeIndex === 2) return
                if (year === this.$start.getFullYear()){
                    months = getMonthsByDate(this.$start, true)
                    days = getDaysRange(currentDate)
                } else if (year === this.$end.getFullYear()) {
                    months = getMonthsByDate(this.$end, false)
                    days = getDaysRange(currentDate)
                } else {
                    months = getMonthsRange()
                    days = getDaysRange(currentDate)
                }
                // 修正月份索引
                if (month !== months[values[1]]) {
                    let index = months.findIndex(m => month === Number(m))
                    if (index !== -1) values[1] = index
                }
                data[1] = months.map(month => {
                    return {
                        id: month,
                        label: `${month}月`
                    }
                })
                data[2] = days.map(day => {
                    return {
                        id: day,
                        label: `${day}日`
                    }
                })
                this.setData({
                    data,
                    values
                })
            }
        }
        this.setData({
            data,
            values,
            lock: false
        }, () => {
            if (this.changeOnSelect) {
                this.emitChange(values)
            }
        })
    },
    /**
     * 获取变化的索引
     * @param {Number} val 
     * @param {Number} old 
     */
    getChangeIndex (val, old) {
        for (let i = 0; i < this.data.level; ++i) {
            if (val[i] !== old[i]) {
                return i
            }
        }
        return -1
    },
    getIndexByValue (data, values = []) {
        let indexs = []
        for (let i = 0; i < this.data.level; ++i) {
            let index = data[i].findIndex(v => v.id === values[i])
            indexs.push(index === -1 ? 0 : index)
        }
        return indexs
    },
    getValueByIndex (data, indexs = []) {
        // debugger
        let values = []
        for (let i = 0; i < this.data.level; ++i) {
            let index = indexs[i]
            values.push(data[i][index])
        }
        return {
            value: values.map(v => v.id),
            model: values,
            text: values.map(v => v.label)
        }
    },
    /**
     * @description 添加全部
     */
    refactorRange (list, deep = 1, parent = undefined) {
        if (!list) return
        if (this.data.all) {
            if (list.findIndex(item => item.id === this.data.allKey) === -1) {
                list.unshift({
                    id: this.data.allKey,
                    $pid: this.data.allKey,
                    label: this.data.allText,
                })
            }
        }
        list.forEach(item => {
            if (parent) {
                item.$pid = parent.id
            }
            if (deep < this.data.level && !item.children) {
                item.children = []
            }
            if (item.children) {
                this.refactorRange(item.children, deep + 1, item)
            }
        })
        return list
    },
    init (range) {
        // 重构原始数据
        let refactedRange = this.refactorRange(JSON.parse(JSON.stringify(range)))
        this.setData({
            refactedRange
        }, () => {
            this.createDataByValueAndRange(this.data.refactedRange, this.data.value).then((data) => {
                setTimeout(() => {
                    let valueIndex = this.getIndexByValue(this.data.data, this.data.value)
                    this.setData({
                        values: valueIndex,
                        lock: false
                    }, () => {
                        if (this.data.immediate) this.emitChange(valueIndex)
                    })
                }, 0)
            })
        })
    },
    getItemById (list, id) {
        if (!id || !list) return
        for (let i = 0; i < list.length; ++i) {
            let item = list[i]
            // TODO 自定名称
            if (item.id === id) {
                return {
                    target: item,
                    area: list
                }
            }
            else if (item.children) {
                let res = this.getItemById(item.children, id)
                if (res) return res
            }
        }
    },
    getFirstLevel (target) {
        let list = JSON.parse(JSON.stringify(target))
        return list
    },
    /**
     * @description 构造data
     */
    createDataByValueAndRange (range, values) {
        let diff = this.data.level - values.length
        // 补齐
        for (let i = 0; i < diff; ++i) values.push(this.data.all ? this.data.allKey : '')
        let data = [this.getFirstLevel(range)]
        for (let i = 0; i < this.data.level - 1; ++i) {
            let res = this.getItemById(range, values[i])
            if (res) {
                data.push(res.target.children)
            } else {
                data.push(data[i - 1] ? data[i - 1][0].children : data[0][0].children)
            }
        }
        return new Promise(resolve => {
            this.setData({
                data
            }, () => {
                resolve(this.data.data)
            }) 
        })
    },
    handleClickCancel () {
        this.triggerEvent('close')
    },
    handleConfirm () {
        if (this.data.lock) return
        this.emitChange(this.data.values)
        this.handleClickCancel()
    },
    handleValueChange () {
        if (this.data.refactedRange && this.data.refactedRange.length) this.init(this.data.refactedRange)
    },
    emitChange (indexs) {
        if (this.data.lock) return
        this.triggerEvent('change', this.getValueByIndex(this.data.data, indexs))
    },
    // 日期相关
    initDate () {
        let start = convertToDate(this.data.start)
        let end = convertToDate(this.data.end)
        if (start.getTime() > end.getTime()) {
            this.$start = end
            this.$end = start
        } else {
            this.$start = start
            this.$end = end
        }
        let data = []
        let years = getYearsByStartDateAndEndDate(this.$start, this.$end)
        let months = []
        // TODO time
        let days = []
        // 如果没有绑定value，今日存在那么选择今日，否则选择第一年
        let value = this.data.value
        let currentDate = !!value && typeof value === 'string' ? convertToDate(value) : this.$start
        let year = currentDate.getFullYear()
        // 判断当前日期是否为开始时间或截止时间
        if (year === this.$start.getFullYear()) {
            months = getMonthsByDate(this.$start, true)
            days = getDaysByDate(this.$start, true)
        } else if (year === this.$end.getFullYear()) {
            months = getMonthsByDate(this.$end, false)
            days = getDaysByDate(this.$end, false)
        } else {
            months = getMonthsRange()
            days = getDaysRange(currentDate)
        }
        // 转化为标准格式
        data = [years.map(year => {
            return {
                id: year,
                label: `${year}年`
            }
        }), months.map(month => {
            return {
                id: month,
                label: `${month}月`
            }
        }), days.map(day => {
            return {
                id: day,
                label: `${day}日`
            }
        })]
        this.setData({
            data
        })
    },
    getCurrentValueIndex () {}
  },
  attached () {
    if (this.data.mode === REGION) {
        this.setData({
            refactedRange: mapToTree(province)
        }, () => {
            this.init(this.data.refactedRange)
        })
    } else if (this.data.mode === DATE) {
        this.initDate()
    }
  }
})