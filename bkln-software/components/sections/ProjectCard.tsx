import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { PosIllustration } from '@/components/home/PosIllustration'
import { LegalCaseCard } from '@/components/home/LegalCaseCard'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

// Imágenes de archivo (no son capturas del proyecto): mejor una tarjeta tipográfica que una foto genérica.
const isStockImage = (src: string) => !src || /^\/(course|project|product|service|blog)-/.test(src)

export const demoTagClass =
  'absolute right-2.5 top-2.5 z-[2] rounded-full bg-paper/95 px-2 py-1 text-[10px] font-semibold tracking-[0.02em] text-bg-surface sm:right-3.5 sm:top-3.5 sm:px-2.5 sm:py-1.5 sm:text-xs'

interface ProjectCardProps {
  project: Project
  lang: Locale
}

export function ProjectCard({ project, lang }: ProjectCardProps) {
  const dict = getDictionary(lang)
  const t = dict.portfolio.card
  const meta = [project.sector, String(project.year), project.status].filter(Boolean).join(' · ')
  const stock = isStockImage(project.image)

  return (
    <Link href={localizePath(lang, `/portfolio/${project.slug}`)} className="group flex flex-col" data-reveal>
      {project.visual ? (
        // v3: ilustración en HTML (sin capturas del cliente)
        <div
          role="img"
          aria-label={project.visual === 'pos' ? dict.home.cases.wallblue.alt : dict.home.cases.despacho.alt}
          className={cn(
            'relative overflow-hidden rounded-[20px] border border-white/10',
            project.visual === 'legal' ? 'md:aspect-[16/10]' : 'aspect-[16/10]'
          )}
        >
          {project.visual === 'pos' && (
            <>
              <PosIllustration t={dict.home.pos} />
              <span className={demoTagClass}>{dict.home.recreationTag}</span>
            </>
          )}
          {project.visual === 'legal' && <LegalCaseCard t={dict.home.legal} />}
        </div>
      ) : stock ? (
        <div className="flex aspect-[16/10] flex-col justify-end rounded-[20px] border border-white/10 bg-bg-surface p-7 transition-colors duration-500 group-hover:border-white/30">
          <span className="text-sm text-text-secondary">{project.sector}</span>
          <span className="mt-2 font-display text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1] tracking-[-0.03em]">{project.title}</span>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-[20px] border border-white/10">
          <Image
            src={project.image}
            alt={project.title}
            width={1600}
            height={1000}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.035]"
          />
          {project.demoData && <span className={demoTagClass}>{dict.home.demoTag}</span>}
        </div>
      )}
      <div className="pt-6">
        <p className="mb-2 text-sm text-text-secondary">{meta}</p>
        <h3 className="mb-3 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.02em]">{project.title}</h3>
        <p className="mb-5 max-w-[56ch] text-text-secondary line-clamp-3">{project.tagline ?? project.description}</p>
        <span className="inline-flex items-center gap-2 font-semibold">
          {t.more}
          <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  )
}
