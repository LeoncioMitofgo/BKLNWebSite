'use client'

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
          onClick={() => onChange(cat.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            active === cat.value
              ? 'bg-brand-green text-white'
              : 'bg-bg-surface text-text-secondary border border-white/10 hover:border-brand-green/30 hover:text-text-primary'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
