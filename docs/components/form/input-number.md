---
sidebarDepth: 1
---
# Input-Number 数字输入框

## Import

```json
{
    "usingComponents": {
        "i-input-number": "../../dist/input-number/index"
    }
}
```

## Example

### 基本用法

#### html
```html
<i-input-number value="{{ value1 }}" min="0" max="100" bindchange="handleChange1" />
```
#### js
```js
data: {
    value1: 1
},
handleChange1 ({ detail }) {
    this.setData({
        value1: detail.value
    })
}
```
### 小数用法

#### html
```html
<i-input-number value="{{ value2 }}" min="0" max="100" step="0.2" bindchange="handleChange2" />
```
#### js
```js
data: {
    value2: 0.1
},
handleChange2 ({ detail }) {
    this.setData({
        value2: detail.value
    })
}
```

## Attributes

| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| value | 绑定值 | Number | —— | —— |
| min | 设置允许的最小值 | Number | —— | —— |
| max | 设置允许的最大值 | Number | —— | —— |
| step | 数字输入框精度 | Number | —— | —— |
| size | 数字输入框尺寸 | String | small/default/large | default |

## Events

| 事件名      | 说明    | 参数   |
|---------- |--------- |----------|
| change | 选中值发生变化时触发 | { value: 当前绑定值 } |