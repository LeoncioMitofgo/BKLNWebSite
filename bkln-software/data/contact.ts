export const contactEmail = 'hello@bklnsoftware.tech'

export const company = {
  legalName: 'Brooklyn Software and Systems',
  brandName: 'BKLN Software & Systems',
  foundingYear: 2024,
  address: { area: 'Banapa', city: 'Malabo', region: 'Bioko Norte', countryCode: 'GQ' },
  mapsUrl: 'https://maps.app.goo.gl/bkzwoj4cZEknCBhAA',
  founder: {
    name: 'Leoncio Felipe Mitogo Edjang Obono',
    linkedin: 'https://www.linkedin.com/in/leoncio-felipe-mitogo-edjang-obono-362627420',
  },
  /** Hora de Malabo (WAT, UTC+1). */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '15:30' },
    { days: ['Saturday'], opens: '11:00', closes: '14:00' },
  ],
}

export const whatsappDisplay = '+240 222 798 086'

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
