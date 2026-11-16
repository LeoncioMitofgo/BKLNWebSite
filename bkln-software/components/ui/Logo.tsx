import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  /** Portada del idioma actual */
  href?: string
  /** Versión grande (pie de página) */
  large?: boolean
  onClick?: () => void
}

// brand-logo.png (1086×362) trae margen transparente: los márgenes negativos lo alinean con el contenido.
export function Logo({ className, href = '/', large = false, onClick }: LogoProps) {
  return (
    <Link href={href} onClick={onClick} className={cn('inline-flex shrink-0 items-center', className)}>
      <Image
        src="/brand-logo.png"
        alt="BKLN Software & Systems"
        width={1086}
        height={362}
        sizes={large ? '216px' : '156px'}
        priority={!large}
        className={large ? 'h-[72px] w-auto -ml-[15px] -my-2' : 'h-[52px] w-auto -ml-[11px] -my-1'}
      />
    </Link>
  )
}
