import axios from 'axios'
import { TourismActor, Event, News } from '@/types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true,
})

// Initialiser le token au chargement si disponible
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('auth_token')
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // Pour FormData, s'assurer que le Content-Type n'est pas écrasé
      // mais que le token est toujours présent
      if (config.data instanceof FormData) {
        // Ne pas définir Content-Type manuellement pour FormData
        // axios le fera automatiquement avec le boundary
        delete config.headers['Content-Type']
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour gérer les erreurs 401 (non authentifié)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalide ou expiré
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete api.defaults.headers.common['Authorization']
        // Ne pas rediriger automatiquement, laisser chaque page gérer sa propre redirection
      }
    }
    return Promise.reject(error)
  }
)

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: any
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export const fetchActors = async (params?: string): Promise<TourismActor[]> => {
  try {
    const url = `/tourism-actors${params ? `?${params}` : ''}`
    console.log('Fetching from URL:', api.defaults.baseURL + url)
    const response = await api.get<PaginatedResponse<TourismActor>>(url)
    console.log('API Response:', response.data)
    
    if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data
    }
    
    console.warn('Unexpected response format:', response.data)
    return []
  } catch (error: any) {
    console.error('Error fetching actors:', error)
    if (error.response) {
      console.error('Response error:', error.response.data)
    }
    throw error
  }
}

export const fetchActor = async (id: number): Promise<TourismActor> => {
  try {
    const response = await api.get<ApiResponse<TourismActor>>(`/tourism-actors/${id}`)
    
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    
    throw new Error(response.data.message || 'Acteur non trouvé')
  } catch (error: any) {
    console.error('Error fetching actor:', error)
    if (error.response?.status === 404) {
      throw new Error('Acteur non trouvé')
    }
    throw error
  }
}

export const fetchRegions = async (): Promise<string[]> => {
  try {
    const response = await api.get<ApiResponse<string[]>>('/tourism-actors/regions/list')
    return response.data.data
  } catch (error) {
    console.error('Error fetching regions:', error)
    throw error
  }
}

export const fetchCities = async (region?: string): Promise<string[]> => {
  try {
    const params = region ? `?region=${region}` : ''
    const response = await api.get<ApiResponse<string[]>>(`/tourism-actors/cities/list${params}`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching cities:', error)
    throw error
  }
}

// Events API
export const fetchEvents = async (params?: string): Promise<Event[]> => {
  try {
    const url = `/events${params ? `?${params}` : ''}`
    const response = await api.get<PaginatedResponse<Event>>(url)
    
    if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data
    }
    
    return []
  } catch (error: any) {
    console.error('Error fetching events:', error)
    throw error
  }
}

export const fetchEvent = async (id: number): Promise<Event> => {
  try {
    const response = await api.get<ApiResponse<Event>>(`/events/${id}`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching event:', error)
    throw error
  }
}

export const createEvent = async (eventData: FormData): Promise<Event> => {
  try {
    const response = await api.post<ApiResponse<Event>>('/events', eventData)
    return response.data.data
  } catch (error: any) {
    console.error('Error creating event:', error)
    throw error
  }
}

export const updateEvent = async (id: number, eventData: FormData): Promise<Event> => {
  try {
    const response = await api.put<ApiResponse<Event>>(`/events/${id}`, eventData)
    return response.data.data
  } catch (error: any) {
    console.error('Error updating event:', error)
    throw error
  }
}

export const deleteEvent = async (id: number): Promise<void> => {
  try {
    await api.delete(`/events/${id}`)
  } catch (error) {
    console.error('Error deleting event:', error)
    throw error
  }
}

// News API
export const fetchNews = async (params?: string): Promise<News[]> => {
  try {
    const url = `/news${params ? `?${params}` : ''}`
    const response = await api.get<PaginatedResponse<News>>(url)
    
    if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data
    }
    
    return []
  } catch (error: any) {
    console.error('Error fetching news:', error)
    throw error
  }
}

export const fetchNewsArticle = async (id: number): Promise<News> => {
  try {
    const response = await api.get<ApiResponse<News>>(`/news/${id}`)
    
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    
    throw new Error(response.data.message || 'Article non trouvé')
  } catch (error: any) {
    console.error('Error fetching news article:', error)
    if (error.response?.status === 404) {
      throw new Error('Article non trouvé')
    }
    throw error
  }
}

export const createNews = async (newsData: FormData): Promise<News> => {
  try {
    const response = await api.post<ApiResponse<News>>('/news', newsData)
    return response.data.data
  } catch (error: any) {
    console.error('Error creating news:', error)
    throw error
  }
}

export const updateNews = async (id: number, newsData: FormData): Promise<News> => {
  try {
    console.log('Updating news with FormData:', id)
    /**
     * IMPORTANT:
     * PHP ne parse pas toujours multipart/form-data pour les requêtes PUT/PATCH.
     * Solution standard Laravel: POST + _method=PUT (method spoofing).
     */
    if (!newsData.has('_method')) {
      newsData.append('_method', 'PUT')
    }
    const response = await api.post<ApiResponse<News>>(`/news/${id}`, newsData)
    console.log('Update response:', response.data)
    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Erreur lors de la mise à jour')
    }
  } catch (error: any) {
    console.error('Error updating news:', error)
    if (error.response) {
      console.error('Error response status:', error.response.status)
      console.error('Error response data:', error.response.data)
    }
    throw error
  }
}

export const deleteNews = async (id: number): Promise<void> => {
  try {
    await api.delete(`/news/${id}`)
  } catch (error) {
    console.error('Error deleting news:', error)
    throw error
  }
}

export default api
