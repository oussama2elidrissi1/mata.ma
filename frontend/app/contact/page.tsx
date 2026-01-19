'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/lib/i18n'
import api from '@/lib/api'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Replace with actual API endpoint when backend is ready
      // await api.post('/contact', formData)
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: t('contactPage.info.email.title'),
      content: 'contact@mata.ma',
      link: 'mailto:contact@mata.ma'
    },
    {
      icon: Phone,
      title: t('contactPage.info.phone.title'),
      content: '+212 5 22 12 34 56',
      link: 'tel:+212522123456'
    },
    {
      icon: MapPin,
      title: t('contactPage.info.address.title'),
      content: t('contactPage.info.address.content'),
      link: null
    }
  ]

  const faqs = [
    {
      question: t('contactPage.faq.profile.question'),
      answer: t('contactPage.faq.profile.answer')
    },
    {
      question: t('contactPage.faq.services.question'),
      answer: t('contactPage.faq.services.answer')
    },
    {
      question: t('contactPage.faq.verification.question'),
      answer: t('contactPage.faq.verification.answer')
    }
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
            {t('contactPage.title')}
          </motion.h1>
          <motion.p
            variants={fadeIn('up', 0.3)}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            {t('contactPage.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeIn('up', 0.2 + index * 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(204, 0, 0, 0.1)' }}>
                    <IconComponent className="w-6 h-6" style={{ color: '#CC0000' }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-gray-600 hover:text-red-600 transition-colors">
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-gray-600">{info.content}</p>
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              variants={fadeIn('right', 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">{t('contactPage.form.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:border-red-600 transition-all"
                      placeholder={t('contactPage.form.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:border-red-600 transition-all"
                      placeholder={t('contactPage.form.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:border-red-600 transition-all"
                      placeholder={t('contactPage.form.subjectPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:border-red-600 transition-all resize-none"
                      placeholder={t('contactPage.form.messagePlaceholder')}
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                      {t('contact.form.success')}
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {t('contactPage.form.error')}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#CC0000' }}
                    onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#B30000')}
                    onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#CC0000')}
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}</span>
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn('left', 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">{t('contactPage.faq.title')}</h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg mb-2 flex items-start space-x-2">
                        <MessageSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#CC0000' }} />
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-gray-600 pl-7">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100" style={{ backgroundColor: 'rgba(204, 0, 0, 0.05)' }}>
                <h3 className="font-semibold text-lg mb-3">{t('contactPage.help.title')}</h3>
                <p className="text-gray-700 mb-4">
                  {t('contactPage.help.description')}
                </p>
                <a 
                  href="tel:+212522123456" 
                  className="inline-flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: '#CC0000' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B30000'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
                >
                  <Phone className="w-5 h-5" />
                  <span>{t('contactPage.help.call')}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
