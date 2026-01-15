'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Eye, CheckCircle2, XCircle, UserPlus, UserX, Mail, Phone, MapPin, Globe, Building2, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { TourismActor, User } from '@/types'
import api, { PaginatedResponse } from '@/lib/api'
import AssociationFormModal from '@/components/admin/AssociationFormModal'
import AdminHeader from '@/components/admin/AdminHeader'
import { useTranslation } from '@/lib/i18n'

interface PaginationInfo {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

type SortField = 'id' | 'name' | 'city' | 'status' | 'created_at'
type SortDirection = 'asc' | 'desc'

interface AssociationWithUser extends TourismActor {
  user?: User
}

export default function AssociationsPage() {
  const { t } = useTranslation()
  const [associations, setAssociations] = useState<AssociationWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingAssociation, setEditingAssociation] = useState<TourismActor | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>({
    current_page: 1,
    last_page: 1,
    per_page: 25,
    total: 0,
  })
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    withAccount: 0,
  })

  useEffect(() => {
    loadAssociations()
  }, [searchTerm, selectedStatus, pagination.current_page, pagination.per_page, sortField, sortDirection])

  const loadAssociations = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('type', 'association')
      if (searchTerm) params.append('search', searchTerm)
      if (selectedStatus) {
        params.append('status', selectedStatus)
      } else {
        params.append('all_status', 'true')
      }
      params.append('per_page', pagination.per_page.toString())
      params.append('page', pagination.current_page.toString())
      params.append('sort_by', sortField)
      params.append('sort_direction', sortDirection)

      const response = await api.get<PaginatedResponse<TourismActor>>(`/tourism-actors?${params.toString()}`)
      
      if (response.data.success) {
        const associationsData = response.data.data
        
        // Charger les comptes utilisateurs pour chaque association
        const associationsWithUsers = await Promise.all(
          associationsData.map(async (association) => {
            if (association.user_id) {
              try {
                // Essayer de récupérer l'utilisateur via l'API
                // Si l'endpoint n'existe pas, on peut aussi utiliser /admin/users
                const userResponse = await api.get<{ data: User }>(`/users/${association.user_id}`)
                return { ...association, user: userResponse.data.data || userResponse.data }
              } catch {
                // Si l'endpoint n'existe pas, on retourne juste l'association avec user_id
                return association
              }
            }
            return association
          })
        )
        
        setAssociations(associationsWithUsers)
        
        if (response.data.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.data.pagination,
            per_page: pagination.per_page,
          }))
          setStats({
            total: response.data.pagination.total,
            active: associationsData.filter(a => a.status === 'active').length,
            pending: associationsData.filter(a => a.status === 'pending').length,
            withAccount: associationsWithUsers.filter(a => a.user_id).length,
          })
        }
      }
    } catch (error) {
      console.error('Error loading associations:', error)
      setAssociations([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t('admin.associations.confirmDelete'))) return

    try {
      await api.delete(`/tourism-actors/${id}`)
      loadAssociations()
    } catch (error) {
      console.error('Error deleting association:', error)
      alert(t('admin.associations.deleteError'))
    }
  }

  const handleEdit = (association: TourismActor) => {
    setEditingAssociation(association)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingAssociation(null)
    loadAssociations()
  }

  const handleCreateAccount = async (associationId: number) => {
    if (!confirm(t('admin.associations.confirmCreateAccount'))) return

    try {
      // Approuver l'association et créer le compte utilisateur
      await api.post(`/accreditations/${associationId}/approve-without-badge`)
      loadAssociations()
      alert(t('admin.associations.accountCreated'))
    } catch (error: any) {
      console.error('Error creating account:', error)
      alert(error.response?.data?.message || t('admin.associations.accountError'))
    }
  }

  const handleDeleteAccount = async (userId: number, associationId: number) => {
    if (!confirm(t('admin.associations.confirmDeleteAccount'))) return

    try {
      await api.delete(`/users/${userId}`)
      // Mettre à jour l'association pour retirer le user_id
      await api.put(`/tourism-actors/${associationId}`, { user_id: null })
      loadAssociations()
      alert(t('admin.associations.accountDeleted'))
    } catch (error) {
      console.error('Error deleting account:', error)
      alert(t('admin.associations.deleteAccountError'))
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    setPagination(prev => ({ ...prev, current_page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, current_page: page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePerPageChange = (perPage: number) => {
    setPagination(prev => ({ ...prev, per_page: perPage, current_page: 1 }))
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4" style={{ color: '#CC0000' }} />
    ) : (
      <ArrowDown className="w-4 h-4" style={{ color: '#CC0000' }} />
    )
  }

  const statusLabels: Record<string, string> = {
    active: t('admin.associations.status.active'),
    inactive: t('admin.associations.status.inactive'),
    pending: t('admin.associations.status.pending'),
    suspended: t('admin.associations.status.suspended'),
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.inactive}`}>
        {statusLabels[status] || status}
      </span>
    )
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const totalPages = pagination.last_page
    const currentPage = pagination.current_page

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title={t('admin.associations.title')}
        subtitle={t('admin.associations.subtitle')}
      />

      <div className="p-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('admin.associations.stats.total')}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: '#CC0000' }}>{stats.total}</p>
              </div>
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('admin.associations.stats.active')}</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.active}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('admin.associations.stats.pending')}</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.pending}</p>
              </div>
              <XCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('admin.associations.stats.withAccount')}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: '#CC0000' }}>{stats.withAccount}</p>
              </div>
              <UserPlus className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-lg shadow mb-6 p-4 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('admin.associations.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
            >
              <option value="">{t('admin.associations.allStatus')}</option>
              <option value="active">{t('admin.associations.status.active')}</option>
              <option value="pending">{t('admin.associations.status.pending')}</option>
              <option value="inactive">{t('admin.associations.status.inactive')}</option>
              <option value="suspended">{t('admin.associations.status.suspended')}</option>
            </select>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              style={{ backgroundColor: '#CC0000' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B30000'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
            >
              <Plus className="w-5 h-5" />
              {t('admin.associations.add')}
            </button>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-transparent" style={{ borderColor: '#CC0000' }}></div>
              <p className="mt-4 text-gray-600">{t('admin.associations.loading')}</p>
            </div>
          ) : associations.length === 0 ? (
            <div className="p-12 text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">{t('admin.associations.noAssociations')}</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('id')}>
                        <div className="flex items-center gap-2">
                          ID
                          <SortIcon field="id" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                        <div className="flex items-center gap-2">
                          {t('admin.associations.name')}
                          <SortIcon field="name" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.associations.contact')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('city')}>
                        <div className="flex items-center gap-2">
                          {t('admin.associations.location')}
                          <SortIcon field="city" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                        <div className="flex items-center gap-2">
                          {t('admin.associations.status.label')}
                          <SortIcon field="status" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.associations.account')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('created_at')}>
                        <div className="flex items-center gap-2">
                          {t('admin.associations.createdAt')}
                          <SortIcon field="created_at" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.associations.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {associations.map((association) => (
                      <tr key={association.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {association.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{association.name}</div>
                          {association.description && (
                            <div className="text-sm text-gray-500 mt-1 line-clamp-1">{association.description}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm space-y-1">
                            {association.email && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span className="truncate max-w-xs">{association.email}</span>
                              </div>
                            )}
                            {association.phone && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>{association.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm space-y-1">
                            <div className="flex items-center gap-1 text-gray-900">
                              <MapPin className="w-4 h-4" />
                              <span>{association.city}</span>
                            </div>
                            <div className="text-gray-500 text-xs">{association.region}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(association.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {association.user_id ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <span className="text-sm text-gray-600">{association.user?.email || t('admin.associations.accountExists')}</span>
                              <button
                                onClick={() => handleDeleteAccount(association.user_id!, association.id)}
                                className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title={t('admin.associations.deleteAccount')}
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleCreateAccount(association.id)}
                              className="flex items-center gap-2 px-3 py-1 text-sm text-white rounded-lg transition-colors"
                              style={{ backgroundColor: '#CC0000' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B30000'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
                            >
                              <UserPlus className="w-4 h-4" />
                              {t('admin.associations.createAccount')}
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(association.created_at).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(association)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title={t('admin.associations.edit')}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(association.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title={t('admin.associations.delete')}
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
              {pagination.last_page > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">{t('admin.associations.perPage')}</span>
                    <select
                      value={pagination.per_page}
                      onChange={(e) => handlePerPageChange(Number(e.target.value))}
                      className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:border-red-600"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.current_page - 1)}
                      disabled={pagination.current_page === 1}
                      className="p-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={typeof page !== 'number'}
                        className={`px-3 py-1 border rounded text-sm ${
                          page === pagination.current_page
                            ? 'text-white border-red-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        style={page === pagination.current_page ? { backgroundColor: '#CC0000' } : {}}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      disabled={pagination.current_page === pagination.last_page}
                      className="p-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-700">
                    {t('admin.associations.showing')} {(pagination.current_page - 1) * pagination.per_page + 1} - {Math.min(pagination.current_page * pagination.per_page, pagination.total)} {t('admin.associations.of')} {pagination.total}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showModal && (
        <AssociationFormModal
          association={editingAssociation}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}
