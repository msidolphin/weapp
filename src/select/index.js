const defaultFieldNames = {
    label: 'label',
    value: 'id',
    disabled: 'disabled'
}

const itemHeight = 44 // 每项高度固定
const contentHeight = 270 // 内容高度
const OPTION = 'option-'

Component({
    externalClasses: ['i-class'],
    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: ''
        },
        options: {
            type: Array,
            value: [],
            observer () {
                this.setSelect()
            }
        },
        multiple: {
            type: Boolean,
            value: false
        },
        limit: {
            type: Number,
            value: 0
        },
        defaultValue: {
            type: [String, Array, Number]
        },
        value: {
            type: [String, Array, Number],
            observer (newVal, oldVal) {
                if (this.data.controlled && JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.setSelect()
                }
            }
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        props: {
            type: Object,
            value: {}
        }
    },
    data: {
        select: [],
        fieldNames: defaultFieldNames,
        scrollTop: 0,
        scrollView: `${OPTION}0`
    },
    methods: {
        /**
         * @description 初始化选中项
         */
        setSelect () {
            if (this.data.controlled) {
                this.setData({
                    select: this.getNormlizedValue(this.data.value)
                })
            } else {
                this.setData({
                    select: this.getNormlizedValue(this.data.defaultValue)
                })
            }
            this.scrollToView()
        },
        getNormlizedValue (values) {
            if (values === undefined) return []
            // 防止传递错误格式
            if (!this.data.multiple && Array.isArray(values)) values = values[0]
            let select = []
            if (Array.isArray(values)) {
                values.forEach(v => {
                    let item = this.getItemFromOptions(v)
                    if (item) {
                        if (this.data.multiple && (this.data.limit === 0 || select.length + 1 <= this.data.limit)) {
                            select.push(item)
                        } else if (!this.data.multiple && !select.length) {
                            select.push(item)
                        }
                    }
                })
                return JSON.parse(JSON.stringify(select))
            } else {
                let item = this.getItemFromOptions(values)
                if (item) {
                    select.push(item)
                } else {
                    
                }
                return select
            }
        },
        /**
         * @description 获取选择项
         */
        getItemFromOptions (value) {
            for (let i = 0; i < this.data.options.length; ++i) {
                if (this.data.options[i][this.data.fieldNames['value']] === value) {
                    return this.data.options[i]
                }
            }
            return null
        },
        getItemIndexById (id) {
            let index = this.data.select.findIndex(s => s[this.data.fieldNames['value']] === id)
            return index
        },
        /**
         * 选择项点击时
         */
        onItemSelected (e) {
            let { item, selected } = e.currentTarget.dataset
            if (item[this.data.fieldNames['disabled']]) return
            if (this.data.multiple) {
                let index = this.getItemIndexById(item[this.data.fieldNames['value']])
                let select = this.data.select
                if (index === -1) {
                    // 判断是否超出最大数量
                    if (this.data.limit === 0 || select.length + 1 <= this.data.limit) {
                        select.push(item)
                    } else this.triggerEvent('exceed')
                } else {
                    select.splice(index, 1)
                }
                this.setData({
                    select
                })
            } else {
                if (selected) {
                    // this.setData({
                    //     select: []
                    // })
                } else {
                    this.setData({
                        select: [item]
                    })
                }
            }
        },
        emitChange () {
            let select = this.data.select
            let options = this.data.select
            let values = select.map(s => s[this.data.fieldNames['value']]) // .concat(this.data.notExistsItems)
            if (this.data.controlled) {
                if (!Array.isArray(this.data.value) && !this.data.multiple) {
                    values = values[0] !== undefined ? values[0] : {}
                    options = options[0] !== undefined ? options[0] : {}
                }
            } else {
                if (!Array.isArray(this.data.defaultValue) && !this.data.multiple) {
                    values = values[0] !== undefined ? values[0] : {}
                    options = options[0] !== undefined ? options[0] : {}
                }
            }
            this.triggerEvent('change', {value: values ? values : '', options})
        },
        /**
         * @description 初始化时 滚动到相应位置
         */
        scrollToView () {
            let select = this.data.select
            let scrollView = `${OPTION}0`
            if (select.length) {
                let index = this.data.options.findIndex(option => option[this.data.fieldNames['value']] === select[0][this.data.fieldNames['value']])
                if (index !== -1 && index + 1 > Math.floor(contentHeight / itemHeight)) {
                    scrollView = `${OPTION}${select[0][this.data.fieldNames['value']]}`
                }
            }
            this.setData({
                scrollView
            })
        },
        onConfirm () {
            this.emitChange()
            this.handleClickCancel()
        },
        handleClickCancel () {
            this.triggerEvent('close')
        },
        doNothing () {}
    }
})