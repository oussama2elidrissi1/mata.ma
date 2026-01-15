'use client'

import { useState, useEffect } from 'react'
import { LogOut, User, Bell, Building2, Calendar, Newspaper, CheckCircle, X, Clock, Mail, MapPin, Phone, Globe } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import { logout } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import DashboardStats from '@/components/admin/DashboardStats'
import RecentActors from '@/components/admin/RecentActors'
import AdminHeader from '@/components/admin/AdminHeader'
import { useTranslation } from '@/lib/i18n'
import api, { PaginatedResponse } from '@/lib/api'
import { TourismActor, Event, News } from '@/types'

interface AssociationRequest {
  id: string
  fullName: string
  establishmentName: string
  email: string
  phone: string
  region: string
  city: string
  address: string
  website?: string
  description: string
  category: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  accountType: 'association'
}

interface PendingEvent {
  id: number
  title: string
  description: string
  date: string
  location: string
  category: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  associationName: string
}

interface PendingNews {
  id: number
  title: string
  content: string
  category: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  associationName: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const { t } = useTranslation()
  const [user, setUser] = useState(getCurrentUser())
  const [activeTab, setActiveTab] = useState<'dashboard' | 'associations' | 'events' | 'news'>('dashboard')
  const [associationFilter, setAssociationFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [associationRequests, setAssociationRequests] = useState<AssociationRequest[]>([])
  const [pendingEvents, setPendingEvents] = useState<PendingEvent[]>([])
  const [pendingNews, setPendingNews] = useState<PendingNews[]>([])

  useEffect(() => {
    loadAssociationRequests()
    loadPendingEvents()
    loadPendingNews()
  }, [])

  const loadAssociationRequests = async () => {
    try {
      const params = new URLSearchParams()
      params.append('type', 'association')
      params.append('all_status', 'true')
      params.append('per_page', '1000')

      const res = await api.get<PaginatedResponse<TourismActor>>(`/tourism-actors?${params.toString()}`)
      if (!res.data.success) {
        setAssociationRequests([])
        return
      }

      const statusMap: Record<string, AssociationRequest['status']> = {
        pending: 'pending',
        active: 'approved',
        inactive: 'rejected',
        suspended: 'rejected',
      }

      const mapped: AssociationRequest[] = res.data.data.map((actor) => ({
        id: String(actor.id),
        fullName: '',
        establishmentName: actor.name,
        email: actor.email || '',
        phone: actor.phone || '',
        region: actor.region,
        city: actor.city,
        address: actor.address,
        website: actor.website || undefined,
        description: actor.description || '',
        category: '',
        status: statusMap[actor.status] || 'pending',
        submittedAt: (actor.created_at || '').split('T')[0] || new Date().toISOString().split('T')[0],
        accountType: 'association',
      }))

      setAssociationRequests(mapped)
    } catch (e) {
      console.error('Error loading association requests:', e)
      setAssociationRequests([])
    }
  }

  const loadPendingEvents = async () => {
    try {
      // Charger les événements avec statut "draft" (en attente de validation)
      const response = await api.get<PaginatedResponse<Event>>('/events?status=draft&per_page=1000')
      if (response.data.success && response.data.data) {
        const events = response.data.data
        // Mapper les événements pour correspondre à l'interface PendingEvent
        const mappedEvents: PendingEvent[] = events.map((event) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.event_date,
          location: event.location,
          category: event.category,
          status: event.status === 'draft' ? 'pending' : (event.status === 'published' ? 'approved' : 'rejected') as 'pending' | 'approved' | 'rejected',
          submittedAt: event.created_at,
          associationName: 'Association' // TODO: Récupérer le nom de l'association depuis l'API
        }))
        setPendingEvents(mappedEvents)
      }
    } catch (error) {
      console.error('Error loading pending events:', error)
      setPendingEvents([])
    }
  }

  const loadPendingNews = async () => {
    try {
      // Charger les actualités avec statut "draft" (en attente de validation)
      const response = await api.get<PaginatedResponse<News>>('/news?status=draft&per_page=1000')
      if (response.data.success && response.data.data) {
        const newsItems = response.data.data
        // Mapper les actualités pour correspondre à l'interface PendingNews
        const mappedNews: PendingNews[] = newsItems.map((news) => ({
          id: news.id,
          title: news.title,
          content: news.content,
          category: news.category,
          status: news.status === 'draft' ? 'pending' : (news.status === 'published' ? 'approved' : 'rejected') as 'pending' | 'approved' | 'rejected',
          submittedAt: news.created_at,
          associationName: news.author || 'Association' // Utiliser l'auteur comme nom d'association
        }))
        setPendingNews(mappedNews)
      }
    } catch (error) {
      console.error('Error loading pending news:', error)
      setPendingNews([])
    }
  }

  const handleApproveAssociation = async (id: string) => {
    const actorId = Number(id)
    if (!actorId) return
    try {
      // Backend: active + verified + création utilisateur + email (voir AccreditationController)
      await api.post(`/accreditations/${actorId}/approve-without-badge`)
      alert("Association approuvée. Un email avec les identifiants a été envoyé.")
      loadAssociationRequests()
    } catch (e: any) {
      alert(e.response?.data?.message || "Erreur lors de l'approbation")
    }
  }

  const handleRejectAssociation = async (id: string) => {
    const actorId = Number(id)
    if (!actorId) return
    try {
      await api.put(`/tourism-actors/${actorId}`, { status: 'inactive', verified: false })
      alert('Association rejetée')
      loadAssociationRequests()
    } catch (e: any) {
      alert(e.response?.data?.message || "Erreur lors du rejet")
    }
  }

  const handleApproveEvent = async (id: number) => {
    try {
      // Mettre à jour le statut de l'événement à "published"
      await api.put(`/events/${id}`, { status: 'published' })
      alert('Événement approuvé et publié')
      loadPendingEvents() // Recharger la liste
    } catch (error: any) {
      console.error('Error approving event:', error)
      alert(error.response?.data?.message || 'Erreur lors de l\'approbation de l\'événement')
    }
  }

  const handleRejectEvent = async (id: number) => {
    try {
      // Mettre à jour le statut de l'événement à "cancelled" (rejeté)
      await api.put(`/events/${id}`, { status: 'cancelled' })
      alert('Événement rejeté')
      loadPendingEvents() // Recharger la liste
    } catch (error: any) {
      console.error('Error rejecting event:', error)
      alert(error.response?.data?.message || 'Erreur lors du rejet de l\'événement')
    }
  }

  const handleApproveNews = async (id: number) => {
    try {
      // Mettre à jour le statut de l'actualité à "published"
      await api.put(`/news/${id}`, { status: 'published' })
      alert('Actualité approuvée et publiée')
      loadPendingNews() // Recharger la liste
    } catch (error: any) {
      console.error('Error approving news:', error)
      alert(error.response?.data?.message || 'Erreur lors de l\'approbation de l\'actualité')
    }
  }

  const handleRejectNews = async (id: number) => {
    try {
      // Mettre à jour le statut de l'actualité à "archived" (rejeté)
      await api.put(`/news/${id}`, { status: 'archived' })
      alert('Actualité rejetée')
      loadPendingNews() // Recharger la liste
    } catch (error: any) {
      console.error('Error rejecting news:', error)
      alert(error.response?.data?.message || 'Erreur lors du rejet de l\'actualité')
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }
    const iconComponents = {
      pending: Clock,
      approved: CheckCircle,
      rejected: X
    }
    const labels = {
      pending: 'En attente',
      approved: 'Approuvé',
      rejected: 'Rejeté'
    }

    const IconComponent = iconComponents[status as keyof typeof iconComponents]
    const styleClass = styles[status as keyof typeof styles]
    const label = labels[status as keyof typeof labels]

    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${styleClass}`}>
        <IconComponent className="w-4 h-4" />
        <span>{label}</span>
      </span>
    )
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'associations', label: 'Associations', icon: Building2, count: associationRequests.filter(r => r.status === 'pending').length },
    { id: 'events', label: 'Événements', icon: Calendar, count: pendingEvents.filter(e => e.status === 'pending').length },
    { id: 'news', label: 'Actualités', icon: Newspaper, count: pendingNews.filter(n => n.status === 'pending').length }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Administration"
        subtitle="Gestion des associations, événements et actualités"
        actions={
          <>
            <button className="p-2 text-white hover:bg-blue-800 rounded-lg relative transition-colors">
              <Bell className="w-5 h-5" />
              {(associationRequests.filter(r => r.status === 'pending').length > 0 ||
                pendingEvents.filter(e => e.status === 'pending').length > 0 ||
                pendingNews.filter(n => n.status === 'pending').length > 0) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            {user && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg">
                <User className="w-4 h-4 text-white" />
                <span className="text-sm text-white">{user.name}</span>
              </div>
            )}
            <button
              onClick={async () => {
                await logout()
                router.push('/admin/login')
              }}
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </>
        }
      />

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-blue-900 border-b-2 border-blue-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'dashboard' && (
          <>
            <DashboardStats />
            <div className="mt-6">
              <RecentActors />
            </div>
          </>
        )}

        {activeTab === 'associations' && (
          <div className="space-y-6">
            {/* Filtres */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold" style={{ color: '#333333' }}>
                  Gestion des Associations
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setAssociationFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      associationFilter === 'all'
                        ? 'bg-blue-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Toutes ({associationRequests.length})
                  </button>
                  <button
                    onClick={() => setAssociationFilter('pending')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                      associationFilter === 'pending'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    En attente ({associationRequests.filter(r => r.status === 'pending').length})
                  </button>
                  <button
                    onClick={() => setAssociationFilter('approved')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      associationFilter === 'approved'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Approuvées ({associationRequests.filter(r => r.status === 'approved').length})
                  </button>
                  <button
                    onClick={() => setAssociationFilter('rejected')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      associationFilter === 'rejected'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Rejetées ({associationRequests.filter(r => r.status === 'rejected').length})
                  </button>
                </div>
              </div>
            </div>

            {/* Liste des associations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {(() => {
                const filteredAssociations = associationFilter === 'all'
                  ? associationRequests
                  : associationRequests.filter(r => r.status === associationFilter)

                if (filteredAssociations.length === 0) {
                  return (
                    <p className="text-gray-600 text-center py-8">
                      {associationFilter === 'all'
                        ? 'Aucune association'
                        : associationFilter === 'pending'
                        ? 'Aucune demande en attente'
                        : associationFilter === 'approved'
                        ? 'Aucune association approuvée'
                        : 'Aucune association rejetée'}
                    </p>
                  )
                }

                return (
                  <div className="space-y-4">
                    {filteredAssociations.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Building2 className="w-5 h-5 text-blue-900" />
                            <h3 className="text-xl font-semibold" style={{ color: '#333333' }}>
                              {request.establishmentName}
                            </h3>
                            {getStatusBadge(request.status)}
                          </div>
                          <p className="text-gray-600 mb-4">{request.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700"><strong>Contact:</strong> {request.fullName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{request.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{request.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{request.city}, {request.region}</span>
                            </div>
                            {request.website && (
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-400" />
                                <a href={request.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {request.website}
                                </a>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="text-gray-700"><strong>Catégorie:</strong> {request.category}</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-4">
                            Soumis le {request.submittedAt}
                          </p>
                        </div>
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => handleApproveAssociation(request.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approuver
                          </button>
                          <button
                            onClick={() => handleRejectAssociation(request.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Rejeter
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            })()}
            </div>

            {/* Statistiques des associations */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-blue-900">{associationRequests.length}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">En attente</p>
                    <p className="text-2xl font-bold text-yellow-700">{associationRequests.filter(r => r.status === 'pending').length}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Approuvées</p>
                    <p className="text-2xl font-bold text-green-700">{associationRequests.filter(r => r.status === 'approved').length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Rejetées</p>
                    <p className="text-2xl font-bold text-red-700">{associationRequests.filter(r => r.status === 'rejected').length}</p>
                  </div>
                  <X className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333333' }}>
                Événements en Attente ({pendingEvents.filter(e => e.status === 'pending').length})
              </h2>
              
              {pendingEvents.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Aucun événement en attente</p>
              ) : (
                <div className="space-y-4">
                  {pendingEvents.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-5 h-5 text-blue-900" />
                            <h3 className="text-xl font-semibold" style={{ color: '#333333' }}>
                              {event.title}
                            </h3>
                            {getStatusBadge(event.status)}
                          </div>
                          <p className="text-gray-600 mb-3">{event.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700"><strong>Date:</strong> {event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700"><strong>Lieu:</strong> {event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-700"><strong>Catégorie:</strong> {event.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700"><strong>Association:</strong> {event.associationName}</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-4">
                            Soumis le {event.submittedAt}
                          </p>
                        </div>
                      </div>
                      
                      {event.status === 'pending' && (
                        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => handleApproveEvent(event.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approuver
                          </button>
                          <button
                            onClick={() => handleRejectEvent(event.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Rejeter
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333333' }}>
                Actualités en Attente ({pendingNews.filter(n => n.status === 'pending').length})
              </h2>
              
              {pendingNews.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Aucune actualité en attente</p>
              ) : (
                <div className="space-y-4">
                  {pendingNews.map((news) => (
                    <div key={news.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Newspaper className="w-5 h-5 text-blue-900" />
                            <h3 className="text-xl font-semibold" style={{ color: '#333333' }}>
                              {news.title}
                            </h3>
                            {getStatusBadge(news.status)}
                          </div>
                          <p className="text-gray-600 mb-3">{news.content}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-700"><strong>Catégorie:</strong> {news.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700"><strong>Association:</strong> {news.associationName}</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-4">
                            Soumis le {news.submittedAt}
                          </p>
                        </div>
                      </div>
                      
                      {news.status === 'pending' && (
                        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => handleApproveNews(news.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approuver
                          </button>
                          <button
                            onClick={() => handleRejectNews(news.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Rejeter
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
