---
sidebarDepth: 1
---
# Checkbox 多选按钮

## Import

```json
{
    "usingComponents": {
        "i-checkbox": "../../dist/checkbox/index",
        "i-checkbox-group": "../../dist/checkbox-group/index"
    }
}
```

## Example

### 基本用法
#### wxml
```html
<i-checkbox value="{{animal}}" checked="{{checked}}" bindchange="handleAnimalChange">
    </i-checkbox>
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

### 多选组用法
#### wxml
```html
<i-checkbox-group current="{{current}}" bindchange="handleFruitChange">
        <i-checkbox wx:for="{{fruit}}" wx:key="{{item.id}}" value="{{item.name}}">
        </i-checkbox>
</i-checkbox-group>
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
        current: ['苹果', '葡萄']
    },
    handleFruitChange ({ detail = {} }) {
        const index = this.data.current.indexOf(detail.value);
        index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
        this.setData({
            current: this.data.current
        })
    }
})
```

## Attributes（checkbox）
| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| value | 绑定值 | String | —— | —— |
| checked | 选中状态 | Boolean | true/false | false |
| disabled | 禁用状态 | Boolean | true/false | false |
| color | 选中后的颜色 | String | —— | #2d8cf0 |
| position | 多选按钮所在的位置 | String| left/right | right |

## Attributes（checkbox-group）
| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| current | 当前选中值 | Array | —— | —— |
| bordered | 是否有边框 | Boolean |true/false | false |

## Events
| 事件名      | 说明    | 参数   |
|---------- |--------- |----------|
| change | 选中值发生变化时触发 | { detail = {} } |