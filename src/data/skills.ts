export interface Skill {
    name: string
    category: 'backend' | 'frontend' | 'ai' | 'tools' | 'other'
    level: number // 1-5
}

export const skills: Skill[] = [
    // 后端
    { name: 'Java / Spring Boot', category: 'backend', level: 5 },
    { name: 'MyBatis / MyBatis-Plus', category: 'backend', level: 5 },
    { name: 'Spring Cloud', category: 'backend', level: 4 },
    { name: 'MySQL / PostgreSQL', category: 'backend', level: 4 },
    { name: 'Redis / Elasticsearch', category: 'backend', level: 4 },

    // 前端
    { name: 'React / TypeScript', category: 'frontend', level: 5 },
    { name: 'Vue 3', category: 'frontend', level: 4 },
    { name: 'Ant Design', category: 'frontend', level: 4 },
    { name: 'TailwindCSS', category: 'frontend', level: 4 },

    // AI
    { name: 'LLM 应用开发', category: 'ai', level: 4 },
    { name: 'NL Agent 设计', category: 'ai', level: 4 },
    { name: 'Prompt Engineering', category: 'ai', level: 4 },

    // 工具
    { name: 'Python (Scrapy)', category: 'tools', level: 4 },
    { name: 'Git', category: 'tools', level: 4 },
    { name: 'Docker', category: 'tools', level: 3 },
    { name: 'Elasticsearch', category: 'tools', level: 3 },
]
