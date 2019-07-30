---
sidebarDepth: 1
---
# Button 按钮

## Import

```json
{
  "usingComponents": {
    "i-button": "../../dist/button/index"
  }
}
```

## Examples

### 一般用法

```html
<i-button>一般用法</i-button>
<i-button type="primary">一般用法</i-button>
<i-button type="success">一般用法</i-button>
```

### 行内按钮

```html
<i-button inline>行内按钮</i-button>
<i-button inline type="primary">行内按钮</i-button>
<i-button inline type="success">行内按钮</i-button>
```

### 长按钮
```html
<i-button type="primary" long>一般用法</i-button>
```

### 不同尺寸
```html
<i-button type="primary" size="large">大尺寸</i-button>
<i-button type="primary" size="default">默认尺寸</i-button>
<i-button type="primary" size="small">小尺寸</i-button>
```

### 圆角
```html
<i-button type="success" shape="circle" size="large">大尺寸</i-button>
<i-button type="success" shape="circle">默认尺寸</i-button>
<i-button type="success" shape="circle" size="small">小尺寸</i-button>
```

### 状态
```html
<i-button type="primary" loading>加载中</i-button>
<i-button type="primary" disabled>禁用按钮</i-button>
```

## Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string    |   primary / success / warning / error |     —    |
| inline | 是否为行内按钮 | boolean | — | false |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| shape     | 按钮样式   | string    | circle / square | square   |
| disabled     | 是否禁用状态   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| long     |  是否为长按钮  | boolean    | — | false   |
| openType  | 微信开放能力 | string   | —   | —   |
| appParameter  | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 | string   |  —  |  —  |
| hoverStopPropagation  | 指定是否阻止本节点的祖先节点出现点击态 | boolean   |  —  |  false  |
| hoverStartTime| 按住后多久出现点击态，单位毫秒 | number | — | 20 |
| hoverStayTime| 手指松开后点击态保留时间，单位毫秒 | number | — | 20 |
| lang| 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。 | string | — | en |
| sessionFrom| 会话来源，open-type="contact"时有效 | string | — | — |
| sendMessageTitle| 会话内消息卡片标题，open-type="contact"时有效 | string | — | — |
| sendMessagePath| 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 | string | — | — |
| sendMessageImg| 会话内消息卡片图片，open-type="contact"时有效 |string| — | — |
| showMessageCard| 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | boolean | — | false |

## Events
| 事件名      | 说明    | 参数   |
|---------- |-------- |----------|
| click | 点击事件 | — |
| long-press | 长按事件 | — |
| getuserinfo | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致，open-type="getUserInfo"时有效	 | detail |
| contact | 客服消息回调，open-type="contact"时有效 | detail |
| getphonenumber | 获取用户手机号回调，open-type=getPhoneNumber时有效 | detail |
| error | 当使用开放能力时，发生错误的回调，open-type=launchApp时有效 | detail |