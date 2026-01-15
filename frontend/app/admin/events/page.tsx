'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Calendar, MapPin, Users, Clock, Star, Eye, X } from 'lucide-react'
import { Event } from '@/types'
import { fetchEvents, createEvent, updateEvent, deleteEvent, PaginatedResponse } from '@/lib/api'
import api from '@/lib/api'
import AdminHeader from '@/components/admin/AdminHeader'
import Image from 'next/image'

interface PaginationInfo {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  })
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    cancelled: 0,
    featured: 0,
  })

  useEffect(() => {
    loadEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedStatus, pagination.current_page])

  const loadEvents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedStatus !== 'all') {
        params.append('status', selectedStatus)
      } else {
        params.append('status', 'all')
      }
      if (selectedCategory) {
        params.append('category', selectedCategory)
      }
      params.append('per_page', pagination.per_page.toString())
      params.append('page', pagination.current_page.toString())

      const response = await api.get<PaginatedResponse<Event>>(`/events?${params.toString()}`)
      
      if (response.data.success) {
        const eventsData = response.data.data
        setEvents(eventsData)
        
        // Calculer les statistiques
        setStats({
          total: response.data.pagination?.total || eventsData.length,
          published: eventsData.filter(e => e.status === 'published').length,
          draft: eventsData.filter(e => e.status === 'draft').length,
          cancelled: eventsData.filter(e => e.status === 'cancelled').length,
          featured: eventsData.filter(e => e.featured).length,
        })
        
        if (response.data.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.data.pagination,
            per_page: pagination.per_page,
          }))
        }
      }
    } catch (error) {
      console.error('Error loading events:', error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return

    try {
      await deleteEvent(id)
      loadEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setShowModal(true)
  }

  const handleNew = () => {
    setEditingEvent(null)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingEvent(null)
    loadEvents()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const formatTime = (timeString?: string) => {
    if (!timeString) return ''
    return timeString.substring(0, 5) // Format HH:mm
  }

  const filteredEvents = events.filter(event => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      )
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Événements"
        subtitle="Gestion des événements"
      />
      <div className="p-6">
        {/* Header avec bouton */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900">Gestion des Événements</h1>
            <p className="text-gray-600 mt-1">Gérez tous les événements professionnels</p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg font-medium"
            style={{ backgroundColor: '#CC0000' }}
          >
            <Plus className="w-5 h-5" />
            Nouvel événement
          </button>
        </div>

        {/* Statistiques - Design amélioré */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-600 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-emerald-600 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Publiés</p>
                <p className="text-3xl font-bold">{stats.published}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-gray-500 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 text-sm font-medium mb-1">Brouillons</p>
                <p className="text-3xl font-bold">{stats.draft}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-red-600 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Annulés</p>
                <p className="text-3xl font-bold">{stats.cancelled}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <X className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-amber-500 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium mb-1">À la une</p>
                <p className="text-3xl font-bold">{stats.featured}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtres - Section organisée */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filtres et Recherche</h2>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('')
                setSelectedStatus('all')
                loadEvents()
              }}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un événement..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                <option value="">Toutes les catégories</option>
                <option value="Conférence">Conférence</option>
                <option value="Salon">Salon</option>
                <option value="Formation">Formation</option>
                <option value="Networking">Networking</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                <option value="all">Tous les statuts</option>
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={loadEvents}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {/* Tableau - Section organisée */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Liste des Événements</h2>
            <p className="text-sm text-gray-600 mt-1">{filteredEvents.length} événement(s) trouvé(s)</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Chargement des événements...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Catégorie</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lieu</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Aucun événement trouvé</p>
                        <p className="text-gray-500 text-sm mt-1">Créez votre premier événement en cliquant sur "Nouvel événement"</p>
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((event) => 
                      <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                            <Image
                              src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{event.title}</div>
                            {event.featured && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs text-yellow-600 font-medium">À la une</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary bg-opacity-10 text-primary">
                            {event.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatDate(event.event_date)}</div>
                          {event.start_time && (
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(event.start_time)}
                              {event.end_time && ` - ${formatTime(event.end_time)}`}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {event.location}
                          </div>
                          {event.participants > 0 && (
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Users className="w-3 h-3" />
                              {event.participants} participants
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            event.status === 'published' ? 'bg-green-100 text-green-800' :
                            event.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {event.status === 'published' ? 'Publié' :
                             event.status === 'draft' ? 'Brouillon' :
                             'Annulé'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEdit(event)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="Modifier"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination - Section organisée */}
        {pagination.last_page > 1 && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Page {pagination.current_page}</span> sur {pagination.last_page} 
                <span className="text-gray-500 ml-2">({pagination.total} événement{pagination.total > 1 ? 's' : ''})</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, current_page: Math.max(1, prev.current_page - 1) }))}
                  disabled={pagination.current_page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, current_page: Math.min(prev.last_page, prev.current_page + 1) }))}
                  disabled={pagination.current_page === pagination.last_page}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal pour créer/modifier un événement */}
      {showModal && (
        <EventFormModal
          event={editingEvent}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}

// Composant Modal pour le formulaire d'événement
function EventFormModal({ event, onClose }: { event: Event | null, onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    category: event?.category || 'Conférence',
    event_date: event?.event_date ? new Date(event.event_date).toISOString().split('T')[0] : '',
    start_time: event?.start_time || '',
    end_time: event?.end_time || '',
    location: event?.location || '',
    participants: event?.participants || 0,
    featured: event?.featured || false,
    status: event?.status || 'published',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(event?.image || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('event_date', formData.event_date)
      if (formData.start_time) formDataToSend.append('start_time', formData.start_time)
      if (formData.end_time) formDataToSend.append('end_time', formData.end_time)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('participants', formData.participants.toString())
      formDataToSend.append('featured', formData.featured ? '1' : '0')
      formDataToSend.append('status', formData.status)
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      if (event) {
        await updateEvent(event.id, formDataToSend)
      } else {
        await createEvent(formDataToSend)
      }
      onClose()
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors || 'Erreur lors de l\'enregistrement'
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-900">
            {event ? 'Modifier l\'événement' : 'Nouvel événement'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre et Description */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: Salon International du Tourisme"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Décrivez l'événement en détail..."
                />
              </div>
            </div>

            {/* Catégorie et Statut */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Event['category'] }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Conférence">Conférence</option>
                  <option value="Salon">Salon</option>
                  <option value="Formation">Formation</option>
                  <option value="Networking">Networking</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Event['status'] }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>
            </div>

            {/* Date et Heures */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date de l'événement *</label>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) => setFormData(prev => ({ ...prev, event_date: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Heure de début</label>
                <input
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Heure de fin</label>
                <input
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Lieu et Participants */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lieu *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: Palais des Congrès, Casablanca"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de participants</label>
                <input
                  type="number"
                  value={formData.participants}
                  onChange={(e) => setFormData(prev => ({ ...prev, participants: parseInt(e.target.value) || 0 }))}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Featured */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm font-semibold text-gray-700">Mettre en avant (À la une)</span>
              </label>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image de l'événement</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {imagePreview && (
                <div className="mt-4 relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-medium">Erreur</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium shadow-md"
                style={{ backgroundColor: '#CC0000' }}
              >
                {loading ? 'Enregistrement...' : event ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
