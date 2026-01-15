'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAuthenticated, getCurrentUser } from '@/lib/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const hasRedirected = useRef(false)
  
  // Vérification immédiate au premier rendu
  const checkAuthImmediate = () => {
    if (typeof window === 'undefined') return false
    const authenticated = isAuthenticated()
    const user = getCurrentUser()
    return authenticated && user && user.role === 'admin'
  }

  const [isAuth, setIsAuth] = useState(() => {
    if (typeof window === 'undefined') return false
    return checkAuthImmediate()
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Éviter les redirections multiples
    if (hasRedirected.current) return
    
    // Ne pas rediriger si on est déjà sur la page de login
    if (pathname === '/admin/login') {
      setIsLoading(false)
      return
    }

    // Vérification rapide
    const authenticated = isAuthenticated()
    const user = getCurrentUser()

    if (!authenticated || !user || user.role !== 'admin') {
      hasRedirected.current = true
      router.replace('/admin/login')
      return
    }

    setIsAuth(true)
    setIsLoading(false)
  }, [router, pathname])

  // Si on est sur la page de login, ne pas afficher le loader
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Si authentifié, afficher immédiatement
  if (isAuth && !isLoading) {
    return <>{children}</>
  }

  // Afficher le loader seulement si vraiment nécessaire
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Vérification de l'authentification...</p>
      </div>
    </div>
  )
}
