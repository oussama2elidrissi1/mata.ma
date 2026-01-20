@extends('layouts.admin')

@section('content')
<div class="min-h-screen bg-gray-50">
    @include('admin.partials.header', [
        'title' => 'Gestion des Utilisateurs',
        'subtitle' => 'Gérer les comptes utilisateurs et leurs mots de passe',
        'actions' => '
            <button id="add-user-btn" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 font-semibold">
                <i data-lucide="plus" class="w-5 h-5"></i>
                Nouvel Utilisateur
            </button>
        '
    ])

    <div class="p-6">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" id="users-stats">
            <div class="text-center py-8 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
            <h2 class="text-base font-semibold text-gray-800 mb-4">Filtres de recherche</h2>
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1 relative">
                    <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                    <input id="users-search" type="text" placeholder="Rechercher par nom ou email..." class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-900 bg-white" />
                </div>
                <select id="users-role" class="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 bg-white">
                    <option value="">Tous les rôles</option>
                    <option value="admin">Administrateurs</option>
                    <option value="actor">Acteurs</option>
                </select>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div id="users-table-container">
                <div class="flex justify-center items-center py-20">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
