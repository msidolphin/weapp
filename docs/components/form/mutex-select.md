---
sidebarDepth: 1
---
# Mutex-Select 互斥选择器

## Import

```json
{
    "usingComponents": {
        "i-mutex-select": "../../dist/mutex-select/index"
    }
}
```

## Examples

### 一般用法


```html
<i-cell-group>
  <i-cell wx:for="{{list}}" title="选项-{{index + 1}}" wx:key="{{index}}" data-index="{{index}}" bindtap="onOpen" is-link value="{{item.text}}"></i-cell>
</i-cell-group>

<i-mutex-select id="mutex-select"></i-mutex-select>
```

```js
import { MutexSelector } from '../../dist/base/index'

let list = []
for(let i=0; i<15; i++) {
  list.push({
    text:'',
    value:''
  })
}
Page({
    data: {
      list,
      options: [
        { id: "1", label: "米"},
        { id: "2", label: "平方米"},
        { id: "3", label: "吨" },
        { id: "4", label: "立方米"},
        { id: "5", label: "个" },
        { id: "6", label: "次" },
        { id: "7", label: "块"},
        { id: "8", label: "天" },
        { id: "9", label: "组" },
        { id: "10", label: "台" },
        { id: "11", label: "捆" },
        { id: "12", label: "宗" },
        { id: "13", label: "项" },
        { id: "14", label: "株" },
        { id: "15", label: "宗" }
      ]
    },//单位列表
    onLoad: function () {
      this.mutexSelect = new MutexSelector ({
        selector: '#mutex-select',
        options: this.data.options
      })
    },
  onOpen (e) {
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    let item = list[index]
    this.mutexSelect.open({
      value: item.value,
      onChange: (item) => {
        item.value = item.id
        item.text = item.label
        this.setData({
          [`list[${index}]`]: item
        })
        this.mutexSelect.addSelected(item.id)
      }
    })
  }
})
```
## new MutexSelector(options)

用于初始化一个MutexSelector，返回初始化后的MutexSelector实例

## Options

| 参数 |  说明 | 类型 | 默认值 |
|------|-------|--------|-------|
| selector | 选择器id | String | #mutex-select |
| options | 数据源列表 | Array | —— |
| selectedList | 选中值列表 | Array | —— |
| title | 选择器标题 | String | 请选择 |
| value | 选中值 | String | —— |
| fieldNames | options元素对应的属性名 | Object | {label: 'label',value: 'id',disabled: 'disabled'}

## Methods

| 名称  |  说明  |   参数   |
|---------|--------|----------|
| open | 打开互斥选择器 | —— |
| close | 关闭互斥选择器 | options |
| setSelectedList | 设置选中列表 | 已被选中值list列表 |
| getSelectedList | 获取选中项列表 | —— |
| addSelected | 新增选中项 | {value: 选中项 }  |
| getSelected | 删除选中项 | {value: 选中项 } |

## Events

| 事件  |  说明  |   参数   |
|---------|--------|----------|
| onChange | 选中值发生变化时触发 | {value: 选中项 } |
| onClosed | 关闭互斥选择器触发 | —— |
| onTapDisabled | 点击禁用项时触发 | {value: 选中项 } |
| onTapSelected | 点击选中项时触发 | {value: 选中项 } |
