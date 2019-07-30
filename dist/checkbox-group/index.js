import {createIsLastFunction} from '../mixins/lastItem'

Component({
    externalClasses: ['i-class'],
    relations: {
        '../checkbox/index': {
            type: 'child',
            linked() {
                this.changeCurrent()
                this._updateIsLast()
            },
            linkChanged() {
                this.changeCurrent()
                this._updateIsLast()
            },
            unlinked() {
                this.changeCurrent()
                this._updateIsLast()
            }
        }
    },
    properties: {
        current: {
            type: Array,
            value: [],
            observer: 'changeCurrent'
        },
        bordered: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        changeCurrent(val = this.data.current) {
            let items = this.getRelationNodes('../checkbox/index')
            const len = items.length
            if (len > 0) {
                items.forEach(item => {
                    item.changeCurrent(val.indexOf(item.data.value) !== -1)
                })
            }
        },
        emitEvent(current) {
            this.triggerEvent('change', current)
        },
        ...createIsLastFunction('../checkbox/index')
    }
});
