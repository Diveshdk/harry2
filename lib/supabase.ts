import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Project {
  id: number
  title: string
  subtitle?: string
  category: string
  location: string
  year: string
  area?: string
  architect: string
  photographer?: string
  client?: string
  status: string
  hero_image?: string
  description?: string
  images?: string[]
  content?: ContentBlock[]
  created_at: string
  updated_at: string
}

export interface ContentBlock {
  type: "text" | "image"
  content?: string
  src?: string
  caption?: string
}

export interface DesignBoardItem {
  id: number
  title: string
  category: string
  image: string
  description?: string
  created_at: string
  updated_at: string
}

export interface InstagramPost {
  id: number
  image: string
  likes: number
  comments: number
  post_link?: string
  post_date: string
  caption?: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image?: string
  rating: number
  text: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: number
  title: string
  organization: string
  year: string
  category: 'award' | 'certification' | 'publication'
  icon: string
  description?: string
  image?: string
  certificate_url?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Publication {
  id: number
  title: string
  journal: string
  date: string
  author: string
  image?: string
  description?: string
  link?: string
  featured: boolean
  created_at: string
  updated_at: string
}
