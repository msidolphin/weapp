Component({
    externalClasses: ['i-class'],
    properties : {
        name : {
            type : String,
            value : ''
        },
        ingore: { // 是否忽略（不进行索引）
            type: Boolean,
            value: false
        },
        showHeader: { // 是否显示头部
            type: Boolean,
            value: true
        }
    },
    relations : {
        '../index/index' : {
            type : 'parent'
        }
    },
    data : {
        top : 0,
        height : 0,
        currentName : ''
    },
    methods: {
        updateDataChange() {
            const className = '.i-index-item';
            const query = wx.createSelectorQuery().in(this);
            query.select( className ).boundingClientRect((res)=>{
                this.setData({
                    top : res.top,
                    height : res.height,
                    currentName : this.data.name
                })
            }).exec()
        }
    },
    ready () {
        this.updateDataChange()
    }
})