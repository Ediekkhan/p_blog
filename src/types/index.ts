import { PortableTextBlock } from '@sanity/types'

export interface Category {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
}

export interface Sermon {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  date: string
  contentType: 'video' | 'audio' | 'text'
  videoUrl?: string
  audioUrl?: string
  audioFile?: string
  textContent?: PortableTextBlock[]
  thumbnail?: {
    asset: {
      _id: string
      url: string
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  speaker?: string
  duration?: number
  featured: boolean
  category: Category
  publishedAt: string
}

export interface PrayerRequest {
  name: string
  email: string
  prayer: string
  category: 'healing' | 'guidance' | 'thanksgiving' | 'intercession' | 'other'
  isPublic: boolean
}
