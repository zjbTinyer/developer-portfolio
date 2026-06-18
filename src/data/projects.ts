export interface Project {
    id: string
    title: string
    description: string
    techStack: string[]
    image?: string
    link?: string
    github?: string
}

export const projects: Project[] = [
    {
        id: 'campus-evaluation',
        title: '校园评价系统',
        description:
            'AI 驱动的教师评价与学生信息查询系统。支持自然语言搜索，集成 AI 助手查询学生信息，替代传统按钮式操作，提供智能问答体验。',
        techStack: ['Java', 'Spring Boot', 'TypeScript', 'React', 'CSS', 'MySQL', 'Redis', 'Elasticsearch'],
        github: 'https://github.com/zjbTinyer/campus-evaluation',
    },
    {
        id: 'react-demo',
        title: '自由定制工作流系统',
        description:
            '一个自由定制工作流的系统，探索 React 在现代前端工程化中的最佳实践，包括组件化开发、状态管理及工作流引擎的可视化配置。',
        techStack: ['React', 'JavaScript', 'CSS'],
        github: 'https://github.com/zjbTinyer/react-demo',
    },
    {
        id: 'wechat-recipe-publisher',
        title: '微信公众号菜谱推送',
        description:
            '每天自动从网上抓取家常菜做法、配料和图片，通过定时任务处理后自动发布到微信公众号，实现菜谱内容的持续更新。',
        techStack: ['Python', 'Scrapy', '微信公众号API'],
        github: 'https://github.com/zjbTinyer/wechat-recipe-publisher',
    },
    {
        id: 'cloudbase-recipe-publisher',
        title: 'CloudBase 菜谱推送',
        description:
            '使用腾讯云 CloudBase 云函数抓取菜单数据，通过 Serverless 架构定时推送到微信公众号，实现低成本的自动化内容运营。',
        techStack: ['JavaScript', 'CloudBase', 'Serverless', '微信公众号API'],
        github: 'https://github.com/zjbTinyer/cloudbase-recipe-publisher',
    },
]
