<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Connexion - MATA</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center gap-3 mb-4">
                <span class="text-4xl font-bold text-red-500 tracking-tight">MATA</span>
            </div>
            <h1 class="text-2xl font-bold text-white mb-1">Espace Membre</h1>
            <p class="text-sm text-red-200">Connexion à votre compte</p>
        </div>

        <div class="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-red-900 rounded-full mb-4">
                    <i data-lucide="lock" class="w-8 h-8 text-white"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Connexion</h2>
            </div>

            <div id="error-message" class="mb-6 hidden p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p class="text-sm text-red-600 font-medium" id="error-text"></p>
            </div>

            <form id="login-form" class="space-y-6">
                <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input id="email" type="email" required placeholder="votre@email.com" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900" />
                </div>

                <div>
                    <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
                    <input id="password" type="password" required placeholder="••••••••" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900" />
                </div>

                <button type="submit" id="submit-btn" class="w-full py-3 bg-red-900 text-white rounded-xl hover:bg-red-800 transition-colors font-semibold disabled:opacity-50">
                    <span id="submit-text">Se connecter</span>
                </button>
            </form>
        </div>
    </div>

    <script>
        // Login logic avec redirection automatique selon le rôle
        document.getElementById('login-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const submitBtn = document.getElementById('submit-btn');
            const submitText = document.getElementById('submit-text');
            
            // Désactiver le bouton pendant la connexion
            submitBtn.disabled = true;
            submitText.textContent = 'Connexion...';
            
            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await res.json();
                
                if (data.success && data.data.user) {
                    const user = data.data.user;
                    localStorage.setItem('auth_token', data.data.token);
                    localStorage.setItem('auth_user', JSON.stringify(user));
                    
                    // Rediriger selon le rôle
                    switch(user.role) {
                        case 'admin':
                            window.location.href = '/admin  ';
                            break;
                        case 'actor':
                            window.location.href = '/actor/dashboard';
                            break;
                        case 'user':
                            window.location.href = '/candidate/dashboard';
                            break;
                        default:
                            throw new Error('Rôle non reconnu');
                    }
                } else {
                    throw new Error(data.message || 'Erreur de connexion');
                }
            } catch (error) {
                document.getElementById('error-message').classList.remove('hidden');
                document.getElementById('error-text').textContent = error.message || 'Erreur de connexion';
                submitBtn.disabled = false;
                submitText.textContent = 'Se connecter';
            }
        });
        
        lucide.createIcons();
    </script>
</body>
</html>
