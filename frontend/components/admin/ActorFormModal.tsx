'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { TourismActor } from '@/types'
import api from '@/lib/api'

interface ActorFormModalProps {
  actor: TourismActor | null
  onClose: () => void
}

export default function ActorFormModal({ actor, onClose }: ActorFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    type: 'hotel',
    category: '',
    description: '',
    address: '',
    city: '',
    region: '',
    phone: '',
    email: '',
    website: '',
    accreditation_number: '',
    status: 'active',
    verified: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (actor) {
      setFormData({
        name: actor.name,
        name_ar: actor.name_ar || '',
        type: actor.type,
        category: actor.category || '',
        description: actor.description || '',
        address: actor.address,
        city: actor.city,
        region: actor.region,
        phone: actor.phone || '',
        email: actor.email || '',
        website: actor.website || '',
        accreditation_number: actor.accreditation_number || '',
        status: actor.status,
        verified: actor.verified,
      })
    }
  }, [actor])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (actor) {
        await api.put(`/tourism-actors/${actor.id}`, formData)
      } else {
        await api.post('/tourism-actors', formData)
      }
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {actor ? 'Modifier l\'acteur' : 'Ajouter un acteur'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom (Arabe)</label>
              <input
                type="text"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              >
                <option value="hotel">Hôtel</option>
                <option value="restaurant">Restaurant</option>
                <option value="travel_agency">Agence de Voyage</option>
                <option value="tour_guide">Guide Touristique</option>
                <option value="transport">Transport</option>
                <option value="attraction">Attraction</option>
                <option value="other">Autre</option>
                <option value="association">Association</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              >
                <option value="">Sélectionner</option>
                <option value="luxury">Luxe</option>
                <option value="premium">Premium</option>
                <option value="standard">Standard</option>
                <option value="budget">Économique</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Région *</label>
              <input
                type="text"
                required
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site web</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro d'accréditation (Badge)
                <span className="text-xs text-gray-500 ml-2">(Optionnel - généré automatiquement si vide)</span>
              </label>
              <input
                type="text"
                value={formData.accreditation_number}
                onChange={(e) => setFormData({ ...formData, accreditation_number: e.target.value })}
                placeholder="MATA-XXXX-XXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                Si un numéro est fourni, l'acteur aura le badge d'accréditation. L'acteur sera automatiquement approuvé.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut *
                <span className="text-xs text-green-600 ml-2">(Auto: Actif pour admin)</span>
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              >
                <option value="active">Actif (Approuvé)</option>
                <option value="inactive">Inactif</option>
                <option value="pending">En attente</option>
                <option value="suspended">Suspendu</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Les acteurs créés par l'admin sont automatiquement approuvés (statut: Actif, vérifié: Oui)
              </p>
            </div>
            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                id="verified"
                checked={formData.verified}
                onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                className="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-900"
              />
              <label htmlFor="verified" className="ml-2 text-sm font-medium text-gray-700">
                Acteur vérifié
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : actor ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
