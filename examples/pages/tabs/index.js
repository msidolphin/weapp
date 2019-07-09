Page({
    data: {
        current: 'tab1',
        current_scroll: 'tab7',
        active: 1,
        tabs: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        tabs1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        tabs2: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    },

    onLoad () {
        // this.setData({
        //     tabs: this.data.tabs1,
        //     active: this.data.tabs1[0]
        // })
    },

    switch () {
        if (this.data.tabs[0] === this.data.tabs1[0]) {
            this.setData({
                tabs: this.data.tabs2,
                active: this.data.tabs2[0]
            }, () => {
                const tabs = this.selectComponent('#tabs')
                tabs.init()
            })
        } else {
            this.setData({
                tabs: this.data.tabs1,
                active: this.data.tabs1[0]
            }, () => {
                const tabs = this.selectComponent('#tabs')
                tabs.init()
            })
        }
    },

    handleChange2 ({ detail }) {
        this.setData({
            active: detail.key
        })
    },

    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
    },

    handleChangeScroll ({ detail }) {
        this.setData({
            current_scroll: detail.key
        });
    }
});