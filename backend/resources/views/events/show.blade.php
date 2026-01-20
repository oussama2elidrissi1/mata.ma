@extends('layouts.app')

@section('content')
<div class="bg-gradient-to-b from-slate-50 to-white min-h-screen">
    <div class="mx-auto max-w-6xl px-4 py-8">
        <!-- Breadcrumb -->
        <div class="mb-6">
            <nav class="flex items-center space-x-2 text-sm text-slate-600">
                <a href="{{ route('home') }}" class="hover:text-slate-900">Accueil</a>
                <span>/</span>
                <a href="{{ route('events.index') }}" class="hover:text-slate-900">Événements</a>
                <span>/</span>
                <span class="text-slate-900">Détails</span>
            </nav>
        </div>

        <!-- Event Detail -->
        <div id="event-detail" data-id="{{ $id }}" class="min-h-[400px]">
            <div class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
                <p class="text-slate-600">Chargement de l'événement...</p>
            </div>
        </div>

        <!-- Related Events -->
        <div class="mt-16">
            <h2 class="text-2xl font-serif font-bold mb-6">Événements Similaires</h2>
            <div id="related-events" data-exclude-id="{{ $id }}" class="min-h-[200px]">
                <div class="text-center text-slate-600">Chargement...</div>
            </div>
        </div>
    </div>
</div>
@endsection

