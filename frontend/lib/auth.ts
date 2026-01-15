import api from './api'

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'actor' | 'user'
}

export interface AuthResponse {
  success: boolean
  data: {
    user: User
    token: string
  }
  message?: string
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    })
    
    if (response.data.success && response.data.data.token) {
      // Stocker le token dans localStorage
      localStorage.setItem('auth_token', response.data.data.token)
      localStorage.setItem('auth_user', JSON.stringify(response.data.data.user))
      
      // Configurer le token dans les headers axios
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`
    }
    
    return response.data
  } catch (error: any) {
    console.error('Login error:', error)
    throw error
  }
}

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    // Supprimer le token et les données utilisateur
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    delete api.defaults.headers.common['Authorization']
  }
}

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('auth_user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

export const isAuthenticated = (): boolean => {
  return !!getAuthToken()
}

export const initAuth = (): void => {
  const token = getAuthToken()
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}
