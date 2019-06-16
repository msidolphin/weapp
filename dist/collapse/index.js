Component({
    externalClasses: ['i-class'],

    relations: {
        '../collapse-item/index': {
            type: 'child',
            linked () {
                this._updateIsLastCell();
            },
            linkChanged () {
                this._updateIsLastCell();
            },
            unlinked () {
                this._updateIsLastCell();
            }
        }
    },
    properties: {
        name: String,
        accordion: Boolean
    },
    methods: {
        clickfn (e) {
            const params = e.detail;
            const allList = this.getRelationNodes('../collapse-item/index');
            allList.forEach((item) => {
                if (params.name === item.data.name) {
                    item.setData({
                        showContent: 'i-collapse-item-show-content'
                    });
                } else {
                    item.setData({
                        showContent: ''
                    })
                }
            })
        },
        _getItems () {
            return this.getRelationNodes('../collapse-item/index')
        },
        _updateIsLastCell() {
            let cells = this._getItems()
            const len = cells.length

            if (len > 0) {
                let lastIndex = len - 1

                cells.forEach((cell, index) => {
                    cell.updateIsLastCell(index === lastIndex)
                })
            }
        },
        accordionHandle (target) {
            let cells = this._getItems()
            const len = cells.length

            if (len > 0) {
                let lastIndex = len - 1

                cells.forEach((cell, index) => {
                    if (!target.data.isCollapse && cell !== target) {
                        cell.close()
                    }
                })
            }
        }
    }
});

