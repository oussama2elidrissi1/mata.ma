@extends('layouts.app')

@section('content')
    <!-- Hero Section -->
    <section class="relative min-h-[600px] flex items-center overflow-hidden" id="hero-section">
        <!-- Fallback gradient -->
        <div class="absolute inset-0 z-0" style="background: linear-gradient(to bottom, #CC0000, #B30000, #990000);"></div>
        
        <!-- Background Image -->
        <div 
            class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style="background-image: url({{ asset('images/hero-background.jpg') }}); background-size: cover; background-position: center; background-repeat: no-repeat;"
        ></div>
        
        <!-- Dark overlay -->
        <div 
            class="absolute inset-0 z-[1]"
            style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5));"
        ></div>
        
        <div class="container mx-auto px-4 py-16 relative z-[2]">
            <div class="max-w-6xl mx-auto">
                <!-- Title Section -->
                <div class="text-center mb-10">
                    <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight px-4 drop-shadow-lg font-serif" data-i18n="heroTitle">
                        Votre Portail vers l'Excellence du Tourisme Marocain
                    </h1>
                    <p class="text-base md:text-lg lg:text-xl text-white/95 max-w-3xl mx-auto px-4 leading-relaxed drop-shadow-md font-normal" data-i18n="heroSubtitle">
                        Découvrez, connectez-vous et collaborez avec les professionnels accrédités du secteur touristique au Maroc
                    </p>
                </div>

                <!-- Main Search Bar -->
                <form id="hero-search-form" class="mb-4">
                    <div class="bg-white rounded-2xl shadow-2xl p-5 md:p-6">
                        <div class="flex flex-col md:flex-row gap-3 md:gap-4">
                            <!-- Search Input -->
                            <div class="flex-1 relative">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="hero-search-input"
                                    data-i18n-placeholder="searchPlaceholder"
                                    placeholder="Rechercher un professionnel, une entreprise..."
                                    class="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 transition-all text-sm md:text-base placeholder-gray-400 text-gray-900 bg-white"
                                    style="--tw-ring-color: #CC0000;"
                                />
                            </div>

                            <!-- Location Input -->
                            <div class="md:w-64 relative">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="hero-location-input"
                                    placeholder="Ville, région..."
                                    class="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 transition-all text-sm md:text-base placeholder-gray-400 text-gray-900 bg-white"
                                />
                            </div>

                            <!-- Search Button -->
                            <button
                                type="submit"
                                class="px-6 md:px-8 py-3 md:py-4 text-white rounded-xl transition-colors font-semibold whitespace-nowrap text-sm md:text-base"
                                style="background-color: #CC0000;"
                                data-i18n="searchButton"
                            >
                                Rechercher
                            </button>

                            <!-- Filters Button -->
                            <button
                                type="button"
                                id="hero-filters-toggle"
                                class="px-5 md:px-6 py-3 md:py-4 rounded-xl transition-colors font-semibold flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base"
                                style="background-color: rgba(204, 0, 0, 0.1); color: #CC0000;"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                                </svg>
                                <span>Filtres</span>
                            </button>
                        </div>
                    </div>
                </form>

                <!-- Advanced Filters Section -->
                <div id="hero-filters-panel" class="bg-white rounded-2xl shadow-2xl p-5 md:p-6 mb-6 hidden">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                            <select id="hero-filter-type" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option value="">Tous</option>
                                <option value="hotel">Hôtels & Riads</option>
                                <option value="restaurant">Restaurants</option>
                                <option value="tour_guide">Guides Touristiques</option>
                                <option value="travel_agency">Agences de Voyage</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Région</label>
                            <select id="hero-filter-region" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option value="">Toutes</option>
                                <option value="Casablanca-Settat">Casablanca-Settat</option>
                                <option value="Rabat-Salé-Kénitra">Rabat-Salé-Kénitra</option>
                                <option value="Fès-Meknès">Fès-Meknès</option>
                                <option value="Marrakech-Safi">Marrakech-Safi</option>
                            </select>
                        </div>
                        <div class="flex items-end">
                            <label class="inline-flex items-center gap-2 text-sm text-gray-700">
                                <input id="hero-filter-accredited" type="checkbox" class="rounded border-gray-300">
                                Accrédités uniquement
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-white py-16">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #CC0000;">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                    </div>
                    <div class="text-4xl font-bold mb-2" style="color: #333333;">500+</div>
                    <div class="font-medium" style="color: #333333;">Acteurs Accrédités</div>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #CC0000;">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                        </svg>
                    </div>
                    <div class="text-4xl font-bold mb-2" style="color: #333333;">15+</div>
                    <div class="font-medium" style="color: #333333;">Années d'Excellence</div>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #CC0000;">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <div class="text-4xl font-bold mb-2" style="color: #333333;">12</div>
                    <div class="font-medium" style="color: #333333;">Régions Couvertes</div>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #CC0000;">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <div class="text-4xl font-bold mb-2" style="color: #333333;">100%</div>
                    <div class="font-medium" style="color: #333333;">Qualité Garantie</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Premium Actors Section -->
    <section class="bg-gray-50 py-16">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-tight" style="color: #333333;">
                    Acteurs Accrédités en Vedette
                </h2>
                <p class="text-xl font-normal" style="color: #333333;">
                    Découvrez nos professionnels accrédités MATA offrant des services d'excellence
                </p>
            </div>

            <div id="premium-actors" class="min-h-[200px]">
                <div class="text-center text-slate-600">Chargement des acteurs accrédités...</div>
            </div>
        </div>
    </section>

    <!-- Why Choose MATA Section -->
    <section class="bg-white py-16">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight" style="color: #333333;">
                        Pourquoi Choisir MATA?
                    </h2>
                    <p class="text-lg mb-8" style="color: #333333;">
                        MATA garantit la qualité et le professionnalisme des acteurs du tourisme marocain à travers un système d'accréditation rigoureux.
                    </p>
                    <ul class="space-y-4">
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 flex-shrink-0 mt-0.5" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="text-lg" style="color: #333333;">Certification rigoureuse et contrôle qualité</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 flex-shrink-0 mt-0.5" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="text-lg" style="color: #333333;">Professionnels expérimentés et formés</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 flex-shrink-0 mt-0.5" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="text-lg" style="color: #333333;">Standards internationaux de service</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 flex-shrink-0 mt-0.5" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="text-lg" style="color: #333333;">Support et assistance continue</span>
                        </li>
                    </ul>
                    <a href="{{ route('about') }}" class="mt-8 inline-block px-8 py-3 border-2 rounded-lg transition-colors font-semibold" style="border-color: #CC0000; color: #CC0000;">
                        En Savoir Plus
                    </a>
                </div>
                <div class="relative">
                    <div class="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(to bottom right, rgba(204, 0, 0, 0.1), rgba(204, 0, 0, 0.05));">
                            <div class="text-center">
                                <div class="text-6xl font-bold mb-2" style="color: #CC0000;">500+</div>
                                <div class="text-2xl" style="color: #333333;">Acteurs Certifiés</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script>
        // Hero search form handler
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('hero-search-form');
            const filtersToggle = document.getElementById('hero-filters-toggle');
            const filtersPanel = document.getElementById('hero-filters-panel');
            
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const search = document.getElementById('hero-search-input').value;
                    const location = document.getElementById('hero-location-input').value;
                    const type = document.getElementById('hero-filter-type')?.value || '';
                    const region = document.getElementById('hero-filter-region')?.value || '';
                    const accredited = document.getElementById('hero-filter-accredited')?.checked || false;
                    
                    const params = new URLSearchParams();
                    if (search) params.append('search', search);
                    if (location) {
                        params.append('region', location);
                        params.append('city', location);
                    }
                    if (type) params.append('type', type);
                    if (region) params.append('region', region);
                    if (accredited) params.append('accredited', 'true');
                    
                    window.location.href = '{{ route("actors.index") }}' + (params.toString() ? '?' + params.toString() : '');
                });
            }
            
            if (filtersToggle && filtersPanel) {
                filtersToggle.addEventListener('click', function() {
                    filtersPanel.classList.toggle('hidden');
                });
            }
        });
    </script>
@endsection
