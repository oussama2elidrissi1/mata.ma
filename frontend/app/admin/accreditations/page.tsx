'use client'

import { useState, useEffect } from 'react'
import { Award, Eye, Edit, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { TourismActor } from '@/types'
import api, { PaginatedResponse } from '@/lib/api'
import Link from 'next/link'
import AdminHeader from '@/components/admin/AdminHeader'

interface PaginationInfo {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export default function AccreditationsPage() {
  const [actors, setActors] = useState<TourismActor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [pagination, setPagination] = useState<PaginationInfo>({
    current_page: 1,
    last_page: 1,
    per_page: 25,
    total: 0,
  })

  useEffect(() => {
    loadAccreditedActors()
  }, [searchTerm, pagination.current_page, pagination.per_page])

  const loadAccreditedActors = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('all_status', 'true')
      params.append('accredited', 'true') // Filtrer uniquement les accrédités côté backend
      if (searchTerm) params.append('search', searchTerm)
      params.append('per_page', pagination.per_page.toString())
      params.append('page', pagination.current_page.toString())

      const response = await api.get<PaginatedResponse<TourismActor>>(`/tourism-actors?${params.toString()}`)
      
      if (response.data.success) {
        setActors(response.data.data)
        if (response.data.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.data.pagination,
            per_page: pagination.per_page,
          }))
        }
      }
    } catch (error) {
      console.error('Error loading accredited actors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, current_page: page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePerPageChange = (perPage: number) => {
    setPagination(prev => ({ ...prev, per_page: perPage, current_page: 1 }))
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
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }

    return pages
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

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Acteurs Accrédités"
        subtitle="Liste des acteurs avec accréditation MATA"
      />

      <div className="p-6">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
          <div className="relative">
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
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
          ) : actors.length === 0 ? (
            <div className="text-center py-20">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">Aucun acteur accrédité trouvé</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ville / Région
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Numéro d'accréditation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {actors.map((actor) => (
                      <tr key={actor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{actor.name}</div>
                              {actor.email && (
                                <div className="text-sm text-gray-500">{actor.email}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {typeLabels[actor.type] || actor.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {actor.city}, {actor.region}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" />
                            <span className="text-sm font-medium text-amber-600">
                              {actor.accreditation_number}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/actors/${actor.id}`}
                              className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              Voir
                            </Link>
                            <Link
                              href={`/admin/actors?edit=${actor.id}`}
                              className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Modifier
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
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
                        <option value={25}>25 par page</option>
                        <option value={100}>100 par page</option>
                        <option value={1000}>1000 par page</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.current_page - 1)}
                        disabled={pagination.current_page === 1 || loading}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, index) => (
                          page === '...' ? (
                            <span key={index} className="px-4 py-2 text-gray-500">...</span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page as number)}
                              disabled={loading}
                              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                page === pagination.current_page
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
    </div>
  )
}
