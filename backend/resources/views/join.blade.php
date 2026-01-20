@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold mb-4" style="color: #333333;">
                Adhérer à notre réseau
            </h1>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto">
                Rejoignez notre communauté d'acteurs du tourisme et développez votre activité
            </p>
        </div>

        <!-- Sélection du type de compte -->
        <div class="mb-8">
            <div class="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
                <h2 class="text-xl font-bold mb-4 text-center" style="color: #333333;">
                    Type de compte
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button type="button" id="account-type-actor" onclick="setAccountType('actor')"
                        class="p-6 rounded-lg border-2 transition-all account-type-btn border-red-600 bg-red-50"
                        style="border-color: #CC0000;">
                        <svg class="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #CC0000;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <h3 class="font-semibold mb-2" style="color: #333333;">Acteur</h3>
                        <p class="text-sm text-gray-600">
                            Pour les professionnels du tourisme (hôtels, restaurants, guides, etc.)
                        </p>
                    </button>
                    <button type="button" id="account-type-association" onclick="setAccountType('association')"
                        class="p-6 rounded-lg border-2 transition-all account-type-btn border-gray-200 hover:border-red-300 hover:bg-gray-50">
                        <svg class="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #CC0000;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        <h3 class="font-semibold mb-2" style="color: #333333;">Association</h3>
                        <p class="text-sm text-gray-600">
                            Pour les associations régionales du tourisme
                        </p>
                    </button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Sidebar -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-xl shadow-lg p-8 sticky top-24">
                    <h2 class="text-2xl font-bold mb-6" style="color: #CC0000;">
                        Processus d'Adhésion
                    </h2>
                    <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                            <div class="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm" style="background-color: #CC0000;">1</div>
                            <p class="text-gray-700 pt-1">Remplissez le formulaire</p>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm" style="background-color: #CC0000;">2</div>
                            <p class="text-gray-700 pt-1">Soumettez les documents requis</p>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm" style="background-color: #CC0000;">3</div>
                            <p class="text-gray-700 pt-1">Évaluation par notre équipe</p>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm" style="background-color: #CC0000;">4</div>
                            <p class="text-gray-700 pt-1">Recevez votre certification</p>
                        </div>
                    </div>

                    <div class="mt-8 pt-8 border-t border-gray-200">
                        <h3 class="text-lg font-semibold mb-4" style="color: #CC0000;">
                            Documents Requis
                        </h3>
                        <ul class="space-y-2 text-sm text-gray-600">
                            <li class="flex items-start space-x-2">
                                <svg class="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                <span>Registre de commerce</span>
                            </li>
                            <li class="flex items-start space-x-2">
                                <svg class="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                <span>Certificats professionnels</span>
                            </li>
                            <li class="flex items-start space-x-2">
                                <svg class="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                <span>Assurance responsabilité</span>
                            </li>
                            <li class="flex items-start space-x-2">
                                <svg class="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                <span>Photos de l'établissement</span>
                            </li>
                            <li id="doc-association" class="hidden flex items-start space-x-2">
                                <svg class="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                <span>Statuts de l'association</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Formulaire -->
            <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-lg p-8">
                    <h2 class="text-2xl font-bold mb-8" style="color: #CC0000;">
                        Formulaire d'Adhésion
                        <span id="form-subtitle" class="ml-2 text-lg text-gray-600 font-normal">(Acteur)</span>
                    </h2>

                    <div id="join-success" class="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-xl hidden">
                        <div class="flex items-center space-x-4">
                            <svg class="w-8 h-8 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <div>
                                <h3 class="font-semibold text-green-600 mb-1">Demande Soumise avec Succès!</h3>
                                <p class="text-sm text-gray-600" id="success-message">
                                    Un email de confirmation vous a été envoyé. Nous vous contacterons dans les 48 heures.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form id="join-form" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <svg class="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #CC0000;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                    Nom Complet *
                                </label>
                                <input type="text" id="join-full-name" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Votre nom complet" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <svg class="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #CC0000;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                    <span id="join-establishment-label">Nom de l'Établissement</span> *
                                </label>
                                <input type="text" id="join-establishment-name" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Nom de votre établissement" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="category-field">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Catégorie *
                                </label>
                                <select id="join-category" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                                    <option value="">Sélectionnez une catégorie</option>
                                    <option value="Hébergement">Hébergement</option>
                                    <option value="Restauration">Restauration</option>
                                    <option value="Activités">Activités</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Agence">Agence</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <svg class="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #CC0000;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    Région *
                                </label>
                                <select id="join-region" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                                    <option value="">Sélectionnez une région</option>
                                    <option value="Tanger-Tétouan-Al Hoceïma">Tanger-Tétouan-Al Hoceïma</option>
                                    <option value="L'Oriental">L'Oriental</option>
                                    <option value="Fès-Meknès">Fès-Meknès</option>
                                    <option value="Rabat-Salé-Kénitra">Rabat-Salé-Kénitra</option>
                                    <option value="Béni Mellal-Khénifra">Béni Mellal-Khénifra</option>
                                    <option value="Casablanca-Settat">Casablanca-Settat</option>
                                    <option value="Marrakech-Safi">Marrakech-Safi</option>
                                    <option value="Drâa-Tafilalet">Drâa-Tafilalet</option>
                                    <option value="Souss-Massa">Souss-Massa</option>
                                    <option value="Guelmim-Oued Noun">Guelmim-Oued Noun</option>
                                    <option value="Laâyoune-Sakia El Hamra">Laâyoune-Sakia El Hamra</option>
                                    <option value="Dakhla-Oued Ed-Dahab">Dakhla-Oued Ed-Dahab</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <svg class="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #CC0000;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                Ville *
                            </label>
                            <input type="text" id="join-city" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Votre ville" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <svg class="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #CC0000;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                Adresse Complète *
                            </label>
                            <textarea id="join-address" required rows="3"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Adresse complète de votre établissement"></textarea>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <svg class="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #CC0000;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                    Téléphone *
                                </label>
                                <input type="tel" id="join-phone" required pattern="[+]?[0-9]{10,}"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="+212 6XX XXX XXX" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <svg class="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #CC0000;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                    Email *
                                </label>
                                <input type="email" id="join-email" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="email@example.com" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <svg class="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #CC0000;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                                Site Web
                            </label>
                            <input type="url" id="join-website"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="www.example.com" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Description de Votre Activité *
                            </label>
                            <textarea id="join-description" required minlength="50" rows="5"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Décrivez votre établissement et vos services (minimum 50 caractères)"></textarea>
                        </div>

                        <div class="flex items-start space-x-3">
                            <input type="checkbox" id="join-terms" required class="mt-1" />
                            <label for="join-terms" class="text-sm text-gray-600">
                                J'accepte les conditions générales et je certifie que les informations fournies sont exactes *
                            </label>
                        </div>

                        <div class="pt-6">
                            <button type="submit" id="join-submit-btn"
                                class="w-full px-6 py-3 text-white rounded-lg font-medium transition-colors"
                                style="background-color: #CC0000;">
                                <span id="join-submit-text">Soumettre la Demande</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
let accountType = 'actor';

function setAccountType(type) {
    accountType = type;
    const actorBtn = document.getElementById('account-type-actor');
    const associationBtn = document.getElementById('account-type-association');
    const categoryField = document.getElementById('category-field');
    const docAssociation = document.getElementById('doc-association');
    const formSubtitle = document.getElementById('form-subtitle');
    const establishmentLabel = document.getElementById('join-establishment-label');
    const categorySelect = document.getElementById('join-category');

    if (type === 'actor') {
        actorBtn.classList.add('border-red-600', 'bg-red-50');
        actorBtn.classList.remove('border-gray-200', 'hover:border-red-300', 'hover:bg-gray-50');
        associationBtn.classList.remove('border-red-600', 'bg-red-50');
        associationBtn.classList.add('border-gray-200', 'hover:border-red-300', 'hover:bg-gray-50');
        categoryField.classList.remove('hidden');
        categorySelect.required = true;
        docAssociation.classList.add('hidden');
        formSubtitle.textContent = '(Acteur)';
        establishmentLabel.textContent = "Nom de l'Établissement";
    } else {
        associationBtn.classList.add('border-red-600', 'bg-red-50');
        associationBtn.classList.remove('border-gray-200', 'hover:border-red-300', 'hover:bg-gray-50');
        actorBtn.classList.remove('border-red-600', 'bg-red-50');
        actorBtn.classList.add('border-gray-200', 'hover:border-red-300', 'hover:bg-gray-50');
        categoryField.classList.add('hidden');
        categorySelect.required = false;
        docAssociation.classList.remove('hidden');
        formSubtitle.textContent = '(Association)';
        establishmentLabel.textContent = "Nom de l'Association";
    }
}

window.setAccountType = setAccountType;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('join-form');
    const successEl = document.getElementById('join-success');
    const submitBtn = document.getElementById('join-submit-btn');
    const submitText = document.getElementById('join-submit-text');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        successEl.classList.add('hidden');

        const payload = accountType === 'association'
            ? {
                name: document.getElementById('join-establishment-name').value,
                type: 'association',
                category: null,
                description: document.getElementById('join-description').value,
                address: document.getElementById('join-address').value,
                city: document.getElementById('join-city').value,
                region: document.getElementById('join-region').value,
                phone: document.getElementById('join-phone').value,
                email: document.getElementById('join-email').value,
                website: document.getElementById('join-website').value || null,
            }
            : {
                name: document.getElementById('join-establishment-name').value,
                type: 'other',
                category: document.getElementById('join-category').value || null,
                description: document.getElementById('join-description').value,
                address: document.getElementById('join-address').value,
                city: document.getElementById('join-city').value,
                region: document.getElementById('join-region').value,
                phone: document.getElementById('join-phone').value,
                email: document.getElementById('join-email').value,
                website: document.getElementById('join-website').value || null,
            };

        submitBtn.disabled = true;
        submitText.textContent = 'Envoi en cours...';

        try {
            const response = await fetch('/api/tourism-actors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la soumission. Vérifiez les champs.');
            }

            successEl.classList.remove('hidden');
            const successMessage = document.getElementById('success-message');
            successMessage.textContent = accountType === 'association'
                ? 'Un email de confirmation de partenariat vous a été envoyé. Nous vous contacterons dans les 48 heures.'
                : 'Un email de confirmation vous a été envoyé. Nous vous contacterons dans les 48 heures.';

            form.reset();
            setTimeout(() => {
                successEl.classList.add('hidden');
            }, 5000);
        } catch (err) {
            alert(err.message || 'Erreur lors de la soumission');
        } finally {
            submitBtn.disabled = false;
            submitText.textContent = 'Soumettre la Demande';
        }
    });
});
</script>
@endsection
