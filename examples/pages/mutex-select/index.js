import { MutexSelector } from '../../dist/base/index'

// pages/select/index.js
let list = []
for(let i=0; i<6; i++) {
  list.push({
    id: i,
    text:'',
    value:''
  })
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
      list,
      actions: [
        {
          name: '删除',
          color: '#fff',
          background: '#FC5528',
          fontsize : '20',
          width : 80,
        }
      ],
      options: [
        { id: "1", label: "米"},
        { id: "2", label: "平方米"},
        { id: "3", label: "吨" },
        { id: "4", label: "立方米"},
        { id: "5", label: "个" },
        { id: "6", label: "次" },
        { id: "7", label: "块"},
        { id: "8", label: "天" },
        { id: "9", label: "组" },
        { id: "10", label: "台" },
        { id: "11", label: "捆" },
        { id: "12", label: "宗" },
        { id: "13", label: "项" },
        { id: "14", label: "株" },
        { id: "15", label: "宗" }
      ]
    },
    onLoad: function () {
      this.mutexSelect = new MutexSelector ({
        selector: '#mutex-select',
        options: this.data.options
      })
    },
  onOpen (e) {
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    let item = list[index]
    this.mutexSelect.open({
      value: item.value,
      onChange: (item) => {
        item.value = item.id
        item.text = item.label
        this.setData({
          [`list[${index}]`]: item
        })
        this.mutexSelect.addSelected(item.id)
      }
    })
  },
  onDelete (e) {
    let currentValue = e.currentTarget.dataset.value
    let currentId = e.currentTarget.dataset.id
    let index = this.data.list.findIndex(it => it.id === currentId)
    this.data.list.splice(index,1)
    if (currentValue) {
      this.mutexSelect.removeSelected(currentValue)
    }
    this.setData({
      list: this.data.list
    })
  }
})