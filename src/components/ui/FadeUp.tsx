// src/components/ui/FadeUp.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface FadeUpProps {
    children: ReactNode
    delay?: number
    duration?: number
    className?: string
}

export default function FadeUp({
    children,
    delay = 0,
    duration = 0.8,
    className = ''
}: FadeUpProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1] // Premium easing curve
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
