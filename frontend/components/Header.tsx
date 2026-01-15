'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/lib/i18n'
import { getCurrentUser, isAuthenticated } from '@/lib/auth'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import LanguageSelector from './LanguageSelector'

export default function Header() {
  const pathname = usePathname()
  const { t } = useTranslation()
  // IMPORTANT: éviter l'accès localStorage au 1er rendu (SSR/hydration)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null)
  const [isAssociation, setIsAssociation] = useState(false)
  const [authed, setAuthed] = useState(false)
  
  useEffect(() => {
    setMounted(true)

    // Mettre à jour l'utilisateur si l'authentification change
    const checkUser = () => {
      const ok = isAuthenticated()
      setAuthed(ok)
      setUser(ok ? getCurrentUser() : null)
    }
    
    checkUser()
    // Écouter les changements de localStorage (autre onglet) + focus (même onglet)
    const onStorage = () => checkUser()
    const onFocus = () => checkUser()
    window.addEventListener('storage', onStorage)
    window.addEventListener('focus', onFocus)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  useEffect(() => {
    const run = async () => {
      // Association = actor dont tourism_actor.type == association
      if (!mounted || !authed || !user || user.role !== 'actor') {
        setIsAssociation(false)
        return
      }
      try {
        const res = await api.get('/actor/me')
        setIsAssociation(res.data?.data?.type === 'association')
      } catch {
        setIsAssociation(false)
      }
    }
    run()
  }, [mounted, authed, user])

  const isAdmin = user?.role === 'admin'

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-auto">
                <Image
                  src="/images/Logo.png"
                  alt="MATA Logo"
                  width={200}
                  height={80}
                  className="object-contain h-full w-auto"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-full transition-colors ${
                pathname === '/' 
                  ? 'text-white' 
                  : 'hover:bg-gray-100'
              }`}
              style={pathname === '/' ? { backgroundColor: '#CC0000' } : { color: '#333333' }}
            >
              {t('home')}
            </Link>
            <Link 
              href="/actors" 
              className={`px-4 py-2 rounded-full transition-colors ${
                pathname === '/actors' || pathname?.startsWith('/actors/')
                  ? 'text-white' 
                  : 'hover:bg-gray-100'
              }`}
              style={(pathname === '/actors' || pathname?.startsWith('/actors/')) ? { backgroundColor: '#CC0000' } : { color: '#333333' }}
            >
              {t('directory')}
            </Link>
            <Link 
              href="/events" 
              className={`px-4 py-2 rounded-full transition-colors ${
                pathname === '/events' || pathname?.startsWith('/events/')
                  ? 'text-white' 
                  : 'hover:bg-gray-100'
              }`}
              style={(pathname === '/events' || pathname?.startsWith('/events/')) ? { backgroundColor: '#CC0000' } : { color: '#333333' }}
            >
              {t('events')}
            </Link>
            <Link href="/accreditation" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style={{ color: '#333333' }}>
              {t('accreditation')}
            </Link>
            <Link href="/join" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style={{ color: '#333333' }}>
              {t('join')}
            </Link>
            <Link 
              href="/news" 
              className={`px-4 py-2 rounded-full transition-colors ${
                pathname === '/news' || pathname?.startsWith('/news/')
                  ? 'text-white' 
                  : 'hover:bg-gray-100'
              }`}
              style={(pathname === '/news' || pathname?.startsWith('/news/')) ? { backgroundColor: '#CC0000' } : { color: '#333333' }}
            >
              {t('news')}
            </Link>
            <Link href="/partners" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style={{ color: '#333333' }}>
              {t('partners')}
            </Link>
            <Link href="/about" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style={{ color: '#333333' }}>
              {t('about')}
            </Link>
            <Link href="/contact" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style={{ color: '#333333' }}>
              {t('contact')}
            </Link>
            {mounted && isAssociation && (
              <Link 
                href="/association/dashboard" 
                className={`px-4 py-2 rounded-full transition-colors ${
                  pathname === '/association/dashboard'
                    ? 'text-white' 
                    : 'hover:bg-gray-100'
                }`}
                style={pathname === '/association/dashboard' ? { backgroundColor: '#CC0000' } : { color: '#333333' }}
              >
                Mon Espace
              </Link>
            )}
            {mounted && isAdmin && (
              <Link 
                href="/admin" 
                className={`px-4 py-2 rounded-full transition-colors ${
                  pathname === '/admin' || pathname?.startsWith('/admin/')
                    ? 'text-white' 
                    : 'hover:bg-gray-100'
                }`}
                style={(pathname === '/admin' || pathname?.startsWith('/admin/')) ? { backgroundColor: '#CC0000' } : { color: '#333333' }}
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {mounted && authed && user && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            )}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  )
}
