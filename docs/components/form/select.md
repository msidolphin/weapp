---
sidebarDepth: 1
---
# Select 选择器

## Import

```json
{
    "usingComponents": {
        "i-select": "../../dist/select/index"
    }
}
```
## Example

### 单选用法
#### wxml
```html
<view bindTap="open">{{labels}}</view>
<i-select title="单选" visible="{{visible}}" default-value="{{value}}" bind:close="onClose" bind:change="onChange" options="{{options}}"></i-select>
```
#### js
```js
Page({
    data: {
        value: '120000',
        visible: false,
        labels: '北京市',
        options: [
            { id: "110000", label: "北京市" },
            { id: "120000", label: "天津市" },
            { id: "130000", label: "河北省" },
            { id: "140000", label: "山西省" },
            { id: "150000", label: "内蒙古自治区" },
            { id: "210000", label: "辽宁省" }
        ]
    },
    open () {
        this.setData({
        visible: true
        })
    },
    onClose () {
        this.setData({
        visible: false
        })
    },
    onChange (e) {
        this.setData({
            value: e.detail.value,
            labels: e.detail.options.label
        })
    },
})
```

### 多选用法
#### wxml
```html
<view bindTap="openMultiple">{{multipleLables}}</view>
<i-select title="多选" visible="{{multipleVisible}}" multiple default-value="{{multipleValue}}" bind:close="onMultipleClose"
 bind:change="onMultipleChange" options="{{options}}"></i-select>
```
#### js
```js
Page({
    data: {
        multipleValue: ['110000', '120000'],
        multipleVisible: false,
        multipleLables: '广东省、湖北省',
        options: [
            { id: "110000", label: "北京市" },
            { id: "120000", label: "天津市" },
            { id: "130000", label: "河北省" },
            { id: "140000", label: "山西省" },
            { id: "150000", label: "内蒙古自治区" },
            { id: "210000", label: "辽宁省" }
        ]
    },
     openMultiple () {
        this.setData({
            multipleVisible: true
        })
    },
    onMultipleClose () {
        this.setData({
            multipleVisible: false
        })
    },
    onMultipleChange (e) {
        this.setData({
            multipleValue: e.detail.value,
            multipleLables: e.detail.options.map(o => o.label).join('、')
        })
    }
})
```

## Attributes
| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| visible | 弹窗显示状态 |Boolean | true/false | false |
| title | 标题 |String | —— | —— |
| options | 数据源 | Array | —— | —— |
| multiple | 是否多选 | Boolean | true/false | false |
| limit | 多选时最大选择数量 | Number | —— | 0|
| defaultValue | 默认值 | String, Array, Number | —— | —— |
| value | 绑定值 | String, Array, Number | —— | —— |
| controlled | 是否同步外部value的变更 | Boolean | true/false | false |
| props | options元素对应的属性名 | Object | —— |——|

## Events
| 事件名      | 说明    | 参数   |
|---------- |--------- |----------|
| change | 选中值发生变化时触发 | { value, options } |
| exceed | 选中数量超过最大选择数量 | ——  |
| close | 关闭弹窗 | —— |