import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  /** Portada del idioma actual */
  href?: string
  /** Añade "Software & Systems" bajo el nombre */
  full?: boolean
  onClick?: () => void
}

export function Logo({ className, href = '/', full = false, onClick }: LogoProps) {
  return (
    <Link href={href} onClick={onClick} className={cn('inline-flex items-center gap-2.5 shrink-0', className)} aria-label="BKLN Software & Systems">
      <Image src="/brand-symbol.png" alt="" width={34} height={34} className="h-8 w-8 object-contain" priority />
      <span className="flex flex-col leading-none">
        <span className="font-display font-extrabold text-[22px] tracking-[0.01em] text-text-primary">BKLN</span>
        {full && <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-text-secondary">SOFTWARE &amp; SYSTEMS</span>}
      </span>
    </Link>
  )
}
