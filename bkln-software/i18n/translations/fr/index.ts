import type { ContentTranslation } from '../../content'
import { services } from './services'
import { products } from './products'
import { projects } from './projects'
import { courses } from './courses'
import { post as posStock } from './posts/pos-stock'
import { post as aiAssistant } from './posts/ai-assistant'
import { post as cost } from './posts/cost'
import { post as school } from './posts/school'
import { post as webOrSocial } from './posts/web-or-social'
import { post as pythonAutomation } from './posts/python-automation'
import { post as supabase } from './posts/supabase'

// Indexado por slug interno (el español): las direcciones traducidas están en i18n/routes.ts.
export const contentFr: ContentTranslation = {
  services,
  products,
  projects,
  courses,
  posts: {
    'sistema-caja-stock-farmacias-supermercados-restaurantes': posStock,
    'asistente-ia-whatsapp-web-negocio': aiAssistant,
    'cuanto-cuesta-web-app-guinea-ecuatorial': cost,
    'digitalizar-gestion-colegio-guinea-ecuatorial': school,
    'web-o-redes-sociales-negocio': webOrSocial,
    'python-automatizacion-casos-reales': pythonAutomation,
    'supabase-en-produccion-lo-que-nadie-cuenta': supabase,
  },
}
