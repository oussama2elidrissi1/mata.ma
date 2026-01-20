@extends('layouts.admin')

@section('content')
<div class="min-h-screen bg-gray-50">
    @include('admin.partials.header', [
        'title' => 'Statistiques',
        'subtitle' => 'Analyse détaillée des données'
    ])

    <div class="p-6">
        <div id="stats-container">
            <div class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent mx-auto mb-4"></div>
                <p class="text-gray-600">Chargement des statistiques...</p>
            </div>
        </div>
    </div>
</div>
@endsection
