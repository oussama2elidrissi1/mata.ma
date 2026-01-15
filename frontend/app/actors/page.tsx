'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Search, Building2, UtensilsCrossed, Map, Plane, MapPin, Phone, Mail, Star, CheckCircle2, Grid3x3, List, ChevronLeft, ChevronRight } from 'lucide-react'
import { TourismActor } from '@/types'
import api, { PaginatedResponse } from '@/lib/api'
import { formatRating, isValidRating } from '@/lib/utils'
import Link from 'next/link'

function ActorsContent() {
  const searchParams = useSearchParams()
  const [actors, setActors] = useState<TourismActor[]>([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    region: searchParams.get('region') || '',
    category: searchParams.get('category') || '',
    accredited: searchParams.get('accredited') === 'true',
  })
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  })

  // Update filters and search term when URL params change
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '')
    setFilters({
      type: searchParams.get('type') || '',
      region: searchParams.get('region') || '',
      category: searchParams.get('category') || '',
      accredited: searchParams.get('accredited') === 'true',
    })
  }, [searchParams])

  useEffect(() => {
    loadActors()
  }, [filters.type, filters.region, filters.category, filters.accredited, searchTerm, pagination.current_page, pagination.per_page])

  const loadActors = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm.trim()) params.append('search', searchTerm.trim())
      if (filters.type) params.append('type', filters.type)
      if (filters.region) params.append('region', filters.region)
      if (filters.category) params.append('category', filters.category)
      params.append('per_page', pagination.per_page.toString())
      params.append('page', pagination.current_page.toString())

      const response = await api.get<PaginatedResponse<TourismActor>>(`/tourism-actors?${params.toString()}`)
      
      if (response.data.success) {
        let actorsData = response.data.data
        // Filtrer par accréditation si nécessaire
        if (filters.accredited) {
          actorsData = actorsData.filter(actor => actor.accreditation_number)
        }
        setActors(actorsData)
        if (response.data.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.data.pagination,
            per_page: pagination.per_page,
          }))
        }
      }
    } catch (error) {
      console.error('Error loading actors:', error)
      setActors([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current_page: 1 }))
    updateURLAndLoad()
  }

  const updateURLAndLoad = () => {
    const params = new URLSearchParams()
    if (searchTerm.trim()) params.append('search', searchTerm.trim())
    if (filters.type) params.append('type', filters.type)
    if (filters.region) params.append('region', filters.region)
    if (filters.category) params.append('category', filters.category)
    if (filters.accredited) params.append('accredited', 'true')
    
    // Update URL without reload
    const newUrl = `/actors${params.toString() ? `?${params.toString()}` : ''}`
    window.history.pushState({}, '', newUrl)
    loadActors()
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setPagination(prev => ({ ...prev, current_page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, current_page: page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  const regions = [
    'Casablanca-Settat',
    'Rabat-Salé-Kénitra',
    'Fès-Meknès',
    'Marrakech-Safi',
    'Tanger-Tétouan-Al Hoceïma',
    'Oriental',
    'Béni Mellal-Khénifra',
    'Souss-Massa',
    'Guelmim-Oued Noun',
    'Laâyoune-Sakia El Hamra',
    'Dakhla-Oued Ed-Dahab',
  ]

  const categories = [
    { icon: Building2, label: 'Hôtels & Riads', type: 'hotel' },
    { icon: UtensilsCrossed, label: 'Restaurants', type: 'restaurant' },
    { icon: Map, label: 'Guides Touristiques', type: 'tour_guide' },
    { icon: Plane, label: 'Agences de Voyage', type: 'travel_agency' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Title and Search Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2 font-serif tracking-tight">
            Annuaire des Acteurs du Tourisme
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Recherchez et découvrez les professionnels du tourisme accrédités au Maroc
          </p>
          
          {/* Search Bar */}
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un acteur touristique..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSearch()
                    }
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all text-base text-gray-900 bg-white"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors font-semibold whitespace-nowrap shadow-lg hover:shadow-xl"
              >
                Rechercher
              </button>
            </div>
          </form>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
                <button
                  onClick={() => {
                    setFilters({ type: '', region: '', category: '', accredited: false })
                    setSearchTerm('')
                    setPagination(prev => ({ ...prev, current_page: 1 }))
                    window.history.pushState({}, '', '/actors')
                    loadActors()
                  }}
                  className="text-sm text-blue-900 hover:text-blue-700 font-medium"
                >
                  Réinitialiser
                </button>
              </div>

              {/* Catégorie Section */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Catégorie</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const isActive = filters.type === category.type
                    return (
                      <button
                        key={category.type}
                        onClick={() => {
                          const newFilters = { ...filters, type: isActive ? '' : category.type }
                          handleFilterChange(newFilters)
                          updateURLAndLoad()
                        }}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          isActive
                            ? 'border-blue-900 bg-blue-50 text-blue-900'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs font-medium text-center">{category.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Région Section */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Région</h3>
                <select
                  value={filters.region}
                  onChange={(e) => {
                    const newFilters = { ...filters, region: e.target.value }
                    handleFilterChange(newFilters)
                    updateURLAndLoad()
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all"
                >
                  <option value="">Toutes les régions</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Accréditation Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Accréditation</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      const newFilters = { 
                        ...filters, 
                        accredited: filters.accredited ? false : true,
                        category: '' // Désactiver le filtre category quand on active accredited
                      }
                      handleFilterChange(newFilters)
                      updateURLAndLoad()
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                      filters.accredited
                        ? 'border-amber-500 bg-amber-50 text-amber-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300'
                    }`}
                  >
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <span className="font-medium">Accrédités</span>
                  </button>
                  <button
                    onClick={() => {
                      const newFilters = { 
                        ...filters, 
                        accredited: false, // Désactiver accredited quand on active standard
                        category: filters.category === 'standard' ? '' : 'standard' 
                      }
                      handleFilterChange(newFilters)
                      updateURLAndLoad()
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                      filters.category === 'standard' && !filters.accredited
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Standard</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Results */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">Résultats: </span>
                  {pagination.total}
                </p>
                {loading && (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-900 border-t-transparent"></div>
                )}
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Vue grille"
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Vue liste"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {loading && actors.length === 0 ? (
              <div className="flex flex-col justify-center items-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-medium">Chargement des résultats...</p>
              </div>
            ) : actors.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">Aucun résultat trouvé</p>
                <p className="text-gray-400 text-sm mt-2">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              <>
                {/* Results Grid or List */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {actors.map((actor) => (
                      <ActorGridCard key={actor.id} actor={actor} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6 mb-8">
                    {actors.map((actor) => (
                      <ActorListCard key={actor.id} actor={actor} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {pagination.total > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                          onChange={(e) => {
                            setPagination(prev => ({ ...prev, per_page: Number(e.target.value), current_page: 1 }))
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                        >
                          <option value={12}>12 par page</option>
                          <option value={24}>24 par page</option>
                          <option value={48}>48 par page</option>
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
                                    ? 'bg-blue-900 text-white shadow-md'
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
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Grid Card Component
function ActorGridCard({ actor }: { actor: TourismActor }) {
  const categoryBadge = actor.accreditation_number ? 'Accrédité' : 'Standard'
  const badgeColor = categoryBadge === 'Accrédité' ? 'bg-amber-500' : 'bg-blue-500'

  return (
    <Link href={`/actors/${actor.id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-blue-600 via-blue-700 to-amber-600 overflow-hidden">
          {actor.logo ? (
            <img
              src={actor.logo}
              alt={actor.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="w-16 h-16 text-white/50" />
            </div>
          )}
          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div className={`${badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg`}>
              {categoryBadge === 'Accrédité' ? (
                <Star className="w-3 h-3 fill-current" />
              ) : (
                <CheckCircle2 className="w-3 h-3" />
              )}
              {categoryBadge}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2 flex-1">
              {actor.name}
            </h3>
            {isValidRating(actor.rating) && (
              <div className="flex items-center gap-1 text-amber-500 flex-shrink-0 ml-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{formatRating(actor.rating)}</span>
              </div>
            )}
          </div>

          {actor.name_ar && (
            <p className="text-sm text-gray-600 mb-3">{actor.name_ar}</p>
          )}

          {actor.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{actor.description}</p>
          )}

          <div className="space-y-2 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span className="truncate">{actor.city}, {actor.region}</span>
            </div>
            {actor.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{actor.phone}</span>
              </div>
            )}
            {actor.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span className="truncate">{actor.email}</span>
              </div>
            )}
          </div>

          <button className="w-full px-4 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold text-sm">
            Voir le profil
          </button>
        </div>
      </div>
    </Link>
  )
}

// List Card Component
function ActorListCard({ actor }: { actor: TourismActor }) {
  const categoryBadge = actor.accreditation_number ? 'Accrédité' : 'Standard'
  const badgeColor = categoryBadge === 'Accrédité' ? 'bg-amber-500' : 'bg-blue-500'

  return (
    <Link href={`/actors/${actor.id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group cursor-pointer">
        <div className="flex">
          {/* Image Section */}
          <div className="w-80 h-64 relative flex-shrink-0">
            {actor.logo ? (
              <img
                src={actor.logo}
                alt={actor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-amber-600 flex items-center justify-center">
                <Building2 className="w-16 h-16 text-white/50" />
              </div>
            )}
            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <div className={`${badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg`}>
                {categoryBadge === 'Accrédité' ? (
                  <Star className="w-3 h-3 fill-current" />
                ) : (
                  <CheckCircle2 className="w-3 h-3" />
                )}
                {categoryBadge}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors">
                  {actor.name}
                </h3>
                {actor.name_ar && (
                  <p className="text-lg text-gray-600 mb-2">{actor.name_ar}</p>
                )}
                {isValidRating(actor.rating) && (
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(Number(actor.rating))
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 font-medium">{formatRating(actor.rating)}</span>
                  </div>
                )}
              </div>
            </div>

            {actor.description && (
              <p className="text-gray-600 mb-4 line-clamp-2">{actor.description}</p>
            )}

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{actor.city}, {actor.region}</span>
              </div>
              {actor.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 flex-shrink-0 text-red-500" />
                  <span>{actor.phone}</span>
                </div>
              )}
              {actor.email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 flex-shrink-0 text-red-500" />
                  <span>{actor.email}</span>
                </div>
              )}
            </div>

            {/* Services Tags */}
            {actor.services && Array.isArray(actor.services) && actor.services.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {actor.services.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
                {actor.services.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    +{actor.services.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* View Profile Button */}
            <button className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold">
              Voir le profil
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ActorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ActorsContent />
    </Suspense>
  )
}
