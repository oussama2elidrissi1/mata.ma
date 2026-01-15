'use client'

import { useState, useRef } from 'react'
import { X, Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react'
import api from '@/lib/api'

interface AccreditationRequestModalProps {
  actorId: number
  actorName: string
  onClose: () => void
  onSuccess: () => void
}

export default function AccreditationRequestModal({
  actorId,
  actorName,
  onClose,
  onSuccess,
}: AccreditationRequestModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    position: '',
    identity_document_type: 'cin',
    identity_document_number: '',
    accreditation_number: '',
    message: '',
  })
  const [document, setDocument] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png']
      const maxSize = 10 * 1024 * 1024 // 10MB

      if (!validTypes.includes(file.type)) {
        setError('Format de fichier non supporté. Formats acceptés: PDF, DOC, DOCX, JPG, PNG')
        return
      }

      if (file.size > maxSize) {
        setError('Le fichier est trop volumineux. Taille maximale: 10MB')
        return
      }

      setDocument(file)
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!document) {
      setError('Veuillez télécharger le document d\'accréditation')
      setLoading(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('tourism_actor_id', actorId.toString())
      formDataToSend.append('full_name', formData.full_name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone || '')
      formDataToSend.append('position', formData.position || '')
      formDataToSend.append('identity_document_type', formData.identity_document_type)
      formDataToSend.append('identity_document_number', formData.identity_document_number)
      formDataToSend.append('accreditation_document', document)
      formDataToSend.append('message', formData.message || '')
      if (formData.accreditation_number) {
        formDataToSend.append('accreditation_number', formData.accreditation_number)
      }

      const response = await api.post('/accreditation-requests', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setSuccess(true)
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.errors?.accreditation_document?.[0] ||
        'Erreur lors de la soumission de la demande'
      
      setError(errorMessage)
      
      // Si c'est une erreur 409 (conflit - demande déjà en cours), fermer le modal après un délai
      if (err.response?.status === 409) {
        setTimeout(() => {
          onClose()
        }, 3000)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Demande d'Accréditation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Acteur:</span> {actorName}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Veuillez remplir le formulaire ci-dessous et télécharger le document d'accréditation fourni par l'État.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-600">
                Demande soumise avec succès ! Vous recevrez une confirmation par email.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nom complet */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                placeholder="Votre nom complet"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                placeholder="votre@email.com"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                placeholder="+212 6 XX XX XX XX"
              />
            </div>

            {/* Poste/Fonction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poste / Fonction
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                placeholder="Directeur, Gérant, etc."
              />
            </div>

            {/* Numéro d'accréditation (optionnel) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro d'accréditation (si vous en avez un)
              </label>
              <input
                type="text"
                value={formData.accreditation_number}
                onChange={(e) => setFormData({ ...formData, accreditation_number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                placeholder="MATA-XXXX-XXXX"
              />
            </div>

            {/* Type de pièce d'identité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de pièce d'identité <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.identity_document_type}
                onChange={(e) => setFormData({ ...formData, identity_document_type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
              >
                <option value="cin">Carte d'Identité Nationale (CIN)</option>
                <option value="passport">Passeport</option>
                <option value="other">Autre</option>
              </select>
            </div>

            {/* Numéro de pièce d'identité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de pièce d'identité <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.identity_document_number}
                onChange={(e) => setFormData({ ...formData, identity_document_number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                placeholder="AB12345"
              />
            </div>

            {/* Document d'accréditation */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document d'accréditation (fourni par l'État) <span className="text-red-500">*</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {document ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-8 h-8 text-green-500" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{document.name}</p>
                      <p className="text-sm text-gray-500">
                        {(document.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Cliquez pour sélectionner un fichier</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Formats acceptés: PDF, DOC, DOCX, JPG, PNG (max. 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (optionnel)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                placeholder="Informations complémentaires..."
              />
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
              disabled={loading || success}
              className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Envoi en cours...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Envoyé
                </>
              ) : (
                'Soumettre la demande'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
