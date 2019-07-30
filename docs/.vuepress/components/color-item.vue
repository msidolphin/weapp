<template>
    <div class="color-item" :style="{background: color, color: textColor}">
        <div class="color-item-title">{{text}}</div>
        <div class="color-item-content">{{color}}</div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: '#fff'
        },
        textColor: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="stylus" scoped>
.color
  padding 0!important
  border none !important
.color-body 
  &::before 
    display none
.color-col 
  margin-bottom 16px
.color-item 
  width 100%
  color #fff
  border-radius 5px
.color-item-title 
  padding 6px 6px 0
  font-size 14px
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
.color-item-content 
  padding 6px
  font-size 12px
  opacity 0.7
</style>
