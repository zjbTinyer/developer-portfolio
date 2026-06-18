import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { skills } from '../data/skills'

const categoryColors: Record<string, string> = {
    backend: 'from-blue-500 to-cyan-500',
    frontend: 'from-purple-500 to-pink-500',
    ai: 'from-orange-500 to-yellow-500',
    tools: 'from-green-500 to-teal-500',
}

export default function About() {
    const { t } = useTranslation()
    const categories = [...new Set(skills.map((s) => s.category))]

    return (
        <section
            id="about"
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
                    {t('about.title')}
                </h2>
                <p
                    className="text-center max-w-2xl mx-auto mb-12 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {t('about.description')}
                </p>

                {/* 技能分类 */}
                <div className="grid md:grid-cols-2 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="backdrop-blur-sm rounded-xl p-6 border transition-colors"
                            style={{
                                backgroundColor: 'var(--color-bg-muted)',
                                borderColor: 'var(--color-border)',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                        >
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span
                                    className={`inline-block w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[category]}`}
                                />
                                {t(`about.categories.${category}`)}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills
                                    .filter((s) => s.category === category)
                                    .map((skill) => (
                                        <span
                                            key={skill.name}
                                            className="px-3 py-1.5 text-sm rounded-full border transition-all duration-200"
                                            style={{
                                                backgroundColor: 'var(--color-bg-surface)',
                                                color: 'var(--color-text-secondary)',
                                                borderColor: 'var(--color-border)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(168,85,247,0.2)'
                                                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)'
                                                e.currentTarget.style.borderColor = 'var(--color-border)'
                                            }}
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
