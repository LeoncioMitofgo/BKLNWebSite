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

// Imágenes Unsplash por slug de servicio
const serviceImages: Record<string, string> = {
  'apps-android': 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&auto=format&fit=crop&q=80',
  'desarrollo-web': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=80',
  'desktop-electron': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop&q=80',
  'python-automatizacion': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&auto=format&fit=crop&q=80',
  'databases-apis': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
  'ia-machine-learning': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=80',
  'consultoria-tech': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=80',
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Code2
  const imageUrl = serviceImages[service.slug]

  return (
    <div className="group bg-bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/10 transition-all duration-300">
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
            <div className="w-10 h-10 bg-brand-blue/80 backdrop-blur-sm rounded-md flex items-center justify-center border border-accent-blue/30">
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
