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
                            '/components/form/tree-select',
                            '/components/form/mutex-select'
                        ]
                    }
                ]
            }
        ]
    }
}