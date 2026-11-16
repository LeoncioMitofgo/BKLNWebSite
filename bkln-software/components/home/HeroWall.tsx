import Image from 'next/image'
import { cn } from '@/lib/utils'

// Capturas reales (las de Odoo llevan la franja de datos de demostración).
const COLUMNS = [
  ['/pasa-1.jpg', '/odoo-crm.jpg', '/marketplace-chat.jpg', '/odoo-existencias.jpg'],
  ['/marketplace-buscar.jpg', '/pasa-crazy-december-2.jpg', '/odoo-venta.jpg', '/brookai-cover.jpg'],
  ['/odoo-compra.jpg', '/pasa-3.jpg', '/marketplace-premium.jpg', '/pasa-crazy-december-1.jpg'],
]

const ANIMATION = ['wall-up 70s linear infinite', 'wall-down 82s linear infinite', 'wall-up 94s linear infinite']

/** Pared decorativa en perspectiva que se desplaza despacio. Cada columna va duplicada para que el bucle no salte. */
export function HeroWall({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('grid grid-cols-3 gap-[18px] lg:gap-[22px]', className)}>
      {COLUMNS.map((images, col) => (
        <div key={col} style={{ animation: ANIMATION[col] }}>
          {[...images, ...images].map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="mb-[18px] lg:mb-[22px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
            >
              <Image src={src} alt="" width={1200} height={720} sizes="(min-width: 1024px) 22vw, 45vw" className="block h-auto w-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
