import area from './area.js'
let region = JSON.parse(JSON.stringify(area))
const CN = '86'
const REGION = 'region'

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
    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        mode: {
            type: String // TODO date TODO datetime region
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
            type: Array,
            value: [],
            observer (val, old) {
                if (arrayIsEqul(val, old)) return
                this.handleValueChange(val)
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
        // 归零
        for (let i = changeIndex + 1; i < this.data.level; ++i) {
            values[i] = 0
        }
        let data = this.data.data
        for (let i = changeIndex; i < this.data.level - 1; ++i) {
            let item = data[i][values[i]]
            data[i + 1] = item.children
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
    }
  },
  attached () {
    if (this.data.mode === REGION) {
        this.setData({
            refactedRange: mapToTree(province)
        }, () => {
            this.init(this.data.refactedRange)
        })
    }
  }
})