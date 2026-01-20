@extends('layouts.admin')

@section('content')
<div class="min-h-screen bg-gray-50">
    @include('admin.partials.header', [
        'title' => 'Événements',
        'subtitle' => 'Gestion des événements'
    ])

    <div class="p-6">
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-serif font-bold tracking-tight text-gray-900">Gestion des Événements</h1>
                <p class="text-gray-600 mt-1">Gérez tous les événements professionnels</p>
            </div>
            <button id="add-event-btn" class="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg font-medium">
                <i data-lucide="plus" class="w-5 h-5"></i>
                Nouvel événement
            </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6" id="events-stats">
            <div class="text-center py-8 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-900">Filtres et Recherche</h2>
                <button id="reset-events-filters-btn" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Réinitialiser
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
                    <div class="relative">
                        <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                        <input id="events-search" type="text" placeholder="Rechercher un événement..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                    <select id="events-category" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white">
                        <option value="">Toutes les catégories</option>
                        <option value="Conférence">Conférence</option>
                        <option value="Salon">Salon</option>
                        <option value="Formation">Formation</option>
                        <option value="Networking">Networking</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                    <select id="events-status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white">
                        <option value="all">Tous les statuts</option>
                        <option value="draft">Brouillon</option>
                        <option value="published">Publié</option>
                        <option value="cancelled">Annulé</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button id="refresh-events-btn" class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                        Actualiser
                    </button>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div id="events-table-container">
                <div class="text-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
                    <p class="text-gray-600">Chargement des événements...</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
