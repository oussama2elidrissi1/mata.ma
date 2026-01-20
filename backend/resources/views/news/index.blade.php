@extends('layouts.app')

@section('content')
    <div class="min-h-screen bg-white">
        <div class="bg-gradient-to-b from-gray-50 to-white py-16">
            <div class="container mx-auto px-4">
                <!-- Header Section -->
                <div class="mb-12 text-center">
                    <h1 class="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight" style="color: #333333;">
                        Actualités MATA
                    </h1>
                    <p class="text-lg max-w-2xl mx-auto" style="color: #333333;">
                        Restez informé des dernières nouvelles et initiatives de MATA
                    </p>
                </div>

                <div id="news-list"
                     data-endpoint="/api/news?status=published&per_page=50&sort_by=published_at&sort_direction=desc"
                     class="min-h-[200px]">
                    <div class="text-center py-12">
                        <p class="text-gray-600 text-lg">Chargement des actualités...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
