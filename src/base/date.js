import { isString, getType, isDate, isNumber } from './utils'


export const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
const DAYS = ['周天', '周一', '周二', '周三', '周四', '周五', '周六']
const DATS_SHORT = ['日', '一', '二', '三', '四', '五', '六']

// 月份天数关系
const MONTH_DAY_MAP = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}

/**
 * @description 判断是否为闰年
 * 普通年能被4整除且不能被100整除的为闰年
 * 世纪年能被400整除的是闰年
 * @param {Number, String} year 年份
 */
export function isLeapYear (year) {
    if (isString(year)) {
        year = Number(year)
    }
    if (isNaN(year)) {
        throw new Error(`expected year is Number, but got ${getType(year)} => ${year}.`)
    }
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

/**
 * @description 获取月份工多少天
 * @param {Number, String} year
 * @param {Number, String} month
 */
function getDays(year, month) {
    if (isString(month)) {
        month = Number(month)
    }
    if (isNaN(month)) {
        throw new Error(`expected month is Number, but got ${getType(month)} => ${month}.`)
    }
    // 二月份
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28
    } else {
        return MONTH_DAY_MAP[month]
    }
}

/**
 * @description 转化为日期
 * @param {Date, Srting, Number} date
 */
export function convertToDate (date) {
    try {
        if (!isDate(date)) {
            let tmp = date
            if (isString(date)) {
                date = Date.parse(date)
            }
            if (isNumber(date)) {
                date = new Date(date)
            }
            if (!isDate(date)) {
                throw new Error(`cannot convert ${tmp} to Date.`)
            }
        }
        return date
    } catch (err) {
        throw new Error(err)
    }
}

/**
 * @description 获取指定日期（月份）的第一天是星期几
 * @param {Srting, Number} year
 * @param {String, Number} month 
 */
function getFirstDay (year, month) {
    date = convertToDate(`${year}/${month}/1`)
    return date.getDay()
}

/**
 * @description 获取指定日期（月份）的第一天是星期几
 */
export function getLastDay (year, month) {
    let date = convertToDate(`${year}/${month}/${getDays(year, month)}`)
    return date.getDay()
}

/**
 * @description 根据开始日期和结束日期获取年份数组
 * @param {String, Number, Date} start - 开始时间
 * @param {String, Number, Date} end - 结束时间
 */
export function getYearsByStartDateAndEndDate (start, end) {
    let startDate = convertToDate(start)
    let endDate = convertToDate(end)
    let startYear = startDate.getFullYear()
    let endYear = endDate.getFullYear()
    let years = []
    for (let year = startYear; year <= endYear; ++year) {
        years.push(String(year))
    }
    return years
}

/**
 * @description 根据日期获取月份数组
 * @param {String, Number, Date} date -- 日期
 * @param {Boolean} isStart - 是否为开始日期
 */
export function getMonthsByDate (date, isStart = true) {
    date = convertToDate(date)
    let startMonth = isStart ? date.getMonth() + 1 : 1
    let endMonth = isStart ? 12 : date.getMonth() + 1
    let months = []
    for (let month = startMonth; month <= endMonth; ++month) {
        if (month < 10) months.push(`0${month}`)
        else months.push(String(month))
    }
    return months
}

/**
 * @description 根据日期获取天数数组
 * @param {String, Number, Date} date -- 日期
 */
export function getDaysByDate (date, isStart = true) {
    date = convertToDate(date)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let startDay = isStart ? date.getDate() : 1
    let endDay = isStart ? (month === 2 ? (isLeapYear(year) ? 29 : 28) : MONTH_DAY_MAP[month]) : date.getDate()
    let days = []
    for (let day = startDay; day <= endDay; ++day) {
        if (day < 10) day = days.push(`0${day}`)
        else days.push(String(day))
    }
    return days
}

/**
 * @description 根据日期获取天数范围
 * @param {String, Number, Date} date -- 日期
 */
export function getDaysRange (date) {
    date = convertToDate(date)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let lastDay = month === 2 ? (isLeapYear(year) ? 29 : 28) : MONTH_DAY_MAP[month]
    let days = []
    for (let day = 1; day <= lastDay; ++day) {
        if (day < 10) day = days.push(`0${day}`)
        else days.push(String(day))
    }
    return days
}

/**
 * @description 获取月份范围
 */
export function getMonthsRange () {
    let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, '10', '11', '12']
    months.forEach((month, index) => {
        if (month < 10) {
            months[index] = `0${month}`
        }
    })
    return months
}


// 测试

// let start = '2000-01-01'
// let end = '2020-12-31'
// let fields = 'day' // ['year', 'month', 'day']

// function getDatesArrayByString (val, separator = '-') {
//     return val.split(separator)
// }

// function getYear (val) {
//     return getDatesArray(val)[0]
// }

// function getMonth (val) {
//     return getDatesArray(val)[1]
// }

// function getDay (val) {
//     return getDatesArray(val)[2]
// }

// let startYear = getYear(start)
// let endYear = getYear(end)

// let years = []

// for (let year = startYear; year <= endYear; ++year) {
//     years.push(year)
// }



// TODO 构造日历结构