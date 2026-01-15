'use client'

import { X, Filter } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'

interface FilterPanelProps {
  filters: {
    type: string
    region: string
    city: string
    category?: string
  }
  onFiltersChange: (filters: any) => void
  onClose: () => void
  inline?: boolean
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

export default function FilterPanel({ filters, onFiltersChange, onClose, inline = false }: FilterPanelProps) {
  const { t } = useTranslation()
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleChange = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const resetFilters = () => {
    const reset = { type: '', region: '', city: '', category: '' }
    setLocalFilters(reset)
    onFiltersChange(reset)
  }

  const activeFiltersCount = [
    localFilters.type,
    localFilters.region,
    localFilters.city,
  ].filter(Boolean).length

  const types = [
    { value: '', label: t('allTypes') || 'Tous les types' },
    { value: 'hotel', label: t('hotel') || 'Hôtel' },
    { value: 'restaurant', label: t('restaurant') || 'Restaurant' },
    { value: 'travel_agency', label: t('travelAgencies') || 'Agence de Voyage' },
    { value: 'tour_guide', label: t('touristGuides') || 'Guide Touristique' },
    { value: 'transport', label: t('transport') || 'Transport' },
    { value: 'attraction', label: t('attraction') || 'Attraction' },
    { value: 'other', label: t('other') || 'Autre' },
  ]

  const categories = [
    { value: '', label: t('allCategories') },
    { value: 'luxury', label: t('luxury') },
    { value: 'premium', label: t('premium') },
    { value: 'standard', label: t('standard') },
    { value: 'budget', label: t('budget') },
  ]

  if (inline) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {/* Catégorie Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t('category')}
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => {
              const newFilters = { ...filters, category: e.target.value }
              onFiltersChange(newFilters)
            }}
            className="w-full px-4 py-3.5 border-2 border-blue-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all bg-white text-base text-gray-700"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t('type')}
          </label>
          <select
            value={localFilters.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all bg-white text-base text-gray-700"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Certifications Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t('certifications')}
          </label>
        </div>
      </div>
    )
  }

  // Original Panel Design (for backward compatibility)
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-900" />
          <h3 className="text-lg font-semibold text-gray-900">{t('filters')}</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 bg-blue-900 text-white text-xs rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('type')}
          </label>
          <select
            value={localFilters.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('region')}
          </label>
          <select
            value={localFilters.region}
            onChange={(e) => handleChange('region', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all"
          >
            <option value="">{t('allRegions')}</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('city') || 'Ville'}
          </label>
          <input
            type="text"
            value={localFilters.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder={t('city') || 'Entrez une ville'}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all text-gray-900 bg-white"
          />
        </div>


        {/* Reset Button */}
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            {t('reset')}
          </button>
        )}
      </div>
    </div>
  )
}
