Component({
    externalClasses: ['i-class', 'i-class-body'],

    options: {
        multipleSlots: true
    },

    properties: {
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        extra: {
            type: String,
            value: ''
        },
        margin: {
            type: Boolean,
            value: true
        }
    }
});
