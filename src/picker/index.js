import area from '../data/area'
import { getYearsByStartDateAndEndDate,
    convertToDate,
    getRangeByStartAndEnd
} from '../base/date'
import { isDate } from '../base/utils'
let region = JSON.parse(JSON.stringify(area))
const CN = '86'
const REGION = 'region'
const DATE = 'date'

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

function hasYear (fields) {
    return fields === 'year' || fields === 'month' || fields === 'day' || fields === 'hour' || fields === 'minute' || fields === 'second'
}

function hasMonth (fields) {
    return fields === 'month' || fields === 'day' || fields === 'hour' || fields === 'minute' || fields === 'second'
}

function hasDay (fields) {
    return fields === 'day' || fields === 'hour' || fields === 'minute' || fields === 'second'
}

function hasHour (fields) {
    return fields === 'hour' || fields === 'minute' || fields === 'second'
}

function hasMinute (fields) {
    return fields === 'minute' || fields === 'second'
}

function hasSecond (fields) {
    return fields === 'second'
}

function genValues (date, fields) {
    let values = []
    if (!date) return values
    if (hasYear(fields)) {
        values.push(String(date.getFullYear()))
    }
    if (hasMonth(fields)) {
        let month = date.getMonth() + 1
        if (month < 10) month = '0' + month
        else month = String(month)
        values.push(month)
    }
    if (hasDay(fields)) {
        let day = date.getDate()
        if (day < 10) day = '0' + day
        else day = String(day)
        values.push(day)
    }
    if (hasHour(fields)) {
        let hour = date.getHours()
        if (hour < 10) hour = '0' + hour
        else hour = String(hour)
        values.push(hour)
    }
    if (hasMinute(fields)) {
        let minute = date.getMinutes()
        if (minute < 10) minute = '0' + minute
        else minute = String(minute)
        values.push(minute)
    }
    if (hasSecond(fields)) {
        let second = date.getSeconds()
        if (second < 10) second = '0' + second
        else second = String(second)
        values.push(second)
    }
    return values
}

const DATE_INDEX_MAP = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5
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
            type: [Array, String, Object], // value为string时只对date或datetime有作用
            value: [],
            observer (val, old) {
                if (val === old) return
                if (this.data.mode !== DATE) {
                    if (arrayIsEqul(val, old)) return
                    this.handleValueChange(val)
                } else {
                    if (this.data.data) this.onDateChange()
                }
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
        // date相关
        start: {
            type: [String, Number],
            value: `${new Date().getFullYear() - 70}/02/01 00:00:00`,
            observer () {
                this.initDate()
            }
        },
        end: {
            type: [String, Number],
            value: `${new Date().getFullYear() + 20}/11/30 23:59:59`,
            observer () {
                this.initDate()
            }
        },
        fields: { // 对于date有效
            type: String,
            value: 'day' // day year month
        },
        dateFormat: {
            type: String,
            value: 'yyyy-mm-dd'
        }
    },
  data: {
    data: [],
    refactedRange: [],
    values: [],
    lock: false
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
    getDateData (years, months, days, hours, minutes, seconds) {
        let data = []
        if (!years) {
            if (!this.$start || !this.$end) {
                this.initStartAndEnd()
            }
            years = getYearsByStartDateAndEndDate(this.$start, this.$end)
        }
        if (hasYear(this.data.fields)) {
            data.push(years.map(year => {
                return {
                    id: year,
                    label: `${year}年`
                }
            }))
        }
        if (hasMonth(this.data.fields)) {
            data.push(months.map(month => {
                return {
                    id: month,
                    label: `${month}月`
                }
            }))
        }
        if (hasDay(this.data.fields)) {
            data.push(days.map(day => {
                return {
                    id: day,
                    label: `${day}日`
                }
            }))
        }
        if (hasHour(this.data.fields)) {
            data.push(hours.map(hour => {
                return {
                    id: hour,
                    label: `${hour}时`
                }
            }))
        }
        if (hasMinute(this.data.fields)) {
            data.push(minutes.map(minute => {
                return {
                    id: minute,
                    label: `${minute}分`
                }
            }))
        }
        if (hasSecond(this.data.fields)) {
            data.push(seconds.map(second => {
                return {
                    id: second,
                    label: `${second}秒`
                }
            }))
        }
        return data
    },
    handleChange (e) {
        if (this.isChanging) return // 如果是因为外部因素改变，不需要执行回调
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
            let oldData = this.data.data
            let year = hasYear(this.data.fields) ? Number(oldData[0][values[0]].id) : this.$start.getFullYear()
            let month = hasMonth(this.data.fields) ? Number(oldData[1][values[1]].id) : 1
            let day = hasDay(this.data.fields) ? Number(oldData[2][values[2]].id) : 1
            let hour = hasHour(this.data.fields) ? Number(oldData[3][values[3]].id) : 0
            let minute = hasMinute(this.data.fields) ? Number(oldData[4][values[4]].id) : 0
            let second = hasSecond(this.data.fields) ? Number(oldData[5][values[5]].id) : 0
            let currentDate = convertToDate(`${year}/${month}/${day} ${hour}:${minute}:${second}`)
            // 判断是否溢出
            let isOverflow = false
            if (month !== currentDate.getMonth() + 1) isOverflow = true
            if (year !== currentDate.getFullYear()) isOverflow = true
            if (day !== currentDate.getDate()) isOverflow = true
            if (hour !== currentDate.getHours()) isOverflow = true
            if (minute !== currentDate.getMinutes()) isOverflow = true
            if (second !== currentDate.getSeconds()) isOverflow = true

            if (isOverflow) {
                if (this.data.fields === 'day') currentDate = new Date(year, month, 0) // 当前月最后一天 month的前一个月也就是当前月份最后一天
                if (this.data.fields === 'hour') currentDate = new Date(year, month, 0, 23)
                if (this.data.fields === 'minute') currentDate = new Date(year, month, 0, 23, 59)
                if (this.data.fields === 'second') currentDate = new Date(year, month, 0, 23, 59, 59)
            }

            if (currentDate < this.$start) currentDate = this.$start
            else if (currentDate > this.$end) currentDate = this.$end
            this.currentDate = currentDate
            let {years, months, days, hours, minutes, seconds} = getRangeByStartAndEnd(this.$start, this.$end, this.currentDate)
            let currentValues = [
                {value: year, values: years},
                {value: month, values: months},
                {value: day, values: days},
                {value: hour, values: hours},
                {value: minute, values: minutes},
                {value: second, values: seconds}
            ]
            // 修正索引，尽量保持选中值的一致性
            for (let i = 0; i <= DATE_INDEX_MAP[this.data.fields]; ++i) {
                let value = Number(currentValues[i].value)
                let valueSet = currentValues[i].values
                let index = valueSet.findIndex(v => value === Number(v))
                if (index !== -1) values[i] = index
            }
            data = this.getDateData(years, months, days, hours, minutes, seconds)
        }
        this.setData({
            data,
            lock: false
        }, () => {
            this.setData({
                values
            })
        })
        if (this.changeOnSelect) {
            this.emitChange(values)
        }
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
        if (data.length !== values.length) return
        let indexs = []
        let level = this.data.mode !== DATE ? this.data.level : DATE_INDEX_MAP[this.data.fields] + 1
        for (let i = 0; i < level; ++i) {
            let index = data[i].findIndex(v => v.id === values[i])
            indexs.push(index === -1 ? 0 : index)
        }
        return indexs
    },
    getValueByIndex (data, indexs = []) {
        let values = []
        let level = this.data.mode !== DATE ? this.data.level : DATE_INDEX_MAP[this.data.fields] + 1
        for (let i = 0; i < level; ++i) {
            let index = indexs[i]
            if (indexs[i] !== undefined && data[i][index] !== undefined) {
                values.push(data[i][index])
            }
        }
        let ret = {
            value: values.map(v => v.id),
            model: values,
            text: values.map(v => v.label)
        }
        if (this.data.mode === DATE && this.currentDate) {
            ret.date = this.currentDate
            ret.dateStr = this.formatDate(this.currentDate)
            ret.localeDateString = this.currentDate.toLocaleDateString()
            ret.formatDate = this.formatDate(this.currentDate)
            ret.datetime = this.currentDate.getTime()
            ret.year = this.currentDate.getFullYear()
            ret.month = this.currentDate.getMonth() + 1
            ret.day = this.currentDate.getDate()
            ret.hour = this.currentDate.getHours()
            ret.monute = this.currentDate.getMinutes()
            ret.second = this.currentDate.getSeconds()
        }
        return ret
    },
    formatDate (date) {
        date = new Date(date)
        const year = date.getFullYear()
        const month = date.getMonth()
        const month1 = month + 1
        const day = date.getDate()
        return this.data.dateFormat
            .replace(/yyyy/g, year)
            .replace(/yy/g, (year + '').substring(2))
            .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
            .replace(/m/g, month1)
            .replace(/dd/g, day < 10 ? '0' + day : day)
            .replace(/d/g, day)
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
                    if (!this.data.value || !this.data.values) this.oldValues = valueIndex
                    this.setData({
                        values: valueIndex,
                        lock: false
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
        let ret =  this.getValueByIndex(this.data.data, indexs)
        this.triggerEvent('confirm', ret)
        if (this.oldValues === indexs) return
        this.oldValues = indexs
        this.triggerEvent('change', ret)
    },
    /**
     * @description 日期改变 - 外部原因导致
     */
    onDateChange () {
        this.initStartAndEnd()
        let values
        let value = this.data.value
        let currentDate = !!value && typeof value === 'string' ? convertToDate(value) : isDate(value) ? value :  this.$start
        this.currentDate = currentDate
        if (!!value && typeof value === 'string') value = currentDate
        else if (!isDate(value)) value = this.$start
        else value = currentDate
        values = genValues(value, this.data.fields)
        let res = getRangeByStartAndEnd(this.$start, this.$end, this.currentDate)
        if (!res) return
        let {years, months, days, hours, minutes, seconds} = res
        let data = this.getDateData(years, months, days, hours, minutes, seconds)
        values = this.getIndexByValue(data, values)
        this.isChanging = true
        this.setData({
            data
        }, () => {
            if (!values) {
                this.isChanging = false
                return
            }
            this.oldValues = values
            this.setData({
                values
            }, () => {
                this.isChanging = false
            })
        })
    },
    initStartAndEnd () {
        let start = convertToDate(this.data.start)
        let end = convertToDate(this.data.end)
        if (start.getTime() > end.getTime()) {
            this.$start = end
            this.$end = start
        } else {
            this.$start = start
            this.$end = end
        }
        let value = this.data.value
        let currentDate = !!value && typeof value === 'string' ? convertToDate(value) : isDate(value) ? value :  this.$start
        this.currentDate = currentDate
    },
    // 日期相关
    initDate () {
        this.initStartAndEnd()
        let data = []
        // 如果没有绑定value，今日存在那么选择今日，否则选择第一年
        let value = this.data.value
        let currentDate = !!value && typeof value === 'string' ? convertToDate(value) : isDate(value) ? value :  this.$start
        this.currentDate = currentDate
        let values
        if (!!value && typeof value === 'string') value = currentDate
        else if (!isDate(value)) value = this.$start
        else value = currentDate
        values = genValues(value, this.data.fields)
        let {years, days, months, hours, minutes, seconds} = getRangeByStartAndEnd(this.$start, this.$end, this.currentDate)
        data = this.getDateData(years, months, days, hours, minutes, seconds)
        let vs = this.getIndexByValue(data, values)
        this.oldValues = this.data.value && this.data.value.length ? vs : ''
        this.setData({
            data,
            values: vs
        })
    },
    noop () {}
  },
  attached () {
    if (this.data.mode === REGION) {
        this.setData({
            refactedRange: mapToTree(province)
        }, () => {
            this.init(this.data.refactedRange)
        })
    }
    if (this.data.mode === DATE) {
        this.initDate()
    }
  }
})