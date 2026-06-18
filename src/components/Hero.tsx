import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Hero() {
    const { t } = useTranslation()

    return (
        <section
            id="hero"
            className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16"
        >
            {/* 背景渐变 */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl">
                {/* 头像 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                        <img
                            src="https://avatars.githubusercontent.com/u/23456881?v=4"
                            alt="tinyer"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* 大标题 */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
                >
                    {t('hero.greeting')}
                </motion.h1>

                {/* 简介 */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg sm:text-xl mb-8 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {t('hero.description')}
                </motion.p>

                {/* CTA 按钮 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault()
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    >
                        {t('hero.viewProjects')}
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault()
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="px-8 py-3 rounded-full border font-medium transition-all duration-300"
                        style={{
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text-secondary)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#a855f7'
                            e.currentTarget.style.color = '#a855f7'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border)'
                            e.currentTarget.style.color = 'var(--color-text-secondary)'
                        }}
                    >
                        {t('hero.contactMe')}
                    </a>
                </motion.div>
            </div>

            {/* 滚动指示器 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
                    style={{ borderColor: 'var(--color-text-muted)' }}
                >
                    <div className="w-1 h-2 rounded-full" style={{ backgroundColor: 'var(--color-text-muted)' }} />
                </motion.div>
            </motion.div>
        </section>
    )
}
