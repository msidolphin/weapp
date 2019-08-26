module.exports = {
    title: 'Weapp',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: 'Github', link: 'https://github.com/msidolphin/weapp' }
        ],
        sidebar: [
            '/guide/',
            {
                title: '组件',
                collapsable: false,
                children: [
                    {
                        title: '布局',
                        collapsable: false,
                        children: [
                            '/components/layout/layout',
                            '/components/layout/grid',
                            '/components/layout/list',
                            '/components/layout/collapse',
                            '/components/layout/scroll-view'
                        ]
                    },
                    {
                        title: '基础',
                        collapsable: false,
                        children: [
                            '/components/basic/color',
                            '/components/basic/button'
                        ]
                    },
                    {
                        title: '表单',
                        collapsable: false,
                        children: [
                            '/components/form/input',
                            '/components/form/radio',
                            '/components/form/checkbox',
                            '/components/form/switch',
                            '/components/form/rate',
                            '/components/form/input-number',
                            '/components/form/image-picker',
                            '/components/form/cascader',
                            '/components/form/tree-select',
                            '/components/form/select',
                            '/components/form/calendar-picker',
                            '/components/form/mutex-select'
                        ]
                    }
                ]
            }
        ]
    }
}