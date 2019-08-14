---
sidebarDepth: 1
---
# Swipeout 滑动菜单

## Import

```json
{
    "usingComponents": {
        "i-swipeout": "../../dist/swipeout/index"
    }
}
```

## Examples

### 基础用法

注: 1、设置uncloseable为true时点击按钮不能关闭,必须联合toggle2来实现
    2、如果传递action的话必须传递width来设置每个按钮的宽度

```html

<i-swipeout  i-class="i-swipeout-demo-item" actions="{{actions}}">
    <view slot="content">
        <i-cell 
            i-class="i-cell-padding" 
            title="猛虫过江" 
            label="侏罗纪世界主题公园及豪华度假村被失控的恐龙们摧毁已有四年">
        </i-cell>
    </view>
</i-swipeout>
<i-swipeout  i-class="i-swipeout-demo-item" actions="{{actions}}" toggle="{{toggle2}}" unclosable="{{true}}">
    <view slot="content">
        <i-cell 
            i-class="i-cell-padding" 
            title="点击按钮不可关闭" 
            label="侏罗纪世界主题公园及豪华度假村被失控的恐龙们摧毁已有四年">
        </i-cell>
    </view>
</i-swipeout>
<i-swipeout  i-class="i-swipeout-demo-item" actions="{{actions}}" toggle="{{toggle2}}" unclosable="{{true}}" bindchange="handlerCloseButton">
    <view slot="content">
        <i-cell 
            i-class="i-cell-padding" 
            title="可点击按钮关闭" 
            label="侏罗纪世界主题公园及豪华度假村被失控的恐龙们摧毁已有四年">
        </i-cell>
    </view>
</i-swipeout>
```
### 自定义右侧button

注: 右侧必须设置固定宽度。默认宽度160px

```html
<i-swipeout  i-class="i-swipeout-demo-item" operateWidth="{{210}}">
    <view slot="content">
        <i-cell 
            i-class="i-cell-padding" 
            title="猛虫过江" 
            label="侏罗纪世界主题公园及豪华度假村被失控的恐龙们摧毁已有四年">
        </i-cell>
    </view>
    <view slot="button" class="i-swipeout-demo-button-group">
        <view class="i-swipeout-demo-button">点赞</view>
        <view class="i-swipeout-demo-button">分享</view>
        <view class="i-swipeout-demo-button">删除</view>
    </view>
</i-swipeout>
<i-swipeout  i-class="i-swipeout-demo-item" operateWidth="{{180}}">
    <view slot="content">
        <i-cell 
            i-class="i-cell-padding" 
            title="猛虫过江" 
            label="侏罗纪世界主题公园及豪华度假村被失控的恐龙们摧毁已有四年">
        </i-cell>
    </view>
    <view slot="button" class="i-swipeout-demo-button-group" style="background:#2db7f5;">
        <view class="i-swipeout-demo-button" style="width:60px"> <i-icon size="32" type="like_fill"></i-icon></view>
        <view class="i-swipeout-demo-button" style="width:60px"><i-icon size="32" type="share_fill"></i-icon></view>
        <view class="i-swipeout-demo-button" style="width:60px"><i-icon size="32" type="delete_fill"></i-icon></view>
    </view>
</i-swipeout>
```

### 和actionsheet联合使用

```html
<i-action-sheet visible="{{ visible2 }}" actions="{{ actions2 }}" show-cancel bind:cancel="handleCancel2" bind:click="handleClickItem2" mask-closable="{{ false }}">
    <view slot="header" style="padding: 16px">
        <view style="color: #444;font-size: 16px">确定吗？</view>
        <text>删除后无法恢复哦</text>
    </view>
</i-action-sheet>
<i-swipeout  i-class="i-swipeout-demo-item" operateWidth="{{180}}" unclosable="{{true}}" toggle="{{toggle}}">
    <view slot="content">
        <view class="i-swipeout-image">
            <i-icon size="20" color="#FFFFFF" type="feedback_fill"></i-icon>
        </view>
        <view class="i-swipeout-des">
            <view class="i-swipeout-des-h2">第七个小矮人</view>
            <view class="i-swipeout-des-detail">乐观善良的7个小矮人原本过着简单快乐的生活，不料诅咒公主的巫婆利用小矮人进入.</view>
        </view>
    </view>
    <view slot="button" class="i-swipeout-demo-button-group" style="background:#2db7f5;">
        <view class="i-swipeout-demo-button" style="width:60px" bindtap="actionsTap"> <i-icon size="32" type="like_fill"></i-icon></view>
        <view class="i-swipeout-demo-button" style="width:60px" bindtap="actionsTap"><i-icon size="32" type="share_fill"></i-icon></view>
        <view class="i-swipeout-demo-button" style="width:60px" bindtap="actionsTap"><i-icon size="32" type="delete_fill"></i-icon></view>
    </view>
</i-swipeout>
```

### 自定义样式

```html
<i-swipeout  i-class="i-swipeout-demo-item" actions="{{actions}}">
    <view slot="content">
        <view class="i-swipeout-image" style="background:#ff9900;">
            <i-icon size="20" color="#FFFFFF" type="coupons_fill" />
        </view>
        <view class="i-swipeout-des">
            <view class="i-swipeout-des-h2">第七个小矮人</view>
            <view class="i-swipeout-des-detail">乐观善良的7个小矮人原本过着简单快乐的生活，不料诅咒公主的巫婆利用小矮人进入.</view>
        </view>
    </view>
</i-swipeout>
```

```js
data : {
    visible2: false,
    //小程序没有refs，所以只能用动态布尔值控制关闭
    toggle : false,
    toggle2 : false,
    actions2: [
        {
            name: '删除',
            color: '#ed3f14'
        }
    ],
    actions : [
        {
            name : '喜欢',
            color : '#fff',
            fontsize : '20',
            width : 100,
            icon : 'like',
            background : '#ed3f14'
        },
        {
            name : '返回',
            width : 100,
            color : '#80848f',
            fontsize : '20',
            icon : 'undo'
        }
    ]
},
handleCancel2 () {
    this.setData({
        visible2: false,
        toggle : this.data.toggle ? false : true
    });
    console.log( this.data.toggle,111111111 )
},
handleClickItem2 () {
    const action = [...this.data.actions2];
    action[0].loading = true;

    this.setData({
        actions2: action
    });

    setTimeout(() => {
        action[0].loading = false;
        this.setData({
            visible2: false,
            actions2: action,
            toggle: this.data.toggle ? false : true
        });
        
    }, 2000);
},
handlerCloseButton(){
    this.setData({
        toggle2: this.data.toggle2 ? false : true
    });
},
actionsTap(){
    this.setData({
        visible2: true
    });
}
```

### Attributes

| 参数 | 说明 | 类型 | 默认值  |
|------|------|------|--------|
| actions | 侧滑菜单的配置项 | Array | —— |
| unclosable | 是否关闭侧滑菜单 | Boolean | false |
| toggle | 是否点击关闭侧滑菜单 | Boolean | false |
| operateWidth | 侧滑菜单宽度 | Number | 160 |
| disabled | 是否禁用 | Boolean | false |

### Actions

```js
actions : [
    {
        name : '喜欢',
        color : '#fff',
        fontsize : '20',
        width : 100,
        icon : 'like',
        background : '#ed3f14'
    }
]
```

| 名称 |说明 | 类型 | 默认值  |
|------|-------|------|------|--------|
| name | 对应名称 | String | —— |
| color | 字体颜色 | String | —— |
| fontsize | 字号 | String | —— |
| width | 侧滑菜单宽度 | Number | —— |
| icon | 图标类型 | String | —— |
| background | 背景颜色 | String | —— |

## Events

| 事件 | 说明 | 参数 |
|------|------|-----|
| bindchange | —— | —— |