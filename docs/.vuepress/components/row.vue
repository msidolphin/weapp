<template>
    <div class="i-row" :style="style"><slot></slot></div>
</template>

<script>
export default {
    name: 'i-row',
    props: {
        gutter: {
            type: Number,
            default: 0
        }
    },
    computed: {
        style () {
            return {
                marginLeft: `-${this.gutter / 2}px`,
                marginRight: `-${this.gutter / 2}px`
            }
        }
    }
}
</script>
