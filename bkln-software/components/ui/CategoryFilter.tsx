'use client'

import { cn } from '@/lib/utils'

interface CategoryOption<T extends string> {
  value: T
  label: string
}

interface CategoryFilterProps<T extends string> {
  categories: CategoryOption<T>[]
  active: T
  onChange: (value: T) => void
}

export function CategoryFilter<T extends string>({ categories, active, onChange }: CategoryFilterProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          type="button"
          aria-pressed={active === cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            'rounded-full px-5 py-2.5 text-sm font-semibold transition-colors',
            active === cat.value
              ? 'bg-accent-green text-bg-dark'
              : 'border border-white/15 text-text-secondary hover:border-white/40 hover:text-text-primary'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
