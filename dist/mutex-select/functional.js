import { getCtx } from "../base/index"

export class MutexSelector {
    constructor (options = {}) {
        const { selector = '#mutex-select'} = options
        const ctx = getCtx(selector)
        this.ctx = ctx
        this.ctx.initData(options)
    }
    open (options) {
        if (options) {
            this.ctx.initData(options)
        }
        this.ctx.open()
    }
    close () {
        this.ctx.close()
    }
    addSelected (item) {
        this.ctx.addSelected(item)
    }
    setSelectedList (list) {
        this.ctx.setSelectedList(list)
    }
    getSelectedList(){
        return this.ctx.getSelectedList()
    }
    removeSelected (value) {
        return this.ctx.removeSelected(value)
    }
}