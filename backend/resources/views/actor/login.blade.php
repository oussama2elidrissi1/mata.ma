@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-gray-50 flex items-center justify-center py-8 sm:py-12 px-3 sm:px-4 lg:px-8">
    <div class="max-w-md w-full">
        <!-- Logo et titre -->
        <div class="text-center mb-8">
            <div class="flex justify-center mb-6">
                @php
                    $logoSetting = \App\Models\Setting::where('key', 'site_logo')->first();
                    $logoPath = $logoSetting && $logoSetting->value_fr ? asset('storage/' . $logoSetting->value_fr) : asset('images/Logo.png');
                @endphp
                <img 
                    src="{{ $logoPath }}" 
                    alt="MATA Logo"
                    class="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-full object-contain"
                    style="max-width: 280px;"
                    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Ctext x=%2210%22 y=%2245%22 font-size=%2236%22 font-weight=%22900%22 fill=%22%23CC0000%22%3EMATA%3C/text%3E%3C/svg%3E'"
                />
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold mb-2" style="color: #1a1a1a;" data-i18n="loginTitle">
                Connexion
            </h2>
            <p class="text-sm sm:text-base text-gray-600" data-i18n="loginSubtitle">
                Accédez à votre espace personnel
            </p>
        </div>
        
        <!-- Formulaire de connexion -->
        <div class="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <form id="universal-login-form" class="space-y-5" onsubmit="handleLogin(event)">
                <!-- Message d'erreur -->
                <div id="login-error" class="hidden p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"></div>
                
                <!-- Message de succès -->
                <div id="login-success" class="hidden p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                    Connexion réussie ! Redirection en cours...
                </div>
                
                <!-- Champ Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2" data-i18n="email">
                        Adresse email
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                            </svg>
                        </div>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            required 
                            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base placeholder-gray-400 text-gray-900"
                            placeholder="votre.email@exemple.com"
                            data-i18n-placeholder="emailPlaceholder"
                            autocomplete="email"
                        >
                    </div>
                </div>

                <!-- Champ Mot de passe -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-2" data-i18n="password">
                        Mot de passe
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                        </div>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            required 
                            class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base placeholder-gray-400 text-gray-900"
                            placeholder="••••••••"
                            data-i18n-placeholder="passwordPlaceholder"
                            autocomplete="current-password"
                        >
                        <button
                            type="button"
                            onclick="togglePassword()"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg id="eye-icon" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Options -->
                <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center">
                        <input 
                            id="remember-me" 
                            name="remember-me" 
                            type="checkbox" 
                            class="h-4 w-4 rounded border-gray-300 focus:ring-red-500"
                            style="color: #CC0000;"
                        >
                        <label for="remember-me" class="ml-2 text-gray-700" data-i18n="rememberMe">
                            Se souvenir de moi
                        </label>
                    </div>
                    <a href="#" class="font-medium hover:underline" style="color: #CC0000;" data-i18n="forgotPassword">
                        Mot de passe oublié ?
                    </a>
                </div>

                <!-- Bouton de connexion -->
                <button 
                    type="submit"
                    id="login-button"
                    class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-white font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all hover:opacity-90"
                    style="background-color: #CC0000;"
                >
                    <span id="login-button-text" data-i18n="login">Se connecter</span>
                    <svg id="login-spinner" class="hidden animate-spin ml-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </button>

               
            </form>

            <!-- Liens supplémentaires -->
            <div class="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div class="text-center">
                    <a href="{{ route('home') }}" class="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        <span data-i18n="backToHome">Retour à l'accueil</span>
                    </a>
                </div>
                <div class="text-center">
                    <p class="text-sm text-gray-600">
                        <span data-i18n="noAccount">Pas encore de compte ?</span>
                        <a href="{{ route('join') }}" class="font-medium ml-1" style="color: #CC0000;" data-i18n="joinNow">
                            Rejoignez-nous
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // Basculer la visibilité du mot de passe
    function togglePassword() {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eye-icon');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
            `;
        } else {
            passwordInput.type = 'password';
            eyeIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            `;
        }
    }

    // Gérer la connexion universelle
    async function handleLogin(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const errorDiv = document.getElementById('login-error');
        const successDiv = document.getElementById('login-success');
        const loginButton = document.getElementById('login-button');
        const buttonText = document.getElementById('login-button-text');
        const spinner = document.getElementById('login-spinner');
        
        // Cacher les messages
        errorDiv.classList.add('hidden');
        successDiv.classList.add('hidden');
        
        // Afficher le spinner
        loginButton.disabled = true;
        buttonText.textContent = 'Connexion...';
        spinner.classList.remove('hidden');

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

            if (data.success && data.data && data.data.user) {
                const userRole = data.data.user.role;
                
                // Sauvegarder le token et les infos utilisateur
                localStorage.setItem('auth_token', data.data.token);
                localStorage.setItem('auth_user', JSON.stringify(data.data.user));
                
                // Afficher le message de succès
                successDiv.classList.remove('hidden');
                
                // Rediriger selon le rôle après un court délai
                setTimeout(() => {
                    switch(userRole) {
                        case 'admin':
                            window.location.href = '{{ route("admin.dashboard") }}';
                            break;
                        case 'actor':
                            window.location.href = '{{ route("actor.dashboard") }}';
                            break;
                        case 'association':
                            window.location.href = '{{ route("association.dashboard") }}';
                            break;
                        case 'user':
                            window.location.href = '{{ route("candidate.dashboard") }}';
                            break;
                        default:
                            errorDiv.textContent = 'Type de compte non reconnu.';
                            errorDiv.classList.remove('hidden');
                            resetButton();
                    }
                }, 500);
            } else {
                errorDiv.textContent = data.message || 'Email ou mot de passe incorrect.';
                errorDiv.classList.remove('hidden');
                resetButton();
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            errorDiv.textContent = 'Erreur de connexion. Veuillez réessayer.';
            errorDiv.classList.remove('hidden');
            resetButton();
        }
    }

    function resetButton() {
        const loginButton = document.getElementById('login-button');
        const buttonText = document.getElementById('login-button-text');
        const spinner = document.getElementById('login-spinner');
        
        loginButton.disabled = false;
        buttonText.textContent = 'Se connecter';
        spinner.classList.add('hidden');
    }

    // Gérer l'appui sur Entrée dans les champs
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('universal-login-form');
        const inputs = form.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    form.dispatchEvent(new Event('submit'));
                }
            });
        });
    });
</script>
@endsection
