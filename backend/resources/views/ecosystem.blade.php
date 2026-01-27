@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-gray-50 to-white py-20 mt-16">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemPageTitle">
                Écosystème MATA
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemPageSubtitle">
                Un réseau collaboratif dynamique qui rassemble les acteurs du tourisme marocain pour créer de la valeur et promouvoir l'excellence.
            </p>
        </div>
    </section>

    <!-- Main Content -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Introduction -->
            <div class="mb-16">
                <div class="prose prose-lg max-w-none">
                    <p class="text-gray-700 leading-relaxed mb-6" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 18px; line-height: 1.8;" data-i18n="ecosystemIntro">
                        L'écosystème MATA représente un réseau collaboratif complet qui connecte les différents acteurs du secteur touristique marocain. Notre mission est de créer un environnement propice à l'innovation, au partage de connaissances et au développement durable du tourisme au Maroc.
                    </p>
                </div>
            </div>

            <!-- Ecosystem Components -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Component 1 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemAccreditedActors">
                        Acteurs Accrédités
                    </h3>
                    <p class="text-gray-600 leading-relaxed" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemAccreditedActorsDesc">
                        Un réseau de professionnels vérifiés et certifiés, garantissant qualité et professionnalisme dans le secteur touristique marocain.
                    </p>
                </div>

                <!-- Component 2 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemStrategicPartners">
                        Partenaires Stratégiques
                    </h3>
                    <p class="text-gray-600 leading-relaxed" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemStrategicPartnersDesc">
                        Des collaborations avec des institutions, organisations et entreprises pour renforcer l'écosystème touristique marocain.
                    </p>
                </div>

                <!-- Component 3 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemTraining">
                        Formation & Développement
                    </h3>
                    <p class="text-gray-600 leading-relaxed" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemTrainingDesc">
                        Des programmes de formation continue et de développement des compétences pour les professionnels du tourisme.
                    </p>
                </div>

                <!-- Component 4 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemInnovation">
                        Innovation & Recherche
                    </h3>
                    <p class="text-gray-600 leading-relaxed" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemInnovationDesc">
                        Promotion de l'innovation et de la recherche dans le secteur touristique pour améliorer continuellement les pratiques.
                    </p>
                </div>

                <!-- Component 5 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemSustainability">
                        Développement Durable
                    </h3>
                    <p class="text-gray-600 leading-relaxed" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemSustainabilityDesc">
                        Engagement en faveur d'un tourisme durable et responsable qui respecte l'environnement et les communautés locales.
                    </p>
                </div>

                <!-- Component 6 -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <svg class="w-6 h-6" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-2.912 0-5.635-.392-8-1.105M21 13.255A23.931 23.931 0 0112 15c-2.912 0-5.635-.392-8-1.105M21 13.255v-2.51A23.931 23.931 0 0012 8c-2.912 0-5.635.392-8 1.105v2.51M12 8a23.931 23.931 0 019 1.745M12 8V6m0 0a23.931 23.931 0 00-9 1.745M12 6v2m0 0V4.5M12 4.5a23.931 23.931 0 00-9 1.745M12 4.5V3m0 0a23.931 23.931 0 00-9 1.745M12 3v1.5"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemEvents">
                        Événements & Networking
                    </h3>
                    <p class="text-gray-600 leading-relaxed" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="ecosystemEventsDesc">
                        Organisation d'événements, conférences et rencontres pour favoriser les échanges et le networking entre les acteurs.
                    </p>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="bg-gray-50 rounded-xl p-12 text-center border border-gray-200">
                <h2 class="text-3xl font-bold mb-4" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="joinEcosystem">
                    Rejoignez l'Écosystème MATA
                </h2>
                <p class="text-gray-600 mb-8 max-w-2xl mx-auto" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="joinEcosystemDesc">
                    Faites partie d'un réseau dynamique qui transforme le secteur touristique marocain. Découvrez les opportunités de collaboration et de croissance.
                </p>
                <a href="{{ route('join') }}" class="inline-block px-8 py-4 rounded-lg text-white font-semibold transition-colors hover:opacity-90" style="background-color: #CC0000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" data-i18n="joinMATA">
                    Adhérer à MATA
                </a>
            </div>
        </div>
    </section>
</div>
@endsection
