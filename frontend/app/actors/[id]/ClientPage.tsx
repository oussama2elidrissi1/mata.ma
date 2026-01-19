'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  MapPin, Phone, Mail, Globe, Star, CheckCircle2, Award, Calendar, 
  ArrowLeft, Edit, AlertCircle, ExternalLink, Save, X, Users, Clock,
  MessageSquare, Plus, Trash2
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fetchActor } from '@/lib/api'
import { TourismActor } from '@/types'
import { formatRating, isValidRating } from '@/lib/utils'
import AccreditationRequestModal from '@/components/AccreditationRequestModal'
import { getCurrentUser, getAuthToken } from '@/lib/auth'
import api from '@/lib/api'
import { useTranslation } from '@/lib/i18n'

export default function ActorDetailPage() {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const [actor, setActor] = useState<TourismActor | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAccreditationModal, setShowAccreditationModal] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isOwner, setIsOwner] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [hasPendingRequest, setHasPendingRequest] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadActor()
    }
  }, [params.id])

  useEffect(() => {
    if (actor) {
      checkUserOwnership()
      checkPendingRequest()
    }
  }, [actor, params.id])

  const checkPendingRequest = async () => {
    if (!actor) return
    try {
      const response = await api.get('/accreditation-requests', {
        params: {
          status: 'pending',
          tourism_actor_id: actor.id
        }
      })
      const pendingRequests = response.data.data || []
      const hasRequest = pendingRequests.length > 0 && pendingRequests.some((req: any) => {
        const actorId = req.tourism_actor_id || req.tourism_actor?.id
        return actorId === actor.id && req.status === 'pending'
      })
      setHasPendingRequest(hasRequest)
    } catch (error) {
      console.error('Error checking pending request:', error)
      setHasPendingRequest(false)
    }
  }

  const checkUserOwnership = async () => {
    const user = getCurrentUser()
    const token = getAuthToken()
    
    if (user && token && user.role === 'actor' && actor) {
      setCurrentUser(user)
      try {
        const response = await api.get('/actor/me')
        if (response.data.success) {
          const userActor = response.data.data
          setIsOwner(userActor.id === Number(params.id))
        }
      } catch (error) {
        console.error('Error checking ownership:', error)
        setIsOwner(false)
      }
    } else {
      setIsOwner(false)
    }
  }

  const loadActor = async () => {
    try {
      setLoading(true)
      const data = await fetchActor(Number(params.id))
      setActor(data)
    } catch (error: any) {
      console.error('Error loading actor:', error)
      // L'erreur sera gérée par l'affichage conditionnel (!actor)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (field: string, currentValue: any) => {
    setEditingField(field)
    setEditFormData({ [field]: currentValue })
  }

  const handleSaveField = async (field: string) => {
    setSaving(true)
    try {
      const payload = { [field]: editFormData[field] }
      await api.put('/actor/update', payload)
      alert('Champ mis a jour avec succes !')
      setEditingField(null)
      loadActor()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de la mise a jour du champ.')
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingField(null)
    setEditFormData({})
  }

  const handleAddService = () => {
    const newService = prompt('Entrez le nom du service :')
    if (newService && newService.trim()) {
      const currentServices = editFormData.services || []
      setEditFormData({ services: [...currentServices, newService.trim()] })
    }
  }

  const handleRemoveService = (index: number) => {
    const currentServices = editFormData.services || []
    setEditFormData({ services: currentServices.filter((_: any, i: number) => i !== index) })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-900"></div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!actor) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 text-lg font-medium mb-4">Acteur non trouve</p>
          <Link href="/actors" className="text-blue-900 hover:text-blue-700 font-semibold transition-colors duration-200 inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Retour a l'annuaire
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const typeLabels: Record<string, string> = {
    hotel: 'Hotel',
    restaurant: 'Restaurant',
    travel_agency: 'Agence de Voyage',
    tour_guide: 'Guide Touristique',
    transport: 'Transport',
    attraction: 'Attraction',
    other: 'Autre',
  }

  const categoryLabels: Record<string, string> = {
    luxury: 'Luxe',
    premium: 'Premium',
    standard: 'Standard',
    budget: 'Economique',
  }

  const bannerImage = actor.images && actor.images.length > 0 
    ? actor.images[0] 
    : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop'

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={bannerImage}
          alt={actor.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 drop-shadow-lg tracking-tight font-serif">
                  {actor.name}
                </h1>
                {actor.name_ar && (
                  <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-4 font-medium drop-shadow-md">{actor.name_ar}</p>
                )}
                {isValidRating(actor.rating) && (
                  <div className="flex items-center gap-1.5 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 md:w-7 md:h-7 transition-all ${
                          i < Math.floor(Number(actor.rating))
                            ? 'fill-amber-400 text-amber-400 drop-shadow-lg'
                            : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/actors"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-200 font-medium group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Retour a l'annuaire</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-5 py-2.5 border-2 border-blue-500 rounded-xl text-blue-700 font-semibold flex items-center gap-2.5 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                <Star className="w-5 h-5 fill-blue-500 text-blue-500" />
                {actor.accreditation_number ? 'Accredite' : 'Standard'}
              </span>
              {actor.accreditation_number && actor.accreditation_date && (
                <span className="px-5 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-green-700 font-semibold flex items-center gap-2.5 shadow-sm hover:shadow-md transition-all duration-200">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <Calendar className="w-5 h-5 text-green-600" />
                  Accredite depuis {new Date(actor.accreditation_date).toLocaleDateString('fr-FR', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                  })}
                </span>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{t('aboutSection')}</h2>
                {isOwner && !editingField && (
                  <button
                    onClick={() => handleEdit('description', actor.description)}
                    className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                )}
              </div>
              {editingField === 'description' ? (
                <div className="space-y-4">
                  <textarea
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData({ description: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all duration-200 font-normal"
                    placeholder="Decrivez votre entreprise..."
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSaveField('description')}
                      disabled={saving}
                      className="px-6 py-2.5 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all duration-200 font-semibold flex items-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : actor.description ? (
                <p className="text-gray-700 leading-relaxed text-base font-normal">{actor.description}</p>
              ) : isOwner ? (
                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800 font-medium">Aucune description. Cliquez sur l'icone d'edition pour en ajouter une.</p>
                </div>
              ) : (
                <p className="text-gray-500 italic font-normal">Aucune description disponible.</p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Services Offerts</h2>
                {isOwner && (
                  <div className="flex gap-2">
                    {!editingField && (
                      <button
                        onClick={() => handleEdit('services', actor.services || [])}
                        className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
                        title="Modifier les services"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    )}
                    {editingField === 'services' && (
                      <button
                        onClick={handleAddService}
                        className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
                        title="Ajouter un service"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              {editingField === 'services' ? (
                <div className="space-y-4">
                  {editFormData.services && editFormData.services.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {editFormData.services.map((service: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700 flex-1">{service}</span>
                          <button
                            onClick={() => handleRemoveService(index)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic font-normal">Aucun service. Cliquez sur + pour en ajouter.</p>
                  )}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleSaveField('services')}
                      disabled={saving}
                      className="px-6 py-2.5 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all duration-200 font-semibold flex items-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : actor.services && actor.services.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {actor.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-default">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              ) : isOwner ? (
                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800 font-medium">Aucun service. Cliquez sur l'icone d'edition pour en ajouter.</p>
                </div>
              ) : (
                <p className="text-gray-500 italic font-normal">Aucun service disponible.</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-8 sticky top-24 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 tracking-tight">Informations de Contact</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 leading-relaxed">{actor.address || actor.city}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{actor.city}, {actor.region}</p>
                  </div>
                </div>

                {actor.phone && (
                  <div className="flex items-center gap-3.5">
                    <Phone className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <a href={`tel:${actor.phone}`} className="text-sm font-medium text-gray-800 hover:text-orange-600 transition-colors duration-200">
                      {actor.phone}
                    </a>
                  </div>
                )}

                {actor.email && (
                  <div className="flex items-center gap-3.5">
                    <Mail className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <a href={`mailto:${actor.email}`} className="text-sm font-medium text-gray-800 hover:text-orange-600 transition-colors duration-200 break-all">
                      {actor.email}
                    </a>
                  </div>
                )}

                {actor.website && (
                  <div className="flex items-center gap-3.5">
                    <Globe className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <a
                      href={actor.website.startsWith('http') ? actor.website : `https://${actor.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-800 hover:text-orange-600 transition-colors duration-200 break-all"
                    >
                      {actor.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>

              <button className="w-full mt-8 px-6 py-3.5 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                {t('contactButton')}
              </button>

              {!actor.user_id && !isOwner && (
                <>
                  {hasPendingRequest ? (
                    <div className="w-full mt-4 px-5 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl">
                      <div className="flex items-start gap-3 text-amber-800">
                        <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm mb-1">Demande en cours</p>
                          <p className="text-xs text-amber-700 leading-relaxed">
                            Une demande d'accreditation est deja en attente de validation.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAccreditationModal(true)}
                      className="w-full mt-4 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Award className="w-5 h-5" />
                      Demander l'accreditation
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showAccreditationModal && actor && (
        <AccreditationRequestModal
          actorId={actor.id}
          actorName={actor.name}
          onClose={() => setShowAccreditationModal(false)}
          onSuccess={() => {
            loadActor()
            checkPendingRequest()
          }}
        />
      )}
    </div>
  )
}
