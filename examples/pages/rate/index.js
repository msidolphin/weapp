Page({
  data: {
    starIndex1: 0,
    starIndex2: 0,
    starIndex3: 0,
    starIndex4: 4,
    starIndex5: 0,
    starIndex6: 4.4,
    starIndex7: 0
  },
  onChange1(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex1': index
    })

  },
  onChange2(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex2': index
    })
  },
  onChange3(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex3': index
    })
  },
  onChange4(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex7': index
    })
  },
  onChange5(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex5': index
    })
  }
});