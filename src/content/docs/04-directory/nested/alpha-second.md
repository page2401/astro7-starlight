---
title: "嵌套实测 B：autogenerate 的子目录命名局限"
description: "演示 Starlight 原生 autogenerate 省去手写列表的同时，子文件夹名称直接暴露为英文分组标题的局限。"
sidebar:
  order: 2
  label: "B. autogenerate 命名局限"
---

当前文件的物理路径为：

```text
sites/astro7-starlight/src/content/docs/04-directory/nested/alpha-second.md
```

:::note[省心之处：永不产生“孤岛页”]
得益于 `astro.config.mjs` 中的 `autogenerate: { directory: '04-directory' }`，我们在 `04-directory/nested/` 下新建任意 `.md` 文件都会自动加入侧边栏，绝不会像 VitePress v1 那样因忘记改配置文件而变成无入口的孤岛页。
:::

:::caution[核心痛点：子目录分组标题从哪来？]
请观察本页左侧导航栏：这一组子页面的折叠标题直接显示成了英文原名 **`nested`**！
- 在 Starlight 中，如果开启了 `autogenerate` 递归扫描多级目录，框架**没有**类似 Docusaurus `_category_.json` 或 Hugo `_index.md` 的目录级元数据机制来把子目录 `nested/` 的显示名改为“嵌套子目录实测”。
- 你要么把物理文件夹直接改名为中文 `嵌套子目录/`（导致线上 URL 变成一长串 `%E5%B5%8C%E5%A5%97...` 编码），要么放弃顶层 `autogenerate`，退回 `astro.config.mjs` 逐层手写子分组结构！
:::

- [返回上一篇：《嵌套实测 A：Z 开头但靠 order 置顶》](/astro7-starlight/04-directory/nested/zeta-first)
- [返回《04. 目录结构与路由取舍》](/astro7-starlight/04-directory)
