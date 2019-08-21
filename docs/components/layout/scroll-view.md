---
sidebarDepth: 1
---
# ScrollView 滚动视图

提供了下拉刷新和上拉加载功能，实现下拉刷新不再依赖于Page的onPullDownRefresh方法

## Import

```json
{
  "usingComponents": {
    "i-scroll-view": "../../dist/scroll-view/index"
  }
}
```

## Example

### wxml
```html
<view style='height:100%'>
  <i-scroll-view id="scrollView" bind:pulldownrefresh="onRefresh" bind:pullupload="onLoadMore">
    <i-cell-group>
      <i-cell title="{{item}}" wx:for="{{data}}" wx:key="index"/>
    </i-cell-group>
    <i-load-more/>
  </i-scroll-view>
</view>
```

### js

需要调用组件实例的`stopPullDownRefresh`方法结束下拉刷新
```js
function genData() {
  var data = []
  for (let i = 0; i < 20 + Math.floor(Math.random() * 15); ++i) {
    data.push(`列表项${Math.floor(Math.random() * 2001)}`)
  }
  return data
}

var data = genData()

Page({
  data: {
    data
  },
  onLoad () {
    this.scrollView = this.selectComponent('#scrollView')
  },
  onRefresh () {
    var data = genData()
    setTimeout(() => {
      this.setData({
        data
      })
      this.scrollView.stopPullDownRefresh()
    }, 2000)
  },
  onLoadMore () {
    var data = genData()
    setTimeout(() => {
      this.setData({
        data: this.data.data.concat(data)
      })
    }, 1000)
  }
})
```

## Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| reactive  | 下拉刷新功能是否处理激活状态，如果为false，则禁止下拉刷新   | boolean |  —  | true |
| top | 下拉刷新控件最大下拉距离，单位px | number | — | 160 |
| color | 下拉刷新控件颜色   | string  |   medium / small / mini            |    —     |
| backgroundColor | 下拉刷新控件背景色   | string    | circle / square | square   |
| enableBackToTop | iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向  | boolean    | — | false   |

## Events
| 事件名      | 说明    | 参数   |
|---------- |-------- |----------|
| pulldownrefresh | 触发下拉刷新 | — |
| pullupload | 触发上拉加载 | — |
| scroll | 视图滚动时触发 | scrollTop |