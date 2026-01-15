'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react'
import api from '@/lib/api'
import { getAuthToken, isAuthenticated } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface ExcelImportModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function ExcelImportModal({ onClose, onSuccess }: ExcelImportModalProps) {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [defaultType, setDefaultType] = useState<string>('travel_agency')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [importResult, setImportResult] = useState<{
    total: number
    success: number
    errors: string[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Vérifier l'authentification au chargement
    if (!isAuthenticated()) {
      setError('Vous devez être connecté pour importer des acteurs. Redirection vers la page de connexion...')
      setTimeout(() => {
        router.push('/admin/login')
        onClose()
      }, 2000)
    }
  }, [router, onClose])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validExtensions = ['.xlsx', '.xls', '.csv']
      const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase()
      
      if (!validExtensions.includes(fileExtension)) {
        setError('Format de fichier non supporté. Veuillez utiliser un fichier Excel (.xlsx, .xls) ou CSV.')
        setFile(null)
        return
      }
      
      setFile(selectedFile)
      setError('')
      setSuccess('')
    }
  }

  const handleImport = async () => {
    if (!file) {
      setError('Veuillez sélectionner un fichier')
      return
    }

    // Vérifier l'authentification avant l'import
    if (!isAuthenticated()) {
      setError('Vous devez être connecté pour importer des acteurs.')
      setTimeout(() => {
        router.push('/admin/login')
        onClose()
      }, 2000)
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')
    setImportResult(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error('Token d\'authentification manquant')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('default_type', defaultType)

      // Ne pas définir Content-Type manuellement, axios le fera automatiquement avec le boundary
      // L'intercepteur axios ajoutera automatiquement le token
      const response = await api.post('/tourism-actors/import', formData)

      setImportResult(response.data.result)
      setSuccess(response.data.message || 'Import réussi')
      onSuccess()
    } catch (err: any) {
      let errorMessage = 'Erreur lors de l\'import du fichier'
      
      if (err.response?.data) {
        // Afficher le message d'erreur principal
        if (err.response.data.message) {
          errorMessage = err.response.data.message
        }
        
        // Ajouter les détails des erreurs de validation si présents
        if (err.response.data.errors) {
          const errorDetails: string[] = []
          Object.keys(err.response.data.errors).forEach((key) => {
            const fieldErrors = err.response.data.errors[key]
            if (Array.isArray(fieldErrors)) {
              errorDetails.push(...fieldErrors)
            } else {
              errorDetails.push(fieldErrors)
            }
          })
          if (errorDetails.length > 0) {
            errorMessage += '\n\n' + errorDetails.join('\n')
          }
        }
      }
      
      setError(errorMessage)
      if (err.response?.data?.result) {
        setImportResult(err.response.data.result)
      }
    } finally {
      setLoading(false)
    }
  }

  const downloadTemplate = () => {
    let template: string[][] = []
    let filename = 'template_import_acteurs.csv'

    // Générer le template selon le type sélectionné
    if (defaultType === 'travel_agency') {
      // Template pour agences de voyage
      template = [
        ['Dénomination Sociale', 'Ville', 'Adresse Agence', 'Type', 'Catégorie', 'Téléphone', 'Email', 'Site Web', 'Région', 'Description', 'Numéro Accréditation', 'Statut', 'Langue de travail'],
        ['AGENCE DE VOYAGES ALSUBHI', 'AGADIR', 'RUE DARAA N° 02 HAY AL QODS', 'travel_agency', 'standard', '+212 5 28 12 34 56', 'contact@alsubhi.ma', 'https://www.alsubhi.ma', 'Souss-Massa', 'Agence de voyages spécialisée', 'MATA-001', 'active', 'FR, AR'],
        ['KAOUTAR TOUR', 'AGADIR', '34 RUE DES ORANGERS', 'travel_agency', 'premium', '+212 5 28 98 76 54', 'info@kaoutartour.ma', 'https://www.kaoutartour.ma', 'Souss-Massa', 'Agence de voyages premium', 'MATA-002', 'active', 'FR, EN, AR'],
      ]
      filename = 'template_import_agences.csv'
    } else if (defaultType === 'tour_guide') {
      // Template pour guides touristiques
      template = [
        ['Nom', 'Prénom', 'Ville', 'Type', 'Catégorie', 'Téléphone', 'Email', 'Région', 'Description', 'Numéro Accréditation', 'Statut', 'Langue de travail'],
        ['AABIDI', 'Abdelhay', 'Azilal', 'tour_guide', 'Guide de Montagne', '+212 6 12 34 56 78', 'abdelhay@guide.ma', 'Béni Mellal-Khénifra', 'Guide touristique certifié', 'MATA-G-001', 'active', 'FR'],
        ['AACHA', 'Abdelhak', 'Marrakech', 'tour_guide', 'Guide du Tourisme', '+212 6 23 45 67 89', 'abdelhak@guide.ma', 'Marrakech-Safi', 'Guide professionnel', 'MATA-G-002', 'active', 'FR'],
        ['AACHAB', 'Reddad', 'Marrakech', 'tour_guide', 'Guide du Tourisme', '+212 6 34 56 78 90', 'reddad@guide.ma', 'Marrakech-Safi', 'Guide multilingue', 'MATA-G-003', 'active', 'FR, ITA'],
        ['AAFIF', 'Abderrahma', 'Casablanca', 'tour_guide', 'Guide du Tourisme', '+212 6 45 67 89 01', 'abderrahma@guide.ma', 'Casablanca-Settat', 'Guide expérimenté', 'MATA-G-004', 'active', 'ALL'],
        ['AAJLI', 'El Houcine', 'Rabat', 'tour_guide', 'Accompagnateur du Tourisme', '+212 6 56 78 90 12', 'elhoucine@guide.ma', 'Rabat-Salé-Kénitra', 'Accompagnateur certifié', 'MATA-G-005', 'active', 'ALL'],
      ]
      filename = 'template_import_guides.csv'
    } else {
      // Template générique pour autres types
      template = [
        ['Dénomination Sociale', 'Ville', 'Adresse Agence', 'Type', 'Catégorie', 'Téléphone', 'Email', 'Site Web', 'Région', 'Description', 'Numéro Accréditation', 'Statut', 'Langue de travail'],
        ['EXEMPLE ENTREPRISE', 'CASABLANCA', '123 RUE PRINCIPALE', defaultType, 'standard', '+212 5 22 12 34 56', 'contact@exemple.ma', 'https://www.exemple.ma', 'Casablanca-Settat', 'Description de l\'entreprise', 'MATA-001', 'active', 'FR, AR'],
      ]
      filename = 'template_import_acteurs.csv'
    }

    // Convertir en CSV pour le téléchargement
    const csvContent = template.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Importer des acteurs depuis Excel</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type d'acteur par défaut <span className="text-red-500">*</span>
            </label>
            <select
              value={defaultType}
              onChange={(e) => setDefaultType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
            >
              <option value="travel_agency">Agence de Voyage</option>
              <option value="tour_guide">Guide Touristique</option>
              <option value="hotel">Hôtel</option>
              <option value="restaurant">Restaurant</option>
              <option value="transport">Transport</option>
              <option value="attraction">Attraction</option>
              <option value="other">Autre</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Ce type sera appliqué à tous les acteurs du fichier si la colonne "Type" n'est pas présente dans le fichier Excel.
            </p>
          </div>

          {/* Instructions dynamiques selon le type */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Instructions :</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Le fichier doit être au format Excel (.xlsx, .xls) ou CSV</li>
              <li>La première ligne doit contenir les en-têtes de colonnes</li>
              {defaultType === 'travel_agency' ? (
                <>
                  <li><strong>Colonnes requises pour les agences :</strong></li>
                  <li className="ml-4">- <strong>Dénomination Sociale</strong></li>
                  <li className="ml-4">- <strong>Ville</strong></li>
                  <li className="ml-4">- <strong>Adresse Agence</strong> (ou <strong>Adresse</strong>)</li>
                  <li><strong>Colonnes optionnelles :</strong></li>
                  <li className="ml-4">- <strong>Type</strong>, <strong>Catégorie</strong>, <strong>Téléphone</strong>, <strong>Email</strong>, <strong>Site Web</strong>, <strong>Région</strong>, <strong>Description</strong></li>
                  <li className="ml-4">- <strong>Langue de travail</strong> (séparées par virgule : ex: "FR, EN, AR")</li>
                  <li className="ml-4">- <strong>Numéro Accréditation</strong>, <strong>Statut</strong></li>
                </>
              ) : defaultType === 'tour_guide' ? (
                <>
                  <li><strong>Colonnes requises pour les guides :</strong></li>
                  <li className="ml-4">- <strong>Nom</strong> (nom de famille)</li>
                  <li className="ml-4">- <strong>Prénom</strong> (sera combiné avec Nom pour créer le nom complet)</li>
                  <li className="ml-4">- <strong>Ville</strong></li>
                  <li><strong>Colonnes optionnelles :</strong></li>
                  <li className="ml-4">- <strong>Catégorie</strong> (ex: "Guide de Montagne", "Guide du Tourisme", "Accompagnateur du Tourisme")</li>
                  <li className="ml-4">- <strong>Langue de travail</strong> (séparées par virgule ou tiret : ex: "FR", "FR, EN", "FR-ANG ALL")</li>
                  <li className="ml-4">- <strong>Téléphone</strong>, <strong>Email</strong>, <strong>Région</strong>, <strong>Description</strong></li>
                  <li className="ml-4">- <strong>Numéro Accréditation</strong>, <strong>Statut</strong></li>
                  <li className="ml-4">- <strong>Adresse</strong> (optionnel, sera générée automatiquement si absente)</li>
                </>
              ) : (
                <>
                  <li><strong>Colonnes requises :</strong></li>
                  <li className="ml-4">- <strong>Dénomination Sociale</strong> OU <strong>Nom</strong> (ou les deux : <strong>Nom</strong> + <strong>Prénom</strong>)</li>
                  <li className="ml-4">- <strong>Ville</strong></li>
                  <li><strong>Colonnes optionnelles :</strong></li>
                  <li className="ml-4">- <strong>Prénom</strong>, <strong>Adresse</strong>, <strong>Type</strong>, <strong>Catégorie</strong></li>
                  <li className="ml-4">- <strong>Téléphone</strong>, <strong>Email</strong>, <strong>Site Web</strong>, <strong>Région</strong>, <strong>Description</strong></li>
                  <li className="ml-4">- <strong>Langue de travail</strong>, <strong>Numéro Accréditation</strong>, <strong>Statut</strong></li>
                </>
              )}
              <li>La colonne "Type" est optionnelle. Si absente, le type sélectionné ci-dessus sera appliqué à tous les acteurs.</li>
              <li>Si la colonne "Type" existe dans le fichier, elle sera utilisée en priorité.</li>
              <li>Statuts possibles : active, inactive, pending, suspended</li>
            </ul>
            <button
              onClick={downloadTemplate}
              className="mt-3 text-sm text-blue-900 hover:text-blue-700 underline flex items-center gap-1"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Télécharger le modèle Excel pour {defaultType === 'travel_agency' ? 'les Agences' : defaultType === 'tour_guide' ? 'les Guides' : 'les Acteurs'}
            </button>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sélectionner le fichier Excel
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileSpreadsheet className="w-8 h-8 text-green-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Cliquez pour sélectionner un fichier</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Formats acceptés : .xlsx, .xls, .csv
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-600 font-medium">Erreur</p>
                <div className="text-sm text-red-600 whitespace-pre-line">{error}</div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-green-600 font-medium">Succès</p>
                <p className="text-sm text-green-600">{success}</p>
              </div>
            </div>
          )}

          {/* Import Results */}
          {importResult && (
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Résultats de l'import :</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-medium">Total :</span> {importResult.total} ligne(s)
                </p>
                <p className="text-green-600">
                  <span className="font-medium">Réussis :</span> {importResult.success} acteur(s)
                </p>
                {importResult.errors.length > 0 && (
                  <div>
                    <p className="font-medium text-red-600 mb-1">
                      Erreurs ({importResult.errors.length}) :
                    </p>
                    <ul className="list-disc list-inside text-red-600 space-y-1">
                      {importResult.errors.slice(0, 10).map((error, index) => (
                        <li key={index} className="text-xs">{error}</li>
                      ))}
                      {importResult.errors.length > 10 && (
                        <li className="text-xs italic">
                          ... et {importResult.errors.length - 10} autre(s) erreur(s)
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={handleImport}
              disabled={loading || !file}
              className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Import en cours...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Importer
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
