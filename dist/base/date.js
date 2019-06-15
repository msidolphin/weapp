// import { isString, getType, isDate, isNumber } from './utils'
const toString = Object.prototype.toString

function isDate(val) {
    return toString.call(val) === '[object Date]'
}

function isNumber (val) {
    return typeof val === 'number' && !isNaN(val)
}

function isObject(val) {
  return val !== null && typeof val === 'object'
}

function isPlainObject(val) {
    return toString.call(val) === '[object Object]'
}

function isNull(val) {
    return val === null
}

function isString(val) {
    return typeof val === 'string'
}

function isUndefined(val) {
    return val === undefined
}

function isEmpty(val) {
    if (isString(val)) {
        return val.trim() === ''
    }
    return isNull(val) || isUndefined(val)
}

function isError(val) {
  return toString.call(val) === '[object Error]'
}

function getType(val) {
  return toString.call(val).replace(/\]/g, '').split(' ')[1]
}



const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
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
function isLeapYear (year) {
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
function convertToDate (date) {
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
}

/**
 * @description 获取指定日期（月份）的第一天是星期几
 * @param {Srting, Number} year
 * @param {String, Number} month 
 */
function getFirstDay (year, month) {
    let date = convertToDate(`${year}/${month}/1`)
    return date.getDay()
}

/**
 * @description 获取指定日期（月份）的第一天是星期几
 */
function getLastDay (year, month) {
    let date = convertToDate(`${year}/${month}/${getDays(year, month)}`)
    return date.getDay()
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

// let startYear = getYear(start)
// let endYear = getYear(end)

// for (let year = startYear; year <= endYear; ++year) {
//     MONTHS.forEach((month, index) => {    
//         console.log(`${year}年是${isLeapYear(year) ? '闰年' : '平年'}, ${month}共${getDays(year, index + 1)}天.`)
//     })
// }

// TODO 构造日历结构