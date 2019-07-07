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