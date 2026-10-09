import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/data/contact'

// Abajo a la izquierda para no chocar con el chat (abajo a la derecha).
export function WhatsAppButton() {
  return (
    <a
      href={waLink('Hola, vengo de la web de BKLN y me gustaría más información.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a BKLN por WhatsApp"
      className="fixed bottom-4 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition hover:scale-105 hover:bg-[#1ebe5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
