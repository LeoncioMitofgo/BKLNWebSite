const technologies = [
  // Mobile
  { name: 'Android', icon: '/icons/android.svg', description: 'Aplicaciones móviles preparadas para dispositivos reales y distintos tamaños de pantalla.' },
  { name: 'Kotlin', icon: '/icons/kotlin.svg', description: 'Desarrollo Android moderno, seguro y mantenible.' },
  { name: 'Flutter', icon: '/icons/flutter.svg', description: 'Una sola base de código para Android, iOS, web y escritorio.' },
  // Frontend
  { name: 'React', icon: '/icons/react.svg', description: 'Interfaces interactivas y componentes reutilizables.' },
  { name: 'Next.js', icon: '/icons/nextjs.svg', description: 'Aplicaciones web rápidas, escalables y optimizadas para buscadores.' },
  { name: 'TypeScript', icon: '/icons/typescript.svg', description: 'Menos errores y código más fácil de mantener a largo plazo.' },
  { name: 'Tailwind', icon: '/icons/tailwindcss.svg', description: 'Interfaces consistentes y responsive con mayor velocidad de desarrollo.' },
  // Backend
  { name: 'Node.js', icon: '/icons/nodejs.svg', description: 'APIs y servicios backend eficientes para aplicaciones web.' },
  { name: 'Python', icon: '/icons/python.svg', description: 'Automatización, procesamiento de datos e inteligencia artificial.' },
  { name: 'FastAPI', icon: '/icons/fastapi.svg', description: 'APIs rápidas y documentadas para productos y servicios modernos.' },
  // Bases de datos
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg', description: 'Base de datos robusta para información crítica y relaciones complejas.' },
  { name: 'Supabase', icon: '/icons/supabase.svg', description: 'Auth, base de datos, almacenamiento y tiempo real sin construir todo desde cero.' },
  { name: 'Room', icon: '/icons/room.svg', description: 'Persistencia local para que las apps Android funcionen incluso con mala conexión.' },
  // DevOps / Deploy
  { name: 'Docker', icon: '/icons/docker.svg', description: 'Entornos reproducibles y despliegues más consistentes.' },
  { name: 'Git', icon: '/icons/git.svg', description: 'Control de versiones y trabajo seguro sobre el código.' },
  { name: 'Vercel', icon: '/icons/vercel.svg', description: 'Despliegue rápido y fiable para aplicaciones web.' },
  // IA aplicada
  { name: 'LangChain', icon: '/icons/langchain.svg', description: 'Conexión de modelos de IA con documentos, herramientas y datos reales.' },
  { name: 'Claude', icon: '/icons/claude.svg', description: 'Modelos de lenguaje para asistentes, automatización y atención inteligente.' },
  // Desktop
  { name: 'Electron', icon: '/icons/electron.svg', description: 'Aplicaciones de escritorio multiplataforma usando tecnologías web.' },
]

export function TechStack() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
      {technologies.map((tech, index) => (
        <div
          key={tech.name}
          tabIndex={0}
          aria-label={`${tech.name}: ${tech.description}`}
          className={`relative bg-bg-surface border border-white/5 rounded-lg p-3 flex flex-col items-center gap-2.5 hover:border-brand-green/30 hover:bg-brand-green/5 focus-visible:border-accent-green focus-visible:outline-none transition-all group cursor-help ${index % 3 === 0
              ? 'max-sm:[&>span]:left-0 max-sm:[&>span]:translate-x-0'
              : index % 3 === 2
                ? 'max-sm:[&>span]:left-auto max-sm:[&>span]:right-0 max-sm:[&>span]:translate-x-0'
                : ''
            }`}
        >
          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-52 -translate-x-1/2 rounded-md border border-brand-green/30 bg-bg-dark px-3 py-2 text-center text-xs leading-relaxed text-text-primary opacity-0 shadow-xl shadow-black/30 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
          >
            {tech.description}
          </span>
          <div className="relative w-8 h-8">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative fixed-size icon, no need for next/image */}
            <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-text-secondary text-xs text-center group-hover:text-text-primary transition-colors leading-tight">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  )
}
