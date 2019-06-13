Page({
  onShareAppMessage() {
    return {
      title: 'iView Weapp',
      imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
    }
  },
  data: {
    components: {
      Layout: {
        label: '布局',
        show: false,
        pages: [
          {
            label: 'Layout 栅格布局',
            url: '/pages/layout/index'
          },
          {
            label: 'Grid 宫格',
            url: '/pages/grid/index'
          },
          {
            label: 'Panel 面板',
            url: '/pages/panel/index'
          },
          {
            label: 'List 列表',
            url: '/pages/list/index'
          },
          {
            label: 'Card 卡片',
            url: '/pages/card/index'
          }
        ]
      },
      Basic: {
        label: '基础组件',
        show: false,
        pages: [
          {
            label: 'Button 按钮',
            url: '/pages/button/index'
          },
          {
            label: 'Color 色彩',
            url: '/pages/color/index'
          },
          {
            label: 'Icon 图标',
            url: '/pages/icon/index'
          }
        ]
      },
      Navigator: {
        label: '导航',
        show: false,
        pages: [
          {
            label: 'TabBar 标签栏',
            url: '/pages/tab-bar/index'
          },
          {
            label: 'Tabs 页签',
            url: '/pages/tabs/index'
          },
          {
            label: 'Drawer 抽屉',
            url: '/pages/drawer/index'
          },
          {
            label: 'Steps 步骤条',
            url: '/pages/steps/index'
          },
          {
            label: 'NoticeBar 通告栏',
            url: '/pages/notice-bar/index'
          },
          {
            label: 'Index 索引列表',
            url: '/pages/index-list/index'
          },
          {
            label: 'Sticky 吸顶容器',
            url: '/pages/sticky/index'
          }
        ]
      },
      Feedback: {
        label: '操作反馈',
        show: false,
        pages: [
          {
            label: 'Toast 轻提示',
            url: '/pages/toast/index'
          },
          {
            label: 'Message 全局提醒',
            url: '/pages/message/index'
          },
          {
            label: 'Spin 加载中',
            url: '/pages/spin/index'
          },
          {
            label: 'Swipeout 滑动菜单',
            url: '/pages/swipeout/index'
          },
          {
            label: 'Picker 滚动选择器',
            url: '/pages/picker/index'
          }
        ]
      },
      View: {
        label: '视图',
        show: false,
        pages: [
          {
            label: 'Badge 徽章',
            url: '/pages/badge/index'
          },
          {
            label: 'Alert 警告提示',
            url: '/pages/alert/index'
          },
          {
            label: 'Tag 标签',
            url: '/pages/tag/index'
          },
          {
            label: 'Progress 进度条',
            url: '/pages/progress/index'
          },
          {
            label: 'Avatar 头像',
            url: '/pages/avatar/index'
          },
          {
            label: 'CountDown 倒计时',
            url: '/pages/count-down/index'
          },
          {
            label: 'Divider 分隔符',
            url: '/pages/divider/index'
          },
          {
            label: 'Collapse 折叠面板',
            url: '/pages/collapse/index'
          },
          {
            label: 'LoadMore 页底提示',
            url: '/pages/load-more/index'
          }
        ]
      },
      Form: {
        label: '表单',
        show: false,
        pages: [
          {
            label: 'Input 输入框',
            url: '/pages/input/index'
          },
          {
            label: 'Radio 单选',
            url: '/pages/radio/index'
          },
          {
            label: 'Checkbox 单选',
            url: '/pages/checkbox/index'
          },
          {
            label: 'Switch 开关',
            url: '/pages/switch/index'
          },
          {
            label: 'Rate 评分',
            url: '/pages/rate/index'
          },
          {
            label: 'InputNumber 数字输入框',
            url: '/pages/input-number/index'
          },
          {
            label: 'ImagePicker 图片选择',
            url: '/pages/image-picker/index'
          },
          {
            label: 'Cascader 级联选择器',
            url: '/pages/cascader/index'
          },
          {
            label: 'TreeSelect 树选择器',
            url: '/pages/tree-select/index'
          },
          {
            label: 'Select 选择器',
            url: '/pages/select/index'
          }
        ]
      },
      Modal: {
        label: '模态容器',
        show: false,
        pages: [
          {
            label: 'Popup 弹出层',
            url: '/pages/popup/index'
          },
          {
            label: 'Modal 模态框',
            url: '/pages/modal/index'
          },
          {
            label: 'ActionSheet 动作面板',
            url: '/pages/action-sheet/index'
          },
          {
            label: 'BottomDrawer 上拉抽屉',
            url: '/pages/bottom-drawer/index'
          }
        ]
      }
    }
  },
  toggle (e) {
    let { key } = e.currentTarget.dataset
    let components = this.data.components
    Object.keys(components).forEach(k => {
      if (k == key) {
        components[key].show = !components[key].show
      } else {
        components[k].show = false
      }
    })
    this.setData({
      components
    })
  }
})