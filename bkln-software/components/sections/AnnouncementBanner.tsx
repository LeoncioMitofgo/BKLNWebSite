import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { announcement } from '@/data/announcement'

export function AnnouncementBanner() {
  if (!announcement) return null
  if (announcement.expiresAt && new Date(announcement.expiresAt) < new Date()) return null

  return (
    <Link
      href={announcement.href}
      className="group inline-flex flex-wrap items-center justify-center gap-2 bg-brand-green/15 border border-brand-green/40 hover:border-brand-green/60 hover:bg-brand-green/20 text-sm px-4 py-2 rounded-full transition-colors"
    >
      <Sparkles size={14} className="text-accent-green shrink-0" />
      <span className="text-accent-green font-semibold">{announcement.label}</span>
      <span className="text-text-secondary hidden sm:inline">·</span>
      <span className="text-text-primary">{announcement.title}</span>
      <ArrowRight size={14} className="text-accent-green shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
