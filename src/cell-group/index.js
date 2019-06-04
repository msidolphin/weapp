Component({
    externalClasses: ['i-class'],

    relations: {
        '../cell/index': {
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
        },
        '../input/index': {
            type: 'child',
            linked () {
                this._updateIsLastCell('../input/index');
            },
            linkChanged () {
                this._updateIsLastCell('../input/index');
            },
            unlinked () {
                this._updateIsLastCell('../input/index');
            }
        }
    },

    methods: {
        _updateIsLastCell(c = '../cell/index') {
            let cells = this.getRelationNodes(c);
            const len = cells.length;

            if (len > 0) {
                let lastIndex = len - 1;

                cells.forEach((cell, index) => {
                    cell.updateIsLastCell(index === lastIndex);
                });
            }
        }
    }
});
