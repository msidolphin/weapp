const defaultFieldNames = {
    label: 'label',
    value: 'id',
    children: 'children',
}

Component({
    properties: {
        multiple: {
            type: Boolean,
            value: false
        },
        options: {
            type: Array,
            value: [],
            observer (val) {
                if (val && val.length) {
                    this.setSelect()
                    this.setActiveNavIndex()
                    let children = this.getChildren()
                    this.setData({
                        children
                    })
                }
            }
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
        activeNavIndex: 0, // 激活的导航栏，如果是多选，那么初始化的时候选中的是第一个存在选中项的导航栏
        select: [],
        fieldNames: {},
        children: [],
        notExistsItems: [] // 不存在的项
    },
    methods: {
        /**
         * @description 获取父级项
         */
        getParentIndex (item) {
            let index = -1
            for (let i = 0; i < this.data.options.length; ++i) {
                let children = this.data.options[i].children ? this.data.options[i].children : []
                for (let j = 0; j < children.length; ++j) {
                    if (children[j][this.data.fieldNames['value']] === item[this.data.fieldNames['value']]) {
                        index = i
                        break
                    }
                }
            }
            return index
        },
        /**
         * @description 获取选择项
         */
        getItem (value) {
            for (let i = 0; i < this.data.options.length; ++i) {
                let children = this.data.options[i].children ? this.data.options[i].children : []
                for (let j = 0; j < children.length; ++j) {
                    if (children[j][this.data.fieldNames['value']] === value) {
                        return children[j]
                    }
                }
            }
            return null
        },
        /**
         * @description 设置选中项
         */
        setSelect () {
            if (this.data.controlled) {
                this.setData({
                    select: this.getNormalizedValue(this.data.value)
                })
            } else {
                this.setData({
                    select: this.getNormalizedValue(this.data.defaultValue)
                })
            }
        },
        /**
         * @description 设置默认
         */
        setActiveNavIndex () {
            let activeIndex = 0
            if (this.data.select.length) {
                activeIndex = this.getParentIndex(this.data.select[0])
            }
            if (activeIndex === -1) activeIndex = 0
            // if ( !this.data.options[activeIndex].children || !this.data.options[activeIndex].children.length) {
            //     // 动态记载
            //     this.emitLoad()
            // }
            this.setData({
                activeNavIndex: activeIndex
            })
        },
        /**
         * 格式归一化
         * @param {Array | Object} values 默认值或绑定值 
         */
        getNormalizedValue (values) {
            if (values === undefined) return []
            // 防止传递错误格式
            if (!this.data.multiple && Array.isArray(values)) values = values[0]
            let select = []
            if (Array.isArray(values)) {
                values.forEach(v => {
                    let item = this.getItem(v)
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
                let item = this.getItem(values)
                if (item) {
                    select.push(item)
                }
                return select
            }
        },
        onNavItemTap (e) {
            let { children, index } = e.currentTarget.dataset
            if (children) {
                this.setData({
                    children,
                    activeNavIndex: index
                })
            } else {
                this.setData({
                    children: [],
                    activeNavIndex: index
                })
            }
        },
        /**
         * @description 动态加载
         * 弃用：由于多选的特性，异步加载不推荐使用，容易引发bug，我也没想到好的解决方法
         */
        emitLoad () {
            this.triggerEvent('load', { option: this.data.options[this.data.activeNavIndex], index: this.data.activeNavIndex, options: this.data.options })
        },
        emitChange () {
            let select = this.data.select
            let options = this.data.select
            let values = select.map(s => s[this.data.fieldNames['value']])
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
        onItemSelected (e) {
            let { item, selected } = e.currentTarget.dataset
            if (this.data.multiple) {
                let index = this.getItemIndexById(item.id)
                let select = this.data.select
                if (index === -1) {
                    // 判断是否超出最大数量
                    if (this.data.limit === 0 || select.length + 1 <= this.data.limit) {
                        select.push(item)
                        this.emitChange()
                    } else this.triggerEvent('exceed')
                } else {
                    select.splice(index, 1)
                    this.emitChange()
                }
                this.setData({
                    select
                })
            } else {
                if (selected) {
                    this.setData({
                        select: []
                    })
                } else {
                    this.setData({
                        select: [item]
                    })
                }
                this.emitChange()
            }
        },
        getItemIndexById (id) {
            let index = this.data.select.findIndex(s => s.id === id)
            return index
        },
        getChildren () {
            return this.data.options[this.data.activeNavIndex].children
        }
    },
    attached () {
        const fieldNames = Object.assign({}, defaultFieldNames, this.data.props)
        this.setData({
            fieldNames
        })
        if (this.data.options && this.data.options.length) {
            this.setSelect()
            this.setActiveNavIndex()
            let children = this.getChildren()
            this.setData({
                children
            })
        }
    }  
})