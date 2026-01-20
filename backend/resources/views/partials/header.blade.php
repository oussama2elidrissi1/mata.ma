<header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
            <a href="{{ route('home') }}" class="flex items-center gap-4">
                <div class="relative h-16 w-auto">
                    @php
                        $logoSetting = \App\Models\Setting::where('key', 'site_logo')->first();
                        $logoPath = $logoSetting && $logoSetting->value_fr ? asset('storage/' . $logoSetting->value_fr) : asset('images/Logo.png');
                    @endphp
                    <img 
                        src="{{ $logoPath }}" 
                        alt="MATA Logo"
                        class="object-contain h-full w-auto"
                        style="max-width: 200px;"
                        id="header-logo"
                        onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2210%22 y=%2245%22 font-size=%2236%22 font-weight=%22900%22 fill=%22%23CC0000%22%3EMATA%3C/text%3E%3C/svg%3E'"
                    />
                </div>
            </a>
            
            <nav class="hidden lg:flex items-center gap-1">
                <a 
                    href="{{ route('home') }}" 
                    class="px-4 py-2 rounded-full transition-colors {{ request()->routeIs('home') ? 'text-white' : 'hover:bg-gray-100' }}"
                    style="{{ request()->routeIs('home') ? 'background-color: #CC0000;' : 'color: #333333;' }}"
                    data-i18n="home"
                >
                    Accueil
                </a>
                <a 
                    href="{{ route('actors.index') }}" 
                    class="px-4 py-2 rounded-full transition-colors {{ request()->routeIs('actors.*') ? 'text-white' : 'hover:bg-gray-100' }}"
                    style="{{ request()->routeIs('actors.*') ? 'background-color: #CC0000;' : 'color: #333333;' }}"
                    data-i18n="directory"
                >
                    Annuaire
                </a>
                <a 
                    href="{{ route('events.index') }}" 
                    class="px-4 py-2 rounded-full transition-colors {{ request()->routeIs('events.*') ? 'text-white' : 'hover:bg-gray-100' }}"
                    style="{{ request()->routeIs('events.*') ? 'background-color: #CC0000;' : 'color: #333333;' }}"
                    data-i18n="events"
                >
                    Événements
                </a>
                <a href="/accreditation" class="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style="color: #333333;" data-i18n="accreditation">
                    Accréditation
                </a>
                <a href="{{ route('join') }}" class="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style="color: #333333;" data-i18n="joinLink">
                    Adhérer
                </a>
                <a 
                    href="{{ route('news.index') }}" 
                    class="px-4 py-2 rounded-full transition-colors {{ request()->routeIs('news.*') ? 'text-white' : 'hover:bg-gray-100' }}"
                    style="{{ request()->routeIs('news.*') ? 'background-color: #CC0000;' : 'color: #333333;' }}"
                    data-i18n="news"
                >
                    Actualités
                </a>
                <a href="/partners" class="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style="color: #333333;" data-i18n="partnersLink">
                    Partenaires
                </a>
                <a href="{{ route('about') }}" class="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style="color: #333333;" data-i18n="about">
                    À Propos
                </a>
                <a href="{{ route('contact') }}" class="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style="color: #333333;" data-i18n="contact">
                    Contact
                </a>
            </nav>

            <div class="flex items-center gap-4">
                <!-- Language Selector -->
                <div class="relative" id="language-selector">
                    <button 
                        id="lang-btn"
                        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        style="color: #333333;"
                        onclick="toggleLanguageMenu()"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.196 2.856A12.024 12.024 0 005.196 9.856m0 0a3.5 3.5 0 00-1.196 1.144M5.196 9.856l-1.196 1.144m0 0a3.5 3.5 0 001.196 1.144m1.196-1.144l1.196-1.144m0 0a3.5 3.5 0 011.196-1.144m-1.196 1.144l-1.196 1.144m0 0a3.5 3.5 0 001.196-1.144M9 21V19m-6 2h12m-6 0v-2m0 2h6"/>
                        </svg>
                        <span id="current-lang">FR</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div id="lang-menu" class="hidden absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <button onclick="changeLanguage('fr')" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 language-option" data-lang="fr">
                            <span class="font-semibold">🇫🇷</span>
                            <span>Français</span>
                            <span id="check-fr" class="ml-auto hidden" style="color: #CC0000;">✓</span>
                        </button>
                        <button onclick="changeLanguage('en')" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 language-option" data-lang="en">
                            <span class="font-semibold">🇬🇧</span>
                            <span>English</span>
                            <span id="check-en" class="ml-auto hidden" style="color: #CC0000;">✓</span>
                        </button>
                        <button onclick="changeLanguage('ar')" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 language-option" data-lang="ar">
                            <span class="font-semibold">🇲🇦</span>
                            <span>العربية</span>
                            <span id="check-ar" class="ml-auto hidden" style="color: #CC0000;">✓</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>

<script>
    function toggleLanguageMenu() {
        const menu = document.getElementById('lang-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    }

    function changeLanguage(lang) {
        if (window.i18n) {
            window.i18n.setLanguage(lang);
            
            // Mettre à jour l'affichage du bouton
            const langNames = { fr: 'FR', en: 'EN', ar: 'AR' };
            const currentLangEl = document.getElementById('current-lang');
            if (currentLangEl) {
                currentLangEl.textContent = langNames[lang] || 'FR';
            }
            
            // Mettre à jour les checkmarks
            document.querySelectorAll('.language-option').forEach(btn => {
                const checkEl = btn.querySelector('[id^="check-"]');
                if (checkEl) {
                    checkEl.classList.add('hidden');
                }
            });
            const activeCheck = document.getElementById(`check-${lang}`);
            if (activeCheck) {
                activeCheck.classList.remove('hidden');
            }
            
            // Fermer le menu
            const menu = document.getElementById('lang-menu');
            if (menu) {
                menu.classList.add('hidden');
            }
        }
    }

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        const selector = document.getElementById('language-selector');
        const menu = document.getElementById('lang-menu');
        if (selector && menu && !selector.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });

    // Initialiser l'affichage de la langue au chargement
    document.addEventListener('DOMContentLoaded', () => {
        if (window.i18n) {
            const lang = window.i18n.getCurrentLanguage();
            const langNames = { fr: 'FR', en: 'EN', ar: 'AR' };
            const currentLangEl = document.getElementById('current-lang');
            if (currentLangEl) {
                currentLangEl.textContent = langNames[lang] || 'FR';
            }
            
            // Afficher le checkmark de la langue active
            document.querySelectorAll('.language-option').forEach(btn => {
                const checkEl = btn.querySelector('[id^="check-"]');
                if (checkEl) {
                    checkEl.classList.add('hidden');
                }
            });
            const activeCheck = document.getElementById(`check-${lang}`);
            if (activeCheck) {
                activeCheck.classList.remove('hidden');
            }
        }
    });
</script>
