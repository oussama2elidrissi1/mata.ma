'use client'

import { useState, useEffect, Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import PremiumActors from '@/components/PremiumActors'
import WhyChooseMata from '@/components/WhyChooseMata'
import ActorCard from '@/components/ActorCard'
import FilterPanel from '@/components/FilterPanel'
import { TourismActor } from '@/types'
import { fetchActors } from '@/lib/api'
import { useSearchParams } from 'next/navigation'
import { Search, MapPin, SlidersHorizontal } from 'lucide-react'

function HomeContent() {
  const searchParams = useSearchParams()
  const [actors, setActors] = useState<TourismActor[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    region: '',
    city: '',
  })
  const [showFilters, setShowFilters] = useState(false)
  const [showAllActors, setShowAllActors] = useState(!!searchParams.get('search') || !!searchParams.get('type'))

  useEffect(() => {
    if (showAllActors || searchTerm || filters.type) {
      loadActors()
    }
  }, [filters, searchTerm, showAllActors])

  useEffect(() => {
    const handleShowAllActors = () => {
      setShowAllActors(true)
    }
    window.addEventListener('showAllActors', handleShowAllActors)
    return () => window.removeEventListener('showAllActors', handleShowAllActors)
  }, [])

  const loadActors = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filters.type) params.append('type', filters.type)
      if (filters.region) params.append('region', filters.region)
      if (filters.city) params.append('city', filters.city)
      // Filtre verified supprimé
      params.append('per_page', '50')

      const data = await fetchActors(params.toString())
      setActors(data)
    } catch (error) {
      console.error('Error loading actors:', error)
      setActors([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <StatsSection />
      <PremiumActors />
      <WhyChooseMata />

      {showAllActors && (
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-tight" style={{ color: '#333333' }}>
                Explorez notre Annuaire
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#333333' }}>
                Trouvez les meilleurs acteurs du tourisme accrédités au Maroc
              </p>
            </div>

            {/* Search and Filters Section */}
            <div className="mb-8 space-y-4">
              {/* Top Section - Main Search */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher un professionnel, une entreprise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 transition-all text-base"
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#CC0000'
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(204, 0, 0, 0.2)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = ''
                        e.currentTarget.style.boxShadow = ''
                      }}
                    />
                  </div>

                  {/* Location Input */}
                  <div className="md:w-64 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Ville, région..."
                      value={filters.city || filters.region}
                      onChange={(e) => {
                        const value = e.target.value
                        setFilters({ ...filters, city: value, region: value })
                      }}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 transition-all text-base"
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#CC0000'
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(204, 0, 0, 0.2)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = ''
                        e.currentTarget.style.boxShadow = ''
                      }}
                    />
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={loadActors}
                    className="px-8 py-4 text-white rounded-xl transition-colors font-semibold whitespace-nowrap"
                    style={{ backgroundColor: '#CC0000' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B30000'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
                  >
                    Rechercher
                  </button>

                  {/* Filters Toggle Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-6 py-4 rounded-xl transition-colors font-semibold flex items-center gap-2 whitespace-nowrap"
                    style={{ backgroundColor: 'rgba(204, 0, 0, 0.1)', color: '#CC0000' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(204, 0, 0, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(204, 0, 0, 0.1)'}
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    Filtres
                  </button>
                </div>
              </div>

              {/* Bottom Section - Additional Filters */}
              {showFilters && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <FilterPanel
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClose={() => setShowFilters(false)}
                    inline={true}
                  />
                </div>
              )}
            </div>

            {/* Results Section */}
            {loading ? (
              <div className="flex flex-col justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mb-4" style={{ borderColor: '#CC0000' }}></div>
                <p className="text-lg" style={{ color: '#333333' }}>Chargement des acteurs...</p>
              </div>
            ) : actors.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2" style={{ color: '#333333' }}>
                    Aucun résultat trouvé
                  </h3>
                  <p className="mb-6" style={{ color: '#333333' }}>
                    Essayez de modifier vos critères de recherche ou vos filtres
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setFilters({ type: '', region: '', city: '' })
                    }}
                    className="px-6 py-3 text-white rounded-lg transition-colors font-medium"
                    style={{ backgroundColor: '#CC0000' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B30000'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#333333' }}>
                      {actors.length} acteur{actors.length > 1 ? 's' : ''} trouvé{actors.length > 1 ? 's' : ''}
                    </h3>
                    <p className="mt-1" style={{ color: '#333333' }}>
                      Résultats de votre recherche
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {(searchTerm || filters.type || filters.region || filters.city) && (
                      <button
                        onClick={() => {
                          setSearchTerm('')
                          setFilters({ type: '', region: '', city: '' })
                        }}
                        className="px-4 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
                        style={{ color: '#333333' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#CC0000'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#333333'}
                      >
                        Effacer
                      </button>
                    )}
                  </div>
                </div>

                {/* Actors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {actors.map((actor) => (
                    <ActorCard key={actor.id} actor={actor} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <HomeContent />
    </Suspense>
  )
}
