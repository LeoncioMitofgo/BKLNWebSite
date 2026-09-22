import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <Link href="/" className={cn('inline-flex items-center shrink-0', className)}>
      <Image
        src="/brand-logo.png"
        alt="BKLN Software & Systems"
        width={size === 'sm' ? 150 : size === 'md' ? 190 : 260}
        height={size === 'sm' ? 48 : size === 'md' ? 61 : 83}
        className="h-auto w-auto max-w-full object-contain"
        priority={size === 'sm'}
      />
    </Link>
  )
}
