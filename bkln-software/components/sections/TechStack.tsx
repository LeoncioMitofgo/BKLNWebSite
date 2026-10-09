// Nombre e icono; la descripción (tooltip) viene del diccionario del idioma.
const technologies = [
  // Mobile
  { name: 'Android', icon: '/icons/android.svg' },
  { name: 'Kotlin', icon: '/icons/kotlin.svg' },
  { name: 'Flutter', icon: '/icons/flutter.svg' },
  // Frontend
  { name: 'React', icon: '/icons/react.svg' },
  { name: 'Next.js', icon: '/icons/nextjs.svg' },
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'Tailwind', icon: '/icons/tailwindcss.svg' },
  // Backend
  { name: 'Node.js', icon: '/icons/nodejs.svg' },
  { name: 'Python', icon: '/icons/python.svg' },
  { name: 'FastAPI', icon: '/icons/fastapi.svg' },
  // Bases de datos
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
  { name: 'Supabase', icon: '/icons/supabase.svg' },
  { name: 'Room', icon: '/icons/room.svg' },
  // DevOps / Deploy
  { name: 'Docker', icon: '/icons/docker.svg' },
  { name: 'Git', icon: '/icons/git.svg' },
  { name: 'Vercel', icon: '/icons/vercel.svg' },
  // IA aplicada
  { name: 'LangChain', icon: '/icons/langchain.svg' },
  { name: 'Claude', icon: '/icons/claude.svg' },
  // Desktop
  { name: 'Electron', icon: '/icons/electron.svg' },
]

export function TechStack({ descriptions }: { descriptions: Record<string, string> }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
      {technologies.map((tech, index) => (
        <div
          key={tech.name}
          tabIndex={0}
          aria-label={`${tech.name}: ${descriptions[tech.name] ?? ''}`}
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
            {descriptions[tech.name]}
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
