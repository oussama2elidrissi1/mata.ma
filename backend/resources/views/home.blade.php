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
                        Annuaire des Acteurs du Tourisme Accrédités au Maroc
                    </h1>
                    <p class="text-base md:text-lg lg:text-xl text-white/95 max-w-3xl mx-auto px-4 leading-relaxed drop-shadow-md font-normal" data-i18n="heroSubtitle">
                        Développez votre visibilité et renforcez votre crédibilité commerciale au sein du réseau national des entreprises touristiques au Maroc.
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
                                <option value="hotel">Hebergements</option>
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
                                <span data-i18n="accreditedActorsOnly">Accrédités uniquement</span>
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
            <div class="text-center mt-12">
                <p class="text-lg md:text-xl text-gray-600 font-medium" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; color: #4a5568;" data-i18n="mataServiceBusiness">
                    mata.ma au service de votre businesse
                </p>
            </div>
        </div>
    </section>

    <!-- Derniers Acteurs Accrédités Section -->
    <section class="bg-white py-16">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-tight" style="color: #1a1a1a; font-family: Georgia, 'Times New Roman', serif; font-weight: 700;" data-i18n="latestAccreditedActors">
                    Derniers Acteurs <span style="color: #CC0000;">Accrédités</span>
                </h2>
                <p class="text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed" style="color: #4a5568; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400;" data-i18n="latestAccreditedActorsSubtitle">
                    Découvrez les professionnels du tourisme accrédités et certifiés par MATA.
                </p>
            </div>

            <div id="verified-actors" class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div class="text-center text-gray-500 py-12" data-i18n="loadingAccreditedActors">Chargement des acteurs accrédités...</div>
            </div>

            <div class="text-center">
                <a 
                    href="{{ route('actors.index') }}" 
                    class="inline-block px-8 py-3 rounded-lg font-semibold transition-colors border-2"
                    style="background-color: white; color: #CC0000; border-color: #CC0000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 600;"
                    data-i18n="viewAllActors"
                >
                    Voir Tous les Acteurs
                </a>
            </div>
        </div>
    </section>

    <!-- Actualités & Annonces Officielles Section -->
    <section class="bg-gray-50 py-16">
        <div class="container mx-auto px-4">
            <!-- Section Header - Centered -->
            <div class="text-center mb-12">
                <h2 class="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-tight" style="color: #1a1a1a; font-family: Georgia, 'Times New Roman', serif; font-weight: 700;" data-i18n="newsAndAnnouncements">
                    Actualités & Annonces Officielles
                </h2>
                <p class="text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed" style="color: #4a5568; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400;" data-i18n="newsAndAnnouncementsSubtitle">
                    Suivez les dernières informations, annonces et mises à jour du réseau MATA.
                </p>
            </div>

            <!-- News Cards - Centered -->
            <div id="news-cards" class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center text-gray-500 py-12" data-i18n="loadingNews">Chargement des actualités...</div>
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

            // Load news and accredited actors
            loadNews();
            loadAccreditedActors();
        });

        // Load accredited actors function
        async function loadAccreditedActors() {
            const container = document.getElementById('verified-actors');
            if (!container) return;
            
            try {
                let actors = [];
                let data = null;
                
                // Fetch accredited actors
                try {
                    const response = await fetch('/api/tourism-actors?accredited=true&status=active&per_page=3&sort_by=created_at&sort_order=desc');
                    if (response.ok) {
                        data = await response.json();
                        console.log('Accredited actors API response:', data);
                        actors = data.data || [];
                    }
                } catch (e) {
                    console.warn('Error fetching accredited actors:', e);
                }
                
                // If no accredited actors, try to get actors with accreditation_number
                if (!actors || actors.length === 0) {
                    try {
                        console.log('No accredited actors found, trying actors with accreditation number...');
                        const response = await fetch('/api/tourism-actors?status=active&per_page=3&sort_by=created_at&sort_order=desc');
                        if (response.ok) {
                            data = await response.json();
                            // Filter to only show actors with accreditation_number
                            actors = (data.data || []).filter(actor => actor.accreditation_number);
                        }
                    } catch (e) {
                        console.warn('Error fetching actors:', e);
                    }
                }
                
                if (actors && actors.length > 0) {
                    container.innerHTML = actors.map(actor => renderActorCard(actor)).join('');
                } else {
                    const noActorsText = window.i18n ? window.i18n.t('noAccreditedActors') : 'Aucun acteur accrédité pour le moment.';
                    container.innerHTML = `<div class="col-span-3 text-center text-gray-500 py-12">${noActorsText}</div>`;
                }
            } catch (error) {
                console.error('Error loading accredited actors:', error);
                console.error('Error details:', error.message, error.stack);
                const container = document.getElementById('verified-actors');
                if (container) {
                    const noActorsText = window.i18n ? window.i18n.t('noAccreditedActors') : 'Aucun acteur accrédité pour le moment.';
                    container.innerHTML = `<div class="col-span-3 text-center text-gray-500 py-12">${noActorsText}</div>`;
                }
            }
        }

        function getTypeLabel(type) {
            const labels = {
                'hotel': 'Hôtel',
                'restaurant': 'Restaurant',
                'travel_agency': 'Opérateur de Voyages',
                'tour_guide': 'Guide Touristique',
                'transport': 'Transport',
                'attraction': 'Site touristique',
                'other': 'Autre'
            };
            return labels[type] || type;
        }

        function renderActorCard(actor) {
            // Utiliser le logo de l'acteur - l'accessor du modèle retourne déjà une URL complète
            let imageUrl = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
            if (actor.logo) {
                // L'accessor du modèle retourne déjà une URL complète
                imageUrl = actor.logo;
            } else if (actor.images && Array.isArray(actor.images) && actor.images.length > 0) {
                // Fallback sur la première image si pas de logo
                const firstImage = actor.images[0];
                if (firstImage) {
                    if (firstImage.startsWith('http://') || firstImage.startsWith('https://')) {
                        imageUrl = firstImage;
                    } else if (firstImage.startsWith('/storage/')) {
                        imageUrl = firstImage;
                    } else {
                        imageUrl = `/storage/${firstImage}`;
                    }
                }
            }
            
            const rating = parseFloat(actor.rating) || 0;
            const stars = Array.from({length: 5}, (_, i) => {
                const filled = i < Math.floor(rating);
                return `<svg class="w-5 h-5" style="color: ${filled ? '#fbbf24' : '#d1d5db'};" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>`;
            }).join('');
            
            const verifiedNumber = actor.accreditation_number || Math.floor(Math.random() * 5000) + 1;
            const verifiedDate = actor.accreditation_date 
                ? new Date(actor.accreditation_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                : (actor.created_at ? new Date(actor.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '');
            
            const typeLabel = getTypeLabel(actor.type);
            
            return `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div class="relative h-64 overflow-hidden">
                        <img src="${imageUrl}" alt="${actor.name || 'Acteur'}" class="w-full h-full object-cover rounded-t-xl" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'">
                        <div class="absolute top-4 right-4 text-white px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-1.5" style="background-color: #f97316; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 600;">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                            Accrédité
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 700;">
                            ${actor.name || 'Acteur'}
                        </h3>
                        ${verifiedDate ? `<div class="text-sm mb-4" style="color: #9ca3af; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400;">${verifiedDate}</div>` : ''}
                        <div class="space-y-2.5 mb-4">
                            ${(actor.city || actor.region) ? `
                            <div class="flex items-center gap-2" style="color: #1a1a1a;">
                                <svg class="w-4 h-4" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                <span class="text-sm" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400;">${actor.city || ''}${actor.region ? (actor.city ? ', ' : '') + actor.region : ''}</span>
                            </div>
                            ` : ''}
                            ${typeLabel ? `
                            <div class="flex items-center gap-2" style="color: #1a1a1a;">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-2.912 0-5.635-.392-8-1.105M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span class="text-sm" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400;">${typeLabel}</span>
                            </div>
                            ` : ''}
                            <div class="flex items-center gap-1.5">
                                ${stars}
                                <span class="text-sm ml-1" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400;">(${rating.toFixed(1)})</span>
                            </div>
                            ${actor.phone ? `
                            <div class="flex items-center gap-2" style="color: #1a1a1a;">
                                <svg class="w-4 h-4" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <span class="text-sm" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400;">${actor.phone}</span>
                            </div>
                            ` : ''}
                            ${actor.website ? `
                            <div class="flex items-center gap-2" style="color: #1a1a1a;">
                                <svg class="w-4 h-4" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                                </svg>
                                <span class="text-sm truncate" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400;">${actor.website}</span>
                            </div>
                            ` : ''}
                        </div>
                        <a 
                            href="/actors/${actor.id}" 
                            class="block w-full text-center px-6 py-3 rounded-lg text-white font-semibold transition-colors mt-4"
                            style="background-color: #CC0000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 600;"
                            data-i18n="viewProfile"
                        >
                            Voir le profil
                        </a>
                    </div>
                </div>
            `;
        }

        // Load news function
        async function loadNews() {
            try {
                const response = await fetch('/api/news?status=published&per_page=3&sort_by=published_at&sort_direction=desc');
                const data = await response.json();
                
                const container = document.getElementById('news-cards');
                if (!container) return;
                
                if (data.success && data.data && data.data.length > 0) {
                    container.innerHTML = data.data.map(news => {
                        const date = news.published_at 
                            ? new Date(news.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                            : new Date(news.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
                        
                        const excerpt = news.excerpt || (news.content ? news.content.substring(0, 150) + '...' : 'Description...');
                        
                        // Get image URL - the News model accessor already returns a full URL or default image
                        const imageUrl = news.image || 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop';
                        
                        return `
                            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div class="relative h-48 overflow-hidden">
                                    <img 
                                        src="${imageUrl}" 
                                        alt="${news.title || 'Actualité MATA'}" 
                                        class="w-full h-full object-cover"
                                        onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'"
                                    >
                                </div>
                                <div class="p-6">
                                    <div class="text-sm mb-3" style="color: #9ca3af; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400;">
                                        ${date}
                                    </div>
                                    <h3 class="text-xl font-bold mb-3 leading-tight" style="color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 700; line-height: 1.4;">
                                        ${news.title || 'Titre'}
                                    </h3>
                                    <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed" style="color: #4a5568; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400; font-size: 15px; line-height: 1.6;">
                                        ${excerpt}
                                    </p>
                                    <a 
                                        href="/news/${news.id}" 
                                        class="inline-flex items-center gap-1 font-medium transition-colors hover:underline"
                                        style="color: #CC0000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 400; font-size: 15px;"
                                        data-i18n="readArticle"
                                    >
                                        Lire l'article
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        `;
                    }).join('');
                } else {
                    const noNewsText = window.i18n ? window.i18n.t('noNews') : 'Aucune actualité pour le moment.';
                    container.innerHTML = `<div class="col-span-3 text-center text-gray-500 py-12">${noNewsText}</div>`;
                }
            } catch (error) {
                console.error('Error loading news:', error);
                const container = document.getElementById('news-cards');
                if (container) {
                    const errorText = window.i18n ? window.i18n.t('error') : 'Erreur';
                    container.innerHTML = `<div class="col-span-3 text-center text-red-500 py-12">${errorText}</div>`;
                }
            }
        }
    </script>
@endsection
