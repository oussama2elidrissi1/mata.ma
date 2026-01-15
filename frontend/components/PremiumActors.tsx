'use client'

import { useState, useEffect } from 'react'
import { Star, MapPin, CheckCircle2, Building2 } from 'lucide-react'
import Link from 'next/link'
import { TourismActor } from '@/types'
import { fetchActors } from '@/lib/api'
import { formatRating, isValidRating } from '@/lib/utils'

export default function PremiumActors() {
  const [actors, setActors] = useState<TourismActor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAccreditedActors()
  }, [])

  const loadAccreditedActors = async () => {
    try {
      const params = new URLSearchParams()
      // Charger uniquement les acteurs accrédités (avec accreditation_number)
      params.append('accredited', 'true')
      params.append('status', 'active')
      params.append('per_page', '20') // Charger plus pour avoir assez d'accrédités
      params.append('sort_by', 'rating')
      params.append('sort_order', 'desc')
      
      const allActors = await fetchActors(params.toString())
      // Filtrer pour ne garder que ceux avec un numéro d'accréditation (double vérification)
      const accreditedActors = allActors.filter((actor: TourismActor) => actor.accreditation_number)
      
      // Prendre les 3 premiers
      setActors(accreditedActors.slice(0, 3))
    } catch (error) {
      console.error('Error loading accredited actors:', error)
      setActors([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">Chargement...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-tight" style={{ color: '#333333' }}>
            Acteurs Accrédités en Vedette
          </h2>
          <p className="text-xl font-normal" style={{ color: '#333333' }}>
            Découvrez nos professionnels accrédités MATA offrant des services d'excellence
          </p>
        </div>

        {actors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: '#333333' }}>
              Aucun acteur accrédité disponible pour le moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actors.map((actor) => (
            <div key={actor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-64 bg-gradient-to-br from-blue-500 to-amber-500 overflow-hidden">
                {actor.logo ? (
                  <img 
                    src={actor.logo} 
                    alt={actor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-24 h-24 text-white/50" />
                  </div>
                )}
                {actor.accreditation_number && (
                  <div className="absolute top-4 right-4 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold" style={{ backgroundColor: '#CC0000' }}>
                    <Star className="w-4 h-4 fill-current" />
                    <span>Accrédité</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#333333' }}>{actor.name}</h3>
                {actor.name_ar && (
                  <p className="text-lg mb-4" style={{ color: '#333333' }}>{actor.name_ar}</p>
                )}
                
                {isValidRating(actor.rating) && (
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(Number(actor.rating)) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                )}

                {actor.description && (
                  <p className="mb-4 line-clamp-2" style={{ color: '#333333' }}>{actor.description}</p>
                )}

                <div className="flex items-center gap-2 mb-6" style={{ color: '#333333' }}>
                  <MapPin className="w-4 h-4" />
                  <span>{actor.city}, {actor.region}</span>
                </div>

                <Link 
                  href={`/actors/${actor.id}`}
                  className="block w-full text-center px-6 py-3 text-white rounded-lg transition-colors font-semibold"
                  style={{ backgroundColor: '#CC0000' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B30000'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
                >
                  Voir le profil
                </Link>
              </div>
            </div>
          ))}
          </div>
        )}

        {actors.length > 0 && (
          <div className="text-center mt-12">
          <Link
            href="/actors"
            className="inline-block px-8 py-4 text-white rounded-lg transition-colors font-semibold text-lg"
            style={{ backgroundColor: '#CC0000' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B30000'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
          >
            Voir Tous les Acteurs
          </Link>
          </div>
        )}
      </div>
    </section>
  )
}
