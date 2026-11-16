import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'paper'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-[transform,background-color,border-color,color] duration-300 ease-out-soft cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent-green text-bg-dark hover:bg-[#3cf0a0] hover:-translate-y-0.5 active:translate-y-0',
  outline: 'border border-white/20 text-text-primary hover:border-accent-green hover:text-accent-green',
  ghost: 'text-text-secondary hover:text-text-primary',
  paper: 'bg-paper-ink text-paper hover:bg-black hover:-translate-y-0.5',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'text-sm px-4 py-2.5',
  md: 'text-[15px] px-6 py-3.5',
  lg: 'text-base px-7 py-4',
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}
