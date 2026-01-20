@extends('layouts.app')

@section('content')
    <div class="min-h-screen bg-white">
        <div class="bg-gradient-to-b from-gray-50 to-white py-16">
            <div class="container mx-auto px-4">
                <!-- Header Section -->
                <div class="mb-12 text-center">
                    <h1 class="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight" style="color: #333333;">
                        Événements Professionnels
                    </h1>
                    <p class="text-lg max-w-2xl mx-auto" style="color: #333333;">
                        Participez aux rencontres et conférences du secteur touristique
                    </p>
                </div>

                <!-- Filters Section -->
                <div class="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                            <div class="flex gap-2 overflow-x-auto">
                                <button data-category="Tous" class="category-filter px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-white shadow-md" style="background-color: #CC0000;">
                                    Tous
                                </button>
                                <button data-category="Conférence" class="category-filter px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                                    Conférence
                                </button>
                                <button data-category="Salon" class="category-filter px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                                    Salon
                                </button>
                                <button data-category="Formation" class="category-filter px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                                    Formation
                                </button>
                                <button data-category="Networking" class="category-filter px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                                    Networking
                                </button>
                            </div>
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Période</label>
                            <select id="events-month" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option value="Tous">Tous</option>
                                <option value="Janvier">Janvier</option>
                                <option value="Février">Février</option>
                                <option value="Mars">Mars</option>
                                <option value="Avril">Avril</option>
                                <option value="Mai">Mai</option>
                                <option value="Juin">Juin</option>
                                <option value="Juillet">Juillet</option>
                                <option value="Août">Août</option>
                                <option value="Septembre">Septembre</option>
                                <option value="Octobre">Octobre</option>
                                <option value="Novembre">Novembre</option>
                                <option value="Décembre">Décembre</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div id="events-list" class="min-h-[200px]">
                    <div class="text-center py-12">
                        <p class="text-gray-600 text-lg">Chargement des événements...</p>
                    </div>
                </div>

                <!-- CTA Section -->
                <div class="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center border border-primary/20" style="background: linear-gradient(to right, rgba(204, 0, 0, 0.1), rgba(204, 0, 0, 0.05)); border-color: rgba(204, 0, 0, 0.2);">
                    <h2 class="text-2xl md:text-3xl font-serif font-bold mb-4 tracking-tight" style="color: #333333;">
                        Organisez votre événement
                    </h2>
                    <p class="text-gray-700 mb-6 max-w-2xl mx-auto text-lg">
                        Vous organisez un événement professionnel dans le secteur du tourisme ? Référencez-le sur notre plateforme pour toucher des milliers de professionnels.
                    </p>
                    <button 
                        class="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md hover:shadow-lg"
                        style="background-color: #CC0000;"
                    >
                        Proposer un événement
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const categoryButtons = document.querySelectorAll('.category-filter');
            categoryButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    categoryButtons.forEach(b => {
                        b.classList.remove('text-white', 'shadow-md');
                        b.style.backgroundColor = '';
                        b.classList.add('bg-gray-100', 'text-gray-700');
                    });
                    this.classList.remove('bg-gray-100', 'text-gray-700');
                    this.classList.add('text-white', 'shadow-md');
                    this.style.backgroundColor = '#CC0000';
                    
                    const category = this.dataset.category;
                    const event = new CustomEvent('categoryChange', { detail: { category } });
                    window.dispatchEvent(event);
                });
            });
        });
    </script>
@endsection
