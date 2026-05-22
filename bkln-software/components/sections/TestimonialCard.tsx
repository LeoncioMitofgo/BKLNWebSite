import { Star } from 'lucide-react'
import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-bg-surface border border-white/5 rounded-lg p-6 hover:border-brand-blue/20 transition-colors">
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-warning fill-warning" />
        ))}
      </div>
      <p className="text-text-secondary text-sm leading-relaxed mb-5 italic">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0">
          <span className="text-accent-blue font-bold text-sm">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-text-primary font-semibold text-sm">{testimonial.name}</p>
          <p className="text-text-secondary text-xs">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}
