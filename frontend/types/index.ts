export interface TourismActor {
  id: number
  name: string
  name_ar?: string
  type: 'hotel' | 'restaurant' | 'travel_agency' | 'tour_guide' | 'transport' | 'attraction' | 'other' | 'association'
  category?: 'luxury' | 'premium' | 'standard' | 'budget'
  description?: string
  description_ar?: string
  address: string
  city: string
  region: string
  postal_code?: string
  country: string
  phone?: string
  email?: string
  website?: string
  accreditation_number?: string
  accreditation_date?: string
  accreditation_expiry?: string
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  latitude?: number
  longitude?: number
  logo?: string
  images?: string[]
  services?: string[]
  languages?: string[]
  opening_hours?: Record<string, string>
  team_size?: string
  rating: number | string | null
  verified: boolean
  user_id?: number
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'actor'
  tourism_actor?: TourismActor
  created_at: string
  updated_at: string
}

export interface AccreditationRequest {
  id: number
  tourism_actor_id: number
  tourismActor?: TourismActor
  full_name: string
  email: string
  phone?: string
  position?: string
  identity_document_type: string
  identity_document_number: string
  accreditation_document?: string
  message?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface Event {
  id: number
  title: string
  description: string
  category: 'Conférence' | 'Salon' | 'Formation' | 'Networking' | 'Autre'
  event_date: string
  start_time?: string
  end_time?: string
  location: string
  participants: number
  image?: string
  featured: boolean
  status: 'draft' | 'published' | 'cancelled'
  formatted_date?: string
  formatted_time?: string
  created_at: string
  updated_at: string
}

export interface News {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  image?: string
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  formatted_date?: string
  created_at: string
  updated_at: string
}
