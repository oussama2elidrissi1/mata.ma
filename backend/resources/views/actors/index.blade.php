@extends('layouts.app')

@section('content')
    <div class="bg-slate-50">
        <div class="mx-auto max-w-6xl px-4 py-10">
            <div class="mb-8">
                <h1 class="text-4xl md:text-5xl font-serif font-bold tracking-tight text-slate-900" data-i18n="directory">
                    Annuaire des Acteurs du Tourisme
                </h1>
                <p class="mt-2 text-slate-600" data-i18n="loading">
                    Chargé via JavaScript depuis l'API Laravel.
                </p>
            </div>

            <form id="actors-filters" class="bg-white rounded-2xl shadow p-6 border border-slate-100 mb-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-slate-700 mb-2" data-i18n="search">Recherche</label>
                        <input id="actors-search" type="text" class="w-full px-4 py-2 border border-slate-300 rounded-lg"
                               data-i18n-placeholder="searchPlaceholder"
                               placeholder="Rechercher un acteur…" value="{{ request('search') }}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2" data-i18n="type">Type</label>
                        <select id="actors-type" class="w-full px-4 py-2 border border-slate-300 rounded-lg">
                            <option value="" data-i18n="all">Tous</option>
                            <option value="hotel" data-i18n="hotelsRiads">Hôtels & Riads</option>
                            <option value="restaurant" data-i18n="restaurants">Restaurants</option>
                            <option value="tour_guide" data-i18n="touristGuides">Guides Touristiques</option>
                            <option value="travel_agency" data-i18n="travelAgencies">Agences de Voyage</option>
                        </select>
                    </div>
                    <div class="flex items-end gap-3">
                        <label class="inline-flex items-center gap-2 text-sm text-slate-700 mb-2 md:mb-0">
                            <input id="actors-accredited" type="checkbox" class="rounded border-slate-300">
                            <span data-i18n="accreditationType">Accrédités</span>
                        </label>
                        <button type="submit" class="ml-auto px-5 py-2 rounded-lg bg-slate-900 text-white font-medium" data-i18n="filter">
                            Filtrer
                        </button>
                    </div>
                </div>
                <div class="mt-4 flex items-center justify-between gap-4">
                    <div class="text-sm text-slate-600">
                        <span id="actors-count">—</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <label class="text-sm text-slate-600">Par page</label>
                        <select id="actors-per-page" class="px-3 py-2 border border-slate-300 rounded-lg text-sm">
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="48">48</option>
                        </select>
                    </div>
                </div>
            </form>

            <div id="actors-list" class="min-h-[200px]">
                <div class="text-center text-slate-600">Chargement…</div>
            </div>

            <div id="actors-pagination" class="mt-8"></div>
        </div>
    </div>
@endsection

