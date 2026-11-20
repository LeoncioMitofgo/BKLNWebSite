import type { Dictionary } from '@/i18n/dictionaries'
import s from './PosIllustration.module.css'

type PosTexts = Dictionary['home']['pos']

function Contactless({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M8.5 7.5a6 6 0 0 1 0 9" />
      <path d="M12 5a9.5 9.5 0 0 1 0 14" />
      <path d="M15.5 3a13 13 0 0 1 0 18" />
    </svg>
  )
}

/**
 * Recreación del TPV de WallBlue con datos de demostración: el datáfono ZCS Z92 con la app de cobro,
 * una tarjeta genérica sin marca y el móvil del dueño con el panel de administración.
 * No son capturas: el contrato no permite enseñar el producto en uso tal cual.
 */
export function PosIllustration({ t }: { t: PosTexts }) {
  const cardSelected = t.selected === 'card'
  return (
    <div className={s.wrap} aria-hidden="true">
    <div className={s.stage}>
      <div className={s.term}>
        <div className={s.receipt}>
          <b>{t.receiptTitle}</b>
          <hr />
          <span className={s.receiptRow}>
            <span>{t.receiptTotal}</span>
            <span>{t.amount}</span>
          </span>
          <span className={s.receiptRow}>
            <span>{t.receiptPayLabel}</span>
            <span>{t.receiptPayValue}</span>
          </span>
          <span className={s.receiptRow}>
            <span>{t.receiptStatusLabel}</span>
            <span>{t.receiptStatusValue}</span>
          </span>
          <hr />
          <b>{t.receiptThanks}</b>
        </div>
        <div className={s.body}>
          <div className={s.screen}>
            <div className={s.top}>
              <b>{t.screenTitle}</b>
              <small>{t.screenSub}</small>
            </div>
            <div className={s.amount}>
              <small>{t.totalLabel}</small>
              <strong>{t.amount}</strong>
            </div>
            <div className={s.pay}>
              <span className={cardSelected ? undefined : s.onCash}>{t.cash}</span>
              <span className={cardSelected ? s.onCard : undefined}>{t.card}</span>
            </div>
            <div className={s.ok}>
              {t.approved}
              <small>{t.approvedSub}</small>
            </div>
            <div className={s.btn}>{t.printing}</div>
          </div>
          <svg className={s.nfc} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M8.5 7.5a6 6 0 0 1 0 9" />
            <path d="M12 5a9.5 9.5 0 0 1 0 14" />
            <path d="M15.5 3a13 13 0 0 1 0 18" />
            <path d="M5 10a2.5 2.5 0 0 1 0 4" />
          </svg>
        </div>
        <Contactless className={s.waves} />
        <div className={s.card}>
          <Contactless className={s.cardIcon} />
          <div className={s.chip} />
          <div className={s.cardNum}>•••• 1234</div>
          <small className={s.cardDemo}>DEMO</small>
        </div>
      </div>

      <div className={s.phone}>
        <div className={s.phoneScreen}>
          <div className={s.top}>
            <b>{t.panelTitle}</b>
            <small>{t.panelSub}</small>
          </div>
          <div className={s.grid}>
            <div className={s.stat}>
              <span>{t.statSales}</span>
              <strong className={s.blue}>18</strong>
            </div>
            <div className={s.stat}>
              <span>{t.statTotal}</span>
              <strong>96,500</strong>
            </div>
            <div className={s.stat}>
              <span>{t.cash}</span>
              <strong className={s.green}>71,500</strong>
            </div>
            <div className={s.stat}>
              <span>{t.card}</span>
              <strong className={s.purple}>25,000</strong>
            </div>
          </div>
          <p className={s.section}>{t.latest}</p>
          <div className={s.row}>
            <span>
              <span className={s.tagCash}>{t.cash}</span>
              {t.till} 1
            </span>
            <b>6,000</b>
          </div>
          <div className={s.row}>
            <span>
              <span className={s.tagCard}>{t.card}</span>
              {t.till} 2
            </span>
            <b>12,000</b>
          </div>
          <div className={s.row}>
            <span>
              <span className={s.tagCash}>{t.cash}</span>
              {t.till} 2
            </span>
            <b>2,000</b>
          </div>
          <div className={s.ok}>
            {t.closings}
            <small>{t.closingsSub}</small>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
