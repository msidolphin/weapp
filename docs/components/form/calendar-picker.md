---
sidebarDepth: 1
---
# Calendar-Picker 日历选择器

## Import

```json
{
    "usingComponents": {
        "i-calendar-picker": "../../dist/calendar-picker/index"
    }
}
```

## Examples

### 一般用法
#### html
```html
<view bindTap="onOpen1">{{text1}}<view>
<i-calendar-picker id="calendar"/>
```
#### js
```js
import { CalendarPicker } from '../../dist/base/index'

Page({
  data: {
    text1: ''
  },
  onLoad () {
    this.calendar = new CalendarPicker({
      onChange: (value, format) => {
        this.setData({
          text1: format
        })
      }
    })
  },
  onOpen1 () {
    this.calendar.open()
  },
  close () {
    this.calendar.close()
  }
})
```

### 范围选择
#### html
```html
<view bindTap="onOpen2">{{text2}}<view>
<i-calendar-picker id="calendar"/>
```
#### js
```js
import { CalendarPicker } from '../../dist/base/index'

Page({
  data: {
    text2: ''
  },
  onLoad () {
    this.rangeCalendar = new CalendarPicker({
      selector: '#rangeCalendar',
      range: true,
      onChange: (value, format) => {
        this.setData({
          text2: format
        })
      }
    })
  },
  onOpen2 () {
    this.rangeCalendar.open({
      maxDate: new Date()
    })
  }
})
```

## new CalendarPicker(options)

用于初始化一个CalendarPicker，返回初始化后的CalendarPicker实例

## Options

| 参数 |  说明 | 类型 | 可选值 默认值 |
|------|-------|--------|-------|-------|
| multiple | 是否多选 | Boolean |——| false |
| dateFormat | 日期格式 | String |——| 'yyyy-mm-dd' |
|placeholder | 标题 | String |——| '请选择日期' |
| value | 选中值 | Array |——| —— |
| range | 是否选择范围 |Boolean|—— | false |
| direction | 日历方向 | String |'vertical'/ 'horizontal'|'vertical' |
|fill | 是否在本月填充上一个月或下一个月的日期 | Boolean |——| true |
| lunar | 是否显示农历 | Boolean |——| true |
| markers | 日历上显示的标记日期 |Array |——| —— |
|minDate |最小日期 |String |——| —— |
|maxDate |最大日期 |String |——| —— |

## Methods

| 名称  |  说明  |   参数   |
|---------|--------|----------|
| open | 打开日历选择器 | —— |
| close | 关闭日历选择器 | options |
| update | 设置选中列表 | options |

## Events

| 事件  |  说明  |   参数   |
|---------|--------|----------|
| onChange | 选中值发生变化时触发 | {value: 选中项 } |
| onMonthAdd | 月份增加时触发 | {value: 当前月份 } |
| onOpen | 打开日历选择器时触发 | —— |
| onClose | 关闭日历选择器时触发 | —— |
| onMonthChange | 月份发生变化时触发 | {value: 当前月份 } |
| onDayClick | 天数发生变化时触发 | {value: 选中项 } |
| onMonthYearChangeStart | 开始年份发生变化时触发 | {value: 当前开始年份 } |
| onMonthYearChangeEnd | 结束年份发生变化时触发 | {value: 当前结束年份 } |