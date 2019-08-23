---
sidebarDepth: 1
---
# Input 输入框

## Import

```json
{
    "usingComponents": {
        "i-input": "../../dist/input/index"
    }
}
```

## Examples

注：列表以组为单位，使用cell-group组件包括，子元素为input组件
每一个cell-group组件中input和cell子元素不能同时出现

### 基础用法

#### json
```json
{
    "usingComponents": {
        "i-cell-group": "../../dist/cell-group/index"
    }
}
```

#### html
```html
<i-cell-group>
    <i-input required value="{{ value0 }}" placeholder="请输入姓名" bind:change="onChange"  />
    <i-input value="{{ value1 }}" title="姓名" placeholder="请输入姓名" />
    <i-input value="{{ value2 }}" type="number" title="手机号" placeholder="请输入手机号" maxlength="11"/>
    <i-input value="{{ value3 }}" type="textarea" show-arrow title="详细地址" placeholder="请输入详细地址(最多50字)" maxlength="50" />
</i-cell-group>
```

#### js
```js
data: {
    value0: '',
    value1: '',
    value2: '',
    value3: ''
},
onChange () {
    this.setData({
      value0: e.detail.detail.value
    }) 
}
```

### 自定义内容

#### json
```json
{
    "usingComponents": {
        "i-cell-group": "../../dist/cell-group/index"
    }
}
```

#### html
```html
<i-cell-group>
    <i-input title="性别" custom>
      <radio-group bindchange="onGenderChange">
        <label wx:for="{{gender}}">
          <radio value="{{item.name}}" color="#ffb700" checked="{{chekced === item.name}}"/>{{item.value}}
        </label>
      </radio-group>
    </i-input>
</i-cell-group>
```

#### js
```js
data: {
    gender: [
      { name: 'male', value: '男' },
      { name: 'female', value: '女'}
    ]
},
```

### 图标后置

#### json
```json
{
    "usingComponents": {
        "i-cell-group": "../../dist/cell-group/index"
    }
}
```

#### html
```html
 <i-cell-group >
    <i-input value="{{ value4 }}" icon-type="feedback_fill" bind:icon-tap="handleIconTap"  type="number" right title="消费总额" placeholder="询问收银员后输入" />
</i-cell-group>
```

#### js
```js
data: {
    value4: ''
},
handleIconTap () {
    console.log('你点击了图标')
}
```

### 输入框禁用

#### json
```json
{
    "usingComponents": {
        "i-cell-group": "../../dist/cell-group/index"
    }
}
```

#### html
```html
<i-cell-group>
    <i-input value="{{ value5 }}" title="用户信息" disabled />
</i-cell-group>
```

#### js
```js
data: {
    value5: '输入框已禁用'
},
```
### 自定义右侧内容 —— slot

#### json
```json
{
    "usingComponents": {
        "i-cell-group": "../../dist/cell-group/index"
    }
}
```

#### html
```html
<i-cell-group>
    <i-input disabled title="消息通知">
        <switch slot="extra"></switch>
    </i-input>
</i-cell-group>
```

## Attributes

| 参数    | 说明    | 类型    | 可选值    | 默认值    |
|---------|---------|--------|----------|----------|
| title | 左侧标题 | String | —— | —— |
| type | 输入框类型 | String | text/textarea/number/password | —— |
| disabled | 是否禁用 | Boolean | true/false | false |
| placeholder | 占位符 | String | —— | —— |
| autofocus | 是否自动聚焦 | Boolean | true/false | false |
| clearable | 是否显示清除按钮(只有value不为空且聚焦情况下才会显示) | Boolean | true/false | true |
| value | 绑定值 | String | —— | —— |
| iconType | 右侧图标类型 | String | —— | —— |
| right | 输入框文字是否居右 | Boolean | true/false | false |error |  输入展现错误状态 | Boolean | true/false | false |
| maxlength | 最大长度 |Number | —— | —— |
| required | 必填标识，title左侧会展现一个小红点 |Boolean | true/false | false |
| iconColor |  右侧图标颜色 | String | —— |#80848f |
|  showArrow | 是否展示右侧箭头并开启尝试以url跳转 |  Boolean | true/false | false |
| custom | 是否自定义内容 | Boolean | true/false | false |

## slot

| 插槽名   | 说明    |
|---------|---------|
| extra | 输入框最右侧插槽 |

## Events

| 事件名      | 说明    | 参数   |
|---------- |--------- |----------|
| icon-tap | 图标被点击事件 | { detail = {} } |
| change | 选中值发生变化时触发 | { detail = {},value: 当前绑定值 } |
| blur | 输入框失去焦点时触发| { detail = {} } |
| focus | 输入框聚焦时触发 | { detail = {} } |
| click | 输入框点击时触发 | { detail = {} } |
