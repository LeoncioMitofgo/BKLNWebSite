import Link from 'next/link'
import Image from 'next/image'
import { Clock, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import type { Course } from '@/types'

const categoryLabels: Record<Course['category'], string> = {
  python: 'Python',
  web: 'Web',
  databases: 'Databases',
  'ia-ml': 'IA & ML',
  android: 'Android',
  marketplaces: 'Marketplaces',
}

const levelLabels: Record<Course['level'], string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
}

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const isComingSoon = course.status === 'coming-soon'

  return (
    <div className={`group bg-bg-surface border rounded-lg overflow-hidden transition-all duration-300 ${
      isComingSoon
        ? 'border-white/5 opacity-60'
        : 'border-white/5 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/10'
    }`}>
      {/* Image */}
      <div className="h-44 relative overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className={`object-cover transition-transform duration-500 ${!isComingSoon && 'group-hover:scale-105'}`}
          unoptimized
        />
        <div className="absolute inset-0 bg-bg-dark/50" />
        <div className="absolute top-3 right-3 flex gap-1.5">
          {isComingSoon && (
            <span className="bg-bg-dark/80 text-text-secondary text-xs font-medium px-2.5 py-1 rounded-full border border-white/10">
              Próximamente
            </span>
          )}
          <Badge variant="blue">{categoryLabels[course.category]}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge>{levelLabels[course.level]}</Badge>
          <span className="text-text-secondary text-xs flex items-center gap-1">
            <Clock size={11} />
            {course.duration}
          </span>
        </div>

        <h3 className="text-text-primary font-semibold mb-1.5 line-clamp-2">{course.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-text-primary font-bold text-xl">
            {isComingSoon ? '—' : course.price === 0 ? (
              <span className="text-success text-base font-semibold">Gratis</span>
            ) : formatPrice(course.price)}
          </span>
          {isComingSoon ? (
            <Button size="sm" variant="outline" disabled>Próximamente</Button>
          ) : (
            <Link href={`/cursos/${course.slug}`}>
              <Button size="sm">Ver curso</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
