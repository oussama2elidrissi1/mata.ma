'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Eye, Key, ChevronLeft, ChevronRight, UserCog, Shield, User } from 'lucide-react'
import { User as UserType } from '@/types'
import api, { PaginatedResponse } from '@/lib/api'
import AdminHeader from '@/components/admin/AdminHeader'

interface PaginationInfo {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [editingUser, setEditingUser] = useState<UserType | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>({
    current_page: 1,
    last_page: 1,
    per_page: 25,
    total: 0,
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'actor' as 'admin' | 'actor',
  })
  const [passwordData, setPasswordData] = useState({
    password: '',
    generatedPassword: '',
  })
  const [showGeneratedPassword, setShowGeneratedPassword] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [searchTerm, selectedRole, pagination.current_page, pagination.per_page])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedRole) params.append('role', selectedRole)
      params.append('per_page', pagination.per_page.toString())
      params.append('page', pagination.current_page.toString())

      const response = await api.get<PaginatedResponse<UserType>>(`/users?${params.toString()}`)
      
      if (response.data.success) {
        setUsers(response.data.data)
        if (response.data.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.data.pagination,
            per_page: pagination.per_page,
          }))
        }
      }
    } catch (error) {
      console.error('Error loading users:', error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return

    try {
      await api.delete(`/users/${id}`)
      loadUsers()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de la suppression')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, formData)
      } else {
        const response = await api.post('/users', formData)
        if (response.data.generated_password) {
          setPasswordData({ password: '', generatedPassword: response.data.generated_password })
          setShowGeneratedPassword(true)
        }
      }
      setShowModal(false)
      setFormData({ name: '', email: '', password: '', role: 'actor' })
      setEditingUser(null)
      loadUsers()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de l\'enregistrement')
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    try {
      const response = await api.post(`/users/${editingUser.id}/reset-password`, {
        password: passwordData.password || undefined,
      })
      if (response.data.generated_password) {
        setPasswordData(prev => ({ ...prev, generatedPassword: response.data.generated_password }))
        setShowGeneratedPassword(true)
      } else {
        setShowPasswordModal(false)
        setPasswordData({ password: '', generatedPassword: '' })
        setEditingUser(null)
        alert('Mot de passe réinitialisé avec succès')
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de la réinitialisation')
    }
  }

  const openEditModal = (user: UserType) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    })
    setShowModal(true)
  }

  const openPasswordModal = (user: UserType) => {
    setEditingUser(user)
    setPasswordData({ password: '', generatedPassword: '' })
    setShowGeneratedPassword(false)
    setShowPasswordModal(true)
  }

  const getPageNumbers = () => {
    const { current_page, last_page } = pagination
    const pages = []
    if (last_page <= 5) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (current_page > 3) pages.push('...')
      if (current_page > 2) pages.push(current_page - 1)
      if (current_page !== 1 && current_page !== last_page) pages.push(current_page)
      if (current_page < last_page - 1) pages.push(current_page + 1)
      if (current_page < last_page - 2) pages.push('...')
      pages.push(last_page)
    }
    return Array.from(new Set(pages))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
          title="Gestion des Utilisateurs"
          subtitle="Gérer les comptes utilisateurs et leurs mots de passe"
          actions={
            <button
              onClick={() => {
                setEditingUser(null)
                setFormData({ name: '', email: '', password: '', role: 'actor' })
                setShowModal(true)
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Nouvel Utilisateur
            </button>
          }
        />

        <div className="p-6">
          {/* Stats Cards - Design amélioré */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-600 rounded-lg shadow-md p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Total Utilisateurs</p>
                  <p className="text-3xl font-bold">{pagination.total}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <UserCog className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="bg-red-600 rounded-lg shadow-md p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium mb-1">Administrateurs</p>
                  <p className="text-3xl font-bold">
                    {users.filter(u => u.role === 'admin').length}
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="bg-emerald-600 rounded-lg shadow-md p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Acteurs</p>
                  <p className="text-3xl font-bold">
                    {users.filter(u => u.role === 'actor').length}
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <User className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters - Design amélioré */}
          <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Filtres de recherche</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setPagination(prev => ({ ...prev, current_page: 1 }))
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-900 bg-white"
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value)
                  setPagination(prev => ({ ...prev, current_page: 1 }))
                }}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 bg-white"
              >
                <option value="">Tous les rôles</option>
                <option value="admin">Administrateurs</option>
                <option value="actor">Acteurs</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-20">
                <UserCog className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">Aucun utilisateur trouvé</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b-2 border-gray-300">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Rôle
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Acteur lié
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Date de création
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            #{user.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                              user.role === 'admin'
                                ? 'bg-red-100 text-red-800 border border-red-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}>
                              {user.role === 'admin' ? 'Administrateur' : 'Acteur'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.tourism_actor ? (
                              <span className="text-sm text-gray-600">{user.tourism_actor.name}</span>
                            ) : (
                              <span className="text-sm text-gray-400">Aucun</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(user.created_at).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openPasswordModal(user)}
                                className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                                title="Réinitialiser le mot de passe"
                              >
                                <Key className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openEditModal(user)}
                                className="text-emerald-600 hover:text-emerald-800 p-2 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-200"
                                title="Modifier"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.total > 0 && (
                  <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-700">
                      Affichage de <span className="font-medium">{(pagination.current_page - 1) * pagination.per_page + 1}</span> à{' '}
                      <span className="font-medium">
                        {Math.min(pagination.current_page * pagination.per_page, pagination.total)}
                      </span>{' '}
                      sur <span className="font-medium">{pagination.total}</span> résultats
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPagination(prev => ({ ...prev, current_page: prev.current_page - 1 }))}
                        disabled={pagination.current_page === 1}
                        className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, index) => (
                          <button
                            key={index}
                            onClick={() => typeof page === 'number' && setPagination(prev => ({ ...prev, current_page: page }))}
                            disabled={page === '...'}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                              page === pagination.current_page
                                ? 'bg-blue-900 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            } disabled:opacity-50`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setPagination(prev => ({ ...prev, current_page: prev.current_page + 1 }))}
                        disabled={pagination.current_page === pagination.last_page}
                        className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <select
                        value={pagination.per_page}
                        onChange={(e) => setPagination(prev => ({ ...prev, per_page: Number(e.target.value), current_page: 1 }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                      >
                        <option value={25}>25 par page</option>
                        <option value={50}>50 par page</option>
                        <option value={100}>100 par page</option>
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <h2 className="text-xl font-bold text-gray-900">
                {editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe {editingUser && <span className="text-gray-500 font-normal">(laisser vide pour ne pas changer)</span>}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required={!editingUser}
                  minLength={8}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rôle</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'actor' }))}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 bg-white transition-colors"
                >
                  <option value="actor">Acteur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingUser(null)
                    setFormData({ name: '', email: '', password: '', role: 'actor' })
                  }}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold"
                >
                  {editingUser ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {showPasswordModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <h2 className="text-xl font-bold text-gray-900">Réinitialiser le mot de passe</h2>
              <p className="text-sm text-gray-600 mt-1">Utilisateur: <span className="font-semibold">{editingUser.name}</span></p>
            </div>
            <form onSubmit={handleResetPassword} className="p-6 space-y-5">
              {showGeneratedPassword && passwordData.generatedPassword ? (
                <div className="p-5 bg-emerald-50 border-2 border-emerald-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Key className="w-5 h-5 text-emerald-600" />
                    <p className="text-sm font-semibold text-emerald-800">Nouveau mot de passe généré:</p>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="flex-1 px-4 py-3 bg-white border-2 border-emerald-300 rounded-lg text-sm font-mono text-gray-900 break-all">
                      {passwordData.generatedPassword}
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(passwordData.generatedPassword)
                        alert('Mot de passe copié !')
                      }}
                      className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-semibold transition-colors whitespace-nowrap"
                    >
                      Copier
                    </button>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="text-amber-600 text-lg">⚠️</span>
                    <p className="text-xs text-amber-800 font-medium">Notez ce mot de passe, il ne sera plus affiché !</p>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-emerald-200 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordModal(false)
                        setEditingUser(null)
                        setPasswordData({ password: '', generatedPassword: '' })
                        setShowGeneratedPassword(false)
                        loadUsers()
                      }}
                      className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold transition-colors"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      value={passwordData.password}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))}
                      minLength={8}
                      placeholder="Laisser vide pour générer automatiquement"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-gray-900 bg-white"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Si vide, un mot de passe aléatoire sécurisé sera généré automatiquement
                    </p>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordModal(false)
                        setEditingUser(null)
                        setPasswordData({ password: '', generatedPassword: '' })
                        setShowGeneratedPassword(false)
                      }}
                      className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                    >
                      Réinitialiser
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
