# 快速上手
## 使用之前
在开始使用之前，你需要先阅读 微信小程序自定义组件 的相关文档。

## 如何使用
到 GitHub 下载组件的代码，将 dist 目录拷贝到自己的项目中。然后按照如下的方式使用组件，以 Button 为例，其它组件在对应的文档页查看：

1. 添加需要的组件。在页面的 json 中配置（路径根据自己项目位置配置）：

```json
"usingComponents": {
    "i-button": "../../dist/button/index"
}
```

2. 在 wxml 中使用组件：
```html
<i-button type="primary" bind:click="handleClick">这是一个按钮</i-button>
```

### 从 GitHub 下载后，安装依赖
npm install

### 编译组件
npm run dev
然后，将 examples 目录在微信开发者工具中打开即可。