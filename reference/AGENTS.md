# 个人作品集网站 — 开发指令 (AGENTS.md)

## 项目概述

React + TypeScript + Vite 构建的个人作品集网站。展示开发者 tinyer（zjbTinyer）的全栈技能与项目。单页 SPA，通过锚点跳转（无路由），react-router-dom 虽已安装但**未使用**。

---

## 技术栈

- **框架**: React 19 + TypeScript 6
- **构建**: Vite 8 + @vitejs/plugin-react
- **样式**: Tailwind CSS 4（@tailwindcss/vite 插件，**不使用** postcss.config.js）
- **动画**: Framer Motion 12
- **国际化**: react-i18next + i18next
- **包管理**: pnpm

---

## 项目结构

```
src/
├── main.tsx                 # 入口：挂载 ThemeProvider
├── App.tsx                  # 根组件：Header + Hero + About + Projects + Contact + MessageBoard + Footer
├── index.css                # Tailwind 入口 + CSS 变量主题
├── contexts/ThemeContext.tsx # 主题上下文
├── i18n/{index,zh,en}.ts    # 国际化
├── utils/useVisitCount.ts   # 访问统计 Hook
├── data/{projects,skills}.ts# 静态数据
└── components/{Header,Hero,About,Projects,Contact,MessageBoard,Footer}.tsx
```

---

## 任务执行（Agent Run Tasks）

本项目定义的 scripts（在 `package.json` 中），agent 可以执行以下任务：

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

**CSS 变量清单**（定义在 `src/index.css`，`:root` 和 `.dark` 各一套）：
| 变量 | 用途 |
|------|------|
| `--color-bg-base` | 页面背景 |
| `--color-bg-surface` | 卡片/表面背景 |
| `--color-bg-muted` | 柔和背景 |
| `--color-border` | 边框 |
| `--color-text-primary` | 主文字 |
| `--color-text-secondary` | 次要文字 |
| `--color-text-muted` | 辅助文字 |
| `--color-scrollbar-track` | 滚动条轨道 |
| `--color-scrollbar-thumb` | 滚动条滑块 |
| `--color-scrollbar-thumb-hover` | 滚动条滑块悬停 |

> ⚠️ **已知不一致**：`Header.tsx` 和 `MessageBoard.tsx` 中存在硬编码颜色（如 `rgba(10,10,26,0.8)`、`bg-white/5 dark:bg-white/5 bg-gray-100/80`），尚未迁移到 CSS 变量。新代码应一律使用 CSS 变量。

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

## 常用命令

```bash
pnpm dev        # 启动开发服务器（开发时主命令）
pnpm build      # TypeScript 编译 + Vite 生产构建（重要: 修改代码后必须执行）
pnpm lint       # ESLint 检查（使用 eslint.config.js 扁平配置）
pnpm preview    # 预览构建产物
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