---
title: "嵌套实测 A：Z 开头但靠 order 置顶"
description: "演示 Starlight 使用 sidebar.order 实现干净 URL 排序，同时在文件管理器中与字母序脱节的现象。"
sidebar:
  order: 1
  label: "A. Z 开头但靠 order 置顶"
---

当前文件的物理路径为（共 5 层深）：

```text
sites/astro7-starlight/src/content/docs/04-directory/nested/zeta-first.md
```

生成后的访问路由为（无任何数字前缀污染）：

```text
/astro7-starlight/04-directory/nested/zeta-first
```

:::tip[观察结论：干净 URL 与本地乱序的交换]
1. **线上路由优势**：尽管文件名以字母 `z` 开头（`zeta-first.md`），但由于在 Frontmatter 中声明了 `sidebar: { order: 1 }`，它在左侧导航栏中稳居 `alpha-second.md`（`order: 2`）上方，且 URL 完全不含 `01-` 前缀。
2. **本地维护代价**：切换到对比工作台的 **「工程目录树对比」** 视图可以看到，在物理文件系统中 `alpha-second.md` 排在 `zeta-first.md` 前面——当文档数量增长后，作者在编辑器侧栏很难直观定位“第 3 节对应哪个文件”。
:::

- [返回《04. 目录结构与路由取舍》](/astro7-starlight/04-directory)
- [下一篇：《嵌套实测 B：autogenerate 的分组命名局限》](/astro7-starlight/04-directory/nested/alpha-second)
