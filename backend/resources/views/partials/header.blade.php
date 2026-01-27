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
            
            <!-- Navigation Desktop -->
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
                <a 
                    href="{{ route('news.index') }}" 
                    class="px-4 py-2 rounded-full transition-colors {{ request()->routeIs('news.*') ? 'text-white' : 'hover:bg-gray-100' }}"
                    style="{{ request()->routeIs('news.*') ? 'background-color: #CC0000;' : 'color: #333333;' }}"
                    data-i18n="news"
                >
                    Actualités
                </a>
                <a href="/accreditation" class="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style="color: #333333;" data-i18n="accreditation">
                    Accréditation
                </a>
                <a href="{{ route('join') }}" class="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style="color: #333333;" data-i18n="joinLink">
                    Adhérer
                </a>
                <a href="{{ route('jobs') }}" class="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors {{ request()->routeIs('jobs') ? 'text-white' : '' }}" style="{{ request()->routeIs('jobs') ? 'background-color: #CC0000;' : 'color: #333333;' }}" data-i18n="jobs">
                    Emploi
                </a>
                <a href="{{ route('contact') }}" class="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors" style="color: #333333;" data-i18n="contact">
                    Contacter
                </a>
            </nav>

            <div class="flex items-center gap-4">
                <!-- Bouton Menu Mobile -->
                <button 
                    id="mobile-menu-btn"
                    class="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                    style="color: #333333;"
                    onclick="toggleMobileMenu()"
                    aria-label="Menu"
                >
                    <svg id="menu-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <!-- Language Selector -->
                <div class="relative" id="language-selector">
                    <button 
                        id="lang-btn"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-white"
                        style="color: #333333; border: 1px solid #CC0000;"
                        onclick="toggleLanguageMenu(event); return false;"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
                        </svg>
                        <span id="current-lang" class="font-semibold">FR</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div id="lang-menu" class="hidden absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <button type="button" onclick="changeLanguage('fr', event); return false;" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 language-option" data-lang="fr">
                            <span class="font-semibold">🇫🇷</span>
                            <span>Français</span>
                            <span id="check-fr" class="ml-auto hidden" style="color: #CC0000;">✓</span>
                        </button>
                        <button type="button" onclick="changeLanguage('en', event); return false;" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 language-option" data-lang="en">
                            <span class="font-semibold">🇬🇧</span>
                            <span>English</span>
                            <span id="check-en" class="ml-auto hidden" style="color: #CC0000;">✓</span>
                        </button>
                        <button type="button" onclick="changeLanguage('ar', event); return false;" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 language-option" data-lang="ar">
                            <span class="font-semibold">🇲🇦</span>
                            <span>العربية</span>
                            <span id="check-ar" class="ml-auto hidden" style="color: #CC0000;">✓</span>
                        </button>
                    </div>
                </div>
                
                <!-- Login Button -->
                <a 
                    href="{{ route('actor.login') }}" 
                    class="px-6 py-2 rounded-lg text-white font-semibold transition-colors hover:opacity-90"
                    style="background-color: #CC0000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
                    data-i18n="login"
                >
                    login
                </a>
            </div>
        </div>
        
        <!-- Menu Mobile -->
        <div id="mobile-menu" class="hidden lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav class="flex flex-col gap-2 pt-4">
                <a 
                    href="{{ route('home') }}" 
                    class="px-4 py-3 rounded-full transition-colors {{ request()->routeIs('home') ? 'text-white' : 'hover:bg-gray-100' }}"
                    style="{{ request()->routeIs('home') ? 'background-color: #CC0000;' : 'color: #333333;' }}"
                    data-i18n="home"
                    onclick="closeMobileMenu()"
                >
                    Accueil
                </a>
                <a 
                    href="{{ route('actors.index') }}" 
                    class="px-4 py-3 rounded-full transition-colors {{ request()->routeIs('actors.*') ? 'text-white' : 'hover:bg-gray-100' }}"
                    style="{{ request()->routeIs('actors.*') ? 'background-color: #CC00 00;' : 'color: #333333;' }}"
                    data-i18n="directory"
                    onclick="closeMobileMenu()"
                >
                    Annuaire
                </a>
                <a 
                    href="{{ route('events.index') }}" 
                    class="px-4 py-3 rounded-full transition-colors {{ request()->routeIs('events.*') ? 'text-white' : 'hover:bg-gray-100' }}"
                    style="{{ request()->routeIs('events.*') ? 'background-color: #CC0000;' : 'color: #333333;' }}"
                    data-i18n="events"
                    onclick="closeMobileMenu()"
                >
                    Événements
                </a>
                <a 
                    href="{{ route('news.index') }}" 
                    class="px-4 py-3 rounded-full transition-colors {{ request()->routeIs('news.*') ? 'text-white' : 'hover:bg-gray-100' }}"
                    style="{{ request()->routeIs('news.*') ? 'background-color: #CC0000;' : 'color: #333333;' }}"
                    data-i18n="news"
                    onclick="closeMobileMenu()"
                >
                    Actualités
                </a>
                <a 
                    href="/accreditation" 
                    class="px-4 py-3 rounded-full hover:bg-gray-100 transition-colors" 
                    style="color: #333333;" 
                    data-i18n="accreditation"
                    onclick="closeMobileMenu()"
                >
                    Accréditation
                </a>
                <a 
                    href="{{ route('join') }}" 
                    class="px-4 py-3 rounded-full hover:bg-gray-100 transition-colors" 
                    style="color: #333333;" 
                    data-i18n="joinLink"
                    onclick="closeMobileMenu()"
                >
                    Adhérer
                </a>
                <a 
                    href="{{ route('ecosystem') }}" 
                    class="px-4 py-3 rounded-full hover:bg-gray-100 transition-colors {{ request()->routeIs('ecosystem') ? 'text-white' : '' }}" 
                    style="{{ request()->routeIs('ecosystem') ? 'background-color: #CC0000;' : 'color: #333333;' }}" 
                    data-i18n="ecosystem"
                    onclick="closeMobileMenu()"
                >
                    Écosystème
                </a>
                <a 
                    href="{{ route('jobs') }}" 
                    class="px-4 py-3 rounded-full hover:bg-gray-100 transition-colors {{ request()->routeIs('jobs') ? 'text-white' : '' }}" 
                    style="{{ request()->routeIs('jobs') ? 'background-color: #CC0000;' : 'color: #333333;' }}" 
                    data-i18n="jobs"
                    onclick="closeMobileMenu()"
                >
                    Emploi
                </a>
                <a 
                    href="{{ route('contact') }}" 
                    class="px-4 py-3 rounded-full hover:bg-gray-100 transition-colors" 
                    style="color: #333333;" 
                    data-i18n="contact"
                    onclick="closeMobileMenu()"
                >
                    Contacter
                </a>
                <a 
                    href="{{ route('actor.login') }}" 
                    class="px-4 py-3 rounded-lg text-white font-semibold transition-colors hover:opacity-90 text-center mt-2"
                    style="background-color: #CC0000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
                    data-i18n="login"
                    onclick="closeMobileMenu()"
                >
                    login
                </a>
            </nav>
        </div>
    </div>
</header>

<script>
    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');
        
        if (menu) {
            menu.classList.toggle('hidden');
            
            // Toggle icons
            if (menu.classList.contains('hidden')) {
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        }
    }

    function closeMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');
        
        if (menu) {
            menu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    function toggleLanguageMenu(event) {
        if (event) {
            event.stopPropagation();
        }
        const menu = document.getElementById('lang-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    }

    function changeLanguage(lang, event) {
        // Empêcher le comportement par défaut si event est fourni
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        console.log('Changement de langue vers:', lang);
        
        // Vérifier que la langue est valide
        if (!['fr', 'en', 'ar'].includes(lang)) {
            console.error('Langue invalide:', lang);
            return false;
        }
        
        // Fonction pour essayer de changer la langue
        const tryChangeLanguage = (attempt = 0) => {
            if (window.i18n && typeof window.i18n.setLanguage === 'function') {
                try {
                    // Changer la langue (cette fonction appelle déjà updatePageTranslations)
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
                    
                    console.log('Langue changée avec succès vers:', lang);
                    
                    // Forcer une mise à jour supplémentaire après un court délai
                    setTimeout(() => {
                        if (window.i18n && window.i18n.updatePageTranslations) {
                            window.i18n.updatePageTranslations();
                        }
                    }, 200);
                    
                    return true;
                } catch (error) {
                    console.error('Erreur lors du changement de langue:', error);
                    return false;
                }
            } else if (attempt < 10) {
                // Réessayer après un court délai si i18n n'est pas encore chargé
                setTimeout(() => tryChangeLanguage(attempt + 1), 100);
                return false;
            } else {
                console.error('i18n non disponible après 10 tentatives');
                // Fallback : sauvegarder la langue dans localStorage et recharger
                localStorage.setItem('language', lang);
                window.location.reload();
                return false;
            }
        };
        
        return tryChangeLanguage();
    }

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        const selector = document.getElementById('language-selector');
        const langMenu = document.getElementById('lang-menu');
        
        // Ne pas fermer si on clique sur un bouton de langue
        if (e.target.closest('.language-option')) {
            return;
        }
        
        if (selector && langMenu && !selector.contains(e.target)) {
            langMenu.classList.add('hidden');
        }
        
        // Fermer le menu mobile si on clique en dehors
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuBtn && mobileMenu && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Initialiser l'affichage de la langue au chargement
    function initLanguageDisplay() {
        const tryInit = () => {
            if (window.i18n && window.i18n.getCurrentLanguage) {
                const lang = window.i18n.getCurrentLanguage();
                const langNames = { fr: 'FR', en: 'EN', ar: 'AR' };
                const currentLangEl = document.getElementById('current-lang');
                if (currentLangEl) {
                    currentLangEl.textContent = langNames[lang] || 'FR';
                }
                
                // Mettre à jour la direction du texte (RTL pour l'arabe)
                const htmlEl = document.documentElement;
                if (lang === 'ar') {
                    htmlEl.setAttribute('dir', 'rtl');
                    htmlEl.setAttribute('lang', 'ar');
                } else {
                    htmlEl.setAttribute('dir', 'ltr');
                    htmlEl.setAttribute('lang', lang);
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
            } else {
                // Réessayer après un court délai si i18n n'est pas encore chargé
                setTimeout(tryInit, 50);
            }
        };
        
        tryInit();
    }

    // Initialiser au chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguageDisplay);
    } else {
        // Attendre un peu pour que i18n.js soit chargé
        setTimeout(initLanguageDisplay, 100);
    }
    
    // Écouter les changements de langue pour mettre à jour l'affichage
    window.addEventListener('languageChanged', () => {
        setTimeout(initLanguageDisplay, 50);
    });
</script>
