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
        limit: {
            type: Number,
            value: 0
        },
        defatltValue: {
            type: [String, Array, Number]
        },
        value: {
            type: [String, Array, Number]
        },
        controlled: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        activeNavIndex: 0, // 激活的导航栏，如果是多选，那么初始化的时候选中的是第一个存在选中项的导航栏
        select: [{
            id: 12,
            label: '木工'
        }],
        children: [],
        options: [
            {
                id: 1,
                label: '土建',
                children: [
                    {
                        id: 11,
                        label: '瓦工'
                    },
                    {
                        id: 12,
                        label: '木工'
                    },
                    {
                        id: 13,
                        label: '钢筋工'
                    },
                    {
                        id: 14,
                        label: '混凝土工'
                    },
                    {
                        id: 15,
                        label: '油漆工'
                    }
                ]
            },
            {
                id: 2,
                label: '安装材料',
                children: [
                    {
                        id: 21,
                        label: '电气设备'
                    },
                    {
                        id: 22,
                        label: '给排水'
                    },
                    {
                        id: 23,
                        label: '消防安装'
                    },
                    {
                        id: 24,
                        label: '通风空调'
                    }
                ]
            },
            {
                id: 3,
                label: '其它',
                children: [
                    {
                        id: 31,
                        label: '塔吊司机'
                    },
                    {
                        id: 32,
                        label: '塔吊指挥'
                    },
                    {
                        id: 33,
                        label: '司索工'
                    },
                    {
                        id: 34,
                        label: '电焊工'
                    },
                    {
                        id: 35,
                        label: '保安'
                    },
                    {
                        id: 36,
                        label: '后勤'
                    },
                    {
                        id: 37,
                        label: '挖掘机司机'
                    },
                    {
                        id: 38,
                        label: '电工'
                    }
                ]
            }
        ]
    },
    methods: {
        onNavItemTap (e) {
            this.setData({
                children: e.currentTarget.dataset.children,
                activeNavIndex: e.currentTarget.dataset.index
            })
        },
        onItemSelected (e) {
            let { item, selected } = e.currentTarget.dataset
            if (this.data.multiple) {
                let index = this.getItemIndexById(item.id)
                let select = this.data.select
                if (index === -1 && (this.data.limit === 0 || select.length + 1 < this.data.limit)) {
                    select.push(item)
                } else {
                    select.splice(index, 1)
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
        let children = this.getChildren()
        this.setData({
            children
        })
    }
})