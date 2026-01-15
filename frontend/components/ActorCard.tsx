'use client'

import { MapPin, Phone, Mail, Globe, Star, CheckCircle2 } from 'lucide-react'
import { TourismActor } from '@/types'
import Link from 'next/link'
import { formatRating, isValidRating } from '@/lib/utils'

interface ActorCardProps {
  actor: TourismActor
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

const categoryColors: Record<string, string> = {
  luxury: 'bg-purple-100 text-purple-700',
  premium: 'bg-blue-100 text-blue-700',
  standard: 'bg-green-100 text-green-700',
  budget: 'bg-yellow-100 text-yellow-700',
}

export default function ActorCard({ actor }: ActorCardProps) {
  return (
    <Link href={`/actors/${actor.id}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
        {/* Image/Logo Section */}
        <div className="relative h-52 bg-gradient-to-br from-blue-600 via-blue-700 to-amber-600 overflow-hidden">
          {actor.logo ? (
            <img 
              src={actor.logo} 
              alt={actor.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MapPin className="w-16 h-16 text-white/50" />
            </div>
          )}
          {actor.verified && (
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          )}
          {actor.category && (
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[actor.category] || categoryColors.standard}`}>
              {actor.category}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {actor.name}
            </h3>
            {isValidRating(actor.rating) && (
              <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0 ml-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{formatRating(actor.rating)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
              {typeLabels[actor.type] || actor.type}
            </span>
          </div>

          {actor.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {actor.description}
            </p>
          )}

          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{actor.city}, {actor.region}</span>
            </div>
            {actor.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{actor.phone}</span>
              </div>
            )}
            {actor.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{actor.email}</span>
              </div>
            )}
            {actor.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span className="truncate text-primary-600">{actor.website}</span>
              </div>
            )}
          </div>

          {actor.accreditation_number && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Accréditation: <span className="font-semibold text-gray-700">{actor.accreditation_number}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
