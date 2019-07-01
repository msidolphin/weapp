const VALUES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0']
const SHORTCUT = ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0']
const HEIGHT = 227 // 本组件的高度是固定的
Component({
    properties: {
        shortcut: {
            type: Array,
            value: SHORTCUT
        },
        max: {
            type: Number,
            value: 10
        },
        min: {
            type: Number,
            value: 0
        },
        maxlength: {
            type: Number,
            value: 0
        },
        value: {
            type: [String, Number],
            value: '',
            observer (val, old) {
                if (val !== old) {
                    if (typeof val !== 'string') {
                        this.setData({
                            currentValue: String(val)
                        })
                    } else {
                        this.setData({
                            currentValue: val
                        })
                    }
                    this.isShortcut = true
                }
            }
        },
        contentHeight: { // 内容区域高度 用于计算上移距离
            type: Number,
            value: 0
        },
        visible: {
            type: Boolean,
            value: false
        }
    },
    data: {
        values: VALUES,
        currentValue: ''
    },
    methods: {
        /**
         * 通过快捷方式设置数值
         */
        setValueByShortcut (e) {
            let { value } = e.currentTarget.dataset
            if (isNaN(value) && value !== '.') return
            if (this.data.maxlength && value.length > this.data.maxlength) return
            if (this.data.max && Number(value) > this.data.max) newVal = String(this.data.max)
            if (Number(value) <= this.data.min) {
                value = this.data.min.toFixed(1)
            }
            this.setData({
                currentValue: value
            })
            this.emitInput()
            this.isShortcut = true
        },
        /**
         * 通过数字按钮设置数值
         */
        setValue (e) {
            let currentValue = this.data.currentValue
            let { value } = e.currentTarget.dataset
            let newVal = this.isShortcut ? value : currentValue + value
            if (isNaN(newVal) && newVal !== '.') return
            if (this.data.maxlength && newVal.length >= this.data.maxlength) return
            if (this.data.max &&  Number(newVal) > this.data.max) newVal = String(this.data.max)
            if (Number(newVal) <= this.data.min) {
                newVal = this.data.min.toFixed(1) // 暂时写死1
                this.isShortcut = true
            } else {
                this.isShortcut = false
            }
            this.setData({
                currentValue: newVal
            })
            this.emitInput()
            
        },
        /**
         * @description 删除
         */
        delete () {
            let currentValue = this.data.currentValue
            if (!currentValue.length) return
            currentValue = this.isShortcut ? '' : currentValue.substr(0, currentValue.length - 1)
            if (Number(currentValue) <= this.data.min) currentValue = this.data.min.toFixed(1)
            this.setData({
                currentValue
            })
            this.emitInput()
            this.isShortcut = true
        },
        /**
         * @description 获取应该向上滚动的距离
         * @param {Number} height --元素高度
         * @param {Number} top -- 元素距离顶部的距离
         */
        getScrollTop (height, top) {
            let windowHeight = this.data.contentHeight
            let keyboardHeight = HEIGHT // 键盘高度是固定的
            let y = height + top + 10 // 10安全距离
            if (windowHeight - y < keyboardHeight) {
                return -(keyboardHeight - (windowHeight - y))
            } else if (windowHeight - y === keyboardHeight) {
                return null // 本次应该忽略，通常发生在重复点击同一个元素时
            } else {
                return null // 0 如果为0会出现先往上顶切换元素的时候马上归零的情况，其实这个时候是不需要归零的
                // 但是如果不归零有可能会出现上方的元素存在遮挡的问题，这点还需要研究下
            }
        },
        onClose () {
            this.triggerEvent('close')
        },
        emitInput () {
            this.triggerEvent('input', {
                value: this.data.currentValue
            })
        }
    }
})