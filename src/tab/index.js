Component({
    externalClasses: ['i-class'],

    relations: {
        '../tabs/index': {
            type: 'parent'
        }
    },

    properties: {
        key: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        dot: {
            type: Boolean,
            value: false
        },
        count: {
            type: Number,
            value: 0
        }
    },

    data: {
        current: false,
        currentColor: '',
        scroll: false,
        width: 0
    },

    methods: {
        changeCurrent (current) {
            this.setData({ current });
        },
        changeCurrentColor (currentColor) {
            this.setData({ currentColor });
        },
        changeScroll (scroll) {
            this.setData({ scroll });
        },
        handleClickItem () {
            const parent = this.getRelationNodes('../tabs/index')[0];
            parent.emitEvent(this.data.key);
        },
        getWidth ()  {
            return new Promise(resolve => {
                const query = this.createSelectorQuery()
                query.select('.i-tabs-tab').boundingClientRect()
                query.exec(res => {
                    this.setData({
                        width: res && res[0] ? res[0].width + 20 : 0
                    }, () => {
                        resolve(res && res[0] ? res[0].width + 20 : 0)
                    })
                })
            })
        }
    }
});
