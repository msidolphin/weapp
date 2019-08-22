---
sidebarDepth: 1
---
# Radio 单选按钮

## Import

```json
{
    "usingComponents": {
        "i-radio": "../../dist/radio/index",
        "i-radio-group": "../../dist/radio-group/index
    }
}
```

## Example

### 基本用法
#### wxml
```html
<i-radio value="{{animal}}" checked="{{checked}}" bindchange="handleAnimalChange">
    </i-radio>
```

#### js
```js
Page({
    data: {
        animal: '熊猫',
        checked: false
    },
    handleAnimalChange ({ detail = {} }) {
        this.setData({
            checked: detail.current
        })
    }
})
```

### 单选组用法
#### wxml
```html
<i-radio-group current="{{current}}" bindchange="handleFruitChange">
    <i-radio wx:for="{{fruit}}" wx:key="{{item.id}}" value="{{item.name}}">
        </i-radio>
</i-radio-group>
```

#### js
```js
Page({
    data: {
        fruit: [{
            id: 1,
            name: '香蕉',
        }, {
            id: 2,
            name: '苹果'
        }, {
            id: 3,
            name: '西瓜'
        }, {
            id: 4,
            name: '葡萄',
        }],
        current: '苹果',
    },
    handleFruitChange ({ detail = {} }) {
        this.setData({
            current: detail.value
        })
    }
})
```

## Attributes（radio）
| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| value | 绑定值 | String | —— | —— |
| checked | 选中状态 | Boolean | true/false | false |
| disabled | 禁用状态 | Boolean | true/false | false |
| color | 选中后的颜色 | String | —— | #2d8cf0 |
| position | 单选按钮所在的位置 | String| left/right | right |

## Attributes（radio-group）
| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| current | 当前选中值 | String | —— | —— |

## Events
| 事件名      | 说明    | 参数   |
|---------- |--------- |----------|
| change | 选中值发生变化时触发 | { detail = {} } |