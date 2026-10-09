export const contactEmail = 'hello@bklnsoftware.tech'

/** Número de WhatsApp en formato internacional, solo dígitos (para wa.me). */
export const whatsappNumber = '240222798086'

export function waLink(message?: string): string {
  const base = `https://wa.me/${whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
