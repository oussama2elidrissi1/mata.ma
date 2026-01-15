'use client'

import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { Event } from '@/types'
import Image from 'next/image'

interface EventCardProps {
  event: Event
}

const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const formatTime = () => {
    if (event.start_time && event.end_time) {
      return `${event.start_time} - ${event.end_time}`
    }
    if (event.start_time) {
      return event.start_time
    }
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative w-full h-48">
        <Image
          src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary text-xs font-medium rounded-full">
            {event.category}
          </span>
          {event.featured && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
              À la une
            </span>
          )}
        </div>
        <h3 className="font-serif font-semibold text-xl mb-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          {formatTime() && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{formatTime()}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          {event.participants > 0 && (
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{event.participants} participants</span>
            </div>
          )}
        </div>

        <button 
          className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md hover:shadow-lg"
          style={{ backgroundColor: '#CC0000' }}
        >
          S'inscrire
        </button>
      </div>
    </div>
  )
}

export default EventCard
