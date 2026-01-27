<header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-2 sm:px-4 py-3 sm:py-4 overflow-visible">
        <div class="flex items-center justify-between overflow-visible">
            <a href="{{ route('home') }}" class="flex items-center gap-2 sm:gap-4">
                <div class="relative h-14 sm:h-16 md:h-20 lg:h-24 w-auto">
                    @php
                        $logoSetting = \App\Models\Setting::where('key', 'site_logo')->first();
                        $logoPath = $logoSetting && $logoSetting->value_fr ? asset('storage/' . $logoSetting->value_fr) : asset('images/Logo.png');
                    @endphp
                    <img 
                        src="{{ $logoPath }}" 
                        alt="MATA Logo"
                        class="object-contain h-full w-auto max-w-full"
                        style="max-width: clamp(140px, 20vw, 250px);"
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

            <div class="flex items-center gap-1.5 sm:gap-2 md:gap-4 overflow-visible">
                <!-- Bouton Menu Mobile -->
                <button 
                    id="mobile-menu-btn"
                    class="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-100 transition-colors"
                    style="color: #333333;"
                    onclick="toggleMobileMenu()"
                    aria-label="Menu"
                >
                    <svg id="menu-icon" class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    <svg id="close-icon" class="w-5 h-5 sm:w-6 sm:h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <!-- Language Selector -->
                <div class="relative overflow-visible" id="language-selector">
                    <button 
                        id="lang-btn"
                        class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg transition-colors bg-white text-xs sm:text-sm md:text-base"
                        style="color: #333333; border: 1px solid #CC0000;"
                        onclick="toggleLanguageMenu(event); return false;"
                    >
                        <svg class="w-3 h-3 sm:w-4 sm:h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
                        </svg>
                        <span id="current-lang" class="font-semibold">FR</span>
                        <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div id="lang-menu" class="hidden absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]">
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
                
                <!-- User Menu / Login Button -->
                <div id="auth-section" class="overflow-visible">
                    <!-- Login Button (shown when not logged in) -->
                    <a 
                        id="login-btn"
                        href="{{ route('actor.login') }}" 
                        class="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg text-white font-semibold transition-colors hover:opacity-90 text-xs sm:text-sm md:text-base whitespace-nowrap"
                        style="background-color: #CC0000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
                        data-i18n="login"
                    >
                        Se connecter
                    </a>

                    <!-- User Menu (shown when logged in) -->
                    <div id="user-menu-container" class="hidden relative overflow-visible">
                        <button 
                            id="user-menu-btn"
                            onclick="toggleUserMenu()"
                            class="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base"
                            style="color: #333333;"
                        >
                            <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm" style="background-color: #CC0000;">
                                <span id="user-initials"></span>
                            </div>
                            <span id="user-name-display" class="font-semibold hidden sm:inline"></span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>

                        <!-- Dropdown Menu -->
                        <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]">
                            <div class="px-4 py-2 border-b border-gray-200">
                                <p class="text-xs text-gray-500" data-i18n="connectedAs">Connecté en tant que</p>
                                <p id="user-email-display" class="text-sm font-semibold truncate" style="color: #333333;"></p>
                                <p id="user-role-display" class="text-xs text-gray-500"></p>
                            </div>
                            <button 
                                id="dashboard-link"
                                onclick="goToDashboard()"
                                class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
                                style="color: #333333;"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                                <span data-i18n="myDashboard">Mon espace</span>
                            </button>
                            <button 
                                onclick="handleLogout()"
                                class="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-sm text-red-600"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                </svg>
                                <span data-i18n="logout">Déconnexion</span>
                            </button>
                        </div>
                    </div>
                </div>
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
                <!-- Login Button Mobile (shown when not logged in) -->
                <a 
                    id="mobile-login-btn"
                    href="{{ route('actor.login') }}" 
                    class="px-4 py-3 rounded-lg text-white font-semibold transition-colors hover:opacity-90 text-center mt-2"
                    style="background-color: #CC0000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
                    data-i18n="login"
                    onclick="closeMobileMenu()"
                >
                    Se connecter
                </a>

                <!-- User Menu Mobile (shown when logged in) -->
                <div id="mobile-user-menu" class="hidden mt-2 border-t border-gray-200 pt-2">
                    <div class="px-4 py-3 bg-gray-50 rounded-lg mb-2">
                        <p class="text-xs text-gray-500" data-i18n="connectedAs">Connecté en tant que</p>
                        <p id="mobile-user-name" class="text-sm font-semibold" style="color: #333333;"></p>
                        <p id="mobile-user-email" class="text-xs text-gray-500 truncate"></p>
                        <p id="mobile-user-role" class="text-xs text-gray-500"></p>
                    </div>
                    <button 
                        onclick="goToDashboard(); closeMobileMenu();"
                        class="w-full px-4 py-3 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-sm"
                        style="color: #333333;"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <span data-i18n="myDashboard">Mon espace</span>
                    </button>
                    <button 
                        onclick="handleLogout()"
                        class="w-full px-4 py-3 rounded-lg hover:bg-red-50 flex items-center gap-2 text-sm text-red-600"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        <span data-i18n="logout">Déconnexion</span>
                    </button>
                </div>
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
        document.addEventListener('DOMContentLoaded', () => {
            initLanguageDisplay();
            checkAuthStatus();
        });
    } else {
        // Attendre un peu pour que i18n.js soit chargé
        setTimeout(() => {
            initLanguageDisplay();
            checkAuthStatus();
        }, 100);
    }
    
    // Écouter les changements de langue pour mettre à jour l'affichage
    window.addEventListener('languageChanged', () => {
        setTimeout(initLanguageDisplay, 50);
    });

    // ==================== AUTH MANAGEMENT ====================
    
    // Vérifier le statut d'authentification et afficher le menu utilisateur approprié
    function checkAuthStatus() {
        const token = localStorage.getItem('auth_token');
        const userStr = localStorage.getItem('auth_user');
        
        const loginBtn = document.getElementById('login-btn');
        const userMenuContainer = document.getElementById('user-menu-container');
        const mobileLoginBtn = document.getElementById('mobile-login-btn');
        const mobileUserMenu = document.getElementById('mobile-user-menu');
        
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                
                // Desktop: Cacher le bouton de connexion, afficher le menu utilisateur
                if (loginBtn) loginBtn.classList.add('hidden');
                if (userMenuContainer) userMenuContainer.classList.remove('hidden');
                
                // Mobile: Cacher le bouton de connexion, afficher le menu utilisateur
                if (mobileLoginBtn) mobileLoginBtn.classList.add('hidden');
                if (mobileUserMenu) mobileUserMenu.classList.remove('hidden');
                
                // Afficher les informations de l'utilisateur
                displayUserInfo(user);
            } catch (error) {
                console.error('Erreur lors de la lecture des données utilisateur:', error);
                showLoginButton();
            }
        } else {
            showLoginButton();
        }
    }
    
    // Afficher le bouton de connexion
    function showLoginButton() {
        const loginBtn = document.getElementById('login-btn');
        const userMenuContainer = document.getElementById('user-menu-container');
        const mobileLoginBtn = document.getElementById('mobile-login-btn');
        const mobileUserMenu = document.getElementById('mobile-user-menu');
        
        // Desktop
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userMenuContainer) userMenuContainer.classList.add('hidden');
        
        // Mobile
        if (mobileLoginBtn) mobileLoginBtn.classList.remove('hidden');
        if (mobileUserMenu) mobileUserMenu.classList.add('hidden');
    }
    
    // Afficher les informations de l'utilisateur
    function displayUserInfo(user) {
        const userName = user.name || 'Utilisateur';
        const userEmail = user.email || '';
        const userRole = user.role || '';
        
        // Obtenir les initiales
        const initials = userName.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
        
        // Afficher le rôle de manière lisible
        const roleLabels = {
            'user': 'Candidat',
            'tourism_actor': 'Acteur touristique',
            'actor': 'Acteur touristique',
            'admin': 'Administrateur'
        };
        const roleLabel = roleLabels[userRole] || userRole;
        
        // Desktop - Mettre à jour l'affichage
        const initialsEl = document.getElementById('user-initials');
        const nameEl = document.getElementById('user-name-display');
        const emailEl = document.getElementById('user-email-display');
        const roleEl = document.getElementById('user-role-display');
        
        if (initialsEl) initialsEl.textContent = initials;
        if (nameEl) nameEl.textContent = userName;
        if (emailEl) emailEl.textContent = userEmail;
        if (roleEl) roleEl.textContent = roleLabel;
        
        // Mobile - Mettre à jour l'affichage
        const mobileNameEl = document.getElementById('mobile-user-name');
        const mobileEmailEl = document.getElementById('mobile-user-email');
        const mobileRoleEl = document.getElementById('mobile-user-role');
        
        if (mobileNameEl) mobileNameEl.textContent = userName;
        if (mobileEmailEl) mobileEmailEl.textContent = userEmail;
        if (mobileRoleEl) mobileRoleEl.textContent = roleLabel;
    }
    
    // Basculer le menu utilisateur
    function toggleUserMenu() {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }
    
    // Aller au dashboard selon le rôle
    function goToDashboard() {
        const userStr = localStorage.getItem('auth_user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                
                switch (user.role) {
                    case 'user':
                        window.location.href = '/candidate/dashboard';
                        break;
                    case 'tourism_actor':
                    case 'actor':
                        window.location.href = '/actor/dashboard';
                        break;
                    case 'admin':
                        window.location.href = '/admin/dashboard';
                        break;
                    default:
                        window.location.href = '/';
                }
            } catch (error) {
                console.error('Erreur:', error);
                window.location.href = '/';
            }
        }
    }
    
    // Gérer la déconnexion
    async function handleLogout() {
        if (!confirm('Voulez-vous vous déconnecter ?')) {
            return;
        }
        
        try {
            const token = localStorage.getItem('auth_token');
            
            if (token) {
                // Appeler l'API de déconnexion
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).catch(err => console.log('Logout API error:', err));
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            // Toujours nettoyer le localStorage et rediriger
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            
            // Rediriger vers la page de login des acteurs
            window.location.href = '/actor/login';
        }
    }
    
    // Fermer le menu utilisateur si on clique en dehors
    document.addEventListener('click', (e) => {
        const userMenuContainer = document.getElementById('user-menu-container');
        const userDropdown = document.getElementById('user-dropdown');
        
        if (userMenuContainer && userDropdown && !userMenuContainer.contains(e.target)) {
            userDropdown.classList.add('hidden');
        }
    });
</script>

<style>
    /* S'assurer que le header et ses enfants n'ont pas de scroll */
    header {
        overflow: visible !important;
    }
    
    header > div {
        overflow: visible !important;
    }
    
    header .container {
        overflow: visible !important;
    }
    
    /* S'assurer que les dropdowns sont au-dessus de tout */
    #user-dropdown,
    #lang-menu {
        position: absolute;
        z-index: 9999 !important;
        max-height: none !important;
        overflow: visible !important;
    }
    
    #user-menu-container,
    #language-selector {
        overflow: visible !important;
    }
    
    #auth-section {
        overflow: visible !important;
    }
    
    /* S'assurer que tous les éléments flex du header sont overflow-visible */
    header .flex {
        overflow: visible !important;
    }
</style>
