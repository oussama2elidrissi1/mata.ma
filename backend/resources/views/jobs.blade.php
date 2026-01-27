@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-white">
    <!-- Header Banner -->
    <section class="relative bg-gradient-to-br from-red-900 via-red-800 to-red-950 text-white py-20 mt-16">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif tracking-tight drop-shadow-lg" data-i18n="jobsSystemTitle">
                Plateforme Emploi & Carrières MATA
            </h1>
            <p class="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed" data-i18n="jobsSystemSubtitle">
                Une plateforme simple et transparente pour connecter les talents aux opportunités dans le secteur touristique marocain
            </p>
        </div>
    </section>

    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-gray-50 to-white py-20">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsPageTitle">
                Emploi & Carrières
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsPageSubtitle">
                Découvrez les opportunités d'emploi dans le secteur touristique marocain et développez votre carrière avec MATA.
            </p>
            
            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                    onclick="handleCandidateAction()"
                    class="px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    style="background-color: #CC0000; color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; min-width: 250px;"
                    data-i18n="candidateButton"
                >
                    Candidat : Déposez votre CV
                </button>
                <button 
                    onclick="handleRecruiterAction()"
                    class="px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2"
                    style="background-color: white; color: #CC0000; border-color: #CC0000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; min-width: 250px;"
                    data-i18n="recruiterButton"
                >
                    Recruteur : Publiez une annonce
                </button>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Introduction -->
            <div class="mb-16">
                <div class="prose prose-lg max-w-none">
                    <p class="text-gray-700 leading-relaxed mb-6" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 18px; line-height: 1.8;" data-i18n="jobsIntro">
                        MATA connecte les talents aux opportunités dans le secteur touristique marocain. Que vous soyez un professionnel expérimenté ou à la recherche de votre premier emploi, notre plateforme vous aide à trouver la position idéale qui correspond à vos compétences et aspirations.
                    </p>
                </div>
            </div>

            <!-- Job Categories -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Category 1 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsHospitality">
                        Hôtellerie & Restauration
                    </h3>
                    <p class="text-gray-600 leading-relaxed mb-4" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsHospitalityDesc">
                        Postes dans les hôtels, riads, restaurants et établissements d'hébergement touristique.
                    </p>
                    <ul class="text-sm text-gray-500 space-y-1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
                        <li>• Directeur d'hôtel</li>
                        <li>• Chef de cuisine</li>
                        <li>• Responsable réception</li>
                        <li>• Serveur / Serveuse</li>
                    </ul>
                </div>

                <!-- Category 2 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsTravelAgencies">
                        Agences de Voyage
                    </h3>
                    <p class="text-gray-600 leading-relaxed mb-4" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsTravelAgenciesDesc">
                        Opportunités dans les agences de voyage, tour-opérateurs et services de réservation.
                    </p>
                    <ul class="text-sm text-gray-500 space-y-1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
                        <li>• Conseiller en voyages</li>
                        <li>• Responsable commercial</li>
                        <li>• Chef de produit</li>
                        <li>• Agent de réservation</li>
                    </ul>
                </div>

                <!-- Category 3 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsTourGuide">
                        Guide Touristique
                    </h3>
                    <p class="text-gray-600 leading-relaxed mb-4" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsTourGuideDesc">
                        Postes pour guides touristiques certifiés et accompagnateurs de voyage.
                    </p>
                    <ul class="text-sm text-gray-500 space-y-1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
                        <li>• Guide touristique</li>
                        <li>• Accompagnateur</li>
                        <li>• Animateur culturel</li>
                        <li>• Guide spécialisé</li>
                    </ul>
                </div>

                <!-- Category 4 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsEventManagement">
                        Événementiel & Animation
                    </h3>
                    <p class="text-gray-600 leading-relaxed mb-4" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsEventManagementDesc">
                        Carrières dans l'organisation d'événements, l'animation et les activités touristiques.
                    </p>
                    <ul class="text-sm text-gray-500 space-y-1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
                        <li>• Organisateur d'événements</li>
                        <li>• Animateur</li>
                        <li>• Coordinateur activités</li>
                        <li>• Responsable événementiel</li>
                    </ul>
                </div>

                <!-- Category 5 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsMarketing">
                        Marketing & Communication
                    </h3>
                    <p class="text-gray-600 leading-relaxed mb-4" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsMarketingDesc">
                        Postes en marketing digital, communication et promotion touristique.
                    </p>
                    <ul class="text-sm text-gray-500 space-y-1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
                        <li>• Responsable marketing</li>
                        <li>• Community manager</li>
                        <li>• Chargé de communication</li>
                        <li>• Chef de projet digital</li>
                    </ul>
                </div>

                <!-- Category 6 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsTraining">
                        Formation & Management
                    </h3>
                    <p class="text-gray-600 leading-relaxed mb-4" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="jobsTrainingDesc">
                        Opportunités dans la formation professionnelle et le management du tourisme.
                    </p>
                    <ul class="text-sm text-gray-500 space-y-1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
                        <li>• Formateur</li>
                        <li>• Directeur de formation</li>
                        <li>• Consultant</li>
                        <li>• Chef de projet</li>
                    </ul>
                </div>
            </div>

            <!-- How It Works -->
            <div class="bg-gray-50 rounded-xl p-12 mb-16 border border-gray-200">
                <h2 class="text-3xl font-bold mb-8 text-center" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="howItWorks">
                    Comment ça fonctionne ?
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #CC0000;">
                            <span class="text-2xl font-bold text-white">1</span>
                        </div>
                        <h3 class="text-lg font-semibold mb-2" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="createProfile">
                            Créez votre profil
                        </h3>
                        <p class="text-gray-600" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="createProfileDesc">
                            Inscrivez-vous et complétez votre profil avec vos compétences et expériences.
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #CC0000;">
                            <span class="text-2xl font-bold text-white">2</span>
                        </div>
                        <h3 class="text-lg font-semibold mb-2" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="exploreOffers">
                            Explorez les offres
                        </h3>
                        <p class="text-gray-600" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="exploreOffersDesc">
                            Parcourez les opportunités d'emploi correspondant à votre profil et vos aspirations.
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #CC0000;">
                            <span class="text-2xl font-bold text-white">3</span>
                        </div>
                        <h3 class="text-lg font-semibold mb-2" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="apply">
                            Postulez
                        </h3>
                        <p class="text-gray-600" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="applyDesc">
                            Candidature directement auprès des employeurs membres de l'écosystème MATA.
                        </p>
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="bg-gray-50 rounded-xl p-12 text-center border border-gray-200">
                <h2 class="text-3xl font-bold mb-4" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="readyToStart">
                    Prêt à démarrer votre carrière ?
                </h2>
                <p class="text-gray-600 mb-8 max-w-2xl mx-auto" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="readyToStartDesc">
                    Rejoignez notre réseau de professionnels et accédez aux meilleures opportunités d'emploi dans le secteur touristique marocain.
                </p>
                <a href="{{ route('contact') }}" class="inline-block px-8 py-4 rounded-lg text-white font-semibold transition-colors hover:opacity-90" style="background-color: #CC0000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="contactUs">
                    Nous Contacter
                </a>
            </div>
        </div>
    </section>
</div>

<!-- Modal d'authentification candidat (Inscription + Connexion) -->
<div id="candidate-auth-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold" style="color: #1a1a1a;" data-i18n="candidateAuthTitle">Espace Candidat</h2>
                <button onclick="closeCandidateAuthModal()" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- Tabs -->
            <div class="flex border-b border-gray-200 mb-6">
                <button 
                    id="register-tab"
                    onclick="switchAuthTab('register')"
                    class="flex-1 px-4 py-2 text-center font-semibold transition-colors"
                    style="color: #CC0000; border-bottom: 2px solid #CC0000;"
                    data-i18n="register"
                >
                    S'inscrire
                </button>
                <button 
                    id="login-tab"
                    onclick="switchAuthTab('login')"
                    class="flex-1 px-4 py-2 text-center font-semibold transition-colors text-gray-600 hover:text-gray-900"
                    data-i18n="login"
                >
                    Se connecter
                </button>
            </div>

            <!-- Contenu Inscription -->
            <div id="register-content">
                <form id="candidate-register-form" onsubmit="handleCandidateRegister(event)">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2" style="color: #333333;" data-i18n="fullName">Nom complet</label>
                        <input 
                            type="text" 
                            name="name" 
                            required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Votre nom complet"
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2" style="color: #333333;" data-i18n="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="votre@email.com"
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2" style="color: #333333;" data-i18n="password">Mot de passe</label>
                        <input 
                            type="password" 
                            name="password" 
                            required
                            minlength="8"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Minimum 8 caractères"
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2" style="color: #333333;" data-i18n="confirmPassword">Confirmer le mot de passe</label>
                        <input 
                            type="password" 
                            name="password_confirmation" 
                            required
                            minlength="8"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Répétez le mot de passe"
                        >
                    </div>
                </div>
                
                <div id="candidate-register-error" class="hidden mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"></div>
                
                    <div class="mt-6 flex gap-3">
                        <button 
                            type="button"
                            onclick="closeCandidateAuthModal()"
                            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            data-i18n="cancel"
                        >
                            Annuler
                        </button>
                        <button 
                            type="submit"
                            class="flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-colors hover:opacity-90"
                            style="background-color: #CC0000;"
                            data-i18n="register"
                        >
                            S'inscrire
                        </button>
                    </div>
                </form>
            </div>

            <!-- Contenu Connexion -->
            <div id="login-content" class="hidden">
                <form id="candidate-login-form" onsubmit="handleCandidateLogin(event)">
                    <div id="candidate-login-error" class="hidden mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"></div>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-2" style="color: #333333;" data-i18n="email">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                required
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="votre@email.com"
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2" style="color: #333333;" data-i18n="password">Mot de passe</label>
                            <input 
                                type="password" 
                                name="password" 
                                required
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Votre mot de passe"
                            >
                        </div>
                    </div>
                    
                    <div class="mt-6 flex gap-3">
                        <button 
                            type="button"
                            onclick="closeCandidateAuthModal()"
                            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            data-i18n="cancel"
                        >
                            Annuler
                        </button>
                        <button 
                            type="submit"
                            class="flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-colors hover:opacity-90"
                            style="background-color: #CC0000;"
                            data-i18n="login"
                        >
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    function checkActorAuth() {
        const token = localStorage.getItem('auth_token');
        const userStr = localStorage.getItem('auth_user');
        
        if (!token || !userStr) {
            return false;
        }
        
        try {
            const user = JSON.parse(userStr);
            return user.role === 'actor';
        } catch (e) {
            return false;
        }
    }

    function checkCandidateAuth() {
        const token = localStorage.getItem('auth_token');
        const userStr = localStorage.getItem('auth_user');
        
        if (!token || !userStr) {
            return false;
        }
        
        try {
            const user = JSON.parse(userStr);
            return user.role === 'user';
        } catch (e) {
            return false;
        }
    }

    let currentAuthTab = 'register'; // 'register' ou 'login'

    function openCandidateAuthModal() {
        currentAuthTab = 'register';
        document.getElementById('candidate-auth-modal').classList.remove('hidden');
        switchAuthTab('register');
    }

    function closeCandidateAuthModal() {
        document.getElementById('candidate-auth-modal').classList.add('hidden');
        document.getElementById('candidate-register-form').reset();
        document.getElementById('candidate-login-form').reset();
        document.getElementById('candidate-register-error').classList.add('hidden');
        document.getElementById('candidate-login-error').classList.add('hidden');
    }

    function switchAuthTab(tab) {
        currentAuthTab = tab;
        const registerTab = document.getElementById('register-tab');
        const loginTab = document.getElementById('login-tab');
        const registerContent = document.getElementById('register-content');
        const loginContent = document.getElementById('login-content');

        if (tab === 'register') {
            registerTab.style.color = '#CC0000';
            registerTab.style.borderBottom = '2px solid #CC0000';
            loginTab.style.color = '#6B7280';
            loginTab.style.borderBottom = 'none';
            registerContent.classList.remove('hidden');
            loginContent.classList.add('hidden');
        } else {
            loginTab.style.color = '#CC0000';
            loginTab.style.borderBottom = '2px solid #CC0000';
            registerTab.style.color = '#6B7280';
            registerTab.style.borderBottom = 'none';
            loginContent.classList.remove('hidden');
            registerContent.classList.add('hidden');
        }
    }

    function openCandidateModal() {
        openCandidateAuthModal();
        switchAuthTab('register');
    }

    async function handleCandidateRegister(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const errorDiv = document.getElementById('candidate-register-error');
        
        // Vérifier que les mots de passe correspondent
        if (formData.get('password') !== formData.get('password_confirmation')) {
            errorDiv.textContent = 'Les mots de passe ne correspondent pas.';
            errorDiv.classList.remove('hidden');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    password_confirmation: formData.get('password_confirmation'),
                    role: 'user'
                })
            });

            const data = await response.json();

            if (data.success) {
                // Fermer le modal en cas de succès
                closeCandidateAuthModal();
                // Connecter automatiquement l'utilisateur
                const loginResponse = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.get('email'),
                        password: formData.get('password')
                    })
                });

                const loginData = await loginResponse.json();
                
                if (loginData.success) {
                    localStorage.setItem('auth_token', loginData.data.token);
                    localStorage.setItem('auth_user', JSON.stringify(loginData.data.user));
                    
                    // Rediriger vers la page candidat
                    window.location.href = '{{ route("candidate.dashboard") }}';
                } else {
                    errorDiv.textContent = loginData.message || 'Erreur lors de la connexion automatique.';
                    errorDiv.classList.remove('hidden');
                }
            } else {
                // Afficher les erreurs de validation détaillées
                let errorMessage = data.message || 'Une erreur est survenue lors de l\'inscription.';
                
                // Utiliser error_messages si disponible (messages traduits)
                if (data.error_messages && data.error_messages.length > 0) {
                    errorMessage = data.error_messages.join('<br>');
                } else if (data.errors) {
                    // Sinon, utiliser les erreurs brutes
                    const errorList = Object.values(data.errors).flat();
                    if (errorList.length > 0) {
                        // Traduire les erreurs communes
                        errorMessage = errorList.map(err => {
                            if (err.includes('email') && err.includes('unique')) {
                                return 'Cet email est déjà utilisé. Veuillez utiliser un autre email ou vous connecter.';
                            } else if (err.includes('password') && err.includes('confirmed')) {
                                return 'Les mots de passe ne correspondent pas.';
                            } else if (err.includes('password') && err.includes('min')) {
                                return 'Le mot de passe doit contenir au moins 8 caractères.';
                            }
                            return err;
                        }).join('<br>');
                    }
                }
                
                errorDiv.innerHTML = errorMessage;
                errorDiv.classList.remove('hidden');
                
                // Si l'email existe déjà, proposer de se connecter
                const isEmailUniqueError = data.is_email_unique_error || 
                    (errorMessage.includes('email') && 
                     (errorMessage.includes('déjà utilisé') || 
                      errorMessage.includes('unique') || 
                      errorMessage.includes('already been taken'))) ||
                    (data.errors && data.errors.email && 
                     Array.isArray(data.errors.email) && 
                     data.errors.email.some(e => e.toLowerCase().includes('unique')));
                
                if (isEmailUniqueError) {
                    // Basculer automatiquement vers l'onglet connexion
                    setTimeout(() => {
                        switchAuthTab('login');
                        // Pré-remplir l'email dans le formulaire de connexion
                        const email = formData.get('email');
                        const loginEmailInput = document.querySelector('#candidate-login-form input[name="email"]');
                        if (loginEmailInput) {
                            loginEmailInput.value = email;
                        }
                    }, 500);
                }
            }
        } catch (error) {
            errorDiv.textContent = 'Erreur de connexion. Veuillez réessayer.';
            errorDiv.classList.remove('hidden');
        }
    }

    function handleCandidateAction() {
        if (checkCandidateAuth()) {
            // Si déjà connecté en tant que candidat, rediriger vers le dashboard
            window.location.href = '{{ route("candidate.dashboard") }}';
        } else {
            // Ouvrir directement le modal avec inscription et connexion
            openCandidateAuthModal();
        }
    }

    async function handleCandidateLogin(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const errorDiv = document.getElementById('candidate-login-error');
        
        errorDiv.classList.add('hidden');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password')
                })
            });

            const data = await response.json();

            if (data.success && data.data.user.role === 'user') {
                localStorage.setItem('auth_token', data.data.token);
                localStorage.setItem('auth_user', JSON.stringify(data.data.user));
                
                window.location.href = '{{ route("candidate.dashboard") }}';
            } else {
                errorDiv.textContent = data.message || 'Email ou mot de passe incorrect.';
                errorDiv.classList.remove('hidden');
            }
        } catch (error) {
            errorDiv.textContent = 'Erreur de connexion. Veuillez réessayer.';
            errorDiv.classList.remove('hidden');
        }
    }

    function handleRecruiterAction() {
        if (checkActorAuth()) {
            // Si l'acteur est connecté, rediriger vers le dashboard avec section offres
            window.location.href = '{{ route("actor.dashboard") }}?section=jobs';
        } else {
            // Si non connecté, rediriger vers la page d'accréditation
            window.location.href = '{{ route("accreditation") }}';
        }
    }

    // Fermer le modal si on clique en dehors
    // Fermer le modal d'authentification si on clique en dehors
    document.getElementById('candidate-auth-modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeCandidateAuthModal();
        }
    });
</script>
@endsection
