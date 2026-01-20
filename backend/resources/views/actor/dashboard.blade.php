<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Mon Espace - MATA</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-red-900 to-red-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">Mon Espace</h1>
                    <p class="text-red-100 text-sm">Gérez vos informations et votre profil</p>
                </div>
                <button id="logout-btn" class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium">
                    <i data-lucide="log-out" class="w-5 h-5"></i>
                    Déconnexion
                </button>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
        <div id="actor-dashboard" class="min-h-[400px]">
            <div class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-red-900 border-t-transparent mx-auto mb-4"></div>
                <p class="text-gray-600">Chargement de votre espace...</p>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/actor-dashboard.js') }}"></script>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>
