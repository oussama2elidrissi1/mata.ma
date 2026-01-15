'use client'

import { Target, Users, Award, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/lib/i18n'
import Link from 'next/link'

export default function About() {
  const { t } = useTranslation()

  const values = [
    {
      icon: Target,
      title: t('about.mission'),
      description: t('about.missionDesc')
    },
    {
      icon: Users,
      title: t('about.community'),
      description: t('about.communityDesc')
    },
    {
      icon: Award,
      title: t('about.commitment'),
      description: t('about.commitmentDesc')
    },
    {
      icon: TrendingUp,
      title: t('about.vision'),
      description: t('about.visionDesc')
    }
  ]

  const stats = [
    { value: '2500+', label: t('about.stats.professionals') },
    { value: '150+', label: t('about.stats.cities') },
    { value: '1200+', label: t('about.stats.resources') },
    { value: '50+', label: t('about.stats.events') }
  ]

  const team = [
    { name: 'Marie Dubois', role: t('about.team.director'), image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Jean Martin', role: t('about.team.technical'), image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
    { name: 'Sophie Laurent', role: t('about.team.community'), image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
    { name: 'Pierre Rousseau', role: t('about.team.content'), image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-20 mt-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-4 text-center"
        >
          <motion.h1
            variants={fadeIn('up', 0.2)}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {t('about.title')}
          </motion.h1>
          <motion.p
            variants={fadeIn('up', 0.3)}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            {t('about.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.2 + index * 0.1)}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2" style={{ color: '#CC0000' }}>{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeIn('up', 0.2 + index * 0.1)}
                  className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(204, 0, 0, 0.1)' }}>
                    <IconComponent className="w-6 h-6" style={{ color: '#CC0000' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{t('about.history.title')}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.history.description')}
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mb-12"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">{t('about.values.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[t('about.values.reliability'), t('about.values.collaboration'), t('about.values.innovation')].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(204, 0, 0, 0.1)' }}>
                    <span className="text-2xl font-bold" style={{ color: '#CC0000' }}>{index + 1}</span>
                  </div>
                  <h4 className="font-semibold text-lg">{value}</h4>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">{t('about.team.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', 0.2 + index * 0.1)}
                  className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ backgroundColor: '#CC0000' }}>
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">{t('about.joinUs.title')}</h2>
          <p className="text-red-100 mb-8 text-lg">
            {t('about.joinUs.description')}
          </p>
          <Link 
            href="/join"
            className="inline-block px-8 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            {t('about.joinUs.button')}
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
