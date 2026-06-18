import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
    const { t, i18n } = useTranslation()
    const { theme, toggleTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { label: t('nav.home'), href: '#hero' },
        { label: t('nav.about'), href: '#about' },
        { label: t('nav.projects'), href: '#projects' },
        { label: t('messageBoard.title'), href: '#message-board' },
        { label: t('nav.contact'), href: '#contact' },
    ]

    const scrollToSection = (href: string) => {
        setIsOpen(false)
        const el = document.querySelector(href)
        el?.scrollIntoView({ behavior: 'smooth' })
    }

    const toggleLanguage = () => {
        const next = i18n.language === 'zh' ? 'en' : 'zh'
        i18n.changeLanguage(next)
        localStorage.setItem('lang', next)
    }

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
            style={{
                backgroundColor: theme === 'dark' ? 'rgba(10,10,26,0.8)' : 'rgba(255,255,255,0.8)',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)',
            }}
        >
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('#hero')
                    }}
                    className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                    Portfolio
                </a>

                {/* Desktop Nav + Controls */}
                <div className="hidden md:flex items-center gap-4">
                    <ul className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        scrollToSection(link.href)
                                    }}
                                    className="text-sm transition-colors"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                        aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* Language Switcher */}
                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-1.5 text-sm rounded-lg border transition-colors"
                        style={{
                            color: 'var(--color-text-secondary)',
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-primary)'
                            e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-secondary)'
                            e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        }}
                    >
                        {i18n.language === 'zh' ? 'EN' : '中文'}
                    </button>
                </div>

                {/* Mobile: Controls + Menu Button */}
                <div className="flex md:hidden items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                        aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={toggleLanguage}
                        className="px-2 py-1 text-xs rounded-lg border transition-colors"
                        style={{
                            color: 'var(--color-text-secondary)',
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        }}
                    >
                        {i18n.language === 'zh' ? 'EN' : '中文'}
                    </button>
                    <button
                        className="p-2 transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden backdrop-blur-md border-t transition-colors duration-300"
                        style={{
                            backgroundColor: theme === 'dark' ? 'rgba(10,10,26,0.95)' : 'rgba(255,255,255,0.95)',
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)',
                        }}
                    >
                        <ul className="flex flex-col px-4 py-4 gap-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            scrollToSection(link.href)
                                        }}
                                        className="block py-2 transition-colors"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
