import Link from 'next/link'
import Image from 'next/image'
import { Clock, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

const categoryLabels: Record<BlogPost['category'], string> = {
  python: 'Python',
  android: 'Android',
  'ia-ml': 'IA & ML',
  web: 'Web',
  databases: 'Databases',
  tutoriales: 'Tutoriales',
}

const categoryImages: Record<BlogPost['category'], string> = {
  python: '/course-python.jpg',
  android: '/course-android.jpg',
  'ia-ml': '/course-ia.jpg',
  web: '/product-web.jpg',
  databases: '/course-sql.jpg',
  tutoriales: '/blog-tutorials.jpg',
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : categoryImages[post.category]

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className={`bg-bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300 ${featured ? 'md:flex' : ''}`}
      >
        <div
          className={`relative overflow-hidden ${featured ? 'md:w-80 h-52 md:h-auto shrink-0' : 'h-44'}`}
        >
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-bg-dark/40" />
        </div>
        <div className="p-5">
          <Badge variant="blue" className="mb-3">
            {categoryLabels[post.category]}
          </Badge>
          <h3
            className={`text-text-primary font-semibold mb-2 group-hover:text-accent-green transition-colors line-clamp-2 ${featured ? 'text-xl' : 'text-base'}`}
          >
            {post.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readTime} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
