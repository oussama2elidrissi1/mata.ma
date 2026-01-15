'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  FileText, 
  Search, 
  FileCheck, 
  UserCheck, 
  Award, 
  CheckCircle2, 
  Mail, 
  Lock,
  Upload,
  Shield,
  Clock,
  AlertCircle
} from 'lucide-react'

export default function AccreditationPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const process = [
    {
      icon: Search,
      title: 'Trouvez Votre Profil',
      description: 'Recherchez votre établissement dans notre annuaire en ligne. Si votre profil existe déjà (ajouté par l\'administration), vous pouvez directement demander l\'accréditation.',
      step: 1
    },
    {
      icon: FileText,
      title: 'Demande d\'Accréditation',
      description: 'Cliquez sur "Demander l\'accréditation" sur votre page de profil. Remplissez le formulaire avec vos informations personnelles, votre pièce d\'identité et téléchargez votre document d\'accréditation.',
      step: 2
    },
    {
      icon: Mail,
      title: 'Confirmation de Réception',
      description: 'Vous recevrez un email de confirmation confirmant que votre demande a bien été reçue et est en cours d\'examen par notre équipe.',
      step: 3
    },
    {
      icon: FileCheck,
      title: 'Évaluation par l\'Administration',
      description: 'Notre équipe d\'administration examine votre demande, vérifie vos documents et évalue votre établissement selon nos critères de qualité.',
      step: 4
    },
    {
      icon: UserCheck,
      title: 'Validation et Création de Compte',
      description: 'Si votre demande est approuvée, vous recevrez un email avec vos identifiants de connexion (email et mot de passe) pour accéder à votre espace personnel.',
      step: 5
    },
    {
      icon: Award,
      title: 'Gestion de Votre Profil',
      description: 'Une fois connecté, vous pouvez modifier vos informations, ajouter des photos, mettre à jour vos services et gérer votre profil professionnel.',
      step: 6
    }
  ]

  const criteria = [
    'Conformité aux standards de qualité du tourisme marocain',
    'Expérience professionnelle vérifiable dans le secteur touristique',
    'Infrastructure et équipements adéquats pour votre activité',
    'Service client de qualité et professionnalisme',
    'Respect des normes de sécurité et d\'hygiène',
    'Transparence financière et légale',
    'Engagement envers le développement durable du tourisme'
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Reconnaissance Officielle',
      description: 'Certification MATA reconnue dans le secteur du tourisme marocain, attestant de votre professionnalisme et de votre engagement qualité.'
    },
    {
      icon: Award,
      title: 'Visibilité Accrue',
      description: 'Présence dans notre annuaire officiel avec un badge "Accrédité", promotion auprès de nos partenaires et meilleure visibilité en ligne.'
    },
    {
      icon: Lock,
      title: 'Espace Personnel',
      description: 'Accès à votre espace personnel pour gérer votre profil, mettre à jour vos informations, ajouter des photos et suivre vos statistiques.'
    },
    {
      icon: CheckCircle2,
      title: 'Crédibilité Renforcée',
      description: 'Renforcez la confiance de vos clients avec le badge d\'accréditation MATA, symbole de qualité et de professionnalisme.'
    }
  ]

  const requirements = [
    {
      title: 'Pièce d\'Identité',
      description: 'Carte d\'identité nationale (CIN), passeport ou autre pièce d\'identité officielle valide.'
    },
    {
      title: 'Document d\'Accréditation',
      description: 'Document officiel attestant de votre activité (licence, autorisation, certificat, etc.) au format PDF, DOC, DOCX, JPG ou PNG (max 10MB).'
    },
    {
      title: 'Informations Complètes',
      description: 'Nom complet, email, téléphone, fonction/poste et message optionnel expliquant votre demande.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif tracking-tight drop-shadow-lg">
              Système d'Accréditation MATA
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Un processus simple et transparent pour obtenir votre accréditation et rejoindre notre réseau de professionnels certifiés du tourisme marocain
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
                Processus d'Accréditation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Suivez ces étapes simples pour obtenir votre accréditation MATA
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((step, index) => {
                const IconComponent = step.icon
                return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg p-8 border-2 transition-all duration-300 hover:shadow-xl cursor-pointer ${
                    activeStep === step.step
                      ? 'border-blue-900 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setActiveStep(activeStep === step.step ? null : step.step)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activeStep === step.step
                        ? 'bg-blue-900 text-white'
                        : 'bg-blue-100 text-blue-900'
                    } transition-colors`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full">
                          Étape {step.step}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className={`text-gray-600 leading-relaxed transition-all ${
                    activeStep === step.step ? 'block' : 'block'
                  }`}>
                    {step.description}
                  </p>
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
                Documents Requis
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Assurez-vous d'avoir tous les documents nécessaires avant de soumettre votre demande
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">
                    {req.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {req.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Criteria Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
                Critères d'Évaluation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Votre établissement sera évalué selon les critères suivants
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {criteria.map((criterion, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 leading-relaxed">{criterion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
                Avantages de l'Accréditation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Rejoignez notre réseau et bénéficiez de nombreux avantages
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-900 rounded-full mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <AlertCircle className="w-8 h-8 text-blue-900 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-2 font-serif">
                    Informations Importantes
                  </h3>
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                  <span><strong>Délai de traitement :</strong> Votre demande sera examinée dans les plus brefs délais. Vous serez notifié par email de la décision.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                  <span><strong>Une seule demande à la fois :</strong> Si vous avez déjà une demande en attente, vous ne pourrez pas en soumettre une nouvelle jusqu'à ce que la première soit traitée.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                  <span><strong>Communication par email :</strong> Toutes les communications se font par email. Assurez-vous de fournir une adresse email valide et de vérifier régulièrement votre boîte de réception.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                  <span><strong>Gestion de profil :</strong> Une fois accrédité, vous recevrez vos identifiants de connexion pour gérer votre profil et mettre à jour vos informations à tout moment.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif tracking-tight">
              Prêt à Obtenir Votre Accréditation ?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Rejoignez notre réseau de professionnels accrédités et bénéficiez de tous les avantages MATA pour développer votre activité touristique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/actors"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Search className="w-5 h-5" />
                Rechercher Mon Profil
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5" />
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
