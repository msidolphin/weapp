# 快速上手
## 使用之前
在开始使用之前，你需要先阅读 微信小程序自定义组件 的相关文档。

## 如何使用
到 GitHub 下载组件的代码，将 dist 目录拷贝到自己的项目中。然后按照如下的方式使用组件，以 Button 为例，其它组件在对应的文档页查看：

1. 添加需要的组件。在页面的 json 中配置（路径根据自己项目位置配置）：

```json
"usingComponents": {
    "i-button": "../../dist/button/index"
}
```

2. 在 wxml 中使用组件：
```html
<i-button type="primary" bind:click="handleClick">这是一个按钮</i-button>
```

### 从 GitHub 下载后，安装依赖
```
npm install
```
### 编译组件
```
npm run dev
```
然后，将 examples 目录在微信开发者工具中打开即可。

## 定制主题
本项目使用了`Less`对样式进行预处理，并内置了一些样式变量，通过替换样式变量即可定制你自己需要的主题。

修改config目录下的theme.js文件中的配置项即可，所有可配置的变量如下：
```less
@primary-color          : #ffb700;
@primary-color-light    : #FFF5D9;
@info-color             : #FFC900;
@success-color          : #66D0AA;
@warning-color          : #FF9A4E;
@error-color            : #FC5528;
@link-color             : #4D5AFC;
@link-hover-color       : tint(@link-color, 20%);
@link-active-color      : shade(@link-color, 5%);
@selected-color         : fade(@primary-color, 90%);

@tooltip-color          : #fff;
@subsidiary-color       : #80848f;
@rate-star-color        : #f5a623;

@title-color            : #333333;
@text-color             : #4C4E52;
@assist-color           : #6E6F73;

@background-color-base  : #f7f7f7;  // base

// Border color
@border-color-base      : #dddee1;  // outside
@border-color-split     : #e9eaec;  // inside

// Button
@btn-font-weight        : normal;
@btn-padding-base       : 6px 15px;
@btn-padding-large      : 6px 15px 7px 15px;
@btn-padding-small      : 2px 7px;
@btn-font-size          : 12px;
@btn-font-size-large    : 14px;
@btn-border-radius      : 4px;
@btn-border-radius-small: 3px;
@btn-group-border       : shade(@primary-color, 5%);

@btn-disable-color      : #bbbec4;
@btn-disable-bg         : @background-color-base;
@btn-disable-border     : @border-color-base;

@btn-default-color      : @text-color;
@btn-default-bg         : @background-color-base;
@btn-default-border     : @border-color-base;

@btn-primary-color      : #fff;
@btn-primary-bg         : @primary-color;

@btn-info-color         : #fff;
@btn-success-color      : #fff;
@btn-warning-color      : #fff;
@btn-error-color        : #fff;

@btn-ghost-color        : @text-color;
@btn-ghost-bg           : transparent;
@btn-ghost-border       : @border-color-base;

@btn-circle-size-large  : 48px;
@btn-circle-size        : 44px;
@btn-circle-size-small  : 40px;
```
`theme.js`导出上述变量重新编译项目即可覆盖主题
```js
const borderColor = '#dddee1'
const backgroundColor = '#f7f7f7'

const theme = {
    primary: '#ffb700', // 主题色
    lightPrimary: '#fff5d9', // 主题色 轻
    link: '#4d5afc', // 链接
    info: '#ffc900',
    success: '#66d0aa', // 成功
    warning: '#ff9a4e', // 警告
    error: '#fc5528', // 错误
    title: '#333', // 标题
    content: '#4c4e52', // 正文
    assist: '#6e6f73', // 辅助文字
    border: '#dddee1', // 边框
    divider: '#e9e4ec', // 分割线
    background: '#f8f8f9',  // 背景色
    // 按钮 start
    // 颜色
    btnDefaultBackgroundColor: backgroundColor, // 按钮默认背景色
    btnDefaultColor: '#333', // 按钮默认文字颜色
    btnDefaultBorder: borderColor,
    btnPrimaryColor: '#333',
    btnInfoColor: '#fff',
    btnSuccessColor: '#fff',
    btnWarningColor: '#fff',
    btnErrorColor: '#fff',
    btnDisableColor: '#bbbec4',
    btnDisableBackgroundColor: backgroundColor,
    btnDisableBorder: borderColor,
    // 尺寸
    btnFontWeight: 'normal',
    btnPadding: '6px 15px',
    btnPaddingLarge: '6px 15px 7px 15px',
    btnPaddingSmall: '2px 7px',
    btnFontSize: '12px',
    btnFontSizeLarge: '14px',
    btnBorderRadius: '4px',
    btnBorderRadiusSmall: '3px',
    btnCircleSizeLarge: '48px', // large按钮的高度 圆角 行高
    btnCircleSize: '44px', // 按钮的高度 圆角 行高
    btnCircleSizeSmall: '40px' // samll按钮的高度 圆角 行高
    // 按钮 end
}

module.exports = {
    '@primary-color': theme.primary,
    '@link-color': theme.link,
    '@info-color': theme.info,
    '@success-color': theme.success,
    '@warning-color': theme.warning,
    '@error-color': theme.error,
    '@title-color': theme.title,
    '@text-color': theme.content,
    '@assist-color': theme.assist,
    '@btn-font-weight': theme.btnFontWeight,
    '@btn-padding': theme.btnPadding,
    '@btn-padding-large': theme.btnPaddingLarge,
    '@btn-padding-small': theme.btnPaddingSmall,
    '@btn-font-size': theme.btnFontSize,
    '@btn-font-size-large': theme.btnFontSizeLarge,
    '@btn-border-radius': theme.btnBorderRadius,
    '@btn-border-radius': theme.btnBorderRadiusSmall,
    '@btn-disable-color': theme.btnDisableColor,
    '@btn-disable-bg': theme.btnDisableBackgroundColor,
    '@btn-disable-border': theme.btnDisableBorder,
    '@btn-default-color': theme.btnDefaultColor,
    '@btn-default-bg': theme.btnDefaultBackgroundColor,
    '@btn-default-border': theme.btnDefaultBorder,
    '@btn-primary-color': theme.btnPrimaryColor,
    '@btn-primary-bg': theme.primary,
    '@btn-info-color': theme.btnInfoColor,
    '@btn-success-color': theme.btnSuccessColor,
    '@btn-warning-color': theme.btnWarningColor,
    '@btn-error-color': theme.btnWarningColor,
    '@btn-circle-size-large': theme.btnCircleSizeLarge,
    '@btn-circle-size': theme.btnCircleSize,
    '@btn-circle-size-small': theme.btnCircleSizeSmall
}
```