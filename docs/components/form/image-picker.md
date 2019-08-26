---
sidebarDepth: 1
---
# Image-Picker 图片选择器

## Import

```json
{
    "usingComponents": {
        "i-image-picker": "../../dist/image-picker/index"
    }
}
```
## Example

### 基本用法

#### html

```html
<view class="image-picker"> {{imageList.length}} / 9 </view>
<i-image-picker bind:change="onChange" default-list="{{imageList}}" object span="{{4}}" limit="{{9}}" backgroundColor="#EDEDED"/>
 
```
#### js
```js
data: {
    imageList: [
      {
        id: '',
        url: 'http://photocdn.sohu.com/20120128/Img333056814.jpg'
      }
    ]
  },
  onChange (e) {
    this.setData({
       imageList: e.detail.value
    })
}
```

## Attributes
| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| span | 一行展示的图片数量 | Number, String | —— | 4 |
| limit | 最多选择的图片数量 | Number | —— | 4 |
| sizeType | 尺寸类型 | Array | —— | ['original', 'compressed'] |
| sourceType | 图标资源类型 | Array | —— | ['album', 'camera'] |
| backgroundColor | 背景颜色 | String| —— | #fff |
| iconType | 图标类型 |String| ——  |camera |
| iconSize | 图标尺寸 |Number | —— | 32|
| iconColor | 图标颜色 | String| —— | #80848f |
| object | —— |Boolean | true/false | false |
| defaultList|默认选中图片 | Array | —— | —— |
| props | options元素对应的属性名 | Object | —— |——|

## Events
| 事件名      | 说明    | 参数   |
|---------- |--------- |----------|
| change | 选择图片发生变化时触发 | { value：已选中的图片列表  } |