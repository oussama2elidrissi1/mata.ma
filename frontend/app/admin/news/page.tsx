'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Calendar, User, Star, Eye, X, FileText } from 'lucide-react'
import { News } from '@/types'
import { fetchNews, createNews, updateNews, deleteNews, PaginatedResponse } from '@/lib/api'
import api from '@/lib/api'
import AdminHeader from '@/components/admin/AdminHeader'
import Image from 'next/image'

interface PaginationInfo {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
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
    archived: 0,
    featured: 0,
  })

  useEffect(() => {
    loadNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedStatus, pagination.current_page])

  const loadNews = async () => {
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

      const response = await api.get<PaginatedResponse<News>>(`/news?${params.toString()}`)
      
      if (response.data.success) {
        const newsData = response.data.data
        setNews(newsData)
        
        // Calculer les statistiques
        setStats({
          total: response.data.pagination?.total || newsData.length,
          published: newsData.filter(n => n.status === 'published').length,
          draft: newsData.filter(n => n.status === 'draft').length,
          archived: newsData.filter(n => n.status === 'archived').length,
          featured: newsData.filter(n => n.featured).length,
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
      console.error('Error loading news:', error)
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      await deleteNews(id)
      loadNews()
    } catch (error) {
      console.error('Error deleting news:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleEdit = (article: News) => {
    setEditingNews(article)
    setShowModal(true)
  }

  const handleNew = () => {
    setEditingNews(null)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingNews(null)
    loadNews()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const filteredNews = news.filter(article => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower)
      )
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Actualités"
        subtitle="Gestion des actualités"
      />
      <div className="p-6">
        {/* Header avec bouton */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900">Gestion des Actualités</h1>
            <p className="text-gray-600 mt-1">Gérez tous les articles d'actualités</p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg font-medium"
            style={{ backgroundColor: '#CC0000' }}
          >
            <Plus className="w-5 h-5" />
            Nouvel article
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-600 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <FileText className="w-6 h-6" />
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
                <Edit className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-red-600 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Archivés</p>
                <p className="text-3xl font-bold">{stats.archived}</p>
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

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filtres et Recherche</h2>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('')
                setSelectedStatus('all')
                loadNews()
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
                  placeholder="Rechercher un article..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <input
                type="text"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                placeholder="Toutes les catégories"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              />
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
                <option value="archived">Archivé</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={loadNews}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Liste des Articles</h2>
            <p className="text-sm text-gray-600 mt-1">{filteredNews.length} article(s) trouvé(s)</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Chargement des articles...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Catégorie</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Auteur</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredNews.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Aucun article trouvé</p>
                        <p className="text-gray-500 text-sm mt-1">Créez votre premier article en cliquant sur "Nouvel article"</p>
                      </td>
                    </tr>
                  ) : (
                    filteredNews.map((article) => 
                      <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={article.image || 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'}
                              alt={article.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{article.title}</div>
                            {article.featured && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs text-yellow-600 font-medium">À la une</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary bg-opacity-10 text-primary">
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <User className="w-4 h-4 text-gray-400" />
                            {article.author}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {formatDate(article.published_at || article.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            article.status === 'published' ? 'bg-green-100 text-green-800' :
                            article.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {article.status === 'published' ? 'Publié' :
                             article.status === 'draft' ? 'Brouillon' :
                             'Archivé'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEdit(article)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="Modifier"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
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

        {/* Pagination */}
        {pagination.last_page > 1 && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Page {pagination.current_page}</span> sur {pagination.last_page} 
                <span className="text-gray-500 ml-2">({pagination.total} article{pagination.total > 1 ? 's' : ''})</span>
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

      {/* Modal pour créer/modifier un article */}
      {showModal && (
        <NewsFormModal
          news={editingNews}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}

// Composant Modal pour le formulaire d'article
function NewsFormModal({ news, onClose }: { news: News | null, onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Actualité',
    author: 'MATA',
    featured: false,
    status: 'published',
    published_at: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialiser les données du formulaire quand news change
  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || '',
        excerpt: news.excerpt || '',
        content: news.content || '',
        category: news.category || 'Actualité',
        author: news.author || 'MATA',
        featured: news.featured || false,
        status: news.status || 'published',
        published_at: news.published_at ? new Date(news.published_at).toISOString().split('T')[0] : '',
      })
      setImagePreview(news.image || null)
      setImageFile(null) // Réinitialiser le fichier image
    } else {
      // Réinitialiser pour un nouvel article
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'Actualité',
        author: 'MATA',
        featured: false,
        status: 'published',
        published_at: '',
      })
      setImagePreview(null)
      setImageFile(null)
    }
  }, [news])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formDataToSend = new FormData()
      // Toujours envoyer tous les champs pour la mise à jour
      formDataToSend.append('title', formData.title || '')
      formDataToSend.append('excerpt', formData.excerpt || '')
      formDataToSend.append('content', formData.content || '')
      formDataToSend.append('category', formData.category || 'Actualité')
      formDataToSend.append('author', formData.author || 'MATA')
      formDataToSend.append('featured', formData.featured ? '1' : '0')
      formDataToSend.append('status', formData.status || 'published')
      if (formData.published_at) {
        formDataToSend.append('published_at', formData.published_at)
      }
      // Ajouter l'image seulement si un nouveau fichier est sélectionné
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }
      
      // Log pour débogage
      console.log('FormData entries:')
      formDataToSend.forEach((value, key) => {
        if (value instanceof File) {
          console.log(`${key}: [File] ${value.name}`)
        } else {
          console.log(`${key}: ${value}`)
        }
      })

      if (news) {
        console.log('Updating news:', news.id)
        const updatedNews = await updateNews(news.id, formDataToSend)
        console.log('News updated successfully:', updatedNews)
        // Fermer le modal immédiatement après succès
        onClose()
      } else {
        console.log('Creating new news:', formData)
        await createNews(formDataToSend)
        // Fermer le modal immédiatement après succès
        onClose()
      }
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
    } else {
      // Si aucun fichier n'est sélectionné, garder l'image existante
      if (news?.image) {
        setImagePreview(news.image)
      }
      setImageFile(null)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-900">
            {news ? 'Modifier l\'article' : 'Nouvel article'}
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
            {/* Titre et Extrait */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: Nouvelle initiative MATA pour le tourisme durable"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Extrait *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  required
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Résumé court de l'article (max 500 caractères)..."
                />
                <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/500</p>
              </div>
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contenu *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                required
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                placeholder="Contenu complet de l'article..."
              />
            </div>

            {/* Catégorie, Auteur, Statut */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Actualité"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Auteur</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="MATA"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
            </div>

            {/* Date de publication et Featured */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date de publication</label>
                <input
                  type="date"
                  value={formData.published_at}
                  onChange={(e) => setFormData(prev => ({ ...prev, published_at: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex items-end">
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
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image de l'article</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {imagePreview && (
                <div className="mt-4 relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'
                    }}
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
                {loading ? 'Enregistrement...' : news ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
