function getCtx (selector) {
    const pages = getCurrentPages();
    const ctx = pages[pages.length - 1];

    const componentCtx = ctx.selectComponent(selector);

    if (!componentCtx) {
        console.error('无法找到对应的组件，请按文档说明使用组件');
        return null;
    }
    return componentCtx;
}

function Toast(options) {
    const { selector = '#toast' } = options;
    const ctx = getCtx(selector);

    ctx.handleShow(options);
}

Toast.hide = function (selector = '#toast') {
    const ctx = getCtx(selector);

    ctx.handleHide();
};

function Message(options) {
    const { selector = '#message' } = options;
    const ctx = getCtx(selector);

    ctx.handleShow(options);
}

class CalendarPicker {
    constructor (options = {}) {
        const { selector = '#calendar' } = options
        const ctx = getCtx(selector)
        this.ctx = ctx
        ctx.initData(options)
    }
    open (options) {
        if (options) {
            this.ctx.initOptions(options) // TODO 可能部分属性需要限制
        }
        this.ctx.open()
    }
    close () {
        this.ctx.close()
    }
    /**
     * markers
     * maxDate
     * minDate
     * value
     * @param {*} options 
     */
    update (options) {
        if (this.ctx) {
            this.ctx.initOptions(options)
        }
    }
}

module.exports = {
    $Toast: Toast,
    $Message: Message,
    CalendarPicker
}
