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
