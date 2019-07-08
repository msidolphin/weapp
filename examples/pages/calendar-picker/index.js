import { CalendarPicker } from '../../dist/base/index'


Page({
  data: {
    text1: '',
    text2: ''
  },
  onLoad () {
    this.calendar = new CalendarPicker({
      onChange: (value, format) => {
        this.setData({
          text1: format
        })
      }
    })
    this.rangeCalendar = new CalendarPicker({
      selector: '#rangeCalendar',
      range: true,
      onChange: (value, format) => {
        this.setData({
          text2: format
        })
      }
    })
  },
  onOpen1 () {
    this.calendar.open()
  },
  onOpen2 () {
    this.rangeCalendar.open()
  },
  close () {
    this.calendar.close()
  }
})