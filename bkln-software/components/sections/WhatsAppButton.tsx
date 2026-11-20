import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/data/contact'

interface WhatsAppButtonProps {
  message: string
  label: string
}

// v3: el único botón flotante (el chat está retirado hasta que el asistente vuelva a funcionar).
// Discreto, oscuro y abajo a la derecha, para que el verde quede para la acción principal de la página.
export function WhatsAppButton({ message, label }: WhatsAppButtonProps) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-bg-surface/90 py-3 pr-4 pl-3.5 text-sm font-semibold text-text-primary shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
    >
      <WhatsAppIcon size={18} />
      <span>WhatsApp</span>
    </a>
  )
}
