const { $Toast } = require('../../dist/base/index');
Page({
  data: {
    value1: '',
    value2: '',
    value3: '',
    value4: '输入框已禁用',
    value5: '',
    value6: '',
    value7: '',
    gender: [
      { name: 'male', value: '男' },
      { name: 'female', value: '女'}
    ],
    visible: false,
    text: [],
    region: ['440000', '440400', '440403']
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
  },
  openPicker () {
    this.setData({
      visible: true
    })
  },
  onPickerClose () {
    this.setData({
      visible: false
    })
  },
  onPickerChange (e) {
    this.setData({
      region: e.detail.value,
      text: e.detail.text.join('/')
    })
  }
});