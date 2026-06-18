# 个人作品集网站 — 开发指令 (AGENTS.md)

## 项目概述

React + TypeScript + Vite 构建的个人作品集网站。展示开发者 tinyer（zjbTinyer）的全栈技能与项目。

---

## 技术栈

- **框架**: React 19 + TypeScript 6
- **构建**: Vite 8 + @vitejs/plugin-react
- **样式**: Tailwind CSS 4（@tailwindcss/vite 插件）
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

## 开发规范

### 通用
- 使用 **函数式组件 + Hooks**
- 使用 **CSS 变量** 引用颜色（`var(--color-*)`），**禁止硬编码** 主题色
- 国际化文本通过 `useTranslation()` 的 `t()` 函数引用
- 组件添加 `id` 属性用于导航锚点

### 主题适配
所有组件必须适配深色/亮色两种主题：

```tsx
// ✅ 正确：使用 CSS 变量
<div style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-text-secondary)' }} />

// ❌ 错误：硬编码主题色
<div className="bg-gray-900 text-white" />
```

**CSS 变量清单**：
- `--color-bg-base` — 页面背景
- `--color-bg-surface` — 卡片/表面背景
- `--color-bg-muted` — 柔和背景
- `--color-border` — 边框
- `--color-text-primary` — 主文字
- `--color-text-secondary` — 次要文字
- `--color-text-muted` — 辅助文字

### 国际化
- 所有展示文本通过 `t('key')` 引用
- 新增 key 需同时添加到 `zh.ts` 和 `en.ts`
- 翻译 key 按组件命名空间组织（如 `hero.greeting`）

### 动画
- Framer Motion 滚动入场：`initial → whileInView`
- 配置 `viewport: { once: true, margin: '-100px' }`
- 延迟：不同卡片使用 `transition: { delay: index * 0.1 }`

### 数据
- 项目数据在 `data/projects.ts` 中维护
- 技能数据在 `data/skills.ts` 中维护
- 用户生成数据（留言）存储在 localStorage

---

## 关键实现细节

### 主题切换
```tsx
// src/contexts/ThemeContext.tsx
// 读取 localStorage → 系统偏好 → 默认 dark
// 切换时更新 <html>.classList 的 'dark' class
// 持久化到 localStorage('theme')
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
```

### 留言板
```tsx
// src/components/MessageBoard.tsx
// localStorage('portfolio_messages') 存储留言 JSON
// 表单 → 追加到数组头部 → 持久化
// 删除需确认
```

---

## 常用命令

```bash
pnpm dev        # 启动开发服务器
pnpm build      # TypeScript 编译 + Vite 生产构建
pnpm lint       # ESLint 检查
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

1. **不要引入新的 UI 框架**（已用 Tailwind，无需 Ant Design 等）
2. **不要修改 CSS 变量命名**（所有组件依赖）
3. **性能**：图片用 `loading="lazy"`，大列表用 `key` 优化
4. **留言板数据在 localStorage**，无后端依赖
5. **构建前运行 `pnpm build`** 确保无 TypeScript 错误