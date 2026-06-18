import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <Link href="/" className={cn('inline-flex items-center shrink-0', className)}>
      <span className={cn(
        'font-bold tracking-tight',
        size === 'sm' && 'text-base',
        size === 'md' && 'text-xl',
        size === 'lg' && 'text-3xl',
      )}>
        <span className="text-white">BKLN</span>
        <span className="text-accent-green"> Software & Systems</span>
      </span>
    </Link>
  )
}
