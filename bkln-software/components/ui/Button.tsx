'use client'

import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button ref={ref} className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  )
)

Button.displayName = 'Button'

export { Button }
