# 智能知识库平台 UI CSS 规范

本文档基于 [ui-spec-viewer.html](/C:/workspace/vibecoding/project/RAG_PRD/HTML_preview/ui-spec-viewer.html) 中的全局样式变量、组件类样式和高频内联样式整理而成，目标是输出一套可复用、可落地的 CSS 规范，而不是展示页说明文字。

## 1. 设计基调

- 产品类型：企业级知识库 / 管理后台 / 用户门户
- 风格关键词：专业、克制、高信息密度、工业感、稳重
- 主视觉方向：蓝 + 灰 + 白，避免高饱和和娱乐化装饰
- 默认背景关系：页面灰底，内容白底，导航与结构区域使用浅灰分层

## 2. 设计 Token

### 2.1 颜色 Token

注意：源码前部存在一组旧蓝色变量，后续被再次声明覆盖。实际生效值以下面这一组为准。

| Token | 值 | 用途 |
| --- | --- | --- |
| `--primary-color` | `#0f62fe` | 主按钮、激活态、关键操作、重点数字 |
| `--primary-light` | `#4589ff` | hover 边框、弱高亮 |
| `--primary-dark` | `#0043ce` | 主按钮 hover、强调文本 |
| `--primary-bg` | `#edf5ff` | 选中背景、浅提示背景 |
| `--success-color` | `#198038` | 成功状态、启用态 |
| `--warning-color` | `#f1c21b` | 警告、处理中、接近阈值 |
| `--error-color` | `#da1e28` | 失败、危险操作、错误提示 |
| `--info-color` | `#005d5d` | 信息提示、辅助状态 |
| `--ai-accent` | `#8a3ffc` | AI 能力点缀色 |
| `--ai-accent-bg` | `#f6f2ff` | AI 场景浅背景 |
| `--gray-50` | `#f4f4f4` | 弱背景、表头、输入框底色 |
| `--gray-100` | `#e0e0e0` | 弱分隔、禁用背景、代码底色 |
| `--gray-200` | `#c6c6c6` | 默认边框、滚动条、进度底 |
| `--gray-300` | `#a8a8a8` | 次弱边框、hover 轮廓 |
| `--gray-400` | `#8d8d8d` | 占位符、说明文字、次级图标 |
| `--gray-500` | `#6f6f6f` | 次级正文、辅助说明 |
| `--gray-600` | `#525252` | 常规导航文字、表格次级信息 |
| `--gray-700` | `#393939` | 正文默认字色 |
| `--gray-800` | `#262626` | 次级标题 |
| `--gray-900` | `#161616` | 主标题、重点文本 |
| `--bg-primary` | `#ffffff` | 卡片、面板、弹层背景 |
| `--bg-secondary` | `#f4f4f4` | 页面背景 |
| `--bg-tertiary` | `#e0e0e0` | 侧栏背景、结构分区 |
| `--border-color` | `#c6c6c6` | 默认边框 |

### 2.2 阴影 Token

| Token | 值 | 用途 |
| --- | --- | --- |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | 普通卡片、导航条 |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.1)` | Toast、浮层、悬停态 |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | 抽屉 |
| `--shadow-xl` | `0 20px 40px rgba(0,0,0,0.15)` | 模态框 |

### 2.3 圆角 Token

| Token | 值 | 用途 |
| --- | --- | --- |
| `--radius-sm` | `4px` | 输入框、徽标、小标签 |
| `--radius-md` | `8px` | 按钮、卡片、下拉、Toast |
| `--radius-lg` | `12px` | 面板、大卡片、代码块 |
| `--radius-xl` | `16px` | 模态框、大容器 |
| `9999px` | 胶囊圆角 | Badge、Toggle、状态点、徽标 |

### 2.4 字体 Token

字体栈：

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans SC', 'PingFang SC', sans-serif;
```

等宽字体：

```css
font-family: 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
```

字号规范：

| Token | 值 | 用途 |
| --- | --- | --- |
| `--text-xs` | `12px` | 辅助信息、Badge、时间、次级元数据 |
| `--text-sm` | `14px` | 表单、按钮、表格、导航、正文辅助层 |
| `--text-base` | `16px` | 正文、主操作文案 |
| `--text-lg` | `18px` | 小节标题、卡片标题 |
| `--text-xl` | `20px` | 页面副标题 |
| `--text-2xl` | `24px` | 页面标题 |
| `--text-3xl` | `30px` | Hero 标题、核心数据 |

字重规范：

- `400`：正文、表单值、普通描述
- `500`：表头、字段标签、次级标题
- `600`：按钮、Badge、卡片标题、选中项
- `700`：页面标题、统计数字、Logo

行高规范：

- 正文：`1.6`
- 辅助说明：`1.4` 到 `1.5`
- 大标题：`1.2` 到 `1.4`
- 提示块：`1.7`

### 2.5 间距 Token

| Token | 值 | 用途 |
| --- | --- | --- |
| `--space-xs` | `4px` | 图标与文字微间距、细小内边距 |
| `--space-sm` | `8px` | 紧凑组件内部间距、行内分组 |
| `--space-md` | `16px` | 标准内容间距、表单组间距 |
| `--space-lg` | `24px` | 卡片内边距、章节间距 |
| `--space-xl` | `32px` | 页面内容内边距、模态框内边距 |
| `--space-2xl` | `40px` | 大区块分隔 |

### 2.6 动效 Token

| Token | 值 | 用途 |
| --- | --- | --- |
| `--transition-fast` | `150ms ease-in-out` | hover、focus、图标反馈 |
| `--transition-normal` | `300ms ease-in-out` | 一般状态切换 |
| `--transition-slow` | `500ms ease-in-out` | 大块区域过渡 |

补充动效：

- 滚动进度条：`width 100ms`
- Toggle：`200ms`
- Skeleton：`1.2s ease-in-out infinite`

## 3. 全局基础规范

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-size: 16px;
  color: var(--gray-700);
  background: var(--bg-secondary);
  line-height: 1.6;
}
```

规则：

- 全局使用 `border-box`
- 页面默认灰底，内容容器默认白底
- 默认文字颜色使用 `--gray-700`
- 大多数组件边框统一使用 `1px solid var(--border-color)`

## 4. 布局规范

### 4.1 页面骨架

- 顶部导航高度：`64px`
- 左侧导航宽度：`240px`
- 主内容区域：`margin-left: 240px`
- 内容最大宽度：`1100px`
- 内容区内边距：`32px 32px`

### 4.2 导航栏

- 背景：`#fff`
- 底部分隔线：`1px solid var(--border-color)`
- 阴影：`var(--shadow-sm)`
- Logo 文本：`18px / 700 / var(--gray-900)`
- 搜索框尺寸：`36px` 高，左侧图标预留 `36px` 内边距

### 4.3 侧边栏

- 背景：`var(--bg-tertiary)`
- 一级项高度：`40px`
- 组标题：`12px / 600 / uppercase / letter-spacing: 0.08em`
- 激活项：`primary-bg` 背景 + `primary-color` 文字 + 左侧 `3px` 激活条
- hover：背景切到 `gray-200`

### 4.4 区块结构

- Section 底部间距：`56px`
- Section Header：底部 `16px` padding + `2px` 分隔线
- 小节标题：`18px / 600 / gray-800`

## 5. 表面层级规范

### 5.1 卡片 / 面板

常规卡片高频组合：

```css
background: #fff;
border: 1px solid var(--border-color);
border-radius: 8px 或 12px;
box-shadow: var(--shadow-sm);
padding: 16px / 20px / 24px;
```

使用规则：

- 普通信息卡：`8px` 圆角
- 内容面板、示意区域：`12px` 圆角
- 大弹层、模态：`16px` 圆角 + `shadow-xl`
- 强调型卡片可加顶部 `3px` 语义色条

### 5.2 提示块

- 背景：`var(--gray-50)`
- 边框：`1px solid var(--border-color)`
- 左侧强调条：`3px solid var(--primary-color)`，危险提示改为 `error-color`
- 字号：`14px`
- 行高：`1.7`

### 5.3 表格

- 背景：白色
- 外边框：`1px solid var(--border-color)`
- 圆角：`12px`
- 表头背景：`var(--gray-50)`
- 表头字号：`14px`
- 单元格内边距：`10px 16px`
- 行 hover：`#f0f9ff`
- 表体分隔线：`1px solid var(--gray-100)`

## 6. 表单规范

### 6.1 Label

- 字号：`14px`
- 字重：`500`
- 颜色：`var(--gray-700)`
- 与控件间距：`6px`
- 必填星号：`var(--error-color)`

### 6.2 Input / Select / DatePicker

基础规格：

```css
height: 40px;
padding: 0 12px;
border: 1px solid var(--border-color);
border-radius: 4px 或 6px;
font-size: 14px;
background: #fff;
color: var(--gray-700);
```

交互态：

- focus：边框切主色，并出现 `0 0 0 3px rgba(59,130,246,0.15)` 外发光
- error：边框切 `var(--error-color)`
- 占位符 / 未填状态：`var(--gray-400)`

补充规则：

- 导航搜索框使用浅灰底 `var(--gray-50)`，普通表单输入框默认白底
- 紧凑筛选器常用 `36px` 高

### 6.3 Checkbox / Radio

- 原生控件尺寸：`16px * 16px`
- 推荐使用 `accent-color: var(--primary-color)`
- 文本字号：`14px`
- 行内间距：`8px`

### 6.4 Toggle

- 轨道尺寸：`44px * 24px`
- 默认背景：`var(--gray-300)`
- 开启背景：`var(--success-color)`
- 滑块尺寸：`18px * 18px`
- 滑块位移：关闭 `left: 3px`，开启 `left: 23px`

## 7. 按钮规范

基础结构：

```css
display: inline-flex;
align-items: center;
gap: 6px;
font-weight: 600;
border-radius: 8px;
border: 1px solid transparent;
transition: all 150ms ease-in-out;
white-space: nowrap;
```

尺寸：

| 规格 | 高度 | 内边距 | 字号 |
| --- | --- | --- | --- |
| `btn-sm` | `32px` | `6px 12px` | `14px` |
| `btn-md` | `40px` | `10px 20px` | `14px` |
| `btn-lg` | `48px` | `12px 24px` | `16px` |

类型：

| 类型 | 背景 | 文字 | 边框 | 交互 |
| --- | --- | --- | --- | --- |
| Primary | `primary-color` | `#fff` | 主色 | hover 切 `primary-dark`，轻微上浮 `translateY(-1px)` |
| Secondary | `#fff` | `gray-700` | `border-color` | hover 背景 `gray-50` |
| Danger | `error-color` | `#fff` | 错误色 | hover 使用更深红 |
| Ghost | 透明 | `primary-color` | 透明 | hover 使用 `primary-bg` |
| Disabled | `gray-100` | `gray-400` | `gray-200` | `cursor: not-allowed` |

规范要求：

- 危险操作按钮默认放在操作区右侧
- 高风险确认弹窗必须使用 `Danger` 样式

## 8. 标签与状态规范

### 8.1 Badge

- 高度：`22px`
- 内边距：`4px 8px`
- 圆角：`9999px`
- 字号：`12px`
- 字重：`600`

语义映射：

| 类型 | 背景 | 文字 |
| --- | --- | --- |
| Success | `#d1fae5` | `#065f46` |
| Warning | `#fef3c7` | `#92400e` |
| Danger | `#fee2e2` | `#991b1b` |
| Info | `#e0f2fe` | `#075985` |
| Primary | `#dbeafe` | `#1e40af` |
| Neutral | `var(--gray-100)` | `var(--gray-600)` |

### 8.2 Toast

- 宽度：`280px`
- 位置：右上角，距顶部和右侧常用 `16px` 到 `24px`
- 内边距：`12px 14px`
- 圆角：`8px`
- 阴影：`var(--shadow-md)`
- 左侧语义线：`3px`
- 堆叠间距：`8px`

### 8.3 状态色使用规则

- 成功：启用、发布成功、连接通过、解析完成
- 警告：处理中、资源接近上限、需关注但未失败
- 错误：失败、删除、阻断、不可恢复问题
- 信息：中性提醒、说明、系统提示
- 主色：当前选中、可点击关键路径、发布态

## 9. 图标与代码块规范

### 9.1 图标

- 图标库：Font Awesome 6.4
- 常规图标字号：`13px` 到 `20px`
- 导航图标通常：`13px`
- 卡片/功能图标通常：`16px` 到 `24px`
- 默认颜色：`gray-600` 或 `gray-400`
- 激活态：切换为 `primary-color`

### 9.2 代码块

- 代码块头部背景：`#334155`
- 代码块主体背景：`#1e293b`
- 字色：`#e2e8f0`
- 字号：`14px`
- 内边距：`16px`
- 圆角：`8px`

行内代码：

- 背景：`var(--gray-100)`
- 文字：`var(--primary-dark)`
- 圆角：`4px`
- 内边距：`2px 6px`

## 10. 特殊业务组件规范

### 10.1 Timeline

- 左侧时间线：`2px` 竖线
- 节点尺寸：`20px`
- live：实心成功色
- draft：白底 + 主色虚线边
- archived：灰色实心

### 10.2 进度条

- 底轨：`gray-200`
- 进度值：默认主色，告警可切 `warning-color`，健康可切 `success-color`
- 常见高度：`8px`
- 圆角：`4px`

### 10.3 统计卡 / 推荐卡

从内联样式归并出的高频规格：

- 小卡片 padding 常用 `10px` 或 `16px`
- 小卡圆角常用 `8px`
- 推荐角标：`10px` 字号，浅黄底，胶囊形
- 元数据字号：`10px` 到 `12px`
- 说明文案字号：`11px` 到 `14px`

## 11. 响应式规范

唯一明确断点：

```css
@media (max-width: 1024px) {
  .sidebar { transform: translateX(-100%); }
  .main { margin-left: 0; }
  #scroll-progress { left: 0; }
}
```

落地要求：

- `1024px` 以下默认收起侧边栏
- 主内容切满宽度
- 页面仍以桌面端优先，推荐适配基线为 `1366 × 768`
- 多列卡片与图标区统一允许 `wrap` 或 `auto-fill`

## 12. 实施建议

### 12.1 应优先抽成设计 Token 的内容

- 颜色
- 阴影
- 圆角
- 字号
- 间距
- 动效时长

### 12.2 应优先组件化的模式

- `Button`
- `Input / Select / SearchInput`
- `Badge`
- `Card / Panel`
- `Hint / Alert`
- `Table`
- `Toast`
- `Toggle`
- `Timeline`

### 12.3 源文件中的不一致项

- 色板展示区域仍出现旧蓝色和一组 Slate 灰阶示例，但根变量最终生效的是 IBM 风格蓝灰体系
- focus 发光仍使用 `rgba(59,130,246,0.15)`，与最终主色 `#0f62fe` 不完全一致，后续建议统一为主色对应 rgba
- 输入框圆角在类样式里常见 `4px`，内联样式里大量使用 `6px`，建议统一为：
  - 表单输入：`6px`
  - 按钮 / 卡片：`8px`
  - 面板 / 弹层：`12px`

## 13. 推荐的基础 Token 声明

```css
:root {
  --primary-color: #0f62fe;
  --primary-light: #4589ff;
  --primary-dark: #0043ce;
  --primary-bg: #edf5ff;
  --success-color: #198038;
  --warning-color: #f1c21b;
  --error-color: #da1e28;
  --info-color: #005d5d;
  --ai-accent: #8a3ffc;
  --ai-accent-bg: #f6f2ff;

  --gray-50: #f4f4f4;
  --gray-100: #e0e0e0;
  --gray-200: #c6c6c6;
  --gray-300: #a8a8a8;
  --gray-400: #8d8d8d;
  --gray-500: #6f6f6f;
  --gray-600: #525252;
  --gray-700: #393939;
  --gray-800: #262626;
  --gray-900: #161616;

  --bg-primary: #ffffff;
  --bg-secondary: #f4f4f4;
  --bg-tertiary: #e0e0e0;
  --border-color: #c6c6c6;

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
  --shadow-xl: 0 20px 40px rgba(0,0,0,0.15);

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 40px;

  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
}
```
