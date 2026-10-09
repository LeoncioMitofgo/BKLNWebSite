export const contactEmail = 'hello@bklnsoftware.tech'

/** Número de WhatsApp en formato internacional, solo dígitos (para wa.me). */
export const whatsappNumber = '240222798086'

/** Enlace para que el visitante comparta un texto con sus propios contactos. */
export function waShareLink(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function waLink(message?: string): string {
  const base = `https://wa.me/${whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
