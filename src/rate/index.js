Component({
    externalClasses: ['i-class'],
    properties : {
        count : {
            type : Number,
            value : 5
        },
        value : {
            type : Number,
            value : 0,
            observer () {
                // 如果是禁用状态要支持任意分值
                if (this.data.disabled) {
                    this.generateScores()
                }
            }
        },
        disabled : {
            type : Boolean,
            value : false
        },
        size : {
            type : Number,
            value : 20
        },
        name : {
            type : String,
            value : ''
        },
        allowZero: {
            type: Boolean,
            value: false
        },
        icon: {
            type: String,
            value: 'collection'
        },
        fill: {
            type : Boolean,
            value : true 
        },
        same: {
            type : Boolean,
            value : true 
        },
        color: {
            type: String,
            value: '#e9e9e9'
        },
        activeColor: {
            type: String,
            value: '#f5a623'
        },
    },
    data : {
        touchesStart : {
            pageX : 0
        },
        scores: []
    },
    methods : {
        handleClick(e){
            const data = this.data
            if( data.disabled ){
                return
            }
            const index = e.currentTarget.dataset.index
            this.triggerEvent('change',{
                index : index + 1
            })
        },
        handleTouchMove(e){
            const data = this.data
            if( data.disabled ){
                return
            }
            if( !e.changedTouches[0] ){
                return
            }
            const movePageX =  e.changedTouches[0].pageX
            let space = movePageX - data.touchesStart.pageX
            if (space < 0) space = 0
            if( space === 0 && !this.data.allowZero){
                return
            }
            let setIndex = Math.ceil(space / data.size)
            setIndex = setIndex  > data.count ? data.count : setIndex 
            this.triggerEvent('change',{
                index : setIndex 
            })
        },
        generateScores () {
            if (this.data.value === undefined || this.data.value === null) return
            let count = this.data.count
            let value = this.data.value
            if (value > count) value = count
            let values = String(Number(value)).split('.')
            let scores = []
            for (let i = 0; i < count; ++i) {
                if (i < Number(values[0])) {  
                  scores.push(100)
                } else {
                  scores.push(0)
                }
            }
            if (values[1] !== undefined) { // 存在半星
              scores[Number(values[0])] = (Number(`0.${values[1]}`) * 100)
            }
            this.setData({
                scores
            })
        }
    },
    ready(){
        const className = '.i-rate'
        var query = wx.createSelectorQuery().in(this)
        query.select( className ).boundingClientRect((res)=>{
            this.data.touchesStart.pageX = res && res.left || 0
        }).exec()
        if (this.data.disabled) {
            this.generateScores()
        }
    }
})
