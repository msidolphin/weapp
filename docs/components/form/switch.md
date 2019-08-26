---
sidebarDepth: 1
---
# Switch 开关

## Import

```json
{
    "usingComponents": {
        "i-switch": "../../dist/switch/index"
    }
}
```

## Example

### 基本用法
#### wxml
```html
<i-switch value="{{switch1}}" bind:change="onChange" ></i-switch>
```
#### js
```js
Page({
    data: {
        switch1: false
    },
    onChange (e) {
        this.setData({
            'switch1': e.detail.value
        })
    }
})
```

### 禁止切换
#### wxml
```html
<i-switch value="{{switch2}}" disabled></i-switch>
```
#### js
```js
Page({
    data: {
        switch2: false
    }
})
```

### 自定义内容
#### wxml
```html
<i-switch value="{{switch3}}" bind:change="onChange">
    <view slot="open">开启</view>
    <view slot="close">关闭</view>
</i-switch>
```
#### js
```js
Page({
    data: {
        switch3: false
    },
    onChange (e) {
        this.setData({
            'switch3': e.detail.value
        })
    }
})
```

### 自定义图标
#### json
```json
{
    "usingComponents": {
        "i-icon": "../../dist/icon/index"
    }
}
```
#### wxml
```html
<i-switch value="{{switch4}}" bind:change="onChange">
    <i-icon type="right" slot="open"></i-icon>
    <i-icon type="close" slot="close"></i-icon>
</i-switch>
```
#### js
```js
Page({
    data: {
        switch4: false
    },
    onChange (e) {
        this.setData({
            'switch4': e.detail.value
        })
    }
})
```

## Attributes
| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| value | 绑定值 | Boolean |  true/false | false |
| size | 开关尺寸 | String | large/small/default | default |
| disabled | 是否禁止切换 | Boolean |true/false | false |

## Events
| 事件名      | 说明    | 参数   |
|---------- |--------- |----------|
| change | 选中值发生变化时触发 |{value: e.detail.value } |
