---
sidebarDepth: 1
---
# Rate 评分

## Import

```json
{
  "usingComponents": {
    "i-rate": "../../dist/rate/index"
  }
}
```

## Example

### 基本用法
#### wxml
```html
<i-rate bind:change="onChange" value="{{value}}"></i-rate>
```

#### js
```js
Page({
    data: {
        value: 0
    },
    onChange (e) {
        this.setData({
            value: e.detail.index
        })
    }
})
```

### 基本用法——图标不相同
#### wxml
```html
<i-rate bind:change="onChange" value="{{value1}}" same="{{false}}"></i-rate>
```

#### js
```js
Page({
    data: {
        value1: 1
    },
    onChange (e) {
        this.setData({
            value1: e.detail.index
        })
    }
})
```
### 基本用法——图标不填充
#### wxml
```html
<i-rate bind:change="onChange" value="{{value2}}" fill="{{false}}"></i-rate>
```

#### js
```js
Page({
    data: {
        value2: 2
    },
    onChange (e) {
        this.setData({
            value2: e.detail.index
        })
    }
})
```

### 允许为零
#### wxml
```html
<i-rate allow-zero bind:change="onChange" value="{{value3}}"></i-rate>
```

#### js
```js
Page({
    data: {
        value3: 3
    },
    onChange (e) {
        this.setData({
            value3: e.detail.index
        })
    }
})
```

### 自定义星星个数
#### wxml
```html
<i-rate bind:change="onChange" value="{{value4}}" count="{{10}}"></i-rate>
```

#### js
```js
Page({
    data: {
        value4: 4
    },
    onChange (e) {
        this.setData({
            value4: e.detail.index
        })
    }
})
```
### 自定义星星大小
#### wxml
```html
<i-rate bind:change="onChange" value="{{value5}}" size="{{32}}"></i-rate>
```

#### js
```js
Page({
    data: {
        value5: 5
    },
    onChange (e) {
        this.setData({
            value5: e.detail.index
        })
    }
})
```
### 自定义图标和颜色
#### wxml
```html
<i-rate bind:change="onChange" value="{{value6}}" icon="like" active-color="#F56C6C" color="rgb(239, 242, 247)"></i-rate>
```

#### js
```js
Page({
    data: {
        value6: 5
    },
    onChange (e) {
        this.setData({
            value6: e.detail.index
        })
    }
})
```

### 自定义文字说明
#### wxml
```html
<i-rate bind:change="onChange" value="{{value7}}">{{value6}}星</i-rate>
```

#### js
```js
Page({
    data: {
        value7: 5
    },
    onChange (e) {
        this.setData({
            value7: e.detail.index
        })
    }
})
```

### 只读的评分支持任意分值
#### wxml
```html
<i-rate disabled value="{{value8}}">{{value8}}分</i-rate>
```

#### js
```js
Page({
    data: {
        value8: 4.3
    }
})
```

## Attributes
| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| value   |  绑定值  | Number  |  ——      | 0  |
| disabled |只读状态 | Boolean | true/false | false |
| count   | 图标数量  | Number  | ——       | 5  |
| size    | 图标大小  |  Number | —— | 20 |
| allowZero|允许为零 | Boolean | true/false | false |
| icon |图标类型 | String | ——  |  collection |
| fill | 填充状态 | Boolean | true/false | true |
| same | 图标类型是否相同 | Boolean | true/false | true |
| color | 图标颜色 | String | —— | #e9e9e9 |
| activeColor | 选中图标颜色 | String | —— | #f5a623 |

## Events
| 事件名      | 说明    | 参数   |
|---------- |-------- |----------|
| change | 选中值发生变化时触发 | {index: 选中项 } |