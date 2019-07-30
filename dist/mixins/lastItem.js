export function createIsLastFunction (c) {
    return {
        _updateIsLast () {
            let items = this.getRelationNodes(c)
            const len = items.length
            if (len > 0) {
                let lastIndex = len - 1
                items.forEach((item, index) => {
                    item.updateIsLast(index === lastIndex)
                })
            }
        }
    }
}


export default Behavior({
    methods: {
        updateIsLast (isLast) {
            this.setData({ isLast })
        }
    }
})