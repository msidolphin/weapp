<template>
    <div class="i-col" :class="[span ? 'i-col-span-' + span : '', offset ? 'i-col-offset-' + offset : '']" :style="style">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'i-col',
    props: {
        span: {
            type: Number,
            default: 0
        },
        offset: {
            type: Number,
            default: 0,
        }
    },
    data () {
        return {
            parent: {}
        }
    },
    computed: {
        style () {
            if (this.parent) {
                return {
                    paddingLeft: `${this.parent.gutter / 2}px`,
                    paddingRight: `${this.parent.gutter / 2}px`,
                    marginTop: `${this.parent.gutter / 2}px`,
                    marginBottom: `${this.parent.gutter / 2}px`
                }
            }
        }
    },
    created () {
        let parent = this.$parent
        while (parent && parent.$options._componentTag !== 'i-row') {
            parent = parent.$parent;
        }
        if (parent && parent.gutter) {
            this.parent = parent
        }
    }
}
</script>
