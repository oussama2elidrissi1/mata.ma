'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/lib/i18n'
import api from '@/lib/api'
import { getAuthToken, getCurrentUser } from '@/lib/auth'
import { Mail, Calendar, Newspaper, CheckCircle, Clock, X } from 'lucide-react'

interface InvitationForm {
  actorEmail: string
  actorName: string
  message?: string
}

interface EventForm {
  title: string
  description: string
  date: string
  location: string
  category: string
}

interface NewsForm {
  title: string
  content: string
  category: string
}

export default function AssociationDashboard() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'invitations' | 'events' | 'news'>('invitations')
  const [user, setUser] = useState<any | null>(() => getCurrentUser())
  const [token, setToken] = useState<string | null>(() => getAuthToken())
  const [isAssociation, setIsAssociation] = useState(false)
  const [checking, setChecking] = useState(true)
  const [pendingEvents, setPendingEvents] = useState<any[]>([])
  const [pendingNews, setPendingNews] = useState<any[]>([])

  const getFirstApiErrorMessage = (err: any): string | null => {
    const data = err?.response?.data
    if (!data) return null
    if (typeof data.message === 'string' && data.message.trim()) return data.message
    const errors = data.errors
    if (errors && typeof errors === 'object') {
      const firstKey = Object.keys(errors)[0]
      const val = errors[firstKey]
      if (Array.isArray(val) && typeof val[0] === 'string') return val[0]
      if (typeof val === 'string') return val
    }
    return null
  }

  // Stabilise user/token (évite une boucle de re-render via getCurrentUser() recalculé)
  useEffect(() => {
    const u = getCurrentUser()
    const tkn = getAuthToken()
    setUser(u)
    setToken(tkn)
    if (tkn) {
      api.defaults.headers.common['Authorization'] = `Bearer ${tkn}`
    }
  }, [])

  const loadPendingEvents = async () => {
    try {
      // Charger les événements créés par cette association avec statut draft
      const response = await api.get('/events?status=draft&per_page=1000')
      if (response.data.success && response.data.data) {
        const events = response.data.data
        const mappedEvents = events.map((event: any) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.event_date,
          location: event.location,
          category: event.category,
          status: event.status === 'draft' ? 'pending' : (event.status === 'published' ? 'approved' : 'rejected'),
          submittedAt: event.created_at,
          associationName: 'Association'
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
      // Charger les actualités créées par cette association avec statut draft
      const response = await api.get('/news?status=draft&per_page=1000')
      if (response.data.success && response.data.data) {
        const newsItems = response.data.data
        const mappedNews = newsItems.map((news: any) => ({
          id: news.id,
          title: news.title,
          content: news.content,
          category: news.category,
          status: news.status === 'draft' ? 'pending' : (news.status === 'published' ? 'approved' : 'rejected'),
          submittedAt: news.created_at,
          associationName: news.author || 'Association'
        }))
        setPendingNews(mappedNews)
      }
    } catch (error) {
      console.error('Error loading pending news:', error)
      setPendingNews([])
    }
  }

  useEffect(() => {
    const run = async () => {
      let computedIsAssociation = false
      setChecking(true)
      if (!token || !user) {
        console.log('No token or user')
        setIsAssociation(false)
        setChecking(false)
        return
      }
      
      if (user.role !== 'actor') {
        console.log('User role is not actor:', user.role)
        setIsAssociation(false)
        setChecking(false)
        return
      }
      
      try {
        console.log('🔍 Checking association status for user:', user.email, 'Role:', user.role)
        const res = await api.get('/actor/me')
        console.log('📦 Full API response:', res.data)
        console.log('📦 Response structure:', {
          success: res.data?.success,
          data: res.data?.data,
          message: res.data?.message
        })
        
        // Gérer différentes structures de réponse
        const actor = res.data?.data || res.data
        
        console.log('👤 Actor object:', actor)
        console.log('📋 Actor type:', actor?.type)
        computedIsAssociation = !!actor && actor.type === 'association'
        console.log('✅ Is association?', computedIsAssociation)
        
        if (computedIsAssociation) {
          console.log('✅ User is an association - granting access')
          setIsAssociation(true)
          // Charger les événements et actualités si c'est une association
          await Promise.all([loadPendingEvents(), loadPendingNews()])
        } else {
          console.warn('❌ User is NOT an association')
          console.warn('   - Actor exists?', !!actor)
          console.warn('   - Actor type:', actor?.type)
          console.warn('   - Expected type: "association"')
          setIsAssociation(false)
        }
      } catch (error: any) {
        console.error('❌ Error checking association status:', error)
        console.error('   - Error message:', error.message)
        console.error('   - Error response:', error.response?.data)
        console.error('   - Error status:', error.response?.status)
        setIsAssociation(false)
      } finally {
        setChecking(false)
        console.log('🏁 Checking complete. isAssociation:', computedIsAssociation)
      }
    }
    run()
  }, [token, user?.id, user?.role])

  // Données mock pour invitations (à remplacer par API plus tard)
  const [sentInvitations] = useState([
    { id: 1, actorName: 'Hôtel Le Grand Paris', email: 'contact@legrandparis.fr', status: 'pending', date: '2024-01-15' },
    { id: 2, actorName: 'Restaurant La Belle Époque', email: 'reservation@labelleepoque.fr', status: 'accepted', date: '2024-01-10' },
    { id: 3, actorName: 'Tours & Découvertes', email: 'info@toursdecouvertes.fr', status: 'rejected', date: '2024-01-08' }
  ])

  const { register: registerInvitation, handleSubmit: handleInvitationSubmit, reset: resetInvitation } = useForm<InvitationForm>()
  const { register: registerEvent, handleSubmit: handleEventSubmit, reset: resetEvent } = useForm<EventForm>()
  const { register: registerNews, handleSubmit: handleNewsSubmit, reset: resetNews } = useForm<NewsForm>()

  const handleSendInvitation = (data: InvitationForm) => {
    console.log('Envoi invitation:', data)
    alert(`Invitation envoyée à ${data.actorEmail}`)
    resetInvitation()
  }

  const handleSubmitEvent = async (data: EventForm) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('event_date', data.date)
      formData.append('location', data.location)
      formData.append('category', data.category)
      formData.append('status', 'draft') // Statut draft pour validation admin
      formData.append('participants', '0')
      formData.append('featured', '0')

      await api.post('/events', formData)
      alert('Événement soumis pour validation par l\'administrateur')
      resetEvent()
      // Recharger les événements
      loadPendingEvents()
    } catch (error: any) {
      console.error('Error submitting event:', error)
      alert(getFirstApiErrorMessage(error) || 'Erreur lors de la soumission de l\'événement')
    }
  }

  const handleSubmitNews = async (data: NewsForm) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('excerpt', data.content.substring(0, 200)) // Extraire un extrait
      formData.append('content', data.content)
      formData.append('category', data.category)
      formData.append('author', user?.name || 'Association')
      formData.append('status', 'draft') // Statut draft pour validation admin
      formData.append('featured', '0')

      await api.post('/news', formData)
      alert('Actualité soumise pour validation par l\'administrateur')
      resetNews()
      // Recharger les actualités
      loadPendingNews()
    } catch (error: any) {
      console.error('Error submitting news:', error)
      alert(error.response?.data?.message || 'Erreur lors de la soumission de l\'actualité')
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      rejected: <X className="w-4 h-4" />
    }
    const labels = {
      pending: t('association.pending') || 'En attente',
      approved: t('association.approved') || 'Approuvé',
      rejected: t('association.rejected') || 'Rejeté'
    }

    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        <span>{labels[status as keyof typeof labels]}</span>
      </span>
    )
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-gray-600">Chargement...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!checking && !isAssociation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-2xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#333333' }}>
              {t('association.accessDenied') || 'Accès réservé aux associations'}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('association.accessDeniedDesc') || 'Vous devez être connecté en tant qu\'association approuvée pour accéder à cette page.'}
            </p>
            <div className="flex gap-4 justify-center mb-6">
              <a
                href="/join"
                className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
                style={{ backgroundColor: '#CC0000' }}
              >
                {t('association.becomeAssociation') || 'Devenir une association'}
              </a>
              <a
                href="/actor/login"
                className="px-6 py-3 border-2 rounded-lg font-medium transition-colors"
                style={{ borderColor: '#CC0000', color: '#CC0000' }}
              >
                Se connecter
              </a>
            </div>
            {user && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
                <p className="text-sm text-yellow-800 mb-2">
                  <strong>Informations de débogage:</strong>
                </p>
                <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                  <li>Utilisateur connecté: <strong>{user.name}</strong></li>
                  <li>Email: <strong>{user.email}</strong></li>
                  <li>Rôle: <strong>{user.role}</strong></li>
                  {user.role === 'actor' && (
                    <li className="text-red-600">
                      ⚠️ Votre compte est de type "actor" mais n'est pas reconnu comme "association". 
                      Vérifiez dans la base de données que votre <code>tourism_actor.type = 'association'</code>
                    </li>
                  )}
                </ul>
                <p className="text-xs text-yellow-700 mt-3">
                  Ouvrez la console du navigateur (F12) pour voir les détails de la vérification.
                </p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const tabs = [
    { id: 'invitations', label: t('association.invitations') || 'Invitations', icon: <Mail /> },
    { id: 'events', label: t('association.events') || 'Événements', icon: <Calendar /> },
    { id: 'news', label: t('association.news') || 'Actualités', icon: <Newspaper /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#333333' }}>
            {t('association.dashboard') || 'Tableau de bord'} - {user?.name || 'Association'}
          </h1>
          <p className="text-gray-600">
            {t('association.dashboardDesc') || 'Gérez vos invitations, événements et actualités'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-600 hover:text-red-600'
                }`}
                style={activeTab === tab.id ? { backgroundColor: '#CC0000' } : {}}
              >
                <div className="flex items-center justify-center space-x-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'invitations' && (
            <div className="space-y-6">
              {/* Formulaire d'invitation */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#333333' }}>
                  {t('association.sendInvitation') || 'Envoyer une invitation'}
                </h2>
                <form onSubmit={handleInvitationSubmit(handleSendInvitation)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('association.actorName') || 'Nom de l\'acteur'} *
                      </label>
                      <input
                        type="text"
                        {...registerInvitation('actorName', { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder={t('association.actorNamePlaceholder') || 'Nom de l\'établissement'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('association.actorEmail') || 'Email de l\'acteur'} *
                      </label>
                      <input
                        type="email"
                        {...registerInvitation('actorEmail', { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('association.message') || 'Message (optionnel)'}
                    </label>
                    <textarea
                      {...registerInvitation('message')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder={t('association.messagePlaceholder') || 'Message personnalisé pour l\'invitation'}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
                    style={{ backgroundColor: '#CC0000' }}
                  >
                    {t('association.send') || 'Envoyer l\'invitation'}
                  </button>
                </form>
              </div>

              {/* Liste des invitations */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#333333' }}>
                  {t('association.sentInvitations') || 'Invitations envoyées'}
                </h2>
                <div className="space-y-4">
                  {sentInvitations.map((invitation) => (
                    <div key={invitation.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold" style={{ color: '#333333' }}>{invitation.actorName}</h3>
                          <p className="text-sm text-gray-600">{invitation.email}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {t('association.sentOn') || 'Envoyé le'} {invitation.date}
                          </p>
                        </div>
                        {getStatusBadge(invitation.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              {/* Formulaire d'événement */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#333333' }}>
                  {t('association.publishEvent') || 'Publier un événement'}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {t('association.eventValidation') || 'Les événements doivent être validés par un administrateur avant publication.'}
                </p>
                <form onSubmit={handleEventSubmit(handleSubmitEvent)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('association.eventTitle') || 'Titre de l\'événement'} *
                    </label>
                    <input
                      type="text"
                      {...registerEvent('title', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder={t('association.eventTitlePlaceholder') || 'Titre de l\'événement'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('association.description') || 'Description'} *
                    </label>
                    <textarea
                      {...registerEvent('description', { required: true })}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder={t('association.descriptionPlaceholder') || 'Description détaillée de l\'événement'}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('association.date') || 'Date'} *
                      </label>
                      <input
                        type="date"
                        {...registerEvent('date', { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('association.location') || 'Lieu'} *
                      </label>
                      <input
                        type="text"
                        {...registerEvent('location', { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder={t('association.locationPlaceholder') || 'Lieu de l\'événement'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('association.category') || 'Catégorie'} *
                      </label>
                      <select
                        {...registerEvent('category', { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="">{t('association.selectCategory') || 'Sélectionnez'}</option>
                      {/* IMPORTANT: valeurs attendues par le backend (EventController validation) */}
                      <option value="Conférence">{t('association.conference') || 'Conférence'}</option>
                      <option value="Salon">{t('association.salon') || 'Salon'}</option>
                      <option value="Formation">{t('association.training') || 'Formation'}</option>
                      <option value="Networking">{t('association.networking') || 'Networking'}</option>
                      <option value="Autre">{t('association.other') || 'Autre'}</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
                    style={{ backgroundColor: '#CC0000' }}
                  >
                    {t('association.submitForValidation') || 'Soumettre pour validation'}
                  </button>
                </form>
              </div>

              {/* Liste des événements */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#333333' }}>
                  {t('association.myEvents') || 'Mes événements'}
                </h2>
                <div className="space-y-4">
                  {pendingEvents.map((event) => (
                    <div key={event.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold" style={{ color: '#333333' }}>{event.title}</h3>
                          <p className="text-sm text-gray-600">
                            {t('association.date') || 'Date'}: {event.date}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {t('association.submittedOn') || 'Soumis le'} {event.submittedAt}
                          </p>
                        </div>
                        {getStatusBadge(event.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-6">
              {/* Formulaire de news */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#333333' }}>
                  {t('association.publishNews') || 'Publier une actualité'}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {t('association.newsValidation') || 'Les actualités doivent être validées par un administrateur avant publication.'}
                </p>
                <form onSubmit={handleNewsSubmit(handleSubmitNews)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('association.title') || 'Titre'} *
                    </label>
                    <input
                      type="text"
                      {...registerNews('title', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder={t('association.titlePlaceholder') || 'Titre de l\'actualité'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('association.category') || 'Catégorie'} *
                    </label>
                    <select
                      {...registerNews('category', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">{t('association.selectCategory') || 'Sélectionnez'}</option>
                      <option value="certification">{t('association.certification') || 'Certification'}</option>
                      <option value="partenariat">{t('association.partnership') || 'Partenariat'}</option>
                      <option value="formation">{t('association.training') || 'Formation'}</option>
                      <option value="evenement">{t('association.event') || 'Événement'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('association.content') || 'Contenu'} *
                    </label>
                    <textarea
                      {...registerNews('content', { required: true })}
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder={t('association.contentPlaceholder') || 'Contenu de l\'actualité'}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
                    style={{ backgroundColor: '#CC0000' }}
                  >
                    {t('association.submitForValidation') || 'Soumettre pour validation'}
                  </button>
                </form>
              </div>

              {/* Liste des news */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#333333' }}>
                  {t('association.myNews') || 'Mes actualités'}
                </h2>
                <div className="space-y-4">
                  {pendingNews.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold" style={{ color: '#333333' }}>{item.title}</h3>
                          <p className="text-sm text-gray-600">
                            {t('association.date') || 'Date'}: {item.date}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {t('association.submittedOn') || 'Soumis le'} {item.submittedAt}
                          </p>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
