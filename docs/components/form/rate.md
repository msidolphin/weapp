---
sidebarDepth: 1
---
# Rate 评分

## Import

```json
{
  "usingComponents": {
    "i-rate": "../../dist/scroll-view/index"
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
