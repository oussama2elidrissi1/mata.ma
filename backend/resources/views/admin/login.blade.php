<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Connexion Admin - MATA</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
        <!-- Logo -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center gap-3 mb-4">
                <div class="relative">
                    <span class="text-4xl font-bold text-red-500 tracking-tight" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.2); letter-spacing: -0.02em;">
                        MATA
                    </span>
                </div>
            </div>
            <h1 class="text-2xl font-bold text-white mb-1">Administration</h1>
            <p class="text-sm text-blue-200">Espace de gestion</p>
        </div>

        <!-- Login Card -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4">
                    <i data-lucide="lock" class="w-8 h-8 text-white"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Connexion Admin</h2>
                <p class="text-gray-600">Accédez à l'administration MATA</p>
            </div>

            <div id="error-message" class="mb-6 hidden p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3">
                <i data-lucide="alert-circle" class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"></i>
                <p class="text-sm text-red-600 font-medium" id="error-text"></p>
            </div>

            <form id="login-form" class="space-y-6">
                <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                        Adresse email
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i data-lucide="mail" class="h-5 w-5 text-gray-400"></i>
                        </div>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="admin@exemple.ma"
                            class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all text-gray-900 bg-white"
                        />
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                        Mot de passe
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i data-lucide="lock" class="h-5 w-5 text-gray-400"></i>
                        </div>
                        <input
                            id="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all text-gray-900 bg-white"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    id="submit-btn"
                    class="w-full py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <i data-lucide="log-in" class="w-5 h-5" id="login-icon"></i>
                    <span id="submit-text">Se connecter</span>
                </button>
            </form>

            
        </div>
    </div>

    <script src="{{ asset('js/admin-login.js') }}" defer></script>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>
