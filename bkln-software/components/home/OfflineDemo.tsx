'use client'

import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { cn, fmt } from '@/lib/utils'

type Sale = { id: number; time: string; amount: number; sent: boolean }

const SEPARATOR: Record<Locale, string> = { es: '.', en: ',', fr: ' ' }
const PRICE = 5000

function money(n: number, lang: Locale) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, SEPARATOR[lang])
}

const INITIAL: Sale[] = [
  { id: 1, time: '09:41', amount: 12500, sent: true },
  { id: 2, time: '09:43', amount: 3000, sent: true },
  { id: 3, time: '09:46', amount: 8000, sent: true },
]

/** Una caja que sigue cobrando sin conexión y envía lo pendiente al volver la red. Todo ocurre en el navegador. */
export function OfflineDemo({ lang, t }: { lang: Locale; t: Dictionary['home'] }) {
  const [sales, setSales] = useState<Sale[]>(INITIAL)
  const [online, setOnline] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const pending = sales.filter((s) => !s.sent).length

  function sell() {
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    setSales((prev) => [...prev, { id: prev.length + 1, time, amount: PRICE, sent: online }])
  }

  function toggle() {
    const next = !online
    setOnline(next)
    if (!next || pending === 0) return
    setSyncing(true)
    const ids = sales.filter((s) => !s.sent).map((s) => s.id)
    ids.forEach((id, i) => {
      timers.current.push(
        setTimeout(() => {
          setSales((prev) => prev.map((s) => (s.id === id ? { ...s, sent: true } : s)))
          if (i === ids.length - 1) setSyncing(false)
        }, 700 * (i + 1))
      )
    })
  }

  const status = syncing
    ? { text: t.demoSyncing, cls: 'bg-[#e3ecf8] text-[#1e4e8c]' }
    : online
      ? { text: t.demoOnline, cls: 'bg-[#dcf5e8] text-[#0a6b3d]' }
      : {
          text: pending === 0 ? t.demoOffline : pending === 1 ? t.demoOfflineOne : fmt(t.demoOfflineMany, { count: pending }),
          cls: 'bg-[#fdebd3] text-[#8a4b06]',
        }

  return (
    <div className="w-full max-w-[380px]">
      <div className="rounded-[36px] border border-white/10 bg-[#0e1e16] p-3.5 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
        <div className="overflow-hidden rounded-[26px] bg-[#f7f8f6] text-[#101511]">
          <div className="border-b border-[#e4e8e5] px-5 pt-5 pb-4">
            <p className="text-[13px] text-[#5b655f]">{t.demoShop}</p>
            <p className="font-display text-[22px] font-bold tracking-[-0.01em]">{t.demoHeading}</p>
            <p className={cn('mt-2.5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors', status.cls)} aria-live="polite">
              <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
              {status.text}
            </p>
          </div>
          <ul className="h-[248px] overflow-hidden py-1.5">
            {sales
              .slice(-5)
              .reverse()
              .map((s) => (
                <li key={s.id} className="flex items-center justify-between border-b border-[#eef1ef] px-5 py-[11px] text-[15px]" style={{ animation: 'pop-in 0.45s ease-out' }}>
                  <span>
                    {s.time} · {money(s.amount, lang)} FCFA
                  </span>
                  <span className={cn('text-[13px] font-semibold', s.sent ? 'text-[#0a6b3d]' : 'text-[#8a4b06]')}>{s.sent ? t.demoSent : t.demoPending}</span>
                </li>
              ))}
          </ul>
          <div className="border-t border-[#e4e8e5] px-5 pt-3.5 pb-5">
            <button type="button" onClick={sell} className="w-full rounded-2xl bg-[#101511] py-4 text-base font-semibold text-white transition-transform active:scale-[0.98]">
              {fmt(t.demoSell, { amount: money(PRICE, lang) })}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 px-5 py-4">
        <span id="demo-switch" className="text-text-primary">
          {t.demoSwitch}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={online}
          aria-labelledby="demo-switch"
          onClick={toggle}
          className={cn('relative h-8 w-[58px] rounded-full transition-colors', online ? 'bg-accent-green' : 'bg-[#5c6b63]')}
        >
          <span className={cn('absolute top-1 h-6 w-6 rounded-full bg-white transition-[left] duration-300', online ? 'left-[30px]' : 'left-1')} />
        </button>
      </div>
      <p className="mt-3 text-[13px] text-text-secondary">{t.demoNote}</p>
    </div>
  )
}
