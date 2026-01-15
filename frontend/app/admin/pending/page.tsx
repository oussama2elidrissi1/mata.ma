'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, Clock, Award, AlertCircle, Download, User, Mail, Phone, FileText } from 'lucide-react'
import api from '@/lib/api'
import AdminHeader from '@/components/admin/AdminHeader'

interface AccreditationRequestData {
  id: number
  request_id?: number
  name: string
  type: string
  city: string
  region: string
  address?: string
  phone?: string
  email?: string
  accreditation_number?: string
  description?: string
  created_at: string
  request?: {
    id: number
    full_name: string
    email: string
    phone?: string
    position?: string
    identity_document_type: string
    identity_document_number: string
    accreditation_document?: string
    message?: string
    status: string
    created_at: string
  }
}

export default function PendingAccreditationsPage() {
  const [requests, setRequests] = useState<AccreditationRequestData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<AccreditationRequestData | null>(null)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [accreditationNumber, setAccreditationNumber] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    setLoading(true)
    try {
      const response = await api.get('/accreditations?per_page=100')
      setRequests(response.data.data)
    } catch (error) {
      console.error('Error loading accreditation requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (withBadge: boolean = true) => {
    if (!selectedRequest) return

    try {
      if (withBadge) {
        await api.post(`/accreditations/${selectedRequest.id}/approve`, {
          accreditation_number: accreditationNumber || undefined,
          accreditation_date: new Date().toISOString().split('T')[0],
          accreditation_expiry: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        })
      } else {
        await api.post(`/accreditations/${selectedRequest.id}/approve-without-badge`)
      }
      alert('Demande approuvée avec succès. Un email a été envoyé à l\'acteur avec ses identifiants de connexion.')
      setShowApproveModal(false)
      setSelectedRequest(null)
      setAccreditationNumber('')
      loadRequests()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de l\'approbation')
    }
  }

  const handleReject = async () => {
    if (!selectedRequest) return

    try {
      await api.post(`/accreditations/${selectedRequest.id}/reject`, {
        rejection_reason: rejectionReason,
      })
      alert('Demande rejetée avec succès.')
      setShowRejectModal(false)
      setSelectedRequest(null)
      setRejectionReason('')
      loadRequests()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors du rejet')
    }
  }

  const downloadDocument = (documentPath: string) => {
    if (documentPath) {
      const url = documentPath.startsWith('http') 
        ? documentPath 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${documentPath}`
      window.open(url, '_blank')
    }
  }

  const getDocumentUrl = (documentPath: string | undefined): string => {
    if (!documentPath) return ''
    return documentPath.startsWith('http') 
      ? documentPath 
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${documentPath}`
  }

  const typeLabels: Record<string, string> = {
    hotel: 'Hôtel',
    restaurant: 'Restaurant',
    travel_agency: 'Agence de Voyage',
    tour_guide: 'Guide Touristique',
    transport: 'Transport',
    attraction: 'Attraction',
    other: 'Autre',
  }

  const identityTypes: Record<string, string> = {
    cin: 'Carte d\'Identité Nationale',
    passport: 'Passeport',
    other: 'Autre',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Demandes d'Accréditation en Attente"
        subtitle="Approuver ou rejeter les demandes d'accréditation"
        actions={
          <div className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold">
            {requests.length} demande{requests.length > 1 ? 's' : ''} en attente
          </div>
        }
      />

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des données...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">Aucune demande d'accréditation en attente</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{request.name}</h3>
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {typeLabels[request.type] || request.type}
                      </span>
                      {request.accreditation_number && (
                        <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Demande avec badge
                        </span>
                      )}
                    </div>

                    {/* Informations du demandeur */}
                    {request.request && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Informations du demandeur
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-700" />
                            <span className="text-gray-700"><strong>Nom:</strong> {request.request.full_name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-700" />
                            <span className="text-gray-700"><strong>Email:</strong> {request.request.email}</span>
                          </div>
                          {request.request.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-blue-700" />
                              <span className="text-gray-700"><strong>Téléphone:</strong> {request.request.phone}</span>
                            </div>
                          )}
                          {request.request.position && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-700"><strong>Poste:</strong> {request.request.position}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-gray-700">
                              <strong>Pièce d'identité:</strong> {identityTypes[request.request.identity_document_type]} - {request.request.identity_document_number}
                            </span>
                          </div>
                        </div>
                        {request.request.accreditation_document && (
                          <div className="mt-4">
                            <h5 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Document d'accréditation
                            </h5>
                            <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
                              {/* Aperçu du document */}
                              <div className="mb-3">
                                {(() => {
                                  const docUrl = getDocumentUrl(request.request.accreditation_document)
                                  const documentPath = request.request.accreditation_document || ''
                                  const fileExtension = documentPath.split('.').pop()?.toLowerCase()
                                  
                                  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension || '')) {
                                    return (
                                      <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                        <img
                                          src={docUrl}
                                          alt="Document d'accréditation"
                                          className="w-full h-auto max-h-96 object-contain"
                                          onError={(e) => {
                                            e.currentTarget.style.display = 'none'
                                            e.currentTarget.nextElementSibling?.classList.remove('hidden')
                                          }}
                                        />
                                        <div className="hidden p-8 text-center text-gray-500">
                                          <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                          <p>Impossible d'afficher l'image</p>
                                        </div>
                                      </div>
                                    )
                                  } else if (fileExtension === 'pdf') {
                                    return (
                                      <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                        <iframe
                                          src={docUrl}
                                          className="w-full h-96"
                                          title="Document d'accréditation PDF"
                                        />
                                      </div>
                                    )
                                  } else {
                                    return (
                                      <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
                                        <FileText className="w-16 h-16 mx-auto mb-3 text-blue-600" />
                                        <p className="text-sm text-gray-600 mb-2">
                                          Type de fichier: <strong>{fileExtension?.toUpperCase()}</strong>
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          Utilisez le bouton de téléchargement pour ouvrir le document
                                        </p>
                                      </div>
                                    )
                                  }
                                })()}
                              </div>
                              
                              {/* Bouton de téléchargement */}
                              <button
                                onClick={() => downloadDocument(request.request!.accreditation_document!)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
                              >
                                <Download className="w-4 h-4" />
                                Télécharger le document
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Informations de l'acteur */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">Ville:</span> {request.city}, {request.region}
                      </div>
                      {request.address && (
                        <div>
                          <span className="font-medium">Adresse:</span> {request.address}
                        </div>
                      )}
                      {request.phone && (
                        <div>
                          <span className="font-medium">Téléphone:</span> {request.phone}
                        </div>
                      )}
                      {request.email && (
                        <div>
                          <span className="font-medium">Email:</span> {request.email}
                        </div>
                      )}
                      {request.accreditation_number && (
                        <div>
                          <span className="font-medium">Numéro demandé:</span> {request.accreditation_number}
                        </div>
                      )}
                    </div>

                    {request.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{request.description}</p>
                    )}

                    {request.request?.message && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Message du demandeur:</strong> {request.request.message}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-4 h-4" />
                      Demande créée le {new Date(request.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <button
                      onClick={() => {
                        setSelectedRequest(request)
                        setAccreditationNumber(request.accreditation_number || '')
                        setShowApproveModal(true)
                      }}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approuver
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRequest(request)
                        setShowRejectModal(true)
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 whitespace-nowrap font-medium"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejeter
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRequest(request)
                        if (confirm('Approuver cet acteur sans badge d\'accréditation ?')) {
                          handleApprove(false)
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap text-sm font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Sans badge
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approve Modal */}
      {showApproveModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Approuver la demande</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro d'accréditation
                </label>
                <input
                  type="text"
                  value={accreditationNumber}
                  onChange={(e) => setAccreditationNumber(e.target.value)}
                  placeholder="MATA-XXXX-XXXX (optionnel)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Si vide, un numéro sera généré automatiquement
                </p>
              </div>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>⚠️ Important:</strong> Un email sera automatiquement envoyé à <strong>{selectedRequest.request?.email || selectedRequest.email}</strong> avec les identifiants de connexion (email et mot de passe) pour accéder à son espace de gestion.
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowApproveModal(false)
                    setSelectedRequest(null)
                    setAccreditationNumber('')
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleApprove(true)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Approuver avec badge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Rejeter la demande</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Raison du rejet (optionnel)
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  placeholder="Expliquez la raison du rejet..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false)
                    setSelectedRequest(null)
                    setRejectionReason('')
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Rejeter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
