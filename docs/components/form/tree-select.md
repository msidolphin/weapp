---
sidebarDepth: 1
---
# Tree-Select 树形选择器

## Import

```json
{
    "usingComponents": {
        "i-tree-select": "../../dist/tree-select/index"
    }
}
```

## Examples

### 一般用法——单选

#### html

```html
<i-panel title="单选">
  <view class='selected-list'>
    <i-tag color="blue">{{valueModel1.label}}</i-tag>
  </view>
  <i-tree-select value="{{value1}}" bind:change="onChange" controlled options="{{options}}"></i-tree-select>
</i-panel>
```
#### js

```js
data: {
    value1: 34,
    options: [
        {
            id: 1,
            label: '土建',
            children: [
              {
                id: 11,
                label: '瓦工'
              },
              {
                id: 12,
                label: '木工'
              },
              {
                id: 13,
                label: '钢筋工'
              },
              {
                id: 14,
                label: '混凝土工'
              },
              {
                id: 15,
                label: '油漆工'
              }
            ]
          },
          {
            id: 2,
            label: '安装材料',
            children: [
              {
                id: 21,
                label: '电气设备'
              },
              {
                id: 22,
                label: '给排水'
              },
              {
                id: 23,
                label: '消防安装'
              },
              {
                id: 24,
                label: '通风空调'
              }
            ]
          },
          {
            id: 3,
            label: '其它',
            children: [
              {
                id: 31,
                label: '塔吊司机'
              },
              {
                id: 32,
                label: '塔吊指挥'
              },
              {
                id: 33,
                label: '司索工'
              },
              {
                id: 34,
                label: '电焊工'
              },
              {
                id: 35,
                label: '保安'
              },
              {
                id: 36,
                label: '后勤'
              },
              {
                id: 37,
                label: '挖掘机司机'
              },
              {
                id: 38,
                label: '电工'
              }
            ]
        }
    ],//树形选择器绑定的数据源
    valueModel1: {
      id: 34,
      label: '电焊工'
    }
},
onChange () {
    let {value, options} = e.detail
    this.setData({
      value1: value,
      valueModel1: options
    })
}
```

### 一般用法——多选

#### html

```html
<i-panel title="多选">
  <view class='selected-list'>
    <i-tag wx:for="{{multipleValueModel1}}" wx:key="{{item.id}}" color="blue">{{item.label}}</i-tag>
  </view>
  <i-tree-select multiple limit="{{5}}" bind:exceed="onExceed" controlled value="{{multipleValue1}}" bind:change="onMultipleChange" options="{{options}}"></i-tree-select>
</i-panel>
```
#### js

```js
data: {
    multipleValue1: [12, 23, 34],
    multipleValueModel1: [
      {
        id: 12,
        label: '木工'
      },
      {
        id: 23,
        label: '消防安装'
      },
      {
        id: 34,
        label: '电焊工'
      }
    ],
    options: [],//树形选择器绑定的数据源
},
onMultipleChange (e) {
    let { value, options } = e.detail
    this.setData({
      multipleValue1: value,
      multipleValueModel1: options
    })
},
onExceed () {
    console.log("最大选中数量不能超过5个")
},
```

### 弹窗用法——单选

#### html

```html
<i-tree-select title="弹窗单选" visible="{{visible}}" type="popup" controlled value="{{value2}}" bind:change="onPopupChange" options="{{options}}"></i-tree-select>
```
#### js

```js
data: {
    visible: false,
    value2: 34,
    valueModel2: {
      id: 34,
      label: '电焊工'
    }
    options: [],//树形选择器绑定的数据源
},
onTap() {
    this.setData({
      visible: true
    })
},
onPopupChange (e) {
    let { value, options } = e.detail
    this.setData({
      value2: value,
      valueModel2: options
    })
},
```
### 弹窗用法——多选



```html
<i-tree-select title="弹窗多选" showNavbar visible="{{visibleMultiple}}" type="popup" multiple limit="{{5}}" bind:exceed="onExceed" controlled value="{{multipleValue2}}" bind:change="onPopupMultipleChange" options="{{options}}"></i-tree-select>
```



```js
data: {
    visibleMultiple: false,
    multipleValue2: [12, 23, 34],
    multipleValueModel2: [
      {
        id: 12,
        label: '木工'
      },
      {
        id: 23,
        label: '消防安装'
      },
      {
        id: 34,
        label: '电焊工'
      }
    ],
    options: [],//树形选择器绑定的数据源
}
onPopupMultipleChange (e) {
    let { value, options } = e.detail
    this.setData({
      multipleValue2: value,
      multipleValueModel2: options.map(item => item.label)
    })
},
onExceed () {
    console.log("最大选中数量不能超过5个")
},
```
## Attributes

| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|-------- |-------- |-------- |---------- |---------- |
| multiple| 是否多选 | Boolean |    ——    | false |
| options | 数据源   | Array   |    ——    |   ——   |
|  limit | 最大选择数量 | Number |   ——   | 0 |
| defaultValue | 默认值 | String, Array, Number | —— | —— |
| value | 绑定值 | String, Array, Number | —— | —— |
| controlled | 是否同步外部value的变更 | Boolean | —— | false |
| type | 树形选择器类型 | String | popup（弹窗类型） | —— |
| visible | 弹窗显示属性 | Boolean | —— | false |
| props | options元素对应的属性名 | Object | —— | { label: 'label',value: 'id',children: 'children'} |
| title | 弹窗标题 | String | —— | —— |
| showNavbar | 是否在头部栏显示选择项（仅对弹窗且多选有效） | Boolean | —— |  false |
 

## Events
| 事件名      | 说明    | 参数   |
|---------- |-------- |----------|
| change | 选中值发生变化时触发 | { value, options } |
| exceed | 选中数量超过最大选择数量 | ——  |
| close | 关闭弹窗 | —— |


