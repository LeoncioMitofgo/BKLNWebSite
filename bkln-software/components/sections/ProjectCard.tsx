import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Project } from '@/types'

const categoryLabels: Record<Project['category'], string> = {
  android: 'Android',
  web: 'Web',
  desktop: 'Desktop',
  python: 'Python',
  ia: 'IA',
}

const categoryImages: Record<Project['category'], string> = {
  android: '/course-android.jpg',
  web: '/course-web.jpg',
  desktop: '/project-desktop.jpg',
  python: '/project-python.jpg',
  ia: '/project-ia.jpg',
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.image.startsWith('http')
    ? project.image
    : categoryImages[project.category]

  return (
    <div className="group bg-bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300">
      <div className="h-48 relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-bg-dark/50" />
        <div className="absolute top-3 left-3">
          <Badge variant="blue">{categoryLabels[project.category]}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-white text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
            {project.year}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-text-primary font-semibold mb-2">{project.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <Link href={`/portfolio/${project.slug}`}>
          <Button variant="outline" size="sm" className="w-full gap-1.5">
            Ver proyecto <ExternalLink size={13} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
