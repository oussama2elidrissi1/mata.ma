'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/lib/i18n'
import { HeartHandshake, Globe, Users } from 'lucide-react'

const partners = [
  {
    id: 1,
    name: 'Ministère du Tourisme',
    nameEn: 'Ministry of Tourism',
    type: 'institutional',
    logo: 'https://via.placeholder.com/200x100/1A365D/FFFFFF?text=Ministère+Tourisme',
    website: 'www.tourisme.gov.ma'
  },
  {
    id: 2,
    name: 'Office National Marocain du Tourisme',
    nameEn: 'Moroccan National Tourism Office',
    type: 'institutional',
    logo: 'https://via.placeholder.com/200x100/C05621/FFFFFF?text=ONMT',
    website: 'www.visitmorocco.com'
  },
  {
    id: 3,
    name: 'Confédération Nationale du Tourisme',
    nameEn: 'National Tourism Confederation',
    type: 'professional',
    logo: 'https://via.placeholder.com/200x100/D69E2E/1A365D?text=CNT',
    website: 'www.cnt.ma'
  },
  {
    id: 4,
    name: 'Organisation Mondiale du Tourisme',
    nameEn: 'World Tourism Organization',
    type: 'international',
    logo: 'https://via.placeholder.com/200x100/2C5282/FFFFFF?text=UNWTO',
    website: 'www.unwto.org'
  },
  {
    id: 5,
    name: 'Fédération Nationale de l\'Hôtellerie',
    nameEn: 'National Hotel Federation',
    type: 'professional',
    logo: 'https://via.placeholder.com/200x100/38A169/FFFFFF?text=FNH',
    website: 'www.fnh.ma'
  },
  {
    id: 6,
    name: 'Association des Guides Touristiques',
    nameEn: 'Tourist Guides Association',
    type: 'professional',
    logo: 'https://via.placeholder.com/200x100/DD6B20/FFFFFF?text=AGT',
    website: 'www.guides-maroc.ma'
  },
  {
    id: 7,
    name: 'Chambre de Commerce Internationale',
    nameEn: 'International Chamber of Commerce',
    type: 'international',
    logo: 'https://via.placeholder.com/200x100/1A365D/FFFFFF?text=CCI',
    website: 'www.iccwbo.org'
  },
  {
    id: 8,
    name: 'Réseau des Villes Touristiques',
    nameEn: 'Tourist Cities Network',
    type: 'institutional',
    logo: 'https://via.placeholder.com/200x100/C05621/FFFFFF?text=RVT',
    website: 'www.villes-tourisme.ma'
  }
]

const partnerTypes = [
  { id: 'institutional', label: 'Institutionnels', labelEn: 'Institutional', iconName: 'handshake' },
  { id: 'professional', label: 'Professionnels', labelEn: 'Professional', iconName: 'users' },
  { id: 'international', label: 'Internationaux', labelEn: 'International', iconName: 'globe' }
]

export default function PartnersPage() {
  const { t, language } = useTranslation()

  const getPartnersByType = (type: string) => partners.filter(p => p.type === type)

  const currentLanguage = language || 'fr'
  
  const getLabel = (type: typeof partnerTypes[number]) => {
    if (currentLanguage === 'en') return type.labelEn
    if (currentLanguage === 'ar') return type.label
    return type.label
  }
  
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'handshake':
        return <HeartHandshake className="w-6 h-6" />
      case 'users':
        return <Users className="w-6 h-6" />
      case 'globe':
        return <Globe className="w-6 h-6" />
      default:
        return <HeartHandshake className="w-6 h-6" />
    }
  }
  
  // Helper pour obtenir les traductions de manière sécurisée
  const getTranslation = (key: string, fallback: string): string => {
    try {
      const translation = t(key)
      return typeof translation === 'string' ? translation : fallback
    } catch (error) {
      return fallback
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#333333' }}>
            {getTranslation('partners.title', 'Nos Partenaires')}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {getTranslation('partners.subtitle', 'Nous collaborons avec des organisations nationales et internationales pour promouvoir l\'excellence du tourisme')}
          </p>
        </motion.div>

        {partnerTypes.map((type, typeIndex) => {
          const typePartners = getPartnersByType(type.id)
          if (typePartners.length === 0) return null

          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: typeIndex * 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(204, 0, 0, 0.1)', color: '#CC0000' }}>
                  {renderIcon(type.iconName)}
                </div>
                <h2 className="text-3xl font-bold" style={{ color: '#CC0000' }}>
                  {getLabel(type)}
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {typePartners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-full h-24 flex items-center justify-center mb-4 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors duration-300">
                        <img
                          src={partner.logo}
                          alt={currentLanguage === 'fr' ? partner.name : partner.nameEn}
                          className="max-w-full max-h-full object-contain p-2"
                        />
                      </div>
                      <h3 className="text-sm font-semibold mb-2 line-clamp-2" style={{ color: '#CC0000' }}>
                        {currentLanguage === 'fr' ? partner.name : partner.nameEn}
                      </h3>
                      {partner.website && (
                        <a
                          href={`https://${partner.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-600 hover:text-red-600 transition-colors duration-300"
                        >
                          {partner.website}
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 rounded-2xl shadow-2xl p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #CC0000 0%, #B30000 100%)', color: 'white' }}
        >
          <h2 className="text-3xl font-bold mb-6">
            {getTranslation('partners.becomePartner', 'Devenez Partenaire')}
          </h2>
          <p className="text-xl mb-8 text-white opacity-90 max-w-2xl mx-auto">
            {getTranslation('partners.becomePartnerDesc', 'Rejoignez notre réseau de partenaires et contribuez au développement du tourisme')}
          </p>
          <a
            href="/join"
            className="inline-block px-8 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {getTranslation('partners.joinUs', 'Nous Rejoindre')}
          </a>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
