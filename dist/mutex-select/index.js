const defaultFieldNames = {
    label: 'label',
    value: 'id',
    disabled: 'disabled'
}

const defaults = {
    selectedList: [],
    fieldNames: defaultFieldNames,
    options: [],
    value:'',
    title:'请选择',
    onTapSelected(){},
    onTapDisabled(){},
    onChange(){},
    onClosed(){}
}

Component({
    externalClasses: ['i-class', 'i-class-hd'],
    data: {
        ...defaults,
        visible: false,
    },
    methods: {
        initData (options) {
            const opts = Object.assign({}, this.data, options) //合并默认和options中方法
            this.setData({
                ...opts
            })
        },
        open (options) {
            if (options) {
                this.initData(options)
            }
            this.setData({
                visible: true
            })
        },
        close () {
            this.setData({
                visible: false
            })
            if (this.data.onClosed && typeof this.data.onClosed === 'function') {
                this.data.onClosed.call(this)
            }
        },
        onItemSelected (e) {
            let {item, selected, disabled = false } = e.currentTarget.dataset
            if (item[this.data.fieldNames.value] === this.data.value) return
            if (selected) {
                if (this.data.onTapSelected && typeof this.data.onTapSelected === 'function') {
                    this.data.onTapSelected.call(this,item) 
                }
                return
            }
            if (disabled) {
                if (this.data.onTapDisabled && typeof this.data.onTapDisabled === 'function') {
                    this.data.onTapDisabled.call(this,item) 
                }
                return
            }
            const current = this.data.selectedList.findIndex(it => {
                return it === this.data.value  
            })
            if (current !== -1) {
                this.data.selectedList.splice(current,1)
            }
            this.setData({
                value: item[this.data.fieldNames.value],
                selectedList: this.data.selectedList
            })
            if (this.data.onChange && typeof this.data.onChange === 'function') {
                this.data.onChange.call(this,item) 
            }
            this.close()
        },
        setSelectedList (list) {
            if (!Array.isArray(list)) return
            this.setData({
                selectedList: list
            })
        },
        addSelected (item) {
            if (!item) return
            this.data.selectedList.push(item)
            this.setData({
                selectedList: this.data.selectedList
            })
        },
        getSelectedList () {
            return JSON.parse(JSON.stringify(this.data.selectedList))
        },
        removeSelected (value) {
            if (value !== 0 && !value) return
            let index = this.data.selectedList.findIndex(item => item === value)
            if (index !==-1) {
                this.data.selectedList.splice(index,1)
            }
            this.setData({
                selectedList: this.data.selectedList
            })
        }
    }
})