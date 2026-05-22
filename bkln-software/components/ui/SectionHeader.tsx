import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ title, subtitle, centered = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="text-3xl font-bold text-text-primary md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-text-secondary max-w-2xl text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={cn('mt-4 h-1 w-16 rounded-full bg-accent-blue', centered && 'mx-auto')} />
    </div>
  )
}
