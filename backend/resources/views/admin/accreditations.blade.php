@extends('layouts.admin')

@section('content')
<div class="min-h-screen bg-gray-50">
    @include('admin.partials.header', [
        'title' => 'Acteurs Accrédités',
        'subtitle' => 'Liste des acteurs avec accréditation MATA'
    ])

    <div class="p-6">
        <!-- Search -->
        <div class="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
            <div class="relative">
                <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                <input id="accreditations-search" type="text" placeholder="Rechercher par nom, email, ville..." class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-900 bg-white" />
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div id="accreditations-table-container">
                <div class="flex justify-center items-center py-20">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
