'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EventCard from '@/components/EventCard'
import { fetchEvents } from '@/lib/api'
import { Event } from '@/types'

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedMonth, setSelectedMonth] = useState('Tous')
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = ['Tous', 'Conférence', 'Salon', 'Formation', 'Networking']
  const months = ['Tous', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

  useEffect(() => {
    loadEvents()
  }, [selectedCategory])

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      params.append('status', 'published')
      params.append('upcoming', 'true')
      if (selectedCategory !== 'Tous') {
        params.append('category', selectedCategory)
      }
      const data = await fetchEvents(params.toString())
      setEvents(data)
    } catch (err: any) {
      console.error('Error loading events:', err)
      setError('Erreur lors du chargement des événements')
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter(event => {
    if (selectedMonth === 'Tous') return true
    const eventDate = new Date(event.event_date)
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    return monthNames[eventDate.getMonth()] === selectedMonth
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight" style={{ color: '#333333' }}>
            Événements Professionnels
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#333333' }}>
            Participez aux rencontres et conférences du secteur touristique
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={selectedCategory === category ? { backgroundColor: '#CC0000' } : {}}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Chargement des événements...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredEvents.length}</span> événements à venir
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Aucun événement trouvé pour ces critères</p>
              </div>
            )}
          </>
        )}

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 tracking-tight" style={{ color: '#333333' }}>
              Organisez votre événement
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-lg">
              Vous organisez un événement professionnel dans le secteur du tourisme ? Référencez-le sur notre plateforme pour toucher des milliers de professionnels.
            </p>
            <button 
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md hover:shadow-lg"
              style={{ backgroundColor: '#CC0000' }}
            >
              Proposer un événement
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Events
