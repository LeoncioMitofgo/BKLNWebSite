export interface Service {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  icon: string
  technologies: string[]
  pricingFactors: string[]
  deliverables: string[]
  timeline: string
  featured: boolean
}

export interface Product {
  fileUrl: string
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  category: 'android' | 'desktop' | 'scripts' | 'free' | 'web' | 'ia'
  price: number
  isFree: boolean
  priceOnRequest?: boolean
  image: string
  screenshots: string[]
  rating: number
  downloads: number
  version: string
  requirements: string[]
  changelog: { version: string; date: string; changes: string[] }[]
  includes?: string[]
  deliveryType?: 'source-code' | 'license' | 'install'
  supportPlan?: { price: number; period: string; includes: string[] }
  fileKey?: string
  stripeProductId?: string
  stripePriceId?: string
}

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  category: 'python' | 'web' | 'databases' | 'ia-ml' | 'android' | 'marketplaces'
  price: number
  thumbnail: string
  duration: string
  level: 'principiante' | 'intermedio' | 'avanzado'
  rating: number
  students: number
  instructor: Instructor
  modules: CourseModule[]
  includes: string[]
  status?: 'available' | 'coming-soon'
  bookUrl?: string
  stripeProductId?: string
  stripePriceId?: string
}

export interface Instructor {
  name: string
  bio: string
  avatar: string
}

export interface CourseModule {
  id: string
  title: string
  duration: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  duration: string
  isFree: boolean
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  category: 'android' | 'web' | 'desktop' | 'python' | 'ia'
  technologies: string[]
  image: string
  gallery: string[]
  year: number
  liveUrl?: string
  demoUrl?: string
  clientTestimonial?: Testimonial
  challenges: string[]
  solutions: string[]
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: 'python' | 'android' | 'ia-ml' | 'web' | 'databases' | 'tutoriales'
  coverImage: string
  author: Author
  publishedAt: string
  readTime: number
  tags: string[]
}

export interface Author {
  name: string
  avatar: string
  bio: string
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  avatar: string
  content: string
  rating: number
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  projectType: string
  budget: string
  description: string
}

export interface NavLink {
  label: string
  href: string
}
