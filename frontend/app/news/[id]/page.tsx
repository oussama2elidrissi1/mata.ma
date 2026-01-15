'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fetchNewsArticle, fetchNews } from '@/lib/api'
import { News } from '@/types'

const NewsDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const id = parseInt(params.id as string)
  const [article, setArticle] = useState<News | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadArticle()
      loadRelatedArticles()
    }
  }, [id])

  const loadArticle = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchNewsArticle(id)
      setArticle(data)
    } catch (err: any) {
      console.error('Error loading article:', err)
      setError('Article non trouvé')
    } finally {
      setLoading(false)
    }
  }

  const loadRelatedArticles = async () => {
    try {
      const params = new URLSearchParams()
      params.append('status', 'published')
      params.append('per_page', '4')
      params.append('sort_by', 'published_at')
      params.append('sort_direction', 'desc')
      const data = await fetchNews(params.toString())
      // Exclure l'article actuel
      const related = data.filter(a => a.id !== id).slice(0, 3)
      setRelatedArticles(related)
    } catch (err) {
      console.error('Error loading related articles:', err)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papiers')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Chargement de l'article...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: '#333333' }}>
              Article non trouvé
            </h2>
            <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium" style={{ backgroundColor: '#CC0000' }}>
              <ArrowLeft className="w-5 h-5" />
              Retour aux actualités
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/news"
              className="inline-flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour aux actualités</span>
            </Link>
          </div>

          {/* Article */}
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
            <div className="relative h-96 bg-gray-200">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', article.image)
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-500">Image non disponible</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full mb-4 inline-block">
                  {article.category}
                </span>
                <h1 className="text-4xl font-serif font-bold text-white">
                  {article.title}
                </h1>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.published_at || article.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Partager</span>
                </button>
              </div>

              <div className="prose max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  {article.excerpt}
                </p>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {article.content.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="text-base leading-7">{paragraph}</p>
                    )
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-bold mb-8 tracking-tight" style={{ color: '#333333' }}>
                Articles Connexes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.id}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="relative h-40 overflow-hidden bg-gray-200">
                      {related.image ? (
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            console.error('Image failed to load:', related.image)
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300" style={{ color: '#333333' }}>
                        {related.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NewsDetailPage
