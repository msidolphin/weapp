Page({
    onShareAppMessage() {
        return {
            title: 'iView Weapp',
            imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
        };
    },
    data: {
      visible: true,
      value: ['440000', '440400', '440403'],
      data: [
        {
          id: 1,
          label: '分类1',
          children: [
            {
              id: 11,
              label: '分类11',
              children: [
                {
                  id: 111,
                  label: '分类111'
                },
                {
                  id: 112,
                  label: '分类112'
                },
                {
                  id: 113,
                  label: '分类113'
                },
                {
                  id: 114,
                  label: '分类114'
                }
              ]
            },
            {
              id: 12,
              label: '分类12',
              children: [
                {
                  id: 121,
                  label: '分类121'
                },
                {
                  id: 122,
                  label: '分类122'
                },
                {
                  id: 123,
                  label: '分类123'
                },
                {
                  id: 124,
                  label: '分类124'
                }
              ]
            },
            {
              id: 13,
              label: '分类13',
              children: [
                {
                  id: 131,
                  label: '分类131'
                },
                {
                  id: 132,
                  label: '分类132'
                },
                {
                  id: 133,
                  label: '分类133'
                },
                {
                  id: 134,
                  label: '分类134'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '分类2',
          children: [{
            id: 21,
            label: '分类21',
            children: [
              {
                id: 211,
                label: '分类211'
              },
              {
                id: 212,
                label: '分类212'
              },
              {
                id: 213,
                label: '分类213'
              }
            ]
          }]
        }
      ]
    },
  onTap () {
    this.setData({
      visible: true
    })
  },
  onChange (e) {
    this.setData({
      value: e.detail.value
    })
  },
  onClose () {
    this.setData({
      visible: false
    })
  }
});