@extends('layouts.admin')

@section('content')
<div class="min-h-screen bg-gray-50">
    @include('admin.partials.header', [
        'title' => 'Gestion des Acteurs',
        'subtitle' => 'Gérez tous les acteurs du tourisme accrédités',
        'actions' => '
            <button id="import-excel-btn" class="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                <i data-lucide="file-spreadsheet" class="w-4 h-4"></i>
                Importer Excel
            </button>
            <button id="add-actor-btn" class="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                <i data-lucide="plus" class="w-4 h-4"></i>
                Ajouter un acteur
            </button>
        '
    ])

    <div class="p-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" id="actors-stats">
            <div class="text-center py-8 bg-gray-100 rounded-lg animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
                <div class="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>
            </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
            <h2 class="text-base font-semibold text-gray-800 mb-4">Filtres de recherche</h2>
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1 relative">
                    <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                    <input
                        id="actors-search"
                        type="text"
                        placeholder="Rechercher par nom, email, ville..."
                        class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-900 bg-white"
                    />
                </div>
                <select id="actors-type" class="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900">
                    <option value="">Tous les types</option>
                    <option value="hotel">Hôtel</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="travel_agency">Agence de Voyage</option>
                    <option value="tour_guide">Guide Touristique</option>
                    <option value="transport">Transport</option>
                    <option value="attraction">Attraction</option>
                </select>
                <select id="actors-status" class="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900">
                    <option value="">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="pending">En attente</option>
                    <option value="suspended">Suspendu</option>
                </select>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div id="actors-table-container">
                <div class="flex flex-col justify-center items-center py-20">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
                    <p class="mt-4 text-gray-600">Chargement des données...</p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modals will be inserted here by JavaScript -->
@endsection
