---
sidebarDepth: 1
---

# Collapse 折叠面板

## Import

```json
{
  "usingComponents": {
    "i-collapse": "../../dist/collapse/index",
    "i-collapse-item": "../../dist/collapse-item/index"
  }
}
```
## Example

### 基本用法
#### wxml
```html
<i-collapse>
    <i-collapse-item title="前端开发工程师">开发</i-collapse-item>
    <i-collapse-item title="后端开发工程师">开发</i-collapse-item>
</i-collapse>
```
### 手风琴模式
#### wxml
```html
<i-collapse accordion>
    <i-collapse-item title="前端开发工程师">开发</i-collapse-item>
    <i-collapse-item title="后端开发工程师">开发</i-collapse-item>
</i-collapse>
```
### 单元格选项
#### wxml
```html
<i-collapse accordion>
    <i-collapse-item title="前端开发工程师" label="李小龙">
        开发
    </i-collapse-item>
    <i-collapse-item title="后端开发工程师">
        <i-icon type="like_fill" slot="icon" />
        开发
    </i-collapse-item>
    <i-collapse-item title="测试工程师" extra="李小龙">
        测试
    </i-collapse-item>
</i-collapse>
```
### 结合列表使用

#### json

```json
{
  "usingComponents": {
    "i-cell-group": "../../dist/cell-group/index",
    "i-cell": "../../dist/cell/index"
  }
}
```

#### wxml
```html
<i-collapse accordion>
    <i-collapse-item title="前端开发工程师">
        <i-cell-group>
            <i-cell title="店长姓名" value="张三"/>
            <i-cell title="联系方式" value="18600000001"/>
      </i-cell-group>
    </i-collapse-item>
</i-collapse>
```

## Attributes（collapse）
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| collapse| 是否手风琴模式 | Boolean | true/false | —— |

## Attributes（collapse-item）

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 左侧标题 | String | —— | —— |
| label | 左侧标题下方的描述信息 | String | —— | —— |
| extra | 右侧内容 | String | —— | —— |
| collapse| 初始化是否展开 | Boolean | true/false | true |

## Slot
| 插槽名   | 说明    |
|---------|---------|
| icon | 折叠面板每项左侧图标插槽 |



