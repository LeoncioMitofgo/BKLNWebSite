import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { announcement } from '@/data/announcement'
import type { Locale } from '@/i18n/config'
import { localizePath } from '@/i18n/routes'

export function AnnouncementBanner({ lang }: { lang: Locale }) {
  if (!announcement) return null
  if (announcement.expiresAt && new Date(announcement.expiresAt) < new Date()) return null

  return (
    <Link
      href={localizePath(lang, announcement.href)}
      className="group inline-flex max-w-full items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] py-1.5 pl-1.5 pr-4 text-sm transition-colors hover:border-accent-green/50"
    >
      <span className="shrink-0 rounded-full bg-accent-green px-2.5 py-1 text-xs font-bold text-bg-dark">{announcement.label[lang]}</span>
      <span className="truncate text-text-primary">{announcement.title[lang]}</span>
      <ArrowRight size={14} className="shrink-0 text-accent-green transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
