@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold" style="color: #1a1a1a;" data-i18n="candidateLoginTitle">
                Connexion Candidat
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600" data-i18n="candidateLoginSubtitle">
                Connectez-vous pour accéder à votre espace candidat
            </p>
        </div>
        
        <form id="candidate-login-form" class="mt-8 space-y-6" onsubmit="handleCandidateLogin(event)">
            <div id="login-error" class="hidden p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"></div>
            
            <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="email" class="sr-only" data-i18n="email">Email</label>
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" 
                        placeholder="Votre email"
                        data-i18n-placeholder="emailPlaceholder"
                    >
                </div>
                <div>
                    <label for="password" class="sr-only" data-i18n="password">Mot de passe</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        required 
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" 
                        placeholder="Votre mot de passe"
                        data-i18n-placeholder="passwordPlaceholder"
                    >
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="text-sm">
                    <a href="{{ route('jobs') }}" class="font-medium" style="color: #CC0000;" data-i18n="backToJobs">
                        Retour aux offres
                    </a>
                </div>
            </div>

            <div>
                <button 
                    type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    style="background-color: #CC0000;"
                    data-i18n="login"
                >
                    Se connecter
                </button>
            </div>

            <div class="text-center">
                <p class="text-sm text-gray-600" data-i18n="noAccount">
                    Pas encore de compte ?
                    <button 
                        type="button"
                        onclick="window.location.href='{{ route('jobs') }}'"
                        class="font-medium"
                        style="color: #CC0000;"
                        data-i18n="createAccount"
                    >
                        Créer un compte
                    </button>
                </p>
            </div>
        </form>
    </div>
</div>

<script>
    async function handleCandidateLogin(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const errorDiv = document.getElementById('login-error');
        
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
</script>
@endsection
