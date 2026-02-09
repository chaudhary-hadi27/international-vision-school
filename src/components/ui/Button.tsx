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
    const baseStyles = 'inline-flex items-center justify-center gap-2 transition-all duration-200'

    const variants = {
        primary: 'btn-premium', // Uses the class from globals.css
        secondary: 'bg-white text-ivs-blue border-2 border-ivs-blue hover:bg-ivs-blue-light/50 shadow-sm',
        outline: 'btn-outline-premium',
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-md',
        md: 'px-6 py-2.5 text-base rounded-lg',
        lg: 'px-8 py-3 text-lg rounded-xl',
    }

    // Combine classes: straightforward concatenation or use a utility like clsx/tailwind-merge if available
    // For now assuming simple string concatenation works if no conflicts
    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()

    return (
        <button
            type={type}
            onClick={onClick}
            className={combinedClassName}
        >
            {children}
        </button>
    )
}