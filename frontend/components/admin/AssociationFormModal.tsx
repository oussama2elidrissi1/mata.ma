'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { TourismActor } from '@/types'
import api from '@/lib/api'
import { useTranslation } from '@/lib/i18n'

interface AssociationFormModalProps {
  association: TourismActor | null
  onClose: () => void
}

export default function AssociationFormModal({ association, onClose }: AssociationFormModalProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    description: '',
    description_ar: '',
    address: '',
    city: '',
    region: '',
    postal_code: '',
    country: 'Morocco',
    phone: '',
    email: '',
    website: '',
    status: 'pending' as 'active' | 'inactive' | 'pending' | 'suspended',
    verified: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (association) {
      setFormData({
        name: association.name,
        name_ar: association.name_ar || '',
        description: association.description || '',
        description_ar: association.description_ar || '',
        address: association.address,
        city: association.city,
        region: association.region,
        postal_code: association.postal_code || '',
        country: association.country || 'Morocco',
        phone: association.phone || '',
        email: association.email || '',
        website: association.website || '',
        status: association.status,
        verified: association.verified,
      })
    }
  }, [association])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const payload = {
        ...formData,
        type: 'association', // Toujours 'association' pour ce formulaire
        category: null, // Les associations n'ont pas de catégorie
      }

      if (association) {
        await api.put(`/tourism-actors/${association.id}`, payload)
      } else {
        await api.post('/tourism-actors', payload)
      }
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || t('admin.associations.saveError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {association ? t('admin.associations.editAssociation') : t('admin.associations.addAssociation')}
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.name')} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
                placeholder={t('admin.associations.form.namePlaceholder')}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.nameAr')}
              </label>
              <input
                type="text"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
                placeholder={t('admin.associations.form.nameArPlaceholder')}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.description')}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600 resize-none"
                placeholder={t('admin.associations.form.descriptionPlaceholder')}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.descriptionAr')}
              </label>
              <textarea
                value={formData.description_ar}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600 resize-none"
                placeholder={t('admin.associations.form.descriptionArPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.email')} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
                placeholder="contact@association.ma"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.phone')}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
                placeholder="+212 6XX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.website')}
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
                placeholder="https://www.association.ma"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.status')} *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
              >
                <option value="pending">{t('admin.associations.status.pending')}</option>
                <option value="active">{t('admin.associations.status.active')}</option>
                <option value="inactive">{t('admin.associations.status.inactive')}</option>
                <option value="suspended">{t('admin.associations.status.suspended')}</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.address')} *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
                placeholder={t('admin.associations.form.addressPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.city')} *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
                placeholder={t('admin.associations.form.cityPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.region')} *
              </label>
              <input
                type="text"
                required
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
                placeholder={t('admin.associations.form.regionPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.postalCode')}
              </label>
              <input
                type="text"
                value={formData.postal_code}
                onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
                placeholder="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.associations.form.country')} *
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600"
                placeholder="Morocco"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {t('admin.associations.form.verified')}
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t('admin.associations.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#CC0000' }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#B30000')}
              onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#CC0000')}
            >
              {loading ? t('admin.associations.saving') : (association ? t('admin.associations.update') : t('admin.associations.create'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
