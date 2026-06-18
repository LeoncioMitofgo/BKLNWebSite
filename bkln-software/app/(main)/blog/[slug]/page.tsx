import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react'
import type { Metadata } from 'next'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { BlogCard } from '@/components/sections/BlogCard'
import { formatDate } from '@/lib/utils'
import { blogPosts } from '@/data/content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

const categoryLabels: Record<string, string> = {
  python: 'Python', android: 'Android', 'ia-ml': 'IA & ML',
  web: 'Web', databases: 'Databases', tutoriales: 'Tutoriales',
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2)

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-green transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Volver al blog
        </Link>

        {/* Cover */}
        <div className="h-64 relative rounded-lg overflow-hidden mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-bg-dark/50" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="blue">{categoryLabels[post.category]}</Badge>
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Calendar size={13} /> {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Clock size={13} /> {post.readTime} min de lectura
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{post.title}</h1>
        <p className="text-text-secondary text-lg mb-6">{post.excerpt}</p>

        {/* Autor */}
        <div className="flex items-center gap-3 pb-8 border-b border-white/5 mb-8">
          <div className="w-10 h-10 bg-brand-green/20 rounded-full flex items-center justify-center">
            <User size={16} className="text-accent-green" />
          </div>
          <div>
            <p className="text-text-primary font-medium text-sm">{post.author.name}</p>
            <p className="text-text-secondary text-xs">{post.author.bio}</p>
          </div>
        </div>

        {/* Contenido */}
        <div className="prose prose-invert prose-blue max-w-none mb-12 prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-code:text-accent-green prose-code:bg-bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-bg-surface prose-pre:border prose-pre:border-white/10 prose-li:text-text-secondary prose-a:text-accent-green prose-blockquote:border-brand-green prose-blockquote:text-text-secondary">
          <MarkdownContent content={post.content} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-white/5">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-5 text-center">
            <p className="text-text-primary font-semibold mb-2">¿Necesitas ayuda técnica?</p>
            <p className="text-text-secondary text-sm mb-4">Construimos lo que necesitas.</p>
            <Link href="/contacto">
              <Button size="sm">Contratar servicios</Button>
            </Link>
          </div>
          <div className="bg-bg-surface border border-white/5 rounded-lg p-5 text-center">
            <p className="text-text-primary font-semibold mb-2">Aprende más</p>
            <p className="text-text-secondary text-sm mb-4">Cursos prácticos en español.</p>
            <Link href="/cursos">
              <Button variant="outline" size="sm">Ver cursos</Button>
            </Link>
          </div>
        </div>

        {/* Artículos relacionados */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-5">Artículos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
