import { useState, useEffect } from 'react'

const VISIT_KEY = 'portfolio_visit_count'
const VISITED_KEY = 'portfolio_visited'

export function useVisitCount() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // 读取当前计数
        const stored = localStorage.getItem(VISIT_KEY)
        const current = stored ? parseInt(stored, 10) : 0

        // 检查是否本次会话已计数
        const alreadyVisited = sessionStorage.getItem(VISITED_KEY)

        if (!alreadyVisited) {
            const newCount = current + 1
            localStorage.setItem(VISIT_KEY, String(newCount))
            sessionStorage.setItem(VISITED_KEY, 'true')
            setCount(newCount)
        } else {
            setCount(current)
        }
    }, [])

    return count
}
