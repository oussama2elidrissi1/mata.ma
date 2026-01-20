@extends('layouts.app')

@section('content')
<div class="bg-gradient-to-b from-slate-50 to-white min-h-screen">
    <div class="mx-auto max-w-6xl px-4 py-8">
        <!-- Breadcrumb -->
        <div class="mb-6">
            <nav class="flex items-center space-x-2 text-sm text-slate-600">
                <a href="{{ route('home') }}" class="hover:text-slate-900">Accueil</a>
                <span>/</span>
                <a href="{{ route('actors.index') }}" class="hover:text-slate-900">Acteurs</a>
                <span>/</span>
                <span class="text-slate-900">Profil</span>
            </nav>
        </div>

        <!-- Actor Detail Container -->
        <div id="actor-detail" data-id="{{ $id }}" class="min-h-[400px]">
            <div class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-red-900 border-t-transparent mx-auto mb-4"></div>
                <p class="text-slate-600">Chargement du profil...</p>
            </div>
        </div>

        <!-- Related Actors -->
        <div class="mt-16">
            <h2 class="text-2xl font-serif font-bold mb-6">Acteurs Similaires</h2>
            <div id="related-actors" class="min-h-[200px]">
                <div class="text-center text-slate-600">Chargement...</div>
            </div>
        </div>
    </div>
</div>

<!-- Accreditation Request Modal -->
<div id="accreditation-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 hidden">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
            <h2 class="text-2xl font-bold text-gray-900">Demande d'Accréditation</h2>
            <button onclick="closeAccreditationModal()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>

        <form id="accreditation-form" class="p-6">
            <!-- Info -->
            <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-800">
                    <span class="font-semibold">Acteur:</span> <span id="modal-actor-name"></span>
                </p>
                <p class="text-xs text-red-600 mt-1">
                    Veuillez remplir le formulaire ci-dessous et télécharger le document d'accréditation fourni par l'État.
                </p>
            </div>

            <!-- Error/Success Messages -->
            <div id="accreditation-error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg hidden">
                <p class="text-sm text-red-600"></p>
            </div>
            <div id="accreditation-success" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg hidden">
                <p class="text-sm text-green-600"></p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nom complet -->
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="accreditation-full-name" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                        placeholder="Votre nom complet" />
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Email <span class="text-red-500">*</span>
                    </label>
                    <input type="email" id="accreditation-email" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                        placeholder="votre@email.com" />
                </div>

                <!-- Téléphone -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                    </label>
                    <input type="tel" id="accreditation-phone"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                        placeholder="+212 6 XX XX XX XX" />
                </div>

                <!-- Poste/Fonction -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Poste / Fonction
                    </label>
                    <input type="text" id="accreditation-position"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                        placeholder="Directeur, Gérant, etc." />
                </div>

                <!-- Numéro d'accréditation (optionnel) -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Numéro d'accréditation (si vous en avez un)
                    </label>
                    <input type="text" id="accreditation-number"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                        placeholder="MATA-XXXX-XXXX" />
                </div>

                <!-- Type de pièce d'identité -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Type de pièce d'identité <span class="text-red-500">*</span>
                    </label>
                    <select id="accreditation-identity-type" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white">
                        <option value="cin">Carte d'Identité Nationale (CIN)</option>
                        <option value="passport">Passeport</option>
                        <option value="other">Autre</option>
                    </select>
                </div>

                <!-- Numéro de pièce d'identité -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de pièce d'identité <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="accreditation-identity-number" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                        placeholder="AB12345" />
                </div>

                <!-- Document d'accréditation -->
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Document d'accréditation (fourni par l'État) <span class="text-red-500">*</span>
                    </label>
                    <div onclick="document.getElementById('accreditation-document').click()"
                        class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-red-500 transition-colors">
                        <input type="file" id="accreditation-document" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" class="hidden" />
                        <div id="accreditation-file-display">
                            <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                            </svg>
                            <p class="text-gray-600">Cliquez pour sélectionner un fichier</p>
                            <p class="text-sm text-gray-500 mt-1">
                                Formats acceptés: PDF, DOC, DOCX, JPG, PNG (max. 10MB)
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Message -->
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Message (optionnel)
                    </label>
                    <textarea id="accreditation-message" rows="4"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                        placeholder="Informations complémentaires..."></textarea>
                </div>
            </div>

            <div class="flex justify-end gap-4 mt-6 pt-6 border-t">
                <button type="button" onclick="closeAccreditationModal()"
                    class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Annuler
                </button>
                <button type="submit" id="accreditation-submit-btn"
                    class="px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 flex items-center gap-2">
                    <span id="accreditation-submit-text">Soumettre la demande</span>
                </button>
            </div>
        </form>
    </div>
</div>
@endsection

