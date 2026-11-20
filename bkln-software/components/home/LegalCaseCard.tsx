import type { Dictionary } from '@/i18n/dictionaries'

type LegalTexts = Dictionary['home']['legal']

/**
 * Caso del despacho de abogados. No hay capturas, así que se enseñan sus módulos
 * en una tarjeta de papel, sin inventar el aspecto del sistema.
 */
export function LegalCaseCard({ t }: { t: LegalTexts }) {
  return (
    <div className="flex h-full w-full items-center bg-paper text-paper-ink">
      <div className="w-full px-[8%] py-[7%]">
        <p className="mb-2 text-[clamp(11px,1vw,14px)] tracking-[0.02em] text-paper-muted">{t.kicker}</p>
        <p className="mb-[1em] font-read text-[clamp(20px,2.6vw,38px)] leading-[1.15]">{t.title}</p>
        <ul className="flex flex-wrap gap-2 sm:gap-2.5">
          {t.modules.map((module, i) => (
            <li
              key={module}
              className={
                i < 3
                  ? 'rounded-full border border-paper-ink bg-paper-ink px-3 py-1.5 text-[clamp(11px,1.05vw,15px)] font-semibold text-paper sm:px-4 sm:py-2'
                  : 'rounded-full border border-[#cfc8b8] bg-white/45 px-3 py-1.5 text-[clamp(11px,1.05vw,15px)] font-semibold sm:px-4 sm:py-2'
              }
            >
              {module}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
