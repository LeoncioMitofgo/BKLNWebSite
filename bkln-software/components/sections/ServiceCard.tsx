import Link from 'next/link'
import {
  Globe, Smartphone, LayoutDashboard, Bot, Radio, Wrench, Lightbulb, Code2,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Service } from '@/types'

export const serviceIcons: Record<string, LucideIcon> = {
  Globe, Smartphone, LayoutDashboard, Bot, Radio, Wrench, Lightbulb,
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = serviceIcons[service.icon] ?? Code2

  return (
    <div className="group flex flex-col bg-bg-surface border border-white/5 rounded-lg p-6 hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300">
      <div className="w-11 h-11 rounded-md bg-brand-green/15 border border-brand-green/20 flex items-center justify-center mb-4">
        <Icon size={20} className="text-accent-green" />
      </div>
      <h3 className="text-text-primary font-semibold text-lg mb-2">{service.title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-5">{service.description}</p>
      <div className="flex gap-2 mt-auto">
        <Link href={`/servicios/${service.slug}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            Ver servicio
          </Button>
        </Link>
        <Link href={`/contacto?servicio=${service.slug}`} className="flex-1">
          <Button size="sm" className="w-full">
            Presupuesto
          </Button>
        </Link>
      </div>
    </div>
  )
}
