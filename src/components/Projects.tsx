import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'

export default function Projects() {
    const { t } = useTranslation()

    return (
        <section
            id="projects"
            className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
            >
                {/* 标题 */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    {t('projects.title')}
                </h2>
                <p
                    className="text-center max-w-2xl mx-auto mb-12 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {t('projects.description')}
                </p>

                {/* 项目列表 */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                            style={{
                                backgroundColor: 'var(--color-bg-muted)',
                                borderColor: 'var(--color-border)',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                        >
                            {/* 项目截图占位 */}
                            <div className="h-40 bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                                <span className="text-4xl opacity-30 group-hover:opacity-60 transition-opacity">
                                    📁
                                </span>
                            </div>

                            {/* 项目信息 */}
                            <div className="p-5">
                                <h3
                                    className="text-lg font-semibold mb-2 transition-colors group-hover:text-purple-400"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {project.title}
                                </h3>
                                <p
                                    className="text-sm mb-4 line-clamp-3 leading-relaxed"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    {project.description}
                                </p>

                                {/* 技术栈 */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 text-xs rounded-full border"
                                            style={{
                                                backgroundColor: 'rgba(168,85,247,0.1)',
                                                color: '#d8b4fe',
                                                borderColor: 'rgba(168,85,247,0.2)',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* 链接 */}
                                <div className="flex gap-3">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs flex items-center gap-1 transition-colors hover:text-purple-400"
                                            style={{ color: 'var(--color-text-muted)' }}
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            {t('projects.preview')}
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs flex items-center gap-1 transition-colors hover:text-purple-400"
                                            style={{ color: 'var(--color-text-muted)' }}
                                        >
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            {t('projects.source')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
