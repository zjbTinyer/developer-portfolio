# 技术设计文档

## 技术栈

| 层面 | 技术 | 版本 |
|------|------|------|
| 框架 | React 19 + TypeScript 6 | ^19 / ~6.0 |
| 构建 | Vite 8 | ^8.0 |
| 样式 | Tailwind CSS 4 | ^4.3 |
| 动画 | Framer Motion | ^12.40 |
| 国际化 | react-i18next + i18next | ^17 / ^26 |
| 路由 | react-router-dom（备用） | ^7.18 |

---

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
| 项目列表 | `src/data/projects.ts` | 静态数组，5 个 GitHub 仓库 |
| 技能列表 | `src/data/skills.ts` | 静态数组，4 分类 17 项技能 |
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