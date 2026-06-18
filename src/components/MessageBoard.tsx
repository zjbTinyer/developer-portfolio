import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface Message {
    id: string
    name: string
    content: string
    date: string
}

const MESSAGES_KEY = 'portfolio_messages'

export default function MessageBoard() {
    const { t } = useTranslation()
    const [messages, setMessages] = useState<Message[]>([])
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem(MESSAGES_KEY)
        if (stored) {
            try {
                setMessages(JSON.parse(stored))
            } catch { /* ignore */ }
        }
    }, [])

    const saveMessages = (msgs: Message[]) => {
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs))
        setMessages(msgs)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !content.trim()) return

        const newMsg: Message = {
            id: Date.now().toString(),
            name: name.trim(),
            content: content.trim(),
            date: new Date().toLocaleString('zh-CN'),
        }

        saveMessages([newMsg, ...messages])
        setName('')
        setContent('')
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
    }

    const handleDelete = (id: string) => {
        if (!window.confirm(t('messageBoard.confirmDelete'))) return
        saveMessages(messages.filter(m => m.id !== id))
    }

    return (
        <section
            id="message-board"
            className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {t('messageBoard.title')}
                    </span>
                </h2>

                {/* 表单 */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/5 dark:bg-white/5 bg-gray-100/80 rounded-xl p-6 border border-white/10 dark:border-white/10 border-gray-300/50 mb-8"
                >
                    <div className="mb-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('messageBoard.name')}
                            className="w-full px-4 py-2.5 rounded-lg bg-white/10 dark:bg-white/10 bg-white border border-white/10 dark:border-white/10 border-gray-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors"
                            maxLength={20}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={t('messageBoard.placeholder')}
                            rows={4}
                            className="w-full px-4 py-2.5 rounded-lg bg-white/10 dark:bg-white/10 bg-white border border-white/10 dark:border-white/10 border-gray-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-colors"
                            maxLength={500}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                        >
                            {t('messageBoard.submit')}
                        </button>
                        {showSuccess && (
                            <span className="text-green-400 text-sm animate-pulse">
                                ✓ {t('messageBoard.success')}
                            </span>
                        )}
                    </div>
                </form>

                {/* 留言列表 */}
                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <p className="text-center text-gray-400 py-12">
                            {t('messageBoard.empty')}
                        </p>
                    ) : (
                        messages.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white/5 dark:bg-white/5 bg-gray-100/80 rounded-xl p-5 border border-white/10 dark:border-white/10 border-gray-300/50 hover:border-purple-500/30 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                                            {msg.name.charAt(0).toUpperCase()}
                                        </span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {msg.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400">
                                            {msg.date}
                                        </span>
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="text-xs text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            {t('messageBoard.delete')}
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed ml-10">
                                    {msg.content}
                                </p>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>
        </section>
    )
}
