'use client'

import { useState, useEffect } from 'react'
import { Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fetchNews } from '@/lib/api'
import { News } from '@/types'

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      params.append('status', 'published')
      params.append('per_page', '50')
      params.append('sort_by', 'published_at')
      params.append('sort_direction', 'desc')
      const data = await fetchNews(params.toString())
      console.log('News loaded:', data)
      console.log('First article image:', data[0]?.image)
      setNews(data)
    } catch (err: any) {
      console.error('Error loading news:', err)
      setError('Erreur lors du chargement des actualités')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const featuredArticle = news.length > 0 ? news[0] : null
  const otherArticles = news.slice(1)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight" style={{ color: '#333333' }}>
              Actualités MATA
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#333333' }}>
              Restez informé des dernières nouvelles et initiatives de MATA
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Chargement des actualités...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <div className="mb-12">
                  <Link href={`/news/${featuredArticle.id}`} className="block group">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative h-96 lg:h-auto overflow-hidden">
                          <img
                            src={featuredArticle.image || 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'}
                            alt={featuredArticle.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'
                            }}
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                              {featuredArticle.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(featuredArticle.published_at || featuredArticle.created_at)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>{featuredArticle.author}</span>
                            </div>
                          </div>
                          <h2 className="text-3xl font-serif font-bold mb-4 group-hover:text-primary transition-colors duration-300" style={{ color: '#333333' }}>
                            {featuredArticle.title}
                          </h2>
                          <p className="text-gray-600 mb-6 line-clamp-3">
                            {featuredArticle.excerpt}
                          </p>
                          <div className="flex items-center space-x-2 text-primary font-medium group-hover:text-primary/80 transition-colors duration-300">
                            <span>Lire la suite</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Other Articles Grid */}
              {otherArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherArticles.map((article) => (
                    <Link key={article.id} href={`/news/${article.id}`} className="block group">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                          {article.image ? (
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                console.error('Image failed to load:', article.image)
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">Image non disponible</span>
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(article.published_at || article.created_at)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{article.author}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2" style={{ color: '#333333' }}>
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center space-x-2 text-primary font-medium text-sm group-hover:text-primary/80 transition-colors duration-300">
                            <span>Lire la suite</span>
                            <ArrowRight className="w-3 h-3 transform group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {news.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Aucun article disponible pour le moment</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NewsPage
