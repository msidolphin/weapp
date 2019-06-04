const { $Toast } = require('../../dist/base/index');
Page({
    data: {
        value1: '',
        value2: '',
        value3: '',
        value4: '输入框已禁用',
        value5: '',
        value6: '',
        value7: ''
    },
  handleIconTap () {
    $Toast({
      content: '你点击了图标'
    });
  },
  onChange (e) {
    this.setData({
      value1: e.detail.detail.value
    })
  }
});