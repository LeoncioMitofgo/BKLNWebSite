import type { Metadata } from 'next'
import { CourseCard } from '@/components/sections/CourseCard'
import { courses } from '@/data/seed'

export const metadata: Metadata = {
  title: 'Cursos',
  description: 'Aprende Python y desarrollo de software con cursos prácticos en español.',
}

export default function CursosPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Cursos <span className="text-accent-blue">Online</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Aprende programación con cursos prácticos en español, escritos desde la experiencia real.
          </p>
        </div>
      </section>

      {/* Grid de cursos */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
