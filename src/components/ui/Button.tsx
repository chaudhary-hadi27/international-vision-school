import React from 'react'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    type?: 'button' | 'submit' | 'reset'
}

export default function Button({
                                   children,
                                   onClick,
                                   variant = 'primary',
                                   size = 'md',
                                   className = '',
                                   type = 'button',
                               }: ButtonProps) {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2'

    const variants = {
        primary: 'bg-blue-900 text-white hover:bg-blue-800 shadow-lg',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'bg-white text-blue-900 border-2 border-blue-900 hover:bg-gray-50',
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    )
}