'use client'

import { useState, useEffect } from 'react'
import { Eye, Edit, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { TourismActor } from '@/types'
import { fetchActors } from '@/lib/api'

export default function RecentActors() {
  const [actors, setActors] = useState<TourismActor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecentActors()
  }, [])

  const loadRecentActors = async () => {
    try {
      const params = new URLSearchParams()
      params.append('per_page', '5')
      params.append('sort_by', 'created_at')
      params.append('sort_order', 'desc')
      params.append('all_status', 'true')

      const data = await fetchActors(params.toString())
      setActors(data)
    } catch (error) {
      console.error('Error loading recent actors:', error)
    } finally {
      setLoading(false)
    }
  }

  const typeLabels: Record<string, string> = {
    hotel: 'Hôtel',
    restaurant: 'Restaurant',
    travel_agency: 'Agence',
    tour_guide: 'Guide',
    transport: 'Transport',
    attraction: 'Attraction',
    other: 'Autre',
  }

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    suspended: 'bg-red-100 text-red-800',
    inactive: 'bg-gray-100 text-gray-800',
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Acteurs Récents</h2>
          <Link
            href="/admin/actors"
            className="text-sm text-blue-900 hover:text-blue-700 font-medium"
          >
            Voir tout →
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {actors.map((actor) => (
          <div key={actor.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{actor.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[actor.status] || statusColors.inactive}`}>
                    {actor.status}
                  </span>
                  {actor.verified && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{typeLabels[actor.type] || actor.type}</span>
                  <span>•</span>
                  <span>{actor.city}, {actor.region}</span>
                  <span>•</span>
                  <span className="text-gray-400">
                    {new Date(actor.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/actors/${actor.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Voir"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/admin/actors?edit=${actor.id}`}
                  className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                  title="Modifier"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {actors.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          Aucun acteur récent
        </div>
      )}
    </div>
  )
}
