const technologies = [
  // Mobile
  { name: 'Android', icon: '/icons/android.svg' },
  { name: 'Kotlin', icon: '/icons/kotlin.svg' },
  { name: 'Java', icon: '/icons/java.svg' },
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
  { name: 'MySQL', icon: '/icons/mysql.svg' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg' },
  { name: 'Supabase', icon: '/icons/supabase.svg' },
  { name: 'Firebase', icon: '/icons/firebase.svg' },
  // DevOps / Deploy
  { name: 'Docker', icon: '/icons/docker.svg' },
  { name: 'Git', icon: '/icons/git.svg' },
  { name: 'Vercel', icon: '/icons/vercel.svg' },
  // IA / ML
  { name: 'TensorFlow', icon: '/icons/tensorflow.svg' },
  // Desktop
  { name: 'Electron', icon: '/icons/electron.svg' },
]

export function TechStack() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
      {technologies.map((tech) => (
        <div
          key={tech.name}
          className="bg-bg-surface border border-white/5 rounded-lg p-3 flex flex-col items-center gap-2.5 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all group cursor-default"
        >
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
