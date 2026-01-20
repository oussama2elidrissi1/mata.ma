<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard Association - MATA</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="min-h-screen bg-gray-50">
    <div class="bg-blue-900 text-white p-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <h1 class="text-xl font-bold">Espace Association</h1>
            <button id="logout-btn" class="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700">Déconnexion</button>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <div id="association-dashboard" class="min-h-[400px]">
            <div class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent mx-auto mb-4"></div>
                <p class="text-gray-600">Chargement...</p>
            </div>
        </div>
    </div>

    <script>
        // Check auth and load dashboard
        const token = localStorage.getItem('auth_token');
        if (!token) {
            window.location.href = '/admin/login';
        } else {
            document.getElementById('logout-btn')?.addEventListener('click', () => {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
                window.location.href = '/admin/login';
            });
            
            // Load association dashboard content
            document.getElementById('association-dashboard').innerHTML = `
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-2xl font-bold mb-4">Bienvenue dans votre espace association</h2>
                    <p class="text-gray-600">Fonctionnalités à venir...</p>
                </div>
            `;
        }
        
        lucide.createIcons();
    </script>
</body>
</html>
