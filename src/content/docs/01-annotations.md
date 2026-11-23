---
title: "01. 专属标注与元数据"
description: "测试 Astro 7 (7.4.13) + Starlight 0.43.1 的 Zod 强类型 Frontmatter、remark-directive 提示块、原生 details 与 GFM Alerts 兼容性。"
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
sidebar:
  badge:
    text: "SL 0.43.1"
    variant: tip
---

不同静态网站生成器对“提示框 / 标注（Callouts / Admonitions）”和页面元数据的语法约定存在显著分歧。本页使用统一语义的测试文本展示 **Astro 7 (`7.4.13`) + Starlight (`0.43.1`)** 的原生表现。

## 1. Frontmatter 元数据机制

Astro 7 + Starlight 采用**强类型 Zod Schema 校验**（在 `src/content.config.ts` 中通过 `docsSchema()` 声明）：`title` 为必填项，未在 Schema 中扩展的未知字段或类型错误会在 `astro build` 阶段直接报错拦截。

- **当前页标题字段**：`title: "01. 专属标注与元数据"`（Starlight 会自动渲染页面主 `<h1>`，因此正文无需重复手写一级标题）
- **目录深度字段**：`tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 }`
- **侧边栏徽章支持**：纯 `.md` 文件不支持直接内联 Vue/JSX `<Badge>`，但可在 Frontmatter 中配置 `sidebar.badge`（若需正文内联组件则须将文件后缀改为 `.mdx` 并显式 `import { Badge } from '@astrojs/starlight/components'`）。

## 2. 标准提示容器（Remark Directives）

Starlight 基于标准 `remark-directive`，使用 `:::<类型>[可选自定义标题]` 语法（`:::` 与类型名紧贴无空格，自定义标题必须包裹在紧随其后的 `[方括号]` 中，且警告关键字为 `caution`）：

:::note
默认信息提示块：静态站点对比平台的每个子模块均独立维护 `main`（源码）与 `page`（构建产物）双分支，互不污染提交历史。
:::

:::tip[性能优化建议（自定义标题）]
在 Astro Starlight 中，自定义标题必须写在紧跟类型名的 `[...]` 方括号中（若像 VitePress 那样在空格后写标题会被忽略）。支持内部嵌套行内代码如 `trailingSlash: 'ignore'` 与加粗强调。
:::

:::caution[版本边界注意]
注意区分关键字命名：Starlight 使用 `caution` 表示警告块，而 VitePress 使用 `warning`。
:::

:::danger[不可逆分支覆盖警告]
自动化流水线在向 `page` 分支推送构建产物时会启用 `force_orphan: true`，切勿在 `page` 分支直接手工修改代码！
:::

## 3. 可折叠详情容器（HTML Details 标签）

Starlight 未内置 `:::details` 指令容器，官方推荐直接使用语义化 HTML `<details>` 与 `<summary>` 标签，内部仍可正常解析空行后的 Markdown 语法：

<details>
<summary>点击展开查看 Starlight 容器语法源码结构</summary>

```markdown
:::tip[性能优化建议（自定义标题）]
自定义标题写在紧邻关键字的方括号内。
:::
```

除了代码块，折叠容器内同样支持列表、表格与数学公式 $f(x) = x^2 + 1$。

</details>

## 4. GitHub 风格引用警报（GFM Alerts）兼容性

许多开发者习惯在 GitHub Markdown 中直接编写 `> [!NOTE]` 语法。以下为未经任何改写的原始 GFM Alert 块在 Astro 7 + Starlight 0.43.1 下的实测渲染结果：

> [!NOTE]
> 这是一段标准的 GitHub Flavored Markdown `[!NOTE]` 警报文本。可观察 Starlight 当前版本是否将其自动转换为提示框或保留为原始引用块。

> [!IMPORTANT]
> 跨平台迁移 Markdown 文档时，是否原生兼容 `> [!IMPORTANT]` 与 `> [!WARNING]` 直接决定了旧文档的改造成本。

> [!CAUTION]
> 若目标生成器未内置 GFM Alert 解析器，上方标记会退化为普通引用块并原样露出 `[!CAUTION]` 字符串。
