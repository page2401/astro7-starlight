# page2401/astro7-starlight

独立静态站点对比子模块 —— **Astro 7 (`7.4.13`) + Starlight (`0.43.1`)**。

- **线上预览地址**：`https://page.2401.xyz/astro7-starlight/`
- **对比总站地址**：`https://page.2401.xyz/`
- **分支模型**：
  - `main`：仅保存纯工程源码与适配版 `*.md` / `*.mdx` 基准文档（挂载为主仓库 `sites/astro7-starlight` 子模块）
  - `page`：由 GitHub Actions 自动构建并强制覆盖的纯静态产物孤儿分支（供 GitHub Pages 发布）

## 精确锁定依赖版本

- `astro`: `7.4.13`
- `@astrojs/starlight`: `0.43.1`
- `@astrojs/markdown-remark`: `7.3.10`
- `remark-math`: `6.0.0`
- `rehype-katex`: `7.0.1`
- `katex`: `0.19.1`
- `mermaid`: `12.3.0`

## 本地开发与独立部署

```bash
npm install
npm run dev      # 本地开发预览
npm run build    # 构建至 dist/ (默认 base: /astro7-starlight)

# 如需部署到独立根域名（如 Cloudflare Pages）：
BASE_PATH=/ npm run build
```
