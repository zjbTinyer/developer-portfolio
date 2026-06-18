import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const contactLinks = [
    {
        label: 'Email',
        value: '543897497@qq.com',
        href: 'mailto:543897497@qq.com',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        value: '@zjbTinyer',
        href: 'https://github.com/zjbTinyer',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        label: '掘金',
        value: 'Tinyer',
        href: 'https://juejin.cn/user/Tinyer',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        ),
    },
    {
        label: '微信',
        value: 's19931014',
        href: '#',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
    },
]

export default function Contact() {
    const { t } = useTranslation()

    return (
        <section
            id="contact"
            className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
            >
                {/* 标题 */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    {t('contact.title')}
                </h2>
                <p
                    className="text-center max-w-xl mx-auto mb-12 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {t('contact.description')}
                </p>

                {/* 联系方式列表 */}
                <div className="grid sm:grid-cols-2 gap-4">
                    {contactLinks.map((link, index) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target={link.href !== '#' ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 group"
                            style={{
                                backgroundColor: 'var(--color-bg-muted)',
                                borderColor: 'var(--color-border)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                                e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border)'
                                e.currentTarget.style.backgroundColor = 'var(--color-bg-muted)'
                            }}
                        >
                            <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                                {link.icon}
                            </span>
                            <div>
                                <p
                                    className="text-sm"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    {link.label}
                                </p>
                                <p
                                    className="transition-colors group-hover:text-purple-400"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    {link.value}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
