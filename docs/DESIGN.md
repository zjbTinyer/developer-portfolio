# 设计文档合集 — Developer Portfolio

> 本文档整合了项目的 PRD（产品需求）、技术设计、开发指令，方便整体查阅与对比学习。
>
> 📁 原始文件：[PRD.md](../PRD.md) · [TECH_DESIGN.md](../TECH_DESIGN.md) · [AGENTS.md](../AGENTS.md)

---

## 目录

1. [产品需求文档 (PRD)](#1-产品需求文档-prd)
2. [技术设计文档 (TECH_DESIGN)](#2-技术设计文档-tech_design)
3. [开发指令 (AGENTS)](#3-开发指令-agents)

---

# 1. 产品需求文档 (PRD)

## 项目概述

个人作品集网站，展示开发者（tinyer / zjbTinyer）的技能、项目、联系方式等信息。
支持深色/浅色主题切换、中英文国际化、访问统计和留言板功能。

---

## 核心功能

### 1. 首页（Hero）
- GitHub 头像展示
- 大标题 + 个人简介
- CTA 按钮：「查看项目」和「联系我」
- 滚动指示器动画
- 内容入场动画（Framer Motion）

### 2. 关于我（About）
- 个人详细介绍
- 技能分类展示：后端开发、前端开发、AI 应用、工具 & 运维
- 技能标签可交互 hover
- 入场滚动动画

### 3. 项目展示（Projects）
- 项目卡片网格布局（响应式：1/2/3 列）
- 每张卡片包含：项目截图占位、标题、描述、技术栈标签、链接（在线预览/源代码）
- 卡片 hover 上浮效果 + 边框高亮
- 数据对接 GitHub 真实仓库

### 4. 联系方式（Contact）
- 四宫格布局：Email、GitHub、掘金、微信
- 图标 + 标签 + 值
- hover 高亮效果

### 5. 留言板（MessageBoard）
- 表单：昵称 + 留言内容
- 本地持久化（localStorage）
- 留言列表展示（按时间倒序）
- 支持删除留言（带确认弹窗）
- 空状态提示
- 提交成功反馈动画

### 6. 导航栏（Header）
- 固定顶部，毛玻璃效果
- 平滑滚动导航（首页 / 关于我 / 项目 / 留言板 / 联系方式）
- 响应式：桌面端横向菜单，移动端汉堡菜单
- **深色/浅色主题切换按钮**
- **中英文语言切换按钮**

### 7. 页脚（Footer）
- 版权信息
- GitHub / Email 图标链接
- **总访问量统计显示**

---

## 设计要求

| 要求 | 说明 |
|------|------|
| 设计风格 | 简洁现代、毛玻璃质感（Glassmorphism） |
| 主题 | 🌓 深色/浅色双主题，CSS 变量驱动 |
| 动画 | Framer Motion 入场动画 + 滚动触发 |
| 国际化 | 🌐 中文 / English，react-i18next |
| 响应式 | 移动端优先，全平台适配 |
| 配色 | 强调色：紫→粉渐变 (#a855f7 → #ec4899) |
| 背景 | 深色 #0a0a1a / 亮色 #f8f9fa |

## 数据来源
- 项目数据：GitHub API (`github.com/zjbTinyer`)
- 技能数据：本地 `src/data/skills.ts`
- 头像：GitHub Avatar
- 留言/访问统计/主题/语言：localStorage 持久化

## 目标用户
- 个人开发者作品展示
- 潜在雇主/客户浏览
- 技术社区交流

---

# 2. 技术设计文档 (TECH_DESIGN)

## 技术栈

| 层面 | 技术 | 版本 |
|------|------|------|
| 框架 | React 19 + TypeScript 6 | ^19 / ~6.0 |
| 构建 | Vite 8 | ^8.0 |
| 样式 | Tailwind CSS 4 | ^4.3 |
| 动画 | Framer Motion | ^12.40 |
| 国际化 | react-i18next + i18next | ^17 / ^26 |
| 路由 | react-router-dom（备用） | ^7.18 |

## 项目结构

```
developer-portfolio/
├── index.html                  # 入口 HTML
├── vite.config.ts              # Vite 配置（React + Tailwind 插件）
├── tsconfig.json               # TypeScript 配置
├── package.json                # 依赖管理（pnpm）
│
├── public/                     # 静态资源
│   └── favicon.svg
│
└── src/
    ├── main.tsx                # 渲染入口，挂载 ThemeProvider
    ├── App.tsx                 # 根组件，组合所有页面区块
    ├── index.css               # Tailwind 入口 + CSS 变量主题
    │
    ├── contexts/
    │   └── ThemeContext.tsx     # 主题上下文（深色/亮色切换 + 持久化）
    │
    ├── i18n/
    │   ├── index.ts            # i18next 初始化
    │   ├── zh.ts               # 中文翻译
    │   └── en.ts               # 英文翻译
    │
    ├── utils/
    │   └── useVisitCount.ts    # 访问统计 Hook（localStorage + sessionStorage）
    │
    ├── data/
    │   ├── projects.ts         # 项目数据（对接 GitHub）
    │   └── skills.ts           # 技能数据
    │
    └── components/
        ├── Header.tsx          # 导航栏（主题/语言切换 + 移动端菜单）
        ├── Hero.tsx            # 首页（头像 + 标题 + CTA）
        ├── About.tsx           # 关于我（技能分类展示）
        ├── Projects.tsx        # 项目展示（卡片网格）
        ├── Contact.tsx         # 联系方式
        ├── MessageBoard.tsx    # 留言板（表单 + 列表）
        └── Footer.tsx          # 页脚（版权 + 访问统计 + 社交链接）
```

---

## 核心架构设计

### 1. 主题系统（Theme System）

```
ThemeContext (React Context)
  ├── state: 'light' | 'dark'
  ├── 初始化: localStorage → 系统偏好 → 默认 dark
  ├── toggle: 切换主题，更新 <html>.classList ('dark')
  └── 持久化: localStorage.setItem('theme')
```

**CSS 变量方案**（`src/index.css`）：
- `:root` 定义亮色主题变量
- `.dark` 定义深色主题变量（覆盖同名变量）
- 组件使用 `var(--color-*)` 引用，切换时自动过渡

**变量清单**：

| 变量 | 用途 |
|------|------|
| `--color-bg-base` | 页面主背景 |
| `--color-bg-surface` | 卡片/表面背景 |
| `--color-bg-muted` | 柔和背景 |
| `--color-border` | 边框色 |
| `--color-text-primary` | 主文字色 |
| `--color-text-secondary` | 次要文字色 |
| `--color-text-muted` | 禁用/辅助文字色 |
| `--color-scrollbar-track` | 滚动条轨道 |
| `--color-scrollbar-thumb` | 滚动条滑块 |
| `--color-scrollbar-thumb-hover` | 滚动条滑块悬停 |

### 2. 国际化系统（i18n）

```
i18next + react-i18next
  ├── lng: localStorage('lang') || 'zh'
  ├── fallback: 'zh'
  ├── resources: { zh: translation, en: translation }
  └── Header 组件切换语言
```

每个组件通过 `useTranslation()` Hook 获取 `t()` 函数，按 key 引用翻译文本。

### 3. 数据流

```
┌──────────────┐    static     ┌──────────────┐
│  projects.ts │ ────────────→ │  Projects    │
│  skills.ts   │ ────────────→ │  About       │
└──────────────┘              └──────────────┘

┌──────────────┐    Context    ┌──────────────┐
│ ThemeContext  │ ────────────→ │  All         │
│              │               │  Components  │
└──────────────┘              └──────────────┘

┌──────────────┐    i18n       ┌──────────────┐
│ i18next      │ ────────────→ │  All         │
│              │               │  Components  │
└──────────────┘              └──────────────┘

┌─────────────────┐   Hook    ┌──────────────┐
│ useVisitCount   │ ────────→ │  Footer      │
│ (localStorage)  │           │              │
└─────────────────┘           └──────────────┘

┌─────────────────┐   direct  ┌──────────────┐
│ localStorage    │ ←───────→ │ MessageBoard │
│ (messages)      │           │              │
└─────────────────┘           └──────────────┘
```

---

## 组件层级

```
<ThemeProvider>                    # 主题上下文
  <App>
    <Header />                    # 导航 + 控制按钮
    <main>
      <Hero />                    # 首页
      <About />                   # 关于我
      <Projects />                # 项目展示
      <Contact />                 # 联系方式
      <MessageBoard />            # 留言板
    </main>
    <Footer />                    # 页脚
  </App>
</ThemeProvider>
```

---

## 样式方案

### Tailwind CSS v4 配置（`vite.config.ts`）

```ts
plugins: [react(), tailwindcss()]   // @tailwindcss/vite 插件
```

### Dark Mode 策略（`index.css`）

```css
@custom-variant dark (&:where(.dark, .dark *));
```

### 动画策略（Framer Motion）
- **入场动画**：`initial → animate` + `whileInView`
- **滚动触发**：`viewport: { once: true, margin: '-100px' }`
- **渐变强调色**：`bg-gradient-to-r from-purple-400 to-pink-400`

### 响应式断点

| 断点 | 布局 |
|------|------|
| 默认 (mobile) | 单列，汉堡菜单 |
| `sm` (640px) | 2 列网格 |
| `md` (768px) | 桌面导航，2 列技能 |
| `lg` (1024px) | 3 列项目卡片 |

---

## 数据管理

| 数据 | 存储方式 | 用途 |
|------|----------|------|
| 项目列表 | `src/data/projects.ts` | 静态数组，GitHub 仓库数据 |
| 技能列表 | `src/data/skills.ts` | 静态数组，4 分类技能项 |
| 主题偏好 | `localStorage('theme')` | 持久化主题选择 |
| 语言偏好 | `localStorage('lang')` | 持久化语言选择 |
| 访问计数 | `localStorage('portfolio_visit_count')` | 总访问量 |
| 会话标记 | `sessionStorage('portfolio_visited')` | 避免重复计数 |
| 留言数据 | `localStorage('portfolio_messages')` | 留言板持久化 |

---

## 外部依赖

| 包名 | 用途 |
|------|------|
| `framer-motion` | 滚动入场动画、移动端菜单展开收起 |
| `react-i18next` / `i18next` | 中英文国际化翻译 |
| `react-router-dom` | 已安装，当前未使用（SPA 单页） |
| `@tailwindcss/vite` | Tailwind CSS v4 Vite 插件 |
| `tailwindcss` | 原子化 CSS 框架 |

---

# 3. 开发指令 (AGENTS)

## 项目概述

React + TypeScript + Vite 构建的个人作品集网站。展示开发者 tinyer（zjbTinyer）的全栈技能与项目。单页 SPA，通过锚点跳转（无路由），react-router-dom 虽已安装但**未使用**。

---

## 任务执行（Agent Run Tasks）

| 命令 | 用途 | 说明 |
|------|------|------|
| `pnpm dev` | 启动开发服务器 | 热更新 HMR，localhost 预览 |
| `pnpm build` | TypeScript 编译 + 生产构建 | 构建前必须执行，确保无 TS 错误 |
| `pnpm lint` | ESLint 检查 | 使用扁平配置 eslint.config.js |
| `pnpm preview` | 预览构建产物 | 需先运行 `pnpm build` |

### 任务执行规范
- **修改代码后**：优先执行 `pnpm lint` 检查代码质量，再执行 `pnpm build` 确认构建通过
- **新建组件/文件后**：必须执行 `pnpm build` 确保无 TypeScript 编译错误
- **修改 i18n 翻译后**：需同时检查 `zh.ts` 和 `en.ts` 是否都添加了对应 key
- **修改 CSS 变量后**：需同时在 `:root`（亮色）和 `.dark`（深色）作用域中定义

---

## 开发规范

### 通用
- 使用 **函数式组件 + Hooks**
- 使用 **CSS 变量** 引用颜色（`var(--color-*)`），**禁止硬编码** 主题色
- 国际化文本通过 `useTranslation()` 的 `t()` 函数引用
- 组件添加 `id` 属性用于导航锚点
- 所有组件使用 `export default`（无命名导出）

### TypeScript 严格规则
- `tsconfig.app.json` 启用 `verbatimModuleSyntax: true` → **类型导入必须使用 `import type` 语法**
  ```tsx
  // ✅ 正确
  import { useState, type ReactNode } from 'react'
  import type { Project } from '../data/projects'

  // ❌ 错误：普通导入中混入类型
  import { Project } from '../data/projects'
  ```
- `strict: true` **未开启**，`noUnusedLocals`、`noUnusedParameters` 已启用
- `target: es2023`，`module: esnext`，`moduleResolution: bundler`，`jsx: react-jsx`

### Tailwind CSS v4 特有语法
- **不使用** `@tailwind` 指令 — 使用 `@import "tailwindcss"` 替代
- **不使用** `postcss.config.js` — 通过 `@tailwindcss/vite` 插件集成
- **Dark mode** 通过 `@custom-variant dark (&:where(.dark, .dark *))` 实现，**非** `prefers-color-scheme`
- 类名中使用 `dark:` 前缀切换深色样式（如 `dark:bg-gray-800`）

### 主题适配
所有组件必须适配深色/亮色两种主题：

```tsx
// ✅ 正确：使用 CSS 变量
<div style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-text-secondary)' }} />

// ❌ 错误：硬编码主题色
<div className="bg-gray-900 text-white" />
```

### 国际化
- 所有展示文本通过 `t('key')` 引用
- 新增 key 需同时添加到 `zh.ts`（无类型标注）和 `en.ts`（`Record<string, any>` 类型标注）
- 翻译 key 按组件命名空间组织（如 `hero.greeting`）
- 初始化优先级：`localStorage.getItem('lang') || 'zh'`（默认中文）

### 动画
- Framer Motion 滚动入场：`initial → whileInView`
- 配置 `viewport: { once: true, margin: '-100px' }`
- 延迟：不同卡片使用 `transition: { delay: index * 0.1 }`

### 数据
- 项目数据在 `data/projects.ts` 中维护（`Project` 接口：`id, title, description, techStack, image?, link?, github?`）
- 技能数据在 `data/skills.ts` 中维护（`Skill` 接口：`name, category, level` — 注意 `level` 字段定义了但 UI 未使用，`image` 字段定义了但组件使用 emoji 占位符）
- 用户生成数据（留言）存储在 `localStorage('portfolio_messages')`
- 访问统计存储在 `localStorage('portfolio_visit_count')` + `sessionStorage('portfolio_visited')`

---

## 关键实现细节

### 主题切换

```tsx
// src/contexts/ThemeContext.tsx
// 初始化优先级: localStorage → window.matchMedia('(prefers-color-scheme: light)') → 默认 dark
// 切换时更新 <html>.classList 的 'dark' class
// 持久化到 localStorage('theme')
// ⚠️ 注意: prefers-color-scheme 判断条件为 matches ? 'light' : 'dark'
//   所以系统无偏好或偏好 dark 时，默认走 dark
```

### 语言切换

```tsx
// Header 组件内
const toggleLanguage = () => {
    const next = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
}
```

### 访问统计

```tsx
// src/utils/useVisitCount.ts
// localStorage 存储总访问数
// sessionStorage 标记当前会话是否已计数（避免刷新重复+1）
// useEffect 空依赖，仅在 mount 时执行一次
```

### 留言板

```tsx
// src/components/MessageBoard.tsx
// localStorage('portfolio_messages') 存储留言 JSON[]
// 接口: { id: string, name: string, content: string, date: string }
// 表单 → 追加到数组头部 → 持久化
// 删除需 window.confirm 确认
// 成功提交显示提示 2 秒后自动隐藏
```

### 导航锚点滚动

```tsx
// Components use document.querySelector('#section-id')?.scrollIntoView({ behavior: 'smooth' })
// No React Router usage — pure DOM scroll API
```

---

## GitHub 对接信息

- **用户名**: zjbTinyer
- **头像**: `https://avatars.githubusercontent.com/u/23456881?v=4`
- **主页**: `https://github.com/zjbTinyer`
- **邮箱**: `543897497@qq.com`
- **掘金**: `Tinyer`
- **微信**: `s19931014`

---

## 注意事项

### 高优先级（违反会导致构建错误或功能异常）
1. **`verbatimModuleSyntax: true`** — 类型导入必须使用 `import type` 语法，否则 TypeScript 编译报错
2. **不要修改 CSS 变量命名**（所有组件依赖这些变量）
3. **不要引入新的 UI 框架**（已用 Tailwind，无需 Ant Design 等）
4. **新增 CSS 变量必须在 `:root` 和 `.dark` 两个作用域中都定义**
5. **构建前必须运行 `pnpm build`** 确保无 TypeScript 错误

### 中优先级（代码质量问题）
6. **使用 CSS 变量替代硬编码颜色** — 参见"已知不一致"说明
7. **性能**：图片用 `loading="lazy"`，大列表用 `key` 优化
8. **留言板数据在 localStorage**，无后端依赖
9. **Footer 版权声明**目前硬编码英文，未使用 `t('footer.copyright')` 翻译

### 低优先级（数据层面）
10. `data/skills.ts` 中 `Elasticsearch` 同时出现在 `backend` 和 `tools` 分类（可考虑去重）
11. `data/projects.ts` 中所有项目的 `link` 字段均为 `undefined`（在线预览链接不会显示）
12. `data/skills.ts` 的 `level` 字段、`data/projects.ts` 的 `image` 字段定义了但 UI 未使用

### 已知不一致（需逐步修复）
- `Header.tsx`: 导航栏背景使用硬编码 `rgba(10,10,26,0.8)` / `rgba(255,255,255,0.8)`，应迁移到 CSS 变量
- `MessageBoard.tsx`: 表单和卡片使用 `bg-white/5 dark:bg-white/5 bg-gray-100/80` 等硬编码 Tailwind 类，与 CSS 变量规范冲突
- `Projects.tsx`: 技术栈标签颜色硬编码 `rgba(168,85,247,0.1)` / `#d8b4fe`
- `Footer.tsx`: copyright 硬编码英文，未使用国际化 `t('footer.copyright', { year })`

---

> 📅 最后更新: 2026-06-19
> 原始文件: `PRD.md` · `TECH_DESIGN.md` · `AGENTS.md`
