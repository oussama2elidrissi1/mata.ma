'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/lib/i18n'
import api from '@/lib/api'
import { CheckCircle, User, Building2, MapPin, Phone, Mail, Globe, Users } from 'lucide-react'

interface JoinFormData {
  fullName: string
  establishmentName: string
  category?: string
  region: string
  city: string
  address: string
  phone: string
  email: string
  website?: string
  description: string
  terms: boolean
}

export default function JoinPage() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [accountType, setAccountType] = useState<'actor' | 'association'>('actor')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<JoinFormData>()

  const regions = [
    'Tanger-Tétouan-Al Hoceïma',
    'L\'Oriental',
    'Fès-Meknès',
    'Rabat-Salé-Kénitra',
    'Béni Mellal-Khénifra',
    'Casablanca-Settat',
    'Marrakech-Safi',
    'Drâa-Tafilalet',
    'Souss-Massa',
    'Guelmim-Oued Noun',
    'Laâyoune-Sakia El Hamra',
    'Dakhla-Oued Ed-Dahab'
  ]

  const categories = ['Hébergement', 'Restauration', 'Activités', 'Transport', 'Agence']

  const steps = [
    t('join.step1') || 'Remplissez le formulaire',
    t('join.step2') || 'Soumettez les documents requis',
    t('join.step3') || 'Évaluation par notre équipe',
    t('join.step4') || 'Recevez votre certification'
  ]

  const onSubmit = async (data: JoinFormData) => {
    // IMPORTANT: on envoie vers le backend (vrai ajout), pas localStorage
    const payload =
      accountType === 'association'
        ? {
            name: data.establishmentName, // nom public de l'acteur
            type: 'association',
            category: null,
            description: data.description,
            address: data.address,
            city: data.city,
            region: data.region,
            phone: data.phone,
            email: data.email,
            website: data.website || null,
          }
        : {
            name: data.establishmentName,
            type: 'other', // l'acteur “classique” reste via le circuit d’accréditation (si tu veux)
            category: data.category || null,
            description: data.description,
            address: data.address,
            city: data.city,
            region: data.region,
            phone: data.phone,
            email: data.email,
            website: data.website || null,
          }

    try {
      await api.post('/tourism-actors', payload)
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err: any) {
      console.error('Join submit error:', err)
      alert(err.response?.data?.message || 'Erreur lors de la soumission. Vérifiez les champs.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#333333' }}>
            {t('join.title') || 'Adhérer à notre réseau'}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {t('join.subtitle') || 'Rejoignez notre communauté d\'acteurs du tourisme et développez votre activité'}
          </p>
        </motion.div>

        {/* Sélection du type de compte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center" style={{ color: '#333333' }}>
              {t('join.accountType') || 'Type de compte'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAccountType('actor')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  accountType === 'actor'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                }`}
                style={accountType === 'actor' ? { borderColor: '#CC0000' } : {}}
              >
                <User className="w-8 h-8 mx-auto mb-3" style={{ color: '#CC0000' }} />
                <h3 className="font-semibold mb-2" style={{ color: '#333333' }}>
                  {t('join.actor') || 'Acteur'}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('join.actorDesc') || 'Pour les professionnels du tourisme (hôtels, restaurants, guides, etc.)'}
                </p>
              </button>
              <button
                type="button"
                onClick={() => setAccountType('association')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  accountType === 'association'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                }`}
                style={accountType === 'association' ? { borderColor: '#CC0000' } : {}}
              >
                <Users className="w-8 h-8 mx-auto mb-3" style={{ color: '#CC0000' }} />
                <h3 className="font-semibold mb-2" style={{ color: '#333333' }}>
                  {t('join.association') || 'Association'}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('join.associationDesc') || 'Pour les associations régionales du tourisme'}
                </p>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#CC0000' }}>
                {t('join.process') || 'Processus d\'Adhésion'}
              </h2>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#CC0000' }}>
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#CC0000' }}>
                  {t('join.documents') || 'Documents Requis'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span>{t('join.doc1') || 'Registre de commerce'}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span>{t('join.doc2') || 'Certificats professionnels'}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span>{t('join.doc3') || 'Assurance responsabilité'}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span>{t('join.doc4') || 'Photos de l\'établissement'}</span>
                  </li>
                  {accountType === 'association' && (
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                      <span>{t('join.doc5') || 'Statuts de l\'association'}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-8" style={{ color: '#CC0000' }}>
                {t('join.formTitle') || 'Formulaire d\'Adhésion'}
                {accountType === 'association' && (
                  <span className="ml-2 text-lg text-gray-600 font-normal">
                    ({t('join.association') || 'Association'})
                  </span>
                )}
              </h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-xl flex items-center space-x-4"
                >
                  <CheckCircle className="text-green-600 text-3xl flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-600 mb-1">
                      {t('join.success') || 'Demande Soumise avec Succès!'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {accountType === 'association'
                        ? t('join.successAssociation') || 'Un email de confirmation de partenariat vous a été envoyé. Nous vous contacterons dans les 48 heures.'
                        : t('join.successActor') || 'Un email de confirmation vous a été envoyé. Nous vous contacterons dans les 48 heures.'}
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline mr-2" style={{ color: '#CC0000' }} />
                      {t('join.fullName') || 'Nom Complet'} *
                    </label>
                    <input
                      type="text"
                      {...register('fullName', { required: true })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.fullName ? 'border-red-500' : ''
                      }`}
                      placeholder={t('join.fullNamePlaceholder') || 'Votre nom complet'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building2 className="inline mr-2" style={{ color: '#CC0000' }} />
                      {accountType === 'association' ? t('join.associationName') || 'Nom de l\'Association' : t('join.establishmentName') || 'Nom de l\'Établissement'} *
                    </label>
                    <input
                      type="text"
                      {...register('establishmentName', { required: true })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.establishmentName ? 'border-red-500' : ''
                      }`}
                      placeholder={accountType === 'association' ? t('join.associationNamePlaceholder') || 'Nom de votre association' : t('join.establishmentNamePlaceholder') || 'Nom de votre établissement'}
                    />
                  </div>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${accountType === 'association' ? 'md:grid-cols-1' : ''}`}>
                  {accountType === 'actor' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('join.category') || 'Catégorie'} *
                      </label>
                      <select
                        {...register('category', { required: accountType === 'actor' })}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                          errors.category ? 'border-red-500' : ''
                        }`}
                      >
                        <option value="">{t('join.selectCategory') || 'Sélectionnez une catégorie'}</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline mr-2" style={{ color: '#CC0000' }} />
                      {t('join.region') || 'Région'} *
                    </label>
                    <select
                      {...register('region', { required: true })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.region ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">{t('join.selectRegion') || 'Sélectionnez une région'}</option>
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline mr-2" style={{ color: '#CC0000' }} />
                    {t('join.city') || 'Ville'} *
                  </label>
                  <input
                    type="text"
                    {...register('city', { required: true })}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.city ? 'border-red-500' : ''
                    }`}
                    placeholder={t('join.cityPlaceholder') || 'Votre ville'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline mr-2" style={{ color: '#CC0000' }} />
                    {t('join.address') || 'Adresse Complète'} *
                  </label>
                  <textarea
                    {...register('address', { required: true })}
                    rows={3}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.address ? 'border-red-500' : ''
                    }`}
                    placeholder={t('join.addressPlaceholder') || 'Adresse complète de votre établissement'}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline mr-2" style={{ color: '#CC0000' }} />
                      {t('join.phone') || 'Téléphone'} *
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { required: true, pattern: /^[+]?[0-9]{10,}$/ })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.phone ? 'border-red-500' : ''
                      }`}
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline mr-2" style={{ color: '#CC0000' }} />
                      {t('join.email') || 'Email'} *
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="inline mr-2" style={{ color: '#CC0000' }} />
                    {t('join.website') || 'Site Web'}
                  </label>
                  <input
                    type="url"
                    {...register('website')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="www.example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('join.description') || 'Description de Votre Activité'} *
                  </label>
                  <textarea
                    {...register('description', { required: true, minLength: 50 })}
                    rows={5}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.description ? 'border-red-500' : ''
                    }`}
                    placeholder={t('join.descriptionPlaceholder') || 'Décrivez votre établissement et vos services (minimum 50 caractères)'}
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('terms', { required: true })}
                    className="mt-1"
                    id="terms"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    {t('join.terms') || 'J\'accepte les conditions générales et je certifie que les informations fournies sont exactes'} *
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-xs">{t('join.termsError') || 'Vous devez accepter les conditions'}</p>
                )}

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-white rounded-lg font-medium transition-colors"
                    style={{ backgroundColor: '#CC0000' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B30000'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
                  >
                    {accountType === 'association' 
                      ? t('join.submitPartnership') || 'Soumettre la Demande de Partenariat'
                      : t('join.submit') || 'Soumettre la Demande'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
