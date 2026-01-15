'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, LogIn } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import api from '@/lib/api'

export default function ActorLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      if (response.data.success) {
        const { user, token } = response.data.data
        
        // Vérifier que c'est un acteur
        if (user.role !== 'actor') {
          setError('Accès réservé aux acteurs du tourisme')
          setLoading(false)
          return
        }

        // Stocker le token et les infos utilisateur (utiliser les clés standard)
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))
        // Garder aussi les anciennes clés pour compatibilité
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        // Configurer le token dans l'API
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // Charger le profil acteur pour savoir si c'est une association
        try {
          const meResponse = await api.get('/actor/me')
          console.log('🔍 Actor/me response:', meResponse.data)
          
          // Gérer différentes structures de réponse
          const actor = meResponse.data?.data || meResponse.data
          
          console.log('👤 Actor object:', actor)
          console.log('📋 Actor type:', actor?.type)
          
          if (actor && actor.type === 'association') {
            console.log('✅ Redirecting to association dashboard')
            router.push('/association/dashboard')
          } else {
            console.log('✅ Redirecting to actor dashboard')
            router.push('/actor/dashboard')
          }
        } catch (error: any) {
          console.error('❌ Error loading actor profile:', error)
          console.error('   - Error message:', error.message)
          console.error('   - Error response:', error.response?.data)
          console.error('   - Error status:', error.response?.status)
          
          // Si l'acteur n'existe pas encore (404), c'est peut-être une association en attente
          // On redirige vers le dashboard acteur par défaut
          if (error.response?.status === 404) {
            setError('Votre profil acteur n\'est pas encore configuré. Veuillez contacter l\'administrateur.')
            setLoading(false)
            return
          }
          
          // Pour les autres erreurs, on redirige quand même vers le dashboard acteur
          router.push('/actor/dashboard')
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion Acteur</h1>
              <p className="text-gray-600">Accédez à votre espace de gestion</p>
              <p className="text-sm text-gray-500 mt-2">Acteurs et associations du tourisme</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all text-gray-900 bg-white"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all text-gray-900 bg-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Connexion...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Se connecter</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Vous avez oublié votre mot de passe ?{' '}
                <a href="#" className="text-blue-900 hover:text-blue-700 font-medium">
                  Contactez-nous
                </a>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Vous n'avez pas encore de compte ?{' '}
              <a href="/actors" className="text-blue-900 hover:text-blue-700 font-medium">
                Faites une demande d'accréditation
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
