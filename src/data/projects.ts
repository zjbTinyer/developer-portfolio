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
            '以自然语言搜索为主入口的 AI 驱动校园门户。集成了 NL Search Agent，支持意图识别、实体提取、智能问答，家长可直接输入"小明最近数学怎么样？"获取信息。',
        techStack: ['React', 'TypeScript', 'Spring Boot', 'Ant Design', 'MySQL', 'Redis', 'Elasticsearch'],
        github: 'https://github.com/zjbTinyer/campus-evaluation',
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
    {
        id: 'react-demo',
        title: 'React Demo 项目',
        description:
            'React 前端练习与演示项目，探索 React Hooks、组件化开发以及现代前端工程化实践。',
        techStack: ['React', 'JavaScript'],
        github: 'https://github.com/zjbTinyer/react-demo',
    },
    {
        id: 'xx-async-service',
        title: '异步服务框架',
        description:
            '异步任务处理服务框架，用于处理后台耗时任务的异步执行与结果回调。',
        techStack: ['Java'],
        github: 'https://github.com/zjbTinyer/xx-async-service',
    },
]
