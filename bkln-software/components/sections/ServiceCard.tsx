import Link from 'next/link'
import Image from 'next/image'
import {
  Smartphone, Globe, Monitor, Code2, Database, Brain, Lightbulb,
  type LucideIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Service } from '@/types'

const iconMap: Record<string, LucideIcon> = {
  Smartphone, Globe, Monitor, Code2, Database, Brain, Lightbulb,
}

const serviceImages: Record<string, string> = {
  'apps-android': '/course-android.jpg',
  'desarrollo-web': '/course-web.jpg',
  'desktop-electron': '/service-desktop.jpg',
  'python-automatizacion': '/course-python.jpg',
  'databases-apis': '/course-sql.jpg',
  'ia-machine-learning': '/course-ia.jpg',
  'consultoria-tech': '/service-consulting.jpg',
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Code2
  const imageUrl = serviceImages[service.slug]

  return (
    <div className="group bg-bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300">
      {/* Image header */}
      {imageUrl && (
        <div className="h-36 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/20 to-bg-dark/80" />
          {/* Icon overlay */}
          <div className="absolute bottom-3 left-4">
            <div className="w-10 h-10 bg-brand-green/80 backdrop-blur-sm rounded-md flex items-center justify-center border border-accent-green/30">
              <Icon size={18} className="text-white" />
            </div>
          </div>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-text-primary font-semibold text-base mb-2">{service.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">{service.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {service.technologies.length > 4 && (
            <Badge>+{service.technologies.length - 4}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/servicios/${service.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Ver detalle
            </Button>
          </Link>
          <Link href={`/contacto?servicio=${service.slug}`} className="flex-1">
            <Button size="sm" className="w-full">
              Presupuesto
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
