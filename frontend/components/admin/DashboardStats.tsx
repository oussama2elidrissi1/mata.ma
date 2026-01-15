'use client'

import { useState, useEffect } from 'react'
import { Users, CheckCircle2, Clock, XCircle, TrendingUp, MapPin, Award } from 'lucide-react'
import api from '@/lib/api'

interface Stats {
  total: number
  active: number
  pending: number
  suspended: number
  accredited: number
  byType: Record<string, number>
  byRegion: Record<string, number>
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    active: 0,
    pending: 0,
    suspended: 0,
    accredited: 0,
    byType: {},
    byRegion: {},
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Charger tous les acteurs pour calculer les stats
      const [allResponse, activeResponse, pendingResponse, suspendedResponse] = await Promise.all([
        api.get('/tourism-actors?per_page=1000&all_status=true'),
        api.get('/tourism-actors?per_page=1000&status=active'),
        api.get('/tourism-actors?per_page=1000&status=pending'),
        api.get('/tourism-actors?per_page=1000&status=suspended'),
      ])

      const allActors = allResponse.data.data
      const activeActors = activeResponse.data.data
      const pendingActors = pendingResponse.data.data
      const suspendedActors = suspendedResponse.data.data
      // Compter les acteurs accrédités (avec accreditation_number)
      const accreditedActors = allActors.filter((actor: any) => actor.accreditation_number)

      // Calculer les stats par type
      const byType: Record<string, number> = {}
      allActors.forEach((actor: any) => {
        byType[actor.type] = (byType[actor.type] || 0) + 1
      })

      // Calculer les stats par région
      const byRegion: Record<string, number> = {}
      allActors.forEach((actor: any) => {
        byRegion[actor.region] = (byRegion[actor.region] || 0) + 1
      })

      setStats({
        total: allActors.length,
        active: activeActors.length,
        pending: pendingActors.length,
        suspended: suspendedActors.length,
        accredited: accreditedActors.length,
        byType,
        byRegion,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Acteurs',
      value: stats.total,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Actifs',
      value: stats.active,
      icon: CheckCircle2,
      color: 'bg-green-500',
      change: '+5%',
    },
    {
      title: 'En Attente',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '-2%',
    },
    {
      title: 'Accrédités',
      value: stats.accredited,
      icon: Award,
      color: 'bg-amber-500',
      change: '+8%',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon
          const colorMap: Record<string, string> = {
            'bg-blue-500': 'bg-blue-600',
            'bg-green-500': 'bg-emerald-600',
            'bg-yellow-500': 'bg-amber-500',
            'bg-amber-500': 'bg-amber-600',
          }
          return (
            <div key={index} className={`${colorMap[card.color] || card.color} rounded-lg shadow-md p-5 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 text-sm font-medium mb-1">{card.title}</p>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Par Type */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-900" />
            Répartition par Type
          </h3>
          <div className="space-y-4">
            {Object.entries(stats.byType).map(([type, count]) => {
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0
              const typeLabels: Record<string, string> = {
                hotel: 'Hôtels',
                restaurant: 'Restaurants',
                travel_agency: 'Agences',
                tour_guide: 'Guides',
                transport: 'Transport',
                attraction: 'Attractions',
                other: 'Autres',
              }
              return (
                <div key={type}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {typeLabels[type] || type}
                    </span>
                    <span className="text-sm text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-900 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Par Région */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-900" />
            Répartition par Région
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {Object.entries(stats.byRegion)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([region, count]) => {
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0
                return (
                  <div key={region}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 truncate">{region}</span>
                      <span className="text-sm text-gray-600 ml-2">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
