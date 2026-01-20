@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-red-950 to-red-800 text-white py-20 mt-16">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6" data-i18n="aboutPageTitle">
                À propos de MATA
            </h1>
            <p class="text-xl text-red-100 max-w-3xl mx-auto" data-i18n="aboutPageSubtitle">
                Nous sommes la plateforme de référence pour les professionnels du tourisme, offrant un annuaire vérifié, des ressources de qualité et un réseau collaboratif dynamique.
            </p>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div class="text-center">
                    <div class="text-4xl font-bold mb-2" style="color: #CC0000;">2500+</div>
                    <div class="text-gray-600" data-i18n="aboutStatsProfessionals">Professionnels inscrits</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold mb-2" style="color: #CC0000;">150+</div>
                    <div class="text-gray-600" data-i18n="aboutStatsCities">Villes couvertes</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold mb-2" style="color: #CC0000;">1200+</div>
                    <div class="text-gray-600" data-i18n="aboutStatsResources">Ressources disponibles</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold mb-2" style="color: #CC0000;">50+</div>
                    <div class="text-gray-600" data-i18n="aboutStatsEvents">Événements par an</div>
                </div>
            </div>

            <!-- Values Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <i data-lucide="target" class="w-6 h-6" style="color: #CC0000;"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3" data-i18n="aboutMission">Notre Mission</h3>
                    <p class="text-gray-600 leading-relaxed" data-i18n="aboutMissionDesc">
                        Créer une plateforme de référence pour centraliser et valoriser les acteurs du tourisme, favorisant la collaboration et le partage de connaissances.
                    </p>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <i data-lucide="users" class="w-6 h-6" style="color: #CC0000;"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3" data-i18n="aboutCommunity">Notre Communauté</h3>
                    <p class="text-gray-600 leading-relaxed" data-i18n="aboutCommunityDesc">
                        Plus de 2500 professionnels du tourisme nous font confiance pour développer leur réseau et accéder à des ressources de qualité.
                    </p>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <i data-lucide="award" class="w-6 h-6" style="color: #CC0000;"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3" data-i18n="aboutCommitment">Notre Engagement</h3>
                    <p class="text-gray-600 leading-relaxed" data-i18n="aboutCommitmentDesc">
                        Garantir la fiabilité et la qualité des informations partagées à travers un processus de vérification rigoureux.
                    </p>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <i data-lucide="trending-up" class="w-6 h-6" style="color: #CC0000;"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3" data-i18n="aboutVision">Notre Vision</h3>
                    <p class="text-gray-600 leading-relaxed" data-i18n="aboutVisionDesc">
                        Devenir la référence incontournable pour tous les professionnels du secteur touristique au Maroc et à l'international.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- History Section -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold mb-4" data-i18n="aboutHistoryTitle">Notre Histoire</h2>
                <p class="text-gray-600 max-w-3xl mx-auto leading-relaxed" data-i18n="aboutHistoryDesc">
                    Créée en 2023, MATA est née de la volonté de créer un espace centralisé et fiable pour les professionnels du tourisme. Face à la fragmentation des informations et au manque de plateformes dédiées, nous avons développé une solution complète permettant aux acteurs du secteur de se connecter, de partager leurs expériences et d'accéder à des ressources de qualité.
                </p>
            </div>

            <!-- Values -->
            <div class="bg-white rounded-xl shadow-lg p-8 mb-12">
                <h3 class="text-2xl font-semibold mb-6 text-center" data-i18n="aboutValuesTitle">Nos Valeurs</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style="background-color: rgba(204, 0, 0, 0.1);">
                            <span class="text-2xl font-bold" style="color: #CC0000;">1</span>
                        </div>
                        <h4 class="font-semibold text-lg" data-i18n="aboutValueReliability">Fiabilité</h4>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style="background-color: rgba(204, 0, 0, 0.1);">
                            <span class="text-2xl font-bold" style="color: #CC0000;">2</span>
                        </div>
                        <h4 class="font-semibold text-lg" data-i18n="aboutValueCollaboration">Collaboration</h4>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style="background-color: rgba(204, 0, 0, 0.1);">
                            <span class="text-2xl font-bold" style="color: #CC0000;">3</span>
                        </div>
                        <h4 class="font-semibold text-lg" data-i18n="aboutValueInnovation">Innovation</h4>
                    </div>
                </div>
            </div>

            <!-- Team Section -->
            <div>
                <h2 class="text-3xl font-bold text-center mb-12" data-i18n="aboutTeamTitle">Notre Équipe</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                        <div class="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-red-600 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                            MD
                        </div>
                        <h3 class="font-semibold text-lg mb-1">Marie Dubois</h3>
                        <p class="text-gray-600 text-sm" data-i18n="aboutTeamDirector">Directrice Générale</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                        <div class="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-red-600 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                            JM
                        </div>
                        <h3 class="font-semibold text-lg mb-1">Jean Martin</h3>
                        <p class="text-gray-600 text-sm" data-i18n="aboutTeamTechnical">Responsable Technique</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                        <div class="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-red-600 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                            SL
                        </div>
                        <h3 class="font-semibold text-lg mb-1">Sophie Laurent</h3>
                        <p class="text-gray-600 text-sm" data-i18n="aboutTeamCommunity">Responsable Communauté</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                        <div class="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-red-600 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                            PR
                        </div>
                        <h3 class="font-semibold text-lg mb-1">Pierre Rousseau</h3>
                        <p class="text-gray-600 text-sm" data-i18n="aboutTeamContent">Responsable Contenu</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 text-white" style="background-color: #CC0000;">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4" data-i18n="aboutJoinUsTitle">Rejoignez-nous</h2>
            <p class="text-red-100 mb-8 text-lg" data-i18n="aboutJoinUsDesc">
                Faites partie de la plus grande communauté de professionnels du tourisme au Maroc
            </p>
            <a href="{{ route('join') }}" class="inline-block px-8 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors" data-i18n="aboutJoinUsButton">
                Créer un compte gratuit
            </a>
        </div>
    </section>
</div>

<script>
    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
</script>
@endsection
