'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Eye, CheckCircle2, XCircle, FileSpreadsheet, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Clock, Award } from 'lucide-react'
import Link from 'next/link'
import { TourismActor } from '@/types'
import api, { PaginatedResponse } from '@/lib/api'
import ActorFormModal from '@/components/admin/ActorFormModal'
import ExcelImportModal from '@/components/admin/ExcelImportModal'
import AdminHeader from '@/components/admin/AdminHeader'

interface PaginationInfo {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

type SortField = 'id' | 'name' | 'type' | 'city' | 'status' | 'accreditation_number'
type SortDirection = 'asc' | 'desc'

export default function ActorsPage() {
  const [actors, setActors] = useState<TourismActor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [editingActor, setEditingActor] = useState<TourismActor | null>(null)
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
    accredited: 0,
  })

  useEffect(() => {
    loadActors()
  }, [searchTerm, selectedType, selectedStatus, pagination.current_page, pagination.per_page, sortField, sortDirection])

  const loadActors = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedType) params.append('type', selectedType)
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
        setActors(response.data.data)
        if (response.data.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.data.pagination,
            per_page: pagination.per_page, // Garder le per_page choisi
          }))
          setStats({
            total: response.data.pagination.total,
            active: actors.filter(a => a.status === 'active').length,
            pending: actors.filter(a => a.status === 'pending').length,
            accredited: actors.filter(a => a.accreditation_number).length,
          })
        }
      }
    } catch (error) {
      console.error('Error loading actors:', error)
      setActors([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet acteur ?')) return

    try {
      await api.delete(`/tourism-actors/${id}`)
      loadActors()
    } catch (error) {
      console.error('Error deleting actor:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleEdit = (actor: TourismActor) => {
    setEditingActor(actor)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingActor(null)
    loadActors()
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
      <ArrowUp className="w-4 h-4 text-blue-900" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-900" />
    )
  }

  const typeLabels: Record<string, string> = {
    hotel: 'Hôtel',
    restaurant: 'Restaurant',
    travel_agency: 'Agence de Voyage',
    tour_guide: 'Guide Touristique',
    transport: 'Transport',
    attraction: 'Attraction',
    other: 'Autre',
  }

  const statusLabels: Record<string, string> = {
    active: 'Actif',
    inactive: 'Inactif',
    pending: 'En attente',
    suspended: 'Suspendu',
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
        title="Gestion des Acteurs"
        subtitle="Gérez tous les acteurs du tourisme accrédités"
        actions={
          <>
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Importer Excel
            </button>
            <button
              onClick={() => {
                setEditingActor(null)
                setShowModal(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter un acteur
            </button>
          </>
        }
      />

      <div className="p-6">
        {/* Stats Cards - Design simplifié */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-600 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Acteurs</p>
                <p className="text-3xl font-bold">{pagination.total}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-emerald-600 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Actifs</p>
                <p className="text-3xl font-bold">
                  {actors.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-amber-500 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium mb-1">En Attente</p>
                <p className="text-3xl font-bold">
                  {actors.filter(a => a.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-amber-600 rounded-lg shadow-md p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium mb-1">Accrédités</p>
                <p className="text-3xl font-bold">
                  {actors.filter(a => a.accreditation_number).length}
                </p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters - Design simplifié */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Filtres de recherche</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, ville..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPagination(prev => ({ ...prev, current_page: 1 }))
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-900 bg-white"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value)
                setPagination(prev => ({ ...prev, current_page: 1 }))
              }}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
            >
              <option value="">Tous les types</option>
              <option value="hotel">Hôtel</option>
              <option value="restaurant">Restaurant</option>
              <option value="travel_agency">Agence de Voyage</option>
              <option value="tour_guide">Guide Touristique</option>
              <option value="transport">Transport</option>
              <option value="attraction">Attraction</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value)
                setPagination(prev => ({ ...prev, current_page: 1 }))
              }}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="pending">En attente</option>
              <option value="suspended">Suspendu</option>
            </select>
          </div>
        </div>

        {/* Table - Design simplifié */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Chargement des données...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('id')}
                      >
                        <div className="flex items-center gap-2">
                          ID
                          <SortIcon field="id" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          NOM
                          <SortIcon field="name" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('type')}
                      >
                        <div className="flex items-center gap-2">
                          TYPE
                          <SortIcon field="type" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('city')}
                      >
                        <div className="flex items-center gap-2">
                          VILLE
                          <SortIcon field="city" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center gap-2">
                          STATUT
                          <SortIcon field="status" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('accreditation_number')}
                      >
                        <div className="flex items-center gap-2">
                          ACCRÉDITÉ
                          <SortIcon field="accreditation_number" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {actors.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                          Aucun acteur trouvé
                        </td>
                      </tr>
                    ) : (
                      actors.map((actor) => (
                        <tr key={actor.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            #{actor.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{actor.name}</div>
                            {actor.email && (
                              <div className="text-sm text-gray-500">{actor.email}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {typeLabels[actor.type] || actor.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {actor.city}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              actor.status === 'active' ? 'bg-green-100 text-green-800' :
                              actor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              actor.status === 'suspended' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {statusLabels[actor.status] || actor.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {actor.accreditation_number ? (
                              <div className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-amber-500" />
                                <span className="text-sm text-amber-600 font-medium">{actor.accreditation_number}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">Simple</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/actors/${actor.id}`}
                                className="text-blue-600 hover:text-blue-900"
                                title="Voir"
                              >
                                <Eye className="w-5 h-5" />
                              </Link>
                              <button
                                onClick={() => handleEdit(actor)}
                                className="text-yellow-600 hover:text-yellow-900"
                                title="Modifier"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(actor.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Supprimer"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination - Design simplifié */}
              {pagination.total > 0 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-700">
                        Affichage de <span className="font-medium">{(pagination.current_page - 1) * pagination.per_page + 1}</span> à{' '}
                        <span className="font-medium">
                          {Math.min(pagination.current_page * pagination.per_page, pagination.total)}
                        </span>{' '}
                        sur <span className="font-medium">{pagination.total}</span> résultats
                      </span>
                      <select
                        value={pagination.per_page}
                        onChange={(e) => handlePerPageChange(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                      >
                        <option value={10}>10 par page</option>
                        <option value={25}>25 par page</option>
                        <option value={50}>50 par page</option>
                        <option value={100}>100 par page</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.current_page - 1)}
                        disabled={pagination.current_page === 1 || loading}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Page précédente"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, index) => (
                          page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page as number)}
                              disabled={loading}
                              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                pagination.current_page === page
                                  ? 'bg-blue-900 text-white'
                                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                              } disabled:opacity-50`}
                            >
                              {page}
                            </button>
                          )
                        ))}
                      </div>

                      <button
                        onClick={() => handlePageChange(pagination.current_page + 1)}
                        disabled={pagination.current_page === pagination.last_page || loading}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Page suivante"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <ActorFormModal
          actor={editingActor}
          onClose={handleModalClose}
        />
      )}
      {showImportModal && (
        <ExcelImportModal
          onClose={() => setShowImportModal(false)}
          onSuccess={() => {
            setShowImportModal(false)
            loadActors()
          }}
        />
      )}
    </div>
  )
}
