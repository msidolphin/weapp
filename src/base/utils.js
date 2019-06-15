const toString = Object.prototype.toString

export function isDate(val) {
    return toString.call(val) === '[object Date]'
}

export function isNumber (val) {
    return typeof val === 'number' && !isNaN(val)
}

export function isObject(val) {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val) {
    return toString.call(val) === '[object Object]'
}

export function isNull(val) {
    return val === null
}

export function isString(val) {
    return typeof val === 'string'
}

export function isUndefined(val) {
    return val === undefined
}

export function isEmpty(val) {
    if (isString(val)) {
        return val.trim() === ''
    }
    return isNull(val) || isUndefined(val)
}

export function isError(val) {
  return toString.call(val) === '[object Error]'
}

export function getType(val) {
  return toString.call(val).replace(/\]/g, '').split(' ')[1]
}
