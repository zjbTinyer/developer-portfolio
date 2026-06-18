# 👨‍💻 个人作品集 — Developer Portfolio

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-zjbTinyer-181717?logo=github)](https://github.com/zjbTinyer)
[![掘金](https://img.shields.io/badge/掘金-Tinyer-1e80ff)](https://juejin.im)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)

</div>

一个由 **React + TypeScript + Vite** 构建的现代个人作品集网站，展示全栈开发技能与项目。支持深色/浅色双主题、中英文国际化、访问统计和留言板功能。

---

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 🌓 **双主题** | 深色/浅色主题自由切换，CSS 变量驱动，持久化偏好 |
| 🌐 **国际化** | 中文 / English 无缝切换，react-i18next 实现 |
| 🎬 **流畅动画** | Framer Motion 滚动入场动画，卡片延迟渐入 |
| 📱 **响应式设计** | 移动端优先，全平台适配，汉堡菜单 |
| 🧊 **毛玻璃质感** | 导航栏毛玻璃效果，卡片悬浮上浮动效 |
| 📝 **留言板** | 本地 localStorage 持久化，支持发布与删除 |
| 📊 **访问统计** | 总访问量计数，同一会话不重复统计 |
| 🏷️ **技能展示** | 按分类展示技术栈（后端/前端/AI/工具） |
| 📂 **项目展示** | 项目卡片网格布局，技术栈标签，GitHub 链接 |

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | React 19 + TypeScript 6 |
| **构建** | Vite 8 + @vitejs/plugin-react |
| **样式** | Tailwind CSS 4（@tailwindcss/vite 插件） |
| **动画** | Framer Motion 12 |
| **国际化** | react-i18next + i18next |
| **状态管理** | React Hooks + Context |
| **包管理** | pnpm |

---

## 🚀 快速开始

```bash
# 1. 克隆仓库
git clone git@github.com:zjbTinyer/developer-portfolio.git
cd developer-portfolio

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 构建生产版本
pnpm build

# 5. 预览构建产物
pnpm preview
```

---

## 📁 项目结构

```
src/
├── main.tsx                     # 入口：挂载 ThemeProvider
├── App.tsx                      # 根组件
├── index.css                    # Tailwind 入口 + CSS 变量主题
├── contexts/ThemeContext.tsx     # 主题上下文
├── i18n/                        # 国际化配置
│   ├── index.ts
│   ├── zh.ts                    # 中文翻译
│   └── en.ts                    # 英文翻译
├── utils/useVisitCount.ts       # 访问统计 Hook
├── data/
│   ├── projects.ts              # 项目数据
│   └── skills.ts                # 技能数据
└── components/
    ├── Header.tsx               # 导航栏（主题/语言切换）
    ├── Hero.tsx                 # 首页大屏
    ├── About.tsx                # 关于我 + 技能展示
    ├── Projects.tsx             # 项目展示
    ├── Contact.tsx              # 联系方式
    ├── MessageBoard.tsx         # 留言板
    └── Footer.tsx               # 页脚
```

---

## 🎨 设计特色

- **强调色**：紫色 → 粉色渐变（`#a855f7` → `#ec4899`）
- **背景**：深色 `#0a0a1a` / 亮色 `#f8f9fa`
- **效果**：毛玻璃导航栏、卡片悬浮上浮、边框高亮
- **动画**：元素依次入场、平滑滚动导航

---

## 🌟 功能预览

### 首页 (Hero)
- GitHub 头像展示 + 个人简介
- CTA 按钮：「查看项目」和「联系我」
- 滚动指示器动画

### 关于我 (About)
- 技能分类展示：后端、前端、AI 应用、工具与运维
- 技能标签交互悬浮效果

### 项目展示 (Projects)
- 响应式卡片网格（1/2/3 列自适应）
- 技术栈标签 + GitHub 链接
- Hover 上浮动效

### 留言板 (MessageBoard)
- 表单提交 + localStorage 持久化
- 时间倒序排列
- 支持删除（确认弹窗）
- 提交成功提示动画

---

## 📄 环境要求

- **Node.js** >= 18
- **pnpm** >= 8

---

## 📬 联系我

- **GitHub**: [zjbTinyer](https://github.com/zjbTinyer)
- **掘金**: [Tinyer](https://juejin.im)
- **邮箱**: [543897497@qq.com](mailto:543897497@qq.com)
- **微信**: `s19931014`

---

<div align="center">
  Made with ❤️ by zjbTinyer
</div>
