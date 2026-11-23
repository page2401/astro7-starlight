import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { remarkMermaid } from './src/plugins/remark-mermaid.mjs'

const rawBase = process.env.BASE_PATH || '/astro7-starlight'
const base = rawBase === '/' ? '/' : rawBase.replace(/\/$/, '')

export default defineConfig({
  site: 'https://page.2401.xyz',
  base,
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [remarkMermaid, remarkMath],
    rehypePlugins: [rehypeKatex]
  },
  integrations: [
    starlight({
      title: 'Astro 7 · Starlight 0.43',
      description: 'SSG 多版本实测基准子站 — Astro 7.4.13 + Starlight 0.43.1 + KaTeX + Mermaid 12',
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN'
        }
      },
      components: {
        Head: './src/components/Head.astro'
      },
      customCss: [
        'katex/dist/katex.min.css',
        './src/styles/custom.css'
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/page2401/astro7-starlight'
        }
      ],
      sidebar: [
        {
          label: '对比总站导航',
          items: [
            { label: '← 返回 page.2401.xyz 总站', link: 'https://page.2401.xyz/' }
          ]
        },
        {
          label: 'Astro 7 Starlight 基准套件',
          items: [
            { label: '00. 版本与基准概览', slug: '' },
            { label: '01. 专属标注与元数据', slug: '01-annotations' },
            { label: '02. 流程图与时序图', slug: '02-diagrams' },
            { label: '03. 数学公式排版', slug: '03-math' },
            {
              label: '04. 目录结构与路由取舍',
              items: [{ autogenerate: { directory: '04-directory' } }]
            }
          ]
        }
      ]
    })
  ]
})
