---
sidebarDepth: 1
---
# Cascader 级联选择器

## Import

```json
{
    "usingComponents": {
        "i-cascader": "../../dist/cascader/index"
    }
}
```

## Examples

### 基本用法
#### html
```html
<view bindTap="open">{{labels}}<view>
<i-cascader visible="{{visible}}" default-value="{{value}}" title="所属工种" options="{{options}}" bind:change="onChange" bind:close="onClose"/>
```

#### js
```js
data: {
    visible: false,
    value: ['440000', '440400', '440404'],
    labels: '广东省/珠海市/金湾区',
    options: []
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
      labels: e.detail.options.map(o => o.label).join('/')
    })
},
onLoad () {
    setTimeout(() => {
      this.setData({
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
        ]
      })
    }, 1000)
}
```

### 特殊用法 —— 级联地区

#### html
```html
<view bindTap="openRegion">{{labelsRegion}}<view>
<i-cascader visible="{{visibleRegion}}" default-value="{{valueRegion}}" title="所在地区" mode="region" bind:change="onRegionChange" bind:close="onRegionClose"/>
```

#### js
```js
data: {
    visibleRegion: false,
    valueRegion: ['440000', '440400', '440404'],
    labelsRegion: '广东省/珠海市/金湾区'
},
openRegion () {
    this.setData({
      visibleRegion: true
    })
},
onRegionClose () {
    this.setData({
      visibleRegion: false
    })
},
onRegionChange (e) {
    this.setData({
      labelsRegion: e.detail.options.map(o => o.label).join('/')
    })
},
```

## Attributes

| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| visible | 弹窗显示状态 |Boolean | true/false | false |
| title | 标题 |String | —— | —— |
| options | 数据源 | Array | —— | —— |
| defaultValue | 默认选中值 | Array | —— | —— |
| value | 绑定值 | Array | —— | —— |
| controlled | 是否同步外部value的变更 | Boolean | true/false | false |
| props | options元素对应的属性名 | Object | —— |——|
| options | 数据源 | Array | ——| —— |
| chooseTitle | 二级标题 | String | —— | "请选择" |
| props | options元素对应的属性名 | Object | —— |——|
| mode | 数据源类型 | String | —— | —— |
| all |是否添加全部选择项 |Boolean | true/false |false |
| allValue | 所有项对应的value值 | String | —— | ——|
| allText | 所有项对应的text文本值 | String |——|"所有" |

## Events
| 事件名      | 说明    | 参数   |
|---------- |--------- |----------|
| change | 选中值发生变化时触发 | { value, options } |
| load | 选择完成时的回调函数 | { value, options }  |
| close | 关闭弹窗 | —— |