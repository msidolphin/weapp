import area from '../data/area.js'

const defaultFieldNames = {
    label: 'label',
    value: 'id',
    children: 'children',
}

const I_CASCADER = 'i-cascader'

let region = JSON.parse(JSON.stringify(area))
const CN = '86'
const REGION = 'region'

// // 处理地区
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

function arrayTreeFilter(data, filterFn, options) {
    options = options || {}
    options.childrenKeyName = options.childrenKeyName || 'children'
    let children = data || []
    const result = []
    let level = 0
    do {
        const foundItem = children.filter(function(item) {
            return filterFn(item, level)
        })[0]
        if (!foundItem) {
            break
        }
        result.push(foundItem)
        children = foundItem[options.childrenKeyName] || []
        level += 1
    } while (children.length > 0)
    return result
}

Component({
    externalClasses: ['i-class'],
    properties: {
        visible: {
            type: Boolean,
            value: true
        },
        defaultValue: {
            type: Array,
            value: [],
        },
        value: {
            type: Array,
            value: [],
            observer(newVal) {
                if (this.data.controlled) {
                    this.setData({ activeValue: newVal }, () => this.getCurrentOptions(newVal))
                }
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        title: {
            type: String,
            value: '',
        },
        options: { // options 转化为 $options 全部处理
            type: Array,
            value: [],
            observer (val) {
                this.setData({
                    $options: val
                })
                wx.nextTick(() => {
                    this.getCurrentOptions()
                })
            },
        },
        chooseTitle: {
            type: String,
            value: '请选择',
        },
        visible: {
            type: Boolean,
            value: false,
        },
        defaultFieldNames: {
            type: Object,
            value: defaultFieldNames,
        },
        mode: {
            type: String
        }
    },
    data: {
        activeOptions: [],
        activeIndex: 0,
        bodyStyle: '',
        activeValue: [],
        showOptions: [],
        fieldNames: {},
        $options: [],
        startX: 0,
        startY: 0,
        moveX: 0, // 一次滑动的距离
        threshold: 20,
        yThreshold: 100,
        animation: null,
        endX: 0,
        currentOptions: {},
        done: false
    },
    methods: {
        handleClickCancel () {
            this.triggerEvent('close')
        },
        doNothing () {},
        getActiveOptions(activeValue) {
            const { $options } = this.data
            const value = this.getFieldName('value')
            const childrenKeyName = this.getFieldName('children')

            return arrayTreeFilter($options, (option, level) => option[value] === activeValue[level], { childrenKeyName })
        },
        getShowOptions(activeValue) {
            const { $options } = this.data
            const children = this.getFieldName('children')
            const result = this.getActiveOptions(activeValue).map((activeOption) => activeOption[children]).filter((activeOption) => !!activeOption)

            return [$options, ...result]
        },
        getMenus(activeValue = [], hasChildren) {
            const { $options, chooseTitle } = this.data
            const activeOptions = this.getActiveOptions(activeValue)

            if (hasChildren) {
                const value = this.getFieldName('value')
                const label = this.getFieldName('label')

                activeOptions.push({
                    [value]: I_CASCADER,
                    [label]: chooseTitle
                })
            }

            return activeOptions
        },
        getNextActiveValue(value, optionIndex) {
            let { activeValue } = this.data

            activeValue = activeValue.slice(0, optionIndex + 1)
            activeValue[optionIndex] = value

            return activeValue
        },
        updated(currentOptions, optionIndex, condition, callback) {
            // debugger
            const value = this.getFieldName('value')
            const children = this.getFieldName('children')
            const hasChildren = currentOptions[children] && currentOptions[children].length > 0
            const activeValue = this.getNextActiveValue(currentOptions[value], optionIndex)
            const activeOptions = this.getMenus(activeValue, hasChildren)
            const activeIndex = activeOptions.length - 1
            const showOptions = this.getShowOptions(activeValue)
            const params = {
                activeValue,
                activeOptions,
                activeIndex,
                showOptions,
                done: hasChildren
            }

            // 判断 hasChildren 计算需要更新的数据
            if (hasChildren || (activeValue.length === showOptions.length && (optionIndex = Math.max(0, optionIndex - 1)))) {
                params.bodyStyle = `transform: translate(${-50 * optionIndex}%)`
                params.showOptions = showOptions
            }

            if (!hasChildren) params.done = true

            // 判断是否需要 setData 更新数据
            if (condition) {
                this.setData(params)
            }
            // 回调函数
            if (typeof callback === 'function') {
                callback.call(this, currentOptions, activeOptions, !hasChildren)
            }
        },
        /**
         * 更新级联数据
         * @param {Array} activeValue 当前选中值
         */
        getCurrentOptions(activeValue = this.data.activeValue) {
            const optionIndex = Math.max(0, activeValue.length - 1)
            const activeOptions = this.getActiveOptions(activeValue)
            const currentOptions = activeOptions[optionIndex]

            if (currentOptions) {
                this.updated(currentOptions, optionIndex, true)
            } else {
                const value = this.getFieldName('value')
                const label = this.getFieldName('label')

                activeOptions.push({
                    [value]: I_CASCADER,
                    [label]: this.data.chooseTitle
                })

                const showOptions = this.getShowOptions(activeValue)
                const activeIndex = activeOptions.length - 1
                const params = {
                    showOptions,
                    activeOptions,
                    activeIndex,
                    bodyStyle: '',
                }

                this.setData(params)
            }
        },
        /**
         * 点击菜单时的回调函数
         */
        onMenuClick(e) {
            const { menuIndex } = e.currentTarget.dataset
            const index = menuIndex > 1 ? menuIndex - 1 : 0
            const bodyStyle = `transform: translate(${-50 * index}%)`

            this.setData({
                bodyStyle,
                activeIndex: menuIndex,
            })
        },
        /**
         * 点击选项时的回调函数
         */
        onItemSelect(e) {
            // debugger
            const { item, optionIndex } = e.currentTarget.dataset
            // 判断是否禁用
            if (!item || item.disabled) return
            // updated
            // this.updated(item, optionIndex, !this.data.controlled, this.onChange)
            this.updated(item, optionIndex, !this.data.controlled)
        },
        /**
         * 组件关闭时的回调函数
         */
        onPopupClose() {
            this.triggerEvent('close')
        },
        /**
         * 点击确认
         */
        onConfirm () {
            this.onChange(this.getCurrentOptions(), this.data.activeOptions, this.data.done)
            this.handleClickCancel()
        },
        /**
         * 选择完成时的回调函数
         */
        onChange(currentOptions = {}, activeOptions = [], done = false) {
            const options = activeOptions.filter((n) => n[this.getFieldName('value')] !== I_CASCADER)
            const value = options.map((n) => n[this.getFieldName('value')])

            // 判断是否异步加载
            if (currentOptions.isLeaf === false && !currentOptions.children) {
                this.emitEvent({ value, options, done: false })
                this.triggerEvent('load', { value, options })
                return
            }

            // 正常加载
            this.emitEvent({ value, options, done })
        },
        emitEvent(params = {}) {
            this.triggerEvent('change', params)

            // 当选择完成时关闭组件
            if (params.done) {
                // this.onPopupClose()
            }
        },
        getFieldName(name) {
            return this.data.fieldNames[name]
        },
        // 横向滚动相关
        onTouchStart (e) {
            let touches = e.touches[0]
            this.setData({
                startX: touches.pageX,
                startY: touches.pageY
            })
        },
        onTouchMove (e) {
            let touches = e.touches[0]
            let moveX = touches.pageX - this.data.startX
            let moveY = touches.pageY - this.data.startY
            this.setData({
                moveX: this.data.moveX + moveX,
                moveY
            })
        },
        onTouchEnd () {
            // 上下滑动不处理
            if (Math.abs(this.data.moveY) > this.data.yThreshold) return
            let moveX = this.data.moveX
            if (Math.abs(this.data.moveX) > this.data.threshold) {
                let match = this.data.bodyStyle.match(new RegExp('translate' +'\\((-?[\\d\\.]+)%\\)'))
                if (match && match.length > 0) {
                    let value = Number(match[1])
                    if (moveX > this.data.startX) {
                        // 右滑动
                        value += 50
                        if (value >= 0) value = 0
                    } else {
                        // '左滑动'
                        value -= 50
                        let min = (this.data.showOptions.length - 2) * -50
                        if (value <= -min) value = min
                    }
                    const bodyStyle = `transform: translate(${value}%)`
                    this.setData({
                        bodyStyle,
                        moveX: 0,
                        moveY: 0
                    })
                }
            }
        }
    },
    attached() {
        if (this.data.mode === REGION) {
            this.setData({
                $options: mapToTree(province)
            })
        }
        const { defaultValue, value, controlled } = this.data
        const activeValue = controlled ? value : defaultValue
        const fieldNames = Object.assign({}, defaultFieldNames, this.data.defaultFieldNames)

        this.setData({ activeValue, fieldNames }, () => this.getCurrentOptions(activeValue))
    },
})