<template>
    <div style="padding:10px 0;">
        <h3>主题色</h3>
        <i-row :gutter="20">
            <i-col :span="8">
                <color-item :color="colors.primary.color" :text="colors.primary.text"/>
            </i-col>
            <i-col :span="8">
                <color-item :color="colors.LightPrimary.color" :text="colors.LightPrimary.text" :text-color="colors.LightPrimary.textColor"/>
            </i-col>
            <i-col :span="8">
                <color-item :color="colors.PrimaryBlue.color" :text="colors.PrimaryBlue.text"/>
            </i-col>
        </i-row>
        <h3>辅助色</h3>
        <i-row :gutter="20">
            <i-col :span="8">
                <color-item :color="colors.success.color" :text="colors.success.text"/>
            </i-col>
            <i-col :span="8">
                <color-item :color="colors.warning.color" :text="colors.warning.text"/>
            </i-col>
            <i-col :span="8">
                <color-item :color="colors.error.color" :text="colors.error.text"/>
            </i-col>
        </i-row>
        <h3>中性色</h3>
        <i-row :gutter="20">
            <i-col :span="8">
                <color-item :color="colors.title.color" :text="colors.title.text"/>
            </i-col>
            <i-col :span="8">
                <color-item :color="colors.content.color" :text="colors.content.text"/>
            </i-col>
            <i-col :span="8">
                <color-item :color="colors.assist.color" :text="colors.assist.text"/>
            </i-col>
            <i-col :span="8">
                <color-item :color="colors.disabled.color" :text="colors.disabled.text"/>
            </i-col>
            <i-col :span="8">
                <color-item :color="colors.border.color" :text="colors.border.text"/>
            </i-col>
            <i-col :span="8">
                <color-item :color="colors.divider.color" :text="colors.divider.text"/>
            </i-col>
        </i-row>
    </div>
</template>

<script>
import Example from '../../theme/example'
import IRow from '../components/row'
import ICol from '../components/col'
import ColorItem from '../components/color-item'
const colors = {
    primary: {
        color: '#FFB700',
        text: 'Primary'
    },
    LightPrimary : {
        color: '#FFF5D9',
        text: 'LightPrimary',
        textColor: '#ffb700'
    },
    PrimaryBlue: {
        color: '#4D5AFC',
        text: 'PrimaryBlue'
    },
    success: {
        color: '#66D0AA',
        text: 'Success'
    },
    warning: {
        color: '#FF9A4E',
        text: 'Warning'
    },
    error: {
        color: '#FC552B',
        text: 'Error'
    },
    title: {
        color: '#333333',
        text: '标题 Title'
    },
    content: {
        color: '#4C4E52',
        text: '正文 Content'
    },
    assist: {
        color: '#6E6F73',
        text: '辅助 Assist'
    },
    disabled: {
        color: '#B6B7B9',
        text: '禁用 Disabled'
    },
    border: {
        color: '#DDDEE1',
        text: '边框'
    },
    divider: {
        color: '#E9EAEC',
        text: '分割线'
    }
}
export default {
    name: 'color-doc',
    components: {
        Example,
        ColorItem,
        IRow,
        ICol
    },
    data () {
        return {
            colors
        }
    }
}
</script>

<style lang="stylus">

</style>
