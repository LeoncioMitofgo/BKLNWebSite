import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ title, subtitle, centered = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)} data-reveal>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.02] text-text-primary">{title}</h2>
      {subtitle && (
        <p className={cn('mt-5 text-text-secondary max-w-2xl text-lg leading-relaxed', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
