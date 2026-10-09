import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import type { Course } from '@/types'

interface CourseCardProps {
  course: Course
  lang: Locale
}

export function CourseCard({ course, lang }: CourseCardProps) {
  const t = getDictionary(lang).courses
  return (
    <div className="group flex flex-col bg-bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300">
      {/* Image */}
      <div className="h-44 relative overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-bg-dark/50" />
        <div className="absolute top-3 right-3">
          <Badge variant="blue">{t.categories[course.category]}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge>{t.levels[course.level]}</Badge>
          <span className="text-text-secondary text-xs flex items-center gap-1">
            <Clock size={11} />
            {course.duration}
          </span>
        </div>

        <h3 className="text-text-primary font-semibold mb-1.5 line-clamp-2">{course.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-2">
          {course.description}
        </p>

        <Link href={localizePath(lang, `/cursos/${course.slug}`)} className="mt-auto">
          <Button size="sm" variant="outline" className="w-full">
            {t.card.more} <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
