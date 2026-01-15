'use client'

import { Search, MapPin, SlidersHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import FilterPanel from './FilterPanel'
import { useTranslation } from '@/lib/i18n'

export default function Hero() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    region: '',
    city: '',
    category: '',
  })
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = document.createElement('img')
      img.src = '/images/hero-background.jpg'
      img.onload = () => setImageLoaded(true)
      img.onerror = () => setImageError(true)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm.trim()) {
      params.append('search', searchTerm.trim())
    }
    if (location.trim()) {
      params.append('region', location.trim())
      params.append('city', location.trim())
    }
    if (filters.type) {
      params.append('type', filters.type)
    }
    if (filters.category) {
      params.append('category', filters.category)
    }
    if (filters.region) {
      params.append('region', filters.region)
    }
    if (filters.city) {
      params.append('city', filters.city)
    }
    // Filtre verified supprimé - utiliser accreditation_number à la place
    router.push(`/actors${params.toString() ? `?${params.toString()}` : ''}`)
  }




  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Fallback gradient - shown only if image fails to load */}
      {imageError && (
        <div 
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(to bottom, #CC0000, #B30000, #990000)' }}
        />
      )}
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/hero-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Light dark overlay for better text readability (no red tint) */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ 
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5))'
        }}
      />
      
      <div className="container mx-auto px-4 py-16 relative z-[2]">
        <div className="max-w-6xl mx-auto">

          {/* Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight px-4 drop-shadow-lg font-serif">
              {t('heroTitle')}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/95 max-w-3xl mx-auto px-4 leading-relaxed drop-shadow-md font-normal">
              {t('platformSubtitle')}
            </p>
          </div>

          {/* Main Search Bar */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 transition-all text-sm md:text-base placeholder-gray-400 text-gray-900 bg-white"
                    style={{ '--tw-ring-color': '#CC0000' } as React.CSSProperties & { '--tw-ring-color': string }}
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
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ville, région..."
                    className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 transition-all text-sm md:text-base placeholder-gray-400 text-gray-900 bg-white"
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
                  type="submit"
                  className="px-6 md:px-8 py-3 md:py-4 text-white rounded-xl transition-colors font-semibold whitespace-nowrap text-sm md:text-base"
                  style={{ backgroundColor: '#CC0000' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B30000'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
                >
                  {t('searchButton')}
                </button>

                {/* Filters Button */}
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-5 md:px-6 py-3 md:py-4 rounded-xl transition-colors font-semibold flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base"
                  style={{ backgroundColor: 'rgba(204, 0, 0, 0.1)', color: '#CC0000' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(204, 0, 0, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(204, 0, 0, 0.1)'}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>{t('filters')}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Advanced Filters Section */}
          {showFilters && (
            <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6 mb-6">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClose={() => setShowFilters(false)}
                inline={true}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
