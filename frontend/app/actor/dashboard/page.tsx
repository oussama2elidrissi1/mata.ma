'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, Settings, Image as ImageIcon, Upload, Trash2, 
  MapPin, Phone, Mail, Globe, Save, LogOut, Building2 
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import api from '@/lib/api'
import { TourismActor } from '@/types'
import { getAuthToken, getCurrentUser } from '@/lib/auth'

export default function ActorDashboard() {
  const router = useRouter()
  const [actor, setActor] = useState<TourismActor | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    description: '',
    description_ar: '',
    address: '',
    phone: '',
    website: '',
    services: [] as string[],
    languages: [] as string[],
  })

  useEffect(() => {
    const init = async () => {
      // Vérifier l'authentification d'abord
      const token = getAuthToken()
      const user = getCurrentUser()
      
      if (!token || !user || user.role !== 'actor') {
        setLoading(false)
        router.push('/actor/login')
        return
      }

      // Si authentifié, charger les données
      await loadActor()
    }
    
    init()
  }, [router])

  const loadActor = async () => {
    try {
      const response = await api.get('/actor/me')
      if (response.data.success) {
        const actorData = response.data.data
        setActor(actorData)
        setFormData({
          name: actorData.name || '',
          name_ar: actorData.name_ar || '',
          description: actorData.description || '',
          description_ar: actorData.description_ar || '',
          address: actorData.address || '',
          phone: actorData.phone || '',
          website: actorData.website || '',
          services: actorData.services || [],
          languages: actorData.languages || [],
        })
      }
    } catch (error: any) {
      console.error('Error loading actor:', error)
      // Si erreur 401 ou 403, rediriger vers login
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        router.push('/actor/login')
        return
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await api.put('/actor/update', formData)
      if (response.data.success) {
        alert('Informations mises à jour avec succès')
        loadActor()
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de la mise à jour')
    } finally {
      setSaving(false)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('logo', file)

    try {
      const response = await api.post('/actor/logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (response.data.success) {
        alert('Logo mis à jour avec succès')
        loadActor()
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de l\'upload')
    } finally {
      setUploading(false)
    }
  }

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append('images[]', file)
    })

    try {
      const response = await api.post('/actor/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (response.data.success) {
        alert('Images ajoutées avec succès')
        loadActor()
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de l\'upload')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (index: number) => {
    if (!confirm('Supprimer cette image ?')) return

    try {
      const response = await api.delete(`/actor/images/${index}`)
      if (response.data.success) {
        alert('Image supprimée')
        loadActor()
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de la suppression')
    }
  }

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/actor/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  // Si pas d'acteur après chargement, ne rien afficher (redirection en cours)
  if (!actor) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">Mon Espace</h1>
              <p className="text-gray-600">Gérez vos informations et votre profil</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-24">
              <div className="text-center mb-6">
                {actor?.logo ? (
                  <img
                    src={actor.logo}
                    alt={actor.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-900"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-blue-600 to-amber-600 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-white" />
                  </div>
                )}
                <h2 className="text-xl font-bold text-gray-900 mt-4">{actor?.name}</h2>
                {actor?.accreditation_number && (
                  <p className="text-sm text-gray-600 mt-1">
                    Accréditation: {actor.accreditation_number}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <User className="w-5 h-5 text-blue-900" />
                  <span className="font-medium text-gray-900">Informations</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <ImageIcon className="w-5 h-5" />
                  <span>Images</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Settings className="w-5 h-5" />
                  <span>Paramètres</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Informations générales</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom (FR)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom (AR)</label>
                  <input
                    type="text"
                    value={formData.name_ar}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (FR)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (AR)</label>
                  <textarea
                    value={formData.description_ar}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                    dir="rtl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site web</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                  />
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </button>
              </div>
            </div>

            {/* Logo */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Logo</h3>
              <div className="flex items-center gap-6">
                {actor?.logo && (
                  <img src={actor.logo} alt="Logo" className="w-32 h-32 rounded-lg object-cover" />
                )}
                <div>
                  <label className="block">
                    <span className="sr-only">Choisir un logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploading}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-white hover:file:bg-blue-800 disabled:opacity-50"
                    />
                  </label>
                  <p className="mt-2 text-sm text-gray-500">JPG, PNG ou GIF (max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Images</h3>
              
              <div className="mb-4">
                <label className="block">
                  <span className="sr-only">Ajouter des images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-white hover:file:bg-blue-800 disabled:opacity-50"
                  />
                </label>
                <p className="mt-2 text-sm text-gray-500">Jusqu'à 10 images (max 5MB chacune)</p>
              </div>

              {actor?.images && actor.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {actor.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
