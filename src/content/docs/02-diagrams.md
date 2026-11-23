---
title: "02. 流程图与时序图（Mermaid）"
description: "测试 Astro 7 + Starlight 0.43.1 通过前置 remark 插件与 Mermaid 12 渲染流程图、时序图与状态机。"
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
sidebar:
  badge:
    text: "mermaid@12.3"
    variant: note
---

Astro Starlight 默认使用 `astro-expressive-code` 将 ` ```mermaid ` 代码块作为静态代码高亮展示。本子站通过自定义前置 `remark-mermaid.mjs` 插件将 Mermaid 节点转换为容器，并在覆写的 `Head.astro` 中打包最新 **`mermaid@12.3.0`**，联动 `data-theme` 实现深浅色无缝切换。

:::caution[插件管线与无头浏览器取舍]
社区部分构建期方案（如 `rehype-mermaid`）依赖在 CI 安装 Playwright / Chromium 无头浏览器，体积庞大且在边缘构建环境易受限；采用前置 Remark AST 转换 + Vite 打包客户端 `mermaid@12.3.0` 可在零外部依赖下支持最新的第 12 代图表语法与动态主题切换。
:::

## 1. 复杂子图与架构流程图（`flowchart TD`）

测试中文节点标签、子图嵌套（`subgraph`）、虚线边与条件分支：

```mermaid
flowchart TD
    subgraph MainRepo["主仓库 page2401.github.io"]
        Spec["相似 *.md 基准规范"]
        SubPtr["Git Submodule 指针 (sites/*)"]
        Workbench["对比工作台源码 (main)"]
    end

    subgraph SubRepo["独立子仓库 (如 astro7-starlight)"]
        SrcBranch["main 分支: 框架配置 + 适配版 *.md"]
        Actions{"GitHub Actions 构建"}
        PageBranch["page 孤儿分支: 纯静态 HTML/CSS/JS"]
        SrcBranch --> Actions
        Actions -->|"构建通过 + .nojekyll"| PageBranch
    end

    SubPtr -.->|"跟踪最新提交"| SrcBranch
    Workbench -->|"构建期提取真实 *.md"| Portal["https://page.2401.xyz/"]
    PageBranch -->|"GitHub Organization Pages"| SubSite["https://page.2401.xyz/astro7-starlight/"]
```

## 2. 编译管线交互时序图（`sequenceDiagram`）

测试多参与者生命线、`alt` 分支块及激活框（`activate`/`deactivate`）：

```mermaid
sequenceDiagram
    autonumber
    actor Author as 文档作者
    participant Git as 子模块 main 分支
    participant CI as GitHub Actions (Node 22)
    participant Engine as Astro 7 + Starlight 编译器
    participant Pages as GitHub Pages (page 分支)

    Author->>Git: 提交修改后的 *.md 文档
    Git->>CI: 触发 deploy-page.yml 工作流
    activate CI
    CI->>Engine: 执行 astro build
    activate Engine
    alt 包含数学公式 ($...$ / $$...$$)
        Engine->>Engine: remark-math + rehype-katex 生成静态 HTML
    else 包含 Mermaid 代码块
        Engine->>Engine: remark-mermaid 编码为 Base64 容器挂载点
    end
    Engine-->>CI: 输出静态产物至 dist/
    deactivate Engine
    CI->>Pages: force_orphan 推送产物与 .nojekyll
    deactivate CI
    Pages-->>Author: 子路径 /astro7-starlight/ 即刻生效
```

## 3. 子模块同步状态机（`stateDiagram-v2`）

测试状态机语法与状态迁移说明标签：

```mermaid
stateDiagram-v2
    [*] --> CleanSubmodule: git clone --recurse-submodules
    CleanSubmodule --> SubmoduleModified: 编辑子模块 *.md 基准文档
    SubmoduleModified --> SubmodulePushed: 子模块 commit & push origin main
    SubmodulePushed --> PageDeploying: 子仓库 Actions 自动更新 page 分支
    SubmodulePushed --> MainRepoUpdated: 主仓库 git add sites/* 更新指针
    PageDeploying --> LiveSynced: 子站实测渲染已就绪
    MainRepoUpdated --> LiveSynced: 主站源码差异视图已同步
    LiveSynced --> [*]
```
